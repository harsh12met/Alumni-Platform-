import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Users, MapPin, Clock, User, CheckCircle, X, Eye } from 'lucide-react';

const FacultyEventsSection = () => {
  const [events, setEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // all, attending, hosting
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'workshop', // workshop, seminar, conference, networking, guest_lecture
    date: '',
    time: '',
    duration: '',
    location: '',
    capacity: '',
    registration_required: true,
    is_virtual: false,
    meeting_link: '',
    tags: ''
  });

  useEffect(() => {
    // TODO: Fetch events from Firestore
    // For now, using placeholder data
    const mockEvents = [
      {
        id: '1',
        title: 'AI in Healthcare: Industry Perspectives',
        description: 'A comprehensive seminar featuring alumni from leading healthcare technology companies discussing the latest AI applications in healthcare.',
        type: 'seminar',
        date: '2025-10-15',
        time: '14:00',
        duration: '2 hours',
        location: 'Main Auditorium, Block A',
        capacity: 150,
        registered_count: 89,
        is_virtual: false,
        meeting_link: '',
        organizer: 'Dr. Sarah Wilson',
        registration_required: true,
        tags: ['AI', 'Healthcare', 'Technology'],
        status: 'upcoming',
        created_by: 'faculty_123',
        attendees: [
          { id: 'a1', name: 'John Doe', email: 'john@example.com', type: 'alumni' },
          { id: 'a2', name: 'Jane Smith', email: 'jane@example.com', type: 'student' }
        ],
        speakers: [
          { name: 'Dr. Michael Chen', company: 'HealthTech Corp', topic: 'Machine Learning in Diagnostics' },
          { name: 'Sarah Johnson', company: 'MedAI Solutions', topic: 'Ethical AI in Healthcare' }
        ]
      },
      {
        id: '2',
        title: 'Alumni-Student Networking Evening',
        description: 'An informal networking event connecting current students with successful alumni from various industries.',
        type: 'networking',
        date: '2025-10-20',
        time: '18:00',
        duration: '3 hours',
        location: 'Virtual Event',
        capacity: 200,
        registered_count: 145,
        is_virtual: true,
        meeting_link: 'https://zoom.us/j/123456789',
        organizer: 'Prof. Alex Rodriguez',
        registration_required: true,
        tags: ['Networking', 'Career', 'Alumni'],
        status: 'upcoming',
        created_by: 'faculty_456',
        attendees: [],
        speakers: []
      },
      {
        id: '3',
        title: 'Technical Workshop: Full-Stack Development',
        description: 'Hands-on workshop conducted by alumni developers from top tech companies.',
        type: 'workshop',
        date: '2025-09-25',
        time: '10:00',
        duration: '4 hours',
        location: 'Computer Lab 1',
        capacity: 30,
        registered_count: 30,
        is_virtual: false,
        meeting_link: '',
        organizer: 'Dr. Emily Johnson',
        registration_required: true,
        tags: ['Programming', 'Web Development', 'Workshop'],
        status: 'completed',
        created_by: 'faculty_789',
        attendees: [],
        speakers: [
          { name: 'David Kim', company: 'Google', topic: 'React Best Practices' },
          { name: 'Lisa Wong', company: 'Meta', topic: 'Backend Architecture' }
        ]
      }
    ];
    
    setEvents(mockEvents);
  }, []);

  const filteredEvents = events.filter(event => {
    if (activeTab === 'attending') {
      // TODO: Filter events where current faculty is attending
      return event.attendees.some(attendee => attendee.id === 'current_faculty_id');
    }
    if (activeTab === 'hosting') {
      // TODO: Filter events created by current faculty
      return event.created_by === 'current_faculty_id';
    }
    return true; // all events
  });

  const handleCreateEvent = async () => {
    try {
      // TODO: Save to Firestore
      const eventData = {
        ...newEvent,
        id: Date.now().toString(),
        tags: newEvent.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        registered_count: 0,
        status: 'upcoming',
        created_by: 'current_faculty_id',
        organizer: 'Current Faculty Name', // TODO: Get from auth context
        attendees: [],
        speakers: []
      };

      setEvents(prev => [eventData, ...prev]);
      setShowCreateModal(false);
      setNewEvent({
        title: '',
        description: '',
        type: 'workshop',
        date: '',
        time: '',
        duration: '',
        location: '',
        capacity: '',
        registration_required: true,
        is_virtual: false,
        meeting_link: '',
        tags: ''
      });

      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'workshop':
        return 'bg-purple-100 text-purple-800';
      case 'seminar':
        return 'bg-blue-100 text-blue-800';
      case 'conference':
        return 'bg-orange-100 text-orange-800';
      case 'networking':
        return 'bg-green-100 text-green-800';
      case 'guest_lecture':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isEventFull = (event) => {
    return event.registered_count >= event.capacity;
  };

  const getCapacityColor = (event) => {
    const percentage = (event.registered_count / event.capacity) * 100;
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Events</h2>
          <p className="text-gray-600">Manage and participate in academic events and workshops.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'all', label: 'All Events', count: events.length },
            { id: 'attending', label: 'Attending', count: 0 },
            { id: 'hosting', label: 'Hosting', count: events.filter(e => e.created_by === 'current_faculty_id').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                    {event.type.replace('_', ' ').charAt(0).toUpperCase() + event.type.replace('_', ' ').slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                  {isEventFull(event) && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Full
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{event.date}</p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{event.duration}</p>
                      <p className="text-xs text-gray-500">Duration</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{event.location}</p>
                      {event.is_virtual && (
                        <p className="text-xs text-blue-600">Virtual Event</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className={`text-sm font-medium ${getCapacityColor(event)}`}>
                        {event.registered_count}/{event.capacity}
                      </p>
                      <p className="text-xs text-gray-500">Registered</p>
                    </div>
                  </div>
                </div>

                {/* Organizer */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Organized by <span className="font-medium">{event.organizer}</span></span>
                  </div>
                </div>

                {/* Speakers */}
                {event.speakers && event.speakers.length > 0 && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">Speakers:</span>
                    <div className="space-y-1">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          <span className="font-medium">{speaker.name}</span>
                          {speaker.company && <span className="text-gray-500"> - {speaker.company}</span>}
                          {speaker.topic && <span className="text-gray-500"> • {speaker.topic}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ml-4 flex flex-col space-y-2">
                <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                {event.status === 'upcoming' && !isEventFull(event) && (
                  <button className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <CheckCircle className="h-4 w-4" />
                    <span>Register</span>
                  </button>
                )}
                {event.created_by === 'current_faculty_id' && (
                  <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Users className="h-4 w-4" />
                    <span>Manage</span>
                  </button>
                )}
              </div>
            </div>

            {/* Virtual Event Link */}
            {event.is_virtual && event.meeting_link && event.status === 'upcoming' && (
              <div className="border-t border-gray-200 pt-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800 mb-2">Virtual Event Link:</p>
                  <a
                    href={event.meeting_link}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {event.meeting_link}
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">
            {activeTab === 'all' 
              ? 'Start by creating your first event.' 
              : `No events in the ${activeTab} category.`}
          </p>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Create New Event</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Event description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="conference">Conference</option>
                    <option value="networking">Networking</option>
                    <option value="guest_lecture">Guest Lecture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 2 hours, Half day"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, capacity: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Maximum attendees"
                  />
                </div>
              </div>

              {/* Virtual Event Toggle */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is_virtual"
                  checked={newEvent.is_virtual}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, is_virtual: e.target.checked }))}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="is_virtual" className="text-sm font-medium text-gray-700">
                  Virtual Event
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {newEvent.is_virtual ? 'Meeting Link' : 'Location'}
                </label>
                <input
                  type={newEvent.is_virtual ? 'url' : 'text'}
                  value={newEvent.is_virtual ? newEvent.meeting_link : newEvent.location}
                  onChange={(e) => setNewEvent(prev => ({ 
                    ...prev, 
                    [newEvent.is_virtual ? 'meeting_link' : 'location']: e.target.value 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={newEvent.is_virtual ? 'https://zoom.us/j/...' : 'Event location'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  value={newEvent.tags}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter tags separated by commas (e.g., AI, Technology, Career)"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="registration_required"
                  checked={newEvent.registration_required}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, registration_required: e.target.checked }))}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="registration_required" className="text-sm font-medium text-gray-700">
                  Registration Required
                </label>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleCreateEvent}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Event
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyEventsSection;