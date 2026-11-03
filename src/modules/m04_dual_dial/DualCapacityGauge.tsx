// src/modules/m04_dual_dial/DualCapacityGauge.tsx
import React from 'react';
import { AlertTriangle, CheckCircle2, Gauge, ShieldCheck } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

type DialProps = { label: string; value: number; caption: string; color: string; glow: string; icon: React.ReactNode; unit?: string };

const CapacityDial: React.FC<DialProps> = ({ label, value, caption, color, glow, icon, unit }) => (
  <article style={{ minWidth: 0, padding: '28px', textAlign: 'center', borderRadius: '20px', background: '#ffffff', border: `1.5px solid ${color}`, boxShadow: `0 8px 24px ${glow}` }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', color }}>{icon}</div>
    <p style={{ margin: '0 0 14px', color, fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</p>
    <div style={{ position: 'relative', display: 'inline-grid', placeItems: 'center', width: '184px', height: '112px', overflow: 'hidden' }}>
      <svg viewBox="0 0 184 104" width="184" height="104" aria-hidden="true" style={{ position: 'absolute', top: 0 }}>
        <path d="M 20 92 A 72 72 0 0 1 164 92" fill="none" stroke="#e5e9e2" strokeWidth="13" strokeLinecap="round" />
        <path d="M 20 92 A 72 72 0 0 1 164 92" fill="none" stroke={color} strokeWidth="13" strokeLinecap="round" strokeDasharray="326 452" />
      </svg>
      <div style={{ zIndex: 1, marginTop: '30px' }}>
        <div style={{ color: 'var(--wise-forest)', fontWeight: 900, fontSize: '1.8rem', lineHeight: 1 }}>₹{value.toLocaleString()}</div>
        {unit && <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px', fontWeight: 600 }}>{unit}</div>}
      </div>
    </div>
    <p style={{ minHeight: '36px', margin: '14px 0 0', color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>{caption}</p>
  </article>
);

export const DualCapacityGauge: React.FC = () => {
  const { profile, predatoryOffers } = useFintech();
  const superficialLimit = predatoryOffers.reduce((total, offer) => total + offer.offeredLimit, 0);
  const stackedEmi = predatoryOffers.reduce((total, offer) => total + offer.monthlyEmi, 0);
  const monthlySurplus = profile.absorptiveSurplus;
  const debtBurdenRatio = monthlySurplus > 0 ? stackedEmi / monthlySurplus : Number.POSITIVE_INFINITY;
  const burden = debtBurdenRatio < 0.6 
    ? { label: 'Safe', color: '#15803d', background: '#dcfce7' } 
    : debtBurdenRatio <= 1 
      ? { label: 'Moderate', color: '#b45309', background: '#fef3c7' } 
      : { label: 'Catastrophic', color: '#b91c1c', background: '#fee2e2' };

  return (
    <section id="absorptive-capacity" style={{ padding: '60px 0', borderTop: '1px solid #e5e9e2', backgroundColor: 'var(--bg-deep)' }}>
      <div className="container">
        <div style={{ marginBottom: '28px' }}>
          <span className="badge badge-forest"><Gauge size={13} /> Absorptive Capacity Meter</span>
          <h2 style={{ marginTop: '10px', fontSize: '2.2rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.02em' }}>
            Credit Limit Is Not Repayment Capacity
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '6px' }}>
            Compare the limit an app displays with the cash that is actually free after essential obligations.
          </p>
        </div>
        <div className="vantiq-card" style={{ padding: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
            <CapacityDial label="Superficial Limit Offered" value={superficialLimit} color="#dc2626" glow="rgba(220, 38, 38, 0.08)" icon={<AlertTriangle size={32} />} caption="A ₹75,000 offer feels like safety, but its uncoordinated debits will bankrupt you on Day 32." />
            <CapacityDial label="Safe Absorptive Surplus" value={monthlySurplus} unit="per month" color="#15803d" glow="rgba(21, 128, 61, 0.08)" icon={<ShieldCheck size={32} />} caption="The actual cash surplus left each month after existing EMI, rent, and baseline living costs." />
          </div>
          <div style={{ marginTop: '28px', padding: '22px', borderRadius: '16px', background: '#f4f5f1', border: '1px solid #e5e9e2' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Debt Burden Ratio</div>
                <div style={{ marginTop: '4px', color: 'var(--wise-forest)', fontSize: '1.25rem', fontWeight: 900 }}>
                  ₹{stackedEmi.toLocaleString()} stacked EMI / ₹{monthlySurplus.toLocaleString()} surplus = {Number.isFinite(debtBurdenRatio) ? debtBurdenRatio.toFixed(2) : '∞'}×
                </div>
              </div>
              <span style={{ padding: '8px 16px', borderRadius: '999px', color: burden.color, background: burden.background, border: `1px solid ${burden.color}`, fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{burden.label}</span>
            </div>
            <p style={{ margin: '14px 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55 }}>
              Traditional credit scores mostly reward repayment history and approved limits; they do not see how multiple new EMIs collide with rent, food, and the small surplus needed to absorb a shock.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '18px', color: '#15803d', fontSize: '0.86rem', fontWeight: 700 }}>
            <CheckCircle2 size={17} /> Safe &lt; 0.60 · Moderate 0.60–1.00 · Catastrophic &gt; 1.00
          </div>
        </div>
      </div>
    </section>
  );
};
