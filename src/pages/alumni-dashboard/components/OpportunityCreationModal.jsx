import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OpportunityCreationModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    workType: 'full-time',
    jobType: 'job',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: [],
    benefits: [],
    applicationDeadline: '',
    contactEmail: '',
    applicationUrl: ''
  });

  const [currentRequirement, setCurrentRequirement] = useState('');
  const [currentBenefit, setCurrentBenefit] = useState('');

  const workTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const jobTypeOptions = [
    { value: 'job', label: 'Full-time Job' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance Project' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addRequirement = () => {
    if (currentRequirement?.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev?.requirements, currentRequirement?.trim()]
      }));
      setCurrentRequirement('');
    }
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev?.requirements?.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    if (currentBenefit?.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev?.benefits, currentBenefit?.trim()]
      }));
      setCurrentBenefit('');
    }
  };

  const removeBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev?.benefits?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      title: '',
      company: '',
      location: '',
      workType: 'full-time',
      jobType: 'job',
      salaryMin: '',
      salaryMax: '',
      description: '',
      requirements: [],
      benefits: [],
      applicationDeadline: '',
      contactEmail: '',
      applicationUrl: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1003 p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground flex items-center space-x-2">
            <Icon name="Plus" size={20} />
            <span>Share New Opportunity</span>
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-card-foreground">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Job Title"
                  type="text"
                  placeholder="e.g., Senior Software Engineer"
                  value={formData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  required
                />
                
                <Input
                  label="Company Name"
                  type="text"
                  placeholder="e.g., TechCorp Inc."
                  value={formData?.company}
                  onChange={(e) => handleInputChange('company', e?.target?.value)}
                  required
                />
                
                <Input
                  label="Location"
                  type="text"
                  placeholder="e.g., San Francisco, CA or Remote"
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Opportunity Type
                  </label>
                  <select
                    value={formData?.jobType}
                    onChange={(e) => handleInputChange('jobType', e?.target?.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {jobTypeOptions?.map(option => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Work Type
                  </label>
                  <select
                    value={formData?.workType}
                    onChange={(e) => handleInputChange('workType', e?.target?.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {workTypeOptions?.map(option => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Input
                  label="Application Deadline"
                  type="date"
                  value={formData?.applicationDeadline}
                  onChange={(e) => handleInputChange('applicationDeadline', e?.target?.value)}
                />
              </div>
            </div>

            {/* Salary Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-card-foreground">Compensation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Minimum Salary (USD)"
                  type="number"
                  placeholder="e.g., 80000"
                  value={formData?.salaryMin}
                  onChange={(e) => handleInputChange('salaryMin', e?.target?.value)}
                />
                
                <Input
                  label="Maximum Salary (USD)"
                  type="number"
                  placeholder="e.g., 120000"
                  value={formData?.salaryMax}
                  onChange={(e) => handleInputChange('salaryMax', e?.target?.value)}
                />
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-card-foreground">Job Description</h3>
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                  placeholder="Provide a detailed description of the role, responsibilities, and what makes this opportunity exciting..."
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-vertical"
                  required
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-card-foreground">Requirements</h3>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentRequirement}
                  onChange={(e) => setCurrentRequirement(e?.target?.value)}
                  placeholder="Add a requirement (e.g., 3+ years experience)"
                  className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyPress={(e) => e?.key === 'Enter' && (e?.preventDefault(), addRequirement())}
                />
                <Button type="button" variant="outline" onClick={addRequirement}>
                  Add
                </Button>
              </div>
              
              {formData?.requirements?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData?.requirements?.map((req, index) => (
                    <span
                      key={index}
                      className="flex items-center space-x-1 px-3 py-1 bg-muted text-muted-foreground text-sm rounded-md"
                    >
                      <span>{req}</span>
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="text-muted-foreground hover:text-error"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-card-foreground">Benefits & Perks</h3>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentBenefit}
                  onChange={(e) => setCurrentBenefit(e?.target?.value)}
                  placeholder="Add a benefit (e.g., Health insurance, Remote work)"
                  className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyPress={(e) => e?.key === 'Enter' && (e?.preventDefault(), addBenefit())}
                />
                <Button type="button" variant="outline" onClick={addBenefit}>
                  Add
                </Button>
              </div>
              
              {formData?.benefits?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData?.benefits?.map((benefit, index) => (
                    <span
                      key={index}
                      className="flex items-center space-x-1 px-3 py-1 bg-success/10 text-success text-sm rounded-md"
                    >
                      <span>{benefit}</span>
                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className="text-success hover:text-error"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Application Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-card-foreground">Application Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Contact Email"
                  type="email"
                  placeholder="hr@company.com"
                  value={formData?.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e?.target?.value)}
                />
                
                <Input
                  label="Application URL (Optional)"
                  type="url"
                  placeholder="https://company.com/careers/job-id"
                  value={formData?.applicationUrl}
                  onChange={(e) => handleInputChange('applicationUrl', e?.target?.value)}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Share Opportunity
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpportunityCreationModal;