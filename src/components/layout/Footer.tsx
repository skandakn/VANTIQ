// src/components/layout/Footer.tsx
// VANTIQ: Modern Sovereign Financial Protection & Anti-Predatory Liquidity Architecture
import React from 'react';
import { 
  Shield, 
  ArrowUp, 
  Zap, 
  Activity, 
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(159, 232, 112, 0.25)',
        backgroundColor: 'var(--wise-forest, #163300)',
        color: '#ffffff',
        padding: '48px 0 28px 0',
        marginTop: '60px',
        position: 'relative',
      }}
    >
      {/* Lime Accent Glow Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, var(--wise-lime, #9fe870) 50%, transparent 100%)',
          opacity: 0.8,
        }}
      />

      <div className="container">
        
        {/* Main Footer Navigation & Brand Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            marginBottom: '36px',
          }}
        >
          {/* Brand Info & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--wise-lime, #9fe870)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Shield size={18} color="var(--wise-forest, #163300)" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                VANTIQ
              </span>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#a3b899', lineHeight: 1.6, maxWidth: '320px', margin: 0 }}>
              Anti-predatory emergency debt shield, stochastic cashflow digital twin, and zero-knowledge liquidity coordination.
            </p>
          </div>

          {/* Core Feature Links */}
          <div>
            <h4
              style={{
                fontSize: '0.78rem',
                color: 'var(--wise-lime, #9fe870)',
                fontWeight: 800,
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Emergency Tools
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <li>
                <Link
                  to="/calculator"
                  style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Zap size={13} color="var(--wise-lime, #9fe870)" />
                  <span>Emergency Shock Calculator</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cash-runway"
                  style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Activity size={13} color="var(--wise-lime, #9fe870)" />
                  <span>90-Day Cashflow Digital Twin</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Verification Links */}
          <div>
            <h4
              style={{
                fontSize: '0.78rem',
                color: 'var(--wise-lime, #9fe870)',
                fontWeight: 800,
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Privacy &amp; Defense
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <li>
                <Link
                  to="/calculator"
                  style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Lock size={13} color="var(--wise-lime, #9fe870)" />
                  <span>Zero-Knowledge Proof Security</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Sovereign User Profile &amp; MFA</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Architecture Notes */}
          <div>
            <h4
              style={{
                fontSize: '0.78rem',
                color: 'var(--wise-lime, #9fe870)',
                fontWeight: 800,
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Open Architecture
            </h4>
            <p style={{ fontSize: '0.80rem', color: '#94a3b8', lineHeight: 1.5, margin: '0 0 10px 0' }}>
              Client-side mathematical optimization with zero persistent credential storage. Built for transparency and consumer financial dignity.
            </p>
            <a
              href="https://github.com/skandakn/VANTIQ"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#ffffff',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <span>GitHub Repository</span>
            </a>
          </div>

        </div>

        {/* Bottom Clean Utility Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.78rem',
            color: '#8b9f85',
          }}
        >
          <div>
            &copy; 2026 VANTIQ. All rights reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#cbd5e1',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
};
