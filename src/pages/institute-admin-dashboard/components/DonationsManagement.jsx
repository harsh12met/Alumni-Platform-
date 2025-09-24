import React, { useState, useEffect } from 'react';
import {
  Heart,
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Eye,
  Calendar,
  Award,
  Search,
  Filter
} from 'lucide-react';

const DonationsManagement = ({ instituteId }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('campaigns'); // 'campaigns' or 'donations'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - Replace with Firebase Firestore calls
  useEffect(() => {
    // TODO: Replace with actual Firebase queries
    // const fetchCampaigns = async () => {
    //   const campaignsRef = collection(db, 'donations');
    //   const q = query(campaignsRef, where('instituteId', '==', instituteId));
    //   const snapshot = await getDocs(q);
    //   const campaignsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   setCampaigns(campaignsData);
    // };

    const mockCampaigns = [
      {
        id: '1',
        title: 'New Library Construction',
        description: 'Help us build a state-of-the-art library facility for our students and faculty.',
        goal: 500000,
        raised: 275000,
        donorCount: 145,
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        category: 'infrastructure',
        instituteId: 'stanford_univ_001',
        isPublic: true,
        featuredImage: '/api/placeholder/400/200'
      },
      {
        id: '2',
        title: 'Student Scholarship Fund',
        description: 'Support deserving students with financial assistance for their education.',
        goal: 100000,
        raised: 85500,
        donorCount: 89,
        status: 'active',
        startDate: '2024-01-15',
        endDate: '2024-12-31',
        category: 'scholarships',
        instituteId: 'stanford_univ_001',
        isPublic: true,
        featuredImage: '/api/placeholder/400/200'
      },
      {
        id: '3',
        title: 'Research Equipment Fund',
        description: 'Purchase advanced laboratory equipment for cutting-edge research.',
        goal: 200000,
        raised: 120000,
        donorCount: 67,
        status: 'active',
        startDate: '2024-02-01',
        endDate: '2024-08-31',
        category: 'research',
        instituteId: 'stanford_univ_001',
        isPublic: false,
        featuredImage: '/api/placeholder/400/200'
      },
      {
        id: '4',
        title: 'Alumni Emergency Relief',
        description: 'Emergency fund to help alumni affected by natural disasters.',
        goal: 50000,
        raised: 52500,
        donorCount: 156,
        status: 'completed',
        startDate: '2023-12-01',
        endDate: '2024-01-31',
        category: 'emergency',
        instituteId: 'stanford_univ_001',
        isPublic: true,
        featuredImage: '/api/placeholder/400/200'
      }
    ];

    const mockDonations = [
      {
        id: '1',
        campaignId: '1',
        campaignTitle: 'New Library Construction',
        donorName: 'John Smith',
        donorEmail: 'john.smith@example.com',
        amount: 5000,
        date: '2024-01-20',
        isAnonymous: false,
        message: 'Happy to support education infrastructure!',
        paymentMethod: 'Credit Card',
        status: 'completed'
      },
      {
        id: '2',
        campaignId: '2',
        campaignTitle: 'Student Scholarship Fund',
        donorName: 'Anonymous Donor',
        donorEmail: 'anonymous@example.com',
        amount: 2500,
        date: '2024-01-18',
        isAnonymous: true,
        message: '',
        paymentMethod: 'Bank Transfer',
        status: 'completed'
      },
      {
        id: '3',
        campaignId: '1',
        campaignTitle: 'New Library Construction',
        donorName: 'Sarah Johnson',
        donorEmail: 'sarah.j@example.com',
        amount: 1000,
        date: '2024-01-17',
        isAnonymous: false,
        message: 'Education is the key to future success.',
        paymentMethod: 'PayPal',
        status: 'completed'
      },
      {
        id: '4',
        campaignId: '3',
        campaignTitle: 'Research Equipment Fund',
        donorName: 'Michael Brown',
        donorEmail: 'michael.brown@example.com',
        amount: 10000,
        date: '2024-01-15',
        isAnonymous: false,
        message: 'Supporting innovation in research.',
        paymentMethod: 'Wire Transfer',
        status: 'pending'
      }
    ];

    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setDonations(mockDonations);
      setLoading(false);
    }, 1000);
  }, [instituteId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'infrastructure':
        return 'bg-purple-100 text-purple-800';
      case 'scholarships':
        return 'bg-blue-100 text-blue-800';
      case 'research':
        return 'bg-green-100 text-green-800';
      case 'emergency':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  const totalGoal = campaigns.reduce((sum, campaign) => sum + campaign.goal, 0);
  const totalDonors = campaigns.reduce((sum, campaign) => sum + campaign.donorCount, 0);
  const completedCampaigns = campaigns.filter(c => c.status === 'completed').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Donations Management</h2>
          <p className="text-gray-600">
            Manage institute donation campaigns and track contributions
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Institute: </span>
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">{instituteId}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Raised</p>
              <p className="text-2xl font-bold text-gray-900">${totalRaised.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Goal</p>
              <p className="text-2xl font-bold text-gray-900">${totalGoal.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Donors</p>
              <p className="text-2xl font-bold text-gray-900">{totalDonors}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedCampaigns}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            ${totalRaised.toLocaleString()} raised of ${totalGoal.toLocaleString()} goal
          </span>
          <span className="text-sm font-medium text-gray-900">
            {totalGoal > 0 ? Math.round((totalRaised / totalGoal) * 100) : 0}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${totalGoal > 0 ? Math.min((totalRaised / totalGoal) * 100, 100) : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'campaigns'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Campaigns ({campaigns.length})
            </button>
            <button
              onClick={() => setActiveTab('donations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'donations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recent Donations ({donations.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              {/* Campaigns Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                </select>
              </div>

              {/* Campaigns Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 h-32 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-gray-400" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{campaign.description}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1 ml-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(campaign.category)}`}>
                            {campaign.category}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* Progress */}
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>${campaign.raised.toLocaleString()} raised</span>
                            <span>{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Goal: ${campaign.goal.toLocaleString()}</span>
                            <span>{campaign.donorCount} donors</span>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{campaign.startDate}</span>
                          </div>
                          <span>to</span>
                          <span>{campaign.endDate}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center space-x-2 text-xs">
                            <span className={campaign.isPublic ? 'text-green-600' : 'text-orange-600'}>
                              {campaign.isPublic ? 'Public' : 'Private'}
                            </span>
                          </div>
                          
                          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm">
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="space-y-6">
              {/* Donations Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Donor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campaign
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {donations.map((donation) => (
                      <tr key={donation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {donation.isAnonymous ? 'Anonymous' : donation.donorName}
                            </div>
                            {!donation.isAnonymous && (
                              <div className="text-sm text-gray-500">{donation.donorEmail}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{donation.campaignTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${donation.amount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {donation.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {donation.paymentMethod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            donation.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : donation.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {donation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Donation Messages */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Recent Donor Messages</h4>
                {donations
                  .filter(d => d.message && d.message.trim() !== '')
                  .slice(0, 3)
                  .map((donation) => (
                    <div key={donation.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Heart className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-blue-900">
                              {donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}
                            </span>
                            <span className="text-sm text-blue-600">
                              donated ${donation.amount.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-blue-800 text-sm">{donation.message}</p>
                          <p className="text-blue-600 text-xs mt-1">{donation.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {((activeTab === 'campaigns' && campaigns.length === 0) || 
        (activeTab === 'donations' && donations.length === 0)) && (
        <div className="text-center py-12">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeTab} found
          </h3>
          <p className="text-gray-500">
            {activeTab === 'campaigns' 
              ? 'Create your first donation campaign' 
              : 'No donations have been made yet'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default DonationsManagement;