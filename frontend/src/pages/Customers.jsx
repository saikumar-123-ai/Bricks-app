import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

const Customers = () => {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('mock_customers');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'BuildCorp Inc.', phone: '+1 234 567 8900', email: 'contact@buildcorp.com', address: '123 Construction Ave, NY', totalOrders: 15 },
      { id: 2, name: 'Prime Estate Developers', phone: '+1 987 654 3210', email: 'procurement@primeestate.com', address: '45 Real Estate Blvd, CA', totalOrders: 8 },
      { id: 3, name: 'Skyline Masonry', phone: '+1 555 123 4567', email: 'info@skylinemasonry.com', address: '78 Brick Lane, TX', totalOrders: 32 },
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '', address: '' });

  // Save to localStorage whenever customers change
  useEffect(() => {
    localStorage.setItem('mock_customers', JSON.stringify(customers));
  }, [customers]);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const id = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    setCustomers([{ ...newCustomer, id, totalOrders: 0 }, ...customers]);
    setShowModal(false);
    setNewCustomer({ name: '', phone: '', email: '', address: '' });
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">
          + Add Customer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Contact</th>
              <th className="p-4 font-semibold">Address</th>
              <th className="p-4 font-semibold">Total Orders</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-800">{customer.name}</td>
                <td className="p-4 text-gray-600">
                  <div>{customer.phone}</div>
                  <div className="text-xs text-gray-400">{customer.email}</div>
                </td>
                <td className="p-4 text-gray-600">{customer.address}</td>
                <td className="p-4">
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                    {customer.totalOrders} Orders
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3 font-medium">Edit</button>
                  <button 
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className="text-red-500 hover:text-red-700 font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[450px] transform transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Customer</h2>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company/Customer Name</label>
                <input 
                  type="text" 
                  required
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. BuildCorp Inc."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    required
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="contact@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                <textarea 
                  required
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  rows="3"
                  placeholder="123 Construction Ave, NY"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium shadow-sm transition"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Customers;
