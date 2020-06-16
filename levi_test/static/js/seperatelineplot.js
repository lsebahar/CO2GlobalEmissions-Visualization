var queryUrl = 'https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_json/data/2b4874bb29c461a614e92773956ad573/fossil-fuel-co2-emissions-by-nation_json.json'



function openingLine() {
    d3.json(queryUrl, function (data) {
    
      
    
    function filtercountryusa(movie) {
      return movie.Country == "UNITED STATES OF AMERICA";
    }
    var filteredMoviesusa = data.filter(filtercountryusa);

    console.log(filteredMoviesusa)
    
    function filtercountrychina(movie) {
      return movie.Country == "CHINA (MAINLAND)";
     }


    var filteredMovieschina = data.filter(filtercountrychina);
    
    console.log(filteredMovieschina)
    
    
    function filtercountryUK(movie) {
      return movie.Country == "UNITED KINGDOM";
     }
    var filteredMoviesUK = data.filter(filtercountryUK);

    console.log(filteredMoviesUK)
    
    var traceusa = {
     x: filteredMoviesusa.map(row => row.Year),
     y: filteredMoviesusa.map(val => val.Total), 
     // text: data.map(row => row.Country),
     mode :"lines",
     name: "USA",
      line: {
        color: 'rgb(219,64,82)',
        width: 2
      }
    };
     console.log("after trace usa")
    var tracechina = {
      x: filteredMovieschina.map(row => row.Year),
      y: filteredMovieschina.map(val => val.Total), 
      // text: data.map(row => row.Country),
      mode :"lines",
     name: "China",
      line: {
        color: 'rgb(55,128,191)',
        width: 12
      }}
    
     var traceuk = {
      x: filteredMoviesUK.map(row => row.Year),
      y: filteredMoviesUK.map(val => val.Total), 
      // text: data.map(row => row.Country),
      mode :"lines",
     name: "UK",
      line: {
        color: 'rgb(128,0,128)',
        width: 12
      }}
    
     var data2 =[traceusa,tracechina, traceuk];
     
    var layout2 = {
     title: "Carbon emission by USA, China, United Kingdom",
    height: 600,
    width: 1000,
     xaxis: { title: "Year" },
    yaxis: { title: "Historical Carbon Emissions" },
    margin: {
            l: 250,
            r: 100,
            t: 75,
            b: 50},
    
     };
    
      Plotly.newPlot("bar", data2, layout2);
    
      //var GAUGE = document.getElementById("gauge");
     // Plotly.newPlot(GAUGE, data, layout);
    
    });
    
    }



 openingLine();
