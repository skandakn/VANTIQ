// src/components/layout/PwaInstallModal.tsx
// Comprehensive Cross-Platform PWA Installation Dialog
import React from 'react';
import { 
  Download, 
  X, 
  Smartphone, 
  Monitor, 
  Share2, 
  PlusSquare, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  WifiOff 
} from 'lucide-react';
import { usePwa } from '../../context/PwaContext';

export const PwaInstallModal: React.FC = () => {
  const { 
    showInstallModal, 
    setShowInstallModal, 
    isInstalled, 
    isIos, 
    promptInstall 
  } = usePwa();

  if (!showInstallModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-install-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(22, 51, 0, 0.55)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'pwaModalFadeIn 0.2s ease',
      }}
      onClick={() => setShowInstallModal(false)}
    >
      <div
        className="vantiq-card"
        style={{
          maxWidth: '460px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1.5px solid #d0d7cc',
          boxShadow: '0 24px 60px rgba(22, 51, 0, 0.20), 0 4px 12px rgba(0, 0, 0, 0.05)',
          padding: '28px',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowInstallModal(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-deep, #f4f5f1)',
            border: '1px solid var(--border-medium, #d0d7cc)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary, #425444)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          aria-label="Close installation dialog"
        >
          <X size={16} />
        </button>

        {/* Brand App Icon Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: 'var(--wise-forest, #163300)',
              color: 'var(--wise-lime, #9fe870)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(22, 51, 0, 0.20)',
              flexShrink: 0,
            }}
          >
            <Download size={26} strokeWidth={2.2} />
          </div>
          <div>
            <h2
              id="pwa-install-title"
              style={{
                fontSize: '1.28rem',
                fontWeight: 850,
                color: 'var(--wise-forest, #163300)',
                letterSpacing: '-0.02em',
                margin: '0 0 4px 0',
              }}
            >
              Install VANTIQ App
            </h2>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary, #425444)' }}>
              Progressive Web App for Desktop & Mobile
            </p>
          </div>
        </div>

        {/* Status: Already Installed */}
        {isInstalled ? (
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: '#eef5ea',
              border: '1px solid #c9dec2',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <CheckCircle2 size={36} color="#15803d" style={{ margin: '0 auto 10px auto' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--wise-forest, #163300)', margin: '0 0 6px 0' }}>
              VANTIQ is Already Installed!
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#385036', margin: 0 }}>
              You are running VANTIQ in standalone app mode with offline data precaching enabled.
            </p>
          </div>
        ) : (
          <>
            {/* Feature Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                marginBottom: '22px',
              }}
            >
              <div
                style={{
                  padding: '12px 8px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-deep, #f4f5f1)',
                  border: '1px solid var(--border-subtle, #e5e9e2)',
                  textAlign: 'center',
                }}
              >
                <Zap size={18} color="var(--wise-forest, #163300)" style={{ margin: '0 auto 6px auto' }} />
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--wise-forest, #163300)' }}>
                  Instant Launch
                </div>
                <div style={{ fontSize: '0.64rem', color: 'var(--text-muted, #6b7f6e)' }}>
                  Zero loading lag
                </div>
              </div>

              <div
                style={{
                  padding: '12px 8px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-deep, #f4f5f1)',
                  border: '1px solid var(--border-subtle, #e5e9e2)',
                  textAlign: 'center',
                }}
              >
                <WifiOff size={18} color="var(--wise-forest, #163300)" style={{ margin: '0 auto 6px auto' }} />
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--wise-forest, #163300)' }}>
                  Offline Ready
                </div>
                <div style={{ fontSize: '0.64rem', color: 'var(--text-muted, #6b7f6e)' }}>
                  Works without Wi-Fi
                </div>
              </div>

              <div
                style={{
                  padding: '12px 8px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-deep, #f4f5f1)',
                  border: '1px solid var(--border-subtle, #e5e9e2)',
                  textAlign: 'center',
                }}
              >
                <ShieldCheck size={18} color="var(--wise-forest, #163300)" style={{ margin: '0 auto 6px auto' }} />
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--wise-forest, #163300)' }}>
                  Secure Sandbox
                </div>
                <div style={{ fontSize: '0.64rem', color: 'var(--text-muted, #6b7f6e)' }}>
                  Client-side encrypted
                </div>
              </div>
            </div>

            {/* Platform Specific Guides */}
            {isIos ? (
              // iOS Safari Installation Instructions
              <div
                style={{
                  padding: '16px 18px',
                  borderRadius: '14px',
                  backgroundColor: '#fbfcf9',
                  border: '1px solid #dbe2d6',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Smartphone size={17} color="var(--wise-forest, #163300)" />
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--wise-forest, #163300)' }}>
                    Install on iPhone / iPad:
                  </span>
                </div>
                <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text-secondary, #425444)', lineHeight: 1.6 }}>
                  <li style={{ marginBottom: '6px' }}>
                    Tap the <strong>Share</strong> icon <Share2 size={13} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> in the Safari toolbar.
                  </li>
                  <li style={{ marginBottom: '6px' }}>
                    Scroll down and select <strong>"Add to Home Screen"</strong> <PlusSquare size={13} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} />.
                  </li>
                  <li>
                    Tap <strong>Add</strong> in the top right corner.
                  </li>
                </ol>
              </div>
            ) : (
              // Desktop Chrome / Edge / Android Instructions
              <div
                style={{
                  padding: '16px 18px',
                  borderRadius: '14px',
                  backgroundColor: '#fbfcf9',
                  border: '1px solid #dbe2d6',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Monitor size={17} color="var(--wise-forest, #163300)" />
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--wise-forest, #163300)' }}>
                    Desktop & Android One-Click:
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary, #425444)', lineHeight: 1.5 }}>
                  Click the <strong>Install Now</strong> button below. If your browser prompts you, click <strong>"Install"</strong> to add VANTIQ to your Applications or Home Screen.
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.74rem', color: 'var(--text-muted, #6b7f6e)' }}>
                  Tip: In Chrome or Edge, you can also click the <strong>Install (⊕)</strong> icon in the browser address bar.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  promptInstall();
                }}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  padding: '12px 18px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--wise-forest, #163300)',
                  color: 'var(--wise-lime, #9fe870)',
                  fontWeight: 800,
                  fontSize: '0.90rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(22, 51, 0, 0.18)',
                }}
              >
                <Download size={16} />
                <span>Install Now</span>
              </button>

              <button
                onClick={() => setShowInstallModal(false)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--bg-deep, #f4f5f1)',
                  border: '1px solid var(--border-medium, #d0d7cc)',
                  color: 'var(--wise-forest, #163300)',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                }}
              >
                Maybe Later
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes pwaModalFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
