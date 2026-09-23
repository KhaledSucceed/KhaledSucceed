# Validation Record

**Date:** 23 September 2026  
**Command:** `python src/train_evaluate.py`  
**Result:** PASS (exit code 0)

Fresh reimplementation results:
- Random Forest: accuracy 0.97125, macro F1 0.971151
- MLPClassifier: accuracy 0.95450, macro F1 0.954241
- SVM RBF: accuracy 0.94850, macro F1 0.948435
- KNN: accuracy 0.94325, macro F1 0.943171
- Logistic Regression: accuracy 0.77425, macro F1 0.772762

These results validate the public reimplementation. They do not replace the historical course-project metrics in `results/documented_results.csv`.
