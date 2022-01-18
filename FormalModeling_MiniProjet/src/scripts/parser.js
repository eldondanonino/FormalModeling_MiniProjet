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
import * as fs from "fs";

const filePath = "documents/test_files/";
const fileName = "test1";
const finalPath = "".concat(filePath, fileName, ".txt");

// Display elements
export function output(textByLine) {
  console.log(textByLine);

  textByLine.forEach(function callback(value, index, object) {
    if (value.match(/^KRP|^S:|^L:|^T:|^I:|^CTL/)) {
      object.splice(index, 1); //removes indicators
    }
  });
  console.log(textByLine);
  document.getElementById("app").innerHTML = "<h1> " + textByLine + "</h1>";
}

//parse();
export function parse() {
  // Read document
  let fs = require("fs");
  let text = fs.readFileSync(finalPath, "utf-8");
  // Put content in table
  let textByLine = text.split("\r\n");

  return textByLine;
}
