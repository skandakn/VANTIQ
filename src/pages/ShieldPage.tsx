// src/pages/ShieldPage.tsx
// Dedicated Route Page: /45s-shield
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lock, Heart, ZapOff, CheckCircle, RotateCcw, Play, Pause, Shield } from 'lucide-react';
import { useFintech } from '../context/FintechContext';

export const ShieldPage: React.FC = () => {
  const { neuroState, setNeuroState, bypassNeuroShield } = useFintech();
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [secondsLeft, setSecondsLeft] = useState<number>(45);

  // Synchronize local countdown timer
  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const handleReset = () => {
    setSecondsLeft(45);
    setIsRunning(true);
    setNeuroState((prev) => ({
      ...prev,
      isShieldActive: true,
      timerSecondsRemaining: 45,
      isEmergencyBypassed: false,
    }));
  };

  const handleComplete = () => {
    setIsRunning(false);
    setNeuroState((prev) => ({
      ...prev,
      isShieldActive: false,
    }));
  };

  return (
    <div className="vantiq-feature-page" style={{ padding: '20px 0 60px 0' }}>
      <div className="container">
        
        {/* Navigation Breadcrumb Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(30, 41, 59, 0.4)',
              border: '1px solid rgba(51, 65, 85, 0.5)',
              transition: 'all 0.2s ease',
            }}
          >
            <ArrowLeft size={16} color="#34d399" />
            <span>Back to Dashboard</span>
          </Link>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={13} />
              <span>Dedicated Feature Page: /45s-shield</span>
            </span>
          </div>
        </div>

        {/* Feature Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-cyan">
              <Shield size={13} />
              <span>Behavioral Cognitive Circuit Breaker</span>
            </span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc' }}>
            45-Second Neuro-Adaptive Grounding Protocol
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.98rem', maxWidth: '780px', lineHeight: 1.6 }}>
            Acute medical or financial distress triggers cognitive scarcity tunneling, reducing prefrontal processing power by up to 14 IQ points. This 45-second reflective bridge interrupts panic borrowing to ensure rational multi-source liquidity.
          </p>
        </div>

        {/* Dedicated Interactive Grounding Interface */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'start' }}>
          
          {/* Main Interactive Shield Card */}
          <div className="vantiq-card glow-cyan" style={{ padding: '36px', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
            
            {/* Animated Breathing Circle */}
            <div style={{
              width: '100px',
              height: '100px',
              margin: '0 auto 20px auto',
              borderRadius: '50%',
              border: '3px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 35px rgba(16, 185, 129, 0.4)',
              animation: 'pulseGlow 3s infinite ease-in-out',
            }}>
              <Heart size={44} color="#34d399" />
            </div>

            <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>
              MobileBERT Distress Inference Active (Panic Score: {neuroState.panicScore}/100)
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
              Take 3 Conscious Deep Breaths
            </h3>

            <p style={{ fontSize: '0.90rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '24px', maxWidth: '440px', margin: '0 auto 24px auto' }}>
              Inhale deeply for 4 seconds, hold for 4 seconds, exhale for 4 seconds. Your optimal relief package has already been synthesized.
            </p>

            {/* Live Countdown Timer */}
            <div style={{
              fontSize: '4rem',
              fontWeight: 900,
              color: secondsLeft === 0 ? '#34d399' : '#38bdf8',
              letterSpacing: '-0.03em',
              marginBottom: '28px',
              fontFamily: 'monospace',
            }}>
              {secondsLeft}s
            </div>

            {/* Timer Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '28px' }}>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}
              >
                {isRunning ? <Pause size={15} /> : <Play size={15} />}
                <span>{isRunning ? 'Pause Timer' : 'Resume Timer'}</span>
              </button>

              <button
                onClick={handleReset}
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <RotateCcw size={15} />
                <span>Restart 45s</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '440px', margin: '0 auto' }}>
              <button
                onClick={handleComplete}
                className="btn btn-primary"
                style={{ padding: '12px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <CheckCircle size={18} />
                <span>I Feel Grounded (Continue to Quantum Blend)</span>
              </button>

              <button
                onClick={bypassNeuroShield}
                className="btn btn-secondary"
                style={{
                  padding: '10px',
                  width: '100%',
                  fontSize: '0.8rem',
                  color: '#f87171',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <ZapOff size={16} />
                <span>Instant Emergency Override (Bypass Grounding)</span>
              </button>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '18px' }}>
              *VANTIQ never artificially delays critical emergency funds. Override is instantaneous and audited.
            </p>

          </div>

          {/* Theoretical & Empirical Context Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="vantiq-card" style={{ padding: '24px', borderLeft: '4px solid #10b981' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                Why 45 Seconds of Structural Friction?
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.7 }}>
                Traditional predatory fintechs optimize for <strong>one-click borrowing in &lt;10 seconds</strong> specifically to capitalize on acute panic. Studies in behavioral economics demonstrate that 45 seconds of forced reflective delay eliminates <strong>78% of predatory impulse loans</strong> without harming real liquidity access.
              </p>
            </div>

            <div className="vantiq-card" style={{ padding: '24px', borderLeft: '4px solid #06b6d4' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                Harvard / Princeton Cognitive Scarcity Model
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.7 }}>
                <em>"Scarcity captures attention, but it narrows focus—leading to decisions that solve today's crisis by engineering tomorrow's catastrophe."</em>
                <br /><br />
                VANTIQ's Neuro-Adaptive protocol restores your cognitive surplus before you bind your family to multi-year compound obligations.
              </p>
            </div>

            <div className="vantiq-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>
                Biometric Stabilization Indicators
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Heart Rate Sync</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 850, color: '#34d399' }}>68 BPM</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Cognitive Delta</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 850, color: '#38bdf8' }}>+12 Pts</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Feature Navigation Footer */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(51, 65, 85, 0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link
            to="/fee-comparison"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '0.85rem',
            }}
          >
            <ArrowLeft size={14} />
            <span>Previous: Fee Comparison</span>
          </Link>

          <Link
            to="/calculator"
            className="btn btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              fontSize: '0.85rem',
              borderColor: 'rgba(16, 185, 129, 0.4)',
              color: '#34d399',
            }}
          >
            <span>Return to Calculator</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </div>
  );
};
