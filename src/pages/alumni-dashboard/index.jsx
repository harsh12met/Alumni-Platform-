import React, { useState } from 'react';
import AlumniSidebar from './components/AlumniSidebar';
import AlumniTopbar from './components/AlumniTopbar';
import AlumniDashboardOverviewSection from './components/AlumniDashboardOverviewSection';
import AlumniProfileSection from './components/AlumniProfileSection';
import AlumniDirectorySection from './components/AlumniDirectorySection';
import AlumniNetworkingSection from './components/AlumniNetworkingSection';
import AlumniMentorshipSection from './components/AlumniMentorshipSection';
import AlumniJobsSection from './components/AlumniJobsSection';
import AlumniEventsSection from './components/AlumniEventsSection';
import AlumniDonationsSection from './components/AlumniDonationsSection';
import AlumniSuccessStoriesSection from './components/AlumniSuccessStoriesSection';
import AlumniNotificationsSection from './components/AlumniNotificationsSection';

const AlumniDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <AlumniDashboardOverviewSection />;
      case 'profile':
        return <AlumniProfileSection />;
      case 'directory':
        return <AlumniDirectorySection />;
      case 'networking':
        return <AlumniNetworkingSection />;
      case 'mentorship':
        return <AlumniMentorshipSection />;
      case 'jobs':
        return <AlumniJobsSection />;
      case 'events':
        return <AlumniEventsSection />;
      case 'donations':
        return <AlumniDonationsSection />;
      case 'success-stories':
        return <AlumniSuccessStoriesSection />;
      case 'notifications':
        return <AlumniNotificationsSection />;
      default:
        return <AlumniDashboardOverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AlumniSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <AlumniTopbar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AlumniDashboard;