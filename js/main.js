function loadCordova() {
    if (navigator.connection.type == 0) {
        navigator.notification.alert(
            "There is no connection. This application will not run",
            dismiss,
            "10K Hero",
            "Quit"
        );
    }
    if (navigator.connection.type == 'none') {
        navigator.notification.alert(
            "There is no connection. This application will not run",
            dismiss,
            "10K Hero",
            "Quit"
        );
    } else {
        document.addEventListener("deviceready", applicationReady, false);
    }
}

function applicationReady() {
    navigator.notification.alert(
        "We are all done here setting up, over to you - hero.",
        dismiss,
        "10K Hero",
        "OK"
    );

    if (navigator.network.connection.type == Connection.NONE) {
        $("#testNetwork").text('No Internet Access').addClass("ui-btn ui-btn-icon-top ui-icon-delete");
    }
    if (navigator.network.connection.type == Connection.WIFI) {
        $("#testNetwork").text('WiFi Access').addClass("ui-btn ui-btn-icon-top ui-icon-check");
    }
    if (navigator.network.connection.type == Connection.CELL_2G) {
        $("#testNetwork").text('2G Internet Access').addClass("ui-btn ui-btn-icon-top ui-icon-check");
    }
    if (navigator.network.connection.type == Connection.CELL_3G) {
        $("#testNetwork").text('3G Internet Access').addClass("ui-btn ui-btn-icon-top ui-icon-check");
    }
    if (navigator.network.connection.type == Connection.CELL_4G) {
        $("#testNetwork").text('4G Internet Access').addClass("ui-btn ui-btn-icon-top ui-icon-check");
    }
    if (navigator.network.connection.type == Connection.UNKNOWN) {
        $("#testNetwork").text('Unknown Internet Access').addClass("ui-btn ui-btn-icon-top ui-icon-check");
    }

    var deviceInfo = document.getElementById('deviceProperties');
    deviceInfo.innerHTML =
        'Your handset is an: ' + device.model + '<br />' +
        'Your OS platform is: ' + device.platform + '<br />';

    if (navigator.connection.type == 0) {
        $('#networkInfo').text("Offline");
    } else if (navigator.connection.type == 'none') {
        $('#networkInfo').text("Offline");
    } else {
        $('#networkInfo').text("Online");
    }

    function dismiss() {}
    
    navigator.geolocation.watchPosition(geoSuccess, geoFail, {
        frequency: 3000
    });

    function geoSuccess(position) {
        var time = new Date(position.timestamp);
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        $('#time').text("Recieved data at " + time);
        $('#lattext').text("Your current latitude is: " + latitude);
        $('#longtext').text("Your current longitude is: " + longitude);
    }

    function geoFail(error) {
        $('#lattext').text("Error getting latitude: " + error);
        $('#longtext').text("Error getting longitude: " + error);
        $('#time').text("Error getting time: " + error);
    }
}

// CAMERA

function chooseMedia() {
    $("camerabtn").remove();
    navigator.notification.confirm("Would you like to take a photo or upload a pre-existing photo?", onDoConfirm, "Choose Media", "Camera, Gallery");
}

function onDoConfirm(btnNum) {
    if (btnNum == "1") {
        takePhoto();
    }
    if (btnNum == "2") {
        getImage();
    }
}

// Take photo using phone camera
function takePhoto() {
    navigator.camera.getPicture(cameraSuccess, cameraError);
}

function cameraSuccess(imageAddress) {
    phoneImage = document.getElementById('imageContainer');
    phoneImage.innerHTML = '<img src="' + imageAddress + '" width="100%;" height="80%;" border-radius="30%;"/>';
}

function cameraError(errorMessage) {
    navigator.notification.alert("Failed to load camera because of " + errorMessage);
}

// Get Prior Saved Image from Phone
function getImage() {
    navigator.camera.getPicture(loadSuccess, loadError, {
        quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
    });
}

function loadSuccess(galleryAddress) {
    phoneImage = document.getElementById('imageContainer');
    phoneImage.innerHTML = '<img src="' + galleryAddress + '" width="100%;" "/>';
}

function loadError(errorMessage) {
    navigator.notification.alert("Failed to load image because of " + errorMessage);
}   

$(document).ready(function(){
    $('#loginRunner').click(function(){
        loginUser();
        console.log("Logged in");
    }); 

    $('#resetPass').click(function(){
        resetPass();
    });
    
    $('#registerRunner').click(function(){
        registerUser();
    });
});