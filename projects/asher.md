# Asher — Multimodal Accessibility AI

## Overview
Asher is an accessibility-focused AI project exploring multimodal communication for people who may face barriers with speech, hearing, literacy, or conventional text-first interfaces.

The current technical prototype focuses on a reproducible **isolated-gesture classification pipeline** and the engineering needed to move from raw video to inference.

## Current engineering scope
- Python
- MediaPipe landmark extraction
- Feature engineering
- scikit-learn model comparison
- Persisted preprocessing and model artifacts
- FastAPI inference service
- Streamlit demo interface
- Automated tests

## Current pipeline

```text
short video
   ↓
MediaPipe landmarks
   ↓
engineered features
   ↓
model comparison / evaluation
   ↓
saved preprocessing + model artifacts
   ↓
API / demo inference
```

## v1 intent set
The current prototype is scoped to 8 essential intents:

`help` · `water` · `yes` · `no` · `hospital` · `pharmacy` · `emergency` · `transport`

## Evidence discipline
The development pipeline can use synthetic landmark data for smoke-testing the software stack before real recordings are available.

Synthetic data is **not** treated as evidence of real-world recognition performance.

Before making real-world accuracy or accessibility claims, the project needs:
1. consented real recordings;
2. participant-level train/validation/test separation;
3. per-class precision/recall and macro F1;
4. latency and failure-case analysis;
5. accessibility testing with intended users.

## Why this project matters for my engineering development
Asher forces me to combine ML experimentation with product engineering, APIs, interfaces, evaluation design, and responsible claims instead of treating a model notebook as a finished AI system.
