import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, ExternalLink, UserCheck } from 'lucide-react';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  // Mock data - Replace with Firestore fetch
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        name: 'Tech Career Fair 2025',
        date: '2025-10-15',
        time: '10:00 AM - 4:00 PM',
        location: 'Main Auditorium',
        description: 'Connect with top tech companies and explore career opportunities. Representatives from Google, Microsoft, Amazon and more will be present.',
        organizer: 'Career Services',
        capacity: 500,
        registered: 243,
        image: null,
        tags: ['Career', 'Networking', 'Technology']
      },
      {
        id: 2,
        name: 'Alumni Networking Dinner',
        date: '2025-10-20',
        time: '6:00 PM - 9:00 PM',
        location: 'Hotel Grand Ballroom',
        description: 'An exclusive networking dinner with successful alumni from various industries. Great opportunity to build connections and get career advice.',
        organizer: 'Alumni Relations',
        capacity: 150,
        registered: 89,
        image: null,
        tags: ['Alumni', 'Networking', 'Dinner']
      },
      {
        id: 3,
        name: 'Startup Pitch Competition',
        date: '2025-11-05',
        time: '9:00 AM - 6:00 PM',
        location: 'Innovation Center',
        description: 'Present your startup ideas to industry experts and investors. Winner receives $10,000 seed funding and mentorship.',
        organizer: 'Entrepreneurship Cell',
        capacity: 200,
        registered: 156,
        image: null,
        tags: ['Startup', 'Competition', 'Entrepreneurship']
      },
      {
        id: 4,
        name: 'AI/ML Workshop Series',
        date: '2025-10-25',
        time: '2:00 PM - 5:00 PM',
        location: 'Computer Lab 3',
        description: 'Hands-on workshop covering machine learning fundamentals, neural networks, and practical applications using Python.',
        organizer: 'CS Department',
        capacity: 80,
        registered: 67,
        image: null,
        tags: ['Workshop', 'AI', 'Machine Learning']
      }
    ];
    setEvents(mockEvents);
  }, []);

  const handleRegister = (eventId) => {
    // TODO: Store registration in Firestore event_registrations collection
    if (registrations.includes(eventId)) {
      alert('You are already registered for this event!');
      return;
    }
    
    setRegistrations(prev => [...prev, eventId]);
    alert('Successfully registered for the event!');
  };

  const isEventPast = (eventDate) => {
    return new Date(eventDate) < new Date();
  };

  const getEventStatus = (event) => {
    if (isEventPast(event.date)) return 'past';
    if (registrations.includes(event.id)) return 'registered';
    if (event.registered >= event.capacity) return 'full';
    return 'available';
  };

  const getStatusBadge = (status) => {
    const badges = {
      past: { color: 'bg-gray-100 text-gray-800', text: 'Past Event' },
      registered: { color: 'bg-green-100 text-green-800', text: 'Registered' },
      full: { color: 'bg-red-100 text-red-800', text: 'Full' },
      available: { color: 'bg-blue-100 text-blue-800', text: 'Available' }
    };
    return badges[status];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Campus Events</h2>
        <p className="text-gray-600">Discover and register for exciting events and activities</p>
      </div>

      {/* Event Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Events</p>
              <p className="text-xl font-bold text-gray-900">{events.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">My Registrations</p>
              <p className="text-xl font-bold text-gray-900">{registrations.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Attendees</p>
              <p className="text-xl font-bold text-gray-900">
                {events.reduce((sum, event) => sum + event.registered, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-xl font-bold text-gray-900">
                {events.filter(event => !isEventPast(event.date)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => {
          const status = getEventStatus(event);
          const statusBadge = getStatusBadge(status);
          
          return (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              {/* Event Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-xl flex items-center justify-center">
                <Calendar className="w-16 h-16 text-white opacity-50" />
              </div>
              
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1">{event.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge.color} ml-3`}>
                    {statusBadge.text}
                  </span>
                </div>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{formatDate(event.date)} • {event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {event.registered}/{event.capacity} registered
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{event.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Organizer */}
                <div className="text-sm text-gray-500 mb-4">
                  Organized by: <span className="font-medium">{event.organizer}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Registration Progress</span>
                    <span>{Math.round((event.registered / event.capacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((event.registered / event.capacity) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 flex items-center justify-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleRegister(event.id)}
                    disabled={status === 'past' || status === 'registered' || status === 'full'}
                    className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                      status === 'registered'
                        ? 'bg-green-100 text-green-800 cursor-not-allowed'
                        : status === 'past' || status === 'full'
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    {status === 'registered' ? 'Registered' : 
                     status === 'past' ? 'Past Event' :
                     status === 'full' ? 'Full' : 'Register'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No events available</h3>
          <p className="text-gray-600">Check back soon for upcoming events and activities.</p>
        </div>
      )}
    </div>
  );
};

export default EventsSection;