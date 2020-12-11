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

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

