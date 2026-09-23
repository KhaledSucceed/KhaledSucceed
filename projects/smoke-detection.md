# Smoke Detection — Computer Vision Pipeline

## Goal
Detect smoke regions and refine their visual segmentation using a hybrid pipeline combining learned object detection with classical image processing.

## Pipeline

`input image → YOLO localization → detected ROI → grayscale → Otsu thresholding → mask refinement → heatmap`

## Recovered implementation details
- Model filename: `firedetect-11x.pt`
- confidence threshold: `0.25`
- Python + OpenCV + NumPy + Ultralytics YOLO
- Otsu thresholding inside detector-produced regions
- mask / heatmap smoothing kernels: `(25, 25)` and `(101, 101)`
- alpha blending: `0.5`

## Reproducibility status
The recovered source and a cleaned CLI version are now public. The original model weights and test image are still missing, so the repository is structurally validated but not yet fully runtime-reproduced.

→ [Public code package](smoke-detection/README.md)

## Current limitations
No detector precision/recall or robustness claim is made until the original or an explicitly approved evaluation model/dataset is available.
