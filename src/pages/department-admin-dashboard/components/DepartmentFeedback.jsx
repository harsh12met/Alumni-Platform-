import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Reply, 
  Search,
  Filter,
  Download,
  User,
  Calendar,
  StarIcon
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const DepartmentFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [filter, setFilter] = useState('all'); // all, excellent, good, average, poor
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const { user } = useAuth();

  // Mock data - Replace with Firestore integration
  const mockFeedback = [
    {
      id: '1',
      studentName: 'Arjun Patel',
      studentEmail: 'arjun.patel@student.edu',
      studentId: 'CS2024001',
      eventTitle: 'Advanced React Patterns Workshop',
      eventId: 'evt-1',
      rating: 5,
      feedbackText: 'Excellent workshop! The instructor explained complex concepts very clearly. The hands-on exercises were particularly helpful in understanding render props and HOCs. Would definitely recommend to fellow students.',
      category: 'event',
      submittedAt: '2024-01-25T16:30:00Z',
      department: user?.department || 'computer-science',
      isAnonymous: false,
      aspects: {
        content: 5,
        instructor: 5,
        organization: 4,
        venue: 4
      },
      suggestions: 'Maybe extend the duration by an hour to cover more examples.',
      wouldRecommend: true,
      status: 'new' // new, reviewed, replied
    },
    {
      id: '2',
      studentName: 'Anonymous',
      studentEmail: 'anonymous@student.edu',
      studentId: 'ANONYMOUS',
      eventTitle: 'Industry Connect: Career in AI/ML',
      eventId: 'evt-2',
      rating: 4,
      feedbackText: 'Good seminar with industry insights. The speakers were knowledgeable and shared practical advice. However, the Q&A session was too short and could have been more interactive.',
      category: 'event',
      submittedAt: '2024-01-22T14:45:00Z',
      department: user?.department || 'computer-science',
      isAnonymous: true,
      aspects: {
        content: 4,
        speaker: 4,
        organization: 5,
        venue: 3
      },
      suggestions: 'Allocate more time for Q&A and networking.',
      wouldRecommend: true,
      status: 'reviewed'
    },
    {
      id: '3',
      studentName: 'Priya Sharma',
      studentEmail: 'priya.sharma@student.edu',
      studentId: 'CS2022045',
      eventTitle: 'Cybersecurity Fundamentals',
      eventId: 'evt-3',
      rating: 5,
      feedbackText: 'Outstanding workshop! Very relevant topics covered comprehensively. The practical demonstrations were excellent and helped in better understanding of security concepts.',
      category: 'event',
      submittedAt: '2024-01-26T10:20:00Z',
      department: user?.department || 'computer-science',
      isAnonymous: false,
      aspects: {
        content: 5,
        instructor: 5,
        organization: 5,
        venue: 4
      },
      suggestions: 'Could include more real-world case studies.',
      wouldRecommend: true,
      status: 'replied',
      reply: {
        text: 'Thank you for your positive feedback! We\'ll definitely include more case studies in future sessions.',
        repliedBy: 'Dr. Anita Desai',
        repliedAt: '2024-01-27T09:15:00Z'
      }
    },
    {
      id: '4',
      studentName: 'Rahul Kumar',
      studentEmail: 'rahul.kumar@student.edu',
      studentId: 'CS2024002',
      eventTitle: 'Department Facilities',
      eventId: null,
      rating: 3,
      feedbackText: 'The lab facilities are decent but some computers are outdated. The Wi-Fi connectivity is inconsistent in certain areas of the building. Library resources are good though.',
      category: 'facilities',
      submittedAt: '2024-01-20T11:30:00Z',
      department: user?.department || 'computer-science',
      isAnonymous: false,
      aspects: {
        infrastructure: 3,
        equipment: 2,
        cleanliness: 4,
        accessibility: 4
      },
      suggestions: 'Upgrade older computers and improve Wi-Fi coverage.',
      wouldRecommend: false,
      status: 'new'
    },
    {
      id: '5',
      studentName: 'Anonymous',
      studentEmail: 'anonymous@student.edu',
      studentId: 'ANONYMOUS',
      eventTitle: 'Teaching Quality - Data Structures Course',
      eventId: null,
      rating: 2,
      feedbackText: 'The course content is good but the teaching methodology needs improvement. Concepts are explained too quickly and there\'s not enough practice time during lectures.',
      category: 'teaching',
      submittedAt: '2024-01-18T13:15:00Z',
      department: user?.department || 'computer-science',
      isAnonymous: true,
      aspects: {
        clarity: 2,
        pace: 2,
        engagement: 3,
        materials: 4
      },
      suggestions: 'Slow down the pace and include more interactive examples.',
      wouldRecommend: false,
      status: 'reviewed'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Filter by department
      const departmentFeedback = mockFeedback.filter(
        fb => fb.department === user?.department
      );
      setFeedback(departmentFeedback);
      setLoading(false);
    }, 1000);
  }, [user?.department]);

  const filteredFeedback = feedback.filter(fb => {
    const matchesFilter = filter === 'all' || 
      (filter === 'excellent' && fb.rating === 5) ||
      (filter === 'good' && fb.rating === 4) ||
      (filter === 'average' && fb.rating === 3) ||
      (filter === 'poor' && fb.rating <= 2);
    
    const matchesSearch = fb.feedbackText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fb.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fb.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleReply = async (feedbackId) => {
    if (!replyText.trim()) return;

    const updatedFeedback = feedback.map(fb => 
      fb.id === feedbackId 
        ? { 
            ...fb, 
            status: 'replied',
            reply: {
              text: replyText,
              repliedBy: user?.name || 'Department Admin',
              repliedAt: new Date().toISOString()
            }
          } 
        : fb
    );
    
    setFeedback(updatedFeedback);
    setReplyText('');
    setShowReplyModal(false);
    setSelectedFeedback(null);
    
    // TODO: Add Firestore update logic
    console.log('Replying to feedback:', feedbackId, 'Reply:', replyText);
  };

  const markAsReviewed = async (feedbackId) => {
    const updatedFeedback = feedback.map(fb => 
      fb.id === feedbackId ? { ...fb, status: 'reviewed' } : fb
    );
    
    setFeedback(updatedFeedback);
    
    // TODO: Add Firestore update logic
    console.log('Marking feedback as reviewed:', feedbackId);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingBadge = (rating) => {
    const colors = {
      5: 'bg-green-100 text-green-800',
      4: 'bg-blue-100 text-blue-800',
      3: 'bg-yellow-100 text-yellow-800',
      2: 'bg-orange-100 text-orange-800',
      1: 'bg-red-100 text-red-800'
    };

    const labels = {
      5: 'Excellent',
      4: 'Good',
      3: 'Average',
      2: 'Poor',
      1: 'Very Poor'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[rating]}`}>
        {labels[rating]}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-yellow-100 text-yellow-800',
      replied: 'bg-green-100 text-green-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      event: 'bg-purple-100 text-purple-800',
      facilities: 'bg-blue-100 text-blue-800',
      teaching: 'bg-green-100 text-green-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
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

  const calculateAverageRating = () => {
    if (feedback.length === 0) return 0;
    const sum = feedback.reduce((acc, fb) => acc + fb.rating, 0);
    return (sum / feedback.length).toFixed(1);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
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
        <span className="ml-2 text-sm font-medium">{rating}/5</span>
      </div>
    );
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
              <MessageSquare className="w-6 h-6 mr-3 text-purple-600" />
              Department Feedback
            </h1>
            <p className="text-gray-600 mt-1">
              Review feedback and responses for {getDepartmentName()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
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
              placeholder="Search feedback..."
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
            <option value="all">All Ratings</option>
            <option value="excellent">Excellent (5★)</option>
            <option value="good">Good (4★)</option>
            <option value="average">Average (3★)</option>
            <option value="poor">Poor (1-2★)</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600" />
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
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-xl font-bold text-yellow-600">{calculateAverageRating()}/5</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Positive</p>
              <p className="text-xl font-bold text-green-600">
                {feedback.filter(fb => fb.rating >= 4).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Needs Attention</p>
              <p className="text-xl font-bold text-red-600">
                {feedback.filter(fb => fb.rating <= 2).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-4">
        {filteredFeedback.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
            <p className="text-gray-600">No feedback matches your current filters for {getDepartmentName()}.</p>
          </div>
        ) : (
          filteredFeedback.map((fb) => (
            <div key={fb.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {fb.isAnonymous ? 'Anonymous Feedback' : fb.studentName}
                        </h3>
                        {!fb.isAnonymous && (
                          <span className="text-purple-600 text-sm">({fb.studentId})</span>
                        )}
                      </div>
                      <p className="text-gray-600 font-medium">{fb.eventTitle}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(fb.category)}`}>
                          {fb.category}
                        </span>
                        {renderStars(fb.rating)}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(fb.status)}
                      {getRatingBadge(fb.rating)}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{fb.feedbackText}</p>
                  </div>

                  {/* Aspect Ratings */}
                  {fb.aspects && (
                    <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Detailed Ratings</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        {Object.entries(fb.aspects).map(([aspect, rating]) => (
                          <div key={aspect} className="flex items-center justify-between">
                            <span className="text-gray-600 capitalize">{aspect}:</span>
                            <div className="flex items-center">
                              <Star className={`w-3 h-3 mr-1 ${rating >= 4 ? 'text-green-500' : rating >= 3 ? 'text-yellow-500' : 'text-red-500'}`} />
                              <span className="font-medium">{rating}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {fb.suggestions && (
                    <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400">
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Suggestions</h4>
                      <p className="text-sm text-blue-700">{fb.suggestions}</p>
                    </div>
                  )}

                  {/* Recommendation */}
                  <div className="mb-4 flex items-center text-sm">
                    <span className="text-gray-600 mr-2">Would recommend:</span>
                    <span className={`font-medium ${fb.wouldRecommend ? 'text-green-600' : 'text-red-600'}`}>
                      {fb.wouldRecommend ? 'Yes' : 'No'}
                    </span>
                  </div>

                  {/* Reply Section */}
                  {fb.reply && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-green-900">Department Response</h4>
                        <span className="text-xs text-green-600">
                          {formatDate(fb.reply.repliedAt)}
                        </span>
                      </div>
                      <p className="text-sm text-green-800 mb-2">{fb.reply.text}</p>
                      <p className="text-xs text-green-600">- {fb.reply.repliedBy}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      Submitted: {formatDate(fb.submittedAt)}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedFeedback(fb)}
                        className="flex items-center px-2 py-1 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </button>
                      
                      {fb.status === 'new' && (
                        <button
                          onClick={() => markAsReviewed(fb.id)}
                          className="flex items-center px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                        >
                          Mark Reviewed
                        </button>
                      )}
                      
                      {fb.status !== 'replied' && (
                        <button
                          onClick={() => {
                            setSelectedFeedback(fb);
                            setShowReplyModal(true);
                          }}
                          className="flex items-center px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                        >
                          <Reply className="w-4 h-4 mr-1" />
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Feedback Details Modal */}
      {selectedFeedback && !showReplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Feedback Details</h2>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      {selectedFeedback.isAnonymous ? 'Anonymous Feedback' : selectedFeedback.studentName}
                    </h3>
                    {!selectedFeedback.isAnonymous && (
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Student ID: {selectedFeedback.studentId}</div>
                        <div>Email: {selectedFeedback.studentEmail}</div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Event/Topic</h4>
                    <p className="text-gray-700">{selectedFeedback.eventTitle}</p>
                    <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedFeedback.category)}`}>
                      {selectedFeedback.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Overall Rating</h4>
                    {renderStars(selectedFeedback.rating)}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Feedback</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedFeedback.feedbackText}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedFeedback.aspects && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Detailed Ratings</h4>
                      <div className="space-y-2">
                        {Object.entries(selectedFeedback.aspects).map(([aspect, rating]) => (
                          <div key={aspect} className="flex items-center justify-between">
                            <span className="text-gray-600 capitalize">{aspect}:</span>
                            <div className="flex items-center">
                              {renderStars(rating)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedFeedback.suggestions && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Suggestions</h4>
                      <p className="text-gray-700">{selectedFeedback.suggestions}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommendation</h4>
                    <span className={`font-medium ${selectedFeedback.wouldRecommend ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedFeedback.wouldRecommend ? 'Would recommend to others' : 'Would not recommend'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Submission Details</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Submitted: {formatDate(selectedFeedback.submittedAt)}</div>
                      <div>Status: {getStatusBadge(selectedFeedback.status)}</div>
                    </div>
                  </div>

                  {selectedFeedback.reply && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">Department Response</h4>
                      <p className="text-green-800 mb-2">{selectedFeedback.reply.text}</p>
                      <div className="text-sm text-green-600">
                        <div>By: {selectedFeedback.reply.repliedBy}</div>
                        <div>On: {formatDate(selectedFeedback.reply.repliedAt)}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                {selectedFeedback.status !== 'replied' && (
                  <button
                    onClick={() => setShowReplyModal(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Reply to Feedback
                  </button>
                )}
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Reply to Feedback</h2>
                <button
                  onClick={() => {
                    setShowReplyModal(false);
                    setReplyText('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Original Feedback</h3>
                <p className="text-sm text-gray-700">{selectedFeedback.feedbackText}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Rating:</span>
                  {renderStars(selectedFeedback.rating)}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Response
                </label>
                <textarea
                  rows={6}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Thank you for your feedback. We appreciate your input and will work on the suggestions you've provided..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowReplyModal(false);
                    setReplyText('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReply(selectedFeedback.id)}
                  disabled={!replyText.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentFeedback;