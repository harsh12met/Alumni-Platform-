import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StudyMaterials = () => {
  const [activeView, setActiveView] = useState('grid');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'CS301', label: 'Data Structures & Algorithms' },
    { value: 'CS402', label: 'Database Management' },
    { value: 'CS501', label: 'Machine Learning' },
    { value: 'CS502', label: 'Software Engineering' },
    { value: 'CS503', label: 'Computer Networks' },
    { value: 'MATH401', label: 'Advanced Mathematics' }
  ];

  const materialTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'notes', label: 'Lecture Notes' },
    { value: 'assignments', label: 'Assignments' },
    { value: 'presentations', label: 'Presentations' },
    { value: 'books', label: 'Reference Books' },
    { value: 'videos', label: 'Video Lectures' },
    { value: 'code', label: 'Code Examples' }
  ];

  const materials = [
    {
      id: 1,
      title: 'Data Structures - Binary Trees',
      subject: 'CS301',
      subjectName: 'Data Structures & Algorithms',
      type: 'notes',
      format: 'PDF',
      size: '2.5 MB',
      uploadDate: '2025-09-20',
      uploadedBy: 'Dr. Sarah Wilson',
      downloads: 156,
      rating: 4.8,
      description: 'Comprehensive notes on binary trees, AVL trees, and tree traversal algorithms.',
      tags: ['trees', 'algorithms', 'data-structures']
    },
    {
      id: 2,
      title: 'Database Design Assignment',
      subject: 'CS402',
      subjectName: 'Database Management',
      type: 'assignments',
      format: 'DOC',
      size: '1.2 MB',
      uploadDate: '2025-09-18',
      uploadedBy: 'Prof. Michael Chen',
      downloads: 89,
      rating: 4.5,
      description: 'Assignment on designing a normalized database for an e-commerce system.',
      tags: ['database', 'normalization', 'ER-diagram']
    },
    {
      id: 3,
      title: 'Machine Learning Introduction',
      subject: 'CS501',
      subjectName: 'Machine Learning',
      type: 'presentations',
      format: 'PPT',
      size: '15.7 MB',
      uploadDate: '2025-09-15',
      uploadedBy: 'Dr. Emily Rodriguez',
      downloads: 234,
      rating: 4.9,
      description: 'Introduction to ML concepts, supervised and unsupervised learning.',
      tags: ['machine-learning', 'AI', 'algorithms']
    },
    {
      id: 4,
      title: 'Python Programming Examples',
      subject: 'CS301',
      subjectName: 'Data Structures & Algorithms',
      type: 'code',
      format: 'ZIP',
      size: '3.1 MB',
      uploadDate: '2025-09-12',
      uploadedBy: 'Prof. David Kim',
      downloads: 198,
      rating: 4.7,
      description: 'Complete Python implementations of common algorithms and data structures.',
      tags: ['python', 'programming', 'examples']
    },
    {
      id: 5,
      title: 'Software Engineering Principles',
      subject: 'CS502',
      subjectName: 'Software Engineering',
      type: 'books',
      format: 'PDF',
      size: '45.2 MB',
      uploadDate: '2025-09-10',
      uploadedBy: 'Dr. Sarah Wilson',
      downloads: 312,
      rating: 4.6,
      description: 'Reference book covering SDLC, design patterns, and testing methodologies.',
      tags: ['software-engineering', 'design-patterns', 'testing']
    },
    {
      id: 6,
      title: 'Network Protocols Video Series',
      subject: 'CS503',
      subjectName: 'Computer Networks',
      type: 'videos',
      format: 'MP4',
      size: '120.5 MB',
      uploadDate: '2025-09-08',
      uploadedBy: 'Prof. Lisa Zhang',
      downloads: 145,
      rating: 4.8,
      description: 'Video lectures explaining TCP/IP, HTTP, and network security protocols.',
      tags: ['networking', 'protocols', 'video-lecture']
    }
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    const matchesType = selectedType === 'all' || material.type === selectedType;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSubject && matchesType && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'notes': return 'FileText';
      case 'assignments': return 'Edit';
      case 'presentations': return 'Monitor';
      case 'books': return 'Book';
      case 'videos': return 'Play';
      case 'code': return 'Code';
      default: return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'notes': return 'bg-blue-100 text-blue-700';
      case 'assignments': return 'bg-green-100 text-green-700';
      case 'presentations': return 'bg-purple-100 text-purple-700';
      case 'books': return 'bg-orange-100 text-orange-700';
      case 'videos': return 'bg-red-100 text-red-700';
      case 'code': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDownload = (materialId) => {
    console.log('Downloading material:', materialId);
    // Implement download logic
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMaterials.map((material) => (
        <div key={material.id} className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-lg ${getTypeColor(material.type)}`}>
              <Icon name={getTypeIcon(material.type)} size={20} />
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-yellow-500" />
              <span className="text-sm text-muted-foreground">{material.rating}</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">{material.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{material.subjectName}</p>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{material.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {material.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
            {material.tags.length > 2 && (
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                +{material.tags.length - 2}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <span>{material.format} • {material.size}</span>
            <span>{material.downloads} downloads</span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => handleDownload(material.id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Icon name="Download" size={14} className="mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
            >
              <Icon name="Eye" size={14} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-3">
      {filteredMaterials.map((material) => (
        <div key={material.id} className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${getTypeColor(material.type)} flex-shrink-0`}>
              <Icon name={getTypeIcon(material.type)} size={18} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-card-foreground truncate">{material.title}</h3>
              <p className="text-sm text-muted-foreground">{material.subjectName}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{material.description}</p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground flex-shrink-0">
              <span>{material.format}</span>
              <span>{material.size}</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-yellow-500" />
                <span>{material.rating}</span>
              </div>
              <span>{material.downloads} downloads</span>
            </div>
            
            <div className="flex space-x-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
              >
                <Icon name="Eye" size={14} />
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleDownload(material.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Icon name="Download" size={14} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Study Materials & Notes</h2>
          <p className="text-muted-foreground">Access lecture notes, assignments, and academic resources</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
          >
            <Icon name="Upload" size={16} className="mr-2" />
            Upload Material
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveView(activeView === 'grid' ? 'list' : 'grid')}
            className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
          >
            <Icon name={activeView === 'grid' ? 'List' : 'Grid'} size={16} />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Input
              type="search"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <Select
              value={selectedSubject}
              onChange={setSelectedSubject}
              options={subjects}
            />
          </div>
          <div>
            <Select
              value={selectedType}
              onChange={setSelectedType}
              options={materialTypes}
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
            >
              <Icon name="Filter" size={16} className="mr-2" />
              More Filters
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('all');
                setSelectedType('all');
              }}
              className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{materials.length}</div>
          <div className="text-sm text-muted-foreground">Total Materials</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{subjects.length - 1}</div>
          <div className="text-sm text-muted-foreground">Subjects</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{filteredMaterials.length}</div>
          <div className="text-sm text-muted-foreground">Filtered Results</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {materials.reduce((acc, material) => acc + material.downloads, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Downloads</div>
        </div>
      </div>

      {/* Materials Grid/List */}
      {filteredMaterials.length > 0 ? (
        activeView === 'grid' ? renderGridView() : renderListView()
      ) : (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No materials found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedSubject('all');
              setSelectedType('all');
            }}
            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;