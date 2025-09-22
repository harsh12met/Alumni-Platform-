import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MentorshipModule = () => {
  const [activeTab, setActiveTab] = useState('mentoring');

  const mentorshipData = {
    mentoring: [
      {
        id: 1,
        name: "Alex Thompson",
        year: "Final Year",
        major: "Computer Science",
        interests: ["Web Development", "Machine Learning", "Startups"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        matchScore: 95,
        status: "active",
        sessionCount: 8,
        nextSession: "2025-01-18T14:00:00",
        goals: "Seeking guidance on career transition from academia to industry, particularly in AI/ML roles."
      },
      {
        id: 2,
        name: "Maria Garcia",
        year: "Third Year",
        major: "Business Administration",
        interests: ["Product Management", "Marketing", "Entrepreneurship"],
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        matchScore: 88,
        status: "active",
        sessionCount: 5,
        nextSession: "2025-01-20T16:30:00",
        goals: "Looking to understand product management career path and build relevant skills."
      },
      {
        id: 3,
        name: "David Kim",
        year: "Second Year",
        major: "Computer Science",
        interests: ["Software Engineering", "Open Source", "Tech Leadership"],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        matchScore: 92,
        status: "pending",
        sessionCount: 0,
        nextSession: null,
        goals: "Wants to learn about software engineering best practices and career growth."
      }
    ],
    requests: [
      {
        id: 4,
        name: "Jennifer Lee",
        year: "Final Year",
        major: "Data Science",
        interests: ["Data Analytics", "Business Intelligence", "Consulting"],
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
        matchScore: 90,
        requestDate: "2025-01-15",
        message: "Hi Sarah! I\'m really interested in transitioning into tech consulting after graduation. I\'d love to learn from your experience at TechCorp and get advice on breaking into the consulting space."
      },
      {
        id: 5,
        name: "Robert Chen",
        year: "Third Year",
        major: "Computer Engineering",
        interests: ["Cloud Computing", "DevOps", "System Architecture"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        matchScore: 85,
        requestDate: "2025-01-14",
        message: "Hello! I\'m very interested in cloud technologies and would appreciate guidance on building a career in this field. Your background seems perfect for what I\'m looking to achieve."
      }
    ]
  };

  const tabs = [
    { id: 'mentoring', label: 'Currently Mentoring', count: mentorshipData?.mentoring?.length },
    { id: 'requests', label: 'New Requests', count: mentorshipData?.requests?.length },
    { id: 'profile', label: 'Mentor Profile', count: null }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatNextSession = (dateString) => {
    if (!dateString) return 'No session scheduled';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleAcceptRequest = (requestId) => {
    console.log('Accept mentorship request:', requestId);
  };

  const handleDeclineRequest = (requestId) => {
    console.log('Decline mentorship request:', requestId);
  };

  const handleScheduleSession = (menteeId) => {
    console.log('Schedule session with:', menteeId);
  };

  const handleMessageMentee = (menteeId) => {
    console.log('Message mentee:', menteeId);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-card-foreground flex items-center space-x-2">
            <Icon name="UserCheck" size={18} />
            <span>Mentorship Program</span>
          </h3>
          <Button variant="default" size="sm" iconName="Settings" iconPosition="left" className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-3 py-1">
            Manage Availability
          </Button>
        </div>

        <div className="flex flex-wrap gap-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <span>{tab?.label}</span>
              {tab?.count !== null && (
                <span className={`text-xs px-1 py-0.5 rounded-full ${
                  activeTab === tab?.id ? 'bg-blue-500 text-white' : 'bg-muted-foreground/20'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {activeTab === 'mentoring' && (
          <div className="space-y-4">
            {mentorshipData?.mentoring?.length > 0 ? (
              mentorshipData?.mentoring?.map((mentee) => (
                <div key={mentee?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={mentee?.avatar}
                        alt={mentee?.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-card-foreground">{mentee?.name}</h4>
                        <p className="text-muted-foreground">{mentee?.year} • {mentee?.major}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mentee?.status)}`}>
                            {mentee?.status?.charAt(0)?.toUpperCase() + mentee?.status?.slice(1)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {mentee?.matchScore}% match
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Sessions completed</div>
                      <div className="text-lg font-semibold text-card-foreground">{mentee?.sessionCount}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-card-foreground mb-2">Interests & Goals:</h5>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {mentee?.interests?.map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{mentee?.goals}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      Next session: {formatNextSession(mentee?.nextSession)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="MessageCircle"
                        onClick={() => handleMessageMentee(mentee?.id)}
                      >
                        Message
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Calendar"
                        onClick={() => handleScheduleSession(mentee?.id)}
                      >
                        Schedule Session
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Icon name="UserCheck" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No active mentorships</p>
                <Button variant="outline" size="sm" className="mt-4 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 font-medium">
                  Find Students to Mentor
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-6">
            {mentorshipData?.requests?.length > 0 ? (
              mentorshipData?.requests?.map((request) => (
                <div key={request?.id} className="border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={request?.avatar}
                        alt={request?.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-card-foreground">{request?.name}</h4>
                        <p className="text-muted-foreground">{request?.year} • {request?.major}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {request?.matchScore}% match
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Requested on {new Date(request.requestDate)?.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-card-foreground mb-2">Interests:</h5>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {request?.interests?.map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <h6 className="text-sm font-medium text-card-foreground mb-1">Message:</h6>
                      <p className="text-sm text-muted-foreground">{request?.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeclineRequest(request?.id)}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleAcceptRequest(request?.id)}
                    >
                      Accept Request
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No new mentorship requests</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <h4 className="font-semibold text-card-foreground mb-4">Mentor Profile Settings</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    Areas of Expertise
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Software Engineering", "Product Management", "Career Development", "Leadership", "Startups"]?.map((area, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-md cursor-pointer hover:bg-primary/20"
                      >
                        {area} ×
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    Availability
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="weekdays" className="rounded" defaultChecked />
                      <label htmlFor="weekdays" className="text-sm text-muted-foreground">Weekdays</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="weekends" className="rounded" />
                      <label htmlFor="weekends" className="text-sm text-muted-foreground">Weekends</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="evenings" className="rounded" defaultChecked />
                      <label htmlFor="evenings" className="text-sm text-muted-foreground">Evenings</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="mornings" className="rounded" />
                      <label htmlFor="mornings" className="text-sm text-muted-foreground">Mornings</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    Maximum Mentees
                  </label>
                  <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="1">1 mentee</option>
                    <option value="2">2 mentees</option>
                    <option value="3" selected>3 mentees</option>
                    <option value="5">5 mentees</option>
                  </select>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <Button variant="outline" size="sm" className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 font-medium">
                    Cancel
                  </Button>
                  <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white font-medium">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorshipModule;