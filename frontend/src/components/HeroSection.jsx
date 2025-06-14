import '../styles/HeroSection.css';
import lightImage from '/assets/male.png';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


const landmarks = [
  { top: 388, left: 320 }, 
  { top: 390, left: 368 }, 
  { top: 450, left: 299 },
  { top: 510, left: 327 }, 
  { top: 545, left: 398 }, 
  { top: 483, left: 360 },
  { top: 482, left: 432 }, 
  { top: 430, left: 395 }, 
  { top: 510, left: 465 },
  { top: 450, left: 491 }, 
  { top: 387, left: 475 }, 
  { top: 388, left: 422 },
];

const HeroSection = ({ currentTheme }) => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (textRef.current) textRef.current.style.opacity = '1';
    if (imageRef.current) imageRef.current.style.opacity = '1';
  },[]);

  return (
    <section className="hero-container">
      <div className="hero-content">
        {/* Left Text */}
        <div className="hero-text" ref = {textRef}>
          <h1>AI Image Recognition</h1>
          <p>
            Enjoy our Mini-Games and experience how AI can recognize images in real time while you play!
          </p>
          <div className="button-row">
            <div className="nav-actions">
              {/* Tombol Mini-Games */}
              <button
                className="btn btn--svg js-animated-button"
                onClick={() => {
                  const el = document.getElementById('model-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="btn--svg__label">Get Started</span>
                <svg width="190" viewBox="0 0 60 60" className="btn--svg__circle">
                  <circle fill="#fff" cx="30" cy="30" r="28.7" className="js-discover-circle"></circle>
                </svg>
                <svg preserveAspectRatio="none" viewBox="2 29.3 56.9 13.4" width="190" className="btn--svg__border">
                  <g className="btn--svg__border--left js-discover-left-border">
                    <path d="M30.4,41.9H9c0,0-6.2-0.3-6.2-5.9S9,30.1,9,30.1h21.4" />
                  </g>
                  <g className="btn--svg__border--right js-discover-right-border">
                    <path d="M30.4,41.9h21.5c0,0,6.1-0.4,6.1-5.9s-6-5.9-6-5.9H30.4" />
                  </g>
                </svg>
                </button>
              {/* Tombol Mini-Games */}
                <Link to="/minigames" className="btn btn--svg js-animated-button">
                  <span className="btn--svg__label">Mini-Games</span>
                  <svg width="190" viewBox="0 0 60 60" className="btn--svg__circle">
                    <circle fill="#fff" cx="30" cy="30" r="28.7" className="js-discover-circle"></circle>
                  </svg>
                  <svg preserveAspectRatio="none" viewBox="2 29.3 56.9 13.4" width="190" className="btn--svg__border">
                    <g className="btn--svg__border--left js-discover-left-border">
                      <path d="M30.4,41.9H9c0,0-6.2-0.3-6.2-5.9S9,30.1,9,30.1h21.4" />
                    </g>
                    <g className="btn--svg__border--right js-discover-right-border">
                      <path d="M30.4,41.9h21.5c0,0,6.1-0.4,6.1-5.9s-6-5.9-6-5.9H30.4" />
                    </g>
                  </svg>
                  </Link>
            </div>
          </div>

        </div>

        {/* Right Image + Overlay */}
        <div className="hero-right face-wrapper" ref = {imageRef}>
          <img src={lightImage} alt="Face" className="image hover-scale" />
          {/* Landmark Dots */}
          {landmarks.map((point, index) => (
            <div
              key={index}
              className="dot"
              style={{ top: `${point.top}px`, left: `${point.left}px` }}
            />
          ))}

          {/* Bounding Corners & Scan Line */}
          <div className="face-grid">
            <div className="corner tl"></div>
            <div className="corner tr"></div>
            <div className="corner bl"></div>
            <div className="corner br"></div>
            <div className="scan-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
