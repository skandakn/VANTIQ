// src/modules/m12_market_radar/MarketRadarChart.tsx
// Module 13: Competitive Advantage Radar & TAM/SAM/SOM Hub (Wise Light Theme)
import React, { useState } from 'react';
import { Target } from 'lucide-react';

const axes = [
  'Cross-App Awareness',
  'Scarcity Friction',
  'Repayment Fit',
  'Zero Hidden Fees',
  'Real-time Runway Twin',
];

const competitors = [
  { name: 'VANTIQ', color: '#15803d', values: [5, 5, 5, 5, 5] },
  { name: 'Traditional Banks', color: '#425444', values: [2, 2, 1, 3, 2] },
  { name: 'Instant Loan Apps', color: '#dc2626', values: [1, 1, 1, 2, 1] },
  { name: 'Credit Cards', color: '#b45309', values: [2, 2, 1, 3, 2] },
];

const marketSizes = [
  { label: 'TAM', value: '$48.2 Billion', detail: 'Emerging Market Short-term Liquidity Deficit', color: '#15803d' },
  { label: 'SAM', value: '$12.4 Billion', detail: 'Urban Salaried Workers facing out-of-pocket health shocks', color: '#163300' },
  { label: 'SOM', value: '$850 Million', detail: 'Inaugural beachhead via corporate HR and hospital billing integration', color: '#0284c7' },
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
    <section id="market-radar" style={{ padding: '60px 0', backgroundColor: 'var(--bg-deep)', borderTop: '1px solid #e5e9e2' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span className="badge badge-forest">
              <Target size={13} />
              <span>Step 10: Market Opportunity &amp; Positioning</span>
            </span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
            Competitive Advantage &amp; TAM/SAM/SOM Hub
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
            A differentiated liquidity safety net for people facing unexpected emergency expenses.
          </p>
        </div>

        {/* Market Size Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 20, marginBottom: 28 }}>
          {marketSizes.map((item) => (
            <article key={item.label} className="vantiq-card" style={{ padding: '24px 28px', backgroundColor: '#ffffff', borderTop: `4px solid ${item.color}`, border: '1px solid #e5e9e2', borderTopWidth: 4, transition: 'all 180ms ease' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: '0.85rem', letterSpacing: '0.12em', fontWeight: 800, color: item.color }}>{item.label}</span>
                <span style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', fontWeight: 900, color: 'var(--wise-forest)', whiteSpace: 'nowrap' }}>{item.value}</span>
              </div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.detail}</p>
            </article>
          ))}
        </div>

        {/* Radar Chart Card */}
        <div className="vantiq-card" style={{ padding: '32px', backgroundColor: '#ffffff', border: '1.5px solid #d0d7cc' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--wise-forest)', fontWeight: 800, margin: '0 0 4px' }}>Competitive capability radar</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>Relative capability score · 1 (low) to 5 (high)</p>
            </div>
            <div aria-label="Chart legend" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
              {competitors.map((competitor) => (
                <button key={competitor.name} type="button" onMouseEnter={() => setActiveCompetitor(competitor.name)} onMouseLeave={() => setActiveCompetitor(null)}
                  onFocus={() => setActiveCompetitor(competitor.name)} onBlur={() => setActiveCompetitor(null)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: competitor.color, background: 'none', border: 0, padding: 4, fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer' }}>
                  <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: '50%', background: competitor.color }} />
                  {competitor.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <svg viewBox="0 0 500 410" role="img" aria-label="Radar chart comparing VANTIQ, traditional banks, instant loan apps, and credit cards across five capabilities" style={{ display: 'block', width: '100%', minWidth: 340, maxWidth: 680, height: 'auto', margin: '0 auto' }}>
              {[1, 2, 3, 4, 5].map((level) => (
                <polygon key={level} points={polygonPoints(axes.map(() => level))} fill="none" stroke={level === 5 ? '#cbd5e1' : '#e2e8f0'} strokeWidth="1.5" />
              ))}
              {axes.map((axis, index) => {
                const [x, y] = pointFor(index, 5);
                const labelX = chart.cx + Math.cos(-Math.PI / 2 + (index * 2 * Math.PI) / axes.length) * 174;
                const labelY = chart.cy + Math.sin(-Math.PI / 2 + (index * 2 * Math.PI) / axes.length) * 174;
                const anchor = labelX < chart.cx - 12 ? 'end' : labelX > chart.cx + 12 ? 'start' : 'middle';
                return <g key={axis} onMouseEnter={() => setActiveAxis(index)} onMouseLeave={() => setActiveAxis(null)}>
                  <line x1={chart.cx} y1={chart.cy} x2={x} y2={y} stroke="#cbd5e1" strokeWidth="1" />
                  <text x={labelX} y={labelY} textAnchor={anchor} dominantBaseline="middle" fill={activeAxis === index ? 'var(--wise-forest)' : 'var(--text-secondary)'} fontSize="11" fontWeight={activeAxis === index ? 800 : 600}>{axis}</text>
                </g>;
              })}
              {competitors.map((competitor) => {
                const isActive = activeCompetitor === competitor.name;
                const faded = activeCompetitor !== null && !isActive;
                return <g key={competitor.name} style={{ opacity: faded ? 0.16 : 1, transition: 'opacity 180ms ease' }}>
                  <polygon points={polygonPoints(competitor.values)} fill={competitor.color} fillOpacity={isActive ? 0.25 : competitor.name === 'VANTIQ' ? 0.18 : 0.06}
                    stroke={competitor.color} strokeWidth={isActive ? 3 : competitor.name === 'VANTIQ' ? 2.5 : 1.5} strokeLinejoin="round" />
                  {competitor.values.map((value, index) => {
                    const [x, y] = pointFor(index, value);
                    return <circle key={`${competitor.name}-${index}`} cx={x} cy={y} r={isActive ? 5 : 3.5} fill={competitor.color} stroke="#ffffff" strokeWidth="2">
                      <title>{`${competitor.name}: ${axes[index]} ${value}/5`}</title>
                    </circle>;
                  })}
                </g>;
              })}
            </svg>
          </div>
          <p aria-live="polite" style={{ minHeight: 18, textAlign: 'center', margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {activeAxis !== null ? `${axes[activeAxis]} · hover a legend label to spotlight a competitor` : 'Hover or focus a legend label to spotlight a competitor'}
          </p>
        </div>
      </div>
    </section>
  );
};
