import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Topbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <div className="text-xl font-semibold text-gray-800">
        Welcome, {user?.name || 'User'}
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full font-medium">
          {user?.role || 'Role'}
        </span>
        <button 
          onClick={logout}
          className="text-sm bg-red-50 text-red-600 hover:bg-red-100 py-2 px-4 rounded-lg font-medium transition duration-200">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
