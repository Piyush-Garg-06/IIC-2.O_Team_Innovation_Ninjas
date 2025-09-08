import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import './FarmerReports.css';

const FarmerReports = () => {
  const earningsChartRef = useRef(null);
  const profitsChartRef = useRef(null);
  const cropsChartRef = useRef(null);
  const demandChartRef = useRef(null);

  useEffect(() => {
    // Destroy existing charts
    if (earningsChartRef.current) earningsChartRef.current.destroy();
    if (profitsChartRef.current) profitsChartRef.current.destroy();
    if (cropsChartRef.current) cropsChartRef.current.destroy();
    if (demandChartRef.current) demandChartRef.current.destroy();

    // Earnings Chart
    earningsChartRef.current = new Chart(document.getElementById('earningsChart'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Earnings (₹)',
          data: [1200, 1900, 1700, 2200, 2500],
          borderColor: 'rgba(46,139,87,1)',
          backgroundColor: 'rgba(46,139,87,0.3)',
          fill: true,
          tension: 0.4
        }]
      },
      options: { responsive: true }
    });

    // Farmer Profits Chart
    profitsChartRef.current = new Chart(document.getElementById('farmerProfitsChart'), {
      type: 'line',
      data: {
        labels: ['Week 1','Week 2','Week 3','Week 4','Week 5'],
        datasets: [{
          label: 'Profits (₹)',
          data: [2000, 3500, 3000, 4500, 5000],
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
        labels: ['Tomato', 'Potato', 'Onion', 'Carrot'],
        datasets: [{
          label: 'Sales (kg)',
          data: [500, 700, 600, 400],
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

    // Market Demand Chart
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

    // Cleanup on unmount
    return () => {
      if (earningsChartRef.current) earningsChartRef.current.destroy();
      if (profitsChartRef.current) profitsChartRef.current.destroy();
      if (cropsChartRef.current) cropsChartRef.current.destroy();
      if (demandChartRef.current) demandChartRef.current.destroy();
    };
  }, []);

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
        <p>© 2025 AgriMarket | Empowering Farmers with Technology</p>
      </footer>
    </>
  );
};

export default FarmerReports;
