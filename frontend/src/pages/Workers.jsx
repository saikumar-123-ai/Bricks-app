import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

const Workers = () => {
  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem('mock_workers');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'W-101', name: 'Robert Smith', role: 'Machine Operator', shift: 'Morning', status: 'Present' },
      { id: 'W-102', name: 'James Doe', role: 'Loader', shift: 'Morning', status: 'Present' },
      { id: 'W-103', name: 'Michael Johnson', role: 'Kiln Supervisor', shift: 'Night', status: 'Absent' },
      { id: 'W-104', name: 'William Brown', role: 'Driver', shift: 'Morning', status: 'On Leave' },
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [newWorker, setNewWorker] = useState({ name: '', role: 'Loader', shift: 'Morning' });

  // Save to localStorage whenever workers change
  useEffect(() => {
    localStorage.setItem('mock_workers', JSON.stringify(workers));
  }, [workers]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddWorker = (e) => {
    e.preventDefault();
    const id = `W-${100 + workers.length + 1}`;
    setWorkers([...workers, { ...newWorker, id, status: 'Present' }]);
    setShowModal(false);
    setNewWorker({ name: '', role: 'Loader', shift: 'Morning' });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Worker Management</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">
          + Add Worker
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Shift</th>
              <th className="p-4 font-semibold">Today's Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {workers.map((worker) => (
              <tr key={worker.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-800">{worker.id}</td>
                <td className="p-4 font-semibold text-gray-800">{worker.name}</td>
                <td className="p-4 text-gray-600">{worker.role}</td>
                <td className="p-4 text-gray-600">{worker.shift}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(worker.status)}`}>
                    {worker.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium mr-3">Mark Attendance</button>
                  <button className="text-gray-500 hover:text-gray-700 font-medium">Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Worker Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Worker</h2>
            <form onSubmit={handleAddWorker} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newWorker.name}
                  onChange={(e) => setNewWorker({...newWorker, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter worker's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select 
                  value={newWorker.role}
                  onChange={(e) => setNewWorker({...newWorker, role: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="Loader">Loader</option>
                  <option value="Machine Operator">Machine Operator</option>
                  <option value="Driver">Driver</option>
                  <option value="Kiln Supervisor">Kiln Supervisor</option>
                  <option value="Security">Security</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                <select 
                  value={newWorker.shift}
                  onChange={(e) => setNewWorker({...newWorker, shift: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="Morning">Morning (6 AM - 2 PM)</option>
                  <option value="Evening">Evening (2 PM - 10 PM)</option>
                  <option value="Night">Night (10 PM - 6 AM)</option>
                </select>
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
                  Add Worker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Workers;
