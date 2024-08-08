// src/components/Header/Header.js
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="site-name">
          <img src="https://e7.pngegg.com/pngimages/779/61/png-clipart-logo-idea-cute-eagle-leaf-logo.png" alt="Globie Logo" className="logo" />
          Globie
        </Link>
      </div>
      <nav className="header-right">
        <Link to="/about-us" className="nav-link">About Us</Link>
        <Link to="/blog" className="nav-link">Blog</Link>
        <Link to="/build-configuration" className="nav-link">Build Computer Configuration</Link>
        <Link to="/contact-us" className="nav-link">Contact Us</Link>
        <Link to="/help-support" className="nav-link">Help & Support</Link>
      </nav>
    </header>
  );
};

export default Header;
