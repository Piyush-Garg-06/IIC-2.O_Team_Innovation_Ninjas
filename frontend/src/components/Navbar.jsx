import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <div className="logo">AgriMarket</div>
      <div className="auth-buttons">
        <button className="faq">FAQ</button>
        <Link to="/login">
          <button className="login">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup">Sign Up</button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
