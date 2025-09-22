import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const InstituteManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInstitutes, setSelectedInstitutes] = useState([]);

  const institutes = [
    {
      id: 1,
      name: "Massachusetts Institute of Technology",
      code: "MIT",
      location: "Cambridge, MA",
      status: "active",
      users: 12450,
      departments: 15,
      placements: 89,
      joinDate: "2023-01-15",
      admin: "Dr. Sarah Johnson",
      email: "admin@mit.edu",
      phone: "+1-617-253-1000",
      subscription: "Premium"
    },
    {
      id: 2,
      name: "Stanford University",
      code: "STANFORD",
      location: "Stanford, CA",
      status: "active",
      users: 15680,
      departments: 18,
      placements: 156,
      joinDate: "2023-02-20",
      admin: "Prof. Michael Chen",
      email: "admin@stanford.edu",
      phone: "+1-650-723-2300",
      subscription: "Premium"
    },
    {
      id: 3,
      name: "University of California Berkeley",
      code: "UCB",
      location: "Berkeley, CA",
      status: "pending",
      users: 0,
      departments: 0,
      placements: 0,
      joinDate: "2024-12-20",
      admin: "Dr. Lisa Wang",
      email: "admin@berkeley.edu",
      phone: "+1-510-642-6000",
      subscription: "Basic"
    },
    {
      id: 4,
      name: "Harvard University",
      code: "HARVARD",
      location: "Cambridge, MA",
      status: "suspended",
      users: 8920,
      departments: 12,
      placements: 67,
      joinDate: "2023-03-10",
      admin: "Dr. Robert Davis",
      email: "admin@harvard.edu",
      phone: "+1-617-495-1000",
      subscription: "Premium"
    },
    {
      id: 5,
      name: "Carnegie Mellon University",
      code: "CMU",
      location: "Pittsburgh, PA",
      status: "active",
      users: 9340,
      departments: 14,
      placements: 134,
      joinDate: "2023-04-05",
      admin: "Prof. Jennifer Liu",
      email: "admin@cmu.edu",
      phone: "+1-412-268-2000",
      subscription: "Premium"
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'suspended': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const filteredInstitutes = institutes?.filter(institute => {
    const matchesSearch = institute?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         institute?.code?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         institute?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || institute?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectInstitute = (instituteId) => {
    setSelectedInstitutes(prev => 
      prev?.includes(instituteId) 
        ? prev?.filter(id => id !== instituteId)
        : [...prev, instituteId]
    );
  };

  const handleSelectAll = () => {
    if (selectedInstitutes?.length === filteredInstitutes?.length) {
      setSelectedInstitutes([]);
    } else {
      setSelectedInstitutes(filteredInstitutes?.map(institute => institute?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for institutes:`, selectedInstitutes);
    setSelectedInstitutes([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Institute Management</h2>
          <p className="text-muted-foreground">Manage and monitor all registered institutes</p>
        </div>
        <Button iconName="Plus" iconPosition="left">
          Add Institute
        </Button>
      </div>
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search institutes by name, code, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedInstitutes?.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium">
            {selectedInstitutes?.length} institute{selectedInstitutes?.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleBulkAction('activate')}>
              Activate
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleBulkAction('suspend')}>
              Suspend
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleBulkAction('delete')}>
              Delete
            </Button>
          </div>
        </div>
      )}
      {/* Institutes Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedInstitutes?.length === filteredInstitutes?.length && filteredInstitutes?.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left p-4 font-medium text-card-foreground">Institute</th>
                <th className="text-left p-4 font-medium text-card-foreground">Status</th>
                <th className="text-left p-4 font-medium text-card-foreground">Users</th>
                <th className="text-left p-4 font-medium text-card-foreground">Departments</th>
                <th className="text-left p-4 font-medium text-card-foreground">Placements</th>
                <th className="text-left p-4 font-medium text-card-foreground">Admin</th>
                <th className="text-left p-4 font-medium text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInstitutes?.map((institute) => (
                <tr key={institute?.id} className="hover:bg-muted/30">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedInstitutes?.includes(institute?.id)}
                      onChange={() => handleSelectInstitute(institute?.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-card-foreground">{institute?.name}</div>
                      <div className="text-sm text-muted-foreground">{institute?.code} • {institute?.location}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(institute?.status)}`}>
                      {institute?.status?.charAt(0)?.toUpperCase() + institute?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-card-foreground">{institute?.users?.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-card-foreground">{institute?.departments}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-card-foreground">{institute?.placements}</div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-sm font-medium text-card-foreground">{institute?.admin}</div>
                      <div className="text-xs text-muted-foreground">{institute?.email}</div>
                    </div>
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

        {filteredInstitutes?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Building2" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No institutes found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstituteManagement;