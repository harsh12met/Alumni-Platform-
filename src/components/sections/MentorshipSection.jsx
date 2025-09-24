import React, { useState, useEffect } from 'react';
import { MessageSquare, Calendar, Clock, User, CheckCircle, XCircle, Send } from 'lucide-react';

const MentorshipSection = () => {
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    mentorId: '',
    message: '',
    topics: []
  });

  // Mock data - Replace with Firestore fetch
  useEffect(() => {
    const mockRequests = [
      {
        id: 1,
        mentorName: 'Sarah Johnson',
        mentorCompany: 'Google',
        mentorPosition: 'Software Engineer',
        status: 'pending',
        requestDate: '2025-09-20',
        message: 'Hi Sarah, I would love to learn about your journey into machine learning and get guidance on career paths.',
        topics: ['Machine Learning', 'Career Guidance'],
        responseMessage: null
      },
      {
        id: 2,
        mentorName: 'Raj Patel',
        mentorCompany: 'Microsoft',
        mentorPosition: 'Product Manager',
        status: 'accepted',
        requestDate: '2025-09-15',
        message: 'Hello Raj, I am interested in transitioning to product management. Could you guide me?',
        topics: ['Product Management', 'Career Transition'],
        responseMessage: 'Hi! I would be happy to help you with your PM journey. Let\'s schedule a call this week.',
        nextMeetingDate: '2025-09-25'
      },
      {
        id: 3,
        mentorName: 'Emily Chen',
        mentorCompany: 'Amazon',
        mentorPosition: 'Data Scientist',
        status: 'rejected',
        requestDate: '2025-09-10',
        message: 'Hi Emily, I am looking for guidance in data science and analytics.',
        topics: ['Data Science', 'Analytics'],
        responseMessage: 'Thanks for reaching out! Unfortunately, I\'m not taking new mentees at this time due to my current workload.'
      }
    ];
    setMentorshipRequests(mockRequests);
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Pending' },
      accepted: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Accepted' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'Rejected' }
    };
    
    const badge = badges[status];
    const IconComponent = badge.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
        <IconComponent className="w-4 h-4 mr-1" />
        {badge.text}
      </span>
    );
  };

  const handleSendRequest = () => {
    // TODO: Send to Firestore mentorship_requests collection
    console.log('Sending mentorship request:', newRequest);
    setShowNewRequestModal(false);
    setNewRequest({ mentorId: '', message: '', topics: [] });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mentorship</h2>
          <p className="text-gray-600">Manage your mentorship requests and connections</p>
        </div>
        <button
          onClick={() => setShowNewRequestModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send className="w-4 h-4 mr-2" />
          New Request
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-xl font-bold text-gray-900">
                {mentorshipRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active Mentorships</p>
              <p className="text-xl font-bold text-gray-900">
                {mentorshipRequests.filter(r => r.status === 'accepted').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-xl font-bold text-gray-900">{mentorshipRequests.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mentorship Requests List */}
      <div className="space-y-4">
        {mentorshipRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{request.mentorName}</h3>
                    <p className="text-gray-600">{request.mentorPosition} at {request.mentorCompany}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(request.status)}
                  <span className="text-sm text-gray-500">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Topics */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {request.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Request Message */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Your Message:</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-700">{request.message}</p>
                </div>
              </div>

              {/* Response (if any) */}
              {request.responseMessage && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Mentor's Response:</p>
                  <div className={`rounded-lg p-3 ${
                    request.status === 'accepted' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className="text-gray-700">{request.responseMessage}</p>
                  </div>
                </div>
              )}

              {/* Next Meeting (if accepted) */}
              {request.status === 'accepted' && request.nextMeetingDate && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-blue-800 font-medium">
                      Next Meeting: {new Date(request.nextMeetingDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {mentorshipRequests.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No mentorship requests yet</h3>
          <p className="text-gray-600 mb-4">Start connecting with alumni by sending your first mentorship request.</p>
          <button
            onClick={() => setShowNewRequestModal(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send First Request
          </button>
        </div>
      )}

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New Mentorship Request</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Mentor
                </label>
                <select
                  value={newRequest.mentorId}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, mentorId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a mentor...</option>
                  <option value="1">Sarah Johnson - Google</option>
                  <option value="2">Raj Patel - Microsoft</option>
                  <option value="3">Emily Chen - Amazon</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={newRequest.message}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Introduce yourself and explain what you hope to learn..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewRequestModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRequest}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorshipSection;