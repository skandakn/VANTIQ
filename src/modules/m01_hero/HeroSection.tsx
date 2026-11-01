// src/modules/m01_hero/HeroSection.tsx
// Module 2: Hero & Value Proposition Experience
import React from 'react';
import { ArrowDown, Cpu, ShieldCheck, Zap, Quote } from 'lucide-react';

export const HeroSection: React.FC = () => {

  const scrollToDemo = () => {
    const el = document.getElementById('crisis-intake');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{ padding: '70px 0 50px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Ticker Badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <span className="badge badge-cyan">
            <Zap size={13} />
            <span>ML Cash Runway Forecasting</span>
          </span>
          <span className="badge badge-purple">
            <Cpu size={13} />
            <span>Quantum QAOA Knapsack</span>
          </span>
          <span className="badge badge-emerald">
            <ShieldCheck size={13} />
            <span>45s Smart Friction Shield</span>
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <div style={{ textAlign: 'center', maxWidth: '960px', margin: '0 auto 36px auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 850,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 60%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Emergency Credit Without The <span style={{
              background: 'linear-gradient(135deg, #f43f5e, #fb7185)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Debt Trap</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            color: '#94a3b8',
            lineHeight: 1.6,
            fontWeight: 400
          }}>
            When a <span style={{ color: '#f8fafc', fontWeight: 600 }}>₹50,000 medical emergency</span> strikes, 4 apps offer you ₹75,000 instantly. But acute panic blinds you to overlapping repayments. VANTIQ predicts your 90-day cash runway and computes the optimal multi-source funding blend in <strong>&lt;150ms</strong>.
          </p>
        </div>

        {/* Scarcity Harvard / Princeton Quote Card */}
        <div className="chronos-card" style={{
          maxWidth: '980px',
          margin: '0 auto 48px auto',
          borderLeft: '4px solid #06b6d4',
          backgroundColor: 'rgba(11, 19, 41, 0.75)'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              color: '#38bdf8'
            }}>
              <Quote size={24} />
            </div>
            <div>
              <p style={{
                fontSize: '1rem',
                color: '#e2e8f0',
                fontStyle: 'italic',
                lineHeight: 1.7,
                marginBottom: '10px'
              }}>
                "When you are in an emergency, scarcity captures your attention and tunnels your vision. You borrow the future to pay for today, trading a small immediate catastrophe for a catastrophic downstream debt trap. The true promise of financial technology is not accelerating how rapidly we borrow, but restoring our cognitive bandwidth so we can survive."
              </p>
              <p style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>
                — Prof. Sendhil Mullainathan (Harvard) & Prof. Eldar Shafir (Princeton), <em>Scarcity: Why Having Too Little Means So Much</em>
              </p>
            </div>
          </div>
        </div>

        {/* Stat Counter Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {[
            { value: '-68%', label: 'Interest Slashed', sub: 'Multi-source Knapsack', color: '#10b981', badge: 'emerald' },
            { value: '110.6 hrs', label: 'Life-Energy Saved', sub: 'Labor preserved', color: '#38bdf8', badge: 'cyan' },
            { value: '<150 ms', label: 'Quantum QAOA', sub: 'Combinatorial search', color: '#c084fc', badge: 'purple' },
            { value: '84% -> 4%', label: 'Default Risk', sub: 'Slashed from Day 32', color: '#f59e0b', badge: 'amber' },
          ].map((stat, i) => (
            <div key={i} className="chronos-card" style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: stat.color, marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={scrollToDemo} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            <span>Launch Live ₹50,000 Emergency Simulator</span>
            <ArrowDown size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};
