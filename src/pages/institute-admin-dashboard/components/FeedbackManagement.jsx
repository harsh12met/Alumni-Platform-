import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Star, 
  Eye, 
  Trash2, 
  Filter, 
  Search,
  Calendar,
  User,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Download
} from 'lucide-react';

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, events, general, suggestions
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock data - Replace with Firestore integration
  const mockFeedback = [
    {
      id: '1',
      type: 'event',
      title: 'Tech Innovation Summit 2024 Feedback',
      eventName: 'Tech Innovation Summit 2024',
      eventId: 'event_1',
      rating: 4.5,
      message: 'Great event! The speakers were very knowledgeable and the networking opportunities were excellent. Would love to see more technical workshops in future events.',
      submittedBy: 'Rajesh Kumar',
      submitterEmail: 'rajesh.kumar@example.com',
      submittedAt: '2024-01-20T14:30:00Z',
      status: 'reviewed',
      category: 'event_feedback',
      isAnonymous: false,
      helpful: 12,
      tags: ['networking', 'technical', 'speakers']
    },
    {
      id: '2',
      type: 'general',
      title: 'Suggestion for Alumni Platform',
      eventName: null,
      eventId: null,
      rating: null,
      message: 'The alumni directory could use better search filters. It would be helpful to filter by graduation year, current location, and industry. Also, a mobile app would be great!',
      submittedBy: 'Anonymous User',
      submitterEmail: null,
      submittedAt: '2024-01-18T10:15:00Z',
      status: 'pending',
      category: 'platform_suggestion',
      isAnonymous: true,
      helpful: 8,
      tags: ['mobile', 'search', 'directory']
    },
    {
      id: '3',
      type: 'event',
      title: 'Career Development Workshop Feedback',
      eventName: 'Career Development Workshop',
      eventId: 'event_2',
      rating: 3.8,
      message: 'The workshop was informative but felt rushed. Could benefit from being extended to a full day or split into multiple sessions.',
      submittedBy: 'Priya Sharma',
      submitterEmail: 'priya.sharma@example.com',
      submittedAt: '2024-01-15T16:45:00Z',
      status: 'reviewed',
      category: 'event_feedback',
      isAnonymous: false,
      helpful: 5,
      tags: ['duration', 'content', 'pacing']
    },
    {
      id: '4',
      type: 'suggestion',
      title: 'Mentorship Program Enhancement',
      eventName: null,
      eventId: null,
      rating: null,
      message: 'The current mentorship program is good, but it would be beneficial to have more structured matching based on career goals and industries. Also, regular check-ins and progress tracking would help.',
      submittedBy: 'Amit Patel',
      submitterEmail: 'amit.patel@example.com',
      submittedAt: '2024-01-12T09:20:00Z',
      status: 'pending',
      category: 'program_suggestion',
      isAnonymous: false,
      helpful: 15,
      tags: ['mentorship', 'matching', 'tracking']
    },
    {
      id: '5',
      type: 'event',
      title: 'Alumni Networking Meet Feedback',
      eventName: 'Alumni Networking Meet',
      eventId: 'event_3',
      rating: 4.2,
      message: 'Great atmosphere and well-organized event. The venue was perfect and food was excellent. Would suggest having name tags with graduation years for easier networking.',
      submittedBy: 'Sunita Verma',
      submitterEmail: 'sunita.verma@example.com',
      submittedAt: '2024-01-10T19:30:00Z',
      status: 'reviewed',
      category: 'event_feedback',
      isAnonymous: false,
      helpful: 9,
      tags: ['networking', 'venue', 'organization']
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeedback(mockFeedback);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredFeedback = feedback.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.submittedBy && item.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const handleDelete = async (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedback(feedback.filter(item => item.id !== feedbackId));
      // TODO: Add Firestore delete logic
      console.log('Deleting feedback:', feedbackId);
    }
  };

  const handleMarkAsReviewed = async (feedbackId) => {
    setFeedback(feedback.map(item => 
      item.id === feedbackId ? { ...item, status: 'reviewed' } : item
    ));
    // TODO: Add Firestore update logic
    console.log('Marking as reviewed:', feedbackId);
  };

  const getStatusColor = (status) => {
    return status === 'reviewed' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  const getTypeColor = (type) => {
    const colors = {
      event: 'bg-blue-100 text-blue-800',
      general: 'bg-purple-100 text-purple-800',
      suggestion: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStarRating = (rating) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">{rating}/5</span>
      </div>
    );
  };

  const getAverageRating = () => {
    const ratingsOnly = feedback.filter(item => item.rating).map(item => item.rating);
    if (ratingsOnly.length === 0) return 0;
    return (ratingsOnly.reduce((sum, rating) => sum + rating, 0) / ratingsOnly.length).toFixed(1);
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
              <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
              Feedback Management
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage feedback from institute events and general suggestions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search feedback by title, message, or submitter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Feedback</option>
            <option value="event">Event Feedback</option>
            <option value="general">General Feedback</option>
            <option value="suggestion">Suggestions</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Feedback</p>
              <p className="text-xl font-bold text-gray-900">{feedback.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-xl font-bold text-yellow-600">
                {feedback.filter(f => f.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Reviewed</p>
              <p className="text-xl font-bold text-green-600">
                {feedback.filter(f => f.status === 'reviewed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <p className="text-xl font-bold text-purple-600">{getAverageRating()}/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredFeedback.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
            <p className="text-gray-600">No feedback matches your current filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredFeedback.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                        {item.eventName && (
                          <p className="text-sm text-blue-600 mb-2">Related to: {item.eventName}</p>
                        )}
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                          {item.isAnonymous && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              Anonymous
                            </span>
                          )}
                        </div>
                        {item.rating && renderStarRating(item.rating)}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 line-clamp-3">{item.message}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {item.isAnonymous ? 'Anonymous' : item.submittedBy}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(item.submittedAt)}
                        </div>
                        {item.helpful && (
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {item.helpful} found helpful
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedFeedback(item);
                            setShowDetailsModal(true);
                          }}
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {item.status === 'pending' && (
                          <button
                            onClick={() => handleMarkAsReviewed(item.id)}
                            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                          >
                            Mark Reviewed
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Details Modal */}
      {showDetailsModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Feedback Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{selectedFeedback.title}</h3>
                  {selectedFeedback.eventName && (
                    <p className="text-blue-600 text-sm">Related Event: {selectedFeedback.eventName}</p>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedFeedback.type)}`}>
                    {selectedFeedback.type.charAt(0).toUpperCase() + selectedFeedback.type.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedFeedback.status)}`}>
                    {selectedFeedback.status.charAt(0).toUpperCase() + selectedFeedback.status.slice(1)}
                  </span>
                </div>

                {selectedFeedback.rating && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Rating:</p>
                    {renderStarRating(selectedFeedback.rating)}
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                  <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">{selectedFeedback.message}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submitted by:</p>
                    <p className="text-gray-800">
                      {selectedFeedback.isAnonymous ? 'Anonymous User' : selectedFeedback.submittedBy}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submitted on:</p>
                    <p className="text-gray-800">{formatDate(selectedFeedback.submittedAt)}</p>
                  </div>
                </div>

                {selectedFeedback.tags && selectedFeedback.tags.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedFeedback.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                {selectedFeedback.status === 'pending' && (
                  <button
                    onClick={() => {
                      handleMarkAsReviewed(selectedFeedback.id);
                      setShowDetailsModal(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark as Reviewed
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;