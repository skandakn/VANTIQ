// src/pages/LoginPage.tsx
// VANTIQ: Premium Sovereign Emergency Finance Authentication Portal
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  SignIn, 
  SignUp, 
  useUser, 
  SignOutButton 
} from '@clerk/react';
import { 
  ShieldCheck, 
  Lock, 
  Zap, 
  ArrowLeft, 
  Activity, 
  Layers, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { SignedIn, SignedOut, CLERK_APPEARANCE } from '../config/clerk';

interface LoginPageProps {
  initialMode?: 'sign-in' | 'sign-up';
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  // Determine mode from props or path
  const isSignUpPath = location.pathname.includes('sign-up') || location.pathname.includes('register') || initialMode === 'sign-up';
  const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>(isSignUpPath ? 'sign-up' : 'sign-in');

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg, #f4f5f1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Minimalistic Header */}
      <header
        style={{
          borderBottom: '1px solid #e5e9e2',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div 
          className="container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--wise-forest, #163300)',
                color: 'var(--wise-lime, #9fe870)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.25rem',
              }}
            >
              V
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  color: 'var(--wise-forest, #163300)',
                }}
              >
                vantiq
              </span>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--wise-lime, #9fe870)',
                }}
              />
            </div>
          </Link>

          {/* Return link */}
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: 'var(--wise-forest, #163300)',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '8px 14px',
              borderRadius: '9999px',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e8eee4')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <ArrowLeft size={16} />
            <span>Back to Optimizer</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px 60px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(360px, 1fr)',
            gap: '48px',
            alignItems: 'center',
          }}
          className="login-grid-wrapper"
        >
          {/* Left Column: Security Showcase & Value Proposition */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Pill Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: '#edf4e8',
                border: '1px solid #d4e5cb',
                width: 'fit-content',
              }}
            >
              <ShieldCheck size={16} color="#15803d" />
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#15803d',
                }}
              >
                Clerk Identity Vault • RBI Data Protection Compliant
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 2.85rem)',
                  fontWeight: 900,
                  lineHeight: 1.12,
                  letterSpacing: '-0.04em',
                  color: 'var(--wise-forest, #163300)',
                  marginBottom: '14px',
                }}
              >
                Your Emergency Financial Control Room, Fully Encrypted.
              </h1>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.55,
                  color: '#4a5d48',
                  maxWidth: '520px',
                }}
              >
                Sign in to save your debt meshes, lock down emergency rescue blends, and simulate stress-tested cashflow runways across devices.
              </p>
            </div>

            {/* Feature Points Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e9e2',
                  boxShadow: '0 4px 12px rgba(22, 51, 0, 0.03)',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#eaf4e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Layers size={19} color="#163300" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--wise-forest, #163300)', margin: '0 0 3px' }}>
                    Persistent Emergency Debt Mesh
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#566a54', margin: 0, lineHeight: 1.45 }}>
                    Save detected predatory debt cycles, hidden balloon interest, and cross-guarantee exposures securely.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e9e2',
                  boxShadow: '0 4px 12px rgba(22, 51, 0, 0.03)',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#eaf4e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Lock size={19} color="#15803d" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--wise-forest, #163300)', margin: '0 0 3px' }}>
                    45-Second Neuro Shield Profiles
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#566a54', margin: 0, lineHeight: 1.45 }}>
                    Configure personalized cognitive cool-down rules to prevent panic loans during urgent family crises.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e9e2',
                  boxShadow: '0 4px 12px rgba(22, 51, 0, 0.03)',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#eaf4e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Activity size={19} color="#0284c7" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--wise-forest, #163300)', margin: '0 0 3px' }}>
                    90-Day Digital Runway Twin
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#566a54', margin: 0, lineHeight: 1.45 }}>
                    Sync recurring medical EMI obligations, employer PF liquidity, and counterfactual scenario forecasts.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                padding: '16px 20px',
                borderRadius: '14px',
                backgroundColor: 'rgba(235, 243, 230, 0.65)',
                border: '1px solid #dce8d5',
              }}
            >
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--wise-forest, #163300)' }}>
                  ₹14.8 Cr+
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5b7058' }}>
                  Emergency Relief Scanned
                </div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#15803d' }}>
                  100% ZK
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5b7058' }}>
                  Zero-Knowledge Proofs
                </div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--wise-forest, #163300)' }}>
                  256-Bit
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5b7058' }}>
                  Military Grade MFA
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Clerk Auth Component */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            
            {/* If user is ALREADY signed in */}
            <SignedIn>
              <div
                style={{
                  width: '100%',
                  maxWidth: '460px',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e5e9e2',
                  padding: '36px 30px',
                  boxShadow: '0 20px 45px -10px rgba(22, 51, 0, 0.09)',
                  textAlign: 'center',
                }}
              >
                {/* Active Session Avatar */}
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    backgroundColor: '#e5ebd0',
                    border: '3px solid var(--wise-lime, #9fe870)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px',
                    overflow: 'hidden',
                  }}
                >
                  {user?.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={user.fullName || 'User'} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <UserCheck size={36} color="var(--wise-forest, #163300)" />
                  )}
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    color: '#065f46',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                    }}
                  />
                  <span>Active Session Authenticated</span>
                </div>

                <h2
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    color: 'var(--wise-forest, #163300)',
                    margin: '0 0 6px',
                  }}
                >
                  Welcome back, {user?.firstName || user?.fullName || 'Finance Champion'}!
                </h2>

                <p style={{ fontSize: '0.86rem', color: '#566a54', margin: '0 0 24px' }}>
                  {user?.primaryEmailAddress?.emailAddress}
                </p>

                {/* Direct quick routes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <button
                    onClick={() => navigate('/')}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--wise-forest, #163300)',
                      color: 'var(--wise-lime, #9fe870)',
                      fontWeight: 800,
                      fontSize: '0.94rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0d1f00')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--wise-forest, #163300)')}
                  >
                    <span>Open Emergency Dashboard</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => navigate('/calculator')}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: '#f4f5f1',
                      color: 'var(--wise-forest, #163300)',
                      fontWeight: 700,
                      fontSize: '0.90rem',
                      border: '1px solid #d8e2d4',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e8eee4')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f4f5f1')}
                  >
                    <Zap size={16} color="var(--wise-forest, #163300)" />
                    <span>Run Quantum Debt Calculator</span>
                  </button>

                  <button
                    onClick={() => navigate('/profile')}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      color: '#4b5e4a',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      border: '1px solid #e5e9e2',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <ShieldCheck size={15} />
                    <span>Manage Security & Passkeys</span>
                  </button>
                </div>

                <div style={{ borderTop: '1px solid #e5e9e2', paddingTop: '16px' }}>
                  <SignOutButton>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: '6px 14px',
                      }}
                    >
                      Sign Out of VANTIQ
                    </button>
                  </SignOutButton>
                </div>
              </div>
            </SignedIn>

            {/* If user is SIGNED OUT: Render interactive Clerk Form */}
            <SignedOut>
              <div style={{ width: '100%', maxWidth: '460px' }}>
                
                {/* Switcher Tabs */}
                <div
                  style={{
                    display: 'flex',
                    backgroundColor: '#e7ede3',
                    padding: '4px',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    border: '1px solid #d4dec0',
                  }}
                >
                  <button
                    onClick={() => setActiveTab('sign-in')}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: activeTab === 'sign-in' ? 800 : 600,
                      border: 'none',
                      backgroundColor: activeTab === 'sign-in' ? '#ffffff' : 'transparent',
                      color: 'var(--wise-forest, #163300)',
                      cursor: 'pointer',
                      boxShadow: activeTab === 'sign-in' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab('sign-up')}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: activeTab === 'sign-up' ? 800 : 600,
                      border: 'none',
                      backgroundColor: activeTab === 'sign-up' ? '#ffffff' : 'transparent',
                      color: 'var(--wise-forest, #163300)',
                      cursor: 'pointer',
                      boxShadow: activeTab === 'sign-up' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Create Free Account
                  </button>
                </div>

                {/* Clerk Native Embedded Component */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {activeTab === 'sign-in' ? (
                    <SignIn 
                      appearance={CLERK_APPEARANCE}
                      routing="path"
                      path="/login"
                      signUpUrl="/sign-up"
                      fallbackRedirectUrl="/"
                    />
                  ) : (
                    <SignUp 
                      appearance={CLERK_APPEARANCE}
                      routing="path"
                      path="/sign-up"
                      signInUrl="/login"
                      fallbackRedirectUrl="/"
                    />
                  )}
                </div>

                {/* Guest alternative */}
                <div
                  style={{
                    marginTop: '20px',
                    textAlign: 'center',
                    padding: '14px',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    border: '1px dashed #ced9c7',
                  }}
                >
                  <span style={{ fontSize: '0.82rem', color: '#566a54', display: 'block', marginBottom: '8px' }}>
                    Need urgent emergency calculations right now?
                  </span>
                  <button
                    onClick={() => navigate('/calculator')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--wise-forest, #163300)',
                      fontWeight: 800,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    <Zap size={14} color="#15803d" />
                    <span>Run Emergency Simulator as Guest →</span>
                  </button>
                </div>

              </div>
            </SignedOut>

          </div>

        </div>
      </main>

      {/* Embedded CSS for responsive breakdown */}
      <style>{`
        @media (max-width: 900px) {
          .login-grid-wrapper {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
