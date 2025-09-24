import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Building,
  GraduationCap,
  Calendar,
  Briefcase,
  Globe,
  Award,
  Eye,
  Edit2,
  MoreVertical,
  Users,
  TrendingUp,
  PieChart,
  BarChart3
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    college: 'all',
    university: 'all',
    graduationYear: 'all',
    branch: 'all',
    placementStatus: 'all',
    region: 'all',
    location: 'all',
    industry: 'all',
    experience: 'all',
    salaryRange: 'all'
  });

  // Mock data - Replace with Firebase Firestore calls
  useEffect(() => {
    const mockAlumni = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@techcorp.com',
        phone: '+1-555-0123',
        profileImage: '/api/placeholder/100/100',
        college: 'Engineering College',
        university: 'Stanford University',
        graduationYear: 2020,
        branch: 'Computer Science',
        degree: 'B.Tech',
        currentPosition: 'Senior Software Engineer',
        company: 'Google',
        industry: 'Technology',
        placementStatus: 'placed',
        experience: '4+ years',
        salaryRange: '$120k-150k',
        region: 'North America',
        location: 'San Francisco, CA',
        skills: ['React', 'Node.js', 'Python', 'AWS'],
        achievements: ['Published 3 research papers', 'Led team of 8 developers'],
        linkedIn: 'https://linkedin.com/in/johnsmith',
        joinedDate: '2020-06-15',
        lastActive: '2024-01-20',
        isVerified: true
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@healthplus.com',
        phone: '+1-555-0124',
        profileImage: '/api/placeholder/100/100',
        college: 'Medical College',
        university: 'Harvard University',
        graduationYear: 2019,
        branch: 'Medicine',
        degree: 'MBBS',
        currentPosition: 'Pediatric Surgeon',
        company: 'Mayo Clinic',
        industry: 'Healthcare',
        placementStatus: 'placed',
        experience: '5+ years',
        salaryRange: '$200k+',
        region: 'North America',
        location: 'Boston, MA',
        skills: ['Surgery', 'Pediatrics', 'Medical Research'],
        achievements: ['Performed 500+ surgeries', 'Medical excellence award'],
        linkedIn: 'https://linkedin.com/in/sarahjohnson',
        joinedDate: '2019-07-01',
        lastActive: '2024-01-19',
        isVerified: true
      },
      {
        id: '3',
        name: 'Raj Patel',
        email: 'raj.patel@startup.com',
        phone: '+91-98765-43210',
        profileImage: '/api/placeholder/100/100',
        college: 'Business School',
        university: 'IIT Mumbai',
        graduationYear: 2021,
        branch: 'Computer Science',
        degree: 'M.Tech',
        currentPosition: 'Co-Founder & CTO',
        company: 'TechStart Innovations',
        industry: 'Technology',
        placementStatus: 'entrepreneur',
        experience: '3+ years',
        salaryRange: '$80k-120k',
        region: 'Asia',
        location: 'Mumbai, India',
        skills: ['JavaScript', 'Machine Learning', 'Blockchain'],
        achievements: ['Raised $2M in funding', 'Built product used by 10k+ users'],
        linkedIn: 'https://linkedin.com/in/rajpatel',
        joinedDate: '2021-08-15',
        lastActive: '2024-01-18',
        isVerified: true
      },
      {
        id: '4',
        name: 'Emily Chen',
        email: 'emily.chen.job@seeking.com',
        phone: '+1-555-0125',
        profileImage: '/api/placeholder/100/100',
        college: 'Arts & Sciences',
        university: 'UC Berkeley',
        graduationYear: 2023,
        branch: 'Marketing',
        degree: 'MBA',
        currentPosition: 'Looking for opportunities',
        company: 'Job Seeking',
        industry: 'Marketing',
        placementStatus: 'unplaced',
        experience: '1-2 years',
        salaryRange: '$50k-80k',
        region: 'North America',
        location: 'Los Angeles, CA',
        skills: ['Digital Marketing', 'Analytics', 'Content Strategy'],
        achievements: ['Marketing internship at Netflix', 'Dean\'s list graduate'],
        linkedIn: 'https://linkedin.com/in/emilychen',
        joinedDate: '2023-05-20',
        lastActive: '2024-01-21',
        isVerified: false
      },
      {
        id: '5',
        name: 'Michael Brown',
        email: 'michael.brown@finance.com',
        phone: '+44-20-7123-4567',
        profileImage: '/api/placeholder/100/100',
        college: 'Business School',
        university: 'Oxford University',
        graduationYear: 2018,
        branch: 'Finance',
        degree: 'MBA',
        currentPosition: 'Investment Banker',
        company: 'Goldman Sachs',
        industry: 'Finance',
        placementStatus: 'placed',
        experience: '6+ years',
        salaryRange: '$150k-200k',
        region: 'Europe',
        location: 'London, UK',
        skills: ['Investment Analysis', 'Risk Management', 'Financial Modeling'],
        achievements: ['Managed $100M+ portfolio', 'Top performer 3 years running'],
        linkedIn: 'https://linkedin.com/in/michaelbrown',
        joinedDate: '2018-09-01',
        lastActive: '2024-01-17',
        isVerified: true
      },
      {
        id: '6',
        name: 'Lisa Wang',
        email: 'lisa.wang@consultant.com',
        phone: '+65-9123-4567',
        profileImage: '/api/placeholder/100/100',
        college: 'Engineering College',
        university: 'NUS Singapore',
        graduationYear: 2022,
        branch: 'Industrial Engineering',
        degree: 'B.Eng',
        currentPosition: 'Management Consultant',
        company: 'McKinsey & Company',
        industry: 'Consulting',
        placementStatus: 'placed',
        experience: '2-3 years',
        salaryRange: '$80k-120k',
        region: 'Asia',
        location: 'Singapore',
        skills: ['Process Optimization', 'Strategy', 'Data Analysis'],
        achievements: ['Led 15+ client projects', 'Consultant of the year 2023'],
        linkedIn: 'https://linkedin.com/in/lisawang',
        joinedDate: '2022-07-10',
        lastActive: '2024-01-16',
        isVerified: true
      }
    ];
    
    setTimeout(() => {
      setAlumni(mockAlumni);
      setFilteredAlumni(mockAlumni);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter options
  const filterOptions = {
    colleges: ['All Colleges', 'Engineering College', 'Medical College', 'Business School', 'Arts & Sciences'],
    universities: ['All Universities', 'Stanford University', 'Harvard University', 'IIT Mumbai', 'UC Berkeley', 'Oxford University', 'NUS Singapore'],
    graduationYears: ['All Years', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    branches: ['All Branches', 'Computer Science', 'Medicine', 'Marketing', 'Finance', 'Industrial Engineering'],
    placementStatus: ['All Status', 'placed', 'unplaced', 'entrepreneur'],
    regions: ['All Regions', 'North America', 'Europe', 'Asia', 'Africa', 'Australia', 'South America'],
    industries: ['All Industries', 'Technology', 'Healthcare', 'Finance', 'Marketing', 'Consulting', 'Education'],
    experienceLevels: ['All Experience', '0-1 years', '1-2 years', '2-3 years', '3-5 years', '5+ years', '6+ years'],
    salaryRanges: ['All Ranges', '$0-50k', '$50k-80k', '$80k-120k', '$120k-150k', '$150k-200k', '$200k+']
  };

  // Apply filters
  useEffect(() => {
    let filtered = alumni.filter(alumnus => {
      const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alumnus.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alumnus.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alumnus.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCollege = filters.college === 'all' || alumnus.college === filters.college;
      const matchesUniversity = filters.university === 'all' || alumnus.university === filters.university;
      const matchesYear = filters.graduationYear === 'all' || alumnus.graduationYear.toString() === filters.graduationYear;
      const matchesBranch = filters.branch === 'all' || alumnus.branch === filters.branch;
      const matchesPlacement = filters.placementStatus === 'all' || alumnus.placementStatus === filters.placementStatus;
      const matchesRegion = filters.region === 'all' || alumnus.region === filters.region;
      const matchesIndustry = filters.industry === 'all' || alumnus.industry === filters.industry;
      const matchesExperience = filters.experience === 'all' || alumnus.experience === filters.experience;
      const matchesSalary = filters.salaryRange === 'all' || alumnus.salaryRange === filters.salaryRange;

      return matchesSearch && matchesCollege && matchesUniversity && matchesYear && 
             matchesBranch && matchesPlacement && matchesRegion && matchesIndustry && 
             matchesExperience && matchesSalary;
    });

    setFilteredAlumni(filtered);
  }, [searchTerm, filters, alumni]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value === 'All Colleges' || value === 'All Universities' || 
                   value === 'All Years' || value === 'All Branches' ||
                   value === 'All Status' || value === 'All Regions' ||
                   value === 'All Industries' || value === 'All Experience' ||
                   value === 'All Ranges' ? 'all' : value
    }));
  };

  const resetFilters = () => {
    setFilters({
      college: 'all',
      university: 'all',
      graduationYear: 'all',
      branch: 'all',
      placementStatus: 'all',
      region: 'all',
      location: 'all',
      industry: 'all',
      experience: 'all',
      salaryRange: 'all'
    });
    setSearchTerm('');
  };

  const exportData = () => {
    // TODO: Implement CSV/Excel export functionality
    console.log('Exporting alumni data...');
  };

  // Analytics data
  const getAnalyticsData = () => {
    const placementData = [
      { name: 'Placed', value: filteredAlumni.filter(a => a.placementStatus === 'placed').length },
      { name: 'Unplaced', value: filteredAlumni.filter(a => a.placementStatus === 'unplaced').length },
      { name: 'Entrepreneur', value: filteredAlumni.filter(a => a.placementStatus === 'entrepreneur').length }
    ];

    const industryData = filteredAlumni.reduce((acc, alumnus) => {
      acc[alumnus.industry] = (acc[alumnus.industry] || 0) + 1;
      return acc;
    }, {});

    const industryChartData = Object.entries(industryData).map(([name, value]) => ({ name, value }));

    const regionData = filteredAlumni.reduce((acc, alumnus) => {
      acc[alumnus.region] = (acc[alumnus.region] || 0) + 1;
      return acc;
    }, {});

    const regionChartData = Object.entries(regionData).map(([name, value]) => ({ name, value }));

    return { placementData, industryChartData, regionChartData };
  };

  const COLORS = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Alumni Directory</h2>
          <p className="text-gray-600">
            Comprehensive directory with {filteredAlumni.length} of {alumni.length} alumni
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              showAnalytics 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
          
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Alumni</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredAlumni.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Placed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredAlumni.filter(a => a.placementStatus === 'placed').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Entrepreneurs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredAlumni.filter(a => a.placementStatus === 'entrepreneur').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Placement Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredAlumni.length > 0 
                      ? Math.round((filteredAlumni.filter(a => a.placementStatus === 'placed').length / filteredAlumni.length) * 100)
                      : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Placement Status */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Placement Status</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={getAnalyticsData().placementData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {getAnalyticsData().placementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            {/* Industry Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={getAnalyticsData().industryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Regional Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={getAnalyticsData().regionChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#22C55E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={resetFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Reset All Filters
          </button>
        </div>
        
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <select
            value={filters.college === 'all' ? 'All Colleges' : filters.college}
            onChange={(e) => handleFilterChange('college', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {filterOptions.colleges.map(college => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>

          <select
            value={filters.university === 'all' ? 'All Universities' : filters.university}
            onChange={(e) => handleFilterChange('university', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {filterOptions.universities.map(university => (
              <option key={university} value={university}>{university}</option>
            ))}
          </select>

          <select
            value={filters.graduationYear === 'all' ? 'All Years' : filters.graduationYear}
            onChange={(e) => handleFilterChange('graduationYear', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {filterOptions.graduationYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={filters.branch === 'all' ? 'All Branches' : filters.branch}
            onChange={(e) => handleFilterChange('branch', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {filterOptions.branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>

          <select
            value={filters.placementStatus === 'all' ? 'All Status' : filters.placementStatus}
            onChange={(e) => handleFilterChange('placementStatus', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {filterOptions.placementStatus.map(status => (
              <option key={status} value={status}>
                {status === 'All Status' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={filters.region === 'all' ? 'All Regions' : filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {filterOptions.regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          <select
            value={filters.industry === 'all' ? 'All Industries' : filters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {filterOptions.industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>

          <select
            value={filters.experience === 'all' ? 'All Experience' : filters.experience}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {filterOptions.experienceLevels.map(exp => (
              <option key={exp} value={exp}>{exp}</option>
            ))}
          </select>

          <select
            value={filters.salaryRange === 'all' ? 'All Ranges' : filters.salaryRange}
            onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {filterOptions.salaryRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Alumni Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlumni.map((alumnus) => (
            <div key={alumnus.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-lg">
                      {alumnus.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{alumnus.name}</h3>
                    <p className="text-sm text-gray-500">{alumnus.graduationYear}</p>
                  </div>
                  {alumnus.isVerified && (
                    <Award className="w-4 h-4 text-green-500" />
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{alumnus.branch}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{alumnus.company}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{alumnus.location}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    alumnus.placementStatus === 'placed' ? 'bg-green-100 text-green-800' :
                    alumnus.placementStatus === 'entrepreneur' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alumnus.placementStatus.charAt(0).toUpperCase() + alumnus.placementStatus.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setSelectedAlumni(alumnus)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-600 hover:text-green-800" title="Send Email">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alumni
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Education
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAlumni.map((alumnus) => (
                  <tr key={alumnus.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-gray-600 font-medium text-sm">
                            {alumnus.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{alumnus.name}</div>
                          <div className="text-sm text-gray-500">{alumnus.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{alumnus.branch}</div>
                      <div className="text-sm text-gray-500">{alumnus.university} - {alumnus.graduationYear}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{alumnus.currentPosition}</div>
                      <div className="text-sm text-gray-500">{alumnus.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {alumnus.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        alumnus.placementStatus === 'placed' ? 'bg-green-100 text-green-800' :
                        alumnus.placementStatus === 'entrepreneur' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {alumnus.placementStatus.charAt(0).toUpperCase() + alumnus.placementStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedAlumni(alumnus)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Alumni Profile Modal */}
      {selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Alumni Profile</h3>
                <button
                  onClick={() => setSelectedAlumni(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-2xl">
                      {selectedAlumni.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-2xl font-bold text-gray-900">{selectedAlumni.name}</h4>
                      {selectedAlumni.isVerified && (
                        <Award className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{selectedAlumni.currentPosition} at {selectedAlumni.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{selectedAlumni.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{selectedAlumni.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Education</h5>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">University:</span>
                        <p className="font-medium">{selectedAlumni.university}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">College:</span>
                        <p className="font-medium">{selectedAlumni.college}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Branch:</span>
                        <p className="font-medium">{selectedAlumni.branch}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Graduation Year:</span>
                        <p className="font-medium">{selectedAlumni.graduationYear}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Info */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Professional Information</h5>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Industry:</span>
                        <p className="font-medium">{selectedAlumni.industry}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Experience:</span>
                        <p className="font-medium">{selectedAlumni.experience}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Salary Range:</span>
                        <p className="font-medium">{selectedAlumni.salaryRange}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Location:</span>
                        <p className="font-medium">{selectedAlumni.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlumni.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h5>
                  <ul className="space-y-2">
                    {selectedAlumni.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Send Message
                </button>
                <button
                  onClick={() => setSelectedAlumni(null)}
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
      {filteredAlumni.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
          <p className="text-gray-500">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
};

export default AlumniDirectory;