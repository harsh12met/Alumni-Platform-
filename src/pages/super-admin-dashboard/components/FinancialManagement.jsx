import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const FinancialManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('12m');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'overview', label: 'Financial Overview', icon: 'DollarSign' },
    { id: 'subscriptions', label: 'Subscriptions', icon: 'CreditCard' },
    { id: 'transactions', label: 'Transactions', icon: 'Receipt' },
    { id: 'invoices', label: 'Invoices', icon: 'FileText' },
    { id: 'reports', label: 'Financial Reports', icon: 'BarChart' }
  ];

  const timeRangeOptions = [
    { value: '1m', label: 'Last Month' },
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '12m', label: 'Last 12 Months' },
    { value: '24m', label: 'Last 2 Years' }
  ];

  // Financial metrics
  const financialMetrics = [
    {
      title: 'Total Revenue',
      value: '$2,847,320',
      change: '+15.2%',
      trend: 'up',
      period: 'vs last year',
      icon: 'DollarSign',
      color: 'green'
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '$234,560',
      change: '+8.7%',
      trend: 'up',
      period: 'vs last month',
      icon: 'Repeat',
      color: 'blue'
    },
    {
      title: 'Active Subscriptions',
      value: '1,847',
      change: '+12.3%',
      trend: 'up',
      period: 'vs last month',
      icon: 'CreditCard',
      color: 'purple'
    },
    {
      title: 'Average Revenue Per User',
      value: '$127.45',
      change: '+3.2%',
      trend: 'up',
      period: 'vs last month',
      icon: 'User',
      color: 'orange'
    }
  ];

  // Revenue data for charts
  const revenueData = [
    { month: 'Jan', revenue: 185000, subscriptions: 142, expenses: 67000 },
    { month: 'Feb', revenue: 198000, subscriptions: 148, expenses: 72000 },
    { month: 'Mar', revenue: 215000, subscriptions: 156, expenses: 75000 },
    { month: 'Apr', revenue: 207000, subscriptions: 153, expenses: 71000 },
    { month: 'May', revenue: 225000, subscriptions: 162, expenses: 78000 },
    { month: 'Jun', revenue: 242000, subscriptions: 168, expenses: 82000 },
    { month: 'Jul', revenue: 259000, subscriptions: 175, expenses: 85000 },
    { month: 'Aug', revenue: 267000, subscriptions: 181, expenses: 88000 },
    { month: 'Sep', revenue: 275000, subscriptions: 187, expenses: 91000 },
    { month: 'Oct', revenue: 289000, subscriptions: 194, expenses: 95000 },
    { month: 'Nov', revenue: 296000, subscriptions: 201, expenses: 98000 },
    { month: 'Dec', revenue: 312000, subscriptions: 208, expenses: 102000 }
  ];

  const subscriptionPlans = [
    { name: 'Basic', value: 35, color: '#3B82F6' },
    { name: 'Premium', value: 45, color: '#10B981' },
    { name: 'Enterprise', value: 20, color: '#8B5CF6' }
  ];

  // Subscription data
  const subscriptions = [
    {
      id: 1,
      institute: 'MIT',
      plan: 'Enterprise',
      status: 'active',
      amount: '$2,999/month',
      nextBilling: '2025-01-15',
      users: 12450,
      startDate: '2023-01-15',
      features: ['Unlimited Users', 'Priority Support', 'Custom Branding', 'API Access']
    },
    {
      id: 2,
      institute: 'Stanford University',
      plan: 'Premium',
      status: 'active',
      amount: '$999/month',
      nextBilling: '2025-01-20',
      users: 8920,
      startDate: '2023-02-20',
      features: ['Up to 10,000 Users', 'Standard Support', 'Analytics Dashboard']
    },
    {
      id: 3,
      institute: 'UC Berkeley',
      plan: 'Basic',
      status: 'trial',
      amount: '$299/month',
      nextBilling: '2024-12-30',
      users: 2340,
      startDate: '2024-12-15',
      features: ['Up to 5,000 Users', 'Basic Support', 'Standard Features']
    },
    {
      id: 4,
      institute: 'Harvard University',
      plan: 'Premium',
      status: 'past_due',
      amount: '$999/month',
      nextBilling: '2024-12-10 (Overdue)',
      users: 7650,
      startDate: '2023-03-10',
      features: ['Up to 10,000 Users', 'Standard Support', 'Analytics Dashboard']
    }
  ];

  // Transaction data
  const transactions = [
    {
      id: 'TXN-2024-001',
      institute: 'MIT',
      type: 'subscription',
      amount: '$2,999.00',
      status: 'completed',
      date: '2024-12-15T10:30:00Z',
      method: 'Credit Card',
      description: 'Enterprise Plan - December 2024'
    },
    {
      id: 'TXN-2024-002',
      institute: 'Stanford University',
      type: 'subscription',
      amount: '$999.00',
      status: 'completed',
      date: '2024-12-20T14:15:00Z',
      method: 'Bank Transfer',
      description: 'Premium Plan - December 2024'
    },
    {
      id: 'TXN-2024-003',
      institute: 'Harvard University',
      type: 'subscription',
      amount: '$999.00',
      status: 'failed',
      date: '2024-12-10T09:00:00Z',
      method: 'Credit Card',
      description: 'Premium Plan - December 2024'
    },
    {
      id: 'TXN-2024-004',
      institute: 'Carnegie Mellon',
      type: 'setup_fee',
      amount: '$500.00',
      status: 'completed',
      date: '2024-12-18T16:45:00Z',
      method: 'Credit Card',
      description: 'Initial Setup Fee'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'trial': return 'text-blue-600 bg-blue-50';
      case 'past_due': return 'text-red-600 bg-red-50';
      case 'cancelled': return 'text-gray-600 bg-gray-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'refunded': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderFinancialOverview = () => (
    <div className="space-y-6">
      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold text-card-foreground">{metric.value}</p>
                <p className={`text-xs flex items-center mt-1 ${
                  metric.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  <Icon name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} className="mr-1" />
                  {metric.change} {metric.period}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                metric.color === 'green' ? 'bg-green-100' :
                metric.color === 'blue' ? 'bg-blue-100' :
                metric.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
              }`}>
                <Icon name={metric.icon} size={24} className={
                  metric.color === 'green' ? 'text-green-600' :
                  metric.color === 'blue' ? 'text-blue-600' :
                  metric.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                } />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Revenue Trend</h3>
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              className="w-32"
            />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscription Plans Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Subscription Plans</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subscriptionPlans}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionPlans.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue vs Expenses */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Revenue vs Expenses</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="space-y-6">
      {/* Subscription Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
              <p className="text-2xl font-bold text-card-foreground">1,847</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Trial Subscriptions</p>
              <p className="text-2xl font-bold text-card-foreground">23</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Past Due</p>
              <p className="text-2xl font-bold text-card-foreground">7</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-card-foreground">Institute</th>
                <th className="text-left p-4 font-medium text-card-foreground">Plan</th>
                <th className="text-left p-4 font-medium text-card-foreground">Status</th>
                <th className="text-left p-4 font-medium text-card-foreground">Amount</th>
                <th className="text-left p-4 font-medium text-card-foreground">Users</th>
                <th className="text-left p-4 font-medium text-card-foreground">Next Billing</th>
                <th className="text-left p-4 font-medium text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-muted/30">
                  <td className="p-4">
                    <div className="font-medium text-card-foreground">{subscription.institute}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      subscription.plan === 'Enterprise' ? 'bg-purple-50 text-purple-600' :
                      subscription.plan === 'Premium' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
                    }`}>
                      {subscription.plan}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                      {subscription.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-card-foreground">{subscription.amount}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-card-foreground">{subscription.users.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-muted-foreground">{subscription.nextBilling}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" title="View Details">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="More">
                        <Icon name="MoreHorizontal" size={16} />
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

  const renderTransactions = () => (
    <div className="space-y-6">
      {/* Transaction Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'subscription', label: 'Subscriptions' },
              { value: 'setup_fee', label: 'Setup Fees' },
              { value: 'refund', label: 'Refunds' }
            ]}
            className="w-48"
          />
          <Select
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'completed', label: 'Completed' },
              { value: 'failed', label: 'Failed' },
              { value: 'pending', label: 'Pending' }
            ]}
            className="w-48"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-card-foreground">Transaction ID</th>
                <th className="text-left p-4 font-medium text-card-foreground">Institute</th>
                <th className="text-left p-4 font-medium text-card-foreground">Type</th>
                <th className="text-left p-4 font-medium text-card-foreground">Amount</th>
                <th className="text-left p-4 font-medium text-card-foreground">Status</th>
                <th className="text-left p-4 font-medium text-card-foreground">Date</th>
                <th className="text-left p-4 font-medium text-card-foreground">Method</th>
                <th className="text-left p-4 font-medium text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-muted/30">
                  <td className="p-4">
                    <div className="font-medium text-card-foreground">{transaction.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-card-foreground">{transaction.institute}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                      {transaction.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-card-foreground">{transaction.amount}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-muted-foreground">{formatDate(transaction.date)}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-card-foreground">{transaction.method}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" title="View Receipt">
                        <Icon name="Receipt" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Refund">
                        <Icon name="RotateCcw" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="More">
                        <Icon name="MoreHorizontal" size={16} />
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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview': return renderFinancialOverview();
      case 'subscriptions': return renderSubscriptions();
      case 'transactions': return renderTransactions();
      case 'invoices': return renderTransactions(); // Similar structure
      case 'reports': return renderFinancialOverview(); // Similar to overview with more reports
      default: return renderFinancialOverview();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Financial Management</h2>
          <p className="text-muted-foreground">Monitor revenue, subscriptions, and financial performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Report
          </Button>
          <Button iconName="Plus" iconPosition="left">
            Create Invoice
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

export default FinancialManagement;