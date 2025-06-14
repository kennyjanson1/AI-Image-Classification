import React, { useState, useCallback } from 'react';
import '../styles/model.css';

const Model = () => {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImage = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target.result);
        setResult(null);
        setShowPopup(false);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        handleImage(file);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImage(file);
  };

  const openFileDialog = () => {
    document.getElementById('image-input').click();
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setResult(`${data.class_name} | Confidence: ${data.confidence_percentage}`);
      } else {
        setResult(`Error: ${data.error || 'Unknown error occurred'}`);
      }
      
      setShowPopup(true);
    } catch (error) {
      console.error('Prediction error:', error);
      setResult('Error: Unable to connect to AI model. Please make sure the server is running.');
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPreviewSrc(null);
    setResult(null);
    setShowPopup(false);
    setFile(null);
    setLoading(false);
  };

  return (
    <div className="upload-container" id='model-section'>
      <div className="section-container">
        <h1 className="model-title">Analyze Any Image — Instantly Detect AI or Real</h1>
        <p className="model-subtitle">Upload or paste an image below to begin analysis.</p>

        <div 
          className="upload-box" 
          onClick={openFileDialog}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onPaste={handlePaste}
        >
          <p>
            <span className="upload-icon">⬆️</span> Paste, drag, or{' '}
            <span className="upload-link">upload an image</span> here
          </p>
          <input
            type="file"
            accept="image/*"
            id="image-input"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {previewSrc && (
            <div className="image-preview-inline" onClick={(e) => e.stopPropagation()}>
              <img src={previewSrc} alt="Preview" className="preview-image-small" />
              <div className="button-group">
                <button 
                  className="analyze-button" 
                  onClick={handleAnalyze}
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Analyze'}
                </button>
                <button className="reset-button" onClick={handleReset}>Reset</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Analysis Result</h2>
            <p>{result}</p>
            <button className="close-popup" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Model;