import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  AlertCircle,
  User,
  UserCheck,
  UserX,
  GraduationCap,
  Building2
} from 'lucide-react';

const UsersManagement = ({ instituteId }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data - Replace with Firebase Firestore calls
  useEffect(() => {
    // TODO: Replace with actual Firebase query
    // const fetchUsers = async () => {
    //   const usersRef = collection(db, 'users');
    //   const q = query(usersRef, where('instituteId', '==', instituteId));
    //   const snapshot = await getDocs(q);
    //   const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   setUsers(usersData);
    // };

    const mockUsers = [
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice.johnson@stanford.edu',
        phone: '+1-555-0123',
        role: 'alumni',
        status: 'pending',
        registrationDate: '2024-01-15',
        lastActive: '2024-01-20',
        instituteId: 'stanford_univ_001',
        graduationYear: 2020,
        department: 'Computer Science',
        profileComplete: 85,
        verificationDocument: 'diploma.pdf'
      },
      {
        id: '2',
        name: 'Bob Smith',
        email: 'bob.smith@stanford.edu',
        phone: '+1-555-0124',
        role: 'student',
        status: 'approved',
        registrationDate: '2024-01-10',
        lastActive: '2024-01-21',
        instituteId: 'stanford_univ_001',
        currentYear: 3,
        department: 'Engineering',
        profileComplete: 92,
        verificationDocument: 'student_id.pdf'
      },
      {
        id: '3',
        name: 'Carol Williams',
        email: 'carol.williams@techcorp.com',
        phone: '+1-555-0125',
        role: 'recruiter',
        status: 'approved',
        registrationDate: '2024-01-12',
        lastActive: '2024-01-19',
        instituteId: 'stanford_univ_001',
        company: 'TechCorp Solutions',
        position: 'HR Manager',
        profileComplete: 78,
        verificationDocument: 'company_letter.pdf'
      },
      {
        id: '4',
        name: 'David Brown',
        email: 'david.brown@stanford.edu',
        phone: '+1-555-0126',
        role: 'alumni',
        status: 'rejected',
        registrationDate: '2024-01-08',
        lastActive: '2024-01-18',
        instituteId: 'stanford_univ_001',
        graduationYear: 2018,
        department: 'Business',
        profileComplete: 45,
        rejectionReason: 'Incomplete verification documents'
      },
      {
        id: '5',
        name: 'Emma Davis',
        email: 'emma.davis@stanford.edu',
        phone: '+1-555-0127',
        role: 'student',
        status: 'pending',
        registrationDate: '2024-01-18',
        lastActive: '2024-01-21',
        instituteId: 'stanford_univ_001',
        currentYear: 1,
        department: 'Medicine',
        profileComplete: 67,
        verificationDocument: 'enrollment_letter.pdf'
      }
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, [instituteId]);

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter, roleFilter]);

  const handleApproveUser = async (userId) => {
    // TODO: Update user status in Firebase
    // await updateDoc(doc(db, 'users', userId), { status: 'approved' });
    
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'approved' } : user
    ));
    console.log(`Approved user ${userId}`);
  };

  const handleRejectUser = async (userId, reason) => {
    // TODO: Update user status in Firebase
    // await updateDoc(doc(db, 'users', userId), { 
    //   status: 'rejected', 
    //   rejectionReason: reason 
    // });
    
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'rejected', rejectionReason: reason } : user
    ));
    console.log(`Rejected user ${userId} with reason: ${reason}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'alumni':
        return <GraduationCap className="w-4 h-4" />;
      case 'student':
        return <User className="w-4 h-4" />;
      case 'recruiter':
        return <Building2 className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
          <p className="text-gray-600">
            Manage alumni, student, and recruiter registrations for your institute
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Institute: </span>
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">{instituteId}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="alumni">Alumni</option>
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
          </select>
          
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRoleIcon(user.role)}
                      <span className="ml-2 text-sm text-gray-900 capitalize">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.department || user.company || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.registrationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${user.profileComplete}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{user.profileComplete}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {user.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApproveUser(user.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleRejectUser(user.id, 'Rejected by admin')}
                            className="text-red-600 hover:text-red-900"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      
                      <button className="text-gray-400 hover:text-gray-600" title="Send Email">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">User Details</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900">{selectedUser.name}</h4>
                    <p className="text-gray-600 mb-2">{selectedUser.email}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{selectedUser.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Registered: {selectedUser.registrationDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Role */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <p className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Role</label>
                    <div className="flex items-center mt-1">
                      {getRoleIcon(selectedUser.role)}
                      <span className="ml-2 text-sm capitalize">{selectedUser.role}</span>
                    </div>
                  </div>
                </div>

                {/* Role-specific Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)} Information
                  </h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedUser.role === 'alumni' && (
                      <>
                        <div>
                          <span className="text-gray-500">Graduation Year:</span>
                          <p className="font-medium">{selectedUser.graduationYear}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Department:</span>
                          <p className="font-medium">{selectedUser.department}</p>
                        </div>
                      </>
                    )}
                    {selectedUser.role === 'student' && (
                      <>
                        <div>
                          <span className="text-gray-500">Current Year:</span>
                          <p className="font-medium">Year {selectedUser.currentYear}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Department:</span>
                          <p className="font-medium">{selectedUser.department}</p>
                        </div>
                      </>
                    )}
                    {selectedUser.role === 'recruiter' && (
                      <>
                        <div>
                          <span className="text-gray-500">Company:</span>
                          <p className="font-medium">{selectedUser.company}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Position:</span>
                          <p className="font-medium">{selectedUser.position}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Profile Completion */}
                <div>
                  <label className="text-sm font-medium text-gray-500">Profile Completion</label>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-3 mr-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${selectedUser.profileComplete}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{selectedUser.profileComplete}%</span>
                  </div>
                </div>

                {/* Verification Document */}
                {selectedUser.verificationDocument && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Verification Document</label>
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-800">{selectedUser.verificationDocument}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm underline">
                          View Document
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rejection Reason */}
                {selectedUser.status === 'rejected' && selectedUser.rejectionReason && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <label className="text-sm font-medium text-red-800">Rejection Reason</label>
                    <p className="text-sm text-red-700 mt-1">{selectedUser.rejectionReason}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                {selectedUser.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleApproveUser(selectedUser.id);
                        setSelectedUser(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve User
                    </button>
                    <button
                      onClick={() => {
                        handleRejectUser(selectedUser.id, 'Rejected after review');
                        setSelectedUser(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject User
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;