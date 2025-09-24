import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Users, FileText, Calendar, Award, TrendingUp, Clock, Target } from 'lucide-react';
import AIChatAssistant from '../../components/ui/AIChatAssistant';

const FacultyDashboard = () => {
  const { user } = useAuth();

  const features = [
    {
      title: 'My Courses',
      description: 'Manage courses and curriculum',
      icon: BookOpen,
      color: 'blue',
      count: '4 Courses'
    },
    {
      title: 'Student Management',
      description: 'Monitor student progress and grades',
      icon: Users,
      color: 'green',
      count: '120 Students'
    },
    {
      title: 'Assignments',
      description: 'Create and manage assignments',
      icon: FileText,
      color: 'purple',
      count: '8 Active'
    },
    {
      title: 'Schedule',
      description: 'View teaching schedule and events',
      icon: Calendar,
      color: 'orange',
      count: '12 This Week'
    },
    {
      title: 'Research',
      description: 'Research projects and publications',
      icon: Award,
      color: 'yellow',
      count: '3 Projects'
    },
    {
      title: 'Analytics',
      description: 'Student performance analytics',
      icon: TrendingUp,
      color: 'indigo',
      count: 'View Reports'
    }
  ];

  const recentActivities = [
    'Graded Data Structures assignments for CSE-301',
    'Updated course material for Machine Learning',
    'Conducted research meeting with PhD students',
    'Reviewed student project proposals'
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
      <DashboardHeader title="Faculty Dashboard" roleColor="purple" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, Professor!</h2>
              <p className="text-gray-600 mt-1">
                Institute: {user?.institute?.toUpperCase().replace('-', ' ')} | Email: {user?.email}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Current Semester</div>
              <div className="text-lg font-semibold text-gray-900">Fall 2025</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">120</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Research Projects</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
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

        {/* Recent Activities & Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              Recent Activities
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Today's Schedule
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">CSE-301: Data Structures</span>
                <span className="text-sm text-purple-600 font-medium">10:00 AM</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">CSE-501: Machine Learning</span>
                <span className="text-sm text-blue-600 font-medium">2:00 PM</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Research Meeting</span>
                <span className="text-sm text-green-600 font-medium">4:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
};

export default FacultyDashboard;