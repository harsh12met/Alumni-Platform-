import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Trash2, MapPin, Clock, DollarSign, Building } from 'lucide-react';

const JobsManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock data - Replace with Firebase Firestore calls
  useEffect(() => {
    const mockJobs = [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'Tech Innovations Inc.',
        location: 'San Francisco, CA',
        type: 'full-time',
        salary: '$120,000 - $150,000',
        description: 'Looking for experienced software engineer to join our team...',
        requirements: 'Bachelor\'s degree in Computer Science, 5+ years experience...',
        postedBy: 'TechCorp Recruiter',
        postedDate: '2024-01-20',
        deadline: '2024-02-20',
        status: 'active',
        applicants: 45,
        isVerified: true
      },
      {
        id: '2',
        title: 'Marketing Manager',
        company: 'Creative Solutions Ltd.',
        location: 'New York, NY',
        type: 'full-time',
        salary: '$80,000 - $100,000',
        description: 'Seeking creative marketing professional to lead our campaigns...',
        requirements: 'Marketing degree, 3+ years experience in digital marketing...',
        postedBy: 'HR Manager',
        postedDate: '2024-01-18',
        deadline: '2024-02-18',
        status: 'active',
        applicants: 32,
        isVerified: true
      },
      {
        id: '3',
        title: 'Data Analyst Intern',
        company: 'Analytics Pro',
        location: 'Remote',
        type: 'intern',
        salary: '$20/hour',
        description: 'Great opportunity for students to gain hands-on experience...',
        requirements: 'Currently pursuing degree in Statistics, Mathematics, or related field...',
        postedBy: 'Student Recruiter',
        postedDate: '2024-01-15',
        deadline: '2024-02-15',
        status: 'under-review',
        applicants: 78,
        isVerified: false
      },
      {
        id: '4',
        title: 'Freelance Web Developer',
        company: 'Digital Agency X',
        location: 'Los Angeles, CA',
        type: 'contract',
        salary: '$50 - $75/hour',
        description: 'Looking for talented freelancer for web development projects...',
        requirements: 'Proficiency in React, Node.js, and modern web technologies...',
        postedBy: 'Project Manager',
        postedDate: '2024-01-10',
        deadline: '2024-02-10',
        status: 'filled',
        applicants: 23,
        isVerified: true
      }
    ];
    
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    // TODO: Delete from Firebase Firestore
  };

  const handleVerifyJob = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, isVerified: true, status: 'active' } : job
    ));
    // TODO: Update Firebase Firestore
  };

  const handleRejectJob = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: 'rejected' } : job
    ));
    // TODO: Update Firebase Firestore
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    const matchesType = filterType === 'all' || job.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      'under-review': 'bg-yellow-100 text-yellow-800',
      filled: 'bg-blue-100 text-blue-800',
      expired: 'bg-gray-100 text-gray-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const styles = {
      'full-time': 'bg-blue-100 text-blue-800',
      'part-time': 'bg-purple-100 text-purple-800',
      contract: 'bg-orange-100 text-orange-800',
      intern: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[type]}`}>
        {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Jobs Management</h2>
          <p className="text-gray-600">Oversee job postings and remove inappropriate content</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="under-review">Under Review</option>
            <option value="filled">Filled</option>
            <option value="expired">Expired</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="intern">Internship</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    {!job.isVerified && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        Unverified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(job.status)}
                    {getTypeBadge(job.type)}
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Building className="w-4 h-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
              </div>

              {/* Salary */}
              <div className="flex items-center space-x-1 mb-4 text-sm">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-600">{job.salary}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

              {/* Timeline */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Applicants */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">
                  {job.applicants} applicants
                </span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${Math.min((job.applicants / 100) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  Posted by {job.postedBy}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-blue-600 hover:text-blue-800" title="View Details">
                    <Eye className="w-4 h-4" />
                  </button>
                  {job.status === 'under-review' && !job.isVerified && (
                    <>
                      <button 
                        onClick={() => handleVerifyJob(job.id)}
                        className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleRejectJob(job.id)}
                        className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => handleDeleteJob(job.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold">A</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.filter(j => j.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 font-bold">R</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.filter(j => j.status === 'under-review').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold">T</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Applicants</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.reduce((sum, job) => sum + job.applicants, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsManagement;