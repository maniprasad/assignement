
var express  = require("express");        
var app   = express();  
var fs  = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();
var http = require('http');
var request = require("request");
const readline = require('readline');

var wordsMap = {};
 const file = fs.createWriteStream('files/file.txt');
 http.get('http://norvig.com/big.txt',   function(response) {
     response.pipe(file);
})

async function processLineByLine() {
    const fileStream = fs.createReadStream('files/file1.txt' , {encoding: 'utf8'});
      const rl =  readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });
    // Note: we use the crlfDelay option to recognize all instances of CR LF// ('\r\n') in input.txt as a single line break.
    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
     var newline  = [] ;
        newline = line.toString().split(' ');
      if( Array.isArray(newline)){ 
          newline.forEach(function (key) {
              if (wordsMap.hasOwnProperty(key)) {
              wordsMap[key]++;
              } else {
              wordsMap[key] = 1;
              }
          });
      }
    }
return sortObject(wordsMap) ;
  }
 
  var sortedArry;
  function sortObject(obj) {
      var arr = [];
      var prop;
      //push obj into array with condition check
      for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if(prop != ''){
              arr.push({
                  'prefix': prop,
                  'value':obj[prop]
              });
            }
          }
      }
       sortedArry =  arr.sort( function ( a, b ) { return b.value - a.value; } ).slice(0,10);
        console.log(sortedArry);
         return synonymsServiceCall(sortedArry); // returns array
    }
   setTimeout(() => {
    processLineByLine();
   }, 5000); 

    function synonymsServiceCall(words){
        for(var i=0 ; i<= words.length-1; i++){
            var word  = words[i].prefix;
            //console.log( word.);
            request.get('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf&lang=en-ru&text='+word , function(req , res){
             console.log(res.body);
             console.log('-------------------------------------------')
            })
        }
    }

var port = 8080; app.listen(port);