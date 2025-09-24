import React, { useState, useEffect } from 'react';
import { Bell, Mail, Calendar, Users, AlertCircle, CheckCircle, Clock, Eye, Archive, Filter } from 'lucide-react';

const FacultyNotificationsSection = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, important, archived
  const [selectedType, setSelectedType] = useState('all'); // all, system, collaboration, event, feedback

  useEffect(() => {
    // TODO: Fetch notifications from Firestore
    // For now, using placeholder data
    const mockNotifications = [
      {
        id: '1',
        type: 'collaboration',
        title: 'New Collaboration Response',
        message: 'Sarah Johnson has responded to your Machine Learning Research Project collaboration request.',
        sender: 'Sarah Johnson',
        sender_email: 'sarah.johnson@techcorp.com',
        timestamp: '2025-09-20T10:30:00Z',
        read: false,
        important: true,
        archived: false,
        action_required: true,
        action_url: '/faculty-dashboard/collaborations',
        category: 'collaboration_response'
      },
      {
        id: '2',
        type: 'event',
        title: 'Event Registration Deadline Approaching',
        message: 'The registration deadline for "AI in Healthcare: Industry Perspectives" is in 3 days. Currently 89/150 registered.',
        sender: 'System',
        sender_email: null,
        timestamp: '2025-09-19T09:15:00Z',
        read: false,
        important: false,
        archived: false,
        action_required: false,
        action_url: '/faculty-dashboard/events',
        category: 'event_reminder'
      },
      {
        id: '3',
        type: 'feedback',
        title: 'New Feedback Responses',
        message: 'You have received 15 new responses for the "Computer Science Curriculum Feedback 2024" form.',
        sender: 'System',
        sender_email: null,
        timestamp: '2025-09-19T14:20:00Z',
        read: true,
        important: false,
        archived: false,
        action_required: false,
        action_url: '/faculty-dashboard/feedback',
        category: 'feedback_update'
      },
      {
        id: '4',
        type: 'system',
        title: 'Guest Lecture Invitation Accepted',
        message: 'Dr. Michael Chen has accepted your invitation to speak at the "Industry Perspectives in AI" guest lecture.',
        sender: 'Dr. Michael Chen',
        sender_email: 'michael.chen@fintech.com',
        timestamp: '2025-09-18T16:45:00Z',
        read: true,
        important: true,
        archived: false,
        action_required: true,
        action_url: '/faculty-dashboard/guest-lectures',
        category: 'guest_lecture_response'
      },
      {
        id: '5',
        type: 'collaboration',
        title: 'Collaboration Project Update',
        message: 'Your "Curriculum Development Consultation" project has been marked as completed by Michael Chen.',
        sender: 'Michael Chen',
        sender_email: 'michael.chen@fintech.com',
        timestamp: '2025-09-17T11:30:00Z',
        read: true,
        important: false,
        archived: false,
        action_required: false,
        action_url: '/faculty-dashboard/collaborations',
        category: 'collaboration_update'
      },
      {
        id: '6',
        type: 'system',
        title: 'Alumni Directory Updated',
        message: 'New alumni profiles have been added to the directory. 5 new alumni from your department are now available for networking.',
        sender: 'System',
        sender_email: null,
        timestamp: '2025-09-16T08:00:00Z',
        read: true,
        important: false,
        archived: true,
        action_required: false,
        action_url: '/faculty-dashboard/alumni-directory',
        category: 'system_update'
      },
      {
        id: '7',
        type: 'event',
        title: 'Event Feedback Summary',
        message: 'The feedback summary for "Technical Workshop: Full-Stack Development" is now available. Average rating: 4.8/5.',
        sender: 'System',
        sender_email: null,
        timestamp: '2025-09-15T12:00:00Z',
        read: true,
        important: false,
        archived: false,
        action_required: false,
        action_url: '/faculty-dashboard/events',
        category: 'event_feedback'
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    // Filter by read status
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'important' && !notification.important) return false;
    if (filter === 'archived' && !notification.archived) return false;
    if (filter !== 'archived' && notification.archived) return false;
    
    // Filter by type
    if (selectedType !== 'all' && notification.type !== selectedType) return false;
    
    return true;
  });

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAsUnread = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: false }
          : notification
      )
    );
  };

  const toggleImportant = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, important: !notification.important }
          : notification
      )
    );
  };

  const archiveNotification = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, archived: true }
          : notification
      )
    );
  };

  const unarchiveNotification = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, archived: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'collaboration':
        return <Users className="h-5 w-5 text-blue-600" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-green-600" />;
      case 'feedback':
        return <Mail className="h-5 w-5 text-purple-600" />;
      case 'system':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read && !n.archived).length;
  const importantCount = notifications.filter(n => n.important && !n.archived).length;
  const archivedCount = notifications.filter(n => n.archived).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h2>
          <p className="text-gray-600">Stay updated with important activities and responses.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
          </div>
          
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All', count: notifications.filter(n => !n.archived).length },
              { id: 'unread', label: 'Unread', count: unreadCount },
              { id: 'important', label: 'Important', count: importantCount },
              { id: 'archived', label: 'Archived', count: archivedCount }
            ].map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === filterOption.id
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption.label} ({filterOption.count})
              </button>
            ))}
          </div>
          
          <div className="border-l border-gray-200 pl-6">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Types</option>
              <option value="collaboration">Collaborations</option>
              <option value="event">Events</option>
              <option value="feedback">Feedback</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 transition-all hover:shadow-md ${
              !notification.read ? 'border-l-4 border-l-green-500' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 pt-1">
                {getTypeIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      {notification.important && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Important
                        </span>
                      )}
                      {notification.action_required && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          Action Required
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-sm ${!notification.read ? 'text-gray-800' : 'text-gray-600'} mb-2`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{notification.sender}</span>
                      <span>•</span>
                      <span>{getTimeAgo(notification.timestamp)}</span>
                      <span>•</span>
                      <span className="capitalize">{notification.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {notification.action_url && (
                      <button
                        onClick={() => {
                          markAsRead(notification.id);
                          // TODO: Navigate to action URL
                        }}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => toggleImportant(notification.id)}
                      className={`p-1 transition-colors ${
                        notification.important 
                          ? 'text-red-600 hover:text-red-700' 
                          : 'text-gray-400 hover:text-red-600'
                      }`}
                      title={notification.important ? 'Remove from Important' : 'Mark as Important'}
                    >
                      <AlertCircle className="h-4 w-4" />
                    </button>
                    
                    {!notification.read ? (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Mark as Read"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => markAsUnread(notification.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Mark as Unread"
                      >
                        <Clock className="h-4 w-4" />
                      </button>
                    )}
                    
                    {!notification.archived ? (
                      <button
                        onClick={() => archiveNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Archive"
                      >
                        <Archive className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => unarchiveNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Unarchive"
                      >
                        <Archive className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Bell className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
          </h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? "You're all caught up! New notifications will appear here."
              : `No notifications match the ${filter} filter.`}
          </p>
        </div>
      )}

      {/* Notification Summary */}
      {filter === 'all' && notifications.length > 0 && (
        <div className="mt-8 bg-green-50 rounded-xl p-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-800">
                {notifications.filter(n => n.read && !n.archived).length} read
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="text-yellow-800">
                {unreadCount} unread
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-800">
                {importantCount} important
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Archive className="h-4 w-4 text-gray-600" />
              <span className="text-gray-700">
                {archivedCount} archived
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyNotificationsSection;