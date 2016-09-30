define(['facebook'], function(FB){
    FB.init({
        appId: "1643252772565037",
        version: "v2.4"
    });
    FB.getLoginStatus(function(response) {
        console.info(response);
    });
});