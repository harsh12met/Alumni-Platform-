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
import {
  Users,
  Calendar,
  Briefcase,
  Heart,
  TrendingUp,
  TrendingDown,
  Activity,
  Target
} from 'lucide-react';

const Analytics = ({ instituteId }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6months'); // '1month', '3months', '6months', '1year'

  // Mock data - Replace with Firebase Firestore calls
  useEffect(() => {
    // TODO: Replace with actual Firebase analytics queries
    // const fetchAnalytics = async () => {
    //   const analyticsRef = collection(db, 'analytics');
    //   const q = query(analyticsRef, where('instituteId', '==', instituteId));
    //   const snapshot = await getDocs(q);
    //   const analyticsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   setAnalyticsData(processAnalyticsData(analyticsData));
    // };

    const mockData = {
      overview: {
        totalAlumni: 1247,
        activeUsers: 892,
        totalJobs: 156,
        jobsFilled: 98,
        totalEvents: 24,
        eventAttendance: 78,
        totalDonations: 485000,
        donationGrowth: 15.3,
        averageEngagement: 72.5
      },
      userGrowth: [
        { month: 'Jan', alumni: 980, students: 1240, recruiters: 45 },
        { month: 'Feb', alumni: 1020, students: 1280, recruiters: 52 },
        { month: 'Mar', alumni: 1080, students: 1320, recruiters: 58 },
        { month: 'Apr', alumni: 1140, students: 1380, recruiters: 65 },
        { month: 'May', alumni: 1200, students: 1420, recruiters: 71 },
        { month: 'Jun', alumni: 1247, students: 1456, recruiters: 78 }
      ],
      jobMetrics: [
        { month: 'Jan', posted: 20, filled: 12, applications: 245 },
        { month: 'Feb', posted: 25, filled: 18, applications: 320 },
        { month: 'Mar', posted: 30, filled: 22, applications: 410 },
        { month: 'Apr', posted: 28, filled: 19, applications: 380 },
        { month: 'May', posted: 32, filled: 24, applications: 450 },
        { month: 'Jun', posted: 35, filled: 28, applications: 520 }
      ],
      donationTrends: [
        { month: 'Jan', amount: 45000, donors: 89, campaigns: 3 },
        { month: 'Feb', amount: 52000, donors: 102, campaigns: 4 },
        { month: 'Mar', amount: 48000, donors: 95, campaigns: 3 },
        { month: 'Apr', amount: 65000, donors: 125, campaigns: 5 },
        { month: 'May', amount: 78000, donors: 142, campaigns: 4 },
        { month: 'Jun', amount: 85000, donors: 158, campaigns: 6 }
      ],
      eventEngagement: [
        { type: 'Networking', attendance: 85, satisfaction: 4.2 },
        { type: 'Workshop', attendance: 72, satisfaction: 4.5 },
        { type: 'Seminar', attendance: 68, satisfaction: 4.0 },
        { type: 'Gala', attendance: 92, satisfaction: 4.7 }
      ],
      departmentBreakdown: [
        { name: 'Engineering', value: 35, alumni: 437 },
        { name: 'Business', value: 25, alumni: 312 },
        { name: 'Medicine', value: 20, alumni: 249 },
        { name: 'Arts & Sciences', value: 15, alumni: 187 },
        { name: 'Law', value: 5, alumni: 62 }
      ],
      engagementMetrics: {
        profileCompletionRate: 78,
        monthlyActiveUsers: 672,
        averageSessionDuration: 12.5,
        returnUserRate: 68
      }
    };

    setTimeout(() => {
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);
  }, [instituteId, timeRange]);

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Institute Analytics</h2>
          <p className="text-gray-600">
            Comprehensive insights and metrics for your institute
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Institute: </span>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">{instituteId}</span>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Alumni</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.totalAlumni.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.5% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jobs Placement Rate</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round((analyticsData.overview.jobsFilled / analyticsData.overview.totalJobs) * 100)}%
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8.3% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Event Attendance</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.eventAttendance}%</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">-2.1% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Donations</p>
              <p className="text-3xl font-bold text-gray-900">${(analyticsData.overview.totalDonations / 1000).toFixed(0)}K</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{analyticsData.overview.donationGrowth}% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={analyticsData.userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="alumni" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Alumni" />
            <Area type="monotone" dataKey="students" stackId="1" stroke="#10B981" fill="#10B981" name="Students" />
            <Area type="monotone" dataKey="recruiters" stackId="1" stroke="#F59E0B" fill="#F59E0B" name="Recruiters" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Jobs and Donations Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Placement Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.jobMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="posted" fill="#3B82F6" name="Jobs Posted" />
              <Bar dataKey="filled" fill="#10B981" name="Jobs Filled" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.donationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [name === 'amount' ? `$${value.toLocaleString()}` : value, name]} />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#EF4444" strokeWidth={2} name="Amount ($)" />
              <Line type="monotone" dataKey="donors" stroke="#8B5CF6" strokeWidth={2} name="Donors" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Breakdown and Event Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alumni by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.departmentBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {analyticsData.departmentBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.eventEngagement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="attendance" fill="#3B82F6" name="Attendance %" />
              <Bar yAxisId="right" dataKey="satisfaction" fill="#10B981" name="Satisfaction" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">User Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analyticsData.engagementMetrics.profileCompletionRate}%</p>
            <p className="text-sm text-gray-600">Profile Completion</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analyticsData.engagementMetrics.monthlyActiveUsers}</p>
            <p className="text-sm text-gray-600">Monthly Active Users</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analyticsData.engagementMetrics.averageSessionDuration} min</p>
            <p className="text-sm text-gray-600">Avg. Session Duration</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analyticsData.engagementMetrics.returnUserRate}%</p>
            <p className="text-sm text-gray-600">Return User Rate</p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Strong Alumni Engagement</p>
                <p className="text-sm text-gray-600">
                  Your alumni show high engagement rates with 78% profile completion and consistent growth in active users.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Successful Job Placement</p>
                <p className="text-sm text-gray-600">
                  63% job placement rate is above average. Consider highlighting successful placements to attract more recruiters.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Event Attendance Opportunity</p>
                <p className="text-sm text-gray-600">
                  Event attendance is declining. Consider more engaging formats or better timing for your target audience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Growing Donation Impact</p>
                <p className="text-sm text-gray-600">
                  Donations are trending upward with 15.3% growth. Focus on storytelling to maintain momentum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;