# Letter Recognition — Reproducible ML Evaluation

**Course:** AIE121 — Machine Learning  
**University:** Galala University

This public package is a clean, reproducible reimplementation based on the recovered course-project design and documented metrics. The original notebook/script was not recovered, so this code is not presented as the original submission.

## Dataset
UCI Letter Recognition:
- 20,000 samples
- 16 numerical features
- 26 classes (A–Z)

## Models
- K-Nearest Neighbors
- SVM with RBF kernel
- Logistic Regression
- MLPClassifier
- Random Forest

## Historical documented result
The recovered presentation recorded **98.02% test accuracy and macro F1 with SVM RBF**.

## Reproduced run
A fresh deterministic run on 23 September 2026 completed successfully. See:
- `results/documented_results.csv`
- `results/reproduced_results.csv`
- `VALIDATION.md`

## Run
1. `python -m venv .venv`
2. Activate the virtual environment
3. `pip install -r requirements.txt`
4. `python src/train_evaluate.py`

The script downloads the UCI dataset at runtime. Reproduced values can differ from the historical course-project metrics because the original notebook, tuning choices, and exact split were not recovered.
