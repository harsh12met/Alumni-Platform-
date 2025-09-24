import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Clock, MessageCircle, Star } from 'lucide-react';

const AlumniMentorshipSection = () => {
  const [mentorshipRequests, setMentorshipRequests] = useState([
    {
      id: 1,
      studentName: 'Alex Chen',
      studentBatch: '2024',
      studentDegree: 'Computer Science',
      requestDate: '2024-03-15',
      status: 'pending',
      message: 'Hi! I\'m interested in transitioning to a software engineering role and would love your guidance on building the right skills.',
      areas: ['Software Development', 'Career Planning', 'Technical Skills']
    },
    {
      id: 2,
      studentName: 'Maria Rodriguez',
      studentBatch: '2023',
      studentDegree: 'Business Administration',
      requestDate: '2024-03-10',
      status: 'accepted',
      message: 'I\'m looking for mentorship on entrepreneurship and starting my own business.',
      areas: ['Entrepreneurship', 'Business Strategy', 'Leadership']
    }
  ]);

  const [activeMentorships, setActiveMentorships] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      studentBatch: '2023',
      startDate: '2024-02-01',
      nextMeeting: '2024-03-20',
      progress: 75,
      areas: ['Software Development', 'Career Planning']
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('requests');

  useEffect(() => {
    // TODO: Fetch mentorship requests from Firestore
    // const fetchMentorshipRequests = async () => {
    //   try {
    //     const q = query(
    //       collection(db, "mentorship_requests"),
    //       where("mentorId", "==", currentUserId),
    //       orderBy("requestDate", "desc")
    //     );
    //     const querySnapshot = await getDocs(q);
    //     const requests = [];
    //     querySnapshot.forEach((doc) => {
    //       requests.push({ id: doc.id, ...doc.data() });
    //     });
    //     setMentorshipRequests(requests);
    //   } catch (error) {
    //     console.error("Error fetching mentorship requests:", error);
    //   }
    // };
    // fetchMentorshipRequests();
  }, []);

  const handleRequestResponse = async (requestId, action) => {
    try {
      // TODO: Update request status in Firestore
      setMentorshipRequests(prev => 
        prev.map(request => 
          request.id === requestId 
            ? { ...request, status: action }
            : request
        )
      );

      if (action === 'accepted') {
        // Add to active mentorships
        const request = mentorshipRequests.find(r => r.id === requestId);
        const newMentorship = {
          id: requestId,
          studentName: request.studentName,
          studentBatch: request.studentBatch,
          startDate: new Date().toISOString().split('T')[0],
          nextMeeting: null,
          progress: 0,
          areas: request.areas
        };
        setActiveMentorships(prev => [...prev, newMentorship]);
      }

      console.log(`Mentorship request ${action}:`, requestId);
    } catch (error) {
      console.error('Error updating mentorship request:', error);
    }
  };

  const handleScheduleMeeting = (mentorshipId) => {
    // TODO: Implement meeting scheduling
    console.log('Scheduling meeting for mentorship:', mentorshipId);
  };

  const handleUpdateProgress = (mentorshipId, newProgress) => {
    setActiveMentorships(prev =>
      prev.map(mentorship =>
        mentorship.id === mentorshipId
          ? { ...mentorship, progress: newProgress }
          : mentorship
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentorship</h1>
        <p className="text-gray-600">Guide the next generation and share your expertise</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab('requests')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Requests ({mentorshipRequests.filter(r => r.status === 'pending').length})
            </button>
            <button
              onClick={() => setSelectedTab('active')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'active'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Active Mentorships ({activeMentorships.length})
            </button>
            <button
              onClick={() => setSelectedTab('history')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              History
            </button>
          </nav>
        </div>
      </div>

      {/* Pending Requests Tab */}
      {selectedTab === 'requests' && (
        <div className="space-y-6">
          {mentorshipRequests.filter(request => request.status === 'pending').map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {request.studentName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{request.studentName}</h3>
                      <p className="text-gray-600">{request.studentDegree} - Batch {request.studentBatch}</p>
                      <p className="text-sm text-gray-500">Requested on {new Date(request.requestDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Mentorship Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {request.areas.map((area, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Message:</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{request.message}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleRequestResponse(request.id, 'accepted')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Accept
                </button>
                <button
                  onClick={() => handleRequestResponse(request.id, 'rejected')}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <XCircle size={16} className="mr-2" />
                  Decline
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <MessageCircle size={16} className="mr-2" />
                  Message
                </button>
              </div>
            </div>
          ))}

          {mentorshipRequests.filter(r => r.status === 'pending').length === 0 && (
            <div className="text-center py-12">
              <Clock size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
              <p className="text-gray-600">You'll see new mentorship requests here</p>
            </div>
          )}
        </div>
      )}

      {/* Active Mentorships Tab */}
      {selectedTab === 'active' && (
        <div className="space-y-6">
          {activeMentorships.map((mentorship) => (
            <div key={mentorship.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {mentorship.studentName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{mentorship.studentName}</h3>
                    <p className="text-gray-600">Batch {mentorship.studentBatch}</p>
                    <p className="text-sm text-gray-500">Started on {new Date(mentorship.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600">
                    <Star size={16} className="mr-1" />
                    <span className="font-medium">Active</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Mentorship Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentorship.areas.map((area, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Progress:</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${mentorship.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{mentorship.progress}% Complete</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleScheduleMeeting(mentorship.id)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Schedule Meeting
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <MessageCircle size={16} className="mr-2" />
                  Send Message
                </button>
                <select
                  value={mentorship.progress}
                  onChange={(e) => handleUpdateProgress(mentorship.id, parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={0}>0% - Getting Started</option>
                  <option value={25}>25% - Initial Planning</option>
                  <option value={50}>50% - Mid Progress</option>
                  <option value={75}>75% - Advanced</option>
                  <option value={100}>100% - Completed</option>
                </select>
              </div>
            </div>
          ))}

          {activeMentorships.length === 0 && (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active mentorships</h3>
              <p className="text-gray-600">Accept mentorship requests to start guiding students</p>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {selectedTab === 'history' && (
        <div className="text-center py-12">
          <Clock size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Mentorship History</h3>
          <p className="text-gray-600">Completed mentorships will appear here</p>
        </div>
      )}
    </div>
  );
};

export default AlumniMentorshipSection;