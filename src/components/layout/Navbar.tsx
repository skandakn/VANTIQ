import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Zap, 
  Menu, 
  X,
  Lock
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { 
    triggerNeuroShield, 
    neuroState, 
    isSidebarOpen, 
    toggleSidebar 
  } = useFintech();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Scroll listener for sticky header shadow and backdrop elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`vantiq-header ${isScrolled ? 'vantiq-header-scrolled' : ''}`}
        role="banner"
      >
        <div className="container vantiq-header-container">
          
          {/* ========================================================= */}
          {/* LEFT SECTION: Menu Icon, VANTIQ Logo, Quantum Online, Latency */}
          {/* ========================================================= */}
          <div className="vantiq-header-left">
            
            {/* Hamburger / Menu Icon Toggle */}
            <button
              onClick={toggleSidebar}
              className={`vantiq-menu-toggle-btn ${isSidebarOpen ? 'open' : ''}`}
              aria-label={isSidebarOpen ? 'Collapse feature sidebar' : 'Open feature navigation sidebar'}
              aria-expanded={isSidebarOpen}
              title={isSidebarOpen ? 'Collapse feature sidebar (Esc)' : 'Open feature sidebar'}
            >
              {isSidebarOpen ? (
                <X size={20} className="vantiq-toggle-icon" />
              ) : (
                <Menu size={20} className="vantiq-toggle-icon" />
              )}
            </button>

            {/* VANTIQ Brand Logo & Name */}
            <div 
              onClick={() => navigate('/')}
              className="vantiq-brand-link"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') navigate('/'); }}
              title="VANTIQ Dashboard"
            >
              <div className="vantiq-logo-shield">
                <Shield size={20} color="#ffffff" />
              </div>

              <div className="vantiq-brand-meta">
                <div className="vantiq-brand-row">
                  <span className="vantiq-brand-text">VANTIQ</span>
                  <span className="vantiq-brand-pill-dot" />
                  <span className="badge badge-cyan vantiq-brand-badge hide-mobile-badge">
                    CHRONOS-FIN
                  </span>
                </div>
                <p className="vantiq-brand-subtitle hide-mobile-badge">
                  Quantum Counter-Predatory Engine
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="vantiq-header-vdivider hide-mobile-hud" />

            {/* Engine Status (QUANTUM ONLINE) & Latency Indicator */}
            <div className="vantiq-engine-hud hide-mobile-hud">
              <div className="vantiq-engine-chip">
                {/* Radar pulse beacon */}
                <span className="vantiq-beacon-dot-wrap">
                  <span className="vantiq-beacon-wave" />
                  <span className="vantiq-beacon-center" />
                </span>

                <div className="vantiq-engine-telemetry">
                  <span className="vantiq-engine-online">QUANTUM ONLINE</span>
                  <span className="vantiq-engine-divider">|</span>
                  <span className="vantiq-engine-latency">38ms latency</span>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT SECTION: Simulate Free Button & 45s Shield Indicator */}
          {/* ========================================================= */}
          <div className="vantiq-header-right">
            
            {/* 45s Shield Status Indicator & Route Navigation */}
            <button
              onClick={() => {
                triggerNeuroShield();
                navigate('/45s-shield');
              }}
              className={`vantiq-shield-btn ${neuroState.isShieldActive ? 'shield-engaged' : ''}`}
              title={neuroState.isShieldActive ? `45s Shield Active (${neuroState.timerSecondsRemaining}s)` : 'Open 45s Neuro-Adaptive Shield'}
              aria-label="45s Neuro-Adaptive Grounding Shield"
            >
              <Lock 
                size={14} 
                className={`vantiq-shield-icon ${neuroState.isShieldActive ? 'icon-alert' : ''}`} 
              />
              <span className="vantiq-shield-btn-label">
                {neuroState.isShieldActive ? (
                  <>45s Shield: <strong style={{ color: '#f59e0b', fontFamily: 'monospace' }}>{neuroState.timerSecondsRemaining}s</strong></>
                ) : (
                  <>45s Shield</>
                )}
              </span>
              <span className={`vantiq-shield-indicator-dot ${neuroState.isShieldActive ? 'dot-active' : 'dot-idle'}`} />
            </button>

            {/* Simulate Free CTA Button */}
            <button
              onClick={() => navigate('/calculator')}
              className="btn btn-primary vantiq-simulate-cta"
              aria-label="Launch Free Emergency Simulator"
            >
              <Zap size={15} style={{ color: '#fef08a', filter: 'drop-shadow(0 0 4px #facc15)' }} />
              <span>Simulate Free</span>
            </button>

          </div>

        </div>
      </header>

      {/* Embedded High-Performance Header CSS */}
      <style>{`
        /* Sticky Header Base */
        .vantiq-header {
          position: sticky;
          top: 0;
          z-index: 1030;
          background: rgba(5, 9, 20, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(51, 65, 85, 0.45);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          padding: 12px 0;
        }

        .vantiq-header-scrolled {
          background: rgba(5, 9, 20, 0.96);
          border-bottom: 1px solid rgba(16, 185, 129, 0.35);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(16, 185, 129, 0.12);
        }

        .vantiq-header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* LEFT SIDE */
        .vantiq-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        /* Hamburger Toggle Button */
        .vantiq-menu-toggle-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(56, 189, 248, 0.35);
          background: rgba(15, 23, 42, 0.75);
          color: #f8fafc;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.15);
          flex-shrink: 0;
        }

        .vantiq-menu-toggle-btn:hover {
          background: rgba(16, 185, 129, 0.18);
          border-color: #10b981;
          color: #34d399;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.4);
          transform: translateY(-1px);
        }

        .vantiq-menu-toggle-btn.open {
          background: rgba(16, 185, 129, 0.22);
          border-color: #10b981;
          color: #34d399;
          box-shadow: 0 0 18px rgba(16, 185, 129, 0.45);
        }

        .vantiq-toggle-icon {
          transition: transform 0.2s ease;
        }

        .vantiq-menu-toggle-btn:hover .vantiq-toggle-icon {
          transform: scale(1.08);
        }

        /* Brand Logo & Name */
        .vantiq-brand-link {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          text-decoration: none;
          outline: none;
        }

        .vantiq-logo-shield {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #059669 0%, #10b981 50%, #06b6d4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 18px rgba(16, 185, 129, 0.5), inset 0 0 8px rgba(255, 255, 255, 0.3);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .vantiq-brand-link:hover .vantiq-logo-shield {
          transform: scale(1.05);
          box-shadow: 0 0 24px rgba(16, 185, 129, 0.7);
        }

        .vantiq-brand-meta {
          display: flex;
          flex-direction: column;
        }

        .vantiq-brand-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: nowrap;
        }

        .vantiq-brand-text {
          font-size: 1.25rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #ffffff 0%, #34d399 50%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .vantiq-brand-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .vantiq-brand-badge {
          font-size: 0.65rem;
          padding: 2px 8px;
        }

        .vantiq-brand-subtitle {
          font-size: 0.70rem;
          color: #94a3b8;
          margin-top: 1px;
        }

        .vantiq-header-vdivider {
          width: 1px;
          height: 24px;
          background: rgba(51, 65, 85, 0.6);
        }

        /* Engine Status Indicator & Latency */
        .vantiq-engine-hud {
          display: flex;
          align-items: center;
        }

        .vantiq-engine-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 9999px;
          background-color: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.35);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.15);
          font-size: 0.74rem;
          color: #34d399;
        }

        .vantiq-beacon-dot-wrap {
          position: relative;
          display: flex;
          width: 8px;
          height: 8px;
        }

        .vantiq-beacon-wave {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #10b981;
          opacity: 0.75;
          animation: pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .vantiq-beacon-center {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .vantiq-engine-telemetry {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }

        .vantiq-engine-online {
          color: #34d399;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .vantiq-engine-divider {
          color: rgba(255, 255, 255, 0.25);
        }

        .vantiq-engine-latency {
          color: #38bdf8;
          font-family: monospace;
          font-weight: 700;
        }

        /* RIGHT SIDE */
        .vantiq-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* 45s Shield Status Indicator */
        .vantiq-shield-btn {
          padding: 8px 12px;
          font-size: 0.78rem;
          border-radius: 8px;
          border: 1px solid rgba(16, 185, 129, 0.35);
          background-color: rgba(16, 185, 129, 0.08);
          color: #e2e8f0;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .vantiq-shield-btn:hover {
          background-color: rgba(16, 185, 129, 0.18);
          border-color: #10b981;
          box-shadow: 0 0 14px rgba(16, 185, 129, 0.25);
          transform: translateY(-1px);
        }

        .vantiq-shield-btn.shield-engaged {
          border-color: rgba(245, 158, 11, 0.6);
          background-color: rgba(245, 158, 11, 0.12);
          box-shadow: 0 0 18px rgba(245, 158, 11, 0.3);
        }

        .vantiq-shield-icon {
          color: #34d399;
        }

        .vantiq-shield-icon.icon-alert {
          color: #fbbf24;
          animation: pulse 1s infinite;
        }

        .vantiq-shield-indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .vantiq-shield-indicator-dot.dot-idle {
          background-color: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .vantiq-shield-indicator-dot.dot-active {
          background-color: #f59e0b;
          box-shadow: 0 0 8px #f59e0b;
          animation: pulse 1s infinite;
        }

        /* Simulate Free CTA Button */
        .vantiq-simulate-cta {
          font-size: 0.82rem;
          font-weight: 750;
          padding: 8px 16px;
          border-radius: 10px;
          background: linear-gradient(135deg, #059669 0%, #10b981 50%, #06b6d4 100%);
          box-shadow: 0 0 18px rgba(16, 185, 129, 0.45);
          border: 1px solid rgba(52, 211, 153, 0.5);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .vantiq-simulate-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 24px rgba(16, 185, 129, 0.7);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .hide-mobile-hud {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .hide-mobile-badge {
            display: none !important;
          }
          .vantiq-shield-btn-label {
            display: none;
          }
          .vantiq-shield-btn {
            padding: 8px 10px;
          }
          .vantiq-simulate-cta span {
            font-size: 0.76rem;
          }
          .vantiq-simulate-cta {
            padding: 7px 12px;
          }
        }
      `}</style>
    </>
  );
};
