from ultralytics import YOLO

model = YOLO("model/best.pt")

def predict_disease(image_path):
    # Use Ultralytics native inference which automatically applies the correct preprocessing 
    # (resizing, padding, normalization) used during model training.
    results = model(image_path)
    
    result = results[0]
    
    class_id = result.probs.top1
    confidence = result.probs.top1conf.item()
    
    disease_name = result.names[class_id]
    
    return {
        "disease": disease_name,
        "confidence": round(confidence * 100, 2)
    }