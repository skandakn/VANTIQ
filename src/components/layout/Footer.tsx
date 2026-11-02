// src/components/layout/Footer.tsx
// CHRONOS-FIN Member 01: System Status, Regulatory Sandbox Disclaimer & Institutional Shell
import React from 'react';
import { 
  Heart, 
  Cpu, 
  ExternalLink, 
  ArrowUp, 
  CheckCircle2, 
  Zap, 
  Activity 
} from 'lucide-react';

const FOOTER_FALLBACKS: Record<string, string> = {
  simulator: 'crisis-intake',
  'ghost-debt': 'debt-mesh',
  'quantum-solver': 'quantum-knapsack',
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
        borderTop: '1px solid rgba(56, 189, 248, 0.25)',
        backgroundColor: 'rgba(5, 9, 20, 0.98)',
        padding: '56px 0 28px 0',
        marginTop: '90px',
        position: 'relative',
        boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* Top subtle cyan accent glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #06b6d4 50%, transparent 100%)',
          opacity: 0.8,
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
            backgroundColor: 'rgba(10, 17, 36, 0.85)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.12)',
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
                QUBO / QAOA Annealing Kernel • Dynamic Hamiltonian Optimization • Latency: 38ms
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
            © 2026 Team INNOVATEX. Project CHRONOS-FIN. Developed for IDEATHON 2026.
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
