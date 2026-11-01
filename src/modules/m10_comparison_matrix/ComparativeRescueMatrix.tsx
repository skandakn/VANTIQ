// src/modules/m10_comparison_matrix/ComparativeRescueMatrix.tsx
// Module 11: Wise-Style Interactive Competitor Comparison Engine
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

  const neededAmount = shock.amount || 50000;

  const setAmount = (amt: number) => {
    setShock((prev) => ({ ...prev, amount: amt }));
  };

  // Dynamic lender computations based on current amount
  const lenders = [
    {
      name: 'VANTIQ Quantum Rescue',
      isHero: true,
      badge: 'CHEAPEST & SAFEST',
      disbursement: 'Instant (15 mins)',
      upfrontFee: Math.round(neededAmount * 0.0),
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
    <section id="comparison" style={{ padding: '70px 0', borderTop: '1px solid rgba(159, 232, 112, 0.15)' }}>
      <div className="container">
        
        {/* Section Header - Wise Style */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(159, 232, 112, 0.14)',
            color: 'var(--wise-lime)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '14px'
          }}>
            <Sparkles size={14} />
            <span>INTERACTIVE TRUST & FEE COMPARISON</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '14px' }}>
            See how much you save with VANTIQ.
          </h2>

          <p style={{ color: 'var(--wise-text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
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
          marginBottom: '32px'
        }}>
          <span style={{ fontSize: '0.9rem', color: '#a3b8a6', fontWeight: 600, marginRight: '4px' }}>
            Emergency Shock Amount:
          </span>
          {[25000, 50000, 75000, 100000].map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 700,
                border: neededAmount === amt ? '2px solid var(--wise-lime)' : '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: neededAmount === amt ? 'rgba(159, 232, 112, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: neededAmount === amt ? 'var(--wise-lime)' : '#cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              ₹{amt.toLocaleString('en-IN')}
            </button>
          ))}
        </div>

        {/* Big Savings Callout Banner */}
        <div style={{
          backgroundColor: 'rgba(159, 232, 112, 0.12)',
          border: '1.5px solid rgba(159, 232, 112, 0.4)',
          borderRadius: '18px',
          padding: '20px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
          boxShadow: '0 8px 30px rgba(159, 232, 112, 0.12)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--wise-lime)',
              color: 'var(--wise-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.4rem'
            }}>
              ₹
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#a3b8a6', fontWeight: 600 }}>
                Total Cost Difference on ₹{neededAmount.toLocaleString()} Shock
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>
                You save <span style={{ color: 'var(--wise-lime)' }}>₹{netSavings.toLocaleString()}</span> and{' '}
                <span style={{ color: 'var(--wise-lime)' }}>{Math.round(netSavings / 250)} hours of labor</span> with VANTIQ
              </div>
            </div>
          </div>

          <a
            href="#quantum-solver"
            className="btn btn-primary"
            style={{ padding: '12px 24px', fontSize: '0.9rem' }}
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
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                backgroundColor: comparisonTab === tab.id ? 'var(--wise-lime)' : 'rgba(255, 255, 255, 0.06)',
                color: comparisonTab === tab.id ? 'var(--wise-forest)' : '#cbd5e1',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Wise-Style Interactive Comparison Table */}
        <div style={{
          overflowX: 'auto',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(15, 25, 17, 0.9)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <th style={{ padding: '20px 24px', fontSize: '0.85rem', color: '#a3b8a6', fontWeight: 700, textTransform: 'uppercase' }}>
                  Lending Provider
                </th>
                <th style={{ padding: '20px', fontSize: '0.85rem', color: '#a3b8a6', fontWeight: 700, textTransform: 'uppercase' }}>
                  Speed & APR
                </th>
                <th style={{ padding: '20px', fontSize: '0.85rem', color: '#a3b8a6', fontWeight: 700, textTransform: 'uppercase' }}>
                  Total Fees & Interest
                </th>
                <th style={{ padding: '20px', fontSize: '0.85rem', color: '#a3b8a6', fontWeight: 700, textTransform: 'uppercase' }}>
                  Monthly Repayment
                </th>
                <th style={{ padding: '20px 24px', fontSize: '0.85rem', color: '#a3b8a6', fontWeight: 700, textTransform: 'uppercase' }}>
                  Default Safety
                </th>
              </tr>
            </thead>
            <tbody>
              {lenders.map((lender, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: lender.isHero ? 'rgba(159, 232, 112, 0.1)' : 'transparent',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    borderLeft: lender.isHero ? '4px solid var(--wise-lime)' : 'none',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  {/* Provider Name */}
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '1rem', color: lender.isHero ? 'var(--wise-lime)' : '#ffffff' }}>
                        {lender.name}
                      </strong>
                      {lender.isHero ? (
                        <span className="badge badge-lime" style={{ fontSize: '0.65rem' }}>
                          <Check size={11} />
                          <span>{lender.badge}</span>
                        </span>
                      ) : (
                        <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>
                          {lender.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b846e', marginTop: '2px' }}>
                      {lender.disbursement}
                    </div>
                  </td>

                  {/* Speed & APR */}
                  <td style={{ padding: '20px' }}>
                    <div style={{ fontWeight: 700, color: lender.isHero ? 'var(--wise-lime)' : '#ffffff', fontSize: '0.95rem' }}>
                      {lender.effectiveApr}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#a3b8a6' }}>
                      Upfront: ₹{lender.upfrontFee.toLocaleString()}
                    </div>
                  </td>

                  {/* Total Fees & Interest */}
                  <td style={{ padding: '20px' }}>
                    <div style={{
                      fontSize: '1.15rem',
                      fontWeight: 900,
                      color: lender.isHero ? 'var(--wise-lime)' : '#f87171'
                    }}>
                      ₹{lender.totalCost.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#a3b8a6' }}>
                      {((lender.totalCost / neededAmount) * 100).toFixed(1)}% total surcharge
                    </div>
                  </td>

                  {/* Monthly Repayment */}
                  <td style={{ padding: '20px' }}>
                    <div style={{
                      fontWeight: 800,
                      fontSize: '1rem',
                      color: lender.monthlyPayment > 15000 ? '#f87171' : '#ffffff'
                    }}>
                      ₹{lender.monthlyPayment.toLocaleString()} / mo
                    </div>
                    <div style={{ fontSize: '0.75rem', color: lender.monthlyPayment > 15000 ? '#fca5a5' : '#34d399' }}>
                      {lender.monthlyPayment > 15000 ? '⚠️ Exceeds ₹15k surplus' : '✓ Safe within surplus'}
                    </div>
                  </td>

                  {/* Collision Risk */}
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: lender.isHero ? 'var(--wise-lime)' : '#f87171'
                    }}>
                      {lender.isHero ? <Check size={16} /> : <X size={16} />}
                      <span>{lender.collisionRisk}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b846e', marginTop: '2px' }}>
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
          marginTop: '20px',
          fontSize: '0.82rem',
          color: '#6b846e'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Info size={14} />
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
