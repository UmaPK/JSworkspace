var fs = require("fs");
// Asynchronous read
fs.readFile('Indicators.csv', function (err, data) {
  if (err) {
      return console.error(err);
  }
 var jsonObj = [];
 bufferString=data.toString();
 arr = bufferString.split('\n');
 var headers = arr[0].split(',');
 headers[headers.length-1]=headers[headers.length-1].trim();
 for(var i = 1; i <arr.length-1; i++)
 {
   var data1 = arr[i].split(',');
   var obj = {};
   for(var j = 0; j <data1.length; j++)
   {
          obj[headers[j]] = data1[j].trim();
   }
  //  if(obj.CountryCode=="IND")
  //  if((obj.IndicatorName=="Urban population (% of total)")||(obj.IndicatorName=="Rural population"))
   jsonObj.push(obj);
 }
 JSON.stringify(jsonObj);
 console.log(jsonObj);
});
