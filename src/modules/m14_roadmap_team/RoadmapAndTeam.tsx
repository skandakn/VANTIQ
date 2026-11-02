// src/modules/m14_roadmap_team/RoadmapAndTeam.tsx
// Module 15: Future Roadmap, SDG Impact & Ideathon Team Showcase
import React from 'react';
import { Milestone, Users } from 'lucide-react';

export const RoadmapAndTeam: React.FC = () => {
  const roadmapSteps = [
    { phase: 'M1 (Months 1–3)', title: 'Core ML Pipeline & Edge Telemetry', desc: '>88% directional accuracy on 90-day cash runway; Zero-Knowledge on-device SMS parser.' },
    { phase: 'M2 (Months 4–6)', title: 'Quantum Knapsack & Hybrid Solver', desc: '<150ms QAOA solver convergence; QUBO multi-source formulation benchmarked vs MILP.' },
    { phase: 'M3 (Months 7–9)', title: 'Neuro-UX Integration & Beta Pilot', desc: '45-second reflective bridge & Life-Energy translator tested with 500 emergency borrowers.' },
    { phase: 'M4 (Months 10–12)', title: 'Regulatory Sandbox & National Scale', desc: 'RBI Innovation Hub integration; B2B lending API certification rollout to NBFCs.' },
  ];

  const teamMembers = [
    'Anusha N',
    'Harshitha SB',
    'Meghan S Gouda',
    'Rashmi C',
    'Architha P',
  ];

  return (
    <section id="roadmap-team" style={{ padding: '30px 0 60px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-purple">
              <Milestone size={13} />
              <span>Roadmap & Team INNOVATEX</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            Engineering Roadmap & Institutional Impact
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            From competitive ideation to national RBI regulatory sandbox deployment.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '36px' }}>
          {roadmapSteps.map((step, idx) => (
            <div key={idx} className="chronos-card" style={{ borderLeft: '4px solid #8b5cf6', padding: '20px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', marginBottom: '4px' }}>
                {step.phase}
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                {step.title}
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Team INNOVATEX Card */}
        <div className="chronos-card glow-cyan" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Users size={24} color="#38bdf8" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                TEAM INNOVATEX
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Nagarjuna College Of Engineering and Technology • Domain: Fintech
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
            {teamMembers.map((name, i) => (
              <span key={i} className="badge badge-cyan" style={{ fontSize: '0.85rem', padding: '8px 18px' }}>
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
