import { process } from "./process";
import { display } from "./output";

const filePath = "documents/test_files/";
// const fileName = "file2";

// Display elements
export function output(fileName) {
  let data = process(parse(fileName));
  display(data); 
}

export function parse(fileName) {
  // const finalPath = "".concat(filePath, fileName, ".txt");

  // Read document
  let fs = require("fs");
  let text = "";

  // Sorry for the hard-coding :(
  // fs is kinda wanky
  switch (fileName) {
    case "./documents/test_files/file1.txt":
      text = fs.readFileSync("./documents/test_files/file1.txt", "utf-8");
      break;

    case "./documents/test_files/file2.txt":
      text = fs.readFileSync("./documents/test_files/file2.txt", "utf-8");
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
