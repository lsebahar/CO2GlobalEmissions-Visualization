

// NEW, full query URL. Previous version was just a sample of the dataset
var queryUrl = 'https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_json/data/2b4874bb29c461a614e92773956ad573/fossil-fuel-co2-emissions-by-nation_json.json'

// Should be the drop down form
var countryValue = d3.select("#selDataset");
var typeValue = d3.select("#emissiontype");

openingLine();


function OpeningBar() {
  d3.json(queryUrl).then(function(data){

    // Console log to check that data is pulling
    console.log(data.country);
    function filteryear(choice) {
      // Using == operator condition to filter year
      return choice.Year == 2014;}

    // Filtering by total to have more manageable dataset (website does this too)
      function filtertotal(num) {
      return num.Total > 50000;}

    // Using both filter functions here
    var filteredyear = data.filter(filteryear).filter(filtertotal);
    
    // Orders the data from lowest to highest
    var sData = filteredyear.slice().sort((a,b) => d3.ascending(a.Total, b.Total));
    console.log(sData);
    
    // Collecting Values for X axis
    var chartValues = sData.map(x => x.Total);
    
    // Collecting Country names for Y Axis
    var countriesList = sData.map(x => x.Country);
      
    // Reversing values to get ascending order
    var reversedValues = chartValues.reverse();
    var yLabels = countriesList.reverse();

    // Console log to check reversal works
    //console.log(reversedValues);

  
    var trace = {
      x: reversedValues,
      y: yLabels,
      type: "bar",

      // Don't forget horizontal orientation!
      orientation: 'h',
      text: yLabels
          
      };

      traceData = [trace];

    var layout = {
        height: 600,
        width: 1000,
         //autosize: true,
        title: "2014 Total Emissions by Country",
        xaxis: { title: "CO2 Emissions in Metric Tons (Thousands)"},
        bargap:0.1,
        margin: {
                     l: 250,
                    r: 100,
                     t: 75,
                     b: 50}
      };

      Plotly.newPlot("bar", traceData,layout)})};

OpeningBar();

// Making bar chart interactive
function CreateBar() {
  d3.json(queryUrl).then(function(data){
    var typeSelection = typeValue.property("value");

    function filteryear(movie) {
      return movie.Year == 2014;}

    function filtertotal(num) {
      return num.Total > 50000;}

    var filteredyear = data.filter(filteryear).filter(filtertotal);
    var sData = filteredyear.slice().sort((a,b) => d3.ascending(a.Total, b.Total));
    
    var countriesList = sData.map(x => x.Country);

      console.log(sData)
  
    // This tells JS to use the column the users selects
    if (typeSelection == "Total") {
      var typeValues = (sData.map(x => x.Total));
    } else if (typeSelection == "Solid Fuel") {
   
           

     var typeValues = [];

     sData.forEach((recipe) => {
 
      
      //console.log( recipe["Solid Fuel"]);
     

      // Iterate through each key and value
     Object.entries(recipe).forEach(([key, value]) => {
    
        // Use the key to determine which array to push the value to

        if (key == "Solid Fuel" ){

         
         typeValues.push(value)
      }
        
       });
       
    });

    } else if (typeSelection ==="Liquid Fuel") {
     
      var typeValues = [];

     sData.forEach((recipe) => {
 
      
     Object.entries(recipe).forEach(([key, value]) => {
    
      
        if (key == "Liquid Fuel" ){

         
         typeValues.push(value)
      }
        
       });
       
    });
    


      
    } else if (typeSelection == "Gas Fuel") {

      var typeValues = [];
      sData.forEach((recipe) => {
      Object.entries(recipe).forEach(([key, value]) => {
       if (key == "Gas Fuel" ){
          typeValues.push(value)
       }
         
        });
        
     });

      
    } else if (typeSelection == "Cement") {
      var typeValues = (sData.map(x => x.Cement));
    } else if (typeSelection == "Gas Flaring") {

      var typeValues = [];

      sData.forEach((recipe) => {
  
       
      Object.entries(recipe).forEach(([key, value]) => {
     
       
         if (key == "Gas Flaring" ){
 
          
          typeValues.push(value)
       }
         
        });
        
     });
     



      
    } else if(typeSelection == "Per Capita") {
      var typeValues = [];

     sData.forEach((recipe) => {
 
      
     Object.entries(recipe).forEach(([key, value]) => {
    
        if (key == "Per Capita" ){

         
         typeValues.push(value)
      }
        
       });
       
    });
    
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
        height: 600,
        width: 1000,
          //autosize: true,
          title: "2014 Total Emissions by Country",
          xaxis: { title: "CO2 Emissions (Thousands of Metric Tons)"},
          bargap:0.1,
          margin: {
            l: 250,
            r: 100,
            t: 75,
            b: 50},
      };

      Plotly.newPlot("bar", traceData,layout)
  })
};

// Function to update all charts
function updateCharts() {
  CreateBar();
};

// Event listener (not working)
d3.selectAll("#emissiontype").on("change", CreateBar);



function openingLine() {


  d3.json(queryUrl, function (data) {

  console.log(hi);

function filtercountryusa(movie) {
  return movie.Country = "USA";
}
var filteredMoviesusa = data.filter(filtercountryusa);

console.log(hi);


function filtercountrychina(movie) {
  return movie.Country = "China";
 }
var filteredMovieschina = data.filter(filtercountrychina);

console.log(hi);



function filtercountryUK(movie) {
  return movie.Country = "United Kingdom";
 }
var filteredMoviesUK = data.filter(filtercountryUK);

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
  x: filteredMoviechina.map(row => row.Year),
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

  Plotly.newPlot("linechart", data2, layout2);

  //var GAUGE = document.getElementById("gauge");
 // Plotly.newPlot(GAUGE, data, layout);

});

}


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

