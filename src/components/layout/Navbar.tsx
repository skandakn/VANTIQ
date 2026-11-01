// src/components/layout/Navbar.tsx
// VANTIQ Member 01: Global Shell & Header HUD
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  Cpu, 
  Activity, 
  Scale, 
  AlertTriangle, 
  Menu, 
  X 
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

// Primary anchor navigation points requested by specification
const NAV_LINKS = [
  { id: 'simulator', label: 'Simulator', icon: Zap, fallbackId: 'crisis-intake' },
  { id: 'ghost-debt', label: 'Ghost Debt', icon: AlertTriangle, fallbackId: 'debt-mesh' },
  { id: 'quantum-solver', label: 'Quantum Solver', icon: Cpu, fallbackId: 'quantum-knapsack' },
  { id: 'digital-twin', label: 'Digital Twin', icon: Activity, fallbackId: 'cashflow-twin' },
  { id: 'comparison', label: 'Comparison', icon: Scale, fallbackId: 'rescue-matrix' },
  { id: 'compliance', label: 'Compliance', icon: Shield, fallbackId: 'privacy-compliance' },
];

export const Navbar: React.FC = () => {
  const { triggerNeuroShield } = useFintech();
  const [activeSection, setActiveSection] = useState<string>('simulator');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Smooth scroll handler with robust fallback and browser history synchronization
  const scrollToSection = (targetId: string) => {
    setMobileMenuOpen(false);

    const directEl = document.getElementById(targetId);
    const linkDef = NAV_LINKS.find((link) => link.id === targetId);
    const fallbackEl = linkDef?.fallbackId ? document.getElementById(linkDef.fallbackId) : null;
    const element = directEl || fallbackEl;

    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      if (window.history.pushState) {
        window.history.pushState(null, '', `#${targetId}`);
      }
      setActiveSection(targetId);
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToSection(targetId);
  };

  // Synchronize anchor IDs on target module elements and track active scroll section
  useEffect(() => {
    // Inject alias anchors if needed so direct browser URLs (e.g. #simulator) work seamlessly
    NAV_LINKS.forEach((link) => {
      const parent = link.fallbackId ? document.getElementById(link.fallbackId) : null;
      if (parent && !document.getElementById(link.id)) {
        const anchor = document.createElement('div');
        anchor.id = link.id;
        anchor.style.position = 'relative';
        anchor.style.top = '-80px';
        anchor.style.visibility = 'hidden';
        anchor.setAttribute('data-chronos-anchor', 'true');
        parent.prepend(anchor);
      }
    });

    // Check if initial URL contains a hash
    if (window.location.hash) {
      const initialId = window.location.hash.replace('#', '');
      const matched = NAV_LINKS.find((l) => l.id === initialId);
      if (matched) {
        setTimeout(() => scrollToSection(initialId), 150);
      }
    }

    // Scroll listener for sticky header styling & active section tracking
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 120;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i];
        const el = document.getElementById(link.id) || (link.fallbackId ? document.getElementById(link.fallbackId) : null);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(5, 9, 20, 0.92)' : 'rgba(5, 9, 20, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: isScrolled ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(51, 65, 85, 0.45)',
          boxShadow: isScrolled
            ? '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(6, 182, 212, 0.15)'
            : '0 4px 20px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.25s ease',
          padding: '12px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          
          {/* Brand Logo & Glowing Cyan Gradient Badge */}
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textDecoration: 'none' }}
            onClick={() => scrollToSection('simulator')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') scrollToSection('simulator'); }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), inset 0 0 8px rgba(255, 255, 255, 0.3)',
                flexShrink: 0,
              }}
            >
              <Shield size={22} color="#ffffff" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {/* Glowing Cyan Gradient Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 12px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(56, 189, 248, 0.08) 100%)',
                    border: '1px solid rgba(56, 189, 248, 0.55)',
                    boxShadow: '0 0 16px rgba(6, 182, 212, 0.4), inset 0 0 8px rgba(6, 182, 212, 0.15)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      background: 'linear-gradient(135deg, #ffffff 0%, #38bdf8 50%, #06b6d4 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    VANTIQ
                  </span>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#38bdf8',
                      boxShadow: '0 0 8px #38bdf8',
                    }}
                  />
                </div>

                {/* Sub-badge for competition context */}
                <span className="badge badge-cyan hide-mobile-badge" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                  IDEATHON 2026
                </span>
              </div>
              <p className="hide-mobile-badge" style={{ fontSize: '0.70rem', color: '#94a3b8', marginTop: '2px' }}>
                Quantum Counterfactual Twin & Anti-Predatory HUD
              </p>
            </div>
          </div>

          {/* Status Ticker: Quantum Engine: Online (38ms latency) */}
          <div className="status-ticker-hud" style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.15)',
                fontSize: '0.74rem',
                color: '#34d399',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              {/* Radar pulse beacon */}
              <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
                <span
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    opacity: 0.75,
                    animation: 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                  }}
                />
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <span style={{ color: '#e2e8f0' }}>Quantum Engine:</span>
                <span style={{ color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Online</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>|</span>
                <span style={{ color: '#38bdf8', fontFamily: 'monospace', fontWeight: 700 }}>38ms latency</span>
              </div>
            </div>
          </div>

          {/* Smooth Anchor Navigation Links (Desktop) */}
          <nav className="desktop-nav-menu" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {NAV_LINKS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleAnchorClick(e, item.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 12px',
                    fontSize: '0.80rem',
                    fontWeight: isActive ? 700 : 500,
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive ? 'rgba(6, 182, 212, 0.18)' : 'transparent',
                    border: isActive ? '1px solid rgba(6, 182, 212, 0.45)' : '1px solid transparent',
                    color: isActive ? '#38bdf8' : '#94a3b8',
                    boxShadow: isActive ? '0 0 12px rgba(6, 182, 212, 0.2)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={14} color={isActive ? '#38bdf8' : '#64748b'} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Area: Emergency Simulator CTA & Neuro-Shield */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            {/* Emergency Simulator CTA button */}
            <button
              onClick={() => scrollToSection('simulator')}
              className="btn btn-primary emergency-cta-btn"
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                boxShadow: '0 0 18px rgba(6, 182, 212, 0.45)',
                border: '1px solid rgba(56, 189, 248, 0.5)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}
              aria-label="Launch Emergency Simulator"
            >
              <Zap size={15} style={{ color: '#fef08a', filter: 'drop-shadow(0 0 4px #facc15)' }} />
              <span>Emergency Simulator</span>
            </button>

            {/* Quick Neuro-Shield trigger */}
            <button
              onClick={triggerNeuroShield}
              className="btn btn-secondary shield-quick-btn"
              style={{
                padding: '8px 12px',
                fontSize: '0.78rem',
                borderColor: 'rgba(139, 92, 246, 0.4)',
                backgroundColor: 'rgba(139, 92, 246, 0.12)',
                color: '#c084fc',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title="Test 45s Grounding Shield Modal"
            >
              <Shield size={14} />
              <span className="hide-mobile-badge">45s Shield</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-secondary mobile-menu-toggle"
              style={{
                display: 'none',
                padding: '8px',
                borderRadius: '8px',
                borderColor: 'rgba(51, 65, 85, 0.6)',
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} color="#38bdf8" /> : <Menu size={20} color="#f8fafc" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: 'rgba(5, 9, 20, 0.98)',
              borderBottom: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  fontSize: '0.74rem',
                  color: '#34d399',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                  }}
                />
                <span>Quantum Engine: <strong>Online (38ms latency)</strong></span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {NAV_LINKS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleAnchorClick(e, item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? 'rgba(6, 182, 212, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                      border: isActive ? '1px solid #06b6d4' : '1px solid rgba(51, 65, 85, 0.4)',
                      color: isActive ? '#38bdf8' : '#e2e8f0',
                      textDecoration: 'none',
                    }}
                  >
                    <Icon size={16} color={isActive ? '#38bdf8' : '#94a3b8'} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <button
              onClick={() => scrollToSection('simulator')}
              className="btn btn-primary"
              style={{
                marginTop: '8px',
                width: '100%',
                padding: '12px',
                fontSize: '0.9rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Zap size={16} style={{ color: '#fef08a' }} />
              <span>Launch Emergency Simulator</span>
            </button>
          </div>
        )}
      </header>

      {/* Embedded Responsive Media Queries */}
      <style>{`
        @media (max-width: 1200px) {
          .status-ticker-hud {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          .desktop-nav-menu {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: inline-flex !important;
          }
          .hide-mobile-badge {
            display: none !important;
          }
        }
        @media (max-width: 520px) {
          .shield-quick-btn {
            display: none !important;
          }
          .emergency-cta-btn span {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
};
