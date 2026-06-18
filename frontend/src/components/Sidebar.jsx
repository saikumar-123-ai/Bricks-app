import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-secondary text-white min-h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Smart Brick AI
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Dashboard
        </Link>
        <Link to="/customers" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Customers
        </Link>
        <Link to="/orders" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Orders
        </Link>
        <Link to="/inventory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Inventory
        </Link>
        <Link to="/production" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Production
        </Link>
        <Link to="/workers" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Workers
        </Link>
        <Link to="/sales" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Sales
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
