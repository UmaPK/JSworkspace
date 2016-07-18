var fs = require("fs");
var jsonObj = [];
var jsonObj1 = [];
var arr=["Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia","China","Cyprus","Georgia","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan","Laos","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Burma","Nepal","North Korea","Oman","Pakistan","Palestine","Philippines","Qatar","Russia","Saudi Arabia","Singapore","South Korea","Sri Lanka","Syria","Taiwan","Tajikistan","Thailand","Timor-Leste","Turkey","Turkmenistan","United Arab Emirates","Uzbekistan","Vietnam","Yemen"];
// var jf = require("jsonfile");
// Asynchronous read
fs.readFile('Indicators.csv', function (err, data) {
   if (err) {
       return console.error(err);
   }

  bufferString=data.toString();
  arr = bufferString.split('\n');
  var headers = arr[0].split(',');
  var i1=0;
  headers[headers.length-1]=headers[headers.length-1].trim();
  for(var i = 1; i <arr.length-1; i++)
  {
    var data1 = arr[i].split(',');
    var obj = {};
    var obj1={};
    obj1.Year=0;
    obj1.Value=0;
    var obj2={};
    obj2.Year=0;
    obj2.Value=0;
    for(var j = 0; j <data1.length; j++)
    {
           obj[headers[j]] = data1[j].trim();
    }
      if(obj.CountryCode=="IND")
        if((obj.IndicatorName=="Urban population (% of total)")||(obj.IndicatorName=="Rural population"))
        {
          obj1.Year=obj.Year;
          obj1.Value=obj.Value;
          jsonObj.push(obj1);
        }


        //asia
     for(i1=0;i1<arr.length-1;i1++)
     {
       if(obj.CountryName == arr[i1])
        if(obj.IndicatorName == 'Urban population (% of total)' || obj.IndicatorName == 'Rural population (% of total population)')
          {
            obj2.Year=obj.Year;
            obj2.Value=obj.Value;
            jsonObj1.push(obj2);
          }
      }
//for
   }
  JSON.stringify(jsonObj);
// /  console.log(jsonObj);
  obj=JSON.stringify(jsonObj);
  fs.writeFile('my1.json',obj);
  console.log(obj.length-1);
});
