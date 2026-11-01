// src/components/layout/PwaMobileNav.tsx
// PWA Installation Controller & Mobile-First Bottom Navigation Bar
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Activity, 
  Cpu, 
  Shield, 
  Download, 
  X, 
  AlertTriangle,
  Smartphone
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaMobileNav: React.FC = () => {
  const { triggerNeuroShield } = useFintech();
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
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(true);
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
      const sections = ['simulator', 'ghost-debt', 'digital-twin', 'quantum-solver'];
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
      'ghost-debt': 'debt-mesh',
      'digital-twin': 'cashflow-twin',
      'quantum-solver': 'quantum-knapsack',
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
            backgroundColor: 'rgba(10, 17, 36, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(6, 182, 212, 0.45)',
            borderRadius: '16px',
            padding: '12px 16px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.7), 0 0 20px rgba(6, 182, 212, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(6, 182, 212, 0.4)',
                flexShrink: 0,
              }}
            >
              <Smartphone size={20} color="#ffffff" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Install VANTIQ App
              </div>
              <div style={{ fontSize: '0.70rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Instant offline access & fast quantum calculations
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <button
              onClick={handleInstallClick}
              className="btn btn-primary"
              style={{
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Download size={13} />
              <span>Install</span>
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Dismiss banner"
            >
              <X size={16} />
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
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowIosGuide(false)}
        >
          <div
            className="chronos-card"
            style={{
              maxWidth: '360px',
              width: '100%',
              padding: '24px',
              backgroundColor: '#0a1124',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>📲</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
              Install on iOS / Safari
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '16px' }}>
              1. Tap the <strong>Share</strong> button <span style={{ fontSize: '1.1rem' }}>⎋</span> at the bottom of Safari.<br />
              2. Scroll down and select <strong>"Add to Home Screen"</strong> ⊕.<br />
              3. Tap <strong>Add</strong> to experience VANTIQ in standalone app mode!
            </p>
            <button
              onClick={() => setShowIosGuide(false)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '10px' }}
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
          backgroundColor: 'rgba(5, 9, 20, 0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(56, 189, 248, 0.25)',
          paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
          paddingTop: '8px',
          paddingLeft: '12px',
          paddingRight: '12px',
          boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(6, 182, 212, 0.1)',
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

          {/* Quantum Solver Tab */}
          <button
            onClick={() => scrollTo('quantum-solver')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '8px',
              color: activeTab === 'quantum-solver' ? '#c084fc' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Cpu size={18} color={activeTab === 'quantum-solver' ? '#c084fc' : '#64748b'} />
            <span style={{ fontSize: '0.68rem', fontWeight: activeTab === 'quantum-solver' ? 700 : 500 }}>
              Quantum
            </span>
          </button>

          {/* 45s Neuro Shield Trigger (Center Highlight Action) */}
          <button
            onClick={triggerNeuroShield}
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(124, 58, 237, 0.15) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '10px',
              color: '#c084fc',
              boxShadow: '0 0 12px rgba(139, 92, 246, 0.25)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="Launch 45s Neuro-Adaptive Grounding Protocol"
          >
            <Shield size={18} color="#c084fc" />
            <span style={{ fontSize: '0.68rem', fontWeight: 800 }}>
              45s Shield
            </span>
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
