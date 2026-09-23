# Smoke Detection — Hybrid YOLO + Otsu Pipeline

**Course:** CSE281 — Image Processing  
**University:** Galala University

This package preserves the recovered project source and adds a cleaned CLI implementation for reproducibility.

## Pipeline
YOLO smoke localization → ROI grayscale → Otsu thresholding → mask refinement → Gaussian smoothing → heatmap overlay.

## Recovered parameters
- Model filename: `firedetect-11x.pt`
- Confidence threshold: `0.25`
- Mask blur: `(25, 25)`
- Heatmap blur: `(101, 101)`
- Alpha: `0.5`

## Files
- `original_recovered/main.py` — recovered project source
- `src/smoke_detection.py` — cleaned CLI implementation
- `VALIDATION.md` — current validation status

## Missing runtime assets
The original model weights and original test image have not been recovered.

Expected locations:
- `models/firedetect-11x.pt`
- `test_images/smoke.jpg`

## Run
1. `python -m venv .venv`
2. Activate the virtual environment
3. `pip install -r requirements.txt`
4. `python src/smoke_detection.py --model models/firedetect-11x.pt --image test_images/smoke.jpg --output output.jpg`

No detector-performance claims are made until the original or an explicitly approved evaluation model/dataset is available.
