define([
    'jquery', 'doT', 'jquery.form', 'jquery.validate', 'FastClick',
    'i18n!nls/string'
], function(
    $, doT, form, validator, FastClick,
    _STRING
) {
    var initialize = function() {
            new FastClick(document.body);

            Date.prototype.format = function(format) {
                var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' , 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var o = {
                    'M+' : this.getMonth()+1, //month
                    'd+' : this.getDate(),    //day
                    'hh+' : this.getHours(),   //hour
                    'o+' : this.getHours()%12==0 ? 12 : this.getHours()%12, //12-hour
                    'm+' : this.getMinutes(), //minute
                    's+' : this.getSeconds(), //second
                    'q+' : Math.floor((this.getMonth()+3)/3),  //quarter
                    'S' : this.getMilliseconds() //millisecond
                };

                var NOON = _STRING.NOON, AM = _STRING.AM, PM = _STRING.PM;
                if (/(L+)/.test(format)) {format=format.replace(RegExp.$1, (this.getHours()>12 ? PM : this.getHours()<12 ? AM : NOON).substr(4 - RegExp.$1.length));}

                if (/(y+)/.test(format)) {format=format.replace(RegExp.$1, (this.getFullYear()+'').substr(4 - RegExp.$1.length));}
                for (var k in o)if(new RegExp('('+ k +')').test(format))
                    format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ('00'+ o[k]).substr((''+ o[k]).length));

                if (/(B+)/.test(format)) {format=format.replace(RegExp.$1, (MONTHS[this.getMonth()]+'').substr(0));}

                return format;
            };

            require(['config/environments', 'utils'], function ( _CONFIG, _UTILS) {
                var currentLang = _UTILS.getUrlParam('language');
                if (!currentLang) {
                    _UTILS.setUrlParam('language', 'zh_TW');
                    $('html').attr('lang', 'zh-HK');
                } else {
                    var _LANG =(currentLang=='zh_TW') ? 'zh-hk' : (currentLang=='zh_CN') ? 'zh-cn' : 'zh-hk';
                    $('html').attr('lang', _LANG);
                }

                var classGroup = document.getElementsByTagName('html')[0].className,
                    ua = navigator.userAgent.toLowerCase();
                window.isAndroid = /android/.test(ua);
                window.isIos = /ipad/.test(ua) || /iphone/.test(ua);

                if ($(window).width() < 851) {
                    classGroup += ' mobile';
                } else {
                    classGroup += ' desktop';
                }
                if (window.isAndroid) {classGroup += ' aOS';}
                else if (window.isIos) {classGroup += ' iOS';}
                else {classGroup += ' non-mobile-device';}
                document.getElementsByTagName('html')[0].className = classGroup;

                $(window).on('orientationchange resize', function() {
                    setTimeout(function() {
                        //if ((window.isAndroid || window.isIos) && $(window).width() < 851) {
                        if ($(window).width() < 851) {
                            $('html').removeClass('desktop').addClass('mobile');
                            //console.info('UI as mobile version!');
                        } else {
                            $('html').removeClass('mobile').addClass('desktop');
                            //console.info('UI as desktop version!');
                        }
                    }, 300);
                });
                /* Lib Setting */
                var currentRequests = {};
                $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
                    if (options.abortOnRetry) {
                        if (currentRequests[options.url]) {currentRequests[options.url].abort();}
                        currentRequests[options.url] = jqXHR;
                    }
                });
                var jQueryAjaxSetup = {
                    cache: false,
                    type: 'POST',
                    dataType: 'json',
                    abortOnRetry: true,
                    error: function(XMLHttpRequest, errorStatus) {
                        console.info('[application.js] Ajax call error: '+errorStatus);
                    }
                };

                var isUiDevMode = _CONFIG.config.isUiDevMode;
                if (isUiDevMode) {
                    jQueryAjaxSetup = {
                        isLocal: true,
                        cache: false,
                        type: 'GET',
                        dataType: 'json',
                        abortOnRetry: true,
                        error: function(XMLHttpRequest, errorStatus) {
                            console.info('[application.js] Ajax call error: '+errorStatus);
                        }
                    };
                }

                $.ajaxSetup(jQueryAjaxSetup);

                $.validator.setDefaults({
                    ignore: []
                    // any other default options and/or rules
                });

                /* Load each view script */
                var pageId = 'views/'+$('.page').attr('id')+'View';
                require([pageId], function(view) {
                    view.init();
                });
            });
        },
        template = function () {
            var render = function(html, options) {
                var $elem = $(options.elem) || null,
                    method = options.method || 'none',
                    data = options.data || {},
                    callback = options.callback || null;

                if ($elem != null) {
                    var tempFn = doT.template(html);
                    var htmlCode = tempFn(data);
                    switch (method) {
                        case 'inner':
                            $elem.html(htmlCode);
                            break;
                        case 'append':
                            $elem.append(htmlCode);
                            break;
                        case 'prepend':
                            $elem.prepend(htmlCode);
                            break;
                        case 'none':
                            break;
                    }
                }

                if (typeof callback == 'function' && callback != null) callback(htmlCode);
            };
            return {
                render: render
            }
        }();

    return {
        initialize: initialize,
        template: template
    };
});


















