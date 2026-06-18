import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [stats, setStats] = useState({ sales: 0, orders: 0, inventory: 0, workers: 0 });

  useEffect(() => {
    // 1. Calculate Active Workers
    const savedWorkers = localStorage.getItem('mock_workers');
    const workers = savedWorkers ? JSON.parse(savedWorkers) : [
      { id: 'W-101', status: 'Present' }, { id: 'W-102', status: 'Present' },
      { id: 'W-103', status: 'Absent' }, { id: 'W-104', status: 'On Leave' }
    ];
    
    // 2. Calculate Total Orders
    const savedOrders = localStorage.getItem('mock_orders');
    const orders = savedOrders ? JSON.parse(savedOrders) : [1, 2, 3]; // Default has 3 orders
    
    // 3. Calculate Total Sales
    const savedSales = localStorage.getItem('mock_sales');
    const sales = savedSales ? JSON.parse(savedSales) : [
      { amount: 4500 }, { amount: 1500 }, { amount: 7500 }, { amount: 3200 }
    ];
    const totalSales = sales.reduce((acc, curr) => acc + curr.amount, 0);

    // 4. Calculate Inventory Stock (Bricks only)
    const savedInventory = localStorage.getItem('mock_inventory');
    const inventory = savedInventory ? JSON.parse(savedInventory) : [
      { id: 1, quantity: 45000, unit: 'pcs' },
      { id: 2, quantity: 1200, unit: 'tons' },
      { id: 3, quantity: 50, unit: 'tons' },
      { id: 4, quantity: 800, unit: 'tons' },
    ];
    // Sum only the bricks (pcs)
    const totalInventory = inventory.filter(i => i.unit === 'pcs').reduce((acc, curr) => acc + curr.quantity, 0);
    
    setStats({
      workers: workers.length,
      orders: orders.length,
      sales: totalSales,
      inventory: totalInventory
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  const productionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Bricks Produced',
        data: [12000, 15000, 14000, 16000, 18000, 17500, 19000],
        borderColor: '#FF5722',
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
        tension: 0.4, fill: true, pointBackgroundColor: '#FF5722',
    }],
  };

  const demandData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Actual Sales', data: [45000, 52000, 48000, 61000, 59000, 65000], backgroundColor: '#263238', borderRadius: 4 },
      { label: 'ML Predicted', data: [47000, 50000, 53000, 58000, 64000, 70000], backgroundColor: '#FF5722', borderRadius: 4 },
    ],
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition transform hover:-translate-y-1">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Total Sales</div>
          <div className="text-3xl font-bold text-gray-800">${stats.sales.toLocaleString()}</div>
          <div className="text-gray-400 text-sm mt-2 font-medium">- From Sales Page</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition transform hover:-translate-y-1">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Total Orders</div>
          <div className="text-3xl font-bold text-gray-800">{stats.orders.toLocaleString()}</div>
          <div className="text-gray-400 text-sm mt-2 font-medium">- From Orders Page</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition transform hover:-translate-y-1">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Inventory Stock</div>
          <div className="text-3xl font-bold text-gray-800">{stats.inventory.toLocaleString()}</div>
          <div className="text-gray-400 text-sm mt-2 font-medium">- From Inventory Page</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition transform hover:-translate-y-1">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Active Workers</div>
          <div className="text-3xl font-bold text-gray-800">{stats.workers}</div>
          <div className="text-gray-400 text-sm mt-2 font-medium">- From Workers Page</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Production Overview</h2>
          <div className="h-64 relative w-full">
            <Line data={productionData} options={{ responsive: true, maintainAspectRatio: false, plugins: { title: { display: false } } }} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Demand Prediction (ML)</h2>
          <div className="h-64 relative w-full">
            <Bar data={demandData} options={{ responsive: true, maintainAspectRatio: false, plugins: { title: { display: false } } }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
