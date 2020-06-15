var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);

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
      //console.log(data.Total);

      var c = lat.map(function(e, i) {
        return [e, lon[i]];
        console.log(c)
        //var marker = L.marker([51.5, -0.09]).addTo(mymap);
      //   var circle = L.circle([51.508, -0.11], {
      //     color: 'red',
      //     fillColor: '#f03',
      //     fillOpacity: 0.5,
      //     radius: 500
      // }).addTo(mymap);
      });  
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

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
// Perform a GET request to the query URL
d3.json('static/js/co2.json', function(data) {

  function styleInfo(feature){
    return{
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.Total),
      color:"#000000",
      radius:getRadius(feature.properties.Total),
      stroke:true,
      weight:0.5
    };
  }

    function getColor(Total){
      switch(true){
        case Total >60000:
          return "purple";
        case Total >50000:
          return "blue";
        case Total >40000:
          return "red";
        case Total >30000:
          return "orange";
        case Total >20000:
          return "yellow";
        case Total <10000:
          return "lightgreen";
      }
    }

    function getRadius(Total){
      return Total;
    }

    var lat = [data.Lat]
    var lon = [data.Lon]
    var total = [data.Total]
    var latlng = L.latLng(lat, lon)


    L.geoJSON(data, {
      pointToLayer: function(feature, latlon){
        return L.circleMarker(latlon)
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
