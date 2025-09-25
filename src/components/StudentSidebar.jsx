import React from 'react';
import { 
  User, 
  Users, 
  MessageSquare, 
  Briefcase, 
  Calendar, 
  BookOpen, 
  Bell,
  Home,
  MapPin,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const StudentSidebar = ({ activeSection, setActiveSection, isCollapsed, setIsCollapsed }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'alumni-directory', label: 'Alumni Directory', icon: Users },
    { id: 'alumni-map', label: 'Alumni Map', icon: MapPin },
    { id: 'mentorship', label: 'Mentorship', icon: MessageSquare },
    { id: 'jobs', label: 'Jobs/Internships', icon: Briefcase },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-40 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo/Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">EC</span>
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <h2 className="text-lg font-bold text-gray-900">EduConnect</h2>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-4 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center px-3 py-3 mb-1 rounded-lg transition-colors duration-200 ${
              activeSection === item.id
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-2 right-2">
        <button
          onClick={logout}
          className="w-full flex items-center px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 text-sm font-medium">Logout</span>
          )}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
      >
        <span className={`text-gray-400 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>
          ›
        </span>
      </button>
    </div>
  );
};

export default StudentSidebar;