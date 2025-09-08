import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FarmerProducts.css';

const FarmerProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductRate, setNewProductRate] = useState('');
  const [error, setError] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    if (!loggedInUser || loggedInUser.role !== 'farmer') {
      setError('You must be logged in as a farmer to view products.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/products?farmerUsername=${loggedInUser.username}`);
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

  const addProduct = async () => {
    setError('');
    if (newProductName.trim() && newProductRate.trim()) {
      try {
        const response = await fetch('http://localhost:5000/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newProductName,
            rate: parseFloat(newProductRate),
            farmerUsername: loggedInUser.username,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setProducts([...products, data.product]);
          setNewProductName('');
          setNewProductRate('');
        } else {
          setError(data.message || 'Failed to add product.');
        }
      } catch (err) {
        setError('Network error. Failed to add product.');
        console.error('Add product error:', err);
      }
    } else {
      setError('Please enter product name and rate.');
    }
  };

  const removeProduct = async (idToRemove) => {
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/products/${idToRemove}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(products.filter(product => product.id !== idToRemove));
      } else {
        setError(data.message || 'Failed to remove product.');
      }
    } catch (err) {
      setError('Network error. Failed to remove product.');
      console.error('Remove product error:', err);
    }
  };

  return (
    <>
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

      <section className="products">
        <h2>Added Products</h2>
        <div className="products-container">
          {products.map((product, index) => (
            <div key={product.id} className="product-card fadeIn">
              <div className="card-header">
                <h3>{product.name}</h3>
                <i style={{color:"red"}} class="fa-solid fa-trash" onClick={() => removeProduct(product.id)}></i> 
              </div>
              <p>Rate: {product.rate} ₹/kg</p>
            </div>
          ))}
        </div>

        <div className="add-product">
          <h3>Add Your Product</h3>
          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
          <input
            type="text"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            placeholder="Product Name"
          />
          <input
            type="number"
            value={newProductRate}
            onChange={(e) => setNewProductRate(e.target.value)}
            placeholder="Rate (₹/kg)"
          />
          <br />
          <button onClick={addProduct}>Add Product</button>
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

export default FarmerProducts;
