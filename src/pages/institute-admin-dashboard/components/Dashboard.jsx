import React from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Briefcase, 
  Trophy, 
  Heart, 
  Target,
  TrendingUp,
  FileText,
  Database,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Pending Department Requests',
      value: '12',
      icon: Users,
      color: 'orange',
      description: 'Awaiting approval'
    },
    {
      title: 'Active Events',
      value: '8',
      icon: Calendar,
      color: 'blue',
      description: 'This month'
    },
    {
      title: 'Job Postings',
      value: '45',
      icon: Briefcase,
      color: 'green',
      description: 'Active positions'
    },
    {
      title: 'Success Stories',
      value: '127',
      icon: Trophy,
      color: 'yellow',
      description: 'Published stories'
    },
    {
      title: 'Active Campaigns',
      value: '5',
      icon: Target,
      color: 'purple',
      description: 'Fundraising campaigns'
    },
    {
      title: 'Total Donations',
      value: '₹2.4M',
      icon: Heart,
      color: 'red',
      description: 'This year'
    }
  ];

  const recentActivities = [
    {
      type: 'approval',
      message: 'Approved Computer Science Department admin request',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'event',
      message: 'New tech symposium event created',
      time: '4 hours ago',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      type: 'job',
      message: 'Software Engineer position approved',
      time: '6 hours ago',
      icon: Briefcase,
      color: 'text-purple-600'
    },
    {
      type: 'donation',
      message: 'New donation campaign launched',
      time: '1 day ago',
      icon: Heart,
      color: 'text-red-600'
    }
  ];

  const pendingActions = [
    {
      title: 'Department Admin Requests',
      count: 12,
      priority: 'high',
      action: 'Review pending applications'
    },
    {
      title: 'Event Approvals',
      count: 3,
      priority: 'medium',
      action: 'Review event proposals'
    },
    {
      title: 'Job Post Reviews',
      count: 7,
      priority: 'medium',
      action: 'Review job postings'
    },
    {
      title: 'Feedback Responses',
      count: 15,
      priority: 'low',
      action: 'Respond to feedback'
    }
  ];

  const getInstituteName = () => {
    const instituteMap = {
      'iit-delhi': 'Indian Institute of Technology, Delhi',
      'nit-mumbai': 'National Institute of Technology, Mumbai',
      'bits-pilani': 'Birla Institute of Technology and Science, Pilani',
      'vit-vellore': 'Vellore Institute of Technology, Vellore',
      'iisc-bangalore': 'Indian Institute of Science, Bangalore'
    };
    
    return user?.institute ? instituteMap[user.institute] || user.institute : 'Institute Name';
  };

  const colorClasses = {
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600'
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600 mt-2">
              {getInstituteName()} • Institute Administration Dashboard
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Logged in as: {user?.email} • Role: {user?.role}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">System Status</div>
            <div className="text-lg font-semibold text-green-600 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              All Systems Operational
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 ${colorClasses[stat.color]} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Icon className={`w-5 h-5 mt-0.5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm">{activity.message}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all activities
          </button>
        </div>

        {/* Pending Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-orange-600" />
            Pending Actions
          </h2>
          <div className="space-y-4">
            {pendingActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-800 font-medium text-sm">{action.title}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[action.priority]}`}>
                      {action.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mt-1">{action.action}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">{action.count}</span>
                  <p className="text-xs text-gray-500">pending</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            View all pending items
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Review Requests</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Calendar className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Create Event</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Briefcase className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Post Job</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
            <Target className="w-8 h-8 text-red-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">New Campaign</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;