import Layout from '../components/Layout';
import { useState } from 'react';

const Sales = () => {
  const [sales, setSales] = useState([
    { id: 'SLS-001', date: '2023-10-24', customer: 'BuildCorp Inc.', amount: 4500, status: 'Completed' },
    { id: 'SLS-002', date: '2023-10-25', customer: 'Prime Estate Developers', amount: 1500, status: 'Pending' },
    { id: 'SLS-003', date: '2023-10-26', customer: 'Skyline Masonry', amount: 7500, status: 'Completed' },
    { id: 'SLS-004', date: '2023-10-27', customer: 'BuildCorp Inc.', amount: 3200, status: 'Completed' },
  ]);

  const exportToCSV = () => {
    // Define the headers
    const headers = ['Sale ID', 'Date', 'Customer', 'Amount ($)', 'Status'];
    
    // Map the sales data to an array of rows
    const rows = sales.map(sale => [
      sale.id, 
      sale.date, 
      `"${sale.customer}"`, // Wrap in quotes in case of commas
      sale.amount, 
      sale.status
    ]);
    
    // Combine headers and rows into CSV string
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    // Trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Sales Dashboard</h1>
        <button 
          onClick={exportToCSV}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition shadow-sm flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Export Report
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Total Revenue</div>
          <div className="text-3xl font-bold text-gray-800">$16,700</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Completed Sales</div>
          <div className="text-3xl font-bold text-gray-800">3</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Pending Revenue</div>
          <div className="text-3xl font-bold text-gray-800">$1,500</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Sale ID</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Amount</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-800">{sale.id}</td>
                <td className="p-4 text-gray-600">{sale.date}</td>
                <td className="p-4 font-semibold text-gray-800">{sale.customer}</td>
                <td className="p-4 font-bold text-green-600">${sale.amount.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(sale.status)}`}>
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Sales;
