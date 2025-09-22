import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    institute: '',
    role: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Sample institutes data
  const institutes = [
    { value: 'iit-delhi', label: 'Indian Institute of Technology, Delhi' },
    { value: 'nit-mumbai', label: 'National Institute of Technology, Mumbai' },
    { value: 'du-delhi', label: 'Delhi University, Delhi' },
    { value: 'bits-pilani', label: 'Birla Institute of Technology and Science, Pilani' },
    { value: 'vit-vellore', label: 'Vellore Institute of Technology, Vellore' }
  ];

  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'alumni', label: 'Alumni' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'recruiter', label: 'Recruiter' },
    { value: 'institute-admin', label: 'Institute Admin' },
    { value: 'super-admin', label: 'Super Admin' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username is required
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.institute) {
      newErrors.institute = 'Please select an institute';
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Route to appropriate dashboard based on role
      const dashboardRoutes = {
        'student': '/student-dashboard',
        'alumni': '/alumni-dashboard',
        'faculty': '/faculty-dashboard',
        'recruiter': '/recruiter-dashboard',
        'institute-admin': '/institute-admin-dashboard',
        'super-admin': '/super-admin-dashboard'
      };

      navigate(dashboardRoutes[formData.role] || '/student-dashboard');
    } catch (error) {
      setErrors({ submit: 'Login failed. Please check your credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">EduConnect</h1>
              <p className="text-xs sm:text-sm text-gray-500">Education Ecosystem Platform</p>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Sign in to your EduConnect account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Username */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className={errors.username ? 'border-red-500' : ''}
                  iconName="User"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <Icon name="AlertCircle" size={16} />
                    <span>{errors.username}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Institute Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Institute *
              </label>
              <Select
                options={institutes}
                value={formData.institute}
                onChange={(value) => handleInputChange('institute', value)}
                placeholder="Choose your institute"
                className={errors.institute ? 'border-red-500' : ''}
              />
              {errors.institute && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={16} />
                  <span>{errors.institute}</span>
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role *
              </label>
              <Select
                options={roles}
                value={formData.role}
                onChange={(value) => handleInputChange('role', value)}
                placeholder="Choose your role"
                className={errors.role ? 'border-red-500' : ''}
              />
              {errors.role && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={16} />
                  <span>{errors.role}</span>
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-red-500' : ''}
                iconName="Lock"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={16} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                onClick={() => {/* Handle forgot password */}}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-red-600" />
                  <span className="text-sm text-red-600">{errors.submit}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 text-base sm:text-lg font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="LogIn" size={18} />
                  <span>Sign In</span>
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-4 sm:mt-6">
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate('/register')}
              className="py-2.5 sm:py-3 text-base sm:text-lg font-medium"
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name="UserPlus" size={18} />
                <span>Create New Account</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-500 font-medium flex items-center justify-center space-x-1 text-sm sm:text-base"
          >
            <Icon name="ArrowLeft" size={16} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center space-x-2">
            <Icon name="Info" size={16} />
            <span>Demo Credentials</span>
          </h4>
          <div className="text-xs text-yellow-700 space-y-1">
            <p><strong>Student:</strong> student@example.com / Password: 123456</p>
            <p><strong>Alumni:</strong> alumni@example.com / Password: 123456</p>
            <p><strong>Faculty:</strong> faculty@example.com / Password: 123456</p>
            <p><strong>Admin:</strong> admin@example.com / Password: 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;