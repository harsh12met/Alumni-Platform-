import React, { useState, useEffect } from 'react';
import { Handshake, Plus, MessageCircle, Calendar, CheckCircle, Clock, Eye } from 'lucide-react';

const FacultyCollaborationsSection = () => {
  const [collaborations, setCollaborations] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollaboration, setNewCollaboration] = useState({
    title: '',
    description: '',
    type: 'research', // research, project, consulting, mentorship
    skills_required: '',
    duration: '',
    commitment: '',
    compensation: ''
  });

  useEffect(() => {
    // TODO: Fetch collaborations from Firestore
    // For now, using placeholder data
    const mockCollaborations = [
      {
        id: '1',
        title: 'Machine Learning Research Project',
        description: 'Looking for alumni with ML expertise to collaborate on predictive analytics research for healthcare applications.',
        type: 'research',
        skills_required: ['Machine Learning', 'Python', 'Healthcare Data'],
        duration: '6 months',
        commitment: 'Part-time (10-15 hours/week)',
        compensation: 'Research credit + Publication co-authorship',
        status: 'active',
        created_at: '2025-09-15',
        responses: [
          {
            id: 'resp1',
            alumni_name: 'Sarah Johnson',
            alumni_email: 'sarah.johnson@techcorp.com',
            message: 'I am very interested in this research project. I have 5+ years of experience in ML and have worked on healthcare applications.',
            status: 'pending',
            responded_at: '2025-09-18'
          }
        ]
      },
      {
        id: '2',
        title: 'Industry Mentorship Program',
        description: 'Seeking experienced alumni to mentor final year students in their capstone projects.',
        type: 'mentorship',
        skills_required: ['Software Development', 'Project Management', 'Industry Experience'],
        duration: '4 months',
        commitment: 'Weekly 1-hour sessions',
        compensation: 'Volunteer basis + Recognition certificate',
        status: 'active',
        created_at: '2025-09-10',
        responses: []
      },
      {
        id: '3',
        title: 'Curriculum Development Consultation',
        description: 'Need input from industry professionals to update our computer science curriculum to match current market needs.',
        type: 'consulting',
        skills_required: ['Industry Experience', 'Curriculum Design', 'Technical Leadership'],
        duration: '2 months',
        commitment: 'Monthly meetings + Review sessions',
        compensation: 'Consulting fee negotiable',
        status: 'completed',
        created_at: '2025-08-01',
        responses: [
          {
            id: 'resp2',
            alumni_name: 'Michael Chen',
            alumni_email: 'michael.chen@fintech.com',
            message: 'I would love to help with curriculum development. I have been involved in hiring decisions and can provide valuable insights.',
            status: 'accepted',
            responded_at: '2025-08-05'
          }
        ]
      }
    ];
    
    setCollaborations(mockCollaborations);
  }, []);

  const handleCreateCollaboration = async () => {
    try {
      // TODO: Save to Firestore
      const collaborationData = {
        ...newCollaboration,
        id: Date.now().toString(),
        skills_required: newCollaboration.skills_required.split(',').map(skill => skill.trim()).filter(skill => skill),
        status: 'active',
        created_at: new Date().toISOString().split('T')[0],
        responses: []
      };

      setCollaborations(prev => [collaborationData, ...prev]);
      setShowCreateModal(false);
      setNewCollaboration({
        title: '',
        description: '',
        type: 'research',
        skills_required: '',
        duration: '',
        commitment: '',
        compensation: ''
      });

      alert('Collaboration request posted successfully!');
    } catch (error) {
      console.error('Error creating collaboration:', error);
      alert('Error creating collaboration. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'research':
        return 'bg-purple-100 text-purple-800';
      case 'project':
        return 'bg-blue-100 text-blue-800';
      case 'consulting':
        return 'bg-orange-100 text-orange-800';
      case 'mentorship':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getResponseStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'declined':
        return <Clock className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Collaborations</h2>
          <p className="text-gray-600">Post collaboration requests and manage alumni responses.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Collaboration</span>
        </button>
      </div>

      {/* Collaborations List */}
      <div className="space-y-6">
        {collaborations.map((collaboration) => (
          <div key={collaboration.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{collaboration.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(collaboration.type)}`}>
                    {collaboration.type.charAt(0).toUpperCase() + collaboration.type.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(collaboration.status)}`}>
                    {collaboration.status.charAt(0).toUpperCase() + collaboration.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{collaboration.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Duration:</span>
                    <p className="text-sm text-gray-600">{collaboration.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Commitment:</span>
                    <p className="text-sm text-gray-600">{collaboration.commitment}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Compensation:</span>
                    <p className="text-sm text-gray-600">{collaboration.compensation}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Posted:</span>
                    <p className="text-sm text-gray-600">{collaboration.created_at}</p>
                  </div>
                </div>

                {/* Skills Required */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 mb-2 block">Skills Required:</span>
                  <div className="flex flex-wrap gap-2">
                    {collaboration.skills_required.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
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

            {/* Responses Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-2 mb-3">
                <MessageCircle className="h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-900">Responses ({collaboration.responses.length})</span>
              </div>

              {collaboration.responses.length > 0 ? (
                <div className="space-y-3">
                  {collaboration.responses.map((response) => (
                    <div key={response.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">{response.alumni_name}</span>
                            <span className="text-sm text-gray-500">{response.alumni_email}</span>
                            {getResponseStatusIcon(response.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{response.message}</p>
                          <span className="text-xs text-gray-500">Responded on {response.responded_at}</span>
                        </div>
                        {response.status === 'pending' && (
                          <div className="flex space-x-2 ml-4">
                            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                              Accept
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No responses yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {collaborations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Handshake className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No collaborations yet</h3>
          <p className="text-gray-600">Start by posting your first collaboration request.</p>
        </div>
      )}

      {/* Create Collaboration Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Create New Collaboration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newCollaboration.title}
                  onChange={(e) => setNewCollaboration(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter collaboration title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newCollaboration.description}
                  onChange={(e) => setNewCollaboration(prev => ({ ...prev, description: e.target.value }))}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Detailed description of the collaboration"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newCollaboration.type}
                    onChange={(e) => setNewCollaboration(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="research">Research</option>
                    <option value="project">Project</option>
                    <option value="consulting">Consulting</option>
                    <option value="mentorship">Mentorship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newCollaboration.duration}
                    onChange={(e) => setNewCollaboration(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 3 months, 1 year"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills Required
                </label>
                <input
                  type="text"
                  value={newCollaboration.skills_required}
                  onChange={(e) => setNewCollaboration(prev => ({ ...prev, skills_required: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter skills separated by commas (e.g., Python, Machine Learning, Data Science)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Commitment
                </label>
                <input
                  type="text"
                  value={newCollaboration.commitment}
                  onChange={(e) => setNewCollaboration(prev => ({ ...prev, commitment: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 10-15 hours/week, Weekly meetings"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compensation/Benefits
                </label>
                <input
                  type="text"
                  value={newCollaboration.compensation}
                  onChange={(e) => setNewCollaboration(prev => ({ ...prev, compensation: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Research credit, Consulting fee, Volunteer basis"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleCreateCollaboration}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Post Collaboration
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

export default FacultyCollaborationsSection;