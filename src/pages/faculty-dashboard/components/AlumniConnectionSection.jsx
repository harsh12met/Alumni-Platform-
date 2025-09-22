import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ModuleContainer from '../../../components/ui/ModuleContainer';
import Avatar from '../../../components/ui/Avatar';

const AlumniConnectionSection = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [inviteForm, setInviteForm] = useState({
    alumniId: '',
    eventType: '',
    topic: '',
    date: '',
    duration: '',
    message: ''
  });

  const filterOptions = [
    { value: 'all', label: 'All Alumni' },
    { value: 'available', label: 'Available' },
    { value: 'industry-experts', label: 'Industry Experts' },
    { value: 'recent-graduates', label: 'Recent Graduates' }
  ];

  const eventTypes = [
    { value: 'guest-lecture', label: 'Guest Lecture' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'career-guidance', label: 'Career Guidance Session' },
    { value: 'industry-talk', label: 'Industry Talk' },
    { value: 'mentorship', label: 'Mentorship Program' }
  ];

  const alumni = [
    {
      id: 1,
      name: 'Sarah Johnson',
      graduationYear: 2018,
      degree: 'B.Tech Computer Science',
      currentPosition: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      expertise: ['Machine Learning', 'Cloud Computing', 'Software Architecture'],
      availability: 'available',
      rating: 4.9,
      sessionsCompleted: 12,
      lastActive: '2025-01-20',
      bio: 'Passionate about AI/ML and mentoring students. Available for guest lectures and career guidance sessions.',
      linkedIn: 'https://linkedin.com/in/sarahjohnson',
      email: 'sarah.johnson@gmail.com'
    },
    {
      id: 2,
      name: 'Michael Chen',
      graduationYear: 2020,
      degree: 'B.Tech Information Technology',
      currentPosition: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      expertise: ['Product Management', 'Agile Development', 'User Experience'],
      availability: 'available',
      rating: 4.7,
      sessionsCompleted: 8,
      lastActive: '2025-01-19',
      bio: 'Product management expert with experience in enterprise software. Love sharing insights about tech industry.',
      linkedIn: 'https://linkedin.com/in/michaelchen',
      email: 'michael.chen@outlook.com'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      graduationYear: 2019,
      degree: 'B.Tech Electronics',
      currentPosition: 'Hardware Engineer',
      company: 'Tesla',
      location: 'Austin, TX',
      expertise: ['Hardware Design', 'Embedded Systems', 'IoT'],
      availability: 'busy',
      rating: 4.8,
      sessionsCompleted: 15,
      lastActive: '2025-01-18',
      bio: 'Hardware engineering specialist working on cutting-edge automotive technology. Available for technical workshops.',
      linkedIn: 'https://linkedin.com/in/emilyrodriguez',
      email: 'emily.rodriguez@tesla.com'
    },
    {
      id: 4,
      name: 'David Kim',
      graduationYear: 2021,
      degree: 'B.Tech Computer Science',
      currentPosition: 'Data Scientist',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      expertise: ['Data Science', 'Analytics', 'Python', 'Machine Learning'],
      availability: 'available',
      rating: 4.6,
      sessionsCompleted: 5,
      lastActive: '2025-01-21',
      bio: 'Recent graduate working in data science. Eager to share experiences and help current students navigate their career paths.',
      linkedIn: 'https://linkedin.com/in/davidkim',
      email: 'david.kim@netflix.com'
    }
  ];

  const filteredAlumni = alumni?.filter(alumnus => {
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'available' && alumnus?.availability === 'available') ||
                         (selectedFilter === 'industry-experts' && alumnus?.sessionsCompleted >= 10) ||
                         (selectedFilter === 'recent-graduates' && alumnus?.graduationYear >= 2020);
    const matchesSearch = alumnus?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         alumnus?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         alumnus?.expertise?.some(skill => skill?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getAvailabilityColor = (availability) => {
    const colorMap = {
      'available': 'text-green-600',
      'busy': 'text-red-600',
      'limited': 'text-yellow-600'
    };
    return colorMap?.[availability] || 'text-gray-600';
  };

  const getAvailabilityBadgeColor = (availability) => {
    const colorMap = {
      'available': 'bg-green-100 text-green-800',
      'busy': 'bg-red-100 text-red-800',
      'limited': 'bg-yellow-100 text-yellow-800'
    };
    return colorMap?.[availability] || 'bg-gray-100 text-gray-800';
  };

  const handleInviteAlumni = (alumnus) => {
    setSelectedAlumni(alumnus);
    setInviteForm(prev => ({ ...prev, alumniId: alumnus?.id }));
    setShowInviteModal(true);
  };

  const handleSendInvite = (e) => {
    e?.preventDefault();
    console.log('Sending invite:', inviteForm);
    setShowInviteModal(false);
    setInviteForm({
      alumniId: '',
      eventType: '',
      topic: '',
      date: '',
      duration: '',
      message: ''
    });
    setSelectedAlumni(null);
  };

  return (
    <ModuleContainer
      title="Alumni Connections"
      description="Connect with alumni for guest lectures and industry insights"
      icon="Users"
      actions={
        <Button variant="outline" iconName="Search" iconPosition="left" className="bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700 font-medium">
          Browse All Alumni
        </Button>
      }
    >
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by name, company, or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={filterOptions}
            value={selectedFilter}
            onChange={setSelectedFilter}
            placeholder="Filter alumni"
          />
        </div>
      </div>
      {/* Alumni Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAlumni?.map((alumnus) => (
          <div key={alumnus?.id} className="bg-muted/30 rounded-lg p-6 hover:bg-muted/50 transition-colors">
            <div className="flex items-start space-x-4 mb-4">
              <Avatar 
                name={alumnus?.name}
                size="xl"
                className="flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground">{alumnus?.name}</h4>
                    <p className="text-sm text-muted-foreground">{alumnus?.currentPosition} at {alumnus?.company}</p>
                    <p className="text-sm text-muted-foreground">{alumnus?.degree} • Class of {alumnus?.graduationYear}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityBadgeColor(alumnus?.availability)}`}>
                    {alumnus?.availability?.charAt(0)?.toUpperCase() + alumnus?.availability?.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{alumnus?.bio}</p>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-sm font-medium text-card-foreground mb-2">Expertise:</h5>
              <div className="flex flex-wrap gap-2">
                {alumnus?.expertise?.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Icon name="Star" size={14} color="#f59e0b" />
                  <span className="text-sm font-semibold">{alumnus?.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold mb-1">{alumnus?.sessionsCompleted}</div>
                <p className="text-xs text-muted-foreground">Sessions</p>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold mb-1">{alumnus?.location}</div>
                <p className="text-xs text-muted-foreground">Location</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Linkedin" iconPosition="left" className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 font-medium">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm" iconName="Mail" iconPosition="left" className="bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 font-medium">
                  Email
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={alumnus?.availability === 'busy'}
                  onClick={() => handleInviteAlumni(alumnus)}
                  iconName="Calendar"
                  iconPosition="left"
                  className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 font-medium disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Invite
                </Button>
                <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left" className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 font-medium">
                  Message
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredAlumni?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No alumni found matching your criteria</p>
        </div>
      )}
      {/* Invite Modal */}
      {showInviteModal && selectedAlumni && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1003">
          <div className="bg-card rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Invite {selectedAlumni?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedAlumni?.currentPosition} at {selectedAlumni?.company}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowInviteModal(false)}
                className="bg-gray-50 hover:bg-gray-100 text-gray-700"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Event Type"
                  options={eventTypes}
                  value={inviteForm?.eventType}
                  onChange={(value) => setInviteForm(prev => ({ ...prev, eventType: value }))}
                  placeholder="Select event type"
                  required
                />

                <Input
                  label="Topic/Subject"
                  type="text"
                  placeholder="Enter topic or subject"
                  value={inviteForm?.topic}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, topic: e?.target?.value }))}
                  required
                />

                <Input
                  label="Preferred Date"
                  type="date"
                  value={inviteForm?.date}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, date: e?.target?.value }))}
                  required
                />

                <Input
                  label="Duration"
                  type="text"
                  placeholder="e.g., 1 hour, 2 hours"
                  value={inviteForm?.duration}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, duration: e?.target?.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Personal Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows="4"
                  placeholder="Add a personal message to your invitation..."
                  value={inviteForm?.message}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, message: e?.target?.value }))}
                />
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium text-card-foreground mb-2">Alumni Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAlumni?.expertise?.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowInviteModal(false)}
                  className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 font-medium"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-medium shadow-sm transition-all duration-200">
                  Send Invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModuleContainer>
  );
};

export default AlumniConnectionSection;