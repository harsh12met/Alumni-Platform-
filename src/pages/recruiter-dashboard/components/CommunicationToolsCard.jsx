import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const CommunicationToolsCard = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');

  const conversations = [
    {
      id: 1,
      candidateName: "Alex Chen",
      position: "Senior Software Engineer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "Thank you for the interview opportunity. I\'m very excited about this role.",
      timestamp: "2025-01-21 14:30",
      unread: true,
      status: "Interview Scheduled"
    },
    {
      id: 2,
      candidateName: "Maria Garcia",
      position: "Product Manager",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "I have a few questions about the role responsibilities.",
      timestamp: "2025-01-21 11:15",
      unread: false,
      status: "Under Review"
    },
    {
      id: 3,
      candidateName: "David Kim",
      position: "Data Science Intern",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      lastMessage: "When can we schedule the technical interview?",
      timestamp: "2025-01-20 16:45",
      unread: true,
      status: "Shortlisted"
    }
  ];

  const interviews = [
    {
      id: 1,
      candidateName: "Alex Chen",
      position: "Senior Software Engineer",
      date: "2025-01-25",
      time: "14:00",
      type: "Technical Interview",
      duration: "60 minutes",
      interviewer: "John Smith",
      status: "Scheduled",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      candidateName: "Maria Garcia",
      position: "Product Manager",
      date: "2025-01-24",
      time: "10:00",
      type: "Final Round",
      duration: "90 minutes",
      interviewer: "Sarah Johnson",
      status: "Scheduled",
      meetingLink: "https://meet.google.com/xyz-uvwx-yz",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      candidateName: "David Kim",
      position: "Data Science Intern",
      date: "2025-01-23",
      time: "15:30",
      type: "HR Interview",
      duration: "45 minutes",
      interviewer: "Mike Wilson",
      status: "Completed",
      meetingLink: "https://meet.google.com/def-ghij-klm",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg"
    }
  ];

  const candidateOptions = [
    { value: 'alex-chen', label: 'Alex Chen - Senior Software Engineer' },
    { value: 'maria-garcia', label: 'Maria Garcia - Product Manager' },
    { value: 'david-kim', label: 'David Kim - Data Science Intern' }
  ];

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (newMessage?.trim() && selectedCandidate) {
      console.log('Sending message:', { candidate: selectedCandidate, message: newMessage });
      setNewMessage('');
    }
  };

  const handleScheduleInterview = (candidateId) => {
    console.log('Scheduling interview for candidate:', candidateId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'text-primary bg-primary/10';
      case 'Completed': return 'text-success bg-success/10';
      case 'Cancelled': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const tabs = [
    { id: 'messages', label: 'Messages', icon: 'MessageSquare' },
    { id: 'interviews', label: 'Interviews', icon: 'Video' },
    { id: 'feedback', label: 'Feedback', icon: 'FileText' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-lg">
            <Icon name="MessageSquare" size={14} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">Communication Tools</h3>
            <p className="text-xs text-muted-foreground">Messages & interviews</p>
          </div>
        </div>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          iconSize={10}
          className="text-xs px-2 py-1"
        >
          New
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-3">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-1 px-1 py-1 rounded-md text-xs font-medium transition-colors ${
              activeTab === tab?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={10} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-2">
          <div className="p-2 bg-muted/30 rounded-lg border border-border">
            <h4 className="text-xs font-medium text-card-foreground mb-2">Send Message</h4>
            <form onSubmit={handleSendMessage} className="space-y-2">
              <Select
                label=""
                options={candidateOptions}
                value={selectedCandidate}
                onChange={setSelectedCandidate}
                placeholder="Choose candidate"
                className="text-xs"
                required
              />
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e?.target?.value)}
                className="w-full px-2 py-1 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent resize-none text-xs"
                rows={2}
                placeholder="Type message..."
                required
              />
              <div className="flex items-center justify-end space-x-1">
                <Button type="button" variant="outline" size="sm" className="text-xs px-2 py-1">
                  Draft
                </Button>
                <Button type="submit" variant="default" size="sm" className="text-xs px-2 py-1">
                  Send
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-medium text-card-foreground">Conversations</h4>
            {conversations?.slice(0, 3)?.map((conversation) => (
              <div key={conversation?.id} className="p-2 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-start space-x-2">
                  <Image
                    src={conversation?.avatar}
                    alt={conversation?.candidateName}
                    className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-xs font-medium text-card-foreground truncate">{conversation?.candidateName}</h5>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-1">
                        {new Date(conversation.timestamp)?.toLocaleString()?.split(',')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1 truncate">{conversation?.position}</p>
                    <p className={`text-xs ${conversation?.unread ? 'font-medium text-card-foreground' : 'text-muted-foreground'} line-clamp-2`}>
                      {conversation?.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`px-1 py-0.5 rounded text-xs font-medium ${getStatusColor(conversation?.status)}`}>
                        {conversation?.status}
                      </span>
                      {conversation?.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Interviews Tab */}
      {activeTab === 'interviews' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-card-foreground">Scheduled Interviews</h4>
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              iconSize={16}
            >
              Schedule New
            </Button>
          </div>

          {interviews?.map((interview) => (
            <div key={interview?.id} className="p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-start space-x-4">
                <Image
                  src={interview?.avatar}
                  alt={interview?.candidateName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-medium text-card-foreground">{interview?.candidateName}</h5>
                      <p className="text-sm text-muted-foreground">{interview?.position}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview?.status)}`}>
                      {interview?.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={14} />
                      <span>{new Date(interview.date)?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{interview?.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Timer" size={14} />
                      <span>{interview?.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="User" size={14} />
                      <span>{interview?.interviewer}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Video" size={14} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-card-foreground">{interview?.type}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {interview?.status === 'Scheduled' && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            iconName="Video"
                            iconPosition="left"
                            iconSize={14}
                          >
                            Join Meeting
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Calendar"
                            iconPosition="left"
                            iconSize={14}
                          >
                            Reschedule
                          </Button>
                        </>
                      )}
                      {interview?.status === 'Completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="FileText"
                          iconPosition="left"
                          iconSize={14}
                        >
                          View Feedback
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Meeting Link
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Feedback collection tools coming soon</p>
            <Button variant="outline" size="sm" className="mt-4">
              Create Feedback Form
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationToolsCard;