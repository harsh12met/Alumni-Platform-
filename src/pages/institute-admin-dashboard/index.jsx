import React, { useState } from 'react';
import RoleDashboardHeader from '../../components/ui/RoleDashboardHeader';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import UserManagementCard from './components/UserManagementCard';
import RegistrationApprovalCard from './components/RegistrationApprovalCard';
import InstituteAnalyticsCard from './components/InstituteAnalyticsCard';
import EventManagementCard from './components/EventManagementCard';
import AnnouncementCard from './components/AnnouncementCard';
import ResourceOversightCard from './components/ResourceOversightCard';
import QuickStatsCard from './components/QuickStatsCard';

const InstituteAdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleDashboardHeader 
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />

      {/* Sidebar */}
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
      />

      {/* Main Content */}
      <main className={`pt-16 pb-20 lg:pb-6 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6 space-y-6">
          {/* Quick Stats Overview */}
          <QuickStatsCard />

          {/* Main Content Grid - 2 columns layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Registration Approvals */}
            <RegistrationApprovalCard />
            
            {/* Right Column - Announcements */}
            <AnnouncementCard />
          </div>

          {/* Second Row - User Management and Resource Oversight */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserManagementCard />
            <ResourceOversightCard />
          </div>

          {/* Third Row - Institute Analytics and Event Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InstituteAnalyticsCard />
            <EventManagementCard />
          </div>

          {/* Administrative Guidelines */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Administrative Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-card-foreground">User Management</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Review registration requests within 48 hours</li>
                  <li>• Verify institutional email addresses</li>
                  <li>• Monitor user activity and engagement</li>
                  <li>• Handle account disputes and issues</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-card-foreground">Content Moderation</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Review study materials for quality</li>
                  <li>• Approve job postings from recruiters</li>
                  <li>• Monitor research paper submissions</li>
                  <li>• Flag inappropriate content</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-card-foreground">Event Coordination</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Schedule campus-wide events</li>
                  <li>• Coordinate with department heads</li>
                  <li>• Manage event registrations</li>
                  <li>• Track attendance and feedback</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstituteAdminDashboard;