import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MapPin,
  Building,
  Calendar,
  DollarSign,
  Users,
  Clock
} from 'lucide-react';

const JobsManagement = ({ instituteId }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - Replace with Firebase Firestore calls
  useEffect(() => {
    // TODO: Replace with actual Firebase query
    // const fetchJobs = async () => {
    //   const jobsRef = collection(db, 'jobs');
    //   const q = query(jobsRef, where('targetInstitutes', 'array-contains', instituteId));
    //   const snapshot = await getDocs(q);
    //   const jobsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   setJobs(jobsData);
    // };

    const mockJobs = [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'TechCorp Solutions',
        companyLogo: '/api/placeholder/40/40',
        location: 'San Francisco, CA',
        type: 'full-time',
        salary: '$120,000 - $150,000',
        description: 'We are looking for an experienced software engineer to join our growing team.',
        requirements: [
          '5+ years of software development experience',
          'Proficiency in React and Node.js',
          'Experience with cloud platforms (AWS, Azure)',
          'Strong problem-solving skills'
        ],
        postedDate: '2024-01-15',
        applicationDeadline: '2024-02-15',
        applicantCount: 45,
        status: 'approved',
        recruiterName: 'Sarah Johnson',
        recruiterEmail: 'sarah.johnson@techcorp.com',
        targetInstitutes: ['stanford_univ_001'],
        isUrgent: false,
        benefits: ['Health Insurance', 'Retirement Plan', 'Flexible Hours'],
        experienceLevel: 'Senior',
        isRemote: false
      },
      {
        id: '2',
        title: 'Marketing Manager',
        company: 'StartupXYZ',
        companyLogo: '/api/placeholder/40/40',
        location: 'Remote',
        type: 'full-time',
        salary: '$80,000 - $100,000',
        description: 'Lead our marketing efforts and drive brand awareness for our innovative products.',
        requirements: [
          '3+ years of marketing experience',
          'Digital marketing expertise',
          'Experience with social media campaigns',
          'Analytics and data-driven mindset'
        ],
        postedDate: '2024-01-20',
        applicationDeadline: '2024-02-20',
        applicantCount: 23,
        status: 'pending',
        recruiterName: 'Michael Brown',
        recruiterEmail: 'michael.brown@startupxyz.com',
        targetInstitutes: ['stanford_univ_001'],
        isUrgent: true,
        benefits: ['Remote Work', 'Stock Options', 'Professional Development'],
        experienceLevel: 'Mid-level',
        isRemote: true
      },
      {
        id: '3',
        title: 'Data Scientist',
        company: 'Analytics Pro',
        companyLogo: '/api/placeholder/40/40',
        location: 'New York, NY',
        type: 'full-time',
        salary: '$110,000 - $140,000',
        description: 'Join our data science team to extract insights from complex datasets.',
        requirements: [
          'PhD or Masters in Data Science/Statistics',
          'Python and R programming skills',
          'Machine learning experience',
          'Strong statistical background'
        ],
        postedDate: '2024-01-18',
        applicationDeadline: '2024-02-18',
        applicantCount: 67,
        status: 'approved',
        recruiterName: 'Emily Davis',
        recruiterEmail: 'emily.davis@analyticspro.com',
        targetInstitutes: ['stanford_univ_001'],
        isUrgent: false,
        benefits: ['Health Insurance', 'Learning Budget', 'Flexible Schedule'],
        experienceLevel: 'Senior',
        isRemote: false
      },
      {
        id: '4',
        title: 'Inappropriate Job Title',
        company: 'Suspicious Company',
        companyLogo: '/api/placeholder/40/40',
        location: 'Unknown',
        type: 'part-time',
        salary: 'Negotiable',
        description: 'This job posting contains inappropriate content and should be flagged.',
        requirements: [
          'Suspicious requirement 1',
          'Inappropriate content'
        ],
        postedDate: '2024-01-22',
        applicationDeadline: '2024-02-22',
        applicantCount: 2,
        status: 'flagged',
        recruiterName: 'Unknown Recruiter',
        recruiterEmail: 'unknown@suspicious.com',
        targetInstitutes: ['stanford_univ_001'],
        isUrgent: false,
        benefits: [],
        experienceLevel: 'Entry',
        isRemote: true,
        flagReason: 'Inappropriate content detected'
      },
      {
        id: '5',
        title: 'Junior Developer',
        company: 'DevShop Inc',
        companyLogo: '/api/placeholder/40/40',
        location: 'Austin, TX',
        type: 'full-time',
        salary: '$60,000 - $80,000',
        description: 'Great opportunity for new graduates to start their tech career.',
        requirements: [
          'Recent graduate in Computer Science',
          'Basic knowledge of programming',
          'Eagerness to learn',
          'Team player attitude'
        ],
        postedDate: '2024-01-12',
        applicationDeadline: '2024-02-12',
        applicantCount: 89,
        status: 'rejected',
        recruiterName: 'Alex Wilson',
        recruiterEmail: 'alex.wilson@devshop.com',
        targetInstitutes: ['stanford_univ_001'],
        isUrgent: false,
        benefits: ['Mentorship Program', 'Health Insurance', 'Career Growth'],
        experienceLevel: 'Entry',
        isRemote: false,
        rejectionReason: 'Company verification failed'
      }
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, [instituteId]);

  // Filter jobs
  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      const matchesType = typeFilter === 'all' || job.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, statusFilter, typeFilter]);

  const handleApproveJob = async (jobId) => {
    // TODO: Update job status in Firebase
    // await updateDoc(doc(db, 'jobs', jobId), { status: 'approved' });
    
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'approved' } : job
    ));
    console.log(`Approved job ${jobId}`);
  };

  const handleRejectJob = async (jobId, reason) => {
    // TODO: Update job status in Firebase
    // await updateDoc(doc(db, 'jobs', jobId), { 
    //   status: 'rejected', 
    //   rejectionReason: reason 
    // });
    
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'rejected', rejectionReason: reason } : job
    ));
    console.log(`Rejected job ${jobId} with reason: ${reason}`);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      // TODO: Delete from Firebase
      // await deleteDoc(doc(db, 'jobs', jobId));
      
      setJobs(prev => prev.filter(job => job.id !== jobId));
      console.log('Job deleted:', jobId);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'flagged':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800';
      case 'part-time':
        return 'bg-purple-100 text-purple-800';
      case 'contract':
        return 'bg-orange-100 text-orange-800';
      case 'internship':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
          <h2 className="text-2xl font-bold text-gray-900">Jobs Management</h2>
          <p className="text-gray-600">
            Monitor and moderate job postings for your institute
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
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.filter(j => j.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.filter(j => j.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Flagged</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.filter(j => j.status === 'flagged').length}
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
              placeholder="Search jobs..."
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
            <option value="flagged">Flagged</option>
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
          
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-gray-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        {job.isUrgent && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Urgent
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Posted: {job.postedDate}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(job.type)}`}>
                          {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                        </span>
                        <span className="text-gray-500">
                          <Users className="w-4 h-4 inline mr-1" />
                          {job.applicantCount} applicants
                        </span>
                        <span className="text-gray-500">
                          Experience: {job.experienceLevel}
                        </span>
                        {job.isRemote && (
                          <span className="text-blue-600 text-xs">Remote</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(job.status)}`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedJob(job);
                            setShowModal(true);
                          }}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {job.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveJob(job.id)}
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRejectJob(job.id, 'Does not meet institute standards')}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        {(job.status === 'flagged' || job.status === 'rejected') && (
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {(job.status === 'rejected' || job.status === 'flagged') && (job.rejectionReason || job.flagReason) && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">
                          {job.status === 'rejected' ? 'Rejection Reason:' : 'Flag Reason:'}
                        </span>
                      </div>
                      <p className="text-sm text-red-700 mt-1">
                        {job.rejectionReason || job.flagReason}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job Details Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Job Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h4>
                      <p className="text-lg text-gray-600 mb-2">{selectedJob.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{selectedJob.location}</span>
                        <span>•</span>
                        <span>{selectedJob.type}</span>
                        <span>•</span>
                        <span>{selectedJob.experienceLevel}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedJob.status)}`}>
                      {selectedJob.status}
                    </span>
                    <p className="text-lg font-semibold text-gray-900 mt-2">{selectedJob.salary}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Job Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Posted Date:</span>
                        <span>{selectedJob.postedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Application Deadline:</span>
                        <span>{selectedJob.applicationDeadline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Applicants:</span>
                        <span>{selectedJob.applicantCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Remote Work:</span>
                        <span>{selectedJob.isRemote ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Recruiter Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Name:</span>
                        <span>{selectedJob.recruiterName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email:</span>
                        <span>{selectedJob.recruiterEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Job Description</h5>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>

                {/* Requirements */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Requirements</h5>
                  <ul className="space-y-1">
                    {selectedJob.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-2 text-gray-700">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Benefits</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.benefits.map((benefit, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                {selectedJob.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleApproveJob(selectedJob.id);
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve Job
                    </button>
                    <button
                      onClick={() => {
                        handleRejectJob(selectedJob.id, 'Does not meet standards');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject Job
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowModal(false)}
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
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default JobsManagement;