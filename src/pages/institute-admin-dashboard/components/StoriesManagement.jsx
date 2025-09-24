import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Star,
  Calendar,
  User,
  Award,
  TrendingUp,
  Heart,
  MessageCircle
} from 'lucide-react';

const StoriesManagement = ({ instituteId }) => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedStory, setSelectedStory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - Replace with Firebase Firestore calls
  useEffect(() => {
    // TODO: Replace with actual Firebase query
    // const fetchStories = async () => {
    //   const storiesRef = collection(db, 'success_stories');
    //   const q = query(storiesRef, where('instituteId', '==', instituteId));
    //   const snapshot = await getDocs(q);
    //   const storiesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   setStories(storiesData);
    // };

    const mockStories = [
      {
        id: '1',
        title: 'From Stanford to Silicon Valley: My Journey at Google',
        excerpt: 'How my computer science education at Stanford prepared me for a successful career in tech.',
        content: `My journey at Stanford was transformative. The rigorous computer science curriculum, combined with incredible professors and research opportunities, shaped my technical foundation. After graduation, I joined Google as a software engineer where I've had the opportunity to work on cutting-edge projects that impact millions of users.

        The most valuable skills I learned at Stanford weren't just technical - it was the ability to think critically, solve complex problems, and collaborate effectively with diverse teams. The entrepreneurial spirit on campus also inspired me to launch my own startup during my senior year.

        Today, I'm leading a team of 20 engineers working on machine learning applications. I regularly mentor students and contribute back to the Stanford community through guest lectures and internship programs.`,
        authorName: 'Sarah Chen',
        authorEmail: 'sarah.chen@google.com',
        graduationYear: 2019,
        currentRole: 'Senior Software Engineer',
        currentCompany: 'Google',
        category: 'career',
        status: 'approved',
        submittedDate: '2024-01-15',
        approvedDate: '2024-01-18',
        viewCount: 1250,
        likeCount: 89,
        commentCount: 23,
        isFeatured: true,
        tags: ['Technology', 'Career Growth', 'Leadership'],
        institute: 'Stanford University',
        instituteId: 'stanford_univ_001'
      },
      {
        id: '2',
        title: 'Building a Healthcare Startup: Lessons from Stanford',
        excerpt: 'How my MBA at Stanford gave me the tools to launch a successful healthcare technology company.',
        content: `The Stanford MBA program completely changed my perspective on business and innovation. Coming from a medical background, I had the clinical knowledge but lacked the business acumen to turn my ideas into reality.

        The coursework in entrepreneurship, venture capital, and strategic management provided me with the framework I needed. More importantly, the network I built during my time at Stanford has been invaluable - from co-founders to advisors to investors.

        Today, our healthcare startup has raised $15M in funding and is serving patients across 12 states. We're using AI to improve diagnostic accuracy in rural areas, addressing a problem I identified during my medical practice.

        None of this would have been possible without the comprehensive education and support system at Stanford.`,
        authorName: 'Dr. Michael Rodriguez',
        authorEmail: 'michael.rodriguez@healthtech.com',
        graduationYear: 2020,
        currentRole: 'Co-Founder & CEO',
        currentCompany: 'HealthTech Solutions',
        category: 'entrepreneurship',
        status: 'pending',
        submittedDate: '2024-01-20',
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        isFeatured: false,
        tags: ['Healthcare', 'Entrepreneurship', 'AI'],
        institute: 'Stanford University',
        instituteId: 'stanford_univ_001'
      },
      {
        id: '3',
        title: 'Making a Difference: My Non-Profit Journey',
        excerpt: 'How Stanford shaped my passion for social impact and led to founding a education non-profit.',
        content: `My time at Stanford opened my eyes to the power of education in transforming lives. Through various service-learning courses and volunteer opportunities, I realized that I wanted to dedicate my career to making education accessible to underserved communities.

        After graduation, I spent two years working in consulting to gain business experience, then founded EduForAll, a non-profit focused on providing quality education resources to rural communities.

        The critical thinking skills, research methodology, and network I developed at Stanford have been instrumental in our success. We've now reached over 10,000 students across 5 countries and have been recognized by the UN for our innovative approach.

        Stanford didn't just give me a degree - it gave me a purpose.`,
        authorName: 'Lisa Thompson',
        authorEmail: 'lisa.thompson@eduforall.org',
        graduationYear: 2018,
        currentRole: 'Founder & Executive Director',
        currentCompany: 'EduForAll',
        category: 'social_impact',
        status: 'approved',
        submittedDate: '2024-01-12',
        approvedDate: '2024-01-15',
        viewCount: 892,
        likeCount: 156,
        commentCount: 45,
        isFeatured: true,
        tags: ['Education', 'Non-profit', 'Social Impact'],
        institute: 'Stanford University',
        instituteId: 'stanford_univ_001'
      },
      {
        id: '4',
        title: 'Inappropriate Content Story',
        excerpt: 'This story contains content that violates community guidelines.',
        content: 'This is inappropriate content that should be flagged and removed.',
        authorName: 'Unknown Author',
        authorEmail: 'unknown@email.com',
        graduationYear: 2021,
        currentRole: 'Unknown',
        currentCompany: 'Unknown',
        category: 'other',
        status: 'rejected',
        submittedDate: '2024-01-22',
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        isFeatured: false,
        tags: [],
        institute: 'Stanford University',
        instituteId: 'stanford_univ_001',
        rejectionReason: 'Content violates community guidelines'
      },
      {
        id: '5',
        title: 'Breaking Barriers in Finance: A Woman\'s Perspective',
        excerpt: 'My journey from Stanford economics to becoming a VP at a major investment bank.',
        content: `As a woman in finance, I\'ve faced unique challenges throughout my career. My economics education at Stanford provided me with the analytical skills and confidence needed to navigate this competitive industry.

        The diversity and inclusion initiatives at Stanford prepared me for the importance of bringing different perspectives to financial decision-making. I\'ve since been promoted to VP at Goldman Sachs, where I focus on sustainable investing.

        I now mentor young women entering finance and serve on Stanford\'s alumni board to help create more opportunities for underrepresented groups in business.

        The lessons I learned about perseverance and excellence at Stanford continue to guide me every day.`,
        authorName: 'Jennifer Wang',
        authorEmail: 'jennifer.wang@gs.com',
        graduationYear: 2017,
        currentRole: 'Vice President',
        currentCompany: 'Goldman Sachs',
        category: 'career',
        status: 'pending',
        submittedDate: '2024-01-19',
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        isFeatured: false,
        tags: ['Finance', 'Diversity', 'Leadership'],
        institute: 'Stanford University',
        instituteId: 'stanford_univ_001'
      }
    ];

    setTimeout(() => {
      setStories(mockStories);
      setFilteredStories(mockStories);
      setLoading(false);
    }, 1000);
  }, [instituteId]);

  // Filter stories
  useEffect(() => {
    let filtered = stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || story.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || story.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    setFilteredStories(filtered);
  }, [stories, searchTerm, statusFilter, categoryFilter]);

  const handleApproveStory = async (storyId) => {
    // TODO: Update story status in Firebase
    // await updateDoc(doc(db, 'success_stories', storyId), { 
    //   status: 'approved',
    //   approvedDate: new Date().toISOString().split('T')[0]
    // });
    
    setStories(prev => prev.map(story => 
      story.id === storyId ? { 
        ...story, 
        status: 'approved',
        approvedDate: new Date().toISOString().split('T')[0]
      } : story
    ));
    console.log(`Approved story ${storyId}`);
  };

  const handleRejectStory = async (storyId, reason) => {
    // TODO: Update story status in Firebase
    // await updateDoc(doc(db, 'success_stories', storyId), { 
    //   status: 'rejected', 
    //   rejectionReason: reason 
    // });
    
    setStories(prev => prev.map(story => 
      story.id === storyId ? { ...story, status: 'rejected', rejectionReason: reason } : story
    ));
    console.log(`Rejected story ${storyId} with reason: ${reason}`);
  };

  const handleToggleFeatured = async (storyId) => {
    // TODO: Update featured status in Firebase
    // await updateDoc(doc(db, 'success_stories', storyId), { 
    //   isFeatured: !story.isFeatured 
    // });
    
    setStories(prev => prev.map(story => 
      story.id === storyId ? { ...story, isFeatured: !story.isFeatured } : story
    ));
    console.log(`Toggled featured status for story ${storyId}`);
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'career':
        return 'bg-blue-100 text-blue-800';
      case 'entrepreneurship':
        return 'bg-purple-100 text-purple-800';
      case 'social_impact':
        return 'bg-green-100 text-green-800';
      case 'research':
        return 'bg-orange-100 text-orange-800';
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
          <h2 className="text-2xl font-bold text-gray-900">Stories Management</h2>
          <p className="text-gray-600">
            Review and approve alumni success stories for your institute
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
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Stories</p>
              <p className="text-2xl font-bold text-gray-900">{stories.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {stories.filter(s => s.status === 'pending').length}
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
                {stories.filter(s => s.status === 'approved').length}
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
                {stories.filter(s => s.isFeatured).length}
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
              placeholder="Search stories..."
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="career">Career</option>
            <option value="entrepreneurship">Entrepreneurship</option>
            <option value="social_impact">Social Impact</option>
            <option value="research">Research</option>
          </select>
          
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Stories List */}
      <div className="space-y-6">
        {filteredStories.map((story) => (
          <div key={story.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{story.title}</h3>
                      {story.isFeatured && (
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{story.excerpt}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{story.authorName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Class of {story.graduationYear}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{story.currentRole} at {story.currentCompany}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm mb-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(story.status)}`}>
                        {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(story.category)}`}>
                        {story.category.replace('_', ' ').charAt(0).toUpperCase() + story.category.replace('_', ' ').slice(1)}
                      </span>
                      
                      {story.status === 'approved' && (
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Eye className="w-4 h-4" />
                            <span>{story.viewCount} views</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Heart className="w-4 h-4" />
                            <span>{story.likeCount} likes</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <MessageCircle className="w-4 h-4" />
                            <span>{story.commentCount} comments</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {story.tags && story.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {story.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                    <button
                      onClick={() => {
                        setSelectedStory(story);
                        setShowModal(true);
                      }}
                      className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Read Full Story</span>
                    </button>
                    
                    {story.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveStory(story.id)}
                          className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleRejectStory(story.id, 'Does not meet quality standards')}
                          className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    )}
                    
                    {story.status === 'approved' && (
                      <button
                        onClick={() => handleToggleFeatured(story.id)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm ${
                          story.isFeatured 
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Star className="w-4 h-4" />
                        <span>{story.isFeatured ? 'Unfeature' : 'Feature'}</span>
                      </button>
                    )}
                  </div>
                </div>
                
                {story.status === 'rejected' && story.rejectionReason && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Rejection Reason:</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">{story.rejectionReason}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story Details Modal */}
      {showModal && selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Story Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-2xl font-bold text-gray-900">{selectedStory.title}</h4>
                    {selectedStory.isFeatured && (
                      <Star className="w-6 h-6 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>By {selectedStory.authorName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Class of {selectedStory.graduationYear}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>{selectedStory.currentRole} at {selectedStory.currentCompany}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedStory.status)}`}>
                      {selectedStory.status}
                    </span>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedStory.category)}`}>
                      {selectedStory.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="prose max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedStory.content}
                  </div>
                </div>

                {/* Tags */}
                {selectedStory.tags && selectedStory.tags.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Tags</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedStory.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                {selectedStory.status === 'approved' && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3">Engagement Stats</h5>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                          <Eye className="w-4 h-4" />
                          <span className="font-semibold">{selectedStory.viewCount}</span>
                        </div>
                        <p className="text-sm text-gray-600">Views</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1 text-red-600 mb-1">
                          <Heart className="w-4 h-4" />
                          <span className="font-semibold">{selectedStory.likeCount}</span>
                        </div>
                        <p className="text-sm text-gray-600">Likes</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="font-semibold">{selectedStory.commentCount}</span>
                        </div>
                        <p className="text-sm text-gray-600">Comments</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Submission Details</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Submitted:</span>
                      <p className="font-medium">{selectedStory.submittedDate}</p>
                    </div>
                    {selectedStory.approvedDate && (
                      <div>
                        <span className="text-gray-500">Approved:</span>
                        <p className="font-medium">{selectedStory.approvedDate}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Author Email:</span>
                      <p className="font-medium">{selectedStory.authorEmail}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Institute:</span>
                      <p className="font-medium">{selectedStory.institute}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                {selectedStory.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleApproveStory(selectedStory.id);
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve Story
                    </button>
                    <button
                      onClick={() => {
                        handleRejectStory(selectedStory.id, 'Does not meet quality standards');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject Story
                    </button>
                  </>
                )}
                {selectedStory.status === 'approved' && (
                  <button
                    onClick={() => {
                      handleToggleFeatured(selectedStory.id);
                      setShowModal(false);
                    }}
                    className={`px-4 py-2 rounded-lg ${
                      selectedStory.isFeatured 
                        ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                  >
                    {selectedStory.isFeatured ? 'Remove from Featured' : 'Add to Featured'}
                  </button>
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
      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default StoriesManagement;