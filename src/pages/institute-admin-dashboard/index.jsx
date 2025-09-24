import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Heart, 
  Briefcase, 
  BookOpen, 
  BarChart3, 
  Bell,
  Menu,
  X,
  LogOut,
  User,
  Building,
  Settings,
  ChevronRight,
  Database,
  FileText,
  TrendingUp,
  Shield,
  Activity
} from 'lucide-react';

// Import components
import UsersManagement from './components/UsersManagement';
import EventsManagement from './components/EventsManagement';
import DonationsManagement from './components/DonationsManagement';
import JobsManagement from './components/JobsManagement';
import StoriesManagement from './components/StoriesManagement';
import Analytics from './components/Analytics';
import NotificationsManagement from './components/NotificationsManagement';
import UserManagementCard from './components/UserManagementCard';

// Firebase imports
// import { auth, db } from '../../firebase';
// import { signOut } from 'firebase/auth';
// import { collection, doc, getDoc } from 'firebase/firestore';

const InstituteAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [instituteInfo, setInstituteInfo] = useState({
    name: "IISC BANGALORE",
    adminName: "Institute Admin",
    adminEmail: "admin@edu.com",
    instituteId: "iisc_bangalore_001"
  });

  // Fetch institute data from Firebase on component mount
  useEffect(() => {
    // TODO: Replace with actual Firebase Auth/Firestore calls
    // const fetchInstituteData = async () => {
    //   try {
    //     const userId = auth.currentUser?.uid;
    //     if (!userId) return;
    //     
    //     const userDoc = await getDoc(doc(db, "users", userId));
    //     const userData = userDoc.data();
    //     
    //     if (userData && userData.instituteId) {
    //       const instituteDoc = await getDoc(doc(db, "institutes", userData.instituteId));
    //       if (instituteDoc.exists()) {
    //         setInstituteInfo({
    //           name: instituteDoc.data().name,
    //           adminName: userData.displayName || "Institute Admin",
    //           adminEmail: userData.email || "admin@edu.com",
    //           instituteId: userData.instituteId
    //         });
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Error fetching institute data:", error);
    //   }
    // };
    // 
    // fetchInstituteData();
  }, []);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'donations', label: 'Donations', icon: Heart },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'stories', label: 'Stories', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <OverviewContent />;
      case 'users':
        return <UsersManagement instituteId={instituteInfo.instituteId} />;
      case 'events':
        return <EventsManagement instituteId={instituteInfo.instituteId} />;
      case 'donations':
        return <DonationsManagement instituteId={instituteInfo.instituteId} />;
      case 'jobs':
        return <JobsManagement instituteId={instituteInfo.instituteId} />;
      case 'stories':
        return <StoriesManagement instituteId={instituteInfo.instituteId} />;
      case 'analytics':
        return <Analytics instituteId={instituteInfo.instituteId} />;
      case 'notifications':
        return <NotificationsManagement instituteId={instituteInfo.instituteId} />;
      default:
        return <OverviewContent />;
    }
  };

  const OverviewContent = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Institute Admin!</h1>
          <p className="text-gray-600">
            Institute: IISC BANGALORE | Email: admin@edu.com
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">System Status</p>
          <p className="text-lg font-semibold text-green-600">All Systems Operational</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Total Users</h3>
              <p className="text-2xl font-bold text-gray-900">1,250</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Active Courses</h3>
              <p className="text-2xl font-bold text-gray-900">85</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Events This Month</h3>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">System Health</h3>
              <p className="text-2xl font-bold text-gray-900">98%</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Management Card Component */}
      <UserManagementCard />

      {/* Main Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <div 
          onClick={() => setActiveTab('users')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">User Management</h3>
              <p className="text-sm text-gray-600">1,250 Users</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Manage students, faculty, and alumni</p>
        </div>

        {/* System Settings */}
        <div 
          onClick={() => setActiveTab('settings')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
              <p className="text-sm text-gray-600">8 Modules</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Configure institute settings</p>
        </div>
        
        {/* Reports */}
        <div 
          onClick={() => setActiveTab('reports')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Reports</h3>
              <p className="text-sm text-gray-600">15 Reports</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Generate institutional reports</p>
        </div>
        
        {/* Analytics */}
        <div 
          onClick={() => setActiveTab('analytics')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600">View Stats</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Institute performance metrics</p>
        </div>
        
        {/* Event Management */}
        <div 
          onClick={() => setActiveTab('events')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Event Management</h3>
              <p className="text-sm text-gray-600">5 Upcoming</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Manage campus events and activities</p>
        </div>
        
        {/* Permissions */}
        <div 
          onClick={() => setActiveTab('permissions')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Permissions</h3>
              <p className="text-sm text-gray-600">6 Roles</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Manage user roles and permissions</p>
        </div>
      </div>

      {/* Recent Activities and System Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Activity className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-700">New student registration approved</p>
              <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-700">Event "Career Fair 2024" created</p>
              <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-gray-700">System backup completed</p>
              <span className="text-xs text-gray-500 ml-auto">3 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">System Alerts</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-700">Scheduled maintenance in 2 days</p>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-700">All systems running optimally</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // TODO: Add Firebase Auth signOut
      // signOut(auth)
      //   .then(() => {
      //     localStorage.removeItem('user');
      //     localStorage.removeItem('instituteAdmin');
      //     window.location.href = '/login';
      //   })
      //   .catch((error) => {
      //     console.error("Error signing out:", error);
      //   });
      
      localStorage.removeItem('user');
      localStorage.removeItem('instituteAdmin');
      window.location.href = '/login';
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
        fixed inset-y-0 left-0 z-50 w-64 bg-indigo-700 text-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex flex-col h-20 px-6 py-4 border-b border-indigo-600">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">Institute Admin</span>
          </div>
          <p className="text-xs text-indigo-200 truncate">{instituteInfo.name}</p>
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
                      ? 'bg-indigo-800 text-white' 
                      : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
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

        {/* Institute Info Footer */}
        <div className="absolute bottom-4 left-0 right-0 px-6">
          <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-3">
            <p className="text-xs text-indigo-200 font-medium">Institute ID:</p>
            <p className="text-xs text-indigo-100 font-mono">{instituteInfo.instituteId}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
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
                  {sidebarItems.find(item => item.id === activeTab)?.label}
                </h1>
                <div className="text-sm text-gray-500 flex items-center">
                  <span>Dashboard</span>
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span>{sidebarItems.find(item => item.id === activeTab)?.label}</span>
                </div>
              </div>
            </div>

            {/* Admin Profile & Logout */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{instituteInfo.adminName}</p>
                  <p className="text-xs text-gray-500">{instituteInfo.adminEmail}</p>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
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
    </div>
  );
};

export default InstituteAdminDashboard;