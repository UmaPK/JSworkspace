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
var arr=["Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia","China","Cyprus","Georgia","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan","Laos","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Burma","Nepal","North Korea","Oman","Pakistan","Palestine","Philippines","Qatar","Russia","Saudi Arabia","Singapore","South Korea","Sri Lanka","Syria","Taiwan","Tajikistan","Thailand","Timor-Leste","Turkey","Turkmenistan","United Arab Emirates","Uzbekistan","Vietnam","Yemen"];
var jArray=[];
var final_obj={};
var i=0,j=0,i1=0;
var Asian_Country = ["Arab World","East Asia & Pacific (all income levels)","East Asia & Pacific (developing only)","South Asia","Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei Darussalam","Cambodia","China","Georgia","Indonesia","Iran, Islamic Rep.","Iraq","Israel","Japan","Jordan","India"];
var urban=[];
var rural=[];
var pArray=[];
var Ans={};
for (i = 1; i < noOfRow-1; i++)
{
  var myNewLine=csv2array(arrayOne[i])[0];
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




// <---Asia--->

for (i = 1; i < noOfRow-1; i++)
{
for (j = 0; j< noOfCol; j++)
{
    var myNewLine=arrayOne[i].split(',');
};
if(Asian_Country.indexOf(myNewLine[cnt_countryname]) != -1 && (myNewLine[cnt_indicatorname] == 'Urban population (% of total)' || myNewLine[cnt_indicatorname] == 'Rural population (% of total population)'))
{
  final_obj[header[cnt_countryname]]=myNewLine[cnt_countryname];
  final_obj[header[cnt_indicatorname]]=myNewLine[cnt_indicatorname];
  final_obj[header[cnt_value]]=myNewLine[cnt_value];
  final_obj[header[cnt_year]]=myNewLine[cnt_year];
  jArray.push(final_obj);
  jArray.sort(function(a,b)
  {
       return a['Year']-b['Year'];
  })
}
final_obj={};
};
var p=0;
var year_count = 1960;
while(year_count <= 1980)
{
var total_values_ur=0;
var total_values_ru=0;
for(a=0;a<jArray.length;a++)
{
  if(jArray[a].Year == year_count && jArray[a].IndicatorName == "Urban population (% of total)")
  {
    total_values_ur = total_values_ur+parseFloat(jArray[a].Value);
  }
  if(jArray[a].Year == year_count && jArray[a].IndicatorName == "Rural population (% of total population)")
  {
    total_values_ru = total_values_ru+parseFloat(jArray[a].Value);
  }
}
urban[p] = total_values_ur;
rural[p] = total_values_ru;
year_count++;
p++;
}
var final_year=1960;
for(var u=0;u<p;u++)
{
  // Ans['Total Value'] = urban[u]+rural[u];
  // Ans['Urban'] = urban[u];
  Ans['IndicatorName']="Rural";
  Ans['Value'] = rural[u];
  Ans['Year'] = final_year;
  final_year++;
  pArray.push(Ans);
  Ans={};
}
var final_year=1960;
for(var u=0;u<p;u++)
{
  // Ans['Total Value'] = urban[u]+rural[u];
  Ans['IndicatorName']="Urban";
  Ans['Value'] = urban[u];
  // Ans['Rural'] = rural[u];
  Ans['Year'] = final_year;
  final_year++;
  pArray.push(Ans);
  Ans={};
}
// console.log("=== Data For Asian Country ===\n");
 console.log(pArray);
// console.log("=== Data For Asian Country Ends Here ===\n\n");
//Write
var file = 'Asia.json';
// console.log("Printignn final object",);
var obj = JSON.stringify(pArray);
fs.writeFileSync(file, obj);
