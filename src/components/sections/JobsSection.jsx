import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, ExternalLink, Search, Filter } from 'lucide-react';

const JobsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    company: ''
  });
  const [applications, setApplications] = useState([]);

  // Mock data - Replace with Firestore fetch
  useEffect(() => {
    const mockJobs = [
      {
        id: 1,
        title: 'Software Engineer Intern',
        company: 'Google',
        type: 'Internship',
        location: 'Mountain View, CA',
        salary: '$8,000/month',
        deadline: '2025-10-15',
        description: 'Join our engineering team to work on cutting-edge projects in machine learning and distributed systems.',
        requirements: ['React', 'JavaScript', 'Python', 'Computer Science'],
        posted: '2025-09-20',
        logo: null
      },
      {
        id: 2,
        title: 'Product Management Intern',
        company: 'Microsoft',
        type: 'Internship',
        location: 'Seattle, WA',
        salary: '$7,500/month',
        deadline: '2025-10-20',
        description: 'Work with product teams to define and launch new features for Microsoft Office suite.',
        requirements: ['Product Strategy', 'Data Analysis', 'Communication'],
        posted: '2025-09-18',
        logo: null
      },
      {
        id: 3,
        title: 'Data Science Intern',
        company: 'Amazon',
        type: 'Internship',
        location: 'Seattle, WA',
        salary: '$8,200/month',
        deadline: '2025-11-01',
        description: 'Apply machine learning techniques to solve complex business problems in e-commerce.',
        requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
        posted: '2025-09-15',
        logo: null
      },
      {
        id: 4,
        title: 'Full Stack Developer',
        company: 'Startup Inc',
        type: 'Full-time',
        location: 'San Francisco, CA',
        salary: '$120,000/year',
        deadline: '2025-10-30',
        description: 'Build scalable web applications using modern technologies in a fast-paced startup environment.',
        requirements: ['React', 'Node.js', 'MongoDB', 'AWS'],
        posted: '2025-09-22',
        logo: null
      }
    ];
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = !filters.type || job.type === filters.type;
      const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesCompany = !filters.company || job.company.toLowerCase().includes(filters.company.toLowerCase());

      return matchesSearch && matchesType && matchesLocation && matchesCompany;
    });
    setFilteredJobs(filtered);
  }, [searchTerm, filters, jobs]);

  const handleApply = (jobId) => {
    // TODO: Store application in Firestore applications collection
    if (applications.includes(jobId)) {
      alert('You have already applied to this job!');
      return;
    }
    
    setApplications(prev => [...prev, jobId]);
    alert('Application submitted successfully!');
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineColor = (days) => {
    if (days <= 3) return 'text-red-600 bg-red-50';
    if (days <= 7) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Jobs & Internships</h2>
        <p className="text-gray-600">Discover exciting career opportunities posted by top companies</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>

          {/* Location Filter */}
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredJobs.length} of {jobs.length} opportunities
        </p>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const daysLeft = getDaysUntilDeadline(job.deadline);
          const hasApplied = applications.includes(job.id);
          
          return (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {job.company.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                      <div className="flex items-center mt-1 space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.type === 'Internship' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {job.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDeadlineColor(daysLeft)}`}>
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Posted on {new Date(job.posted).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={hasApplied || daysLeft <= 0}
                      className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                        hasApplied 
                          ? 'bg-green-100 text-green-800 cursor-not-allowed'
                          : daysLeft <= 0
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      {hasApplied ? 'Applied' : daysLeft <= 0 ? 'Expired' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search filters to find more opportunities.</p>
        </div>
      )}
    </div>
  );
};

export default JobsSection;