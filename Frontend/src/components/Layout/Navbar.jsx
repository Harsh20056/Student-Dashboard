import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-indigo-700' : '';
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-white text-xl font-bold">
              Student Dashboard
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 ${isActive('/dashboard')}`}
            >
              Dashboard
            </Link>
            <Link
              to="/journal"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 ${isActive('/journal')}`}
            >
              Journal
            </Link>
            <Link
              to="/profile"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 ${isActive('/profile')}`}
            >
              Profile
            </Link>
            
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm">
                Welcome, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-white bg-indigo-700 hover:bg-indigo-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;