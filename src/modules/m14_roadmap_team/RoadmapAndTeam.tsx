import React, { useState } from 'react';
import { ChevronDown, Milestone, Users } from 'lucide-react';

const roadmap = [
  {
    quarter: 'Q1', status: 'Completed', title: 'Core quantum knapsack algorithm',
    detail: 'Build the core quantum knapsack algorithm and a local React simulation to explore funding combinations.',
    color: '#34d399',
  },
  {
    quarter: 'Q2', status: 'In Progress', title: 'Account Aggregator & hospital pilots',
    detail: 'Integrate Account Aggregator APIs and run pilots with hospital emergency desks.',
    color: '#38bdf8',
  },
  {
    quarter: 'Q3', status: 'Planned', title: 'Hardware quantum annealing',
    detail: 'Integrate hardware quantum annealing through D-Wave Leap and the Amazon Braket QPU.',
    color: '#c084fc',
  },
  {
    quarter: 'Q4', status: 'Planned', title: 'Pan-India consortium & refinancing',
    detail: 'Establish a pan-India NBFC co-op consortium and introduce autonomous micro-refinancing.',
    color: '#fbbf24',
  },
];

const credentials = [
  { title: 'Algorithmic Game Theory', detail: 'Mechanism design for fair, coordinated liquidity allocation.' },
  { title: 'Behavioral Economics', detail: 'Human-centered decisions during financial stress.' },
  { title: 'Quantum Computing', detail: 'Optimization methods for complex funding mixes.' },
  { title: 'Full-Stack FinTech', detail: 'Integrated product engineering across data, APIs, and user experience.' },
];

const teamMembers = ['Anusha N', 'Harshitha SB', 'Meghan S Gouda', 'Rashmi C', 'Architha P'];

export const RoadmapAndTeam: React.FC = () => {
  const [openQuarter, setOpenQuarter] = useState<string | null>('Q1');

  return (
    <section id="roadmap-team" style={{ padding: '30px 0 60px' }}>
      <div className="container">
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="badge badge-purple"><Milestone size={13} /><span>Step 12: Roadmap &amp; Team INNOVATEX</span></span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 8px' }}>
            Four-Quarter Engineering Roadmap
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            From local optimization simulation to a coordinated, autonomous liquidity network.
          </p>
        </div>

        <div className="chronos-card" style={{ padding: 'clamp(16px, 3vw, 28px)', marginBottom: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 255px), 1fr))', gap: 14 }}>
            {roadmap.map((item) => {
              const isOpen = openQuarter === item.quarter;
              return (
                <article key={item.quarter} style={{ position: 'relative', border: `1px solid ${isOpen ? `${item.color}70` : '#263449'}`, borderRadius: 12, background: isOpen ? `${item.color}0c` : 'rgba(11, 19, 41, 0.45)', transition: 'border-color 180ms ease, background 180ms ease' }}>
                  <button type="button" aria-expanded={isOpen} aria-controls={`roadmap-${item.quarter}`} onClick={() => setOpenQuarter(isOpen ? null : item.quarter)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', padding: 16, color: '#f8fafc', border: 0, borderRadius: 12, background: 'transparent', cursor: 'pointer' }}>
                    <span aria-hidden="true" style={{ flex: '0 0 42px', height: 42, display: 'grid', placeItems: 'center', borderRadius: 12, background: `${item.color}18`, color: item.color, fontWeight: 900, fontSize: '0.9rem' }}>{item.quarter}</span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, lineHeight: 1.35 }}>{item.title}</span>
                      <span style={{ display: 'inline-flex', marginTop: 8, padding: '3px 8px', borderRadius: 999, color: item.color, background: `${item.color}18`, fontSize: '0.67rem', fontWeight: 800 }}>{item.status}</span>
                    </span>
                    <ChevronDown size={17} color="#64748b" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease' }} />
                  </button>
                  {isOpen && <div id={`roadmap-${item.quarter}`} style={{ padding: '0 16px 17px 70px' }}>
                    <p style={{ margin: 0, color: '#aab7c8', fontSize: '0.8rem', lineHeight: 1.6 }}>{item.detail}</p>
                    <div style={{ marginTop: 12, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
                  </div>}
                </article>
              );
            })}
          </div>
        </div>

        <div className="chronos-card glow-cyan" style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <Users size={24} color="#38bdf8" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>TEAM INNOVATEX</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '4px 0 0' }}>Nagarjuna College of Engineering and Technology · FinTech</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 12 }}>
            {credentials.map((item) => (
              <div key={item.title} style={{ padding: 15, borderRadius: 10, border: '1px solid #1e3a4b', background: 'rgba(11, 19, 41, 0.55)' }}>
                <div style={{ color: '#67e8f9', fontSize: '0.85rem', fontWeight: 800, marginBottom: 5 }}>{item.title}</div>
                <p style={{ color: '#94a3b8', fontSize: '0.76rem', lineHeight: 1.5, margin: 0 }}>{item.detail}</p>
              </div>
            ))}
          </div>

          <div aria-label="Team members" style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 18 }}>
            {teamMembers.map((name) => <span key={name} className="badge badge-cyan" style={{ fontSize: '0.8rem', padding: '7px 14px' }}>{name}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
};
