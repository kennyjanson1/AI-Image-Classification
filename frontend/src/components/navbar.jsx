import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ onHomeClick, onGuideClick, onAboutClick }) => {
  return (
    <nav className="nav">
      <div className="nav-logo">Face Me</div>

        <ul className="nav-center-menu">
          <li>
            <button onClick={onHomeClick}>Home</button>
            <span className="border-anim"></span>
          </li>
          <li>
            <button onClick={onGuideClick}>Guide</button>
            <span className="border-anim"></span>
          </li>
          <li>
            <button onClick={onAboutClick}>About Us</button>
            <span className="border-anim"></span>
          </li>
        </ul>
    </nav>
  );
};

export default Navbar;
