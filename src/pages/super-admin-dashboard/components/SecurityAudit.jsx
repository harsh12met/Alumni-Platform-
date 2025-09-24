import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SecurityAudit = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [logFilter, setLogFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('security');

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const logFilterOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'security', label: 'Security Events' },
    { value: 'authentication', label: 'Authentication' },
    { value: 'authorization', label: 'Authorization' },
    { value: 'system', label: 'System Events' },
    { value: 'user_actions', label: 'User Actions' },
    { value: 'data_access', label: 'Data Access' },
    { value: 'suspicious', label: 'Suspicious Activity' }
  ];

  const tabs = [
    { id: 'security', label: 'Security Overview', icon: 'Shield' },
    { id: 'audit', label: 'Audit Logs', icon: 'FileText' },
    { id: 'threats', label: 'Threat Detection', icon: 'AlertTriangle' },
    { id: 'compliance', label: 'Compliance', icon: 'CheckCircle' }
  ];

  const securityMetrics = [
    {
      title: 'Security Score',
      value: '94/100',
      status: 'excellent',
      trend: '+2 this week',
      icon: 'Shield'
    },
    {
      title: 'Active Threats',
      value: '3',
      status: 'warning',
      trend: '-7 from yesterday',
      icon: 'AlertTriangle'
    },
    {
      title: 'Failed Logins',
      value: '1,247',
      status: 'normal',
      trend: '-15% this week',
      icon: 'Lock'
    },
    {
      title: 'Data Breaches',
      value: '0',
      status: 'excellent',
      trend: '30 days clean',
      icon: 'Database'
    }
  ];

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-12-21T10:30:25Z',
      type: 'authentication',
      severity: 'info',
      user: 'john.smith@mit.edu',
      action: 'Login attempt',
      details: 'Successful login from IP 192.168.1.100',
      location: 'Cambridge, MA',
      userAgent: 'Chrome 120.0 on Windows'
    },
    {
      id: 2,
      timestamp: '2024-12-21T10:28:15Z',
      type: 'suspicious',
      severity: 'high',
      user: 'unknown@external.com',
      action: 'Multiple failed login attempts',
      details: 'Brute force attack detected from IP 45.123.67.89',
      location: 'Unknown Location',
      userAgent: 'Automated Bot'
    },
    {
      id: 3,
      timestamp: '2024-12-21T10:25:42Z',
      type: 'authorization',
      severity: 'medium',
      user: 'admin@system.local',
      action: 'Permission elevation',
      details: 'User granted super admin privileges',
      location: 'System Internal',
      userAgent: 'System Process'
    },
    {
      id: 4,
      timestamp: '2024-12-21T10:22:18Z',
      type: 'data_access',
      severity: 'info',
      user: 'sarah.johnson@stanford.edu',
      action: 'Database query',
      details: 'Accessed student records for placement statistics',
      location: 'Stanford, CA',
      userAgent: 'Firefox 121.0 on macOS'
    },
    {
      id: 5,
      timestamp: '2024-12-21T10:20:33Z',
      type: 'system',
      severity: 'low',
      user: 'system',
      action: 'Automated backup',
      details: 'Daily database backup completed successfully',
      location: 'Server Room',
      userAgent: 'System Scheduler'
    }
  ];

  const threatAlerts = [
    {
      id: 1,
      type: 'Brute Force Attack',
      severity: 'high',
      status: 'active',
      source: '45.123.67.89',
      target: 'Login System',
      detectedAt: '2024-12-21T10:28:00Z',
      attempts: 1247,
      blocked: true
    },
    {
      id: 2,
      type: 'SQL Injection Attempt',
      severity: 'critical',
      status: 'blocked',
      source: '192.168.100.45',
      target: 'User Database',
      detectedAt: '2024-12-21T09:45:00Z',
      attempts: 23,
      blocked: true
    },
    {
      id: 3,
      type: 'Suspicious File Upload',
      severity: 'medium',
      status: 'investigating',
      source: 'user@suspicious.com',
      target: 'File Storage',
      detectedAt: '2024-12-21T08:30:00Z',
      attempts: 5,
      blocked: false
    }
  ];

  const complianceChecks = [
    {
      name: 'GDPR Compliance',
      status: 'compliant',
      score: 98,
      lastCheck: '2024-12-20',
      issues: 0
    },
    {
      name: 'FERPA Compliance',
      status: 'compliant',
      score: 95,
      lastCheck: '2024-12-20',
      issues: 2
    },
    {
      name: 'SOC 2 Type II',
      status: 'compliant',
      score: 92,
      lastCheck: '2024-12-19',
      issues: 3
    },
    {
      name: 'ISO 27001',
      status: 'non-compliant',
      score: 78,
      lastCheck: '2024-12-18',
      issues: 8
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      case 'info': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      case 'normal': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const renderSecurityOverview = () => (
    <div className="space-y-6">
      {/* Security Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold text-card-foreground">{metric.value}</p>
                <p className={`text-xs flex items-center mt-1 ${
                  metric.trend.includes('+') ? 'text-success' : 
                  metric.trend.includes('-') ? 'text-error' : 'text-muted-foreground'
                }`}>
                  <Icon name={metric.trend.includes('+') ? 'TrendingUp' : 'TrendingDown'} size={12} className="mr-1" />
                  {metric.trend}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(metric.status)}`}>
                <Icon name={metric.icon} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Security Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Shield" size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Firewall Protection</p>
                  <p className="text-sm text-green-600">Active and monitoring</p>
                </div>
              </div>
              <Icon name="CheckCircle" size={20} className="text-green-600" />
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Lock" size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-green-800">SSL Certificates</p>
                  <p className="text-sm text-green-600">Valid until 2025-06-15</p>
                </div>
              </div>
              <Icon name="CheckCircle" size={20} className="text-green-600" />
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">Security Patches</p>
                  <p className="text-sm text-orange-600">3 patches pending</p>
                </div>
              </div>
              <Icon name="Clock" size={20} className="text-orange-600" />
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Database" size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Data Encryption</p>
                  <p className="text-sm text-green-600">AES-256 enabled</p>
                </div>
              </div>
              <Icon name="CheckCircle" size={20} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Security Events</h3>
          <div className="space-y-3">
            {auditLogs.filter(log => log.type === 'suspicious' || log.severity === 'high').slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${log.severity === 'high' ? 'bg-red-500' : log.severity === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.details}</p>
                  <p className="text-xs text-muted-foreground">{formatTimestamp(log.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuditLogs = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search audit logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            options={logFilterOptions}
            value={logFilter}
            onChange={setLogFilter}
            className="w-48"
          />
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-48"
          />
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-card-foreground">Timestamp</th>
                <th className="text-left p-4 font-medium text-card-foreground">Type</th>
                <th className="text-left p-4 font-medium text-card-foreground">Severity</th>
                <th className="text-left p-4 font-medium text-card-foreground">User</th>
                <th className="text-left p-4 font-medium text-card-foreground">Action</th>
                <th className="text-left p-4 font-medium text-card-foreground">Details</th>
                <th className="text-left p-4 font-medium text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/30">
                  <td className="p-4">
                    <div className="text-sm text-muted-foreground">
                      {formatTimestamp(log.timestamp)}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                      {log.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                      {log.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-card-foreground">
                      {log.user}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-card-foreground">
                      {log.action}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-muted-foreground max-w-xs truncate">
                      {log.details}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" title="View Details">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Export">
                        <Icon name="Download" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderThreatDetection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Active Threats</h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
              {threatAlerts.filter(t => t.status === 'active').length} Active
            </span>
          </div>
          <div className="text-3xl font-bold text-red-600 mb-2">3</div>
          <p className="text-sm text-muted-foreground">Immediate attention required</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Blocked Attacks</h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
              Last 24h
            </span>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">1,247</div>
          <p className="text-sm text-muted-foreground">Automatically blocked</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Risk Score</h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-600">
              Medium
            </span>
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">67/100</div>
          <p className="text-sm text-muted-foreground">Based on current threats</p>
        </div>
      </div>

      {/* Threat Alerts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Threat Alerts</h3>
        <div className="space-y-4">
          {threatAlerts.map((threat) => (
            <div key={threat.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                    {threat.severity.toUpperCase()}
                  </span>
                  <h4 className="font-medium text-card-foreground">{threat.type}</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    threat.status === 'active' ? 'bg-red-50 text-red-600' :
                    threat.status === 'blocked' ? 'bg-green-50 text-green-600' :
                    'bg-yellow-50 text-yellow-600'
                  }`}>
                    {threat.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    Investigate
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Source</p>
                  <p className="font-medium">{threat.source}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Target</p>
                  <p className="font-medium">{threat.target}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Attempts</p>
                  <p className="font-medium">{threat.attempts}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Detected</p>
                  <p className="font-medium">{formatTimestamp(threat.detectedAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Compliance Overview</h3>
          <div className="space-y-4">
            {complianceChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    check.status === 'compliant' ? 'bg-green-500' : 
                    check.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-card-foreground">{check.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Score: {check.score}/100 • {check.issues} issues
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  check.status === 'compliant' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {check.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Compliance Actions</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" iconName="FileText" iconPosition="left">
              Generate Compliance Report
            </Button>
            <Button variant="outline" className="w-full justify-start" iconName="Shield" iconPosition="left">
              Run Security Audit
            </Button>
            <Button variant="outline" className="w-full justify-start" iconName="Download" iconPosition="left">
              Export Audit Logs
            </Button>
            <Button variant="outline" className="w-full justify-start" iconName="Settings" iconPosition="left">
              Configure Compliance Rules
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Compliance Issues */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Compliance Issues</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
            <Icon name="AlertCircle" size={20} className="text-red-600" />
            <div className="flex-1">
              <p className="font-medium text-red-800">Data Retention Policy Violation</p>
              <p className="text-sm text-red-600">User data older than 7 years found in archives</p>
              <p className="text-xs text-red-500">ISO 27001 - High Priority</p>
            </div>
            <Button variant="outline" size="sm">
              Resolve
            </Button>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <Icon name="AlertTriangle" size={20} className="text-yellow-600" />
            <div className="flex-1">
              <p className="font-medium text-yellow-800">Missing Privacy Policy Updates</p>
              <p className="text-sm text-yellow-600">Privacy policy not updated for GDPR changes</p>
              <p className="text-xs text-yellow-500">GDPR - Medium Priority</p>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
            <Icon name="Clock" size={20} className="text-orange-600" />
            <div className="flex-1">
              <p className="font-medium text-orange-800">Student Record Access Logging</p>
              <p className="text-sm text-orange-600">FERPA access logs incomplete for Q4 2024</p>
              <p className="text-xs text-orange-500">FERPA - Medium Priority</p>
            </div>
            <Button variant="outline" size="sm">
              Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'security': return renderSecurityOverview();
      case 'audit': return renderAuditLogs();
      case 'threats': return renderThreatDetection();
      case 'compliance': return renderCompliance();
      default: return renderSecurityOverview();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Security & Audit</h2>
          <p className="text-muted-foreground">Monitor security status and audit system activities</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Report
          </Button>
          <Button iconName="Shield" iconPosition="left">
            Run Security Scan
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
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderActiveTab()}
    </div>
  );
};

export default SecurityAudit;