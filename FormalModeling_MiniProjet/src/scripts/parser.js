/* //TODO
1. detect KRP 
2. put the four elements in four objects
3. cut states object into array of objects Sates 
4. detect ctl 
???
*/

/* // TODO
Create classes
1. Label
2. Transition
*/

// Detect end of line (\n or \r\n)
// ignore empty lines
// put each line in table
// parse
// profit

const filePath = "../../documents/test_files/test1.txt";

function readTextFile(myFile) {
  var rawFile = new XMLHttpRequest();

  rawFile.open("GET", myFile, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
      document.getElementById("textSection").innerHTML = allText;
    }
  };
  rawFile.send();
}

// Display elements
function output() {
  
}

function parse() {
  // Read document
  var fs = require("fs");
  fs.readFile(filePath, function(text){
      var textByLine = text.split("\n")
  });

  // Put content in table

  // Display
  document.getElementById("app").innerHTML = "put";
}

parse();
