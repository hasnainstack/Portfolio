---
title: "Five Things YOLO Training Taught Me the Hard Way"
date: "2025-05-22"
tag: "computer-vision"
excerpt: "Lessons from training a food detection model that didn't show up in any tutorial."
---

Training the food detection model for the gym coaching project was the first time I ran a full YOLO pipeline end to end. The tutorials make it look clean. It isn't.

## 1. Class imbalance kills precision quietly

The food-not-food dataset had roughly 3× more non-food images. The model learned to hedge — it would classify ambiguous frames as non-food because that was statistically safer. Precision looked fine in aggregate. Per-class recall told the real story. Resampling to a 1.2:1 ratio fixed it.

## 2. Augmentation that looks aggressive is usually fine

I was conservative with augmentation early on — worried about distorting food textures. Turning up mosaic, random flip, and HSV shifts significantly improved generalisation on real camera frames without hurting validation metrics. The model had been memorising lighting conditions.

## 3. Validation loss plateauing ≠ time to stop

I stopped two runs early because val loss flattened. Both times, mAP was still climbing. They're measuring different things. Watch mAP@0.5 as the primary signal, not loss curves.

## 4. Colab disconnects mid-epoch if you're not careful

Saving a checkpoint every 5 epochs instead of only at the end saved me from losing a 3-hour run twice. Simple fix, obvious in hindsight.

## 5. Inference speed on CPU is a different problem entirely

The model performed well in Colab. On a modest CPU it was too slow for a responsive camera pipeline. Exporting to ONNX and running with the ONNX Runtime brought inference time down from ~180ms to ~40ms per frame — enough to feel real-time.
