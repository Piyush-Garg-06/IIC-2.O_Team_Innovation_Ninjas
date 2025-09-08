import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TraderOrders.css';

const TraderOrders = () => {
  const [orders, setOrders] = useState([
    {id:101, farmer:'Ramesh', product:'Tomato', qty:50, price:40, location:'Delhi', status:'Pending'},
    {id:102, farmer:'Suresh', product:'Potato', qty:100, price:25, location:'Haryana', status:'Shipped'},
    {id:103, farmer:'Anita', product:'Onion', qty:70, price:30, location:'Punjab', status:'Delivered'},
    {id:104, farmer:'Kiran', product:'Carrot', qty:60, price:35, location:'UP', status:'Pending'},
    {id:105, farmer:'Deepak', product:'Spinach', qty:80, price:20, location:'Kerala', status:'Shipped'}
  ]);

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
        <h2>📦 Live Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Farmer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="fadeIn">
                <td>{order.id}</td>
                <td>{order.farmer}</td>
                <td>{order.product}</td>
                <td>{order.qty} kg</td>
                <td>₹{order.price}/kg</td>
                <td>{order.location}</td>
                <td><span className={`status-badge ${getStatusClass(order.status)}`}>{order.status}</span></td>
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

export default TraderOrders;
