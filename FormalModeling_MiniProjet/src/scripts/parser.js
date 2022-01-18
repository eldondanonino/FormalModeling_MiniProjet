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
export function output(data) {
  // console.log(data);
  document.getElementById("app").innerHTML =
    "<h1> " +
    data[0] +
    "</h1><br/>" +
    "<h1> " +
    data[1] +
    "</h1><br/>" +
    "<h1> " +
    data[2] +
    "</h1><br/>" +
    "<h1> " +
    data[3] +
    "</h1><br/>" +
    "<h1> " +
    data[4] +
    "</h1><br/>";
}

export function process(input) {
  let states = input[0].replace(/{|}/g, "").split(",");
  console.log("States: " + states);

  let tuples = input[1].replace(/\)|{|}/g, "").split("(");
  tuples.filter(function(e){return e});
  tuples.forEach(function pairs(value, index, object) {
    object[index] = object[index].split(',');
    object[index] = object[index].filter(function(e){return e});
  });
  tuples.shift();
  console.log("tuples: ");
  console.log(tuples);
}

//parse();
export function parse() {
  // Read document
  let fs = require("fs");
  let text = fs.readFileSync(finalPath, "utf-8");
  // Put content in table
  let textByLine = text.split("\r\n");
  textByLine.forEach(function callback(value, index, object) {
    if (value.match(/^KRP|^S:|^L:|^T:|^I:|^CTL/)) {
      object.splice(index, 1); //removes indicators
    }
  });
  const elements = textByLine[0];
  const values_tuples = textByLine[1];
  const transitions = textByLine[2];
  const initial_state = textByLine[3];
  const ctl = textByLine[4];
  process(textByLine);
  return textByLine;
}
