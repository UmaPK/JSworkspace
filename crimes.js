var fs=require('fs');
var readline=require('readline');
var csv2array=require('csv2array');
var rInterface=readline.createInterface({input:fs.createReadStream('smallfile.csv')});
// File has been opened
var crime={};
var lno=0,i=0,line;
var data,header,descr_ind,primary_ind,year_ind;

//declaration part
rInterface.on('close',function()
{
  crime=JSON.stringify(crime);
  fs.writeFile('Part1.json',crime);
});
rInterface.on('line',function(row)
{
  if(lno==0)
  {
    data=csv2array(row);
    header=data[0];
    for(i=0;i<header.length;i++)
    {
        if(header[i]=='Description')
          descr_ind=i;
        if(header[i]=='Primary Type')
          primary_ind=i;
        if(header[i]=='Year')
          year_ind=i;
    }
  }
  else
  {
    data=csv2array(row);
    line=data[0];

    if((line[primary_ind]=="THEFT")&&(line[descr_ind]=="OVER $500" || line[descr_ind]=="$500 AND UNDER"))
    {
          if(crime[line[year_ind]]!=undefined){
            if(crime[line[year_ind]][line[descr_ind]]==undefined)
              crime[line[year_ind]][line[descr_ind]]=0;
            crime[line[year_ind]][line[descr_ind]]++;
          }
          else
            crime[line[year_ind]]={};
    }
  }
  lno=lno+1;
});
