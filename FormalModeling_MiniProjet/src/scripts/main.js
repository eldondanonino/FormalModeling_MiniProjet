import { output, parse, process } from "./parser";
import {and, EX, marking, not} from "./algorithms"

output();

console.log("Marking of p:\n" + marking("p"));
console.log("Marking of q:\n" + marking("q"));
console.log("Not p:\n" + not("p"));
console.log("p and q:\n" + and("p", "q"));
console.log("EX of p:\n" + EX("p"));