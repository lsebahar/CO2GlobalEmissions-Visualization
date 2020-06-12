
var queryUrl = 'https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_json/data/2b4874bb29c461a614e92773956ad573/fossil-fuel-co2-emissions-by-nation_json.json'

var countryValue = d3.select("selDataset");
var typeValue = d3.select("emissiontype");

// Display the default plot

// is this needed? Displays all names in drop down
// d3.json(queryUrl).then(function(data){
  
    
//   var names = data.names;
//   names.forEach((name, i) => {
//       var menuSelection = menuValue.append("option");
//       menuSelection.text(name);
//       menuSelection.attr("value",`${i}`)});
//  });

// Make year a value, not string
// sort values
// 1 '=' sets year to zero, 2 is for match, 3 is for type

function OpeningBar() {
  d3.json(queryUrl).then(function(data){
    console.log(data.country);
    function filteryear(movie) {
      return movie.Year == 2014;}

    function filtertotal(num) {
      return num.Total > 50000;}

    var filteredyear = data.filter(filteryear).filter(filtertotal);
    var sData = filteredyear.slice().sort((a,b) => d3.ascending(a.Total, b.Total));
    console.log(sData);
    var chartValues = sData.map(x => x.Total);
    var countriesList = sData.map(x => x.Country);
      var reversedValues = chartValues.reverse();
      console.log(reversedValues);

      var yLabels = countriesList.reverse();

      
      var trace = {
          x: reversedValues,
          y: yLabels,
          type: "bar",
          orientation: 'h',
          text: yLabels
          
      };

      traceData = [trace];

      var layout = {
          autosize: true,
          title: "2014 Total Emissions by Country",
          xaxis: { title: "CO2 Emissions in Metric Tons (Thousands)"},
          yaxis: { title: "Country"}
      };

      Plotly.newPlot("bar", traceData,layout)})};

OpeningBar();

// Making bar chart interactive
function CreateBar() {
  d3.json("queryUrl").then(function(data){
    var typeSelection = typeValue.property("value");

    function filteryear(movie) {
      return movie.Year == 2014;}

    function filtertotal(num) {
      return num.Total > 50000;}

    var filteredyear = data.filter(filteryear).filter(filtertotal);
    var sData = filteredyear.slice().sort((a,b) => d3.ascending(a.Total, b.Total));

    var countriesList = sData.map(x => x.Country);
    
    if (typeSelection == "Total") {
      var typeValues = sData.map(x => x.Total);
    } else if (typeSelection == "Solid Fuel") {
      var typeValues = sData.map(x => x.myTextOptions["Solid Fuel"]);
    } else if (typeSelection == "Liquid Fuel") {
      var typeValues = sData.map(x => x.myTextOptions["Liquid Fuel"]);
    } else if (typeSelection == "Gas Fuel") {
      var typeValues = sData.map(x => x.myTextOptions["Gas Fuel"]);
    } else if (typeSelection == "Cement") {
      var typeValues = sData.map(x => x.Cement);
    } else if (typeSelection == "Gas Flaring") {
      var typeValues = sData.map(x => x.myTextOptions["Gas Flaring"]);
    } else {
      var typeValues = sData.map(x => x.myTextOptions["Per Capital"])
    };
    
    var reversedValues = typeValues.reverse();

    var yLabels = countriesList.reverse();

      
    var trace = {
      x: reversedValues,
      y: yLabels,
      type: "bar",
      orientation: 'h',
      text: yLabels
          
      };

      traceData = [trace];

      var layout = {
          autosize: true,
          title: "2014 Total Emissions by Country",
          xaxis: { title: "CO2 Emissions in Metric Tons (Thousands"},
          yaxis: { title: "Country"}
      };

      Plotly.newPlot("bar", traceData,layout)
  })
};

function updateCharts() {
  CreateBar();
};

d3.selectAll("emissiontype").on("change", updateCharts);


// Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
  



// d3.json(queryUrl, function (data) {


  

//    //for(var i=1 ; i < 17233 ; i++)
//    //{  
     
//     //var result = data[i]
  
//    //var year1 = result.year; 
//    //var country1 = result.Country;
//    //var total1 = result.Total;

// //var country1 = ["usa","uk",.....]

// function filtercoutryusa(movie) {
//   return movie.Country = "USA";
// }


// var filteredMovies = data.filter(filtercoutryusa);

// function filtercoutrychina(movie) {
//   return movie.Country = "China";
// }


// var filteredMovieschina = data.filter(filtercoutrychina);


// // Use D3 to select the dropdown menu
// var dropdownMenu = d3.select("#selDataset");
// // Assign the value of the dropdown menu option to a variable
// var dataset = dropdownMenu.property("value");


// var dropdownMenu = d3.select("#emissiontype");
// // Assign the value of the dropdown menu option to a variable
// var dataset2 = dropdownMenu.property("value");

// if (dataset === "USA"  ) {



// var trace1 = {
//   x: filteredMovies.map(row => row.Year),
//   y: filteredMovies.map(val => val.SolidFuel),
//   text: data.map(row => row.Country),
//   type: "scatter",
//   mode :"lines",
//   name: "usa carbon emiision by all years",

//   line: {
//     color: "#17BECF"
//   }

//  // boxpoints: "all"
// };


// var data = [trace1];

// }


// if (dataset === 'CHINA') {
// var trace2 = {
//   x: filteredMovieschina.map(row => row.Year),
//   y: filteredMovieschina.map(row => row.Total),
//   text: filteredMovieschina.map(row => row.Country),
//   name: "china carbon emissions by all years",
//   type: "scatter",
//   mode :"lines"
// };

// var data =[trace2];
// }


// // Define the plot layout
// var layout = {
//   title: "carbon emission by USA",
//   xaxis: { title: "Year" },
//   yaxis: { title: "total pollution co2 emission" },


//   xaxis: {
    
//     type: "year"
//   },
//   yaxis: {
//     autorange: true,
//     type: "linear"
//   }

// };

// // Plot the chart to a div tag with id "plot"
// Plotly.newPlot("bar", data, layout);

// });


// }

// init();
 



// function init() {
  
// //   d3.json(queryUrl, function (data) {
  
// function filteryear(movie) {
// return movie.Year = "2014";
// }
  
  
// var filteredyear = data.filter(filteryear);
  
//   console.log(filteredyear)
  
//   var 

//   var trace1 = {
//     x: filteredyear.map(row => row.Total),
//     y: filteredyear.map(row => row.Country),
//     text: filteredyear.map(row => row.Country),
//     name: "co2 emiision by all countrys",
//     type: "bar",
//     orientation: "h"
//   };

//   var bardata = [trace1];
  
//   var layout1 = {
//         title: "countries emission in 2014!",
//         height: 800,
//        width: 1200,
//         margin: {
//           l: 75,
//          r: 75,
//           t: 75,
//           b: 50
//         }
//       }

//        // Render the plot to the div tag with id "bar"
//       Plotly.newPlot("gauge", bardata, layout1);
//       });
// }