import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, X, Filter, Search, MessageCircle, Calendar, Briefcase, Users, Heart } from 'lucide-react';

const AlumniNotificationsSection = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'mentorship',
      title: 'New Mentorship Request',
      message: 'Alex Chen (Batch 2024) has requested mentorship for software development career guidance.',
      timestamp: '2024-03-15T10:30:00Z',
      read: false,
      actionUrl: '/alumni-dashboard?section=mentorship',
      priority: 'high'
    },
    {
      id: 2,
      type: 'job',
      title: 'New Job Application',
      message: 'Sarah Wilson applied for the Senior Developer position you posted.',
      timestamp: '2024-03-14T15:45:00Z',
      read: false,
      actionUrl: '/alumni-dashboard?section=jobs',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'event',
      title: 'Event Registration Confirmation',
      message: 'You have successfully registered for the Tech Alumni Meetup 2024.',
      timestamp: '2024-03-13T09:15:00Z',
      read: true,
      actionUrl: '/alumni-dashboard?section=events',
      priority: 'low'
    },
    {
      id: 4,
      type: 'networking',
      title: 'New Comment on Your Post',
      message: 'Mike Johnson commented on your post about "Software Engineering Career Advice".',
      timestamp: '2024-03-12T14:20:00Z',
      read: true,
      actionUrl: '/alumni-dashboard?section=networking',
      priority: 'low'
    },
    {
      id: 5,
      type: 'donation',
      title: 'Donation Receipt',
      message: 'Thank you for your $500 donation to the Scholarship Fund 2024.',
      timestamp: '2024-03-10T11:00:00Z',
      read: true,
      actionUrl: '/alumni-dashboard?section=donations',
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // TODO: Fetch notifications from Firestore
    // const fetchNotifications = async () => {
    //   try {
    //     const q = query(
    //       collection(db, "notifications"),
    //       where("userId", "==", currentUserId),
    //       orderBy("timestamp", "desc"),
    //       limit(50)
    //     );
    //     const querySnapshot = await getDocs(q);
    //     const notificationsData = [];
    //     querySnapshot.forEach((doc) => {
    //       notificationsData.push({ id: doc.id, ...doc.data() });
    //     });
    //     setNotifications(notificationsData);
    //   } catch (error) {
    //     console.error("Error fetching notifications:", error);
    //   }
    // };
    // fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      // TODO: Update notification as read in Firestore
      // await updateDoc(doc(db, "notifications", notificationId), {
      //   read: true
      // });

      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // TODO: Update all unread notifications as read in Firestore
      const unreadNotifications = notifications.filter(n => !n.read);
      
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      // TODO: Delete notification from Firestore
      // await deleteDoc(doc(db, "notifications", notificationId));

      setNotifications(prev =>
        prev.filter(notification => notification.id !== notificationId)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'mentorship':
        return <Users size={20} className="text-blue-600" />;
      case 'job':
        return <Briefcase size={20} className="text-green-600" />;
      case 'event':
        return <Calendar size={20} className="text-purple-600" />;
      case 'networking':
        return <MessageCircle size={20} className="text-orange-600" />;
      case 'donation':
        return <Heart size={20} className="text-red-600" />;
      default:
        return <Bell size={20} className="text-gray-600" />;
    }
  };

  const getNotificationBgColor = (type, read) => {
    const baseColors = {
      mentorship: 'bg-blue-50 border-blue-200',
      job: 'bg-green-50 border-green-200',
      event: 'bg-purple-50 border-purple-200',
      networking: 'bg-orange-50 border-orange-200',
      donation: 'bg-red-50 border-red-200',
      default: 'bg-gray-50 border-gray-200'
    };

    if (read) {
      return 'bg-white border-gray-200';
    }

    return baseColors[type] || baseColors.default;
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="w-2 h-2 bg-red-500 rounded-full"></span>;
      case 'medium':
        return <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>;
      case 'low':
        return <span className="w-2 h-2 bg-green-500 rounded-full"></span>;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString();
      }
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.read) ||
                         (filter === 'read' && notification.read) ||
                         notification.type === filter;

    const matchesSearch = searchQuery === '' ||
                         notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              Stay updated with your alumni activities 
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
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <CheckCircle size={16} className="mr-2" />
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="mentorship">Mentorship</option>
              <option value="job">Jobs</option>
              <option value="event">Events</option>
              <option value="networking">Networking</option>
              <option value="donation">Donations</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`border rounded-lg p-4 transition-all hover:shadow-md ${getNotificationBgColor(notification.type, notification.read)}`}
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className={`text-sm font-medium ${notification.read ? 'text-gray-900' : 'text-gray-900 font-semibold'}`}>
                        {notification.title}
                      </h3>
                      {getPriorityBadge(notification.priority)}
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{formatTimestamp(notification.timestamp)}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                        title="Mark as read"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-gray-400 hover:text-red-600 p-1"
                      title="Delete notification"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                {notification.actionUrl && (
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        if (!notification.read) {
                          markAsRead(notification.id);
                        }
                        // TODO: Navigate to the action URL
                        console.log('Navigate to:', notification.actionUrl);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
          <p className="text-gray-600">
            {searchQuery || filter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'You\'re all caught up! New notifications will appear here'
            }
          </p>
        </div>
      )}

      {/* Load More Button (if needed) */}
      {filteredNotifications.length > 0 && filteredNotifications.length >= 10 && (
        <div className="text-center mt-8">
          <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Load More Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default AlumniNotificationsSection;