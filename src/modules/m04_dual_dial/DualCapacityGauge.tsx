// src/modules/m04_dual_dial/DualCapacityGauge.tsx
// Module 5: Dual-Dial Absorptive Capacity Meter
import React from 'react';
import { Gauge, CheckCircle2, XCircle } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const DualCapacityGauge: React.FC = () => {
  const { profile, predatoryOffers } = useFintech();

  const totalOfferedLimit = predatoryOffers.reduce((sum, item) => sum + item.offeredLimit, 0);
  const absorptiveCap = profile.absorptiveSurplus;

  return (
    <section id="absorptive-capacity" style={{ padding: '30px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-cyan">
              <Gauge size={13} />
              <span>Absorptive Capacity Meter</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            Superficial Credit Limits vs. Real Absorptive Capacity
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Fintech apps show how much you can borrow today. CHRONOS-FIN reveals how much you can actually survive repaying.
          </p>
        </div>

        {/* Dual Dial Comparison Card */}
        <div className="chronos-card glow-cyan" style={{ padding: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
            
            {/* Left Dial: Superficial Limits */}
            <div style={{
              textAlign: 'center',
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '2px dashed rgba(239, 68, 68, 0.4)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                <XCircle size={36} color="#ef4444" />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                Superficial Credit Mirage
              </div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#f87171', margin: '8px 0' }}>
                ₹{totalOfferedLimit.toLocaleString()}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Aggregated app limits offered under 2 minutes. Completely ignores overlapping rent and EMI obligations!
              </p>
              <span className="badge badge-red" style={{ marginTop: '14px' }}>Predatory Phantom Limit</span>
            </div>

            {/* Middle Divider / VS */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-flex',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(6, 182, 212, 0.2)',
                border: '1px solid #06b6d4',
                color: '#38bdf8',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1rem'
              }}>
                VS
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>Reconciliation</div>
            </div>

            {/* Right Dial: True Absorptive Capacity */}
            <div style={{
              textAlign: 'center',
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '2px solid rgba(16, 185, 129, 0.5)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                <CheckCircle2 size={36} color="#10b981" />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6ee7b7', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                True Absorptive Capacity
              </div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#34d399', margin: '8px 0' }}>
                ₹{absorptiveCap.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 600 }}>/ mo</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Realistic unallocated surplus after ₹8,000 EMI, ₹7,000 rent, and ₹10,000 baseline survival costs.
              </p>
              <span className="badge badge-emerald" style={{ marginTop: '14px' }}>CHRONOS Safe Ceiling</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
