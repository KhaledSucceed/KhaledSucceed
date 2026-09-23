# Validation Record

**Date:** 23 September 2026  
**Environment:** Windows 10/11 local PC  
**JDK:** Microsoft OpenJDK 21.0.12.1 LTS

## Compile
Command:
`javac -d out src\CampusFlowFinal.java`

Result: **PASS**

## Self-test
Command:
`java -cp out CampusFlowFinal --selftest`

Results:
- Selection Sort departments: PASS
- Merge Sort courses: PASS
- Insertion Sort students: PASS
- Binary Search department: PASS
- Binary Search student ID: PASS
- Scale 15 / 71 / 16,000: PASS
- **Overall: PASS**

## GUI smoke test
The Swing application was launched directly with Java and remained running without an immediate runtime exception. It was then terminated intentionally after the startup check.

## Scope note
The data is deterministic synthetic demo data matching the documented project scale. The original CSV files were not recovered.