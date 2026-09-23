# Letter Recognition — Machine Learning Evaluation

## Problem
Classify English capital letters using the UCI Letter Recognition dataset while comparing multiple model families under a consistent evaluation setup.

## Dataset
- 20,000 samples
- 16 numerical features
- 26 classes

## Models compared
- K-Nearest Neighbors
- SVM with RBF kernel
- Logistic Regression
- MLPClassifier
- Random Forest

## Documented results

| Model | Test Accuracy | Macro F1 | Train Time | Prediction / Sample |
|---|---:|---:|---:|---:|
| KNN | 95.45% | 95.42% | 16.10 s | 0.000682 s |
| SVM RBF | **98.02%** | **98.02%** | 63.33 s | 0.002410 s |
| Logistic Regression | 76.95% | 76.73% | 4.31 s | **0.000006 s** |
| MLPClassifier | 97.45% | 97.44% | 111.64 s | 0.000008 s |
| Random Forest | 96.77% | 96.76% | 17.27 s | 0.000042 s |

## Engineering takeaway
The highest-accuracy model was not automatically the best deployment choice. SVM RBF delivered the strongest accuracy, while Random Forest offered a more attractive speed/accuracy balance. Logistic Regression was extremely fast but underfit the nonlinear class structure.

## What this project demonstrates
- Controlled model comparison
- Multiclass classification
- Metric-based decision making
- Accuracy vs. inference/training trade-offs
- Clear separation between “best metric” and “best engineering choice”

## Evidence status
These figures come from the documented course-project evaluation. The source notebook/code should be recovered and published before this becomes a standalone reproducible repository.
