import { and, EX, marking, not, EU, AU } from "./algorithms";

export function BaseAlgorithms() {
  console.clear();

  return {
    marking: marking("p"),
    not: not("p"),
    and: and("p", "q"),
    ex: EX("p"),
    eu: EU("q", "p"),
    au: AU("q", "p"),
  };
}
