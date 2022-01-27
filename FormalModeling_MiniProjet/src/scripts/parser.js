import { process } from "./process";
import { display } from "./output";
import { not, and } from "./algorithms";

const filePath = "documents/test_files/";
// const fileName = "file2";

function split_at_index(value, index) {
  //"borrowed code for convenience, will be removed"
  return [value.substring(0, index), value.substring(index + 1)];
}

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

export function CTLParser(input, initial) {
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
  let index;
  let result;
  let operator;
  let elements = [];
  input.trim();

  console.log("input");
  console.log(input);
  if (input.charAt(0).match(/!|&/)) {
    input.charAt(input.length - 1) == ")"
      ? (input = input.slice(0, -1))
      : console.log("errrr");
  } else {
    console.log("is it true?" + input);
    return input; //no algorithm needed, end of recursion
  }
  input = input.split(/\((.+)/);
  operator = input[0];
  input.pop();
  //we should have either finished the recursive loop or [operator,unseparated values]

  //if first char is algo, recursive
  if (input[1].charAt(0).match(/!|&/)) {
    let para_counter = 1;
    for (let i = 2; i < input[1].length; i++) {
      if (input[1].charAt(i) == "(") para_counter++;
      if (input[1].charAt(i) == ")") para_counter--;
      if (para_counter == 0) {
        index = i + 1; //the index at which to split
        break;
      }
    }
    elements = split_at_index(input[1], index);
    elements[0] = CTLParser(elements[0], initial);
  } else {
    console.log("not a logical operation");
    elements = input[1].split(/,(.+)/);
    console.log(elements);
    elements.pop();
  }

  if (elements[1].charAt(0).match(/!|&/)) {
    console.log("second element is logical");
    //if the second element is not a simple atomic proposition we call recursively
    elements[1] = CTLParser(elements[1], initial);
  }

  console.log("operator : " + operator);
  console.log("elements : ");
  console.log(elements);

  switch (operator) {
    case "!":
      console.log("not is reached");
      result = not(elements[0]);
      break;
    case "&":
      console.log("and is reached");
      result = and(elements[0], elements[1]);
      break;
    default:
      console.log("ko");
      break;
  }
  Array.isArray(result)
    ? (result = result)
    : console.log("not an array");
  console.log("result: " + result);
  return result; //return the tableoftruth[initialState]
}
