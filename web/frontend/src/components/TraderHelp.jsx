import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TraderHelp.css';

const TraderHelp = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
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

      <section className="help-section">
        <h1>Help & Support</h1>

        <div className="help-box">
          <h2>Contact Admin</h2>
          <ul>
            <li>Email: <a href="mailto:support@agrimarket.com" style={{color:'white', textDecoration:'underline'}}>support@agrimarket.com</a></li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: New Delhi, India</li>
          </ul>
        </div>

        <div className="help-box">
          <h2>FAQs on Selling & Logistics</h2>
          <div className="faq-item">
            <h3 onClick={() => toggleFAQ(1)}>1. How can I list my products for sale?</h3>
            <div className={`faq-answer ${openFAQ === 1 ? 'open' : ''}`}>
              <p>Login as a trader and navigate to the 'Products' section. Click 'Add Product' and fill in the details.</p>
            </div>
          </div>
          <div className="faq-item">
            <h3 onClick={() => toggleFAQ(2)}>2. How does the live market price update work?</h3>
            <div className={`faq-answer ${openFAQ === 2 ? 'open' : ''}`}>
              <p>Prices update automatically every few seconds based on current market trends provided by AgriMarket.</p>
            </div>
          </div>
          <div className="faq-item">
            <h3 onClick={() => toggleFAQ(3)}>3. What are the delivery options for buyers?</h3>
            <div className={`faq-answer ${openFAQ === 3 ? 'open' : ''}`}>
              <p>Buyers can choose standard or express delivery options at checkout.</p>
            </div>
          </div>
          <div className="faq-item">
            <h3 onClick={() => toggleFAQ(4)}>4. How do I track my orders?</h3>
            <div className={`faq-answer ${openFAQ === 4 ? 'open' : ''}`}>
              <p>Go to 'Orders' in the navigation bar to view current and past orders with status updates.</p>
            </div>
          </div>
          <div className="faq-item">
            <h3 onClick={() => toggleFAQ(5)}>5. How do I get notified for new orders?</h3>
            <div className={`faq-answer ${openFAQ === 5 ? 'open' : ''}`}>
              <p>Notifications are sent via email and in-app alerts for every new order.</p>
            </div>
          </div>
        </div>

        <div className="feedback-box">
          <h2>Feedback / Query Form</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Feedback / Query" rows="5" required></textarea>
            <button type="submit">Submit</button>
          </form>
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

export default TraderHelp;
