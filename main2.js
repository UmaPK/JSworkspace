var fs = require("fs");
var data = fs.readFileSync('Indicators.csv');
var stringData=data.toString();
var arrayOne= stringData.split('\r\n');
var header=arrayOne[0].split(',');
var cnt_countryname,cnt_indicatorname,cnt_year,cnt_value;
cnt_countryname = header.indexOf('CountryName');
cnt_indicatorname = header.indexOf('IndicatorName');
cnt_year = header.indexOf('Year');
cnt_value = header.indexOf('Value');
var noOfRow = arrayOne.length;
var noOfCol = header.length;
var csv2array=require('csv2array');
//var arr=["India"];
var arr=["Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia","China","Cyprus","Georgia","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan","Laos","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Burma","Nepal","North Korea","Oman","Pakistan","Palestine","Philippines","Qatar","Russia","Saudi Arabia","Singapore","South Korea","Sri Lanka","Syria","Taiwan","Tajikistan","Thailand","Timor-Leste","Turkey","Turkmenistan","United Arab Emirates","Uzbekistan","Vietnam","Yemen"];
var jArray=[];
var final_obj={};
var i=0,j=0,i1=0;
for (i = 1; i < noOfRow-1; i++)
{
  // for (j = 0; j< noOfCol; j++)
  // {
      var myNewLine=csv2array(arrayOne[i])[0];
  // };
  if((myNewLine[cnt_countryname] == 'India') && (myNewLine[cnt_indicatorname] == 'Urban population (% of total)' || myNewLine[cnt_indicatorname] == 'Rural population (% of total population)'))
  {
    final_obj[header[cnt_countryname]]=myNewLine[cnt_countryname];
    final_obj[header[cnt_indicatorname]]=myNewLine[cnt_indicatorname];
    final_obj[header[cnt_value]]=myNewLine[cnt_value];
    final_obj[header[cnt_year]]=myNewLine[cnt_year];
    jArray.push(final_obj);
  }
  final_obj={};
};
 console.log( jArray);
//Write
var file = 'India.json';
var obj = JSON.stringify(jArray);
fs.writeFileSync(file, obj);



//Asia
var csv2array=require('csv2array');
var jArray=[];
var final_obj={};
var i=0,j=0;
for (i = 1; i < noOfRow-1; i++)
{
    var myNewLine=csv2array(arrayOne[i])[0];
  // for (j = 0; j< noOfCol; j++)
  // {
  // if((myNewLine[cnt_countryname] == 'Arab World' || myNewLine[cnt_countryname] == 'East Asia & Pacific (all income levels)' || myNewLine[cnt_countryname] == 'East Asia & Pacific (developing only)' || myNewLine[cnt_countryname] == '') && (myNewLine[cnt_indicatorname] == 'Urban population (% of total)' || myNewLine[cnt_indicatorname] == 'Rural population (% of total population)'))
for(i1=0;i1<arr.length-1;i1++)
{
   if((arr[i1] == myNewLine[cnt_countryname])&& (myNewLine[cnt_indicatorname] == 'Urban population (% of total)' || myNewLine[cnt_indicatorname] == 'Rural population (% of total population)'))
   {
       final_obj[header[cnt_countryname]]=myNewLine[cnt_countryname];
       final_obj[header[cnt_indicatorname]]=myNewLine[cnt_indicatorname];
       final_obj[header[cnt_year]]=myNewLine[cnt_year];
       final_obj[header[cnt_value]]=myNewLine[cnt_value];
       jArray.push(final_obj);
   }
}
// };
  final_obj={};
};
console.log( jArray);

//Write
var file = 'India1.json';
// console.log("Printignn final object",);
var obj = JSON.stringify(jArray);
fs.writeFileSync(file, obj);
// var value=[];
// var y=[1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979];
// for(i=0;i<obj.length-1;i++)
// {
//   if(y[i]==obj.Year)
//   {
//     if(obj[cnt_indicatorname] == 'Urban population (% of total)')
//     {
//       value[i]=value[i]+obj[Value];
//     }
//     else if(obj[cnt_indicatorname] == 'Rural population (% of total population)')
//     {
//         value[i]=value[i]+obj[Value];
//     }
//   }
// }
// console.log(value);
