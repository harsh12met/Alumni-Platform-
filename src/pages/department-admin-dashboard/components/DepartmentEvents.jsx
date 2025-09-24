import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ExternalLink,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const DepartmentEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState('all'); // all, upcoming, ongoing, completed
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    eventType: 'seminar',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    venue: '',
    capacity: '',
    registrationRequired: true,
    registrationDeadline: '',
    tags: '',
    organizers: '',
    contact: '',
    agenda: '',
    prerequisites: '',
    targetAudience: 'students',
    isOnline: false,
    meetingLink: '',
    imageUrl: ''
  });

  // Mock data - Replace with Firestore integration
  const mockEvents = [
    {
      id: '1',
      title: 'Advanced React Patterns Workshop',
      description: 'Deep dive into advanced React patterns including render props, higher-order components, and custom hooks.',
      eventType: 'workshop',
      startDate: '2024-02-15',
      endDate: '2024-02-15',
      startTime: '10:00',
      endTime: '16:00',
      venue: 'CSE Lab 1',
      capacity: 30,
      registrations: 25,
      registrationRequired: true,
      registrationDeadline: '2024-02-12',
      status: 'upcoming',
      tags: 'React, JavaScript, Frontend',
      organizers: 'Dr. Priya Sharma, Prof. Rajesh Kumar',
      contact: 'events@cs.edu',
      agenda: '10:00 - Introduction\n11:00 - Render Props\n13:00 - Lunch Break\n14:00 - HOCs\n15:00 - Custom Hooks\n16:00 - Q&A',
      prerequisites: 'Basic React knowledge required',
      targetAudience: 'students',
      isOnline: false,
      meetingLink: '',
      imageUrl: '',
      department: user?.department || 'computer-science',
      createdAt: '2024-01-20T10:30:00Z',
      registeredStudents: [
        { id: 'std1', name: 'Arjun Patel', email: 'arjun@edu.in' },
        { id: 'std2', name: 'Priya Singh', email: 'priya@edu.in' }
      ]
    },
    {
      id: '2',
      title: 'Industry Connect: Career in AI/ML',
      description: 'Interactive session with industry experts about career opportunities in Artificial Intelligence and Machine Learning.',
      eventType: 'seminar',
      startDate: '2024-02-20',
      endDate: '2024-02-20',
      startTime: '14:00',
      endTime: '17:00',
      venue: 'Auditorium A',
      capacity: 100,
      registrations: 78,
      registrationRequired: true,
      registrationDeadline: '2024-02-18',
      status: 'upcoming',
      tags: 'AI, ML, Career, Industry',
      organizers: 'Placement Cell, CS Department',
      contact: 'placement@cs.edu',
      agenda: '14:00 - Welcome\n14:30 - Industry Trends\n15:30 - Career Paths\n16:00 - Q&A\n17:00 - Networking',
      prerequisites: 'None',
      targetAudience: 'final-year',
      isOnline: false,
      meetingLink: '',
      imageUrl: '',
      department: user?.department || 'computer-science',
      createdAt: '2024-01-18T14:20:00Z',
      registeredStudents: []
    },
    {
      id: '3',
      title: 'Cybersecurity Fundamentals',
      description: 'Online workshop covering basic cybersecurity concepts and best practices.',
      eventType: 'workshop',
      startDate: '2024-01-25',
      endDate: '2024-01-25',
      startTime: '15:00',
      endTime: '18:00',
      venue: 'Online',
      capacity: 50,
      registrations: 45,
      registrationRequired: true,
      registrationDeadline: '2024-01-23',
      status: 'completed',
      tags: 'Cybersecurity, Online, Security',
      organizers: 'Prof. Anita Desai',
      contact: 'anita.desai@cs.edu',
      agenda: '15:00 - Cyber Threats\n16:00 - Prevention Methods\n17:00 - Tools Demo\n18:00 - Resources',
      prerequisites: 'Basic networking knowledge',
      targetAudience: 'all-students',
      isOnline: true,
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      imageUrl: '',
      department: user?.department || 'computer-science',
      createdAt: '2024-01-15T09:15:00Z',
      feedback: {
        averageRating: 4.5,
        totalResponses: 38,
        comments: ['Very informative', 'Great examples', 'Would recommend']
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Filter by department
      const departmentEvents = mockEvents.filter(
        event => event.department === user?.department
      );
      setEvents(departmentEvents);
      setLoading(false);
    }, 1000);
  }, [user?.department]);

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.status === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleCreateEvent = () => {
    setIsEditing(false);
    setEventForm({
      title: '',
      description: '',
      eventType: 'seminar',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      venue: '',
      capacity: '',
      registrationRequired: true,
      registrationDeadline: '',
      tags: '',
      organizers: '',
      contact: '',
      agenda: '',
      prerequisites: '',
      targetAudience: 'students',
      isOnline: false,
      meetingLink: '',
      imageUrl: ''
    });
    setShowEventModal(true);
  };

  const handleEditEvent = (event) => {
    setIsEditing(true);
    setEventForm({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      endTime: event.endTime,
      venue: event.venue,
      capacity: event.capacity.toString(),
      registrationRequired: event.registrationRequired,
      registrationDeadline: event.registrationDeadline,
      tags: event.tags,
      organizers: event.organizers,
      contact: event.contact,
      agenda: event.agenda,
      prerequisites: event.prerequisites,
      targetAudience: event.targetAudience,
      isOnline: event.isOnline,
      meetingLink: event.meetingLink,
      imageUrl: event.imageUrl
    });
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
      // TODO: Add Firestore delete logic
      console.log('Deleting event:', eventId);
    }
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    
    const eventData = {
      ...eventForm,
      id: isEditing ? selectedEvent.id : Date.now().toString(),
      capacity: parseInt(eventForm.capacity),
      department: user?.department,
      status: 'upcoming',
      registrations: isEditing ? selectedEvent.registrations : 0,
      createdAt: isEditing ? selectedEvent.createdAt : new Date().toISOString()
    };

    if (isEditing) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...eventData } : event
      ));
    } else {
      setEvents([...events, eventData]);
    }

    setShowEventModal(false);
    setSelectedEvent(null);
    
    // TODO: Add Firestore create/update logic
    console.log(isEditing ? 'Updating event:' : 'Creating event:', eventData);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      upcoming: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getEventTypeColor = (type) => {
    const colors = {
      seminar: 'bg-purple-100 text-purple-800',
      workshop: 'bg-blue-100 text-blue-800',
      webinar: 'bg-green-100 text-green-800',
      conference: 'bg-red-100 text-red-800',
      competition: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDepartmentName = () => {
    const departmentMap = {
      'computer-science': 'Computer Science & Engineering',
      'electrical-engineering': 'Electrical Engineering',
      'mechanical-engineering': 'Mechanical Engineering',
      'civil-engineering': 'Civil Engineering',
      'electronics-communication': 'Electronics & Communication',
      'information-technology': 'Information Technology',
      'chemical-engineering': 'Chemical Engineering',
      'biotechnology': 'Biotechnology'
    };
    
    return user?.department ? departmentMap[user.department] || user.department : 'Department';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-purple-600" />
              Department Events
            </h1>
            <p className="text-gray-600 mt-1">
              Manage events and workshops for {getDepartmentName()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCreateEvent}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Events</p>
              <p className="text-xl font-bold text-gray-900">{events.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-xl font-bold text-blue-600">
                {events.filter(e => e.status === 'upcoming').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Registrations</p>
              <p className="text-xl font-bold text-green-600">
                {events.reduce((sum, e) => sum + (e.registrations || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-gray-600">
                {events.filter(e => e.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">No events match your current filters for {getDepartmentName()}.</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{event.description}</p>
                    </div>
                    <div className="flex flex-col space-y-1 ml-4">
                      {getStatusBadge(event.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.eventType)}`}>
                        {event.eventType}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(event.startDate)} {event.startDate !== event.endDate && `- ${formatDate(event.endDate)}`}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.startTime} - {event.endTime}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.venue}
                      {event.isOnline && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Online
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {event.registrations || 0} / {event.capacity} registered
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(((event.registrations || 0) / event.capacity) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round(((event.registrations || 0) / event.capacity) * 100)}% full
                    </p>
                  </div>

                  {event.tags && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {event.tags.split(', ').map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.status === 'completed' && event.feedback && (
                    <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-400">
                      <p className="text-sm text-green-700">
                        <strong>Feedback:</strong> {event.feedback.averageRating}/5 ({event.feedback.totalResponses} responses)
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      By: {event.organizers}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="flex items-center px-2 py-1 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && !showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Event Details</h3>
                    <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div><strong>Type:</strong> {selectedEvent.eventType}</div>
                      <div><strong>Date:</strong> {formatDate(selectedEvent.startDate)} {selectedEvent.startDate !== selectedEvent.endDate && `- ${formatDate(selectedEvent.endDate)}`}</div>
                      <div><strong>Time:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}</div>
                      <div><strong>Venue:</strong> {selectedEvent.venue}</div>
                      <div><strong>Capacity:</strong> {selectedEvent.capacity}</div>
                      <div><strong>Target Audience:</strong> {selectedEvent.targetAudience}</div>
                      <div><strong>Organizers:</strong> {selectedEvent.organizers}</div>
                      <div><strong>Contact:</strong> {selectedEvent.contact}</div>
                    </div>
                  </div>

                  {selectedEvent.prerequisites && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Prerequisites</h4>
                      <p className="text-sm text-gray-600">{selectedEvent.prerequisites}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {selectedEvent.agenda && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Agenda</h4>
                      <pre className="text-sm text-gray-600 whitespace-pre-wrap">{selectedEvent.agenda}</pre>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Registration</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Registered:</span>
                        <span className="font-semibold">{selectedEvent.registrations || 0} / {selectedEvent.capacity}</span>
                      </div>
                      {selectedEvent.registrationRequired && (
                        <div>
                          <span>Deadline:</span>
                          <span className="ml-2 font-semibold">{formatDate(selectedEvent.registrationDeadline)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedEvent.isOnline && selectedEvent.meetingLink && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Meeting Link</h4>
                      <a
                        href={selectedEvent.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Join Meeting
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                <button
                  onClick={() => handleEditEvent(selectedEvent)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Edit Event
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-96 overflow-y-auto">
            <form onSubmit={handleSubmitEvent} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Edit Event' : 'Create New Event'}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={eventForm.title}
                      onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={eventForm.description}
                      onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Type *
                      </label>
                      <select
                        required
                        value={eventForm.eventType}
                        onChange={(e) => setEventForm({...eventForm, eventType: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="seminar">Seminar</option>
                        <option value="workshop">Workshop</option>
                        <option value="webinar">Webinar</option>
                        <option value="conference">Conference</option>
                        <option value="competition">Competition</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Audience *
                      </label>
                      <select
                        required
                        value={eventForm.targetAudience}
                        onChange={(e) => setEventForm({...eventForm, targetAudience: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="students">All Students</option>
                        <option value="final-year">Final Year</option>
                        <option value="faculty">Faculty</option>
                        <option value="alumni">Alumni</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={eventForm.startDate}
                        onChange={(e) => setEventForm({...eventForm, startDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={eventForm.endDate}
                        onChange={(e) => setEventForm({...eventForm, endDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time *
                      </label>
                      <input
                        type="time"
                        required
                        value={eventForm.startTime}
                        onChange={(e) => setEventForm({...eventForm, startTime: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time *
                      </label>
                      <input
                        type="time"
                        required
                        value={eventForm.endTime}
                        onChange={(e) => setEventForm({...eventForm, endTime: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="isOnline"
                        checked={eventForm.isOnline}
                        onChange={(e) => setEventForm({...eventForm, isOnline: e.target.checked})}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isOnline" className="ml-2 block text-sm text-gray-700">
                        Online Event
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Venue *
                    </label>
                    <input
                      type="text"
                      required
                      value={eventForm.venue}
                      onChange={(e) => setEventForm({...eventForm, venue: e.target.value})}
                      placeholder={eventForm.isOnline ? "Online Platform" : "Physical Location"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {eventForm.isOnline && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meeting Link
                      </label>
                      <input
                        type="url"
                        value={eventForm.meetingLink}
                        onChange={(e) => setEventForm({...eventForm, meetingLink: e.target.value})}
                        placeholder="https://meet.google.com/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capacity *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={eventForm.capacity}
                      onChange={(e) => setEventForm({...eventForm, capacity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="registrationRequired"
                        checked={eventForm.registrationRequired}
                        onChange={(e) => setEventForm({...eventForm, registrationRequired: e.target.checked})}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="registrationRequired" className="ml-2 block text-sm text-gray-700">
                        Registration Required
                      </label>
                    </div>
                  </div>

                  {eventForm.registrationRequired && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registration Deadline
                      </label>
                      <input
                        type="date"
                        value={eventForm.registrationDeadline}
                        onChange={(e) => setEventForm({...eventForm, registrationDeadline: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organizers *
                    </label>
                    <input
                      type="text"
                      required
                      value={eventForm.organizers}
                      onChange={(e) => setEventForm({...eventForm, organizers: e.target.value})}
                      placeholder="Dr. Aniket Bhosale, Prof. Kavita Patil"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={eventForm.contact}
                      onChange={(e) => setEventForm({...eventForm, contact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={eventForm.tags}
                      onChange={(e) => setEventForm({...eventForm, tags: e.target.value})}
                      placeholder="React, JavaScript, Frontend"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agenda
                  </label>
                  <textarea
                    rows={4}
                    value={eventForm.agenda}
                    onChange={(e) => setEventForm({...eventForm, agenda: e.target.value})}
                    placeholder="10:00 - Introduction&#10;11:00 - Topic 1&#10;12:00 - Break"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prerequisites
                  </label>
                  <textarea
                    rows={2}
                    value={eventForm.prerequisites}
                    onChange={(e) => setEventForm({...eventForm, prerequisites: e.target.value})}
                    placeholder="Basic programming knowledge required"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {isEditing ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentEvents;