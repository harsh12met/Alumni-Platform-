import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Settings, FileText, TrendingUp, Calendar, Shield, Bell, Database } from 'lucide-react';

const InstituteAdminDashboard = () => {
  const { user } = useAuth();

  const features = [
    {
      title: 'User Management',
      description: 'Manage students, faculty, and alumni',
      icon: Users,
      color: 'blue',
      count: '1,250 Users'
    },
    {
      title: 'System Settings',
      description: 'Configure institute settings',
      icon: Settings,
      color: 'green',
      count: '8 Modules'
    },
    {
      title: 'Reports',
      description: 'Generate institutional reports',
      icon: FileText,
      color: 'purple',
      count: '15 Reports'
    },
    {
      title: 'Analytics',
      description: 'Institute performance metrics',
      icon: TrendingUp,
      color: 'orange',
      count: 'View Stats'
    },
    {
      title: 'Event Management',
      description: 'Manage campus events and activities',
      icon: Calendar,
      color: 'yellow',
      count: '5 Upcoming'
    },
    {
      title: 'Permissions',
      description: 'Manage user roles and permissions',
      icon: Shield,
      color: 'indigo',
      count: '6 Roles'
    }
  ];

  const recentActivities = [
    'Approved 25 new student registrations',
    'Updated academic calendar for Fall 2025',
    'Configured new course offerings',
    'Generated monthly institutional report'
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader title="Institute Admin Dashboard" roleColor="indigo" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, Institute Admin!</h2>
              <p className="text-gray-600 mt-1">
                Institute: {user?.institute?.toUpperCase().replace('-', ' ')} | Email: {user?.email}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">System Status</div>
              <div className="text-lg font-semibold text-green-600">All Systems Operational</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1,250</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">85</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Events This Month</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-gray-900">98%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${colorClasses[feature.color]} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.count}</p>
                </div>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Recent Activities & System Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
              Recent Activities
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-orange-600" />
              System Alerts
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">System backup completed</span>
                <span className="text-sm text-green-600 font-medium">Success</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700">Server maintenance scheduled</span>
                <span className="text-sm text-yellow-600 font-medium">Tomorrow</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">New feature deployment</span>
                <span className="text-sm text-blue-600 font-medium">Next Week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteAdminDashboard;