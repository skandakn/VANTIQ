import React, { useState } from 'react';
import { Target } from 'lucide-react';

const axes = [
  'Cross-App Awareness',
  'Scarcity Friction',
  'Quantum Optimization',
  'Zero Hidden Fees',
  'Real-time Runway Twin',
];

const competitors = [
  { name: 'CHRONOS-FIN', color: '#38bdf8', values: [5, 4, 5, 5, 5] },
  { name: 'Traditional Banks', color: '#a78bfa', values: [2, 2, 1, 3, 2] },
  { name: 'Instant Loan Apps', color: '#fb7185', values: [1, 1, 1, 2, 1] },
  { name: 'Credit Cards', color: '#fbbf24', values: [2, 2, 1, 3, 2] },
];

const marketSizes = [
  { label: 'TAM', value: '$48.2 Billion', detail: 'Emerging Market Short-term Liquidity Deficit', color: '#38bdf8' },
  { label: 'SAM', value: '$12.4 Billion', detail: 'Urban Salaried Workers facing out-of-pocket health shocks', color: '#c084fc' },
  { label: 'SOM', value: '$850 Million', detail: 'Inaugural beachhead via corporate HR and hospital billing integration', color: '#34d399' },
];

const chart = { cx: 250, cy: 205, radius: 128 };

function pointFor(axisIndex: number, score: number) {
  const angle = -Math.PI / 2 + (axisIndex * 2 * Math.PI) / axes.length;
  const radius = (score / 5) * chart.radius;
  return [chart.cx + Math.cos(angle) * radius, chart.cy + Math.sin(angle) * radius] as const;
}

function polygonPoints(values: number[]) {
  return values.map((value, index) => pointFor(index, value).join(',')).join(' ');
}

export const MarketRadarChart: React.FC = () => {
  const [activeCompetitor, setActiveCompetitor] = useState<string | null>(null);
  const [activeAxis, setActiveAxis] = useState<number | null>(null);

  return (
    <section id="market-radar" style={{ padding: '30px 0' }}>
      <div className="container">
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="badge badge-cyan"><Target size={13} /><span>Step 10: Market Opportunity &amp; Positioning</span></span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 8px' }}>
            Competitive Advantage &amp; TAM/SAM/SOM Hub
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            A differentiated liquidity safety net for people facing unexpected health expenses.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: 16, marginBottom: 20 }}>
          {marketSizes.map((item) => (
            <article key={item.label} className="chronos-card" style={{ padding: '22px 24px', borderTop: `2px solid ${item.color}`, transition: 'transform 180ms ease, box-shadow 180ms ease' }}
              onMouseEnter={(event) => { event.currentTarget.style.transform = 'translateY(-3px)'; event.currentTarget.style.boxShadow = `0 12px 32px ${item.color}20`; }}
              onMouseLeave={(event) => { event.currentTarget.style.transform = 'none'; event.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: '0.8rem', letterSpacing: '0.12em', fontWeight: 800, color: item.color }}>{item.label}</span>
                <span style={{ fontSize: 'clamp(1.35rem, 3vw, 1.8rem)', fontWeight: 900, color: '#f8fafc', whiteSpace: 'nowrap' }}>{item.value}</span>
              </div>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5 }}>{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="chronos-card" style={{ padding: 'clamp(16px, 3vw, 26px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: 800, margin: '0 0 4px' }}>Competitive capability radar</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>Relative capability score · 1 (low) to 5 (high)</p>
            </div>
            <div aria-label="Chart legend" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
              {competitors.map((competitor) => (
                <button key={competitor.name} type="button" onMouseEnter={() => setActiveCompetitor(competitor.name)} onMouseLeave={() => setActiveCompetitor(null)}
                  onFocus={() => setActiveCompetitor(competitor.name)} onBlur={() => setActiveCompetitor(null)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: competitor.color, background: 'none', border: 0, padding: 2, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                  <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: '50%', background: competitor.color, boxShadow: `0 0 10px ${competitor.color}80` }} />
                  {competitor.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <svg viewBox="0 0 500 410" role="img" aria-label="Radar chart comparing CHRONOS-FIN, traditional banks, instant loan apps, and credit cards across five capabilities" style={{ display: 'block', width: '100%', minWidth: 340, maxWidth: 680, height: 'auto', margin: '0 auto' }}>
              {[1, 2, 3, 4, 5].map((level) => (
                <polygon key={level} points={polygonPoints(axes.map(() => level))} fill="none" stroke={level === 5 ? '#334155' : '#1e293b'} strokeWidth="1" />
              ))}
              {axes.map((axis, index) => {
                const [x, y] = pointFor(index, 5);
                const labelX = chart.cx + Math.cos(-Math.PI / 2 + (index * 2 * Math.PI) / axes.length) * 174;
                const labelY = chart.cy + Math.sin(-Math.PI / 2 + (index * 2 * Math.PI) / axes.length) * 174;
                const anchor = labelX < chart.cx - 12 ? 'end' : labelX > chart.cx + 12 ? 'start' : 'middle';
                return <g key={axis} onMouseEnter={() => setActiveAxis(index)} onMouseLeave={() => setActiveAxis(null)}>
                  <line x1={chart.cx} y1={chart.cy} x2={x} y2={y} stroke="#334155" strokeWidth="1" />
                  <text x={labelX} y={labelY} textAnchor={anchor} dominantBaseline="middle" fill={activeAxis === index ? '#f8fafc' : '#94a3b8'} fontSize="11" fontWeight={activeAxis === index ? 800 : 600}>{axis}</text>
                </g>;
              })}
              {competitors.map((competitor) => {
                const isActive = activeCompetitor === competitor.name;
                const faded = activeCompetitor !== null && !isActive;
                return <g key={competitor.name} style={{ opacity: faded ? 0.16 : 1, transition: 'opacity 180ms ease' }}>
                  <polygon points={polygonPoints(competitor.values)} fill={competitor.color} fillOpacity={isActive ? 0.25 : competitor.name === 'CHRONOS-FIN' ? 0.16 : 0.06}
                    stroke={competitor.color} strokeWidth={isActive ? 3 : competitor.name === 'CHRONOS-FIN' ? 2.5 : 1.5} strokeLinejoin="round" />
                  {competitor.values.map((value, index) => {
                    const [x, y] = pointFor(index, value);
                    return <circle key={`${competitor.name}-${index}`} cx={x} cy={y} r={isActive ? 5 : 3.5} fill={competitor.color} stroke="#0b1329" strokeWidth="1.5">
                      <title>{`${competitor.name}: ${axes[index]} ${value}/5`}</title>
                    </circle>;
                  })}
                </g>;
              })}
            </svg>
          </div>
          <p aria-live="polite" style={{ minHeight: 18, textAlign: 'center', margin: '2px 0 0', color: '#64748b', fontSize: '0.75rem' }}>
            {activeAxis !== null ? `${axes[activeAxis]} · hover a legend label to spotlight a competitor` : 'Hover or focus a legend label to spotlight a competitor'}
          </p>
        </div>
      </div>
    </section>
  );
};
