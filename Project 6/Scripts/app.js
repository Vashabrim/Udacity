
var dsmEats = [
	{ 'name': "Zombie Burger + Drink Lab", "location": "300 E Grand Ave, Des Moines, Iowa", "lat": 41.590581, "lng": -93.613274 },
	{ "name": "Fong's Pizza", "location": "223 4th Street, Des Moines, Iowa", "lat": 41.585894, "lng": -93.621786 },
	{ "name": "Royal Mile", "location": "210 4th Street, Des Moines, Iowa", "lat": 41.583463, "lng": -93.621968 },
	{ "name": "Django", "location": "210 10th Street, Des Moines, Iowa", "lat": 41.584339, "lng": -93.629251 },
	{ "name": "Exile Brewing Company", "location": "1514 Walnut Street, Des Moines, Iowa", "lat": 41.583170, "lng": -93.636655 }
];


// Initializes the Google Map centered on Sacramento.
var map, coords, infowindow;
function initMap() {

	var mapCanvas = document.getElementById('map');
	var mapOptions = {
		center: new google.maps.LatLng(38.565764, -121.478851),
		zoom: 13,
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
		dsmEats[i].marker.addListener('click', (function (cafe) {
			return function () {
				clickData(cafe);
			};
		})(dsmEats[i]));
	}
	infowindow = new google.maps.InfoWindow({});
	ko.applyBindings(new ViewModel());
}



//returns a string that is used to create the html elements of the popup
function createContent(cafe) {
	var popupData = "<h3>" + cafe.name + "</h3>" +
		"<div>" + cafe.location + "</div>" +
		"<div class='donuts'>Nearby Donuts Shops</div>";
	return popupData;
}

//Ajax to Foursquare api
function clickData(cafe) {
	cafe.marker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function () { cafe.marker.setAnimation(null); }, 1400);
	var url = "https://api.foursquare.com/v2/venues/search?client_id=DFSRRW1BTSRYP0FGOATX4WMZNX2ZZ2GJVYAFYTFW3AFDLLYZ&client_secret=OOMCJTA1EQEC30YGXASCJDIZCVRIPWZZYD0NLRGFIEYERKHS&v=20160221" +
		"&ll=" + cafe.lat + "," + cafe.lng + "&query=donuts" + "&limit=5" + "&radius=2000";
	var html = "";
	$.getJSON(url, function (data) {
		for (var i = 0; i < data.response.venues.length; i++) {
			html += "<div><a href='https://foursquare.com/v/" + data.response.venues[i].id + "'>" + data.response.venues[i].name + "</a></div>";
		}
		if (html === "") html = "There are no donuts shops close enough to get to before your coffee got cold.";
		infowindow.setContent(createContent(cafe) + html);
		infowindow.open(map, cafe.marker);
		//error handling
	}).error(function (e) {
		console.log("Problem with foursquare: " + e);
		html = "<div>We're sorry, something went wrong with your request.</div>";
		infowindow.setContent(createContent(cafe) + html);
		infowindow.open(map, cafe.marker);
	});
}

// Filter
var ViewModel = function () {
	var self = this;
	self.filter = ko.observable("");
	self.viewCafe = ko.computed(function () {
		var coffeeArr = [];
		dsmEats.forEach(function (cafe) {
			if (cafe.name.toLowerCase().indexOf(self.filter().toLowerCase()) > -1) {
				coffeeArr.push(cafe);
				cafe.marker.setVisible(true);
			} else cafe.marker.setVisible(false);
		});
		return coffeeArr;
	});
	self.select = function (parent) {
		clickData(parent);
	};
};

var mapLoadError = function () {
	var mapDiv = $('#map');
	mapDiv.append('<h1 style="background-color:white;padding:15px;">Error. Google Maps was unable to load</h1>');
}

