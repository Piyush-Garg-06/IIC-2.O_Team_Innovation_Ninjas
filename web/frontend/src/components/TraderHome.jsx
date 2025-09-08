import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TraderHome.css';

const TraderHome = () => {
  const [prices, setPrices] = useState({
    tomato: 40,
    potato: 25,
    onion: 30,
    carrot: 35,
    cabbage: 28,
    cauliflower: 32,
    spinach: 20,
    brinjal: 22,
    peas: 45
  });

  const products = [
    { name: 'tomato', img: 'https://3.imimg.com/data3/ML/PG/MY-14487757/tamoto.jpg', location: 'Delhi' },
    { name: 'potato', img: 'https://4.imimg.com/data4/KM/KQ/ANDROID-46853165/product-500x500.jpeg', location: 'Haryana' },
    { name: 'onion', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMMEX9ei0mbDUVvYwo6qwA_N7c8BDE4qJdHZQwwypEqO1TiCOIXpsIMMeMmIVllnCm5o0OzdZ2-YuE1o9hOXsFp9GEdvjHXbG9o9jHaseU', location: 'Punjab' },
    { name: 'carrot', img: 'https://www.hhs1.com/hubfs/carrots%20on%20wood-1.jpg', location: 'Uttar Pradesh' },
    { name: 'cabbage', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlSZQjaty0trYUL9BlgbLyV2FeZiEA40BM-g&s', location: 'Bihar' },
    { name: 'cauliflower', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Chou-fleur_02.jpg', location: 'Rajasthan' },
    { name: 'spinach', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFIf1LwpQrKWxz9lSfn976uLBL9n5g18CUQ&s', location: 'Kerala' },
    { name: 'brinjal', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRbY9YTjVXd26hzBCodhOjbk-zggImttHgVA&s', location: 'Karnataka' },
    { name: 'peas', img: 'https://assets.clevelandclinic.org/transform/a3979a06-fede-4c53-aaec-4183bf81a350/peas-2196817632', location: 'Tamil Nadu' }
  ];

  useEffect(() => {
    const updatePrices = () => {
      setPrices(prevPrices => {
        const newPrices = { ...prevPrices };
        Object.keys(newPrices).forEach(key => {
          let price = newPrices[key];
          let change = Math.floor(Math.random() * 5) - 2; // -2 to +2
          price = Math.max(5, price + change);
          newPrices[key] = price;
        });
        return newPrices;
      });
    };

    updatePrices(); // initial
    const interval = setInterval(updatePrices, 3000);
    return () => clearInterval(interval);
  }, []);

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

      <section className="home-section">
        <h1>🌾 Welcome to AgriMarket 🌾</h1>
        <p>Check live market prices and manage your trading efficiently!</p>
      </section>

      <section className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.img} alt={product.name} />
            <div className="product-info">
              <h3>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h3>
              <p id={`price-${product.name}`}>₹{prices[product.name]}/kg</p>
              <span>Location: {product.location}</span>
            </div>
          </div>
        ))}
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

export default TraderHome;
