import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Plus, 
  Send, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Users, 
  Calendar,
  AlertCircle,
  Info,
  CheckCircle,
  X
} from 'lucide-react';

const NotificationsManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    targetAudience: 'all',
    scheduledDate: '',
    scheduledTime: ''
  });

  // Mock data - Replace with Firebase Firestore calls
  useEffect(() => {
    const mockNotifications = [
      {
        id: '1',
        title: 'System Maintenance Scheduled',
        message: 'We will be performing system maintenance on January 25th from 2:00 AM to 4:00 AM EST. During this time, the platform may be temporarily unavailable.',
        type: 'warning',
        targetAudience: 'all',
        status: 'sent',
        createdDate: '2024-01-20',
        sentDate: '2024-01-20',
        readCount: 450,
        totalRecipients: 1250
      },
      {
        id: '2',
        title: 'New Career Opportunities Available',
        message: 'Check out the latest job postings from our partner companies. New opportunities in tech, finance, and healthcare are now available.',
        type: 'info',
        targetAudience: 'alumni',
        status: 'sent',
        createdDate: '2024-01-18',
        sentDate: '2024-01-18',
        readCount: 320,
        totalRecipients: 850
      },
      {
        id: '3',
        title: 'Alumni Networking Event - Save the Date',
        message: 'Join us for our quarterly alumni networking event on February 15th. Registration opens next week!',
        type: 'event',
        targetAudience: 'alumni',
        status: 'scheduled',
        createdDate: '2024-01-15',
        scheduledDate: '2024-01-25',
        readCount: 0,
        totalRecipients: 850
      },
      {
        id: '4',
        title: 'Security Alert: Update Your Password',
        message: 'As part of our ongoing security improvements, please update your password within the next 30 days.',
        type: 'alert',
        targetAudience: 'all',
        status: 'draft',
        createdDate: '2024-01-22',
        readCount: 0,
        totalRecipients: 0
      },
      {
        id: '5',
        title: 'Scholarship Application Deadline Approaching',
        message: 'Reminder: The deadline for scholarship applications is February 1st. Don\'t miss this opportunity to support deserving students.',
        type: 'reminder',
        targetAudience: 'donors',
        status: 'sent',
        createdDate: '2024-01-12',
        sentDate: '2024-01-12',
        readCount: 85,
        totalRecipients: 120
      }
    ];
    
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateNotification = () => {
    const notificationData = {
      id: Date.now().toString(),
      ...newNotification,
      status: newNotification.scheduledDate ? 'scheduled' : 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      readCount: 0,
      totalRecipients: newNotification.targetAudience === 'all' ? 1250 : 
                      newNotification.targetAudience === 'alumni' ? 850 :
                      newNotification.targetAudience === 'students' ? 400 : 120
    };
    
    setNotifications([notificationData, ...notifications]);
    setNewNotification({
      title: '',
      message: '',
      type: 'info',
      targetAudience: 'all',
      scheduledDate: '',
      scheduledTime: ''
    });
    setShowCreateModal(false);
    // TODO: Add to Firebase Firestore
  };

  const handleSendNotification = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { 
            ...notification, 
            status: 'sent', 
            sentDate: new Date().toISOString().split('T')[0] 
          }
        : notification
    ));
    // TODO: Actually send notification via Firebase Cloud Messaging
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
    // TODO: Delete from Firebase Firestore
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || notification.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'reminder':
        return <Bell className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type) => {
    const styles = {
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      alert: 'bg-red-100 text-red-800',
      event: 'bg-purple-100 text-purple-800',
      reminder: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${styles[type]}`}>
        {getTypeIcon(type)}
        <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
      sent: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getAudienceBadge = (audience) => {
    const labels = {
      all: 'All Users',
      alumni: 'Alumni',
      students: 'Students',
      faculty: 'Faculty',
      donors: 'Donors'
    };
    
    return (
      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
        {labels[audience] || audience}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications Management</h2>
          <p className="text-gray-600">Create and manage system-wide notifications</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Notification</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="alert">Alert</option>
            <option value="event">Event</option>
            <option value="reminder">Reminder</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                  {getTypeBadge(notification.type)}
                  {getStatusBadge(notification.status)}
                </div>
                
                <p className="text-gray-600 mb-4">{notification.message}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Target: {getAudienceBadge(notification.targetAudience)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {new Date(notification.createdDate).toLocaleDateString()}</span>
                  </div>
                  
                  {notification.status === 'sent' && (
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>
                        {notification.readCount}/{notification.totalRecipients} read
                        ({Math.round((notification.readCount / notification.totalRecipients) * 100)}%)
                      </span>
                    </div>
                  )}
                  
                  {notification.status === 'scheduled' && (
                    <div className="flex items-center space-x-1">
                      <Bell className="w-4 h-4" />
                      <span>Scheduled: {new Date(notification.scheduledDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {(notification.status === 'draft' || notification.status === 'scheduled') && (
                  <button 
                    onClick={() => handleSendNotification(notification.id)}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200 text-sm"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send Now</span>
                  </button>
                )}
                
                <button className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50">
                  <Eye className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {notification.status === 'sent' && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(notification.readCount / notification.totalRecipients) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Notifications</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Sent</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 font-bold">D</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Notification Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Create New Notification</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newNotification.type}
                      onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="alert">Alert</option>
                      <option value="event">Event</option>
                      <option value="reminder">Reminder</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                    <select
                      value={newNotification.targetAudience}
                      onChange={(e) => setNewNotification({ ...newNotification, targetAudience: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="all">All Users</option>
                      <option value="alumni">Alumni</option>
                      <option value="students">Students</option>
                      <option value="faculty">Faculty</option>
                      <option value="donors">Donors</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date (Optional)</label>
                    <input
                      type="date"
                      value={newNotification.scheduledDate}
                      onChange={(e) => setNewNotification({ ...newNotification, scheduledDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Time (Optional)</label>
                    <input
                      type="time"
                      value={newNotification.scheduledTime}
                      onChange={(e) => setNewNotification({ ...newNotification, scheduledTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNotification}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsManagement;