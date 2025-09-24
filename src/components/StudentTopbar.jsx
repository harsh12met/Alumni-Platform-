import React from 'react';
import { Menu, Bell, Search, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const StudentTopbar = ({ isCollapsed, setIsCollapsed }) => {
  const { user } = useAuth();

  return (
    <div className={`fixed top-0 right-0 h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6 transition-all duration-300 ${
      isCollapsed ? 'left-16' : 'left-64'
    }`}>
      {/* Left Side - Menu Toggle for Mobile */}
      <div className="flex items-center">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <div className="ml-4">
          <h1 className="text-lg font-semibold text-gray-900">Student Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back!</p>
        </div>
      </div>

      {/* Right Side - Search, Notifications, Profile */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Settings */}
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">S</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">Student User</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTopbar;