import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'connection',
      title: 'New Connection',
      description: 'Michael Chen accepted your connection request',
      timestamp: '2 hours ago',
      userName: 'Michael Chen',
      userRole: 'Product Manager at Google',
      actionable: true,
      actions: ['View Profile', 'Send Message']
    },
    {
      id: 2,
      type: 'opportunity',
      title: 'Job Application',
      description: 'Sarah Wilson applied to your Senior Developer position',
      timestamp: '4 hours ago',
      userName: 'Sarah Wilson',
      userRole: 'Software Engineer',
      actionable: true,
      actions: ['Review Application']
    },
    {
      id: 3,
      type: 'mentorship',
      title: 'Mentorship Request',
      description: 'Alex Thompson requested mentorship for career development',
      timestamp: '1 day ago',
      userName: 'Alex Thompson',
      userRole: 'Recent Graduate',
      actionable: true,
      actions: ['Accept', 'Decline']
    },
    {
      id: 4,
      type: 'event',
      title: 'Event Update',
      description: 'Tech Alumni Networking Night has been rescheduled to Jan 20',
      timestamp: '2 days ago',
      userName: null,
      userRole: null,
      actionable: false
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Profile Update',
      description: 'Emily Rodriguez updated her profile with new work experience',
      timestamp: '3 days ago',
      userName: 'Emily Rodriguez',
      userRole: 'Data Scientist at Microsoft',
      actionable: false
    },
    {
      id: 6,
      type: 'connection',
      title: 'Connection Suggestion',
      description: 'David Kim might be interested in connecting with you',
      timestamp: '1 week ago',
      userName: 'David Kim',
      userRole: 'Software Engineer at Meta',
      actionable: true,
      actions: ['Send Invitation']
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'connection': return 'UserPlus';
      case 'opportunity': return 'Briefcase';
      case 'mentorship': return 'UserCheck';
      case 'event': return 'Calendar';
      case 'achievement': return 'Award';
      case 'profile': return 'Eye';
      default: return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'connection': return 'text-blue-600 bg-blue-50';
      case 'opportunity': return 'text-green-600 bg-green-50';
      case 'mentorship': return 'text-purple-600 bg-purple-50';
      case 'event': return 'text-orange-600 bg-orange-50';
      case 'achievement': return 'text-yellow-600 bg-yellow-50';
      case 'profile': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filters = [
    { id: 'all', label: 'All Activity', count: activities?.length },
    { id: 'connection', label: 'Connections', count: activities?.filter(a => a?.type === 'connection')?.length },
    { id: 'opportunity', label: 'Opportunities', count: activities?.filter(a => a?.type === 'opportunity')?.length },
    { id: 'mentorship', label: 'Mentorship', count: activities?.filter(a => a?.type === 'mentorship')?.length }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const handleActivityAction = (activityId, action) => {
    console.log(`Action "${action}" for activity ${activityId}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
            <Icon name="Activity" size={18} />
            <span>Recent Activity</span>
          </h3>
          <Button variant="outline" size="sm" iconName="Settings" className="px-2 py-1 text-xs h-6 bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700">
            Settings
          </Button>
        </div>

        <div className="flex flex-wrap gap-1">
          {filters?.map((filterOption) => (
            <button
              key={filterOption?.id}
              onClick={() => setFilter(filterOption?.id)}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                filter === filterOption?.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <span>{filterOption?.label}</span>
              <span className={`text-xs px-1 py-0.5 rounded-full ${
                filter === filterOption?.id ? 'bg-blue-500 text-white' : 'bg-muted-foreground/20'
              }`}>
                {filterOption?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {filteredActivities?.length > 0 ? (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredActivities?.map((activity) => (
              <div key={activity?.id} className="flex items-start space-x-3 p-2 hover:bg-muted/30 rounded-lg transition-colors">
                <div className="flex-shrink-0">
                  {activity?.userName ? (
                    <Avatar
                      name={activity?.userName}
                      size="sm"
                    />
                  ) : (
                    <div className={`p-1.5 rounded-lg ${getActivityColor(activity?.type)}`}>
                      <Icon name={getActivityIcon(activity?.type)} size={14} />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-card-foreground text-xs">{activity?.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{activity?.description}</p>
                      {activity?.userName && activity?.userRole && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{activity?.userRole}</p>
                      )}
                      <p className="text-xs text-blue-600 mt-0.5">{activity?.timestamp}</p>
                    </div>
                  </div>
                  
                  {activity?.actionable && activity?.actions && (
                    <div className="flex items-center space-x-1 mt-2">
                      {activity?.actions?.map((action, index) => (
                        <Button
                          key={index}
                          variant={index === 0 ? "default" : "outline"}
                          size="xs"
                          onClick={() => handleActivityAction(activity?.id, action)}
                          className={`px-2 py-1 text-xs h-6 ${
                            index === 0 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                          }`}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Icon name="Activity" size={32} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" size="sm" fullWidth className="text-xs h-8 text-blue-600 hover:bg-blue-50">
          View All Activity
        </Button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;