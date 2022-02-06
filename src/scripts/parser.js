import * as algo from "./algorithms";
import { display } from "./output";


export function parse(fileName) {
  // Read document
  let fs = require("fs");
  let text = "";

  //As discussed with you, we encountered a very peculiar bug that forbid the fileName variable to be properly used in a readfile
  //This forced a hardcoded solution to allow further development.
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
    if (value.match(/^S:|^L:|^T:|^I:|^CTL/)) { //removes indicators
      object.splice(index, 1);
    }
  });

  return textByLine;
}

export function CTLParser(input) {
  let result;
  let operator;
  let elements = [];

  //regular expressions matching the different operators
  let reg_all = /!|&|\||A|E/;
  let reg_double = /&|\||AU|EU|AT|ET/;
  let reg_simple = /!|A|E/;
  let reg_AE = /X|G|F|U|T/;

  //error flag to throw errors
  let flag = false;

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
  //input will be of format [operator,element1,element2 (if exists)] after processing
  //at this point it is only [operator,elements]

  //handle an operation
  if (operator.match(reg_all)) {
    //check if the operator needs a specific following one
    if (operator.match(/A|E/)) {
      if (!input[1].charAt(0).match(reg_AE)) {
        throw "Please make sure that A and E are only applied on X G F U or T";
      } else {
        //change the operator to its composite form
        operator = operator + input[1].charAt(0);
        input[1] = input[1].slice(2, -1);
        if (
          (operator == "AU") |
          (operator == "EU") |
          (operator == "AT") |
          (operator == "ET")
        ) {
          //if the first element requires itself two elements, a left hand split must be done via first_splitter
          //it will separate element 1 and element 2 disregarding complexity
          if (input[1].charAt(0).match(reg_all)) {
            elements = first_spliter(input);
            console.log(elements);
            elements[0] = CTLParser(elements[0]);
          } else {
            //otherwise, the left hand element can easily be split by ,
            elements = input[1].split(/,(.+)/);
          }
        } else if (input[1].charAt(0).match(reg_all)) {
          //if the first element has an operator, it needs further processing
          //we call recursively the ctl parser on the subfunction
          elements[0] = CTLParser(input[1]);
        } else {
          //otherwise it will become element 1
          elements[0] = input[1];
        }
      }
    }
    //if the operator is not a composit function (A or E)
    else if (input[1].charAt(0).match(reg_all)) {
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
    //handles incorrect CTL structures
    throw "Not a valid operation, please check your ctl";
  }

  //control table for calling the correct algorithm
  switch (operator) {
    case "!":
      console.log("not is reached");
      result = algo.not(elements[0]);
      break;
    case "&":
      console.log("and is reached");
      result = algo.and(elements[0], elements[1]);
      break;
    case "|":
      console.log("or is reached");
      result = algo.or(elements[0], elements[1]);
      break;
    case "AT":
      console.log("next is reached");
      result = algo.AT(elements[0], elements[1]);
      break;
    case "AX":
      console.log("AX is reached");
      result = algo.AX(elements[0]);
      break;
    case "AU":
      console.log("AU is reached");
      result = algo.AU(elements[0], elements[1]);
      break;
    case "AF":
      console.log("AF is reached");
      result = algo.AF(elements[0]);
      break;
    case "AG":
      console.log("AG is reached");
      result = algo.AG(elements[0]);
      break;
    case "EX":
      console.log("EX is reached");
      result = algo.EX(elements[0]);
      break;
    case "EU":
      console.log("EU is reached");
      result = algo.EU(elements[0], elements[1]);
      break;
    case "EF":
      console.log("EF is reached");
      result = algo.EF(elements[0]);
      break;
    case "EG":
      console.log("EG is reached");
      result = algo.EG(elements[0]);
      break;
    case "ET":
      console.log("next is reached");
      result = algo.ET(elements[0], elements[1]);
      break;
    default:
      //this should never be thrown
      throw "Something went wrong (failed switch)";
  }

  return result; //return the table of truth
}

//splits the left hand element of a two elements operation
//input of format [operator,elements]
function first_spliter(input) {
  let para_counter = 1; //counter of open parenthesis
  let index;
  //we start after the first operator and open parenthesis (so charAt(2))
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

//handy function returning a string split in 2 at a specific index
function split_at_index(value, index) {
  return [value.substring(0, index), value.substring(index + 1)];
}
