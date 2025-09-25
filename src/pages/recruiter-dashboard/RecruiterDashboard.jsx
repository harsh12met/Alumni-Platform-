import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Search, 
  FileText, 
  Calendar, 
  Users, 
  BarChart3, 
  Bell, 
  LogOut,
  Menu,
  X,
  Plus,
  Edit3,
  Trash2,
  Eye,
  UserPlus,
  MapPin,
  Clock,
  Building2,
  Mail,
  Phone,
  Star,
  Filter,
  Download,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import AlumniMap from '../../components/ui/AlumniMap';
import AIChatAssistant from '../../components/ui/AIChatAssistant';

const RecruiterDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Mock data for demonstration
  const [jobPostings, setJobPostings] = useState([
    { id: 1, title: 'Senior Software Engineer', company: 'TechCorp', location: 'Bangalore', type: 'Full-time', applications: 45, deadline: '2025-12-15', status: 'active' },
    { id: 2, title: 'Data Scientist', company: 'TechCorp', location: 'Mumbai', type: 'Full-time', applications: 32, deadline: '2025-11-30', status: 'active' },
    { id: 3, title: 'Frontend Developer', company: 'TechCorp', location: 'Remote', type: 'Internship', applications: 67, deadline: '2025-10-25', status: 'active' }
  ]);

  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Rahul Sharma', batch: '2024', course: 'Computer Science', skills: ['React', 'Node.js', 'Python'], location: 'Bangalore', experience: '2 years', rating: 4.5 },
    { id: 2, name: 'Priya Patel', batch: '2023', course: 'Data Science', skills: ['Python', 'ML', 'TensorFlow'], location: 'Mumbai', experience: '3 years', rating: 4.8 },
    { id: 3, name: 'Amit Kumar', batch: '2024', course: 'Software Engineering', skills: ['Java', 'Spring', 'AWS'], location: 'Delhi', experience: '1 year', rating: 4.2 }
  ]);

  const [applications, setApplications] = useState([
    { id: 1, candidateName: 'Rahul Sharma', jobTitle: 'Senior Software Engineer', appliedDate: '2025-09-20', status: 'pending', score: 85 },
    { id: 2, candidateName: 'Priya Patel', jobTitle: 'Data Scientist', appliedDate: '2025-09-18', status: 'shortlisted', score: 92 },
    { id: 3, candidateName: 'Amit Kumar', jobTitle: 'Frontend Developer', appliedDate: '2025-09-22', status: 'interviewed', score: 78 }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'profile', label: 'Company Profile', icon: Building2 },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase },
    { id: 'candidate-search', label: 'Candidate Search', icon: Search },
    { id: 'alumni-map', label: 'Alumni Map', icon: MapPin },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'interviews', label: 'Interviews', icon: Calendar },
    { id: 'events', label: 'Company Events', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const handleLogout = () => {
    localStorage.removeItem('educonnect_user');
    window.location.href = '/login';
  };

  const showSuccess = (message) => {
    setShowSuccessMessage(message);
    setTimeout(() => setShowSuccessMessage(''), 3000);
  };

  const handleShortlist = (application) => {
    setApplications(prev => prev.map(app => 
      app.id === application.id ? { ...app, status: 'shortlisted' } : app
    ));
    showSuccess('Candidate shortlisted successfully!');
  };

  const handleReject = (application) => {
    setApplications(prev => prev.map(app => 
      app.id === application.id ? { ...app, status: 'rejected' } : app
    ));
    showSuccess('Application rejected!');
  };

  const handleInvite = (candidate) => {
    showSuccess(`Invitation sent to ${candidate.name}!`);
  };

  // Modal Component
  const Modal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {modalType === 'job' ? 'Create Job Posting' : 
               modalType === 'event' ? 'Create Company Event' :
               modalType === 'interview' ? 'Schedule Interview' : 'Details'}
            </h3>
            <button onClick={() => setShowModal(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {modalType === 'job' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Senior Software Engineer" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea className="w-full px-3 py-2 border rounded-lg h-24" placeholder="Job description..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Institute (Optional)</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option value="">All Institutes (No specific targeting)</option>
                  <option value="iit-delhi">Indian Institute of Technology, Delhi</option>
                  <option value="nit-mumbai">National Institute of Technology, Mumbai</option>
                  <option value="bits-pilani">Birla Institute of Technology and Science, Pilani</option>
                  <option value="vit-vellore">Vellore Institute of Technology, Vellore</option>
                  <option value="iisc-bangalore">Indian Institute of Science, Bangalore</option>
                  <option value="iit-bombay">Indian Institute of Technology, Bombay</option>
                  <option value="nit-trichy">National Institute of Technology, Tiruchirappalli</option>
                  <option value="iiit-hyderabad">International Institute of Information Technology, Hyderabad</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Leave unselected to show job to all institutes</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Bangalore" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>Full-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Skills Required</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="React, Node.js, Python" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Application Deadline</label>
                <input type="date" className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          )}

          {modalType === 'event' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Event Title</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Tech Talk: Future of AI" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea className="w-full px-3 py-2 border rounded-lg h-24" placeholder="Event description..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input type="date" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input type="time" className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Event Type</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Webinar</option>
                  <option>Career Talk</option>
                  <option>Workshop</option>
                  <option>Campus Visit</option>
                </select>
              </div>
            </div>
          )}
          
          <div className="flex space-x-3 mt-6">
            <button 
              onClick={() => { setShowModal(false); showSuccess('Saved successfully!'); }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
            <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Success Message Component
  const SuccessMessage = () => {
    if (!showSuccessMessage) return null;
    return (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
        {showSuccessMessage}
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, TechCorp!</h1>
            <p className="text-blue-100">Recruiter Dashboard • IT Services Company</p>
            <p className="text-blue-100 text-sm mt-1">Active since 2020 • 150+ hires</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm opacity-90">Active Jobs</div>
              <div className="text-lg font-semibold">8</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-green-600">+2 this month</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">144</p>
              <p className="text-xs text-green-600">+23 this week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Interviews Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-purple-600">5 this week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Hires This Month</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
              <p className="text-xs text-orange-600">Target: 8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
          <div className="space-y-4">
            {applications.slice(0, 5).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{app.candidateName}</h4>
                    <p className="text-sm text-gray-600">{app.jobTitle}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    app.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {app.status}
                  </span>
                  <button onClick={() => handleShortlist(app)} className="text-green-600 hover:text-green-700">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => { setModalType('job'); setShowModal(true); }}
              className="w-full flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
            >
              <Plus className="w-5 h-5" />
              <span>Post New Job</span>
            </button>
            <button 
              onClick={() => setActiveSection('candidate-search')}
              className="w-full flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
            >
              <Search className="w-5 h-5" />
              <span>Search Candidates</span>
            </button>
            <button 
              onClick={() => { setModalType('event'); setShowModal(true); }}
              className="w-full flex items-center space-x-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100"
            >
              <Calendar className="w-5 h-5" />
              <span>Create Event</span>
            </button>
            <button 
              onClick={() => setActiveSection('analytics')}
              className="w-full flex items-center space-x-3 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100"
            >
              <BarChart3 className="w-5 h-5" />
              <span>View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompanyProfile = () => (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Company Profile</h2>
          <button 
            onClick={() => showSuccess('Profile updated successfully!')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input type="text" defaultValue="TechCorp Solutions" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea className="w-full px-3 py-2 border rounded-lg h-24" defaultValue="Leading technology company specializing in innovative software solutions..."></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Industry</label>
                <input type="text" defaultValue="Information Technology" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Size</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>1000-5000 employees</option>
                  <option>100-500 employees</option>
                  <option>500-1000 employees</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input type="url" defaultValue="https://techcorp.com" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <input type="email" defaultValue="hr@techcorp.com" className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Company Logo</h4>
              <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <button className="mt-2 text-sm text-blue-600 hover:underline">Change Logo</button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Quick Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Founded:</span>
                  <span>2015</span>
                </div>
                <div className="flex justify-between">
                  <span>Locations:</span>
                  <span>12 cities</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Hires:</span>
                  <span>1,200+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobPostings = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Job Postings</h2>
        <button 
          onClick={() => { setModalType('job'); setShowModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </button>
      </div>
      
      <div className="grid gap-6">
        {jobPostings.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {job.applications} Applications
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCandidateSearch = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Candidate Search</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search candidates..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64" 
            />
          </div>
          <select 
            value={filterBy} 
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Candidates</option>
            <option value="2024">Batch 2024</option>
            <option value="2023">Batch 2023</option>
            <option value="cs">Computer Science</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>
      </div>
      
      <div className="grid gap-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{candidate.name}</h3>
                  <p className="text-gray-600 mb-2">{candidate.course} • Batch {candidate.batch}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{candidate.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{candidate.experience}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{candidate.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleInvite(candidate)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Invite</span>
                </button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Job Applications</h2>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <select className="px-3 py-2 border rounded-lg">
            <option>All Applications</option>
            <option>Pending Review</option>
            <option>Shortlisted</option>
            <option>Interviewed</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{app.candidateName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.jobTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.appliedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">{app.score}%</div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${app.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                      app.status === 'interviewed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleShortlist(app)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleReject(app)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInterviews = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Interview Schedule</h2>
        <button 
          onClick={() => { setModalType('interview'); setShowModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Interview</span>
        </button>
      </div>
      
      <div className="grid gap-4">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today's Interviews</h3>
            <span className="text-sm text-gray-500">3 scheduled</span>
          </div>
          <div className="space-y-4">
            {[
              { time: '10:00 AM', candidate: 'Rahul Sharma', position: 'Senior Software Engineer', type: 'Technical' },
              { time: '2:00 PM', candidate: 'Priya Patel', position: 'Data Scientist', type: 'HR Round' },
              { time: '4:00 PM', candidate: 'Amit Kumar', position: 'Frontend Developer', type: 'Final Round' }
            ].map((interview, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{interview.candidate}</h4>
                    <p className="text-sm text-gray-600">{interview.position} • {interview.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{interview.time}</div>
                  <button className="text-sm text-blue-600 hover:underline">Join Meeting</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Company Events</h2>
        <button 
          onClick={() => { setModalType('event'); setShowModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>
      
      <div className="grid gap-6">
        {[
          { title: 'Tech Talk: Future of AI', date: '2025-10-15', time: '3:00 PM', type: 'Webinar', attendees: 150 },
          { title: 'Campus Recruitment Drive', date: '2025-10-20', time: '10:00 AM', type: 'Campus Visit', attendees: 45 },
          { title: 'Career Guidance Session', date: '2025-10-25', time: '2:00 PM', type: 'Workshop', attendees: 80 }
        ].map((event, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} registered</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {event.type}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => {
    const pieData = [
      { name: 'Shortlisted', value: 30, color: '#10B981' },
      { name: 'Pending', value: 45, color: '#F59E0B' },
      { name: 'Rejected', value: 25, color: '#EF4444' }
    ];

    const barData = [
      { month: 'Jan', applications: 65, hires: 8 },
      { month: 'Feb', applications: 78, hires: 12 },
      { month: 'Mar', applications: 90, hires: 15 },
      { month: 'Apr', applications: 144, hires: 18 }
    ];

    return (
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Application Rate</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Interview Rate</p>
                <p className="text-2xl font-bold text-gray-900">45%</p>
                <p className="text-xs text-blue-600">+5% this month</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hire Rate</p>
                <p className="text-2xl font-bold text-gray-900">28%</p>
                <p className="text-xs text-purple-600">+8% this month</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time to Hire</p>
                <p className="text-2xl font-bold text-gray-900">14 days</p>
                <p className="text-xs text-orange-600">-2 days</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Application Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Recruitment Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#3B82F6" name="Applications" />
                <Bar dataKey="hires" fill="#10B981" name="Hires" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  const renderNotifications = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <button 
          onClick={() => showSuccess('All notifications marked as read!')}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Mark All as Read
        </button>
      </div>
      
      <div className="space-y-4">
        {[
          { type: 'application', message: 'New application received for Senior Software Engineer', time: '2 hours ago', unread: true },
          { type: 'interview', message: 'Interview scheduled with Rahul Sharma for tomorrow at 10 AM', time: '4 hours ago', unread: true },
          { type: 'deadline', message: 'Application deadline for Data Scientist position is tomorrow', time: '1 day ago', unread: false },
          { type: 'hire', message: 'Priya Patel accepted the job offer for Data Scientist role', time: '2 days ago', unread: false }
        ].map((notification, index) => (
          <div key={index} className={`p-4 rounded-lg border ${notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className="flex-1">
                  <p className="text-gray-900">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAlumniMap = () => (
    <div className="p-6">
      <AlumniMap showInstituteFilter={true} userRole="recruiter" />
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'profile': return renderCompanyProfile();
      case 'job-postings': return renderJobPostings();
      case 'candidate-search': return renderCandidateSearch();
      case 'alumni-map': return renderAlumniMap();
      case 'applications': return renderApplications();
      case 'interviews': return renderInterviews();
      case 'events': return renderEvents();
      case 'analytics': return renderAnalytics();
      case 'notifications': return renderNotifications();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900">TechCorp</h2>
                <p className="text-sm text-gray-600">Recruiter Portal</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">HR Manager</div>
                  <div className="text-gray-600">TechCorp Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>

      {/* Modal */}
      <Modal />
      
      {/* Success Message */}
      <SuccessMessage />
      
      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
};

export default RecruiterDashboard;