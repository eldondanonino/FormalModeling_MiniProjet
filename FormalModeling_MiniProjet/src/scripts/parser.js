import { process } from "./process";
import { display } from "./output";
import { not, and, or } from "./algorithms";

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

export function CTLParser(input) {
  let index;
  let result;
  let operator;
  let elements = [];
  let reg_all = /!|&|\||A|E/;
  let reg_double = /&|\|/;
  let reg_simple = /!|A|E/;
  let flag = false;
  input.trim();

  console.log("input");
  console.log(input);

  if (input.charAt(0).match(reg_all)) {
    input.charAt(input.length - 1) == ")"
      ? (input = input.slice(0, -1))
      : (flag = true);
  } else {
    throw "Not a logical formula, please check you ctl";
    //no algorithm needed, end of recursion
  }
  if (flag) {
    throw "Your CTL does not have proper parenthesis placement";
  }
  input = input.split(/\((.+)/);
  operator = input[0];
  input.pop();
  //input =  [operator,unseparated values]

  //
  // UNTIL HERE EVERYTHING IS FINE
  //
  //handle an operation
  if (operator.match(reg_all)) {
    //element 1 is an operation
    if (input[1].charAt(0).match(reg_all)) {
      // console.log("splitting " + input[1] + " for operator " + operator);
      elements = first_spliter(input);
      console.log("elements");
      console.log(elements);
      elements[0] = CTLParser(elements[0]);
    }
    //element 1 is a simple atomic proposition
    else {
      console.log("no operation");
      elements = input[1].split(/,(.+)/);
      if (operator != "!") elements.pop();
    }
    //if the operation has a second element
    if (operator.match(reg_double)) {
      //element 2 is an operation
      if (elements[1].charAt(0).match(reg_all)) {
        elements[1] = CTLParser(elements[1]);
      }
    }
  } else {
    throw "not a valid operation, check your ctl";
  }

  switch (operator) {
    case "!":
      console.log("not is reached");
      result = not(elements[0]);
      break;
    case "&":
      console.log("and is reached");
      result = and(elements[0], elements[1]);
      break;
    case "|":
      console.log("or is reached");
      result = or(elements[0], elements[1]);
      break;
    default:
      console.log("ko");
      break;
  }
  Array.isArray(result) ? (result = result) : console.log("not an array");
  console.log("result: " + result);
  return result; //return the tableoftruth
}

//splits the left hand element of a two elements operation
function first_spliter(input) {
  let para_counter = 1;
  let index;
  for (let i = 2; i < input[1].length; i++) {
    if (input[1].charAt(i) == "(") para_counter++;
    if (input[1].charAt(i) == ")") para_counter--;
    if (para_counter == 0) {
      index = i + 1; //the index at which to split
      break;
    }
  }
  return split_at_index(input[1], index);
}
