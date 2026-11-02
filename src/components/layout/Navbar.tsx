// src/components/layout/Navbar.tsx
// VANTIQ: Authentic Wise-Inspired Clean Light Navigation
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  Activity, 
  Scale, 
  AlertTriangle, 
  Menu, 
  X,
  HeartHandshake
} from 'lucide-react';

const NAV_LINKS = [
  { id: 'simulator', label: 'Calculator', icon: Zap, fallbackId: 'crisis-intake' },
  { id: 'health-navigator', label: 'Loan Rankings & Reddit Reviews', icon: HeartHandshake, fallbackId: 'health-aid' },
  { id: 'ghost-debt', label: 'Debt Traps', icon: AlertTriangle, fallbackId: 'debt-mesh' },
  { id: 'digital-twin', label: 'Cash Runway', icon: Activity, fallbackId: 'cashflow-twin' },
  { id: 'comparison', label: 'Fee Comparison', icon: Scale, fallbackId: 'rescue-matrix' },
  { id: 'compliance', label: 'Security & ZK', icon: Shield, fallbackId: 'privacy-compliance' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('simulator');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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
        anchor.setAttribute('data-vantiq-anchor', 'true');
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
      setIsScrolled(window.scrollY > 15);

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
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(244, 245, 241, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #e5e9e2',
          boxShadow: isScrolled ? '0 4px 20px rgba(22, 51, 0, 0.05)' : 'none',
          transition: 'all 0.2s ease',
          padding: '14px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          
          {/* Wise-Style Bold Wordmark Logo */}
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textDecoration: 'none' }}
            onClick={() => scrollToSection('simulator')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') scrollToSection('simulator'); }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--wise-forest)',
                color: 'var(--wise-lime)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  color: 'var(--wise-forest)',
                }}
              >
                vantiq
              </span>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--wise-lime)',
                }}
              />
            </div>
          </div>

          {/* Status Ticker: Funding plan status */}
          <div className="status-ticker-hud" style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: '#edf2ea',
                border: '1px solid #d8e2d4',
                fontSize: '0.78rem',
                color: 'var(--wise-forest)',
                fontWeight: 600,
              }}
            >
              <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
                <span
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: '#15803d',
                    opacity: 0.75,
                    animation: 'pulseGlow 2s infinite',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#15803d',
                  }}
                />
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#596d5a' }}>Funding Plan:</span>
                <span style={{ color: 'var(--wise-forest)', fontWeight: 700 }}>Available</span>
              </div>
            </div>
          </div>

          {/* Smooth Anchor Navigation Links (Desktop) */}
          <nav className="desktop-nav-menu" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 800 : 600,
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                    backgroundColor: isActive ? '#e5ebd0' : 'transparent',
                    color: 'var(--wise-forest)',
                    cursor: 'pointer',
                  }}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Area: Wise-style Low-Friction CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            {/* Primary Wise Electric Lime CTA Button */}
            <button
              onClick={() => scrollToSection('simulator')}
              className="btn btn-primary emergency-cta-btn"
              style={{
                fontSize: '0.88rem',
                fontWeight: 800,
                padding: '10px 22px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}
              aria-label="Launch Free Emergency Simulator"
            >
              <Zap size={15} />
              <span>Simulate Free</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-secondary mobile-menu-toggle"
              style={{
                display: 'none',
                padding: '8px',
                borderRadius: '8px',
                borderColor: '#d0d7cc',
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} color="var(--wise-forest)" /> : <Menu size={20} color="var(--wise-forest)" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e5e9e2',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.06)'
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
                      backgroundColor: isActive ? 'var(--wise-lime)' : '#f4f5f1',
                      border: '1px solid #e5e9e2',
                      color: 'var(--wise-forest)',
                      textDecoration: 'none',
                    }}
                  >
                    <Icon size={16} color="var(--wise-forest)" />
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
        @media (max-width: 640px) {
          .emergency-cta-btn {
            padding: 8px 12px !important;
            font-size: 0.78rem !important;
          }
        }
        @media (max-width: 400px) {
          .emergency-cta-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
