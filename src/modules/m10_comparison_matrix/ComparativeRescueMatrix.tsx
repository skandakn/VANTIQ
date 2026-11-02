// src/modules/m10_comparison_matrix/ComparativeRescueMatrix.tsx
// Module 11 (M11): Counterfactual Comparison Matrix
// Head-to-head: Fragmented Multi-App Borrowing vs. VANTIQ Quantum Allocation
// Interactive toggle: 3-month, 6-month, 12-month projection horizon.

import React, { useState } from 'react';
import {
  ShieldCheck,
  XCircle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Horizon = 3 | 6 | 12;

interface MetricRow {
  label: string;
  fragmented: (h: Horizon) => string;
  VANTIQ: (h: Horizon) => string;
  winDirection: 'lower' | 'higher';
  unit?: string;
}

// ---------------------------------------------------------------------------
// Projection helpers
// ---------------------------------------------------------------------------

function fmtINR(n: number): string {
  return n.toLocaleString('en-IN');
}

const PRINCIPAL = 50000;
const FRAGMENTED_APR = 0.385;
const VANTIQ_APR = 0.042;

/** Simple-interest projection plus the repeated fee charged each 3-month cycle. */
function fragmentedTotalCostAmount(h: Horizon): number {
  const interest = PRINCIPAL * FRAGMENTED_APR * (h / 12);
  const fees = 4800 * Math.ceil(h / 3);
  return Math.round(PRINCIPAL + interest + fees);
}

/** Simple-interest projection; the coordinated plan has no processing fees. */
function VANTIQTotalCostAmount(h: Horizon): number {
  const interest = PRINCIPAL * VANTIQ_APR * (h / 12);
  return Math.round(PRINCIPAL + interest);
}

function fmtTotalCost(amount: number): string {
  return 'Rs.' + fmtINR(amount);
}

/** Rs.4,800 fee per 3-month cycle, compounded across horizon */
function fragmentedFees(h: Horizon): string {
  return 'Rs.' + fmtINR(4800 * Math.ceil(h / 3));
}

function VANTIQFees(_h: Horizon): string {
  return 'Rs.0';
}

function fragmentedPayment(_h: Horizon): string {
  return 'Rs.26,200';
}

function VANTIQPayment(_h: Horizon): string {
  return 'Rs.4,285';
}

function fragmentedAmort(h: Horizon): string {
  return h < 18
    ? String(18 - h) + 'mo remaining (penalties apply)'
    : 'Paid off (+ penalties)';
}

function VANTIQAmort(h: Horizon): string {
  return h < 12 ? String(12 - h) + 'mo remaining' : 'Paid off (flat)';
}

function fragmentedDefault(h: Horizon): string {
  const decay = h <= 3 ? 0 : h <= 6 ? -4 : -8;
  return String(92 + decay) + '%';
}

function VANTIQDefault(h: Horizon): string {
  const drift = h <= 3 ? 0 : h <= 6 ? 0.2 : 0.3;
  return (1.8 + drift).toFixed(1) + '%';
}

// ---------------------------------------------------------------------------
// Metric definitions (all 5 required by spec)
// ---------------------------------------------------------------------------

const METRICS: MetricRow[] = [
  {
    label: 'Effective APR',
    fragmented: () => '38.5%',
    VANTIQ: () => '4.2%',
    winDirection: 'lower',
  },
  {
    label: 'Processing Fees & Hidden Churn',
    fragmented: fragmentedFees,
    VANTIQ: VANTIQFees,
    winDirection: 'lower',
    unit: 'cumulative over horizon',
  },
  {
    label: 'Monthly Payment Shock',
    fragmented: fragmentedPayment,
    VANTIQ: VANTIQPayment,
    winDirection: 'lower',
    unit: '/mo',
  },
  {
    label: 'Time to Full Amortization',
    fragmented: fragmentedAmort,
    VANTIQ: VANTIQAmort,
    winDirection: 'lower',
  },
  {
    label: 'Risk of Default / Harassment',
    fragmented: fragmentedDefault,
    VANTIQ: VANTIQDefault,
    winDirection: 'lower',
  },
];

// ---------------------------------------------------------------------------
// Summary banner data per horizon
// ---------------------------------------------------------------------------

function getSummary(horizon: Horizon) {
  const saved = fragmentedTotalCostAmount(horizon) - VANTIQTotalCostAmount(horizon);
  const defaultRiskGap = Number(fragmentedDefault(horizon)) - Number(VANTIQDefault(horizon));

  return {
    saved: 'Rs.' + fmtINR(saved),
    feesDodged: fragmentedFees(horizon),
    defaultDelta: `${defaultRiskGap.toFixed(1)} pts`,
  };
}

// ---------------------------------------------------------------------------
// HorizonToggle
// ---------------------------------------------------------------------------

interface HorizonToggleProps {
  selected: Horizon;
  onChange: (h: Horizon) => void;
}

const HorizonToggle: React.FC<HorizonToggleProps> = ({ selected, onChange }) => {
  const options: Horizon[] = [3, 6, 12];
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {options.map((h) => {
        const active = h === selected;
        return (
          <button
            key={h}
            onClick={() => onChange(h)}
            aria-pressed={active}
            style={{
              padding: '6px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: active
                ? '1.5px solid var(--neon-cyan)'
                : '1.5px solid var(--border-subtle)',
              background: active
                ? 'rgba(6,182,212,0.15)'
                : 'rgba(15,23,42,0.6)',
              color: active ? '#38bdf8' : '#94a3b8',
              transition: 'all var(--transition-normal)',
              outline: 'none',
            }}
          >
            {h}mo
          </button>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------------------
// MetricRowItem
// ---------------------------------------------------------------------------

interface MetricRowItemProps {
  metric: MetricRow;
  horizon: Horizon;
  index: number;
}

const MetricRowItem: React.FC<MetricRowItemProps> = ({
  metric,
  horizon,
  index,
}) => {
  const fragValue   = metric.fragmented(horizon);
  const VANTIQValue = metric.VANTIQ(horizon);
  const isRiskRow   = metric.label.startsWith('Risk');

  return (
    <tr
      style={{
        backgroundColor:
          index % 2 === 0 ? 'rgba(15,23,42,0.55)' : 'rgba(10,17,36,0.45)',
        transition: 'background var(--transition-fast)',
      }}
    >
      {/* Metric label */}
      <td
        style={{
          padding: '16px 20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#cbd5e1',
          borderRight: '1px solid rgba(51,65,85,0.3)',
          minWidth: '220px',
        }}
      >
        {metric.label}
        {metric.unit && (
          <span
            style={{
              display: 'block',
              fontSize: '0.72rem',
              color: '#64748b',
              marginTop: '2px',
            }}
          >
            {metric.unit}
          </span>
        )}
      </td>

      {/* Fragmented */}
      <td
        style={{
          padding: '16px 20px',
          textAlign: 'center',
          borderRight: '1px solid rgba(51,65,85,0.3)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#f87171',
          }}
        >
          {isRiskRow ? <AlertTriangle size={14} /> : <TrendingDown size={14} />}
          {fragValue}
        </span>
      </td>

      {/* VANTIQ */}
      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#34d399',
          }}
        >
          {isRiskRow ? <CheckCircle2 size={14} /> : <TrendingUp size={14} />}
          {VANTIQValue}
        </span>
      </td>
    </tr>
  );
};

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------

export const ComparativeRescueMatrix: React.FC = () => {
  const [horizon, setHorizon] = useState<Horizon>(3);
  const summary = getSummary(horizon);

  return (
    <section id="comparison" style={{ padding: '48px 0' }}>
      <div className='container'>

        {/* Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className='badge badge-cyan'>
              <ShieldCheck size={13} />
              <span>M11 - Counterfactual Comparison Matrix</span>
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.2, marginBottom: '8px' }}>
                Fragmented Borrowing vs.{' '}
                <span style={{ color: '#38bdf8' }}>VANTIQ Quantum Allocation</span>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '620px' }}>
                A rigorous counterfactual evaluation across five financial-health dimensions.
                Toggle the projection horizon to see how the cost divergence compounds over time.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Projection Horizon
              </span>
              <HorizonToggle selected={horizon} onChange={setHorizon} />
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className='vantiq-card' style={{ overflow: 'hidden', padding: 0, marginBottom: '24px', border: '1px solid rgba(51,65,85,0.4)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(90deg, rgba(15,23,42,0.95) 0%, rgba(10,17,36,0.95) 100%)', borderBottom: '2px solid rgba(51,65,85,0.5)' }}>
                  <th style={{ padding: '18px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', borderRight: '1px solid rgba(51,65,85,0.3)' }}>
                    Metric
                  </th>
                  <th style={{ padding: '18px 20px', textAlign: 'center', borderRight: '1px solid rgba(51,65,85,0.3)' }}>
                    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)' }}>
                        <XCircle size={14} color='#ef4444' />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Fragmented Multi-App Borrowing
                        </span>
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Predatory instant-loan trap</span>
                    </div>
                  </th>
                  <th style={{ padding: '18px 20px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.35)' }}>
                        <CheckCircle2 size={14} color='#06b6d4' />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          VANTIQ Quantum Allocation
                        </span>
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Multi-source quantum rescue</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {METRICS.map((metric, i) => (
                  <MetricRowItem key={metric.label} metric={metric} horizon={horizon} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Projected Total Cost cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div className='vantiq-card' style={{ border: '1.5px solid rgba(239,68,68,0.35)', background: 'rgba(239,68,68,0.04)', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Fragmented - {horizon}-Month Total Repayment
            </span>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f87171' }}>
              {fmtTotalCost(fragmentedTotalCostAmount(horizon))}
            </span>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              principal, projected interest, and {fragmentedFees(horizon)} in horizon fees
            </span>
          </div>
          <div className='vantiq-card glow-emerald' style={{ border: '1.5px solid rgba(16,185,129,0.45)', background: 'rgba(16,185,129,0.04)', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              VANTIQ - {horizon}-Month Total Repayment
            </span>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399' }}>
              {fmtTotalCost(VANTIQTotalCostAmount(horizon))}
            </span>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              principal plus projected interest; no processing fees
            </span>
          </div>
        </div>

        {/* Bottom impact banner */}
        <div style={{ backgroundColor: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 'var(--radius-lg)', padding: '18px 28px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '28px', textAlign: 'center' }}>
          {([
            { label: 'Cash Saved',            value: summary.saved,        color: '#34d399' },
            { label: 'Fees Dodged',           value: summary.feesDodged,   color: '#38bdf8' },
            { label: 'Default Risk Reduction',value: summary.defaultDelta, color: '#c084fc' },
          ] as { label: string; value: string; color: string }[]).map(({ label, value, color }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color, letterSpacing: '-0.02em' }}>
                {value}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
