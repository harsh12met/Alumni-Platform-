import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AlumniFacultyConnect = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'alumni', label: 'Alumni' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'mentor', label: 'Mentors' }
  ];

  const industryOptions = [
    { value: 'all', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'startup', label: 'Startups' }
  ];

  const yearOptions = [
    { value: 'all', label: 'All Years' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: 'older', label: 'Before 2020' }
  ];

  const people = [
    {
      id: 1,
      name: 'Priya Kulkarni',
      type: 'alumni',
      title: 'Senior Software Engineer',
      company: 'Google',
      graduationYear: '2020',
      major: 'Computer Science',
      industry: 'technology',
      location: 'San Francisco, CA',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Passionate about building scalable systems and mentoring the next generation of engineers.',
      skills: ['JavaScript', 'Python', 'React', 'Machine Learning'],
      achievements: ['Tech Lead at Google', 'Published Research Papers', 'Conference Speaker'],
      mentorshipAreas: ['Software Development', 'Career Guidance', 'Technical Interviews'],
      availability: 'Available for mentorship',
      responseRate: '95%',
      rating: 4.9,
      reviews: 45,
      connections: 234,
      isConnected: false,
      isMentor: true,
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Deshmukh',
      type: 'faculty',
      title: 'Professor of Computer Science',
      company: 'University Department',
      graduationYear: null,
      major: 'Computer Science',
      industry: 'education',
      location: 'University Campus',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Research focus on AI/ML with 15+ years of academic and industry experience.',
      skills: ['Machine Learning', 'Data Science', 'Research', 'Academic Writing'],
      achievements: ['PhD from MIT', '50+ Publications', 'Research Grant Winner'],
      mentorshipAreas: ['Research Guidance', 'PhD Applications', 'Academic Career'],
      availability: 'Limited availability',
      responseRate: '88%',
      rating: 4.8,
      reviews: 67,
      connections: 156,
      isConnected: true,
      isMentor: true,
      linkedin: 'https://linkedin.com/in/michaelchen',
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      type: 'alumni',
      title: 'Product Manager',
      company: 'Microsoft',
      graduationYear: '2019',
      major: 'Information Technology',
      industry: 'technology',
      location: 'Seattle, WA',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Product leader passionate about user experience and innovation in tech products.',
      skills: ['Product Management', 'User Experience', 'Analytics', 'Strategy'],
      achievements: ['PM at Microsoft', 'Product Launch Success', 'Team Leadership'],
      mentorshipAreas: ['Product Management', 'Career Transition', 'Leadership'],
      availability: 'Available for mentorship',
      responseRate: '92%',
      rating: 4.7,
      reviews: 32,
      connections: 189,
      isConnected: false,
      isMentor: true,
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      lastActive: '3 hours ago'
    },
    {
      id: 4,
      name: 'Arjun Patil',
      type: 'alumni',
      title: 'Startup Founder & CEO',
      company: 'TechStart Inc.',
      graduationYear: '2018',
      major: 'Business Administration',
      industry: 'startup',
      location: 'New York, NY',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Serial entrepreneur with multiple successful exits. Love helping students turn ideas into reality.',
      skills: ['Entrepreneurship', 'Business Strategy', 'Fundraising', 'Team Building'],
      achievements: ['2 Successful Exits', '₹75 Cr+ Raised', 'Forbes 30 Under 30'],
      mentorshipAreas: ['Entrepreneurship', 'Startup Strategy', 'Fundraising'],
      availability: 'Available for mentorship',
      responseRate: '87%',
      rating: 4.9,
      reviews: 28,
      connections: 312,
      isConnected: false,
      isMentor: true,
      linkedin: 'https://linkedin.com/in/davidkim',
      lastActive: '5 hours ago'
    },
    {
      id: 5,
      name: 'Prof. Kavita Joshi',
      type: 'faculty',
      title: 'Associate Professor',
      company: 'Electronics Department',
      graduationYear: null,
      major: 'Electronics Engineering',
      industry: 'education',
      location: 'University Campus',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Specializing in IoT and embedded systems research with industry collaboration.',
      skills: ['IoT', 'Embedded Systems', 'Hardware Design', 'Research'],
      achievements: ['IEEE Fellow', 'Patent Holder', 'Industry Collaboration'],
      mentorshipAreas: ['Research Projects', 'Hardware Development', 'Academic Publications'],
      availability: 'Available for mentorship',
      responseRate: '90%',
      rating: 4.6,
      reviews: 23,
      connections: 98,
      isConnected: false,
      isMentor: true,
      linkedin: 'https://linkedin.com/in/lisazhang',
      lastActive: '1 day ago'
    },
    {
      id: 6,
      name: 'Raj Patel',
      type: 'alumni',
      title: 'Investment Analyst',
      company: 'Goldman Sachs',
      graduationYear: '2021',
      major: 'Finance',
      industry: 'finance',
      location: 'Mumbai, India',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Finance professional with expertise in investment banking and market analysis.',
      skills: ['Investment Banking', 'Financial Analysis', 'Market Research', 'Excel'],
      achievements: ['Top Performer', 'CFA Charterholder', 'Deal Closure Record'],
      mentorshipAreas: ['Finance Career', 'Investment Banking', 'CFA Preparation'],
      availability: 'Limited availability',
      responseRate: '85%',
      rating: 4.5,
      reviews: 19,
      connections: 167,
      isConnected: true,
      isMentor: true,
      linkedin: 'https://linkedin.com/in/rajpatel',
      lastActive: '6 hours ago'
    }
  ];

  const myConnections = people.filter(person => person.isConnected);
  const mentorshipRequests = [
    {
      id: 1,
      mentorName: 'Sarah Johnson',
      area: 'Technical Interviews',
      status: 'pending',
      requestDate: '2025-09-20',
      message: 'Hi Sarah, I would love to get guidance on technical interviews for software engineering roles.'
    },
    {
      id: 2,
      mentorName: 'Dr. Michael Chen',
      area: 'Research Guidance',
      status: 'accepted',
      requestDate: '2025-09-18',
      message: 'Looking for guidance on machine learning research projects.'
    }
  ];

  const filteredPeople = people.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'all' || person.type === selectedType || 
                       (selectedType === 'mentor' && person.isMentor);
    const matchesIndustry = selectedIndustry === 'all' || person.industry === selectedIndustry;
    const matchesYear = selectedYear === 'all' || person.graduationYear === selectedYear ||
                       (selectedYear === 'older' && person.graduationYear && parseInt(person.graduationYear) < 2020);
    
    return matchesSearch && matchesType && matchesIndustry && matchesYear;
  });

  const handleConnect = (personId) => {
    console.log('Connecting with person:', personId);
    // Implement connection logic
  };

  const handleMessage = (personId) => {
    console.log('Messaging person:', personId);
    // Implement messaging logic
  };

  const handleRequestMentorship = (personId) => {
    console.log('Requesting mentorship from:', personId);
    // Implement mentorship request logic
  };

  const tabs = [
    { id: 'discover', label: 'Discover People', count: people.length },
    { id: 'connections', label: 'My Connections', count: myConnections.length },
    { id: 'mentorship', label: 'Mentorship', count: mentorshipRequests.length }
  ];

  const renderDiscoverTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Input
              type="search"
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <Select
              value={selectedType}
              onChange={setSelectedType}
              options={typeOptions}
            />
          </div>
          <div>
            <Select
              value={selectedIndustry}
              onChange={setSelectedIndustry}
              options={industryOptions}
            />
          </div>
          <div>
            <Select
              value={selectedYear}
              onChange={setSelectedYear}
              options={yearOptions}
            />
          </div>
        </div>
      </div>

      {/* People Grid */}
      {filteredPeople.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeople.map((person) => (
            <div key={person.id} className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <Avatar
                    name={person.name}
                    src={person.profileImage}
                    size="lg"
                  />
                  {person.isConnected && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground truncate">{person.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{person.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{person.company}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={14} />
                  <span>{person.location}</span>
                </div>
                {person.graduationYear && (
                  <div className="flex items-center space-x-2">
                    <Icon name="GraduationCap" size={14} />
                    <span>Class of {person.graduationYear}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={14} />
                  <span>{person.connections} connections</span>
                </div>
                {person.isMentor && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={14} className="text-yellow-500" />
                    <span>{person.rating} ({person.reviews} reviews)</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{person.bio}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {person.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {skill}
                  </span>
                ))}
                {person.skills.length > 3 && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    +{person.skills.length - 3} more
                  </span>
                )}
              </div>

              {person.isMentor && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Award" size={14} className="text-green-600" />
                    <span className="text-sm font-medium text-green-800">Available for Mentorship</span>
                  </div>
                  <p className="text-xs text-green-700">{person.mentorshipAreas.join(', ')}</p>
                </div>
              )}

              <div className="flex space-x-2">
                {person.isConnected ? (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleMessage(person.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Icon name="MessageCircle" size={14} className="mr-2" />
                      Message
                    </Button>
                    {person.isMentor && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRequestMentorship(person.id)}
                        className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                      >
                        <Icon name="Award" size={14} />
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleConnect(person.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Icon name="UserPlus" size={14} className="mr-2" />
                      Connect
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No people found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria to find more people.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedIndustry('all');
              setSelectedYear('all');
            }}
            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );

  const renderConnectionsTab = () => (
    <div className="space-y-4">
      {myConnections.length > 0 ? (
        myConnections.map((person) => (
          <div key={person.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-4">
              <Avatar
                name={person.name}
                src={person.profileImage}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-card-foreground">{person.name}</h3>
                <p className="text-sm text-muted-foreground">{person.title} at {person.company}</p>
                <p className="text-xs text-muted-foreground">Last active {person.lastActive}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMessage(person.id)}
                  className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                >
                  <Icon name="MessageCircle" size={14} className="mr-2" />
                  Message
                </Button>
                {person.isMentor && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRequestMentorship(person.id)}
                    className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                  >
                    <Icon name="Award" size={14} className="mr-2" />
                    Request Mentorship
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No connections yet</h3>
          <p className="text-muted-foreground mb-4">
            Start connecting with alumni and faculty to build your professional network.
          </p>
          <Button
            variant="outline"
            onClick={() => setActiveTab('discover')}
            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
          >
            Discover People
          </Button>
        </div>
      )}
    </div>
  );

  const renderMentorshipTab = () => (
    <div className="space-y-6">
      {/* Mentorship Requests */}
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">My Mentorship Requests</h3>
        {mentorshipRequests.length > 0 ? (
          <div className="space-y-4">
            {mentorshipRequests.map((request) => (
              <div key={request.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-card-foreground">{request.mentorName}</h4>
                    <p className="text-sm text-muted-foreground">Area: {request.area}</p>
                    <p className="text-sm text-muted-foreground mt-2">{request.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Requested on {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    request.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {request.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Icon name="Award" size={32} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No mentorship requests yet</p>
          </div>
        )}
      </div>

      {/* Available Mentors */}
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Available Mentors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {people.filter(person => person.isMentor && !person.isConnected).slice(0, 4).map((mentor) => (
            <div key={mentor.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar
                  name={mentor.name}
                  src={mentor.profileImage}
                  size="sm"
                />
                <div>
                  <h4 className="font-medium text-card-foreground">{mentor.name}</h4>
                  <p className="text-sm text-muted-foreground">{mentor.title}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Mentorship Areas: {mentor.mentorshipAreas.join(', ')}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Star" size={12} className="text-yellow-500" />
                  <span>{mentor.rating}</span>
                  <span>•</span>
                  <span>{mentor.responseRate} response</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRequestMentorship(mentor.id)}
                  className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 text-xs"
                >
                  Request
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Alumni/Faculty Connect</h2>
          <p className="text-muted-foreground">Build your professional network and find mentors</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700"
          >
            <Icon name="MessageSquare" size={16} className="mr-2" />
            Messages
          </Button>
          <Button
            variant="outline"
            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
          >
            <Icon name="Calendar" size={16} className="mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Tabs */}
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
            <span>{tab.label}</span>
            <span className="bg-muted-foreground/20 text-xs px-1.5 py-0.5 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'discover' && renderDiscoverTab()}
      {activeTab === 'connections' && renderConnectionsTab()}
      {activeTab === 'mentorship' && renderMentorshipTab()}
    </div>
  );
};

export default AlumniFacultyConnect;