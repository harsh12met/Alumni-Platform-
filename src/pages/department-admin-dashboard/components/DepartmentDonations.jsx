import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Eye, 
  Plus,
  Search,
  Filter,
  Download,
  Gift,
  Target,
  CheckCircle,
  X
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const DepartmentDonations = () => {
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('donations'); // donations, campaigns
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const { user } = useAuth();

  // Mock donation data
  const mockDonations = [
    {
      id: '1',
      donorName: 'Rajesh Kulkarni',
      donorEmail: 'rajesh.kulkarni@alumni.edu',
      donorType: 'alumni',
      graduationYear: '2018',
      amount: 50000,
      currency: 'INR',
      purpose: 'Lab Equipment Upgrade',
      campaign: 'CS Lab Modernization 2024',
      donationDate: '2024-01-20T10:30:00Z',
      paymentMethod: 'Online',
      paymentStatus: 'completed',
      receiptNumber: 'DN2024001',
      department: user?.department || 'computer-science',
      isAnonymous: false,
      message: 'Happy to contribute to my department\'s growth. Hope this helps current students get better facilities.',
      taxExemptionClaimed: true,
      recurringDonation: false
    },
    {
      id: '2',
      donorName: 'Anonymous Donor',
      donorEmail: 'anonymous@donor.com',
      donorType: 'external',
      graduationYear: null,
      amount: 100000,
      currency: 'INR',
      purpose: 'Student Scholarships',
      campaign: 'Merit Scholarship Fund',
      donationDate: '2024-01-18T14:20:00Z',
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'completed',
      receiptNumber: 'DN2024002',
      department: user?.department || 'computer-science',
      isAnonymous: true,
      message: 'Supporting bright minds in computer science.',
      taxExemptionClaimed: false,
      recurringDonation: true,
      recurringFrequency: 'quarterly'
    },
    {
      id: '3',
      donorName: 'Priya Deshmukh',
      donorEmail: 'priya.deshmukh@alumni.edu',
      donorType: 'alumni',
      graduationYear: '2015',
      amount: 25000,
      currency: 'INR',
      purpose: 'Research Funding',
      campaign: 'AI Research Initiative',
      donationDate: '2024-01-15T09:15:00Z',
      paymentMethod: 'Credit Card',
      paymentStatus: 'completed',
      receiptNumber: 'DN2024003',
      department: user?.department || 'computer-science',
      isAnonymous: false,
      message: 'Excited to support AI research in my alma mater!',
      taxExemptionClaimed: true,
      recurringDonation: false
    },
    {
      id: '4',
      donorName: 'Tech Corp Foundation',
      donorEmail: 'donations@techcorp.com',
      donorType: 'corporate',
      graduationYear: null,
      amount: 200000,
      currency: 'INR',
      purpose: 'Infrastructure Development',
      campaign: 'Smart Classroom Initiative',
      donationDate: '2024-01-12T16:45:00Z',
      paymentMethod: 'Corporate Transfer',
      paymentStatus: 'completed',
      receiptNumber: 'DN2024004',
      department: user?.department || 'computer-science',
      isAnonymous: false,
      message: 'Supporting the next generation of computer scientists.',
      taxExemptionClaimed: true,
      recurringDonation: false
    }
  ];

  // Mock campaign data
  const mockCampaigns = [
    {
      id: '1',
      title: 'CS Lab Modernization 2024',
      description: 'Upgrading computer labs with latest hardware and software for better learning experience.',
      targetAmount: 500000,
      raisedAmount: 320000,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'active',
      category: 'infrastructure',
      department: user?.department || 'computer-science',
      donorCount: 15,
      createdBy: 'Dr. Anita Desai',
      image: '/api/placeholder/400/200',
      updates: [
        {
          date: '2024-01-20',
          title: 'Halfway to our goal!',
          message: 'Thanks to all donors, we\'ve reached 64% of our target.'
        }
      ]
    },
    {
      id: '2',
      title: 'Merit Scholarship Fund',
      description: 'Providing scholarships to deserving students based on academic merit and financial need.',
      targetAmount: 300000,
      raisedAmount: 180000,
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      status: 'active',
      category: 'scholarships',
      department: user?.department || 'computer-science',
      donorCount: 8,
      createdBy: 'Prof. Rajesh Kumar',
      image: '/api/placeholder/400/200',
      updates: []
    },
    {
      id: '3',
      title: 'AI Research Initiative',
      description: 'Funding cutting-edge AI research projects and equipment for faculty and students.',
      targetAmount: 750000,
      raisedAmount: 450000,
      startDate: '2023-09-01',
      endDate: '2024-08-31',
      status: 'active',
      category: 'research',
      department: user?.department || 'computer-science',
      donorCount: 22,
      createdBy: 'Dr. Suresh Gupta',
      image: '/api/placeholder/400/200',
      updates: [
        {
          date: '2024-01-10',
          title: 'New AI Lab Equipment Ordered',
          message: 'We\'ve ordered new GPU clusters thanks to your donations.'
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const departmentDonations = mockDonations.filter(
        donation => donation.department === user?.department
      );
      const departmentCampaigns = mockCampaigns.filter(
        campaign => campaign.department === user?.department
      );
      setDonations(departmentDonations);
      setCampaigns(departmentCampaigns);
      setLoading(false);
    }, 1000);
  }, [user?.department]);

  const filteredDonations = donations.filter(donation => {
    const matchesFilter = filter === 'all' || donation.donorType === filter;
    const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.campaign.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getTotalDonations = () => {
    return donations.reduce((sum, donation) => sum + donation.amount, 0);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getDonorTypeBadge = (type) => {
    const typeStyles = {
      alumni: 'bg-blue-100 text-blue-800',
      corporate: 'bg-purple-100 text-purple-800',
      external: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeStyles[type]}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressPercentage = (raised, target) => {
    return Math.min((raised / target) * 100, 100);
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
              <DollarSign className="w-6 h-6 mr-3 text-purple-600" />
              Department Donations
            </h1>
            <p className="text-gray-600 mt-1">
              Manage donations and campaigns for {getDepartmentName()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
          <button
            onClick={() => setActiveTab('donations')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'donations'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Donations
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'campaigns'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Campaigns
          </button>
        </div>

        {/* Search and Filter for Donations */}
        {activeTab === 'donations' && (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search donations..."
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
              <option value="all">All Donors</option>
              <option value="alumni">Alumni</option>
              <option value="corporate">Corporate</option>
              <option value="external">External</option>
            </select>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Donations</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(getTotalDonations())}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Donors</p>
              <p className="text-xl font-bold text-blue-600">{donations.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-xl font-bold text-purple-600">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Avg Donation</p>
              <p className="text-xl font-bold text-orange-600">
                {formatCurrency(donations.length > 0 ? getTotalDonations() / donations.length : 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'donations' ? (
        /* Donations List */
        <div className="grid grid-cols-1 gap-4">
          {filteredDonations.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
              <p className="text-gray-600">No donations match your current filters.</p>
            </div>
          ) : (
            filteredDonations.map((donation) => (
              <div key={donation.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}
                        </h3>
                        <p className="text-purple-600 font-medium text-xl">{formatCurrency(donation.amount)}</p>
                        <p className="text-gray-600 text-sm">{donation.purpose}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {getStatusBadge(donation.paymentStatus)}
                        {getDonorTypeBadge(donation.donorType)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Campaign:</span>
                        <p className="font-medium">{donation.campaign}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <p className="font-medium">{formatDate(donation.donationDate)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment Method:</span>
                        <p className="font-medium">{donation.paymentMethod}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Receipt:</span>
                        <p className="font-medium">{donation.receiptNumber}</p>
                      </div>
                    </div>

                    {donation.message && (
                      <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400">
                        <p className="text-sm text-blue-700 italic">"{donation.message}"</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        {donation.taxExemptionClaimed && (
                          <span className="flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                            Tax Exemption
                          </span>
                        )}
                        {donation.recurringDonation && (
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1 text-blue-500" />
                            Recurring ({donation.recurringFrequency})
                          </span>
                        )}
                        {donation.graduationYear && (
                          <span>Class of {donation.graduationYear}</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => setSelectedDonation(donation)}
                        className="flex items-center px-3 py-1 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Campaigns List */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{campaign.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(campaign.raisedAmount)} / {formatCurrency(campaign.targetAmount)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${getProgressPercentage(campaign.raisedAmount, campaign.targetAmount)}%`
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {getProgressPercentage(campaign.raisedAmount, campaign.targetAmount).toFixed(1)}% of goal reached
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Donors:</span>
                    <p className="font-medium">{campaign.donorCount}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">End Date:</span>
                    <p className="font-medium">{formatDate(campaign.endDate)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Created by: {campaign.createdBy}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center px-3 py-1 text-sm text-purple-600 hover:text-purple-700 transition-colors">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Donation Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Donation Details</h2>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {selectedDonation.isAnonymous ? 'Anonymous Donation' : selectedDonation.donorName}
                  </h3>
                  <p className="text-purple-600 font-bold text-2xl">{formatCurrency(selectedDonation.amount)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Purpose:</span>
                    <p className="font-medium">{selectedDonation.purpose}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Campaign:</span>
                    <p className="font-medium">{selectedDonation.campaign}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Date:</span>
                    <p className="font-medium">{formatDate(selectedDonation.donationDate)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Payment Method:</span>
                    <p className="font-medium">{selectedDonation.paymentMethod}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Receipt Number:</span>
                    <p className="font-medium">{selectedDonation.receiptNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Status:</span>
                    <p className="font-medium">{getStatusBadge(selectedDonation.paymentStatus)}</p>
                  </div>
                </div>

                {!selectedDonation.isAnonymous && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="font-medium">{selectedDonation.donorEmail}</p>
                    </div>
                    {selectedDonation.graduationYear && (
                      <div>
                        <span className="text-sm text-gray-500">Graduation Year:</span>
                        <p className="font-medium">{selectedDonation.graduationYear}</p>
                      </div>
                    )}
                  </div>
                )}

                {selectedDonation.message && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Donor Message</h4>
                    <p className="text-blue-800 italic">"{selectedDonation.message}"</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {selectedDonation.taxExemptionClaimed && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Tax Exemption Claimed
                    </span>
                  )}
                  {selectedDonation.recurringDonation && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Recurring Donation ({selectedDonation.recurringFrequency})
                    </span>
                  )}
                  {getDonorTypeBadge(selectedDonation.donorType)}
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t">
                <button
                  onClick={() => setSelectedDonation(null)}
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

export default DepartmentDonations;