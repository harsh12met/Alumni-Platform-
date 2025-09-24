import React from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Briefcase, MessageCircle, Calendar, Award, Building, MapPin, Heart } from 'lucide-react';
import AIChatAssistant from '../../components/ui/AIChatAssistant';

const AlumniDashboard = () => {
  const { user } = useAuth();

  const features = [
    {
      title: 'Mentorship Program',
      description: 'Guide current students in their career journey',
      icon: Users,
      color: 'green',
      count: '8 Mentees'
    },
    {
      title: 'Job Referrals',
      description: 'Help students with job referrals',
      icon: Briefcase,
      color: 'blue',
      count: '5 Referrals'
    },
    {
      title: 'Alumni Network',
      description: 'Connect with fellow alumni',
      icon: MessageCircle,
      color: 'purple',
      count: '250+ Alumni'
    },
    {
      title: 'Events',
      description: 'Alumni meetups and networking events',
      icon: Calendar,
      color: 'orange',
      count: '2 Upcoming'
    },
    {
      title: 'Achievements',
      description: 'Share your career milestones',
      icon: Award,
      color: 'yellow',
      count: '6 Shared'
    },
    {
      title: 'Industry Insights',
      description: 'Share knowledge and expertise',
      icon: Building,
      color: 'indigo',
      count: '12 Posts'
    }
  ];

  const recentActivities = [
    'Mentored 3 students in software engineering',
    'Referred 2 candidates for positions at your company',
    'Attended Alumni Tech Meetup 2025',
    'Shared career guidance post on platform'
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
      <DashboardHeader title="Alumni Dashboard" roleColor="green" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, Alumni!</h2>
              <p className="text-gray-600 mt-1">
                Institute: {user?.institute?.toUpperCase().replace('-', ' ')} | Email: {user?.email}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Graduation Year</div>
              <div className="text-lg font-semibold text-gray-900">2018</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Students Mentored</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Job Referrals</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Network Size</p>
                <p className="text-2xl font-bold text-gray-900">250+</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Impact Score</p>
                <p className="text-2xl font-bold text-gray-900">95</p>
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

        {/* Recent Activities & Networking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
              Recent Activities
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-orange-600" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Alumni Tech Meetup 2025</span>
                <span className="text-sm text-green-600 font-medium">This Friday</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Career Guidance Webinar</span>
                <span className="text-sm text-blue-600 font-medium">Next Week</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">Annual Alumni Conference</span>
                <span className="text-sm text-purple-600 font-medium">Next Month</span>
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

export default AlumniDashboard;