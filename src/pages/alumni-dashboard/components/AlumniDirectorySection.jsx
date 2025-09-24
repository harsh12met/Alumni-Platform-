import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Briefcase, Users, MessageCircle } from 'lucide-react';

const AlumniDirectorySection = () => {
  const [alumni, setAlumni] = useState([
    {
      id: 1,
      name: 'Jane Smith',
      batch: '2019',
      degree: 'Computer Engineering',
      company: 'Google',
      position: 'Software Engineer',
      location: 'Mountain View, CA',
      skills: ['JavaScript', 'React', 'Python'],
      profilePicture: null
    },
    {
      id: 2,
      name: 'Mike Johnson',
      batch: '2018',
      degree: 'Mechanical Engineering',
      company: 'Tesla',
      position: 'Design Engineer',
      location: 'Austin, TX',
      skills: ['CAD', 'Design', 'Manufacturing'],
      profilePicture: null
    },
    {
      id: 3,
      name: 'Sarah Wilson',
      batch: '2020',
      degree: 'Business Administration',
      company: 'McKinsey & Company',
      position: 'Consultant',
      location: 'New York, NY',
      skills: ['Strategy', 'Analytics', 'Leadership'],
      profilePicture: null
    }
  ]);

  const [filteredAlumni, setFilteredAlumni] = useState(alumni);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    batch: '',
    company: '',
    location: '',
    skills: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // TODO: Fetch alumni from Firestore
    // const fetchAlumni = async () => {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "alumni"));
    //     const alumniData = [];
    //     querySnapshot.forEach((doc) => {
    //       alumniData.push({ id: doc.id, ...doc.data() });
    //     });
    //     setAlumni(alumniData);
    //     setFilteredAlumni(alumniData);
    //   } catch (error) {
    //     console.error("Error fetching alumni:", error);
    //   }
    // };
    // fetchAlumni();
  }, []);

  useEffect(() => {
    let filtered = alumni.filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           person.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           person.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesBatch = !filters.batch || person.batch === filters.batch;
      const matchesCompany = !filters.company || person.company.toLowerCase().includes(filters.company.toLowerCase());
      const matchesLocation = !filters.location || person.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesSkills = !filters.skills || person.skills.some(skill => 
        skill.toLowerCase().includes(filters.skills.toLowerCase())
      );

      return matchesSearch && matchesBatch && matchesCompany && matchesLocation && matchesSkills;
    });

    setFilteredAlumni(filtered);
  }, [searchQuery, filters, alumni]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      batch: '',
      company: '',
      location: '',
      skills: ''
    });
  };

  const handleConnect = (alumniId) => {
    // TODO: Implement connection request
    console.log('Connecting with alumni:', alumniId);
  };

  const handleMessage = (alumniId) => {
    // TODO: Implement messaging
    console.log('Messaging alumni:', alumniId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Directory</h1>
        <p className="text-gray-600">Connect with fellow alumni from your institution</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, company, position, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter size={20} className="mr-2" />
            Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
                <select
                  value={filters.batch}
                  onChange={(e) => handleFilterChange('batch', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Batches</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  placeholder="Filter by company"
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Filter by location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <input
                  type="text"
                  placeholder="Filter by skills"
                  value={filters.skills}
                  onChange={(e) => handleFilterChange('skills', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredAlumni.length} of {alumni.length} alumni
        </p>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((person) => (
          <div key={person.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Profile Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                <p className="text-gray-600">{person.degree} - {person.batch}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <Briefcase size={16} className="mr-2" />
                <span className="text-sm">{person.position} at {person.company}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">{person.location}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {person.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {person.skills.length > 3 && (
                  <span className="text-gray-500 text-xs px-2 py-1">
                    +{person.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleConnect(person.id)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Users size={16} className="mr-2" />
                Connect
              </button>
              <button
                onClick={() => handleMessage(person.id)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <MessageCircle size={16} className="mr-2" />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAlumni.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default AlumniDirectorySection;