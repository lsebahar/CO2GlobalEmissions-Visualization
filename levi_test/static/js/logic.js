var results = []

d3.json("/static/js/co2.json" ,function(data) {
  // Loop through mongodb data; combine 'lat'/'lng' columns into coordinates; retrieve other data.
  data.forEach(element =>  {
        var result = {}
        result["coordinates"] = [element.Lat, element.Lon]
        result["total"] = element.Total
        result["year"] = element.Year
        results.push(result);
  });
    // create function to return data from 2014 only.
    function year(recent) {
      return recent.year == 1980;
  }

  var recentData = results.filter(year);
    console.log(recentData);
  
  // Pass through results array and store 2014 data in variable
  var data_2014 = recentData.filter(year);
  console.log(data_2014);

  var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
  //return color based on value
  function getColor(x) {
    return x > 200000 ? "purple" :
           x > 100000 ? "blue" :
           x > 80000 ? "red" :
           x > 50000 ? "orange" :
           x > 25000 ? "yellow" :
           x > 0 ? "lightgreen" :
                "#lightgreen";
  }

  for (var i = 0; i < data_2014.length; i++) {
    var location = data_2014[i];
    console.log(location);
    //var total_radius = data_2014[Total];
        L.circle((location.coordinates),{
          color: getColor(location.total),
          fillColor: getColor(location.total),
          fillOpacity: 0.50,
          radius: location.total*1.5}).addTo(myMap);
  }

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/dark-v10",
      accessToken: API_KEY
    }).addTo(myMap);

    


  // Add Legend
  var legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    labels = ['<strong>Pollution Thousands Tons of C</strong>'];
    var grades = [0, 25000, 50000, 80000, 100000, 200000];
    var colors = ["lightgreen", "yellow", "orange", "red", "blue", "purple"];

    for (var i=0;i<grades.length;i++){
      //console.log(colors[i]);
      div.innerHTML  += 
      labels.push(
        "<i style= 'background: " + colors[i] + "'></i>" + grades[i] + (grades[i+1] ? "&ndash;" + grades[i+1]+ "<br>" : "+" ));
    }
    div.innerHTML = labels.join('<br>');
    return div;
  };

  legend.addTo(myMap);
  });