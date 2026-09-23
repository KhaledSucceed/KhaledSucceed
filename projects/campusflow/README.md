# CampusFlow — CSE112 Algorithms Reimplementation

**Course:** CSE112 — Design & Analysis of Algorithms  
**University:** Galala University

## Integrity
The historical CampusFlow source ZIP and `CampusFlowFinal.java` are no longer recoverable from the available ChatGPT Project Files or the local PC search. This package is a **clean reimplementation from recovered project requirements and presentation evidence**. It is not presented as the original submission.

## Recovered project requirements
- College Management System
- Departments, courses, and students
- Custom sorting algorithms
- Search by student ID and department name
- Big-O / step-execution emphasis
- GUI presentation layer
- Historical final package recorded a `--selftest` mode

## Reimplementation mapping
- Selection Sort → Departments by name
- Merge Sort → Courses by enrolled-student count
- Insertion Sort → Students by GPA
- Binary Search → Department name
- Binary Search → Student ID

## Demo data
The original CSV files were not recovered. The reimplementation generates deterministic synthetic demo data matching the documented project scale:
- 15 departments
- 71 courses
- 16,000 students

Synthetic data exists only to exercise the algorithms and UI; it is not represented as original university data.

## Build
`javac -d out src\CampusFlowFinal.java`

## Self-test
`java -cp out CampusFlowFinal --selftest`

## Run GUI
`java -cp out CampusFlowFinal`

Recovered slide exports remain in the private local archive and are intentionally excluded from the public-safe Git history.