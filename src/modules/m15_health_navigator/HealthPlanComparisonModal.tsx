// src/modules/m15_health_navigator/HealthPlanComparisonModal.tsx
// Side-by-side comparison matrix for selected medical relief plans

import React from 'react';
import { 
  X, 
  Scale, 
  Check, 
  AlertCircle, 
  ExternalLink,
  Star,
  Clock
} from 'lucide-react';
import type { HealthReliefPlan } from '../../types';

interface HealthPlanComparisonModalProps {
  plans: HealthReliefPlan[];
  currencySymbol: string;
  onRemovePlan: (planId: string) => void;
  onClose: () => void;
}

export const HealthPlanComparisonModal: React.FC<HealthPlanComparisonModalProps> = ({
  plans,
  currencySymbol,
  onRemovePlan,
  onClose,
}) => {
  if (plans.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(22, 51, 0, 0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        className="vantiq-card"
        style={{
          maxWidth: '1060px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '32px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1.5px solid #d0d7cc',
          boxShadow: '0 25px 60px rgba(22, 51, 0, 0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-forest" style={{ fontSize: '0.75rem' }}>
                <Scale size={13} />
                <span>Side-by-Side Relief Matrix</span>
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Comparing {plans.length} Verified Options
              </span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
              Medical Funding & Relief Comparison
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f4f5f1',
              border: '1px solid #d0d7cc',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--wise-forest)',
            }}
            aria-label="Close comparison"
          >
            <X size={18} />
          </button>
        </div>

        {/* Comparison Table / Grid */}
        <div style={{ overflowX: 'auto', paddingBottom: '12px' }}>
          <table
            style={{
              width: '100%',
              minWidth: '640px',
              borderCollapse: 'separate',
              borderSpacing: '12px 0',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr>
                <th style={{ width: '180px', padding: '12px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Criteria
                </th>
                {plans.map((p) => (
                  <th
                    key={p.id}
                    style={{
                      padding: '16px',
                      backgroundColor: '#f4f5f1',
                      borderRadius: '16px 16px 0 0',
                      border: '1px solid #e5e9e2',
                      borderBottom: 'none',
                      verticalAlign: 'top',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, color: '#3b543d' }}>
                          {p.categoryLabel}
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--wise-forest)', marginTop: '2px' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          {p.organization}
                        </div>
                      </div>
                      <button
                        onClick={() => onRemovePlan(p.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--text-muted)',
                          padding: '4px',
                        }}
                        title="Remove from comparison"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>

              {/* Interest APR */}
              <tr>
                <td style={{ padding: '14px 12px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-secondary)', borderBottom: '1px solid #e5e9e2' }}>
                  Interest APR / Cost
                </td>
                {plans.map((p) => (
                  <td key={p.id} style={{ padding: '14px 16px', backgroundColor: '#fafbf9', border: '1px solid #e5e9e2', borderTop: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, color: p.interestApr === 0 ? '#15803d' : 'var(--wise-forest)' }}>
                        {p.interestApr === 0 ? '0% Free / Subsidized' : `${p.interestApr}% p.a.`}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {p.isRepayable ? 'Repayable EMI plan' : '✨ Non-repayable (0% Debt)'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Trust Score & Regulation */}
              <tr>
                <td style={{ padding: '14px 12px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-secondary)', borderBottom: '1px solid #e5e9e2' }}>
                  Trust & Regulation
                </td>
                {plans.map((p) => (
                  <td key={p.id} style={{ padding: '14px 16px', backgroundColor: '#fafbf9', border: '1px solid #e5e9e2', borderTop: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#b45309', fontWeight: 800, fontSize: '0.9rem' }}>
                        <Star size={15} fill="#f59e0b" color="#f59e0b" />
                        <span>{p.trustScore}</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        ({p.ratingCount.toLocaleString()} verified cases)
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--wise-forest)' }}>
                      {p.regulatoryBody}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Max Funding Limit */}
              <tr>
                <td style={{ padding: '14px 12px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-secondary)', borderBottom: '1px solid #e5e9e2' }}>
                  Funding Limit & Tenure
                </td>
                {plans.map((p) => (
                  <td key={p.id} style={{ padding: '14px 16px', backgroundColor: '#fafbf9', border: '1px solid #e5e9e2', borderTop: 'none' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                      Up to {currencySymbol}{p.maxAmount.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {p.tenureMonthsMax > 0 ? `Up to ${p.tenureMonthsMax} months tenure` : 'Grant / One-time treatment'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Disbursement Speed */}
              <tr>
                <td style={{ padding: '14px 12px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-secondary)', borderBottom: '1px solid #e5e9e2' }}>
                  Disbursement Speed
                </td>
                {plans.map((p) => (
                  <td key={p.id} style={{ padding: '14px 16px', backgroundColor: '#fafbf9', border: '1px solid #e5e9e2', borderTop: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={15} color="#15803d" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                        {p.disbursementSpeed}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Key Benefits */}
              <tr>
                <td style={{ padding: '14px 12px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-secondary)', borderBottom: '1px solid #e5e9e2' }}>
                  Key Advantages
                </td>
                {plans.map((p) => (
                  <td key={p.id} style={{ padding: '14px 16px', backgroundColor: '#fafbf9', border: '1px solid #e5e9e2', borderTop: 'none' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {p.keyBenefits.map((b, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          <Check size={14} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Gotchas / Caveats */}
              <tr>
                <td style={{ padding: '14px 12px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-secondary)', borderBottom: '1px solid #e5e9e2' }}>
                  Important Caveats
                </td>
                {plans.map((p) => (
                  <td key={p.id} style={{ padding: '14px 16px', backgroundColor: '#fafbf9', border: '1px solid #e5e9e2', borderTop: 'none' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {p.drawbacksOrGotchas.map((d, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.76rem', color: '#b45309' }}>
                          <AlertCircle size={14} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Action */}
              <tr>
                <td style={{ padding: '14px 12px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Action
                </td>
                {plans.map((p) => (
                  <td
                    key={p.id}
                    style={{
                      padding: '16px',
                      backgroundColor: '#f4f5f1',
                      borderRadius: '0 0 16px 16px',
                      border: '1px solid #e5e9e2',
                      borderTop: 'none',
                    }}
                  >
                    <a
                      href={p.directApplyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                      }}
                    >
                      <span>Apply on Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '10px 24px', fontSize: '0.88rem' }}
          >
            Close Matrix
          </button>
        </div>

      </div>
    </div>
  );
};
