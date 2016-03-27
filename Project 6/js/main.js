/****  Model - set variables and location data  ****/

var map;
var infowindow;

function initMap() {
    var dtdsm = { lat: 41.5890778, lng: -93.6613354 };

    map = new google.maps.Map(document.getElementById('map'), {
        center: dtdsm,
        zoom: 16
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: dtdsm,
        radius: 2500,
        type: ['food']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}