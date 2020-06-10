
var queryUrl = 'https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_csv_preview/data/92fa415e1bb56bdb1a85d212fbfe508b/fossil-fuel-co2-emissions-by-nation_csv_preview.json'

var message, x;
message = document.getElementById("map");
//message.innerHTML = "";






d3.json(queryUrl, function (error, data) {


    try {

   for(var i=1 ; i < 9 ; i++)
   {  var result = data[i]
  for(var i=1 ; i < 2000 ; i++)

  {
   var d = result.Year;
    
   
   console.log(d)
   };

  }

 

}

catch (error) {
    // statements to handle any exceptions
    message.innerHTML = "Input is " + error; // pass exception object to error handler
  }
    

});

