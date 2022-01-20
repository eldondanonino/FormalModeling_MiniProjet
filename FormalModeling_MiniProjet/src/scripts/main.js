import { output} from "./parser";
import { and, EX, marking, not, EU } from "./algorithms";

output();

console.log("Marking of p:\n");
console.log(marking("p"));
console.log("Marking of q:\n");
console.log(marking("q"));
console.log("Not p:\n");
console.log(not("p"));
console.log("p and q:\n");
console.log(and("p", "q"));
console.log("EX of p:\n");
console.log(EX("p"));
console.log("E(q U p):\n");
console.log(EU("q", "p"));
