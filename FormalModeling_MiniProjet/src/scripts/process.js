export function process(input) {
    console.log('starting processing')
    let states = input[0].replace(/{|}/g, "").split(",");
    console.log("States: ");
    console.log(states);
  
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
    console.log("tuples: ");
    console.log(tuples);
  
    let transitions = input[2].replace(/\),|\)|{|}/g, "").split("(");
    transitions.forEach(function pairs(value, index, object) {
      object[index] = object[index].split(",");
    });
    transitions.shift();
    console.log("transitions: ");
    console.log(transitions);
  
    let initial_state = input[3].replace(/{|}/g, "");
    Array.isArray(initial_state) ? true : initial_state = [initial_state];
  
    console.log("initial state: ");
    console.log(initial_state);
  
    let ctl = input[4];
    console.log("ctl: ");
    console.log(ctl);
    return {
      states: states,
      tuples: tuples,
      transitions: transitions,
      initial: initial_state,
      ctl: ctl,
    };
  }