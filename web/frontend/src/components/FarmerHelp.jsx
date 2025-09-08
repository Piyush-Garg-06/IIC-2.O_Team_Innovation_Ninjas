import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FarmerHelp.css';

const FarmerHelp = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'How can I list my products on AgriMarket?',
      answer: 'Farmers can log in to their dashboard, go to "My Products," and add product details including name, quantity, and price.'
    },
    {
      question: 'How is logistics handled for orders?',
      answer: 'AgriMarket partners with local transporters and logistics companies to ensure timely and cost-effective delivery of farm produce.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Traders and buyers can track their order status in the "Orders" section with real-time updates.'
    },
    {
      question: 'Are prices fixed or negotiable?',
      answer: 'Prices are based on live market rates. Farmers and traders get transparent pricing, reducing unfair negotiation.'
    },
    {
      question: 'How do payments work?',
      answer: 'Payments are processed securely through the platform. Farmers receive direct payments to their registered bank account.'
    },
    {
      question: 'Can traders order in bulk?',
      answer: 'Yes, traders can place bulk orders. Logistics are arranged accordingly to handle larger consignments.'
    },
    {
      question: 'Is there customer support available?',
      answer: 'Yes, our support team is available Monday to Saturday from 9:00 AM to 6:00 PM via email or phone.'
    }
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

      <section className="help">
        <h2>Help & Support</h2>

        <div className="section">
          <h3>Contact Us</h3>
          <p><strong>Email:</strong> support@agrimarket.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Office:</strong> AgriMarket HQ, New Delhi, India</p>
          <p><strong>Working Hours:</strong> Mon - Sat (9:00 AM - 6:00 PM)</p>

          <div className="contact-form">
            <h4>Send us a message:</h4>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea rows="4" placeholder="Your Message"></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>

        <div className="section">
          <h3>FAQs on Selling and Logistics</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="faq">
              <button onClick={() => toggleFaq(index)}>{faq.question}</button>
              <p className={activeFaq === index ? 'active' : ''}>{faq.answer}</p>
            </div>
          ))}
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

export default FarmerHelp;
