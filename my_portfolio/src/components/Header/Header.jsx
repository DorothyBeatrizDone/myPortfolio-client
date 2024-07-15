import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">MyPortfolio</h1>
        <nav className="header__nav">
          <Link to="/dashboard" className="header__link">Dashboard</Link>
          <Link to="/profile" className="header__link">Profile</Link>
          <Link to="/upload-project" className="header__link">Upload</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
