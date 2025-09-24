import React, { useState } from 'react';
import { 
  User, 
  Users, 
  Presentation, 
  Handshake, 
  Calendar, 
  MessageSquare, 
  Bell, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const FacultySidebar = ({ activeSection, onSectionChange, isCollapsed: externalIsCollapsed, setIsCollapsed: externalSetIsCollapsed }) => {
  const { logout } = useAuth();
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  
  // Use external collapse state if provided, otherwise use internal
  const isCollapsed = externalIsCollapsed !== undefined ? externalIsCollapsed : internalIsCollapsed;
  const setIsCollapsed = externalSetIsCollapsed || setInternalIsCollapsed;

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'alumni-directory', label: 'Alumni Directory', icon: Users },
    { id: 'guest-lectures', label: 'Guest Lectures', icon: Presentation },
    { id: 'collaborations', label: 'Collaborations', icon: Handshake },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`bg-white h-screen shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Faculty Portal</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default FacultySidebar;