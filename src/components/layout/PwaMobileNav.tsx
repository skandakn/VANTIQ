// src/components/layout/PwaMobileNav.tsx
// PWA Installation Controller & Mobile-First Bottom Navigation Bar
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Activity, 
  Download, 
  X, 
  AlertTriangle,
  Smartphone,
  HeartHandshake,
  User
} from 'lucide-react';
import { SignedIn, SignedOut } from '../../config/clerk';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaMobileNav: React.FC = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  });
  const [isIos] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  });
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('simulator');

  useEffect(() => {
    // Capture Chrome/Android/Edge beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Track active section on scroll for mobile nav icons
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['simulator', 'health-aid', 'ghost-debt', 'digital-twin'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActiveTab(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setShowInstallBanner(false);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    }
  };

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const directEl = document.getElementById(id);
    const fallbackMap: Record<string, string> = {
      simulator: 'crisis-intake',
      'health-aid': 'health-navigator',
      'ghost-debt': 'debt-mesh',
      'digital-twin': 'cashflow-twin',
    };
    const target = directEl || document.getElementById(fallbackMap[id] || '');
    if (target) {
      const offset = 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* =========================================================
          1. PWA Floating Install Banner (Mobile & Desktop)
          ========================================================= */}
      {!isStandalone && showInstallBanner && (deferredPrompt || isIos) && (
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
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--wise-forest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--wise-lime)',
                flexShrink: 0,
              }}
            >
              <Smartphone size={20} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--wise-forest)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Install VANTIQ App
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Instant offline access & fast calculations
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button
              onClick={handleInstallClick}
              className="btn btn-primary"
              style={{
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 800,
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
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
                color: 'var(--text-muted)',
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
          2. iOS Add to Home Screen Instructions Modal
          ========================================================= */}
      {showIosGuide && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
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
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--wise-forest)', marginBottom: '10px' }}>
              Install on iOS / Safari
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              1. Tap the <strong>Share</strong> button <span style={{ fontSize: '1.1rem' }}>⎋</span> at the bottom of Safari.<br />
              2. Scroll down and select <strong>"Add to Home Screen"</strong> ⊕.<br />
              3. Tap <strong>Add</strong> to experience VANTIQ in standalone app mode!
            </p>
            <button
              onClick={() => setShowIosGuide(false)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          3. Mobile-First Bottom Floating HUD Navigation Bar
          ========================================================= */}
      <nav
        className="mobile-bottom-hud"
        aria-label="Mobile Bottom Navigation"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid #e5e9e2',
          paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
          paddingTop: '8px',
          paddingLeft: '12px',
          paddingRight: '12px',
          boxShadow: '0 -4px 20px rgba(22, 51, 0, 0.05)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: '520px',
            margin: '0 auto',
          }}
        >
          {/* Simulator Tab */}
          <button
            onClick={() => scrollTo('simulator')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '8px',
              color: activeTab === 'simulator' ? '#38bdf8' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Zap size={18} color={activeTab === 'simulator' ? '#38bdf8' : '#64748b'} />
            <span style={{ fontSize: '0.68rem', fontWeight: activeTab === 'simulator' ? 700 : 500 }}>
              Simulator
            </span>
          </button>

          {/* Health Aid Tab */}
          <button
            onClick={() => scrollTo('health-aid')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '8px',
              color: activeTab === 'health-aid' ? '#15803d' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <HeartHandshake size={18} color={activeTab === 'health-aid' ? '#15803d' : '#64748b'} />
            <span style={{ fontSize: '0.68rem', fontWeight: activeTab === 'health-aid' ? 700 : 500 }}>
              Health Aid
            </span>
          </button>

          {/* Ghost Debt Tab */}
          <button
            onClick={() => scrollTo('ghost-debt')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '8px',
              color: activeTab === 'ghost-debt' ? '#ef4444' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <AlertTriangle size={18} color={activeTab === 'ghost-debt' ? '#ef4444' : '#64748b'} />
            <span style={{ fontSize: '0.68rem', fontWeight: activeTab === 'ghost-debt' ? 700 : 500 }}>
              Ghost Debt
            </span>
          </button>

          {/* 90-Day Digital Twin Tab */}
          <button
            onClick={() => scrollTo('digital-twin')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '8px',
              color: activeTab === 'digital-twin' ? '#34d399' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Activity size={18} color={activeTab === 'digital-twin' ? '#34d399' : '#64748b'} />
            <span style={{ fontSize: '0.68rem', fontWeight: activeTab === 'digital-twin' ? 700 : 500 }}>
              Runway
            </span>
          </button>

          {/* Account / Login Tab */}
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '8px',
              color: '#15803d',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <SignedOut>
              <User size={18} color="#15803d" />
              <span style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                Sign In
              </span>
            </SignedOut>
            <SignedIn>
              <User size={18} color="#10b981" />
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
      `}</style>
    </>
  );
};
