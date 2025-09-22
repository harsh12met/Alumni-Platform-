import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationApprovalCard = () => {
  const [pendingApplications, setPendingApplications] = useState([
    {
      id: 1,
      name: "Dr. Jennifer Williams",
      email: "j.williams@university.edu",
      role: "faculty",
      department: "Physics",
      submittedDate: "2024-01-20",
      documents: ["CV", "Degree Certificate", "ID Proof"],
      experience: "15 years",
      specialization: "Quantum Physics",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150"
    },
    {
      id: 2,
      name: "GlobalTech Solutions",
      email: "hr@globaltech.com",
      role: "recruiter",
      department: "External",
      submittedDate: "2024-01-19",
      documents: ["Company Registration", "HR Authorization", "Business License"],
      companySize: "500-1000 employees",
      industry: "Software Development",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
    },
    {
      id: 3,
      name: "Robert Davis",
      email: "robert.davis@alumni.edu",
      role: "alumni",
      department: "Computer Science",
      submittedDate: "2024-01-18",
      documents: ["Degree Certificate", "ID Proof", "Employment Letter"],
      graduationYear: "2018",
      currentPosition: "Senior Software Engineer at Microsoft",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    },
    {
      id: 4,
      name: "Lisa Chen",
      email: "lisa.chen@university.edu",
      role: "student",
      department: "Engineering",
      submittedDate: "2024-01-17",
      documents: ["Admission Letter", "ID Proof", "Academic Transcripts"],
      year: "3rd Year",
      gpa: "3.8/4.0",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
    }
  ]);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'student': return 'GraduationCap';
      case 'faculty': return 'BookOpen';
      case 'alumni': return 'Users';
      case 'recruiter': return 'Briefcase';
      default: return 'User';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'student': return 'text-blue-600 bg-blue-50';
      case 'faculty': return 'text-green-600 bg-green-50';
      case 'alumni': return 'text-purple-600 bg-purple-50';
      case 'recruiter': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleApprove = (applicationId) => {
    setPendingApplications(prev => prev?.filter(app => app?.id !== applicationId));
    console.log(`Approved application ${applicationId}`);
    // Handle approval logic here
  };

  const handleReject = (applicationId) => {
    setPendingApplications(prev => prev?.filter(app => app?.id !== applicationId));
    console.log(`Rejected application ${applicationId}`);
    // Handle rejection logic here
  };

  const handleViewDetails = (application) => {
    console.log('Viewing details for:', application);
    // Handle view details logic here
  };

  const getAdditionalInfo = (application) => {
    switch (application?.role) {
      case 'faculty':
        return `${application?.experience} experience • ${application?.specialization}`;
      case 'recruiter':
        return `${application?.companySize} • ${application?.industry}`;
      case 'alumni':
        return `Class of ${application?.graduationYear} • ${application?.currentPosition}`;
      case 'student':
        return `${application?.year} • GPA: ${application?.gpa}`;
      default:
        return '';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="Clock" size={20} color="var(--color-warning)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Registration Approvals</h3>
            <p className="text-sm text-muted-foreground">
              {pendingApplications?.length} pending application{pendingApplications?.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          iconName="Filter" 
          iconPosition="left"
          className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
        >
          Filter
        </Button>
      </div>
      {pendingApplications?.length > 0 ? (
        <div className="space-y-4">
          {pendingApplications?.map((application) => (
            <div key={application?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <img
                    src={application?.avatar}
                    alt={application?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-card-foreground">{application?.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize flex items-center space-x-1 ${getRoleColor(application?.role)}`}>
                        <Icon name={getRoleIcon(application?.role)} size={12} />
                        <span>{application?.role}</span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{application?.email}</p>
                    <p className="text-sm text-muted-foreground mb-2">{application?.department}</p>
                    <p className="text-sm text-card-foreground mb-3">{getAdditionalInfo(application)}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>Submitted: {new Date(application.submittedDate)?.toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="FileText" size={12} />
                        <span>{application?.documents?.length} documents</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 ml-4 min-w-fit">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => handleViewDetails(application)}
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 w-full sm:w-auto"
                  >
                    Review
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="X"
                    iconPosition="left"
                    onClick={() => handleReject(application?.id)}
                    className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 w-full sm:w-auto"
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Check"
                    iconPosition="left"
                    onClick={() => handleApprove(application?.id)}
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 w-full sm:w-auto"
                  >
                    Approve
                  </Button>
                </div>
              </div>
              
              {/* Documents List */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-medium text-card-foreground mb-2">Submitted Documents:</p>
                <div className="flex flex-wrap gap-2">
                  {application?.documents?.map((doc, index) => (
                    <span key={index} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-4" />
          <p className="text-muted-foreground">No pending applications</p>
          <p className="text-sm text-muted-foreground mt-1">All registration requests have been processed</p>
        </div>
      )}
      {pendingApplications?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {pendingApplications?.length} pending application{pendingApplications?.length !== 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300"
              >
                Bulk Approve
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                iconName="Download" 
                iconPosition="left"
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationApprovalCard;