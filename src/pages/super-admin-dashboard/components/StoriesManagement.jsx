import React, { useState, useEffect } from 'react';
import { Search, Check, X, Eye, Star, Calendar, User } from 'lucide-react';

const StoriesManagement = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStory, setSelectedStory] = useState(null);

  // Mock data - Replace with Firebase Firestore calls
  useEffect(() => {
    const mockStories = [
      {
        id: '1',
        title: 'From Student to CEO: My Journey',
        author: 'John Smith',
        authorEmail: 'john.smith@example.com',
        authorGradYear: '2018',
        authorDegree: 'Computer Science',
        content: 'After graduating in 2018, I started as a junior developer at a small startup. Through hard work and determination, I climbed the ranks and eventually founded my own tech company. Today, we employ over 50 people and have raised $5M in funding. The education and network I built at university were instrumental in my success...',
        category: 'Career Success',
        status: 'pending',
        submittedDate: '2024-01-20',
        featured: false,
        views: 0,
        likes: 0
      },
      {
        id: '2',
        title: 'Breaking Barriers in Medicine',
        author: 'Dr. Sarah Johnson',
        authorEmail: 'sarah.j@example.com',
        authorGradYear: '2015',
        authorDegree: 'Pre-Med',
        content: 'As a first-generation college graduate, pursuing medicine seemed impossible. However, with the support of scholarships and mentorship programs, I was able to complete my degree and medical school. Today, I work as a pediatric surgeon, giving back to underserved communities. This journey taught me that with determination and support, any dream is achievable...',
        category: 'Social Impact',
        status: 'approved',
        submittedDate: '2024-01-18',
        featured: true,
        views: 1250,
        likes: 89
      },
      {
        id: '3',
        title: 'Innovation in Renewable Energy',
        author: 'Mike Chen',
        authorEmail: 'mike.chen@example.com',
        authorGradYear: '2019',
        authorDegree: 'Environmental Engineering',
        content: 'My passion for sustainability led me to develop a revolutionary solar panel technology during my final year project. This innovation caught the attention of investors, and I was able to start my own clean energy company. We\'ve now installed solar systems in over 100 homes, reducing carbon emissions significantly...',
        category: 'Innovation',
        status: 'approved',
        submittedDate: '2024-01-15',
        featured: false,
        views: 876,
        likes: 45
      },
      {
        id: '4',
        title: 'Teaching the Next Generation',
        author: 'Emily Rodriguez',
        authorEmail: 'emily.r@example.com',
        authorGradYear: '2020',
        authorDegree: 'Education',
        content: 'After graduation, I decided to teach in underserved communities. While the challenges were immense, the impact on students\' lives has been incredibly rewarding. I\'ve developed innovative teaching methods that have improved test scores by 40% in my district...',
        category: 'Education',
        status: 'under-review',
        submittedDate: '2024-01-12',
        featured: false,
        views: 0,
        likes: 0
      }
    ];
    
    setTimeout(() => {
      setStories(mockStories);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApproveStory = (storyId) => {
    setStories(stories.map(story => 
      story.id === storyId ? { ...story, status: 'approved' } : story
    ));
    // TODO: Update Firebase Firestore
  };

  const handleRejectStory = (storyId) => {
    setStories(stories.map(story => 
      story.id === storyId ? { ...story, status: 'rejected' } : story
    ));
    // TODO: Update Firebase Firestore
  };

  const handleFeatureStory = (storyId) => {
    setStories(stories.map(story => 
      story.id === storyId ? { ...story, featured: !story.featured } : story
    ));
    // TODO: Update Firebase Firestore
  };

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || story.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      'under-review': 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const styles = {
      'Career Success': 'bg-blue-100 text-blue-800',
      'Social Impact': 'bg-green-100 text-green-800',
      'Innovation': 'bg-purple-100 text-purple-800',
      'Education': 'bg-orange-100 text-orange-800',
      'Entrepreneurship': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[category] || 'bg-gray-100 text-gray-800'}`}>
        {category}
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
          <h2 className="text-2xl font-bold text-gray-900">Success Stories Management</h2>
          <p className="text-gray-600">Review and approve alumni success stories</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search stories..."
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
            <option value="pending">Pending</option>
            <option value="under-review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStories.map((story) => (
          <div key={story.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{story.title}</h3>
                    {story.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(story.status)}
                    {getCategoryBadge(story.category)}
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{story.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Class of {story.authorGradYear}</span>
                </div>
              </div>

              {/* Degree */}
              <div className="mb-4">
                <span className="text-sm text-gray-600">Degree: </span>
                <span className="text-sm font-medium text-gray-900">{story.authorDegree}</span>
              </div>

              {/* Content Preview */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{story.content}</p>

              {/* Stats */}
              {story.status === 'approved' && (
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{story.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>❤️</span>
                    <span>{story.likes} likes</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  Submitted: {new Date(story.submittedDate).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setSelectedStory(story)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="View Full Story"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  {story.status === 'approved' && (
                    <button 
                      onClick={() => handleFeatureStory(story.id)}
                      className={`p-1 ${story.featured ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600`}
                      title={story.featured ? 'Remove from Featured' : 'Feature Story'}
                    >
                      <Star className={`w-4 h-4 ${story.featured ? 'fill-current' : ''}`} />
                    </button>
                  )}
                  
                  {(story.status === 'pending' || story.status === 'under-review') && (
                    <>
                      <button 
                        onClick={() => handleApproveStory(story.id)}
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleRejectStory(story.id)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
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
              <span className="text-blue-600 font-bold">S</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Stories</p>
              <p className="text-2xl font-bold text-gray-900">{stories.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {stories.filter(s => s.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 font-bold">P</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {stories.filter(s => s.status === 'pending' || s.status === 'under-review').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-gray-900">
                {stories.filter(s => s.featured).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Details Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedStory.title}</h3>
              
              <div className="mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span><strong>Author:</strong> {selectedStory.author}</span>
                  <span><strong>Class of:</strong> {selectedStory.authorGradYear}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span><strong>Degree:</strong> {selectedStory.authorDegree}</span>
                  <span><strong>Category:</strong> {selectedStory.category}</span>
                </div>
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedStory.content}</p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                {(selectedStory.status === 'pending' || selectedStory.status === 'under-review') && (
                  <>
                    <button
                      onClick={() => {
                        handleApproveStory(selectedStory.id);
                        setSelectedStory(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleRejectStory(selectedStory.id);
                        setSelectedStory(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
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

export default StoriesManagement;