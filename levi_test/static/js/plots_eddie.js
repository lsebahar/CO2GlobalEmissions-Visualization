

// NEW, full query URL. Previous version was just a sample of the dataset
//var queryUrl = 'https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_json/data/2b4874bb29c461a614e92773956ad573/fossil-fuel-co2-emissions-by-nation_json.json'

var queryUrl=  "http://127.0.0.1:5000/mongo-data";
var countryValue = d3.select("#selDataset");
var typeValue = d3.select("#emissiontype");




function OpeningBar() {
  d3.json(queryUrl,function(data){

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

function OpeningBar2() {
  d3.json(queryUrl,function(data){

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

OpeningBar2();

// Making bar chart interactive
function CreateBar() {
  d3.json(queryUrl,function(data){
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





function openingLine() {
d3.json(queryUrl, function (data) {

<<<<<<< HEAD
  //console.log(hi);
=======
  
>>>>>>> ddd4f4b581658fe23345b96a85e81bf66d0c4e72

function filtercountryusa(movie) {
  return movie.Country == "UNITED STATES OF AMERICA";
}
var filteredMoviesusa = data.filter(filtercountryusa);

<<<<<<< HEAD
//console.log(hi);


=======
>>>>>>> ddd4f4b581658fe23345b96a85e81bf66d0c4e72
function filtercountrychina(movie) {
  return movie.Country == "CHINA (MAINLAND)";
 }
var filteredMovieschina = data.filter(filtercountrychina);

<<<<<<< HEAD
//console.log(hi);
=======
console.log(filteredMovieschina)
console.log(filteredMoviesusa)

>>>>>>> ddd4f4b581658fe23345b96a85e81bf66d0c4e72



function filtercountryUK(movie) {
  return movie.Country == "UNITED KINGDOM";
 }
var filteredMoviesUK = data.filter(filtercountryUK);

console.log(filteredMoviesUK)

var traceusa = {
 x: filteredMoviesusa.map(row => row.Year),
 y: filteredMoviesusa.map(val => val.Total), 
 // text: data.map(row => row.Country),
 mode :"line",
 name: "USA",
  line: {
    color: 'rgb(219,64,82)',
    width: 4
  }
};
 
var tracechina = {
  x: filteredMovieschina.map(row => row.Year),
  y: filteredMovieschina.map(val => val.Total), 
  // text: data.map(row => row.Country),
  mode :"lines",
 name: "China",
  line: {
    color: 'rgb(55,128,191)',
    width: 6
  }}

 var traceuk = {
  x: filteredMoviesUK.map(row => row.Year),
  y: filteredMoviesUK.map(val => val.Total), 
  // text: data.map(row => row.Country),
  mode :"lines",
 name: "UK",
  line: {
    color: 'rgb(128,0,128)',
    width: 5
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

  Plotly.newPlot("bubble", data2, layout2);

  //var GAUGE = document.getElementById("gauge");
 // Plotly.newPlot(GAUGE, data, layout);

});

}

openingLine();

// Create a function to run all 3 functions we previously set up to up date charts based on user selection.

function callAll() {
  CreateBar();
  openingLine();
};

// Create the event listener to listen for a change in the drop down of IDs

d3.selectAll("#emissiontype").on("change", callAll);

