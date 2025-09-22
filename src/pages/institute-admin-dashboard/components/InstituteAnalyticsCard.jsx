import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const InstituteAnalyticsCard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periodOptions = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last Year' }
  ];

  const analyticsData = {
    userEngagement: {
      totalUsers: 2847,
      activeUsers: 1923,
      newRegistrations: 156,
      userGrowth: '+12.5%'
    },
    placementStats: {
      totalPlacements: 342,
      averageSalary: '$75,000',
      placementRate: '89%',
      topRecruiters: 45
    },
    platformUtilization: {
      jobPostings: 128,
      studyMaterials: 456,
      eventsHosted: 23,
      networkConnections: 3421
    },
    departmentBreakdown: [
      { name: 'Computer Science', students: 456, placements: 89, rate: '92%' },
      { name: 'Engineering', students: 389, placements: 76, rate: '87%' },
      { name: 'Business Admin', students: 234, placements: 67, rate: '85%' },
      { name: 'Mathematics', students: 178, placements: 45, rate: '78%' },
      { name: 'Physics', students: 145, placements: 38, rate: '76%' }
    ]
  };

  const StatCard = ({ icon, title, value, change, color = 'primary' }) => (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center justify-center w-10 h-10 bg-${color}/10 rounded-lg`}>
          <Icon name={icon} size={20} color={`var(--color-${color})`} />
        </div>
        {change && (
          <span className={`text-xs font-medium ${change?.startsWith('+') ? 'text-success' : 'text-error'}`}>
            {change}
          </span>
        )}
      </div>
      <h4 className="text-2xl font-bold text-card-foreground mb-1">{value}</h4>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="BarChart3" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Institute Analytics</h3>
            <p className="text-sm text-muted-foreground">Comprehensive platform insights and metrics</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            className="w-40"
          />
          <Button 
            variant="outline" 
            iconName="Download" 
            iconPosition="left"
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon="Users"
          title="Total Users"
          value={analyticsData?.userEngagement?.totalUsers?.toLocaleString()}
          change={analyticsData?.userEngagement?.userGrowth}
          color="primary"
        />
        <StatCard
          icon="UserCheck"
          title="Active Users"
          value={analyticsData?.userEngagement?.activeUsers?.toLocaleString()}
          change={null}
          color="success"
        />
        <StatCard
          icon="TrendingUp"
          title="Placement Rate"
          value={analyticsData?.placementStats?.placementRate}
          change={null}
          color="secondary"
        />
        <StatCard
          icon="DollarSign"
          title="Avg. Salary"
          value={analyticsData?.placementStats?.averageSalary}
          change={null}
          color="accent"
        />
      </div>
      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* User Engagement */}
        <div className="bg-background border border-border rounded-lg p-4">
          <h4 className="font-semibold text-card-foreground mb-4 flex items-center space-x-2">
            <Icon name="Activity" size={16} />
            <span>User Engagement</span>
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">New Registrations</span>
              <span className="font-medium text-card-foreground">
                {analyticsData?.userEngagement?.newRegistrations}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <span className="font-medium text-card-foreground">
                {analyticsData?.userEngagement?.activeUsers?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Growth Rate</span>
              <span className="font-medium text-success">
                {analyticsData?.userEngagement?.userGrowth}
              </span>
            </div>
          </div>
        </div>

        {/* Platform Utilization */}
        <div className="bg-background border border-border rounded-lg p-4">
          <h4 className="font-semibold text-card-foreground mb-4 flex items-center space-x-2">
            <Icon name="Globe" size={16} />
            <span>Platform Utilization</span>
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Job Postings</span>
              <span className="font-medium text-card-foreground">
                {analyticsData?.platformUtilization?.jobPostings}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Study Materials</span>
              <span className="font-medium text-card-foreground">
                {analyticsData?.platformUtilization?.studyMaterials}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Events Hosted</span>
              <span className="font-medium text-card-foreground">
                {analyticsData?.platformUtilization?.eventsHosted}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Network Connections</span>
              <span className="font-medium text-card-foreground">
                {analyticsData?.platformUtilization?.networkConnections?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Department Breakdown */}
      <div className="bg-background border border-border rounded-lg p-4">
        <h4 className="font-semibold text-card-foreground mb-4 flex items-center space-x-2">
          <Icon name="Building" size={16} />
          <span>Department Performance</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 text-sm font-medium text-muted-foreground">Department</th>
                <th className="text-left p-2 text-sm font-medium text-muted-foreground">Students</th>
                <th className="text-left p-2 text-sm font-medium text-muted-foreground">Placements</th>
                <th className="text-left p-2 text-sm font-medium text-muted-foreground">Rate</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData?.departmentBreakdown?.map((dept, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="p-2 font-medium text-card-foreground">{dept?.name}</td>
                  <td className="p-2 text-muted-foreground">{dept?.students}</td>
                  <td className="p-2 text-muted-foreground">{dept?.placements}</td>
                  <td className="p-2">
                    <span className={`font-medium ${
                      parseInt(dept?.rate) >= 90 ? 'text-success' :
                      parseInt(dept?.rate) >= 80 ? 'text-warning' : 'text-error'
                    }`}>
                      {dept?.rate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Chart Placeholder */}
      <div className="mt-6 bg-background border border-border rounded-lg p-6">
        <h4 className="font-semibold text-card-foreground mb-4 flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} />
          <span>Placement Trends</span>
        </h4>
        <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Interactive placement trends chart</p>
            <p className="text-sm text-muted-foreground mt-1">Showing monthly placement statistics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteAnalyticsCard;