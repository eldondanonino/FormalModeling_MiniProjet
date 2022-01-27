import { process } from "./process";
import { display } from "./output";
import { not } from "./algorithms";

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

export function CTLParser(CTLfunc) { //recursive ctl parser
  // let CTLarray = CTLfunc.split('');
  // let newStart = 0;
  // let subFuncResult = "";
  // let result = [];

  // for(let i = start; i < CTLarray.length; i++){
  //     if(CTLarray[i] == "("){
  //         newStart = i + 1;
  //         subFuncResult = parser(CTLfunc, newStart);
  //     }
  // }
  // for(let x = 0; x < CTLarray.length; x++){
  //     if(CTLarray[x] == "N" & CTLarray[x + 1] == "O" & CTLarray[x + 2] == "T"){
  //         if(CTLarray[x + 3] == newStart){
  //             subFuncResult = not(subFuncResult);
  //         }
  //     }
  // }

  console.log(CTLfunc);
  
  return false;
}
