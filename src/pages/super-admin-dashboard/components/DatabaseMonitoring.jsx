import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Server, 
  Activity, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const DatabaseMonitoring = () => {
  const [systemStats, setSystemStats] = useState({});
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with actual system monitoring
  useEffect(() => {
    const mockStats = {
      database: {
        status: 'healthy',
        connections: 245,
        maxConnections: 1000,
        responseTime: 142,
        uptime: '99.9%',
        size: '2.4 GB',
        lastBackup: '2024-01-22 02:00:00'
      },
      server: {
        status: 'healthy',
        cpuUsage: 35,
        memoryUsage: 68,
        diskUsage: 42,
        networkIn: '1.2 MB/s',
        networkOut: '800 KB/s',
        uptime: '15 days 8 hours'
      },
      firestore: {
        reads: 15420,
        writes: 3240,
        deletes: 156,
        quota: '50,000 ops/day',
        usedQuota: 18816
      }
    };

    const mockLogs = [
      {
        id: '1',
        timestamp: '2024-01-22 10:30:15',
        level: 'info',
        service: 'Database',
        message: 'Scheduled backup completed successfully',
        details: 'Backup size: 2.4GB, Duration: 45 minutes'
      },
      {
        id: '2',
        timestamp: '2024-01-22 10:15:32',
        level: 'warning',
        service: 'Server',
        message: 'High memory usage detected',
        details: 'Memory usage at 68%, consider scaling'
      },
      {
        id: '3',
        timestamp: '2024-01-22 09:45:22',
        level: 'info',
        service: 'Firestore',
        message: 'Daily quota check completed',
        details: 'Used 37.6% of daily operations quota'
      },
      {
        id: '4',
        timestamp: '2024-01-22 09:30:18',
        level: 'error',
        service: 'Authentication',
        message: 'Failed login attempt',
        details: 'IP: 192.168.1.100, User: unknown@domain.com'
      },
      {
        id: '5',
        timestamp: '2024-01-22 09:15:45',
        level: 'info',
        service: 'API',
        message: 'Rate limit threshold updated',
        details: 'New limit: 1000 requests/hour per user'
      }
    ];
    
    setTimeout(() => {
      setSystemStats(mockStats);
      setLogs(mockLogs);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getLogIcon = (level) => {
    switch (level) {
      case 'info':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 80) return 'bg-red-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Database & System Monitoring</h2>
        <p className="text-gray-600">Monitor system health, performance metrics, and logs</p>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Database Health */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Database className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Database</h3>
            </div>
            {getStatusIcon(systemStats.database?.status)}
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Connections</span>
              <span className="font-medium">
                {systemStats.database?.connections}/{systemStats.database?.maxConnections}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ 
                  width: `${(systemStats.database?.connections / systemStats.database?.maxConnections) * 100}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Response Time</span>
              <span className="font-medium">{systemStats.database?.responseTime}ms</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Uptime</span>
              <span className="font-medium text-green-600">{systemStats.database?.uptime}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Size</span>
              <span className="font-medium">{systemStats.database?.size}</span>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Last Backup</span>
                <span>{systemStats.database?.lastBackup}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Server Health */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Server className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">Server</h3>
            </div>
            {getStatusIcon(systemStats.server?.status)}
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">CPU Usage</span>
                <span className="font-medium">{systemStats.server?.cpuUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getUsageColor(systemStats.server?.cpuUsage)}`}
                  style={{ width: `${systemStats.server?.cpuUsage}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Memory Usage</span>
                <span className="font-medium">{systemStats.server?.memoryUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getUsageColor(systemStats.server?.memoryUsage)}`}
                  style={{ width: `${systemStats.server?.memoryUsage}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Disk Usage</span>
                <span className="font-medium">{systemStats.server?.diskUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getUsageColor(systemStats.server?.diskUsage)}`}
                  style={{ width: `${systemStats.server?.diskUsage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Uptime</span>
                <span>{systemStats.server?.uptime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Firestore Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Firestore</h3>
            </div>
            {getStatusIcon('healthy')}
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Reads Today</span>
              <span className="font-medium">{systemStats.firestore?.reads?.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Writes Today</span>
              <span className="font-medium">{systemStats.firestore?.writes?.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Deletes Today</span>
              <span className="font-medium">{systemStats.firestore?.deletes?.toLocaleString()}</span>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Daily Quota</span>
                <span className="font-medium">
                  {((systemStats.firestore?.usedQuota / 50000) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${(systemStats.firestore?.usedQuota / 50000) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {systemStats.firestore?.usedQuota?.toLocaleString()} / {systemStats.firestore?.quota}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">CPU Usage</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.server?.cpuUsage}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MemoryStick className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Memory</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.server?.memoryUsage}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Disk Usage</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.server?.diskUsage}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Wifi className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Response Time</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.database?.responseTime}ms</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent System Logs</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-0.5">
                  {getLogIcon(log.level)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{log.service}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        log.level === 'error' ? 'bg-red-100 text-red-800' :
                        log.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {log.level.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {log.timestamp}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mt-1">{log.message}</p>
                  
                  {log.details && (
                    <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
              View All Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseMonitoring;