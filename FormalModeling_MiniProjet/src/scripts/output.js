import { parse } from "./parser";
import { updateFileSelect, getFilesInDirectory } from "./getFiles";
import { process } from "./process";

// updateFileSelect();

let states, tuples, transitions, initial;
let flag = false; // On file change: set to false

let queue = [];

$(document).ready(function () {
  $("*[id*=-title]").hide();

  $("*[id*=cb-]").on("change", function () {
    flag = false;
  });

  $("#selectFile-validate").on("click", function () {
    if (!flag) {
      flag = true;

      hideUncheckedTitles();

      $(".node").remove();

      // TODO: not have the select file hardcoded
      states = process(parse("./documents/test_files/test2.txt")).states;
      tuples = process(parse("./documents/test_files/test2.txt")).tuples;
      transitions = process(
        parse("./documents/test_files/test2.txt")
      ).transitions;
      initial = process(parse("./documents/test_files/test2.txt")).initial;

      if ($("#cb-states")[0].checked === true) displayStates();
      if ($("#cb-tuples")[0].checked === true) displayTuples();
      if ($("#cb-transitions")[0].checked === true) displayTransitions();
      if ($("#cb-initial-states")[0].checked === true) displayInitialStates();
    }
  });
});

function displayStates() {
  $("#state-title").show();

  states.forEach(function (value) {
    $("#states").append(`<tr><td class="node">${value}</td></tr>`);
  });
}

function displayTuples() {
  $("#tuple-title-1").show();
  $("#tuple-title-2").show();

  let tmp;

  tuples.forEach(function (tuple) {
    tmp = `<tr>`;
    for (let i = 0; i < tuple.length; i++) {
      tmp += `<td class="node">${tuple[i]}</td>`;
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
      `<tr><td class="node">${value[0]}</td><td class="node">${value[1]}</td></tr>`
    );
  });
}

function displayInitialStates() {
  $("#initial-state-title").show();

  initial.forEach(function (value) {
    $("#initial-states").append(`<tr><td class="node">${value}</td></tr>`);
  });
}

function hideUncheckedTitles() {

  if ($("#cb-states")[0].checked === false) {
    $("#state-title").hide();
  }
  if ($("#cb-tuples")[0].checked === false) {
    $("#tuple-title-1").hide();
    $("#tuple-title-2").hide();
  }
  if ($("#cb-transitions")[0].checked === false) {
    $("#transition-title-1").hide();
    $("#transition-title-2").hide();
  }
  if ($("#cb-initial-states")[0].checked == false) {
    $("#initial-state-title").hide();
  }
}
