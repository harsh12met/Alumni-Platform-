import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Predefined credentials for each role
const VALID_CREDENTIALS = {
  'Student': {
    email: 'student@edu.com',
    password: 'student123',
    institute: 'iit-delhi'
  },
  'Alumni': {
    email: 'alumni@edu.com',
    password: 'alumni123',
    institute: 'nit-mumbai'
  },
  'Faculty': {
    email: 'faculty@edu.com',
    password: 'faculty123',
    institute: 'bits-pilani'
  },
  'Recruiter': {
    email: 'recruiter@edu.com',
    password: 'recruiter123',
    institute: null // Recruiters don't need institute during login
  },
  'Institute Admin': [
    {
      email: 'instituteadmin@edu.com',
      password: 'admin123',
      adminType: 'institute-admin',
      institute: 'iisc-bangalore'
    },
    {
      email: 'admin@iit.edu',
      password: 'admin123',
      adminType: 'institute-admin', 
      institute: 'iit-delhi'
    },
    {
      email: 'admin@nit.edu',
      password: 'admin123',
      adminType: 'institute-admin',
      institute: 'nit-mumbai'
    }
  ],
  'Department Admin': {
    email: 'deptadmin@edu.com',
    password: 'deptadmin123',
    adminType: 'department-admin',
    institute: 'iisc-bangalore',
    department: 'computer-science'
  },
  'Super Admin': {
    email: 'superadmin@edu.com',
    password: 'superadmin123',
    institute: null // Super Admin doesn't need institute
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('educonnect_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, role, institute, adminType = null, department = null) => {
    // Handle Admin role by checking specific admin types
    let actualRole = role;
    if (role === 'Admin' && adminType) {
      actualRole = adminType === 'institute-admin' ? 'Institute Admin' : 'Department Admin';
    }
    
    const credentialsConfig = VALID_CREDENTIALS[actualRole];
    
    if (!credentialsConfig) {
      throw new Error('Invalid role selected');
    }

    // Handle multiple credentials for Institute Admin
    let credentials = credentialsConfig;
    if (Array.isArray(credentialsConfig)) {
      // Find matching credentials for the selected institute
      credentials = credentialsConfig.find(cred => 
        cred.email === email && cred.institute === institute
      );
      
      if (!credentials) {
        throw new Error('Invalid email or institute combination');
      }
    }

    // Validate credentials
    if (credentials.email !== email || credentials.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Validate admin type for admin roles
    if (role === 'Admin' && credentials.adminType !== adminType) {
      throw new Error('Invalid admin type');
    }

    // Institute validation - only Super Admin and Recruiter don't need institute
    if (actualRole !== 'Super Admin' && actualRole !== 'Recruiter') {
      if (credentials.institute !== institute) {
        throw new Error('Invalid institute selection');
      }
    }

    // Department validation for department admin
    if (actualRole === 'Department Admin' && credentials.department !== department) {
      throw new Error('Invalid department selection');
    }

    const userData = {
      email,
      role: actualRole,
      adminType: role === 'Admin' ? adminType : null,
      institute: (actualRole === 'Super Admin' || actualRole === 'Recruiter') ? null : institute,
      department: actualRole === 'Department Admin' ? department : null,
      name: actualRole,
      loginTime: new Date().toISOString()
    };

    setUser(userData);
    localStorage.setItem('educonnect_user', JSON.stringify(userData));
    
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('educonnect_user');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (requiredRole) => {
    return user?.role === requiredRole;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    loading,
    validCredentials: VALID_CREDENTIALS
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};