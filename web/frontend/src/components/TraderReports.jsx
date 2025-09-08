import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import './TraderReports.css';

const TraderReports = () => {
  const salesChartRef = useRef(null);
  const expensesChartRef = useRef(null);
  const profitChartRef = useRef(null);
  const [error, setError] = useState('');
  const [reportsData, setReportsData] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchReports = async () => {
      if (!loggedInUser || loggedInUser.role !== 'trader') {
        setError('You must be logged in as a trader to view reports.');
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/api/reports');
        const data = await response.json();
        if (response.ok) {
          // Filter orders relevant to the logged-in trader
          const traderOrders = data.reports.filter(order => order.traderUsername === loggedInUser.username);
          setReportsData(traderOrders);
        } else {
          setError(data.message || 'Failed to fetch reports.');
        }
      } catch (err) {
        setError('Network error. Failed to fetch reports.');
        console.error('Fetch reports error:', err);
      }
    };

    fetchReports();
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    // Helper functions for chart creation
    function createGradient(ctx, colorStart, colorEnd) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, colorStart);
      gradient.addColorStop(1, colorEnd);
      return gradient;
    }

    function createChart(ctx, label, dataObj, colorStart, colorEnd){
      const gradient = createGradient(ctx, colorStart, colorEnd);
      return new Chart(ctx,{
        type:'line',
        data:{
          labels:dataObj.labels,
          datasets:[{
            label:label,
            data:dataObj.data,
            borderColor:colorEnd,
            backgroundColor:gradient,
            fill:true,
            tension:0.3,
            pointBackgroundColor:colorEnd,
            pointHoverRadius:10,
            pointHoverBackgroundColor:'#fff'
          }]
        },
        options:{
          responsive:true,
          animation:{
            duration:1500,
            easing:'easeOutQuart'
          },
          plugins:{
            tooltip:{
              callbacks:{
                label:function(context){
                  const index = context.dataIndex;
                  const value = context.dataset.data[index];
                  const product = dataObj.products[index];
                  return product + ': ₹'+value;
                }
              }
            },
            legend: { display: true, position: 'bottom', labels:{ color:'#14532d', font:{weight:'bold'} } }
          },
          scales:{
            y:{
              beginAtZero:true,
              ticks:{ color:'#14532d', font:{weight:'bold'} }
            },
            x:{
              ticks:{ color:'#14532d', font:{weight:'bold'} }
            }
          }
        }
      });
    }

    if (reportsData.length > 0) {
      // Destroy existing charts if they are Chart instances
      if (salesChartRef.current instanceof Chart) salesChartRef.current.destroy();
      if (expensesChartRef.current instanceof Chart) expensesChartRef.current.destroy();
      if (profitChartRef.current instanceof Chart) profitChartRef.current.destroy();

      // Process data for charts
      const traderSales = reportsData.filter(order => order.status === 'Delivered').reduce((acc, order) => {
        const month = new Date(order.id).toLocaleString('default', { month: 'short' }); // Using order ID as a proxy for date for now
        acc[month] = (acc[month] || 0) + (order.productRate * order.quantity);
        return acc;
      }, {});

      // For simplicity, let's assume expenses are 30% of sales
      const traderExpenses = Object.keys(traderSales).reduce((acc, month) => {
        acc[month] = traderSales[month] * 0.3;
        return acc;
      }, {});

      const traderProfits = Object.keys(traderSales).reduce((acc, month) => {
        acc[month] = traderSales[month] - traderExpenses[month];
        return acc;
      }, {});

      const salesData = { labels: Object.keys(traderSales), data: Object.values(traderSales), products: Object.keys(traderSales) };
      const expensesData = { labels: Object.keys(traderExpenses), data: Object.values(traderExpenses), products: Object.keys(traderExpenses) };
      const profitData = { labels: Object.keys(traderProfits), data: Object.values(traderProfits), products: Object.keys(traderProfits) };

      // Create new charts
      salesChartRef.current = createChart(document.getElementById('salesChart').getContext('2d'),'Sales',salesData,'rgba(46,139,87,0.5)','rgba(46,139,87,1)');
      expensesChartRef.current = createChart(document.getElementById('expensesChart').getContext('2d'),'Expenses',expensesData,'rgba(255,145,77,0.5)','rgba(255,145,77,1)');
      profitChartRef.current = createChart(document.getElementById('profitChart').getContext('2d'),'Profitability',profitData,'rgba(20,83,45,0.5)','rgba(20,83,45,1)');
    }

    return () => {
      // Cleanup: Destroy charts when component unmounts or reportsData changes
      if (salesChartRef.current instanceof Chart) salesChartRef.current.destroy();
      if (expensesChartRef.current instanceof Chart) expensesChartRef.current.destroy();
      if (profitChartRef.current instanceof Chart) profitChartRef.current.destroy();
    };
  }, [reportsData]);

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

      <section className="report-section">
        <h1>Trader Reports</h1>
        <div className="report-grid">
          <div className="report-card">
            <h2>Sales</h2>
            <canvas ref={salesChartRef}></canvas>
          </div>
          <div className="report-card">
            <h2>Expenses</h2>
            <canvas ref={expensesChartRef}></canvas>
          </div>
          <div className="report-card">
            <h2>Profitability</h2>
            <canvas ref={profitChartRef}></canvas>
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

export default TraderReports;
