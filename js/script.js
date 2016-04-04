// Group we will append our markers to
if (window.location.hash === "#cluster") {
	// Set up cluster group
	var markers = new L.MarkerClusterGroup();
} else {
	// Otherwise set up normal groupx`
	var markers = new L.LayerGroup();
}

// Google Docs spreadsheet key
// var spreadsheet_key = '0As3JvOeYDO50dF9NWWRiaTdqNmdKQ1lCY3dpdDhZU3c';
// var spreadsheet_key = '1W_uid9Ftp6vdAVDkSZsDE1k07alKYpJW-bs7TFM6_RA';
// var spreadsheet_key = '1SFplhGIED_4Bfs-sIq4Kwyt_II7NiSqH3mWVsZ58MEc';
// var spreadsheet_key = 'https://docs.google.com/spreadsheets/d/1j4kEz9NP2qf5RvGuXbq6K64LHfT2b8NFClTBuPWA8E8/pubhtml';
var spreadsheet_key = '1SFplhGIED_4Bfs-sIq4Kwyt_II7NiSqH3mWVsZ58MEc';

// Name of lat, long columns in Google spreadsheet
var lat_column = 'latitude';
var long_column = 'longitude';

// Marker options
var radius = 10;
// Regular fill
// var fill_color = "#023858";
var fill_color = 'red';
var border_color = "#FFF";
// Hover
var fill_color_hover = 'blue';
var border_color_hover = "#333"

var global_markers_data;

// Function that creates our popup
function generatePopup(content){
    // Generate header
	var popup_header = "<h4>" + toTitleCase(content['name']) + "</h4>"
	
	// Generate content
	var popup_content = '<table class="popup_table table">';
	popup_content += '<tr><td><strong>Address:</strong></td>';
	popup_content += '<td>' + content['address'] + '</td>';
	popup_content += '<tr><td><strong>Category:</strong></td>';
	popup_content += '<td>' + content['category'] + '</td>';
	popup_content += '<tr><td><strong>Notes:</strong></td>';
	popup_content += '<td>' + content['notes'] + '</td>';
	//popup_content += '<tr><td colspan="2"><strong><a href="http://' + content['website'] + '" target="_blank">Learn more</a></strong></td>';
	popup_content += '</tr></table>'

	return popup_header + popup_content;
}

// This goes through our JSON file and puts markers on map
function loadMarkersToMap(markers_data) {
	// If we haven't captured the Tabletop data yet
	// We'll set the Tabletop data to global_markers_data
	if (global_markers_data !== undefined) {
		markers_data = global_markers_data;
	// If we have, we'll load global_markers_data instead of loading Tabletop again
	} else {
		global_markers_data = markers_data;
	}

	for (var num = 0; num < markers_data.length; num++) {
		// Capture current iteration through JSON file
		current = markers_data[num];

		// Add lat, long to marker
		var marker_location = new L.LatLng(current[lat_column], current[long_column]);

		// Determine radius of the circle by the value in total
		// radius_actual = Math.sqrt(current['total'] / 3.14) * 2.8;

		// Options for our circle marker
		var layer_marker = L.circleMarker(marker_location, {
			radius: radius,
			//fillColor: fill_color,
                        //fillColor: current['color'],
			fillColor: getColor(current['category']),
			color: border_color,
			weight: 1,
			opacity: 1,
			fillOpacity: 0.8
		});

		// Generate popup
		layer_marker.bindPopup( generatePopup(current) );

		// Add events to marker
		(function (num){
			// Must call separate popup(e) function to make sure right data is shown
			function mouseOver(e) {
				current = markers_data[num];
				var layer_marker = e.target;
		        layer_marker.setStyle({
		            radius: radius + 1,
		            fillColor: fill_color_hover,
		            color: border_color_hover,
		            weight: 2,
		            opacity: 1,
		            fillOpacity: 1
				});
				// layer_marker.openPopup();
		    }

		    // What happens when mouse leaves the marker
		    function mouseOut(e) {
				current = markers_data[num];
				var layer_marker = e.target;
				layer_marker.setStyle({
					radius: radius + 1,
					//fillColor: fill_color,
					fillColor: getColor(current['category']),
					color: border_color,
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8
		        });
		        // layer_marker.closePopup();
		    }

		    // Call mouseover, mouseout functions
		    layer_marker.on({
		    	mouseover: mouseOver,
		    	mouseout: mouseOut
		    });

		})(num)

		// Add to feature group
		markers.addLayer(layer_marker);
	}

	// Add feature group to map
	map.addLayer(markers);

	// Clear load text
	// $('.sidebar_text_intro').html('');
};

// Pull data from Google spreadsheet via Tabletop
function initializeTabletopObjectMarkers(){
	Tabletop.init({
    	key: spreadsheet_key,
    	callback: loadMarkersToMap,
    	simpleSheet: true,
    	debug: false
    });
}


function getColor(d) {
    return d == 'restaurant' ? 'red' :
           d == 'grocery' ? 'green' :
           d == 'school' ? 'blue' :
           d == 'farmers market' ? 'yellow' :
           d == 'csa pickup'  ? 'purple' :
           d == 'vending machine'  ? '#FEB24C' :
           d == 'elderly housing'  ? '#FED976' :
                      '#FFEDA0';
}


var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ['restaurant', 'grocery', 'school', 'farmers market', 'csa pickup', 'vending machine', 'elderly housing'],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '<br>' : '');
    }

    return div;
};



//legend.addTo(map);
// Add JSON data to map
// If not done with map-tabletop-geojson.js
initializeTabletopObjectMarkers();

legend.addTo(map);

