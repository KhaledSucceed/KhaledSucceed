# DiscreteSpell — Discrete Mathematics Software

## Academic context
**Course:** CSE315 — Discrete Mathematics  
**Project:** Spell Checker / DiscreteSpell

Recovered project material confirms the CSE315 spell-checker project and preserves UI/presentation evidence from the original academic work.

## Recovery status
The historical React/Vite source ZIP is no longer available in the accessible ChatGPT Project Files or on the local PC. The public package is a **clean reimplementation based on recovered project evidence and documented concepts**, not the original source submission.

## Reimplementation
- React + Vite
- Vitest automated testing
- imported English dictionary
- Trie / prefix-tree membership
- Levenshtein edit-distance suggestions
- finite-state-machine character trace
- Turing-style correction trace
- discrete-mathematics concept matrix

## Engineering improvement
The first build bundled the full dictionary into browser JavaScript. The final implementation generates 26 per-letter JSON buckets and lazy-loads only the relevant bucket.

Final build:
- **274,937 imported English words**
- main JS: **226.42 kB**
- gzip: **71.02 kB**

## Validation
- `npm audit`: **0 vulnerabilities**
- test files: **3 / 3 PASS**
- tests: **24 / 24 PASS**
- Vite production build: **PASS**
- production preview HTTP response: **200**

→ [Public code package](discretespell/README.md)

## What this demonstrates
- translating discrete-mathematics concepts into software behavior
- custom Trie and edit-distance logic
- automated testing
- dependency/security hygiene
- bundle-size diagnosis and optimization
- transparent separation of recovered evidence from rebuilt code
