// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        WinJS.Namespace.define("BingNews.ListView", {
            data: new WinJS.Binding.List([])
        });

        WinJS.Namespace.define("BingNews.ListViewFav", {
        data: new WinJS.Binding.List([])
        });

        var user = "0fac171a-4cc7-49f8-aeb9-b99eaca3de76";
        var pwd = "20gEEQNoCA6h03BU+uaB3ysIPcFvPiZ+PEq06HuakcA=";
        var cryp = window.btoa(user + ":" + pwd);                  

        function fetchNews() {
            var options = {
                url: "https://api.datamarket.azure.com/Bing/Search/v1/News?Query=%27microsoft%27&Market=%27en-GB%27&Adult=%27Strict%27",
                type: "GET",
                headers: {
                    "Authorization": "Basic " + cryp, "Content-type": "application/json; charset=utf-8", "Accept": "application/json"
                },

            };
           
        WinJS.xhr(options).done(
            function (result) {      
                var json = JSON.parse(result.responseText);
                for (var i = 1; i < json.d.results.length; i++) {
                    BingNews.ListView.data.push(json.d.results[i]);
                }
            }
        );
    }

        WinJS.UI.processAll().done(fetchNews);


    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();