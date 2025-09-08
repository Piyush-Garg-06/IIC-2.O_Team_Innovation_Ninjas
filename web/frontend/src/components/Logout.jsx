import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  // Clear any session data here (e.g., localStorage, sessionStorage)
  localStorage.removeItem('farmerToken'); // Example, if using tokens
  sessionStorage.clear(); // Clear session storage

  // Redirect to home page
  return <Navigate to="/" replace />;
};

export default Logout;
