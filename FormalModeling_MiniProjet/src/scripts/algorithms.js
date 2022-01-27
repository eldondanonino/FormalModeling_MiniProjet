import { parse } from "./parser";
import { process } from "./process";

let data = process(parse("./documents/test_files/test2.txt"));
let tuples = data.tuples;
let states = data.states;
let transitions = data.transitions;

export function marking(atomicProp) {
  let table = [];

  tuples.forEach(function iter(index, value, object) {
    index.includes(atomicProp) ? table.push(true) : table.push(false); //put the result in the truth table
  });

  return table;
}

export function not(sub_func) {
  let table = [];
  let table_not = [];
  
  if(typeof(sub_func) == "string"){
    table = marking(sub_func);
  }
  else{
    table = sub_func;
  }
  
  for (let i = 0; i < table.length; i++) {
    table[i] === true ? table_not.push(false) : table_not.push(true);
  }

  return table_not;
}

export function and(sub_func1, sub_func2) {
  let table1 = [];
  let table2 = [];
  let table_and = [];

  if(typeof(sub_func1) == "string"){
    table1 = marking(sub_func1);
    table2 = marking(sub_func2);
  }
  else{
    table1 = sub_func1;
    table2 = sub_func2;
  }

  for (let i = 0; i < table1.length; i++) {
    table1[i] === true && table2[i] === true
      ? table_and.push(true)
      : table_and.push(false);
  }

  return table_and;
}

export function EX(sub_func) {
  let table = [];
  let table_EX = [];

  if(typeof(sub_func) == "string"){
    table = marking(sub_func);
  }
  else{
    table = sub_func;
  }

  for (let i = 0; i < table.length; i++) {
    table_EX[i] = false;
  }

  for (let i = 0; i < states.length; i++) {
    for (let pos_trans = 0; pos_trans < transitions.length; pos_trans++) {
      if (transitions[pos_trans][0] === states[i]) {
        let state_prime = transitions[pos_trans][1];
        let pos_state_prime = 0;
        for (let x = 0; x < states.length; x++) {
          if (states[x] === state_prime) {
            pos_state_prime = x;
          }
        }
        if (table[pos_state_prime] === true) {
          table_EX[i] = true;
        }
      }
    }
  }

  return table_EX;
}

export function EU(sub_func1, sub_func2) {
  let table1 = [];
  let table2 = [];
  let table_EU = [];
  let table_seen = [];
  let L = [];
  let pos_origin = 0;
  let origin,
    last = "";
  
  if(typeof(sub_func1) == "string"){
    table1 = marking(sub_func1);
    table2 = marking(sub_func2);
  }
  else{
    table1 = sub_func1;
    table2 = sub_func2;
  }

  for (let i = 0; i < states.length; i++) {
    table_seen[i] = false;
    table_EU[i] = false;
  }

  //checks for any state that verifies sub_func2 and saves it in L
  for (let i = 0; i < states.length; i++) {
    if (table2[i] === true) {
      L.push(i);
    }
  }
  while (L.length != 0) {
    last = L.pop();
    table_EU[last] = true;
    for (let pos_trans = 0; pos_trans < transitions.length; pos_trans++) {
      if (transitions[pos_trans][1] === states[last]) {
        origin = transitions[pos_trans][0];
        pos_origin = 0;
        for (let x = 0; x < states.length; x++) {
          if (states[x] === origin) {
            pos_origin = x;
          }
        }
        if (table_seen[pos_origin] === false) {
          table_seen[pos_origin] = true;
          if (table1[pos_origin] === true) {
            L.push(pos_origin);
          }
        }
      }
    }
  }
  return table_EU;
}

export function AU(sub_func1, sub_func2) {
  let table1 = [];
  let table2 = [];
  let L = [];
  let nb = [];
  let table_AU = [];

  if(typeof(sub_func1) == "string"){
    table1 = marking(sub_func1);
    table2 = marking(sub_func2);
  }
  else{
    table1 = sub_func1;
    table2 = sub_func2;
  }

  for (let i = 0; i < states.length; i++) {
    table_AU[i] = false;
    nb[i] = 0;
    //counts the number of outgoing transitions for every state
    for (let x = 0; x < transitions.length; x++) {
      if (transitions[x] === states[i]) {
        nb[i] += 1;
      }
    }
  }

  //checks for any state that verifies sub_func2 and saves it in L
  for (let i = 0; i < states.length; i++) {
    if (table2[i] === true) {
      L.push(i);
    }
  }

  while (L.length != 0) {
    last = L.pop();
    table_AU[last] = true;

    for (let pos_trans = 0; pos_trans < transitions.length; pos_trans++) {
      if (transitions[pos_trans][1] === states[last]) {
        origin = transitions[pos_trans][0];
        pos_origin = 0;
        for (let x = 0; x < states.length; x++) {
          if (states[x] === origin) {
            pos_origin = x;
          }
        }
        nb[pos_origin] -= 1;
        if (nb[pos_origin] === 0 && table1[pos_origin] === true && table_AU[pos_origin] === false) {
          L.push(pos_origin);
        }
      }
    }
  }
}
