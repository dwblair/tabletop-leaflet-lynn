// Set view of Leaflet map based on screen size
//var layer = new L.StamenTileLayer('openstreetmap');
//var layer = new L.TileLayer.OpenStreetMap();

// var layer = new L.tileLayer('http://{s}.tiles.mapbox.com/v3/zonability.glj45k32/{z}/{x}/{y}.png');

/*
var layer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
*/

/*
var layer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
*/
var layer = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {

			maxZoom: 18,

			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +

				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +

				'Imagery © <a href="http://mapbox.com">Mapbox</a>',

			id: 'mapbox.streets'

		});

/*
var layer = new L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
*/

if ($(window).width() < 626) {
	var map = new L.Map('map').setView([42.4637239,-70.9454241],14);
} else {
	var map = new L.Map('map').setView([42.4637239,-70.9454241],14);
}
map.addLayer(layer);
