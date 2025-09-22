import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const stats = [
    {
      id: 'gpa',
      label: 'Current GPA',
      value: '8.7',
      subValue: '/ 10.0',
      icon: 'TrendingUp',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+0.2 from last semester'
    },
    {
      id: 'courses',
      label: 'Active Courses',
      value: '6',
      subValue: 'Enrolled',
      icon: 'BookOpen',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '2 assignments pending'
    },
    {
      id: 'applications',
      label: 'Job Applications',
      value: '12',
      subValue: 'Submitted',
      icon: 'Briefcase',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '3 responses received'
    },
    {
      id: 'events',
      label: 'Events Attended',
      value: '8',
      subValue: 'This month',
      icon: 'Calendar',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '2 upcoming this week'
    },
    {
      id: 'connections',
      label: 'Network Connections',
      value: '45',
      subValue: 'Alumni & Faculty',
      icon: 'Users',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: '5 new this month'
    },
    {
      id: 'achievements',
      label: 'Achievements',
      value: '3',
      subValue: 'Certificates',
      icon: 'Award',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      change: '1 pending verification'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-card-foreground">{stat.value}</span>
              {stat.subValue && (
                <span className="text-sm text-muted-foreground">{stat.subValue}</span>
              )}
            </div>
            <p className="text-sm font-medium text-card-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;