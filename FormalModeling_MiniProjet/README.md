# FormalModeling_MiniProjet

M2 Formal Modeling project by Quentin FELTEN, Remy CHERKHAOUI and Daniil ROSSO,
students at Efrei Paris

In this project, we designed an application running a Computation Tree Logic (or CTL for short) algorithm to check if a given Kripke structure satisfies a given CTL formula. 

## Running the application

### Logical Symbol interpretation for the input file

- NOT      → !(x)
- x AND y  → &(x,y)
- x OR y   → |(x,y)
- x THEN y → T(x,y)

### Glossary

- For All    → A
- Exists     → E
- Next x     → E(X(x)) or A(X(x))
- Globally x → E(G(x)) or A(G(x))
- Finally x  → E(F(x)) or A(F(x))
- x Until y  → E(U(x,y)) or A(U(x,y))

### Input format

- Let AP be a finite set of atomic propositions. A Kripke structure (KS for short) over AP is a 4-tuple (S, L, T, I) where :

  1. 'S' is a finite set of states ;
  2. 'L' is a labeling (or interpretation) function ;
  3. 'T' is a transition relation ;
  4. 'I' is the initial state ; # list the states

- CTL following the interpretation in one line

### Example

_This example is illustrated by the image 'file1.png'
This file can be founed in the 'documents\test_files' folder._

List of states **S**:

`{S1, S2, S3}`

Label of each state **L**:

`{(S1, {p, q}), (S2, {q}), (S3, {p})}`

List of transitions **T**:

`{(S1, s2), (S2, S1), (S2, S3), (S3, S3)}`

Initial state **I**:

`{S1}`

