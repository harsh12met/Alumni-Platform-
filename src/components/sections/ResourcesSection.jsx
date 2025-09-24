import React, { useState, useEffect } from 'react';
import { BookOpen, Download, ExternalLink, Search, Filter, FileText, Video, Link } from 'lucide-react';

const ResourcesSection = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Mock data - Replace with Firestore fetch
  useEffect(() => {
    const mockResources = [
      {
        id: 1,
        title: 'Complete Web Development Guide',
        description: 'Comprehensive guide covering HTML, CSS, JavaScript, React, and backend development.',
        category: 'Study Material',
        type: 'PDF',
        uploadedBy: 'Prof. John Smith',
        uploadDate: '2025-09-20',
        downloads: 1250,
        size: '15.2 MB',
        url: '#',
        tags: ['Web Development', 'JavaScript', 'React']
      },
      {
        id: 2,
        title: 'Machine Learning Fundamentals',
        description: 'Video lecture series covering ML algorithms, neural networks, and practical applications.',
        category: 'Video Lectures',
        type: 'Video',
        uploadedBy: 'Dr. Sarah Johnson',
        uploadDate: '2025-09-18',
        downloads: 890,
        duration: '12 hours',
        url: '#',
        tags: ['Machine Learning', 'AI', 'Python']
      },
      {
        id: 3,
        title: 'Data Structures and Algorithms',
        description: 'Detailed notes on important DSA concepts with coding examples and practice problems.',
        category: 'Study Material',
        type: 'PDF',
        uploadedBy: 'Alumni - Raj Patel',
        uploadDate: '2025-09-15',
        downloads: 2100,
        size: '8.7 MB',
        url: '#',
        tags: ['DSA', 'Programming', 'Interview Prep']
      },
      {
        id: 4,
        title: 'System Design Interview Prep',
        description: 'Comprehensive resource for system design interviews with real-world examples and case studies.',
        category: 'Interview Prep',
        type: 'PDF',
        uploadedBy: 'Alumni - Emily Chen',
        uploadDate: '2025-09-12',
        downloads: 1580,
        size: '22.4 MB',
        url: '#',
        tags: ['System Design', 'Interview', 'Software Engineering']
      },
      {
        id: 5,
        title: 'Startup Funding Resources',
        description: 'Collection of links and resources for startup funding, including VCs, angel investors, and grants.',
        category: 'Career Resources',
        type: 'Link',
        uploadedBy: 'Entrepreneurship Cell',
        uploadDate: '2025-09-10',
        downloads: 456,
        url: '#',
        tags: ['Startup', 'Funding', 'Entrepreneurship']
      },
      {
        id: 6,
        title: 'Database Management Systems',
        description: 'Complete DBMS course materials including SQL queries, normalization, and database design.',
        category: 'Study Material',
        type: 'PDF',
        uploadedBy: 'Prof. Michael Brown',
        uploadDate: '2025-09-08',
        downloads: 1340,
        size: '18.9 MB',
        url: '#',
        tags: ['Database', 'SQL', 'DBMS']
      }
    ];
    setResources(mockResources);
    setFilteredResources(mockResources);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !categoryFilter || resource.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
    setFilteredResources(filtered);
  }, [searchTerm, categoryFilter, resources]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PDF':
        return FileText;
      case 'Video':
        return Video;
      case 'Link':
        return Link;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-100 text-red-800';
      case 'Video':
        return 'bg-blue-100 text-blue-800';
      case 'Link':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = (resource) => {
    // TODO: Track download in Firestore and serve actual file
    alert(`Downloading ${resource.title}...`);
  };

  const categories = ['Study Material', 'Video Lectures', 'Interview Prep', 'Career Resources'];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Resources</h2>
        <p className="text-gray-600">Access study materials, videos, and resources shared by faculty and alumni</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resource Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Resources</p>
              <p className="text-xl font-bold text-gray-900">{resources.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Downloads</p>
              <p className="text-xl font-bold text-gray-900">
                {resources.reduce((sum, resource) => sum + resource.downloads, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Study Materials</p>
              <p className="text-xl font-bold text-gray-900">
                {resources.filter(r => r.category === 'Study Material').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Video Lectures</p>
              <p className="text-xl font-bold text-gray-900">
                {resources.filter(r => r.category === 'Video Lectures').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredResources.length} of {resources.length} resources
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);
          
          return (
            <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{resource.title}</h3>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {resource.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {resource.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{resource.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Metadata */}
                <div className="space-y-2 mb-4 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>By: {resource.uploadedBy}</span>
                    <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{resource.downloads.toLocaleString()} downloads</span>
                    <span>{resource.size || resource.duration}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {resource.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(resource)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {resource.type === 'Link' ? (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </>
                    )}
                  </button>
                  <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search filters to find more resources.</p>
        </div>
      )}
    </div>
  );
};

export default ResourcesSection;