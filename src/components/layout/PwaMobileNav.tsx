// src/components/layout/PwaMobileNav.tsx
// PWA Installation Controller & Mobile-First Bottom Navigation Bar
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Banknote,
  Activity, 
  Hourglass,
  Download, 
  X, 
  Smartphone, 
  User,
  WifiOff
} from 'lucide-react';
import { SignedIn, SignedOut } from '../../config/clerk';
import { usePwa } from '../../context/PwaContext';

export const PwaMobileNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isInstalled, isIos, promptInstall, isOffline } = usePwa();
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(true);
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);

  const navItems = [
    {
      id: 'overview',
      name: 'Overview',
      path: '/',
      icon: LayoutDashboard,
      color: '#15803d',
    },
    {
      id: 'fund-finder',
      name: 'Fund Finder',
      path: '/fund-finder',
      icon: Banknote,
      color: '#15803d',
    },
    {
      id: 'cash-runway',
      name: 'Runway',
      path: '/cash-runway',
      icon: Activity,
      color: '#15803d',
    },
    {
      id: 'life-energy',
      name: 'Life Energy',
      path: '/life-energy',
      icon: Hourglass,
      color: '#15803d',
    },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.id === 'fund-finder') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById('health-navigator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.getElementById('health-navigator');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.id === 'life-energy') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById('life-energy');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.getElementById('life-energy');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(item.path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* =========================================================
          1. Offline Resilience Status Alert Pill
          ========================================================= */}
      {isOffline && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: '72px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1200,
            backgroundColor: '#163300',
            color: '#9fe870',
            padding: '8px 18px',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px rgba(22, 51, 0, 0.25)',
            fontSize: '0.80rem',
            fontWeight: 700,
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <WifiOff size={15} />
          <span>Offline Mode Active — Local models & cached data operational</span>
        </div>
      )}

      {/* =========================================================
          2. PWA Floating Install Banner (Mobile & Desktop)
          ========================================================= */}
      {!isInstalled && showInstallBanner && (
        <aside
          aria-label="PWA Install Prompt"
          style={{
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)',
            maxWidth: '480px',
            zIndex: 1100,
            backgroundColor: '#ffffff',
            border: '1.5px solid #d0d7cc',
            borderRadius: '18px',
            padding: '14px 18px',
            boxShadow: '0 16px 40px rgba(22, 51, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--wise-forest, #163300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--wise-lime, #9fe870)',
                flexShrink: 0,
              }}
            >
              <Smartphone size={20} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--wise-forest, #163300)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Install VANTIQ App
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #425444)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Fast offline access & emergency financial shielding
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button
              onClick={() => {
                if (isIos) {
                  setShowIosGuide(true);
                } else {
                  promptInstall();
                }
              }}
              className="btn btn-primary"
              style={{
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 800,
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--wise-forest, #163300)',
                color: 'var(--wise-lime, #9fe870)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Download size={14} />
              <span>Install</span>
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted, #6b7f6e)',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Dismiss banner"
            >
              <X size={18} />
            </button>
          </div>
        </aside>
      )}

      {/* =========================================================
          3. iOS Add to Home Screen Instructions Modal
          ========================================================= */}
      {showIosGuide && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1300,
            backgroundColor: 'rgba(22, 51, 0, 0.45)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowIosGuide(false)}
        >
          <div
            className="vantiq-card"
            style={{
              maxWidth: '380px',
              width: '100%',
              padding: '28px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #d0d7cc',
              textAlign: 'center',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(22, 51, 0, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📲</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--wise-forest, #163300)', marginBottom: '10px' }}>
              Install on iOS / Safari
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary, #425444)', lineHeight: 1.6, marginBottom: '20px' }}>
              1. Tap the <strong>Share</strong> button <span style={{ fontSize: '1.1rem' }}>⎋</span> at the bottom of Safari.<br />
              2. Scroll down and select <strong>"Add to Home Screen"</strong> ⊕.<br />
              3. Tap <strong>Add</strong> to use VANTIQ as a standalone native app!
            </p>
            <button
              onClick={() => setShowIosGuide(false)}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '9999px',
                backgroundColor: 'var(--wise-forest, #163300)',
                color: 'var(--wise-lime, #9fe870)',
                border: 'none',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          4. Mobile-First Bottom Floating HUD Navigation Bar
          ========================================================= */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="mobile-bottom-hud"
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '520px',
          zIndex: 1000,
          backgroundColor: '#ffffff',
          border: '1.5px solid #d0d7cc',
          borderRadius: '24px',
          padding: '6px 10px',
          boxShadow: '0 12px 35px rgba(22, 51, 0, 0.10), 0 2px 6px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === 'overview'
              ? location.pathname === '/' && !location.hash.includes('health-navigator')
              : item.id === 'fund-finder'
                ? location.hash.includes('health-navigator') || location.pathname === '/fund-finder'
                : location.pathname === item.path;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: '10px',
                  color: isActive ? 'var(--wise-forest, #163300)' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? '#eef5ea' : 'transparent',
                }}
              >
                <Icon size={18} color={isActive ? 'var(--wise-forest, #163300)' : '#64748b'} />
                <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 800 : 500 }}>
                  {item.name}
                </span>
              </button>
            );
          })}

          {/* Account / Login Tab */}
          <button
            onClick={() => {
              navigate('/login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '10px',
              color: location.pathname === '/login' || location.pathname === '/profile' ? 'var(--wise-forest, #163300)' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: location.pathname === '/login' || location.pathname === '/profile' ? '#eef5ea' : 'transparent',
            }}
          >
            <SignedOut>
              <User size={18} color="#15803d" />
              <span style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                Sign In
              </span>
            </SignedOut>
            <SignedIn>
              <User size={18} color="#15803d" />
              <span style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                Profile
              </span>
            </SignedIn>
          </button>

        </div>
      </nav>

      {/* Embedded CSS for responsive toggles */}
      <style>{`
        @media (min-width: 769px) {
          .mobile-bottom-hud {
            display: none !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -16px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </>
  );
};
