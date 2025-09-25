import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import AIChatAssistant from '../components/ui/AIChatAssistant';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Account Info
    username: '',
    password: '',
    confirmPassword: '',
    
    // Role & Institute
    role: '',
    adminType: '', // 'institute-admin' or 'department-admin'
    institute: '',
    instituteName: '', // For institute admin to enter new institute
    department: '',
    
    // Role-specific fields
    studentId: '',
    graduationYear: '',
    course: '',
    employeeId: '',
    companyName: '',
    designation: ''
  });
  const [errors, setErrors] = useState({});

  // Sample data
  const institutes = [
    { value: 'iit-delhi', label: 'Indian Institute of Technology, Delhi' },
    { value: 'nit-mumbai', label: 'National Institute of Technology, Mumbai' },
    { value: 'bits-pilani', label: 'Birla Institute of Technology and Science, Pilani' },
    { value: 'vit-vellore', label: 'Vellore Institute of Technology, Vellore' },
    { value: 'iisc-bangalore', label: 'Indian Institute of Science, Bangalore' }
  ];

  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'alumni', label: 'Alumni' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'recruiter', label: 'Recruiter' },
    { value: 'admin', label: 'Admin' }
  ];

  const adminTypes = [
    { value: 'institute-admin', label: 'Institute Admin' },
    { value: 'department-admin', label: 'Department Admin' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
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

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Please select your gender';
    }

    if (step === 2) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 3) {
      if (!formData.role) newErrors.role = 'Please select your role';
      
      // Admin type validation
      if (formData.role === 'admin') {
        if (!formData.adminType) newErrors.adminType = 'Please select admin type';
        
        if (formData.adminType === 'institute-admin') {
          if (!formData.instituteName.trim()) newErrors.instituteName = 'Institute name is required';
          if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
          if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
        }
        
        if (formData.adminType === 'department-admin') {
          if (!formData.institute) newErrors.institute = 'Please select an institute';
          if (!formData.department) newErrors.department = 'Please select a department';
          if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
          if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
        }
      } else {
        // Non-admin roles need institute selection (except recruiters)
        if (formData.role !== 'recruiter' && !formData.institute) {
          newErrors.institute = 'Please select an institute';
        }
      }
      
      // Role-specific validations
      if (formData.role === 'student') {
        if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
        if (!formData.course.trim()) newErrors.course = 'Course/Program is required';
        if (!formData.department) newErrors.department = 'Department is required';
      }
      
      if (formData.role === 'alumni') {
        if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
        if (!formData.department) newErrors.department = 'Department is required';
      }
      
      if (formData.role === 'faculty') {
        if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
      }
      
      if (formData.role === 'recruiter') {
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Route to appropriate dashboard based on role
      const dashboardRoutes = {
        'student': '/student-dashboard',
        'alumni': '/alumni-dashboard',
        'faculty': '/faculty-dashboard',
        'recruiter': '/recruiter-dashboard',
        'admin': '/institute-admin-dashboard' // Both admin types go to institute admin dashboard
      };

      navigate(dashboardRoutes[formData.role] || '/student-dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 font-semibold text-sm sm:text-base ${
            currentStep >= step
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-300 text-gray-400'
          }`}>
            {currentStep > step ? (
              <Icon name="Check" size={16} />
            ) : (
              <span>{step}</span>
            )}
          </div>
          {step < 3 && (
            <div className={`w-8 sm:w-12 h-0.5 ${
              currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Personal Information</h3>
        <p className="text-sm sm:text-base text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <Input
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={errors.firstName ? 'border-red-500' : ''}
            iconName="User"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <Input
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={errors.lastName ? 'border-red-500' : ''}
            iconName="User"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
          iconName="Mail"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
        <Input
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={errors.phone ? 'border-red-500' : ''}
          iconName="Phone"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={errors.dateOfBirth ? 'border-red-500' : ''}
            iconName="Calendar"
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
          <Select
            options={genderOptions}
            value={formData.gender}
            onChange={(value) => handleInputChange('gender', value)}
            placeholder="Select gender"
            className={errors.gender ? 'border-red-500' : ''}
          />
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Account Setup</h3>
        <p className="text-sm sm:text-base text-gray-600">Create your login credentials</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
        <Input
          placeholder="Choose a unique username"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          className={errors.username ? 'border-red-500' : ''}
          iconName="AtSign"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">Username must be at least 3 characters long</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
        <Input
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className={errors.password ? 'border-red-500' : ''}
          iconName="Lock"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters long</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
        <Input
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          className={errors.confirmPassword ? 'border-red-500' : ''}
          iconName="Lock"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Role & Institute</h3>
        <p className="text-sm sm:text-base text-gray-600">Tell us about your role and institution</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Role *</label>
        <Select
          options={roles}
          value={formData.role}
          onChange={(value) => handleInputChange('role', value)}
          placeholder="Choose your role"
          className={errors.role ? 'border-red-500' : ''}
        />
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role}</p>
        )}
      </div>

      {/* Admin Type Selection - Only show if role is admin */}
      {formData.role === 'admin' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Admin Type *</label>
          <Select
            options={adminTypes}
            value={formData.adminType}
            onChange={(value) => handleInputChange('adminType', value)}
            placeholder="Choose admin type"
            className={errors.adminType ? 'border-red-500' : ''}
          />
          {errors.adminType && (
            <p className="mt-1 text-sm text-red-600">{errors.adminType}</p>
          )}
        </div>
      )}

      {/* Institute Selection - Show for non-admin roles (except recruiters) or department admin */}
      {((formData.role && formData.role !== 'admin' && formData.role !== 'recruiter') || (formData.role === 'admin' && formData.adminType === 'department-admin')) ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Institute *</label>
          <Select
            options={institutes}
            value={formData.institute}
            onChange={(value) => handleInputChange('institute', value)}
            placeholder="Choose your institute"
            className={errors.institute ? 'border-red-500' : ''}
          />
          {errors.institute && (
            <p className="mt-1 text-sm text-red-600">{errors.institute}</p>
          )}
        </div>
      ) : null}

      {/* Institute Name Input - Only show for institute admin */}
      {formData.role === 'admin' && formData.adminType === 'institute-admin' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Institute Name *</label>
          <Input
            placeholder="Enter your institute name"
            value={formData.instituteName}
            onChange={(e) => handleInputChange('instituteName', e.target.value)}
            className={errors.instituteName ? 'border-red-500' : ''}
            iconName="Building2"
          />
          {errors.instituteName && (
            <p className="mt-1 text-sm text-red-600">{errors.instituteName}</p>
          )}
        </div>
      )}

      {/* Role-specific fields */}
      {formData.role && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Additional Information</h4>
          
          {/* Department Selection - For students, alumni, faculty, and department admin */}
          {(formData.role === 'student' || formData.role === 'alumni' || formData.role === 'faculty' || 
            (formData.role === 'admin' && formData.adminType === 'department-admin')) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
              <Select
                options={departments}
                value={formData.department}
                onChange={(value) => handleInputChange('department', value)}
                placeholder="Select your department"
                className={errors.department ? 'border-red-500' : ''}
              />
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
              )}
            </div>
          )}

          {formData.role === 'student' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                <Input
                  placeholder="Enter your student ID"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className={errors.studentId ? 'border-red-500' : ''}
                  iconName="Hash"
                />
                {errors.studentId && (
                  <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course/Program *</label>
                <Input
                  placeholder="e.g., B.Tech Computer Science"
                  value={formData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  className={errors.course ? 'border-red-500' : ''}
                  iconName="BookOpen"
                />
                {errors.course && (
                  <p className="mt-1 text-sm text-red-600">{errors.course}</p>
                )}
              </div>
            </>
          )}

          {formData.role === 'alumni' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
              <Input
                type="number"
                placeholder="e.g., 2023"
                value={formData.graduationYear}
                onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                className={errors.graduationYear ? 'border-red-500' : ''}
                iconName="Calendar"
                min="1990"
                max={new Date().getFullYear()}
              />
              {errors.graduationYear && (
                <p className="mt-1 text-sm text-red-600">{errors.graduationYear}</p>
              )}
            </div>
          )}

          {/* Employee ID and Designation - For faculty and admin roles */}
          {(formData.role === 'faculty' || formData.role === 'admin') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID *</label>
                <Input
                  placeholder="Enter your employee ID"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  className={errors.employeeId ? 'border-red-500' : ''}
                  iconName="Hash"
                />
                {errors.employeeId && (
                  <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
                <Input
                  placeholder={formData.role === 'admin' ? 
                    (formData.adminType === 'institute-admin' ? 'e.g., Institute Director, Principal' : 'e.g., HOD, Department Admin') :
                    'e.g., Professor, Assistant Professor'
                  }
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className={errors.designation ? 'border-red-500' : ''}
                  iconName="Briefcase"
                />
                {errors.designation && (
                  <p className="mt-1 text-sm text-red-600">{errors.designation}</p>
                )}
              </div>
            </>
          )}

          {formData.role === 'recruiter' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <Input
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className={errors.companyName ? 'border-red-500' : ''}
                  iconName="Building2"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
                <Input
                  placeholder="e.g., HR Manager, Talent Acquisition"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className={errors.designation ? 'border-red-500' : ''}
                  iconName="Briefcase"
                />
                {errors.designation && (
                  <p className="mt-1 text-sm text-red-600">{errors.designation}</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );

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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Join the EduConnect community</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          {renderStepIndicator()}
          
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 sm:mt-8">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="px-4 sm:px-6 py-2 text-sm sm:text-base"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="ArrowLeft" size={16} />
                    <span>Previous</span>
                  </div>
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base"
                >
                  <div className="flex items-center space-x-2">
                    <span>Next</span>
                    <Icon name="ArrowRight" size={16} />
                  </div>
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Icon name="UserPlus" size={16} />
                      <span>Create Account</span>
                    </div>
                  )}
                </Button>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-red-600" />
                  <span className="text-sm text-red-600">{errors.submit}</span>
                </div>
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-4 sm:mt-6 text-center">
            <span className="text-sm sm:text-base text-gray-600">Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-500 font-medium text-sm sm:text-base"
            >
              Sign in here
            </button>
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
      </div>
      
      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
};

export default RegisterPage;