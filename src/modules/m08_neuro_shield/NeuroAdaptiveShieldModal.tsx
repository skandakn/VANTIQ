// src/modules/m08_neuro_shield/NeuroAdaptiveShieldModal.tsx
// Module 9: Neuro-Adaptive Pacing Shield (45s Reflective Grounding Bridge)
import React, { useEffect } from 'react';
import { Heart, ZapOff, CheckCircle } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const NeuroAdaptiveShieldModal: React.FC = () => {
  const { neuroState, setNeuroState, bypassNeuroShield } = useFintech();

  // 45-second countdown timer
  useEffect(() => {
    let timer: any;
    if (neuroState.isShieldActive && neuroState.timerSecondsRemaining > 0) {
      timer = setInterval(() => {
        setNeuroState((prev) => {
          if (prev.timerSecondsRemaining <= 1) {
            return { ...prev, timerSecondsRemaining: 0, isShieldActive: false };
          }
          return { ...prev, timerSecondsRemaining: prev.timerSecondsRemaining - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [neuroState.isShieldActive, neuroState.timerSecondsRemaining, setNeuroState]);

  if (!neuroState.isShieldActive) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 9, 20, 0.92)',
      backdropFilter: 'blur(20px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="chronos-card glow-cyan" style={{
        maxWidth: '560px',
        width: '100%',
        textAlign: 'center',
        padding: '36px',
        border: '1px solid #06b6d4'
      }}>
        
        {/* Animated Breathing Circle */}
        <div style={{
          width: '90px',
          height: '90px',
          margin: '0 auto 20px auto',
          borderRadius: '50%',
          border: '3px solid #06b6d4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
          animation: 'pulseGlow 3s infinite ease-in-out'
        }}>
          <Heart size={40} color="#38bdf8" />
        </div>

        <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
          MobileBERT Distress Inference Active (Panic Score: {neuroState.panicScore}/100)
        </div>

        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', marginBottom: '12px' }}>
          45-Second Cognitive Grounding
        </h3>

        <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '24px' }}>
          Under acute medical distress, prefrontal cognitive capacity drops by up to 14 IQ points. 
          Take 3 deep breaths while VANTIQ maps safe liquidity.
        </p>

        {/* Countdown Timer Display */}
        <div style={{
          fontSize: '3.2rem',
          fontWeight: 900,
          color: '#38bdf8',
          letterSpacing: '-0.02em',
          marginBottom: '24px'
        }}>
          {neuroState.timerSecondsRemaining}s
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => setNeuroState((prev) => ({ ...prev, isShieldActive: false }))}
            className="btn btn-primary"
            style={{ padding: '12px', width: '100%' }}
          >
            <CheckCircle size={18} />
            <span>I Feel Grounded (Continue with Safe Blend)</span>
          </button>

          <button
            onClick={bypassNeuroShield}
            className="btn btn-secondary"
            style={{
              padding: '10px',
              width: '100%',
              fontSize: '0.8rem',
              color: '#f87171',
              borderColor: 'rgba(239, 68, 68, 0.3)'
            }}
          >
            <ZapOff size={16} />
            <span>Instant Emergency Override (Bypass Grounding)</span>
          </button>
        </div>

        <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '16px' }}>
          *VANTIQ never delays emergency funds. Override is instant and logged for transparency.
        </p>

      </div>
    </div>
  );
};
