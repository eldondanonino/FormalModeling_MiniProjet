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
const fileName = "test2";
const finalPath = "".concat(filePath, fileName, ".txt");

// Display elements
export function output(data) {
  // console.log(data);
  document.getElementById("app").innerHTML =
    "<h2> " +    data.states +    "</h2>" +
    "<h2> " +    data.tuples +    "</h2>" +
    "<h2> " +    data.transitions +    "</h2>" +
    "<h2> " +    data.initial +    "</h2>" +
    "<h2> " +    data.ctl +    "</h2>";
}

export function process(input) {
  let states = input[0].replace(/{|}/g, "").split(",");
  console.log("States: ");
  console.log(states);

  let tuples = input[1].replace(/\)|{|}/g, "").split("(");
  tuples.filter(function (e) {
    return e;
  });
  tuples.forEach(function pairs(value, index, object) {
    object[index] = object[index].split(",");
    object[index] = object[index].filter(function (e) {
      return e;
    });
  });
  tuples.shift();
  console.log("tuples: ");
  console.log(tuples);

  let transitions = input[2].replace(/\),|\)|{|}/g, "").split("(");
  transitions.forEach(function pairs(value, index, object) {
    object[index] = object[index].split(",");
  });
  transitions.shift();
  console.log("transitions: ");
  console.log(transitions);

  let initial_state = input[3].replace(/{|}/g, "");

  console.log("initial state: ");
  console.log(initial_state);

  let ctl = input[4];
  console.log("ctl: ");
  console.log(ctl);
  return(
    {
      states: states,
      tuples: tuples,
      transitions : transitions,
      initial : initial_state,
      ctl : ctl
    }
  )
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
