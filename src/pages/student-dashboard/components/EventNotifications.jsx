import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EventNotifications = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'seminar', label: 'Seminars' },
    { value: 'hackathon', label: 'Hackathons' },
    { value: 'conference', label: 'Conferences' },
    { value: 'competition', label: 'Competitions' },
    { value: 'networking', label: 'Networking' }
  ];

  const modeOptions = [
    { value: 'all', label: 'All Modes' },
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const events = [
    {
      id: 1,
      title: 'AI/ML Workshop Series',
      category: 'workshop',
      mode: 'hybrid',
      date: '2025-09-25',
      time: '14:00',
      duration: '3 hours',
      location: 'Main Auditorium / Online',
      organizer: 'Computer Science Department',
      speaker: 'Dr. Rajesh Kumar - IIT Delhi',
      description: 'Comprehensive workshop covering machine learning fundamentals, neural networks, and practical applications using Python and TensorFlow.',
      registrationDeadline: '2025-09-23',
      maxParticipants: 100,
      currentRegistrations: 67,
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop',
      tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow'],
      requirements: ['Basic Python knowledge', 'Laptop required'],
      benefits: ['Certificate of participation', 'Hands-on coding experience', 'Networking opportunities'],
      status: 'open',
      isRegistered: false,
      rating: 4.8,
      reviews: 45
    },
    {
      id: 2,
      title: 'Tech Hackathon 2025',
      category: 'hackathon',
      mode: 'offline',
      date: '2025-10-01',
      time: '09:00',
      duration: '48 hours',
      location: 'Innovation Center',
      organizer: 'Student Technical Society',
      speaker: 'Multiple Industry Mentors',
      description: 'Annual 48-hour hackathon where students build innovative solutions to real-world problems. Teams of 2-4 members compete for exciting prizes.',
      registrationDeadline: '2025-09-28',
      maxParticipants: 200,
      currentRegistrations: 156,
      price: '₹500 per team',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=200&fit=crop',
      tags: ['Hackathon', 'Innovation', 'Coding', 'Team Building'],
      requirements: ['Team of 2-4 members', 'Laptop and development tools', 'Valid student ID'],
      benefits: ['Cash prizes up to ₹1,00,000', 'Industry mentorship', 'Job opportunities'],
      status: 'open',
      isRegistered: true,
      rating: 4.9,
      reviews: 123
    },
    {
      id: 3,
      title: 'Career Guidance Seminar',
      category: 'seminar',
      mode: 'online',
      date: '2025-10-05',
      time: '10:00',
      duration: '2 hours',
      location: 'Zoom Platform',
      organizer: 'Placement Cell',
      speaker: 'Industry HR Professionals',
      description: 'Interactive seminar covering resume building, interview preparation, and career planning strategies for final year students.',
      registrationDeadline: '2025-10-04',
      maxParticipants: 500,
      currentRegistrations: 234,
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      tags: ['Career', 'Resume', 'Interview', 'Placement'],
      requirements: ['Final year students preferred', 'Stable internet connection'],
      benefits: ['Resume review session', 'Mock interview opportunity', 'Industry insights'],
      status: 'open',
      isRegistered: false,
      rating: 4.6,
      reviews: 78
    },
    {
      id: 4,
      title: 'Blockchain Technology Conference',
      category: 'conference',
      mode: 'hybrid',
      date: '2025-10-12',
      time: '09:30',
      duration: '6 hours',
      location: 'Conference Hall A / Virtual',
      organizer: 'Department of Information Technology',
      speaker: 'Multiple Blockchain Experts',
      description: 'Full-day conference exploring blockchain technology, cryptocurrencies, smart contracts, and decentralized applications.',
      registrationDeadline: '2025-10-10',
      maxParticipants: 150,
      currentRegistrations: 89,
      price: '₹1,000 (₹500 for students)',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop',
      tags: ['Blockchain', 'Cryptocurrency', 'Smart Contracts', 'Technology'],
      requirements: ['Basic understanding of cryptography', 'Interest in blockchain technology'],
      benefits: ['Industry certification', 'Networking with experts', 'Latest technology insights'],
      status: 'open',
      isRegistered: false,
      rating: 4.7,
      reviews: 34
    },
    {
      id: 5,
      title: 'Competitive Programming Contest',
      category: 'competition',
      mode: 'online',
      date: '2025-09-30',
      time: '15:00',
      duration: '3 hours',
      location: 'Online Platform',
      organizer: 'Programming Club',
      speaker: 'Contest Coordinators',
      description: 'Monthly programming contest with algorithmic challenges. Test your coding skills against fellow students.',
      registrationDeadline: '2025-09-29',
      maxParticipants: 300,
      currentRegistrations: 178,
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=300&h=200&fit=crop',
      tags: ['Programming', 'Algorithms', 'Competition', 'Coding'],
      requirements: ['Strong programming skills', 'Familiarity with competitive programming'],
      benefits: ['Cash prizes', 'Rating points', 'Problem-solving skills'],
      status: 'open',
      isRegistered: true,
      rating: 4.5,
      reviews: 67
    },
    {
      id: 6,
      title: 'Alumni Networking Mixer',
      category: 'networking',
      mode: 'offline',
      date: '2025-10-15',
      time: '18:00',
      duration: '3 hours',
      location: 'Alumni Hall',
      organizer: 'Alumni Association',
      speaker: 'Distinguished Alumni',
      description: 'Exclusive networking event where current students can connect with successful alumni from various industries.',
      registrationDeadline: '2025-10-13',
      maxParticipants: 80,
      currentRegistrations: 45,
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&h=200&fit=crop',
      tags: ['Networking', 'Alumni', 'Career', 'Mentorship'],
      requirements: ['Professional attire', 'Updated resume', 'Final year or recent graduates'],
      benefits: ['Mentorship opportunities', 'Job referrals', 'Industry connections'],
      status: 'open',
      isRegistered: false,
      rating: 4.9,
      reviews: 23
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesTab = activeTab === 'upcoming' || 
                      (activeTab === 'registered' && event.isRegistered) ||
                      (activeTab === 'past' && new Date(event.date) < new Date());
    
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesMode = selectedMode === 'all' || event.mode === selectedMode;
    
    return matchesTab && matchesSearch && matchesCategory && matchesMode;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'workshop': return 'bg-blue-100 text-blue-700';
      case 'seminar': return 'bg-green-100 text-green-700';
      case 'hackathon': return 'bg-purple-100 text-purple-700';
      case 'conference': return 'bg-orange-100 text-orange-700';
      case 'competition': return 'bg-red-100 text-red-700';
      case 'networking': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'online': return 'Monitor';
      case 'offline': return 'MapPin';
      case 'hybrid': return 'Globe';
      default: return 'Calendar';
    }
  };

  const handleRegister = (eventId) => {
    console.log('Registering for event:', eventId);
    // Implement registration logic
  };

  const handleReminder = (eventId) => {
    console.log('Setting reminder for event:', eventId);
    // Implement reminder logic
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Events', count: events.filter(e => new Date(e.date) >= new Date()).length },
    { id: 'registered', label: 'My Registrations', count: events.filter(e => e.isRegistered).length },
    { id: 'past', label: 'Past Events', count: events.filter(e => new Date(e.date) < new Date()).length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Event Notifications</h2>
          <p className="text-muted-foreground">Stay updated with workshops, seminars, hackathons, and more</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700"
          >
            <Icon name="Bell" size={16} className="mr-2" />
            Notification Settings
          </Button>
          <Button
            variant="outline"
            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
          >
            <Icon name="Calendar" size={16} className="mr-2" />
            My Calendar
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

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Input
              type="search"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
            />
          </div>
          <div>
            <Select
              value={selectedMode}
              onChange={setSelectedMode}
              options={modeOptions}
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
            >
              <Icon name="Filter" size={16} className="mr-2" />
              Date Range
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedMode('all');
              }}
              className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{events.length}</div>
          <div className="text-sm text-muted-foreground">Total Events</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {events.filter(e => e.isRegistered).length}
          </div>
          <div className="text-sm text-muted-foreground">Registered</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {events.filter(e => e.category === 'workshop').length}
          </div>
          <div className="text-sm text-muted-foreground">Workshops</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {events.filter(e => e.category === 'hackathon').length}
          </div>
          <div className="text-sm text-muted-foreground">Hackathons</div>
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(event.category)}`}>
                      {event.category.toUpperCase()}
                    </span>
                    {event.isRegistered && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                        REGISTERED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icon name="Star" size={14} className="text-yellow-500" />
                    <span>{event.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{event.title}</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={14} />
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name={getModeIcon(event.mode)} size={14} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} />
                    <span>{event.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={14} />
                    <span>{event.speaker}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {event.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{event.currentRegistrations}/{event.maxParticipants} registered</span>
                  <span>Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-card-foreground">{event.price}</span>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReminder(event.id)}
                      className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
                    >
                      <Icon name="Bell" size={14} />
                    </Button>
                    {event.isRegistered ? (
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Icon name="Check" size={14} className="mr-2" />
                        Registered
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleRegister(event.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Icon name="Calendar" size={14} className="mr-2" />
                        Register
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or check back later for new events.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedMode('all');
            }}
            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventNotifications;