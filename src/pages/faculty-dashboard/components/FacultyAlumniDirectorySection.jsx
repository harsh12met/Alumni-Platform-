import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Briefcase, Calendar, ExternalLink, MessageCircle } from 'lucide-react';

const FacultyAlumniDirectorySection = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    skills: '',
    batch: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // TODO: Fetch alumni from Firestore
    // For now, using placeholder data
    const mockAlumni = [
      {
        id: '1',
        name: 'Priya Kulkarni',
        email: 'priya.kulkarni@techcorp.com',
        industry: 'Technology',
        company: 'TechCorp Inc.',
        position: 'Senior Software Engineer',
        batch: '2018',
        skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
        location: 'San Francisco, CA',
        achievements: ['Led team of 10 developers', 'Published 3 research papers'],
        profileImage: '',
        graduationYear: 2018
      },
      {
        id: '2',
        name: 'Rajesh Deshmukh',
        email: 'rajesh.deshmukh@fintech.com',
        industry: 'Finance',
        company: 'FinTech Solutions',
        position: 'Data Scientist',
        batch: '2019',
        skills: ['Data Science', 'Python', 'SQL', 'Machine Learning'],
        location: 'New York, NY',
        achievements: ['Increased revenue by 25%', 'Published ML research'],
        profileImage: '',
        graduationYear: 2019
      },
      {
        id: '3',
        name: 'Sneha Joshi',
        email: 'sneha.joshi@startup.com',
        industry: 'Healthcare',
        company: 'MedTech Startup',
        position: 'Product Manager',
        batch: '2017',
        skills: ['Product Management', 'Healthcare Tech', 'UX Design'],
        location: 'Boston, MA',
        achievements: ['Launched 3 successful products', 'Featured in Forbes 30 under 30'],
        profileImage: '',
        graduationYear: 2017
      }
    ];
    
    setAlumni(mockAlumni);
    setFilteredAlumni(mockAlumni);
  }, []);

  useEffect(() => {
    let filtered = alumni;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(alumnus =>
        alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumnus.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumnus.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumnus.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply industry filter
    if (filters.industry) {
      filtered = filtered.filter(alumnus =>
        alumnus.industry.toLowerCase().includes(filters.industry.toLowerCase())
      );
    }

    // Apply skills filter
    if (filters.skills) {
      filtered = filtered.filter(alumnus =>
        alumnus.skills.some(skill =>
          skill.toLowerCase().includes(filters.skills.toLowerCase())
        )
      );
    }

    // Apply batch filter
    if (filters.batch) {
      filtered = filtered.filter(alumnus =>
        alumnus.batch.includes(filters.batch)
      );
    }

    setFilteredAlumni(filtered);
  }, [searchQuery, filters, alumni]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({ industry: '', skills: '', batch: '' });
    setSearchQuery('');
  };

  const handleConnect = (alumnus) => {
    // TODO: Implement connection functionality
    console.log('Connecting with:', alumnus.name);
    alert(`Connection request sent to ${alumnus.name}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Alumni Directory</h2>
        <p className="text-gray-600">Connect with alumni, explore their achievements, and build valuable relationships.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, company, position, or skills..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  value={filters.industry}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                  placeholder="e.g., Technology, Finance"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <input
                  type="text"
                  value={filters.skills}
                  onChange={(e) => handleFilterChange('skills', e.target.value)}
                  placeholder="e.g., React, Python"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch Year
                </label>
                <input
                  type="text"
                  value={filters.batch}
                  onChange={(e) => handleFilterChange('batch', e.target.value)}
                  placeholder="e.g., 2018, 2019"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alumnus) => (
          <div key={alumnus.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Profile Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  {alumnus.profileImage ? (
                    <img
                      src={alumnus.profileImage}
                      alt={alumnus.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-lg">
                      {alumnus.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{alumnus.name}</h3>
                  <p className="text-sm text-gray-600">{alumnus.position}</p>
                </div>
              </div>

              {/* Company and Location */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{alumnus.company}</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{alumnus.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Class of {alumnus.batch}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {alumnus.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {alumnus.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{alumnus.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Key Achievements</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {alumnus.achievements.slice(0, 2).map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleConnect(alumnus)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Connect</span>
                </button>
                <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <ExternalLink className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAlumni.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default FacultyAlumniDirectorySection;