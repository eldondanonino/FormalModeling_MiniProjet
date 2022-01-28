# FormalModeling_MiniProjet

M2 Formal Modeling project by Quentin FELTEN, Remy CHERKHAOUI and Daniil ROSSO
Efrei

### Logical Symbol interpretation for the input file

- NOT → !(x)
- x AND y → &(x,y)
- x OR y → |(x,y)
-x THEN y → T(x,y)

### Glossary

- For All   → A
- Exists   → E
- Next x     → EX(x) or AX(x)
- Globally x → EG(x) or AG(x)
- Finally x  → EF(x) or AF(x)
- x Until y → EU(x,y) or AU(x,y)

### Input format

- Let AP be a finite set of atomic propositions. A Kripke structure (KS for short) over AP is a 4-tuple (S, L, T, I) where :

  1. 'S' is a finite set of states ;
  2. 'L' is a labeling (or interpretation) function ;
  3. 'T' is a transition relation ;
  4. 'I' is the initial state ; # list the states

- CTL following the interpretation in one line

### Example

_This example is illustrated by the image 'KripkeStructureExample.png'_

List of states **S**:

`{S1, S2, S3}`

Label of each state **L**:

`{(S1, {p, q}), (S2, {q}), (S3, {p})}`

List of transitions **T**:

`{(S1, s2), (S2, S1), (S2, S3), (S3, S3)}`

Initial state **I**:

`{S1}`
