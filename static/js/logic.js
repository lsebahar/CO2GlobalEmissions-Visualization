// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

var pollution = new L.LayerGroup();

// Import CSV data
d3.csv("fossil-fuel-co2-emissions-by-nation.csv", function(data){
  var lat = []
  var lon = []
  var total = []
  for (var i=0;i< data.length;i++){
      lat.push(data.Lat);
      lon.push(data.Lon);
      total.push(data.Total);
  }
});

 // Define streetmap and darkmap layers
 var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});
var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

//Create overlay object to hold our overlay layer
var overlayMaps = {
  Pollution: pollution
};

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [streetmap, pollution]
});



// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {

  function styleInfo(feature){
    return{
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.total),
      color:"#000000",
      radius:getRadius(feature.properties.total),
      stroke:true,
      weight:0.5
    };
  }

    function getColor(total){
      switch(true){
        case total >60000:
          return "purple";
        case total >50000:
          return "blue";
        case total >40000:
          return "red";
        case total >30000:
          return "orange";
        case total >20000:
          return "yellow";
        case total <10000:
          return "lightgreen";
      }
    }

    function getRadius(Total){
      return Total;
    }

    L.geoJSON(data, {
      pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng)
      },

// Include data on the type of fuel emissions on tool tip click
      style: styleInfo,
        onEachFeature: function(feature,layer){
          layer.bindPopup("Magnitude: "+ feature.properties.Total + "<br> Location: "+ feature.properties.Country);
        }
    }).addTo(pollution)
    pollution.addTo(myMap)

  // Add Legend
  var legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [10000, 20000, 30000, 40000, 50000, 60000];
    var colors = ["lightgreen", "yellow", "orange", "red", "blue", "purple"];

    for (var i=0;i<grades.length;i++){
      console.log(colors[i]);
      div.innerHTML  += 
        "<i style= 'background: " + colors[i] + "'></i>" + grades[i] + (grades[i+1] ? "&ndash;" + grades[i+1]+ "<br>" : "+" );
    }
    return div;
  };

  legend.addTo(myMap);
});
