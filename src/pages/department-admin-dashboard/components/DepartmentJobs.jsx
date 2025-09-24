import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  DollarSign,
  Users,
  Clock,
  Eye, 
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Building,
  GraduationCap,
  Star,
  X,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const DepartmentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, active, expired, draft
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();

  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'full-time',
    workMode: 'on-site',
    salaryMin: '',
    salaryMax: '',
    currency: 'INR',
    experience: '',
    description: '',
    requirements: '',
    responsibilities: '',
    skills: '',
    benefits: '',
    applicationDeadline: '',
    contactEmail: '',
    applicationUrl: '',
    category: 'software-development'
  });

  // Mock job data
  const mockJobs = [
    {
      id: '1',
      title: 'Senior Software Engineer - AI/ML',
      company: 'TechVision Solutions',
      companyLogo: '/api/placeholder/50/50',
      location: 'Bangalore, India',
      jobType: 'full-time',
      workMode: 'hybrid',
      salaryMin: 1200000,
      salaryMax: 1800000,
      currency: 'INR',
      experience: '3-5 years',
      category: 'software-development',
      description: 'We are looking for a Senior Software Engineer specializing in AI/ML to join our innovative team. You will work on cutting-edge projects involving machine learning, natural language processing, and computer vision.',
      requirements: 'Bachelor\'s degree in Computer Science or related field\n3+ years of experience in software development\nStrong knowledge of Python, TensorFlow, PyTorch\nExperience with cloud platforms (AWS, Azure, GCP)\nKnowledge of data structures and algorithms',
      responsibilities: 'Design and implement machine learning models\nCollaborate with cross-functional teams\nOptimize model performance and scalability\nMentor junior developers\nContribute to technical architecture decisions',
      skills: 'Python, TensorFlow, PyTorch, AWS, Machine Learning, Deep Learning, Data Science, REST APIs',
      benefits: 'Competitive salary and equity\nHealth insurance for family\nFlexible working hours\nLearning and development budget\nStock options',
      postedDate: '2024-01-20T10:30:00Z',
      applicationDeadline: '2024-02-20T23:59:59Z',
      status: 'active',
      applications: 45,
      views: 234,
      contactEmail: 'careers@techvision.com',
      applicationUrl: 'https://techvision.com/careers/senior-swe-ai',
      department: user?.department || 'computer-science',
      postedBy: 'HR Team',
      featured: true,
      urgent: false
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupHub Technologies',
      companyLogo: '/api/placeholder/50/50',
      location: 'Mumbai, India',
      jobType: 'full-time',
      workMode: 'remote',
      salaryMin: 800000,
      salaryMax: 1200000,
      currency: 'INR',
      experience: '2-4 years',
      category: 'software-development',
      description: 'Join our dynamic startup as a Full Stack Developer and help build innovative web applications that serve millions of users. You\'ll work with modern technologies and have the opportunity to make significant impact.',
      requirements: 'Bachelor\'s degree in Computer Science\n2+ years of full-stack development experience\nProficiency in React, Node.js, MongoDB\nExperience with RESTful APIs\nKnowledge of version control (Git)',
      responsibilities: 'Develop and maintain web applications\nDesign responsive user interfaces\nImplement backend APIs and services\nCollaborate with product and design teams\nEnsure code quality and best practices',
      skills: 'React, Node.js, JavaScript, MongoDB, Express.js, HTML5, CSS3, Git, REST APIs',
      benefits: 'Competitive salary\nHealth and dental insurance\nRemote work flexibility\nProfessional development opportunities\nStartup equity participation',
      postedDate: '2024-01-18T14:20:00Z',
      applicationDeadline: '2024-02-15T23:59:59Z',
      status: 'active',
      applications: 32,
      views: 189,
      contactEmail: 'jobs@startuphub.com',
      applicationUrl: 'https://startuphub.com/careers/fullstack-dev',
      department: user?.department || 'computer-science',
      postedBy: 'CTO',
      featured: false,
      urgent: true
    },
    {
      id: '3',
      title: 'Data Scientist',
      company: 'Analytics Pro',
      companyLogo: '/api/placeholder/50/50',
      location: 'Hyderabad, India',
      jobType: 'full-time',
      workMode: 'on-site',
      salaryMin: 1000000,
      salaryMax: 1500000,
      currency: 'INR',
      experience: '2-5 years',
      category: 'data-science',
      description: 'We are seeking a talented Data Scientist to join our analytics team. You will work with large datasets, build predictive models, and provide actionable insights to drive business decisions.',
      requirements: 'Master\'s degree in Data Science, Statistics, or related field\n2+ years of experience in data analysis\nProficiency in Python, R, SQL\nExperience with machine learning algorithms\nStrong statistical analysis skills',
      responsibilities: 'Analyze complex datasets to identify trends\nBuild and deploy machine learning models\nCreate data visualizations and reports\nCollaborate with business stakeholders\nMaintain data quality and integrity',
      skills: 'Python, R, SQL, Pandas, Scikit-learn, Tableau, Statistics, Machine Learning, Data Visualization',
      benefits: 'Competitive compensation\nHealth insurance coverage\nProfessional training programs\nFlexible PTO policy\nModern office amenities',
      postedDate: '2024-01-15T09:15:00Z',
      applicationDeadline: '2024-02-10T23:59:59Z',
      status: 'active',
      applications: 28,
      views: 156,
      contactEmail: 'recruitment@analyticspro.com',
      applicationUrl: 'https://analyticspro.com/jobs/data-scientist',
      department: user?.department || 'computer-science',
      postedBy: 'Hiring Manager',
      featured: true,
      urgent: false
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudFirst Solutions',
      companyLogo: '/api/placeholder/50/50',
      location: 'Pune, India',
      jobType: 'full-time',
      workMode: 'hybrid',
      salaryMin: 900000,
      salaryMax: 1400000,
      currency: 'INR',
      experience: '3-6 years',
      category: 'devops',
      description: 'Looking for an experienced DevOps Engineer to help us scale our cloud infrastructure and improve our deployment processes. You\'ll work with modern DevOps tools and practices.',
      requirements: 'Bachelor\'s degree in Computer Science or Engineering\n3+ years of DevOps experience\nExperience with AWS, Docker, Kubernetes\nKnowledge of CI/CD pipelines\nScripting skills in Python or Bash',
      responsibilities: 'Manage cloud infrastructure and deployments\nImplement CI/CD pipelines\nMonitor system performance and reliability\nAutomate operational processes\nEnsure security and compliance',
      skills: 'AWS, Docker, Kubernetes, Jenkins, Terraform, Python, Bash, Linux, CI/CD, Monitoring',
      benefits: 'Competitive salary package\nHealth and life insurance\nFlexible working arrangements\nCertification support\nTeam building activities',
      postedDate: '2024-01-12T16:45:00Z',
      applicationDeadline: '2024-02-05T23:59:59Z',
      status: 'active',
      applications: 19,
      views: 123,
      contactEmail: 'careers@cloudfirst.com',
      applicationUrl: 'https://cloudfirst.com/careers/devops-engineer',
      department: user?.department || 'computer-science',
      postedBy: 'Technical Lead',
      featured: false,
      urgent: false
    },
    {
      id: '5',
      title: 'Frontend Developer - React',
      company: 'DesignTech Studios',
      companyLogo: '/api/placeholder/50/50',
      location: 'Delhi, India',
      jobType: 'contract',
      workMode: 'remote',
      salaryMin: 600000,
      salaryMax: 900000,
      currency: 'INR',
      experience: '1-3 years',
      category: 'software-development',
      description: 'We need a talented Frontend Developer to join our team on a contract basis. You\'ll work on exciting client projects and help create beautiful, responsive web applications.',
      requirements: 'Bachelor\'s degree preferred\n1+ years of React development experience\nStrong knowledge of JavaScript, HTML, CSS\nExperience with responsive design\nFamiliarity with version control systems',
      responsibilities: 'Develop responsive web interfaces\nImplement UI/UX designs\nOptimize applications for performance\nCollaborate with backend developers\nParticipate in code reviews',
      skills: 'React, JavaScript, HTML5, CSS3, Responsive Design, Git, Webpack, npm',
      benefits: 'Competitive contract rates\nFlexible working hours\nRemote work opportunity\nExposure to diverse projects\nSkill development support',
      postedDate: '2024-01-10T11:30:00Z',
      applicationDeadline: '2024-01-30T23:59:59Z',
      status: 'expired',
      applications: 67,
      views: 298,
      contactEmail: 'projects@designtech.com',
      applicationUrl: 'https://designtech.com/careers/frontend-react',
      department: user?.department || 'computer-science',
      postedBy: 'Project Manager',
      featured: false,
      urgent: false
    },
    {
      id: '6',
      title: 'Product Manager - Tech',
      company: 'InnovateLabs',
      companyLogo: '/api/placeholder/50/50',
      location: 'Bangalore, India',
      jobType: 'full-time',
      workMode: 'on-site',
      salaryMin: 1500000,
      salaryMax: 2200000,
      currency: 'INR',
      experience: '4-7 years',
      category: 'product-management',
      description: 'Draft job posting for Product Manager position...',
      requirements: 'MBA or equivalent experience\n4+ years in product management\nTechnical background preferred\nExperience with agile methodologies',
      responsibilities: 'Define product strategy and roadmap\nWork with engineering and design teams\nConduct market research\nManage product launches',
      skills: 'Product Strategy, Agile, Market Research, Analytics, Leadership',
      benefits: 'Competitive salary and equity\nHealth insurance\nLearning budget\nStock options',
      postedDate: null,
      applicationDeadline: '2024-03-01T23:59:59Z',
      status: 'draft',
      applications: 0,
      views: 0,
      contactEmail: 'hiring@innovatelabs.com',
      applicationUrl: '',
      department: user?.department || 'computer-science',
      postedBy: 'VP Product',
      featured: false,
      urgent: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const departmentJobs = mockJobs.filter(
        job => job.department === user?.department
      );
      setJobs(departmentJobs);
      setLoading(false);
    }, 1000);
  }, [user?.department]);

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'all' || job.status === filter;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleCreateJob = () => {
    setIsEditing(false);
    setJobForm({
      title: '',
      company: '',
      location: '',
      jobType: 'full-time',
      workMode: 'on-site',
      salaryMin: '',
      salaryMax: '',
      currency: 'INR',
      experience: '',
      description: '',
      requirements: '',
      responsibilities: '',
      skills: '',
      benefits: '',
      applicationDeadline: '',
      contactEmail: '',
      applicationUrl: '',
      category: 'software-development'
    });
    setShowCreateModal(true);
  };

  const handleEditJob = (job) => {
    setIsEditing(true);
    setJobForm({
      title: job.title,
      company: job.company,
      location: job.location,
      jobType: job.jobType,
      workMode: job.workMode,
      salaryMin: job.salaryMin.toString(),
      salaryMax: job.salaryMax.toString(),
      currency: job.currency,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      skills: job.skills,
      benefits: job.benefits,
      applicationDeadline: job.applicationDeadline.split('T')[0],
      contactEmail: job.contactEmail,
      applicationUrl: job.applicationUrl,
      category: job.category
    });
    setSelectedJob(job);
    setShowCreateModal(true);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  const handleSubmitJob = (e) => {
    e.preventDefault();
    
    const jobData = {
      ...jobForm,
      id: isEditing ? selectedJob.id : Date.now().toString(),
      salaryMin: parseInt(jobForm.salaryMin),
      salaryMax: parseInt(jobForm.salaryMax),
      department: user?.department,
      status: 'active',
      applications: isEditing ? selectedJob.applications : 0,
      views: isEditing ? selectedJob.views : 0,
      postedDate: isEditing ? selectedJob.postedDate : new Date().toISOString(),
      postedBy: user?.name || 'Admin',
      featured: false,
      urgent: false
    };

    if (isEditing) {
      setJobs(jobs.map(job => 
        job.id === selectedJob.id ? { ...job, ...jobData } : job
      ));
    } else {
      setJobs([...jobs, jobData]);
    }

    setShowCreateModal(false);
    setSelectedJob(null);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      draft: 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getJobTypeBadge = (type) => {
    const typeStyles = {
      'full-time': 'bg-blue-100 text-blue-800',
      'part-time': 'bg-purple-100 text-purple-800',
      'contract': 'bg-orange-100 text-orange-800',
      'internship': 'bg-pink-100 text-pink-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeStyles[type]}`}>
        {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  const getWorkModeBadge = (mode) => {
    const modeStyles = {
      'remote': 'bg-green-100 text-green-800',
      'on-site': 'bg-blue-100 text-blue-800',
      'hybrid': 'bg-purple-100 text-purple-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${modeStyles[mode]}`}>
        {mode.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  const formatSalary = (min, max, currency) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    if (min && max) {
      return `${formatter.format(min)} - ${formatter.format(max)}`;
    } else if (min) {
      return `${formatter.format(min)}+`;
    }
    return 'Salary not disclosed';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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

  const isDeadlineExpired = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
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
              <Briefcase className="w-6 h-6 mr-3 text-purple-600" />
              Department Jobs
            </h1>
            <p className="text-gray-600 mt-1">
              Manage job postings and opportunities for {getDepartmentName()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCreateJob}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post Job
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs..."
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
            <option value="all">All Jobs</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Jobs</p>
              <p className="text-xl font-bold text-gray-900">{jobs.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl font-bold text-green-600">
                {jobs.filter(j => j.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Applications</p>
              <p className="text-xl font-bold text-blue-600">
                {jobs.reduce((sum, j) => sum + (j.applications || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-xl font-bold text-orange-600">
                {jobs.reduce((sum, j) => sum + (j.views || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">No job postings match your current filters for {getDepartmentName()}.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        {job.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        {job.urgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-purple-600 font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.experience}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(job.status)}
                      {getJobTypeBadge(job.jobType)}
                      {getWorkModeBadge(job.workMode)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {job.skills.split(', ').slice(0, 5).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.split(', ').length > 5 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{job.skills.split(', ').length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {job.applications} applications
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {job.views} views
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Deadline: {formatDate(job.applicationDeadline)}
                        {isDeadlineExpired(job.applicationDeadline) && (
                          <span className="ml-1 text-red-500">(Expired)</span>
                        )}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="flex items-center px-2 py-1 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleEditJob(job)}
                        className="flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && !showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{selectedJob.title}</h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{selectedJob.company}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {selectedJob.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {selectedJob.experience}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {formatSalary(selectedJob.salaryMin, selectedJob.salaryMax, selectedJob.currency)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      {getStatusBadge(selectedJob.status)}
                      {getJobTypeBadge(selectedJob.jobType)}
                      {getWorkModeBadge(selectedJob.workMode)}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Job Description</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedJob.requirements}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Responsibilities</h4>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedJob.responsibilities}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedJob.benefits}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Skills Required</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedJob.skills.split(', ').map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Application Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Deadline:</span>
                        <p className="font-medium">{formatDate(selectedJob.applicationDeadline)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Contact:</span>
                        <p className="font-medium">{selectedJob.contactEmail}</p>
                      </div>
                      {selectedJob.applicationUrl && (
                        <div>
                          <span className="text-gray-500">Apply:</span>
                          <a
                            href={selectedJob.applicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Application Link
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Applications: {selectedJob.applications}</div>
                      <div>Views: {selectedJob.views}</div>
                      <div>Posted by: {selectedJob.postedBy}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                <button
                  onClick={() => handleEditJob(selectedJob)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Edit Job
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-96 overflow-y-auto">
            <form onSubmit={handleSubmitJob} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Edit Job' : 'Post New Job'}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.title}
                      onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.company}
                      onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.location}
                      onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Type *
                      </label>
                      <select
                        required
                        value={jobForm.jobType}
                        onChange={(e) => setJobForm({...jobForm, jobType: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Work Mode *
                      </label>
                      <select
                        required
                        value={jobForm.workMode}
                        onChange={(e) => setJobForm({...jobForm, workMode: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="on-site">On-site</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Salary
                      </label>
                      <input
                        type="number"
                        value={jobForm.salaryMin}
                        onChange={(e) => setJobForm({...jobForm, salaryMin: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Salary
                      </label>
                      <input
                        type="number"
                        value={jobForm.salaryMax}
                        onChange={(e) => setJobForm({...jobForm, salaryMax: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        value={jobForm.currency}
                        onChange={(e) => setJobForm({...jobForm, currency: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="INR">₹ INR</option>
                        <option value="USD">$ USD</option>
                        <option value="EUR">€ EUR</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Required *
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.experience}
                      onChange={(e) => setJobForm({...jobForm, experience: e.target.value})}
                      placeholder="e.g., 2-4 years"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={jobForm.description}
                      onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={jobForm.requirements}
                      onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                      placeholder="List key requirements, one per line"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills Required *
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.skills}
                      onChange={(e) => setJobForm({...jobForm, skills: e.target.value})}
                      placeholder="React, Node.js, JavaScript, etc. (comma separated)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Deadline *
                    </label>
                    <input
                      type="date"
                      required
                      value={jobForm.applicationDeadline}
                      onChange={(e) => setJobForm({...jobForm, applicationDeadline: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={jobForm.contactEmail}
                      onChange={(e) => setJobForm({...jobForm, contactEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application URL
                    </label>
                    <input
                      type="url"
                      value={jobForm.applicationUrl}
                      onChange={(e) => setJobForm({...jobForm, applicationUrl: e.target.value})}
                      placeholder="https://company.com/careers/job-id"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Responsibilities
                  </label>
                  <textarea
                    rows={3}
                    value={jobForm.responsibilities}
                    onChange={(e) => setJobForm({...jobForm, responsibilities: e.target.value})}
                    placeholder="List key responsibilities, one per line"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Benefits
                  </label>
                  <textarea
                    rows={2}
                    value={jobForm.benefits}
                    onChange={(e) => setJobForm({...jobForm, benefits: e.target.value})}
                    placeholder="List benefits and perks"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {isEditing ? 'Update Job' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentJobs;