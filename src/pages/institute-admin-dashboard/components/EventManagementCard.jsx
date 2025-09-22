import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const EventManagementCard = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const events = [
    {
      id: 1,
      title: "Annual Tech Symposium 2024",
      type: "conference",
      date: "2024-02-15",
      time: "09:00 AM",
      duration: "8 hours",
      location: "Main Auditorium",
      status: "upcoming",
      attendees: 245,
      maxCapacity: 300,
      organizer: "Computer Science Department",
      description: "Annual technology conference featuring industry leaders and innovative research presentations.",
      registrationDeadline: "2024-02-10"
    },
    {
      id: 2,
      title: "Career Fair Spring 2024",
      type: "career",
      date: "2024-02-20",
      time: "10:00 AM",
      duration: "6 hours",
      location: "Sports Complex",
      status: "upcoming",
      attendees: 189,
      maxCapacity: 500,
      organizer: "Placement Cell",
      description: "Connect with top recruiters and explore career opportunities across various industries.",
      registrationDeadline: "2024-02-18"
    },
    {
      id: 3,
      title: "Alumni Networking Meetup",
      type: "networking",
      date: "2024-01-28",
      time: "06:00 PM",
      duration: "3 hours",
      location: "Alumni Hall",
      status: "ongoing",
      attendees: 78,
      maxCapacity: 100,
      organizer: "Alumni Relations",
      description: "Monthly networking event for alumni to connect and share experiences.",
      registrationDeadline: "2024-01-25"
    },
    {
      id: 4,
      title: "Research Presentation Day",
      type: "academic",
      date: "2024-01-15",
      time: "02:00 PM",
      duration: "4 hours",
      location: "Conference Hall",
      status: "completed",
      attendees: 156,
      maxCapacity: 200,
      organizer: "Research Department",
      description: "Students and faculty present their latest research findings and innovations.",
      registrationDeadline: "2024-01-12"
    },
    {
      id: 5,
      title: "Industry Workshop Series",
      type: "workshop",
      date: "2024-01-10",
      time: "11:00 AM",
      duration: "5 hours",
      location: "Lab Complex",
      status: "completed",
      attendees: 92,
      maxCapacity: 120,
      organizer: "Industry Relations",
      description: "Hands-on workshops conducted by industry professionals on latest technologies.",
      registrationDeadline: "2024-01-08"
    }
  ];

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'conference': return 'Presentation';
      case 'career': return 'Briefcase';
      case 'networking': return 'Users';
      case 'academic': return 'BookOpen';
      case 'workshop': return 'Wrench';
      default: return 'Calendar';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'conference': return 'text-blue-600 bg-blue-50';
      case 'career': return 'text-green-600 bg-green-50';
      case 'networking': return 'text-purple-600 bg-purple-50';
      case 'academic': return 'text-indigo-600 bg-indigo-50';
      case 'workshop': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-primary bg-primary/10';
      case 'ongoing': return 'text-success bg-success/10';
      case 'completed': return 'text-muted-foreground bg-muted';
      case 'cancelled': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const filteredEvents = events?.filter(event => {
    if (selectedFilter === 'all') return true;
    return event?.status === selectedFilter;
  });

  const getAttendancePercentage = (attendees, maxCapacity) => {
    return Math.round((attendees / maxCapacity) * 100);
  };

  const handleCreateEvent = () => {
    console.log('Creating new event');
    // Handle create event logic here
  };

  const handleEditEvent = (eventId) => {
    console.log('Editing event:', eventId);
    // Handle edit event logic here
  };

  const handleViewDetails = (eventId) => {
    console.log('Viewing event details:', eventId);
    // Handle view details logic here
  };

  const handleCancelEvent = (eventId) => {
    console.log('Cancelling event:', eventId);
    // Handle cancel event logic here
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Event Management</h3>
            <p className="text-sm text-muted-foreground">Organize and manage campus events</p>
          </div>
        </div>
        <Button 
          variant="default" 
          iconName="Plus" 
          iconPosition="left" 
          onClick={handleCreateEvent}
          className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
        >
          Create Event
        </Button>
      </div>
      {/* Filter */}
      <div className="mb-6">
        <Select
          label="Filter Events"
          options={filterOptions}
          value={selectedFilter}
          onChange={setSelectedFilter}
          className="w-48"
        />
      </div>
      {/* Events List */}
      {filteredEvents?.length > 0 ? (
        <div className="space-y-4">
          {filteredEvents?.map((event) => (
            <div key={event?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${getEventTypeColor(event?.type)}`}>
                    <Icon name={getEventTypeIcon(event?.type)} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-card-foreground">{event?.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event?.status)}`}>
                        {event?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{event?.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {new Date(event.date)?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{event?.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="MapPin" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{event?.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="User" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{event?.organizer}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 ml-4 min-w-fit">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => handleViewDetails(event?.id)}
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 w-full sm:w-auto"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Edit"
                    iconPosition="left"
                    onClick={() => handleEditEvent(event?.id)}
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 w-full sm:w-auto"
                  >
                    Edit
                  </Button>
                  {event?.status === 'upcoming' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="X"
                      iconPosition="left"
                      onClick={() => handleCancelEvent(event?.id)}
                      className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Attendance Progress */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-card-foreground">Registration Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {event?.attendees}/{event?.maxCapacity} ({getAttendancePercentage(event?.attendees, event?.maxCapacity)}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getAttendancePercentage(event?.attendees, event?.maxCapacity)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Duration: {event?.duration}</span>
                  <span>Registration Deadline: {new Date(event.registrationDeadline)?.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No events found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedFilter === 'all' ? 'Create your first event to get started' : `No ${selectedFilter} events`}
          </p>
        </div>
      )}
      {/* Summary Stats */}
      {filteredEvents?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-card-foreground">
                {events?.filter(e => e?.status === 'upcoming')?.length}
              </p>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-card-foreground">
                {events?.filter(e => e?.status === 'ongoing')?.length}
              </p>
              <p className="text-sm text-muted-foreground">Ongoing</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-card-foreground">
                {events?.reduce((sum, e) => sum + e?.attendees, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Attendees</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-card-foreground">
                {events?.filter(e => e?.status === 'completed')?.length}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagementCard;