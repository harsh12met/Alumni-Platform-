import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import RoleDashboardHeader from '../../components/ui/RoleDashboardHeader';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import ProfileManagement from './components/ProfileManagement';
import StudyMaterials from './components/StudyMaterials';
import JobOpportunities from './components/JobOpportunities';
import EventNotifications from './components/EventNotifications';
import AlumniFacultyConnect from './components/AlumniFacultyConnect';
import DashboardStats from './components/DashboardStats';
import GradesResults from './components/GradesResults';
import AttendanceTracker from './components/AttendanceTracker';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const StudentDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const quickActions = [
    {
      id: 'materials',
      title: 'Access Study Materials',
      description: 'View notes, assignments, and resources',
      icon: 'BookOpen',
      color: 'bg-blue-500',
      action: () => setActiveSection('materials')
    },
    {
      id: 'opportunities',
      title: 'Browse Opportunities',
      description: 'Find internships and job openings',
      icon: 'Briefcase',
      color: 'bg-green-500',
      action: () => setActiveSection('opportunities')
    },
    {
      id: 'events',
      title: 'Upcoming Events',
      description: 'Workshops, seminars, and hackathons',
      icon: 'Calendar',
      color: 'bg-purple-500',
      action: () => setActiveSection('events')
    },
    {
      id: 'connect',
      title: 'Connect with Alumni',
      description: 'Network and find mentors',
      icon: 'Users',
      color: 'bg-orange-500',
      action: () => setActiveSection('connect')
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileManagement />;
      case 'materials':
        return <StudyMaterials />;
      case 'opportunities':
        return <JobOpportunities />;
      case 'events':
        return <EventNotifications />;
      case 'connect':
        return <AlumniFacultyConnect />;
      case 'grades':
        return <GradesResults />;
      case 'attendance':
        return <AttendanceTracker />;
      default:
        return (
          <div className="space-y-6">
            {/* Dashboard Stats */}
            <DashboardStats />

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center space-x-2">
                <Icon name="Zap" size={20} />
                <span>Quick Actions</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="bg-muted/30 hover:bg-muted/50 rounded-lg p-4 text-left transition-colors group"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                      <Icon name={action.icon} size={24} className="text-white" />
                    </div>
                    <h3 className="font-medium text-card-foreground mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity & Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Materials */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-card-foreground flex items-center space-x-2">
                    <Icon name="BookOpen" size={18} />
                    <span>Recent Study Materials</span>
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveSection('materials')}
                    className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Data Structures - Lecture Notes', subject: 'CS301', date: '2 days ago', type: 'PDF' },
                    { title: 'Database Design Assignment', subject: 'CS402', date: '3 days ago', type: 'DOC' },
                    { title: 'Machine Learning Slides', subject: 'CS501', date: '1 week ago', type: 'PPT' }
                  ].map((material, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon name="FileText" size={16} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-card-foreground text-sm truncate">{material.title}</h4>
                        <p className="text-xs text-muted-foreground">{material.subject} • {material.date}</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{material.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-card-foreground flex items-center space-x-2">
                    <Icon name="Calendar" size={18} />
                    <span>Upcoming Events</span>
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveSection('events')}
                    className="bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'AI/ML Workshop', date: 'Sep 25, 2025', time: '2:00 PM', type: 'Workshop' },
                    { title: 'Tech Hackathon 2025', date: 'Oct 1-3, 2025', time: '48 hours', type: 'Hackathon' },
                    { title: 'Career Guidance Seminar', date: 'Oct 5, 2025', time: '10:00 AM', type: 'Seminar' }
                  ].map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Icon name="Calendar" size={16} className="text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-card-foreground text-sm truncate">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{event.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Dashboard', icon: 'Home' },
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'materials', label: 'Study Materials', icon: 'BookOpen' },
    { id: 'opportunities', label: 'Opportunities', icon: 'Briefcase' },
    { id: 'events', label: 'Events', icon: 'Calendar' },
    { id: 'connect', label: 'Connect', icon: 'Users' },
    { id: 'grades', label: 'Grades', icon: 'FileText' },
    { id: 'attendance', label: 'Attendance', icon: 'Clock' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <RoleDashboardHeader 
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
      />
      <main className={`pt-16 pb-20 lg:pb-8 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-52'
      }`}>
        <div className="p-4 space-y-4 max-w-7xl mx-auto overflow-hidden">
          {/* Welcome Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-foreground">Welcome back, Alex!</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Here's your academic dashboard with all the tools you need.
              </p>
            </div>
            
            {/* Quick Navigation */}
            <div className="flex flex-wrap gap-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSection(item.id)}
                  iconName={item.icon}
                  iconPosition="left"
                  className={activeSection === item.id 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                  }
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;