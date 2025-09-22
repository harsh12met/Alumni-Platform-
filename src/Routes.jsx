import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FacultyDashboard from './pages/faculty-dashboard';
import AlumniDashboard from './pages/alumni-dashboard';
import RecruiterDashboard from './pages/recruiter-dashboard';
import StudentDashboard from './pages/student-dashboard';
import SuperAdminDashboard from './pages/super-admin-dashboard';
import InstituteAdminDashboard from './pages/institute-admin-dashboard';

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
        
        {/* Dashboard Routes */}
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="/institute-admin-dashboard" element={<InstituteAdminDashboard />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
