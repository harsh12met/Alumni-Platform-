import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { StatsModule, ChartModule } from '../../../components/ui/ModuleContainer';

const DashboardOverview = () => {
  const stats = [
    {
      icon: 'Users',
      value: '156',
      label: 'Total Students',
      change: { type: 'increase', value: '+12%' }
    },
    {
      icon: 'BookOpen',
      value: '24',
      label: 'Study Materials',
      change: { type: 'increase', value: '+3' }
    },
    {
      icon: 'Calendar',
      value: '8',
      label: 'Upcoming Events',
      change: { type: 'increase', value: '+2' }
    },
    {
      icon: 'TrendingUp',
      value: '87%',
      label: 'Avg Performance',
      change: { type: 'increase', value: '+5%' }
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'material',
      title: 'New study material uploaded',
      description: 'Data Structures - Binary Trees lecture notes',
      time: '2 hours ago',
      icon: 'FileText'
    },
    {
      id: 2,
      type: 'event',
      title: 'Workshop scheduled',
      description: 'Advanced Machine Learning Workshop on Jan 25',
      time: '4 hours ago',
      icon: 'Calendar'
    },
    {
      id: 3,
      type: 'student',
      title: 'Student performance alert',
      description: 'David Wilson needs attention in CS101',
      time: '6 hours ago',
      icon: 'AlertTriangle'
    },
    {
      id: 4,
      type: 'alumni',
      title: 'Alumni connection',
      description: 'Sarah Johnson accepted guest lecture invitation',
      time: '1 day ago',
      icon: 'UserCheck'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Advanced ML Workshop',
      date: '2025-01-25',
      time: '10:00 AM',
      attendees: 28,
      type: 'workshop'
    },
    {
      id: 2,
      title: 'Industry Trends Lecture',
      date: '2025-01-22',
      time: '2:00 PM',
      attendees: 85,
      type: 'guest-lecture'
    },
    {
      id: 3,
      title: 'React Development Lab',
      date: '2025-01-21',
      time: '9:00 AM',
      attendees: 25,
      type: 'lab-session'
    }
  ];

  const getActivityIcon = (type) => {
    const iconMap = {
      'material': 'FileText',
      'event': 'Calendar',
      'student': 'AlertTriangle',
      'alumni': 'UserCheck'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'material': 'text-blue-600',
      'event': 'text-green-600',
      'student': 'text-red-600',
      'alumni': 'text-purple-600'
    };
    return colorMap?.[type] || 'text-gray-600';
  };

  const getEventTypeIcon = (type) => {
    const iconMap = {
      'workshop': 'Wrench',
      'guest-lecture': 'Mic',
      'lab-session': 'Monitor'
    };
    return iconMap?.[type] || 'Calendar';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground mb-2">
              Welcome back, Dr. Emily Rodriguez
            </h2>
            <p className="text-muted-foreground">
              Here's what's happening with your courses and students today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="text-center">
                <div className="text-lg font-semibold text-card-foreground">
                  {new Date()?.toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
                <div>{new Date()?.toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Overview */}
      <StatsModule stats={stats} />
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Recent Activities</h3>
                <p className="text-sm text-muted-foreground">Latest updates from your dashboard</p>
              </div>
              <Button variant="outline" size="sm" iconName="Eye" iconPosition="left" className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 font-medium">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {recentActivities?.map((activity) => (
                <div key={activity?.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                    <Icon name={getActivityIcon(activity?.type)} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">{activity?.title}</p>
                    <p className="text-sm text-muted-foreground">{activity?.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity?.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Upcoming Events</h3>
                <p className="text-sm text-muted-foreground">Your scheduled activities</p>
              </div>
              <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left" className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 font-medium">
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingEvents?.map((event) => (
                <div key={event?.id} className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                      <Icon name={getEventTypeIcon(event?.type)} size={16} color="var(--color-primary)" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-card-foreground">{event?.title}</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={12} />
                          <span>{new Date(event.date)?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{event?.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                        <Icon name="Users" size={12} />
                        <span>{event?.attendees} attendees</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" fullWidth className="mt-4 bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700 font-medium">
              View All Events
            </Button>
          </div>
        </div>
      </div>
      {/* Performance Chart */}
      <ChartModule
        title="Student Performance Trends"
        description="Academic performance overview across all courses"
        icon="TrendingUp"
        actions={
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Download" iconPosition="left" className="bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700 font-medium">
              Export
            </Button>
            <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left" className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 font-medium">
              Configure
            </Button>
          </div>
        }
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Performance analytics chart will be displayed here</p>
            <p className="text-sm text-muted-foreground mt-2">
              Track student progress, assignment completion rates, and overall academic performance
            </p>
          </div>
        </div>
      </ChartModule>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" iconName="Upload" iconPosition="left" fullWidth className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 font-medium">
            Upload Material
          </Button>
          <Button variant="outline" iconName="Calendar" iconPosition="left" fullWidth className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 font-medium">
            Schedule Event
          </Button>
          <Button variant="outline" iconName="Users" iconPosition="left" fullWidth className="bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700 font-medium">
            View Students
          </Button>
          <Button variant="outline" iconName="UserPlus" iconPosition="left" fullWidth className="bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700 font-medium">
            Invite Alumni
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;