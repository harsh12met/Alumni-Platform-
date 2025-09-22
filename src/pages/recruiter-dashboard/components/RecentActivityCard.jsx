import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentActivityCard = () => {
  const activities = [
    {
      id: 1,
      type: "application",
      title: "New Application Received",
      description: "Alex Chen applied for Senior Software Engineer position",
      timestamp: "2025-01-21 14:30",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      actionable: true,
      priority: "high"
    },
    {
      id: 2,
      type: "interview",
      title: "Interview Completed",
      description: "Technical interview with Maria Garcia completed successfully",
      timestamp: "2025-01-21 11:00",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      actionable: true,
      priority: "medium"
    },
    {
      id: 3,
      type: "job_posted",
      title: "Job Posted Successfully",
      description: "UX Designer position is now live and accepting applications",
      timestamp: "2025-01-21 09:15",
      avatar: null,
      actionable: false,
      priority: "low"
    },
    {
      id: 4,
      type: "shortlist",
      title: "Candidate Shortlisted",
      description: "David Kim has been shortlisted for Data Science Intern role",
      timestamp: "2025-01-20 16:45",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      actionable: true,
      priority: "medium"
    },
    {
      id: 5,
      type: "offer",
      title: "Offer Extended",
      description: "Job offer sent to Sarah Johnson for Product Manager position",
      timestamp: "2025-01-20 14:20",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      actionable: true,
      priority: "high"
    },
    {
      id: 6,
      type: "message",
      title: "New Message",
      description: "John Doe sent a message regarding interview availability",
      timestamp: "2025-01-20 10:30",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
      actionable: true,
      priority: "medium"
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'application': return 'FileText';
      case 'interview': return 'Video';
      case 'job_posted': return 'Briefcase';
      case 'shortlist': return 'Star';
      case 'offer': return 'CheckCircle';
      case 'message': return 'MessageSquare';
      default: return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'application': return 'text-blue-600 bg-blue-50';
      case 'interview': return 'text-purple-600 bg-purple-50';
      case 'job_posted': return 'text-green-600 bg-green-50';
      case 'shortlist': return 'text-orange-600 bg-orange-50';
      case 'offer': return 'text-emerald-600 bg-emerald-50';
      case 'message': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const handleActivityAction = (activityId, type) => {
    console.log(`Action for activity ${activityId}: ${type}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-lg">
            <Icon name="Activity" size={14} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">Recent Activity</h3>
            <p className="text-xs text-muted-foreground">Latest updates</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="left"
          iconSize={10}
          className="text-xs px-2 py-1"
        >
          View All
        </Button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {activities?.map((activity) => (
          <div 
            key={activity?.id} 
            className={`p-2 bg-muted/30 rounded-lg border-l-2 border border-border hover:bg-muted/50 transition-colors ${getPriorityColor(activity?.priority)}`}
          >
            <div className="flex items-start space-x-2">
              <div className={`flex items-center justify-center w-6 h-6 rounded-lg ${getActivityColor(activity?.type)} flex-shrink-0`}>
                <Icon name={getActivityIcon(activity?.type)} size={10} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-medium text-card-foreground truncate">{activity?.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{activity?.description}</p>
                  </div>
                  {activity?.avatar && (
                    <Image
                      src={activity?.avatar}
                      alt="User Avatar"
                      className="w-5 h-5 rounded-full object-cover flex-shrink-0 ml-1"
                    />
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                  
                  {activity?.actionable && (
                    <div className="flex items-center space-x-1">
                      {activity?.type === 'application' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleActivityAction(activity?.id, 'review')}
                            className="text-xs px-1 py-0.5 h-auto"
                          >
                            Review
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleActivityAction(activity?.id, 'shortlist')}
                            className="text-xs px-1 py-0.5 h-auto"
                          >
                            Shortlist
                          </Button>
                        </>
                      )}
                      {activity?.type === 'interview' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleActivityAction(activity?.id, 'feedback')}
                          className="text-xs px-1 py-0.5 h-auto"
                        >
                          Feedback
                        </Button>
                      )}
                      {activity?.type === 'shortlist' && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleActivityAction(activity?.id, 'interview')}
                          className="text-xs px-1 py-0.5 h-auto"
                        >
                          Interview
                        </Button>
                      )}
                      {activity?.type === 'offer' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleActivityAction(activity?.id, 'track')}
                          className="text-xs px-1 py-0.5 h-auto"
                        >
                          Track
                        </Button>
                      )}
                      {activity?.type === 'message' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleActivityAction(activity?.id, 'reply')}
                          className="text-xs px-1 py-0.5 h-auto"
                        >
                          Reply
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-6">
          <Icon name="Activity" size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No recent activities</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;