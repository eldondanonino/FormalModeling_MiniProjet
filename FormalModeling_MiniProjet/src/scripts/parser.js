import * as fs from "fs";
import { process } from "./process";

const filePath = "documents/test_files/";
// const fileName = "test2";

// Display elements
export function output(fileName) {
  let data = process(parse(fileName));

  console.log("starting output");
  document.getElementById("app").innerHTML =
    "<h2> " +
    data.states +
    "</h2>" +
    "<h2> " +
    data.tuples +
    "</h2>" +
    "<h2> " +
    data.transitions +
    "</h2>" +
    "<h2> " +
    data.initial +
    "</h2>" +
    "<h2> " +
    data.ctl +
    "</h2>";
}

export function parse(fileName) {
  // const finalPath = "".concat(filePath, fileName, ".txt");

  // Read document
  console.log("starting parsing");

  let fs = require("fs");
  let text = "";

  // Sorry for the hard-coding :(
  // fs is kinda wanky
  console.log("fileName to parse : " + fileName);
  switch (fileName) {
    case "./documents/test_files/test1.txt":
      console.log("case 1");
      text = fs.readFileSync("./documents/test_files/test1.txt", "utf-8");
      break;

    case "./documents/test_files/test2.txt":
      console.log("case 2");
      text = fs.readFileSync("./documents/test_files/test2.txt", "utf-8");
      break;

    default:
      // fileName does not match anything expected
      console.log("no file loaded");
      break;
  }

  // Put content in table
  let textByLine = text.split("\r\n");
  textByLine.forEach(function callback(value, index, object) {
    if (value.match(/^S:|^L:|^T:|^I:|^CTL/)) {
      object.splice(index, 1); //removes indicators
    }
  });

  return textByLine;
}
