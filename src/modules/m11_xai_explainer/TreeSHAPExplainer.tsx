// src/modules/m11_xai_explainer/TreeSHAPExplainer.tsx
// Module 12: Explainable AI & Causal Attribution Panel (TreeSHAP)
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
    <section id="xai-explainer" style={{ padding: '30px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-purple">
              <HelpCircle size={13} />
              <span>Step 9: Explainable AI (TreeSHAP)</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            Transparent Causal Risk Attribution
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            No black-box decisions. Borrowers see exact plain-language causal reasons why loans are restricted or approved.
          </p>
        </div>

        {/* TreeSHAP Bars Card */}
        <div className="chronos-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {factors.map((f, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                  <span style={{ color: '#f8fafc', fontWeight: 600 }}>{f.label}</span>
                  <span style={{ color: f.direction === 'risk' ? '#f87171' : '#34d399', fontWeight: 700 }}>
                    {f.direction === 'risk' ? `+${f.impact}% Default Risk` : `${f.impact}% Solvency Contribution`}
                  </span>
                </div>

                {/* Progress Bar */}
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'rgba(51, 65, 85, 0.4)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '6px'
                }}>
                  <div style={{
                    width: `${Math.abs(f.impact)}%`,
                    height: '100%',
                    backgroundColor: f.direction === 'risk' ? '#ef4444' : '#10b981',
                    borderRadius: '4px'
                  }} />
                </div>

                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
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
