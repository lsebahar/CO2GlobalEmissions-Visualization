

// NEW, full query URL. Previous version was just a sample of the dataset
var queryUrl = 'https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_json/data/2b4874bb29c461a614e92773956ad573/fossil-fuel-co2-emissions-by-nation_json.json'

// Should be the drop down form
var countryValue = d3.select("#selDataset");
var typeValue = d3.select("#emissiontype");

// Display the default plot

// is this needed? Displays all names in drop down
// d3.json(queryUrl).then(function(data){
  
// 1 '=' sets year to zero, 2 is for match, 3 is for type

// This is the inital Bar chart
function OpeningBar() {
  d3.json(queryUrl).then(function(data){

    // Console log to check that data is pulling
    console.log(data.country);
    function filteryear(movie) {
      // Using == operator condition to filter year
      return movie.Year == 2014;}

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
          autosize: true,
          title: "2014 Total Emissions by Country",
          xaxis: { title: "CO2 Emissions in Metric Tons (Thousands)"},
          yaxis: { title: "Country"}
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
      

     //console.log(Object.keys(sData[0]));

     //console.log(typeSelection);

    // This tells JS to use the column the users selects (not working)
    if (typeSelection == "Total") {
      var typeValues = (sData.map(x => x.Total));
    } else if (typeSelection == "Solid Fuel") {
      //var typeValues = (sData.map(x => x.myTextOptions["Solid Fuel"]));
     
      //var solidkey = Object.keys("Solid Fuel");
      //var typeValues = solidkey.values();

       //var demoKeys = Object.keys(sData[0]);
      //var typeValues = Object.values(sData[7]);
     
      // loop over values
        // for  (let value of demoKeys) {
   
           

     var typeValues = [];

     sData.forEach((recipe) => {
 
      
      //console.log( recipe["Solid Fuel"]);
     

      // Iterate through each key and value
     Object.entries(recipe).forEach(([key, value]) => {
    
        // Use the key to determine which array to push the value to

        //console.log(Object.keys(recipe));
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
          autosize: true,
          title: "2014 Total Emissions by Country",
          xaxis: { title: "CO2 Emissions in Metric Tons (Thousands)"},
          yaxis: { title: "Country"}
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



function buildPlot() {
d3.json(queryUrl, function (data) {

function filtercoutryusa(movie) {

  return movie.Country = "USA";
}

var filteredMovies = data.filter(filtercoutryusa);

function filtercoutrychina(movie) {
  return movie.Country = "China";
 }


var filteredMovieschina = data.filter(filtercoutrychina);


var trace1 = {
 x: filteredMovies.map(row => row.Year),
 y: filteredMovies.map(val => val.SolidFuel),
 text: data.map(row => row.Country),
 type: "line",
 mode :"lines",
 name: "usa carbon emiision by all years",

 line: {
  color: "#17BECF"
}

// boxpoints: "all"
 };

var trace2 = {
 x: filteredMovieschina.map(row => row.Year),
 y: filteredMovieschina.map(row => row.Total),
 text: filteredMovieschina.map(row => row.Country),
name: "china carbon emissions by all years",
 type: "bar",
 mode :"lines"
 };

 var data =[trace1,trace2];
 
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

 Plotly.newPlot("#gauge", data, layout);





});

}

buildPlot();
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

