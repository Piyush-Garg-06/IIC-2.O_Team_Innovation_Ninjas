import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [userType, setUserType] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!userType) {
      setError('Please select a user type (Farmer or Trader).');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password, role: userType, fullName }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="signup-page">
      <div className="photo-section"><img style={{"height" : "100%", "width" : "100%" }} src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E" alt="" /></div>

      <div className="signup-section">
        <h2>AgriMarket Sign Up</h2>

        <div className="user-options">
          <div className="user-box" onClick={() => setUserType('farmer')}>
            Farmer Sign Up
          </div>
          <div className="user-box" onClick={() => setUserType('trader')}>
            Trader Sign Up
          </div>
        </div>

        {userType === 'farmer' && (
          <form className="signup-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Farmer Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input type="email" placeholder="Farmer Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign Up as Farmer</button>
          </form>
        )}

        {userType === 'trader' && (
          <form className="signup-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Trader Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input type="email" placeholder="Trader Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign Up as Trader</button>
          </form>
        )}

        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

        <button className="google-btn" onClick={() => window.location.href = '#'}>
          Sign Up with Google
        </button>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
