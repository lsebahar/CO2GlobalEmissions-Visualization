
var queryUrl = 'https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_csv_preview/data/92fa415e1bb56bdb1a85d212fbfe508b/fossil-fuel-co2-emissions-by-nation_csv_preview.json'

var message, x;
message = document.getElementById("map");
//message.innerHTML = "";

d3.json(queryUrl, function (error, data) {

  for(var i=1 ; i < 5 ; i++)
  {  var result = data[i]
      console.log(result.Country)
      console.log(result.Total)
      console.log(result.Year)
  }    
});

