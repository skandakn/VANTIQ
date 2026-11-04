// src/components/layout/Navbar.tsx
// Modern Top Dashboard Header Bar (BeatAhead Style) with PWA Install Controller
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X,
  Settings,
  Download,
  CheckCircle2
} from 'lucide-react';
import { UserButton, useUser, useClerk } from '@clerk/react';
import { SignedIn, SignedOut } from '../../config/clerk';
import { useFintech } from '../../context/FintechContext';
import { usePwa } from '../../context/PwaContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    isSidebarOpen, 
    setIsSidebarOpen
  } = useFintech();

  const { isInstalled, promptInstall } = usePwa();
  const { user } = useUser();
  const { signOut } = useClerk();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/quantum-solver':
        return 'Emergency Funding Plan';
      case '/cash-runway':
        return '90-Day Digital Twin Cash Runway';
      case '/profile':
        return 'User Security Profile & Settings';
      default:
        return '';
    }
  };

  const displayName = user?.fullName || user?.firstName || 'My Account';
  const initialLetter = displayName.charAt(0).toUpperCase() || 'M';
  const pageTitle = getPageTitle();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 990,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '68px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Left: Mobile Toggle & Page Title (Empty on Home Dashboard) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Hamburger Toggle for Left Sidebar */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="dashboard-menu-toggle"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open features sidebar'}
          style={{
            border: '1px solid var(--border-medium, #d0d7cc)',
            backgroundColor: 'var(--bg-deep, #f4f5f1)',
            borderRadius: '8px',
            padding: '7px 9px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--wise-forest, #163300)',
          }}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {pageTitle && (
          <div>
            <h1
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {pageTitle}
            </h1>
          </div>
        )}
      </div>

      {/* Right Area: Install Option, Settings & User Profile Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        
        {/* PWA Install Option Button */}
        {!isInstalled ? (
          <button
            onClick={() => promptInstall()}
            className="pwa-install-header-btn"
            title="Install VANTIQ Desktop / Mobile Progressive Web App"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 15px',
              borderRadius: '9999px',
              backgroundColor: 'var(--wise-forest, #163300)',
              color: 'var(--wise-lime, #9fe870)',
              border: 'none',
              fontSize: '0.80rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 2px 6px rgba(22, 51, 0, 0.12)',
            }}
          >
            <Download size={14} strokeWidth={2.5} />
            <span>Install App</span>
          </button>
        ) : (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 12px',
              borderRadius: '9999px',
              backgroundColor: '#eef5ea',
              border: '1px solid #c9dec2',
              color: '#15803d',
              fontSize: '0.74rem',
              fontWeight: 700,
            }}
            title="VANTIQ Running in Installed App Mode"
          >
            <CheckCircle2 size={13} />
            <span>Installed</span>
          </span>
        )}

        {/* Settings Gear Button */}
        <button
          onClick={() => navigate('/profile')}
          title="Account Settings"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
          }}
        >
          <Settings size={18} />
        </button>

        {/* User Profile Info & Sign Out */}
        <SignedIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserButton userProfileMode="navigation" userProfileUrl="/profile" />
            <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>
              {displayName}
            </span>
            <button
              onClick={() => signOut()}
              style={{
                background: 'none',
                border: 'none',
                color: '#dc2626',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '2px 4px',
                marginLeft: '4px',
              }}
            >
              Sign Out
            </button>
          </div>
        </SignedIn>

        <SignedOut>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
              }}
            >
              {initialLetter}
            </div>
            <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>
              {displayName}
            </span>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#dc2626',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '2px 4px',
                marginLeft: '4px',
              }}
            >
              Sign Out
            </button>
          </div>
        </SignedOut>
      </div>

      <style>{`
        .pwa-install-header-btn:hover {
          background-color: #244b05 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(22, 51, 0, 0.20) !important;
        }
        @media (max-width: 1023px) {
          .dashboard-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
