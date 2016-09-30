define([
    'jquery', 'jquery.form', 'jquery.validate','jquery.scrollTo', 'IScroll',
    'utils', 'config/environments', 'application','api','Chart.bundle',
    'i18n!nls/string'
], function(
    $, form, validator,scrollTo, IScroll,
    _UTILS, _CONFIG, APP, _API,_CHART,
    _STRING
) {
    var view = {
        init: function() {
            var self = this;
            self._BASE = {"_STRING":_STRING,"CURRENT_LANG": _UTILS.getUrlParam('language'), "SOURCE_DOMAIN": _CONFIG.config.sourceDomain};
            var pathArray = window.location.pathname.split('/');
            self.rid = pathArray[pathArray.length-1];
            console.log(self.rid)
            self.render();
            
        },
        render: function() {
            var self = this;
            $.ajax({
                url:_API.getApiUrlByName("sharePage"),
                data:{
                    id:self.rid
                },
                success:function(response){
                    self._SHARE_PAGE = response['detail'];
                    self.renderHearder();
                }
            }) 
        },
        renderHearder:function(){
            var self = this;
            var _DATA = {
                _BASE:self._BASE,
                _SHARE_PAGE:self._SHARE_PAGE
            };
            require(['text!../templates/header.html'], function(tmp) {
                APP.template.render(tmp,{
                    elem: '#header',
                    method: 'inner',
                    data: _DATA,
                    callback:function() {
                        self.renderSharePage();
                    }
                });
            });
        },
        renderSharePage:function(){
            var self = this;
            var _DATA = {
                _BASE:self._BASE,
                _SHARE_PAGE:self._SHARE_PAGE
            }
            require(['text!../templates/share-page-content.html'], function(tmp) {
                APP.template.render(tmp,{
                    elem: '#contactUsMain',
                    method: 'inner',
                    data: _DATA,
                    callback:function() {
                        var data = [_DATA._SHARE_PAGE.calling,_DATA._SHARE_PAGE.stopProfit,_DATA._SHARE_PAGE.stopLoss];
                        var labelsName=[_DATA._BASE._STRING._CALLING,_DATA._BASE._STRING._SHOP_PROFIT,_DATA._BASE._STRING._SHOP_LOSS];

                        var config = {
                            type: 'doughnut',
                            data: {
                                datasets: [{
                                    data: data,
                                    backgroundColor: [
                                        "#4a90e2",
                                        "#7ed321",
                                        "#de273d",
                                    ],
                                    borderWidth:0,
                                    label: 'Dataset 1',
                                    
                                }],
                                labels: labelsName
                            },
                            options: {
                                responsive: true,
                                legend: {
                                    display:false
                                },
                                title: {
                                    display: false,
                                },
                                animation: {
                                    animateScale: true,
                                    animateRotate: true
                                },
                                cutoutPercentage:60
                            }
                        };

                        var ctx = document.getElementById("chartArea").getContext("2d");
                        window.myDoughnut = new Chart(ctx, config);
                    }
                });
            });
        }
    };

    return view;
});




