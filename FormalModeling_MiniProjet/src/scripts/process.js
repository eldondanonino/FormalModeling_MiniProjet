export function process(input) {
  let states = input[0].replace(/{|}/g, "").split(",");

  let tuples = input[1].replace(/\)|{|}/g, "").split("(");
  tuples.filter(function (e) {
    return e;
  });
  tuples.forEach(function pairs(value, index, object) {
    object[index] = object[index].split(",");
    object[index] = object[index].filter(function (e) {
      return e;
    });
  });
  tuples.shift();

  let transitions = input[2].replace(/\),|\)|{|}/g, "").split("(");
  transitions.forEach(function pairs(value, index, object) {
    object[index] = object[index].split(",");
  });
  transitions.shift();

  let initial_state = input[3].replace(/{|}/g, "");
  Array.isArray(initial_state) ? true : (initial_state = [initial_state]);

  let ctl = input[4];
  return {
    states: states,
    tuples: tuples,
    transitions: transitions,
    initial: initial_state,
    ctl: ctl,
  };
}
