import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  DollarSign, 
  Calendar, 
  Users,
  TrendingUp,
  Search,
  Filter,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const CampaignsManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, completed, draft
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    startDate: '',
    endDate: '',
    category: 'general',
    isPublic: true,
    minimumDonation: '',
    targetAudience: 'all'
  });

  // Mock data - Replace with Firestore integration
  const mockCampaigns = [
    {
      id: '1',
      title: 'New Computer Lab Equipment',
      description: 'Fundraising campaign to upgrade computer lab with latest technology and software for computer science students.',
      goal: 500000,
      raised: 342000,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'active',
      category: 'infrastructure',
      isPublic: true,
      minimumDonation: 1000,
      targetAudience: 'all',
      donorsCount: 156,
      createdAt: '2023-12-15T10:30:00Z',
      organizer: 'Institute Admin',
      recentDonations: [
        { donor: 'Rajesh Kumar', amount: 25000, date: '2024-01-20' },
        { donor: 'Anonymous', amount: 10000, date: '2024-01-19' },
        { donor: 'Priya Sharma', amount: 15000, date: '2024-01-18' }
      ]
    },
    {
      id: '2',
      title: 'Student Scholarship Fund',
      description: 'Supporting deserving students from economically disadvantaged backgrounds with scholarships for their education.',
      goal: 1000000,
      raised: 750000,
      startDate: '2023-08-01',
      endDate: '2024-07-31',
      status: 'active',
      category: 'scholarship',
      isPublic: true,
      minimumDonation: 5000,
      targetAudience: 'alumni',
      donorsCount: 289,
      createdAt: '2023-07-15T14:20:00Z',
      organizer: 'Alumni Relations',
      recentDonations: [
        { donor: 'Amit Patel', amount: 50000, date: '2024-01-15' },
        { donor: 'Sunita Verma', amount: 30000, date: '2024-01-12' }
      ]
    },
    {
      id: '3',
      title: 'Research Innovation Grant',
      description: 'Funding innovative research projects by faculty and students in emerging technologies.',
      goal: 800000,
      raised: 800000,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: 'completed',
      category: 'research',
      isPublic: true,
      minimumDonation: 2000,
      targetAudience: 'all',
      donorsCount: 198,
      createdAt: '2022-12-01T09:15:00Z',
      organizer: 'Research Department',
      recentDonations: []
    },
    {
      id: '4',
      title: 'Library Expansion Project',
      description: 'Expanding the central library with new reading spaces, digital resources, and modern facilities.',
      goal: 300000,
      raised: 45000,
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      status: 'draft',
      category: 'infrastructure',
      isPublic: false,
      minimumDonation: 500,
      targetAudience: 'faculty',
      donorsCount: 12,
      createdAt: '2024-01-25T16:45:00Z',
      organizer: 'Institute Admin',
      recentDonations: []
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesFilter = filter === 'all' || campaign.status === filter;
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newCampaign = {
      id: Date.now().toString(),
      ...formData,
      goal: parseInt(formData.goal),
      minimumDonation: parseInt(formData.minimumDonation),
      raised: 0,
      status: 'draft',
      donorsCount: 0,
      createdAt: new Date().toISOString(),
      organizer: 'Institute Admin',
      recentDonations: []
    };

    if (selectedCampaign) {
      // Update existing campaign
      setCampaigns(campaigns.map(campaign => 
        campaign.id === selectedCampaign.id ? { ...campaign, ...formData } : campaign
      ));
    } else {
      // Create new campaign
      setCampaigns([newCampaign, ...campaigns]);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      goal: '',
      startDate: '',
      endDate: '',
      category: 'general',
      isPublic: true,
      minimumDonation: '',
      targetAudience: 'all'
    });
    setShowCreateModal(false);
    setSelectedCampaign(null);

    // TODO: Add Firestore integration
    console.log('Campaign saved:', newCampaign);
  };

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      title: campaign.title,
      description: campaign.description,
      goal: campaign.goal.toString(),
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      category: campaign.category,
      isPublic: campaign.isPublic,
      minimumDonation: campaign.minimumDonation.toString(),
      targetAudience: campaign.targetAudience
    });
    setShowCreateModal(true);
  };

  const handleDelete = async (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
      // TODO: Add Firestore delete logic
      console.log('Deleting campaign:', campaignId);
    }
  };

  const handleStatusChange = async (campaignId, newStatus) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId ? { ...campaign, status: newStatus } : campaign
    ));
    // TODO: Add Firestore update logic
    console.log('Changing status:', campaignId, newStatus);
  };

  const getStatusColor = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      draft: 'bg-yellow-100 text-yellow-800',
      paused: 'bg-orange-100 text-orange-800'
    };
    return statusStyles[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      infrastructure: 'text-blue-600',
      scholarship: 'text-green-600',
      research: 'text-purple-600',
      general: 'text-gray-600',
      emergency: 'text-red-600'
    };
    return categoryColors[category] || 'text-gray-600';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getTotalRaised = () => {
    return campaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  };

  const getTotalGoal = () => {
    return campaigns.reduce((sum, campaign) => sum + campaign.goal, 0);
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
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Fundraising Campaigns
            </h1>
            <p className="text-gray-600 mt-1">
              Manage fundraising campaigns and track contributions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search campaigns by title, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Campaigns</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Campaigns</p>
              <p className="text-xl font-bold text-gray-900">{campaigns.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Raised</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(getTotalRaised())}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
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
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Contributors</p>
              <p className="text-xl font-bold text-orange-600">
                {campaigns.reduce((sum, c) => sum + c.donorsCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-4">No campaigns match your current filters.</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Campaign
            </button>
          </div>
        ) : (
          filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>
                  <p className={`text-sm font-medium ${getCategoryColor(campaign.category)} mb-2`}>
                    {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">
                    {Math.round(getProgressPercentage(campaign.raised, campaign.goal))}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${getProgressPercentage(campaign.raised, campaign.goal)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Raised: {formatCurrency(campaign.raised)}</span>
                  <span>Goal: {formatCurrency(campaign.goal)}</span>
                </div>
              </div>

              {/* Campaign Info */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{campaign.donorsCount} contributors</span>
                </div>
              </div>

              {/* Recent Donations */}
              {campaign.recentDonations && campaign.recentDonations.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recent Donations:</p>
                  <div className="space-y-1">
                    {campaign.recentDonations.slice(0, 2).map((donation, index) => (
                      <div key={index} className="flex justify-between text-xs text-gray-600">
                        <span>{donation.donor}</span>
                        <span>{formatCurrency(donation.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {campaign.isPublic ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Public</span>
                  ) : (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Private</span>
                  )}
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    Min: {formatCurrency(campaign.minimumDonation)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedCampaign(campaign);
                      setShowDetailsModal(true);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(campaign)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(campaign.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {campaign.status === 'draft' && (
                    <button
                      onClick={() => handleStatusChange(campaign.id, 'active')}
                      className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                    >
                      Activate
                    </button>
                  )}
                  {campaign.status === 'active' && (
                    <button
                      onClick={() => handleStatusChange(campaign.id, 'paused')}
                      className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                    >
                      Pause
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {selectedCampaign ? 'Edit Campaign' : 'Create New Campaign'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fundraising Goal (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.goal}
                      onChange={(e) => setFormData({...formData, goal: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Donation (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.minimumDonation}
                      onChange={(e) => setFormData({...formData, minimumDonation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="general">General</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="scholarship">Scholarship</option>
                      <option value="research">Research</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Audience *
                    </label>
                    <select
                      required
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All</option>
                      <option value="alumni">Alumni Only</option>
                      <option value="faculty">Faculty Only</option>
                      <option value="students">Students Only</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                    Make this campaign public
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setSelectedCampaign(null);
                      setFormData({
                        title: '',
                        description: '',
                        goal: '',
                        startDate: '',
                        endDate: '',
                        category: 'general',
                        isPublic: true,
                        minimumDonation: '',
                        targetAudience: 'all'
                      });
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {selectedCampaign ? 'Update Campaign' : 'Create Campaign'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Details Modal */}
      {showDetailsModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Campaign Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{selectedCampaign.title}</h3>
                  <p className="text-gray-600">{selectedCampaign.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status</span>
                    <p className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedCampaign.status)}`}>
                      {selectedCampaign.status}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Category</span>
                    <p className="font-medium">{selectedCampaign.category}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Progress</span>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{formatCurrency(selectedCampaign.raised)} raised</span>
                      <span>{Math.round(getProgressPercentage(selectedCampaign.raised, selectedCampaign.goal))}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${getProgressPercentage(selectedCampaign.raised, selectedCampaign.goal)}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Goal: {formatCurrency(selectedCampaign.goal)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <p className="font-medium">{formatDate(selectedCampaign.startDate)} - {formatDate(selectedCampaign.endDate)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Contributors:</span>
                    <p className="font-medium">{selectedCampaign.donorsCount}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Minimum Donation:</span>
                    <p className="font-medium">{formatCurrency(selectedCampaign.minimumDonation)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Target Audience:</span>
                    <p className="font-medium">{selectedCampaign.targetAudience}</p>
                  </div>
                </div>

                {selectedCampaign.recentDonations && selectedCampaign.recentDonations.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Recent Donations</span>
                    <div className="mt-2 space-y-2">
                      {selectedCampaign.recentDonations.map((donation, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">{donation.donor}</span>
                          <span className="text-sm text-green-600 font-semibold">
                            {formatCurrency(donation.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowDetailsModal(false)}
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

export default CampaignsManagement;