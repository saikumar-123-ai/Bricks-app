import Layout from '../components/Layout';
import { useState } from 'react';

const Inventory = () => {
  const [inventory, setInventory] = useState([
    { id: 1, item: 'Finished Bricks (Grade A)', quantity: 45000, unit: 'pcs', status: 'Healthy' },
    { id: 2, item: 'Raw Clay', quantity: 1200, unit: 'tons', status: 'Low Stock' },
    { id: 3, item: 'Coal Fuel', quantity: 50, unit: 'tons', status: 'Critical' },
    { id: 4, item: 'Fine Sand', quantity: 800, unit: 'tons', status: 'Healthy' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(1);
  const [updateAmount, setUpdateAmount] = useState('');
  const [updateType, setUpdateType] = useState('add');

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'Low Stock': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const calculateStatus = (item, newQuantity) => {
    if (item.unit === 'pcs') {
      if (newQuantity < 10000) return 'Critical';
      if (newQuantity < 25000) return 'Low Stock';
      return 'Healthy';
    } else { // tons
      if (newQuantity < 100) return 'Critical';
      if (newQuantity < 500) return 'Low Stock';
      return 'Healthy';
    }
  };

  const handleUpdateStock = (e) => {
    e.preventDefault();
    const amount = parseInt(updateAmount) || 0;
    if (amount <= 0) return;

    setInventory(inventory.map(item => {
      if (item.id === parseInt(selectedItem)) {
        let newQuantity = item.quantity;
        if (updateType === 'add') {
          newQuantity += amount;
        } else {
          newQuantity = Math.max(0, newQuantity - amount);
        }
        
        return {
          ...item,
          quantity: newQuantity,
          status: calculateStatus(item, newQuantity)
        };
      }
      return item;
    }));

    setShowModal(false);
    setUpdateAmount('');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">
          Update Stock
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {inventory.map((item) => (
          <div key={item.id} className={`p-6 rounded-xl border-l-4 shadow-sm bg-white transition-all transform hover:-translate-y-1 ${
            item.status === 'Critical' ? 'border-l-red-500' : 
            item.status === 'Low Stock' ? 'border-l-yellow-500' : 'border-l-green-500'
          }`}>
            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">{item.item}</div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-800">{item.quantity.toLocaleString()} <span className="text-lg text-gray-500 font-normal">{item.unit}</span></div>
            </div>
            <div className={`mt-3 inline-block px-2 py-1 rounded text-xs font-semibold border ${getStatusStyle(item.status)}`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Stock Forecast (ML Prediction)</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <span className="text-gray-400">Inventory Burn Rate Chart Placeholder (To be replaced with Chart.js)</span>
          </div>
      </div>

      {/* Update Stock Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px] transform transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Stock Level</h2>
            <form onSubmit={handleUpdateStock} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Item</label>
                <select 
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  {inventory.map(item => (
                    <option key={item.id} value={item.id}>{item.item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={updateType === 'add'} 
                      onChange={() => setUpdateType('add')} 
                      className="text-primary focus:ring-primary"
                    />
                    <span>Add to Stock</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={updateType === 'remove'} 
                      onChange={() => setUpdateType('remove')} 
                      className="text-primary focus:ring-primary"
                    />
                    <span>Consume/Remove</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input 
                  type="number" 
                  min="1"
                  required
                  value={updateAmount}
                  onChange={(e) => setUpdateAmount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder={`Amount in ${inventory.find(i => i.id === parseInt(selectedItem))?.unit || ''}`}
                />
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
                  Save Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Inventory;
