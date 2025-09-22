import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsDashboardCard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('applications');

  const periodOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: '1year', label: 'Last year' }
  ];

  const metricOptions = [
    { value: 'applications', label: 'Applications' },
    { value: 'views', label: 'Job Views' },
    { value: 'interviews', label: 'Interviews' },
    { value: 'hires', label: 'Hires' }
  ];

  const stats = [
    {
      id: 1,
      title: "Total Applications",
      value: "156",
      change: { type: "increase", value: "+23%" },
      icon: "FileText",
      color: "text-blue-600"
    },
    {
      id: 2,
      title: "Job Views",
      value: "2,847",
      change: { type: "increase", value: "+12%" },
      icon: "Eye",
      color: "text-green-600"
    },
    {
      id: 3,
      title: "Interviews Scheduled",
      value: "34",
      change: { type: "increase", value: "+8%" },
      icon: "Video",
      color: "text-purple-600"
    },
    {
      id: 4,
      title: "Successful Hires",
      value: "12",
      change: { type: "increase", value: "+15%" },
      icon: "UserCheck",
      color: "text-emerald-600"
    }
  ];

  const topPerformingJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      applications: 45,
      views: 892,
      conversionRate: "5.0%",
      status: "Active"
    },
    {
      id: 2,
      title: "Product Manager",
      applications: 32,
      views: 654,
      conversionRate: "4.9%",
      status: "Active"
    },
    {
      id: 3,
      title: "Data Science Intern",
      applications: 78,
      views: 1234,
      conversionRate: "6.3%",
      status: "Closed"
    },
    {
      id: 4,
      title: "UX Designer",
      applications: 28,
      views: 567,
      conversionRate: "4.9%",
      status: "Active"
    }
  ];

  const hiringFunnelData = [
    { stage: "Applications", count: 156, percentage: 100 },
    { stage: "Screening", count: 89, percentage: 57 },
    { stage: "Interview", count: 34, percentage: 22 },
    { stage: "Final Round", count: 18, percentage: 12 },
    { stage: "Offer", count: 12, percentage: 8 },
    { stage: "Hired", count: 9, percentage: 6 }
  ];

  const applicationSources = [
    { source: "Company Website", count: 45, percentage: 29 },
    { source: "LinkedIn", count: 38, percentage: 24 },
    { source: "Indeed", count: 32, percentage: 21 },
    { source: "University Portal", count: 25, percentage: 16 },
    { source: "Referrals", count: 16, percentage: 10 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10';
      case 'Closed': return 'text-error bg-error/10';
      case 'Draft': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="BarChart3" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Analytics Dashboard</h3>
            <p className="text-sm text-muted-foreground">Track recruitment performance and metrics</p>
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
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats?.map((stat) => (
          <div key={stat?.id} className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center justify-center w-10 h-10 bg-background rounded-lg ${stat?.color}`}>
                <Icon name={stat?.icon} size={20} />
              </div>
              <div className={`text-xs flex items-center space-x-1 ${
                stat?.change?.type === 'increase' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={stat?.change?.type === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                />
                <span>{stat?.change?.value}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat?.title}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Hiring Funnel */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <h4 className="font-medium text-card-foreground mb-4">Hiring Funnel</h4>
          <div className="space-y-3">
            {hiringFunnelData?.map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-card-foreground w-20">
                    {stage?.stage}
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-2 w-32">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stage?.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-medium text-card-foreground">{stage?.count}</span>
                  <span className="text-muted-foreground">({stage?.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Sources */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <h4 className="font-medium text-card-foreground mb-4">Application Sources</h4>
          <div className="space-y-3">
            {applicationSources?.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-card-foreground">
                    {source?.source}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-medium text-card-foreground">{source?.count}</span>
                  <span className="text-muted-foreground">({source?.percentage}%)</span>
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div 
                      className="bg-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${source?.percentage * 4}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Top Performing Jobs */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-card-foreground">Top Performing Jobs</h4>
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="left" iconSize={14}>
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-sm font-medium text-muted-foreground">Job Title</th>
                <th className="text-left py-2 text-sm font-medium text-muted-foreground">Applications</th>
                <th className="text-left py-2 text-sm font-medium text-muted-foreground">Views</th>
                <th className="text-left py-2 text-sm font-medium text-muted-foreground">Conversion</th>
                <th className="text-left py-2 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {topPerformingJobs?.map((job) => (
                <tr key={job?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 text-sm font-medium text-card-foreground">{job?.title}</td>
                  <td className="py-3 text-sm text-muted-foreground">{job?.applications}</td>
                  <td className="py-3 text-sm text-muted-foreground">{job?.views}</td>
                  <td className="py-3 text-sm text-muted-foreground">{job?.conversionRate}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job?.status)}`}>
                      {job?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Chart Placeholder */}
      <div className="mt-6 p-6 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-card-foreground">Application Trends</h4>
          <Select
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
            className="w-40"
          />
        </div>
        <div className="h-64 flex items-center justify-center bg-background rounded-lg border border-border">
          <div className="text-center">
            <Icon name="TrendingUp" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Interactive chart visualization will appear here</p>
            <p className="text-sm text-muted-foreground mt-2">Showing {selectedMetric} trends for {selectedPeriod}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboardCard;