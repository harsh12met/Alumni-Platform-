import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const DashboardSidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getRoleConfig = () => {
    const path = location?.pathname;
    
    if (path?.includes('alumni-dashboard')) {
      return {
        role: 'Alumni',
        modules: [
          { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/alumni-dashboard' },
          { id: 'opportunities', label: 'Opportunities', icon: 'Briefcase', path: '/alumni-dashboard/opportunities' },
          { id: 'network', label: 'My Network', icon: 'Users', path: '/alumni-dashboard/network' },
          { id: 'mentorship', label: 'Mentorship', icon: 'UserCheck', path: '/alumni-dashboard/mentorship' },
          { id: 'events', label: 'Events', icon: 'Calendar', path: '/alumni-dashboard/events' },
          { id: 'profile', label: 'Profile', icon: 'User', path: '/alumni-dashboard/profile' }
        ]
      };
    }
    
    if (path?.includes('faculty-dashboard')) {
      return {
        role: 'Faculty',
        modules: [
          { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/faculty-dashboard' },
          { id: 'students', label: 'Students', icon: 'GraduationCap', path: '/faculty-dashboard/students' },
          { id: 'courses', label: 'Courses', icon: 'BookOpen', path: '/faculty-dashboard/courses' },
          { id: 'research', label: 'Research', icon: 'FlaskConical', path: '/faculty-dashboard/research' },
          { id: 'placements', label: 'Placements', icon: 'TrendingUp', path: '/faculty-dashboard/placements' },
          { id: 'profile', label: 'Profile', icon: 'User', path: '/faculty-dashboard/profile' }
        ]
      };
    }
    
    if (path?.includes('recruiter-dashboard')) {
      return {
        role: 'Recruiter',
        modules: [
          { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/recruiter-dashboard' },
          { id: 'candidates', label: 'Candidates', icon: 'Users', path: '/recruiter-dashboard/candidates' },
          { id: 'jobs', label: 'Job Postings', icon: 'Briefcase', path: '/recruiter-dashboard/jobs' },
          { id: 'applications', label: 'Applications', icon: 'FileText', path: '/recruiter-dashboard/applications' },
          { id: 'interviews', label: 'Interviews', icon: 'Video', path: '/recruiter-dashboard/interviews' },
          { id: 'analytics', label: 'Analytics', icon: 'BarChart3', path: '/recruiter-dashboard/analytics' },
          { id: 'profile', label: 'Company Profile', icon: 'Building2', path: '/recruiter-dashboard/profile' }
        ]
      };
    }
    
    if (path?.includes('student-dashboard')) {
      return {
        role: 'Student',
        modules: [
          { id: 'overview', label: 'Dashboard', icon: 'LayoutDashboard', path: '/student-dashboard' },
          { id: 'profile', label: 'Profile Management', icon: 'User', path: '/student-dashboard?section=profile' },
          { id: 'materials', label: 'Study Materials', icon: 'BookOpen', path: '/student-dashboard?section=materials' },
          { id: 'opportunities', label: 'Job/Internship', icon: 'Briefcase', path: '/student-dashboard?section=opportunities' },
          { id: 'events', label: 'Events', icon: 'Calendar', path: '/student-dashboard?section=events' },
          { id: 'connect', label: 'Alumni/Faculty Connect', icon: 'Users', path: '/student-dashboard?section=connect' },
          { id: 'grades', label: 'Grades & Results', icon: 'FileText', path: '/student-dashboard?section=grades' },
          { id: 'attendance', label: 'Attendance', icon: 'Clock', path: '/student-dashboard?section=attendance' }
        ]
      };
    }
    
    if (path?.includes('institute-admin-dashboard')) {
      return {
        role: 'Institute Admin',
        modules: [
          { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/institute-admin-dashboard' },
          { id: 'users', label: 'User Management', icon: 'Users', path: '/institute-admin-dashboard/users' },
          { id: 'departments', label: 'Departments', icon: 'Building', path: '/institute-admin-dashboard/departments' },
          { id: 'placements', label: 'Placement Cell', icon: 'TrendingUp', path: '/institute-admin-dashboard/placements' },
          { id: 'reports', label: 'Reports', icon: 'FileBarChart', path: '/institute-admin-dashboard/reports' },
          { id: 'settings', label: 'Institute Settings', icon: 'Settings', path: '/institute-admin-dashboard/settings' }
        ]
      };
    }
    
    if (path?.includes('super-admin-dashboard')) {
      return {
        role: 'Super Admin',
        modules: [
          { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/super-admin-dashboard' },
          { id: 'institutes', label: 'Institutes', icon: 'Building2', path: '/super-admin-dashboard/institutes' },
          { id: 'users', label: 'Global Users', icon: 'Users', path: '/super-admin-dashboard/users' },
          { id: 'analytics', label: 'Platform Analytics', icon: 'BarChart3', path: '/super-admin-dashboard/analytics' },
          { id: 'system', label: 'System Health', icon: 'Activity', path: '/super-admin-dashboard/system' },
          { id: 'settings', label: 'Platform Settings', icon: 'Settings', path: '/super-admin-dashboard/settings' }
        ]
      };
    }
    
    return { role: 'Dashboard', modules: [] };
  };

  const { role, modules } = getRoleConfig();

  const handleModuleClick = (modulePath) => {
    navigate(modulePath);
  };

  const isActiveModule = (modulePath) => {
    return location?.pathname === modulePath || 
           (modulePath !== '/' && location?.pathname?.startsWith(modulePath));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block fixed left-0 top-16 bottom-0 bg-card border-r border-border z-999 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-52'
      }`}>
        <div className="flex flex-col h-full">
          {/* Role Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div>
                  <h2 className="font-semibold text-card-foreground">{role}</h2>
                  <p className="text-sm text-muted-foreground">Dashboard</p>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="ml-auto"
              >
                <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
              </Button>
            </div>
          </div>

          {/* Navigation Modules */}
          <nav className="flex-1 p-2 space-y-1">
            {modules?.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                  isActiveModule(module.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-card-foreground'
                }`}
                title={isCollapsed ? module.label : ''}
              >
                <Icon name={module.icon} size={20} />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{module.label}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="p-2 border-t border-border space-y-1">
            <button
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-muted text-card-foreground"
              title={isCollapsed ? 'Help & Support' : ''}
            >
              <Icon name="HelpCircle" size={20} />
              {!isCollapsed && (
                <span className="text-sm font-medium">Help & Support</span>
              )}
            </button>
            <button
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-muted text-card-foreground"
              title={isCollapsed ? 'Settings' : ''}
            >
              <Icon name="Settings" size={20} />
              {!isCollapsed && (
                <span className="text-sm font-medium">Settings</span>
              )}
            </button>
          </div>
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-999">
        <div className="flex items-center justify-around py-2">
          {modules?.slice(0, 5)?.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.path)}
              className={`flex flex-col items-center space-y-1 px-2 py-1 rounded-md ${
                isActiveModule(module.path)
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <Icon name={module.icon} size={20} />
              <span className="text-xs font-medium">{module.label}</span>
            </button>
          ))}
          {modules?.length > 5 && (
            <button className="flex flex-col items-center space-y-1 px-2 py-1 rounded-md text-muted-foreground">
              <Icon name="MoreHorizontal" size={20} />
              <span className="text-xs font-medium">More</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default DashboardSidebar;