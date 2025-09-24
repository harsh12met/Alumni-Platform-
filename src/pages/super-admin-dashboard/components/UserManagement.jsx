import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    {
      id: 1,
      name: "Dr. Priya Kulkarni",
      email: "priya.kulkarni@mit.edu",
      role: "Institute Admin",
      institute: "MIT",
      status: "active",
      lastLogin: "2024-12-21 14:30",
      joinDate: "2023-01-15",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Arjun Patil",
      email: "arjun.patil@mit.edu",
      role: "Student",
      institute: "MIT",
      status: "active",
      lastLogin: "2024-12-21 16:45",
      joinDate: "2023-09-01",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 3,
      name: "Prof. Rajesh Deshmukh",
      email: "rajesh.deshmukh@stanford.edu",
      role: "Faculty",
      institute: "Stanford",
      status: "active",
      lastLogin: "2024-12-21 12:15",
      joinDate: "2023-02-20",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 4,
      name: "Sneha Joshi",
      email: "sneha.joshi@techcorp.com",
      role: "Recruiter",
      institute: "TechCorp",
      status: "pending",
      lastLogin: "Never",
      joinDate: "2024-12-20",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 5,
      name: "Kavya Patil",
      email: "kavya.patil@mit.edu",
      role: "Alumni",
      institute: "MIT",
      status: "suspended",
      lastLogin: "2024-12-15 09:30",
      joinDate: "2020-06-15",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: 6,
      name: "Dr. Lisa Wang",
      email: "lisa.wang@berkeley.edu",
      role: "Faculty",
      institute: "UC Berkeley",
      status: "active",
      lastLogin: "2024-12-21 11:20",
      joinDate: "2023-08-10",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'Student', label: 'Students' },
    { value: 'Alumni', label: 'Alumni' },
    { value: 'Faculty', label: 'Faculty' },
    { value: 'Recruiter', label: 'Recruiters' },
    { value: 'Institute Admin', label: 'Institute Admins' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'Student': return 'text-blue-600 bg-blue-100';
      case 'Alumni': return 'text-green-600 bg-green-100';
      case 'Faculty': return 'text-purple-600 bg-purple-100';
      case 'Recruiter': return 'text-orange-600 bg-orange-100';
      case 'Institute Admin': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'suspended': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.institute?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = roleFilter === 'all' || user?.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId) => {
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
    setSelectedUsers([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground">Manage users across all institutes and roles</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export
          </Button>
          <Button iconName="UserPlus" iconPosition="left">
            Add User
          </Button>
        </div>
      </div>
      {/* User Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} className="text-blue-600" />
            <span className="text-sm font-medium text-muted-foreground">Total Users</span>
          </div>
          <div className="text-2xl font-bold text-card-foreground mt-2">89,247</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="GraduationCap" size={20} className="text-blue-600" />
            <span className="text-sm font-medium text-muted-foreground">Students</span>
          </div>
          <div className="text-2xl font-bold text-card-foreground mt-2">45,123</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="UserCheck" size={20} className="text-green-600" />
            <span className="text-sm font-medium text-muted-foreground">Alumni</span>
          </div>
          <div className="text-2xl font-bold text-card-foreground mt-2">32,456</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={20} className="text-purple-600" />
            <span className="text-sm font-medium text-muted-foreground">Faculty</span>
          </div>
          <div className="text-2xl font-bold text-card-foreground mt-2">8,934</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Briefcase" size={20} className="text-orange-600" />
            <span className="text-sm font-medium text-muted-foreground">Recruiters</span>
          </div>
          <div className="text-2xl font-bold text-card-foreground mt-2">2,734</div>
        </div>
      </div>
      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search users by name, email, or institute..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="w-full lg:w-48">
          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={setRoleFilter}
            placeholder="Filter by role"
          />
        </div>
        <div className="w-full lg:w-48">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium">
            {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleBulkAction('activate')}>
              Activate
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleBulkAction('suspend')}>
              Suspend
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleBulkAction('export')}>
              Export
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
                    checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
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
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="hover:bg-muted/30">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={() => handleSelectUser(user?.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-card-foreground">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                      {user?.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-card-foreground">{user?.institute}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                      {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-card-foreground">{user?.lastLogin}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
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
            <p className="text-muted-foreground">No users found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;