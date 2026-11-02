// src/modules/m10_comparison_matrix/ComparativeRescueMatrix.tsx
// Module 11: Wise-Style Interactive Competitor Comparison Engine (Authentic Light Theme)
import React, { useState } from 'react';
import {
  Check,
  X,
  Info,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const ComparativeRescueMatrix: React.FC = () => {
  const { shock, setShock } = useFintech();
  const [comparisonTab, setComparisonTab] = useState<'fees' | 'monthly' | 'traps'>('fees');

  const neededAmount = Math.max(0, shock.amount);

  const setAmount = (amt: number) => {
    setShock((prev) => ({ ...prev, amount: amt }));
  };

  // Dynamic lender computations based on current amount
  const lenders = [
    {
      name: 'VANTIQ Rescue Plan',
      isHero: true,
      badge: 'CHEAPEST & SAFEST',
      disbursement: 'Instant (15 mins)',
      upfrontFee: 0,
      interestCost: Math.round(neededAmount * 0.0284),
      totalCost: Math.round(neededAmount * 0.0284),
      effectiveApr: '3.8% Blended',
      monthlyPayment: Math.round(neededAmount / 11.6),
      hiddenCharges: '₹0 (Zero)',
      collisionRisk: 'Zero (Buffer Guaranteed)',
      laborHoursCost: Math.round((neededAmount * 0.0284) / 250),
    },
    {
      name: 'QuickRupee Instant Pay',
      isHero: false,
      badge: 'Predatory NBFC',
      disbursement: 'Instant (3 mins)',
      upfrontFee: Math.round(neededAmount * 0.045),
      interestCost: Math.round(neededAmount * 0.165),
      totalCost: Math.round(neededAmount * 0.21),
      effectiveApr: '36.0% APR',
      monthlyPayment: Math.round((neededAmount * 1.21) / 3),
      hiddenCharges: '₹900 direct deducted',
      collisionRisk: 'Collides on Day 30',
      laborHoursCost: Math.round((neededAmount * 0.21) / 250),
    },
    {
      name: 'SplitNow 3-Pay BNPL',
      isHero: false,
      badge: 'BNPL Platform',
      disbursement: 'Instant (2 mins)',
      upfrontFee: Math.round(neededAmount * 0.03),
      interestCost: Math.round(neededAmount * 0.13),
      totalCost: Math.round(neededAmount * 0.16),
      effectiveApr: '28.0% APR',
      monthlyPayment: Math.round((neededAmount * 1.16) / 3),
      hiddenCharges: '₹450 late fee per bounce',
      collisionRisk: 'Collides on Day 32',
      laborHoursCost: Math.round((neededAmount * 0.16) / 250),
    },
    {
      name: 'ApexCard Cash Advance',
      isHero: false,
      badge: 'Credit Card',
      disbursement: 'Instant ATM',
      upfrontFee: Math.round(neededAmount * 0.05),
      interestCost: Math.round(neededAmount * 0.22),
      totalCost: Math.round(neededAmount * 0.27),
      effectiveApr: '42.0% APR',
      monthlyPayment: Math.round((neededAmount * 1.27) / 6),
      hiddenCharges: '3.5% transaction surcharge',
      collisionRisk: 'Collides on Day 35',
      laborHoursCost: Math.round((neededAmount * 0.27) / 250),
    },
    {
      name: '4-App Panic Stacking (Trap)',
      isHero: false,
      badge: 'Uncoordinated Stack',
      disbursement: 'Fragmented',
      upfrontFee: Math.round(neededAmount * 0.06),
      interestCost: Math.round(neededAmount * 0.308),
      totalCost: Math.round(neededAmount * 0.368),
      effectiveApr: '38.5% Blended',
      monthlyPayment: Math.round((neededAmount * 1.368) / 3.2),
      hiddenCharges: '₹4,800 bounce fees',
      collisionRisk: 'Day 45 Default Trap!',
      laborHoursCost: Math.round((neededAmount * 0.368) / 250),
    },
  ];

  const maxPredatoryCost = lenders[4].totalCost;
  const vantiqCost = lenders[0].totalCost;
  const netSavings = Math.max(0, maxPredatoryCost - vantiqCost);

  return (
    <section id="comparison" style={{ padding: '80px 0', borderTop: '1px solid #e5e9e2', backgroundColor: 'var(--bg-deep)' }}>
      <div className="container">
        
        {/* Section Header - Wise Style */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 14px',
            borderRadius: '9999px',
            backgroundColor: '#ffffff',
            color: 'var(--wise-forest)',
            border: '1px solid #d8e2d4',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
          }}>
            <Sparkles size={14} color="#15803d" />
            <span>INTERACTIVE TRUST & FEE COMPARISON</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.03em', marginBottom: '14px' }}>
            See how much you save with VANTIQ.
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Like traditional banks hide markups in exchange rates, predatory lending apps hide extortion in fragmented auto-debits and processing fees. Here is the unvarnished truth.
          </p>
        </div>

        {/* Interactive Amount Selector Pills (Wise Pattern) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}>
          <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', fontWeight: 700, marginRight: '4px' }}>
            Emergency Shock Amount:
          </span>
          {[25000, 50000, 75000, 100000].map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              style={{
                padding: '9px 20px',
                borderRadius: '9999px',
                fontSize: '0.92rem',
                fontWeight: 700,
                border: neededAmount === amt ? '2px solid var(--wise-forest)' : '1px solid #d0d7cc',
                backgroundColor: neededAmount === amt ? 'var(--wise-forest)' : '#ffffff',
                color: neededAmount === amt ? 'var(--wise-lime)' : 'var(--wise-forest)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            >
              ₹{amt.toLocaleString('en-IN')}
            </button>
          ))}
        </div>

        {/* Big Savings Callout Banner - Light High-Trust Card */}
        <div style={{
          backgroundColor: '#edf4ea',
          border: '1.5px solid #cce0c5',
          borderRadius: '20px',
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '36px',
          boxShadow: '0 8px 24px rgba(22, 51, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: 'var(--wise-lime)',
              color: 'var(--wise-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.5rem',
              boxShadow: '0 2px 8px rgba(159, 232, 112, 0.5)'
            }}>
              ₹
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', color: '#3d5c34', fontWeight: 700 }}>
                Total Cost Difference on ₹{neededAmount.toLocaleString()} Shock
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                You save <span style={{ color: '#15803d' }}>₹{netSavings.toLocaleString()}</span> and{' '}
                <span style={{ color: '#15803d' }}>{Math.round(netSavings / 250)} hours of labor</span> with VANTIQ
              </div>
            </div>
          </div>

          <a
            href="#rescue-split"
            className="btn btn-primary"
            style={{ padding: '14px 28px', fontSize: '0.95rem' }}
          >
            <span>Lock In Optimal Rescue</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Filter View Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {[
            { id: 'fees', label: 'Total Cost & Interest' },
            { id: 'monthly', label: 'Monthly Repayment Shock' },
            { id: 'traps', label: 'Hidden Fees & Default Risk' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setComparisonTab(tab.id as 'fees' | 'monthly' | 'traps')}
              style={{
                padding: '9px 18px',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: '1px solid #d0d7cc',
                backgroundColor: comparisonTab === tab.id ? 'var(--wise-forest)' : '#ffffff',
                color: comparisonTab === tab.id ? '#ffffff' : 'var(--wise-forest)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Wise-Style Interactive Comparison Table (Clean White Table) */}
        <div style={{
          overflowX: 'auto',
          borderRadius: '24px',
          border: '1px solid #e5e9e2',
          backgroundColor: '#ffffff',
          boxShadow: '0 16px 44px rgba(22, 51, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #edf0ea', backgroundColor: '#fafbf9' }}>
                <th style={{ padding: '22px 28px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Lending Provider
                </th>
                <th style={{ padding: '22px 20px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Speed & APR
                </th>
                <th style={{ padding: '22px 20px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Fees & Interest
                </th>
                <th style={{ padding: '22px 20px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Monthly Repayment
                </th>
                <th style={{ padding: '22px 28px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Default Safety
                </th>
              </tr>
            </thead>
            <tbody>
              {lenders.map((lender, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: lender.isHero ? '#f2f8ee' : '#ffffff',
                    borderBottom: '1px solid #edf0ea',
                    borderLeft: lender.isHero ? '4px solid #15803d' : 'none',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  {/* Provider Name */}
                  <td style={{ padding: '22px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <strong style={{ fontSize: '1.05rem', color: lender.isHero ? '#15803d' : 'var(--wise-forest)' }}>
                        {lender.name}
                      </strong>
                      {lender.isHero ? (
                        <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                          <Check size={12} />
                          <span>{lender.badge}</span>
                        </span>
                      ) : (
                        <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                          {lender.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                      {lender.disbursement}
                    </div>
                  </td>

                  {/* Speed & APR */}
                  <td style={{ padding: '22px 20px' }}>
                    <div style={{ fontWeight: 800, color: lender.isHero ? '#15803d' : 'var(--wise-forest)', fontSize: '1rem' }}>
                      {lender.effectiveApr}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Upfront: ₹{lender.upfrontFee.toLocaleString()}
                    </div>
                  </td>

                  {/* Total Fees & Interest */}
                  <td style={{ padding: '22px 20px' }}>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      color: lender.isHero ? '#15803d' : '#dc2626'
                    }}>
                      ₹{lender.totalCost.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {neededAmount > 0 ? `${((lender.totalCost / neededAmount) * 100).toFixed(1)}% total surcharge` : '0.0% total surcharge'}
                    </div>
                  </td>

                  {/* Monthly Repayment */}
                  <td style={{ padding: '22px 20px' }}>
                    <div style={{
                      fontWeight: 900,
                      fontSize: '1.05rem',
                      color: lender.monthlyPayment > 15000 ? '#dc2626' : 'var(--wise-forest)'
                    }}>
                      ₹{lender.monthlyPayment.toLocaleString()} / mo
                    </div>
                    <div style={{ fontSize: '0.78rem', color: lender.monthlyPayment > 15000 ? '#b91c1c' : '#15803d', fontWeight: 600 }}>
                      {lender.monthlyPayment > 15000 ? '⚠️ Exceeds ₹15k surplus' : '✓ Safe within surplus'}
                    </div>
                  </td>

                  {/* Collision Risk */}
                  <td style={{ padding: '22px 28px' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      color: lender.isHero ? '#15803d' : '#dc2626'
                    }}>
                      {lender.isHero ? <Check size={17} /> : <X size={17} />}
                      <span>{lender.collisionRisk}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                      {lender.hiddenCharges}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Wise Micro-Copy Footer Guarantee */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '22px',
          fontSize: '0.84rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Info size={15} />
            <span>Comparison based on empirical NBFC loan agreements & RBI fair practice disclosures (April 2026).</span>
          </div>
          <div>
            Data privacy: <strong>Zero credit bureau footprints initiated during simulation</strong>.
          </div>
        </div>

      </div>
    </section>
  );
};
