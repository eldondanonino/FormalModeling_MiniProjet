# FormalModeling_MiniProjet

M2 Formal Modeling project by Remy CHERKHAOUI, Quentin FELTEN and Daniil ROSSO,
students at Efrei Paris

In this project, we designed an application running a Computation Tree Logic (or CTL for short) algorithm to check if a given Kripke structure satisfies a given CTL formula. 

## Running the application

Go to the project's directory:
```bash
cd FormalModeling_MiniProjet
```

Install all the necessary dependencies:
```bash
npm install
```

Start the application (default location is localhost:8080)
```bash
npm start
```

You can add your own Kripke structures and CTL formulae by replacing file1.txt and file2.txt in **\documents\test_files\\**

See the example at the end of the README for the correct structure.

Alternatively, you can try out your own CTLs directly in the application in the *custom-ctl* field.

## Logical Symbol interpretation for the input file

- NOT      → !(x)
- x AND y  → &(x,y)
- x OR y   → |(x,y)
- x THEN y → T(x,y)

## Glossary

- For All    → A
- Exists     → E
- Next x     → E(X(x)) or A(X(x))
- Globally x → E(G(x)) or A(G(x))
- Finally x  → E(F(x)) or A(F(x))
- x Until y  → E(U(x,y)) or A(U(x,y))

## Input format

- Let AP be a finite set of atomic propositions. A Kripke structure (KS for short) over AP is a 4-tuple (S, L, T, I) where :

  * **'S'** is a finite set of states ;
  * **'L'** is a labeling (or interpretation) function ;
  * **'T'** is a transition relation ;
  * **'I'** is the initial state ;

- CTL proposition in one line

### Example

This example is illustrated by the image _'file1.png'_.
This file can be found in the **\documents\test_files\\** folder.

List of states **S**:

`{S1, S2, S3}`

Label of each state **L**:

`{(S1, {p, q}), (S2, {q}), (S3, {p})}`

List of transitions **T**:

`{(S1, s2), (S2, S1), (S2, S3), (S3, S3)}`

Initial state **I**:

`{S1}`

CTL:

`!(&(p,q))`