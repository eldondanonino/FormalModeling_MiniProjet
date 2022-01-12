# FormalModeling_MiniProjet

M2 Formal modeling project by Quentin FELTEN, Remy CHERKHAOUI and Daniil ROSSO
Efrei

### Logical Symbol interpretation for the input file

- NOT → !
- AND → &
- OR → OR
- THEN → >
- IFAOF → <>
- BELONGS TO → BELONGS
- EXISTS → EXISTS
- FOR EVERY → v
- PHI → PHI
- PSI → PSI
- IS TRUE → IST

### Glossary

- A → All
- E → Exists
- X → Next
- G → Globally
- F → Finally
- x U y → x Until y

### Input format

- Let AP be a finite set of atomic propositions. A Kripke structure (KS for short) over AP is a 4-tuple (S, L, T, I) where :

  1. 'S' is a finite set of states ;
  2. 'L' is a labeling (or interpretation) function ;
  3. 'T' is a transition relation ;
  4. 'I' is the initial state ;# list the states

- CTL following the interpretation in one line

### Example

_This example is illustrated by the image 'KripkeStructureExample.png'_

List of states **S**:

`{S1, S2, S3}`

Label of each sate **L**:

`{(S1, {p, q}), (S2, {q}), (S3, {p})}`

List of transitions **T**:

`{(S1, s2), (S2, S1), (S2, S3), (S3, S3)}`

Initial state **I**:

`{S1}`
