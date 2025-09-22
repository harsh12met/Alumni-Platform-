import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const UserManagementCard = () => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'student', label: 'Students' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'alumni', label: 'Alumni' },
    { value: 'recruiter', label: 'Recruiters' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@university.edu",
      role: "student",
      status: "active",
      department: "Computer Science",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "m.chen@university.edu",
      role: "faculty",
      status: "active",
      department: "Engineering",
      joinDate: "2023-08-20",
      lastActive: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@alumni.edu",
      role: "alumni",
      status: "active",
      department: "Business Administration",
      joinDate: "2023-12-10",
      lastActive: "3 hours ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    },
    {
      id: 4,
      name: "TechCorp Recruiter",
      email: "hr@techcorp.com",
      role: "recruiter",
      status: "pending",
      department: "External",
      joinDate: "2024-01-20",
      lastActive: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      id: 5,
      name: "Alex Thompson",
      email: "alex.t@university.edu",
      role: "student",
      status: "inactive",
      department: "Mathematics",
      joinDate: "2023-09-05",
      lastActive: "2 weeks ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-muted-foreground bg-muted';
      case 'pending': return 'text-warning bg-warning/10';
      case 'suspended': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'student': return 'GraduationCap';
      case 'faculty': return 'BookOpen';
      case 'alumni': return 'Users';
      case 'recruiter': return 'Briefcase';
      default: return 'User';
    }
  };

  const filteredUsers = users?.filter(user => {
    const roleMatch = selectedRole === 'all' || user?.role === selectedRole;
    const statusMatch = selectedStatus === 'all' || user?.status === selectedStatus;
    return roleMatch && statusMatch;
  });

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers?.length === filteredUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for users:`, selectedUsers);
    // Handle bulk actions here
    setSelectedUsers([]);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Users" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">User Management</h3>
            <p className="text-sm text-muted-foreground">Manage students, faculty, alumni, and recruiters</p>
          </div>
        </div>
        <Button 
          variant="default" 
          iconName="UserPlus" 
          iconPosition="left"
          className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
        >
          Add User
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Select
            label="Filter by Role"
            options={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Filter by Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-4">
          <span className="text-sm font-medium text-card-foreground">
            {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleBulkAction('activate')}
              className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300"
            >
              Activate
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleBulkAction('deactivate')}
              className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300"
            >
              Deactivate
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleBulkAction('delete')}
              className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3">
                <input
                  type="checkbox"
                  checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">User</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Role</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Department</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Last Active</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={() => handleUserSelect(user?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-card-foreground">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={getRoleIcon(user?.role)} size={16} />
                    <span className="text-sm capitalize">{user?.role}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(user?.status)}`}>
                    {user?.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-muted-foreground">{user?.department}</td>
                <td className="p-3 text-sm text-muted-foreground">{user?.lastActive}</td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                    >
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredUsers?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No users found matching the selected filters</p>
        </div>
      )}
    </div>
  );
};

export default UserManagementCard;