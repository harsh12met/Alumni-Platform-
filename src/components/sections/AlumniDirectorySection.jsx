import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Briefcase, MessageSquare, Star } from 'lucide-react';

const AlumniDirectorySection = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    batch: '',
    company: '',
    skills: '',
    location: ''
  });

  // Mock data - Replace with Firestore fetch
  useEffect(() => {
    const mockAlumni = [
      {
        id: 1,
        name: 'Sarah Johnson',
        batch: '2018-2022',
        company: 'Google',
        position: 'Software Engineer',
        location: 'Mountain View, CA',
        skills: ['React', 'JavaScript', 'Python', 'Machine Learning'],
        rating: 4.8,
        mentorshipAvailable: true,
        profileImage: null
      },
      {
        id: 2,
        name: 'Raj Patel',
        batch: '2017-2021',
        company: 'Microsoft',
        position: 'Product Manager',
        location: 'Seattle, WA',
        skills: ['Product Management', 'Data Analysis', 'Strategy'],
        rating: 4.9,
        mentorshipAvailable: true,
        profileImage: null
      },
      {
        id: 3,
        name: 'Emily Chen',
        batch: '2019-2023',
        company: 'Amazon',
        position: 'Data Scientist',
        location: 'Seattle, WA',
        skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
        rating: 4.7,
        mentorshipAvailable: false,
        profileImage: null
      },
      {
        id: 4,
        name: 'David Kumar',
        batch: '2016-2020',
        company: 'Tesla',
        position: 'Senior Engineer',
        location: 'Palo Alto, CA',
        skills: ['C++', 'Embedded Systems', 'IoT', 'Automotive'],
        rating: 4.6,
        mentorshipAvailable: true,
        profileImage: null
      }
    ];
    setAlumni(mockAlumni);
    setFilteredAlumni(mockAlumni);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = alumni.filter(alum => {
      const matchesSearch = alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alum.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesBatch = !filters.batch || alum.batch.includes(filters.batch);
      const matchesCompany = !filters.company || alum.company.toLowerCase().includes(filters.company.toLowerCase());
      const matchesLocation = !filters.location || alum.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesSkills = !filters.skills || alum.skills.some(skill => 
        skill.toLowerCase().includes(filters.skills.toLowerCase())
      );

      return matchesSearch && matchesBatch && matchesCompany && matchesLocation && matchesSkills;
    });
    setFilteredAlumni(filtered);
  }, [searchTerm, filters, alumni]);

  const handleRequestMentorship = (alumniId) => {
    // TODO: Send mentorship request to Firestore
    alert(`Mentorship request sent to alumni ID: ${alumniId}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Alumni Directory</h2>
        <p className="text-gray-600">Connect with our accomplished alumni for mentorship and guidance</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Batch Filter */}
          <select
            value={filters.batch}
            onChange={(e) => setFilters(prev => ({ ...prev, batch: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Batches</option>
            <option value="2016">2016-2020</option>
            <option value="2017">2017-2021</option>
            <option value="2018">2018-2022</option>
            <option value="2019">2019-2023</option>
          </select>

          {/* Company Filter */}
          <input
            type="text"
            placeholder="Company"
            value={filters.company}
            onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Location Filter */}
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Skills Filter */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Filter by skills (e.g., React, Python, Machine Learning)"
            value={filters.skills}
            onChange={(e) => setFilters(prev => ({ ...prev, skills: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredAlumni.length} of {alumni.length} alumni
        </p>
      </div>

      {/* Alumni Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alum) => (
          <div key={alum.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Profile Header */}
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {alum.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{alum.name}</h3>
                  <p className="text-gray-600 text-sm">{alum.position}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{alum.rating}</span>
                  </div>
                </div>
              </div>

              {/* Company and Location */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {alum.company}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {alum.location}
                </div>
              </div>

              {/* Batch */}
              <div className="mb-4">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  Batch {alum.batch}
                </span>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {alum.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {alum.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{alum.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-gray-100">
                {alum.mentorshipAvailable ? (
                  <button
                    onClick={() => handleRequestMentorship(alum.id)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Request Mentorship
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Mentorship Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAlumni.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No alumni found</h3>
          <p className="text-gray-600">Try adjusting your search filters to find more alumni.</p>
        </div>
      )}
    </div>
  );
};

export default AlumniDirectorySection;