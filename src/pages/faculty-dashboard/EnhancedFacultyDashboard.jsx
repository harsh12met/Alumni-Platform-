import React, { useState } from 'react';
import { 
  User, 
  Users, 
  Presentation, 
  Handshake, 
  Calendar, 
  MessageSquare, 
  Bell, 
  LogOut,
  Menu,
  X,
  Search,
  Settings,
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  FileText,
  Video,
  Star,
  Activity,
  BarChart3,
  UserCheck,
  ChevronRight,
  Plus
} from 'lucide-react';

const EnhancedFacultyDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState('');

  const handleEdit = (type, item) => {
    setModalType(type);
    setSelectedItem(item);
    setEditData(item);
    setShowModal(true);
  };

  const handleAccept = (type, item) => {
    setShowSuccessMessage(`${type} accepted successfully!`);
    setTimeout(() => setShowSuccessMessage(''), 3000);
  };

  const handleReject = (type, item) => {
    setShowSuccessMessage(`${type} rejected successfully!`);
    setTimeout(() => setShowSuccessMessage(''), 3000);
  };

  const handleSave = () => {
    setShowSuccessMessage('Changes saved successfully!');
    setShowModal(false);
    setTimeout(() => setShowSuccessMessage(''), 3000);
  };

  const handleConnect = (alumni) => {
    setShowSuccessMessage(`Connection request sent to ${alumni.name}!`);
    setTimeout(() => setShowSuccessMessage(''), 3000);
  };

  const handleMarkRead = (notification) => {
    setShowSuccessMessage('Notification marked as read!');
    setTimeout(() => setShowSuccessMessage(''), 3000);
  };

  // Modal Component for Editing
  const EditModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Edit {modalType}</h3>
            <button 
              onClick={() => setShowModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            {modalType === 'Course' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                  <input
                    type="text"
                    value={editData.name || ''}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Students</label>
                  <input
                    type="number"
                    value={editData.students || ''}
                    onChange={(e) => setEditData({...editData, students: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}
            
            {modalType === 'Project' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editData.progress || ''}
                    onChange={(e) => setEditData({...editData, progress: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}
            
            {modalType === 'Event' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={editData.date || ''}
                    onChange={(e) => setEditData({...editData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Save Changes
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
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
      <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <span>{showSuccessMessage}</span>
      </div>
    );
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'research', label: 'Research Projects', icon: Award },
    { id: 'alumni-directory', label: 'Alumni Network', icon: UserCheck },
    { id: 'guest-lectures', label: 'Guest Lectures', icon: Presentation },
    { id: 'collaborations', label: 'Collaborations', icon: Handshake },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'feedback', label: 'Feedback & Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const handleLogout = () => {
    localStorage.removeItem('educonnect_user');
    window.location.href = '/login';
  };

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Dr. Faculty Name!</h1>
            <p className="text-green-100">Professor, Computer Science Department</p>
            <p className="text-green-100 text-sm mt-1">BITS Pilani • Fall Semester 2025</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm opacity-90">Today's Schedule</div>
              <div className="text-lg font-semibold">4 Classes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
              <p className="text-xs text-green-600">+2 this semester</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">245</p>
              <p className="text-xs text-green-600">Across all courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Research Projects</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-xs text-purple-600">2 publications pending</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-orange-600">Assignments & Papers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { activity: 'Graded CSE-301 Data Structures Mid-term Exam', time: '2 hours ago', type: 'grading' },
              { activity: 'Published new research paper on AI Ethics', time: '1 day ago', type: 'research' },
              { activity: 'Conducted guest lecture for final year students', time: '2 days ago', type: 'lecture' },
              { activity: 'Reviewed PhD thesis proposal - Sarah Johnson', time: '3 days ago', type: 'review' },
              { activity: 'Updated course material for Machine Learning', time: '1 week ago', type: 'course' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  item.type === 'grading' ? 'bg-blue-500' :
                  item.type === 'research' ? 'bg-purple-500' :
                  item.type === 'lecture' ? 'bg-green-500' :
                  item.type === 'review' ? 'bg-orange-500' : 'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{item.activity}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {[
              { course: 'CSE-301: Data Structures', time: '10:00 AM - 11:00 AM', room: 'Room 301', type: 'lecture' },
              { course: 'CSE-501: Machine Learning', time: '2:00 PM - 3:30 PM', room: 'Lab 2', type: 'lab' },
              { course: 'PhD Research Meeting', time: '4:00 PM - 5:00 PM', room: 'Office', type: 'meeting' },
              { course: 'Faculty Meeting', time: '6:00 PM - 7:00 PM', room: 'Conference Hall', type: 'meeting' }
            ].map((item, index) => (
              <div key={index} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{item.course}</h4>
                    <p className="text-xs text-gray-600">{item.time}</p>
                    <p className="text-xs text-gray-500">{item.room}</p>
                  </div>
                  <div className={`w-2 h-8 rounded-full ${
                    item.type === 'lecture' ? 'bg-blue-500' :
                    item.type === 'lab' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Grade Assignments', desc: 'Review pending submissions', icon: FileText, color: 'blue', count: '12 pending', action: 'students' },
          { title: 'Schedule Guest Lecture', desc: 'Invite industry experts', icon: Presentation, color: 'green', count: 'Plan now', action: 'guest-lectures' },
          { title: 'Research Collaboration', desc: 'Connect with alumni', icon: Handshake, color: 'purple', count: '3 requests', action: 'collaborations' },
          { title: 'Create Feedback Form', desc: 'Course evaluation', icon: MessageSquare, color: 'orange', count: 'Setup', action: 'feedback' }
        ].map((action, index) => (
          <div 
            key={index} 
            onClick={() => setActiveSection(action.action)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-5 h-5 text-${action.color}-600`} />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
            <p className="text-xs text-gray-600 mb-2">{action.desc}</p>
            <span className={`text-xs px-2 py-1 bg-${action.color}-50 text-${action.color}-600 rounded-full`}>
              {action.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      
      case 'profile':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Faculty Profile</h2>
              <button 
                onClick={() => handleEdit('Profile', { name: 'Dr. Faculty Name', email: 'faculty@edu.com', phone: '+91 9876543210' })}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Settings className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Dr. Faculty Name</h3>
                  <p className="text-gray-600 mb-1">Professor, Computer Science Engineering</p>
                  <p className="text-gray-500 mb-4">faculty@edu.com • +91 9876543210</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Department</h4>
                      <p className="text-gray-600">Computer Science Engineering</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                      <p className="text-gray-600">15+ years in academia</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Research Areas</h4>
                      <p className="text-gray-600">Machine Learning, AI Ethics, Data Science</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Achievements</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Best Teacher Award 2024', 'Published 25+ Papers', 'PhD Supervisor (12 students)', 'Industry Collaboration Expert'].map((achievement, index) => (
                        <span key={index} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Plus className="w-4 h-4" />
                <span>Add Course</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { code: 'CSE-301', name: 'Data Structures & Algorithms', students: 45, progress: 75, status: 'active' },
                { code: 'CSE-501', name: 'Machine Learning', students: 38, progress: 60, status: 'active' },
                { code: 'CSE-601', name: 'Advanced AI', students: 25, progress: 40, status: 'active' },
                { code: 'CSE-701', name: 'Research Methodology', students: 15, progress: 90, status: 'active' },
                { code: 'CSE-401', name: 'Database Systems', students: 52, progress: 100, status: 'completed' },
                { code: 'CSE-303', name: 'Computer Networks', students: 41, progress: 85, status: 'active' }
              ].map((course, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.code}</h3>
                      <p className="text-sm text-gray-600">{course.name}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Students Enrolled</span>
                      <span className="font-medium">{course.students}</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Course Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button 
                      onClick={() => handleEdit('Course', course)}
                      className="flex-1 py-2 px-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleEdit('Course', course)}
                      className="py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Export Data
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">245</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Average Performance</p>
                    <p className="text-2xl font-bold text-gray-900">78.5%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Pending Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Student Activities</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { name: 'Rahul Sharma', course: 'CSE-301', activity: 'Submitted Assignment 3', time: '2 hours ago', score: '85%' },
                    { name: 'Priya Patel', course: 'CSE-501', activity: 'Completed Lab Exercise', time: '4 hours ago', score: '92%' },
                    { name: 'Amit Kumar', course: 'CSE-601', activity: 'Posted Query in Discussion', time: '6 hours ago', score: null },
                    { name: 'Sneha Gupta', course: 'CSE-301', activity: 'Attended Virtual Lecture', time: '1 day ago', score: null },
                    { name: 'Vikash Singh', course: 'CSE-501', activity: 'Submitted Project Report', time: '1 day ago', score: '78%' }
                  ].map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{student.name}</h4>
                          <p className="text-sm text-gray-600">{student.course} • {student.activity}</p>
                          <p className="text-xs text-gray-500">{student.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {student.score && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {student.score}
                          </span>
                        )}
                        <div className="mt-2 flex space-x-1">
                          <button 
                            onClick={() => handleAccept('Assignment', student)}
                            className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs hover:bg-green-100"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleEdit('Student', student)}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'research':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Research Projects</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: 'AI Ethics in Healthcare', 
                  status: 'active', 
                  progress: 75, 
                  team: 4, 
                  deadline: '2025-12-15',
                  funding: '$50,000',
                  category: 'AI Research'
                },
                { 
                  title: 'Machine Learning for Climate Prediction', 
                  status: 'active', 
                  progress: 45, 
                  team: 6, 
                  deadline: '2026-03-20',
                  funding: '$85,000',
                  category: 'Climate Tech'
                },
                { 
                  title: 'Blockchain in Educational Systems', 
                  status: 'completed', 
                  progress: 100, 
                  team: 3, 
                  deadline: '2025-08-30',
                  funding: '$35,000',
                  category: 'EdTech'
                },
                { 
                  title: 'Neural Networks for Drug Discovery', 
                  status: 'planning', 
                  progress: 15, 
                  team: 5, 
                  deadline: '2026-06-10',
                  funding: '$120,000',
                  category: 'BioTech'
                }
              ].map((project, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-xs text-gray-500">{project.category}</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Team Size</span>
                      <span className="font-medium">{project.team} members</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Funding</span>
                      <span className="font-medium text-green-600">{project.funding}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Deadline</span>
                      <span className="font-medium">{new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button 
                      onClick={() => handleEdit('Project', project)}
                      className="flex-1 py-2 px-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleEdit('Project', project)}
                      className="py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'alumni-directory':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Alumni Network</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search alumni..."
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Connect
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Alumni</p>
                    <p className="text-2xl font-bold text-gray-900">1,245</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Handshake className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Active Connections</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Industry Leaders</p>
                    <p className="text-2xl font-bold text-gray-900">23</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Alumni Connections</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { 
                      name: 'Rahul Sharma', 
                      batch: '2020', 
                      company: 'Google', 
                      position: 'Senior Software Engineer',
                      location: 'Bangalore, India',
                      expertise: 'Machine Learning'
                    },
                    { 
                      name: 'Priya Patel', 
                      batch: '2019', 
                      company: 'Microsoft', 
                      position: 'Product Manager',
                      location: 'Seattle, USA',
                      expertise: 'Product Strategy'
                    },
                    { 
                      name: 'Amit Kumar', 
                      batch: '2021', 
                      company: 'Amazon', 
                      position: 'Data Scientist',
                      location: 'Hyderabad, India',
                      expertise: 'Data Analytics'
                    },
                    { 
                      name: 'Sneha Gupta', 
                      batch: '2018', 
                      company: 'Meta', 
                      position: 'Tech Lead',
                      location: 'London, UK',
                      expertise: 'Full Stack Development'
                    }
                  ].map((alumni, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{alumni.name}</h4>
                          <p className="text-sm text-gray-600">{alumni.position} at {alumni.company}</p>
                          <p className="text-xs text-gray-500">Batch {alumni.batch} • {alumni.location}</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {alumni.expertise}
                          </span>
                        </div>
                        <button 
                          onClick={() => handleConnect(alumni)}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'guest-lectures':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Guest Lectures</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Plus className="w-4 h-4" />
                <span>Schedule Lecture</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: 'AI in Modern Healthcare Systems', 
                  speaker: 'Dr. Sarah Johnson', 
                  company: 'Johns Hopkins University',
                  date: '2025-10-15',
                  time: '2:00 PM - 3:30 PM',
                  attendees: 85,
                  status: 'scheduled',
                  type: 'hybrid'
                },
                { 
                  title: 'Blockchain Technology & Cryptocurrency', 
                  speaker: 'Prof. Michael Chen', 
                  company: 'MIT',
                  date: '2025-10-22',
                  time: '11:00 AM - 12:30 PM',
                  attendees: 120,
                  status: 'scheduled',
                  type: 'online'
                },
                { 
                  title: 'Sustainable Software Development', 
                  speaker: 'Dr. Emily Rodriguez', 
                  company: 'Stanford University',
                  date: '2025-09-20',
                  time: '3:00 PM - 4:30 PM',
                  attendees: 95,
                  status: 'completed',
                  type: 'in-person'
                },
                { 
                  title: 'Quantum Computing Fundamentals', 
                  speaker: 'Dr. James Wilson', 
                  company: 'IBM Research',
                  date: '2025-11-05',
                  time: '10:00 AM - 11:30 AM',
                  attendees: 0,
                  status: 'draft',
                  type: 'hybrid'
                }
              ].map((lecture, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lecture.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      lecture.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lecture.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lecture.type === 'online' ? 'bg-purple-100 text-purple-800' :
                      lecture.type === 'hybrid' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {lecture.type}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{lecture.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{lecture.speaker}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{lecture.company}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{new Date(lecture.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{lecture.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{lecture.attendees} registered</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit('Lecture', lecture)}
                      className="flex-1 py-2 px-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleEdit('Lecture', lecture)}
                      className="py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'collaborations':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Research Collaborations</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Plus className="w-4 h-4" />
                <span>New Collaboration</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: 'AI Research Initiative', 
                  partner: 'Stanford University', 
                  type: 'Academic',
                  status: 'active',
                  startDate: '2025-01-15',
                  members: 8,
                  publications: 3,
                  funding: '$150,000'
                },
                { 
                  title: 'Industry 4.0 Implementation', 
                  partner: 'Siemens Technology', 
                  type: 'Industry',
                  status: 'active',
                  startDate: '2024-09-20',
                  members: 12,
                  publications: 5,
                  funding: '$250,000'
                },
                { 
                  title: 'Climate Change Modeling', 
                  partner: 'MIT Climate Lab', 
                  type: 'Research',
                  status: 'completed',
                  startDate: '2024-03-10',
                  members: 6,
                  publications: 8,
                  funding: '$180,000'
                },
                { 
                  title: 'Quantum Computing Study', 
                  partner: 'IBM Research', 
                  type: 'Industry',
                  status: 'planning',
                  startDate: '2025-12-01',
                  members: 4,
                  publications: 0,
                  funding: '$300,000'
                }
              ].map((collab, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      collab.status === 'active' ? 'bg-green-100 text-green-800' :
                      collab.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {collab.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      collab.type === 'Academic' ? 'bg-purple-100 text-purple-800' :
                      collab.type === 'Industry' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {collab.type}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{collab.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{collab.partner}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{collab.members}</div>
                      <div className="text-xs text-gray-600">Members</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{collab.publications}</div>
                      <div className="text-xs text-gray-600">Publications</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Start Date</span>
                      <span className="font-medium">{new Date(collab.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Funding</span>
                      <span className="font-medium text-green-600">{collab.funding}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit('Collaboration', collab)}
                      className="flex-1 py-2 px-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleAccept('Collaboration', collab)}
                      className="py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Plus className="w-4 h-4" />
                <span>Create Event</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {[
                  { 
                    title: 'Annual Tech Symposium 2025', 
                    date: '2025-11-15',
                    time: '9:00 AM - 6:00 PM',
                    location: 'Main Auditorium',
                    type: 'Conference',
                    attendees: 250,
                    status: 'upcoming',
                    description: 'Annual technology symposium featuring industry leaders and research presentations.'
                  },
                  { 
                    title: 'AI Workshop for Students', 
                    date: '2025-10-08',
                    time: '2:00 PM - 5:00 PM',
                    location: 'Computer Lab 1',
                    type: 'Workshop',
                    attendees: 45,
                    status: 'upcoming',
                    description: 'Hands-on workshop on artificial intelligence and machine learning fundamentals.'
                  },
                  { 
                    title: 'Faculty Research Presentation', 
                    date: '2025-09-25',
                    time: '11:00 AM - 12:30 PM',
                    location: 'Conference Room',
                    type: 'Seminar',
                    attendees: 30,
                    status: 'completed',
                    description: 'Faculty members present their latest research findings and achievements.'
                  }
                ].map((event, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} attendees</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {event.status}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit('Event', event)}
                        className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handleEdit('Event', event)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        Edit Event
                      </button>
                      <button 
                        onClick={() => handleAccept('Event attendees', event)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        Manage Attendees
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Event Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Events</span>
                      <span className="font-semibold">15</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Upcoming</span>
                      <span className="font-semibold text-blue-600">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="font-semibold text-green-600">7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Attendees</span>
                      <span className="font-semibold">1,245</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full py-2 px-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium">
                      Create Workshop
                    </button>
                    <button className="w-full py-2 px-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium">
                      Schedule Seminar
                    </button>
                    <button className="w-full py-2 px-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium">
                      Plan Conference
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Feedback & Analytics</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Plus className="w-4 h-4" />
                <span>Create Survey</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">4.6/5</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Responses</p>
                    <p className="text-2xl font-bold text-gray-900">342</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Improvement</p>
                    <p className="text-2xl font-bold text-gray-900">+12%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Feedback Forms</h3>
                <div className="space-y-4">
                  {[
                    { course: 'CSE-301: Data Structures', responses: 45, avg: 4.7, status: 'active' },
                    { course: 'CSE-501: Machine Learning', responses: 38, avg: 4.5, status: 'active' },
                    { course: 'CSE-601: Advanced AI', responses: 25, avg: 4.8, status: 'closed' },
                    { course: 'Guest Lecture: AI Ethics', responses: 89, avg: 4.6, status: 'closed' }
                  ].map((form, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{form.course}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          form.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {form.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{form.responses} responses</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{form.avg}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Course Performance Analytics</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Teaching Quality', score: 92, change: '+5%' },
                    { metric: 'Course Content', score: 88, change: '+3%' },
                    { metric: 'Student Engagement', score: 85, change: '+8%' },
                    { metric: 'Assignment Feedback', score: 90, change: '+2%' }
                  ].map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{metric.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold">{metric.score}%</span>
                          <span className="text-xs text-green-600">{metric.change}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all" 
                          style={{ width: `${metric.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowSuccessMessage('All notifications marked as read!')}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                >
                  Mark All Read
                </button>
                <button 
                  onClick={() => handleEdit('Settings', {})}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  Settings
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { 
                      type: 'assignment', 
                      title: 'New Assignment Submission', 
                      message: 'Rahul Sharma submitted Assignment 3 for CSE-301',
                      time: '5 minutes ago',
                      unread: true 
                    },
                    { 
                      type: 'collaboration', 
                      title: 'Collaboration Request', 
                      message: 'Dr. Sarah Johnson wants to collaborate on AI Ethics research',
                      time: '2 hours ago',
                      unread: true 
                    },
                    { 
                      type: 'event', 
                      title: 'Event Reminder', 
                      message: 'Annual Tech Symposium starts in 7 days',
                      time: '1 day ago',
                      unread: false 
                    },
                    { 
                      type: 'feedback', 
                      title: 'Course Feedback Available', 
                      message: 'Students have completed feedback for CSE-501',
                      time: '2 days ago',
                      unread: false 
                    },
                    { 
                      type: 'system', 
                      title: 'System Maintenance', 
                      message: 'Scheduled maintenance on October 15th from 2-4 AM',
                      time: '3 days ago',
                      unread: false 
                    }
                  ].map((notification, index) => (
                    <div key={index} className={`p-4 rounded-lg border transition-colors ${
                      notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <div className="mt-2 flex space-x-2">
                            <button 
                              onClick={() => handleEdit('Notification', notification)}
                              className="text-xs text-green-600 hover:text-green-700 font-medium"
                            >
                              View Details
                            </button>
                            {notification.unread && (
                              <button 
                                onClick={() => handleMarkRead(notification)}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                Mark Read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {React.createElement(menuItems.find(item => item.id === activeSection)?.icon || Activity, {
                  className: "w-8 h-8 text-green-600"
                })}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {menuItems.find(item => item.id === activeSection)?.label} Section
              </h3>
              <p className="text-gray-600 mb-4">
                This section is under development. Advanced features will be available soon.
              </p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Learn More
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <EditModal />
      <SuccessMessage />
      
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      } flex flex-col border-r border-gray-200`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed && (
              <h1 className="text-xl font-bold text-green-600">Faculty Portal</h1>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isSidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-green-100 text-green-700 border-r-2 border-green-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-600">Faculty Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Dr. Faculty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default EnhancedFacultyDashboard;