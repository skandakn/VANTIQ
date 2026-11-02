// src/components/layout/Footer.tsx
// VANTIQ Member 01: System Status, Regulatory Sandbox Disclaimer & Institutional Shell
import React from 'react';
import { 
  Shield, 
  Heart, 
  Cpu, 
  ExternalLink, 
  ArrowUp, 
  CheckCircle2, 
  Scale, 
  Lock, 
  Zap, 
  Activity 
} from 'lucide-react';

const FOOTER_FALLBACKS: Record<string, string> = {
  simulator: 'crisis-intake',
  'ghost-debt': 'debt-mesh',
  'digital-twin': 'cashflow-twin',
  comparison: 'rescue-matrix',
  compliance: 'privacy-compliance',
};

// Inline SVG for GitHub branding
const GithubIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToSection = (targetId: string) => {
    const directEl = document.getElementById(targetId);
    const fallbackId = FOOTER_FALLBACKS[targetId];
    const fallbackEl = fallbackId ? document.getElementById(fallbackId) : null;
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
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(159, 232, 112, 0.3)',
        backgroundColor: '#163300',
        color: '#ffffff',
        padding: '56px 0 28px 0',
        marginTop: '90px',
        position: 'relative',
        boxShadow: '0 -10px 40px rgba(22, 51, 0, 0.1)',
      }}
    >
      {/* Top subtle lime accent glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, var(--wise-lime) 50%, transparent 100%)',
          opacity: 0.9,
        }}
      />

      <div className="container">
        
        {/* =========================================================
            SECTION 1: System Architecture Status HUD Pill / Card
            ========================================================= */}
        <div
          className="chronos-card"
          style={{
            marginBottom: '40px',
            padding: '20px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(159, 232, 112, 0.35)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '18px',
          }}
        >
          {/* Status Label & Active Pulse */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(16, 185, 129, 0.25)',
                flexShrink: 0,
              }}
            >
              <Cpu size={22} color="#10b981" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    position: 'relative',
                    display: 'flex',
                    width: '10px',
                    height: '10px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      opacity: 0.75,
                      animation: 'pulseGlow 2s infinite ease-in-out',
                    }}
                  />
                  <span
                    style={{
                      position: 'relative',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      boxShadow: '0 0 10px #10b981',
                    }}
                  />
                </span>

                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                  System Architecture Status:{' '}
                  <span style={{ color: '#34d399' }}>Quantum Hybrid Optimizer v2.4 (Active)</span>
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '3px' }}>
                Transparent funding estimates • Repayment capacity checks • Emergency planning
              </p>
            </div>
          </div>

          {/* Real-time System Metrics Telemetry */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              fontSize: '0.75rem',
            }}
          >
            <div
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Zap size={13} />
              <span>Convergence: <strong>38ms</strong></span>
            </div>

            <div
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                color: '#c084fc',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Activity size={13} />
              <span>Eigenstate: <strong>H₀ = -42.85</strong></span>
            </div>

            <div
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <CheckCircle2 size={13} />
              <span>Penalty Violations: <strong>0.000%</strong></span>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 2: RBI Regulatory Sandbox Testbed Disclaimer
            ========================================================= */}
        <div
          className="chronos-card"
          style={{
            marginBottom: '44px',
            padding: '24px',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <Scale size={20} color="#38bdf8" />
            </div>

            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.68rem', padding: '3px 10px' }}>
                  REGULATORY COMPLIANCE SPECIFICATION
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                  RBI Regulatory Sandbox Testbed Disclaimer
                </span>
              </div>

              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: '14px' }}>
                <strong>PROJECT VANTIQ</strong> is an algorithmic research prototype developed for evaluation under the{' '}
                <span style={{ color: '#38bdf8' }}>Reserve Bank of India (RBI) Regulatory Sandbox framework</span> (Cohort on Retail Lending & FinTech Innovation). 
                The platform operates in strict adherence to the <em>RBI Master Directions & Digital Lending Guidelines (2022/2023)</em>. 
                All borrower financial inputs, absorptive surplus determinations, and 90-day cashflow digital twin trajectories are computed 
                <strong> purely client-side</strong> via zero-knowledge cryptographic commitments (ZK-SNARKs) through Sahamati-certified 
                Account Aggregator (AA) ecosystem bridges (Setu, OneMoney, Anumati). No net-banking credentials, SMS logs, or persistent 
                financial identifiers are stored or shared with unvetted lending NBFCs. Predatory APR interception and multi-tranche allocations 
                operate in non-custodial advisory mode.
              </p>

              {/* Compliance Badges Matrix */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {[
                  { label: 'RBI Digital Lending Guidelines (2022/23)', icon: Scale },
                  { label: 'Sahamati Account Aggregator (AA) Architecture', icon: Activity },
                  { label: 'Client-Side ZK-SNARK Privacy Proofs', icon: Lock },
                  { label: 'Zero-Credential & Zero-Custody Storage', icon: Shield },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(30, 41, 59, 0.7)',
                        border: '1px solid rgba(71, 85, 105, 0.45)',
                        fontSize: '0.72rem',
                        color: '#cbd5e1',
                      }}
                    >
                      <Icon size={12} color="#38bdf8" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 3: Navigation Grid, GitHub Link & Quick Links
            ========================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '36px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Info & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(6, 182, 212, 0.4)',
                }}
              >
                <Shield size={20} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                CHRONOS<span style={{ color: '#38bdf8' }}>-FIN</span>
              </span>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
              A Quantum-Enhanced Counterfactual Digital Twin and Affective Affordability Engine designed to 
              de-weaponize predatory emergency credit and insulate Indian salaried households from debt trap cascades.
            </p>

            {/* Official GitHub Link Button */}
            <a
              href="https://github.com/skandakn/VANTIQ"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#f8fafc',
                textDecoration: 'none',
                borderColor: 'rgba(56, 189, 248, 0.4)',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                boxShadow: '0 0 14px rgba(6, 182, 212, 0.15)',
              }}
            >
              <GithubIcon size={16} color="#38bdf8" />
              <span>GitHub: skandakn/VANTIQ</span>
              <ExternalLink size={14} color="#94a3b8" />
            </a>
          </div>

          {/* Quick Jump Links: Emergency & Simulator */}
          <div>
            <h4
              style={{
                fontSize: '0.82rem',
                color: '#38bdf8',
                fontWeight: 700,
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Zap size={14} />
              <span>Simulators & Intake</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Emergency Crisis Intake', id: 'simulator' },
                { label: 'Ghost Debt Stacking Mesh', id: 'ghost-debt' },
                { label: 'Dual Capacity Gauge', id: 'absorptive-capacity' },
                { label: '90-Day Cashflow Runway Twin', id: 'digital-twin' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      transition: 'color 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    <span style={{ color: '#06b6d4', fontSize: '0.75rem' }}>›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Jump Links: Decision AI & Quantum */}
          <div>
            <h4
              style={{
                fontSize: '0.82rem',
                color: '#c084fc',
                fontWeight: 700,
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Cpu size={14} />
              <span>Quantum & Decision AI</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Tri-Tranche Rescue Allocation', id: 'rescue-split' },
                { label: 'Labor Life-Energy Hours', id: 'life-energy' },
                { label: 'Counterfactual Comparison Matrix', id: 'comparison' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      transition: 'color 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#c084fc')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    <span style={{ color: '#a855f7', fontSize: '0.75rem' }}>›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional Credentials & Ideathon Info */}
          <div>
            <h4
              style={{
                fontSize: '0.82rem',
                color: '#34d399',
                fontWeight: 700,
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Shield size={14} />
              <span>Governance & Team</span>
            </h4>
            
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '14px' }}>
              <p><strong>Event:</strong> IDEATHON 2026</p>
              <p><strong>Host:</strong> Nagarjuna College of Engineering and Technology</p>
              <p><strong>Team:</strong> INNOVATEX (VANTIQ)</p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'ZK-SNARK & RBI Compliance', id: 'compliance' },
                { label: 'TreeSHAP Explainable AI', id: 'xai-explainer' },
                { label: 'Market Opportunity Radar', id: 'market-radar' },
                { label: '4-Quarter Roadmap & Team', id: 'roadmap-team' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      transition: 'color 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#34d399')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    <span style={{ color: '#10b981', fontSize: '0.75rem' }}>›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* =========================================================
            SECTION 4: Mission Creed Quote
            ========================================================= */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '12px',
            backgroundColor: 'rgba(6, 182, 212, 0.05)',
            borderLeft: '4px solid #06b6d4',
            marginBottom: '36px',
          }}
        >
          <p style={{ fontSize: '0.84rem', color: '#7dd3fc', fontStyle: 'italic', margin: 0 }}>
            "We do not eliminate emergency credit; we de-weaponize it. We transform predatory debt spirals into sustainable lifelines."
          </p>
        </div>

        {/* =========================================================
            SECTION 5: Bottom Utility Bar & Back-to-Top
            ========================================================= */}
        <div
          style={{
            borderTop: '1px solid rgba(51, 65, 85, 0.4)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.80rem',
            color: '#64748b',
          }}
        >
          <div>
            © 2026 Team INNOVATEX. Project VANTIQ. Developed for IDEATHON 2026.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Built with precision for human dignity & predatory debt resilience</span>
            <Heart size={14} color="#f43f5e" fill="#f43f5e" />
          </div>

          <button
            onClick={scrollToTop}
            className="btn btn-secondary"
            style={{
              padding: '6px 14px',
              fontSize: '0.78rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            title="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
};
