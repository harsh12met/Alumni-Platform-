import React, { useState, useEffect } from 'react';
import { Trophy, Plus, Eye, Edit3, Trash2, CheckCircle, XCircle, Calendar, User } from 'lucide-react';

const AlumniSuccessStoriesSection = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: 'From Student to Tech Entrepreneur',
      content: 'Started my first company right after graduation and now we\'re a team of 50+ employees serving clients worldwide.',
      author: 'John Smith',
      authorBatch: '2019',
      submissionDate: '2024-03-10',
      status: 'approved',
      views: 245,
      category: 'entrepreneurship'
    },
    {
      id: 2,
      title: 'Breaking Barriers in AI Research',
      content: 'My research on machine learning algorithms has been published in top-tier journals and is now being used by major tech companies.',
      author: 'Sarah Johnson',
      authorBatch: '2020',
      submissionDate: '2024-02-15',
      status: 'pending',
      views: 0,
      category: 'research'
    }
  ]);

  const [showCreateStory, setShowCreateStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
    category: '',
    achievements: '',
    images: []
  });

  const categories = [
    'entrepreneurship',
    'research',
    'career-growth',
    'social-impact',
    'innovation',
    'leadership',
    'academic',
    'other'
  ];

  useEffect(() => {
    // TODO: Fetch success stories from Firestore
    // const fetchStories = async () => {
    //   try {
    //     const q = query(
    //       collection(db, "success_stories"),
    //       where("authorId", "==", currentUserId),
    //       orderBy("submissionDate", "desc")
    //     );
    //     const querySnapshot = await getDocs(q);
    //     const storiesData = [];
    //     querySnapshot.forEach((doc) => {
    //       storiesData.push({ id: doc.id, ...doc.data() });
    //     });
    //     setStories(storiesData);
    //   } catch (error) {
    //     console.error("Error fetching stories:", error);
    //   }
    // };
    // fetchStories();
  }, []);

  const handleSubmitStory = async () => {
    if (!newStory.title.trim() || !newStory.content.trim() || !newStory.category) return;

    try {
      const story = {
        id: Date.now(),
        title: newStory.title,
        content: newStory.content,
        category: newStory.category,
        achievements: newStory.achievements,
        author: 'Current User', // TODO: Get from auth context
        authorBatch: '2021',
        submissionDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        views: 0
      };

      // TODO: Add story to Firestore
      // await addDoc(collection(db, "success_stories"), story);
      
      setStories(prev => [story, ...prev]);
      setNewStory({
        title: '',
        content: '',
        category: '',
        achievements: '',
        images: []
      });
      setShowCreateStory(false);
      
      alert('Your success story has been submitted for review!');
    } catch (error) {
      console.error('Error submitting story:', error);
      alert('Failed to submit story. Please try again.');
    }
  };

  const handleDeleteStory = async (storyId) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;

    try {
      // TODO: Delete story from Firestore
      // await deleteDoc(doc(db, "success_stories", storyId));
      
      setStories(prev => prev.filter(story => story.id !== storyId));
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Calendar size={12} className="mr-1" />
            Pending Review
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      entrepreneurship: 'bg-blue-100 text-blue-800',
      research: 'bg-purple-100 text-purple-800',
      'career-growth': 'bg-green-100 text-green-800',
      'social-impact': 'bg-pink-100 text-pink-800',
      innovation: 'bg-orange-100 text-orange-800',
      leadership: 'bg-indigo-100 text-indigo-800',
      academic: 'bg-teal-100 text-teal-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  const formatCategoryName = (category) => {
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Success Stories</h1>
            <p className="text-gray-600">Share your achievements and inspire others</p>
          </div>
          <button
            onClick={() => setShowCreateStory(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Share Your Story
          </button>
        </div>
      </div>

      {/* Stories List */}
      <div className="space-y-6">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Trophy size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{story.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User size={14} />
                      <span>{story.author} • Batch {story.authorBatch}</span>
                      <span>•</span>
                      <span>{new Date(story.submissionDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(story.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(story.category)}`}>
                  {formatCategoryName(story.category)}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 line-clamp-3">{story.content}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  <span>{story.views} views</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedStory(story)}
                  className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Eye size={14} className="mr-1" />
                  View
                </button>
                <button className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <Edit3 size={14} className="mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStory(story.id)}
                  className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={14} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {stories.length === 0 && (
        <div className="text-center py-12">
          <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No success stories yet</h3>
          <p className="text-gray-600 mb-4">Share your achievements and inspire the community</p>
          <button
            onClick={() => setShowCreateStory(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Share Your First Story
          </button>
        </div>
      )}

      {/* Create Story Modal */}
      {showCreateStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Share Your Success Story</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newStory.title}
                  onChange={(e) => setNewStory(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your story a compelling title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newStory.category}
                  onChange={(e) => setNewStory(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {formatCategoryName(category)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Story</label>
                <textarea
                  value={newStory.content}
                  onChange={(e) => setNewStory(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Tell us about your journey, challenges overcome, and achievements..."
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements (Optional)</label>
                <textarea
                  value={newStory.achievements}
                  onChange={(e) => setNewStory(prev => ({ ...prev, achievements: e.target.value }))}
                  placeholder="List your key achievements, awards, recognitions..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your story will be reviewed by our team before being published on the public page. 
                  This helps ensure quality and appropriateness of content.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateStory(false);
                  setNewStory({
                    title: '',
                    content: '',
                    category: '',
                    achievements: '',
                    images: []
                  });
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitStory}
                disabled={!newStory.title.trim() || !newStory.content.trim() || !newStory.category}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedStory.title}</h2>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User size={14} />
                    <span>{selectedStory.author} • Batch {selectedStory.authorBatch}</span>
                  </div>
                  {getStatusBadge(selectedStory.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedStory.category)}`}>
                    {formatCategoryName(selectedStory.category)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedStory(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Story</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedStory.content}</p>
              </div>

              {selectedStory.achievements && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Achievements</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedStory.achievements}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <span>Submitted on {new Date(selectedStory.submissionDate).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedStory.views} views</span>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
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

export default AlumniSuccessStoriesSection;