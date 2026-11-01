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
        <div role="presentation" style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', padding: 20, background: 'rgba(3, 8, 20, .92)', backdropFilter: 'blur(18px)' }}>
          <section role="dialog" aria-modal="true" aria-labelledby="shield-title" className="chronos-card glow-cyan"
            style={{ width: '100%', maxWidth: 560, boxSizing: 'border-box', padding: 32, border: '1px solid rgba(34,211,238,.55)', textAlign: 'center', boxShadow: '0 24px 90px rgba(0,0,0,.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10, color: '#67e8f9' }}><ShieldAlert size={22} /></div>
            <div className="badge badge-cyan" style={{ marginBottom: 12 }}>A pause for a considered decision</div>
            <h2 id="shield-title" style={{ color: '#f8fafc', fontSize: '1.55rem', margin: '0 0 8px' }}>Emergency Grounding</h2>
            <p style={{ color: '#cbd5e1', lineHeight: 1.55, margin: '0 auto 22px', maxWidth: 440 }}>Take a moment to steady your breathing and review the commitment before continuing.</p>

            <div aria-label={`${remaining} seconds remaining`} style={{ width: 150, height: 150, margin: '0 auto 20px', position: 'relative' }}>
              <svg viewBox="0 0 120 120" width="150" height="150" role="img" aria-hidden="true" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(148,163,184,.2)" strokeWidth="7" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="#22d3ee" strokeWidth="7" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 52} strokeDashoffset={2 * Math.PI * 52 * (1 - remaining / TOTAL_SECONDS)}
                  style={{ transition: 'stroke-dashoffset 900ms linear', filter: 'drop-shadow(0 0 5px rgba(34,211,238,.65))' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeContent: 'center' }}>
                <strong style={{ color: '#f8fafc', fontSize: '2.3rem', lineHeight: 1 }}>{remaining}</strong>
                <span style={{ color: '#94a3b8', fontSize: '.72rem', marginTop: 4 }}>SECONDS</span>
              </div>
            </div>

            <div style={{ borderRadius: 14, background: 'rgba(8,47,73,.42)', border: '1px solid rgba(34,211,238,.2)', padding: '17px 18px', marginBottom: 16 }}>
              <div style={{ width: 88, height: 88, margin: '0 auto 10px', borderRadius: '50%', border: '2px solid rgba(34,211,238,.65)', display: 'grid', placeItems: 'center', color: '#67e8f9', transform: `scale(${0.82 + phase.progress * 0.36})`, transition: 'transform 900ms ease-in-out', boxShadow: '0 0 24px rgba(34,211,238,.18)' }}><Heart size={30} /></div>
              <div aria-live="polite" style={{ color: '#f8fafc', fontWeight: 750, fontSize: '1.1rem' }}>{phase.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '.85rem', marginTop: 3 }}>{phase.instruction} · 4 seconds</div>
              <div style={{ color: '#64748b', fontSize: '.72rem', marginTop: 8 }}>Inhale 4s · Hold 4s · Exhale 4s</div>
            </div>

            <div style={{ borderRadius: 12, border: '1px solid rgba(245,158,11,.32)', background: 'rgba(120,53,15,.14)', padding: '14px 16px', marginBottom: 16, textAlign: 'left' }}>
              <div style={{ color: '#fbbf24', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Reflect before you decide</div>
              <p style={{ color: '#f8fafc', fontWeight: 650, lineHeight: 1.5, margin: 0 }}>{REFLECTION}</p>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, textAlign: 'left', cursor: 'pointer', color: '#cbd5e1', fontSize: '.83rem', lineHeight: 1.45, margin: '0 0 14px' }}>
              <input type="checkbox" checked={bypassConfirmed} onChange={(event) => setBypassConfirmed(event.target.checked)} style={{ marginTop: 2, accentColor: '#fb7185', width: 16, height: 16, flex: '0 0 auto' }} />
              <span>{BYPASS_LABEL}</span>
            </label>

            <div style={{ display: 'grid', gap: 10 }}>
              <button type="button" data-shield-control onClick={finishGrounding} disabled={remaining > 0} className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: 13, opacity: remaining > 0 ? .55 : 1, cursor: remaining > 0 ? 'not-allowed' : 'pointer' }}>
                <CheckCircle size={18} /> {remaining > 0 ? 'Continue when the grounding pause ends' : 'I acknowledge and wish to continue'}
              </button>
              {bypassConfirmed && <button type="button" data-shield-control onClick={finishGrounding} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: 11, color: '#fda4af', borderColor: 'rgba(251,113,133,.45)' }}>Proceed with the intentional bypass</button>}
            </div>
            <p style={{ color: '#64748b', fontSize: '.72rem', lineHeight: 1.5, margin: '14px 0 0' }}>The grounding pause is optional; selecting the bypass is an explicit choice.</p>
          </section>
        </div>
      )}
    </>
  );
};
