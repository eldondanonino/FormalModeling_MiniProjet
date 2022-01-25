import { parse } from "./parser";
import { updateFileSelect, getFilesInDirectory } from "./getFiles";
import { process } from "./process";
import { BaseAlgorithms } from "./algorithmsOutput";

// updateFileSelect();

let states, tuples, transitions, initial,base_algorithms;
let algorithms;
let flag = false; // On file change: set to false

let queue = [];

$(document).ready(function () {
  $("*[id*=cb-]").on("change", function () {
    flag = false;
  });

  $("#selectFile").on("change", function () {
    flag = false;
  });

  $("#selectFile-validate").on("click", function () {
    let selectedFile = $("#selectFile").val();

    if (!flag) {
      flag = true;

      hideUncheckedTitles();
      $('.node:not(".title")').remove();

      // TODO: not have the select file hardcoded

      if (selectedFile != "") {
        base_algorithms = BaseAlgorithms();
        states = process(
          parse("./documents/test_files/" + selectedFile + ".txt")
        ).states;
        tuples = process(
          parse("./documents/test_files/" + selectedFile + ".txt")
        ).tuples;
        transitions = process(
          parse("./documents/test_files/" + selectedFile + ".txt")
        ).transitions;
        initial = process(
          parse("./documents/test_files/" + selectedFile + ".txt")
        ).initial;
        algorithms = BaseAlgorithms();
      } else {
        hideAllTitles();
      }

      if ($("#cb-states")[0].checked === true) displayStates();
      if ($("#cb-tuples")[0].checked === true) displayTuples();
      if ($("#cb-transitions")[0].checked === true) displayTransitions();
      if ($("#cb-initial-states")[0].checked === true) displayInitialStates();
      if ($("#cb-algorithms")[0].checked === true) displayAlgorithms();
    }
  });
});

function displayStates() {
  $("#states").removeAttr("hidden");
  states.forEach(function (value) {
    $("#states").append(`<tr><td class="node">${value}</td></tr>`);
  });
  $("#states tr").addClass("node");
}

function displayTuples() {
  $("#tuples").removeAttr("hidden");
  let tmp;

  tuples.forEach(function (tuple) {
    tmp = `<tr>`;
    for (let i = 0; i < tuple.length; i++) {
      tmp += `<td class="node">${tuple[i]}</td>`;
    }
    tmp += `</tr>`;

    $("#tuples").append(tmp);
    $("#tuples tr").addClass("node");
  });
}

function displayTransitions() {
  $("#transitions").removeAttr("hidden");
  transitions.forEach(function (value) {
    $("#transitions").append(
      `<tr><td class="node">${value[0]}</td><td class="node">${value[1]}</td></tr>`
    );
  });
  $("#transitions tr").addClass("node");
}

function displayInitialStates() {
  $("#initial-states").removeAttr("hidden");
  initial.forEach(function (value) {
    $("#initial-states").append(`<tr><td class="node">${value}</td></tr>`);
  });
  $("#initial-states tr").addClass("node");
}

function displayAlgorithms(){
  $("#algorithms").removeAttr("hidden");
}

function hideUncheckedTitles() {
  if ($("#cb-states")[0].checked === false) {
    $("#states").attr("hidden", true);
  }
  if ($("#cb-tuples")[0].checked === false) {
    $("#tuples").attr("hidden", true);
  }
  if ($("#cb-transitions")[0].checked === false) {
    $("#transitions").attr("hidden", true);
  }
  if ($("#cb-initial-states")[0].checked == false) {
    $("#initial-states").attr("hidden", true);
  }
  if ($("#cb-algorithms")[0].checked == false) {
    $("#algorithms").attr("hidden", true);
  }
}

function hideAllTitles() {
  $("*[id*=cb-]").prop("checked", false);

  $("#states").attr("hidden", true);
  $("#tuples").attr("hidden", true);
  $("#transitions").attr("hidden", true);
  $("#initial-states").attr("hidden", true);
  $("#algorithms").attr("hidden",true);
}
