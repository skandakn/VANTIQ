// src/modules/m15_health_navigator/HealthEmiCalculator.tsx
// Interactive Medical Loan & EMI Calculator with Predatory Comparison

import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  TrendingDown, 
  ShieldCheck, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import type { HealthReliefPlan } from '../../types';

interface HealthEmiCalculatorProps {
  plan: HealthReliefPlan;
  initialAmount: number;
  currencySymbol: string;
  onClose: () => void;
}

export const HealthEmiCalculator: React.FC<HealthEmiCalculatorProps> = ({
  plan,
  initialAmount,
  currencySymbol,
  onClose,
}) => {
  const [loanAmount, setLoanAmount] = useState<number>(
    Math.min(initialAmount || 100000, plan.maxAmount)
  );
  const [tenureMonths, setTenureMonths] = useState<number>(
    Math.min(24, plan.tenureMonthsMax || 24)
  );
  const [apr, setApr] = useState<number>(plan.interestApr || 10.5);

  // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEmi = (principal: number, annualRate: number, months: number): {
    emi: number;
    totalInterest: number;
    totalRepayment: number;
  } => {
    if (annualRate === 0 || months === 0) {
      const emi = months > 0 ? Math.round(principal / months) : principal;
      return { emi, totalInterest: 0, totalRepayment: principal };
    }
    const monthlyRate = annualRate / 12 / 100;
    const emi = Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    );
    const totalRepayment = emi * months;
    const totalInterest = Math.max(0, totalRepayment - principal);
    return { emi, totalInterest, totalRepayment };
  };

  const currentResult = calculateEmi(loanAmount, apr, tenureMonths);
  // Compare against Predatory 36% APR loan
  const predatoryResult = calculateEmi(loanAmount, 36.0, tenureMonths);
  const totalInterestSaved = Math.max(0, predatoryResult.totalInterest - currentResult.totalInterest);
  const monthlyEmiSaved = Math.max(0, predatoryResult.emi - currentResult.emi);

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
        className="chronos-card"
        style={{
          maxWidth: '680px',
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
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-forest" style={{ fontSize: '0.75rem' }}>
                <Calculator size={13} />
                <span>Transparent Medical EMI Calculator</span>
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                {plan.regulatoryBody}
              </span>
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
              {plan.name}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Offered by {plan.organization} &bull; Verified Institutional Interest
            </p>
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
              transition: 'all 0.15s ease',
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          
          {/* Loan Amount Input */}
          <div style={{ backgroundColor: '#f9faf7', padding: '18px', borderRadius: '16px', border: '1px solid #e5e9e2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Required Medical Amount
              </label>
              <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                {currencySymbol}{loanAmount.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={plan.minAmount || 10000}
              max={plan.maxAmount}
              step={5000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--wise-forest)',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>Min: {currencySymbol}{(plan.minAmount || 10000).toLocaleString()}</span>
              <span>Max: {currencySymbol}{plan.maxAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div style={{ backgroundColor: '#f9faf7', padding: '18px', borderRadius: '16px', border: '1px solid #e5e9e2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Repayment Tenure
              </label>
              <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                {tenureMonths} Months ({Math.round((tenureMonths / 12) * 10) / 10} yrs)
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={plan.tenureMonthsMax || 36}
              step={3}
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--wise-forest)',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>3 Mos</span>
              <span>{plan.tenureMonthsMax || 36} Mos</span>
            </div>
          </div>

        </div>

        {/* Custom APR adjuster if plan has a variable range */}
        {plan.minInterestApr !== undefined && plan.maxInterestApr !== undefined && plan.minInterestApr !== plan.maxInterestApr && (
          <div style={{ marginBottom: '20px', padding: '12px 18px', backgroundColor: '#f4f5f1', borderRadius: '14px', border: '1px solid #e5e9e2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Adjust Annual Interest APR (Based on Credit Profile):
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                {apr}% p.a.
              </span>
            </div>
            <input
              type="range"
              min={plan.minInterestApr}
              max={plan.maxInterestApr}
              step={0.25}
              value={apr}
              onChange={(e) => setApr(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--wise-forest)', marginTop: '6px' }}
            />
          </div>
        )}

        {/* Calculated Monthly EMI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          
          <div style={{ backgroundColor: '#edf2ea', border: '1.5px solid #d8e2d4', padding: '16px', borderRadius: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3b543d', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Monthly EMI
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--wise-forest)', margin: '4px 0' }}>
              {currencySymbol}{currentResult.emi.toLocaleString()}
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/mo</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Fixed for {tenureMonths} monthly payments
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #e5e9e2', padding: '16px', borderRadius: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Interest Payable
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: apr === 0 ? '#15803d' : 'var(--wise-forest)', margin: '4px 0' }}>
              {currencySymbol}{currentResult.totalInterest.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              {apr === 0 ? '✨ 0% True Zero Cost Subvention' : `@ ${apr}% p.a. reducing rate`}
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #e5e9e2', padding: '16px', borderRadius: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Net Repayment
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--wise-forest)', margin: '4px 0' }}>
              {currencySymbol}{currentResult.totalRepayment.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Principal + Interest inclusive
            </div>
          </div>

        </div>

        {/* Predatory Trap Comparison Banner */}
        <div
          style={{
            backgroundColor: '#f0fdf4',
            border: '1.5px solid #bbf7d0',
            borderRadius: '16px',
            padding: '18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#dcfce7',
              color: '#15803d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <TrendingDown size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#166534' }}>
                You Save {currencySymbol}{totalInterestSaved.toLocaleString()} vs Predatory Payday Apps
              </span>
              <Sparkles size={16} color="#15803d" />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#14532d', marginTop: '2px', lineHeight: 1.4 }}>
              Predatory instant micro-loan apps charge 36% - 48% APR, which would cost you{' '}
              <strong>{currencySymbol}{predatoryResult.totalInterest.toLocaleString()}</strong> in interest alone and{' '}
              <strong>{currencySymbol}{predatoryResult.emi.toLocaleString()}/mo</strong> in EMI. This regulated institutional plan saves your family <strong>{currencySymbol}{monthlyEmiSaved.toLocaleString()}/mo</strong> in repayment and prevents default debt traps!
            </p>
          </div>
        </div>

        {/* Footer CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#15803d" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Zero hidden balloon charges &bull; Transparent pre-closure terms
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '10px 18px', fontSize: '0.88rem' }}
            >
              Close
            </button>
            <a
              href={plan.directApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                padding: '10px 20px',
                fontSize: '0.88rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <span>Visit Official Portal</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
