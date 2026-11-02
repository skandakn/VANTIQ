// src/modules/m14_roadmap_team/RoadmapAndTeam.tsx
// Module 15: Engineering Roadmap & Team INNOVATEX (Wise Light Theme)
import React from 'react';
import { Milestone, Users, Award, ShieldCheck } from 'lucide-react';

export const RoadmapAndTeam: React.FC = () => {
  const roadmapSteps = [
    { phase: 'Phase 1 · Q1 2025', title: 'Algorithmic Simulation & Lab Validation', desc: 'Ising model Knapsack QUBO solver benchmarked against 10,000 synthetic shock scenarios with 0% default rate.' },
    { phase: 'Phase 2 · Q2 2025', title: 'On-Device Edge Wasm & Account Aggregator API', desc: 'Zero-Knowledge client-side parser integration with Sahamati and Setu Account Aggregator frameworks.' },
    { phase: 'Phase 3 · Q3 2025', title: 'Hospital & Healthcare Partner Sandbox', desc: 'Direct hospital desk integration: converting urgent ICU admission deposits into buffered tri-tranche loans.' },
    { phase: 'Phase 4 · Q4 2025', title: 'RBI Regulatory Sandbox Cohort', desc: 'Testing consumer protection safeguards under RBI Fair Practices Code for Digital Lending.' },
  ];

  return (
    <section id="roadmap" style={{ padding: '60px 0 80px 0', backgroundColor: 'var(--bg-deep)', borderTop: '1px solid #e5e9e2' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge badge-forest">
              <Milestone size={13} />
              <span>Step 12: Roadmap & Team INNOVATEX</span>
            </span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Engineering Roadmap & Institutional Impact
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            From competitive ideation to national RBI regulatory sandbox deployment.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {roadmapSteps.map((step, idx) => (
            <div key={idx} className="vantiq-card" style={{ borderLeft: '4px solid var(--wise-forest)', padding: '24px', backgroundColor: '#ffffff' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', marginBottom: '6px' }}>
                {step.phase}
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--wise-forest)', marginBottom: '8px' }}>
                {step.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Team INNOVATEX Card */}
        <div className="vantiq-card" style={{ padding: '36px', backgroundColor: '#ffffff', border: '1.5px solid #d0d7cc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#edf4ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--wise-forest)'
            }}>
              <Users size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                TEAM INNOVATEX
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Nagarjuna College Of Engineering and Technology • Domain: Fintech
              </p>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '850px', marginBottom: '24px' }}>
            Built for the National Fintech Hackathon, VANTIQ bridges quantum combinatorial mechanics, behavioral economics (Scarcity Theory), and Zero-Knowledge edge cryptography to permanently protect vulnerable middle-income households from predatory digital lending spirals.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <span className="badge badge-emerald" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
              <Award size={14} />
              <span>Theme: Anti-Predatory Financial Shielding</span>
            </span>
            <span className="badge badge-forest" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
              <ShieldCheck size={14} />
              <span>Full Stack: React + TypeScript + QUBO Annealing</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
