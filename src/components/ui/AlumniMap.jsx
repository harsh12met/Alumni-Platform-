import React, { useState, useEffect } from 'react';
import { MapPin, Users, Building2, Filter, Search, Briefcase, GraduationCap } from 'lucide-react';

const AlumniMap = ({ showInstituteFilter = false, userRole = 'student' }) => {
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAlumni, setFilteredAlumni] = useState([]);

  // Mock alumni data with job locations
  const alumniData = [
    {
      id: 1,
      name: 'Rajesh Sharma',
      batch: '2020',
      course: 'Computer Science Engineering',
      institute: 'IIT Delhi',
      currentCompany: 'Google',
      position: 'Senior Software Engineer',
      location: 'Bangalore',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      salary: '₹25,00,000',
      experience: '4 years',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      email: 'rajesh.sharma@google.com',
      linkedin: 'linkedin.com/in/rajesh-sharma'
    },
    {
      id: 2,
      name: 'Priya Patel',
      batch: '2019',
      course: 'Data Science',
      institute: 'NIT Mumbai',
      currentCompany: 'Microsoft',
      position: 'Data Scientist',
      location: 'Hyderabad',
      coordinates: { lat: 17.3850, lng: 78.4867 },
      salary: '₹22,00,000',
      experience: '5 years',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      email: 'priya.patel@microsoft.com',
      linkedin: 'linkedin.com/in/priya-patel'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      batch: '2021',
      course: 'Software Engineering',
      institute: 'BITS Pilani',
      currentCompany: 'Amazon',
      position: 'Software Development Engineer',
      location: 'Chennai',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      salary: '₹18,00,000',
      experience: '3 years',
      skills: ['Java', 'Spring Boot', 'Microservices', 'Docker'],
      email: 'amit.kumar@amazon.com',
      linkedin: 'linkedin.com/in/amit-kumar'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      batch: '2018',
      course: 'Electronics Engineering',
      institute: 'VIT Vellore',
      currentCompany: 'Intel',
      position: 'Hardware Engineer',
      location: 'Pune',
      coordinates: { lat: 18.5204, lng: 73.8567 },
      salary: '₹20,00,000',
      experience: '6 years',
      skills: ['VLSI', 'Circuit Design', 'Embedded Systems', 'FPGA'],
      email: 'sneha.reddy@intel.com',
      linkedin: 'linkedin.com/in/sneha-reddy'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      batch: '2020',
      course: 'Mechanical Engineering',
      institute: 'IIT Bombay',
      currentCompany: 'Tesla',
      position: 'Mechanical Engineer',
      location: 'Mumbai',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      salary: '₹28,00,000',
      experience: '4 years',
      skills: ['CAD', 'Solidworks', 'Manufacturing', 'Automation'],
      email: 'vikram.singh@tesla.com',
      linkedin: 'linkedin.com/in/vikram-singh'
    },
    {
      id: 6,
      name: 'Ananya Iyer',
      batch: '2019',
      course: 'Computer Science',
      institute: 'IISC Bangalore',
      currentCompany: 'Netflix',
      position: 'Frontend Engineer',
      location: 'Delhi',
      coordinates: { lat: 28.7041, lng: 77.1025 },
      salary: '₹24,00,000',
      experience: '5 years',
      skills: ['React', 'JavaScript', 'CSS', 'Redux'],
      email: 'ananya.iyer@netflix.com',
      linkedin: 'linkedin.com/in/ananya-iyer'
    },
    {
      id: 7,
      name: 'Rohit Gupta',
      batch: '2021',
      course: 'Civil Engineering',
      institute: 'NIT Trichy',
      currentCompany: 'Larsen & Toubro',
      position: 'Project Engineer',
      location: 'Kolkata',
      coordinates: { lat: 22.5726, lng: 88.3639 },
      salary: '₹15,00,000',
      experience: '3 years',
      skills: ['AutoCAD', 'Project Management', 'Construction', 'Structural Design'],
      email: 'rohit.gupta@lnt.com',
      linkedin: 'linkedin.com/in/rohit-gupta'
    },
    {
      id: 8,
      name: 'Kavitha Menon',
      batch: '2020',
      course: 'Information Technology',
      institute: 'IIIT Hyderabad',
      currentCompany: 'Flipkart',
      position: 'Product Manager',
      location: 'Bangalore',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      salary: '₹26,00,000',
      experience: '4 years',
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile'],
      email: 'kavitha.menon@flipkart.com',
      linkedin: 'linkedin.com/in/kavitha-menon'
    }
  ];

  const institutes = [
    { value: '', label: 'All Institutes' },
    { value: 'IIT Delhi', label: 'Indian Institute of Technology, Delhi' },
    { value: 'NIT Mumbai', label: 'National Institute of Technology, Mumbai' },
    { value: 'BITS Pilani', label: 'Birla Institute of Technology and Science, Pilani' },
    { value: 'VIT Vellore', label: 'Vellore Institute of Technology, Vellore' },
    { value: 'IISC Bangalore', label: 'Indian Institute of Science, Bangalore' },
    { value: 'IIT Bombay', label: 'Indian Institute of Technology, Bombay' },
    { value: 'NIT Trichy', label: 'National Institute of Technology, Tiruchirappalli' },
    { value: 'IIIT Hyderabad', label: 'International Institute of Information Technology, Hyderabad' }
  ];

  // Filter alumni based on institute and search term
  useEffect(() => {
    let filtered = alumniData;

    if (selectedInstitute) {
      filtered = filtered.filter(alumni => alumni.institute === selectedInstitute);
    }

    if (searchTerm) {
      filtered = filtered.filter(alumni => 
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAlumni(filtered);
  }, [selectedInstitute, searchTerm]);

  // Initialize with all alumni
  useEffect(() => {
    setFilteredAlumni(alumniData);
  }, []);

  const getLocationStats = () => {
    const locationCounts = {};
    filteredAlumni.forEach(alumni => {
      locationCounts[alumni.location] = (locationCounts[alumni.location] || 0) + 1;
    });
    return locationCounts;
  };

  const getTopCompanies = () => {
    const companyCounts = {};
    filteredAlumni.forEach(alumni => {
      companyCounts[alumni.currentCompany] = (companyCounts[alumni.currentCompany] || 0) + 1;
    });
    return Object.entries(companyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const locationStats = getLocationStats();
  const topCompanies = getTopCompanies();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Alumni Location Map</h3>
            <p className="text-sm text-gray-600">Current job locations of our alumni</p>
          </div>
        </div>
        <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {filteredAlumni.length} Alumni
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {showInstituteFilter && (
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Filter by Institute
            </label>
            <select
              value={selectedInstitute}
              onChange={(e) => setSelectedInstitute(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {institutes.map(institute => (
                <option key={institute.value} value={institute.value}>
                  {institute.label}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Search className="w-4 h-4 inline mr-1" />
            Search Alumni
          </label>
          <input
            type="text"
            placeholder="Search by name, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Map Container - Placeholder for actual map */}
      <div className="relative">
        {/* Map Placeholder */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 mb-6 relative overflow-hidden border border-gray-200">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50"></div>
          
          {/* India Map Outline Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <p className="text-lg font-medium">Interactive Alumni Map</p>
              <p className="text-sm">Click on markers to view alumni details</p>
            </div>
          </div>

          {/* Mock Map Markers */}
          {filteredAlumni.map((alumni, index) => (
            <div
              key={alumni.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                left: `${20 + (index * 10) % 60}%`,
                top: `${25 + (index * 15) % 50}%`,
              }}
              onClick={() => setSelectedAlumni(alumni)}
              title={`${alumni.name} - ${alumni.currentCompany}, ${alumni.location}`}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Alumni Details */}
        {selectedAlumni && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Alumni Details</h4>
                <button
                  onClick={() => setSelectedAlumni(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h5 className="font-semibold text-lg">{selectedAlumni.name}</h5>
                  <p className="text-gray-600">{selectedAlumni.position}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      <strong>Company:</strong> {selectedAlumni.currentCompany}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      <strong>Location:</strong> {selectedAlumni.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      <strong>Institute:</strong> {selectedAlumni.institute}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      <strong>Experience:</strong> {selectedAlumni.experience}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlumni.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Batch:</strong> {selectedAlumni.batch} • <strong>Course:</strong> {selectedAlumni.course}
                  </p>
                  {userRole === 'recruiter' && (
                    <p className="text-sm text-gray-600">
                      <strong>Salary:</strong> {selectedAlumni.salary}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location Stats */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            Top Locations
          </h4>
          <div className="space-y-2">
            {Object.entries(locationStats)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([location, count]) => (
                <div key={location} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{location}</span>
                  <span className="text-sm font-medium text-blue-600">{count} alumni</span>
                </div>
              ))}
          </div>
        </div>

        {/* Company Stats */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <Building2 className="w-4 h-4 mr-2 text-green-600" />
            Top Companies
          </h4>
          <div className="space-y-2">
            {topCompanies.map(([company, count]) => (
              <div key={company} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{company}</span>
                <span className="text-sm font-medium text-green-600">{count} alumni</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniMap;