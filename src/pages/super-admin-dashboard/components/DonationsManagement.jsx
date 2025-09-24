import React, { useState, useEffect } from 'react';
import { Search, Plus, Heart, DollarSign, TrendingUp, Users } from 'lucide-react';

const DonationsManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('campaigns');

  // Mock data - Replace with Firebase Firestore calls
  useEffect(() => {
    const mockCampaigns = [
      {
        id: '1',
        title: 'Student Scholarship Fund',
        description: 'Help deserving students pursue their education',
        targetAmount: 50000,
        raisedAmount: 32500,
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        donorCount: 45
      },
      {
        id: '2',
        title: 'Library Renovation',
        description: 'Modernize our library facilities',
        targetAmount: 100000,
        raisedAmount: 78000,
        status: 'active',
        startDate: '2024-01-15',
        endDate: '2024-12-31',
        donorCount: 62
      },
      {
        id: '3',
        title: 'Emergency Student Aid',
        description: 'Support students facing financial hardship',
        targetAmount: 25000,
        raisedAmount: 25000,
        status: 'completed',
        startDate: '2023-09-01',
        endDate: '2023-12-31',
        donorCount: 89
      }
    ];

    const mockDonations = [
      {
        id: '1',
        campaignId: '1',
        campaignTitle: 'Student Scholarship Fund',
        donorName: 'John Smith',
        donorEmail: 'john.smith@example.com',
        amount: 500,
        date: '2024-01-20',
        isAnonymous: false,
        paymentMethod: 'Credit Card'
      },
      {
        id: '2',
        campaignId: '1',
        campaignTitle: 'Student Scholarship Fund',
        donorName: 'Anonymous',
        donorEmail: 'anonymous@donor.com',
        amount: 1000,
        date: '2024-01-18',
        isAnonymous: true,
        paymentMethod: 'Bank Transfer'
      },
      {
        id: '3',
        campaignId: '2',
        campaignTitle: 'Library Renovation',
        donorName: 'Sarah Johnson',
        donorEmail: 'sarah.j@example.com',
        amount: 250,
        date: '2024-01-15',
        isAnonymous: false,
        paymentMethod: 'PayPal'
      }
    ];
    
    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setDonations(mockDonations);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDonations = donations.filter(donation =>
    donation.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.donorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      paused: 'bg-yellow-100 text-yellow-800',
      draft: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateProgress = (raised, target) => {
    return Math.round((raised / target) * 100);
  };

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Donations Management</h2>
          <p className="text-gray-600">Manage fundraising campaigns and track donations</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'campaigns'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Campaigns
            </button>
            <button
              onClick={() => setActiveTab('donations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'donations'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Donations
            </button>
          </nav>
        </div>

        {/* Search */}
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                    {getStatusBadge(campaign.status)}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">
                      {formatCurrency(campaign.raisedAmount)} / {formatCurrency(campaign.targetAmount)}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress(campaign.raisedAmount, campaign.targetAmount)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{calculateProgress(campaign.raisedAmount, campaign.targetAmount)}% raised</span>
                    <span>{campaign.donorCount} donors</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Ends: {new Date(campaign.endDate).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-2">
                      <Users className="w-3 h-3" />
                      <span>{campaign.donorCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Donations Tab */}
      {activeTab === 'donations' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}
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
                      <div className="text-sm font-medium text-green-600">
                        {formatCurrency(donation.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(donation.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.paymentMethod}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Raised</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(campaigns.reduce((sum, campaign) => sum + campaign.raisedAmount, 0))}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
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
              <p className="text-2xl font-bold text-gray-900">
                {donations.length}
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
              <p className="text-sm text-gray-600">Avg Donation</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  donations.length > 0 
                    ? donations.reduce((sum, donation) => sum + donation.amount, 0) / donations.length
                    : 0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationsManagement;