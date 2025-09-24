import React, { useState, useEffect } from 'react';
import {
  Send,
  Users,
  Calendar,
  MessageSquare,
  Bell,
  Filter,
  Search,
  X,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  UserCheck,
  GraduationCap,
  Building2
} from 'lucide-react';

const NotificationsManagement = ({ instituteId }) => {
  const [notifications, setNotifications] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState('all_students');
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    type: 'info', // 'info', 'warning', 'success', 'urgent'
    recipients: 'all_students',
    scheduledDate: '',
    attachments: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with Firebase Firestore calls
  useEffect(() => {
    // TODO: Replace with actual Firebase queries
    // const fetchNotifications = async () => {
    //   const notificationsRef = collection(db, 'notifications');
    //   const q = query(notificationsRef, where('instituteId', '==', instituteId));
    //   const snapshot = await getDocs(q);
    //   const notificationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   setNotifications(notificationsData);
    // };

    const mockNotifications = [
      {
        id: 'notif_001',
        title: 'Registration for Spring Career Fair',
        message: 'The Spring Career Fair registration is now open. Please register by March 15th to secure your spot. This is a great opportunity to connect with potential employers.',
        type: 'info',
        recipients: 'all_students',
        recipientCount: 1456,
        status: 'sent',
        sentAt: '2024-01-15T10:30:00Z',
        deliveredCount: 1234,
        readCount: 987,
        clickCount: 234,
        createdBy: 'Admin Sarah Johnson'
      },
      {
        id: 'notif_002',
        title: 'Alumni Mentorship Program Launch',
        message: 'We are excited to announce the launch of our new Alumni Mentorship Program. Current students can now connect with alumni mentors for career guidance.',
        type: 'success',
        recipients: 'alumni_and_students',
        recipientCount: 2703,
        status: 'sent',
        sentAt: '2024-01-12T14:20:00Z',
        deliveredCount: 2456,
        readCount: 1876,
        clickCount: 456,
        createdBy: 'Admin Michael Chen'
      },
      {
        id: 'notif_003',
        title: 'System Maintenance Scheduled',
        message: 'Our platform will undergo maintenance on January 20th from 2:00 AM to 6:00 AM EST. Some services may be temporarily unavailable.',
        type: 'warning',
        recipients: 'all_users',
        recipientCount: 3401,
        status: 'scheduled',
        scheduledFor: '2024-01-20T02:00:00Z',
        createdBy: 'Admin Tech Team'
      },
      {
        id: 'notif_004',
        title: 'Emergency: Campus Closure Due to Weather',
        message: 'Due to severe weather conditions, the campus will be closed today. All classes and events are cancelled. Stay safe!',
        type: 'urgent',
        recipients: 'all_students',
        recipientCount: 1456,
        status: 'sent',
        sentAt: '2024-01-10T06:00:00Z',
        deliveredCount: 1456,
        readCount: 1401,
        clickCount: 45,
        createdBy: 'Admin Emergency Team'
      },
      {
        id: 'notif_005',
        title: 'New Scholarship Opportunities Available',
        message: 'Several new scholarship opportunities are now available for eligible students. Application deadline is February 28th.',
        type: 'info',
        recipients: 'current_students',
        recipientCount: 1456,
        status: 'draft',
        createdBy: 'Admin Financial Aid'
      }
    ];

    const mockTemplates = [
      {
        id: 'template_001',
        name: 'Event Reminder',
        title: 'Reminder: {EVENT_NAME}',
        message: 'Don\'t forget about {EVENT_NAME} scheduled for {EVENT_DATE}. {EVENT_DETAILS}',
        type: 'info',
        category: 'events'
      },
      {
        id: 'template_002',
        name: 'Registration Open',
        title: 'Registration Now Open: {PROGRAM_NAME}',
        message: 'Registration for {PROGRAM_NAME} is now open. Apply by {DEADLINE} to secure your spot.',
        type: 'info',
        category: 'registration'
      },
      {
        id: 'template_003',
        name: 'Urgent Notice',
        title: 'Urgent: {SUBJECT}',
        message: 'This is an urgent notice regarding {SUBJECT}. {URGENT_DETAILS}',
        type: 'urgent',
        category: 'urgent'
      },
      {
        id: 'template_004',
        name: 'System Maintenance',
        title: 'Scheduled Maintenance Notice',
        message: 'System maintenance is scheduled for {DATE} from {START_TIME} to {END_TIME}. Some services may be temporarily unavailable.',
        type: 'warning',
        category: 'technical'
      }
    ];

    setTimeout(() => {
      setNotifications(mockNotifications);
      setTemplates(mockTemplates);
      setLoading(false);
    }, 1000);
  }, [instituteId]);

  const handleSendNotification = () => {
    // TODO: Implement actual notification sending with Firebase
    // const sendNotification = async () => {
    //   const notificationRef = collection(db, 'notifications');
    //   await addDoc(notificationRef, {
    //     ...notificationData,
    //     instituteId,
    //     createdAt: new Date(),
    //     status: notificationData.scheduledDate ? 'scheduled' : 'sent'
    //   });
    // };

    const newNotification = {
      id: `notif_${Date.now()}`,
      ...notificationData,
      status: notificationData.scheduledDate ? 'scheduled' : 'sent',
      sentAt: notificationData.scheduledDate || new Date().toISOString(),
      recipientCount: getRecipientCount(notificationData.recipients),
      createdBy: 'Current Admin'
    };

    setNotifications(prev => [newNotification, ...prev]);
    setShowComposeModal(false);
    setNotificationData({
      title: '',
      message: '',
      type: 'info',
      recipients: 'all_students',
      scheduledDate: '',
      attachments: []
    });
  };

  const getRecipientCount = (recipients) => {
    const counts = {
      'all_students': 1456,
      'all_alumni': 1247,
      'alumni_and_students': 2703,
      'all_users': 3401,
      'current_students': 1456,
      'recent_graduates': 156
    };
    return counts[recipients] || 0;
  };

  const getRecipientLabel = (recipients) => {
    const labels = {
      'all_students': 'All Students',
      'all_alumni': 'All Alumni',
      'alumni_and_students': 'Alumni & Students',
      'all_users': 'All Users',
      'current_students': 'Current Students',
      'recent_graduates': 'Recent Graduates'
    };
    return labels[recipients] || recipients;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'draft':
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || notification.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications Management</h2>
          <p className="text-gray-600">
            Send targeted notifications to your institute's students and alumni
          </p>
        </div>
        
        <button
          onClick={() => setShowComposeModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Compose Notification</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.status === 'sent').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.status === 'scheduled').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.status === 'draft').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Read Rate</p>
              <p className="text-2xl font-bold text-gray-900">74%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="sent">Sent</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredNotifications.map((notification) => (
            <div key={notification.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(notification.status)}
                    <h4 className="text-lg font-medium text-gray-900">{notification.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(notification.type)}`}>
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">{notification.message}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{getRecipientLabel(notification.recipients)} ({notification.recipientCount.toLocaleString()})</span>
                    </div>
                    
                    {notification.status === 'sent' && (
                      <>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>Delivered: {notification.deliveredCount?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>Read: {notification.readCount?.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    
                    {notification.status === 'scheduled' && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Scheduled: {new Date(notification.scheduledFor).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-400">
                    Created by {notification.createdBy} • {new Date(notification.sentAt || notification.scheduledFor).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {notification.status === 'draft' && (
                    <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-sm">
                      Edit
                    </button>
                  )}
                  {notification.status === 'scheduled' && (
                    <button className="text-orange-600 hover:bg-orange-50 px-3 py-1 rounded text-sm">
                      Reschedule
                    </button>
                  )}
                  <button className="text-gray-400 hover:bg-gray-50 px-3 py-1 rounded text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Compose Notification</h3>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Templates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Use Template (Optional)
                </label>
                <select
                  onChange={(e) => {
                    const template = templates.find(t => t.id === e.target.value);
                    if (template) {
                      setNotificationData(prev => ({
                        ...prev,
                        title: template.title,
                        message: template.message,
                        type: template.type
                      }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a template...</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipients
                </label>
                <select
                  value={notificationData.recipients}
                  onChange={(e) => setNotificationData(prev => ({ ...prev, recipients: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all_students">All Students ({getRecipientCount('all_students').toLocaleString()})</option>
                  <option value="current_students">Current Students ({getRecipientCount('current_students').toLocaleString()})</option>
                  <option value="all_alumni">All Alumni ({getRecipientCount('all_alumni').toLocaleString()})</option>
                  <option value="alumni_and_students">Alumni & Students ({getRecipientCount('alumni_and_students').toLocaleString()})</option>
                  <option value="recent_graduates">Recent Graduates ({getRecipientCount('recent_graduates').toLocaleString()})</option>
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Type
                </label>
                <select
                  value={notificationData.type}
                  onChange={(e) => setNotificationData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="info">Information</option>
                  <option value="success">Success/Good News</option>
                  <option value="warning">Warning</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={notificationData.title}
                  onChange={(e) => setNotificationData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter notification title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={notificationData.message}
                  onChange={(e) => setNotificationData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter your message..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={notificationData.scheduledDate}
                  onChange={(e) => setNotificationData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to send immediately
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowComposeModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNotification}
                disabled={!notificationData.title || !notificationData.message}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{notificationData.scheduledDate ? 'Schedule' : 'Send'} Notification</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsManagement;