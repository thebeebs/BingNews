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

        WinJS.Namespace.define("Sample.ListView", {
            data: new WinJS.Binding.List([])
        });

        var user = "0fac171a-4cc7-49f8-aeb9-b99eaca3de76";
        var pwd = "20gEEQNoCA6h03BU+uaB3ysIPcFvPiZ+PEq06HuakcA=";
        var cryp = window.btoa(user + ":" + pwd);

        document.getElementById("refreshNews").onclick = FetchNewsClick;

        FetchNewsClick();

        function FetchNewsClick() {
            document.getElementById("status").innerText = "Updating";
        var options = {
            url: "https://api.datamarket.azure.com/Bing/Search/v1/News?Query=%27microsoft%27&Market=%27en-GB%27&Adult=%27Strict%27",
            responseType: "json",
            type: "GET",
            headers: {
                "Authorization": "Basic " + cryp, "Content-type": "application/json; charset=utf-8", "Accept": "application/json"
            },

        };
        function FetchHeroImage(search) {
            var optionsImage = {
                url: "https://api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27" + search.Title + "%27",
                responseType: "json",
                type: "GET",
                headers: {
                    "Authorization": "Basic " + cryp, "Content-type": "application/json; charset=utf-8", "Accept": "application/json"
                },

            };
            WinJS.xhr(optionsImage).done(
           function (result) {
               heroImage.style.backgroundImage = 'url(' + result.response.d.results[0].MediaUrl + ')';
               document.getElementsByTagName("h2")[0].innerText = search.Title;
               document.getElementsByTagName("h3")[0].innerText = search.Description;
               document.getElementById("status").innerText = "Updated";
           },
           function (result) {
              document.getElementById("status").innerText = "Failed";
           }
       );

        }
        
        WinJS.xhr(options).done(
            function (result) {
                FetchHeroImage({ Title: result.response.d.results[0].Title, Description: "Results from Microsoft" });
                for (var i = 1; i < result.response.d.results.length; i++) {
                    Sample.ListView.data.push(result.response.d.results[i]);

                }
            },
            function (result) {
                console.log("Fail");
            }
        );
    }

        WinJS.UI.processAll();

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();