// http://go.microsoft.com/fwlink/?LinkID=290993&clcid=0x409
var client;
document.addEventListener("deviceready", function () {    
    client= new WindowsAzure.MobileServiceClient(
                    "https://democordovabingnew.azure-mobile.net/",
                    "VKsHNHlENBQKZsCLfKHQzilQXFXIDt16");



    refreshAuthDisplay();
    $('#summary').html('<strong>You must login to access data.</strong>');
    $("#logged-out button").click(logIn);
    $("#logged-in button").click(logOut);


});

function refreshAuthDisplay() {
    var isLoggedIn = client.currentUser !== null;
    $("#logged-in").toggle(isLoggedIn);
    $("#logged-out").toggle(!isLoggedIn);

    if (isLoggedIn) {
        $("#login-name").text(client.currentUser.userId);
        var favs = client.getTable('favs');
        var query = favs.where({ user: client.currentUser.userId });       

        query.read().then(function (favItems) {
            for (var i = 0; i < favItems.length; i++) {
                BingNews.ListViewFav.data.push(favItems[i]);
            }
        });

        //favs.insert({ Title: "Word Ranks High", Description: "According to recent reports Microsoft (NASDAQ MSFT) Word mobile app is climbing its way up to the peak Apple charts. ", complete: false, user: client.currentUser.userId });
        //favs.insert({ Title: "Microsoft to replace Lync", Description: "Microsoft will replace Lync with Skype for Business as the company attempts to connect businesses with “hundreds of millions” of Skype users.", complete: false, user: client.currentUser.userId });
    }
}

function logIn() {
    client.login("facebook").then(refreshAuthDisplay, function (error) {
        console.log(error);
    });
}

function logOut() {
    client.logout();
    refreshAuthDisplay();
    $('#summary').html('<strong>You must login to access data.</strong>');
}

