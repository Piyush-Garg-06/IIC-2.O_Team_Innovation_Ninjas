import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FarmerOrders.css';

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!loggedInUser || loggedInUser.role !== 'farmer') {
      setError('You must be logged in as a farmer to view orders.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/orders?farmerUsername=${loggedInUser.username}`);
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

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      default: return '';
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Order status updated successfully!');
        fetchOrders(); // Re-fetch orders to update the list
      } else {
        setError(data.message || 'Failed to update order status.');
      }
    } catch (err) {
      setError('Network error. Failed to update order status.');
      console.error('Update order status error:', err);
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

      <section className="orders">
        <h2>Received Orders</h2>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <div className="orders-container">
          {orders.length === 0 ? (
            <p>No orders received yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card fadeIn">
                <h3>Order #{order.id}</h3>
                <p><strong>Product:</strong> {order.productName}</p>
                <p><strong>Quantity:</strong> {order.quantity} kg</p>
                <p><strong>Buyer:</strong> {order.traderUsername}</p>
                <p><strong>Price:</strong> ₹{order.productRate}/kg</p>
                <p><strong>Status:</strong> <span className={`status-badge ${getStatusClass(order.status)}`}>{order.status}</span></p>
                <div className="status-update-controls">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
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

export default FarmerOrders;
