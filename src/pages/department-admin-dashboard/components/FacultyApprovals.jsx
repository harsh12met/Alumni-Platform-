import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Check, 
  X, 
  Eye, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  Search,
  Filter,
  Download,
  FileText,
  Award
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const FacultyApprovals = () => {
  const [facultyRequests, setFacultyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { user } = useAuth();

  // Mock data - Replace with Firestore integration
  const mockFacultyRequests = [
    {
      id: '1',
      name: 'Dr. Priya Kulkarni',
      email: 'priya.kulkarni@university.edu',
      phone: '+91-9876543210',
      position: 'Assistant Professor',
      specialization: 'Machine Learning & AI',
      experience: '8 years',
      qualification: 'PhD in Computer Science',
      previousInstitution: 'MIT',
      status: 'pending',
      submittedAt: '2024-01-20T10:30:00Z',
      department: user?.department || 'computer-science',
      documents: ['resume.pdf', 'phd_certificate.pdf', 'recommendation_letters.pdf'],
      researchPapers: 15,
      teachingExperience: '5 years',
      biography: 'Dr. Priya Kulkarni is an experienced researcher in the field of Machine Learning and Artificial Intelligence. She has published numerous papers in top-tier conferences and has extensive teaching experience.',
      achievements: ['Best Paper Award at ICML 2023', 'NSF CAREER Award', 'Excellence in Teaching Award']
    },
    {
      id: '2',
      name: 'Prof. Rajesh Deshmukh',
      email: 'rajesh.deshmukh@university.edu',
      phone: '+91-9876543211',
      position: 'Associate Professor',
      specialization: 'Software Engineering',
      experience: '12 years',
      qualification: 'PhD in Software Engineering',
      previousInstitution: 'Stanford University',
      status: 'pending',
      submittedAt: '2024-01-18T14:20:00Z',
      department: user?.department || 'computer-science',
      documents: ['resume.pdf', 'certificates.pdf', 'portfolio.pdf'],
      researchPapers: 28,
      teachingExperience: '8 years',
      biography: 'Prof. Rajesh Deshmukh is a distinguished software engineering researcher with expertise in distributed systems and software architecture.',
      achievements: ['IEEE Fellow', 'ACM Distinguished Scientist', 'Best Instructor Award 2022']
    },
    {
      id: '3',
      name: 'Dr. Sneha Joshi',
      email: 'sneha.joshi@university.edu',
      phone: '+91-9876543212',
      position: 'Assistant Professor',
      specialization: 'Data Science & Analytics',
      experience: '6 years',
      qualification: 'PhD in Data Science',
      previousInstitution: 'UC Berkeley',
      status: 'approved',
      submittedAt: '2024-01-15T09:15:00Z',
      department: user?.department || 'computer-science',
      documents: ['resume.pdf', 'transcripts.pdf'],
      researchPapers: 12,
      teachingExperience: '4 years',
      biography: 'Dr. Sneha Joshi specializes in big data analytics and has worked on several industry projects involving large-scale data processing.',
      achievements: ['Outstanding Researcher Award', 'Google Research Grant Recipient']
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      email: 'james.wilson@university.edu',
      phone: '+91-9876543213',
      position: 'Lecturer',
      specialization: 'Computer Networks',
      experience: '4 years',
      qualification: 'PhD in Computer Networks',
      previousInstitution: 'CMU',
      status: 'rejected',
      submittedAt: '2024-01-12T16:45:00Z',
      department: user?.department || 'computer-science',
      documents: ['resume.pdf', 'degree_certificates.pdf'],
      researchPapers: 8,
      teachingExperience: '3 years',
      biography: 'Dr. James Wilson has research interests in network security and protocol design.',
      achievements: ['Best Student Paper Award'],
      rejectionReason: 'Insufficient teaching experience for the position requirements'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Filter by department
      const departmentRequests = mockFacultyRequests.filter(
        request => request.department === user?.department
      );
      setFacultyRequests(departmentRequests);
      setLoading(false);
    }, 1000);
  }, [user?.department]);

  const filteredRequests = facultyRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleApprove = async (requestId) => {
    if (window.confirm('Are you sure you want to approve this faculty request?')) {
      // Update local state
      setFacultyRequests(facultyRequests.map(req => 
        req.id === requestId ? { ...req, status: 'approved' } : req
      ));
      
      // TODO: Add Firestore update logic
      console.log('Approving faculty request:', requestId);
    }
  };

  const handleReject = async (requestId) => {
    const reason = window.prompt('Please provide a reason for rejection:');
    if (reason) {
      // Update local state
      setFacultyRequests(facultyRequests.map(req => 
        req.id === requestId ? { ...req, status: 'rejected', rejectionReason: reason } : req
      ));
      
      // TODO: Add Firestore update logic
      console.log('Rejecting faculty request:', requestId, 'Reason:', reason);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
              <Users className="w-6 h-6 mr-3 text-purple-600" />
              Faculty Approvals
            </h1>
            <p className="text-gray-600 mt-1">
              Review and approve faculty registration requests for {getDepartmentName()}
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
              placeholder="Search by name, specialization, or email..."
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
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-xl font-bold text-gray-900">{facultyRequests.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-yellow-600">
                {facultyRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-xl font-bold text-green-600">
                {facultyRequests.filter(r => r.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-xl font-bold text-red-600">
                {facultyRequests.filter(r => r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No faculty requests found</h3>
            <p className="text-gray-600">No faculty requests match your current filters for {getDepartmentName()}.</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                      <p className="text-purple-600 font-medium">{request.position}</p>
                      <p className="text-gray-600 text-sm">{request.specialization}</p>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {request.email}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {request.phone}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Building className="w-4 h-4 mr-2" />
                      Previous: {request.previousInstitution}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Experience: {request.experience}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-500">Research Papers:</span>
                        <p className="font-semibold">{request.researchPapers}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-500">Teaching Exp:</span>
                        <p className="font-semibold">{request.teachingExperience}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-700 line-clamp-2">{request.biography}</p>
                  </div>

                  {request.achievements && request.achievements.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Key Achievements:</p>
                      <div className="flex flex-wrap gap-1">
                        {request.achievements.slice(0, 2).map((achievement, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                          >
                            {achievement}
                          </span>
                        ))}
                        {request.achievements.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{request.achievements.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {request.status === 'rejected' && request.rejectionReason && (
                    <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400">
                      <p className="text-sm text-red-700">
                        <strong>Rejection Reason:</strong> {request.rejectionReason}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Documents:</span>
                      {request.documents.map((doc, index) => (
                        <button
                          key={index}
                          className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                        >
                          <FileText className="w-3 h-3 inline mr-1" />
                          {doc.split('.')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-gray-500">
                      Submitted: {formatDate(request.submittedAt)}
                    </p>
                    
                    {request.status === 'pending' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="flex items-center px-2 py-1 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </button>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Faculty Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Faculty Request Details</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{selectedRequest.name}</h3>
                    <p className="text-purple-600 font-medium">{selectedRequest.position}</p>
                    <p className="text-gray-600">{selectedRequest.specialization}</p>
                  </div>

                  <div className="space-y-2">
                    <div><strong>Email:</strong> {selectedRequest.email}</div>
                    <div><strong>Phone:</strong> {selectedRequest.phone}</div>
                    <div><strong>Qualification:</strong> {selectedRequest.qualification}</div>
                    <div><strong>Previous Institution:</strong> {selectedRequest.previousInstitution}</div>
                    <div><strong>Experience:</strong> {selectedRequest.experience}</div>
                    <div><strong>Teaching Experience:</strong> {selectedRequest.teachingExperience}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Biography</h4>
                    <p className="text-gray-700 text-sm">{selectedRequest.biography}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Achievements</h4>
                    <ul className="space-y-1">
                      {selectedRequest.achievements?.map((achievement, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <Award className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-600">Research Papers</span>
                      <p className="text-xl font-bold text-purple-600">{selectedRequest.researchPapers}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-600">Status</span>
                      <p className="font-semibold">{getStatusBadge(selectedRequest.status)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                {selectedRequest.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleReject(selectedRequest.id);
                        setSelectedRequest(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        handleApprove(selectedRequest.id);
                        setSelectedRequest(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedRequest(null)}
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

export default FacultyApprovals;