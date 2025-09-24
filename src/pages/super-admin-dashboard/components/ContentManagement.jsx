import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedContent, setSelectedContent] = useState([]);

  const tabs = [
    { id: 'posts', label: 'Posts & Updates', count: 1247 },
    { id: 'events', label: 'Events', count: 89 },
    { id: 'jobs', label: 'Job Postings', count: 456 },
    { id: 'news', label: 'News & Articles', count: 234 },
    { id: 'moderation', label: 'Content Moderation', count: 23 },
    { id: 'reports', label: 'Reported Content', count: 7 }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'archived', label: 'Archived' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'text', label: 'Text Posts' },
    { value: 'image', label: 'Image Posts' },
    { value: 'video', label: 'Video Posts' },
    { value: 'document', label: 'Documents' },
    { value: 'link', label: 'Link Shares' }
  ];

  const posts = [
    {
      id: 1,
      title: "New Partnership with Google",
      author: "Sarah Johnson",
      authorRole: "Faculty",
      institute: "MIT",
      type: "text",
      status: "published",
      publishedAt: "2024-12-21T10:30:00Z",
      likes: 234,
      comments: 45,
      shares: 12,
      views: 2340,
      content: "Excited to announce our new partnership with Google for AI research initiatives...",
      tags: ["partnership", "google", "ai", "research"],
      reported: false,
      moderationScore: 95
    },
    {
      id: 2,
      title: "Campus Placement Drive 2024",
      author: "Placement Cell",
      authorRole: "Admin",
      institute: "Stanford University",
      type: "image",
      status: "published",
      publishedAt: "2024-12-21T09:15:00Z",
      likes: 567,
      comments: 89,
      shares: 34,
      views: 5670,
      content: "Join us for the biggest campus placement drive of the year...",
      tags: ["placement", "jobs", "career", "students"],
      reported: false,
      moderationScore: 98
    },
    {
      id: 3,
      title: "Inappropriate Language Detected",
      author: "Anonymous User",
      authorRole: "Student",
      institute: "UC Berkeley",
      type: "text",
      status: "pending",
      publishedAt: null,
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      content: "This post contains content that has been flagged for review...",
      tags: ["flagged"],
      reported: true,
      moderationScore: 23
    },
    {
      id: 4,
      title: "Alumni Success Story",
      author: "Mike Chen",
      authorRole: "Alumni",
      institute: "MIT",
      type: "video",
      status: "published",
      publishedAt: "2024-12-20T16:45:00Z",
      likes: 445,
      comments: 67,
      shares: 23,
      views: 3400,
      content: "Sharing my journey from student to startup founder...",
      tags: ["alumni", "success", "entrepreneurship"],
      reported: false,
      moderationScore: 92
    }
  ];

  const events = [
    {
      id: 1,
      title: "Annual Alumni Meet 2024",
      organizer: "Alumni Association",
      institute: "MIT",
      date: "2024-12-25T18:00:00Z",
      location: "MIT Campus",
      attendees: 234,
      maxAttendees: 500,
      status: "published",
      type: "physical",
      featured: true
    },
    {
      id: 2,
      title: "Tech Career Fair",
      organizer: "Career Services",
      institute: "Stanford",
      date: "2024-12-28T10:00:00Z",
      location: "Virtual Event",
      attendees: 567,
      maxAttendees: 1000,
      status: "published",
      type: "virtual",
      featured: false
    }
  ];

  const jobPostings = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      type: "Full-time",
      salary: "$150,000 - $200,000",
      postedBy: "recruiter@google.com",
      postedAt: "2024-12-21T08:00:00Z",
      applications: 45,
      views: 890,
      status: "active",
      expiresAt: "2025-01-21T23:59:59Z"
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Meta",
      location: "Menlo Park, CA",
      type: "Full-time",
      salary: "$140,000 - $180,000",
      postedBy: "hr@meta.com",
      postedAt: "2024-12-20T14:30:00Z",
      applications: 67,
      views: 1234,
      status: "active",
      expiresAt: "2025-01-20T23:59:59Z"
    }
  ];

  const reportedContent = [
    {
      id: 1,
      contentType: "post",
      contentId: 3,
      title: "Inappropriate Language Detected",
      author: "Anonymous User",
      reportedBy: "concerned.user@student.edu",
      reason: "Inappropriate language",
      reportedAt: "2024-12-21T11:30:00Z",
      status: "pending",
      severity: "medium",
      autoDetected: true
    },
    {
      id: 2,
      contentType: "comment",
      contentId: 156,
      title: "Spam Comment on Job Posting",
      author: "spam.user@fake.com",
      reportedBy: "admin@system.edu",
      reason: "Spam content",
      reportedAt: "2024-12-21T10:15:00Z",
      status: "resolved",
      severity: "low",
      autoDetected: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-50';
      case 'draft': return 'text-gray-600 bg-gray-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'archived': return 'text-purple-600 bg-purple-50';
      case 'active': return 'text-green-600 bg-green-50';
      case 'expired': return 'text-red-600 bg-red-50';
      case 'resolved': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleString();
  };

  const handleSelectContent = (contentId) => {
    setSelectedContent(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for content:`, selectedContent);
    setSelectedContent([]);
  };

  const renderPosts = () => (
    <div className="space-y-6">
      {/* Content Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search posts by title, author, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-48"
          />
          <Select
            options={typeOptions}
            value={typeFilter}
            onChange={setTypeFilter}
            className="w-48"
          />
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedContent.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium">
            {selectedContent.length} post{selectedContent.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleBulkAction('publish')}>
              Publish
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleBulkAction('archive')}>
              Archive
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleBulkAction('delete')}>
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left p-4 font-medium text-card-foreground">Content</th>
                <th className="text-left p-4 font-medium text-card-foreground">Author</th>
                <th className="text-left p-4 font-medium text-card-foreground">Status</th>
                <th className="text-left p-4 font-medium text-card-foreground">Engagement</th>
                <th className="text-left p-4 font-medium text-card-foreground">Published</th>
                <th className="text-left p-4 font-medium text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-muted/30">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedContent.includes(post.id)}
                      onChange={() => handleSelectContent(post.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        post.type === 'text' ? 'bg-blue-100' :
                        post.type === 'image' ? 'bg-green-100' :
                        post.type === 'video' ? 'bg-purple-100' : 'bg-gray-100'
                      }`}>
                        <Icon name={
                          post.type === 'text' ? 'FileText' :
                          post.type === 'image' ? 'Image' :
                          post.type === 'video' ? 'Video' : 'File'
                        } size={16} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground">{post.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {post.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-card-foreground">{post.author}</div>
                      <div className="text-sm text-muted-foreground">{post.authorRole} • {post.institute}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                      {post.reported && (
                        <div className="flex items-center text-xs text-red-600">
                          <Icon name="AlertTriangle" size={12} className="mr-1" />
                          Reported
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm space-y-1">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-muted-foreground">
                          <Icon name="Heart" size={12} className="mr-1" />
                          {post.likes}
                        </span>
                        <span className="flex items-center text-muted-foreground">
                          <Icon name="MessageCircle" size={12} className="mr-1" />
                          {post.comments}
                        </span>
                        <span className="flex items-center text-muted-foreground">
                          <Icon name="Share" size={12} className="mr-1" />
                          {post.shares}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {post.views} views
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-muted-foreground">
                      {formatDateTime(post.publishedAt)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" title="View">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="More">
                        <Icon name="MoreHorizontal" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.organizer} • {event.institute}</p>
              </div>
              {event.featured && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                  Featured
                </span>
              )}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Icon name="Calendar" size={16} className="mr-2" />
                {formatDateTime(event.date)}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Icon name="MapPin" size={16} className="mr-2" />
                {event.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Icon name="Users" size={16} className="mr-2" />
                {event.attendees}/{event.maxAttendees} attendees
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                {event.status}
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJobPostings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {jobPostings.map((job) => (
          <div key={job.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-card-foreground text-lg">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium">{job.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Salary</p>
                    <p className="font-medium">{job.salary}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Applications</p>
                    <p className="font-medium">{job.applications}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Views</p>
                    <p className="font-medium">{job.views}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Posted {formatDateTime(job.postedAt)} • Expires {formatDateTime(job.expiresAt)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReportedContent = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-card-foreground">Content</th>
                <th className="text-left p-4 font-medium text-card-foreground">Reported By</th>
                <th className="text-left p-4 font-medium text-card-foreground">Reason</th>
                <th className="text-left p-4 font-medium text-card-foreground">Severity</th>
                <th className="text-left p-4 font-medium text-card-foreground">Status</th>
                <th className="text-left p-4 font-medium text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportedContent.map((report) => (
                <tr key={report.id} className="hover:bg-muted/30">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-card-foreground">{report.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {report.contentType} by {report.author}
                      </div>
                      {report.autoDetected && (
                        <div className="flex items-center text-xs text-blue-600 mt-1">
                          <Icon name="Zap" size={12} className="mr-1" />
                          Auto-detected
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-card-foreground">{report.reportedBy}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDateTime(report.reportedAt)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-card-foreground">{report.reason}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        Review
                      </Button>
                      <Button variant="ghost" size="sm">
                        Dismiss
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'posts': return renderPosts();
      case 'events': return renderEvents();
      case 'jobs': return renderJobPostings();
      case 'news': return renderPosts(); // Same structure as posts
      case 'moderation': return renderPosts(); // Same structure with moderation focus
      case 'reports': return renderReportedContent();
      default: return renderPosts();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Content Management</h2>
          <p className="text-muted-foreground">Manage all platform content and moderate user-generated content</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Content
          </Button>
          <Button iconName="Plus" iconPosition="left">
            Create Content
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
                activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderActiveTab()}
    </div>
  );
};

export default ContentManagement;