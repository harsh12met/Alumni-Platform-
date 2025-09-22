import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConnectionsPanel = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const connections = [
    {
      id: 1,
      name: "Michael Chen",
      title: "Product Manager",
      company: "Google",
      graduationYear: "2019",
      mutualConnections: 12,
      status: "connected",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      title: "Data Scientist",
      company: "Microsoft",
      graduationYear: "2017",
      mutualConnections: 8,
      status: "connected",
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "David Kim",
      title: "Software Engineer",
      company: "Meta",
      graduationYear: "2020",
      mutualConnections: 5,
      status: "pending",
      lastActive: "3 days ago"
    },
    {
      id: 4,
      name: "Prof. Sarah Wilson",
      title: "Computer Science Professor",
      company: "University",
      graduationYear: null,
      mutualConnections: 45,
      status: "connected",
      lastActive: "5 hours ago",
      type: "faculty"
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Connections', count: connections?.length },
    { id: 'alumni', label: 'Alumni', count: connections?.filter(c => c?.graduationYear)?.length },
    { id: 'faculty', label: 'Faculty', count: connections?.filter(c => c?.type === 'faculty')?.length },
    { id: 'pending', label: 'Pending', count: connections?.filter(c => c?.status === 'pending')?.length }
  ];

  const filteredConnections = connections?.filter(connection => {
    const matchesSearch = connection?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         connection?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'alumni') return matchesSearch && connection?.graduationYear;
    if (activeTab === 'faculty') return matchesSearch && connection?.type === 'faculty';
    if (activeTab === 'pending') return matchesSearch && connection?.status === 'pending';
    
    return matchesSearch;
  });

  const handleConnect = (connectionId) => {
    console.log('Connect with:', connectionId);
  };

  const handleMessage = (connectionId) => {
    console.log('Message:', connectionId);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-card-foreground flex items-center space-x-2">
            <Icon name="Users" size={18} />
            <span>My Network</span>
          </h3>
          <Button variant="default" size="sm" iconName="UserPlus" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1">
            Find Alumni
          </Button>
        </div>

        <Input
          type="search"
          placeholder="Search connections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="mb-3 text-sm"
        />

        <div className="grid grid-cols-2 gap-1 bg-muted rounded-lg p-1">
          {tabs?.slice(0, 4)?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center justify-center px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="truncate">{tab?.label}</span>
              <span className="bg-muted-foreground/20 text-xs px-1 py-0.5 rounded-full ml-1">
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {filteredConnections?.length > 0 ? (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredConnections?.map((connection) => (
              <div key={connection?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="relative flex-shrink-0">
                  <Avatar
                    name={connection?.name}
                    size="sm"
                  />
                  {connection?.status === 'connected' && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-card-foreground text-sm truncate">{connection?.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {connection?.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {connection?.company}
                  </p>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                    {connection?.graduationYear && (
                      <span className="truncate">'{connection?.graduationYear?.toString()?.slice(-2)}</span>
                    )}
                    <span className="truncate">{connection?.mutualConnections} mutual</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-1 flex-shrink-0">
                  {connection?.status === 'pending' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnect(connection?.id)}
                      className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 text-xs px-2 py-1"
                    >
                      Accept
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageCircle"
                      onClick={() => handleMessage(connection?.id)}
                      className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 text-xs px-2 py-1"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Icon name="Users" size={40} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-sm">No connections found</p>
            <Button variant="outline" size="sm" className="mt-3 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 text-xs">
              Discover Alumni
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPanel;