import Layout from '../components/Layout';

const Orders = () => {
  const dummyOrders = [
    { id: 'ORD-001', customer: 'BuildCorp Inc.', quantity: 15000, amount: '$4,500', status: 'Shipped', date: '2023-10-24' },
    { id: 'ORD-002', customer: 'Prime Estate Developers', quantity: 5000, amount: '$1,500', status: 'Manufacturing', date: '2023-10-25' },
    { id: 'ORD-003', customer: 'Skyline Masonry', quantity: 25000, amount: '$7,500', status: 'Pending', date: '2023-10-26' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Manufacturing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">
          + Create Order
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Quantity</th>
              <th className="p-4 font-semibold">Amount</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold text-gray-800">{order.id}</td>
                <td className="p-4 text-gray-600">{order.customer}</td>
                <td className="p-4 text-gray-600">{order.quantity.toLocaleString()} pcs</td>
                <td className="p-4 font-medium text-gray-800">{order.amount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{order.date}</td>
                <td className="p-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium">View Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Orders;
