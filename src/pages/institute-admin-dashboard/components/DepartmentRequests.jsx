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
  Download
} from 'lucide-react';

const DepartmentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Mock data - Replace with Firestore integration
  const mockRequests = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '+91-9876543210',
      department: 'Computer Science',
      position: 'Professor',
      experience: '15 years',
      qualification: 'PhD in Computer Science',
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00Z',
      documents: ['resume.pdf', 'certificates.pdf'],
      reason: 'I would like to contribute to the alumni network and help bridge the gap between current students and industry professionals.'
    },
    {
      id: '2',
      name: 'Prof. Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91-9876543211',
      department: 'Electrical Engineering',
      position: 'Associate Professor',
      experience: '12 years',
      qualification: 'PhD in Electrical Engineering',
      status: 'pending',
      submittedAt: '2024-01-14T14:20:00Z',
      documents: ['resume.pdf', 'id_proof.pdf'],
      reason: 'Interested in managing department alumni activities and organizing technical events.'
    },
    {
      id: '3',
      name: 'Dr. Amit Patel',
      email: 'amit.patel@example.com',
      phone: '+91-9876543212',
      department: 'Mechanical Engineering',
      position: 'Department Head',
      experience: '18 years',
      qualification: 'PhD in Mechanical Engineering',
      status: 'approved',
      submittedAt: '2024-01-12T09:15:00Z',
      documents: ['resume.pdf'],
      reason: 'To strengthen industry-academia collaboration and improve placement opportunities.'
    },
    {
      id: '4',
      name: 'Dr. Sunita Verma',
      email: 'sunita.verma@example.com',
      phone: '+91-9876543213',
      department: 'Civil Engineering',
      position: 'Professor',
      experience: '14 years',
      qualification: 'PhD in Civil Engineering',
      status: 'rejected',
      submittedAt: '2024-01-10T16:45:00Z',
      documents: ['resume.pdf', 'certificates.pdf'],
      reason: 'Want to establish mentorship programs for current students.',
      rejectionReason: 'Insufficient documentation provided'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleApprove = async (requestId) => {
    if (window.confirm('Are you sure you want to approve this request?')) {
      // Update local state
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: 'approved' } : req
      ));
      
      // TODO: Add Firestore update logic
      console.log('Approving request:', requestId);
    }
  };

  const handleReject = async (requestId) => {
    const reason = window.prompt('Please provide a reason for rejection:');
    if (reason) {
      // Update local state
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: 'rejected', rejectionReason: reason } : req
      ));
      
      // TODO: Add Firestore update logic
      console.log('Rejecting request:', requestId, 'Reason:', reason);
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
              <Users className="w-6 h-6 mr-3 text-blue-600" />
              Department Admin Requests
            </h1>
            <p className="text-gray-600 mt-1">
              Review and approve department administrator registration requests
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
              placeholder="Search by name, department, or email..."
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
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-xl font-bold text-gray-900">{requests.length}</p>
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
                {requests.filter(r => r.status === 'pending').length}
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
                {requests.filter(r => r.status === 'approved').length}
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
                {requests.filter(r => r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-600">No department admin requests match your current filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                        <p className="text-gray-600">{request.position} • {request.department}</p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                        {request.experience} experience
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Submitted: {formatDate(request.submittedAt)}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-700">
                        <strong>Reason:</strong> {request.reason}
                      </p>
                    </div>

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
                            {doc}
                          </button>
                        ))}
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
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
            ))}
          </div>
        )}
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Request Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">{selectedRequest.name}</h3>
                  <p className="text-gray-600">{selectedRequest.position}</p>
                </div>
                <div>
                  <p><strong>Qualification:</strong> {selectedRequest.qualification}</p>
                  <p><strong>Experience:</strong> {selectedRequest.experience}</p>
                </div>
                <div>
                  <p><strong>Reason for Application:</strong></p>
                  <p className="text-gray-700 mt-1">{selectedRequest.reason}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentRequests;