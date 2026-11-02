// src/modules/m05_cashflow_twin/CashflowRunwayChart.tsx
// Module 6: Stochastic Cashflow Twin (Temporal Fusion Transformer 90-Day Runway)
// Role: Member 06 (VANTIQ Team)
// Branch: feat/m06-cashflow-digital-twin

import React, { useState, useRef, useMemo } from 'react';
import {
  TrendingUp,
  AlertOctagon,
  Calendar,
  CheckCircle2,
  XCircle,
  Zap,
  Sliders,
  ShieldCheck,
  Info,
  Clock,
  Activity
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';
import type { CashflowRunwayPoint } from '../../types';

interface MilestoneDetail {
  day: number;
  label: string;
  tag: string;
  type: 'deposit' | 'crash' | 'hazard' | 'recovery';
  title: string;
  withoutVantiqBalance: number;
  withVantiqBalance: number;
  upcomingEmiWithout: string;
  upcomingEmiWith: string;
  cashflowEvent: string;
  description: string;
}

export const CashflowRunwayChart: React.FC = () => {
  // 1. Consume cashflowRunway from useFintech() (with type fallback to runwayData)
  const fintech = useFintech();
  const cashflowRunway: CashflowRunwayPoint[] =
    (fintech as unknown as { cashflowRunway?: CashflowRunwayPoint[] }).cashflowRunway ??
    fintech.runwayData;
  const { profile } = fintech;

  // Interactive state
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(3); // Default to Day 32 (Collision Crash)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showQuantiles, setShowQuantiles] = useState<boolean>(true);
  const [activeCurveFilter, setActiveCurveFilter] = useState<'both' | 'vantiq' | 'naive'>('both');
  const [isSimulatingRunway, setIsSimulatingRunway] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedDayIndex;
  const currentPoint = cashflowRunway[activeIndex] || cashflowRunway[0];
  const pointForDay = (day: number) => cashflowRunway.find((point) => point.day === day) ?? currentPoint;
  const day30Point = pointForDay(30);
  const day32Point = pointForDay(32);
  const day60Point = pointForDay(60);
  const day90Point = pointForDay(90);

  // Detailed Day-by-Day Milestone Data Dictionary (covering Days 15, 30, 32, 45, 60, 90, etc.)
  const milestoneData: Record<number, Omit<MilestoneDetail, 'withoutVantiqBalance' | 'withVantiqBalance'>> = useMemo(() => ({
    0: {
      day: 0,
      label: 'Day 0',
      tag: 'Crisis Outset',
      type: 'hazard',
      title: 'Emergency Medical Shock Incurred',
      upcomingEmiWithout: '₹0 immediate (4 loan contracts signed in panic)',
      upcomingEmiWith: '₹0 (Zero-cost hospital advance deployed)',
      cashflowEvent: `₹${Math.max(0, fintech.shock.amount).toLocaleString()} emergency expense entered.`,
      description: 'The two lines start from the available savings after the emergency expense is funded. Later differences come from the repayment schedules.'
    },
    15: {
      day: 15,
      label: 'Day 15',
      tag: 'First Drawdown',
      type: 'hazard',
      title: 'Payday App Clustered Deduction',
      upcomingEmiWithout: '₹5,400 (FastSalary 24x7 1st Payday EMI)',
      upcomingEmiWith: '₹0 (Co-op & hospital tranches deferred to month-end)',
      cashflowEvent: 'The first sample lender repayment is scheduled.',
      description: 'The sample fragmented plan schedules a mid-month repayment. The coordinated plan follows its own payment dates.'
    },
    30: {
      day: 30,
      label: 'Day 30',
      tag: 'Salary Milestone',
      type: 'deposit',
      title: 'Salary and regular costs are applied',
      upcomingEmiWithout: 'Sample lender instalments are applied on their scheduled dates.',
      upcomingEmiWith: 'Coordinated plan instalments are applied on their scheduled dates.',
      cashflowEvent: 'Monthly income and scheduled payments affect the projected balance.',
      description: 'This checkpoint includes one month of income, regular costs, and the repayment due around month-end.'
    },
    32: {
      day: 32,
      label: 'Day 32',
      tag: 'Critical Default Trap',
      type: 'crash',
      title: 'Sample lender payment dates',
      upcomingEmiWithout: 'This point includes any sample lender instalments due by Day 32.',
      upcomingEmiWith: 'This point includes the coordinated plan instalments due by Day 32.',
      cashflowEvent: 'Two sample lender due dates fall close together.',
      description: 'This checkpoint highlights how close repayment dates can tighten the available cash buffer.'
    },
    45: {
      day: 45,
      label: 'Day 45',
      tag: 'Compounding Spiral',
      type: 'hazard',
      title: 'Secondary Penalties & Rollover Charges',
      upcomingEmiWithout: '₹3,800 late fee penalties + 42% APR compounding interest',
      upcomingEmiWith: '₹0 (Tranche C 60-day grace period fully shields cashflow)',
      cashflowEvent: 'The projection continues through the next scheduled repayments.',
      description: 'The model continues to apply regular household costs and the sample lender schedule.'
    },
    60: {
      day: 60,
      label: 'Day 60',
      tag: 'Grace Transition',
      type: 'recovery',
      title: 'VANTIQ 60-Day Grace Period Transition',
      upcomingEmiWithout: 'The sample lender schedule continues.',
      upcomingEmiWith: 'Deferred plan repayment begins after the 60-day grace period.',
      cashflowEvent: 'The sample plan begins its deferred repayment phase.',
      description: 'The planned deferred payment is added after the 60-day breathing period.'
    },
    75: {
      day: 75,
      label: 'Day 75',
      tag: 'Surplus Restoration',
      type: 'recovery',
      title: 'Sustained Positive Trajectory',
      upcomingEmiWithout: 'Legal recovery notices & bureau credit freeze',
      upcomingEmiWith: '₹4,295 combined manageable monthly repayment',
      cashflowEvent: 'Projected balances reflect ongoing costs and repayment schedules.',
      description: 'Use the plotted balances as a planning estimate; actual bills and lender terms can differ.'
    },
    90: {
      day: 90,
      label: 'Day 90',
      tag: 'Full Horizon Outcome',
      type: 'recovery',
      title: '90-Day Full Horizon Solvency Verdict',
      upcomingEmiWithout: 'Illustrative balance after 90 days of the sample lender schedule.',
      upcomingEmiWith: 'Illustrative balance after 90 days of the coordinated schedule.',
      cashflowEvent: 'The illustrative 90-day projection ends here.',
      description: 'Compare both projected balances to see how the example repayment schedules affect the remaining cash.'
    }
  }), [fintech.shock.amount]);

  const milestoneCopy = milestoneData[currentPoint.day] || {
    day: currentPoint.day,
    label: currentPoint.dateLabel,
    tag: 'Trajectory Point',
    type: currentPoint.balanceWithVantiq > 0 ? 'recovery' : 'hazard',
    title: `Runway State: Day ${currentPoint.day}`,
    upcomingEmiWithout: 'Standard predatory scheduled obligations',
    upcomingEmiWith: 'Coordinated non-colliding obligations',
    cashflowEvent: `Net balance differential: +₹${(currentPoint.balanceWithVantiq - currentPoint.balanceWithoutVantiq).toLocaleString()}`,
    description: `Projected balances on Day ${currentPoint.day} are based on the current profile and sample repayment schedules.`
  };
  const currentMilestone: MilestoneDetail = {
    ...milestoneCopy,
    withoutVantiqBalance: currentPoint.balanceWithoutVantiq,
    withVantiqBalance: currentPoint.balanceWithVantiq,
  };

  // SVG Chart Geometry Specs
  const width = 940;
  const height = 400;
  const padding = { top: 50, right: 50, bottom: 60, left: 85 };

  const chartValues = cashflowRunway.flatMap((point) => [
    point.balanceWithoutVantiq,
    point.balanceWithVantiq,
    point.pessimisticQuantile,
    point.optimisticQuantile,
  ]);
  const minVal = Math.min(-10000, ...chartValues);
  const maxVal = Math.max(10000, ...chartValues);

  const getX = (index: number) => {
    return padding.left + (index / (cashflowRunway.length - 1)) * (width - padding.left - padding.right);
  };

  const getY = (val: number) => {
    const norm = (val - minVal) / (maxVal - minVal);
    return height - padding.bottom - norm * (height - padding.top - padding.bottom);
  };

  const zeroY = getY(0);

  // Smooth Catmull-Rom to Cubic Bezier curve generator
  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  };

  // Coordinate arrays for curves
  const naiveCoordinates = cashflowRunway.map((pt, i) => ({
    x: getX(i),
    y: getY(pt.balanceWithoutVantiq)
  }));

  const vantiqCoordinates = cashflowRunway.map((pt, i) => ({
    x: getX(i),
    y: getY(pt.balanceWithVantiq)
  }));

  const q90Coordinates = cashflowRunway.map((pt, i) => ({
    x: getX(i),
    y: getY(pt.optimisticQuantile)
  }));

  const q10Coordinates = cashflowRunway.map((pt, i) => ({
    x: getX(i),
    y: getY(pt.pessimisticQuantile)
  }));

  const naiveSmoothPath = createSmoothPath(naiveCoordinates);
  const vantiqSmoothPath = createSmoothPath(vantiqCoordinates);

  // Closed area paths
  const naiveAreaPath = `${naiveSmoothPath} L ${naiveCoordinates[naiveCoordinates.length - 1].x} ${zeroY} L ${naiveCoordinates[0].x} ${zeroY} Z`;
  const vantiqAreaPath = `${vantiqSmoothPath} L ${vantiqCoordinates[vantiqCoordinates.length - 1].x} ${zeroY} L ${vantiqCoordinates[0].x} ${zeroY} Z`;

  // Quantile confidence ribbon path (q90 forward, q10 backward)
  const q90Path = createSmoothPath(q90Coordinates);
  const q10ReversedCoords = [...q10Coordinates].reverse();
  const q10ReversePath = q10ReversedCoords.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'L' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`, '');
  const quantileRibbonPath = `${q90Path} ${q10ReversePath} Z`;

  // Milestone indices for Day 30 and Day 32
  const day30Index = cashflowRunway.findIndex((pt) => pt.day === 30);
  const day32Index = cashflowRunway.findIndex((pt) => pt.day === 32);

  const day30Coord = day30Index >= 0 ? vantiqCoordinates[day30Index] : null;
  const day32Coord = day32Index >= 0 ? naiveCoordinates[day32Index] : null;

  // Handle interactive SVG mouse movement
  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * width;

    // Find closest data point
    let closestIndex = 0;
    let minDistance = Infinity;

    cashflowRunway.forEach((_, idx) => {
      const ptX = getX(idx);
      const distance = Math.abs(mouseX - ptX);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setHoveredIndex(closestIndex);
  };

  const handleSvgMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Re-run simulation animation
  const triggerSimulation = () => {
    setIsSimulatingRunway(true);
    let step = 0;
    const interval = setInterval(() => {
      setSelectedDayIndex(step);
      step++;
      if (step >= cashflowRunway.length) {
        clearInterval(interval);
        setIsSimulatingRunway(false);
      }
    }, 450);
  };

  return (
    <section id="cashflow-twin" style={{ padding: '60px 0', borderTop: '1px solid rgba(139, 92, 246, 0.15)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span className="badge badge-forest" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={13} />
              <span>Step 4: Stochastic Cashflow Twin</span>
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={13} />
              <span>90-Day Cashflow Projection</span>
            </span>
            <span className="badge badge-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <AlertOctagon size={13} />
                  <span>Sample payment dates: Days 15–35</span>
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                90-Day Cashflow Scenario
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '850px', lineHeight: 1.6 }}>
                An illustrative projection using your entered income, regular costs, emergency amount, and sample repayment schedules. It compares available cash over time; use actual lender terms for a real budget.
              </p>
            </div>

            {/* Quick Metric HUD */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 22px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #d0d7cc',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                  90-Day Solvency Delta
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#15803d' }}>
                  ₹{(day90Point.balanceWithVantiq - day90Point.balanceWithoutVantiq).toLocaleString()} projected difference
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Day 90 estimate: ₹{day90Point.balanceWithoutVantiq.toLocaleString()} vs. ₹{day90Point.balanceWithVantiq.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Controls & Scenario Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
          padding: '12px 20px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1.5px solid #d0d7cc',
          boxShadow: 'var(--shadow-card)'
        }}>
          {/* Curve Filter Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 700, marginRight: '4px' }}>
              Trajectory View:
            </span>
            <button
              onClick={() => setActiveCurveFilter('both')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: activeCurveFilter === 'both' ? '1.5px solid var(--wise-forest)' : '1px solid #d0d7cc',
                backgroundColor: activeCurveFilter === 'both' ? 'var(--wise-forest)' : '#f4f5f1',
                color: activeCurveFilter === 'both' ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Dual Comparison
            </button>
            <button
              onClick={() => setActiveCurveFilter('naive')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: activeCurveFilter === 'naive' ? '1.5px solid #dc2626' : '1px solid #d0d7cc',
                backgroundColor: activeCurveFilter === 'naive' ? '#fee2e2' : '#f4f5f1',
                color: activeCurveFilter === 'naive' ? '#dc2626' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Uncoordinated Crash Only
            </button>
            <button
              onClick={() => setActiveCurveFilter('vantiq')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: activeCurveFilter === 'vantiq' ? '1.5px solid #15803d' : '1px solid #d0d7cc',
                backgroundColor: activeCurveFilter === 'vantiq' ? '#edf4ea' : '#f4f5f1',
                color: activeCurveFilter === 'vantiq' ? '#15803d' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              VANTIQ Solvent Path Only
            </button>
          </div>

          {/* TFT Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={showQuantiles}
                onChange={(e) => setShowQuantiles(e.target.checked)}
                style={{ accentColor: 'var(--wise-forest)', cursor: 'pointer' }}
              />
              <span>Illustrative balance range</span>
            </label>

            <button
              onClick={triggerSimulation}
              disabled={isSimulatingRunway}
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Zap size={14} className={isSimulatingRunway ? 'animate-spin' : ''} color="var(--wise-forest)" />
              <span>{isSimulatingRunway ? 'Simulating 90-Day Run...' : 'Play 90-Day Digital Twin'}</span>
            </button>
          </div>
        </div>

        {/* REQUIREMENT 2 & 3: MAIN DUAL-CURVE SVG INTERACTIVE CHART */}
        <div className="vantiq-card" style={{ padding: '28px', backgroundColor: '#ffffff', marginBottom: '28px', position: 'relative', border: '1.5px solid #d0d7cc', boxShadow: 'var(--shadow-card)' }}>
          
          {/* Chart Sub-header Legends */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '24px', fontSize: '0.88rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
                <span style={{ color: '#dc2626', fontWeight: 700 }}>
                  Red Curve: Sample fragmented repayment schedule
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#15803d' }} />
                <span style={{ color: '#15803d', fontWeight: 700 }}>
                  Emerald Curve: Coordinated repayment schedule
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                Scenario estimate · not a guarantee
              </span>
            </div>
          </div>

          {/* SVG Canvas Container with Mobile Overflow Protection */}
          <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', position: 'relative', paddingBottom: '8px' }}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${width} ${height}`}
              style={{ width: '100%', minWidth: '780px', height: 'auto', overflow: 'visible', cursor: 'crosshair' }}
              onMouseMove={handleSvgMouseMove}
              onMouseLeave={handleSvgMouseLeave}
            >
              <defs>
                {/* Red Danger Gradient */}
                <linearGradient id="redDangerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.03" />
                </linearGradient>

                {/* Emerald Solvency Gradient */}
                <linearGradient id="emeraldSolvencyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                </linearGradient>

                {/* Quantile Ribbon Gradient */}
                <linearGradient id="quantileGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.06" />
                </linearGradient>

                {/* Glow Filters */}
                <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#ef4444" floodOpacity="0.7" />
                </filter>
                <filter id="glowEmerald" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10b981" floodOpacity="0.75" />
                </filter>
              </defs>

              {/* Background Danger Shading (Below Zero Line) */}
              <rect
                x={padding.left}
                y={zeroY}
                width={width - padding.left - padding.right}
                height={height - padding.bottom - zeroY}
                fill="rgba(239, 68, 68, 0.05)"
              />

              {/* Horizontal Grid Lines */}
              {[-30000, -15000, 0, 15000, 30000, 45000].map((tick) => (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    y1={getY(tick)}
                    x2={width - padding.right}
                    y2={getY(tick)}
                    stroke={tick === 0 ? '#64748b' : '#1e293b'}
                    strokeDasharray={tick === 0 ? '6 4' : '3 3'}
                    strokeWidth={tick === 0 ? 1.8 : 0.8}
                  />
                  <text
                    x={padding.left - 12}
                    y={getY(tick) + 4}
                    fill={tick === 0 ? '#cbd5e1' : tick < 0 ? '#f87171' : '#94a3b8'}
                    fontSize="11"
                    fontWeight={tick === 0 ? 'bold' : 'normal'}
                    textAnchor="end"
                  >
                    {tick < 0 ? `-₹${Math.abs(tick / 1000)}k` : `₹${tick / 1000}k`}
                  </text>
                </g>
              ))}

              {/* Zero Threshold Line Annotation */}
              <g transform={`translate(${width - padding.right - 10}, ${zeroY})`}>
                <rect x="-190" y="-12" width="190" height="20" rx="4" fill="rgba(15, 23, 42, 0.85)" stroke="#64748b" strokeWidth="0.8" />
                <text x="-95" y="2" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">
                  DEFAULT THRESHOLD (₹0 BALANCE)
                </text>
              </g>

              {/* Insolvency Zone Background Label */}
              <text
                x={padding.left + 20}
                y={height - padding.bottom - 20}
                fill="rgba(239, 68, 68, 0.35)"
                fontSize="18"
                fontWeight="900"
                letterSpacing="0.1em"
              >
                INSOLVENCY &amp; DEFAULT ZONE
              </text>

              {/* Illustrative range around the coordinated balance estimate */}
              {showQuantiles && activeCurveFilter !== 'naive' && (
                <path d={quantileRibbonPath} fill="url(#quantileGrad)" />
              )}

              {/* Curve 1: Red Uncoordinated Area Fill */}
              {activeCurveFilter !== 'vantiq' && (
                <path d={naiveAreaPath} fill="url(#redDangerGrad)" />
              )}

              {/* Curve 2: Emerald VANTIQ Area Fill */}
              {activeCurveFilter !== 'naive' && (
                <path d={vantiqAreaPath} fill="url(#emeraldSolvencyGrad)" />
              )}

              {/* Curve 1: Red Uncoordinated Line */}
              {activeCurveFilter !== 'vantiq' && (
                <path
                  d={naiveSmoothPath}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3.5"
                  filter="url(#glowRed)"
                />
              )}

              {/* Curve 2: Emerald VANTIQ Line */}
              {activeCurveFilter !== 'naive' && (
                <path
                  d={vantiqSmoothPath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  filter="url(#glowEmerald)"
                />
              )}

              {/* REQUIREMENT 4: MILESTONES & ALERT FLAGS DIRECTLY ON CHART */}
              
              {/* Alert Flag 1: Day 30 Salary Deposit (+₹40,000) */}
              {day30Coord && activeCurveFilter !== 'naive' && (
                <g transform={`translate(${day30Coord.x}, ${day30Coord.y})`}>
                  {/* Vertical dashed indicator to zero line */}
                  <line x1="0" y1="0" x2="0" y2={zeroY - day30Coord.y} stroke="#10b981" strokeDasharray="3 3" strokeWidth="1.5" />
                  <circle r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                  <circle r="12" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.6" className="animate-ping" />
                  
                  {/* Callout Flag Badge */}
                  <g transform="translate(-75, -54)">
                    <rect x="0" y="0" width="150" height="34" rx="6" fill="rgba(6, 78, 59, 0.95)" stroke="#10b981" strokeWidth="1.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))" />
                    <text x="75" y="15" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontWeight="bold">
                      MILESTONE: DAY 30
                    </text>
                    <text x="75" y="27" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="900">
                      +₹{profile.monthlyIncome.toLocaleString()} monthly income
                    </text>
                  </g>
                </g>
              )}

              {/* Alert Flag 2: Day 32 Clustered Debit Crash (-₹26,200) */}
              {day32Coord && activeCurveFilter !== 'vantiq' && (
                <g transform={`translate(${day32Coord.x}, ${day32Coord.y})`}>
                  {/* Vertical dashed line to zero line */}
                  <line x1="0" y1="0" x2="0" y2={-(day32Coord.y - zeroY)} stroke="#ef4444" strokeDasharray="3 3" strokeWidth="2" />
                  <circle r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
                  <circle r="14" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.8" className="animate-ping" />
                  
                  {/* Callout Flag Badge */}
                  <g transform="translate(-105, 18)">
                    <rect x="0" y="0" width="210" height="42" rx="6" fill="rgba(127, 29, 29, 0.95)" stroke="#ef4444" strokeWidth="1.8" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.7))" />
                    <text x="105" y="16" fill="#fecaca" fontSize="9" textAnchor="middle" fontWeight="bold">
                      CRITICAL ALERT: DAY 32 COLLISION
                    </text>
                    <text x="105" y="32" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="900">
                      ₹{day32Point.balanceWithoutVantiq.toLocaleString()} projected balance
                    </text>
                  </g>
                </g>
              )}

              {/* Data Points on Curves */}
              {cashflowRunway.map((pt, i) => {
                const isCurrent = i === activeIndex;
                const x = getX(i);
                const yNaive = getY(pt.balanceWithoutVantiq);
                const yVantiq = getY(pt.balanceWithVantiq);

                return (
                  <g key={i}>
                    {/* Vertical Scrubber Grid Line if Active */}
                    {isCurrent && (
                      <line
                        x1={x}
                        y1={padding.top}
                        x2={x}
                        y2={height - padding.bottom}
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                    )}

                    {/* Naive Curve Point */}
                    {activeCurveFilter !== 'vantiq' && (
                      <circle
                        cx={x}
                        cy={yNaive}
                        r={isCurrent ? 7.5 : 5}
                        fill="#ef4444"
                        stroke="#ffffff"
                        strokeWidth={isCurrent ? 2.5 : 1.5}
                        style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                        onClick={() => setSelectedDayIndex(i)}
                      />
                    )}

                    {/* VANTIQ Curve Point */}
                    {activeCurveFilter !== 'naive' && (
                      <circle
                        cx={x}
                        cy={yVantiq}
                        r={isCurrent ? 8 : 5.5}
                        fill="#10b981"
                        stroke="#ffffff"
                        strokeWidth={isCurrent ? 2.5 : 1.5}
                        style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                        onClick={() => setSelectedDayIndex(i)}
                      />
                    )}

                    {/* X-Axis Day Labels */}
                    <text
                      x={x}
                      y={height - padding.bottom + 24}
                      fill={isCurrent ? '#38bdf8' : pt.day === 30 || pt.day === 32 ? '#f8fafc' : '#64748b'}
                      fontSize={isCurrent ? '12' : '11'}
                      fontWeight={isCurrent || pt.day === 30 || pt.day === 32 ? 'bold' : 'normal'}
                      textAnchor="middle"
                    >
                      {pt.dateLabel}
                    </text>
                  </g>
                );
              })}

            </svg>
          </div>

          {/* Interactive Scrubber Slider Bar */}
          <div style={{ marginTop: '20px', padding: '14px 18px', backgroundColor: 'rgba(15, 23, 42, 0.8)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={14} color="#38bdf8" />
                <span>Interactive 90-Day Timeline Scrubber (Click or drag any day):</span>
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
                Active Horizon: {currentPoint.dateLabel}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max={cashflowRunway.length - 1}
              value={activeIndex}
              onChange={(e) => setSelectedDayIndex(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#10b981',
                cursor: 'pointer'
              }}
            />

            {/* Quick Milestone Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
              {cashflowRunway.map((pt, idx) => {
                const isSelected = idx === activeIndex;
                const isCritical = pt.day === 30 || pt.day === 32;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDayIndex(idx)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isSelected ? '1px solid #38bdf8' : isCritical ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.25)' : isCritical ? 'rgba(239, 68, 68, 0.12)' : 'rgba(30, 41, 59, 0.5)',
                      color: isSelected ? '#38bdf8' : isCritical ? '#fca5a5' : '#94a3b8',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {pt.dateLabel} {pt.day === 30 ? '💰' : pt.day === 32 ? '⚠️' : ''}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* REQUIREMENT 3: DAY-BY-DAY INTERACTIVE TOOLTIP / INSPECTOR COCKPIT */}
        <div className="vantiq-card glow-cyan" style={{ padding: '28px', marginBottom: '32px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="badge badge-cyan">
                  <Calendar size={13} />
                  <span>{currentMilestone.label} Detailed Breakdown</span>
                </span>
                <span className={currentMilestone.type === 'crash' || currentMilestone.type === 'hazard' ? 'badge badge-red' : 'badge badge-emerald'}>
                  {currentMilestone.tag}
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
                {currentMilestone.title}
              </h3>
            </div>

            <div style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-medium)',
              fontSize: '0.82rem',
              color: '#cbd5e1'
            }}>
              Net Difference on {currentMilestone.label}: <strong style={{ color: '#34d399', fontSize: '1rem' }}>+₹{(currentPoint.balanceWithVantiq - currentPoint.balanceWithoutVantiq).toLocaleString()}</strong>
            </div>
          </div>

          {/* Three-Column Comparative Inspector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            
            {/* Box 1: Without VANTIQ Bank Balance & EMI */}
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.35)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <XCircle size={18} color="#ef4444" />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase' }}>
                  Without VANTIQ (Predatory)
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Simulated Bank Balance:</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: currentPoint.balanceWithoutVantiq < 0 ? '#ef4444' : '#f8fafc',
                margin: '4px 0 12px 0'
              }}>
                {currentPoint.balanceWithoutVantiq < 0 ? `-₹${Math.abs(currentPoint.balanceWithoutVantiq).toLocaleString()}` : `₹${currentPoint.balanceWithoutVantiq.toLocaleString()}`}
                {currentPoint.balanceWithoutVantiq < 0 && (
                  <span style={{ fontSize: '0.75rem', color: '#fca5a5', fontWeight: 700, display: 'block' }}>
                    🚨 OVERDRAFT / DEFAULT COLLISION
                  </span>
                )}
              </div>

              <div style={{ borderTop: '1px solid rgba(239, 68, 68, 0.2)', paddingTop: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Upcoming / Clustered EMI:</div>
                <div style={{ fontSize: '0.85rem', color: '#fca5a5', fontWeight: 700, marginTop: '2px' }}>
                  {currentMilestone.upcomingEmiWithout}
                </div>
              </div>
            </div>

            {/* Box 2: With VANTIQ Bank Balance & EMI */}
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1.5px solid rgba(16, 185, 129, 0.45)',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>
With VANTIQ Funding Plan
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Simulated Bank Balance:</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: '#34d399',
                margin: '4px 0 12px 0'
              }}>
                ₹{currentPoint.balanceWithVantiq.toLocaleString()}
                <span style={{ fontSize: '0.75rem', color: '#6ee7b7', fontWeight: 700, display: 'block' }}>
                  🛡️ POSITIVE LIQUIDITY RUNWAY
                </span>
              </div>

              <div style={{ borderTop: '1px solid rgba(16, 185, 129, 0.2)', paddingTop: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Upcoming Scheduled EMI:</div>
                <div style={{ fontSize: '0.85rem', color: '#6ee7b7', fontWeight: 700, marginTop: '2px' }}>
                  {currentMilestone.upcomingEmiWith}
                </div>
              </div>
            </div>

            {/* Box 3: Cashflow Event & Risk Mitigation */}
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: 'rgba(11, 19, 41, 0.8)',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Info size={16} color="#38bdf8" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                    Cashflow Event Insight
                  </span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '10px' }}>
                  {currentMilestone.cashflowEvent}
                </p>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  {currentMilestone.description}
                </p>
              </div>

              <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#64748b' }}>
                Reference Income: ₹{profile?.monthlyIncome ? profile.monthlyIncome.toLocaleString() : '40,000'}/month
              </div>
            </div>

          </div>

          {/* Probabilistic Quantile Indicators ($q_{10}, q_{50}, q_{90}$) */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 18px',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
            color: '#cbd5e1',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="#10b981" />
              <span><strong>Illustrative balance range for {currentPoint.dateLabel}:</strong></span>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>Pessimistic ($q_{10}$): <strong style={{ color: '#38bdf8' }}>₹{currentPoint.pessimisticQuantile.toLocaleString()}</strong></span>
              <span>Expected ($q_{50}$): <strong style={{ color: '#34d399' }}>₹{currentPoint.expectedQuantile.toLocaleString()}</strong></span>
              <span>Optimistic ($q_{90}$): <strong style={{ color: '#c084fc' }}>₹{currentPoint.optimisticQuantile.toLocaleString()}</strong></span>
            </div>
          </div>

        </div>

        {/* REQUIREMENT 4: MILESTONES & ALERT FLAGS TIMELINE FEED */}
        <div className="vantiq-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Clock size={18} color="#38bdf8" />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>
              Critical Runway Milestones &amp; Default Trajectory Flags
            </h4>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            
            {/* Milestone Card 1: Day 30 Salary */}
            <div
              onClick={() => setSelectedDayIndex(day30Index >= 0 ? day30Index : 2)}
              style={{
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1.5px solid #10b981',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>Day 30 Milestone</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#15803d' }}>₹{profile.monthlyIncome.toLocaleString()} / month</span>
              </div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
                Salary Deposit Arrives
              </h5>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                The projection applies your monthly income and regular costs. Projected Day 30 balances: ₹{day30Point.balanceWithVantiq.toLocaleString()} coordinated and ₹{day30Point.balanceWithoutVantiq.toLocaleString()} sample schedule.
              </p>
            </div>

            {/* Milestone Card 2: Day 32 Clustered Crash */}
            <div
              onClick={() => setSelectedDayIndex(day32Index >= 0 ? day32Index : 3)}
              style={{
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1.5px solid #ef4444',
                cursor: 'pointer',
                boxShadow: '0 0 16px rgba(239, 68, 68, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-red" style={{ fontSize: '0.72rem' }}>Day 32 Alert Flag</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#b91c1c' }}>₹{day32Point.balanceWithoutVantiq.toLocaleString()}</span>
              </div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f87171', marginBottom: '4px' }}>
                Day 32 sample schedule estimate
              </h5>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                This estimate applies the sample payments scheduled around this date. It is an illustration, not a prediction of default or lender behavior.
              </p>
            </div>

            {/* Milestone Card 3: Day 60 Grace Transition */}
            <div
              onClick={() => setSelectedDayIndex(5)}
              style={{
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(139, 92, 246, 0.08)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>Day 60 Grace Period</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7c3aed' }}>₹{day60Point.balanceWithVantiq.toLocaleString()}</span>
              </div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
                60-Day Grace Complete
              </h5>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                Deferred repayments are scheduled to start after the 60-day grace period. Check the resulting balance against your actual budget.
              </p>
            </div>

            {/* Milestone Card 4: Day 90 Solvency Verdict */}
            <div
              onClick={() => setSelectedDayIndex(7)}
              style={{
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>Day 90 Full Horizon</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0369a1' }}>₹{day90Point.balanceWithVantiq.toLocaleString()}</span>
              </div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
                Day 90 illustrative balances
              </h5>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                At the end of this sample schedule, the projected balances are ₹{day90Point.balanceWithVantiq.toLocaleString()} and ₹{day90Point.balanceWithoutVantiq.toLocaleString()}. Actual results depend on real repayment terms and spending.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
