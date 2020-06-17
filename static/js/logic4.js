var results = []

d3.json("co2.json" ,function(data) {
  // Loop through mongodb data; combine 'lat'/'lng' columns into coordinates; retrieve other data.
  data.forEach(element =>  {
        var result = {}
        result["coordinates"] = [element.Lat, element.Lon]
        result["total"] = element.Total
        results.push(result);
  });


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

var latlon = []
var total = []
// Import CSV data
//d3.csv("/static/js/fossil-fuel-co2-emissions-by-nation.csv", function(data){
  //for (var i=0;i< data.length;i++){
      //latlon.push(data.latlon);
      //total.push(data.Total);


      //var c = latlon.map(function(e, i) {
        //return [e, latlon[i]];

      
      });
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
    
      function styleInfo(feature){
        return{
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColor(Total),
          color:"#000000",
          radius: Total,
          stroke:true,
          weight:0.5
        };
      }
     // L.geoJson(data, {
       // pointToLayer: function(feature,latlon){
         // return L.circleMarker(latlon);
        //},style: styleInfo
      //}).addTo(myMap);
      // console.log("latlon");
      // console.log(latlon);
  };
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
var markers = L.markerClusterGroup();
//need to filter years and get keys to work with below  
  var latlong = [];


  data.forEach((latlon) => {
    // Iterate through each key and value
   Object.entries(latlon).forEach(([key, value]) => {
      // Use the key to determine which array to push the value to
      if (key == "latlon"){
          var latlong = value
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker(latlon[0], latlon[1])
       // .bindPopup(response[i].descriptor)
       );
    }
    var geoPath = d3.geoPath()
    .projection(key); 
    
    L.geoJson(data, {
      pointToLayer: function(feature, latlon){
        return L.circleMarker(latlon)
      },
  });

//});
//console.log(typeValues);

function styleInfo(feature){
    return{
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.total),
      color:"#000000",
      radius:feature.properties.total,
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

    L.geoJson(data, {
      pointToLayer: function(feature, latlon){
        return L.circleMarker(latlon)
      },

// Include data on the type of fuel emissions on tool tip click
      style: styleInfo,
        onEachFeature: function(feature,layer){
          layer.bindPopup("Magnitude: "+ feature.properties.Total + "<br> Location: "+ feature.properties.Country);
        }
    }).addTo(pollution)
    //pollution.addTo(myMap)

  // Add Legend
  var legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [10000, 20000, 30000, 40000, 50000, 60000];
    var colors = ["lightgreen", "yellow", "orange", "red", "blue", "purple"];

    for (var i=0;i<grades.length;i++){
      //console.log(colors[i]);
      div.innerHTML  += 
        "<i style= 'background: " + colors[i] + "'></i>" + grades[i] + (grades[i+1] ? "&ndash;" + grades[i+1]+ "<br>" : "+" );
    }
    return div;
  };

  legend.addTo(myMap);
  }
)});