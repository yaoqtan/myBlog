define([], function() {
    var getLS = function(key) {
            if (!localStorage) {
                console.info('Not support localStorage!');
                return false;
            }
            
            return localStorage.getItem(key);
        },
        setLS = function(key, value) {
            if (!localStorage) console.info('Not support localStorage!');
            localStorage.setItem(key, value);
        },
        removeLS = function(key) {
            if (!localStorage) console.info('Not support localStorage!');
            localStorage.removeItem(key);
        },
        getCookie = function(cookieName) {
            var cookieObj=document.cookie;
            var startIndex=cookieObj.indexOf(cookieName);
            if(startIndex==-1) return null; // no cookie
            startIndex+=cookieName.length+1;
            var endIndex=cookieObj.indexOf(";",startIndex);
            if (endIndex==-1) endIndex=cookieObj.length;
            return unescape(cookieObj.substring(startIndex,endIndex));
        },
        setCookie = function(_KEY, _VALUE, param){
            param = param || {};
            var options = {};
            for (var i in param) options[i] = param[i];
            var expires = options['expires'],
                expireDay = options['expireDay'],
                domain = options['domain'],
                path = options['path'];
            var COOKIE_STRING = _KEY + '=' + escape(_VALUE);

            if (expires) {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + expires);
                var _EXD = expireDate.toGMTString();
                COOKIE_STRING += ';expires=' + _EXD;
            } else if (expireDay) {
                var expireDate2 = new Date(expireDay);
                expireDate2.setDate(expireDate2.getDate());
                var _EXD2 = expireDate2.toGMTString();
                COOKIE_STRING += ';expires=' + _EXD2;
            }
            if (domain) COOKIE_STRING += ';domain=' + escape(domain);
            if (path) COOKIE_STRING += ';path=' + escape(path);
            document.cookie = COOKIE_STRING;
        },
        removeCookie = function(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(name);
            document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
        },
        getUrlParam = function(key) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return '';
        },
        setUrlParam = function(key, value) {
            key = encodeURI(key); value = encodeURI(value);
            var kvp = window.location.search.substr(1).split('&');
            var parameter = window.location.search;
            var i = kvp.length; var x; while(i--) {
                x = kvp[i].split('=');
                if (x[0]==key) {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }

            if (i<0) {kvp[kvp.length] = [key, value].join('=');}
            if (parameter == '') window.location.search = kvp.join('?');
            else window.location.search = kvp.join('&');
        },
        numberWithCommas = function(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        setPageSeo = function(sectionData, currentLang) {
            currentLang = currentLang || 'tc';

            var seoTitle = null, seoKeyword = null, seoDescription = null;
            switch (currentLang) {
                case 'tc':
                    seoTitle = sectionData['seoTitleTc'];
                    seoKeyword = sectionData['seoKeywordTc'];
                    seoDescription = sectionData['seoDescriptionTc'];
                    break;
                case 'sc':
                    seoTitle = sectionData['seoTitleSc'];
                    seoKeyword = sectionData['seoKeywordSc'];
                    seoDescription = sectionData['seoDescriptionSc'];
                    break;
                case 'en':
                    seoTitle = sectionData['seoTitleEn'];
                    seoKeyword = sectionData['seoKeywordEn'];
                    seoDescription = sectionData['seoDescriptionEn'];
                    break;
            }

            if (!!seoTitle) {
                document.title = seoTitle;

                var metaObjects = document.getElementsByTagName('meta');
                for (var i=0; i<metaObjects.length; i++) {
                    var propertyObj = metaObjects[i]['attributes']['property'];
                    if (propertyObj && propertyObj['value'] == 'og:title') {
                        metaObjects[i]['content'] = seoTitle;
                    }
                }
            }

            if (!!seoKeyword) {
                var keywordsMeta = document.getElementsByName('keywords')[0];
                if (!!keywordsMeta) {
                    keywordsMeta.content = seoKeyword;
                } else {
                    var meta1 = document.createElement('meta');
                    meta1.name = 'keywords';
                    meta1.content = seoKeyword;
                    document.getElementsByTagName('head')[0].appendChild(meta1);
                }
            }

            if (!!seoDescription) {
                var descriptionMeta = document.getElementsByName('description')[0];
                if (!!descriptionMeta) {
                    descriptionMeta.content = seoDescription;
                } else {
                    var meta2 = document.createElement('meta');
                    meta2.name = 'description';
                    meta2.content = seoDescription;
                    document.getElementsByTagName('head')[0].appendChild(meta2);
                }

                var metaObjects = document.getElementsByTagName('meta');
                for (var i=0; i<metaObjects.length; i++) {
                    var propertyObj = metaObjects[i]['attributes']['property'];
                    if (propertyObj && propertyObj['value'] == 'og:description') {
                        metaObjects[i]['content'] = seoDescription;
                    }
                }
            }
        },
        device = function() {
            var browser = {
                    versions: function() {
                        var u = navigator.userAgent.toLowerCase() || navigator.appVersion.toLowerCase();
                        return {
                            toString: u,
                            version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
                            msie: /msie/.test(u) && !/opera/.test(u), //IE
                            mozilla: /mozilla/.test(u) && !/(compatible|webkit)/.test(u), //Firefox
                            safari: /safari/.test(u) && !/chrome/.test(u), //Safari
                            chrome: /chrome/.test(u), //Chrome
                            opera: /opera/.test(u), //Opera
                            presto: u.indexOf('presto/') > -1, //Presto
                            webKit: u.indexOf('applewebkit/') > -1, //Webkit
                            gecko: u.indexOf('gecko/') > -1 && u.indexOf('khtml') == -1, //Gecko
                            mobile: !!u.match(/applewebkit.*mobile.*/),
                            iOS: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/),
                            aOS: u.indexOf('android') > -1,
                            iPhone: u.indexOf('iphone') > -1,
                            iPad: u.indexOf('ipad') > -1,
                            webApp: !!u.match(/applewebkit.*mobile.*/) && u.indexOf('safari/') == -1
                        };
                    }(),
                    language: (navigator.browserLanguage || navigator.language).toLowerCase()
                },
                IEVersion = function() {
                    var u = navigator.userAgent.toLowerCase();
                    var v = u.match(/msie (\d+).(\d+)/);
                    if (v != null) return [parseInt(v[1] || 0, 10)];
                },
                iOSVersion =  function() {
                    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                    if (v != null) return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
                };

            return {
                browser: browser,
                platform: navigator.platform.toLowerCase(),
                IEVersion: IEVersion,
                iOSVersion: iOSVersion
            }
        }();

    return {
        setLS: setLS,
        getLS: getLS,
        removeLS: removeLS,
        getCookie: getCookie,
        setCookie: setCookie,
        removeCookie: removeCookie,
        getUrlParam: getUrlParam,
        setUrlParam: setUrlParam,
        numberWithCommas: numberWithCommas,
        setPageSeo: setPageSeo,
        device: device
    };
});
