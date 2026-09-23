# CampusFlow — Algorithms & Java

## Academic context
**Course:** CSE112 — Design & Analysis of Algorithms  
**Project:** College Management System / CampusFlow

Recovered project evidence establishes the system as an algorithms-focused college-management project covering sorting, searching, Big-O analysis, and a GUI presentation layer.

## Recovery status
The historical source ZIP and original `CampusFlowFinal.java` are no longer available in the accessible ChatGPT Project Files or on the local PC. The public package is therefore a **clean reimplementation from recovered requirements and presentation evidence**, not the original university submission.

## Reimplementation
- Java Swing desktop UI
- custom Selection Sort → departments by name
- custom Merge Sort → courses by enrollment
- custom Insertion Sort → students by GPA
- Binary Search → department name
- Binary Search → student ID
- complexity guide in the UI
- deterministic `--selftest` mode

## Data boundary
The original CSV files were not recovered. The public implementation generates deterministic synthetic data matching the documented project scale:

- 15 departments
- 71 courses
- 16,000 students

Synthetic records are used only to exercise the algorithms; they are not represented as original university data.

## Validation
Validated locally on Microsoft OpenJDK 21.0.12.1:

- compile: **PASS**
- Selection Sort: **PASS**
- Merge Sort: **PASS**
- Insertion Sort: **PASS**
- department Binary Search: **PASS**
- student-ID Binary Search: **PASS**
- 15 / 71 / 16,000 scale check: **PASS**
- GUI startup smoke test: **PASS**
- overall self-test: **PASS**

→ [Public code package](campusflow/README.md)

## What this demonstrates
- algorithm implementation without library-sort shortcuts for the core teaching algorithms
- algorithm-to-domain mapping
- time-complexity awareness
- Java desktop application structure
- explicit provenance and synthetic-data boundaries
- executable validation rather than screenshot-only evidence
