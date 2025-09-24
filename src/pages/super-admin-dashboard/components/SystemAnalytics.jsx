import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const SystemAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const userGrowthData = [
    { name: 'Dec 15', students: 42000, alumni: 28000, faculty: 8200, recruiters: 2400 },
    { name: 'Dec 16', students: 42150, alumni: 28100, faculty: 8220, recruiters: 2420 },
    { name: 'Dec 17', students: 42300, alumni: 28200, faculty: 8240, recruiters: 2440 },
    { name: 'Dec 18', students: 42450, alumni: 28300, faculty: 8260, recruiters: 2460 },
    { name: 'Dec 19', students: 42600, alumni: 28400, faculty: 8280, recruiters: 2480 },
    { name: 'Dec 20', students: 42750, alumni: 28450, faculty: 8300, recruiters: 2500 },
    { name: 'Dec 21', students: 42900, alumni: 28500, faculty: 8320, recruiters: 2520 }
  ];

  const jobPostingData = [
    { name: 'Dec 15', posted: 45, filled: 12, expired: 8 },
    { name: 'Dec 16', posted: 52, filled: 15, expired: 6 },
    { name: 'Dec 17', posted: 38, filled: 18, expired: 10 },
    { name: 'Dec 18', posted: 61, filled: 22, expired: 7 },
    { name: 'Dec 19', posted: 49, filled: 19, expired: 9 },
    { name: 'Dec 20', posted: 55, filled: 25, expired: 5 },
    { name: 'Dec 21', posted: 67, filled: 28, expired: 8 }
  ];

  const engagementData = [
    { name: 'Students', value: 78, color: '#3B82F6' },
    { name: 'Alumni', value: 65, color: '#10B981' },
    { name: 'Faculty', value: 82, color: '#8B5CF6' },
    { name: 'Recruiters', value: 71, color: '#F59E0B' }
  ];

  const revenueData = [
    { name: 'Jan', revenue: 125000, subscriptions: 89 },
    { name: 'Feb', revenue: 132000, subscriptions: 94 },
    { name: 'Mar', revenue: 145000, subscriptions: 102 },
    { name: 'Apr', revenue: 138000, subscriptions: 98 },
    { name: 'May', revenue: 156000, subscriptions: 108 },
    { name: 'Jun', revenue: 162000, subscriptions: 115 },
    { name: 'Jul', revenue: 178000, subscriptions: 124 },
    { name: 'Aug', revenue: 185000, subscriptions: 129 },
    { name: 'Sep', revenue: 192000, subscriptions: 135 },
    { name: 'Oct', revenue: 205000, subscriptions: 142 },
    { name: 'Nov', revenue: 218000, subscriptions: 148 },
    { name: 'Dec', revenue: 234000, subscriptions: 156 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">System Analytics</h2>
          <p className="text-muted-foreground">Platform performance metrics and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-48"
          />
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Report
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-card-foreground">₹19.5 Cr</p>
              <p className="text-xs text-success flex items-center mt-1">
                <Icon name="TrendingUp" size={12} className="mr-1" />
                +12.5% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
              <p className="text-2xl font-bold text-card-foreground">12,847</p>
              <p className="text-xs text-success flex items-center mt-1">
                <Icon name="TrendingUp" size={12} className="mr-1" />
                +8.2% from yesterday
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Job Placements</p>
              <p className="text-2xl font-bold text-card-foreground">1,456</p>
              <p className="text-xs text-success flex items-center mt-1">
                <Icon name="TrendingUp" size={12} className="mr-1" />
                +15.3% this month
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Briefcase" size={24} className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
              <p className="text-2xl font-bold text-card-foreground">99.97%</p>
              <p className="text-xs text-success flex items-center mt-1">
                <Icon name="CheckCircle" size={12} className="mr-1" />
                Above target
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="Server" size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">User Growth Trends</h3>
            <Button variant="ghost" size="icon">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="alumni" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="faculty" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="recruiters" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Job Posting Analytics */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Job Posting Analytics</h3>
            <Button variant="ghost" size="icon">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobPostingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="posted" fill="#3B82F6" />
                <Bar dataKey="filled" fill="#10B981" />
                <Bar dataKey="expired" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Engagement */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">User Engagement by Role</h3>
            <Button variant="ghost" size="icon">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trends */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Revenue & Subscriptions</h3>
            <Button variant="ghost" size="icon">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="revenue" fill="#10B981" />
                <Line yAxisId="right" type="monotone" dataKey="subscriptions" stroke="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Platform Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">New institute registered: UC Berkeley</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">System backup completed successfully</p>
              <p className="text-xs text-muted-foreground">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">High server load detected and resolved</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">Monthly analytics report generated</p>
              <p className="text-xs text-muted-foreground">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;