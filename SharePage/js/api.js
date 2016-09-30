define(['config/environments', 'jquery'], function(_CONFIG, $) {
    var apiPrefix = _CONFIG.config.apiPrefix || '/aladdin/api/',
        catalog = {
            sharePage: '',

        },
        fakeCatalog = {
            sharePage: 'sharePageSample.json',
        },
        getApiUrlByName = function(apiName) {
            var isUiDevMode = _CONFIG.config.isUiDevMode,
                apiUrl = null;

            if (isUiDevMode) {
                apiUrl = apiPrefix + fakeCatalog[apiName];
            } else {
                apiUrl = apiPrefix + catalog[apiName];
            }

            if (!apiUrl || apiUrl == null) {
                console.info('[api] api name ('+apiName+') not found!');
                return false;
            } else {
                return apiUrl;
            }
        }

    return {
        catalog: catalog,
        apiPrefix: apiPrefix,
        getApiUrlByName: getApiUrlByName,
    };
});