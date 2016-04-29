/****  Model - set variables and location data  ****/
// StreetviewAPI key AIzaSyC39CKK1lA0_pOaXo0t-ffppuK2JdVBkbg

var map;
var infowindow;

var dsmEats = [
    { "name": "Zombie Burger + Drink Lab", "location": "300 E Grand Ave, Des Moines, Iowa", "lat": "41.590581", "lng": "-93.613274" },
    { "name": "Fong's Pizza", "location": "223 4th Street, Des Moines, Iowa", "lat": "41.585894", "lng": "-93.621786" },
    { "name": "Royal Mile", "location": "210 4th Street, Des Moines, Iowa", "lat": "41.583463", "lng": "-93.621968" },
    { "name": "Django", "location": "210 10th Street, Des Moines, Iowa", "lat": "41.584339", "lng": "-93.629251" },
    { "name": "Exile Brewing Company", "location": "1514 Walnut Street, Des Moines, Iowa", "lat": "41.583170", "lng": "-93.636655" }
];

function initMap() {
    var dtdsm = { lat: 41.586828, lng: -93.623171 };

    map = new google.maps.Map(document.getElementById('map'), {
        center: dtdsm,
        zoom: 16
    });

    for (var i = 0; i < dsmEats.length; i++) {
        Coordinates = new google.maps.LatLng(dsmEats[i].lat, dsmEats[i].lng);
        dsmEats[i].marker = new google.maps.Marker({
            position: Coordinates,
            map: map,
            title: dsmEats[i].name
        });
        dsmEats[i].marker.addListener('click', (function (api) {
            return function () {
                clickData(api);
            };
        })); dsmEats[i];
    }

    infowindow = new google.maps.InfoWindow();
    ko.applyBindings(new ViewModel());
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
function createContent(dsmEats) {
    var popupData = "<h3>" + dsmEats.name + "</h3>" + "<div>" + dsmEats.location + "</div>"
    return popupData;
}

function clickData(dsmEats) {
    dsmEats.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () { dsmEats.marker.setAnimation(null); }, 1400);
    var url = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10&key=AIzaSyC39CKK1lA0_pOaXo0t-ffppuK2JdVBkbg"
}

//Filter

var ViewModel = function () {
    var self = this;
    self.filter = ko.observable("");
    self.viewEats = ko.computed(function () {
        var dsmEatsArr = [];
        dsmEats.forEach(function (eats) {
            if (dsmEats.name.toLowerCase().indexOf(self.filter().toLowerCase()) > -1) {
                dsmEatsArr.push(eats);
                dsmEats.marker.setVisible(true);
            } else eats.marker.setVisible(false);
        });
        return dsmEatsArr;
    });
    self.select = function (parent) {
        clickData(parent);
    };
};

var mapLoadError = function () {
    var mapDiv = $('#map');
    mapDiv.append('<h1>Error. Google Maps was unable to load</h1>')
}