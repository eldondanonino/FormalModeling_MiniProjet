import { parse } from "./parser";
import { process } from "./process";


let data = process(parse());
let tuples = data.tuples;
let states = data.states;

export function marking(atomicProp) {
    let table = [];

    tuples.forEach(function iter(index, value, object) {
        index.includes(atomicProp) ? table.push(true) : table.push(false); //put the result in the truth table
    });

    return table;
}

export function not(atomicProp) {
    let table = marking(atomicProp);
    let table_not = [];
    for (var i = 0; i < table.length; i++){
        table[i] == true ? table_not.push(false) : table_not.push(true);
    }

    return table_not;
}

export function and(atomicProp1, atomicProp2){
    let table1 = marking(atomicProp1);
    let table2 = marking(atomicProp2);
    let table_and = [];

    for (var i = 0; i < table1.length; i++){
        table1[i] == true && table2[i] == true ? table_and.push(true) : table_and.push(false);
    }

    return table_and;
}

export function exists_X(atomicProp){
    
}