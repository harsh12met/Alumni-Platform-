import React, { useState, useEffect } from 'react';
import { Bell, Check, Eye, Trash2, Filter, Calendar, User, MessageSquare } from 'lucide-react';

const NotificationsSection = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, read

  // Mock data - Replace with Firestore fetch
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        title: 'New Job Posting: Software Engineer Intern',
        message: 'Google has posted a new internship opportunity. Application deadline is October 15, 2025.',
        type: 'job',
        isRead: false,
        timestamp: '2025-09-23T10:30:00Z',
        actionUrl: '/jobs/1'
      },
      {
        id: 2,
        title: 'Mentorship Request Accepted',
        message: 'Sarah Johnson has accepted your mentorship request. She will contact you soon to schedule a meeting.',
        type: 'mentorship',
        isRead: false,
        timestamp: '2025-09-22T14:20:00Z',
        actionUrl: '/mentorship/2'
      },
      {
        id: 3,
        title: 'Event Registration Confirmed',
        message: 'Your registration for Tech Career Fair 2025 has been confirmed. Event is on October 15, 2025.',
        type: 'event',
        isRead: true,
        timestamp: '2025-09-21T09:15:00Z',
        actionUrl: '/events/1'
      },
      {
        id: 4,
        title: 'New Resource Available',
        message: 'Prof. John Smith has uploaded "Complete Web Development Guide" to the resources section.',
        type: 'resource',
        isRead: true,
        timestamp: '2025-09-20T16:45:00Z',
        actionUrl: '/resources/1'
      },
      {
        id: 5,
        title: 'Profile Update Reminder',
        message: 'Don\'t forget to update your profile with your latest skills and experiences.',
        type: 'system',
        isRead: false,
        timestamp: '2025-09-19T11:00:00Z',
        actionUrl: '/profile'
      },
      {
        id: 6,
        title: 'Alumni Networking Dinner',
        message: 'Registration is now open for the Alumni Networking Dinner on October 20, 2025.',
        type: 'event',
        isRead: true,
        timestamp: '2025-09-18T13:30:00Z',
        actionUrl: '/events/2'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
    // TODO: Update in Firestore
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    // TODO: Update all in Firestore
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
    // TODO: Delete from Firestore
  };

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(notif => !notif.isRead);
      case 'read':
        return notifications.filter(notif => notif.isRead);
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'job':
        return '💼';
      case 'mentorship':
        return '🤝';
      case 'event':
        return '📅';
      case 'resource':
        return '📚';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'job':
        return 'border-l-blue-500';
      case 'mentorship':
        return 'border-l-green-500';
      case 'event':
        return 'border-l-purple-500';
      case 'resource':
        return 'border-l-orange-500';
      case 'system':
        return 'border-l-gray-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-600">
            Stay updated with the latest news and activities
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Check className="w-4 h-4 mr-2" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'read', label: 'Read', count: notifications.length - unreadCount }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filterOption.label} ({filterOption.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-xl shadow-sm border-l-4 ${getNotificationColor(notification.type)} ${
              notification.isRead ? 'border-gray-200' : 'border-gray-200 ring-2 ring-blue-50'
            } hover:shadow-md transition-shadow`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      notification.isRead ? 'bg-gray-100' : 'bg-blue-100'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`text-lg font-semibold ${
                        notification.isRead ? 'text-gray-900' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {notification.message}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatTimestamp(notification.timestamp)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Button */}
              {notification.actionUrl && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                    View Details →
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {filter === 'unread' ? 'No unread notifications' : 
             filter === 'read' ? 'No read notifications' : 'No notifications'}
          </h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? 'You\'ll see notifications here when there are updates.'
              : `Switch to other tabs to see ${filter === 'unread' ? 'read' : 'unread'} notifications.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsSection;