import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Calendar, TrendingUp, Users, Briefcase, Heart, Star } from 'lucide-react';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data - Replace with actual analytics from Firebase
  useEffect(() => {
    const mockAnalytics = {
      overview: {
        totalAlumni: 1250,
        activeUsers: 890,
        jobsPosted: 156,
        jobsFilled: 89,
        totalDonations: 125000,
        eventsThisMonth: 12
      },
      alumniGrowth: [
        { month: 'Jan', count: 1100 },
        { month: 'Feb', count: 1150 },
        { month: 'Mar', count: 1180 },
        { month: 'Apr', count: 1200 },
        { month: 'May', count: 1220 },
        { month: 'Jun', count: 1250 }
      ],
      jobsData: [
        { month: 'Jan', posted: 25, filled: 18 },
        { month: 'Feb', posted: 30, filled: 22 },
        { month: 'Mar', posted: 28, filled: 19 },
        { month: 'Apr', posted: 35, filled: 25 },
        { month: 'May', posted: 32, filled: 20 },
        { month: 'Jun', posted: 40, filled: 28 }
      ],
      donationsData: [
        { month: 'Jan', amount: 15000 },
        { month: 'Feb', amount: 18000 },
        { month: 'Mar', amount: 22000 },
        { month: 'Apr', amount: 19000 },
        { month: 'May', amount: 25000 },
        { month: 'Jun', amount: 28000 }
      ],
      eventParticipation: [
        { name: 'Networking', value: 35, count: 420 },
        { name: 'Career Dev', value: 25, count: 300 },
        { name: 'Social', value: 20, count: 240 },
        { name: 'Educational', value: 15, count: 180 },
        { name: 'Fundraising', value: 5, count: 60 }
      ],
      userEngagement: [
        { day: 'Mon', logins: 180, posts: 45, interactions: 320 },
        { day: 'Tue', logins: 220, posts: 52, interactions: 380 },
        { day: 'Wed', logins: 195, posts: 38, interactions: 295 },
        { day: 'Thu', logins: 250, posts: 62, interactions: 420 },
        { day: 'Fri', logins: 280, posts: 71, interactions: 450 },
        { day: 'Sat', logins: 160, posts: 35, interactions: 280 },
        { day: 'Sun', logins: 140, posts: 28, interactions: 240 }
      ]
    };
    
    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, []);

  const COLORS = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Platform insights and performance metrics</p>
        </div>
        
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Alumni</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.overview?.totalAlumni?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.overview?.activeUsers?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Jobs Posted</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.overview?.jobsPosted}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Jobs Filled</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.overview?.jobsFilled}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Donations</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(analytics.overview?.totalDonations)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Events</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.overview?.eventsThisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alumni Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alumni Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics.alumniGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#EF4444" 
                fill="#FEE2E2" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Job Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Market Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.jobsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="posted" fill="#3B82F6" name="Jobs Posted" />
              <Bar dataKey="filled" fill="#22C55E" name="Jobs Filled" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donations Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.donationsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Event Participation */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Participation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.eventParticipation}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.eventParticipation?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Engagement Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly User Engagement</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={analytics.userEngagement}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="logins" fill="#3B82F6" name="Logins" />
            <Bar dataKey="posts" fill="#22C55E" name="Posts" />
            <Bar dataKey="interactions" fill="#EF4444" name="Interactions" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Metrics Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {((analytics.overview?.activeUsers / analytics.overview?.totalAlumni) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-1">User Engagement Rate</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {((analytics.overview?.jobsFilled / analytics.overview?.jobsPosted) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Job Fill Rate</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {formatCurrency(analytics.overview?.totalDonations / analytics.overview?.totalAlumni)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Avg Donation per Alumni</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {(analytics.overview?.eventsThisMonth / 4).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Events per Week</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;