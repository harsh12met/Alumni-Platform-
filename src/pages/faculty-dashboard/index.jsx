import React, { useState } from 'react';
import RoleDashboardHeader from '../../components/ui/RoleDashboardHeader';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import DashboardOverview from './components/DashboardOverview';
import StudyMaterialsSection from './components/StudyMaterialsSection';
import EventManagementSection from './components/EventManagementSection';
import StudentProgressSection from './components/StudentProgressSection';
import AlumniConnectionSection from './components/AlumniConnectionSection';

const FacultyDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'students':
        return <StudentProgressSection />;
      case 'courses':
        return <StudyMaterialsSection />;
      case 'research':
        return (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Research Collaboration</h3>
            <p className="text-muted-foreground mb-6">
              Connect with industry professionals and fellow academics for research projects and collaborations.
            </p>
            <div className="text-muted-foreground">
              Research collaboration features coming soon...
            </div>
          </div>
        );
      case 'placements':
        return (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Placement Support</h3>
            <p className="text-muted-foreground mb-6">
              Support students in their placement journey with career guidance and industry connections.
            </p>
            <div className="text-muted-foreground">
              Placement support features coming soon...
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Faculty Profile</h3>
            <p className="text-muted-foreground mb-6">
              Manage your academic profile, qualifications, and research interests.
            </p>
            <div className="text-muted-foreground">
              Profile management features coming soon...
            </div>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
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
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Faculty Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Manage educational resources, track student progress, and facilitate industry connections
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Sections */}
          <div className="space-y-8">
            {/* Overview Section */}
            <section>
              <DashboardOverview />
            </section>

            {/* Study Materials Section */}
            <section>
              <StudyMaterialsSection />
            </section>

            {/* Event Management Section */}
            <section>
              <EventManagementSection />
            </section>

            {/* Student Progress Section */}
            <section>
              <StudentProgressSection />
            </section>

            {/* Alumni Connection Section */}
            <section>
              <AlumniConnectionSection />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;