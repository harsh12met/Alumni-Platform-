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
  X,
  Search
} from 'lucide-react';

const SimpleFacultyDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
    localStorage.removeItem('educonnect_user');
    window.location.href = '/login';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Faculty Profile</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Dr. Faculty Name</h3>
                  <p className="text-gray-600">Professor, Computer Science</p>
                  <p className="text-gray-500">faculty@edu.com</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Department</h4>
                  <p className="text-gray-600">Computer Science Engineering</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Experience</h4>
                  <p className="text-gray-600">15+ years</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Specialization</h4>
                  <p className="text-gray-600">Machine Learning, AI</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Phone</h4>
                  <p className="text-gray-600">+91 9876543210</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'alumni-directory':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Alumni Directory</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search alumni..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Alumni {i}</h4>
                        <p className="text-sm text-gray-600">Software Engineer at Tech Corp</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'guest-lectures':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Lectures</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  + Schedule New Lecture
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium">AI in Industry - Lecture {i}</h4>
                    <p className="text-sm text-gray-600 mt-1">Speaker: Industry Expert {i}</p>
                    <p className="text-sm text-gray-500 mt-1">Date: Oct 1{i}, 2025</p>
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Scheduled</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'collaborations':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Collaborations</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  + New Collaboration
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium">Research Project {i}</h4>
                    <p className="text-sm text-gray-600 mt-1">ML & AI Research Collaboration</p>
                    <p className="text-sm text-gray-500 mt-1">Duration: 6 months</p>
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'events':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Events</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  + Create Event
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium">Workshop {i}</h4>
                    <p className="text-sm text-gray-600 mt-1">Technical workshop on modern technologies</p>
                    <p className="text-sm text-gray-500 mt-1">Date: Oct 2{i}, 2025</p>
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Upcoming</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'feedback':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Feedback</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  + Create Feedback Form
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium">Course Feedback {i}</h4>
                    <p className="text-sm text-gray-600 mt-1">Student feedback for CSE-30{i}</p>
                    <p className="text-sm text-gray-500 mt-1">Responses: {i * 15}</p>
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Bell className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Notification {i}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        New message or update about your activities
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Faculty Profile</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p>Welcome to Faculty Dashboard!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      } flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed && (
              <h1 className="text-xl font-bold text-green-600">Faculty Portal</h1>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {isSidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">Faculty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SimpleFacultyDashboard;