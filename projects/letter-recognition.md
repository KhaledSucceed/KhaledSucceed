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

## Documented course-project results

| Model | Test Accuracy | Macro F1 | Train Time | Prediction / Sample |
|---|---:|---:|---:|---:|
| KNN | 95.45% | 95.42% | 16.10 s | 0.000682 s |
| SVM RBF | **98.02%** | **98.02%** | 63.33 s | 0.002410 s |
| Logistic Regression | 76.95% | 76.73% | 4.31 s | **0.000006 s** |
| MLPClassifier | 97.45% | 97.44% | 111.64 s | 0.000008 s |
| Random Forest | 96.77% | 96.76% | 17.27 s | 0.000042 s |

## Engineering takeaway
The highest-accuracy model was not automatically the best deployment choice. SVM RBF delivered the strongest documented accuracy, while Random Forest offered a more attractive speed/accuracy balance.

## Reproducibility status
The original notebook was not recovered. A transparent reimplementation has now been published and run successfully. The fresh run is stored separately from the historical metrics so the two are not conflated.

→ [Public code package](letter-recognition/README.md)

## What this demonstrates
- controlled model comparison
- multiclass classification
- metric-based decision making
- accuracy vs. training/inference trade-offs
- explicit distinction between historical evidence and reproduced results
