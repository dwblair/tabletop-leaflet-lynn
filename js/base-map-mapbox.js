// Set view of Leaflet map based on screen size
//var layer = new L.StamenTileLayer('openstreetmap');
//var layer = new L.TileLayer.OpenStreetMap();

var layer = new L.tileLayer('http://{s}.tiles.mapbox.com/v3/zonability.glj45k32/{z}/{x}/{y}.png');

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
