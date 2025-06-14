import React from 'react';
import '../styles/Guide.css'; // optional, untuk styling

const GuideModal = ({ onClose }) => {
  return (
    <div className="guide-overlay">
      <div className="guide-modal">
        <h2>How to Use the Image Authenticity Checker</h2>
        <ol>
          <li>
            <span className="semi-bold">Upload or Drag & Drop an Image.</span> You can select an image from your computer by clicking the upload area, or simply drag and drop the image into the designated box.
          </li>
          <li>
            <span className="semi-bold">Wait for the Image to Load.</span> Once uploaded, the image will be displayed on the screen. Please wait a moment while the system processes the file.
          </li>
          <li>
            <span className="semi-bold">Click the "Analyze" Button.</span> This will trigger the AI model to analyze your image and determine whether it is AI-generated or a real photo.
          </li>
          <li>
            <span className="semi-bold">View the Result.</span> The result will show a prediction (e.g., "AI-generated" or "Real") along with a confidence percentage.
          </li>
        </ol>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default GuideModal;
