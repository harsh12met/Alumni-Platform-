import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformOverview = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, Super Administrator!</h1>
              <p className="text-gray-600 mt-1">Global Platform Management | Email: superadmin@edu.com</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Platform Status</p>
              <p className="text-lg font-semibold text-green-600">All Systems Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Institutes */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Institutes</p>
                <p className="text-3xl font-bold text-gray-900">25</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={24} className="text-red-600" />
              </div>
            </div>
          </div>

          {/* Platform Users */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Platform Users</p>
                <p className="text-3xl font-bold text-gray-900">50.2k</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Users" size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Server Uptime */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Server Uptime</p>
                <p className="text-3xl font-bold text-gray-900">99.9%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="Server" size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          {/* Security Score */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Security Score</p>
                <p className="text-3xl font-bold text-gray-900">A+</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Management Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Global User Management */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Users" size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Global User Management</h3>
                <p className="text-sm text-blue-600 font-medium">50k+ Users</p>
                <p className="text-sm text-gray-500 mt-1">Manage users across all institutes</p>
              </div>
            </div>
          </div>

          {/* System Administration */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">System Administration</h3>
                <p className="text-sm text-green-600 font-medium">25 Institutes</p>
                <p className="text-sm text-gray-500 mt-1">Global system configuration</p>
              </div>
            </div>
          </div>

          {/* Security Center */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Security Center</h3>
                <p className="text-sm text-red-600 font-medium">99.9% Uptime</p>
                <p className="text-sm text-gray-500 mt-1">Platform security and monitoring</p>
              </div>
            </div>
          </div>

          {/* Analytics Hub */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics Hub</h3>
                <p className="text-sm text-purple-600 font-medium">View Metrics</p>
                <p className="text-sm text-gray-500 mt-1">Platform-wide analytics and insights</p>
              </div>
            </div>
          </div>

          {/* Server Management */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Icon name="Server" size={24} className="text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Server Management</h3>
                <p className="text-sm text-orange-600 font-medium">12 Servers</p>
                <p className="text-sm text-gray-500 mt-1">Monitor and manage servers</p>
              </div>
            </div>
          </div>

          {/* Platform Control */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Globe" size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Platform Control</h3>
                <p className="text-sm text-blue-600 font-medium">3 Regions</p>
                <p className="text-sm text-gray-500 mt-1">Global platform settings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Global Activities */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={20} className="text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900">Recent Global Activities</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New institute registered: UC Berkeley</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">System backup completed successfully</p>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">High server load detected and resolved</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Icon name="Activity" size={20} className="text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Database Performance</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">Excellent</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">API Response Time</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">142ms avg</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">Server Load</span>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">Moderate</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Security Status</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default PlatformOverview;