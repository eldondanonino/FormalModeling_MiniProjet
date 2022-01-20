import { parse } from "./parser";
import { process } from "./process";

let data = process(parse());
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
  let table = marking(sub_func);
  let table_not = [];
  for (let i = 0; i < table.length; i++) {
    table[i] === true ? table_not.push(false) : table_not.push(true);
  }

  return table_not;
}

export function and(sub_func1, sub_func2) {
  let table1 = marking(sub_func1);
  let table2 = marking(sub_func2);
  let table_and = [];

  for (let i = 0; i < table1.length; i++) {
    table1[i] === true && table2[i] === true
      ? table_and.push(true)
      : table_and.push(false);
  }

  return table_and;
}

export function EX(sub_func) {
  let table = marking(sub_func);
  let table_EX = [];

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
  let table1 = marking(sub_func1);
  let table2 = marking(sub_func2);
  let table_EU = [];
  let table_seen = [];
  let L = [];
  let pos_origin = 0;
  let origin,
    last = "";

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

export function A_Until(sub_func1, sub_func2) {
  let table1 = marking(sub_func1);
  let table2 = marking(sub_func2);
  let L = [];
}
