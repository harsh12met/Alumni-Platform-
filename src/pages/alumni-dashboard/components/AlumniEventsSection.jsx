import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, CheckCircle, XCircle, Eye } from 'lucide-react';

const AlumniEventsSection = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Alumni Tech Meetup 2024',
      description: 'Join us for an evening of networking and tech talks by industry leaders.',
      date: '2024-04-15',
      time: '18:00',
      location: 'Tech Hub, Downtown',
      organizer: 'Alumni Association',
      maxAttendees: 100,
      currentAttendees: 45,
      registrationDeadline: '2024-04-10',
      isRegistered: false,
      status: 'upcoming',
      category: 'networking'
    },
    {
      id: 2,
      title: 'Career Development Workshop',
      description: 'Learn about the latest trends in career development and skill building.',
      date: '2024-04-20',
      time: '14:00',
      location: 'Virtual Event',
      organizer: 'Career Services',
      maxAttendees: 200,
      currentAttendees: 85,
      registrationDeadline: '2024-04-18',
      isRegistered: true,
      status: 'upcoming',
      category: 'professional-development'
    },
    {
      id: 3,
      title: 'Annual Alumni Gala',
      description: 'Celebrate achievements and reconnect with classmates at our annual gala.',
      date: '2024-03-10',
      time: '19:00',
      location: 'Grand Hotel Ballroom',
      organizer: 'Alumni Association',
      maxAttendees: 300,
      currentAttendees: 250,
      registrationDeadline: '2024-03-05',
      isRegistered: true,
      status: 'past',
      category: 'social'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // TODO: Fetch events from Firestore
    // const fetchEvents = async () => {
    //   try {
    //     const q = query(
    //       collection(db, "events"),
    //       orderBy("date", "desc")
    //     );
    //     const querySnapshot = await getDocs(q);
    //     const eventsData = [];
    //     querySnapshot.forEach((doc) => {
    //       eventsData.push({ id: doc.id, ...doc.data() });
    //     });
    //     setEvents(eventsData);
    //   } catch (error) {
    //     console.error("Error fetching events:", error);
    //   }
    // };
    // fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      // TODO: Register for event in Firestore
      // await addDoc(collection(db, "event_registrations"), {
      //   eventId,
      //   userId: currentUserId,
      //   registrationDate: new Date(),
      //   status: 'registered'
      // });

      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { 
              ...event, 
              isRegistered: true,
              currentAttendees: event.currentAttendees + 1
            }
          : event
      ));
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      // TODO: Unregister from event in Firestore
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { 
              ...event, 
              isRegistered: false,
              currentAttendees: Math.max(0, event.currentAttendees - 1)
            }
          : event
      ));
    } catch (error) {
      console.error('Error unregistering from event:', error);
    }
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return event.status === 'upcoming';
    if (filter === 'registered') return event.isRegistered;
    if (filter === 'past') return event.status === 'past';
    return true;
  });

  const getEventStatusColor = (event) => {
    if (event.status === 'past') return 'bg-gray-100 text-gray-600';
    if (event.isRegistered) return 'bg-green-100 text-green-600';
    if (new Date(event.registrationDeadline) < new Date()) return 'bg-red-100 text-red-600';
    return 'bg-blue-100 text-blue-600';
  };

  const getEventStatusText = (event) => {
    if (event.status === 'past') return 'Completed';
    if (event.isRegistered) return 'Registered';
    if (new Date(event.registrationDeadline) < new Date()) return 'Registration Closed';
    return 'Open for Registration';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
        <p className="text-gray-600">Discover and participate in alumni events</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'all', label: 'All Events' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'registered', label: 'My Registrations' },
              { id: 'past', label: 'Past Events' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Event Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-3">{event.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventStatusColor(event)}`}>
                  {getEventStatusText(event)}
                </span>
              </div>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-3" />
                  <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-3" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={16} className="mr-3" />
                  <span>{event.currentAttendees} / {event.maxAttendees} attendees</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-3" />
                  <span>Registration deadline: {new Date(event.registrationDeadline).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Attendance</span>
                  <span>{Math.round((event.currentAttendees / event.maxAttendees) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Event Category */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  event.category === 'networking' ? 'bg-purple-100 text-purple-800' :
                  event.category === 'professional-development' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Eye size={16} className="mr-2" />
                  View Details
                </button>

                {event.status === 'upcoming' && (
                  <>
                    {event.isRegistered ? (
                      <button
                        onClick={() => handleUnregister(event.id)}
                        className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <XCircle size={16} className="mr-2" />
                        Unregister
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(event.id)}
                        disabled={new Date(event.registrationDeadline) < new Date() || event.currentAttendees >= event.maxAttendees}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Register
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">
            {filter === 'all' ? 'No events available at the moment' :
             filter === 'upcoming' ? 'No upcoming events' :
             filter === 'registered' ? 'You haven\'t registered for any events' :
             'No past events found'}
          </p>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventStatusColor(selectedEvent)}`}>
                  {getEventStatusText(selectedEvent)}
                </span>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-700">{selectedEvent.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={18} className="mr-3" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-3" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Users size={18} className="mr-3" />
                    <span>{selectedEvent.currentAttendees} / {selectedEvent.maxAttendees} attendees</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={18} className="mr-3" />
                    <span>Deadline: {new Date(selectedEvent.registrationDeadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Organized by: <span className="font-medium">{selectedEvent.organizer}</span></p>
              </div>
            </div>

            {selectedEvent.status === 'upcoming' && (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {selectedEvent.isRegistered ? (
                  <button
                    onClick={() => {
                      handleUnregister(selectedEvent.id);
                      setSelectedEvent(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Unregister
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleRegister(selectedEvent.id);
                      setSelectedEvent(null);
                    }}
                    disabled={new Date(selectedEvent.registrationDeadline) < new Date() || selectedEvent.currentAttendees >= selectedEvent.maxAttendees}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Register Now
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniEventsSection;