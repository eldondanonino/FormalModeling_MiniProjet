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

export function CTLParser(input) {
  //input [Operand,v1,v2]
  //recursive ctl parser
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
  let result;
  input.trim();

  input.charAt(input.length - 1) == ")"
    ? (input = input.slice(0, -1))
    : alert("errrr");

  input = input.split(/\((.+)/); //split only on the first (

  input.pop(); //we get [operator, nonsplit elements]
  console.log(input);
  let operator = input[0];
  input[1].charAt(0).match(/!|&/) //if the first element is not a simple atomic proposition we call recursively
    ? console.log("deeper for v1!")//CTLParser(input[1])
    : true;
  let elements = input[1].split(/,(.+)/);

  elements[1].charAt(0).match(/!|&/) //if the second element is not a simple atomic proposition we call recursively
  ? console.log("deeper but for v2!")//CTLParser(elements[1])
  : true;

  elements.pop();
  console.log("operator : " + operator);
  console.log("elements : ");
  console.log(elements);

  for (let i in elements) {
    console.log(elements[i]);
  }
  switch (operator) {
    case "!":
      console.log("not");
      break;
    case "&":
      console.log("and");
      break;
    default:
      console.log("ko");
      break;
  }

  return result; //return the tableoftruth[initialState]
}
