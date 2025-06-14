from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

# Load model
model = load_model('ai_imageclassifier.h5')
print("✅ Model loaded successfully!")

@app.route('/')
def home():
    return jsonify({
        'status': 'API is running',
        'endpoints': ['/predict']
    })

def preprocess_image(file):
    # Convert file to PIL Image
    file.seek(0)
    image_bytes = io.BytesIO(file.read())
    pil_image = Image.open(image_bytes)
    
    # Convert to RGB and resize to 32x32
    if pil_image.mode != 'RGB':
        pil_image = pil_image.convert('RGB')
    
    pil_image = pil_image.resize((32, 32))
    
    # Convert to array and normalize
    img_array = np.array(pil_image) / 255.0
    
    # Add batch dimension
    return np.expand_dims(img_array, axis=0)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400

        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400

        # Preprocess and predict
        img_array = preprocess_image(file)
        pred = model.predict(img_array)
        
        # Ambil nilai prediksi (sigmoid output)
        y_pred = float(pred[0][0])
        
        # Sama seperti di training: > 0.5 = REAL, <= 0.5 = AI
        if y_pred > 0.5:
            class_name = "Real Image"
            predicted_class = 1
            confidence = y_pred
        else:
            class_name = "AI Generated"
            predicted_class = 0
            confidence = 1 - y_pred  # Confidence untuk AI = seberapa jauh dari 0.5
        
        return jsonify({
            'success': True,
            'predicted_class': predicted_class,
            'class_name': class_name,
            'confidence': confidence,
            'confidence_percentage': f"{confidence * 100:.1f}%",
            'raw_prediction': y_pred
        })

    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

if __name__ == '__main__':
    print("🚀 Starting Flask server at http://127.0.0.1:5000")
    app.run(debug=True, host='127.0.0.1', port=5000)