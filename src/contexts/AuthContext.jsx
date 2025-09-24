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
    institute: 'vit-vellore'
  },
  'Institute Admin': {
    email: 'admin@edu.com',
    password: 'admin123',
    institute: 'iisc-bangalore'
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

  const login = (email, password, role, institute) => {
    const credentials = VALID_CREDENTIALS[role];
    
    if (!credentials) {
      throw new Error('Invalid role selected');
    }

    // Validate credentials
    if (credentials.email !== email || credentials.password !== password) {
      throw new Error('Invalid email or password');
    }

    // For Super Admin, institute is not required
    if (role !== 'Super Admin' && credentials.institute !== institute) {
      throw new Error('Invalid institute selection');
    }

    const userData = {
      email,
      role,
      institute: role === 'Super Admin' ? null : institute,
      name: role,
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