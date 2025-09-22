import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AlumniEventsSection = () => {
  const [activeFilter, setActiveFilter] = useState('upcoming');

  const events = [
    {
      id: 1,
      title: "Tech Alumni Networking Night",
      description: "Join fellow tech alumni for an evening of networking, sharing experiences, and building connections in the San Francisco Bay Area.",
      date: "2025-01-15",
      time: "18:00",
      location: "TechHub San Francisco",
      address: "123 Market Street, San Francisco, CA",
      type: "networking",
      attendees: 45,
      maxAttendees: 100,
      organizer: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop",
      status: "registered",
      price: "Free",
      tags: ["Networking", "Tech", "Career"]
    },
    {
      id: 2,
      title: "Alumni Reunion 2025",
      description: "Annual reunion celebrating 10 years since graduation. Reconnect with classmates, share memories, and celebrate achievements.",
      date: "2025-02-20",
      time: "15:00",
      location: "University Campus",
      address: "Main Auditorium, University Campus",
      type: "reunion",
      attendees: 120,
      maxAttendees: 200,
      organizer: "Alumni Association",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=200&fit=crop",
      status: "interested",
      price: "$25",
      tags: ["Reunion", "Social", "Campus"]
    },
    {
      id: 3,
      title: "Career Development Workshop",
      description: "Learn about the latest trends in technology careers, interview tips, and professional development strategies from industry leaders.",
      date: "2025-01-28",
      time: "14:00",
      location: "Virtual Event",
      address: "Online via Zoom",
      type: "workshop",
      attendees: 78,
      maxAttendees: 150,
      organizer: "Career Services",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
      status: "not_registered",
      price: "Free",
      tags: ["Workshop", "Career", "Virtual"]
    },
    {
      id: 4,
      title: "Startup Pitch Competition",
      description: "Watch alumni entrepreneurs pitch their innovative startups to a panel of investors and industry experts.",
      date: "2024-12-10",
      time: "19:00",
      location: "Innovation Center",
      address: "456 Innovation Drive, Palo Alto, CA",
      type: "competition",
      attendees: 89,
      maxAttendees: 120,
      organizer: "Entrepreneurship Club",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
      status: "attended",
      price: "$15",
      tags: ["Startup", "Competition", "Innovation"]
    }
  ];

  const filters = [
    { id: 'upcoming', label: 'Upcoming', count: events?.filter(e => new Date(e.date) > new Date())?.length },
    { id: 'registered', label: 'Registered', count: events?.filter(e => e?.status === 'registered')?.length },
    { id: 'past', label: 'Past Events', count: events?.filter(e => new Date(e.date) < new Date())?.length },
    { id: 'all', label: 'All Events', count: events?.length }
  ];

  const getFilteredEvents = () => {
    const now = new Date();
    switch (activeFilter) {
      case 'upcoming':
        return events?.filter(event => new Date(event.date) > now);
      case 'registered':
        return events?.filter(event => event?.status === 'registered');
      case 'past':
        return events?.filter(event => new Date(event.date) < now);
      default:
        return events;
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'networking': return 'Users';
      case 'reunion': return 'Heart';
      case 'workshop': return 'BookOpen';
      case 'competition': return 'Trophy';
      default: return 'Calendar';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'networking': return 'text-blue-600 bg-blue-50';
      case 'reunion': return 'text-red-600 bg-red-50';
      case 'workshop': return 'text-green-600 bg-green-50';
      case 'competition': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'registered':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Registered</span>;
      case 'interested':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Interested</span>;
      case 'attended':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Attended</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString?.split(':');
    const date = new Date();
    date?.setHours(parseInt(hours), parseInt(minutes));
    return date?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const handleEventAction = (eventId, action) => {
    console.log(`${action} event:`, eventId);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-card-foreground flex items-center space-x-2">
            <Icon name="Calendar" size={18} />
            <span>Alumni Events</span>
          </h3>
          <Button variant="default" size="sm" iconName="Plus" iconPosition="left" className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-3 py-1">
            Create Event
          </Button>
        </div>

        <div className="flex flex-wrap gap-1">
          {filters?.map((filter) => (
            <button
              key={filter?.id}
              onClick={() => setActiveFilter(filter?.id)}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                activeFilter === filter?.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <span>{filter?.label}</span>
              <span className={`text-xs px-1 py-0.5 rounded-full ${
                activeFilter === filter?.id ? 'bg-blue-500 text-white' : 'bg-muted-foreground/20'
              }`}>
                {filter?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {getFilteredEvents()?.length > 0 ? (
          <div className="space-y-4">
            {getFilteredEvents()?.map((event) => (
              <div key={event?.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3">
                    <Image
                      src={event?.image}
                      alt={event?.title}
                      className="w-full h-48 lg:h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getEventTypeColor(event?.type)}`}>
                          <Icon name={getEventTypeIcon(event?.type)} size={16} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-card-foreground">{event?.title}</h4>
                          <p className="text-sm text-muted-foreground">Organized by {event?.organizer}</p>
                        </div>
                      </div>
                      {getStatusBadge(event?.status)}
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event?.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Calendar" size={16} />
                        <span>{formatDate(event?.date)} at {formatTime(event?.time)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="MapPin" size={16} />
                        <span>{event?.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Users" size={16} />
                        <span>{event?.attendees}/{event?.maxAttendees} attendees</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="DollarSign" size={16} />
                        <span>{event?.price}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {event?.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {event?.status === 'not_registered' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleEventAction(event?.id, 'register')}
                          >
                            Register
                          </Button>
                        )}
                        {event?.status === 'interested' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEventAction(event?.id, 'register')}
                          >
                            Register Now
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Share"
                          onClick={() => handleEventAction(event?.id, 'share')}
                        >
                          Share
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        onClick={() => handleEventAction(event?.id, 'view')}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No events found for the selected filter</p>
            <Button variant="outline" size="sm" className="mt-4 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 font-medium">
              Browse All Events
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniEventsSection;