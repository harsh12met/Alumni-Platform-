import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AdvancedUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@mit.edu",
      role: "student",
      institute: "MIT",
      status: "active",
      lastLogin: "2024-12-21T10:30:00Z",
      joinDate: "2023-09-15",
      avatar: null,
      phone: "+1-617-555-0123",
      department: "Computer Science",
      graduationYear: "2025",
      location: "Cambridge, MA"
    },
    {
      id: 2,
      name: "Dr. Priya Kulkarni",
      email: "p.kulkarni@stanford.edu",
      role: "faculty",
      institute: "Stanford University",
      status: "active",
      lastLogin: "2024-12-21T09:15:00Z",
      joinDate: "2020-01-10",
      avatar: null,
      phone: "+1-650-555-0456",
      department: "Engineering",
      position: "Professor",
      location: "Stanford, CA"
    },
    {
      id: 3,
      name: "Arjun Patil",
      email: "arjun.patil@google.com",
      role: "alumni",
      institute: "MIT",
      status: "active",
      lastLogin: "2024-12-20T16:45:00Z",
      joinDate: "2022-05-20",
      avatar: null,
      phone: "+1-415-555-0789",
      department: "Computer Science",
      graduationYear: "2020",
      company: "Google",
      position: "Senior Software Engineer",
      location: "Mountain View, CA"
    },
    {
      id: 4,
      name: "Jennifer Brown",
      email: "j.brown@techcorp.com",
      role: "recruiter",
      institute: null,
      status: "pending",
      lastLogin: null,
      joinDate: "2024-12-20",
      avatar: null,
      phone: "+1-408-555-0321",
      company: "TechCorp",
      position: "Senior Recruiter",
      location: "San Jose, CA"
    },
    {
      id: 5,
      name: "Robert Davis",
      email: "robert.davis@harvard.edu",
      role: "admin",
      institute: "Harvard University",
      status: "suspended",
      lastLogin: "2024-12-18T14:20:00Z",
      joinDate: "2019-08-30",
      avatar: null,
      phone: "+1-617-555-0654",
      department: "Administration",
      position: "Institute Admin",
      location: "Cambridge, MA"
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'student', label: 'Students' },
    { value: 'alumni', label: 'Alumni' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'recruiter', label: 'Recruiters' },
    { value: 'admin', label: 'Institute Admins' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const tabs = [
    { id: 'users', label: 'All Users', count: users.length },
    { id: 'pending', label: 'Pending Approval', count: users.filter(u => u.status === 'pending').length },
    { id: 'suspended', label: 'Suspended Users', count: users.filter(u => u.status === 'suspended').length },
    { id: 'analytics', label: 'User Analytics', count: null }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'suspended': return 'text-error bg-error/10';
      case 'inactive': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'student': return 'text-blue-600 bg-blue-50';
      case 'alumni': return 'text-green-600 bg-green-50';
      case 'faculty': return 'text-purple-600 bg-purple-50';
      case 'recruiter': return 'text-orange-600 bg-orange-50';
      case 'admin': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.institute && user.institute.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    if (activeTab === 'pending') return matchesSearch && matchesRole && user.status === 'pending';
    if (activeTab === 'suspended') return matchesSearch && matchesRole && user.status === 'suspended';
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for users:`, selectedUsers);
    setSelectedUsers([]);
    setShowBulkActions(false);
  };

  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return 'Never';
    const date = new Date(lastLogin);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const renderUserAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold text-card-foreground">89,247</p>
              <p className="text-xs text-success flex items-center mt-1">
                <Icon name="TrendingUp" size={12} className="mr-1" />
                +5.2% this month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
              <p className="text-2xl font-bold text-card-foreground">12,847</p>
              <p className="text-xs text-success flex items-center mt-1">
                <Icon name="TrendingUp" size={12} className="mr-1" />
                +8.7% today
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">New Registrations</p>
              <p className="text-2xl font-bold text-card-foreground">456</p>
              <p className="text-xs text-warning flex items-center mt-1">
                <Icon name="TrendingDown" size={12} className="mr-1" />
                -12.3% this week
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="UserPlus" size={24} className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
              <p className="text-2xl font-bold text-card-foreground">23</p>
              <p className="text-xs text-error flex items-center mt-1">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                Requires attention
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">User Distribution by Role</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold">42,156</span>
                <span className="text-xs text-muted-foreground">(47.2%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Alumni</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold">28,934</span>
                <span className="text-xs text-muted-foreground">(32.4%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Faculty</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold">8,234</span>
                <span className="text-xs text-muted-foreground">(9.2%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Recruiters</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold">2,456</span>
                <span className="text-xs text-muted-foreground">(2.8%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">Admins</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold">467</span>
                <span className="text-xs text-muted-foreground">(0.5%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">156 new user registrations</p>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">23 pending approvals</p>
                <p className="text-xs text-muted-foreground">Requires review</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">12 users suspended</p>
                <p className="text-xs text-muted-foreground">Policy violations</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">89 profile verifications</p>
                <p className="text-xs text-muted-foreground">Completed today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground">Manage all users across the platform</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Users
          </Button>
          <Button iconName="UserPlus" iconPosition="left">
            Add User
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
                  activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'analytics' ? renderUserAnalytics() : (
        <>
          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search users by name, email, or institute..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                options={roleOptions}
                value={roleFilter}
                onChange={setRoleFilter}
                placeholder="Filter by role"
                className="w-48"
              />
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Filter by status"
                className="w-48"
              />
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('approve')}>
                  Approve
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('suspend')}>
                  Suspend
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('message')}>
                  Send Message
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleBulkAction('delete')}>
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Users Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-border"
                      />
                    </th>
                    <th className="text-left p-4 font-medium text-card-foreground">User</th>
                    <th className="text-left p-4 font-medium text-card-foreground">Role</th>
                    <th className="text-left p-4 font-medium text-card-foreground">Institute</th>
                    <th className="text-left p-4 font-medium text-card-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-card-foreground">Last Login</th>
                    <th className="text-left p-4 font-medium text-card-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded border-border"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <Icon name="User" size={16} />
                          </div>
                          <div>
                            <div className="font-medium text-card-foreground">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-medium text-card-foreground">
                          {user.institute || 'N/A'}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-muted-foreground">
                          {formatLastLogin(user.lastLogin)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" title="View Profile">
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" title="Edit User">
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" title="More Actions">
                            <Icon name="MoreHorizontal" size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No users found matching your criteria</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdvancedUserManagement;