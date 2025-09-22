import React, { useState } from 'react';
import RoleDashboardHeader from '../../components/ui/RoleDashboardHeader';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import CompanyProfileCard from './components/CompanyProfileCard';
import JobPostingCard from './components/JobPostingCard';
import ApplicationManagementCard from './components/ApplicationManagementCard';
import CandidateShortlistCard from './components/CandidateShortlistCard';
import CommunicationToolsCard from './components/CommunicationToolsCard';
import AnalyticsDashboardCard from './components/AnalyticsDashboardCard';
import QuickStatsCard from './components/QuickStatsCard';
import RecentActivityCard from './components/RecentActivityCard';

const RecruiterDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleDashboardHeader 
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      {/* Sidebar */}
      <DashboardSidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleToggleSidebar}
      />
      {/* Main Content */}
      <main className={`pt-16 pb-20 lg:pb-6 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6 space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-card-foreground mb-2">
                  Welcome back, TechCorp Solutions!
                </h1>
                <p className="text-muted-foreground">
                  Manage your recruitment process and connect with top talent from leading educational institutions.
                </p>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm text-muted-foreground">Today's Date</p>
                <p className="font-semibold text-card-foreground">
                  {new Date()?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <QuickStatsCard />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left/Middle Column - Primary Actions (WIDER) */}
            <div className="xl:col-span-3 space-y-8">
              {/* Company Profile */}
              <CompanyProfileCard />

              {/* Job Posting Management */}
              <JobPostingCard />

              {/* Application Management */}
              <ApplicationManagementCard />

              {/* Analytics Dashboard */}
              <AnalyticsDashboardCard />
            </div>

            {/* Right Column - Recent Activity, Communication, Shortlist (NARROWER) */}
            <div className="xl:col-span-1 space-y-6">
              {/* Recent Activity */}
              <RecentActivityCard />

              {/* Communication Tools */}
              <CommunicationToolsCard />

              {/* Candidate Shortlist */}
              <CandidateShortlistCard />
            </div>
          </div>

          {/* Full Width Additional Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Talent Pipeline */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 text-xl">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Talent Pipeline</h3>
                  <p className="text-sm text-muted-foreground">Build and manage talent pools</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Create targeted talent pipelines for future hiring needs and maintain relationships with potential candidates.
              </p>
              <button className="text-primary text-sm font-medium hover:underline">
                Explore Pipeline →
              </button>
            </div>

            {/* Campus Recruitment */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg">
                  <span className="text-green-600 text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Campus Recruitment</h3>
                  <p className="text-sm text-muted-foreground">Connect with universities</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Participate in campus recruitment drives and build relationships with educational institutions.
              </p>
              <button className="text-primary text-sm font-medium hover:underline">
                View Programs →
              </button>
            </div>

            {/* Industry Partnerships */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-50 rounded-lg">
                  <span className="text-purple-600 text-xl">🤝</span>
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Industry Partnerships</h3>
                  <p className="text-sm text-muted-foreground">Collaborate with institutions</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Establish partnerships with educational institutions for internship and placement programs.
              </p>
              <button className="text-primary text-sm font-medium hover:underline">
                Explore Partnerships →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;