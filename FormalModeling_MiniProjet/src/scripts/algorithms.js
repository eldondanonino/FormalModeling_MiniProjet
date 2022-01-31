import { parse } from "./parser";
import { process } from "./process";

let data = "";
let tuples = [];
let states;
let transitions;

export function fileSetter(file) {
  console.log("data pre set");
  console.log(data);
  data = process(parse(file));
  tuples = data.tuples;
  states = data.states;
  transitions = data.transitions;
  console.log("data post set");
  console.log(data);
}

export function marking(atomicProp) {
  let table = [];
  tuples.forEach(function iter(index) {
    index.includes(atomicProp) ? table.push(true) : table.push(false); //put the result in the truth table
  });

  return table;
}

export function not(sub_func) {
  let table = marking_setter(sub_func);
  let table_not = [];

  for (let i = 0; i < table.length; i++) {
    table[i] === true ? table_not.push(false) : table_not.push(true);
  }

  return table_not;
}

export function and(sub_func1, sub_func2) {
  let table1 = marking_setter(sub_func1);
  let table2 = marking_setter(sub_func2);
  let table_and = [];

  for (let i = 0; i < table1.length; i++) {
    table1[i] === true && table2[i] === true
      ? table_and.push(true)
      : table_and.push(false);
  }

  return table_and;
}

export function or(sub_func1, sub_func2) {
  let table1 = marking_setter(sub_func1);
  let table2 = marking_setter(sub_func2);
  let table_or = [];

  for (let i = 0; i < table1.length; i++) {
    table1[i] === true || table2[i] === true
      ? table_or.push(true)
      : table_or.push(false);
  }

  return table_or;
}

export function E(sub_func) {
  //E(G(x))
  let elements;

  switch (sub_func.charAt(0)) {
    case "X":
      elements = sub_func.slice(2, -1).split(/,(.+)/);
      elements.pop();
      return EX(elements);

    case "U":
      elements = sub_func.slice(2, -1).split(/,(.+)/);
      elements.pop();
      return EU(elements[0], elements[1]);

    case "F":
      elements = sub_func.slice(2, -1);
      return EF(elements);

    case "T":
      elements = sub_func.slice(2, -1).split(/,(.+)/);
      elements.pop();
      return ET(elements[0], elements[1]);

    case "G":
      elements = sub_func.slice(2, -1).split(/,(.+)/);
      elements.pop();
      return EG(elements);

    default:
      break;
  }
}

export function A(sub_func) {
  //A(G(x))
  let elements;

  switch (sub_func.charAt(0)) {
    case "X":
      elements = sub_func.slice(2, -1);
      return AX(elements);

    case "U":
      elements = sub_func.slice(2, -1).split(/,(.+)/);
      elements.pop();
      return AU(elements[0], elements[1]);

    case "F":
      elements = sub_func.slice(2, -1);
      return AF(elements);

    case "T":
      elements = sub_func.slice(2, -1).split(/,(.+)/);
      elements.pop();
      return AT(elements[0], elements[1]);

    case "G":
      elements = sub_func.slice(2, -1);
      return AG(elements);

    default:
      break;
  }
}

export function EX(sub_func) {
  let table = marking_setter(sub_func);
  let table_EX = [];

  for (let i = 0; i < table.length; i++) {
    table_EX[i] = false;
  }

  for (let i = 0; i < states.length; i++) {
    for (let pos_trans = 0; pos_trans < transitions.length; pos_trans++) {
      if (transitions[pos_trans][0] === states[i]) {
        let state_prime = transitions[pos_trans][1];
        let pos_state_prime = state_pos(state_prime);
        if (table[pos_state_prime] === true) {
          table_EX[i] = true;
        }
      }
    }
  }

  return table_EX;
}

export function AX(sub_func) {
  let table = marking_setter(sub_func);
  let table_AX = [];
  let state_prime, pos_state_prime;

  for (let i = 0; i < states.length; i++) {
    table_AX[i] = true;

    for (let pos_trans = 0; pos_trans < transitions.length; pos_trans++) {
      if (transitions[pos_trans][0] === states[i]) {
        state_prime = transitions[pos_trans][1];
        pos_state_prime = state_pos(state_prime);
        if (table[pos_state_prime] === false) {
          table_AX[i] = false;
        }
      }
    }
  }
  return table_AX;
}

export function EU(sub_func1, sub_func2) {
  let table1 = marking_setter(sub_func1);
  let table2 = marking_setter(sub_func2);
  let table_EU = [];
  let table_seen = [];
  let L = L_setter(sub_func2);
  let pos_origin = 0;
  let origin,
    last = "";

  for (let i = 0; i < states.length; i++) {
    table_seen[i] = false;
    table_EU[i] = false;
  }

  while (L.length != 0) {
    last = L.pop();
    table_EU[last] = true;
    for (let pos_trans = 0; pos_trans < transitions.length; pos_trans++) {
      if (transitions[pos_trans][1] === states[last]) {
        origin = transitions[pos_trans][0];
        pos_origin = 0;
        if (table_seen[pos_origin] === false) {
          pos_origin = state_pos(origin);
          if (table_seen[pos_origin] === false) {
            table_seen[pos_origin] = true;
            if (table1[pos_origin] === true) {
              L.push(pos_origin);
            }
          }
        }
      }
    }
  }
  return table_EU;
}

export function AU(sub_func1, sub_func2) {
  let table1 = marking_setter(sub_func1);
  let table2 = marking_setter(sub_func2);
  let L = L_setter(sub_func2);
  let nb = [];
  let table_AU = [];
  let last, pos_origin, origin;

  typeof sub_func1 == "string"
    ? (table1 = marking(sub_func1))
    : (table1 = sub_func1);
  typeof sub_func2 == "string"
    ? (table2 = marking(sub_func2))
    : (table2 = sub_func2);

  nb = count_outgoing_trans();

  for (let i = 0; i < states.length; i++) {
    table_AU[i] = false;
  }

  while (L.length != 0) {
    last = L.pop();
    table_AU[last] = true;

    for (let pos_trans = 0; pos_trans < transitions.length; pos_trans++) {
      if (transitions[pos_trans][1] === states[last]) {
        origin = transitions[pos_trans][0];
        pos_origin = state_pos(origin);
        nb[pos_origin]--;
        if (
          nb[pos_origin] === 0 &&
          table1[pos_origin] === true &&
          table_AU[pos_origin] === false
        ) {
          L.push(pos_origin);
        }
      }
    }
  }
  return table_AU;
}

export function EF(sub_func) {
  let table_EF = [];
  let table_seen = [];
  let L = L_setter(sub_func);
  let pos_origin, origin, last;

  for (let i = 0; i < states.length; i++) {
    table_EF[i] = false;
    table_seen[i] = false;
  }

  while (L.length != 0) {
    last = L.pop();
    table_EF[last] = true;

    for (let pos_trans = 0; pos_trans < transitions.length; pos_trans++) {
      if (transitions[pos_trans][1] === states[last]) {
        origin = transitions[pos_trans][0];
        pos_origin = state_pos(origin);
        if (table_seen[pos_origin] === false) {
          table_seen[pos_origin] = true;
          L.push(pos_origin);
        }
      }
    }
  }
  return table_EF;
}

export function AF(sub_func) {
  let table = [];
  let table_AF = [];
  let nb = [];
  let L = [];
  let pos_origin, origin, last;

  typeof sub_func == "string"
    ? (table = marking(sub_func))
    : (table = sub_func);

  nb = count_outgoing_trans();

  for (let i = 0; i < states.length; i++) {
    table_AF[i] = false;

    //checks for any state that verifies sub_func and saves it in L
    if (table[i] === true) {
      L.push(i);
    }
  }

  while (L.length != 0) {
    last = L.pop();
    table_AF[last] = true;

    for (let pos_trans = 0; pos_trans < transitions.length; pos_trans++) {
      if (transitions[pos_trans][1] === states[last]) {
        origin = transitions[pos_trans][0];
        pos_origin = state_pos(origin);
        nb[pos_origin]--;
        if (nb[pos_origin] === 0 && table_AF[pos_origin] === false) {
          L.push(pos_origin);
        }
      }
    }
  }
  return table_AF;
}

export function ET(sub_func1, sub_func2){
  let table_ET = [];

  table_ET = and(sub_func1, EX(sub_func2));

  return table_ET;
}

export function AT(sub_func1, sub_func2){
  let table_AT = [];

  table_AT = and(sub_func1, AX(sub_func2));

  return table_AT;
}

// EG = après n transitions quelconques, il existe une série de transitions vérifiant sub_func à chaque état
export function EG(sub_func) {
  let table = marking_setter(sub_func);
  let table_EG = [];
  let table_seen = [];
  let L = L_setter(sub_func);
  let pos_origin, origin, last;

  for (let i = 0; i < states.length; i++) {
    table_EF[i] = false;
    table_seen[i] = false;
  }

  for (let i = 0; i < states.length; i++) {
    for (let pos_trans = 0; pos_trans < transitions.length; pos_trans++) {
      if (transitions[pos_trans][0] === states[i]) {
      }
    }
  }

  return table_EG;
}

//returns the position of a state in the states array
export function state_pos(name) {
  let state_position;
  for (let x = 0; x < states.length; x++) {
    if (states[x] === name) {
      state_position = x;
      break;
    }
  }
  return state_position;
}

export function count_outgoing_trans() {
  let nb = [];

  for (let i = 0; i < states.length; i++) {
    nb[i] = 0;

    //counts the number of outgoing transitions for every state
    for (let x = 0; x < transitions.length; x++) {
      if (transitions[x][0] === states[i]) {
        nb[i] += 1;
      }
    }
  }

  return nb;
}

//checks for any state that verifies sub_func and saves it in the array L
export function L_setter(sub_func) {
  let L = [];
  for (let i = 0; i < states.length; i++) {
    let table = marking(sub_func);

    if (table[i] === true) {
      L.push(i);
    }
  }
  return L;
}

export function marking_setter(sub_func) {
  let table = [];

  typeof sub_func == "string"
    ? (table = marking(sub_func))
    : (table = sub_func);

  return table;
}

export function state_explorer(origin, sub_func) {
  let atom_props = [];
  let validating_states = [];
  let table_seen = [];
  let receiving_state, already_checked;

  for (let pos_trans = 0; pos_trans < transitions.length; pos_trans++) {
    if (transitions[pos_trans][0] === states[origin]) {
      receiving_state = transitions[pos_trans][1];
      already_checked = checker_seen(table_seen, receiving_state);
      if (already_checked === false) {
        atom_props = find_atom_props(receiving_state);
        if (atom_props != "~") {
          for (let i = 0; i < atom_props.length; i++) {
            if (atom_props[i] === sub_func) {
              validating_states.push(receiving_state);
            }
          }
        }
      }
      console.log("validating_states:");
      console.log(validating_states);
      console.log("receiving_state");
      console.log(receiving_state);
      console.log("calling recursive");
      validating_states.concat(state_explorer(receiving_state, sub_func));
    }
  }
  return validating_states;
}

export function find_atom_props(state) {
  let res_table = [];
  for (let i = 0; i < tuples.length; i++) {
    if (tuples[i][0] == state) {
      for (let x = 1; x < tuples[i].length; x++) {
        res_table.push(tuples[i][x]);
      }
    }
  }
  if (res_table.length == 0) {
    return "~";
  } else {
    return res_table;
  }
}

export function checker_seen(table_seen, receiving_state) {
  for (let x = 0; x < table_seen.length; x++) {
    if (table_seen[x] === receiving_state) {
      console.log("true");
      return true;
    }
  }
  console.log("false");
  return false;
}
