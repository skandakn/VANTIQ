// src/components/layout/Navbar.tsx
// Modern Top Dashboard Header Bar (BeatAhead Style)
// All feature links moved to the persistent Left Sidebar
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X,
  Settings,
  Globe,
  ChevronDown
} from 'lucide-react';
import { UserButton, useUser, useClerk } from '@clerk/react';
import { SignedIn, SignedOut } from '../../config/clerk';
import { useFintech } from '../../context/FintechContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    isSidebarOpen, 
    setIsSidebarOpen
  } = useFintech();

  const [selectedCurrency, setSelectedCurrency] = useState<'INR' | 'USD' | 'GBP'>('INR');
  const { user } = useUser();
  const { signOut } = useClerk();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/calculator':
        return 'Cardiovascular Emergency Calculator';
      case '/debt-traps':
        return 'Ghost Debt Traps & Mesh Radar';
      case '/quantum-solver':
        return 'Quantum Rescue Solver';
      case '/cash-runway':
        return '90-Day Digital Twin Cash Runway';
      case '/fee-comparison':
        return 'Counterfactual Fee Comparison';
      case '/security-zk':
        return 'Zero-Knowledge Security & Privacy';
      case '/45s-shield':
        return '45-Second Neuro-Adaptive Shield';
      case '/profile':
        return 'User Security Profile & Settings';
      default:
        return 'Cardiovascular Health Dashboard';
    }
  };

  const displayName = user?.fullName || user?.firstName || 'Skanda K N';
  const initialLetter = displayName.charAt(0).toUpperCase() || 'S';

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
      {/* Left: Mobile Toggle & Page Title */}
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
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right Area: Currency Switcher, Language Switcher, Settings, User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Currency Switcher Pill */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#f1f5f9', 
            borderRadius: '9999px', 
            padding: '2px',
            border: '1px solid #e2e8f0',
          }}
        >
          {(['INR', 'USD', 'GBP'] as const).map((curr) => {
            const isCurrActive = selectedCurrency === curr;
            return (
              <button
                key={curr}
                onClick={() => setSelectedCurrency(curr)}
                style={{
                  border: 'none',
                  background: isCurrActive ? '#0f172a' : 'transparent',
                  color: isCurrActive ? '#ffffff' : '#64748b',
                  fontWeight: isCurrActive ? 700 : 500,
                  fontSize: '0.72rem',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {curr === 'INR' ? '₹ INR' : curr === 'USD' ? '$ USD' : '£ GBP'}
              </button>
            );
          })}
        </div>

        {/* Language Switcher Dropdown (Matching BeatAhead reference screenshot) */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#475569',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '6px 8px',
              borderRadius: '8px',
            }}
          >
            <Globe size={15} color="#64748b" />
            <span>English</span>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {langDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                zIndex: 100,
                minWidth: '120px',
                padding: '4px 0',
              }}
            >
              {['English', 'Hindi', 'Spanish'].map((lang) => (
                <div
                  key={lang}
                  onClick={() => setLangDropdownOpen(false)}
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.82rem',
                    color: '#0f172a',
                    cursor: 'pointer',
                    fontWeight: lang === 'English' ? 700 : 500,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>

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

        {/* User Profile Info & Sign Out (Matching BeatAhead reference screenshot) */}
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
