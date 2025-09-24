import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Video, Plus, CheckCircle, XCircle, Eye } from 'lucide-react';

const FacultyGuestLecturesSection = () => {
  const [lectures, setLectures] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLecture, setNewLecture] = useState({
    title: '',
    description: '',
    topic: '',
    date: '',
    time: '',
    duration: '',
    mode: 'online', // online or offline
    venue: '',
    inviteeId: '',
    inviteeName: '',
    inviteeEmail: ''
  });

  useEffect(() => {
    // TODO: Fetch guest lectures from Firestore
    // For now, using placeholder data
    const mockLectures = [
      {
        id: '1',
        title: 'Machine Learning in Industry',
        description: 'Practical applications of ML in real-world scenarios',
        topic: 'Machine Learning',
        date: '2025-10-15',
        time: '14:00',
        duration: '60 minutes',
        mode: 'online',
        venue: 'Zoom Meeting',
        status: 'accepted',
        invitee: {
          id: 'alumni1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@techcorp.com',
          company: 'TechCorp Inc.',
          position: 'Senior Software Engineer'
        },
        createdAt: '2025-09-20',
        responseDate: '2025-09-22'
      },
      {
        id: '2',
        title: 'Career Guidance in Data Science',
        description: 'Insights into building a successful career in data science',
        topic: 'Career Development',
        date: '2025-10-20',
        time: '15:30',
        duration: '90 minutes',
        mode: 'offline',
        venue: 'Auditorium A',
        status: 'pending',
        invitee: {
          id: 'alumni2',
          name: 'Michael Chen',
          email: 'michael.chen@fintech.com',
          company: 'FinTech Solutions',
          position: 'Data Scientist'
        },
        createdAt: '2025-09-18'
      }
    ];
    
    setLectures(mockLectures);
  }, []);

  const handleCreateLecture = async () => {
    try {
      // TODO: Save to Firestore and send invitation
      const lectureData = {
        ...newLecture,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
        invitee: {
          id: newLecture.inviteeId,
          name: newLecture.inviteeName,
          email: newLecture.inviteeEmail
        }
      };

      setLectures(prev => [lectureData, ...prev]);
      setShowCreateModal(false);
      setNewLecture({
        title: '',
        description: '',
        topic: '',
        date: '',
        time: '',
        duration: '',
        mode: 'online',
        venue: '',
        inviteeId: '',
        inviteeName: '',
        inviteeEmail: ''
      });

      alert('Guest lecture invitation sent successfully!');
    } catch (error) {
      console.error('Error creating lecture:', error);
      alert('Error creating lecture. Please try again.');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'declined':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Guest Lectures</h2>
          <p className="text-gray-600">Invite alumni to share their expertise with current students.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Invite Alumni</span>
        </button>
      </div>

      {/* Lectures List */}
      <div className="space-y-4">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{lecture.title}</h3>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(lecture.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lecture.status)}`}>
                      {lecture.status.charAt(0).toUpperCase() + lecture.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{lecture.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{lecture.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{lecture.time} ({lecture.duration})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lecture.mode === 'online' ? (
                      <Video className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Users className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-600">{lecture.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Topic: {lecture.topic}</span>
                  </div>
                </div>

                {/* Invitee Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Invited Speaker</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">
                        {lecture.invitee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{lecture.invitee.name}</p>
                      <p className="text-sm text-gray-600">{lecture.invitee.position} at {lecture.invitee.company}</p>
                      <p className="text-sm text-gray-500">{lecture.invitee.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-4">
                <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {lectures.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Video className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No guest lectures yet</h3>
          <p className="text-gray-600">Start by inviting alumni to share their expertise with students.</p>
        </div>
      )}

      {/* Create Lecture Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Invite Alumni for Guest Lecture</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lecture Title
                  </label>
                  <input
                    type="text"
                    value={newLecture.title}
                    onChange={(e) => setNewLecture(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter lecture title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={newLecture.topic}
                    onChange={(e) => setNewLecture(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Machine Learning, Career Development"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newLecture.description}
                  onChange={(e) => setNewLecture(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Brief description of the lecture"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newLecture.date}
                    onChange={(e) => setNewLecture(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newLecture.time}
                    onChange={(e) => setNewLecture(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select
                    value={newLecture.duration}
                    onChange={(e) => setNewLecture(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select duration</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="60 minutes">60 minutes</option>
                    <option value="90 minutes">90 minutes</option>
                    <option value="120 minutes">120 minutes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mode
                  </label>
                  <select
                    value={newLecture.mode}
                    onChange={(e) => setNewLecture(prev => ({ ...prev, mode: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={newLecture.venue}
                    onChange={(e) => setNewLecture(prev => ({ ...prev, venue: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={newLecture.mode === 'online' ? 'Zoom Meeting, Google Meet' : 'Auditorium A, Room 101'}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Invitee Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alumni Name
                    </label>
                    <input
                      type="text"
                      value={newLecture.inviteeName}
                      onChange={(e) => setNewLecture(prev => ({ ...prev, inviteeName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter alumni name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newLecture.inviteeEmail}
                      onChange={(e) => setNewLecture(prev => ({ ...prev, inviteeEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="alumni@company.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleCreateLecture}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Send Invitation
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

export default FacultyGuestLecturesSection;