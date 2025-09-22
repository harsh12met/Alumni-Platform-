import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileOverviewCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    graduationYear: "2018",
    degree: "B.Tech Computer Science",
    location: "San Francisco, CA",
    connections: 247,
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data logic here
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm w-full overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-base font-semibold text-card-foreground flex items-center space-x-2">
          <Icon name="User" size={16} />
          <span>Profile Overview</span>
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          iconName={isEditing ? "X" : "Edit"}
          iconPosition="left"
          iconSize={14}
          className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 font-medium text-xs px-2 py-1 flex-shrink-0"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 min-w-0">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={profileData?.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
            />
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Icon name="Camera" size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-3 min-w-0">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={profileData?.name}
                  onChange={(e) => setProfileData({...profileData, name: e?.target?.value})}
                  className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={profileData?.title}
                  onChange={(e) => setProfileData({...profileData, title: e?.target?.value})}
                  className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  value={profileData?.company}
                  onChange={(e) => setProfileData({...profileData, company: e?.target?.value})}
                  className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Company"
                />
                <input
                  type="text"
                  value={profileData?.location}
                  onChange={(e) => setProfileData({...profileData, location: e?.target?.value})}
                  className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Location"
                />
              </div>
              <div className="flex space-x-3">
                <Button variant="default" size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white font-medium">
                  Save Changes
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 font-medium">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-lg font-bold text-card-foreground truncate">{profileData?.name}</h2>
                <p className="text-sm text-muted-foreground truncate">{profileData?.title} at {profileData?.company}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="GraduationCap" size={12} />
                  <span>Class of {profileData?.graduationYear}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="BookOpen" size={12} />
                  <span>{profileData?.degree}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} />
                  <span>{profileData?.location}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <div className="text-center">
                  <div className="text-base font-semibold text-card-foreground">{profileData?.connections}</div>
                  <div className="text-xs text-muted-foreground">Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-semibold text-card-foreground">12</div>
                  <div className="text-xs text-muted-foreground">Posts Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-semibold text-card-foreground">8</div>
                  <div className="text-xs text-muted-foreground">Events Attended</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverviewCard;