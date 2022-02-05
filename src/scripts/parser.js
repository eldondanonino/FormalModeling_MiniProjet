import { process } from "./process";
import { display } from "./output";
import {
  not,
  and,
  or,
  AX,
  AU,
  AF,
  AG,
  AT,
  EX,
  EU,
  EF,
  EG,
  ET,
} from "./algorithms";

const filePath = "documents/test_files/";

// Display elements
export function output(fileName) {
  let data = process(parse(fileName));
  display(data);
}

export function parse(fileName) {
  // Read document
  let fs = require("fs");
  let text = "";

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
  let result;
  let operator;
  let elements = [];

  let reg_all = /!|&|\||A|E/;
  let reg_double = /&|\||AU|EU|AT|ET/;
  let reg_simple = /!|A|E/;
  let reg_AE = /X|G|F|U|T/;

  let flag = false;

  console.log("input");
  console.log(input);

  if (input.charAt(0).match(reg_all)) {
    input.charAt(input.length - 1) == ")"
      ? (input = input.slice(0, -1))
      : (flag = true);
  } else {
    throw "Not a logical formula, please check you ctl";
  }
  if (flag) throw "Your CTL does not have proper parenthesis placement";

  input = input.split(/\((.+)/);
  operator = input[0];
  input.pop();

  //handle an operation
  if (operator.match(reg_all)) {
    if (operator.match(/A|E/)) {
      //handle A and E
      if (!input[1].charAt(0).match(reg_AE)) {
        throw "Please make sure that A and E are only applied on X G F U or T";
      } else {
        //change the operator to the composite form
        operator = operator + input[1].charAt(0);
        input[1] = input[1].slice(2, -1);
        if (
          (operator == "AU") |
          (operator == "EU") |
          (operator == "AT") |
          (operator == "ET")
        ) {
          if (input[1].charAt(0).match(reg_all)) {
            elements = first_spliter(input);
            console.log(elements);
            elements[0] = CTLParser(elements[0]);
          } else {
            elements = input[1].split(/,(.+)/);
          }
        } else if (input[1].charAt(0).match(reg_all)) {
          elements[0] = CTLParser(input[1]);
        } else {
          elements[0] = input[1];
        }
      }
    } else if (input[1].charAt(0).match(reg_all)) {
      //element 1 is an operation
      elements = first_spliter(input);
      console.log("elements");
      console.log(elements);
      elements[0] = CTLParser(elements[0]);
    }
    //element 1 is a simple atomic proposition
    else {
      elements = input[1].split(/,(.+)/);
      if (!operator.match(reg_simple)) elements.pop();
    }

    //if the operation has a second element
    if (operator.match(reg_double)) {
      //element 2 is an operation
      if (elements[1].charAt(0).match(reg_all)) {
        elements[1] = CTLParser(elements[1]);
      }
    }
  } else {
    throw "Not a valid operation, please check your ctl";
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
    case "AT":
      console.log("next is reached");
      result = AT(elements[0], elements[1]);
      break;
    case "AX":
      console.log("AX is reached");
      result = AX(elements[0]);
      break;
    case "AU":
      console.log("AU is reached");
      result = AU(elements[0], elements[1]);
      break;
    case "AF":
      console.log("AF is reached");
      result = AF(elements[0]);
      break;
    case "AG":
      console.log("AG is reached");
      result = AG(elements[0]);
      break;
    case "EX":
      console.log("EX is reached");
      result = EX(elements[0]);
      break;
    case "EU":
      console.log("EU is reached");
      result = EU(elements[0], elements[1]);
      break;
    case "EF":
      console.log("EF is reached");
      result = EF(elements[0]);
      break;
    case "EG":
      console.log("EG is reached");
      result = EG(elements[0]);
      break;
    case "ET":
      console.log("next is reached");
      result = ET(elements[0], elements[1]);
      break;
    default:
      throw "Something went wrong (failed switch)";
  }
  Array.isArray(result) ? (result = result) : console.log("not an array");
  console.log("result: " + result);
  return result; //return the table of truth
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

function split_at_index(value, index) {
  return [value.substring(0, index), value.substring(index + 1)];
}
