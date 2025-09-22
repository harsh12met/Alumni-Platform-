import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const CompanyProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: "TechCorp Solutions",
    industry: "Software Development",
    size: "500-1000 employees",
    location: "San Francisco, CA",
    website: "https://techcorp.com",
    description: "Leading technology company specializing in enterprise software solutions and digital transformation services.",
    culture: "Innovation-driven culture with focus on work-life balance, continuous learning, and collaborative teamwork.",
    benefits: "Comprehensive health insurance, 401k matching, flexible work arrangements, professional development budget, and unlimited PTO.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save company data logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data logic here
  };

  const handleInputChange = (field, value) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Building2" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Company Profile</h3>
            <p className="text-sm text-muted-foreground">Manage your organization information</p>
          </div>
        </div>
        <Button
          variant={isEditing ? "outline" : "default"}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          iconName={isEditing ? "X" : "Edit"}
          iconPosition="left"
          iconSize={16}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>
      {isEditing ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <Image
                src={companyData?.logo}
                alt="Company Logo"
                className="w-20 h-20 rounded-lg object-cover border border-border"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 w-6 h-6 bg-background border border-border rounded-full"
              >
                <Icon name="Camera" size={12} />
              </Button>
            </div>
            <div className="flex-1">
              <Input
                label="Company Name"
                value={companyData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                placeholder="Enter company name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Industry"
              value={companyData?.industry}
              onChange={(e) => handleInputChange('industry', e?.target?.value)}
              placeholder="e.g., Software Development"
            />
            <Input
              label="Company Size"
              value={companyData?.size}
              onChange={(e) => handleInputChange('size', e?.target?.value)}
              placeholder="e.g., 100-500 employees"
            />
            <Input
              label="Location"
              value={companyData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              placeholder="City, State/Country"
            />
            <Input
              label="Website"
              type="url"
              value={companyData?.website}
              onChange={(e) => handleInputChange('website', e?.target?.value)}
              placeholder="https://company.com"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Company Description
              </label>
              <textarea
                value={companyData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={3}
                placeholder="Brief description of your company..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Company Culture
              </label>
              <textarea
                value={companyData?.culture}
                onChange={(e) => handleInputChange('culture', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={3}
                placeholder="Describe your company culture..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Benefits & Perks
              </label>
              <textarea
                value={companyData?.benefits}
                onChange={(e) => handleInputChange('benefits', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={3}
                placeholder="List your company benefits and perks..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Image
              src={companyData?.logo}
              alt="Company Logo"
              className="w-20 h-20 rounded-lg object-cover border border-border"
            />
            <div>
              <h4 className="text-xl font-semibold text-card-foreground">{companyData?.name}</h4>
              <p className="text-muted-foreground">{companyData?.industry}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{companyData?.size}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{companyData?.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Globe" size={14} />
                  <a href={companyData?.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Website
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <h5 className="font-medium text-card-foreground mb-2">About Company</h5>
              <p className="text-muted-foreground text-sm leading-relaxed">{companyData?.description}</p>
            </div>

            <div>
              <h5 className="font-medium text-card-foreground mb-2">Company Culture</h5>
              <p className="text-muted-foreground text-sm leading-relaxed">{companyData?.culture}</p>
            </div>

            <div>
              <h5 className="font-medium text-card-foreground mb-2">Benefits & Perks</h5>
              <p className="text-muted-foreground text-sm leading-relaxed">{companyData?.benefits}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfileCard;