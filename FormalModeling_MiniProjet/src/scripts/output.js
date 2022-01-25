import { parse } from "./parser";
import { process } from "./process";
import { BaseAlgorithms } from "./algorithmsOutput";

let states, tuples, transitions, initial, base_algorithms;
let algorithms;
let flag = false; // On file change: set to false

$(document).ready(function () {
  $("*[id*=cb-]").on("change", function () {
    flag = false;
  });

  $("#selectFile").on("change", function () {
    atomicHandler();
    flag = false;
  });

  $("*[id*=selectAP]").on("change", function () {
    updateAlgorithms();
  });

  $("#cb-algorithms").on("change", function () {
    atomicHandler();
  });

  $("#selectFile-validate").on("click", function () {
    let selectedFile = $("#selectFile").val();

    if (!flag) {
      flag = true;

      hideUncheckedTitles();
      $('.node:not(".title"):not(".algorithms")').remove();

      if (selectedFile != "") {
        let atom1 = $("#selectAP1").find(":selected").text();
        let atom2 = $("#selectAP2").find(":selected").text();
        let processed = process(
          parse("./documents/test_files/" + selectedFile + ".txt")
        );

        states = processed.states;
        tuples = processed.tuples;
        transitions = processed.transitions;
        initial = processed.initial;
        base_algorithms = BaseAlgorithms(atom1, atom2);
      } else {
        hideAllTitles();
      }

      if ($("#cb-states")[0].checked === true) displayStates();
      if ($("#cb-tuples")[0].checked === true) displayTuples();
      if ($("#cb-transitions")[0].checked === true) displayTransitions();
      if ($("#cb-initial-states")[0].checked === true) displayInitialStates();
      if ($("#cb-algorithms")[0].checked === true)
        displayAlgorithms(base_algorithms);
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
  let tmp = "";
  transitions.forEach(function (value) {
    if (value[0] !== tmp) {
      $("#transitions").append(
        `</tr><tr><td class="node">${value[0]}</td><td class="node">${value[1]}</td>`
      );
      tmp = value[0];
    } else {
      $("#transitions tr:last").append(`<td class="node">${value[1]}</td>`);
    }
  });
  $("#transitions").append(`</tr>`);
  $("#transitions tr").addClass("node");
}

function displayInitialStates() {
  $("#initial-states").removeAttr("hidden");
  initial.forEach(function (value) {
    $("#initial-states").append(`<tr><td class="node">${value}</td></tr>`);
  });
  $("#initial-states tr").addClass("node");
}

function displayAlgorithms(base_algorithms) {
  $("#algorithms").removeAttr("hidden");
  let tmp = "";
  states.forEach(function (state, index) {
    tmp = `<tr>`;
    tmp += `<td class="node" style="width:15%">${states[index]}</td>`;
    tmp += `<td class="node" style="width:15%; ${
      base_algorithms.marking[index] ? 'color:green"' : 'color:red"'
    }>${base_algorithms.marking[index]}</td>`;
    tmp += `<td class="node" style="width:15%; ${
      base_algorithms.not[index] ? 'color:green"' : 'color:red"'
    }>${base_algorithms.not[index]}</td>`;
    tmp += `<td class="node" style="width:15%; ${
      base_algorithms.and[index] ? 'color:green"' : 'color:red"'
    }>${base_algorithms.and[index]}</td>`;
    tmp += `<td class="node" style="width:15%; ${
      base_algorithms.ex[index] ? 'color:green"' : 'color:red"'
    }>${base_algorithms.ex[index]}</td>`;
    tmp += `<td class="node" style="width:15%; ${
      base_algorithms.eu[index] ? 'color:green"' : 'color:red"'
    }>${base_algorithms.eu[index]}</td>`;
    tmp += `<td class="node" style="width:15%; ${
      base_algorithms.au[index] ? 'color:green"' : 'color:red"'
    }>${base_algorithms.au[index]}</td>`;
    tmp += `</tr>`;

    $("#algorithms").append(tmp);
    $("#algorithms tr").addClass("node");
    $("#algorithms tr").addClass("algorithms");
  });
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
  $("#algorithms").attr("hidden", true);
}

function atomicHandler() {
  $("#selectAP1").empty();
  $("#selectAP2").empty();
  $("#cb-algorithms").is(":checked")
    ? $("*[id*=selectAP]").attr("hidden", false)
    : $("*[id*=selectAP]").attr("hidden", true);

  if ($("#selectFile").val() != "") {
    let tuples = process(
      parse("./documents/test_files/" + $("#selectFile").val() + ".txt")
    ).tuples;

    let propositions = [];

    tuples.forEach(function (tuple) {
      for (let i = 1; i < tuple.length; i++) {
        propositions.includes(tuple[i]) ? true : propositions.push(tuple[i]);
      }
    });

    propositions = propositions.filter((item) => item !== "~");

    propositions.forEach(function (value, index) {
      $("#selectAP1").append(
        `<option value="${propositions[index]}">${propositions[index]}</option>`
      );
      $("#selectAP2").append(
        `<option value="${propositions[index]}">${propositions[index]}</option>`
      );
    });
  }
}

function updateAlgorithms() {
  $('.algorithms:not(".title")').remove();
  let atom1 = $("#selectAP1").find(":selected").text();
  let atom2 = $("#selectAP2").find(":selected").text();
  base_algorithms = BaseAlgorithms(atom1, atom2);
  displayAlgorithms(base_algorithms);
}
