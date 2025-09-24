import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from './components/ProtectedRoute';
import FacultyDashboard from './pages/faculty-dashboard';
import AlumniDashboard from './pages/alumni-dashboard';
import RecruiterDashboard from './pages/recruiter-dashboard/RecruiterDashboard';
import StudentDashboard from './pages/student-dashboard/StudentDashboard';
import SuperAdminDashboard from './pages/super-admin-dashboard';
import InstituteAdminDashboard from './pages/institute-admin-dashboard/InstituteAdminDashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/student-dashboard" element={
          <ProtectedRoute allowedRoles={['Student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/alumni-dashboard" element={
          <ProtectedRoute allowedRoles={['Alumni']}>
            <AlumniDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/faculty-dashboard" element={
          <ProtectedRoute allowedRoles={['Faculty']}>
            <FacultyDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/recruiter-dashboard" element={
          <ProtectedRoute allowedRoles={['Recruiter']}>
            <RecruiterDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/institute-admin-dashboard" element={
          <ProtectedRoute allowedRoles={['Institute Admin']}>
            <InstituteAdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/super-admin-dashboard" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
