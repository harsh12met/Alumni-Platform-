import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ModuleContainer from '../../../components/ui/ModuleContainer';

const EventManagementSection = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    type: '',
    date: '',
    time: '',
    duration: '',
    venue: '',
    description: '',
    maxAttendees: ''
  });

  const eventTypes = [
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'guest-lecture', label: 'Guest Lecture' },
    { value: 'lab-session', label: 'Lab Session' },
    { value: 'conference', label: 'Conference' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' }
  ];

  const events = [
    {
      id: 1,
      title: 'Advanced Machine Learning Workshop',
      type: 'workshop',
      date: '2025-01-25',
      time: '10:00 AM',
      duration: '3 hours',
      venue: 'Computer Lab 1',
      description: 'Hands-on workshop covering advanced ML algorithms and practical implementations',
      maxAttendees: 30,
      registeredCount: 28,
      status: 'upcoming',
      speaker: 'Dr. Sarah Johnson',
      materials: ['Presentation.pptx', 'Code_Examples.zip']
    },
    {
      id: 2,
      title: 'Industry Trends in Software Development',
      type: 'guest-lecture',
      date: '2025-01-22',
      time: '2:00 PM',
      duration: '1.5 hours',
      venue: 'Auditorium A',
      description: 'Guest lecture by industry expert on current trends and future prospects',
      maxAttendees: 100,
      registeredCount: 85,
      status: 'upcoming',
      speaker: 'John Smith (Tech Lead, Google)',
      materials: []
    },
    {
      id: 3,
      title: 'Database Design Seminar',
      type: 'seminar',
      date: '2025-01-18',
      time: '11:00 AM',
      duration: '2 hours',
      venue: 'Conference Room B',
      description: 'Comprehensive seminar on modern database design principles and best practices',
      maxAttendees: 50,
      registeredCount: 42,
      status: 'completed',
      speaker: 'Prof. Michael Chen',
      materials: ['Seminar_Slides.pdf', 'Case_Studies.pdf']
    },
    {
      id: 4,
      title: 'React Development Lab',
      type: 'lab-session',
      date: '2025-01-21',
      time: '9:00 AM',
      duration: '4 hours',
      venue: 'Programming Lab 2',
      description: 'Intensive lab session on React development with practical projects',
      maxAttendees: 25,
      registeredCount: 25,
      status: 'ongoing',
      speaker: 'Dr. Emily Rodriguez',
      materials: ['Lab_Guide.pdf', 'Starter_Code.zip']
    }
  ];

  const filteredEvents = events?.filter(event => {
    if (selectedFilter === 'all') return true;
    return event?.status === selectedFilter;
  });

  const getEventTypeIcon = (type) => {
    const iconMap = {
      'workshop': 'Wrench',
      'seminar': 'Users',
      'guest-lecture': 'Mic',
      'lab-session': 'Monitor',
      'conference': 'Building'
    };
    return iconMap?.[type] || 'Calendar';
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'upcoming': 'text-blue-600',
      'ongoing': 'text-green-600',
      'completed': 'text-gray-600'
    };
    return colorMap?.[status] || 'text-gray-600';
  };

  const getStatusBadgeColor = (status) => {
    const colorMap = {
      'upcoming': 'bg-blue-100 text-blue-800',
      'ongoing': 'bg-green-100 text-green-800',
      'completed': 'bg-gray-100 text-gray-800'
    };
    return colorMap?.[status] || 'bg-gray-100 text-gray-800';
  };

  const handleCreateEvent = (e) => {
    e?.preventDefault();
    console.log('Creating event:', eventForm);
    setShowCreateModal(false);
    setEventForm({
      title: '',
      type: '',
      date: '',
      time: '',
      duration: '',
      venue: '',
      description: '',
      maxAttendees: ''
    });
  };

  return (
    <ModuleContainer
      title="Event Management"
      description="Create and manage workshops, seminars, and guest lectures"
      icon="Calendar"
      actions={
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-medium shadow-sm transition-all duration-200"
        >
          Create Event
        </Button>
      }
    >
      {/* Filter */}
      <div className="mb-6">
        <Select
          options={filterOptions}
          value={selectedFilter}
          onChange={setSelectedFilter}
          placeholder="Filter events"
          className="w-48"
        />
      </div>
      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents?.map((event) => (
          <div key={event?.id} className="bg-muted/30 rounded-lg p-6 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                  <Icon name={getEventTypeIcon(event?.type)} size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-card-foreground mb-1">{event?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{event?.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{new Date(event.date)?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{event?.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{event?.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(event?.status)}`}>
                  {event?.status?.charAt(0)?.toUpperCase() + event?.status?.slice(1)}
                </span>
                <Button variant="ghost" size="icon">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Users" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-medium">Attendance</span>
                </div>
                <p className="text-lg font-semibold">{event?.registeredCount}/{event?.maxAttendees}</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(event?.registeredCount / event?.maxAttendees) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-medium">Speaker</span>
                </div>
                <p className="text-sm font-medium">{event?.speaker}</p>
              </div>

              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Clock" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <p className="text-sm font-medium">{event?.duration}</p>
              </div>
            </div>

            {event?.materials?.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-card-foreground mb-2">Materials:</h5>
                <div className="flex flex-wrap gap-2">
                  {event?.materials?.map((material, index) => (
                    <div key={index} className="flex items-center space-x-1 bg-background rounded-md px-2 py-1 text-xs">
                      <Icon name="File" size={12} />
                      <span>{material}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Users" iconPosition="left" className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 font-medium">
                  View Attendees
                </Button>
                <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left" className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 font-medium">
                  Send Update
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Edit" iconPosition="left" className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-700 font-medium">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" iconName="Share" iconPosition="left" className="bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700 font-medium">
                  Share
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredEvents?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No events found for the selected filter</p>
        </div>
      )}
      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1003">
          <div className="bg-card rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create New Event</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-50 hover:bg-gray-100 text-gray-700"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Event Title"
                  type="text"
                  placeholder="Enter event title"
                  value={eventForm?.title}
                  onChange={(e) => setEventForm(prev => ({ ...prev, title: e?.target?.value }))}
                  required
                />

                <Select
                  label="Event Type"
                  options={eventTypes}
                  value={eventForm?.type}
                  onChange={(value) => setEventForm(prev => ({ ...prev, type: value }))}
                  placeholder="Select event type"
                  required
                />

                <Input
                  label="Date"
                  type="date"
                  value={eventForm?.date}
                  onChange={(e) => setEventForm(prev => ({ ...prev, date: e?.target?.value }))}
                  required
                />

                <Input
                  label="Time"
                  type="time"
                  value={eventForm?.time}
                  onChange={(e) => setEventForm(prev => ({ ...prev, time: e?.target?.value }))}
                  required
                />

                <Input
                  label="Duration"
                  type="text"
                  placeholder="e.g., 2 hours"
                  value={eventForm?.duration}
                  onChange={(e) => setEventForm(prev => ({ ...prev, duration: e?.target?.value }))}
                  required
                />

                <Input
                  label="Venue"
                  type="text"
                  placeholder="Enter venue"
                  value={eventForm?.venue}
                  onChange={(e) => setEventForm(prev => ({ ...prev, venue: e?.target?.value }))}
                  required
                />
              </div>

              <Input
                label="Description"
                type="text"
                placeholder="Brief description of the event"
                value={eventForm?.description}
                onChange={(e) => setEventForm(prev => ({ ...prev, description: e?.target?.value }))}
                required
              />

              <Input
                label="Maximum Attendees"
                type="number"
                placeholder="Enter maximum number of attendees"
                value={eventForm?.maxAttendees}
                onChange={(e) => setEventForm(prev => ({ ...prev, maxAttendees: e?.target?.value }))}
                required
              />

              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 font-medium"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-medium shadow-sm transition-all duration-200">
                  Create Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModuleContainer>
  );
};

export default EventManagementSection;