import * as fs from "fs";
import { process } from "./process";

const filePath = "documents/test_files/";
const fileName = "test2";
const finalPath = "".concat(filePath, fileName, ".txt");

// Display elements
export function output() {
  let data = process(parse());
  console.log('starting output')
  document.getElementById("app").innerHTML =
  "<h2> " +    data.states +    "</h2>" +
  "<h2> " +    data.tuples +    "</h2>" +
  "<h2> " +    data.transitions +    "</h2>" +
  "<h2> " +    data.initial +    "</h2>" +
  "<h2> " +    data.ctl +    "</h2>";
}



export function parse() {
  // Read document
  console.log('starting parsing')
  let fs = require("fs");
  let text = fs.readFileSync(finalPath, "utf-8");
  // Put content in table
  let textByLine = text.split("\r\n");
  textByLine.forEach(function callback(value, index, object) {
    if (value.match(/^S:|^L:|^T:|^I:|^CTL/)) {
      object.splice(index, 1); //removes indicators
    }
  });
  return textByLine;
}
