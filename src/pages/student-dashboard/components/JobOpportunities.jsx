import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const JobOpportunities = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'remote', label: 'Remote' },
    { value: 'delhi', label: 'Delhi NCR' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' }
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Software Engineer Intern',
      company: 'Google India',
      location: 'Bangalore',
      type: 'internship',
      duration: '3 months',
      stipend: '₹80,000/month',
      applicationDeadline: '2025-10-15',
      postedDate: '2025-09-20',
      description: 'Join our software engineering team to work on cutting-edge technologies. You will be involved in designing and developing scalable systems.',
      requirements: [
        'Currently pursuing B.Tech/M.Tech in Computer Science',
        'Strong programming skills in Java, Python, or C++',
        'Understanding of data structures and algorithms',
        'Good problem-solving abilities'
      ],
      skills: ['Java', 'Python', 'Data Structures', 'Algorithms'],
      applicants: 245,
      status: 'open',
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&h=60&fit=crop',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'sarah.johnson@google.com'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Startup XYZ',
      location: 'Remote',
      type: 'full-time',
      duration: 'Permanent',
      salary: '₹12-18 LPA',
      applicationDeadline: '2025-10-20',
      postedDate: '2025-09-18',
      description: 'Looking for a passionate full-stack developer to join our growing team. Work on exciting projects and make a real impact.',
      requirements: [
        'B.Tech/M.Tech in Computer Science or related field',
        'Experience with React, Node.js, and databases',
        'Knowledge of cloud platforms (AWS/GCP)',
        'Strong communication skills'
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      applicants: 89,
      status: 'open',
      urgent: true,
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop',
      contactPerson: 'Michael Chen',
      contactEmail: 'michael@startupxyz.com'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'Microsoft',
      location: 'Hyderabad',
      type: 'internship',
      duration: '6 months',
      stipend: '₹75,000/month',
      applicationDeadline: '2025-10-10',
      postedDate: '2025-09-15',
      description: 'Work with our data science team to analyze large datasets and build machine learning models for various Microsoft products.',
      requirements: [
        'Pursuing M.Tech/PhD in relevant field',
        'Strong background in statistics and mathematics',
        'Experience with Python, R, or similar languages',
        'Knowledge of ML frameworks like TensorFlow or PyTorch'
      ],
      skills: ['Python', 'Machine Learning', 'Statistics', 'TensorFlow'],
      applicants: 156,
      status: 'open',
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=60&h=60&fit=crop',
      contactPerson: 'Emily Rodriguez',
      contactEmail: 'emily.rodriguez@microsoft.com'
    },
    {
      id: 4,
      title: 'Frontend Developer',
      company: 'Flipkart',
      location: 'Bangalore',
      type: 'full-time',
      duration: 'Permanent',
      salary: '₹15-22 LPA',
      applicationDeadline: '2025-09-30',
      postedDate: '2025-09-12',
      description: 'Join our frontend team to create amazing user experiences for millions of customers. Work with the latest technologies and frameworks.',
      requirements: [
        'B.Tech/M.Tech in Computer Science',
        '2+ years of experience with React/Angular/Vue',
        'Strong CSS and JavaScript skills',
        'Experience with responsive design'
      ],
      skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
      applicants: 198,
      status: 'closing-soon',
      urgent: true,
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=60&h=60&fit=crop',
      contactPerson: 'David Kim',
      contactEmail: 'david.kim@flipkart.com'
    },
    {
      id: 5,
      title: 'Product Manager Intern',
      company: 'Zomato',
      location: 'Delhi NCR',
      type: 'internship',
      duration: '4 months',
      stipend: '₹60,000/month',
      applicationDeadline: '2025-10-25',
      postedDate: '2025-09-10',
      description: 'Get hands-on experience in product management. Work closely with engineering and design teams to ship features that delight users.',
      requirements: [
        'Pursuing MBA or final year B.Tech',
        'Strong analytical and problem-solving skills',
        'Interest in product management and user experience',
        'Good communication and presentation skills'
      ],
      skills: ['Product Management', 'Analytics', 'Communication', 'Strategy'],
      applicants: 134,
      status: 'open',
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=60&h=60&fit=crop',
      contactPerson: 'Priya Sharma',
      contactEmail: 'priya.sharma@zomato.com'
    }
  ];

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'internships' && opportunity.type === 'internship') ||
                      (activeTab === 'jobs' && opportunity.type === 'full-time') ||
                      (activeTab === 'applied' && false); // Placeholder for applied opportunities logic
    
    const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = selectedLocation === 'all' || opportunity.location.toLowerCase().includes(selectedLocation);
    const matchesType = selectedType === 'all' || opportunity.type === selectedType;
    
    return matchesTab && matchesSearch && matchesLocation && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-700';
      case 'closing-soon': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'internship': return 'GraduationCap';
      case 'full-time': return 'Briefcase';
      case 'part-time': return 'Clock';
      case 'contract': return 'FileText';
      default: return 'Briefcase';
    }
  };

  const handleApply = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowApplicationModal(true);
  };

  const handleSaveOpportunity = (opportunityId) => {
    console.log('Saving opportunity:', opportunityId);
    // Implement save logic
  };

  const tabs = [
    { id: 'all', label: 'All Opportunities', count: opportunities.length },
    { id: 'internships', label: 'Internships', count: opportunities.filter(o => o.type === 'internship').length },
    { id: 'jobs', label: 'Full-time Jobs', count: opportunities.filter(o => o.type === 'full-time').length },
    { id: 'applied', label: 'Applied', count: 0 } // Placeholder
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Job & Internship Opportunities</h2>
          <p className="text-muted-foreground">Discover exciting career opportunities that match your skills</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700"
          >
            <Icon name="Bell" size={16} className="mr-2" />
            Job Alerts
          </Button>
          <Button
            variant="outline"
            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
          >
            <Icon name="Upload" size={16} className="mr-2" />
            Upload Resume
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{tab.label}</span>
            <span className="bg-muted-foreground/20 text-xs px-1.5 py-0.5 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Input
              type="search"
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <Select
              value={selectedLocation}
              onChange={setSelectedLocation}
              options={locationOptions}
            />
          </div>
          <div>
            <Select
              value={selectedType}
              onChange={setSelectedType}
              options={typeOptions}
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
            >
              <Icon name="Filter" size={16} className="mr-2" />
              Advanced
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('all');
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
          <div className="text-2xl font-bold text-blue-600">{opportunities.length}</div>
          <div className="text-sm text-muted-foreground">Total Opportunities</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {opportunities.filter(o => o.type === 'internship').length}
          </div>
          <div className="text-sm text-muted-foreground">Internships</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {opportunities.filter(o => o.type === 'full-time').length}
          </div>
          <div className="text-sm text-muted-foreground">Full-time Jobs</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {opportunities.filter(o => o.urgent).length}
          </div>
          <div className="text-sm text-muted-foreground">Urgent Hiring</div>
        </div>
      </div>

      {/* Opportunities List */}
      {filteredOpportunities.length > 0 ? (
        <div className="space-y-4">
          {filteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={opportunity.companyLogo}
                    alt={opportunity.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-card-foreground">{opportunity.title}</h3>
                      {opportunity.urgent && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground font-medium">{opportunity.company}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name={getTypeIcon(opportunity.type)} size={14} />
                        <span className="capitalize">{opportunity.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{opportunity.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="DollarSign" size={14} />
                        <span>{opportunity.type === 'internship' ? opportunity.stipend : opportunity.salary}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(opportunity.status)}`}>
                    {opportunity.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSaveOpportunity(opportunity.id)}
                    className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
                  >
                    <Icon name="Bookmark" size={14} />
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 line-clamp-2">{opportunity.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {opportunity.skills.slice(0, 4).map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
                {opportunity.skills.length > 4 && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    +{opportunity.skills.length - 4} more
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{opportunity.applicants} applicants</span>
                  <span>Deadline: {new Date(opportunity.applicationDeadline).toLocaleDateString()}</span>
                  <span>Posted: {new Date(opportunity.postedDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleApply(opportunity)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Icon name="Send" size={14} className="mr-2" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No opportunities found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or check back later for new opportunities.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedLocation('all');
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

export default JobOpportunities;