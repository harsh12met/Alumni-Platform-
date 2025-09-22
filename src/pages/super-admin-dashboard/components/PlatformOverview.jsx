import React from 'react';
import Icon from '../../../components/AppIcon';
import { StatsModule } from '../../../components/ui/ModuleContainer';

const PlatformOverview = () => {
  const platformStats = [
    {
      icon: 'Building2',
      value: '247',
      label: 'Active Institutes',
      change: { type: 'increase', value: '+12 this month' }
    },
    {
      icon: 'Users',
      value: '89.2K',
      label: 'Total Users',
      change: { type: 'increase', value: '+8.5% growth' }
    },
    {
      icon: 'Briefcase',
      value: '3,456',
      label: 'Job Postings',
      change: { type: 'increase', value: '+156 this week' }
    },
    {
      icon: 'TrendingUp',
      value: '94.7%',
      label: 'System Uptime',
      change: { type: 'increase', value: '99.9% target' }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Platform Overview</h2>
          <p className="text-muted-foreground">Real-time platform metrics and performance indicators</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm text-success">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>System Healthy</span>
          </div>
        </div>
      </div>

      <StatsModule stats={platformStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center space-x-3">
                <Icon name="Plus" size={16} />
                <span className="text-sm font-medium">Add New Institute</span>
              </div>
              <Icon name="ChevronRight" size={16} />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center space-x-3">
                <Icon name="UserPlus" size={16} />
                <span className="text-sm font-medium">Bulk User Import</span>
              </div>
              <Icon name="ChevronRight" size={16} />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center space-x-3">
                <Icon name="Settings" size={16} />
                <span className="text-sm font-medium">System Configuration</span>
              </div>
              <Icon name="ChevronRight" size={16} />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center space-x-3">
                <Icon name="Download" size={16} />
                <span className="text-sm font-medium">Generate Reports</span>
              </div>
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm">Database Performance</span>
              </div>
              <span className="text-sm font-medium text-success">Excellent</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm">API Response Time</span>
              </div>
              <span className="text-sm font-medium text-success">142ms avg</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-sm">Server Load</span>
              </div>
              <span className="text-sm font-medium text-warning">Moderate</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm">Security Status</span>
              </div>
              <span className="text-sm font-medium text-success">Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformOverview;