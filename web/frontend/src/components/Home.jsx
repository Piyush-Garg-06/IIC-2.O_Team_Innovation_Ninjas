import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
    'https://images.unsplash.com/photo-1599065736965-bf45997d3d0e',
    'https://images.unsplash.com/photo-1601737484519-3c5be3f5c0b3',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    'https://images.unsplash.com/photo-1561473880-3b1f6f36f4dd',
    'https://images.unsplash.com/photo-1524594154908-edd336d5b43d',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <section className="hero">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          ></div>
        ))}
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to AgriMarket</h1>
          <p>Connecting Farmers and Local Markets through Real-Time Pricing and Fair Trade</p>
        </div>
      </section>

      <section className="benefits">
        <h2>Problems, Solutions & Benefits</h2>
        <div className="benefit-card">
          <h3>For Farmers</h3>
          <div className="section-block">
            <h4>Problems</h4>
            <ul>
              <li>Limited market access due to middlemen</li>
              <li>No real-time crop price information</li>
              <li>Unfair pricing reduces earnings</li>
              <li>Inefficient supply chain causes losses</li>
            </ul>
          </div>
          <div className="section-block">
            <h4>Solutions</h4>
            <ul>
              <li>Direct digital marketplace with local buyers</li>
              <li>Live price discovery with daily updates</li>
              <li>Transparent pricing & fair trade policies</li>
              <li>Digital supply chain tools for transport & storage</li>
            </ul>
          </div>
          <div className="section-block">
            <h4>Benefits</h4>
            <ul>
              <li>Higher profits with direct sales</li>
              <li>Better decision-making using real-time data</li>
              <li>Trust and transparency in transactions</li>
              <li>Reduced post-harvest losses</li>
            </ul>
          </div>
        </div>

        <div className="benefit-card">
          <h3>For Traders</h3>
          <div className="section-block">
            <h4>Problems</h4>
            <ul>
              <li>Unreliable and inconsistent supply</li>
              <li>Lack of transparency in price negotiation</li>
              <li>High costs due to middlemen</li>
              <li>Difficulty in forecasting demand</li>
            </ul>
          </div>
          <div className="section-block">
            <h4>Solutions</h4>
            <ul>
              <li>Direct verified connection with farmers</li>
              <li>Transparent digital price updates</li>
              <li>Elimination of intermediaries reduces costs</li>
              <li>Data-driven insights for demand forecasting</li>
            </ul>
          </div>
          <div className="section-block">
            <h4>Benefits</h4>
            <ul>
              <li>Reliable and consistent supply of produce</li>
              <li>Fair and predictable pricing</li>
              <li>Higher profit margins through cost savings</li>
              <li>Efficient inventory and demand planning</li>
            </ul>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default Home;