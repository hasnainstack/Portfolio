---
title: "Why computer vision still feels like magic (even when you built it)"
date: "2026-06-01"
tag: "computer-vision"
excerpt: "Notes on the gap between knowing how a detector works and still being surprised when it works."
---

There's a specific moment, every time I train a model, where I know exactly
what's happening under the hood and I'm still surprised it works.

You can walk through the math. You can explain the loss function, the anchor
boxes, the non-max suppression pass that cleans up overlapping predictions.
None of that removes the small jolt of watching a bounding box lock onto a
plate of food in a frame the model has never seen.
