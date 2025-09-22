import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemHealth = () => {
  const [refreshTime, setRefreshTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const systemMetrics = [
    {
      name: 'Database Performance',
      status: 'healthy',
      value: '98.5%',
      description: 'Query response time: 45ms avg',
      icon: 'Database',
      details: {
        connections: '245/500',
        queryTime: '45ms',
        uptime: '99.97%'
      }
    },
    {
      name: 'API Response Time',
      status: 'healthy',
      value: '142ms',
      description: 'Average response time across all endpoints',
      icon: 'Zap',
      details: {
        p95: '280ms',
        p99: '450ms',
        errors: '0.02%'
      }
    },
    {
      name: 'Server Load',
      status: 'warning',
      value: '72%',
      description: 'CPU utilization across all servers',
      icon: 'Server',
      details: {
        cpu: '72%',
        memory: '68%',
        disk: '45%'
      }
    },
    {
      name: 'Security Status',
      status: 'healthy',
      value: 'Secure',
      description: 'No security threats detected',
      icon: 'Shield',
      details: {
        threats: '0',
        lastScan: '2 hours ago',
        certificates: 'Valid'
      }
    },
    {
      name: 'Backup System',
      status: 'healthy',
      value: 'Active',
      description: 'Last backup: 2 hours ago',
      icon: 'HardDrive',
      details: {
        lastBackup: '2 hours ago',
        size: '2.4 TB',
        retention: '30 days'
      }
    },
    {
      name: 'CDN Performance',
      status: 'healthy',
      value: '99.8%',
      description: 'Content delivery network availability',
      icon: 'Globe',
      details: {
        hitRate: '94.2%',
        bandwidth: '1.2 TB/day',
        regions: '12 active'
      }
    }
  ];

  const recentIncidents = [
    {
      id: 1,
      title: 'Database Connection Spike',
      description: 'Temporary increase in database connections resolved automatically',
      severity: 'low',
      time: '2 hours ago',
      status: 'resolved',
      duration: '15 minutes'
    },
    {
      id: 2,
      title: 'API Rate Limit Exceeded',
      description: 'Rate limiting triggered for external API calls',
      severity: 'medium',
      time: '6 hours ago',
      status: 'resolved',
      duration: '8 minutes'
    },
    {
      id: 3,
      title: 'Scheduled Maintenance',
      description: 'Routine server maintenance completed successfully',
      severity: 'low',
      time: '1 day ago',
      status: 'completed',
      duration: '2 hours'
    }
  ];

  const upcomingMaintenance = [
    {
      id: 1,
      title: 'Database Index Optimization',
      description: 'Optimize database indexes for better performance',
      scheduledTime: '2024-12-25 02:00 UTC',
      duration: '3 hours',
      impact: 'Low - No service interruption expected'
    },
    {
      id: 2,
      title: 'Security Patch Deployment',
      description: 'Deploy latest security patches across all servers',
      scheduledTime: '2024-12-28 01:00 UTC',
      duration: '1 hour',
      impact: 'Medium - Brief service interruption possible'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success bg-success/10 border-success/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'critical': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">System Health</h2>
          <p className="text-muted-foreground">
            Real-time monitoring and system status • Last updated: {refreshTime?.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
          <Button variant="outline" iconName="Settings" iconPosition="left">
            Configure Alerts
          </Button>
        </div>
      </div>
      {/* Overall System Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Overall System Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success">All Systems Operational</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemMetrics?.map((metric, index) => (
            <div key={index} className={`border rounded-lg p-4 ${getStatusColor(metric?.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name={metric?.icon} size={20} />
                  <span className="font-medium">{metric?.name}</span>
                </div>
                <Icon name={getStatusIcon(metric?.status)} size={16} />
              </div>
              <div className="text-2xl font-bold mb-1">{metric?.value}</div>
              <div className="text-sm opacity-80 mb-3">{metric?.description}</div>
              <div className="space-y-1">
                {Object.entries(metric?.details)?.map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incidents */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Recent Incidents</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentIncidents?.map((incident) => (
              <div key={incident?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-card-foreground">{incident?.title}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident?.severity)}`}>
                        {incident?.severity?.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{incident?.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{incident?.time}</span>
                      <span>Duration: {incident?.duration}</span>
                      <span className="text-success">Status: {incident?.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Maintenance */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Upcoming Maintenance</h3>
            <Button variant="ghost" size="sm">
              Schedule New
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingMaintenance?.map((maintenance) => (
              <div key={maintenance?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-card-foreground mb-1">{maintenance?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{maintenance?.description}</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Scheduled:</span>
                        <span className="font-medium">{maintenance?.scheduledTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{maintenance?.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Impact:</span>
                        <span className="font-medium">{maintenance?.impact}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Icon name="Calendar" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Performance Monitoring */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Performance Monitoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="Activity" size={32} className="mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-card-foreground">12,847</div>
            <div className="text-sm text-muted-foreground">Active Sessions</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="Zap" size={32} className="mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-card-foreground">142ms</div>
            <div className="text-sm text-muted-foreground">Avg Response</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="HardDrive" size={32} className="mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-card-foreground">2.4TB</div>
            <div className="text-sm text-muted-foreground">Data Processed</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="TrendingUp" size={32} className="mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-card-foreground">99.97%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;