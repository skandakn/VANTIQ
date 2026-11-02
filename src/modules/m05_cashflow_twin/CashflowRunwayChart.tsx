// src/modules/m05_cashflow_twin/CashflowRunwayChart.tsx
// Module 6: Stochastic Cashflow Twin (Temporal Fusion Transformer 90-Day Runway)
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const CashflowRunwayChart: React.FC = () => {
  const { runwayData } = useFintech();
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  // SVG Chart Geometry
  const width = 800;
  const height = 340;
  const padding = { top: 40, right: 40, bottom: 50, left: 70 };

  const minVal = -40000;
  const maxVal = 45000;

  const getX = (index: number) => {
    return padding.left + (index / (runwayData.length - 1)) * (width - padding.left - padding.right);
  };

  const getY = (val: number) => {
    const norm = (val - minVal) / (maxVal - minVal);
    return height - padding.bottom - norm * (height - padding.top - padding.bottom);
  };

  const zeroY = getY(0);

  // Build SVG Path strings
  const naivePath = runwayData.reduce((acc, pt, i) => {
    return `${acc} ${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.balanceWithoutChronos)}`;
  }, '');

  const chronosPath = runwayData.reduce((acc, pt, i) => {
    return `${acc} ${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.balanceWithChronos)}`;
  }, '');

  return (
    <section id="cashflow-twin" style={{ padding: '30px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-purple">
              <TrendingUp size={13} />
              <span>Stochastic Cashflow Twin</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            Temporal Fusion Transformer: 90-Day Cash Runway Forecast
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Multi-horizon attention predicts quantile liquidity trajectories and pinpoints exact loan collision dates.
          </p>
        </div>

        {/* Chart Card */}
        <div className="chronos-card" style={{ padding: '24px', backgroundColor: '#09101f', overflowX: 'auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ color: '#fca5a5' }}>Without CHRONOS: Cascading Default</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ color: '#6ee7b7' }}>With CHRONOS-SOLV: 100% Solvency</span>
              </div>
            </div>

            <span className="badge badge-cyan">Quantiles: q10 | q50 | q90</span>
          </div>

          {/* SVG Interactive Chart */}
          <div style={{ width: '100%', minWidth: '700px' }}>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
              
              {/* Grid Lines */}
              {[-30000, -15000, 0, 15000, 30000, 45000].map((tick) => (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    y1={getY(tick)}
                    x2={width - padding.right}
                    y2={getY(tick)}
                    stroke={tick === 0 ? '#64748b' : '#1e293b'}
                    strokeDasharray={tick === 0 ? '4 4' : '2 2'}
                    strokeWidth={tick === 0 ? 1.5 : 0.8}
                  />
                  <text
                    x={padding.left - 10}
                    y={getY(tick) + 4}
                    fill={tick === 0 ? '#94a3b8' : '#475569'}
                    fontSize="11"
                    textAnchor="end"
                  >
                    ₹{(tick / 1000)}k
                  </text>
                </g>
              ))}

              {/* Zero Threshold Label */}
              <text x={width - padding.right - 10} y={zeroY - 8} fill="#94a3b8" fontSize="10" textAnchor="end" fontWeight="bold">
                BREAK-EVEN (₹0 LIQUIDITY)
              </text>

              {/* Red Deficit Danger Shade */}
              <rect
                x={padding.left}
                y={zeroY}
                width={width - padding.left - padding.right}
                height={height - padding.bottom - zeroY}
                fill="rgba(239, 68, 68, 0.08)"
              />

              {/* Naive Borrowing Line */}
              <path d={naivePath} fill="none" stroke="#ef4444" strokeWidth="3" />

              {/* Chronos Solvency Line */}
              <path d={chronosPath} fill="none" stroke="#10b981" strokeWidth="3.5" />

              {/* Data Points */}
              {runwayData.map((pt, i) => (
                <g key={i}>
                  {/* Naive Point */}
                  <circle
                    cx={getX(i)}
                    cy={getY(pt.balanceWithoutChronos)}
                    r={selectedPoint === i ? 7 : 4.5}
                    fill="#ef4444"
                    stroke="#ffffff"
                    strokeWidth={1.5}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setSelectedPoint(i)}
                  />
                  {/* Chronos Point */}
                  <circle
                    cx={getX(i)}
                    cy={getY(pt.balanceWithChronos)}
                    r={selectedPoint === i ? 7 : 5}
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth={2}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setSelectedPoint(i)}
                  />
                  {/* X-axis labels */}
                  <text
                    x={getX(i)}
                    y={height - padding.bottom + 22}
                    fill="#64748b"
                    fontSize="11"
                    textAnchor="middle"
                  >
                    {pt.dateLabel}
                  </text>
                </g>
              ))}

              {/* Collision Day 32 Annotation */}
              <g transform={`translate(${getX(3)}, ${getY(-18000)})`}>
                <line x1="0" y1="0" x2="0" y2="-40" stroke="#f87171" strokeDasharray="3 3" />
                <rect x="-85" y="-68" width="170" height="26" rx="4" fill="rgba(239, 68, 68, 0.9)" />
                <text x="0" y="-51" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">
                  Day 32: Rent + EMI Deficit!
                </text>
              </g>

            </svg>
          </div>

          {/* Point Inspector Feedback */}
          {selectedPoint !== null && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid #334155',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.85rem'
            }}>
              <div>
                <strong>{runwayData[selectedPoint].dateLabel}:</strong>
                <span style={{ color: '#f87171', marginLeft: '12px' }}>
                  Without CHRONOS: ₹{runwayData[selectedPoint].balanceWithoutChronos.toLocaleString()}
                </span>
                <span style={{ color: '#34d399', marginLeft: '12px' }}>
                  With CHRONOS: ₹{runwayData[selectedPoint].balanceWithChronos.toLocaleString()}
                </span>
              </div>
              <span className="badge badge-emerald">
                Spread: +₹{(runwayData[selectedPoint].balanceWithChronos - runwayData[selectedPoint].balanceWithoutChronos).toLocaleString()}
              </span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
