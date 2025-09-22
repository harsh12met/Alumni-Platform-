import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';
import Avatar from '../../../components/ui/Avatar';

const ApplicationManagementCard = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedApplications, setSelectedApplications] = useState([]);

  const applications = [
    {
      id: 1,
      candidateName: "Alex Chen",
      position: "Senior Software Engineer",
      email: "alex.chen@email.com",
      phone: "+1 (555) 123-4567",
      experience: "5 years",
      status: "Under Review",
      appliedDate: "2025-01-18",
      resumeUrl: "#",
      skills: ["React", "Node.js", "Python", "AWS"],
      education: "MS Computer Science - Stanford University",
      location: "San Francisco, CA"
    },
    {
      id: 2,
      candidateName: "Maria Garcia",
      position: "Product Manager",
      email: "maria.garcia@email.com",
      phone: "+1 (555) 234-5678",
      experience: "7 years",
      status: "Interview Scheduled",
      appliedDate: "2025-01-17",
      resumeUrl: "#",
      skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      education: "MBA - Harvard Business School",
      location: "Boston, MA"
    },
    {
      id: 3,
      candidateName: "David Kim",
      position: "Data Science Intern",
      email: "david.kim@email.com",
      phone: "+1 (555) 345-6789",
      experience: "1 year",
      status: "Shortlisted",
      appliedDate: "2025-01-16",
      resumeUrl: "#",
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      education: "BS Data Science - UC Berkeley",
      location: "Berkeley, CA"
    },
    {
      id: 4,
      candidateName: "Sarah Johnson",
      position: "Senior Software Engineer",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 456-7890",
      experience: "6 years",
      status: "Rejected",
      appliedDate: "2025-01-15",
      resumeUrl: "#",
      skills: ["Java", "Spring", "Microservices", "Docker"],
      education: "BS Computer Engineering - MIT",
      location: "Cambridge, MA"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Applications' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'interview-scheduled', label: 'Interview Scheduled' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review': return 'text-warning bg-warning/10';
      case 'Interview Scheduled': return 'text-primary bg-primary/10';
      case 'Shortlisted': return 'text-success bg-success/10';
      case 'Rejected': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const filteredApplications = applications?.filter(app => {
    if (selectedFilter === 'all') return true;
    return app?.status?.toLowerCase()?.replace(' ', '-') === selectedFilter;
  });

  const handleSelectApplication = (appId) => {
    setSelectedApplications(prev => 
      prev?.includes(appId) 
        ? prev?.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for applications:`, selectedApplications);
    setSelectedApplications([]);
  };

  const handleStatusChange = (appId, newStatus) => {
    console.log(`Changing status for application ${appId} to ${newStatus}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="FileText" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Application Management</h3>
            <p className="text-sm text-muted-foreground">Review and manage candidate applications</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            options={filterOptions}
            value={selectedFilter}
            onChange={setSelectedFilter}
            placeholder="Filter applications"
            className="w-48"
          />
          {selectedApplications?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('shortlist')}
                iconName="Star"
                iconPosition="left"
                iconSize={14}
              >
                Shortlist ({selectedApplications?.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('reject')}
                iconName="X"
                iconPosition="left"
                iconSize={14}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {filteredApplications?.map((application) => (
          <div key={application?.id} className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedApplications?.includes(application?.id)}
                  onChange={() => handleSelectApplication(application?.id)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
                <Avatar
                  name={application?.candidateName}
                  size="lg"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-card-foreground">{application?.candidateName}</h4>
                    <p className="text-sm text-muted-foreground">{application?.position}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application?.status)}`}>
                      {application?.status}
                    </span>
                    <Button variant="ghost" size="sm" iconName="MoreVertical" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Mail" size={14} />
                    <span>{application?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Phone" size={14} />
                    <span>{application?.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span>{application?.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Briefcase" size={14} />
                    <span>{application?.experience} experience</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="GraduationCap" size={14} />
                    <span>{application?.education}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>Applied {new Date(application.appliedDate)?.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {application?.skills?.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="FileText"
                      iconPosition="left"
                      iconSize={14}
                    >
                      View Resume
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageSquare"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Message
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    {application?.status === 'Under Review' && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleStatusChange(application?.id, 'Interview Scheduled')}
                          iconName="Calendar"
                          iconPosition="left"
                          iconSize={14}
                        >
                          Schedule Interview
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(application?.id, 'Shortlisted')}
                          iconName="Star"
                          iconPosition="left"
                          iconSize={14}
                        >
                          Shortlist
                        </Button>
                      </>
                    )}
                    {application?.status === 'Interview Scheduled' && (
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Video"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Join Interview
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredApplications?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No applications found for the selected filter</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationManagementCard;