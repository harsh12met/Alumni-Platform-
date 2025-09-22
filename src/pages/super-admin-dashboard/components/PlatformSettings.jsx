import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PlatformSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    platformName: 'EduConnect',
    platformDescription: 'Connecting Students, Alumni, Faculty, Recruiters, and Institutes',
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    twoFactorAuthRequired: false,
    maxFileUploadSize: '10',
    sessionTimeout: '30',
    passwordMinLength: '8',
    passwordComplexity: 'medium',
    backupFrequency: 'daily',
    logRetentionDays: '90',
    apiRateLimit: '1000',
    maxConcurrentSessions: '5'
  });

  const tabs = [
    { id: 'general', label: 'General', icon: 'Settings' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'features', label: 'Features', icon: 'Zap' },
    { id: 'integrations', label: 'Integrations', icon: 'Link' },
    { id: 'backup', label: 'Backup & Recovery', icon: 'HardDrive' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  const passwordComplexityOptions = [
    { value: 'low', label: 'Low - Letters only' },
    { value: 'medium', label: 'Medium - Letters and numbers' },
    { value: 'high', label: 'High - Letters, numbers, and symbols' }
  ];

  const backupFrequencyOptions = [
    { value: 'hourly', label: 'Every Hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Handle save logic here
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Platform Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Platform Name"
            value={settings?.platformName}
            onChange={(e) => handleSettingChange('platformName', e?.target?.value)}
          />
          <Input
            label="Platform Description"
            value={settings?.platformDescription}
            onChange={(e) => handleSettingChange('platformDescription', e?.target?.value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">System Settings</h3>
        <div className="space-y-4">
          <Checkbox
            label="Maintenance Mode"
            description="Enable maintenance mode to prevent user access"
            checked={settings?.maintenanceMode}
            onChange={(e) => handleSettingChange('maintenanceMode', e?.target?.checked)}
          />
          <Checkbox
            label="User Registration Enabled"
            description="Allow new users to register on the platform"
            checked={settings?.registrationEnabled}
            onChange={(e) => handleSettingChange('registrationEnabled', e?.target?.checked)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">File Upload Settings</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Max File Upload Size (MB)"
            type="number"
            value={settings?.maxFileUploadSize}
            onChange={(e) => handleSettingChange('maxFileUploadSize', e?.target?.value)}
          />
          <Input
            label="Session Timeout (minutes)"
            type="number"
            value={settings?.sessionTimeout}
            onChange={(e) => handleSettingChange('sessionTimeout', e?.target?.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Authentication Settings</h3>
        <div className="space-y-4">
          <Checkbox
            label="Email Verification Required"
            description="Require users to verify their email address"
            checked={settings?.emailVerificationRequired}
            onChange={(e) => handleSettingChange('emailVerificationRequired', e?.target?.checked)}
          />
          <Checkbox
            label="Two-Factor Authentication Required"
            description="Require 2FA for all user accounts"
            checked={settings?.twoFactorAuthRequired}
            onChange={(e) => handleSettingChange('twoFactorAuthRequired', e?.target?.checked)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Password Policy</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Minimum Password Length"
            type="number"
            value={settings?.passwordMinLength}
            onChange={(e) => handleSettingChange('passwordMinLength', e?.target?.value)}
          />
          <Select
            label="Password Complexity"
            options={passwordComplexityOptions}
            value={settings?.passwordComplexity}
            onChange={(value) => handleSettingChange('passwordComplexity', value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Access Control</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="API Rate Limit (requests/hour)"
            type="number"
            value={settings?.apiRateLimit}
            onChange={(e) => handleSettingChange('apiRateLimit', e?.target?.value)}
          />
          <Input
            label="Max Concurrent Sessions"
            type="number"
            value={settings?.maxConcurrentSessions}
            onChange={(e) => handleSettingChange('maxConcurrentSessions', e?.target?.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderFeatureSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Feature Flags</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Checkbox label="Job Posting Module" checked />
            <Checkbox label="Alumni Network" checked />
            <Checkbox label="Event Management" checked />
            <Checkbox label="Mentorship Program" checked />
            <Checkbox label="Study Materials" checked />
          </div>
          <div className="space-y-4">
            <Checkbox label="Video Interviews" />
            <Checkbox label="AI Recommendations" />
            <Checkbox label="Mobile App API" checked />
            <Checkbox label="Third-party Integrations" checked />
            <Checkbox label="Advanced Analytics" checked />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Module Permissions</h3>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Student Features</h4>
              <div className="space-y-2 text-sm">
                <Checkbox label="Profile Management" checked />
                <Checkbox label="Job Applications" checked />
                <Checkbox label="Alumni Connect" checked />
                <Checkbox label="Study Materials Access" checked />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Recruiter Features</h4>
              <div className="space-y-2 text-sm">
                <Checkbox label="Job Posting" checked />
                <Checkbox label="Candidate Search" checked />
                <Checkbox label="Interview Scheduling" checked />
                <Checkbox label="Analytics Dashboard" checked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">External Integrations</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={20} />
              <div>
                <h4 className="font-medium text-card-foreground">Email Service</h4>
                <p className="text-sm text-muted-foreground">SMTP configuration for email notifications</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-success">Connected</span>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="MessageSquare" size={20} />
              <div>
                <h4 className="font-medium text-card-foreground">SMS Service</h4>
                <p className="text-sm text-muted-foreground">SMS notifications and 2FA</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-warning">Not Connected</span>
              <Button variant="outline" size="sm">Setup</Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Cloud" size={20} />
              <div>
                <h4 className="font-medium text-card-foreground">Cloud Storage</h4>
                <p className="text-sm text-muted-foreground">File storage and CDN</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-success">Connected</span>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="BarChart3" size={20} />
              <div>
                <h4 className="font-medium text-card-foreground">Analytics Service</h4>
                <p className="text-sm text-muted-foreground">Advanced analytics and reporting</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-success">Connected</span>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">API Configuration</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="API Base URL"
            value="https://api.educonnect.com"
            disabled
          />
          <Input
            label="API Version"
            value="v1.0"
            disabled
          />
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Backup Configuration</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Select
            label="Backup Frequency"
            options={backupFrequencyOptions}
            value={settings?.backupFrequency}
            onChange={(value) => handleSettingChange('backupFrequency', value)}
          />
          <Input
            label="Log Retention (days)"
            type="number"
            value={settings?.logRetentionDays}
            onChange={(e) => handleSettingChange('logRetentionDays', e?.target?.value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Backup Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <div>
                <h4 className="font-medium text-card-foreground">Last Backup</h4>
                <p className="text-sm text-muted-foreground">December 21, 2024 at 2:00 AM UTC</p>
              </div>
            </div>
            <Button variant="outline" size="sm">View Details</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Icon name="HardDrive" size={32} className="mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-card-foreground">2.4TB</div>
              <div className="text-sm text-muted-foreground">Total Backup Size</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Icon name="Clock" size={32} className="mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-card-foreground">15min</div>
              <div className="text-sm text-muted-foreground">Last Backup Duration</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Icon name="Shield" size={32} className="mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-card-foreground">30 days</div>
              <div className="text-sm text-muted-foreground">Retention Period</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Recovery Options</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Download Backup
          </Button>
          <Button variant="outline" iconName="RotateCcw" iconPosition="left">
            Restore from Backup
          </Button>
          <Button iconName="Play" iconPosition="left">
            Run Backup Now
          </Button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">System Notifications</h3>
        <div className="space-y-4">
          <Checkbox label="System Health Alerts" checked />
          <Checkbox label="Security Incident Notifications" checked />
          <Checkbox label="Backup Status Updates" checked />
          <Checkbox label="Performance Warnings" checked />
          <Checkbox label="User Activity Alerts" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Email Templates</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-card-foreground">Welcome Email</h4>
              <p className="text-sm text-muted-foreground">Sent to new users after registration</p>
            </div>
            <Button variant="outline" size="sm">Edit Template</Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-card-foreground">Password Reset</h4>
              <p className="text-sm text-muted-foreground">Sent when users request password reset</p>
            </div>
            <Button variant="outline" size="sm">Edit Template</Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-card-foreground">System Maintenance</h4>
              <p className="text-sm text-muted-foreground">Sent before scheduled maintenance</p>
            </div>
            <Button variant="outline" size="sm">Edit Template</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'security': return renderSecuritySettings();
      case 'features': return renderFeatureSettings();
      case 'integrations': return renderIntegrationsSettings();
      case 'backup': return renderBackupSettings();
      case 'notifications': return renderNotificationSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Platform Settings</h2>
          <p className="text-muted-foreground">Configure platform-wide settings and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleSaveSettings}>Save Changes</Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-card-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={20} />
                <span className="text-sm font-medium">{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-card border border-border rounded-lg p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSettings;