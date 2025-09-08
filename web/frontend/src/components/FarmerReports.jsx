import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import './FarmerReports.css';

const FarmerReports = () => {
  const earningsChartRef = useRef(null);
  const profitsChartRef = useRef(null);
  const cropsChartRef = useRef(null);
  const demandChartRef = useRef(null);
  const [error, setError] = useState('');
  const [reportsData, setReportsData] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchReports = async () => {
      if (!loggedInUser || loggedInUser.role !== 'farmer') {
        setError('You must be logged in as a farmer to view reports.');
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/api/reports');
        const data = await response.json();
        if (response.ok) {
          // Filter orders relevant to the logged-in farmer
          const farmerOrders = data.reports.filter(order => order.farmerUsername === loggedInUser.username);
          setReportsData(farmerOrders);
        } else {
          setError(data.message || 'Failed to fetch reports.');
        }
      } catch (err) {
        setError('Network error. Failed to fetch reports.');
        console.error('Fetch reports error:', err);
      }
    };

    fetchReports();

    // Chart rendering logic will go here, after data is fetched
    // For now, keep the existing chart initialization with dummy data
    // This will be updated in the next step

    fetchReports();

    if (reportsData.length > 0) {
      // Destroy existing charts
      if (earningsChartRef.current) earningsChartRef.current.destroy();
      if (profitsChartRef.current) profitsChartRef.current.destroy();
      if (cropsChartRef.current) cropsChartRef.current.destroy();
      if (demandChartRef.current) demandChartRef.current.destroy();

      // Process data for charts
      const earningsData = reportsData.filter(order => order.status === 'Delivered').reduce((acc, order) => {
        const month = new Date(order.id).toLocaleString('default', { month: 'short' }); // Using order ID as a proxy for date for now
        acc[month] = (acc[month] || 0) + (order.productRate * order.quantity);
        return acc;
      }, {});

      const topCropsData = reportsData.filter(order => order.status === 'Delivered').reduce((acc, order) => {
        acc[order.productName] = (acc[order.productName] || 0) + order.quantity;
        return acc;
      }, {});

      // Earnings Chart
      earningsChartRef.current = new Chart(document.getElementById('earningsChart'), {
        type: 'line',
        data: {
          labels: Object.keys(earningsData),
          datasets: [{
            label: 'Earnings (₹)',
            data: Object.values(earningsData),
            borderColor: 'rgba(46,139,87,1)',
            backgroundColor: 'rgba(46,139,87,0.3)',
            fill: true,
            tension: 0.4
          }]
        },
        options: { responsive: true }
      });

      // Farmer Profits Chart (using earnings data for simplicity for now)
      profitsChartRef.current = new Chart(document.getElementById('farmerProfitsChart'), {
        type: 'line',
        data: {
          labels: Object.keys(earningsData),
          datasets: [{
            label: 'Profits (₹)',
            data: Object.values(earningsData),
            borderColor: 'rgba(255,145,77,1)',
            backgroundColor: 'rgba(255,145,77,0.3)',
            fill: true,
            tension: 0.4
          }]
        },
        options: { responsive: true }
      });

      // Top-Performing Crops Chart
      cropsChartRef.current = new Chart(document.getElementById('topCropsChart'), {
        type: 'bar',
        data: {
          labels: Object.keys(topCropsData),
          datasets: [{
            label: 'Sales (kg)',
            data: Object.values(topCropsData),
            backgroundColor: [
              'rgba(46,139,87,0.7)',
              'rgba(255,145,77,0.7)',
              'rgba(164,180,148,0.7)',
              'rgba(20,83,45,0.7)'
            ]
          }]
        },
        options: { responsive: true }
      });

      // Market Demand Chart (keeping dummy data for now as it's not directly derivable from orders)
      demandChartRef.current = new Chart(document.getElementById('demandChart'), {
        type: 'pie',
        data: {
          labels: ['High Demand', 'Medium Demand', 'Low Demand'],
          datasets: [{
            data: [55, 30, 15],
            backgroundColor: [
              'rgba(255,145,77,0.8)',
              'rgba(46,139,87,0.8)',
              'rgba(164,180,148,0.8)'
            ]
          }]
        },
        options: { responsive: true }
      });
    }

    // Cleanup on unmount
    return () => {
      if (earningsChartRef.current) earningsChartRef.current.destroy();
      if (profitsChartRef.current) profitsChartRef.current.destroy();
      if (cropsChartRef.current) cropsChartRef.current.destroy();
      if (demandChartRef.current) demandChartRef.current.destroy();
    };
  }, [reportsData]);

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

      <section className="reports">
        <h2>Reports & Insights</h2>

        <div className="report-section">
          <h3>Earnings & Farmer Profits</h3>
          <div className="chart-container">
            <canvas id="earningsChart"></canvas>
            <canvas id="farmerProfitsChart"></canvas>
          </div>
        </div>

        <div className="report-section">
          <h3>Crops Performance & Demand</h3>
          <div className="chart-container">
            <canvas id="topCropsChart"></canvas>
            <canvas id="demandChart"></canvas>
          </div>
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

export default FarmerReports;
