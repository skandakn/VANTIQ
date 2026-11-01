// src/modules/m07_rescue_blend/MultiSourceRescueCard.tsx
// Module 8: Multi-Source Rescue Split Visualizer
import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const MultiSourceRescueCard: React.FC = () => {
  const { quantumResult, shock } = useFintech();
  const [disbursed, setDisbursed] = useState(false);

  const handleDisburse = () => {
    setDisbursed(true);
    setTimeout(() => setDisbursed(false), 5000);
  };

  return (
    <section id="rescue-split" style={{ padding: '30px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">
              <Sparkles size={13} />
              <span>Step 6: Optimal Funding Blend</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            The Multi-Source Quantum Rescue Plan
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Instead of borrowing ₹50,000 at 36% APR from one predatory app, CHRONOS blends 3 intelligent tranches.
          </p>
        </div>

        {/* Tranche Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          {quantumResult.tranches.map((tranche, idx) => (
            <div key={idx} className="chronos-card" style={{
              borderTop: `4px solid ${idx === 0 ? '#10b981' : idx === 1 ? '#06b6d4' : '#8b5cf6'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Tranche {idx + 1}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>
                  {tranche.interestApr}% APR
                </span>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                {tranche.sourceName}
              </h4>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '12px' }}>
                ₹{tranche.allocatedAmount.toLocaleString()}
              </div>

              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '14px', lineHeight: 1.5 }}>
                {tranche.notes}
              </p>

              <div style={{
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                padding: '8px 12px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#cbd5e1'
              }}>
                <span>Tenure: {tranche.tenureMonths > 0 ? `${tranche.tenureMonths} Mo` : 'Immediate'}</span>
                <span>Monthly: ₹{tranche.monthlyObligation.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Summary Box */}
        <div className="chronos-card glow-emerald" style={{
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>
              Total Funding Disbursed: ₹{quantumResult.totalAllocated.toLocaleString()}
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc' }}>
              Total Repayment: <span style={{ color: '#34d399' }}>₹{quantumResult.totalRepayment.toLocaleString()}</span>
              <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 400, marginLeft: '12px' }}>
                (Total interest: ₹{quantumResult.totalInterestAndFees.toLocaleString()})
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600, marginTop: '4px' }}>
              Direct Savings vs. Predatory Instant Loans: <strong>₹{quantumResult.directCashSaved.toLocaleString()} Saved!</strong>
            </div>
          </div>

          <div>
            <button
              onClick={handleDisburse}
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '1rem', backgroundColor: disbursed ? '#10b981' : undefined }}
            >
              {disbursed ? <CheckCircle2 size={18} /> : <ShieldCheck size={18} />}
              <span>{disbursed ? 'Multi-Tranche Disbursed!' : `Disburse Optimized Split (₹${shock.amount.toLocaleString()})`}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
