import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AnnouncementCard = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium',
    targetAudience: [],
    expiryDate: '',
    sendEmail: false,
    sendPush: true
  });

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const audienceOptions = [
    { value: 'students', label: 'Students' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'alumni', label: 'Alumni' },
    { value: 'recruiters', label: 'Recruiters' },
    { value: 'all', label: 'All Users' }
  ];

  const announcements = [
    {
      id: 1,
      title: "Spring Semester Registration Open",
      content: "Registration for Spring 2024 semester is now open. Students can register for courses through the student portal until February 15th.",
      priority: "high",
      targetAudience: ["students"],
      createdDate: "2024-01-21",
      expiryDate: "2024-02-15",
      status: "active",
      views: 1247,
      author: "Academic Office"
    },
    {
      id: 2,
      title: "Career Fair 2024 - Company Registration",
      content: "Companies interested in participating in our annual career fair can now register. Limited spots available.",
      priority: "medium",
      targetAudience: ["recruiters"],
      createdDate: "2024-01-20",
      expiryDate: "2024-02-10",
      status: "active",
      views: 89,
      author: "Placement Cell"
    },
    {
      id: 3,
      title: "Library Hours Extended",
      content: "Due to upcoming exams, library hours have been extended. New timings: 6 AM to 12 AM on weekdays.",
      priority: "medium",
      targetAudience: ["students", "faculty"],
      createdDate: "2024-01-19",
      expiryDate: "2024-03-01",
      status: "active",
      views: 892,
      author: "Library Administration"
    },
    {
      id: 4,
      title: "Alumni Networking Event",
      content: "Join us for our monthly alumni networking event. Great opportunity to connect with fellow graduates.",
      priority: "low",
      targetAudience: ["alumni"],
      createdDate: "2024-01-18",
      expiryDate: "2024-01-28",
      status: "expired",
      views: 156,
      author: "Alumni Relations"
    },
    {
      id: 5,
      title: "System Maintenance Notice",
      content: "The platform will undergo scheduled maintenance on January 25th from 2 AM to 6 AM. Services may be temporarily unavailable.",
      priority: "urgent",
      targetAudience: ["all"],
      createdDate: "2024-01-17",
      expiryDate: "2024-01-26",
      status: "active",
      views: 2341,
      author: "IT Department"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'text-muted-foreground bg-muted';
      case 'medium': return 'text-primary bg-primary/10';
      case 'high': return 'text-warning bg-warning/10';
      case 'urgent': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'low': return 'Minus';
      case 'medium': return 'Equal';
      case 'high': return 'AlertTriangle';
      case 'urgent': return 'AlertCircle';
      default: return 'Info';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'expired': return 'text-muted-foreground bg-muted';
      case 'draft': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleCreateAnnouncement = (e) => {
    e?.preventDefault();
    console.log('Creating announcement:', newAnnouncement);
    // Handle create announcement logic here
    setShowCreateForm(false);
    setNewAnnouncement({
      title: '',
      content: '',
      priority: 'medium',
      targetAudience: [],
      expiryDate: '',
      sendEmail: false,
      sendPush: true
    });
  };

  const handleEditAnnouncement = (announcementId) => {
    console.log('Editing announcement:', announcementId);
    // Handle edit announcement logic here
  };

  const handleDeleteAnnouncement = (announcementId) => {
    console.log('Deleting announcement:', announcementId);
    // Handle delete announcement logic here
  };

  const formatAudience = (audience) => {
    if (audience?.includes('all')) return 'All Users';
    return audience?.map(a => a?.charAt(0)?.toUpperCase() + a?.slice(1))?.join(', ');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Megaphone" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Announcements</h3>
            <p className="text-sm text-muted-foreground">Create and manage campus-wide communications</p>
          </div>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-green-600 border-green-600 text-white hover:bg-green-700 hover:border-green-700"
        >
          New Announcement
        </Button>
      </div>
      {/* Create Announcement Form */}
      {showCreateForm && (
        <div className="bg-background border border-border rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-card-foreground mb-4">Create New Announcement</h4>
          <form onSubmit={handleCreateAnnouncement} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Announcement Title"
                type="text"
                placeholder="Enter announcement title"
                value={newAnnouncement?.title}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e?.target?.value }))}
                required
              />
              <Select
                label="Priority Level"
                options={priorityOptions}
                value={newAnnouncement?.priority}
                onChange={(value) => setNewAnnouncement(prev => ({ ...prev, priority: value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Announcement Content
              </label>
              <textarea
                className="w-full p-3 border border-border rounded-md resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows="4"
                placeholder="Enter announcement content..."
                value={newAnnouncement?.content}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e?.target?.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Target Audience"
                options={audienceOptions}
                value={newAnnouncement?.targetAudience}
                onChange={(value) => setNewAnnouncement(prev => ({ ...prev, targetAudience: Array.isArray(value) ? value : [value] }))}
                multiple
                searchable
              />
              <Input
                label="Expiry Date"
                type="date"
                value={newAnnouncement?.expiryDate}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, expiryDate: e?.target?.value }))}
                required
              />
            </div>

            <div className="flex items-center space-x-6">
              <Checkbox
                label="Send Email Notification"
                checked={newAnnouncement?.sendEmail}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, sendEmail: e?.target?.checked }))}
              />
              <Checkbox
                label="Send Push Notification"
                checked={newAnnouncement?.sendPush}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, sendPush: e?.target?.checked }))}
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="default"
                className="bg-green-600 border-green-600 text-white hover:bg-green-700 hover:border-green-700"
              >
                Create Announcement
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Announcements List */}
      <div className="space-y-4">
        {announcements?.slice(0, 5)?.map((announcement) => (
          <div key={announcement?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${getPriorityColor(announcement?.priority)}`}>
                  <Icon name={getPriorityIcon(announcement?.priority)} size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-card-foreground">{announcement?.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(announcement?.status)}`}>
                      {announcement?.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(announcement?.priority)}`}>
                      {announcement?.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{announcement?.content}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{formatAudience(announcement?.targetAudience)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>Created: {new Date(announcement.createdDate)?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>Expires: {new Date(announcement.expiryDate)?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{announcement?.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 ml-4 min-w-fit">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  iconPosition="left"
                  onClick={() => handleEditAnnouncement(announcement?.id)}
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 w-full sm:w-auto"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => handleDeleteAnnouncement(announcement?.id)}
                  className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 w-full sm:w-auto"
                >
                  Delete
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
              <span>By {announcement?.author}</span>
              <div className="flex items-center space-x-4">
                <span>{announcement?.views} views</span>
                <span className={announcement?.status === 'active' ? 'text-success' : 'text-muted-foreground'}>
                  {announcement?.status === 'active' ? 'Active' : 'Expired'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-card-foreground">
              {announcements?.filter(a => a?.status === 'active')?.length}
            </p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-card-foreground">
              {announcements?.filter(a => a?.priority === 'urgent' || a?.priority === 'high')?.length}
            </p>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-card-foreground">
              {announcements?.reduce((sum, a) => sum + a?.views, 0)?.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-card-foreground">
              {announcements?.filter(a => a?.status === 'expired')?.length}
            </p>
            <p className="text-sm text-muted-foreground">Expired</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;