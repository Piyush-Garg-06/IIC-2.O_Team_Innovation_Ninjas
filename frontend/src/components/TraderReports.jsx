import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import './TraderReports.css';

const TraderReports = () => {
  const salesChartRef = useRef(null);
  const expensesChartRef = useRef(null);
  const profitChartRef = useRef(null);

  useEffect(() => {
    const salesData = { labels: ['Tomato','Potato','Onion','Carrot','Cabbage'], data:[12000,15000,13000,17000,18000], products:['Tomato','Potato','Onion','Carrot','Cabbage'] };
    const expensesData = { labels: ['Tomato','Potato','Onion','Carrot','Cabbage'], data:[7000,8000,7500,9000,9500], products:['Tomato','Potato','Onion','Carrot','Cabbage'] };
    const profitData = { labels: ['Tomato','Potato','Onion','Carrot','Cabbage'], data:[5000,7000,5500,8000,8500], products:['Tomato','Potato','Onion','Carrot','Cabbage'] };

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

    const salesChart = createChart(salesChartRef.current.getContext('2d'),'Sales',salesData,'rgba(46,139,87,0.5)','rgba(46,139,87,1)');
    const expensesChart = createChart(expensesChartRef.current.getContext('2d'),'Expenses',expensesData,'rgba(255,145,77,0.5)','rgba(255,145,77,1)');
    const profitChart = createChart(profitChartRef.current.getContext('2d'),'Profitability',profitData,'rgba(20,83,45,0.5)','rgba(20,83,45,1)');

    return () => {
      salesChart.destroy();
      expensesChart.destroy();
      profitChart.destroy();
    };
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
          <div>
            <h3>AgriMarket</h3>
            <p>Connecting farmers and traders through real-time price updates, fair trade, and efficient supply chain management.</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <a href="/trader-home">Home</a><br />
            <a href="/trader-products">Products</a><br />
            <a href="/trader-orders">Orders</a><br />
            <a href="/trader-transactions">Transactions</a><br />
            <a href="/trader-reports">Reports</a><br />
            <a href="/trader-help">Help</a>
          </div>
          <div>
            <h3>Contact Us</h3>
            <p>Email: support@agrimarket.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: New Delhi, India</p>
          </div>
          <div>
            <h3>Follow Us</h3>
            <a href="#">🌐 Facebook</a><br />
            <a href="#">🌐 Twitter</a><br />
            <a href="#">🌐 Instagram</a><br />
            <a href="#">🌐 LinkedIn</a>
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
