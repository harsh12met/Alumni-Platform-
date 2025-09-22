import React, { useState } from 'react';
import RoleDashboardHeader from '../../components/ui/RoleDashboardHeader';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import ProfileOverviewCard from './components/ProfileOverviewCard';
import DashboardStats from './components/DashboardStats';
import OpportunityCard from './components/OpportunityCard';
import OpportunityCreationModal from './components/OpportunityCreationModal';
import ConnectionsPanel from './components/ConnectionsPanel';
import AlumniEventsSection from './components/AlumniEventsSection';
import MentorshipModule from './components/MentorshipModule';
import RecentActivityFeed from './components/RecentActivityFeed';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AlumniDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      workType: "Full-time",
      type: "job",
      salaryMin: 120000,
      salaryMax: 160000,
      description: `We are looking for a Senior Software Engineer to join our growing team. You will be responsible for designing and implementing scalable web applications, mentoring junior developers, and contributing to architectural decisions.\n\nThis role offers the opportunity to work with cutting-edge technologies including React, Node.js, and cloud platforms. You'll be part of a collaborative team that values innovation, continuous learning, and work-life balance.`,
      requirements: ["5+ years of software development experience", "Strong proficiency in JavaScript and React", "Experience with Node.js and databases", "Knowledge of cloud platforms (AWS/GCP)", "Excellent communication skills"],
      postedDate: "2 days ago",
      views: 156,
      applications: 23
    },
    {
      id: 2,
      title: "Product Manager Internship",
      company: "StartupXYZ",
      location: "Remote",
      workType: "Remote",
      type: "internship",
      salaryMin: null,
      salaryMax: null,
      description: `Join our dynamic startup as a Product Manager Intern and gain hands-on experience in product development, market research, and user experience design.\n\nYou'll work directly with our founding team to shape the future of our platform, conduct user interviews, analyze market trends, and contribute to product roadmap decisions.`,
      requirements: ["Currently pursuing MBA or related degree", "Interest in product management", "Strong analytical skills", "Experience with user research", "Excellent presentation skills"],
      postedDate: "1 week ago",
      views: 89,
      applications: 12
    },
    {
      id: 3,
      title: "Freelance UI/UX Designer",
      company: "Design Agency Pro",
      location: "New York, NY",
      workType: "Contract",
      type: "freelance",
      salaryMin: 75,
      salaryMax: 100,
      description: `We're seeking a talented UI/UX Designer for a 3-month project to redesign our client's e-commerce platform.\n\nThe ideal candidate will have experience with user research, wireframing, prototyping, and creating beautiful, functional designs that enhance user experience and drive conversions.`,
      requirements: ["3+ years of UI/UX design experience", "Proficiency in Figma and Adobe Creative Suite", "Experience with e-commerce platforms", "Strong portfolio showcasing web design", "Understanding of user-centered design principles"],
      postedDate: "5 days ago",
      views: 67,
      applications: 8
    }
  ]);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleCreateOpportunity = (opportunityData) => {
    const newOpportunity = {
      id: opportunities?.length + 1,
      ...opportunityData,
      postedDate: "Just now",
      views: 0,
      applications: 0
    };
    setOpportunities([newOpportunity, ...opportunities]);
  };

  const handleEditOpportunity = (opportunityId) => {
    console.log('Edit opportunity:', opportunityId);
  };

  const handleDeleteOpportunity = (opportunityId) => {
    setOpportunities(opportunities?.filter(opp => opp?.id !== opportunityId));
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-foreground">Welcome back, Sarah!</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Here's what's happening in your alumni network today.
              </p>
            </div>
            <Button
              variant="default"
              onClick={() => setIsOpportunityModalOpen(true)}
              iconName="Plus"
              iconPosition="left"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2"
            >
              Share Opportunity
            </Button>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Left Column - Primary Content */}
            <div className="lg:col-span-2 xl:col-span-3 space-y-4">
              {/* Profile Overview */}
              <ProfileOverviewCard />

              {/* Opportunities Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-foreground flex items-center space-x-2">
                    <Icon name="Briefcase" size={16} />
                    <span>Opportunities I've Shared</span>
                  </h2>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setIsOpportunityModalOpen(true)}
                    iconName="Plus"
                    iconPosition="left"
                    className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-sm text-sm px-3 py-1"
                  >
                    Add New
                  </Button>
                </div>

                {opportunities?.length > 0 ? (
                  <div className="space-y-6">
                    {opportunities?.map((opportunity) => (
                      <OpportunityCard
                        key={opportunity?.id}
                        opportunity={opportunity}
                        onEdit={handleEditOpportunity}
                        onDelete={handleDeleteOpportunity}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <Icon name="Briefcase" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-card-foreground mb-2">
                      No opportunities shared yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Start helping your fellow alumni by sharing job opportunities from your network.
                    </p>
                    <Button
                      variant="default"
                      onClick={() => setIsOpportunityModalOpen(true)}
                      iconName="Plus"
                      iconPosition="left"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Share Your First Opportunity
                    </Button>
                  </div>
                )}
              </div>

              {/* Alumni Events */}
              <AlumniEventsSection />

              {/* Mentorship Module */}
              <MentorshipModule />
            </div>

            {/* Right Column - Network & Activity */}
            <div className="lg:col-span-1 xl:col-span-1 space-y-4">
              {/* My Network Panel */}
              <ConnectionsPanel />

              {/* Recent Activity Feed */}
              <RecentActivityFeed />
            </div>
          </div>
        </div>
      </main>
      {/* Opportunity Creation Modal */}
      <OpportunityCreationModal
        isOpen={isOpportunityModalOpen}
        onClose={() => setIsOpportunityModalOpen(false)}
        onSubmit={handleCreateOpportunity}
      />
    </div>
  );
};

export default AlumniDashboard;