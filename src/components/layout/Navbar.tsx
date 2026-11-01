// src/components/layout/Navbar.tsx
// VANTIQ: Wise-Inspired Minimalist High-Trust Navigation
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  Cpu, 
  Activity, 
  Scale, 
  AlertTriangle, 
  Menu, 
  X,
  Lock
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

// Primary anchor navigation points requested by specification
const NAV_LINKS = [
  { id: 'simulator', label: 'Calculator', icon: Zap, fallbackId: 'crisis-intake' },
  { id: 'ghost-debt', label: 'Debt Traps', icon: AlertTriangle, fallbackId: 'debt-mesh' },
  { id: 'quantum-solver', label: 'Quantum Solver', icon: Cpu, fallbackId: 'quantum-knapsack' },
  { id: 'digital-twin', label: 'Cash Runway', icon: Activity, fallbackId: 'cashflow-twin' },
  { id: 'comparison', label: 'Fee Comparison', icon: Scale, fallbackId: 'rescue-matrix' },
  { id: 'compliance', label: 'Security & ZK', icon: Shield, fallbackId: 'privacy-compliance' },
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

  useEffect(() => {
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

    if (window.location.hash) {
      const initialId = window.location.hash.replace('#', '');
      const matched = NAV_LINKS.find((l) => l.id === initialId);
      if (matched) {
        setTimeout(() => scrollToSection(initialId), 150);
      }
    }

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
          backgroundColor: isScrolled ? 'rgba(7, 13, 8, 0.95)' : 'rgba(7, 13, 8, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: isScrolled ? '1px solid rgba(159, 232, 112, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isScrolled
            ? '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(159, 232, 112, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.25s ease',
          padding: '14px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          
          {/* Wise-Style Bold Minimalist Logo */}
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textDecoration: 'none' }}
            onClick={() => scrollToSection('simulator')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') scrollToSection('simulator'); }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--wise-lime)',
                color: 'var(--wise-forest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(159, 232, 112, 0.4)',
                fontWeight: 900,
                fontSize: '1.25rem',
                flexShrink: 0,
              }}
            >
              V
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                }}
              >
                VANTIQ
              </span>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--wise-lime)',
                  boxShadow: '0 0 8px var(--wise-lime)',
                }}
              />
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
                backgroundColor: 'rgba(159, 232, 112, 0.08)',
                border: '1px solid rgba(159, 232, 112, 0.3)',
                fontSize: '0.74rem',
                color: 'var(--wise-lime)',
              }}
            >
              <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
                <span
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: 'var(--wise-lime)',
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
                    backgroundColor: 'var(--wise-lime)',
                    boxShadow: '0 0 8px var(--wise-lime)',
                  }}
                />
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <span style={{ color: '#a3b8a6' }}>Engine:</span>
                <span style={{ color: 'var(--wise-lime)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Quantum Online</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>|</span>
                <span style={{ color: '#ffffff', fontFamily: 'monospace', fontWeight: 700 }}>38ms latency</span>
              </div>
            </div>
          </div>

          {/* Smooth Anchor Navigation Links (Desktop) */}
          <nav className="desktop-nav-menu" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {NAV_LINKS.map((item) => {
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
                    padding: '8px 14px',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive ? 'rgba(159, 232, 112, 0.15)' : 'transparent',
                    border: isActive ? '1px solid rgba(159, 232, 112, 0.4)' : '1px solid transparent',
                    color: isActive ? 'var(--wise-lime)' : 'var(--wise-text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Area: Wise-style Low-Friction CTA & Shield */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            {/* Primary Wise Electric Lime CTA Button */}
            <button
              onClick={() => scrollToSection('simulator')}
              className="btn btn-primary emergency-cta-btn"
              style={{
                fontSize: '0.86rem',
                fontWeight: 800,
                padding: '10px 20px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}
              aria-label="Launch Free Emergency Simulator"
            >
              <Zap size={14} />
              <span>Simulate Free</span>
            </button>

            {/* Quick Neuro-Shield trigger */}
            <button
              onClick={triggerNeuroShield}
              className="btn btn-secondary shield-quick-btn"
              style={{
                padding: '10px 14px',
                fontSize: '0.82rem',
                borderRadius: '9999px',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title="Test 45s Grounding Shield Modal"
            >
              <Lock size={13} color="var(--wise-lime)" />
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
                borderColor: 'rgba(255, 255, 255, 0.15)',
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} color="var(--wise-lime)" /> : <Menu size={20} color="#f8fafc" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: 'rgba(7, 13, 8, 0.98)',
              borderBottom: '1px solid rgba(159, 232, 112, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
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
                      backgroundColor: isActive ? 'rgba(159, 232, 112, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: isActive ? '1px solid var(--wise-lime)' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isActive ? 'var(--wise-lime)' : '#e2e8f0',
                      textDecoration: 'none',
                    }}
                  >
                    <Icon size={16} color={isActive ? 'var(--wise-lime)' : '#94a3b8'} />
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
                padding: '14px',
                fontSize: '0.95rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Zap size={16} />
              <span>Simulate Emergency Rescue Free</span>
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
            font-size: 0.78rem;
          }
        }
      `}</style>
    </>
  );
};
