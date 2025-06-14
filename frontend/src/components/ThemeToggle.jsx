import React, { useState, useEffect } from 'react';
import '../styles/ThemeToggle.css';

const ThemeToggle = ({ toggleTheme, currentTheme }) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);

    setAnimating(true);
    const timeout = setTimeout(() => {
      setAnimating(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentTheme]);

  const handleToggle = () => {
    toggleTheme();
  };

  const iconSrc = currentTheme === 'dark' ? '/assets/sun-icon.jpg' : '/assets/moon-icon.jpg';
  const altText = currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <>
      {animating && <div className="theme-transition" />}
      <button
        className={`theme-toggle-button ${animating ? 'animating' : ''}`}
        onClick={handleToggle}
        aria-label="Toggle theme"
      >
        <img
          className="theme-toggle-icon"
          src={iconSrc}
          alt={altText}
        />
      </button>
    </>
  );
};

export default ThemeToggle;
