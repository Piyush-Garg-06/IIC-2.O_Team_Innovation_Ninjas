import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <div className="logo">AgriMarket</div>
      <div className="auth-buttons">
        <button className="faq">FAQ</button>
        <button className="login">Login</button>
        <button className="signup">Sign Up</button>
      </div>
    </header>
  );
};

export default Navbar;