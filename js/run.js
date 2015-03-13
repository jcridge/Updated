$(document).on("pageshow", "#run", function(event) {
    changeSize();
    initialize();
    google.maps.event.trigger(map, 'resize');
});

function changeSize() {
    var bodyheight = $(window).height();
    $("#map-canvas").height(bodyheight - 60);
    $(window).resize(function() {
        var bodyheight = $(window).height();
        $("#map-canvas").height(bodyheight - 60);
    });
}

function initialize() {
/*    var mapOptions = {
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        draggable: false,
        animation: google.maps.Animation.BOUNCE
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            function(position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);

                var marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: image,
                });
                
                var image = {
                    url: 'img/logo/iOS/114iPhone4.png',
                    size: new google.maps.Size(20, 20)
                };
                
                marker.setPosition(
                    new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude)
                );
                //marker.setPosition(pos);
                map.setCenter(pos);
                marker.setAnimation(google.maps.Animation.BOUNCE);
            },
            function() {
                handleNoGeolocation(true);
            }); {
            frequency: 2000
        }
    } else {
        handleNoGeolocation(false);
    }*/
    
    var optn = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0	
        };
    if( navigator.geolocation ){
        navigator.geolocation.watchPosition(success, fail, optn);
    } else {
        alert("HTML5 Not Supported");
    }

    function success(position){
        var googleLatLng = new google.maps.LatLng(position.coords.latitude, 
                                                  position.coords.longitude);
        var mapOtn={
            zoom:10,
            center:googleLatLng,
            mapTypeId:google.maps.MapTypeId.ROAD
        };

        var Pmap = document.getElementById("map-canvas");

        var map = new google.maps.Map(Pmap, mapOtn);
    }

    function addMarker(map, googleLatLng, title, content){
        var googleLatLng = new google.maps.LatLng(position.coords.latitude, 
                                                  position.coords.longitude);
        var markerOptn={
            position:googleLatLng,
            map:map,
            title:title,
            animation:google.maps.Animation.DROP
        };

        var marker=new google.maps.Marker(markerOptn);

        var infoWindow=new google.maps.InfoWindow({ content: content, position: googleLatLng});												   
    }

    function fail(error){
        alert("Error");
    }    
}



