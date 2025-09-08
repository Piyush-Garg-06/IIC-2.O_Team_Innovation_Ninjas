import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TraderTransactions.css';

const TraderTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    if (!loggedInUser || loggedInUser.role !== 'trader') {
      setError('You must be logged in as a trader to view transactions.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/transactions?traderUsername=${loggedInUser.username}`);
      const data = await response.json();
      if (response.ok) {
        setTransactions(data.transactions);
      } else {
        setError(data.message || 'Failed to fetch transactions.');
      }
    } catch (err) {
      setError('Network error. Failed to fetch transactions.');
      console.error('Fetch transactions error:', err);
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

      <section className="transaction-flow-section">
        <h2 style={{"margin-top" : "25px"}}>💳 Transaction History</h2>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <div className="transactions-container">
          {transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            transactions.map((tran) => (
              <div key={tran.id} className="transaction-card fadeIn">
                <h3>Transaction #{tran.id}</h3>
                <p><strong>Product:</strong> {tran.productName}</p>
                <p><strong>Quantity:</strong> {tran.quantity} kg</p>
                <p><strong>Farmer:</strong> {tran.farmerUsername}</p>
                <p><strong>Amount:</strong> ₹{tran.productRate * tran.quantity}</p>
                <p><strong>Status:</strong> {tran.status}</p>
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

export default TraderTransactions;