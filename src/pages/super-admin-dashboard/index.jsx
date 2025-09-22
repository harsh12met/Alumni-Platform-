import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoleDashboardHeader from '../../components/ui/RoleDashboardHeader';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import PlatformOverview from './components/PlatformOverview';
import InstituteManagement from './components/InstituteManagement';
import UserManagement from './components/UserManagement';
import SystemAnalytics from './components/SystemAnalytics';
import SystemHealth from './components/SystemHealth';
import PlatformSettings from './components/PlatformSettings';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SuperAdminDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const module = searchParams.get('module');
    if (module) {
      setActiveModule(module);
    }
  }, [searchParams]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const moduleItems = [
    { id: 'dashboard', label: 'Platform Overview', icon: 'LayoutDashboard' },
    { id: 'institutes', label: 'Institute Management', icon: 'Building2' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'analytics', label: 'System Analytics', icon: 'BarChart3' },
    { id: 'system', label: 'System Health', icon: 'Activity' },
    { id: 'settings', label: 'Platform Settings', icon: 'Settings' }
  ];

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <PlatformOverview />;
      case 'institutes':
        return <InstituteManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <SystemAnalytics />;
      case 'system':
        return <SystemHealth />;
      case 'settings':
        return <PlatformSettings />;
      default:
        return <PlatformOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleDashboardHeader 
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      
      <DashboardSidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleToggleSidebar}
      />
      
      <main className={`pt-16 pb-16 lg:pb-0 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-52'
      }`}>
        <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
          {/* Header with Module Navigation */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Super Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage the entire EduConnect platform and monitor system performance
              </p>
            </div>
            
            {/* Module Navigation */}
            <div className="flex flex-wrap gap-2">
              {moduleItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeModule === item.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveModule(item.id)}
                  iconName={item.icon}
                  iconPosition="left"
                  className={activeModule === item.id 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                  }
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Module Content */}
          {renderActiveModule()}
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;