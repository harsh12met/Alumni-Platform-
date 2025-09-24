import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Calendar, 
  MessageCircle, 
  Heart, 
  Trophy, 
  TrendingUp,
  Award,
  Target,
  Clock,
  Star
} from 'lucide-react';

const AlumniDashboardOverviewSection = () => {
  const [stats, setStats] = useState({
    totalConnections: 45,
    activeMentorships: 3,
    jobsPosted: 2,
    eventsAttended: 8,
    totalDonations: 750,
    networkingPosts: 5,
    successStoriesShared: 1
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'mentorship',
      title: 'New mentorship request accepted',
      description: 'Started mentoring Alex Chen for software development career guidance',
      timestamp: '2 hours ago',
      icon: Users
    },
    {
      id: 2,
      type: 'job',
      title: 'Job application received',
      description: 'Sarah Wilson applied for your Senior Developer position',
      timestamp: '1 day ago',
      icon: Briefcase
    },
    {
      id: 3,
      type: 'event',
      title: 'Event registration confirmed',
      description: 'Registered for Tech Alumni Meetup 2024',
      timestamp: '2 days ago',
      icon: Calendar
    },
    {
      id: 4,
      type: 'donation',
      title: 'Donation completed',
      description: 'Donated $500 to Scholarship Fund 2024',
      timestamp: '1 week ago',
      icon: Heart
    }
  ]);

  const [quickActions] = useState([
    {
      id: 1,
      title: 'Review Mentorship Requests',
      description: 'You have 2 pending mentorship requests',
      action: 'mentorship',
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      urgent: true
    },
    {
      id: 2,
      title: 'Post a Job Opportunity',
      description: 'Share new openings with students',
      action: 'jobs',
      icon: Briefcase,
      color: 'bg-green-50 text-green-600 border-green-200',
      urgent: false
    },
    {
      id: 3,
      title: 'Update Your Profile',
      description: 'Keep your information current',
      action: 'profile',
      icon: Users,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      urgent: false
    },
    {
      id: 4,
      title: 'Share Success Story',
      description: 'Inspire others with your achievements',
      action: 'success-stories',
      icon: Trophy,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      urgent: false
    }
  ]);

  const [achievements] = useState([
    {
      id: 1,
      title: 'Mentor of the Month',
      description: 'Recognized for outstanding mentorship contributions',
      date: 'March 2024',
      icon: Award,
      color: 'text-yellow-600'
    },
    {
      id: 2,
      title: 'Top Contributor',
      description: 'Active participation in alumni networking',
      date: 'February 2024',
      icon: Star,
      color: 'text-blue-600'
    },
    {
      id: 3,
      title: 'Community Champion',
      description: 'Significant contributions to alumni community',
      date: 'January 2024',
      icon: Trophy,
      color: 'text-purple-600'
    }
  ]);

  useEffect(() => {
    // TODO: Fetch dashboard stats from Firestore
    // const fetchDashboardStats = async () => {
    //   try {
    //     // Fetch various statistics
    //     const [connections, mentorships, jobs, events, donations] = await Promise.all([
    //       getConnectionsCount(currentUserId),
    //       getActiveMentorshipsCount(currentUserId),
    //       getJobsPostedCount(currentUserId),
    //       getEventsAttendedCount(currentUserId),
    //       getTotalDonationsAmount(currentUserId)
    //     ]);
    //     
    //     setStats({
    //       totalConnections: connections,
    //       activeMentorships: mentorships,
    //       jobsPosted: jobs,
    //       eventsAttended: events,
    //       totalDonations: donations,
    //       networkingPosts: await getNetworkingPostsCount(currentUserId),
    //       successStoriesShared: await getSuccessStoriesCount(currentUserId)
    //     });
    //   } catch (error) {
    //     console.error("Error fetching dashboard stats:", error);
    //   }
    // };
    // fetchDashboardStats();
  }, []);

  const handleQuickAction = (action) => {
    // TODO: Navigate to specific section
    console.log('Navigate to:', action);
  };

  const statCards = [
    {
      title: 'Connections',
      value: stats.totalConnections,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+5 this month'
    },
    {
      title: 'Active Mentorships',
      value: stats.activeMentorships,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+1 this week'
    },
    {
      title: 'Jobs Posted',
      value: stats.jobsPosted,
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: 'Last posted 2 weeks ago'
    },
    {
      title: 'Events Attended',
      value: stats.eventsAttended,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: 'Next: Tech Meetup'
    },
    {
      title: 'Total Donations',
      value: `$${stats.totalDonations}`,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: 'Thank you for your support!'
    },
    {
      title: 'Networking Posts',
      value: stats.networkingPosts,
      icon: MessageCircle,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: '45 total engagements'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Alumni!</h1>
        <p className="text-blue-100 text-lg">
          Continue making a difference in the lives of current students and fellow alumni.
        </p>
        <div className="mt-4 flex items-center space-x-4 text-blue-100">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span className="text-sm">Last login: 2 hours ago</span>
          </div>
          <div className="flex items-center">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm">Profile views: +12% this month</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Target size={20} className="mr-2 text-blue-600" />
            Quick Actions
          </h2>
          <div className="space-y-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${action.color} ${
                    action.urgent ? 'border-2' : ''
                  }`}
                  onClick={() => handleQuickAction(action.action)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={20} />
                    <div className="flex-1">
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm opacity-75">{action.description}</p>
                    </div>
                    {action.urgent && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BarChart3 size={20} className="mr-2 text-green-600" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-white rounded-full">
                    <Icon size={16} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Activity →
          </button>
        </div>
      </div>

      {/* Achievements & Recognition */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Trophy size={20} className="mr-2 text-yellow-600" />
          Recent Achievements & Recognition
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div key={achievement.id} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`inline-flex p-3 rounded-full bg-white mb-3`}>
                  <Icon size={24} className={achievement.color} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                <p className="text-xs text-gray-500">{achievement.date}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Your Alumni Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">45</div>
            <div className="text-green-100">Students Connected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">8</div>
            <div className="text-green-100">Mentorships Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">$750</div>
            <div className="text-green-100">Total Contributions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">15</div>
            <div className="text-green-100">Job Opportunities Shared</div>
          </div>
        </div>
        <p className="text-green-100 mt-4 text-center">
          Thank you for being an active part of our alumni community! Your contributions make a real difference.
        </p>
      </div>
    </div>
  );
};

export default AlumniDashboardOverviewSection;