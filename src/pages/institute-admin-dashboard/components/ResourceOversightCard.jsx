import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ResourceOversightCard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categoryOptions = [
    { value: 'all', label: 'All Resources' },
    { value: 'study_materials', label: 'Study Materials' },
    { value: 'job_postings', label: 'Job Postings' },
    { value: 'research_papers', label: 'Research Papers' },
    { value: 'course_content', label: 'Course Content' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'flagged', label: 'Flagged' }
  ];

  const resources = [
    {
      id: 1,
      title: "Advanced Machine Learning Algorithms",
      type: "study_materials",
      author: "Dr. Sarah Johnson",
      department: "Computer Science",
      uploadDate: "2024-01-20",
      status: "pending",
      downloads: 0,
      size: "15.2 MB",
      format: "PDF",
      description: "Comprehensive guide covering advanced ML algorithms including neural networks and deep learning techniques.",
      flagReason: null
    },
    {
      id: 2,
      title: "Senior Software Engineer - TechCorp",
      type: "job_postings",
      author: "TechCorp HR",
      department: "External",
      uploadDate: "2024-01-19",
      status: "approved",
      applications: 23,
      salary: "$85,000 - $120,000",
      location: "San Francisco, CA",
      description: "Looking for experienced software engineers to join our growing team working on cutting-edge technologies.",
      flagReason: null
    },
    {
      id: 3,
      title: "Quantum Computing Research Paper",
      type: "research_papers",
      author: "Dr. Michael Chen",
      department: "Physics",
      uploadDate: "2024-01-18",
      status: "approved",
      citations: 12,
      size: "8.7 MB",
      format: "PDF",
      description: "Novel approaches to quantum error correction in quantum computing systems.",
      flagReason: null
    },
    {
      id: 4,
      title: "Data Structures and Algorithms Course",
      type: "course_content",
      author: "Prof. Emily Rodriguez",
      department: "Computer Science",
      uploadDate: "2024-01-17",
      status: "flagged",
      enrollments: 156,
      duration: "12 weeks",
      level: "Intermediate",
      description: "Complete course covering fundamental data structures and algorithmic problem-solving techniques.",
      flagReason: "Copyright concern raised by external party"
    },
    {
      id: 5,
      title: "Internship Opportunity - StartupXYZ",
      type: "job_postings",
      author: "StartupXYZ",
      department: "External",
      uploadDate: "2024-01-16",
      status: "rejected",
      applications: 0,
      salary: "Unpaid",
      location: "Remote",
      description: "Seeking motivated interns to work on innovative projects in a fast-paced startup environment.",
      flagReason: "Does not meet minimum compensation requirements"
    },
    {
      id: 6,
      title: "Linear Algebra Study Guide",
      type: "study_materials",
      author: "Dr. Robert Davis",
      department: "Mathematics",
      uploadDate: "2024-01-15",
      status: "approved",
      downloads: 342,
      size: "5.4 MB",
      format: "PDF",
      description: "Comprehensive study guide for linear algebra with solved examples and practice problems.",
      flagReason: null
    }
  ];

  const getResourceIcon = (type) => {
    switch (type) {
      case 'study_materials': return 'BookOpen';
      case 'job_postings': return 'Briefcase';
      case 'research_papers': return 'FileText';
      case 'course_content': return 'GraduationCap';
      default: return 'File';
    }
  };

  const getResourceColor = (type) => {
    switch (type) {
      case 'study_materials': return 'text-blue-600 bg-blue-50';
      case 'job_postings': return 'text-green-600 bg-green-50';
      case 'research_papers': return 'text-purple-600 bg-purple-50';
      case 'course_content': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning bg-warning/10';
      case 'approved': return 'text-success bg-success/10';
      case 'rejected': return 'text-error bg-error/10';
      case 'flagged': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const filteredResources = resources?.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource?.type === selectedCategory;
    const statusMatch = selectedStatus === 'all' || resource?.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const handleApprove = (resourceId) => {
    console.log('Approving resource:', resourceId);
    // Handle approve logic here
  };

  const handleReject = (resourceId) => {
    console.log('Rejecting resource:', resourceId);
    // Handle reject logic here
  };

  const handleFlag = (resourceId) => {
    console.log('Flagging resource:', resourceId);
    // Handle flag logic here
  };

  const handleViewDetails = (resourceId) => {
    console.log('Viewing resource details:', resourceId);
    // Handle view details logic here
  };

  const getResourceMetrics = (resource) => {
    switch (resource?.type) {
      case 'study_materials':
        return `${resource?.downloads} downloads • ${resource?.size} • ${resource?.format}`;
      case 'job_postings':
        return `${resource?.applications} applications • ${resource?.salary} • ${resource?.location}`;
      case 'research_papers':
        return `${resource?.citations} citations • ${resource?.size} • ${resource?.format}`;
      case 'course_content':
        return `${resource?.enrollments} enrolled • ${resource?.duration} • ${resource?.level}`;
      default:
        return '';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Shield" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Resource Oversight</h3>
            <p className="text-sm text-muted-foreground">Monitor and moderate platform content</p>
          </div>
        </div>
        <Button variant="outline" iconName="Settings" iconPosition="left">
          Moderation Settings
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Select
            label="Filter by Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Filter by Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
          />
        </div>
      </div>
      {/* Resources List */}
      {filteredResources?.length > 0 ? (
        <div className="space-y-4">
          {filteredResources?.map((resource) => (
            <div key={resource?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${getResourceColor(resource?.type)}`}>
                    <Icon name={getResourceIcon(resource?.type)} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-card-foreground">{resource?.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(resource?.status)}`}>
                        {resource?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{resource?.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name="User" size={14} />
                        <span>{resource?.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Building" size={14} />
                        <span>{resource?.department}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={14} />
                        <span>{new Date(resource.uploadDate)?.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{getResourceMetrics(resource)}</p>
                    
                    {resource?.flagReason && (
                      <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                        <div className="flex items-center space-x-2 text-destructive">
                          <Icon name="AlertTriangle" size={14} />
                          <span className="font-medium">Flagged:</span>
                        </div>
                        <p className="text-destructive mt-1">{resource?.flagReason}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => handleViewDetails(resource?.id)}
                  >
                    View
                  </Button>
                  {resource?.status === 'pending' && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        iconName="Check"
                        iconPosition="left"
                        onClick={() => handleApprove(resource?.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="X"
                        iconPosition="left"
                        onClick={() => handleReject(resource?.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {resource?.status === 'approved' && (
                    <Button
                      variant="warning"
                      size="sm"
                      iconName="Flag"
                      iconPosition="left"
                      onClick={() => handleFlag(resource?.id)}
                    >
                      Flag
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Shield" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No resources found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedCategory === 'all' && selectedStatus === 'all' ?'No resources available for review' :'No resources match the selected filters'}
          </p>
        </div>
      )}
      {/* Summary Stats */}
      {filteredResources?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">
                {resources?.filter(r => r?.status === 'pending')?.length}
              </p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">
                {resources?.filter(r => r?.status === 'approved')?.length}
              </p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">
                {resources?.filter(r => r?.status === 'flagged')?.length}
              </p>
              <p className="text-sm text-muted-foreground">Flagged</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-error">
                {resources?.filter(r => r?.status === 'rejected')?.length}
              </p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceOversightCard;