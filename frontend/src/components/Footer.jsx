import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-box">
          <h3>AgriMarket</h3>
          <p>AgriMarket connects farmers and traders through real-time price discovery, fair trade, and efficient supply chain solutions.</p>
        </div>
        <div className="footer-box">
          <h3>Quick Links</h3>
          <a href="#">Home</a><br />
          <a href="#">About</a><br />
          <a href="#">Login</a><br />
          <a href="#">Sign Up</a>
        </div>
        <div className="footer-box">
          <h3>Contact Us</h3>
          <p>Email: support@agrimarket.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: New Delhi, India</p>
        </div>
        <div className="footer-box">
          <h3>Follow Us</h3>
          <a href="#">🌐 Facebook</a><br />
          <a href="#">🌐 Twitter</a><br />
          <a href="#">🌐 Instagram</a><br />
          <a href="#">🌐 LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 AgriMarket. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;