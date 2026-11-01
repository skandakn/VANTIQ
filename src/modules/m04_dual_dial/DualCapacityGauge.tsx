// src/modules/m04_dual_dial/DualCapacityGauge.tsx
import React from 'react';
import { AlertTriangle, CheckCircle2, Gauge, ShieldCheck } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

type DialProps = { label: string; value: number; caption: string; color: string; glow: string; icon: React.ReactNode; unit?: string };

const CapacityDial: React.FC<DialProps> = ({ label, value, caption, color, glow, icon, unit }) => (
  <article style={{ minWidth: 0, padding: '24px', textAlign: 'center', borderRadius: '18px', background: `radial-gradient(circle at 50% 42%, ${glow} 0%, rgba(15, 23, 42, 0.15) 64%)`, border: `1px solid ${color}`, boxShadow: `0 0 28px ${glow}` }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', color }}>{icon}</div>
    <p style={{ margin: '0 0 14px', color, fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</p>
    <div style={{ position: 'relative', display: 'inline-grid', placeItems: 'center', width: '184px', height: '112px', overflow: 'hidden' }}>
      <svg viewBox="0 0 184 104" width="184" height="104" aria-hidden="true" style={{ position: 'absolute', top: 0 }}>
        <path d="M 20 92 A 72 72 0 0 1 164 92" fill="none" stroke="rgba(148, 163, 184, 0.18)" strokeWidth="13" strokeLinecap="round" />
        <path d="M 20 92 A 72 72 0 0 1 164 92" fill="none" stroke={color} strokeWidth="13" strokeLinecap="round" strokeDasharray="326 452" style={{ filter: `drop-shadow(0 0 7px ${color})` }} />
      </svg>
      <div style={{ zIndex: 1, marginTop: '30px' }}><div style={{ color: '#f8fafc', fontWeight: 900, fontSize: '1.7rem', lineHeight: 1 }}>₹{value.toLocaleString()}</div>{unit && <div style={{ color: '#cbd5e1', fontSize: '0.75rem', marginTop: '4px' }}>{unit}</div>}</div>
    </div>
    <p style={{ minHeight: '36px', margin: '10px 0 0', color: '#cbd5e1', fontSize: '0.82rem', lineHeight: 1.45 }}>{caption}</p>
  </article>
);

export const DualCapacityGauge: React.FC = () => {
  const { profile, predatoryOffers } = useFintech();
  const superficialLimit = predatoryOffers.reduce((total, offer) => total + offer.offeredLimit, 0);
  const stackedEmi = predatoryOffers.reduce((total, offer) => total + offer.monthlyEmi, 0);
  const monthlySurplus = profile.absorptiveSurplus;
  const debtBurdenRatio = monthlySurplus > 0 ? stackedEmi / monthlySurplus : Number.POSITIVE_INFINITY;
  const burden = debtBurdenRatio < 0.6 ? { label: 'Safe', color: '#34d399', background: 'rgba(16, 185, 129, 0.14)' } : debtBurdenRatio <= 1 ? { label: 'Moderate', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.14)' } : { label: 'Catastrophic', color: '#f87171', background: 'rgba(239, 68, 68, 0.14)' };

  return (
    <section id="absorptive-capacity" style={{ padding: '30px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '24px' }}>
          <span className="badge badge-cyan"><Gauge size={13} /> Step 3: Absorptive Capacity Meter</span>
          <h2 style={{ marginTop: '10px', fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>Credit Limit Is Not Repayment Capacity</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Compare the limit an app displays with the cash that is actually free after essential obligations.</p>
        </div>
        <div className="chronos-card" style={{ padding: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '22px', alignItems: 'stretch' }}>
            <CapacityDial label="Superficial Limit Offered" value={superficialLimit} color="#f87171" glow="rgba(239, 68, 68, 0.25)" icon={<AlertTriangle size={32} />} caption="A ₹75,000 offer can feel like safety, even when its stacked repayments exceed your free cash." />
            <CapacityDial label="Safe Absorptive Surplus" value={monthlySurplus} unit="per month" color="#34d399" glow="rgba(16, 185, 129, 0.24)" icon={<ShieldCheck size={32} />} caption="The amount left each month after existing EMI, rent, and baseline living costs are protected." />
          </div>
          <div style={{ marginTop: '24px', padding: '18px', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.64)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}><div><div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Debt Burden Ratio</div><div style={{ marginTop: '4px', color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800 }}>₹{stackedEmi.toLocaleString()} stacked EMI / ₹{monthlySurplus.toLocaleString()} monthly surplus = {Number.isFinite(debtBurdenRatio) ? debtBurdenRatio.toFixed(2) : '∞'}×</div></div><span style={{ padding: '7px 12px', borderRadius: '999px', color: burden.color, background: burden.background, border: `1px solid ${burden.color}`, fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{burden.label}</span></div>
            <p style={{ margin: '14px 0 0', color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.5 }}>Traditional credit scores mostly reward repayment history and approved limits; they do not see how multiple new EMIs collide with rent, food, and the small surplus needed to absorb a shock.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', color: '#6ee7b7', fontSize: '0.82rem' }}><CheckCircle2 size={16} /> Safe &lt; 0.60 · Moderate 0.60–1.00 · Catastrophic &gt; 1.00</div>
        </div>
      </div>
    </section>
  );
};
