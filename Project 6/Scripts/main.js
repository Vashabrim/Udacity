/****  Model - set variables and location data  ****/
// StreetviewAPI key AIzaSyC39CKK1lA0_pOaXo0t-ffppuK2JdVBkbg

var dsmEats = [
	{ 'name': "Zombie Burger + Drink Lab", "location": "300 E Grand Ave, Des Moines, Iowa", "lat": 41.590581, "lng": -93.613274 },
	{ "name": "Fong's Pizza", "location": "223 4th Street, Des Moines, Iowa", "lat": 41.585894, "lng": -93.621786 },
	{ "name": "Royal Mile", "location": "210 4th Street, Des Moines, Iowa", "lat": 41.583463, "lng": -93.621968 },
	{ "name": "Django", "location": "210 10th Street, Des Moines, Iowa", "lat": 41.584339, "lng": -93.629251 },
	{ "name": "Exile Brewing Company", "location": "1514 Walnut Street, Des Moines, Iowa", "lat": 41.583170, "lng": -93.636655 }
];

// Initializes the Google Map centered on Downtown Des Moines.
var map, coords, infowindow;
function initMap() {

	var mapCanvas = document.getElementById('map');
	var mapOptions = {
		center: new google.maps.LatLng(41.583463, -93.621968),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};
	map = new google.maps.Map(mapCanvas, mapOptions);

	for (var i = 0; i < dsmEats.length; i++) {
		coords = new google.maps.LatLng(dsmEats[i].lat, dsmEats[i].lng);
		dsmEats[i].marker = new google.maps.Marker({
			position: coords,
			map: map,
			title: dsmEats[i].name
		});
		dsmEats[i].marker.addListener('click', (function (dsmSpot) {
			return function () {
				clickData(dsmSpot);
			};
		})(dsmEats[i]));
	}
	infowindow = new google.maps.InfoWindow({});
	ko.applyBindings(new ViewModel());
}

//Return string used to create the infoWindow
function createContent(dsmSpot) {
	var popupData = "<h3>" + dsmSpot.name + "</h3>" +
		"<div>" + dsmSpot.location + "</div>" +
		"<div class='gym'>Nearby Exercise</div>";
	return popupData;
}

//Ajax to Foursquare api
function clickData(dsmSpot) {
	dsmSpot.marker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function () { dsmSpot.marker.setAnimation(null); }, 1400);
	var url = "https://api.foursquare.com/v2/venues/search?client_id=JJO4AW5FUNYT5A2BLIGS3IIAIQUK0KLLAH4POW3WZHZ3QLEJ&client_secret=3F0DQXR1U0JRIE22RFAI53PJPYC4XH3UMB1W2VSKWMK3RXEF&v=20160509" +
		"&ll=" + dsmSpot.lat + "," + dsmSpot.lng + "&query=gym" + "&limit=5" + "&radius=2000";
	var html = "";
	$.getJSON(url, function (data) {
		for (var i = 0; i < data.response.venues.length; i++) {
			html += "<div><a href='https://foursquare.com/v/" + data.response.venues[i].id + "'>" + data.response.venues[i].name + "</a></div>";
		}
		if (html === "") html = "You may have to walk off some of that burger before you can get to a gym.";
		infowindow.setContent(createContent(dsmSpot) + html);
		infowindow.open(map, dsmSpot.marker);
		//error handling
	}).error(function (e) {
		console.log("Problem with foursquare: " + e);
		html = "<div>We're sorry, something went wrong with your request.</div>";
		infowindow.setContent(createContent(dsmEats) + html);
		infowindow.open(map, dsmEats.marker);
	});
}

// Filter
var ViewModel = function () {
	var self = this;
	self.filter = ko.observable("");
	self.viewEats = ko.computed(function () {
		var dsmEatsArr = [];
		dsmEats.forEach(function (dsmSpot) {
			if (dsmSpot.name.toLowerCase().indexOf(self.filter().toLowerCase()) > -1) {
				dsmEatsArr.push(dsmSpot);
				dsmSpot.marker.setVisible(true);
			} else dsmSpot.marker.setVisible(false);
		});
		return dsmEatsArr;
	});
	self.select = function (parent) {
		clickData(parent);
	};
};

var mapLoadError = function () {
	var mapDiv = $('#map');
	mapDiv.append('<h1 style="background-color:white;padding:15px;">Error. Google Maps was unable to load</h1>');
}