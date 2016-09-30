/*
define([], function() {
    var environments = {
            get : function() {
                return window.LINK['environments'];
            },
            set : function(param) {
                if (typeof param == 'undefined') {
                    alert('You must provide an name to environments!');
                    return false;
                }

                param = param.toUpperCase();
                /!* LOCAL/GT_UAT: development, LINK_UAT: client UAT, PRO: production *!/
                switch (param) {
                    case 'LOCAL':
                        window.LINK['sourceDomain'] = '';
                        window.LINK['apiPrefix'] = '';
                        window.LINK['isUiDevMode'] = true;
                        break;
                    case 'GT_UAT':
                        window.LINK['sourceDomain'] = 'http://uat.gtomato.com/TheLinkRevamp_Web/';
                        window.LINK['apiPrefix'] = 'https://uat.gtomato.com/linkweb/api/';
                        window.LINK['isUiDevMode'] = false;
                        break;
                    case 'LINK_UAT':
                        window.LINK['sourceDomain'] = 'http://www-dev.linkhk.com/';
                        window.LINK['apiPrefix'] = 'linkweb/api/';
                        window.LINK['isUiDevMode'] = false;
                        break;
                    case 'PRO':
                        window.LINK['sourceDomain'] = '';
                        window.LINK['apiPrefix'] = 'linkweb/api/';
                        window.LINK['isUiDevMode'] = false;
                        break;
                }

                window.LINK['environments'] = param;
                //console.info('setEnvironment: '+param+' | sourceDomain: '+sourceDomain);
            }
        };
    return {

        environments: environments,
        getSourceDomain: function() {
            return window.LINK['sourceDomain'];
        }
    };
});*/
