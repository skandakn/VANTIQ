import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Calculator, 
  Atom, 
  Wallet, 
  Scale, 
  ShieldCheck, 
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
}

export const VANTIQ_FEATURES: VantiqFeatureItem[] = [
  {
    id: 'calculator',
    name: 'Calculator',
    subtitle: 'Crisis Shock & Capacity',
    path: '/calculator',
    icon: Calculator,
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
    id: 'security-zk',
    name: 'Security & ZK',
    subtitle: 'Zero-Knowledge Proofs',
    path: '/security-zk',
    icon: ShieldCheck,
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
              <Activity size={18} color="#10b981" />
            </div>
            <div>
              <div className="vantiq-sidebar-brand-title">FEATURE NAVIGATION</div>
              <div className="vantiq-sidebar-brand-sub">VANTIQ Quantum Suite</div>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="vantiq-sidebar-close-btn"
            aria-label="Close navigation sidebar"
            title="Collapse sidebar (Esc)"
          >
            <X size={18} />
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
            const isSelected = location.pathname === feature.path;
            const isShieldActive = feature.id === '45s-shield' && neuroState.isShieldActive;

            return (
              <button
                key={feature.id}
                onClick={() => {
                  navigate(feature.path);
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
                  borderRadius: '8px',
                  backgroundColor: 'rgba(159, 232, 112, 0.12)',
                  border: '1px solid rgba(159, 232, 112, 0.35)',
                  color: '#9fe870',
                  fontSize: '0.80rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
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
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                <UserButton />
                <div style={{ minWidth: 0, overflow: 'hidden', flex: 1 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user?.firstName || user?.fullName || 'Active User'}
                  </div>
                  <div style={{ fontSize: '0.66rem', color: '#34d399', fontWeight: 600 }}>
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
              <Zap size={14} color="#facc15" />
              <span>Simulate Emergency Shock</span>
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
          background: rgba(3, 7, 18, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
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
          top: 68px; /* Below header on desktop */
          left: 0;
          bottom: 0;
          width: 280px;
          background: linear-gradient(180deg, rgba(6, 11, 25, 0.98) 0%, rgba(4, 8, 18, 0.99) 100%);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-right: 1px solid rgba(16, 185, 129, 0.2);
          box-shadow: 10px 0 30px -10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(16, 185, 129, 0.08);
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

        /* Sidebar Header */
        .vantiq-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px 14px 20px;
          border-bottom: 1px solid rgba(51, 65, 85, 0.4);
        }

        .vantiq-sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .vantiq-sidebar-brand-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
        }

        .vantiq-sidebar-brand-title {
          font-size: 0.78rem;
          font-weight: 850;
          letter-spacing: 0.08em;
          color: #f8fafc;
          text-transform: uppercase;
        }

        .vantiq-sidebar-brand-sub {
          font-size: 0.68rem;
          color: #94a3b8;
        }

        .vantiq-sidebar-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(71, 85, 105, 0.4);
          background: rgba(30, 41, 59, 0.4);
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .vantiq-sidebar-close-btn:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.5);
          color: #f87171;
          transform: rotate(90deg);
        }

        /* Category Label */
        .vantiq-sidebar-section-label {
          padding: 16px 20px 8px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #64748b;
        }

        .vantiq-sidebar-count-badge {
          background: rgba(16, 185, 129, 0.12);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.62rem;
          font-weight: 700;
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
          background: rgba(51, 65, 85, 0.5);
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
          color: #cbd5e1;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
          outline: none;
        }

        .vantiq-sidebar-item:hover {
          background: rgba(30, 41, 59, 0.5);
          border-color: rgba(51, 65, 85, 0.5);
          color: #f8fafc;
          transform: translateX(3px);
        }

        .vantiq-sidebar-item.active {
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.08) 100%);
          border-color: rgba(16, 185, 129, 0.45);
          color: #ffffff;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.15), inset 0 0 12px rgba(16, 185, 129, 0.05);
        }

        .vantiq-sidebar-item.shield-pulse {
          animation: shieldPulseBorder 2s infinite;
        }

        @keyframes shieldPulseBorder {
          0%, 100% { border-color: rgba(16, 185, 129, 0.45); }
          50% { border-color: rgba(245, 158, 11, 0.8); }
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
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }

        .vantiq-sidebar-item.active .vantiq-sidebar-active-indicator {
          background: #10b981;
          box-shadow: 0 0 8px #10b981, 0 0 14px rgba(16, 185, 129, 0.8);
        }

        /* Icon Wrapper */
        .vantiq-sidebar-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(51, 65, 85, 0.5);
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .vantiq-sidebar-item:hover .vantiq-sidebar-icon-wrap {
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(16, 185, 129, 0.1);
        }

        .vantiq-sidebar-item.active .vantiq-sidebar-icon-wrap {
          background: rgba(16, 185, 129, 0.22);
          border-color: #10b981;
          color: #34d399;
          box-shadow: 0 0 14px rgba(16, 185, 129, 0.4);
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .vantiq-sidebar-item.active .vantiq-sidebar-item-title {
          font-weight: 750;
          color: #f0fdf4;
        }

        .vantiq-sidebar-item-sub {
          font-size: 0.70rem;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .vantiq-sidebar-item.active .vantiq-sidebar-item-sub {
          color: #86efac;
        }

        /* Tag Pill */
        .vantiq-sidebar-tag {
          font-size: 0.62rem;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(71, 85, 105, 0.5);
          color: #94a3b8;
          font-family: monospace;
          font-weight: 600;
          flex-shrink: 0;
        }

        .vantiq-sidebar-tag.active-tag {
          background: rgba(16, 185, 129, 0.25);
          border-color: rgba(16, 185, 129, 0.6);
          color: #34d399;
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
          color: #475569;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .vantiq-sidebar-item:hover .vantiq-sidebar-arrow {
          color: #34d399;
          transform: translateX(2px);
        }

        .vantiq-sidebar-active-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981, 0 0 12px rgba(16, 185, 129, 0.8);
        }

        /* Sidebar Footer Telemetry Card */
        .vantiq-sidebar-footer {
          padding: 14px 16px;
          border-top: 1px solid rgba(51, 65, 85, 0.4);
          background: rgba(5, 9, 20, 0.7);
        }

        .vantiq-sidebar-telemetry-card {
          padding: 12px;
          border-radius: 10px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(16, 185, 129, 0.25);
          box-shadow: inset 0 0 14px rgba(16, 185, 129, 0.05);
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
          background: #10b981;
          opacity: 0.75;
          animation: pulseGlow 2s infinite;
        }

        .vantiq-telemetry-dot {
          position: relative;
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .vantiq-telemetry-title {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: #34d399;
        }

        .vantiq-telemetry-body {
          font-size: 0.70rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .vantiq-telemetry-body strong {
          color: #38bdf8;
          font-family: monospace;
        }

        .vantiq-telemetry-sep {
          color: rgba(255, 255, 255, 0.2);
        }

        .vantiq-sidebar-action-cta {
          width: 100%;
          padding: 8px 12px;
          border-radius: 6px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.18) 100%);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #f8fafc;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .vantiq-sidebar-action-cta:hover {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%);
          border-color: #10b981;
          box-shadow: 0 0 14px rgba(16, 185, 129, 0.35);
          transform: translateY(-1px);
        }

        /* Mobile Adjustments */
        @media (max-width: 1023px) {
          .vantiq-sidebar {
            top: 0; /* Full height slide-in drawer on mobile */
            z-index: 1200;
            width: min(320px, 86vw);
            box-shadow: 20px 0 50px rgba(0, 0, 0, 0.95);
          }
        }
      `}</style>
    </>
  );
};
