import React, { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, Share2, PlusCircle, Users, Calendar } from 'lucide-react';

const AlumniNetworkingSection = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'John Smith',
      authorBatch: '2019',
      authorCompany: 'Microsoft',
      title: 'Software Engineering Career Advice',
      content: 'Hey everyone! I wanted to share some insights about transitioning from college to a tech career. The most important thing I learned is...',
      timestamp: '2 hours ago',
      likes: 15,
      comments: [
        {
          id: 1,
          author: 'Jane Doe',
          content: 'Thanks for sharing! This is really helpful.',
          timestamp: '1 hour ago'
        }
      ],
      liked: false
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      authorBatch: '2020',
      authorCompany: 'Goldman Sachs',
      title: 'Finance Industry Networking Event',
      content: 'Organizing a virtual networking event for alumni in finance. Who would be interested in joining? We can discuss market trends and career opportunities.',
      timestamp: '5 hours ago',
      likes: 23,
      comments: [],
      liked: true
    }
  ]);

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    // TODO: Fetch networking posts from Firestore
    // const fetchPosts = async () => {
    //   try {
    //     const querySnapshot = await getDocs(
    //       query(collection(db, "networking_posts"), orderBy("timestamp", "desc"))
    //     );
    //     const postsData = [];
    //     querySnapshot.forEach((doc) => {
    //       postsData.push({ id: doc.id, ...doc.data() });
    //     });
    //     setPosts(postsData);
    //   } catch (error) {
    //     console.error("Error fetching posts:", error);
    //   }
    // };
    // fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post = {
      id: Date.now(),
      author: 'Current User', // TODO: Get from auth context
      authorBatch: '2021',
      authorCompany: 'Your Company',
      title: newPost.title,
      content: newPost.content,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      liked: false
    };

    try {
      // TODO: Add post to Firestore
      // await addDoc(collection(db, "networking_posts"), post);
      setPosts(prev => [post, ...prev]);
      setNewPost({ title: '', content: '' });
      setShowCreatePost(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));

    // TODO: Update like status in Firestore
  };

  const handleComment = async (postId, comment) => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      author: 'Current User', // TODO: Get from auth context
      content: comment,
      timestamp: 'Just now'
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));

    // TODO: Add comment to Firestore
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Networking</h1>
        <p className="text-gray-600">Connect, share experiences, and collaborate with fellow alumni</p>
      </div>

      {/* Create Post Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowCreatePost(true)}
          className="w-full bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center"
        >
          <PlusCircle size={24} className="mr-3" />
          Share something with the community...
        </button>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <h3 className="text-xl font-bold mb-4">Create New Post</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What's your post about?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts, experiences, or ask questions..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreatePost(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
          />
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600">Be the first to share something with the community!</p>
        </div>
      )}
    </div>
  );
};

const PostCard = ({ post, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(post.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">
            {post.author.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{post.author}</h4>
          <p className="text-sm text-gray-500">
            {post.authorCompany} • Batch {post.authorBatch} • {post.timestamp}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Actions */}
      <div className="flex items-center space-x-6 py-3 border-t border-gray-200">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center space-x-2 ${
            post.liked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <ThumbsUp size={18} className={post.liked ? 'fill-current' : ''} />
          <span>{post.likes}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-600"
        >
          <MessageCircle size={18} />
          <span>{post.comments.length}</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {/* Existing Comments */}
          <div className="space-y-3 mb-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-semibold">
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium text-sm text-gray-900">{comment.author}</p>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <form onSubmit={handleSubmitComment} className="flex space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">YU</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AlumniNetworkingSection;