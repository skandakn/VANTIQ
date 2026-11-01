import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle, Heart, ShieldAlert } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

type ShieldState = {
  isActive?: boolean;
  isShieldActive?: boolean;
  active?: boolean;
  secondsRemaining?: number;
  countdown?: number;
  timerSecondsRemaining?: number;
};

type ShieldFintech = {
  shieldState?: ShieldState;
  setShieldActive?: (active: boolean) => void;
  tickShieldCountdown?: () => void;
  neuroState?: ShieldState;
  setNeuroState?: React.Dispatch<React.SetStateAction<ShieldState>>;
};

const TOTAL_SECONDS = 45;
const REFLECTION = 'Do you acknowledge this ₹50,000 loan requires 96 hours of future labor?';
const BYPASS_LABEL = 'I understand the long-term risk and wish to proceed';

const phaseForElapsed = (elapsed: number) => {
  const phaseSecond = elapsed % 12;
  if (phaseSecond < 4) return { label: 'Inhale', instruction: 'Breathe in gently', progress: (phaseSecond + 1) / 4 };
  if (phaseSecond < 8) return { label: 'Hold', instruction: 'Hold comfortably', progress: 1 };
  return { label: 'Exhale', instruction: 'Breathe out slowly', progress: 1 - ((phaseSecond - 8) + 1) / 4 };
};

export const NeuroAdaptiveShieldModal: React.FC = () => {
  const fintech = useFintech() as unknown as ShieldFintech;
  const shieldState = fintech.shieldState ?? fintech.neuroState ?? {};
  const setShieldActive = fintech.setShieldActive ?? ((active: boolean) => {
    fintech.setNeuroState?.((previous) => ({ ...previous, isShieldActive: active, timerSecondsRemaining: active ? TOTAL_SECONDS : 0 }));
  });
  const tickShieldCountdown = fintech.tickShieldCountdown ?? (() => {
    fintech.setNeuroState?.((previous) => ({
      ...previous,
      timerSecondsRemaining: Math.max(0, (previous.timerSecondsRemaining ?? TOTAL_SECONDS) - 1),
      isShieldActive: (previous.timerSecondsRemaining ?? TOTAL_SECONDS) > 1,
    }));
  });
  const active = Boolean(shieldState.isActive ?? shieldState.isShieldActive ?? shieldState.active);
  const remaining = Math.max(0, Math.min(TOTAL_SECONDS,
    shieldState.secondsRemaining ?? shieldState.countdown ?? shieldState.timerSecondsRemaining ?? TOTAL_SECONDS));
  const [bypassConfirmed, setBypassConfirmed] = useState(false);
  const elapsed = TOTAL_SECONDS - remaining;
  const phase = useMemo(() => phaseForElapsed(elapsed), [elapsed]);

  useEffect(() => {
    if (!active || remaining <= 0) return;
    const interval = window.setInterval(tickShieldCountdown, 1000);
    return () => window.clearInterval(interval);
  }, [active, remaining, tickShieldCountdown]);

  // Prevent rapid acceptance actions in the underlying app during the grounding pause.
  useEffect(() => {
    if (!active) return;
    const targets = Array.from(document.querySelectorAll<HTMLButtonElement>('button:not([data-shield-control])'))
      .filter((button) => /accept|borrow|take loan|instant|disburse|confirm|proceed/i.test(button.innerText));
    const previous = targets.map((button) => ({ button, disabled: button.disabled }));
    targets.forEach((button) => { button.disabled = true; button.setAttribute('aria-disabled', 'true'); });
    return () => previous.forEach(({ button, disabled }) => {
      button.disabled = disabled;
      if (!disabled) button.removeAttribute('aria-disabled');
    });
  }, [active]);

  useEffect(() => {
    if (!active) setBypassConfirmed(false);
  }, [active]);

  const finishGrounding = () => setShieldActive(false);

  return (
    <>

      {active && (
        <div role="presentation" style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', padding: 20, background: 'rgba(22, 51, 0, 0.45)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
          <section role="dialog" aria-modal="true" aria-labelledby="shield-title" className="chronos-card"
            style={{ width: '100%', maxWidth: 540, boxSizing: 'border-box', padding: 36, backgroundColor: '#ffffff', border: '1.5px solid #d0d7cc', textAlign: 'center', boxShadow: '0 24px 90px rgba(22, 51, 0, 0.18)', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, color: '#15803d' }}><ShieldAlert size={28} /></div>
            <div className="badge badge-forest" style={{ marginBottom: 14 }}>A pause for a considered decision</div>
            <h2 id="shield-title" style={{ color: 'var(--wise-forest)', fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Emergency Grounding</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 auto 24px', maxWidth: 440, fontSize: '0.95rem' }}>Take a moment to steady your breathing and review the commitment before continuing.</p>

            <div aria-label={`${remaining} seconds remaining`} style={{ width: 140, height: 140, margin: '0 auto 20px', position: 'relative' }}>
              <svg viewBox="0 0 120 120" width="140" height="140" role="img" aria-hidden="true" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e9e2" strokeWidth="8" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--wise-forest)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 52} strokeDashoffset={2 * Math.PI * 52 * (1 - remaining / TOTAL_SECONDS)}
                  style={{ transition: 'stroke-dashoffset 900ms linear' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeContent: 'center' }}>
                <strong style={{ color: 'var(--wise-forest)', fontSize: '2.4rem', lineHeight: 1, fontWeight: 900 }}>{remaining}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '.72rem', marginTop: 4, fontWeight: 700 }}>SECONDS</span>
              </div>
            </div>

            <div style={{ borderRadius: 16, background: '#edf4ea', border: '1px solid #cce0c6', padding: '18px 20px', marginBottom: 18 }}>
              <div style={{ width: 72, height: 72, margin: '0 auto 10px', borderRadius: '50%', border: '2.5px solid var(--wise-forest)', display: 'grid', placeItems: 'center', color: 'var(--wise-forest)', transform: `scale(${0.85 + phase.progress * 0.3})`, transition: 'transform 900ms ease-in-out', backgroundColor: '#ffffff' }}><Heart size={26} /></div>
              <div aria-live="polite" style={{ color: 'var(--wise-forest)', fontWeight: 800, fontSize: '1.15rem' }}>{phase.label}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '.88rem', marginTop: 3 }}>{phase.instruction} · 4 seconds</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '.75rem', marginTop: 6, fontWeight: 600 }}>Inhale 4s · Hold 4s · Exhale 4s</div>
            </div>

            <div style={{ borderRadius: 14, border: '1px solid #fed7aa', background: '#fffbeb', padding: '16px 18px', marginBottom: 18, textAlign: 'left' }}>
              <div style={{ color: '#b45309', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 800, marginBottom: 6 }}>Reflect before you decide</div>
              <p style={{ color: '#78350f', fontWeight: 700, lineHeight: 1.5, margin: 0, fontSize: '0.92rem' }}>{REFLECTION}</p>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, textAlign: 'left', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '.86rem', lineHeight: 1.45, margin: '0 0 16px', fontWeight: 600 }}>
              <input type="checkbox" checked={bypassConfirmed} onChange={(event) => setBypassConfirmed(event.target.checked)} style={{ marginTop: 2, accentColor: 'var(--wise-forest)', width: 16, height: 16, flex: '0 0 auto' }} />
              <span>{BYPASS_LABEL}</span>
            </label>

            <div style={{ display: 'grid', gap: 10 }}>
              <button type="button" data-shield-control onClick={finishGrounding} disabled={remaining > 0} className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: 14, fontSize: '0.95rem', opacity: remaining > 0 ? .55 : 1, cursor: remaining > 0 ? 'not-allowed' : 'pointer' }}>
                <CheckCircle size={18} /> {remaining > 0 ? 'Continue when the grounding pause ends' : 'I acknowledge and wish to continue'}
              </button>
              {bypassConfirmed && <button type="button" data-shield-control onClick={finishGrounding} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: 12, color: '#dc2626', borderColor: '#fca5a5' }}>Proceed with the intentional bypass</button>}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '.75rem', lineHeight: 1.5, margin: '14px 0 0' }}>The grounding pause is optional; selecting the bypass is an explicit choice.</p>
          </section>
        </div>
      )}
    </>
  );
};
