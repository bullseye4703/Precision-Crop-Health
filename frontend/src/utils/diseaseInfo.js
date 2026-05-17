export const diseaseDictionary = {
  "Tomato___Early_blight": {
    cause: "Fungus Alternaria solani",
    symptoms: "Brown spots with concentric rings on lower leaves.",
    treatment: "Use copper-based fungicides. Remove infected leaves.",
    prevention: "Crop rotation, avoid overhead watering, ensure spacing.",
    hindiDiagnosis: "यह पौधे में अर्ली ब्लाइट रोग पाया गया है। कृपया कॉपर आधारित फंगीसाइड का उपयोग करें।"
  },
  "Tomato___Late_blight": {
    cause: "Oomycete Phytophthora infestans",
    symptoms: "Water-soaked spots on leaves, white fungal growth on undersides.",
    treatment: "Apply specific fungicides like chlorothalonil immediately.",
    prevention: "Plant resistant varieties, destroy volunteer plants.",
    hindiDiagnosis: "इस पौधे में लेट ब्लाइट रोग पाया गया है। कृपया तुरंत फंगीसाइड जैसे क्लोरोथालोनिल का प्रयोग करें।"
  },
  "Potato___Healthy": {
    cause: "N/A",
    symptoms: "Lush green leaves, upright stems.",
    treatment: "None required.",
    prevention: "Maintain current care routines.",
    hindiDiagnosis: "पौधा स्वस्थ दिखाई दे रहा है। किसी रोग का पता नहीं चला।"
  },
  "Pepper__bell___Bacterial_spot": {
    cause: "Xanthomonas campestris",
    symptoms: "Small, water-soaked spots on leaves turning brown/black.",
    treatment: "Copper sprays can slow spread but not cure.",
    prevention: "Use disease-free seeds, practice crop rotation.",
    hindiDiagnosis: "काली मिर्च के पौधे में बैक्टीरियल स्पॉट रोग पाया गया है। कॉपर स्प्रे इस रोग को फैलने से रोक सकता है। अगले सीजन में फसल चक्र का पालन करें।"
  },
  "Healthy": {
    cause: "N/A",
    symptoms: "Vibrant growth, no discoloration.",
    treatment: "None required.",
    prevention: "Optimal watering and fertilization.",
    hindiDiagnosis: "पौधा स्वस्थ दिखाई दे रहा है। किसी रोग का पता नहीं चला।"
  }
};

export const getDiseaseInfo = (diseaseName) => {
  if (diseaseName.includes('Healthy') || diseaseName.includes('healthy')) {
    return diseaseDictionary["Healthy"];
  }
  return diseaseDictionary[diseaseName] || {
    cause: "Pathogenic infection or environmental stress.",
    symptoms: "Visible discoloration, wilting, or lesions.",
    treatment: "Consult local agricultural extension for specific fungicides.",
    prevention: "Maintain proper spacing, watering, and sanitation.",
    hindiDiagnosis: `इस पौधे में ${diseaseName.replace(/_/g, ' ')} के लक्षण हैं। कृपया स्थानीय कृषि विशेषज्ञों से संपर्क करें।`
  };
};
