import React from 'react';
import { BookOpen, Users, Briefcase, Calendar, Award, TrendingUp, MessageSquare, Bell } from 'lucide-react';

const DashboardOverviewSection = () => {
  const quickStats = [
    { label: 'Current CGPA', value: '8.5', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
    { label: 'Credits Earned', value: '156', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Applications', value: '3', icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
    { label: 'Events Registered', value: '2', icon: Calendar, color: 'bg-orange-100 text-orange-600' }
  ];

  const recentActivities = [
    { action: 'Applied to Software Engineer Intern at Google', time: '2 hours ago', type: 'application' },
    { action: 'Registered for Tech Career Fair 2025', time: '1 day ago', type: 'event' },
    { action: 'Sent mentorship request to Sarah Johnson', time: '2 days ago', type: 'mentorship' },
    { action: 'Downloaded Machine Learning Fundamentals', time: '3 days ago', type: 'resource' }
  ];

  const upcomingDeadlines = [
    { title: 'Google Internship Application', deadline: '2025-10-15', daysLeft: 22, type: 'application' },
    { title: 'Tech Career Fair 2025', deadline: '2025-10-15', daysLeft: 22, type: 'event' },
    { title: 'Database Project Submission', deadline: '2025-10-05', daysLeft: 12, type: 'academic' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'application': return '💼';
      case 'event': return '📅';
      case 'mentorship': return '🤝';
      case 'resource': return '📚';
      default: return '📢';
    }
  };

  const getDeadlineColor = (daysLeft) => {
    if (daysLeft <= 3) return 'text-red-600 bg-red-50';
    if (daysLeft <= 7) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Student!</h1>
            <p className="text-blue-100">Here's what's happening with your academic journey</p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
              Recent Activities
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm">{activity.action}</p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                View all activities →
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-orange-600" />
              Upcoming Deadlines
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <h4 className="text-sm font-medium text-gray-900">{deadline.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">
                    Due: {new Date(deadline.deadline).toLocaleDateString()}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDeadlineColor(deadline.daysLeft)}`}>
                    {deadline.daysLeft} days left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Browse Jobs', description: 'Find new opportunities', icon: Briefcase, color: 'bg-blue-500' },
              { title: 'Connect with Alumni', description: 'Expand your network', icon: Users, color: 'bg-green-500' },
              { title: 'Check Events', description: 'Upcoming activities', icon: Calendar, color: 'bg-purple-500' },
              { title: 'Study Resources', description: 'Access materials', icon: BookOpen, color: 'bg-orange-500' }
            ].map((action, index) => (
              <button
                key={index}
                className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Academic Progress</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Overall Progress</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Current Semester</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Network & Engagement</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Alumni Connections</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Events Attended</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600">Active Applications</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Resources Downloaded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverviewSection;