// Import CSV data
// d3.csv("fossil-fuel-co2-emissions-by-nation.csv", function(data){
//     var lat = []
//     var lon = []
//     var total = []
//     for (var i=0;i< data.length;i++){
//         lat.push(data.Lat);
//         lon.push(data.Lon);
//         total.push(data.Total);
//     }
// });



var pollution = new L.LayerGroup();

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
  
  // Create our map
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
  d3.json(function(data) {
  
    function styleInfo(feature){
      return{
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color:"#000000",
        radius:getRadius(feature.properties.mag),
        stroke:true,
        weight:0.5
      };
    }
  
      function getColor(Total){
        switch(true){
          case Total >100000:
            return "purple";
          case Total >50000:
            return "blue";
          case Total >25000:
            return "red";
          case Total >15000:
            return "orange";
          case Total >8000:
            return "yellow";
          case Total <8000:
            return "lightgreen";
        }
      }
  
      function getRadius(magnitude){
        return magnitude*10;
      }
  
      L.geoJSON(data, {
        pointToLayer: function(feature, latlng){
          return L.circleMarker(latlng)
        },
  
        style: styleInfo,
          onEachFeature: function(feature,layer){
            layer.bindPopup("Magnitude: "+ feature.properties.mag + "<br> Location: "+ feature.properties.place);
          }
      }).addTo(pollution)
      pollution.addTo(myMap)
  
    // Add Legend
    var legend = L.control({
      position: "bottomright"
    });
  
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var grades = [0, 1, 2, 3, 4, 5];
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