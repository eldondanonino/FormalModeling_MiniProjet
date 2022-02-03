import { and, EX, marking, not, EU, AU } from "./algorithms";

export function BaseAlgorithms(atom1, atom2) {
  //weird interaction : cannot log the atoms
  return {
    marking: marking(atom1),
    not: not(atom1),
    and: and(atom1, atom2),
    ex: EX(atom1),
    eu: EU(atom1, atom2),
    au: AU(atom1, atom2),
  };
}
