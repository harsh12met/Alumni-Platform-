import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCard = () => {
  const stats = [
    {
      id: 1,
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase",
      icon: "Users",
      color: "primary",
      description: "Active platform users"
    },
    {
      id: 2,
      title: "Pending Approvals",
      value: "23",
      change: "+5",
      changeType: "increase",
      icon: "Clock",
      color: "warning",
      description: "Registration requests"
    },
    {
      id: 3,
      title: "Active Events",
      value: "8",
      change: "+2",
      changeType: "increase",
      icon: "Calendar",
      color: "success",
      description: "Ongoing campus events"
    },
    {
      id: 4,
      title: "Job Postings",
      value: "156",
      change: "+18",
      changeType: "increase",
      icon: "Briefcase",
      color: "secondary",
      description: "Active opportunities"
    },
    {
      id: 5,
      title: "Placement Rate",
      value: "89%",
      change: "+3.2%",
      changeType: "increase",
      icon: "TrendingUp",
      color: "success",
      description: "This academic year"
    },
    {
      id: 6,
      title: "System Health",
      value: "99.8%",
      change: "Stable",
      changeType: "stable",
      icon: "Activity",
      color: "success",
      description: "Platform uptime"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary': return 'text-primary bg-primary/10';
      case 'secondary': return 'text-secondary bg-secondary/10';
      case 'success': return 'text-success bg-success/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'error': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'increase': return 'text-success';
      case 'decrease': return 'text-error';
      case 'stable': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'increase': return 'TrendingUp';
      case 'decrease': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="BarChart3" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Quick Stats</h3>
          <p className="text-sm text-muted-foreground">Key metrics at a glance</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats?.map((stat) => (
          <div key={stat?.id} className="text-center">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg mx-auto mb-3 ${getColorClasses(stat?.color)}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="text-2xl font-bold text-card-foreground">{stat?.value}</h4>
              <p className="text-sm font-medium text-card-foreground">{stat?.title}</p>
              <p className="text-xs text-muted-foreground">{stat?.description}</p>
              <div className={`flex items-center justify-center space-x-1 text-xs font-medium ${getChangeColor(stat?.changeType)}`}>
                <Icon name={getChangeIcon(stat?.changeType)} size={12} />
                <span>{stat?.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsCard;