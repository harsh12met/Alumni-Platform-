import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  Loader2
} from 'lucide-react';

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Predefined responses for common queries
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to the Alumni Platform. I can help you with navigation, features, or answer questions about the platform.';
    }
    
    if (message.includes('help') || message.includes('support')) {
      return 'I\'m here to help! You can ask me about:\n• Platform features and navigation\n• Account management\n• Alumni connections\n• Job opportunities\n• Events and activities\n• Technical support';
    }
    
    if (message.includes('dashboard') || message.includes('navigate')) {
      return 'Here are the main dashboard sections:\n• Profile Management\n• Alumni Directory\n• Job Board\n• Events\n• Mentorship\n• Donations\n• Success Stories\n\nWhat would you like to explore?';
    }
    
    if (message.includes('job') || message.includes('career')) {
      return 'For job-related queries:\n• Browse the Jobs section for latest opportunities\n• Update your profile to attract recruiters\n• Connect with alumni in your field\n• Attend career networking events\n\nWould you like me to guide you to any specific section?';
    }
    
    if (message.includes('alumni') || message.includes('network')) {
      return 'To connect with alumni:\n• Visit the Alumni Directory\n• Filter by graduation year, industry, or location\n• Send connection requests\n• Join mentorship programs\n• Attend alumni events\n\nNeed help finding specific alumni?';
    }
    
    if (message.includes('event') || message.includes('meeting')) {
      return 'For events and meetings:\n• Check the Events section for upcoming activities\n• Register for events you\'re interested in\n• Create your own events (if you have permissions)\n• View past event recordings\n\nLooking for specific types of events?';
    }
    
    if (message.includes('profile') || message.includes('account')) {
      return 'To manage your profile:\n• Update personal information\n• Add your current job and skills\n• Upload a professional photo\n• Set privacy preferences\n• Manage notification settings\n\nNeed help with any specific profile section?';
    }
    
    if (message.includes('donation') || message.includes('contribute')) {
      return 'About donations and contributions:\n• Support scholarship funds\n• Contribute to department initiatives\n• Fund research projects\n• Help infrastructure development\n\nAll donations are secure and tax-exempt. Would you like to know more?';
    }
    
    if (message.includes('mentor') || message.includes('guidance')) {
      return 'For mentorship opportunities:\n• Find mentors in your field of interest\n• Offer mentorship to junior alumni\n• Join mentorship programs\n• Schedule guidance sessions\n\nAre you looking to be a mentor or find one?';
    }
    
    if (message.includes('technical') || message.includes('bug') || message.includes('error')) {
      return 'For technical issues:\n• Try refreshing the page\n• Clear your browser cache\n• Check your internet connection\n• Use supported browsers (Chrome, Firefox, Safari)\n\nIf the issue persists, please contact our technical support team.';
    }
    
    if (message.includes('contact') || message.includes('support team')) {
      return 'Contact Information:\n• Email: support@alumniplatform.edu\n• Phone: +91-9876543210\n• Office Hours: 9 AM - 6 PM (Mon-Fri)\n• Emergency Support: Available 24/7\n\nFor urgent issues, please call our support line.';
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return 'You\'re welcome! I\'m always here to help. Is there anything else you\'d like to know about the Alumni Platform?';
    }
    
    if (message.includes('bye') || message.includes('goodbye')) {
      return 'Goodbye! Feel free to reach out anytime you need assistance. Have a great day!';
    }
    
    // Default response for unrecognized queries
    return 'I understand you\'re asking about "' + userMessage + '". While I may not have a specific answer for that, I can help you with:\n\n• Platform navigation\n• Feature explanations\n• Account management\n• Technical support\n\nCould you please rephrase your question or ask about one of these topics?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        message: getBotResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: 'How do I update my profile?', action: () => setInputMessage('How do I update my profile?') },
    { text: 'Find alumni in my field', action: () => setInputMessage('Find alumni in my field') },
    { text: 'Browse job opportunities', action: () => setInputMessage('Browse job opportunities') },
    { text: 'Upcoming events', action: () => setInputMessage('Show me upcoming events') }
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
          title="AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        <div className="absolute -top-12 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
          Need help? Chat with AI
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Assistant</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              title={isMinimized ? 'Maximize' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.length === 1 && (
                <div className="space-y-2">
                  <div className="text-center text-gray-500 text-sm mb-4">
                    Quick actions to get started:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className="text-left p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-blue-700 transition-colors"
                      >
                        {action.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-xs">
                    <div className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                      <div className="flex items-center space-x-1">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">AI is typing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send • AI responses are generated automatically
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatAssistant;