from ultralytics import YOLO
from PIL import Image

model = YOLO("model/best.pt")

def predict_disease(image_path):
    # Open the image using PIL to ensure it is passed as a PIL Image.
    # This prevents TypeErrors in torchvision transforms which expect PIL Images or Tensors,
    # not numpy arrays (which is what OpenCV might read it as).
    img = Image.open(image_path).convert("RGB")
    
    # Use Ultralytics native inference which automatically applies the correct preprocessing 
    # (resizing, padding, normalization) used during model training.
    results = model(img)
    
    result = results[0]
    
    class_id = result.probs.top1
    confidence = result.probs.top1conf.item()
    
    disease_name = result.names[class_id]
    
    return {
        "disease": disease_name,
        "confidence": round(confidence * 100, 2)
    }