// Set view of Leaflet map based on screen size
var layer = new L.StamenTileLayer('toner-background');
if ($(window).width() < 626) {
	var map = new L.Map('map').setView([42.4637239,-70.9454241],14);
} else {
	var map = new L.Map('map').setView([42.4637239,-70.9454241],14);
}
map.addLayer(layer);
