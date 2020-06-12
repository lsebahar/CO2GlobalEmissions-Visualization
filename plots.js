
var queryUrl = 'https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_csv_preview/data/92fa415e1bb56bdb1a85d212fbfe508b/fossil-fuel-co2-emissions-by-nation_csv_preview.json'

// Display the default plot
function init() {


  
d3.json(queryUrl, function (data) {
  
  function filteryear(movie) {
    return movie.Year = "2014";
  }
  
  
  var filteredyear = data.filter(filteryear);

  console.log(filteredyear)

  var trace1 = {
    x: filteredyear.Total,
    y: filteredyear.Country,
    text: filteredyear.Country,
    name: "co2 emiision by all countrys",
    type: "bar",
    orientation: "h"
  };




  var bardata = [trace1];
  
      //layout
      var layout1 = {
        title: "countries emission in 2014!",
        //height: 600,
    //width: 800,
        margin: {
          l: 75,
         r: 75,
          t: 75,
          b: 50
        }

     
      };
  
      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("gauge", bardata, layout1);
  


});

}




// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  



d3.json(queryUrl, function (data) {


  

   //for(var i=1 ; i < 17233 ; i++)
   //{  
     
    //var result = data[i]
  
   //var year1 = result.year; 
   //var country1 = result.Country;
   //var total1 = result.Total;

//var country1 = ["usa","uk",.....]

function filtercoutryusa(movie) {
  return movie.Country = "USA";
}


var filteredMovies = data.filter(filtercoutryusa);

function filtercoutrychina(movie) {
  return movie.Country = "China";
}


var filteredMovieschina = data.filter(filtercoutrychina);


// Use D3 to select the dropdown menu
var dropdownMenu = d3.select("#selDataset");
// Assign the value of the dropdown menu option to a variable
var dataset = dropdownMenu.property("value");


if (dataset === 'USA') {



var trace1 = {
  x: filteredMovies.map(row => row.Year),
  y: filteredMovies.map(val => val.Total),
  text: data.map(row => row.Country),
  type: "scatter",
  mode :"lines",
  name: "usa carbon emiision by all years",

  line: {
    color: "#17BECF"
  }

 // boxpoints: "all"
};


var data = [trace1];

}


if (dataset === 'CHINA') {
var trace2 = {
  x: filteredMovieschina.map(row => row.Year),
  y: filteredMovieschina.map(row => row.Total),
  text: filteredMovieschina.map(row => row.Country),
  name: "china carbon emissions by all years",
  type: "scatter",
  mode :"lines"
};

var data =[trace2];
}


// Define the plot layout
var layout = {
  title: "carbon emission by USA",
  xaxis: { title: "Year" },
  yaxis: { title: "total pollution co2 emission" },


  xaxis: {
    
    type: "year"
  },
  yaxis: {
    autorange: true,
    type: "linear"
  }

};

// Plot the chart to a div tag with id "plot"
Plotly.newPlot("bar", data, layout);

});


}

init();
 

