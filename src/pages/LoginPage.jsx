import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, Shield, Users, Award, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AIChatAssistant from '../components/ui/AIChatAssistant';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    adminType: '',
    institute: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, validCredentials } = useAuth();

  const roles = [
    'Student',
    'Alumni', 
    'Faculty',
    'Recruiter',
    'Admin',
    'Super Admin'
  ];

  const adminTypes = [
    { value: 'institute-admin', label: 'Institute Admin' },
    { value: 'department-admin', label: 'Department Admin' }
  ];

  const departments = [
    { value: 'computer-science', label: 'Computer Science & Engineering' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' }
  ];

  const institutes = [
    { value: 'iit-delhi', label: 'Indian Institute of Technology, Delhi' },
    { value: 'nit-mumbai', label: 'National Institute of Technology, Mumbai' },
    { value: 'bits-pilani', label: 'Birla Institute of Technology and Science, Pilani' },
    { value: 'vit-vellore', label: 'Vellore Institute of Technology, Vellore' },
    { value: 'iisc-bangalore', label: 'Indian Institute of Science, Bangalore' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }
    
    // Admin type validation
    if (formData.role === 'Admin' && !formData.adminType) {
      newErrors.adminType = 'Please select admin type';
    }
    
    // Institute is required for all roles except Super Admin and Recruiter
    if (formData.role && formData.role !== 'Super Admin' && formData.role !== 'Recruiter' && !formData.institute) {
      newErrors.institute = 'Please select your institute';
    }
    
    // Department is required for department admin
    if (formData.role === 'Admin' && formData.adminType === 'department-admin' && !formData.department) {
      newErrors.department = 'Please select your department';
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
      await login(formData.email, formData.password, formData.role, formData.institute, formData.adminType, formData.department);
      
      // Role-based routing
      let route;
      if (formData.role === 'Admin') {
        // Route based on admin type
        if (formData.adminType === 'department-admin') {
          route = '/department-admin-dashboard';
        } else {
          route = '/institute-admin-dashboard';
        }
      } else {
        const roleRoutes = {
          'Student': '/student-dashboard',
          'Alumni': '/alumni-dashboard',
          'Faculty': '/faculty-dashboard', 
          'Recruiter': '/recruiter-dashboard',
          'Super Admin': '/super-admin-dashboard'
        };
        route = roleRoutes[formData.role];
      }
      
      if (route) {
        navigate(route);
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const showInstituteField = formData.role && formData.role !== 'Super Admin' && formData.role !== 'Recruiter';
  
  const showDepartmentField = formData.role === 'Admin' && formData.adminType === 'department-admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-5 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-bounce"></div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your EduConnect account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Enter your email address"
              required
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Your Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white ${
                errors.role ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              required
            >
              <option value="">Choose your role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {errors.role && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.role}
              </p>
            )}
            {formData.role === 'Super Admin' && (
              <p className="mt-2 text-sm text-emerald-600 flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Super Admin detected - Institute selection not required
              </p>
            )}
            {formData.role === 'Recruiter' && (
              <p className="mt-2 text-sm text-blue-600 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Recruiter detected - You can target specific institutes when posting jobs
              </p>
            )}
          </div>

          {/* Admin Type Selection - Only show if role is Admin */}
          {formData.role === 'Admin' && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Type
              </label>
              <select
                name="adminType"
                value={formData.adminType}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white ${
                  errors.adminType ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                required
              >
                <option value="">Choose admin type</option>
                {adminTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.adminType && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.adminType}
                </p>
              )}
              {formData.adminType === 'institute-admin' && (
                <p className="mt-2 text-sm text-blue-600 flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Institute Admin - Please select your institute
                </p>
              )}
            </div>
          )}

          {/* Institute Field - Hidden for Super Admin */}
          {showInstituteField && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Your Institute
              </label>
              <select
                name="institute"
                value={formData.institute}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white ${
                  errors.institute ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                required
              >
                <option value="">Choose your institute</option>
                {institutes.map(institute => (
                  <option key={institute.value} value={institute.value}>
                    {institute.label}
                  </option>
                ))}
              </select>
              {errors.institute && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.institute}
                </p>
              )}
            </div>
          )}

          {/* Department Field - Only show for department admin */}
          {showDepartmentField && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Your Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white ${
                  errors.department ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                required
              >
                <option value="">Choose your department</option>
                {departments.map(dept => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.department}
                </p>
              )}
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In to EduConnect'
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Create your account
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            Demo Login Credentials
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {Object.entries(validCredentials).map(([role, creds]) => {
              // Handle Institute Admin with multiple credentials
              if (Array.isArray(creds)) {
                return creds.map((cred, index) => (
                  <div key={`${role}-${index}`} className="bg-white p-3 rounded-lg border">
                    <p className="font-semibold text-gray-800 mb-1">{role} {index + 1}</p>
                    <p className="text-gray-600">📧 {cred.email}</p>
                    <p className="text-gray-600">🔒 {cred.password}</p>
                    {cred.institute && (
                      <p className="text-gray-600">🏢 {cred.institute}</p>
                    )}
                    {cred.department && (
                      <p className="text-gray-600">🏛️ {cred.department}</p>
                    )}
                  </div>
                ));
              }
              
              return (
                <div key={role} className="bg-white p-3 rounded-lg border">
                  <p className="font-semibold text-gray-800 mb-1">{role}</p>
                  <p className="text-gray-600">📧 {creds.email}</p>
                  <p className="text-gray-600">🔒 {creds.password}</p>
                  {creds.institute && (
                    <p className="text-gray-600">🏢 {creds.institute}</p>
                  )}
                  {creds.department && (
                    <p className="text-gray-600">🏛️ {creds.department}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 flex justify-center space-x-6 text-xs text-gray-500">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-1 text-green-500" />
            Secure Login
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-blue-500" />
            89K+ Users
          </div>
          <div className="flex items-center">
            <Award className="w-4 h-4 mr-1 text-purple-500" />
            Trusted Platform
          </div>
        </div>
      </div>
      
      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
}