# Project Provenance — DiscreteSpell

## Confirmed academic context

- **Course:** CSE315 — Discrete Mathematics
- **Project:** Spell Checker / DiscreteSpell
- **University:** Galala University

Official CSE315 project-title material includes Spell Checker, and recovered project exports show the original academic UI/course framing.

## Recovered evidence

Privacy-sensitive slide/UI exports from the original project period are preserved in the private academic archive and intentionally excluded from the public repository.

Historical artifact names recovered from the available project archives include:
- `DiscreteSpell_VisualLab_v3.zip`
- `CSE315_Project_REAL_IMPORTED_DICTIONARY_FIXED.zip`
- `DiscreteSpell_Final_Synchronized_Report.docx`
- `DiscreteSpell_Final_Synchronized_Report.pdf`
- `Discrete_Project_Presentation_Slide_Images.zip`
- `DiscreteSpell_Final_10Slides.pptx`
- `DiscreteSpell_MAX_Visual_Academic_Report.docx`
- `DiscreteSpell_MAX_Visual_Academic_Report.pdf`

The historical source package itself is not available in the current project archives or local backups.

## Public reimplementation boundary

The React/Vite/Vitest package is a clean reimplementation. It is **not** represented as the original source submission.

It preserves the documented concepts:
- imported English dictionary;
- Trie / prefix tree;
- Levenshtein edit distance;
- finite-state-machine trace;
- Turing-style correction trace;
- course-concept matrix;
- automated tests.

## Engineering improvements

The initial reimplementation bundled the full dictionary into browser JavaScript. The final build generates 26 letter buckets and lazy-loads the relevant bucket, reducing the main JS to 226.42 kB while retaining 274,937 imported words.

The final dependency audit reports 0 vulnerabilities and the automated test suite reports 24 / 24 PASS.
