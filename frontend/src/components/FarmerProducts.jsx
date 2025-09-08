import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FarmerProducts.css';

const FarmerProducts = () => {
  const [products, setProducts] = useState([
    { name: 'Tomato', rate: 25 },
    { name: 'Potato', rate: 18 },
    { name: 'Onion', rate: 30 },
    { name: 'Carrot', rate: 22 },
    { name: 'Cabbage', rate: 20 },
    { name: 'Cauliflower', rate: 28 },
    { name: 'Spinach', rate: 15 },
    { name: 'Brinjal', rate: 25 },
    { name: 'Peas', rate: 35 }
  ]);

  const [newProductName, setNewProductName] = useState('');
  const [newProductRate, setNewProductRate] = useState('');

  const addProduct = () => {
    if (newProductName.trim() && newProductRate.trim()) {
      const newProduct = {
        name: newProductName,
        rate: parseFloat(newProductRate)
      };
      setProducts([...products, newProduct]);
      setNewProductName('');
      setNewProductRate('');
    } else {
      alert('Please enter product name and rate');
    }
  };

  const removeProduct = (indexToRemove) => {
    setProducts(products.filter((_, index) => index !== indexToRemove));
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
        <table>
          <thead>
            <tr>
              <th>Actions</th>
              <th>Product</th>
              <th>Rate (₹/kg)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="fadeIn">
                <td>
                  <button className="delete-btn" onClick={() => removeProduct(index)}>Del</button>
                </td>
                <td>{product.name}</td>
                <td>{product.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-product">
          <h3>Add Your Product</h3>
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
    </>
  );
};

export default FarmerProducts;
