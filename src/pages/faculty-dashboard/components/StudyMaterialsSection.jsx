import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ModuleContainer from '../../../components/ui/ModuleContainer';

const StudyMaterialsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: '',
    description: '',
    file: null
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'lecture-notes', label: 'Lecture Notes' },
    { value: 'assignments', label: 'Assignments' },
    { value: 'presentations', label: 'Presentations' },
    { value: 'reference-materials', label: 'Reference Materials' },
    { value: 'lab-manuals', label: 'Lab Manuals' }
  ];

  const studyMaterials = [
    {
      id: 1,
      title: 'Data Structures - Linked Lists',
      category: 'lecture-notes',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2025-01-15',
      downloads: 45,
      views: 128,
      course: 'CS201 - Data Structures',
      version: '1.2',
      status: 'active'
    },
    {
      id: 2,
      title: 'Assignment 3 - Binary Trees',
      category: 'assignments',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2025-01-18',
      downloads: 32,
      views: 89,
      course: 'CS201 - Data Structures',
      version: '1.0',
      status: 'active'
    },
    {
      id: 3,
      title: 'Database Design Principles',
      category: 'presentations',
      type: 'PPTX',
      size: '5.2 MB',
      uploadDate: '2025-01-20',
      downloads: 28,
      views: 67,
      course: 'CS301 - Database Systems',
      version: '1.1',
      status: 'active'
    },
    {
      id: 4,
      title: 'Java Programming Lab Manual',
      category: 'lab-manuals',
      type: 'PDF',
      size: '8.7 MB',
      uploadDate: '2025-01-12',
      downloads: 156,
      views: 234,
      course: 'CS101 - Programming Fundamentals',
      version: '2.0',
      status: 'active'
    }
  ];

  const filteredMaterials = studyMaterials?.filter(material => {
    const matchesCategory = selectedCategory === 'all' || material?.category === selectedCategory;
    const matchesSearch = material?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         material?.course?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    const iconMap = {
      'lecture-notes': 'BookOpen',
      'assignments': 'FileText',
      'presentations': 'Presentation',
      'reference-materials': 'Library',
      'lab-manuals': 'Wrench'
    };
    return iconMap?.[category] || 'File';
  };

  const getFileTypeIcon = (type) => {
    const iconMap = {
      'PDF': 'FileText',
      'PPTX': 'Presentation',
      'DOCX': 'FileText',
      'ZIP': 'Archive'
    };
    return iconMap?.[type] || 'File';
  };

  const handleUpload = (e) => {
    e?.preventDefault();
    console.log('Uploading material:', uploadForm);
    setShowUploadModal(false);
    setUploadForm({ title: '', category: '', description: '', file: null });
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    setUploadForm(prev => ({ ...prev, file }));
  };

  return (
    <ModuleContainer
      title="Study Materials"
      description="Manage and share educational resources with students"
      icon="BookOpen"
      actions={
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Upload Material
        </Button>
      }
    >
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search materials by title or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Filter by category"
          />
        </div>
      </div>
      {/* Materials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredMaterials?.map((material) => (
          <div key={material?.id} className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Icon name={getCategoryIcon(material?.category)} size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground">{material?.title}</h4>
                  <p className="text-sm text-muted-foreground">{material?.course}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name={getFileTypeIcon(material?.type)} size={14} />
                  <span>{material?.type}</span>
                </div>
                <span>{material?.size}</span>
                <span>v{material?.version}</span>
              </div>
              <span>{new Date(material.uploadDate)?.toLocaleDateString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Download" size={14} />
                  <span>{material?.downloads}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={14} />
                  <span>{material?.views}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Edit" iconPosition="left" className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 font-medium">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" iconName="Share" iconPosition="left" className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 font-medium">
                  Share
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredMaterials?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No materials found matching your criteria</p>
        </div>
      )}
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1003">
          <div className="bg-card rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upload Study Material</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUploadModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <Input
                label="Material Title"
                type="text"
                placeholder="Enter material title"
                value={uploadForm?.title}
                onChange={(e) => setUploadForm(prev => ({ ...prev, title: e?.target?.value }))}
                required
              />

              <Select
                label="Category"
                options={categories?.slice(1)}
                value={uploadForm?.category}
                onChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}
                placeholder="Select category"
                required
              />

              <Input
                label="Description"
                type="text"
                placeholder="Brief description of the material"
                value={uploadForm?.description}
                onChange={(e) => setUploadForm(prev => ({ ...prev, description: e?.target?.value }))}
              />

              <Input
                label="File"
                type="file"
                onChange={handleFileChange}
                required
              />

              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUploadModal(false)}
                  className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 font-medium"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  Upload Material
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModuleContainer>
  );
};

export default StudyMaterialsSection;