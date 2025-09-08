import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import FarmerHome from './components/FarmerHome';
import FarmerProducts from './components/FarmerProducts';
import FarmerOrders from './components/FarmerOrders';
import FarmerReports from './components/FarmerReports';
import Logout from './components/Logout';
import FarmerHelp from './components/FarmerHelp';
import TraderHome from './components/TraderHome';
import TraderProducts from './components/TraderProducts';
import TraderOrders from './components/TraderOrders';
import TraderTransactions from './components/TraderTransactions';
import TraderReports from './components/TraderReports';
import TraderHelp from './components/TraderHelp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/farmer-home" element={<FarmerHome />} />
        <Route path="/farmer-products" element={<FarmerProducts />} />
        <Route path="/farmer-orders" element={<FarmerOrders />} />
        <Route path="/farmer-reports" element={<FarmerReports />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/farmer-help" element={<FarmerHelp />} />
        <Route path="/trader-home" element={<TraderHome />} />
        <Route path="/trader-products" element={<TraderProducts />} />
        <Route path="/trader-orders" element={<TraderOrders />} />
        <Route path="/trader-transactions" element={<TraderTransactions />} />
        <Route path="/trader-reports" element={<TraderReports />} />
        <Route path="/trader-help" element={<TraderHelp />} />
      </Routes>
    </Router>
  );
}

export default App;
