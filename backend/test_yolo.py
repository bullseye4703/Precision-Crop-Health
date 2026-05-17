from ultralytics import YOLO
import torch
import numpy as np
from PIL import Image

# Create a dummy image
img = Image.fromarray(np.zeros((224, 224, 3), dtype=np.uint8))
img.save("dummy.jpg")

model = YOLO("model/best.pt")
results = model("dummy.jpg")

print(type(results[0]))
print(hasattr(results[0], 'probs'))
if results[0].probs is not None:
    print("top1:", results[0].probs.top1)
    print("top1conf:", results[0].probs.top1conf.item())
else:
    print("probs is None")
