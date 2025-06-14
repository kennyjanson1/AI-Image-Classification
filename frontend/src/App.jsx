// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import MissionSection from './components/AboutUs.jsx';
import ThemeToggle from './components/ThemeToggle';
import Model from './components/model.jsx';
import Guide from './components/Guide.jsx';
import Minigames from './components/MiniGames.jsx';
import './styles/Layout.css';

function App() {
  const [theme, setTheme] = React.useState('light');
  const [showGuide, setShowGuide] = React.useState(false);
  const aboutRef = React.useRef(null);

  // Inisialisasi tema dari localStorage atau preferensi sistem
  React.useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  // Menjalankan FinisherHeader secara global
  React.useEffect(() => {
    const oldScript = document.getElementById('finisher-header-script');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'finisher-header-script';
    script.async = true;
    script.src =
      theme === 'dark' ? '/assets/dark-header.es5.min.js' : '/assets/finisher-header.es5.min.js';

    script.onload = () => {
      if (window.FinisherHeader) {
        const config =
          theme === 'dark'
            ? {
                target: '#finisher-target',
                count: 100,
                size: { min: 2, max: 8, pulse: 0 },
                speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.6 } },
                colors: {
                  background: '#201e30',
                  particles: ['#fbfcca', '#d7f3fe', '#ffd0a7'],
                },
                blending: 'overlay',
                opacity: { center: 1, edge: 0 },
                skew: 0,
                shapes: ['c'],
              }
            : {
                target: '#finisher-target',
                count: 90,
                size: { min: 1, max: 20, pulse: 0 },
                speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.1 } },
                colors: {
                  background: '#d8c3ea',
                  particles: ["#840076","#7741ff","#160067","#ffffff","#ffffff"],
                },
                blending: 'screen',
                opacity: { center: 0, edge: 0.15 },
                skew: 0,
                shapes: ['c', 's', 't'],
              };

        new window.FinisherHeader(config);
      }
    };

    document.body.appendChild(script);
    return () => {
      if (script) script.remove();
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const goHome = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToAbout = () => aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  const openGuide = () => setShowGuide(true);
  const closeGuide = () => setShowGuide(false);

  return (
    <Router>
      {/* FinisherHeader Target - global */}
      <div id="finisher-target" className="finisher-header" />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar onHomeClick={goHome} onGuideClick={openGuide} onAboutClick={scrollToAbout} />
              <HeroSection />
              <Model />
              <div ref={aboutRef}>
                <MissionSection />
              </div>
              <ThemeToggle toggleTheme={toggleTheme} currentTheme={theme} />
              {showGuide && <Guide onClose={closeGuide} />}
            </div>
          }
        />
        <Route path="/minigames" element={<Minigames />} />
      </Routes>
    </Router>
  );
}

export default App;
