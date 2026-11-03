// src/App.tsx
// VANTIQ Master Application Shell
// Modern Layout with Permanent Left Navigation Sidebar & Dashboard Header (BeatAhead style)

import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { FintechProvider } from './context/FintechContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { PwaMobileNav } from './components/layout/PwaMobileNav';

// Dedicated Independent Feature Route Pages
import { DashboardPage } from './pages/DashboardPage';
import { QuantumSolverPage } from './pages/QuantumSolverPage';
import { CashRunwayPage } from './pages/CashRunwayPage';
import { LoginPage } from './pages/LoginPage';
import { UserProfilePage } from './pages/UserProfilePage';

// Scroll to top helper on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};

const AppShell: React.FC = () => {
  return (
    <div className="vantiq-app-container">
      <ScrollToTop />
      <Sidebar />
      
      <div className="vantiq-main-layout">
        <Navbar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <Routes>
            {/* Dashboard / Home Route */}
            <Route path="/" element={<DashboardPage />} />

            {/* Dedicated Independent Feature Pages */}
            <Route path="/quantum-solver" element={<QuantumSolverPage />} />
            <Route path="/cash-runway" element={<CashRunwayPage />} />
            <Route path="/calculator" element={<Navigate to="/" replace />} />
            <Route path="/debt-traps" element={<Navigate to="/" replace />} />
            <Route path="/fee-comparison" element={<Navigate to="/" replace />} />
            <Route path="/security-zk" element={<Navigate to="/" replace />} />
            <Route path="/45s-shield" element={<Navigate to="/" replace />} />

            {/* Clerk Authentication & User Security Profile Routes */}
            <Route path="/login" element={<LoginPage initialMode="sign-in" />} />
            <Route path="/sign-in" element={<LoginPage initialMode="sign-in" />} />
            <Route path="/sign-up" element={<LoginPage initialMode="sign-up" />} />
            <Route path="/register" element={<LoginPage initialMode="sign-up" />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/account" element={<UserProfilePage />} />

            {/* Legacy & Fallback Route Redirects */}
            <Route path="/simulator" element={<Navigate to="/" replace />} />
            <Route path="/ghost-debt" element={<Navigate to="/" replace />} />
            <Route path="/digital-twin" element={<Navigate to="/cash-runway" replace />} />
            <Route path="/comparison" element={<Navigate to="/" replace />} />
            <Route path="/compliance" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <PwaMobileNav />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <FintechProvider>
      <AppShell />
    </FintechProvider>
  );
};

export default App;
