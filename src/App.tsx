// src/App.tsx
// VANTIQ Master Application Shell
// Fully independent route-level architecture for all 7 fintech features + unified dashboard.

import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { FintechProvider, useFintech } from './context/FintechContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { PwaMobileNav } from './components/layout/PwaMobileNav';
import { NeuroAdaptiveShieldModal } from './modules/m08_neuro_shield/NeuroAdaptiveShieldModal';

// Dedicated Independent Feature Route Pages (built by SaiArvind18)
import { DashboardPage } from './pages/DashboardPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { QuantumSolverPage } from './pages/QuantumSolverPage';
import { CashRunwayPage } from './pages/CashRunwayPage';
import { FeeComparisonPage } from './pages/FeeComparisonPage';
import { SecurityZkPage } from './pages/SecurityZkPage';
import { ShieldPage } from './pages/ShieldPage';
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
  const { isSidebarOpen } = useFintech();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <Navbar />
      <Sidebar />
      
      <div 
        className={`vantiq-body-content ${isSidebarOpen ? 'sidebar-expanded' : ''}`}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Dashboard / Home Route */}
            <Route path="/" element={<DashboardPage />} />

            {/* Dedicated 7 Independent Feature Pages */}
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/debt-traps" element={<Navigate to="/calculator" replace />} />
            <Route path="/quantum-solver" element={<QuantumSolverPage />} />
            <Route path="/cash-runway" element={<CashRunwayPage />} />
            <Route path="/fee-comparison" element={<FeeComparisonPage />} />
            <Route path="/security-zk" element={<SecurityZkPage />} />
            <Route path="/45s-shield" element={<ShieldPage />} />

            {/* Clerk Authentication & User Security Profile Routes */}
            <Route path="/login" element={<LoginPage initialMode="sign-in" />} />
            <Route path="/sign-in" element={<LoginPage initialMode="sign-in" />} />
            <Route path="/sign-up" element={<LoginPage initialMode="sign-up" />} />
            <Route path="/register" element={<LoginPage initialMode="sign-up" />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/account" element={<UserProfilePage />} />

            {/* Legacy & Fallback Route Redirects */}
            <Route path="/simulator" element={<Navigate to="/calculator" replace />} />
            <Route path="/ghost-debt" element={<Navigate to="/debt-traps" replace />} />
            <Route path="/digital-twin" element={<Navigate to="/cash-runway" replace />} />
            <Route path="/comparison" element={<Navigate to="/fee-comparison" replace />} />
            <Route path="/compliance" element={<Navigate to="/security-zk" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <PwaMobileNav />
      </div>

      <NeuroAdaptiveShieldModal />
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
