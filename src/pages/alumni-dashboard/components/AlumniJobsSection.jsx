import React, { useState, useEffect } from 'react';
import { Plus, Briefcase, MapPin, DollarSign, Calendar, Users, Eye, Edit3, Trash2 } from 'lucide-react';

const AlumniJobsSection = () => {
  const [postedJobs, setPostedJobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $150k',
      postedDate: '2024-03-10',
      applicants: 15,
      status: 'active',
      description: 'We are looking for a senior software engineer to join our team...'
    },
    {
      id: 2,
      title: 'Product Manager Intern',
      company: 'Startup Inc',
      location: 'Remote',
      type: 'Internship',
      salary: '$5k/month',
      postedDate: '2024-03-05',
      applicants: 8,
      status: 'active',
      description: 'Great opportunity for students to learn product management...'
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      jobId: 1,
      applicantName: 'John Smith',
      applicantEmail: 'john@email.com',
      applicantBatch: '2024',
      appliedDate: '2024-03-12',
      status: 'pending',
      resume: 'john_smith_resume.pdf'
    }
  ]);

  const [showCreateJob, setShowCreateJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('posted');
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: '',
    applicationDeadline: ''
  });

  useEffect(() => {
    // TODO: Fetch posted jobs from Firestore
    // const fetchPostedJobs = async () => {
    //   try {
    //     const q = query(
    //       collection(db, "jobs"),
    //       where("postedBy", "==", currentUserId),
    //       orderBy("postedDate", "desc")
    //     );
    //     const querySnapshot = await getDocs(q);
    //     const jobs = [];
    //     querySnapshot.forEach((doc) => {
    //       jobs.push({ id: doc.id, ...doc.data() });
    //     });
    //     setPostedJobs(jobs);
    //   } catch (error) {
    //     console.error("Error fetching jobs:", error);
    //   }
    // };
    // fetchPostedJobs();
  }, []);

  const handleCreateJob = async () => {
    try {
      const job = {
        ...newJob,
        id: Date.now(),
        postedDate: new Date().toISOString().split('T')[0],
        applicants: 0,
        status: 'active',
        postedBy: 'currentUserId' // TODO: Get from auth context
      };

      // TODO: Add job to Firestore
      // await addDoc(collection(db, "jobs"), job);
      
      setPostedJobs(prev => [job, ...prev]);
      setNewJob({
        title: '',
        company: '',
        location: '',
        type: '',
        salary: '',
        description: '',
        requirements: '',
        applicationDeadline: ''
      });
      setShowCreateJob(false);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      // TODO: Delete job from Firestore
      // await deleteDoc(doc(db, "jobs", jobId));
      
      setPostedJobs(prev => prev.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleApplicationAction = async (applicationId, action) => {
    try {
      // TODO: Update application status in Firestore
      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId
            ? { ...app, status: action }
            : app
        )
      );
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Management</h1>
            <p className="text-gray-600">Post opportunities and manage applications</p>
          </div>
          <button
            onClick={() => setShowCreateJob(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Post New Job
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('posted')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posted'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Posted Jobs ({postedJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Applications ({applications.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Create Job Modal */}
      {showCreateJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Post New Job</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={newJob.title}
                    onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={newJob.company}
                    onChange={(e) => setNewJob(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={newJob.type}
                    onChange={(e) => setNewJob(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) => setNewJob(prev => ({ ...prev, salary: e.target.value }))}
                    placeholder="e.g., $80k - $120k"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                  <input
                    type="date"
                    value={newJob.applicationDeadline}
                    onChange={(e) => setNewJob(prev => ({ ...prev, applicationDeadline: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                <textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                <textarea
                  value={newJob.requirements}
                  onChange={(e) => setNewJob(prev => ({ ...prev, requirements: e.target.value }))}
                  rows={3}
                  placeholder="List the key requirements and qualifications..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateJob(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateJob}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posted Jobs Tab */}
      {activeTab === 'posted' && (
        <div className="space-y-6">
          {postedJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Briefcase size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={16} className="mr-2" />
                      <span className="text-sm">{job.salary}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users size={16} className="mr-2" />
                      <span className="text-sm">{job.applicants} applicants</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {job.status === 'active' ? 'Active' : 'Closed'}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye size={16} className="mr-2" />
                    View Applications
                  </button>
                  <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Edit3 size={16} className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {postedJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
              <p className="text-gray-600">Start by posting your first job opportunity</p>
            </div>
          )}
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          {applications.map((application) => {
            const job = postedJobs.find(j => j.id === application.jobId);
            return (
              <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {application.applicantName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{application.applicantName}</h3>
                        <p className="text-gray-600">Applied for: {job?.title}</p>
                        <p className="text-sm text-gray-500">Batch {application.applicantBatch} • {application.applicantEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-sm text-gray-600">Applied on {new Date(application.appliedDate).toLocaleDateString()}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        application.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : application.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                        Download Resume
                      </button>
                    </div>
                  </div>

                  {application.status === 'pending' && (
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleApplicationAction(application.id, 'accepted')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleApplicationAction(application.id, 'rejected')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {applications.length === 0 && (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600">Applications for your posted jobs will appear here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlumniJobsSection;