import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TraderProducts.css';

const TraderProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      } else {
        setError(data.message || 'Failed to fetch products.');
      }
    } catch (err) {
      setError('Network error. Failed to fetch products.');
      console.error('Fetch products error:', err);
    }
  };

  return (
    <>
      <header>
        <div className="logo">AgriMarket</div>
        <nav>
          <Link to="/trader-home">Home</Link>
          <Link to="/trader-products">Products</Link>
          <Link to="/trader-orders">Orders</Link>
          <Link to="/trader-transactions">Transactions</Link>
          <Link to="/trader-reports">Reports</Link>
          <Link to="/trader-help">Help</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </header>

      <section className="products">
        <h2>Available Products</h2>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <div className="products-container">
          {products.length === 0 ? (
            <p>No products available yet.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card fadeIn">
                <h3>{product.name}</h3>
                <p>Rate: {product.rate} ₹/kg</p>
                <p>Farmer: {product.farmerUsername}</p>
              </div>
            ))
          )}
        </div>
      </section>
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

export default TraderProducts;