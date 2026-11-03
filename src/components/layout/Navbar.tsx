// src/components/layout/Navbar.tsx
// VANTIQ: Authentic Clean Navigation with Sidebar & 45s Shield Integration
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Zap, 
  Activity, 
  Scale, 
  AlertTriangle, 
  Menu, 
  X,
  HeartHandshake,
  LogIn
} from 'lucide-react';
import { UserButton } from '@clerk/react';
import { SignedIn, SignedOut } from '../../config/clerk';
import { useFintech } from '../../context/FintechContext';

const NAV_LINKS = [
  { id: 'simulator', label: 'Calculator', icon: Zap, fallbackId: 'crisis-intake' },
  { id: 'health-navigator', label: 'Loan Rankings & Reddit Reviews', icon: HeartHandshake, fallbackId: 'health-aid' },
  { id: 'ghost-debt', label: 'Debt Traps', icon: AlertTriangle, fallbackId: 'debt-mesh' },
  { id: 'digital-twin', label: 'Cash Runway', icon: Activity, fallbackId: 'cashflow-twin' },
  { id: 'comparison', label: 'Fee Comparison', icon: Scale, fallbackId: 'rescue-matrix' },
  { id: 'compliance', label: 'Security & ZK', icon: Shield, fallbackId: 'privacy-compliance' },
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { 
    isSidebarOpen, 
    toggleSidebar 
  } = useFintech();

  const [activeSection, setActiveSection] = useState<string>('simulator');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const scrollToSection = (targetId: string) => {
    setMobileMenuOpen(false);

    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const headerOffset = 76;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, elementPosition - headerOffset),
            behavior: 'smooth',
          });
        }
      }, 120);
      return;
    }

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
          
          {/* Left Area: Sidebar Toggle & Brand Wordmark Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Hamburger / Menu Icon Toggle for Sidebar */}
            <button
              onClick={toggleSidebar}
              style={{
                background: isSidebarOpen ? '#edf2ea' : 'transparent',
                border: '1px solid #d0d7cc',
                borderRadius: '8px',
                padding: '6px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--wise-forest)',
                transition: 'all 0.15s ease',
              }}
              aria-label={isSidebarOpen ? 'Collapse feature sidebar' : 'Open feature navigation sidebar'}
              aria-expanded={isSidebarOpen}
              title={isSidebarOpen ? 'Collapse feature sidebar (Esc)' : 'Open feature sidebar'}
            >
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => {
                if (window.location.pathname !== '/') {
                  navigate('/');
                } else {
                  scrollToSection('simulator');
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { 
                if (e.key === 'Enter') {
                  if (window.location.pathname !== '/') navigate('/');
                  else scrollToSection('simulator');
                }
              }}
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
                    animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
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

              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--wise-forest)', fontWeight: 800 }}>Quantum Engine:</span>
                <span style={{ color: '#15803d', fontWeight: 800 }}>Online</span>
                <span style={{ color: '#94a3b8' }}>•</span>
                <span style={{ color: 'var(--text-secondary)' }}>38ms latency</span>
              </span>
            </div>
          </div>

          {/* Center/Desktop Navigation Pill Group */}
          <nav
            className="navbar-desktop-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#edf2ea',
              padding: '4px',
              borderRadius: '9999px',
              border: '1px solid #d8e2d4',
            }}
          >
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

          {/* Action Area: Clerk Auth + 45s Shield + Simulate Free CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            {/* Clerk Authentication Action */}
            <SignedOut>
              <button
                onClick={() => navigate('/login')}
                style={{
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  border: '1px solid #d0d7cc',
                  backgroundColor: '#ffffff',
                  color: 'var(--wise-forest, #163300)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#edf2ea';
                  e.currentTarget.style.borderColor = '#9fe870';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#d0d7cc';
                }}
                title="Sign in to save your emergency plan"
              >
                <LogIn size={14} color="#15803d" />
                <span>Log In</span>
              </button>
            </SignedOut>

            <SignedIn>
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  padding: '2px', 
                  borderRadius: '9999px',
                  border: '1px solid #d8e2d4',
                  backgroundColor: '#ffffff',
                }}
              >
                <UserButton 
                  userProfileMode="navigation"
                  userProfileUrl="/profile"
                />
              </div>
            </SignedIn>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-secondary mobile-menu-toggle"
              style={{
                display: 'none',
                padding: '8px',
                borderRadius: '8px',
                borderColor: '#d0d7cc',
                backgroundColor: '#ffffff',
                color: 'var(--wise-forest)',
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e5e9e2',
              boxShadow: '0 10px 25px rgba(22, 51, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {NAV_LINKS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 800 : 600,
                    backgroundColor: isActive ? '#edf2ea' : 'transparent',
                    color: 'var(--wise-forest)',
                    border: 'none',
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={18} color={isActive ? '#15803d' : '#64748b'} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Mobile Auth Button */}
            <div style={{ borderTop: '1px solid #e5e9e2', paddingTop: '10px', marginTop: '6px' }}>
              <SignedOut>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    backgroundColor: 'var(--wise-forest, #163300)',
                    color: 'var(--wise-lime, #9fe870)',
                    border: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    justifyContent: 'center',
                  }}
                >
                  <LogIn size={18} />
                  <span>Sign In / Create Account</span>
                </button>
              </SignedOut>

              <SignedIn>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#f4f5f1',
                    border: '1px solid #d8e2d4',
                  }}
                >
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--wise-forest)' }}>
                    My Account
                  </span>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @media (max-width: 900px) {
          .navbar-desktop-links {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }

        @media (max-width: 600px) {
          .status-ticker-hud {
            display: none !important;
          }
          .emergency-cta-btn {
            padding: 8px 14px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </>
  );
};
