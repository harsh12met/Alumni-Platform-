import React, { useState, useEffect } from 'react';
import { Heart, CreditCard, History, Target, DollarSign, Calendar, Users } from 'lucide-react';

const AlumniDonationsSection = () => {
  const [donations, setDonations] = useState([
    {
      id: 1,
      campaignName: 'Scholarship Fund 2024',
      amount: 500,
      date: '2024-03-10',
      status: 'completed',
      paymentId: 'pay_123456789'
    },
    {
      id: 2,
      campaignName: 'Library Renovation',
      amount: 250,
      date: '2024-02-15',
      status: 'completed',
      paymentId: 'pay_987654321'
    }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: 'Emergency Student Aid Fund',
      description: 'Support students facing financial hardships due to unexpected circumstances.',
      target: 50000,
      raised: 32000,
      endDate: '2024-06-30',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Technology Infrastructure Upgrade',
      description: 'Help modernize campus technology to provide better learning experiences.',
      target: 100000,
      raised: 75000,
      endDate: '2024-08-15',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Sports Facility Enhancement',
      description: 'Upgrade sports facilities and equipment for student athletes.',
      target: 25000,
      raised: 18500,
      endDate: '2024-07-20',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop'
    }
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [totalDonated, setTotalDonated] = useState(750);

  useEffect(() => {
    // TODO: Fetch donation history from Firestore
    // const fetchDonations = async () => {
    //   try {
    //     const q = query(
    //       collection(db, "donations"),
    //       where("donorId", "==", currentUserId),
    //       orderBy("date", "desc")
    //     );
    //     const querySnapshot = await getDocs(q);
    //     const donationsData = [];
    //     querySnapshot.forEach((doc) => {
    //       donationsData.push({ id: doc.id, ...doc.data() });
    //     });
    //     setDonations(donationsData);
    //   } catch (error) {
    //     console.error("Error fetching donations:", error);
    //   }
    // };
    // fetchDonations();
  }, []);

  const handleDonate = async (campaignId, amount) => {
    try {
      // TODO: Integrate with Razorpay
      // const options = {
      //   key: process.env.REACT_APP_RAZORPAY_KEY,
      //   amount: amount * 100, // Razorpay expects amount in paise
      //   currency: 'INR',
      //   name: 'Alumni Portal',
      //   description: `Donation to ${selectedCampaign.title}`,
      //   handler: async function (response) {
      //     // Save donation to Firestore
      //     await addDoc(collection(db, "donations"), {
      //       campaignId,
      //       donorId: currentUserId,
      //       amount,
      //       paymentId: response.razorpay_payment_id,
      //       date: new Date(),
      //       status: 'completed'
      //     });
      //     
      //     // Update campaign raised amount
      //     const campaignRef = doc(db, "campaigns", campaignId);
      //     await updateDoc(campaignRef, {
      //       raised: increment(amount)
      //     });
      //   }
      // };
      // 
      // const rzp = new window.Razorpay(options);
      // rzp.open();

      // Simulate successful donation for demo
      const newDonation = {
        id: Date.now(),
        campaignName: selectedCampaign.title,
        amount: parseInt(amount),
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
        paymentId: `pay_${Date.now()}`
      };

      setDonations(prev => [newDonation, ...prev]);
      setTotalDonated(prev => prev + parseInt(amount));
      
      // Update campaign raised amount
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, raised: campaign.raised + parseInt(amount) }
          : campaign
      ));

      setShowDonationModal(false);
      setDonationAmount('');
      setSelectedCampaign(null);

      alert('Thank you for your donation!');
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('Failed to process donation. Please try again.');
    }
  };

  const openDonationModal = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDonationModal(true);
  };

  const getProgressPercentage = (raised, target) => {
    return Math.min((raised / target) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Donations</h1>
        <p className="text-gray-600">Support your alma mater and make a difference</p>
      </div>

      {/* Donation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Donated</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalDonated)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Heart size={24} className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Campaigns Supported</p>
              <p className="text-2xl font-bold text-gray-900">{donations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-2xl font-bold text-gray-900">2019</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Campaigns</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                <p className="text-gray-600 mb-4">{campaign.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(getProgressPercentage(campaign.raised, campaign.target))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${getProgressPercentage(campaign.raised, campaign.target)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Raised: {formatCurrency(campaign.raised)}</span>
                    <span>Goal: {formatCurrency(campaign.target)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">Ends: {new Date(campaign.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => openDonationModal(campaign)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Heart size={16} className="mr-2" />
                  Donate Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation History */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Donation History</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {donations.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {donations.map((donation) => (
                <div key={donation.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Heart size={20} className="text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{donation.campaignName}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(donation.date).toLocaleDateString()} • Payment ID: {donation.paymentId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(donation.amount)}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      donation.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <History size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No donations yet</h3>
              <p className="text-gray-600">Your donation history will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Donation Modal */}
      {showDonationModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Donate to {selectedCampaign.title}</h3>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-2">{selectedCampaign.description}</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Raised: {formatCurrency(selectedCampaign.raised)}</span>
                  <span>Goal: {formatCurrency(selectedCampaign.target)}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {[25, 50, 100].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDonationAmount(amount.toString())}
                  className="py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDonationModal(false);
                  setDonationAmount('');
                  setSelectedCampaign(null);
                }}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDonate(selectedCampaign.id, donationAmount)}
                disabled={!donationAmount || parseInt(donationAmount) <= 0}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <CreditCard size={16} className="mr-2" />
                Donate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniDonationsSection;