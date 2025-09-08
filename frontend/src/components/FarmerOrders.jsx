import React from 'react';
import { Link } from 'react-router-dom';
import './FarmerOrders.css';

const FarmerOrders = () => {
  const orders = [
    { id: 101, product: 'Tomato', quantity: 10, buyer: 'Ramesh', price: 25, total: 250, date: '2025-09-10', status: 'Pending' },
    { id: 102, product: 'Potato', quantity: 20, buyer: 'Sita', price: 18, total: 360, date: '2025-09-12', status: 'Delivered' },
    { id: 103, product: 'Onion', quantity: 15, buyer: 'Rahul', price: 30, total: 450, date: '2025-09-11', status: 'Pending' },
    { id: 104, product: 'Carrot', quantity: 12, buyer: 'Geeta', price: 22, total: 264, date: '2025-09-13', status: 'Pending' },
    { id: 105, product: 'Cabbage', quantity: 8, buyer: 'Ravi', price: 20, total: 160, date: '2025-09-14', status: 'Pending' },
    { id: 106, product: 'Cauliflower', quantity: 10, buyer: 'Anita', price: 28, total: 280, date: '2025-09-15', status: 'Delivered' },
    { id: 107, product: 'Spinach', quantity: 5, buyer: 'Vikram', price: 15, total: 75, date: '2025-09-16', status: 'Pending' },
    { id: 108, product: 'Brinjal', quantity: 12, buyer: 'Suman', price: 25, total: 300, date: '2025-09-17', status: 'Pending' },
    { id: 109, product: 'Peas', quantity: 6, buyer: 'Deepak', price: 35, total: 210, date: '2025-09-18', status: 'Delivered' },
    { id: 110, product: 'Ladyfinger', quantity: 10, buyer: 'Kavita', price: 20, total: 200, date: '2025-09-19', status: 'Pending' },
    { id: 111, product: 'Bell Pepper', quantity: 7, buyer: 'Manoj', price: 40, total: 280, date: '2025-09-20', status: 'Delivered' },
    { id: 112, product: 'Cauliflower', quantity: 15, buyer: 'Shreya', price: 28, total: 420, date: '2025-09-21', status: 'Pending' }
  ];

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
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity (kg)</th>
              <th>Buyer Name</th>
              <th>Price/kg (₹)</th>
              <th>Total Price (₹)</th>
              <th>Delivery Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="fadeIn">
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.buyer}</td>
                <td>{order.price}</td>
                <td>{order.total}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer>
        <div className="footer-container">
          <div className="footer-box">
            <h3>AgriMarket</h3>
            <p>Connecting farmers and traders with live pricing, fair trade, and efficient supply chain.</p>
          </div>
          <div className="footer-box">
            <h3>Quick Links</h3>
            <a href="#">Home</a><br />
            <a href="#">Products</a><br />
            <a href="#">Orders</a><br />
            <a href="#">Reports</a><br />
            <a href="#">Help</a><br />
            <a href="#">Logout</a>
          </div>
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
