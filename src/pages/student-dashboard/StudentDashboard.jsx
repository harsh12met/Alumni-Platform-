import React, { useState } from 'react';
import StudentSidebar from '../../components/StudentSidebar';
import StudentTopbar from '../../components/StudentTopbar';
import DashboardOverviewSection from '../../components/sections/DashboardOverviewSection';
import ProfileSection from '../../components/sections/ProfileSection';
import AlumniDirectorySection from '../../components/sections/AlumniDirectorySection';
import MentorshipSection from '../../components/sections/MentorshipSection';
import JobsSection from '../../components/sections/JobsSection';
import EventsSection from '../../components/sections/EventsSection';
import ResourcesSection from '../../components/sections/ResourcesSection';
import NotificationsSection from '../../components/sections/NotificationsSection';
import AIChatAssistant from '../../components/ui/AIChatAssistant';

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverviewSection />;
      case 'profile':
        return <ProfileSection />;
      case 'alumni-directory':
        return <AlumniDirectorySection />;
      case 'mentorship':
        return <MentorshipSection />;
      case 'jobs':
        return <JobsSection />;
      case 'events':
        return <EventsSection />;
      case 'resources':
        return <ResourcesSection />;
      case 'notifications':
        return <NotificationsSection />;
      default:
        return <DashboardOverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <StudentSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      {/* Top Navigation Bar */}
      <StudentTopbar 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      {/* Main Content Area */}
      <main className={`transition-all duration-300 pt-16 pb-6 ${
        isCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="px-6 py-4">
          {renderActiveSection()}
        </div>
      </main>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
};

export default StudentDashboard;