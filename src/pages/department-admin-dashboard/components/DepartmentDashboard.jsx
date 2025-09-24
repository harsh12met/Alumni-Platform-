import React from 'react';
import { 
  Users, 
  GraduationCap,
  Calendar, 
  MessageSquare, 
  Briefcase, 
  Trophy, 
  Heart,
  TrendingUp,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const DepartmentDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Pending Faculty Approvals',
      value: '8',
      icon: Users,
      color: 'orange',
      description: 'Awaiting approval'
    },
    {
      title: 'Pending Student Approvals',
      value: '15',
      icon: GraduationCap,
      color: 'blue',
      description: 'Registration requests'
    },
    {
      title: 'Department Events',
      value: '6',
      icon: Calendar,
      color: 'green',
      description: 'Active events'
    },
    {
      title: 'Job Postings',
      value: '23',
      icon: Briefcase,
      color: 'purple',
      description: 'Department jobs'
    },
    {
      title: 'Success Stories',
      value: '42',
      icon: Trophy,
      color: 'yellow',
      description: 'Published stories'
    },
    {
      title: 'Donation Requests',
      value: '7',
      icon: Heart,
      color: 'red',
      description: 'Pending requests'
    }
  ];

  const recentActivities = [
    {
      type: 'approval',
      message: 'Approved faculty registration for Dr. Priya Kulkarni',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'event',
      message: 'New department seminar "AI in Modern Computing" created',
      time: '4 hours ago',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      type: 'student',
      message: 'Student registration approved for Arjun Patil (CS2024001)',
      time: '6 hours ago',
      icon: GraduationCap,
      color: 'text-purple-600'
    },
    {
      type: 'job',
      message: 'Software Engineer position posted by TechCorp',
      time: '1 day ago',
      icon: Briefcase,
      color: 'text-indigo-600'
    },
    {
      type: 'donation',
      message: 'New scholarship fund request for final year projects',
      time: '1 day ago',
      icon: Heart,
      color: 'text-red-600'
    }
  ];

  const pendingActions = [
    {
      title: 'Faculty Approvals',
      count: 8,
      priority: 'high',
      action: 'Review pending faculty registrations'
    },
    {
      title: 'Student Approvals',
      count: 15,
      priority: 'high',
      action: 'Review student registration requests'
    },
    {
      title: 'Event Reviews',
      count: 3,
      priority: 'medium',
      action: 'Review event proposals'
    },
    {
      title: 'Donation Requests',
      count: 7,
      priority: 'medium',
      action: 'Review scholarship and funding requests'
    },
    {
      title: 'Feedback Responses',
      count: 12,
      priority: 'low',
      action: 'Respond to event feedback'
    }
  ];

  const getDepartmentName = () => {
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

  const colorClasses = {
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
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
              {getDepartmentName()} • Department Administration Dashboard
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Logged in as: {user?.email} • Role: {user?.role}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Department Status</div>
            <div className="text-lg font-semibold text-green-600 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              All Systems Active
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
            <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
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
          <button className="w-full mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium">
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
          <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            View all pending items
          </button>
        </div>
      </div>

      {/* Department Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Faculty</span>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">24</p>
          <p className="text-xs text-green-600">+2 this month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Students</span>
            <GraduationCap className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">342</p>
          <p className="text-xs text-green-600">+18 this month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Active Jobs</span>
            <Briefcase className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">23</p>
          <p className="text-xs text-blue-600">5 new postings</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Donation Funds</span>
            <Heart className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹1.2M</p>
          <p className="text-xs text-green-600">Available for disbursement</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Users className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Review Faculty</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <GraduationCap className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Review Students</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Calendar className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Create Event</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
            <Briefcase className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Post Job</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
            <Trophy className="w-8 h-8 text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Story</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
            <Heart className="w-8 h-8 text-red-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Manage Funds</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <MessageSquare className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Feedback</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDashboard;