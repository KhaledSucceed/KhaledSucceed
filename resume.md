# Khaled Nageh — Resume

**AI Engineering Student | Applied AI · Software Engineering · Model Evaluation**

- Email: khaledsucceed@gmail.com
- GitHub: https://github.com/KhaledSucceed
- LinkedIn: https://eg.linkedin.com/in/khaled-najeh

## Education
**Galala University** — Artificial Intelligence Engineering, Undergraduate

Relevant coursework: Machine Learning; Design & Analysis of Algorithms; Digital Image Processing; Discrete Mathematics; Computer Architecture.

## Selected projects

### Letter Recognition — Machine Learning Evaluation
**Python · scikit-learn · SVM · KNN · Random Forest · MLP**

- Compared five multiclass models on the UCI Letter Recognition dataset (20,000 samples, 16 features, 26 classes); the recovered course-project record documents **98.02% test accuracy / macro F1 with SVM RBF**.
- The original notebook was not recovered, so the public code is a clearly labeled clean reimplementation; a fresh reproducible run is reported separately, with **Random Forest at 97.125% accuracy**, and the CI smoke test passes.

→ [Case study](projects/letter-recognition.md) · [Code](projects/letter-recognition/README.md) · [Provenance](projects/letter-recognition/PROJECT_PROVENANCE.md)

### Smoke Detection — Computer Vision Pipeline
**Python · OpenCV · NumPy · Ultralytics YOLO**

- Preserved the recovered historical Python source and published a cleaned CLI implementation of the hybrid pipeline: **YOLO localization → ROI grayscale → Otsu thresholding → mask refinement → heatmap overlay**.
- Structural validation and a synthetic heatmap unit test pass in CI; full end-to-end reproduction is intentionally marked **pending** because the original `firedetect-11x.pt` weights and test image were not recovered, so no detector-performance claim is made.

→ [Case study](projects/smoke-detection.md) · [Code](projects/smoke-detection/README.md) · [Provenance](projects/smoke-detection/PROJECT_PROVENANCE.md)

### CampusFlow — Algorithms & Java
**Java 21 · Swing · Selection Sort · Merge Sort · Insertion Sort · Binary Search**

- Reimplemented the CSE112 college-management project from recovered project evidence using custom sorting/search algorithms, Java Swing, Big-O guidance, and deterministic **synthetic** demo data matching the documented scale of **15 departments / 71 courses / 16,000 students**.
- Java 21 compile, six self-checks, GUI startup, and GitHub Actions validation all pass; the public code is explicitly labeled as a reimplementation because the historical source package and original CSV files were not recovered.

→ [Case study](projects/campusflow.md) · [Code](projects/campusflow/README.md) · [Provenance](projects/campusflow/PROJECT_PROVENANCE.md)

### DiscreteSpell — Discrete Mathematics Software
**React · Vite · Vitest · Trie · Levenshtein · FSM**

- Reimplemented the CSE315 spell-checker project with a **274,937-word** imported English dictionary, custom Trie membership, Levenshtein ranking, finite-state traces, and Turing-style correction visualization.
- Validation is fully automated: **24/24 tests pass, npm audit reports 0 vulnerabilities, and the production build passes**; refactoring the dictionary into 26 lazy-loaded buckets reduced the main JS from roughly **3.6 MB to 226.42 kB**.

→ [Case study](projects/discretespell.md) · [Code](projects/discretespell/README.md) · [Provenance](projects/discretespell/PROJECT_PROVENANCE.md)

## Entrepreneurship & achievements

### MediRush — Co-Founder / Technical Contributor
**AI + IoT wearable safety & health venture**

- Contributed to wearable sensing, alerting, communications, product architecture, and competition delivery for worker-safety and remote-monitoring scenarios.
- Team placed **3rd at RiseUp Summit Hackathon 2026** and received **EGP 75,000 in seed funding through Rally Egypt 2025**.

→ [Case study + official evidence links](projects/medirush.md)

## Additional engineering

### Cinema Booking App
Python/Tkinter desktop application with interactive seat state, price tracking, and JSON persistence.

→ [Repository](https://github.com/KhaledSucceed/Cinema-booking-app)

### PIC16F877A Reaction Game
Embedded reaction-time system with 8 buttons/LEDs, timeout logic, LCD output, and on-device min/max/average timing.

→ [Case study](projects/pic-reaction-game.md)

## Technical skills

- **Programming:** Python, C++, Java, JavaScript
- **ML / Vision:** scikit-learn, NumPy, OpenCV, YOLO, MediaPipe, model evaluation, multiclass classification
- **Software:** React, Vite, Vitest, FastAPI, Streamlit, Tkinter, Java Swing, Git/GitHub
- **Quality:** Unit tests, CI, reproducibility, build verification, provenance documentation
