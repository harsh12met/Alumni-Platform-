import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCard = () => {
  const stats = [
    {
      id: 1,
      title: "Active Job Postings",
      value: "8",
      change: { type: "increase", value: "+2 this week" },
      icon: "Briefcase",
      color: "text-blue-600 bg-blue-50"
    },
    {
      id: 2,
      title: "Total Applications",
      value: "156",
      change: { type: "increase", value: "+23 today" },
      icon: "FileText",
      color: "text-green-600 bg-green-50"
    },
    {
      id: 3,
      title: "Interviews This Week",
      value: "12",
      change: { type: "neutral", value: "3 scheduled" },
      icon: "Video",
      color: "text-purple-600 bg-purple-50"
    },
    {
      id: 4,
      title: "Shortlisted Candidates",
      value: "34",
      change: { type: "increase", value: "+5 this week" },
      icon: "Star",
      color: "text-orange-600 bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat?.color}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
            <div className={`text-xs flex items-center space-x-1 ${
              stat?.change?.type === 'increase' ? 'text-success' : 
              stat?.change?.type === 'decrease' ? 'text-error' : 'text-muted-foreground'
            }`}>
              {stat?.change?.type === 'increase' && <Icon name="TrendingUp" size={12} />}
              {stat?.change?.type === 'decrease' && <Icon name="TrendingDown" size={12} />}
              {stat?.change?.type === 'neutral' && <Icon name="Clock" size={12} />}
              <span>{stat?.change?.value}</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-card-foreground mb-2">
            {stat?.value}
          </div>
          <div className="text-sm text-muted-foreground">
            {stat?.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsCard;