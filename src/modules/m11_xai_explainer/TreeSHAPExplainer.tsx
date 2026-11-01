// src/modules/m11_xai_explainer/TreeSHAPExplainer.tsx
// Module 12: Explainable AI & Causal Attribution Panel (TreeSHAP - Wise Light Theme)
import React from 'react';
import { HelpCircle } from 'lucide-react';

export const TreeSHAPExplainer: React.FC = () => {
  const factors = [
    { label: 'Day 30 House Rent Collision (₹7,000)', impact: 38, direction: 'risk', note: 'Rigid fixed outflow non-negotiable' },
    { label: 'Existing Fixed Bank EMI (₹8,000)', impact: 32, direction: 'risk', note: 'Overlaps directly with payroll credit date' },
    { label: 'Low Liquid Buffer (₹5,000)', impact: 18, direction: 'risk', note: 'Provides less than 7 days of survival margin' },
    { label: 'Stable Salaried Monthly Inflow (₹40,000)', impact: -45, direction: 'solvency', note: 'Provides ₹15,000 reliable absorptive baseline' },
  ];

  return (
    <section id="xai-explainer" style={{ padding: '60px 0', backgroundColor: 'var(--bg-deep)', borderTop: '1px solid #e5e9e2' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge badge-forest">
              <HelpCircle size={13} />
              <span>Step 9: Explainable AI (TreeSHAP)</span>
            </span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Transparent Causal Risk Attribution
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            No black-box decisions. Borrowers see exact plain-language causal reasons why loans are restricted or approved.
          </p>
        </div>

        {/* TreeSHAP Bars Card */}
        <div className="chronos-card" style={{ padding: '32px', backgroundColor: '#ffffff', border: '1.5px solid #d0d7cc' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {factors.map((f, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.92rem' }}>
                  <span style={{ color: 'var(--wise-forest)', fontWeight: 700 }}>{f.label}</span>
                  <span style={{ color: f.direction === 'risk' ? '#dc2626' : '#15803d', fontWeight: 800 }}>
                    {f.direction === 'risk' ? `+${f.impact}% Default Risk` : `${f.impact}% Solvency Contribution`}
                  </span>
                </div>

                {/* Progress Bar */}
                <div style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#edf0ea',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: `${Math.abs(f.impact)}%`,
                    height: '100%',
                    backgroundColor: f.direction === 'risk' ? '#dc2626' : '#15803d',
                    borderRadius: '9999px'
                  }} />
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {f.note}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
