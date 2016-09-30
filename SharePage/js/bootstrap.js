require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths : {
        "domReady": "vendor/domReady",
        "text": "vendor/text",
        "json": "vendor/json",
        "css": "vendor/css.min",
        "i18n": "vendor/i18n",
        "doT": "vendor/doT.min",
        "IScroll": "vendor/iscroll5",
        "FastClick": "vendor/fastclick",
        "jquery": "vendor/jquery.min",
        "jquery.form": "vendor/jquery.form",
        "jquery.validate": "vendor/jquery.validate",
        "jquery.scrollTo":"vendor/jquery.scrollTo",
        "jquery.skyCarousel": "vendor/jquery.sky.carousel-1.0.2.min",
        "additional-methods": "vendor/additional-methods",
        "LazyLoad": "vendor/jquery.lazyload.min",
        "async": "vendor/async",
        "Chart.bundle":"vendor/Chart.bundle"
    },
    shim : { // If the library does not support AMD
        "doT": {
            exports: "doT"
        },
        "IScroll": {
            exports: "IScroll"
        },
        "FastClick": {
            exports: "FastClick"
        },
        "jquery.form": ["jquery"],
        "jquery.validate": ["jquery"],
        "jquery.skyCarousel": ["jquery"],
        "jquery.scrollTo":["jquery"],
        "LazyLoad": {
            exports: "lazyload"
        },
        "Chart.bundle":{
            exports:"Chart.bundle"
        }
    },
    waitSeconds: 60 * 10
});

require(['domReady!'], function (doc) {
    require(['config/environments', 'utils'], function (_CONFIG, _UTILS) {
        var currentLang = _UTILS.getUrlParam('language');
        currentLang =(currentLang=='zh_TW') ? 'zh-hk' : (currentLang=='zh_CN') ? 'zh-cn' : 'zh-hk';

        require.config({
            config: {
                "i18n": {
                    "locale": currentLang
                }
            }
        });

        require(['application'], function (APP) {
            APP.initialize();
        });
    });
});