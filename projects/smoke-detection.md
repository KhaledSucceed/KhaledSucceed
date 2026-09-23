# Smoke Detection — Computer Vision Pipeline

## Goal
Detect smoke regions and refine their visual segmentation using a hybrid pipeline that combines learned object detection with classical image processing.

## Pipeline

```text
input image
   ↓
YOLOv11x smoke localization
   ↓
detected ROI
   ↓
grayscale conversion
   ↓
Otsu thresholding
   ↓
mask refinement / visualization
```

## Documented implementation details
- Model: `firedetect-11x.pt`
- YOLO confidence threshold: `0.25`
- Python + OpenCV + NumPy + Ultralytics YOLO
- Otsu thresholding is applied inside the detector-produced region of interest
- Recorded mask / heatmap smoothing kernels: `(25, 25)` and `(101, 101)`
- Recorded blending factor: `0.5`

## Why combine approaches?
The detector provides semantic localization; classical image processing then operates only on the candidate region. This reduces the area being segmented and makes the pipeline easier to inspect visually.

## Current limitations
This case study documents the implemented pipeline, not a validated benchmark. Precision/recall, dataset provenance, robustness under lighting changes, smoke density, and false-positive analysis must be recovered before making performance claims.

## Next engineering step
Recover the original dataset and source files, build a reproducible evaluation set, and report detector + segmentation failure cases rather than relying only on qualitative screenshots.
