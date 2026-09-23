import cv2
import numpy as np
import os
from ultralytics import YOLO

model_path = 'firedetect-11x.pt'
if not os.path.exists(model_path):
    print("Error: Could not find AI model file.")
    exit()

model = YOLO(model_path)

image_path = 'test_images/Smoke_Photo_1.jpg.jpg'
if not os.path.exists(image_path):
    print("Error: Could not find image.")
else:
    img = cv2.imread(image_path)
    original_img = img.copy()

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    results = model.predict(source=img, conf=0.25)

    ai_mask = np.zeros(gray.shape, dtype=np.uint8)

    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            roi_gray = gray[y1:y2, x1:x2]
            _, roi_mask = cv2.threshold(
                roi_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
            )
            ai_mask[y1:y2, x1:x2] = cv2.bitwise_or(
                ai_mask[y1:y2, x1:x2], roi_mask
            )

    smooth_mask = cv2.GaussianBlur(ai_mask, (25, 25), 0)

    full_heatmap = cv2.applyColorMap(gray, cv2.COLORMAP_TURBO)
    soft_mask_float = (
        cv2.GaussianBlur(smooth_mask, (101, 101), 0).astype(float) / 255.0
    )
    colorful_smoke = (
        full_heatmap.astype(float) * soft_mask_float[:, :, np.newaxis]
    ).astype(np.uint8)

    alpha = 0.5
    final_analysis = cv2.addWeighted(
        colorful_smoke, alpha, original_img, 1.0 - alpha, 0
    )

    if len(results[0].boxes) > 0:
        cv2.putText(
            final_analysis,
            "SYSTEM STATUS: SMOKE DETECTED",
            (15, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 0, 255),
            1,
        )

    cv2.imshow('1. Original Image', original_img)
    cv2.imshow('2. AI Detailed Mask', ai_mask)
    cv2.imshow('3. Final AI Heatmap Analysis', final_analysis)

    cv2.waitKey(0)
    cv2.destroyAllWindows()
