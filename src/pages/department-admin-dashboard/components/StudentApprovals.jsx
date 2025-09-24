import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Check, 
  X, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  Search,
  Filter,
  Download,
  FileText,
  User,
  BookOpen,
  Hash
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const StudentApprovals = () => {
  const [studentRequests, setStudentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { user } = useAuth();

  // Mock data - Replace with Firestore integration
  const mockStudentRequests = [
    {
      id: '1',
      name: 'Arjun Patel',
      email: 'arjun.patel@student.edu',
      phone: '+91-9876543210',
      studentId: 'CS2024001',
      year: '1st Year',
      semester: 'Fall 2024',
      program: 'Bachelor of Technology',
      cgpa: null, // First year student
      previousEducation: '12th Grade - 92%',
      dateOfBirth: '2005-08-15',
      address: '123 Main Street, Mumbai, Maharashtra',
      parentContact: '+91-9876543220',
      status: 'pending',
      submittedAt: '2024-01-20T10:30:00Z',
      department: user?.department || 'computer-science',
      documents: ['10th_marksheet.pdf', '12th_marksheet.pdf', 'entrance_exam_score.pdf', 'id_proof.pdf'],
      entranceExamScore: 'JEE Main: 98.5 percentile',
      category: 'General',
      admissionType: 'Regular',
      hostelRequired: true,
      scholarshipApplied: false
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@student.edu',
      phone: '+91-9876543211',
      studentId: 'CS2022045',
      year: '3rd Year',
      semester: 'Spring 2024',
      program: 'Bachelor of Technology',
      cgpa: 8.7,
      previousEducation: '12th Grade - 94%',
      dateOfBirth: '2003-03-22',
      address: '456 Park Avenue, Delhi, Delhi',
      parentContact: '+91-9876543221',
      status: 'pending',
      submittedAt: '2024-01-18T14:20:00Z',
      department: user?.department || 'computer-science',
      documents: ['transcript.pdf', 'transfer_certificate.pdf', 'id_proof.pdf'],
      entranceExamScore: 'JEE Advanced: 95.2 percentile',
      category: 'OBC',
      admissionType: 'Transfer',
      hostelRequired: false,
      scholarshipApplied: true,
      previousInstitution: 'NIT Warangal'
    },
    {
      id: '3',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@student.edu',
      phone: '+91-9876543212',
      studentId: 'CS2024002',
      year: '1st Year',
      semester: 'Fall 2024',
      program: 'Bachelor of Technology',
      cgpa: null,
      previousEducation: '12th Grade - 88%',
      dateOfBirth: '2005-11-10',
      address: '789 College Road, Bangalore, Karnataka',
      parentContact: '+91-9876543222',
      status: 'approved',
      submittedAt: '2024-01-15T09:15:00Z',
      department: user?.department || 'computer-science',
      documents: ['marksheets.pdf', 'entrance_score.pdf'],
      entranceExamScore: 'JEE Main: 96.8 percentile',
      category: 'SC',
      admissionType: 'Regular',
      hostelRequired: true,
      scholarshipApplied: true
    },
    {
      id: '4',
      name: 'Sneha Gupta',
      email: 'sneha.gupta@student.edu',
      phone: '+91-9876543213',
      studentId: 'CS2024003',
      year: '1st Year',
      semester: 'Fall 2024',
      program: 'Bachelor of Technology',
      cgpa: null,
      previousEducation: '12th Grade - 85%',
      dateOfBirth: '2005-07-28',
      address: '321 Students Colony, Pune, Maharashtra',
      parentContact: '+91-9876543223',
      status: 'rejected',
      submittedAt: '2024-01-12T16:45:00Z',
      department: user?.department || 'computer-science',
      documents: ['incomplete_docs.pdf'],
      entranceExamScore: 'JEE Main: 89.2 percentile',
      category: 'General',
      admissionType: 'Regular',
      hostelRequired: false,
      scholarshipApplied: false,
      rejectionReason: 'Incomplete documentation - missing entrance exam scorecard'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Filter by department
      const departmentRequests = mockStudentRequests.filter(
        request => request.department === user?.department
      );
      setStudentRequests(departmentRequests);
      setLoading(false);
    }, 1000);
  }, [user?.department]);

  const filteredRequests = studentRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleApprove = async (requestId) => {
    if (window.confirm('Are you sure you want to approve this student request?')) {
      // Update local state
      setStudentRequests(studentRequests.map(req => 
        req.id === requestId ? { ...req, status: 'approved' } : req
      ));
      
      // TODO: Add Firestore update logic
      console.log('Approving student request:', requestId);
    }
  };

  const handleReject = async (requestId) => {
    const reason = window.prompt('Please provide a reason for rejection:');
    if (reason) {
      // Update local state
      setStudentRequests(studentRequests.map(req => 
        req.id === requestId ? { ...req, status: 'rejected', rejectionReason: reason } : req
      ));
      
      // TODO: Add Firestore update logic
      console.log('Rejecting student request:', requestId, 'Reason:', reason);
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

  const getCategoryColor = (category) => {
    const colors = {
      'General': 'bg-blue-100 text-blue-800',
      'OBC': 'bg-green-100 text-green-800',
      'SC': 'bg-purple-100 text-purple-800',
      'ST': 'bg-orange-100 text-orange-800'
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
              <GraduationCap className="w-6 h-6 mr-3 text-purple-600" />
              Student Approvals
            </h1>
            <p className="text-gray-600 mt-1">
              Review and approve student registration requests for {getDepartmentName()}
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
              placeholder="Search by name, student ID, or email..."
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
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-xl font-bold text-gray-900">{studentRequests.length}</p>
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
                {studentRequests.filter(r => r.status === 'pending').length}
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
                {studentRequests.filter(r => r.status === 'approved').length}
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
                {studentRequests.filter(r => r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No student requests found</h3>
            <p className="text-gray-600">No student requests match your current filters for {getDepartmentName()}.</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                      <p className="text-purple-600 font-medium">{request.studentId}</p>
                      <p className="text-gray-600 text-sm">{request.year} • {request.program}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(request.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(request.category)}`}>
                        {request.category}
                      </span>
                    </div>
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
                      <Hash className="w-4 h-4 mr-2" />
                      {request.entranceExamScore}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {request.previousEducation}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-500">Admission Type:</span>
                        <p className="font-semibold">{request.admissionType}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-500">CGPA:</span>
                        <p className="font-semibold">{request.cgpa || 'N/A (1st Year)'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {request.hostelRequired && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Hostel Required
                      </span>
                    )}
                    {request.scholarshipApplied && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Scholarship Applied
                      </span>
                    )}
                    {request.previousInstitution && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        Transfer Student
                      </span>
                    )}
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
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {request.documents.length} files
                      </span>
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

      {/* Student Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Student Request Details</h2>
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
                    <p className="text-purple-600 font-medium">{selectedRequest.studentId}</p>
                    <p className="text-gray-600">{selectedRequest.year} • {selectedRequest.program}</p>
                  </div>

                  <div className="space-y-2">
                    <div><strong>Email:</strong> {selectedRequest.email}</div>
                    <div><strong>Phone:</strong> {selectedRequest.phone}</div>
                    <div><strong>Date of Birth:</strong> {new Date(selectedRequest.dateOfBirth).toLocaleDateString('en-IN')}</div>
                    <div><strong>Parent Contact:</strong> {selectedRequest.parentContact}</div>
                    <div><strong>Address:</strong> {selectedRequest.address}</div>
                  </div>

                  <div className="space-y-2">
                    <div><strong>Category:</strong> {getCategoryColor(selectedRequest.category) && (
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedRequest.category)}`}>
                        {selectedRequest.category}
                      </span>
                    )}</div>
                    <div><strong>Admission Type:</strong> {selectedRequest.admissionType}</div>
                    <div><strong>Entrance Score:</strong> {selectedRequest.entranceExamScore}</div>
                    {selectedRequest.previousInstitution && (
                      <div><strong>Previous Institution:</strong> {selectedRequest.previousInstitution}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Academic Information</h4>
                    <div className="space-y-2">
                      <div><strong>Previous Education:</strong> {selectedRequest.previousEducation}</div>
                      <div><strong>Current CGPA:</strong> {selectedRequest.cgpa || 'N/A (First Year)'}</div>
                      <div><strong>Semester:</strong> {selectedRequest.semester}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Additional Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <strong>Hostel Required:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${selectedRequest.hostelRequired ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedRequest.hostelRequired ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <strong>Scholarship Applied:</strong>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${selectedRequest.scholarshipApplied ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedRequest.scholarshipApplied ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                    <div className="space-y-1">
                      {selectedRequest.documents.map((doc, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <FileText className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-600">Status</span>
                    <p className="font-semibold">{getStatusBadge(selectedRequest.status)}</p>
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

export default StudentApprovals;