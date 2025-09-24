import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Database, Users, Settings, TrendingUp, Globe, Server, Lock } from 'lucide-react';

const SuperAdminDashboard = () => {
  const { user } = useAuth();

  const features = [
    {
      title: 'Global User Management',
      description: 'Manage users across all institutes',
      icon: Users,
      color: 'blue',
      count: '50k+ Users'
    },
    {
      title: 'System Administration',
      description: 'Global system configuration',
      icon: Settings,
      color: 'green',
      count: '25 Institutes'
    },
    {
      title: 'Security Center',
      description: 'Platform security and monitoring',
      icon: Shield,
      color: 'red',
      count: '99.9% Uptime'
    },
    {
      title: 'Analytics Hub',
      description: 'Platform-wide analytics and insights',
      icon: TrendingUp,
      color: 'purple',
      count: 'View Metrics'
    },
    {
      title: 'Server Management',
      description: 'Monitor and manage servers',
      icon: Server,
      color: 'orange',
      count: '12 Servers'
    },
    {
      title: 'Platform Control',
      description: 'Global platform settings',
      icon: Globe,
      color: 'indigo',
      count: '3 Regions'
    }
  ];

  const recentActivities = [
    'Added new institute: Stanford University',
    'Performed system-wide security audit',
    'Updated platform privacy policies',
    'Deployed new features across all institutes'
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader title="Super Admin Dashboard" roleColor="red" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, Super Administrator!</h2>
              <p className="text-gray-600 mt-1">
                Global Platform Management | Email: {user?.email}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Platform Status</div>
              <div className="text-lg font-semibold text-green-600">All Systems Online</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Institutes</p>
                <p className="text-2xl font-bold text-gray-900">25</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Platform Users</p>
                <p className="text-2xl font-bold text-gray-900">50.2k</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Server Uptime</p>
                <p className="text-2xl font-bold text-gray-900">99.9%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Security Score</p>
                <p className="text-2xl font-bold text-gray-900">A+</p>
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

        {/* Recent Activities & Critical Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-red-600" />
              Recent Global Activities
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-green-600" />
              System Health
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Database Performance</span>
                <span className="text-sm text-green-600 font-medium">Excellent</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">API Response Time</span>
                <span className="text-sm text-green-600 font-medium">45ms avg</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Active Connections</span>
                <span className="text-sm text-blue-600 font-medium">2,450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;