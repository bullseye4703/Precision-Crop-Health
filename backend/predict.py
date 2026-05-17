from ultralytics import YOLO
from PIL import Image
import torch
import torchvision.transforms as transforms

model = YOLO("model/best.pt")

# Get underlying classification model
classifier = model.model
classifier.eval()

# Define transforms manually
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def predict_disease(image_path):

    img = Image.open(image_path).convert("RGB")

    img_tensor = transform(img).unsqueeze(0)

    with torch.no_grad():
        outputs = classifier(img_tensor)

    probs = torch.softmax(outputs, dim=1)

    confidence, class_id = torch.max(probs, dim=1)

    confidence = confidence.item()
    class_id = class_id.item()

    disease_name = model.names[class_id]

    return {
        "disease": disease_name,
        "confidence": round(confidence * 100, 2)
    }