import React, { useState } from 'react';
import { Edit, Save, X, User, Mail, Phone, MapPin, Calendar, Book } from 'lucide-react';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@student.edu',
    phone: '+91 9876543210',
    batch: '2021-2025',
    course: 'Computer Science Engineering',
    location: 'New Delhi, India',
    bio: 'Passionate computer science student interested in web development and AI.',
    skills: ['JavaScript', 'React', 'Python', 'Node.js'],
    cgpa: '8.5'
  });

  const handleSave = () => {
    // TODO: Save to Firestore
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture and Basic Info */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-500 rounded-full mx-auto flex items-center justify-center mb-4">
                  <User className="w-16 h-16 text-white" />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="text-center text-xl font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full"
                  />
                ) : (
                  <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                )}
                <p className="text-gray-600 mt-1">{profile.course}</p>
                <p className="text-sm text-gray-500">Batch {profile.batch}</p>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Book className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">CGPA</p>
                    <p className="font-semibold text-gray-900">{profile.cgpa}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Academic Year</p>
                    <p className="font-semibold text-gray-900">Final Year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
                      />
                    ) : (
                      <span className="text-gray-700">{profile.email}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
                      />
                    ) : (
                      <span className="text-gray-700">{profile.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center md:col-span-2">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
                      />
                    ) : (
                      <span className="text-gray-700">{profile.location}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">About Me</h4>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                )}
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="px-3 py-1 border-2 border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:border-blue-300 hover:text-blue-600">
                      + Add Skill
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;