import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TraderOrders.css';

const TraderOrders = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchProducts();
    fetchOrders();
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

  const fetchOrders = async () => {
    if (!loggedInUser || loggedInUser.role !== 'trader') {
      setError('You must be logged in as a trader to view orders.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/orders?traderUsername=${loggedInUser.username}`);
      const data = await response.json();
      if (response.ok) {
        setOrders(data.orders);
      } else {
        setError(data.message || 'Failed to fetch orders.');
      }
    } catch (err) {
      setError('Network error. Failed to fetch orders.');
      console.error('Fetch orders error:', err);
    }
  };

  const placeOrder = async () => {
    setError('');
    if (!selectedProduct || !quantity) {
      setError('Please select a product and enter quantity.');
      return;
    }
    if (!loggedInUser || loggedInUser.role !== 'trader') {
      setError('You must be logged in as a trader to place an order.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: selectedProduct.id,
          quantity: parseFloat(quantity),
          traderUsername: loggedInUser.username,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Order placed successfully!');
        setQuantity('');
        setSelectedProduct(null);
        fetchOrders(); // Refresh orders list
      } else {
        setError(data.message || 'Failed to place order.');
      }
    } catch (err) {
      setError('Network error. Failed to place order.');
      console.error('Place order error:', err);
    }
  };

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      default: return '';
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

      <section className="orders-section">
        <h2>Place New Order</h2>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <div className="place-order-container">
          <div className="available-products">
            <h3>Available Products</h3>
            {products.length === 0 ? (
              <p>No products available to order.</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="product-card fadeIn">
                  <h3>{product.name}</h3>
                  <p>Rate: {product.rate} ₹/kg</p>
                  <p>Farmer: {product.farmerUsername}</p>
                  <button onClick={() => setSelectedProduct(product)}>Select for Order</button>
                </div>
              ))
            )}
          </div>

          {selectedProduct && (
            <div className="order-form">
              <h3>Order {selectedProduct.name} from {selectedProduct.farmerUsername}</h3>
              <p>Rate: {selectedProduct.rate} ₹/kg</p>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter Quantity (kg)"
                min="1"
              />
              <button onClick={placeOrder}>Place Order</button>
              <button onClick={() => setSelectedProduct(null)}>Cancel</button>
            </div>
          )}
        </div>

        <h2>📦 Your Orders</h2>
        <div className="orders-container">
          {orders.length === 0 ? (
            <p>You have not placed any orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card fadeIn">
                <h3>Order #{order.id}</h3>
                <p><strong>Farmer:</strong> {order.farmerUsername}</p>
                <p><strong>Product:</strong> {order.productName}</p>
                <p><strong>Quantity:</strong> {order.quantity} kg</p>
                <p><strong>Price:</strong> ₹{order.productRate}/kg</p>
                <p><strong>Status:</strong> <span className={`status-badge ${getStatusClass(order.status)}`}>{order.status}</span></p>
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

export default TraderOrders;
