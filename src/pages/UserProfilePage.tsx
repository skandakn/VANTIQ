// src/pages/UserProfilePage.tsx
// VANTIQ: User Security & Identity Management with Clerk UserProfile
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserProfile, RedirectToSignIn } from '@clerk/react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { SignedIn, SignedOut, CLERK_APPEARANCE } from '../config/clerk';

export const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg, #f4f5f1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
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
            <span>Back to Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Profile Manager */}
      <main
        style={{
          flex: 1,
          padding: '40px 20px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: '840px', marginBottom: '24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: '#edf4e8',
              border: '1px solid #d4e5cb',
              marginBottom: '12px',
            }}
          >
            <ShieldCheck size={16} color="#15803d" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase' }}>
              Clerk Security & Identity Settings
            </span>
          </div>

          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: 'var(--wise-forest, #163300)',
              margin: '0 0 8px',
            }}
          >
            Account Security & Identity
          </h1>
          <p style={{ fontSize: '0.94rem', color: '#566a54', margin: 0 }}>
            Manage your credentials, Multi-Factor Authentication (MFA), connected security devices, and active sessions.
          </p>
        </div>

        <SignedIn>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <UserProfile 
              appearance={CLERK_APPEARANCE}
              routing="path"
              path="/profile"
            />
          </div>
        </SignedIn>

        <SignedOut>
          <RedirectToSignIn redirectUrl="/profile" />
        </SignedOut>
      </main>
    </div>
  );
};

export default UserProfilePage;
