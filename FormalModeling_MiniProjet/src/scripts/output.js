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
      tuples = process(parse("./documents/test_files/test2.txt")).tuples;
      transitions = process(
        parse("./documents/test_files/test2.txt")
      ).transitions;
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
  $("#tuple-title-1").show();
  $("#tuple-title-2").show();
  let tmp;

  tuples.forEach(function (tuple) {
    tmp = `<tr>`;
    for (let i = 0; i < tuple.length; i++) {
      tmp += `<td>${tuple[i]}</td>`;
    }
    tmp += `</tr>`;

    $("#tuples").append(tmp);
  });
}

function displayTransitions() {
  $("#transition-title-1").show();
  $("#transition-title-2").show();

  transitions.forEach(function (value) {
    $("#transitions").append(
      `<tr><td>${value[0]}</td><td>${value[1]}</td></tr>`
    );
  });
}

function displayInitialStates() {
  $("#initial-state-title").show();

  initial.forEach(function (value) {
    $("#initial-states").append(`<tr><td>${value}</td></tr>`);
  });
}
