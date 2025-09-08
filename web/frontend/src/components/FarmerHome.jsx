import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FarmerHome.css';

const FarmerHome = () => {
  const [rates, setRates] = useState({
    tomato: { rate: 25, time: '--:--' },
    potato: { rate: 18, time: '--:--' },
    onion: { rate: 30, time: '--:--' },
    carrot: { rate: 22, time: '--:--' },
    cabbage: { rate: 20, time: '--:--' },
    cauliflower: { rate: 28, time: '--:--' },
    spinach: { rate: 15, time: '--:--' },
    brinjal: { rate: 25, time: '--:--' },
    peas: { rate: 35, time: '--:--' }
  });

  const products = [
    { name: "tomato", min: 20, max: 30 },
    { name: "potato", min: 15, max: 25 },
    { name: "onion", min: 25, max: 35 },
    { name: "carrot", min: 18, max: 28 },
    { name: "cabbage", min: 17, max: 23 },
    { name: "cauliflower", min: 25, max: 32 },
    { name: "spinach", min: 12, max: 18 },
    { name: "brinjal", min: 20, max: 28 },
    { name: "peas", min: 30, max: 40 }
  ];

  useEffect(() => {
    const updateRates = () => {
      const now = new Date();
      const time = now.getHours().toString().padStart(2, "0") + ":" +
                   now.getMinutes().toString().padStart(2, "0") + ":" +
                   now.getSeconds().toString().padStart(2, "0");

      const newRates = {};
      products.forEach(p => {
        const rate = (Math.random() * (p.max - p.min) + p.min).toFixed(2);
        newRates[p.name] = { rate, time };
      });
      setRates(newRates);
    };

    updateRates(); // initial
    const interval = setInterval(updateRates, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Navbar */}
      <header>
        <div className="logo">AgriMarket</div>
        <nav>
          <Link to="/farmer-home">Home</Link>
          <Link to="/farmer-products">My Products</Link>
          <Link to="/farmer-orders">Orders</Link>
          <Link to="/farmer-reports">Reports</Link>
          <Link to="/farmer-help">Help</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div>
          <h1>Welcome to AgriMarket</h1>
          <p>Connecting Farmers with Local Markets and Showing Live Product Prices</p>
        </div>
      </section>

      {/* Live Product Rates */}
      <section className="live-rates">
        <h2>Live Product Rates</h2>
        <table className="rates-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Rate (₹/kg)</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates).map(([key, value]) => (
              <tr key={key}>
                <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td>{value.rate}</td>
                <td>{value.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-box">
            <h3>AgriMarket</h3>
            <p>Connecting farmers and traders through real-time pricing and fair trade.</p>
          </div>
          {/* <div className="footer-box">
            <h3>Quick Links</h3>
            <a href="#">Home</a><br />
            <a href="#">My Products</a><br />
            <a href="#">Orders</a><br />
            <a href="#">Reports</a><br />
            <a href="#">Help</a><br />
            <a href="#">Logout</a>
          </div> */}
          <div className="footer-box">
            <h3>Contact Us</h3>
            <p>Email: support@agrimarket.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: New Delhi, India</p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 AgriMarket. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default FarmerHome;
