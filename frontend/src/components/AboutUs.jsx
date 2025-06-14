import React, { useEffect, useRef, useState } from "react";
import '../styles/AboutUs.css';

const RevealOnScroll = ({ children, direction = "left" }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${direction}`}
    > 
      {children}
    </div>
  );
};

function MissionSection() {
  return (
    <section id="mission" className="mission">
      <RevealOnScroll>
        <div className="mission-header">
          <h3><button className="mission-tag">About Us</button></h3>
          <h2 className="mission-title">
          We provide a fast, accurate, and intelligent image recognition platform.
          </h2>
          <p className="mission-desc">
          We believe in a connected world where visual information is no longer a barrier to understanding and interaction.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll direction="left">
        <div className="mission-card">
          <img src="/assets/misi1.png" alt="Misi 1"/>
          <div className="mission-info">
            <h4>📖 Understand Every Pixel, Instantly</h4>
            <p>High-speed, accurate real-time image recognition technology that quickly analyzes and interprets visual data, designed to handle growing demands with ease.</p>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll direction="right">
        <div className="mission-card">
          <div className="mission-info">
            <h4>🗝️Cross-Cultural Communication</h4>
            <p>Improving communication by precisely identifying and understanding images from diverse cultures and platforms, making visual information universally accessible.</p>
          </div>
          <img src="/assets/misi2.png" alt="Misi 2" />
        </div>
      </RevealOnScroll>


      <RevealOnScroll direction="left">
        <div className="mission-card">
          <img src="/assets/misi3.png" alt="Misi 3" />
          <div className="mission-info">
            <h4>🧠Know the Language, Know the World</h4>
            <p>Advanced image recognition algorithms that detect and classify objects and patterns within milliseconds, scalable and adaptable to your evolving needs.</p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

export default MissionSection;
