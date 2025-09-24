import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Star, 
  Eye, 
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  User,
  Calendar,
  MapPin,
  Briefcase,
  Award,
  ExternalLink,
  X
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const DepartmentStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const [filter, setFilter] = useState('all'); // all, published, draft
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();

  // Mock success stories data
  const mockStories = [
    {
      id: '1',
      title: 'From Student to Tech Entrepreneur: Building a Million-Dollar Startup',
      alumniName: 'Rajesh Kulkarni',
      graduationYear: '2018',
      currentPosition: 'CEO & Founder',
      company: 'TechInnovate Solutions',
      location: 'Bangalore, India',
      image: '/api/placeholder/300/200',
      summary: 'Rajesh transformed his final year project into a successful AI-powered logistics startup that now serves 500+ clients across India.',
      fullStory: `Rajesh Kumar's journey from a computer science student to a successful tech entrepreneur began during his final year at our department. What started as a simple project to optimize delivery routes has now become TechInnovate Solutions, a company valued at over ₹50 crores.

During his studies, Rajesh was particularly interested in artificial intelligence and machine learning. His final year project focused on developing an AI algorithm to optimize delivery routes for e-commerce companies. The project caught the attention of several faculty members and industry experts who visited our campus.

After graduation, instead of joining a corporate job, Rajesh decided to turn his project into a business. He started small, working from a garage with two of his classmates. They reached out to local delivery companies and demonstrated how their algorithm could reduce delivery times by 30% and cut fuel costs by 25%.

The breakthrough came when a major e-commerce company agreed to pilot their solution. The results were impressive - delivery efficiency improved by 40%, and customer satisfaction scores increased significantly. This success led to more clients, investment opportunities, and rapid expansion.

Today, TechInnovate Solutions employs over 200 people, including 50+ alumni from our department. The company has raised ₹100 crores in funding and serves clients across India, with plans to expand internationally.

Rajesh credits his success to the strong technical foundation he received in our department, the entrepreneurship culture fostered by the faculty, and the network of alumni who supported him throughout his journey.`,
      achievements: [
        '₹50+ crore company valuation',
        '500+ corporate clients',
        '200+ employees',
        'Featured in Forbes 30 Under 30'
      ],
      tags: ['Entrepreneurship', 'AI/ML', 'Startup', 'Technology'],
      category: 'entrepreneurship',
      publishedDate: '2024-01-20T10:30:00Z',
      status: 'published',
      department: user?.department || 'computer-science',
      contactInfo: {
        email: 'rajesh@techinnovate.com',
        linkedin: 'https://linkedin.com/in/rajeshkumar',
        twitter: '@rajeshkumar'
      },
      featured: true,
      views: 1245,
      likes: 89
    },
    {
      id: '2',
      title: 'Leading Digital Transformation at Global Tech Giant',
      alumniName: 'Priya Deshmukh',
      graduationYear: '2015',
      currentPosition: 'Senior Director of Engineering',
      company: 'Google',
      location: 'Mountain View, USA',
      image: '/api/placeholder/300/200',
      summary: 'Priya leads a team of 150+ engineers at Google, driving digital transformation initiatives that impact millions of users worldwide.',
      fullStory: `Priya Sharma's ascent to the senior leadership ranks at Google is a testament to technical excellence, leadership skills, and the strong foundation she built during her time in our Computer Science department.

After graduating with distinction in 2015, Priya joined Google as a Software Engineer. Her exceptional problem-solving skills and innovative approach to complex technical challenges quickly caught the attention of senior leadership. Within two years, she was promoted to Senior Software Engineer and began leading critical projects.

Her breakthrough came when she proposed and led the development of a new machine learning framework that improved Google Search performance by 15%. This project not only showcased her technical expertise but also her ability to lead cross-functional teams and deliver results at scale.

Priya's leadership style, which emphasizes collaboration, innovation, and mentorship, has made her a respected figure within Google. She currently leads a team of 150+ engineers across multiple locations, working on next-generation AI and cloud computing solutions.

Beyond her technical contributions, Priya is passionate about diversity and inclusion in tech. She has mentored over 100 engineers, with a special focus on supporting women and underrepresented minorities in technology. She regularly returns to our campus to speak at seminars and recruit talented students.

Her advice to current students: "Focus on building strong fundamentals, never stop learning, and always be willing to take on challenges that push you out of your comfort zone. The education and values I gained from our department have been instrumental in my success."`,
      achievements: [
        'Managing 150+ engineers at Google',
        'Led 15% improvement in Google Search',
        'Mentored 100+ engineers',
        'Keynote speaker at 20+ tech conferences'
      ],
      tags: ['Leadership', 'Machine Learning', 'Big Tech', 'Mentorship'],
      category: 'corporate-leadership',
      publishedDate: '2024-01-18T14:20:00Z',
      status: 'published',
      department: user?.department || 'computer-science',
      contactInfo: {
        email: 'priya.sharma@google.com',
        linkedin: 'https://linkedin.com/in/priyasharma',
        twitter: '@priyasharma'
      },
      featured: true,
      views: 892,
      likes: 67
    },
    {
      id: '3',
      title: 'Pioneering Breakthrough Research in Quantum Computing',
      alumniName: 'Dr. Arjun Patil',
      graduationYear: '2012',
      currentPosition: 'Principal Research Scientist',
      company: 'IBM Research',
      location: 'New York, USA',
      image: '/api/placeholder/300/200',
      summary: 'Dr. Patel\'s groundbreaking research in quantum algorithms has earned him international recognition and multiple research awards.',
      fullStory: `Dr. Arjun Patel's journey from a curious undergraduate student to a leading quantum computing researcher exemplifies the power of combining strong fundamentals with relentless pursuit of knowledge.

During his undergraduate years, Arjun was fascinated by theoretical computer science and quantum mechanics. He spent countless hours in the library, often staying late to work on research problems. His undergraduate thesis on quantum algorithms caught the attention of professors and earned him admission to MIT for his PhD.

After completing his PhD in Quantum Information Science from MIT, Arjun joined IBM Research as a Research Scientist. His work focuses on developing quantum algorithms for optimization problems and error correction in quantum systems.

His most significant contribution to date is the development of a novel quantum algorithm that can solve certain optimization problems exponentially faster than classical algorithms. This breakthrough was published in Nature and has been cited over 500 times in just two years.

Dr. Patel's research has practical implications for various industries, including finance, logistics, and drug discovery. Several Fortune 500 companies are now exploring applications of his algorithms to solve complex business problems.

He has received numerous awards, including the IBM Research Outstanding Technical Achievement Award and the Young Scientist Award from the International Conference on Quantum Computing. He has also been invited to speak at prestigious venues including the World Economic Forum.

Despite his busy research schedule, Dr. Patel remains connected to our department. He regularly collaborates with our faculty on research projects and has helped establish a quantum computing research lab on campus.`,
      achievements: [
        '500+ citations for quantum algorithm research',
        'Published in Nature and Science journals',
        'IBM Research Outstanding Achievement Award',
        'Established quantum computing lab at alma mater'
      ],
      tags: ['Research', 'Quantum Computing', 'Academia', 'Innovation'],
      category: 'research-innovation',
      publishedDate: '2024-01-15T09:15:00Z',
      status: 'published',
      department: user?.department || 'computer-science',
      contactInfo: {
        email: 'arjun.patel@ibm.com',
        linkedin: 'https://linkedin.com/in/arjunpatel',
        website: 'https://arjunpatel.research.com'
      },
      featured: false,
      views: 634,
      likes: 45
    },
    {
      id: '4',
      title: 'Social Impact Through Technology: Bridging the Digital Divide',
      alumniName: 'Sneha Joshi',
      graduationYear: '2016',
      currentPosition: 'Co-Founder & CTO',
      company: 'EduTech for All',
      location: 'Delhi, India',
      image: '/api/placeholder/300/200',
      summary: 'Sneha co-founded a non-profit that has provided digital education access to over 100,000 underprivileged children across rural India.',
      fullStory: `Sneha Gupta's mission to democratize education through technology began during her final semester when she volunteered to teach computer basics to children in nearby villages. The stark digital divide she witnessed inspired her to dedicate her career to social impact.

After graduation, instead of pursuing high-paying corporate jobs, Sneha co-founded "EduTech for All," a non-profit organization focused on bringing quality digital education to underserved communities. The organization develops low-cost educational technology solutions and deploys them in rural schools.

Her team developed an innovative offline learning platform that works on basic smartphones and tablets, loaded with interactive educational content in local languages. The platform covers subjects from basic literacy to advanced computer programming, adapted for different age groups and learning levels.

The impact has been remarkable. Over 100,000 children across 15 states have benefited from their programs. Many students who started with basic digital literacy are now pursuing computer science degrees and technical careers.

Sneha's work has attracted recognition from international organizations. EduTech for All has received grants from UNESCO, the Bill & Melinda Gates Foundation, and several technology companies. The organization has also partnered with state governments to integrate their solutions into public education systems.

Her approach combines technical innovation with deep understanding of local needs. She spends significant time in rural communities, working directly with teachers, students, and parents to understand their challenges and co-create solutions.

Sneha's story demonstrates how technical skills acquired in our department can be leveraged for tremendous social impact. She regularly returns to campus to inspire current students to consider careers in social entrepreneurship and technology for development.`,
      achievements: [
        '100,000+ children impacted',
        'Programs in 15 Indian states',
        'UNESCO and Gates Foundation grants',
        'Featured in TIME Magazine\'s Social Impact Leaders'
      ],
      tags: ['Social Impact', 'Education Technology', 'Non-profit', 'Rural Development'],
      category: 'social-impact',
      publishedDate: '2024-01-12T16:45:00Z',
      status: 'published',
      department: user?.department || 'computer-science',
      contactInfo: {
        email: 'sneha@edutechforall.org',
        linkedin: 'https://linkedin.com/in/snehagupta',
        website: 'https://edutechforall.org'
      },
      featured: false,
      views: 789,
      likes: 56
    },
    {
      id: '5',
      title: 'Draft: Rising Star in Cybersecurity',
      alumniName: 'Rahul Patil',
      graduationYear: '2020',
      currentPosition: 'Senior Security Engineer',
      company: 'Microsoft',
      location: 'Seattle, USA',
      image: '/api/placeholder/300/200',
      summary: 'Recent graduate making waves in cybersecurity, leading critical security initiatives at Microsoft.',
      fullStory: `Draft content for Rahul's success story...`,
      achievements: [
        'Led critical security initiatives',
        'Identified and fixed major vulnerabilities',
        'Youngest Senior Engineer at Microsoft Security'
      ],
      tags: ['Cybersecurity', 'Recent Graduate', 'Microsoft'],
      category: 'early-career',
      publishedDate: null,
      status: 'draft',
      department: user?.department || 'computer-science',
      contactInfo: {
        email: 'rahul.verma@microsoft.com',
        linkedin: 'https://linkedin.com/in/rahulverma'
      },
      featured: false,
      views: 0,
      likes: 0
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const departmentStories = mockStories.filter(
        story => story.department === user?.department
      );
      setStories(departmentStories);
      setLoading(false);
    }, 1000);
  }, [user?.department]);

  const filteredStories = stories.filter(story => {
    const matchesFilter = filter === 'all' || story.status === filter;
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.alumniName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      entrepreneurship: 'bg-purple-100 text-purple-800',
      'corporate-leadership': 'bg-blue-100 text-blue-800',
      'research-innovation': 'bg-green-100 text-green-800',
      'social-impact': 'bg-orange-100 text-orange-800',
      'early-career': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
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

  const handleDeleteStory = (storyId) => {
    if (window.confirm('Are you sure you want to delete this success story?')) {
      setStories(stories.filter(story => story.id !== storyId));
    }
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
              <Trophy className="w-6 h-6 mr-3 text-purple-600" />
              Department Success Stories
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and showcase success stories from {getDepartmentName()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Story
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search stories..."
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
            <option value="all">All Stories</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Stories</p>
              <p className="text-xl font-bold text-gray-900">{stories.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-xl font-bold text-green-600">
                {stories.filter(s => s.status === 'published').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Edit className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-xl font-bold text-yellow-600">
                {stories.filter(s => s.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Featured</p>
              <p className="text-xl font-bold text-blue-600">
                {stories.filter(s => s.featured).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStories.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No success stories found</h3>
            <p className="text-gray-600">No stories match your current filters for {getDepartmentName()}.</p>
          </div>
        ) : (
          filteredStories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-purple-600 font-medium">{story.alumniName}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">Class of {story.graduationYear}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{story.currentPosition}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{story.company}, {story.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(story.status)}
                      {story.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{story.summary}</p>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(story.category)}`}>
                        {story.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      {story.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {story.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{story.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Key Achievements */}
                  {story.achievements && story.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Achievements</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {story.achievements.slice(0, 2).map((achievement, index) => (
                          <li key={index} className="flex items-center">
                            <Award className="w-3 h-3 text-purple-500 mr-1" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      {story.status === 'published' && (
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {story.views} views
                        </span>
                      )}
                      {story.status === 'published' && (
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {story.likes} likes
                        </span>
                      )}
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(story.publishedDate)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedStory(story)}
                        className="flex items-center px-2 py-1 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button className="flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStory(story.id)}
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

      {/* Story Details Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{selectedStory.title}</h2>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{selectedStory.alumniName}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {selectedStory.currentPosition} at {selectedStory.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {selectedStory.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Class of {selectedStory.graduationYear}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Story</h4>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedStory.fullStory}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Achievements</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedStory.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <Award className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedStory.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      {selectedStory.contactInfo.email && (
                        <a
                          href={`mailto:${selectedStory.contactInfo.email}`}
                          className="flex items-center text-purple-600 hover:text-purple-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Email
                        </a>
                      )}
                      {selectedStory.contactInfo.linkedin && (
                        <a
                          href={selectedStory.contactInfo.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-purple-600 hover:text-purple-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      )}
                      {selectedStory.contactInfo.website && (
                        <a
                          href={selectedStory.contactInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-purple-600 hover:text-purple-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Website
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Status: {getStatusBadge(selectedStory.status)}</div>
                      <div>Published: {formatDate(selectedStory.publishedDate)}</div>
                      {selectedStory.status === 'published' && (
                        <>
                          <div>Views: {selectedStory.views}</div>
                          <div>Likes: {selectedStory.likes}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Edit Story
                </button>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentStories;