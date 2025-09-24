import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const GlobalSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const tabs = [
    { id: 'general', label: 'General Settings', icon: 'Settings' },
    { id: 'security', label: 'Security & Privacy', icon: 'Shield' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'integrations', label: 'Integrations', icon: 'Zap' },
    { id: 'maintenance', label: 'System Maintenance', icon: 'Wrench' },
    { id: 'branding', label: 'Branding & Customization', icon: 'Palette' }
  ];

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'EduConnect',
    tagline: 'Connecting Education Communities',
    supportEmail: 'support@educonnect.com',
    defaultLanguage: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    enableRegistration: true,
    requireEmailVerification: true,
    enableGuestAccess: false
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireSpecialCharacters: true,
    require2FA: false,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    enableAuditLogs: true,
    dataRetentionPeriod: 7,
    enableGDPRCompliance: true,
    allowDataExport: true
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
    securityAlerts: true,
    maintenanceNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    notificationFrequency: 'immediate'
  });

  // Integration settings
  const integrations = [
    {
      id: 'google-sso',
      name: 'Google SSO',
      description: 'Enable single sign-on with Google accounts',
      status: 'active',
      icon: 'Chrome',
      lastSync: '2024-12-21T10:30:00Z'
    },
    {
      id: 'microsoft-sso',
      name: 'Microsoft SSO',
      description: 'Enable single sign-on with Microsoft accounts',
      status: 'inactive',
      icon: 'Windows',
      lastSync: null
    },
    {
      id: 'linkedin-api',
      name: 'LinkedIn API',
      description: 'Import professional profiles and connections',
      status: 'active',
      icon: 'Linkedin',
      lastSync: '2024-12-21T09:15:00Z'
    },
    {
      id: 'zoom-integration',
      name: 'Zoom Integration',
      description: 'Schedule and manage virtual meetings',
      status: 'active',
      icon: 'Video',
      lastSync: '2024-12-21T08:45:00Z'
    },
    {
      id: 'stripe-payments',
      name: 'Stripe Payments',
      description: 'Process subscription and payment transactions',
      status: 'active',
      icon: 'CreditCard',
      lastSync: '2024-12-21T10:00:00Z'
    },
    {
      id: 'sendgrid-email',
      name: 'SendGrid Email',
      description: 'Send transactional and marketing emails',
      status: 'active',
      icon: 'Mail',
      lastSync: '2024-12-21T09:30:00Z'
    }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' }
  ];

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'EST', label: 'Eastern Time' },
    { value: 'PST', label: 'Pacific Time' },
    { value: 'GMT', label: 'Greenwich Mean Time' },
    { value: 'CET', label: 'Central European Time' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'CAD', label: 'Canadian Dollar' },
    { value: 'AUD', label: 'Australian Dollar' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatLastSync = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const handleSettingChange = (section, key, value) => {
    setHasUnsavedChanges(true);
    if (section === 'general') {
      setGeneralSettings(prev => ({ ...prev, [key]: value }));
    } else if (section === 'security') {
      setSecuritySettings(prev => ({ ...prev, [key]: value }));
    } else if (section === 'notifications') {
      setNotificationSettings(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Saving settings...');
    setHasUnsavedChanges(false);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      {/* Platform Identity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Platform Identity</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Platform Name</label>
            <Input
              value={generalSettings.platformName}
              onChange={(e) => handleSettingChange('general', 'platformName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Tagline</label>
            <Input
              value={generalSettings.tagline}
              onChange={(e) => handleSettingChange('general', 'tagline', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Support Email</label>
            <Input
              type="email"
              value={generalSettings.supportEmail}
              onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Localization */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Localization</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Default Language</label>
            <Select
              options={languageOptions}
              value={generalSettings.defaultLanguage}
              onChange={(value) => handleSettingChange('general', 'defaultLanguage', value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Timezone</label>
            <Select
              options={timezoneOptions}
              value={generalSettings.timezone}
              onChange={(value) => handleSettingChange('general', 'timezone', value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Currency</label>
            <Select
              options={currencyOptions}
              value={generalSettings.currency}
              onChange={(value) => handleSettingChange('general', 'currency', value)}
            />
          </div>
        </div>
      </div>

      {/* User Registration */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">User Registration</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Enable User Registration</h4>
              <p className="text-sm text-muted-foreground">Allow new users to register for accounts</p>
            </div>
            <button
              onClick={() => handleSettingChange('general', 'enableRegistration', !generalSettings.enableRegistration)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                generalSettings.enableRegistration ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                generalSettings.enableRegistration ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Require Email Verification</h4>
              <p className="text-sm text-muted-foreground">Users must verify their email before accessing the platform</p>
            </div>
            <button
              onClick={() => handleSettingChange('general', 'requireEmailVerification', !generalSettings.requireEmailVerification)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                generalSettings.requireEmailVerification ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                generalSettings.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Enable Guest Access</h4>
              <p className="text-sm text-muted-foreground">Allow users to browse content without registration</p>
            </div>
            <button
              onClick={() => handleSettingChange('general', 'enableGuestAccess', !generalSettings.enableGuestAccess)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                generalSettings.enableGuestAccess ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                generalSettings.enableGuestAccess ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      {/* Password Requirements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Password Requirements</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Minimum Length</label>
            <Input
              type="number"
              value={securitySettings.passwordMinLength}
              onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
              min="6"
              max="20"
            />
          </div>
          <div className="flex items-center justify-between pt-6">
            <div>
              <h4 className="font-medium text-card-foreground">Require Special Characters</h4>
              <p className="text-sm text-muted-foreground">Include symbols in passwords</p>
            </div>
            <button
              onClick={() => handleSettingChange('security', 'requireSpecialCharacters', !securitySettings.requireSpecialCharacters)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.requireSpecialCharacters ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                securitySettings.requireSpecialCharacters ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Authentication Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Require Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Mandatory 2FA for all users</p>
            </div>
            <button
              onClick={() => handleSettingChange('security', 'require2FA', !securitySettings.require2FA)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.require2FA ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                securitySettings.require2FA ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Session Timeout (hours)</label>
              <Input
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                min="1"
                max="168"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Max Login Attempts</label>
              <Input
                type="number"
                value={securitySettings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                min="3"
                max="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Lockout Duration (minutes)</label>
              <Input
                type="number"
                value={securitySettings.lockoutDuration}
                onChange={(e) => handleSettingChange('security', 'lockoutDuration', parseInt(e.target.value))}
                min="5"
                max="1440"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data Privacy */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Data Privacy & Compliance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Enable Audit Logs</h4>
              <p className="text-sm text-muted-foreground">Track all user and system activities</p>
            </div>
            <button
              onClick={() => handleSettingChange('security', 'enableAuditLogs', !securitySettings.enableAuditLogs)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.enableAuditLogs ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                securitySettings.enableAuditLogs ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">GDPR Compliance Mode</h4>
              <p className="text-sm text-muted-foreground">Enable European data protection features</p>
            </div>
            <button
              onClick={() => handleSettingChange('security', 'enableGDPRCompliance', !securitySettings.enableGDPRCompliance)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.enableGDPRCompliance ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                securitySettings.enableGDPRCompliance ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Data Retention Period (years)</label>
            <Input
              type="number"
              value={securitySettings.dataRetentionPeriod}
              onChange={(e) => handleSettingChange('security', 'dataRetentionPeriod', parseInt(e.target.value))}
              min="1"
              max="10"
              className="w-32"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {/* Notification Channels */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Notification Channels</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Send notifications via email</p>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', 'emailNotifications', !notificationSettings.emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.emailNotifications ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Push Notifications</h4>
              <p className="text-sm text-muted-foreground">Send browser push notifications</p>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', 'pushNotifications', !notificationSettings.pushNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.pushNotifications ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">SMS Notifications</h4>
              <p className="text-sm text-muted-foreground">Send critical alerts via SMS</p>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', 'smsNotifications', !notificationSettings.smsNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.smsNotifications ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Alert Types */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Alert Types</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">System Alerts</h4>
              <p className="text-sm text-muted-foreground">Server status and performance alerts</p>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', 'systemAlerts', !notificationSettings.systemAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.systemAlerts ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.systemAlerts ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Security Alerts</h4>
              <p className="text-sm text-muted-foreground">Security threats and breaches</p>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', 'securityAlerts', !notificationSettings.securityAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.securityAlerts ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.securityAlerts ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Maintenance Notifications</h4>
              <p className="text-sm text-muted-foreground">Scheduled maintenance and updates</p>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', 'maintenanceNotifications', !notificationSettings.maintenanceNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.maintenanceNotifications ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.maintenanceNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={integration.icon} size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                {integration.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Last Sync:</span>
                <span>{formatLastSync(integration.lastSync)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
                <Button variant="ghost" size="sm">
                  Test Connection
                </Button>
              </div>
              <Button 
                variant={integration.status === 'active' ? 'destructive' : 'default'} 
                size="sm"
              >
                {integration.status === 'active' ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return renderNotificationSettings();
      case 'integrations': return renderIntegrations();
      case 'maintenance': return renderGeneralSettings(); // Placeholder
      case 'branding': return renderGeneralSettings(); // Placeholder
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Global Settings</h2>
          <p className="text-muted-foreground">Configure platform-wide settings and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          {hasUnsavedChanges && (
            <Button variant="outline" onClick={() => setHasUnsavedChanges(false)}>
              Discard Changes
            </Button>
          )}
          <Button 
            onClick={handleSaveSettings}
            disabled={!hasUnsavedChanges}
            iconName="Save" 
            iconPosition="left"
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Unsaved changes banner */}
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-yellow-600" />
            <p className="text-sm font-medium text-yellow-800">You have unsaved changes</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
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

export default GlobalSettings;