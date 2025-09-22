import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "2001-03-15",
    address: "123 University Ave, College Town, ST 12345",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    
    // Academic Information
    studentId: "CS2021001",
    program: "Bachelor of Technology",
    major: "Computer Science",
    year: "Final Year (4th)",
    semester: "8th Semester",
    gpa: "8.7",
    expectedGraduation: "2025-05-15",
    advisor: "Dr. Sarah Wilson",
    
    // Professional Information
    skills: ["JavaScript", "Python", "React", "Node.js", "Machine Learning", "Data Structures"],
    interests: ["Web Development", "Artificial Intelligence", "Open Source", "Competitive Programming"],
    resume: "alex_johnson_resume.pdf",
    portfolio: "https://alexjohnson.dev",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson"
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data logic here
    console.log('Saving profile data:', profileData);
  };

  const handleAddSkill = (skill) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData(prev => ({ 
        ...prev, 
        skills: [...prev.skills, skill] 
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData(prev => ({ 
      ...prev, 
      skills: prev.skills.filter(skill => skill !== skillToRemove) 
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'academic', label: 'Academic Info', icon: 'GraduationCap' },
    { id: 'professional', label: 'Professional', icon: 'Briefcase' }
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Image
            src={profileData.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
          />
          {isEditing && (
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Icon name="Camera" size={16} />
            </button>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">
            {profileData.firstName} {profileData.lastName}
          </h3>
          <p className="text-muted-foreground">Student ID: {profileData.studentId}</p>
          <p className="text-muted-foreground">{profileData.program} - {profileData.major}</p>
        </div>
      </div>

      {/* Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">First Name</label>
          {isEditing ? (
            <Input
              value={profileData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="First Name"
            />
          ) : (
            <p className="text-muted-foreground">{profileData.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Last Name</label>
          {isEditing ? (
            <Input
              value={profileData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Last Name"
            />
          ) : (
            <p className="text-muted-foreground">{profileData.lastName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Email</label>
          {isEditing ? (
            <Input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Email Address"
            />
          ) : (
            <p className="text-muted-foreground">{profileData.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Phone</label>
          {isEditing ? (
            <Input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Phone Number"
            />
          ) : (
            <p className="text-muted-foreground">{profileData.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Date of Birth</label>
          {isEditing ? (
            <Input
              type="date"
              value={profileData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            />
          ) : (
            <p className="text-muted-foreground">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-card-foreground mb-2">Address</label>
          {isEditing ? (
            <Input
              value={profileData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Complete Address"
            />
          ) : (
            <p className="text-muted-foreground">{profileData.address}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Student ID</label>
          <p className="text-muted-foreground">{profileData.studentId}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Program</label>
          {isEditing ? (
            <Select
              value={profileData.program}
              onChange={(value) => handleInputChange('program', value)}
              options={[
                { value: 'Bachelor of Technology', label: 'Bachelor of Technology' },
                { value: 'Bachelor of Science', label: 'Bachelor of Science' },
                { value: 'Master of Technology', label: 'Master of Technology' },
                { value: 'Master of Science', label: 'Master of Science' }
              ]}
            />
          ) : (
            <p className="text-muted-foreground">{profileData.program}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Major</label>
          {isEditing ? (
            <Select
              value={profileData.major}
              onChange={(value) => handleInputChange('major', value)}
              options={[
                { value: 'Computer Science', label: 'Computer Science' },
                { value: 'Information Technology', label: 'Information Technology' },
                { value: 'Electronics Engineering', label: 'Electronics Engineering' },
                { value: 'Mechanical Engineering', label: 'Mechanical Engineering' }
              ]}
            />
          ) : (
            <p className="text-muted-foreground">{profileData.major}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Academic Year</label>
          {isEditing ? (
            <Select
              value={profileData.year}
              onChange={(value) => handleInputChange('year', value)}
              options={[
                { value: 'First Year (1st)', label: 'First Year (1st)' },
                { value: 'Second Year (2nd)', label: 'Second Year (2nd)' },
                { value: 'Third Year (3rd)', label: 'Third Year (3rd)' },
                { value: 'Final Year (4th)', label: 'Final Year (4th)' }
              ]}
            />
          ) : (
            <p className="text-muted-foreground">{profileData.year}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Current Semester</label>
          {isEditing ? (
            <Input
              value={profileData.semester}
              onChange={(e) => handleInputChange('semester', e.target.value)}
              placeholder="Current Semester"
            />
          ) : (
            <p className="text-muted-foreground">{profileData.semester}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Current GPA</label>
          {isEditing ? (
            <Input
              type="number"
              step="0.1"
              max="10"
              value={profileData.gpa}
              onChange={(e) => handleInputChange('gpa', e.target.value)}
              placeholder="GPA"
            />
          ) : (
            <p className="text-muted-foreground">{profileData.gpa} / 10.0</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Expected Graduation</label>
          {isEditing ? (
            <Input
              type="date"
              value={profileData.expectedGraduation}
              onChange={(e) => handleInputChange('expectedGraduation', e.target.value)}
            />
          ) : (
            <p className="text-muted-foreground">{new Date(profileData.expectedGraduation).toLocaleDateString()}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Academic Advisor</label>
          {isEditing ? (
            <Input
              value={profileData.advisor}
              onChange={(e) => handleInputChange('advisor', e.target.value)}
              placeholder="Academic Advisor"
            />
          ) : (
            <p className="text-muted-foreground">{profileData.advisor}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2">Skills</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {profileData.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
            >
              <span>{skill}</span>
              {isEditing && (
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Icon name="X" size={14} />
                </button>
              )}
            </span>
          ))}
        </div>
        {isEditing && (
          <div className="flex space-x-2">
            <Input
              placeholder="Add a new skill"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddSkill(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <Button
              variant="outline"
              onClick={(e) => {
                const input = e.target.parentElement.querySelector('input');
                handleAddSkill(input.value);
                input.value = '';
              }}
            >
              Add
            </Button>
          </div>
        )}
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2">Interests</label>
        <div className="flex flex-wrap gap-2">
          {profileData.interests.map((interest, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Professional Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Portfolio Website</label>
          {isEditing ? (
            <Input
              type="url"
              value={profileData.portfolio}
              onChange={(e) => handleInputChange('portfolio', e.target.value)}
              placeholder="Portfolio URL"
            />
          ) : (
            <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {profileData.portfolio}
            </a>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">LinkedIn Profile</label>
          {isEditing ? (
            <Input
              type="url"
              value={profileData.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              placeholder="LinkedIn URL"
            />
          ) : (
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {profileData.linkedin}
            </a>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">GitHub Profile</label>
          {isEditing ? (
            <Input
              type="url"
              value={profileData.github}
              onChange={(e) => handleInputChange('github', e.target.value)}
              placeholder="GitHub URL"
            />
          ) : (
            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {profileData.github}
            </a>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Resume</label>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">{profileData.resume}</span>
            {isEditing && (
              <Button variant="outline" size="sm">
                <Icon name="Upload" size={16} className="mr-2" />
                Upload New
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Profile Management</h2>
          <p className="text-muted-foreground">Manage your personal, academic, and professional information</p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="default"
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Icon name="Check" size={16} className="mr-2" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
              >
                <Icon name="X" size={16} className="mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Icon name="Edit" size={16} className="mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        {activeTab === 'personal' && renderPersonalInfo()}
        {activeTab === 'academic' && renderAcademicInfo()}
        {activeTab === 'professional' && renderProfessionalInfo()}
      </div>
    </div>
  );
};

export default ProfileManagement;