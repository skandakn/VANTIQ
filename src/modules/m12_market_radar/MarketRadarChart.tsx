// src/modules/m12_market_radar/MarketRadarChart.tsx
// Module 13: Competitive Capability Radar & Market Intelligence
import React from 'react';
import { Target } from 'lucide-react';

export const MarketRadarChart: React.FC = () => {
  return (
    <section id="market-radar" style={{ padding: '30px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-cyan">
              <Target size={13} />
              <span>Step 10: Market Opportunity & Positioning</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            Competitive Advantage & TAM/SAM/SOM Hub
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Targeting 180M urban salaried workers and 65M gig economy workers exposed to medical distress debt.
          </p>
        </div>

        {/* TAM / SAM / SOM Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          {[
            { val: '$515 B', lbl: 'TAM', sub: 'Total Digital Lending India 2030', color: '#38bdf8' },
            { val: '$42 B', lbl: 'SAM', sub: 'Emergency Unsecured Credit Market', color: '#c084fc' },
            { val: '$3.2 B', lbl: 'SOM', sub: 'Target Urban Salaried & Gig Cohort', color: '#34d399' },
            { val: '6.07x', lbl: 'LTV / CAC', sub: 'Unit Economics (₹850 LTV vs ₹140 CAC)', color: '#fbbf24' },
          ].map((item, idx) => (
            <div key={idx} className="chronos-card" style={{ textAlign: 'center', padding: '24px' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: item.color, marginBottom: '4px' }}>
                {item.val}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', marginBottom: '2px' }}>
                {item.lbl}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 5-Axis Competitive Breakdown */}
        <div className="chronos-card" style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: 700, marginBottom: '16px' }}>
            Key Differentiators vs. Incumbents
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { title: 'Real-Time Ghost Debt Mesh', desc: 'Reconciles uncoordinated micro-loans in real time before credit bureau 60-day lag.' },
              { title: 'TFT Cash Runway Forecast', desc: 'Simulates daily bank balances across 90 days to identify debt collision dates.' },
              { title: 'Quantum Combinatorial Solver', desc: 'Evaluates 2^24 funding mixes in <150ms to yield the lowest compounding APR.' },
              { title: 'Stress-Aware Smart Friction', desc: '45-second reflective breathing bridge halts acute medical panic without blocking cash.' },
            ].map((feature, i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(11, 19, 41, 0.6)',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                padding: '16px'
              }}>
                <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.9rem', marginBottom: '4px' }}>
                  {feature.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  {feature.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
