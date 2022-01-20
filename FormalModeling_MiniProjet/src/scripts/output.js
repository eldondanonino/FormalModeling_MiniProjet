import { parse } from "./parser";
import { updateFileSelect, getFilesInDirectory } from "./getFiles";
import { process } from "./process";

// updateFileSelect();

let states, tuples, transitions, initial;
let flag = false; // On file change: set to false

$(document).ready(function () {
  $("*[id*=-title]").hide();

  $("#selectFile-validate").on("click", function () {
    if (!flag) {
      // TODO: not have the select file hardcoded
      states = process(parse("./documents/test_files/test2.txt")).states;
      initial = process(parse("./documents/test_files/test2.txt")).initial;

      displayStates();
      displayTuples();
      displayTransitions();
      displayInitialStates();

      flag = true;
    }
  });
});

function displayStates() {
  $("#state-title").show();

  states.forEach(function (value) {
    $("#states").append(`<tr><td>${value}</td></tr>`);
  });
}

function displayTuples() {
  console.log("les tuples tas vu");
}

function displayTransitions() {
  console.log("les tugrhwtfxples tas vu");
}

function displayInitialStates() {
  $("#initial-state-title").show();

  initial.forEach(function (value) {
    $("#initial-states").append(`<tr><td>${value}</td></tr>`);
  });
}
