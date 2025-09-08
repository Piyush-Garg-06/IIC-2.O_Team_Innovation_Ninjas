import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TraderProducts.css';

const TraderProducts = () => {
  const [products, setProducts] = useState([
    { name: 'Tomato', rate: 40, location: 'Delhi' },
    { name: 'Potato', rate: 25, location: 'Haryana' },
    { name: 'Onion', rate: 30, location: 'Punjab' },
    { name: 'Carrot', rate: 35, location: 'Uttar Pradesh' },
    { name: 'Cabbage', rate: 28, location: 'Bihar' },
    { name: 'Cauliflower', rate: 32, location: 'Rajasthan' },
    { name: 'Spinach', rate: 20, location: 'Kerala' },
    { name: 'Brinjal', rate: 22, location: 'Karnataka' },
    { name: 'Peas', rate: 45, location: 'Tamil Nadu' }
  ]);

  const [newProductName, setNewProductName] = useState('');
  const [newProductRate, setNewProductRate] = useState('');
  const [newProductLocation, setNewProductLocation] = useState('');

  const addProduct = () => {
    if (newProductName.trim() && newProductRate.trim() && newProductLocation.trim()) {
      const newProduct = {
        name: newProductName,
        rate: parseFloat(newProductRate),
        location: newProductLocation
      };
      setProducts([...products, newProduct]);
      setNewProductName('');
      setNewProductRate('');
      setNewProductLocation('');
    } else {
      alert('Please enter product name, rate, and location');
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
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Rate (₹/kg)</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="fadeIn">
                <td>{product.name}</td>
                <td>{product.rate}</td>
                <td>{product.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-product">
          <h3>Add New Product</h3>
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
          <input
            type="text"
            value={newProductLocation}
            onChange={(e) => setNewProductLocation(e.target.value)}
            placeholder="Location"
          />
          <br />
          <button onClick={addProduct}>Add Product</button>
        </div>
      </section>
    </>
  );
};

export default TraderProducts;
