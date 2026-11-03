// src/modules/m05_cashflow_twin/CashflowRunwayChart.tsx
// Module 6: Stochastic Cashflow Twin (Temporal Fusion Transformer 90-Day Runway)
// Connected Live to Website Financial Telemetry and Household Profiles.

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
  Activity,
  ChevronDown,
  ChevronUp,
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

interface BankArchetype {
  id: string;
  name: string;
  role: string;
  bankName: string;
  income: number;
  existingEmi: number;
  houseRent: number;
  livingExpenses: number;
  emergencySavings: number;
  emergencyShock: number;
  tag: string;
}

const VERIFIED_ARCHETYPES: BankArchetype[] = [
  {
    id: 'it_tech',
    name: 'Bangalore Tech Professional',
    role: 'Senior Software Engineer',
    bankName: 'HDFC Bank',
    income: 75000,
    existingEmi: 12000,
    houseRent: 18000,
    livingExpenses: 16000,
    emergencySavings: 25000,
    emergencyShock: 60000,
    tag: 'Salaried Metro',
  },
  {
    id: 'healthcare',
    name: 'Healthcare Nursing Officer',
    role: 'Staff Nurse (Tier-2 Hospital)',
    bankName: 'ICICI Bank',
    income: 40000,
    existingEmi: 8000,
    houseRent: 7000,
    livingExpenses: 10000,
    emergencySavings: 5000,
    emergencyShock: 50000,
    tag: 'Baseline Health',
  },
  {
    id: 'gig_partner',
    name: 'Gig Delivery Partner',
    role: 'Quick-Commerce Logistics Rider',
    bankName: 'State Bank of India',
    income: 24000,
    existingEmi: 4000,
    houseRent: 5000,
    livingExpenses: 9500,
    emergencySavings: 3000,
    emergencyShock: 30000,
    tag: 'Gig Economy',
  },
  {
    id: 'msme_retailer',
    name: 'MSME Retail Merchant',
    role: 'Pharmacy & General Store Owner',
    bankName: 'Axis Bank',
    income: 95000,
    existingEmi: 18000,
    houseRent: 22000,
    livingExpenses: 22000,
    emergencySavings: 35000,
    emergencyShock: 120000,
    tag: 'Small Business',
  },
];

const formatRupee = (val: number): string => {
  const rounded = Math.round(val);
  if (rounded < 0) {
    return `-₹${Math.abs(rounded).toLocaleString('en-IN')}`;
  }
  return `₹${rounded.toLocaleString('en-IN')}`;
};

export const CashflowRunwayChart: React.FC = () => {
  const fintech = useFintech();
  const cashflowRunway: CashflowRunwayPoint[] =
    (fintech as unknown as { cashflowRunway?: CashflowRunwayPoint[] }).cashflowRunway ??
    fintech.runwayData;
  const { profile, setProfile, shock, setShock, fundingPlan } = fintech;

  // Interactive UI & Chart state
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(3); // Default Day 32 (Collision Crash)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showQuantiles, setShowQuantiles] = useState<boolean>(true);
  const [activeCurveFilter, setActiveCurveFilter] = useState<'both' | 'vantiq' | 'naive'>('both');
  const [isSimulatingRunway, setIsSimulatingRunway] = useState<boolean>(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(true);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedDayIndex;
  const currentPoint = cashflowRunway[activeIndex] || cashflowRunway[0];
  const pointForDay = (day: number) => cashflowRunway.find((point) => point.day === day) ?? currentPoint;

  const day30Point = pointForDay(30);
  const day32Point = pointForDay(32);
  const day60Point = pointForDay(60);
  const day90Point = pointForDay(90);

  // Dynamic Day-by-Day Milestone Data Dictionary derived directly from live state
  const milestoneData = useMemo<Record<number, Omit<MilestoneDetail, 'withoutVantiqBalance' | 'withVantiqBalance'>>>(() => {
    const shockAmt = Math.max(0, shock.amount);
    const amountScale = shockAmt > 0 ? shockAmt / 50000 : 1;
    const plan = fundingPlan.tranches.map((t) => t.monthlyObligation);

    return {
      0: {
        day: 0,
        label: 'Day 0',
        tag: 'Crisis Outset',
        type: 'hazard',
        title: 'Emergency Expense Incurred',
        upcomingEmiWithout: `₹0 immediate (${shockAmt > 0 ? '4 high-APR micro-loans signed under duress' : 'Standard baseline'})`,
        upcomingEmiWith: '₹0 (0% APR hospital/relief advance deployed without predatory fee)',
        cashflowEvent: `${formatRupee(shockAmt)} emergency shock registered across telemetry.`,
        description: 'Both paths start from available liquid savings after funding the emergency gap. Later divergent trajectories arise from debt structure.'
      },
      15: {
        day: 15,
        label: 'Day 15',
        tag: 'First Drawdown',
        type: 'hazard',
        title: 'Payday App Clustered Deduction',
        upcomingEmiWithout: `${formatRupee(Math.round(5400 * amountScale))} FastSalary 24x7 1st Payday EMI`,
        upcomingEmiWith: '₹0 (Co-op & hospital tranches deferred to synchronized month-end)',
        cashflowEvent: `First fragmented micro-lender auto-debit triggers ${formatRupee(Math.round(5400 * amountScale))}.`,
        description: 'Uncoordinated payday lenders deduct mid-month before salary arrives, whereas VANTIQ synchronizes obligations with your payroll cycle.'
      },
      30: {
        day: 30,
        label: 'Day 30',
        tag: 'Salary Milestone',
        type: 'deposit',
        title: 'Payroll Arrival & Scheduled Housing Deductions',
        upcomingEmiWithout: `${formatRupee(Math.round(7120 * amountScale))} QuickRupee EMI + ${formatRupee(profile.houseRent)} rent`,
        upcomingEmiWith: `${formatRupee(plan[0] + plan[1])} coordinated Tranche A & B installment`,
        cashflowEvent: `+${formatRupee(profile.monthlyIncome)} payroll credit balanced against rent (${formatRupee(profile.houseRent)}).`,
        description: 'Monthly salary arrives. In the uncoordinated path, instant loan deductions immediately cannibalize the inflow. VANTIQ keeps essential liquidity protected.'
      },
      32: {
        day: 32,
        label: 'Day 32',
        tag: 'Critical Default Trap',
        type: 'crash',
        title: 'Clustered Debt Collision & NACH Overdraft Trap',
        upcomingEmiWithout: `${formatRupee(Math.round(5240 * amountScale))} SplitNow BNPL + ${formatRupee(profile.existingEmi)} existing loan`,
        upcomingEmiWith: '₹0 (Zero non-coordinated debits permitted on collision days)',
        cashflowEvent: `Uncoordinated collision: Multiple lender auto-debits fire within 48 hours of housing rent.`,
        description: 'The critical danger zone: fragmented lenders pull automated mandates simultaneously, causing bank balance collapse and triggering compounding penal charges.'
      },
      45: {
        day: 45,
        label: 'Day 45',
        tag: 'Compounding Spiral',
        type: 'hazard',
        title: 'Secondary Penalties & Rollover Charges',
        upcomingEmiWithout: `${formatRupee(Math.round(2500 + Math.abs(day32Point.balanceWithoutVantiq) * 0.05))} bounce fees & compounding penal interest`,
        upcomingEmiWith: '₹0 (Protected under 60-day debt shield)',
        cashflowEvent: 'Overdraft fees, NACH mandate return charges, and 48% APR compounding kick in.',
        description: 'Insolvency deepens as bounced mandates incur bank penalty fees. The VANTIQ coordinated roadmap keeps cash balance comfortably positive.'
      },
      60: {
        day: 60,
        label: 'Day 60',
        tag: 'Grace Transition',
        type: 'recovery',
        title: 'VANTIQ 60-Day Grace Period Transition',
        upcomingEmiWithout: `${formatRupee(Math.round(7120 * amountScale))} ongoing predatory rollover`,
        upcomingEmiWith: `${formatRupee(plan[2] || 0)} deferred micro-loan begins post-grace`,
        cashflowEvent: 'Second salary deposit arrives; VANTIQ begins deferred micro-loan repayment.',
        description: 'After 60 days of financial breathing room, structured low-interest deferred repayment begins in alignment with verified household surplus.'
      },
      75: {
        day: 75,
        label: 'Day 75',
        tag: 'Surplus Restoration',
        type: 'recovery',
        title: 'Sustained Positive Trajectory',
        upcomingEmiWithout: 'Legal recovery notices, credit bureau score degradation (-140 pts)',
        upcomingEmiWith: `${formatRupee(plan[2] || 0)} predictable single-window installment`,
        cashflowEvent: `Net balance difference expands to +${formatRupee(currentPoint.balanceWithVantiq - currentPoint.balanceWithoutVantiq)}.`,
        description: 'The user maintains positive working capital, avoiding high-stress collections and preserving family financial dignity.'
      },
      90: {
        day: 90,
        label: 'Day 90',
        tag: 'Full Horizon Outcome',
        type: 'recovery',
        title: '90-Day Solvency Verdict',
        upcomingEmiWithout: `Chronic insolvency: ${formatRupee(day90Point.balanceWithoutVantiq)} accumulated net deficit`,
        upcomingEmiWith: `Fully solvent: ${formatRupee(day90Point.balanceWithVantiq)} liquid cash buffer preserved`,
        cashflowEvent: `Final solvency difference: +${formatRupee(day90Point.balanceWithVantiq - day90Point.balanceWithoutVantiq)} net benefit.`,
        description: '90-day simulation concludes. Coordinated multi-source financing saves household from insolvency while reducing debt servicing costs.'
      }
    };
  }, [shock.amount, fundingPlan, profile, day32Point.balanceWithoutVantiq, day90Point, currentPoint]);

  const milestoneCopy = milestoneData[currentPoint.day] || {
    day: currentPoint.day,
    label: currentPoint.dateLabel,
    tag: 'Trajectory Point',
    type: currentPoint.balanceWithVantiq > 0 ? 'recovery' : 'hazard',
    title: `Runway State: Day ${currentPoint.day}`,
    upcomingEmiWithout: 'Standard predatory scheduled obligations',
    upcomingEmiWith: 'Coordinated non-colliding obligations',
    cashflowEvent: `Net balance differential: +${formatRupee(currentPoint.balanceWithVantiq - currentPoint.balanceWithoutVantiq)}`,
    description: `Projected balances on Day ${currentPoint.day} are dynamically calculated from your live income and expense parameters.`
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

  // Profile parameter updater
  const updateProfileField = (field: keyof typeof profile, val: number) => {
    const cleanVal = Number.isFinite(val) ? Math.max(0, val) : 0;
    setProfile((prev) => {
      const updated = { ...prev, [field]: cleanVal };
      updated.absorptiveSurplus = updated.monthlyIncome - (updated.existingEmi + updated.houseRent + updated.livingExpenses);
      return updated;
    });
  };

  // One-click verified profile applicator
  const applyArchetype = (arc: BankArchetype) => {
    setProfile({
      monthlyIncome: arc.income,
      existingEmi: arc.existingEmi,
      houseRent: arc.houseRent,
      livingExpenses: arc.livingExpenses,
      emergencySavings: arc.emergencySavings,
      absorptiveSurplus: arc.income - (arc.existingEmi + arc.houseRent + arc.livingExpenses),
    });
    setShock((prev) => ({
      ...prev,
      amount: arc.emergencyShock,
    }));
  };

  const netSurplus = profile.monthlyIncome - (profile.existingEmi + profile.houseRent + profile.livingExpenses);
  const solvencyDelta = day90Point.balanceWithVantiq - day90Point.balanceWithoutVantiq;

  return (
    <section id="digital-twin" style={{ padding: '40px 0 60px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span className="badge badge-forest" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={13} />
              <span>Stochastic Cashflow Twin</span>
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={13} />
              <span>Live Website Engine Connected</span>
            </span>
            <span className="badge badge-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <AlertOctagon size={13} />
              <span>Uncoordinated Collision Zone: Day 32</span>
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                90-Day Cashflow Scenario
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', maxWidth: '850px', lineHeight: 1.6 }}>
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
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#15803d' }}>
                  {formatRupee(solvencyDelta)} projected difference
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Day 90 estimate: {formatRupee(day90Point.balanceWithoutVantiq)} vs. {formatRupee(day90Point.balanceWithVantiq)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. LIVE FINANCIAL TELEMETRY & ACCOUNT AGGREGATOR CONTROLLER PANEL */}
        <div style={{
          marginBottom: '28px',
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          border: '1.5px solid #bbf7d0',
          boxShadow: '0 8px 30px rgba(22, 51, 0, 0.06)',
          overflow: 'hidden'
        }}>
          {/* Header Bar */}
          <div
            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
            style={{
              padding: '14px 20px',
              background: 'linear-gradient(90deg, #f0fdf4 0%, #ffffff 100%)',
              borderBottom: isConsoleOpen ? '1px solid #dcfce7' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Sliders size={18} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--wise-forest)', margin: 0 }}>
                    Live Household Financial Telemetry &amp; Bank Feed
                  </h4>
                  <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '12px', backgroundColor: '#dcfce7', color: '#166534', fontWeight: 700 }}>
                    ● REACTIVE TWIN SYNC
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                  Connect your real personal values via live sliders and verified household profiles.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 700, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <span>Income: <strong>{formatRupee(profile.monthlyIncome)}</strong></span>
                <span>•</span>
                <span>Monthly Surplus: <strong>{formatRupee(netSurplus)}</strong></span>
                <span>•</span>
                <span>Emergency: <strong>{formatRupee(shock.amount)}</strong></span>
              </div>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--wise-forest)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label="Toggle console"
              >
                {isConsoleOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
          </div>

          {/* Collapsible Console Body */}
          {isConsoleOpen && (
            <div style={{ padding: '20px' }}>
              {/* SLIDERS & VERIFIED PROFILES */}
              <div>
                  {/* Archetype Quick Pickers */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '8px' }}>
                      Load Real-Life Archetype Presets (Click any to test):
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px' }}>
                      {VERIFIED_ARCHETYPES.map((arc) => {
                        const isMatch = profile.monthlyIncome === arc.income && profile.houseRent === arc.houseRent;
                        return (
                          <div
                            key={arc.id}
                            onClick={() => applyArchetype(arc)}
                            style={{
                              padding: '12px',
                              borderRadius: '10px',
                              border: isMatch ? '2px solid #15803d' : '1px solid #e5e7eb',
                              backgroundColor: isMatch ? '#f0fdf4' : '#fafafa',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534' }}>{arc.tag}</span>
                              <span style={{ fontSize: '0.72rem', color: '#6b7280' }}>{arc.bankName}</span>
                            </div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--wise-forest)' }}>{arc.name}</div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                              Salary: {formatRupee(arc.income)} | Shock: {formatRupee(arc.emergencyShock)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 6 Real Household Sliders & Inputs */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', backgroundColor: '#f9fafb', padding: '16px', borderRadius: '12px' }}>
                    {/* Monthly Salary */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: 'var(--wise-forest)' }}>
                        <span>Monthly Take-Home</span>
                        <span style={{ color: '#15803d' }}>{formatRupee(profile.monthlyIncome)}</span>
                      </div>
                      <input
                        type="range"
                        min="15000"
                        max="200000"
                        step="2000"
                        value={profile.monthlyIncome}
                        onChange={(e) => updateProfileField('monthlyIncome', Number(e.target.value))}
                        style={{ width: '100%', marginTop: '6px', accentColor: '#15803d' }}
                      />
                      <input
                        type="number"
                        min="0"
                        step="500"
                        value={profile.monthlyIncome}
                        onChange={(e) => updateProfileField('monthlyIncome', Number(e.target.value))}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.82rem', fontWeight: 700 }}
                      />
                    </div>

                    {/* Existing Loan EMI */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: 'var(--wise-forest)' }}>
                        <span>Existing Fixed EMI</span>
                        <span style={{ color: '#b91c1c' }}>{formatRupee(profile.existingEmi)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="60000"
                        step="1000"
                        value={profile.existingEmi}
                        onChange={(e) => updateProfileField('existingEmi', Number(e.target.value))}
                        style={{ width: '100%', marginTop: '6px', accentColor: '#dc2626' }}
                      />
                      <input
                        type="number"
                        min="0"
                        step="500"
                        value={profile.existingEmi}
                        onChange={(e) => updateProfileField('existingEmi', Number(e.target.value))}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.82rem', fontWeight: 700 }}
                      />
                    </div>

                    {/* House Rent */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: 'var(--wise-forest)' }}>
                        <span>House Rent</span>
                        <span style={{ color: '#b45309' }}>{formatRupee(profile.houseRent)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="1000"
                        value={profile.houseRent}
                        onChange={(e) => updateProfileField('houseRent', Number(e.target.value))}
                        style={{ width: '100%', marginTop: '6px', accentColor: '#b45309' }}
                      />
                      <input
                        type="number"
                        min="0"
                        step="500"
                        value={profile.houseRent}
                        onChange={(e) => updateProfileField('houseRent', Number(e.target.value))}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.82rem', fontWeight: 700 }}
                      />
                    </div>

                    {/* Living & Food */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: 'var(--wise-forest)' }}>
                        <span>Living &amp; Food Costs</span>
                        <span style={{ color: '#0369a1' }}>{formatRupee(profile.livingExpenses)}</span>
                      </div>
                      <input
                        type="range"
                        min="3000"
                        max="50000"
                        step="1000"
                        value={profile.livingExpenses}
                        onChange={(e) => updateProfileField('livingExpenses', Number(e.target.value))}
                        style={{ width: '100%', marginTop: '6px', accentColor: '#0369a1' }}
                      />
                      <input
                        type="number"
                        min="0"
                        step="500"
                        value={profile.livingExpenses}
                        onChange={(e) => updateProfileField('livingExpenses', Number(e.target.value))}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.82rem', fontWeight: 700 }}
                      />
                    </div>

                    {/* Liquid Savings */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: 'var(--wise-forest)' }}>
                        <span>Liquid Savings Buffer</span>
                        <span style={{ color: '#166534' }}>{formatRupee(profile.emergencySavings)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={profile.emergencySavings}
                        onChange={(e) => updateProfileField('emergencySavings', Number(e.target.value))}
                        style={{ width: '100%', marginTop: '6px', accentColor: '#166534' }}
                      />
                      <input
                        type="number"
                        min="0"
                        step="500"
                        value={profile.emergencySavings}
                        onChange={(e) => updateProfileField('emergencySavings', Number(e.target.value))}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.82rem', fontWeight: 700 }}
                      />
                    </div>

                    {/* Emergency Expense Shock */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: 'var(--wise-forest)' }}>
                        <span>Emergency Shock Amount</span>
                        <span style={{ color: '#dc2626' }}>{formatRupee(shock.amount)}</span>
                      </div>
                      <input
                        type="range"
                        min="10000"
                        max="250000"
                        step="5000"
                        value={shock.amount}
                        onChange={(e) => setShock((prev) => ({ ...prev, amount: Number(e.target.value) }))}
                        style={{ width: '100%', marginTop: '6px', accentColor: '#dc2626' }}
                      />
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={shock.amount}
                        onChange={(e) => setShock((prev) => ({ ...prev, amount: Number(e.target.value) }))}
                        style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.82rem', fontWeight: 700 }}
                      />
                    </div>
                  </div>
                </div>
            </div>
          )}
        </div>

        {/* 2. INTERACTIVE CONTROLS & SCENARIO TOOLBAR */}
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
              type="button"
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
              type="button"
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
              type="button"
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
              type="button"
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

        {/* 3. MAIN DUAL-CURVE SVG INTERACTIVE CHART */}
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
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
                </linearGradient>

                {/* Emerald Solvency Gradient */}
                <linearGradient id="emeraldSolvencyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.03" />
                </linearGradient>

                {/* Quantile Ribbon Gradient */}
                <linearGradient id="quantileGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.06" />
                </linearGradient>

                {/* Glow Filters */}
                <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#ef4444" floodOpacity="0.6" />
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
                height={Math.max(0, height - padding.bottom - zeroY)}
                fill="rgba(239, 68, 68, 0.06)"
              />

              {/* Horizontal Grid Lines */}
              {[-30000, -15000, 0, 15000, 30000, 45000].map((tick) => (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    y1={getY(tick)}
                    x2={width - padding.right}
                    y2={getY(tick)}
                    stroke={tick === 0 ? '#64748b' : '#cbd5e1'}
                    strokeDasharray={tick === 0 ? '6 4' : '3 3'}
                    strokeWidth={tick === 0 ? 1.8 : 0.8}
                  />
                  <text
                    x={padding.left - 12}
                    y={getY(tick) + 4}
                    fill={tick === 0 ? '#334155' : tick < 0 ? '#dc2626' : '#64748b'}
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
                <rect x="-190" y="-12" width="190" height="20" rx="4" fill="rgba(30, 41, 59, 0.9)" stroke="#64748b" strokeWidth="0.8" />
                <text x="-95" y="2" fill="#f8fafc" fontSize="10" textAnchor="middle" fontWeight="bold">
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

              {/* Quantile Ribbon */}
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

              {/* Alert Flag 1: Day 30 Salary Deposit */}
              {day30Coord && activeCurveFilter !== 'naive' && (
                <g transform={`translate(${day30Coord.x}, ${day30Coord.y})`}>
                  <line x1="0" y1="0" x2="0" y2={zeroY - day30Coord.y} stroke="#10b981" strokeDasharray="3 3" strokeWidth="1.5" />
                  <circle r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                  <circle r="12" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.6" className="animate-ping" />
                  
                  <g transform="translate(-75, -54)">
                    <rect x="0" y="0" width="150" height="34" rx="6" fill="rgba(6, 78, 59, 0.95)" stroke="#10b981" strokeWidth="1.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
                    <text x="75" y="15" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontWeight="bold">
                      MILESTONE: DAY 30
                    </text>
                    <text x="75" y="27" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="900">
                      +{formatRupee(profile.monthlyIncome)} monthly income
                    </text>
                  </g>
                </g>
              )}

              {/* Alert Flag 2: Day 32 Clustered Debit Crash */}
              {day32Coord && activeCurveFilter !== 'vantiq' && (
                <g transform={`translate(${day32Coord.x}, ${day32Coord.y})`}>
                  <line x1="0" y1="0" x2="0" y2={-(day32Coord.y - zeroY)} stroke="#ef4444" strokeDasharray="3 3" strokeWidth="2" />
                  <circle r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
                  <circle r="14" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.8" className="animate-ping" />
                  
                  <g transform="translate(-105, 18)">
                    <rect x="0" y="0" width="210" height="42" rx="6" fill="rgba(127, 29, 29, 0.95)" stroke="#ef4444" strokeWidth="1.8" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.4))" />
                    <text x="105" y="16" fill="#fecaca" fontSize="9" textAnchor="middle" fontWeight="bold">
                      CRITICAL ALERT: DAY 32 COLLISION
                    </text>
                    <text x="105" y="32" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="900">
                      {formatRupee(day32Point.balanceWithoutVantiq)} projected balance
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
                    {isCurrent && (
                      <line
                        x1={x}
                        y1={padding.top}
                        x2={x}
                        y2={height - padding.bottom}
                        stroke="#0284c7"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                    )}

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
                      fill={isCurrent ? '#0284c7' : pt.day === 30 || pt.day === 32 ? '#163300' : '#64748b'}
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
          <div style={{ marginTop: '20px', padding: '14px 18px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--wise-forest)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={14} color="#0284c7" />
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
                    type="button"
                    onClick={() => setSelectedDayIndex(idx)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isSelected ? '1.5px solid #0284c7' : isCritical ? '1.5px solid rgba(239, 68, 68, 0.4)' : '1px solid #d1d5db',
                      backgroundColor: isSelected ? '#e0f2fe' : isCritical ? '#fee2e2' : '#ffffff',
                      color: isSelected ? '#0369a1' : isCritical ? '#b91c1c' : '#4b5563',
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

        {/* 4. DAY-BY-DAY INTERACTIVE INSPECTOR COCKPIT */}
        <div className="vantiq-card" style={{ padding: '28px', marginBottom: '32px', backgroundColor: '#ffffff', border: '1.5px solid #d0d7cc', boxShadow: 'var(--shadow-card)' }}>
          
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
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                {currentMilestone.title}
              </h3>
            </div>

            <div style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#f0fdf4',
              border: '1.5px solid #bbf7d0',
              fontSize: '0.85rem',
              color: '#166534'
            }}>
              Net Difference on {currentMilestone.label}: <strong style={{ color: '#15803d', fontSize: '1.05rem' }}>+{formatRupee(currentPoint.balanceWithVantiq - currentPoint.balanceWithoutVantiq)}</strong>
            </div>
          </div>

          {/* Three-Column Comparative Inspector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            
            {/* Box 1: Without VANTIQ Bank Balance & EMI */}
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#fff1f2',
              border: '1.5px solid #fecaca'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <XCircle size={18} color="#ef4444" />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#b91c1c', textTransform: 'uppercase' }}>
                  Without VANTIQ (Predatory)
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Simulated Bank Balance:</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: currentPoint.balanceWithoutVantiq < 0 ? '#b91c1c' : 'var(--wise-forest)',
                margin: '4px 0 12px 0'
              }}>
                {formatRupee(currentPoint.balanceWithoutVantiq)}
                {currentPoint.balanceWithoutVantiq < 0 && (
                  <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 800, display: 'block' }}>
                    🚨 OVERDRAFT / DEFAULT COLLISION
                  </span>
                )}
              </div>

              <div style={{ borderTop: '1px solid #fecaca', paddingTop: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Upcoming / Clustered EMI:</div>
                <div style={{ fontSize: '0.85rem', color: '#991b1b', fontWeight: 700, marginTop: '2px' }}>
                  {currentMilestone.upcomingEmiWithout}
                </div>
              </div>
            </div>

            {/* Box 2: With VANTIQ Bank Balance & EMI */}
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#f0fdf4',
              border: '1.5px solid #bbf7d0',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle2 size={18} color="#15803d" />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                  With VANTIQ Funding Plan
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Simulated Bank Balance:</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: '#15803d',
                margin: '4px 0 12px 0'
              }}>
                {formatRupee(currentPoint.balanceWithVantiq)}
                <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 800, display: 'block' }}>
                  🛡️ POSITIVE LIQUIDITY RUNWAY
                </span>
              </div>

              <div style={{ borderTop: '1px solid #bbf7d0', paddingTop: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Upcoming Scheduled EMI:</div>
                <div style={{ fontSize: '0.85rem', color: '#166534', fontWeight: 700, marginTop: '2px' }}>
                  {currentMilestone.upcomingEmiWith}
                </div>
              </div>
            </div>

            {/* Box 3: Cashflow Event & Risk Mitigation */}
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#f0f9ff',
              border: '1.5px solid #bae6fd',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Info size={16} color="#0284c7" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase' }}>
                    Cashflow Event Insight
                  </span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#1e293b', lineHeight: 1.5, marginBottom: '10px' }}>
                  {currentMilestone.cashflowEvent}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {currentMilestone.description}
                </p>
              </div>

              <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#64748b' }}>
                Active Take-Home Salary: {formatRupee(profile.monthlyIncome)} / month
              </div>
            </div>

          </div>

          {/* Probabilistic Quantile Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 18px',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            fontSize: '0.8rem',
            color: '#334155',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="#15803d" />
              <span><strong>Illustrative TFT balance range for {currentPoint.dateLabel}:</strong></span>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>Pessimistic (q₁₀): <strong style={{ color: '#0284c7' }}>{formatRupee(currentPoint.pessimisticQuantile)}</strong></span>
              <span>Expected (q₅₀): <strong style={{ color: '#15803d' }}>{formatRupee(currentPoint.expectedQuantile)}</strong></span>
              <span>Optimistic (q₉₀): <strong style={{ color: '#7c3aed' }}>{formatRupee(currentPoint.optimisticQuantile)}</strong></span>
            </div>
          </div>

        </div>

        {/* 5. MILESTONES & ALERT FLAGS TIMELINE FEED */}
        <div className="vantiq-card" style={{ padding: '24px', backgroundColor: '#ffffff', border: '1.5px solid #d0d7cc', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Clock size={18} color="#0284c7" />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
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
                backgroundColor: '#f0fdf4',
                border: '1.5px solid #10b981',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>Day 30 Milestone</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#15803d' }}>+{formatRupee(profile.monthlyIncome)} / mo</span>
              </div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--wise-forest)', marginBottom: '4px' }}>
                Salary Deposit Arrives
              </h5>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                The projection applies your monthly income and regular costs. Projected Day 30 balances: {formatRupee(day30Point.balanceWithVantiq)} coordinated vs. {formatRupee(day30Point.balanceWithoutVantiq)} sample schedule.
              </p>
            </div>

            {/* Milestone Card 2: Day 32 Clustered Crash */}
            <div
              onClick={() => setSelectedDayIndex(day32Index >= 0 ? day32Index : 3)}
              style={{
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: '#fef2f2',
                border: '1.5px solid #ef4444',
                cursor: 'pointer',
                boxShadow: '0 0 16px rgba(239, 68, 68, 0.15)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-red" style={{ fontSize: '0.72rem' }}>Day 32 Alert Flag</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#b91c1c' }}>{formatRupee(day32Point.balanceWithoutVantiq)}</span>
              </div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#b91c1c', marginBottom: '4px' }}>
                Day 32 Clustered Debit Collision
              </h5>
              <p style={{ fontSize: '0.78rem', color: '#7f1d1d', lineHeight: 1.4 }}>
                Multiple predatory auto-debits fire within 48 hours of housing rent. Balance plunges underwater into overdraft penalties.
              </p>
            </div>

            {/* Milestone Card 3: Day 60 Grace Transition */}
            <div
              onClick={() => setSelectedDayIndex(5)}
              style={{
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: '#faf5ff',
                border: '1.5px solid #c084fc',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>Day 60 Grace Period</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7c3aed' }}>{formatRupee(day60Point.balanceWithVantiq)}</span>
              </div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--wise-forest)', marginBottom: '4px' }}>
                60-Day Grace Complete
              </h5>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Deferred micro-loan repayments start safely only after the 60-day breathing period, perfectly timed with your verified surplus.
              </p>
            </div>

            {/* Milestone Card 4: Day 90 Solvency Verdict */}
            <div
              onClick={() => setSelectedDayIndex(7)}
              style={{
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: '#f0f9ff',
                border: '1.5px solid #38bdf8',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>Day 90 Full Horizon</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0284c7' }}>{formatRupee(day90Point.balanceWithVantiq)}</span>
              </div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--wise-forest)', marginBottom: '4px' }}>
                Final Solvency Outcome
              </h5>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Coordinated schedule ends at {formatRupee(day90Point.balanceWithVantiq)} positive buffer, delivering a net household delta of +{formatRupee(solvencyDelta)}.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
