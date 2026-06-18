import Layout from '../components/Layout';
import { useState } from 'react';

const Production = () => {
  const [entries, setEntries] = useState([
    { id: 'PRD-001', date: '2023-10-24', produced: 15000, damaged: 120, rejected: 30, efficiency: '95%' },
    { id: 'PRD-002', date: '2023-10-23', produced: 14500, damaged: 200, rejected: 50, efficiency: '92%' },
    { id: 'PRD-003', date: '2023-10-22', produced: 16000, damaged: 100, rejected: 20, efficiency: '98%' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ date: new Date().toISOString().split('T')[0], produced: 0, damaged: 0, rejected: 0 });

  const getEfficiencyColor = (efficiency) => {
    const val = parseInt(efficiency);
    if (val >= 95) return 'text-green-600 bg-green-50 border-green-200';
    if (val >= 90) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    const id = `PRD-00${entries.length + 1}`;
    
    // Calculate simple efficiency
    const total = parseInt(newEntry.produced);
    const defects = parseInt(newEntry.damaged) + parseInt(newEntry.rejected);
    let eff = 0;
    if (total > 0) {
      eff = Math.max(0, Math.round(((total - defects) / total) * 100));
    }

    setEntries([{ ...newEntry, id, efficiency: `${eff}%` }, ...entries]);
    setShowModal(false);
    setNewEntry({ date: new Date().toISOString().split('T')[0], produced: 0, damaged: 0, rejected: 0 });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Production Management</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">
          + Add Daily Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Total Produced (This Week)</div>
          <div className="text-3xl font-bold text-gray-800">45,500 <span className="text-lg text-gray-500 font-normal">pcs</span></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Average Efficiency</div>
          <div className="text-3xl font-bold text-gray-800">95%</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Total Defect Rate</div>
          <div className="text-3xl font-bold text-gray-800">1.2%</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Entry ID</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Produced Bricks</th>
              <th className="p-4 font-semibold">Damaged</th>
              <th className="p-4 font-semibold">Rejected</th>
              <th className="p-4 font-semibold">Efficiency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-800">{entry.id}</td>
                <td className="p-4 text-gray-600">{entry.date}</td>
                <td className="p-4 font-semibold text-blue-600">{entry.produced.toLocaleString()}</td>
                <td className="p-4 text-orange-500">{entry.damaged}</td>
                <td className="p-4 text-red-500">{entry.rejected}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded text-xs font-bold border ${getEfficiencyColor(entry.efficiency)}`}>
                    {entry.efficiency}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Daily Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[450px] transform transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Daily Production Entry</h2>
            <form onSubmit={handleAddEntry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date" 
                  required
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Produced Bricks</label>
                <input 
                  type="number" 
                  min="0"
                  required
                  value={newEntry.produced}
                  onChange={(e) => setNewEntry({...newEntry, produced: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. 15000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Damaged Bricks</label>
                  <input 
                    type="number" 
                    min="0"
                    required
                    value={newEntry.damaged}
                    onChange={(e) => setNewEntry({...newEntry, damaged: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rejected Bricks</label>
                  <input 
                    type="number" 
                    min="0"
                    required
                    value={newEntry.rejected}
                    onChange={(e) => setNewEntry({...newEntry, rejected: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
                  />
                </div>
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
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Production;
