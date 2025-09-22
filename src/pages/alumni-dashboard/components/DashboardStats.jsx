import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: "Network Connections",
      value: "247",
      change: "+12",
      changeType: "increase",
      icon: "Users",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Opportunities Shared",
      value: "18",
      change: "+3",
      changeType: "increase",
      icon: "Briefcase",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      title: "Students Mentored",
      value: "5",
      change: "+2",
      changeType: "increase",
      icon: "UserCheck",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      title: "Events Attended",
      value: "12",
      change: "+1",
      changeType: "increase",
      icon: "Calendar",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={18} className={stat?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-xs ${
              stat?.changeType === 'increase' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="text-xl font-bold text-card-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat?.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;