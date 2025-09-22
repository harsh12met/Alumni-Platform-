import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const JobPostingCard = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    experience: '',
    salary: '',
    deadline: '',
    description: '',
    requirements: ''
  });

  const recentJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      applications: 45,
      status: "Active",
      postedDate: "2025-01-15",
      deadline: "2025-02-15"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      applications: 32,
      status: "Active",
      postedDate: "2025-01-10",
      deadline: "2025-02-10"
    },
    {
      id: 3,
      title: "Data Science Intern",
      department: "Analytics",
      location: "New York, NY",
      type: "Internship",
      applications: 78,
      status: "Closed",
      postedDate: "2024-12-20",
      deadline: "2025-01-20"
    }
  ];

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' }
  ];

  const experienceOptions = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (2-5 years)' },
    { value: 'senior', label: 'Senior Level (5+ years)' },
    { value: 'executive', label: 'Executive Level' }
  ];

  const handleInputChange = (field, value) => {
    setJobForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    console.log('Job posting submitted:', jobForm);
    setShowCreateForm(false);
    setJobForm({
      title: '',
      department: '',
      location: '',
      type: '',
      experience: '',
      salary: '',
      deadline: '',
      description: '',
      requirements: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10';
      case 'Closed': return 'text-error bg-error/10';
      case 'Draft': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Briefcase" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Job Postings</h3>
            <p className="text-sm text-muted-foreground">Create and manage job opportunities</p>
          </div>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => setShowCreateForm(!showCreateForm)}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Post New Job
        </Button>
      </div>
      {showCreateForm && (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
          <h4 className="font-medium text-card-foreground mb-4">Create New Job Posting</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Job Title"
                value={jobForm?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                placeholder="e.g., Senior Software Engineer"
                required
              />
              <Input
                label="Department"
                value={jobForm?.department}
                onChange={(e) => handleInputChange('department', e?.target?.value)}
                placeholder="e.g., Engineering"
                required
              />
              <Input
                label="Location"
                value={jobForm?.location}
                onChange={(e) => handleInputChange('location', e?.target?.value)}
                placeholder="e.g., San Francisco, CA or Remote"
                required
              />
              <Select
                label="Job Type"
                options={jobTypeOptions}
                value={jobForm?.type}
                onChange={(value) => handleInputChange('type', value)}
                placeholder="Select job type"
                required
              />
              <Select
                label="Experience Level"
                options={experienceOptions}
                value={jobForm?.experience}
                onChange={(value) => handleInputChange('experience', value)}
                placeholder="Select experience level"
                required
              />
              <Input
                label="Salary Range"
                value={jobForm?.salary}
                onChange={(e) => handleInputChange('salary', e?.target?.value)}
                placeholder="e.g., $80,000 - $120,000"
              />
            </div>

            <Input
              label="Application Deadline"
              type="date"
              value={jobForm?.deadline}
              onChange={(e) => handleInputChange('deadline', e?.target?.value)}
              required
            />

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Job Description
              </label>
              <textarea
                value={jobForm?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={4}
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Requirements & Qualifications
              </label>
              <textarea
                value={jobForm?.requirements}
                onChange={(e) => handleInputChange('requirements', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={4}
                placeholder="List required skills, qualifications, and experience..."
                required
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default">
                Post Job
              </Button>
            </div>
          </form>
        </div>
      )}
      <div className="space-y-4">
        <h4 className="font-medium text-card-foreground">Recent Job Postings</h4>
        {recentJobs?.map((job) => (
          <div key={job?.id} className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h5 className="font-medium text-card-foreground">{job?.title}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job?.status)}`}>
                    {job?.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="Building" size={14} />
                    <span>{job?.department}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{job?.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{job?.type}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{job?.applications} applications</span>
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Posted: {new Date(job.postedDate)?.toLocaleDateString()}</span>
                  <span>Deadline: {new Date(job.deadline)?.toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Eye" iconPosition="left" iconSize={14}>
                  View
                </Button>
                <Button variant="ghost" size="sm" iconName="Edit" iconPosition="left" iconSize={14}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" iconName="MoreVertical" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPostingCard;