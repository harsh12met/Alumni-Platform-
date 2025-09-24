import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, 
  GraduationCap,
  Calendar, 
  MessageSquare, 
  Briefcase, 
  Trophy, 
  Heart,
  Menu,
  X,
  LogOut,
  Building2,
  Bell,
  Settings,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AIChatAssistant from '../../components/ui/AIChatAssistant';

// Import components
import FacultyApprovals from './components/FacultyApprovals';
import StudentApprovals from './components/StudentApprovals';
import DepartmentEvents from './components/DepartmentEvents';
import DepartmentFeedback from './components/DepartmentFeedback';
import DepartmentJobs from './components/DepartmentJobs';
import DepartmentStories from './components/DepartmentStories';
import DepartmentDonations from './components/DepartmentDonations';
import DepartmentDashboard from './components/DepartmentDashboard';

const DepartmentAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get current path for active sidebar item
  const currentPath = location.pathname.split('/').pop() || 'dashboard';

  const sidebarItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Building2, 
      path: '/department-admin-dashboard',
      description: 'Overview and analytics'
    },
    { 
      id: 'faculty-approvals', 
      label: 'Faculty Approvals', 
      icon: Users, 
      path: '/department-admin-dashboard/faculty-approvals',
      description: 'Approve faculty registrations'
    },
    { 
      id: 'student-approvals', 
      label: 'Student Approvals', 
      icon: GraduationCap, 
      path: '/department-admin-dashboard/student-approvals',
      description: 'Approve student registrations'
    },
    { 
      id: 'events', 
      label: 'Events', 
      icon: Calendar, 
      path: '/department-admin-dashboard/events',
      description: 'Manage department events'
    },
    { 
      id: 'feedback', 
      label: 'Feedback', 
      icon: MessageSquare, 
      path: '/department-admin-dashboard/feedback',
      description: 'View feedback and surveys'
    },
    { 
      id: 'jobs', 
      label: 'Jobs', 
      icon: Briefcase, 
      path: '/department-admin-dashboard/jobs',
      description: 'Manage job postings'
    },
    { 
      id: 'stories', 
      label: 'Success Stories', 
      icon: Trophy, 
      path: '/department-admin-dashboard/stories',
      description: 'Manage success stories'
    },
    { 
      id: 'donations', 
      label: 'Donations', 
      icon: Heart, 
      path: '/department-admin-dashboard/donations',
      description: 'Manage department donations'
    }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  const getDepartmentName = () => {
    // Get department name from user data or fallback
    const departmentMap = {
      'computer-science': 'Computer Science & Engineering',
      'electrical-engineering': 'Electrical Engineering',
      'mechanical-engineering': 'Mechanical Engineering',
      'civil-engineering': 'Civil Engineering',
      'electronics-communication': 'Electronics & Communication',
      'information-technology': 'Information Technology',
      'chemical-engineering': 'Chemical Engineering',
      'biotechnology': 'Biotechnology'
    };
    
    return user?.department ? departmentMap[user.department] || user.department : 'Department Name';
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
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">Department Admin</span>
              <p className="text-purple-100 text-xs">Management Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-white hover:bg-purple-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                              (item.id === 'dashboard' && location.pathname === '/department-admin-dashboard');
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <div className="text-left">
                    <div>{item.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <p className="text-xs font-medium text-gray-900">Logged in as:</p>
            <p className="text-xs text-gray-600 truncate">{user?.email}</p>
            <p className="text-xs text-purple-600 font-medium">{user?.role}</p>
            <p className="text-xs text-gray-500">{getDepartmentName()}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-0">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
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
                  {getDepartmentName()}
                </h1>
                <p className="text-sm text-gray-500">
                  Department Administration Dashboard
                </p>
              </div>
            </div>

            {/* Top bar actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>

              {/* Logout */}
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<DepartmentDashboard />} />
            <Route path="/faculty-approvals" element={<FacultyApprovals />} />
            <Route path="/student-approvals" element={<StudentApprovals />} />
            <Route path="/events" element={<DepartmentEvents />} />
            <Route path="/feedback" element={<DepartmentFeedback />} />
            <Route path="/jobs" element={<DepartmentJobs />} />
            <Route path="/stories" element={<DepartmentStories />} />
            <Route path="/donations" element={<DepartmentDonations />} />
          </Routes>
        </main>
      </div>
      
      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
};

export default DepartmentAdminDashboard;