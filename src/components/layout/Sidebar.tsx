import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Calculator, 
  HeartHandshake,
  Atom, 
  Wallet, 
  Scale, 
  Lock, 
  X, 
  ChevronRight, 
  Activity,
  Zap,
  LogIn
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/react';
import { SignedIn, SignedOut } from '../../config/clerk';
import { useFintech } from '../../context/FintechContext';

export interface VantiqFeatureItem {
  id: string;
  name: string;
  subtitle: string;
  path: string;
  icon: React.ComponentType<{ size?: number | string; color?: string; style?: React.CSSProperties; className?: string }>;
  isAction?: boolean;
  isAnchor?: boolean;
}

export const VANTIQ_FEATURES: VantiqFeatureItem[] = [
  {
    id: 'overview',
    name: 'Overview',
    subtitle: 'Emergency Finance Hub',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    id: 'calculator',
    name: 'Calculator',
    subtitle: 'Crisis Shock & Capacity',
    path: '/calculator',
    icon: Calculator,
  },
  {
    id: 'health-navigator',
    name: 'Health Relief Navigator',
    subtitle: 'Hospital Plans & Reviews',
    path: '/#health-navigator',
    icon: HeartHandshake,
    isAnchor: true,
  },
  {
    id: 'quantum-solver',
    name: 'Quantum Solver',
    subtitle: 'QAOA Knapsack Engine',
    path: '/quantum-solver',
    icon: Atom,
  },
  {
    id: 'cash-runway',
    name: 'Cash Runway',
    subtitle: '90-Day Digital Twin',
    path: '/cash-runway',
    icon: Wallet,
  },
  {
    id: 'fee-comparison',
    name: 'Fee Comparison',
    subtitle: 'Counterfactual Matrix',
    path: '/fee-comparison',
    icon: Scale,
  },
  {
    id: '45s-shield',
    name: '45s Shield',
    subtitle: 'Neuro-Adaptive Pacing',
    path: '/45s-shield',
    icon: Lock,
    isAction: true,
  },
];

export const Sidebar: React.FC = () => {
  const { 
    isSidebarOpen, 
    setIsSidebarOpen, 
    neuroState 
  } = useFintech();

  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  // Close sidebar on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen, setIsSidebarOpen]);

  // Lock body scroll on mobile viewports when overlay drawer is open
  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`vantiq-sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden={!isSidebarOpen}
      />

      {/* Vertical Navigation Sidebar Panel */}
      <aside
        ref={sidebarRef}
        id="vantiq-feature-sidebar"
        className={`vantiq-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
        role="navigation"
        aria-label="VANTIQ Feature Navigation"
      >
        {/* Sidebar Header */}
        <div className="vantiq-sidebar-header">
          <div 
            className="vantiq-sidebar-brand"
            onClick={() => {
              navigate('/');
              if (window.innerWidth < 1024) setIsSidebarOpen(false);
            }}
            style={{ cursor: 'pointer' }}
            title="Return to Dashboard Overview"
          >
            <div className="vantiq-sidebar-brand-icon">
              <Activity size={18} color="var(--wise-lime, #9fe870)" />
            </div>
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div className="vantiq-sidebar-brand-title">FEATURE NAVIGATION</div>
              <div className="vantiq-sidebar-brand-sub">VANTIQ Quantum Suite</div>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="vantiq-sidebar-close-btn"
            aria-label="Close navigation sidebar"
            title="Close sidebar (Esc)"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Section Category Indicator */}
        <div className="vantiq-sidebar-section-label">
          <span>CORE FINANCIAL MODULES</span>
          <span className="vantiq-sidebar-count-badge">7 AVAILABLE</span>
        </div>

        {/* Navigation Feature Links List */}
        <div className="vantiq-sidebar-nav-list">
          {VANTIQ_FEATURES.map((feature) => {
            const Icon = feature.icon;
            const isOverview = feature.id === 'overview';
            const isSelected = isOverview 
              ? location.pathname === '/' && !location.hash.includes('health-navigator')
              : feature.isAnchor
                ? location.hash.includes('health-navigator')
                : location.pathname === feature.path;
            const isShieldActive = feature.id === '45s-shield' && neuroState.isShieldActive;

            return (
              <button
                key={feature.id}
                onClick={() => {
                  if (feature.isAnchor) {
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
                  } else {
                    navigate(feature.path);
                  }
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`vantiq-sidebar-item ${isSelected ? 'active' : ''} ${isShieldActive ? 'shield-pulse' : ''}`}
                role="menuitem"
                aria-current={isSelected ? 'page' : undefined}
                data-feature-id={feature.id}
                data-route={feature.path}
              >
                {/* Active Indicator Left Accent Bar */}
                <div className="vantiq-sidebar-active-indicator" />

                {/* Feature Icon Container */}
                <div className={`vantiq-sidebar-icon-wrap ${isSelected ? 'active-icon' : ''}`}>
                  <Icon size={18} />
                </div>

                {/* Feature Name & Description */}
                <div className="vantiq-sidebar-text-wrap">
                  <span className="vantiq-sidebar-item-title">{feature.name}</span>
                  <span className="vantiq-sidebar-item-sub">{feature.subtitle}</span>
                </div>

                {/* Feature Trailing Arrow / Active Pulse */}
                <div className="vantiq-sidebar-trailing">
                  {isSelected ? (
                    <span className="vantiq-sidebar-active-dot" />
                  ) : (
                    <ChevronRight size={14} className="vantiq-sidebar-arrow" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer User Account & System Telemetry Status */}
        <div className="vantiq-sidebar-footer">
          {/* Clerk Auth Section */}
          <div style={{ marginBottom: '12px' }}>
            <SignedOut>
              <button
                onClick={() => {
                  navigate('/login');
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--wise-forest, #163300)',
                  border: '1px solid var(--wise-forest, #163300)',
                  color: 'var(--wise-lime, #9fe870)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 8px rgba(22, 51, 0, 0.12)',
                }}
              >
                <LogIn size={15} />
                <span>Sign In / Create Account</span>
              </button>
            </SignedOut>

            <SignedIn>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-medium, #d0d7cc)',
                  boxShadow: '0 2px 6px rgba(22, 51, 0, 0.04)',
                }}
              >
                <UserButton />
                <div style={{ minWidth: 0, overflow: 'hidden', flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--wise-forest, #163300)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user?.firstName || user?.fullName || 'Active User'}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#15803d', fontWeight: 700 }}>
                    Verified Account
                  </div>
                </div>
              </div>
            </SignedIn>
          </div>

          <div className="vantiq-sidebar-telemetry-card">
            <div className="vantiq-telemetry-header">
              <div className="vantiq-telemetry-beacon">
                <span className="vantiq-telemetry-ping" />
                <span className="vantiq-telemetry-dot" />
              </div>
              <span className="vantiq-telemetry-title">QUANTUM SOLVER ONLINE</span>
            </div>
            <div className="vantiq-telemetry-body">
              <span>Latency: <strong>38ms</strong></span>
              <span className="vantiq-telemetry-sep">|</span>
              <span>QAOA Resilient</span>
            </div>

            <button
              onClick={() => {
                navigate('/calculator');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className="vantiq-sidebar-action-cta"
            >
              <Zap size={14} color="var(--wise-lime, #9fe870)" />
              <span>Simulate Emergency Shock</span>
            </button>

            {/* Direct Close Sidebar Action */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="vantiq-sidebar-collapse-btn"
              aria-label="Close navigation sidebar"
              title="Close sidebar navigation (Esc)"
            >
              <X size={15} strokeWidth={2.5} />
              <span>Close Sidebar</span>
              <span className="vantiq-esc-pill">ESC</span>
            </button>
          </div>
        </div>
      </aside>

      {/* High-Performance Sidebar Styles */}
      <style>{`
        /* Sidebar Overlay (Mobile) */
        .vantiq-sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(22, 51, 0, 0.32);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 1040;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .vantiq-sidebar-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        /* Sidebar Container */
        .vantiq-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          background: #ffffff;
          border-right: 1px solid var(--border-subtle, #e5e9e2);
          box-shadow: 10px 0 30px -10px rgba(22, 51, 0, 0.15);
          z-index: 1050;
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
          overflow: hidden;
        }

        .vantiq-sidebar.open {
          transform: translateX(0);
        }

        /* Mobile Adjustments */
        @media (max-width: 1023px) {
          .vantiq-sidebar {
            width: min(320px, 86vw);
            box-shadow: 12px 0 35px rgba(22, 51, 0, 0.18);
          }
        }

        /* Sidebar Header */
        .vantiq-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-subtle, #e5e9e2);
          background: #ffffff;
          flex-shrink: 0;
          box-sizing: border-box;
          width: 100%;
        }

        .vantiq-sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          flex: 1;
          overflow: hidden;
        }

        .vantiq-sidebar-brand-icon {
          width: 32px;
          height: 32px;
          min-width: 32px;
          flex-shrink: 0;
          border-radius: 8px;
          background: var(--wise-forest, #163300);
          border: 1px solid var(--wise-forest, #163300);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(22, 51, 0, 0.15);
        }

        .vantiq-sidebar-brand-title {
          font-size: 0.74rem;
          font-weight: 850;
          letter-spacing: 0.04em;
          color: var(--wise-forest, #163300);
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .vantiq-sidebar-brand-sub {
          font-size: 0.65rem;
          color: var(--text-muted, #6b7f6e);
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .vantiq-sidebar-close-btn {
          width: 34px;
          height: 34px;
          min-width: 34px;
          flex-shrink: 0;
          border-radius: 8px;
          border: 1.5px solid var(--border-medium, #d0d7cc);
          background: var(--bg-deep, #f4f5f1);
          color: var(--wise-forest, #163300);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .vantiq-sidebar-close-btn:hover {
          background: #e2e8df;
          border-color: var(--wise-forest, #163300);
          color: var(--wise-forest, #163300);
          transform: scale(1.06);
        }

        .vantiq-sidebar-collapse-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 8px 12px;
          margin-top: 8px;
          border-radius: 8px;
          border: 1px solid var(--border-medium, #d0d7cc);
          background: var(--bg-deep, #f4f5f1);
          color: var(--wise-forest, #163300);
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .vantiq-sidebar-collapse-btn:hover {
          background: #e2e8df;
          border-color: var(--wise-forest, #163300);
          transform: translateY(-1px);
        }

        .vantiq-esc-pill {
          font-size: 0.60rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          background: #ffffff;
          border: 1px solid var(--border-medium, #d0d7cc);
          color: var(--text-muted, #6b7f6e);
          font-family: monospace;
          margin-left: auto;
        }

        /* Category Label */
        .vantiq-sidebar-section-label {
          padding: 16px 20px 8px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-muted, #6b7f6e);
        }

        .vantiq-sidebar-count-badge {
          background: var(--bg-subtle, #edf0ea);
          color: var(--wise-forest, #163300);
          border: 1px solid var(--border-medium, #d0d7cc);
          padding: 2px 7px;
          border-radius: 4px;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        /* Nav List */
        .vantiq-sidebar-nav-list {
          flex: 1;
          overflow-y: auto;
          padding: 6px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .vantiq-sidebar-nav-list::-webkit-scrollbar {
          width: 4px;
        }
        .vantiq-sidebar-nav-list::-webkit-scrollbar-thumb {
          background: var(--border-medium, #d0d7cc);
          border-radius: 4px;
        }

        /* Nav Item */
        .vantiq-sidebar-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary, #425444);
          text-align: left;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
          outline: none;
        }

        .vantiq-sidebar-item:hover {
          background: var(--bg-deep, #f4f5f1);
          border-color: var(--border-subtle, #e5e9e2);
          color: var(--wise-forest, #163300);
          transform: translateX(3px);
        }

        .vantiq-sidebar-item.active {
          background: #eef6e8;
          border-color: #c7e5a8;
          color: var(--wise-forest, #163300);
          box-shadow: 0 2px 8px rgba(22, 51, 0, 0.04);
        }

        .vantiq-sidebar-item.shield-pulse {
          animation: shieldPulseBorder 2s infinite;
        }

        @keyframes shieldPulseBorder {
          0%, 100% { border-color: #c7e5a8; }
          50% { border-color: #b45309; }
        }

        /* Active Left Indicator */
        .vantiq-sidebar-active-indicator {
          position: absolute;
          left: 0;
          top: 8px;
          bottom: 8px;
          width: 3px;
          border-radius: 0 4px 4px 0;
          background: transparent;
          transition: background 0.2s ease;
        }

        .vantiq-sidebar-item.active .vantiq-sidebar-active-indicator {
          background: var(--wise-forest, #163300);
        }

        /* Icon Wrapper */
        .vantiq-sidebar-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: var(--bg-deep, #f4f5f1);
          border: 1px solid var(--border-subtle, #e5e9e2);
          color: var(--wise-forest, #163300);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .vantiq-sidebar-item:hover .vantiq-sidebar-icon-wrap {
          color: var(--wise-forest, #163300);
          border-color: var(--border-medium, #d0d7cc);
          background: #ffffff;
        }

        .vantiq-sidebar-item.active .vantiq-sidebar-icon-wrap {
          background: var(--wise-forest, #163300);
          border-color: var(--wise-forest, #163300);
          color: var(--wise-lime, #9fe870);
          box-shadow: 0 2px 6px rgba(22, 51, 0, 0.15);
        }

        /* Text Block */
        .vantiq-sidebar-text-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .vantiq-sidebar-item-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
        }

        .vantiq-sidebar-item-title {
          font-size: 0.86rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--wise-forest, #163300);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .vantiq-sidebar-item.active .vantiq-sidebar-item-title {
          font-weight: 800;
          color: var(--wise-forest, #163300);
        }

        .vantiq-sidebar-item-sub {
          font-size: 0.70rem;
          color: var(--text-muted, #6b7f6e);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .vantiq-sidebar-item.active .vantiq-sidebar-item-sub {
          color: var(--text-secondary, #425444);
          font-weight: 500;
        }

        /* Tag Pill */
        .vantiq-sidebar-tag {
          font-size: 0.62rem;
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--bg-deep, #f4f5f1);
          border: 1px solid var(--border-subtle, #e5e9e2);
          color: var(--text-muted, #6b7f6e);
          font-family: monospace;
          font-weight: 600;
          flex-shrink: 0;
        }

        .vantiq-sidebar-tag.active-tag {
          background: var(--wise-forest, #163300);
          border-color: var(--wise-forest, #163300);
          color: var(--wise-lime, #9fe870);
        }

        /* Trailing Element */
        .vantiq-sidebar-trailing {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          flex-shrink: 0;
        }

        .vantiq-sidebar-arrow {
          color: var(--border-medium, #d0d7cc);
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .vantiq-sidebar-item:hover .vantiq-sidebar-arrow {
          color: var(--wise-forest, #163300);
          transform: translateX(2px);
        }

        .vantiq-sidebar-active-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #15803d;
          box-shadow: 0 0 6px rgba(21, 128, 61, 0.4);
        }

        /* Sidebar Footer Telemetry Card */
        .vantiq-sidebar-footer {
          padding: 14px 16px;
          border-top: 1px solid var(--border-subtle, #e5e9e2);
          background: var(--bg-deep, #f4f5f1);
        }

        .vantiq-sidebar-telemetry-card {
          padding: 12px;
          border-radius: 10px;
          background: #ffffff;
          border: 1px solid var(--border-medium, #d0d7cc);
          box-shadow: 0 2px 8px rgba(22, 51, 0, 0.04);
        }

        .vantiq-telemetry-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .vantiq-telemetry-beacon {
          position: relative;
          width: 8px;
          height: 8px;
        }

        .vantiq-telemetry-ping {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #15803d;
          opacity: 0.75;
          animation: pulseGlow 2s infinite;
        }

        .vantiq-telemetry-dot {
          position: relative;
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #15803d;
        }

        .vantiq-telemetry-title {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: var(--wise-forest, #163300);
        }

        .vantiq-telemetry-body {
          font-size: 0.70rem;
          color: var(--text-muted, #6b7f6e);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .vantiq-telemetry-body strong {
          color: var(--wise-forest, #163300);
          font-family: monospace;
          font-weight: 700;
        }

        .vantiq-telemetry-sep {
          color: var(--border-medium, #d0d7cc);
        }

        .vantiq-sidebar-action-cta {
          width: 100%;
          padding: 9px 12px;
          border-radius: 8px;
          background: var(--wise-forest, #163300);
          border: 1px solid var(--wise-forest, #163300);
          color: var(--wise-lime, #9fe870);
          font-size: 0.75rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(22, 51, 0, 0.12);
        }

        .vantiq-sidebar-action-cta:hover {
          background: #0d1f00;
          border-color: #0d1f00;
          box-shadow: 0 4px 12px rgba(22, 51, 0, 0.2);
          transform: translateY(-1px);
        }

        /* Mobile Adjustments */
        @media (max-width: 1023px) {
          .vantiq-sidebar {
            top: 0; /* Full height slide-in drawer on mobile */
            z-index: 1200;
            width: min(320px, 86vw);
            box-shadow: 12px 0 35px rgba(22, 51, 0, 0.18);
          }
        }
      `}</style>
    </>
  );
};
