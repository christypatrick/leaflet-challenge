 // Create our map, giving it the streetmap and earthquakes layers to display on load
 var myMap = L.map("mapid", {
  center: [39.41, -111.71],
  zoom: 5,
});

// Define streetmap and darkmap layers
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// Store API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  function styleInfo(feature) {
    console.log(feature.geometry.coordinates[2])
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
   };
   
  // set color based on depth
    function getColor(depth) {
    switch (true) {
      case depth < 10:
        return "#32CD32";
      case depth < 30:
        return "#ADFF2F";
      case depth < 50:
        return "#FFFF00";
      case depth < 70:
        return "#FBB124";
      case depth <= 89: 
        return "#FF8C00";
      case depth >= 90:
        return "#FF0000";      
    }
  }
  // set radius based on magnitude
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 3;
  }
    // GeoJSON layer
    L.geoJson(data, {
      // Make circles
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      // circle style
      style: styleInfo,
      // popup for each marker
      onEachFeature: function(feature, layer) {
        layer.bindPopup(`Depth: ${feature.geometry.coordinates[2]}<br>Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}<br>Date: ${Date(feature.properties.time)}`);
      }
    }).addTo(myMap);
     
    // an object legend
    var legend = L.control({position: "bottomright"});
  
    // details for the legend
    legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
  
      // var grades = [0, 1, 2, 3, 4, 5];
          depthRange = [-10, 10, 30, 50, 70, 90],
          labels = [];
  
      // Looping through
      for (var i = 0; i < depthRange.length; i++) {
        div.innerHTML += '<i style="background:' 
        + getColor(depthRange[i] + 1) + '"></i> '
        + depthRange[i] + (depthRange[i + 1] ? '&ndash;' + depthRange[i + 1] + '<br>' : '+');
        }
           
      return div;
    };
  
    // Add the legend to the map.
    legend.addTo(myMap);
  });