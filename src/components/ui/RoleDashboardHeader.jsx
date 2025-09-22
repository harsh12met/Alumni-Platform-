import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Logo from './Logo';
import Avatar from './Avatar';

const RoleDashboardHeader = ({ isCollapsed = false, onToggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const getRoleFromPath = () => {
    const path = location?.pathname;
    if (path?.includes('alumni-dashboard')) return 'Alumni';
    if (path?.includes('faculty-dashboard')) return 'Faculty';
    if (path?.includes('recruiter-dashboard')) return 'Recruiter';
    if (path?.includes('institute-admin-dashboard')) return 'Institute Admin';
    if (path?.includes('student-dashboard')) return 'Student';
    if (path?.includes('super-admin-dashboard')) return 'Super Admin';
    return 'Dashboard';
  };

  const currentRole = getRoleFromPath();

  const navigationItems = [
    { label: 'Student', path: '/student-dashboard', icon: 'Users' },
    { label: 'Alumni', path: '/alumni-dashboard', icon: 'GraduationCap' },
    { label: 'Faculty', path: '/faculty-dashboard', icon: 'BookOpen' },
    { label: 'Recruiters', path: '/recruiter-dashboard', icon: 'Users' },
    { label: 'Institute', path: '/institute-admin-dashboard', icon: 'Building2' },
    { label: 'Super Admin', path: '/super-admin-dashboard', icon: 'Shield' },
  ];

  const notifications = [
    {
      id: 1,
      title: 'New Connection Request',
      message: 'John Doe wants to connect with you',
      time: '2 minutes ago',
      type: 'connection',
      unread: true
    },
    {
      id: 2,
      title: 'Application Update',
      message: 'Your application status has been updated',
      time: '1 hour ago',
      type: 'application',
      unread: true
    },
    {
      id: 3,
      title: 'Event Reminder',
      message: 'Career fair starts tomorrow at 9 AM',
      time: '3 hours ago',
      type: 'event',
      unread: false
    }
  ];

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef?.current && !profileRef?.current?.contains(event?.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'connection': return 'UserPlus';
      case 'application': return 'FileText';
      case 'event': return 'Calendar';
      default: return 'Bell';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-1000 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">EduConnect</h1>
              <p className="text-xs text-gray-500">Connecting Students, Alumni, Faculty, Recruiters, and Institutes</p>
            </div>
          </div>
        </div>

        {/* Center Section - Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigate(item?.path)}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
                location?.pathname === item?.path
                  ? 'text-gray-900 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-4">
          {/* Role Badge */}
          <div className="hidden sm:flex items-center px-3 py-1 bg-blue-600 text-white rounded-md">
            <span className="text-sm font-medium">{currentRole}</span>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-1001">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                        notification?.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <Icon name={getNotificationIcon(notification?.type)} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {notification?.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {notification?.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification?.time}
                          </p>
                        </div>
                        {notification?.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <Button variant="ghost" size="sm" fullWidth className="text-blue-600 hover:bg-blue-50">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-900">John Doe</span>
              <Icon name="ChevronDown" size={16} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-1001">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-600">john.doe@example.com</p>
                  <p className="text-xs text-gray-500 mt-1">{currentRole}</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-gray-700">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-gray-700">
                    <Icon name="Settings" size={16} />
                    <span>Account Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-gray-700">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className="border-t border-gray-200 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigate(item?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left ${
                  location?.pathname === item?.path
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span className="text-sm font-medium">{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default RoleDashboardHeader;