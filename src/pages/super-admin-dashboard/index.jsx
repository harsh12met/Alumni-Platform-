import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Heart, 
  Briefcase, 
  BookOpen, 
  Database, 
  BarChart3, 
  Bell,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import AIChatAssistant from '../../components/ui/AIChatAssistant';

// Import components
import UsersManagement from './components/UsersManagement';
import AlumniDirectory from './components/AlumniDirectory';
import EventsManagement from './components/EventsManagement';
import DonationsManagement from './components/DonationsManagement';
import JobsManagement from './components/JobsManagement';
import StoriesManagement from './components/StoriesManagement';
import DatabaseMonitoring from './components/DatabaseMonitoring';
import Analytics from './components/Analytics';
import NotificationsManagement from './components/NotificationsManagement';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'alumni-directory', label: 'Alumni Directory', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'donations', label: 'Donations', icon: Heart },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'stories', label: 'Stories', icon: BookOpen },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersManagement />;
      case 'alumni-directory':
        return <AlumniDirectory />;
      case 'events':
        return <EventsManagement />;
      case 'donations':
        return <DonationsManagement />;
      case 'jobs':
        return <JobsManagement />;
      case 'stories':
        return <StoriesManagement />;
      case 'database':
        return <DatabaseMonitoring />;
      case 'analytics':
        return <Analytics />;
      case 'notifications':
        return <NotificationsManagement />;
      default:
        return <UsersManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">EduConnect</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    ${activeTab === item.id 
                      ? 'bg-red-50 text-red-700 border-r-2 border-red-500' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-0">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Super Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  {sidebarItems.find(item => item.id === activeTab)?.label}
                </p>
              </div>
            </div>

            {/* Admin Profile & Logout */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-red-600" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Super Admin</p>
                  <p className="text-xs text-gray-500">superadmin@edu.com</p>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  // Add logout functionality here
                  if (window.confirm('Are you sure you want to logout?')) {
                    // TODO: Add Firebase Auth signOut
                    // signOut(auth);
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                  }
                }}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
      
      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
};

export default SuperAdminDashboard;