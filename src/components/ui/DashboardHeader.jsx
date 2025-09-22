import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Logo from './Logo';
import Avatar from './Avatar';

const DashboardHeader = ({ user, onSidebarToggle, isSidebarCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  const handleProfileClick = () => {
    // Navigate to profile page based on current role
    navigate('/profile');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000 h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section - Logo and Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <Logo size="sm" className="hidden sm:flex" />
          <Logo variant="icon" size="sm" className="flex sm:hidden" />
          
          {/* Sidebar Toggle - Desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarToggle}
            className="hidden lg:flex"
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>

        {/* Center Section - Search (Optional) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
            />
          </div>
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Button - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Messages */}
          <Button
            variant="ghost"
            size="icon"
          >
            <Icon name="MessageSquare" size={20} />
          </Button>

          {/* User Menu */}
          <div className="flex items-center space-x-3 ml-4">
            <Avatar
              name={user?.name || 'User'}
              size="sm"
              className="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
              onClick={handleProfileClick}
            />
            
            {/* User Info - Hidden on small screens */}
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-card-foreground">
                {user?.name || 'User Name'}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.role || 'Role'}
              </p>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-red-600"
            >
              <Icon name="LogOut" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;