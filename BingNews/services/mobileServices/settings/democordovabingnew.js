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

