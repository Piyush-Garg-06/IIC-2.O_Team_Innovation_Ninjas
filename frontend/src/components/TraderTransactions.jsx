import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TraderTransactions.css';

const TraderTransactions = () => {
  const [transactions, setTransactions] = useState([
    {id:301, recipient:'Ramesh', amount:1200, date:'2025-09-08', product:'Tomato'},
    {id:302, recipient:'Suresh', amount:2000, date:'2025-09-07', product:'Potato'},
    {id:303, recipient:'Anita', amount:1500, date:'2025-09-06', product:'Onion'},
    {id:304, recipient:'Kiran', amount:1800, date:'2025-09-05', product:'Carrot'},
    {id:305, recipient:'Deepak', amount:1000, date:'2025-09-04', product:'Spinach'}
  ]);

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
        <h2>💳 Transaction History</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Recipient</th>
              <th>Amount Paid</th>
              <th>Date</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tran, index) => (
              <tr key={index} className="fadeIn">
                <td>{tran.id}</td>
                <td>{tran.recipient}</td>
                <td>₹{tran.amount}</td>
                <td>{tran.date}</td>
                <td>{tran.product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer>
        <p>📧 Contact us: <a href="mailto:support@agrimarket.com" style={{color:'white', textDecoration:'underline'}}>support@agrimarket.com</a></p>
        <p>© 2025 AgriMarket. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default TraderTransactions;
