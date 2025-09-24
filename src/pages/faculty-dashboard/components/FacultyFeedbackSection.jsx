import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Star, TrendingUp, BarChart3, FileText, Users, Calendar } from 'lucide-react';

const FacultyFeedbackSection = () => {
  const [feedbackForms, setFeedbackForms] = useState([]);
  const [responses, setResponses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('forms'); // forms, responses, analytics
  const [newForm, setNewForm] = useState({
    title: '',
    description: '',
    type: 'course', // course, curriculum, faculty, event, general
    target_audience: 'students', // students, alumni, faculty, all
    questions: [
      { id: 1, type: 'rating', question: '', required: true, options: [] }
    ],
    is_anonymous: true,
    start_date: '',
    end_date: '',
    status: 'draft'
  });

  useEffect(() => {
    // TODO: Fetch feedback forms from Firestore
    // For now, using placeholder data
    const mockFeedbackForms = [
      {
        id: '1',
        title: 'Computer Science Curriculum Feedback 2024',
        description: 'Help us improve our computer science curriculum by providing your valuable feedback.',
        type: 'curriculum',
        target_audience: 'students',
        created_by: 'Dr. Sarah Wilson',
        created_at: '2025-09-01',
        start_date: '2025-09-01',
        end_date: '2025-10-31',
        status: 'active',
        is_anonymous: true,
        response_count: 156,
        questions: [
          {
            id: 1,
            type: 'rating',
            question: 'How would you rate the overall curriculum relevance to industry needs?',
            required: true,
            options: ['1', '2', '3', '4', '5']
          },
          {
            id: 2,
            type: 'multiple_choice',
            question: 'Which areas need more focus in the curriculum?',
            required: true,
            options: ['Machine Learning', 'Web Development', 'Mobile Development', 'Data Science', 'Cybersecurity']
          },
          {
            id: 3,
            type: 'text',
            question: 'What specific skills or technologies should be added to the curriculum?',
            required: false,
            options: []
          }
        ]
      },
      {
        id: '2',
        title: 'AI Workshop Feedback',
        description: 'Please share your experience and suggestions for our recent AI workshop.',
        type: 'event',
        target_audience: 'all',
        created_by: 'Prof. Michael Chen',
        created_at: '2025-09-20',
        start_date: '2025-09-20',
        end_date: '2025-09-27',
        status: 'completed',
        is_anonymous: false,
        response_count: 45,
        questions: [
          {
            id: 1,
            type: 'rating',
            question: 'How satisfied were you with the workshop content?',
            required: true,
            options: ['1', '2', '3', '4', '5']
          },
          {
            id: 2,
            type: 'text',
            question: 'What was the most valuable part of the workshop?',
            required: false,
            options: []
          }
        ]
      },
      {
        id: '3',
        title: 'Faculty Performance Evaluation',
        description: 'Anonymous feedback on teaching methods and course delivery.',
        type: 'faculty',
        target_audience: 'students',
        created_by: 'Dr. Emily Rodriguez',
        created_at: '2025-09-15',
        start_date: '2025-09-15',
        end_date: '2025-12-15',
        status: 'active',
        is_anonymous: true,
        response_count: 89,
        questions: []
      }
    ];
    
    setFeedbackForms(mockFeedbackForms);

    // Mock responses for analytics
    const mockResponses = [
      {
        form_id: '1',
        responses: [
          { question_id: 1, rating: 4, count: 45 },
          { question_id: 1, rating: 5, count: 67 },
          { question_id: 1, rating: 3, count: 32 },
          { question_id: 1, rating: 2, count: 8 },
          { question_id: 1, rating: 1, count: 4 }
        ]
      }
    ];
    setResponses(mockResponses);
  }, []);

  const handleCreateForm = async () => {
    try {
      // TODO: Save to Firestore
      const formData = {
        ...newForm,
        id: Date.now().toString(),
        created_by: 'Current Faculty Name', // TODO: Get from auth context
        created_at: new Date().toISOString().split('T')[0],
        response_count: 0
      };

      setFeedbackForms(prev => [formData, ...prev]);
      setShowCreateModal(false);
      setNewForm({
        title: '',
        description: '',
        type: 'course',
        target_audience: 'students',
        questions: [
          { id: 1, type: 'rating', question: '', required: true, options: [] }
        ],
        is_anonymous: true,
        start_date: '',
        end_date: '',
        status: 'draft'
      });

      alert('Feedback form created successfully!');
    } catch (error) {
      console.error('Error creating feedback form:', error);
      alert('Error creating feedback form. Please try again.');
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      id: newForm.questions.length + 1,
      type: 'rating',
      question: '',
      required: true,
      options: []
    };
    setNewForm(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (questionId, field, value) => {
    setNewForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  const removeQuestion = (questionId) => {
    setNewForm(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'course':
        return 'bg-purple-100 text-purple-800';
      case 'curriculum':
        return 'bg-blue-100 text-blue-800';
      case 'faculty':
        return 'bg-orange-100 text-orange-800';
      case 'event':
        return 'bg-green-100 text-green-800';
      case 'general':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAverageRating = (formId) => {
    const formResponses = responses.find(r => r.form_id === formId);
    if (!formResponses) return 0;
    
    const totalRatings = formResponses.responses.reduce((sum, r) => sum + (r.rating * r.count), 0);
    const totalCount = formResponses.responses.reduce((sum, r) => sum + r.count, 0);
    
    return totalCount > 0 ? (totalRatings / totalCount).toFixed(1) : 0;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Feedback Management</h2>
          <p className="text-gray-600">Create feedback forms and analyze responses for continuous improvement.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Form</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'forms', label: 'Forms', icon: FileText, count: feedbackForms.length },
            { id: 'responses', label: 'Responses', icon: MessageSquare, count: feedbackForms.reduce((sum, form) => sum + form.response_count, 0) },
            { id: 'analytics', label: 'Analytics', icon: BarChart3, count: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.count !== null && <span>({tab.count})</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Forms Tab */}
      {activeTab === 'forms' && (
        <div className="space-y-6">
          {feedbackForms.map((form) => (
            <div key={form.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{form.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(form.type)}`}>
                      {form.type.charAt(0).toUpperCase() + form.type.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(form.status)}`}>
                      {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{form.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Target Audience:</span>
                      <p className="text-sm text-gray-600 capitalize">{form.target_audience}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Responses:</span>
                      <p className="text-sm text-gray-600">{form.response_count}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Start Date:</span>
                      <p className="text-sm text-gray-600">{form.start_date}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">End Date:</span>
                      <p className="text-sm text-gray-600">{form.end_date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Created by {form.created_by}</span>
                    </div>
                    {form.is_anonymous && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Anonymous
                      </span>
                    )}
                  </div>
                </div>

                <div className="ml-4 flex flex-col space-y-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Edit Form
                  </button>
                  <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    View Responses
                  </button>
                  {form.status === 'active' && (
                    <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Share Link
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Total Forms</h3>
                  <p className="text-2xl font-bold text-blue-600">{feedbackForms.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Total Responses</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {feedbackForms.reduce((sum, form) => sum + form.response_count, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Avg. Rating</h3>
                  <p className="text-2xl font-bold text-yellow-600">4.2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Form Analytics */}
          <div className="space-y-6">
            {feedbackForms.map((form) => (
              <div key={form.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{form.title}</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{form.response_count} responses</span>
                    <span className="text-sm font-medium text-green-600">
                      Avg: {calculateAverageRating(form.id)} ⭐
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Response Rate</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((form.response_count / 200) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{form.response_count}/200 target responses</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Status Breakdown</h4>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Completed</span>
                        <span className="font-medium">{form.response_count}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">In Progress</span>
                        <span className="font-medium">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {activeTab === 'forms' && feedbackForms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <MessageSquare className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback forms yet</h3>
          <p className="text-gray-600">Create your first feedback form to start collecting responses.</p>
        </div>
      )}

      {/* Create Form Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Feedback Form</h3>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form Title
                  </label>
                  <input
                    type="text"
                    value={newForm.title}
                    onChange={(e) => setNewForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter form title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newForm.description}
                    onChange={(e) => setNewForm(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Form description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={newForm.type}
                      onChange={(e) => setNewForm(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="course">Course</option>
                      <option value="curriculum">Curriculum</option>
                      <option value="faculty">Faculty</option>
                      <option value="event">Event</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Audience
                    </label>
                    <select
                      value={newForm.target_audience}
                      onChange={(e) => setNewForm(prev => ({ ...prev, target_audience: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="students">Students</option>
                      <option value="alumni">Alumni</option>
                      <option value="faculty">Faculty</option>
                      <option value="all">All</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-3 pt-6">
                    <input
                      type="checkbox"
                      id="is_anonymous"
                      checked={newForm.is_anonymous}
                      onChange={(e) => setNewForm(prev => ({ ...prev, is_anonymous: e.target.checked }))}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_anonymous" className="text-sm font-medium text-gray-700">
                      Anonymous
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newForm.start_date}
                      onChange={(e) => setNewForm(prev => ({ ...prev, start_date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newForm.end_date}
                      onChange={(e) => setNewForm(prev => ({ ...prev, end_date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Questions Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">Questions</h4>
                  <button
                    onClick={addQuestion}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Question</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {newForm.questions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Question {index + 1}</span>
                        {newForm.questions.length > 1 && (
                          <button
                            onClick={() => removeQuestion(question.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <input
                            type="text"
                            value={question.question}
                            onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your question"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <select
                              value={question.type}
                              onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="rating">Rating (1-5)</option>
                              <option value="multiple_choice">Multiple Choice</option>
                              <option value="text">Text Response</option>
                              <option value="yes_no">Yes/No</option>
                            </select>
                          </div>
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={question.required}
                              onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label className="text-sm font-medium text-gray-700">
                              Required
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleCreateForm}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Form
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

export default FacultyFeedbackSection;