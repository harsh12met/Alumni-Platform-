import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'connections', 'applications', 'events'
  const notificationRef = useRef(null);
  const location = useLocation();

  // Mock notifications based on role
  const getRoleNotifications = () => {
    const path = location?.pathname;
    
    if (path?.includes('alumni-dashboard')) {
      return [
        {
          id: 1,
          type: 'connection',
          title: 'New Connection Request',
          message: 'Sarah Johnson wants to connect with you',
          time: '2 minutes ago',
          unread: true,
          avatar: null,
          actionable: true,
          actions: ['Accept', 'Decline']
        },
        {
          id: 2,
          type: 'opportunity',
          title: 'Job Opportunity Match',
          message: 'Senior Software Engineer at TechCorp matches your profile',
          time: '1 hour ago',
          unread: true,
          avatar: null,
          actionable: true,
          actions: ['View Job', 'Not Interested']
        },
        {
          id: 3,
          type: 'event',
          title: 'Alumni Meetup Reminder',
          message: 'Tech Alumni Networking Event starts in 2 hours',
          time: '3 hours ago',
          unread: false,
          avatar: null,
          actionable: false
        }
      ];
    }
    
    if (path?.includes('faculty-dashboard')) {
      return [
        {
          id: 1,
          type: 'student',
          title: 'Student Query',
          message: 'John Doe has a question about Assignment 3',
          time: '15 minutes ago',
          unread: true,
          avatar: null,
          actionable: true,
          actions: ['Reply', 'Mark as Read']
        },
        {
          id: 2,
          type: 'placement',
          title: 'Placement Update',
          message: '5 students from your class got placed this week',
          time: '2 hours ago',
          unread: true,
          avatar: null,
          actionable: false
        },
        {
          id: 3,
          type: 'system',
          title: 'Grade Submission Reminder',
          message: 'Final grades due by Friday, Dec 22',
          time: '1 day ago',
          unread: false,
          avatar: null,
          actionable: true,
          actions: ['Submit Grades']
        }
      ];
    }
    
    if (path?.includes('recruiter-dashboard')) {
      return [
        {
          id: 1,
          type: 'application',
          title: 'New Application',
          message: 'Alex Chen applied for Senior Developer position',
          time: '5 minutes ago',
          unread: true,
          avatar: null,
          actionable: true,
          actions: ['Review', 'Schedule Interview']
        },
        {
          id: 2,
          type: 'interview',
          title: 'Interview Scheduled',
          message: 'Interview with Maria Garcia confirmed for tomorrow 2 PM',
          time: '30 minutes ago',
          unread: true,
          avatar: null,
          actionable: true,
          actions: ['View Details', 'Reschedule']
        },
        {
          id: 3,
          type: 'candidate',
          title: 'Candidate Shortlisted',
          message: 'David Kim has been shortlisted for final round',
          time: '2 hours ago',
          unread: false,
          avatar: null,
          actionable: false
        }
      ];
    }
    
    if (path?.includes('institute-admin-dashboard')) {
      return [
        {
          id: 1,
          type: 'approval',
          title: 'Pending Approval',
          message: '3 new faculty registrations require approval',
          time: '10 minutes ago',
          unread: true,
          avatar: null,
          actionable: true,
          actions: ['Review', 'Approve All']
        },
        {
          id: 2,
          type: 'system',
          title: 'System Update',
          message: 'Platform maintenance scheduled for this weekend',
          time: '1 hour ago',
          unread: true,
          avatar: null,
          actionable: false
        },
        {
          id: 3,
          type: 'report',
          title: 'Monthly Report Ready',
          message: 'November placement report is now available',
          time: '4 hours ago',
          unread: false,
          avatar: null,
          actionable: true,
          actions: ['Download Report']
        }
      ];
    }
    
    if (path?.includes('super-admin-dashboard')) {
      return [
        {
          id: 1,
          type: 'system',
          title: 'System Alert',
          message: 'High server load detected on primary database',
          time: '1 minute ago',
          unread: true,
          avatar: null,
          actionable: true,
          actions: ['Investigate', 'Scale Resources']
        },
        {
          id: 2,
          type: 'institute',
          title: 'New Institute Registration',
          message: 'MIT Boston has requested platform access',
          time: '20 minutes ago',
          unread: true,
          avatar: null,
          actionable: true,
          actions: ['Review', 'Approve']
        },
        {
          id: 3,
          type: 'analytics',
          title: 'Weekly Analytics',
          message: 'Platform usage increased by 15% this week',
          time: '1 day ago',
          unread: false,
          avatar: null,
          actionable: true,
          actions: ['View Report']
        }
      ];
    }
    
    return [];
  };

  useEffect(() => {
    setNotifications(getRoleNotifications());
  }, [location?.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    const iconMap = {
      connection: 'UserPlus',
      opportunity: 'Briefcase',
      event: 'Calendar',
      student: 'GraduationCap',
      placement: 'TrendingUp',
      system: 'AlertCircle',
      application: 'FileText',
      interview: 'Video',
      candidate: 'User',
      approval: 'CheckCircle',
      report: 'FileBarChart',
      institute: 'Building2',
      analytics: 'BarChart3'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      connection: 'text-blue-600',
      opportunity: 'text-green-600',
      event: 'text-purple-600',
      student: 'text-indigo-600',
      placement: 'text-emerald-600',
      system: 'text-orange-600',
      application: 'text-blue-600',
      interview: 'text-purple-600',
      candidate: 'text-gray-600',
      approval: 'text-green-600',
      report: 'text-blue-600',
      institute: 'text-indigo-600',
      analytics: 'text-emerald-600'
    };
    return colorMap?.[type] || 'text-gray-600';
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return notification?.unread;
    return notification?.type === filter;
  });

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  const handleNotificationAction = (notificationId, action) => {
    console.log(`Action "${action}" for notification ${notificationId}`);
    // Handle notification actions here
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === notificationId 
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, unread: false }))
    );
  };

  const filterOptions = [
    { value: 'all', label: 'All', icon: 'Inbox' },
    { value: 'unread', label: 'Unread', icon: 'Mail' },
    { value: 'connection', label: 'Connections', icon: 'Users' },
    { value: 'application', label: 'Applications', icon: 'FileText' },
    { value: 'event', label: 'Events', icon: 'Calendar' }
  ];

  return (
    <div className={`relative ${className}`} ref={notificationRef}>
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>
      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-popover border border-border rounded-lg shadow-modal z-1002 max-h-[32rem] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-popover-foreground">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {filterOptions?.slice(0, 3)?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => setFilter(option?.value)}
                  className={`flex-1 flex items-center justify-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                    filter === option?.value
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={option?.icon} size={12} />
                  <span>{option?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications?.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredNotifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                      notification?.unread ? 'bg-muted/30' : ''
                    }`}
                    onClick={() => markAsRead(notification?.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
                        <Icon name={getNotificationIcon(notification?.type)} size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-popover-foreground">
                              {notification?.title}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification?.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification?.time}
                            </p>
                          </div>
                          {notification?.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1"></div>
                          )}
                        </div>
                        
                        {/* Action Buttons */}
                        {notification?.actionable && notification?.actions && (
                          <div className="flex items-center space-x-2 mt-3">
                            {notification?.actions?.map((action, index) => (
                              <Button
                                key={index}
                                variant={index === 0 ? "default" : "outline"}
                                size="xs"
                                onClick={(e) => {
                                  e?.stopPropagation();
                                  handleNotificationAction(notification?.id, action);
                                }}
                              >
                                {action}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications?.length > 0 && (
            <div className="p-4 border-t border-border">
              <Button variant="ghost" size="sm" fullWidth>
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;