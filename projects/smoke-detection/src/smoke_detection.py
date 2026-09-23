from __future__ import annotations

import argparse
from pathlib import Path

import cv2
import numpy as np


def build_smoke_mask(image, model, confidence):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    mask = np.zeros(gray.shape, dtype=np.uint8)
    results = model.predict(source=image, conf=confidence, verbose=False)

    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            roi = gray[y1:y2, x1:x2]
            if roi.size == 0:
                continue
            _, roi_mask = cv2.threshold(
                roi, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
            )
            mask[y1:y2, x1:x2] = cv2.bitwise_or(
                mask[y1:y2, x1:x2], roi_mask
            )
    return mask


def create_heatmap(image, mask, alpha):
    smooth_mask = cv2.GaussianBlur(mask, (25, 25), 0)
    heat = cv2.GaussianBlur(smooth_mask, (101, 101), 0)
    heat = cv2.normalize(heat, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
    color = cv2.applyColorMap(heat, cv2.COLORMAP_JET)

    result = image.copy()
    active = heat > 0
    blended = cv2.addWeighted(image, 1 - alpha, color, alpha, 0)
    result[active] = blended[active]
    return result


def main():
    from ultralytics import YOLO

    parser = argparse.ArgumentParser(description="Hybrid YOLO + Otsu smoke detection demo")
    parser.add_argument("--model", required=True, type=Path)
    parser.add_argument("--image", required=True, type=Path)
    parser.add_argument("--output", default=Path("output.jpg"), type=Path)
    parser.add_argument("--confidence", default=0.25, type=float)
    parser.add_argument("--alpha", default=0.5, type=float)
    args = parser.parse_args()

    if not args.model.exists():
        raise FileNotFoundError(f"Model not found: {args.model}")
    if not args.image.exists():
        raise FileNotFoundError(f"Image not found: {args.image}")

    image = cv2.imread(str(args.image))
    if image is None:
        raise ValueError(f"Could not decode image: {args.image}")

    model = YOLO(str(args.model))
    mask = build_smoke_mask(image, model, args.confidence)
    output = create_heatmap(image, mask, args.alpha)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    if not cv2.imwrite(str(args.output), output):
        raise RuntimeError(f"Failed to save output: {args.output}")
    print("Saved:", args.output)


if __name__ == "__main__":
    main()
