// src/modules/m01_hero/HeroSection.tsx
// Wise-Inspired Hero: "Product as the Hero, Not Marketing Fluff" (Light Theme)
import React, { useState, useId, useEffect } from 'react';
import {
  TrendingDown,
  Lock,
  Sparkles,
  Info
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';
import { EmergencyIntake } from '../m02_crisis_input/EmergencyIntake';

export const HeroSection: React.FC = () => {
  const { shock, setShock, profile, fundingPlan } = useFintech();
  const emergencyAmountId = useId();

  // Local state for interactive currency/emergency converter
  const tenureMonths = shock.tenureMonths ?? 12;
  const [tenureDraft, setTenureDraft] = useState(String(tenureMonths));

  useEffect(() => {
    setTenureDraft(String(tenureMonths));
  }, [tenureMonths]);

  const handleTenureChange = (months: number) => {
    const safeMonths = Math.min(60, Math.max(1, Math.round(months)));
    setTenureDraft(String(safeMonths));
    setShock((prev) => ({
      ...prev,
      tenureMonths: safeMonths,
    }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value.replace(/[^0-9]/g, '')) || 0;
    setShock((prev) => ({
      ...prev,
      amount: val
    }));
  };

  const setPresetAmount = (amt: number) => {
    setShock((prev) => ({
      ...prev,
      amount: amt
    }));
  };

  // Dynamic calculations based on current shock amount
  const neededAmount = Math.max(0, shock.amount);
  
  // Track dynamic split
  const savingsTrack = Math.min(profile.emergencySavings, neededAmount);
  const subsidizedTrack = Math.max(0, fundingPlan.tracks[0].allocatedAmount - savingsTrack);
  const coOpTrack = fundingPlan.tracks[1].allocatedAmount;
  const deferredTrack = fundingPlan.tracks[2].allocatedAmount;

  // Dynamic fee calculation
  const vantiqTotalFee = fundingPlan.totalInterestAndFees;
  const vantiqFeePercent = neededAmount > 0 ? (vantiqTotalFee / neededAmount) * 100 : 0;
  const predatoryTotalFee = Math.round(neededAmount * 0.368); // 36.8% predatory fee + interest (₹18,400 for ₹50k)
  const totalSavings = Math.max(0, predatoryTotalFee - vantiqTotalFee);
  
  // Dynamic monthly safe repayment
  const safeMonthlyEmi = fundingPlan.tracks.reduce((total, track) => total + track.monthlyObligation, 0);
  const paymentWithinBuffer = safeMonthlyEmi <= profile.absorptiveSurplus;
  const predatoryMonthlyEmi = Math.round((neededAmount + predatoryTotalFee) / 3.5); // 3.5 mo average tenure

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="simulator" style={{ padding: '50px 0 70px 0', position: 'relative', backgroundColor: 'var(--bg-deep)' }}>
      <div className="container">
        <div id="hero" />
        
        {/* Keep the introduction above the two planner panels. */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '32px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Bold Value Proposition & Social Proof */}
          <div>
            
            {/* Massive Bold High-Impact Headline (Wise Typography) */}
            <h1 style={{
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: '22px',
              color: 'var(--wise-forest)'
            }}>
              BORROW FOR EMERGENCIES{' '}
              <span style={{ color: '#15803d', display: 'inline-block' }}>
                WITHOUT THE DEBT TRAP.
              </span>
            </h1>

            {/* Clear, Honest Subtitle */}
            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '32px',
              maxWidth: '560px'
            }}>
              When a ₹50,000 hospital shock strikes, 4 apps offer ₹75,000 instantly. But clustered auto-debits trigger insolvency in 45 days. 
              <strong style={{ color: 'var(--wise-forest)' }}> VANTIQ reveals your true absorptive capacity</strong> and synthesizes a safe multi-source rescue before you commit.
            </p>

            {/* Harvard / Princeton Micro-quote */}
            <div style={{
              maxWidth: '720px',
              paddingLeft: '16px',
              borderLeft: '3px solid #9fe870'
            }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '6px' }}>
                "Scarcity captures attention, but narrows focus—leading to decisions that solve today's crisis by engineering tomorrow's catastrophe."
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--wise-forest)', fontWeight: 700 }}>
                — Sendhil Mullainathan & Eldar Shafir (Scarcity: Why Having Too Little Means So Much)
              </div>
            </div>

          </div>

          {/* Two adjacent planner boxes: emergency plan and monthly cashflow. */}
          <div className="hero-planner-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '20px',
            alignItems: 'stretch',
            gridAutoRows: '1fr'
          }}>
            <div className="wise-converter-box hero-rescue-card" style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e9e2',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(22, 51, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03)',
              width: '100%',
              height: '100%',
              minWidth: 0,
              boxSizing: 'border-box'
            }}>

              <div className="planner-card-heading">
                <span className="planner-step-label">YOUR ESTIMATE</span>
                <h2>Your emergency plan</h2>
                <p>See one possible way to cover the bill and what the monthly payment could look like.</p>
              </div>
              
              {/* Top Rate & Buffer Guarantee Pill */}
              <div className="rescue-status-row" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '16px',
                borderBottom: '1px solid #edf0ea',
                marginBottom: '22px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#15803d', fontWeight: 800 }}>
                  <Lock size={15} />
                  <span>Estimated room for a new payment: ₹{profile.absorptiveSurplus.toLocaleString('en-IN')}/month</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <span>Illustrative estimate</span>
                  <Info size={14} color="#64748b" />
                </div>
              </div>

              {/* Box 1: "You need immediately" */}
              <div style={{ marginBottom: '8px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--wise-forest)'
                }}>
                  <label htmlFor={emergencyAmountId} style={{ cursor: 'pointer' }}>Emergency bill amount</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[30000, 50000, 80000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setPresetAmount(amt)}
                        style={{
                          background: neededAmount === amt ? 'var(--wise-forest)' : '#f4f5f1',
                          color: neededAmount === amt ? 'var(--wise-lime)' : 'var(--text-secondary)',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '3px 8px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        ₹{(amt / 1000)}k
                      </button>
                    ))}
                  </div>
                </div>

                <div className="wise-input-card" style={{
                  backgroundColor: '#f4f5f1',
                  border: '1.5px solid #d0d7cc'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-secondary)' }}>₹</span>
                    <input
                      id={emergencyAmountId}
                      type="text"
                      value={neededAmount.toLocaleString('en-IN')}
                      onChange={handleAmountChange}
                      aria-label="Emergency Shock Amount in INR"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--wise-forest)',
                        fontSize: '1.9rem',
                        fontWeight: 900,
                        width: '100%',
                        letterSpacing: '-0.03em'
                      }}
                    />
                  </div>

                  <div className="wise-currency-pill" aria-label="Currency INR, category Medical Emergency">
                    <span style={{ fontSize: '1.1rem' }}>🏥</span>
                    <span>INR · Medical</span>
                  </div>
                </div>

                {/* Repayment Period (For how many periods?) */}
                <div style={{ marginTop: '14px', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--wise-forest)' }}>
                      How long would you repay?
                    </label>
                    <span style={{ fontSize: '0.86rem', fontWeight: 900, color: '#15803d' }}>
                      {tenureMonths} {tenureMonths === 1 ? 'month' : 'months'}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                    {[6, 12, 24, 36, 60].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleTenureChange(t)}
                        style={{
                          padding: '7px 2px',
                          borderRadius: '8px',
                          border: tenureMonths === t ? '1.5px solid var(--wise-forest)' : '1px solid #d0d7cc',
                          backgroundColor: tenureMonths === t ? 'var(--wise-forest)' : '#ffffff',
                          color: tenureMonths === t ? 'var(--wise-lime)' : 'var(--text-secondary)',
                          fontWeight: tenureMonths === t ? 800 : 600,
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {t}M
                      </button>
                    ))}
                  </div>
                  <label htmlFor="custom-repayment-months" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 650 }}>
                    Custom period
                    <input
                      id="custom-repayment-months"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={60}
                      step={1}
                      value={tenureDraft}
                      onChange={(event) => {
                        const rawValue = event.target.value;
                        setTenureDraft(rawValue);
                        const months = Number(rawValue);
                        if (rawValue && Number.isInteger(months) && months >= 1 && months <= 60) {
                          setShock((prev) => ({ ...prev, tenureMonths: months }));
                        }
                      }}
                      onBlur={() => {
                        const months = Number(tenureDraft);
                        if (!Number.isInteger(months) || months < 1 || months > 60) {
                          setTenureDraft(String(tenureMonths));
                        }
                      }}
                      aria-label="Custom repayment period in months"
                      style={{ width: '92px', padding: '7px 9px', border: '1px solid #d0d7cc', borderRadius: '8px', color: 'var(--wise-forest)', fontWeight: 750 }}
                    />
                    months (1–60)
                  </label>
                </div>
              </div>

              {/* Vertical Stepper Connector Line (Wise's Signature Pattern) */}
              <div className="wise-stepper-line">
                
                {/* Node 1: Savings */}
                <div className="wise-stepper-node">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>From your available savings</span>
                    <strong style={{ color: '#15803d' }}>- ₹{savingsTrack.toLocaleString()} (0% APR)</strong>
                  </div>
                </div>

                {/* Node 2: Subsidized Advance */}
                <div className="wise-stepper-node">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Potential hospital / employer advance</span>
                    <strong style={{ color: '#15803d' }}>- ₹{subsidizedTrack.toLocaleString()} (0% APR)</strong>
                  </div>
                </div>

                {/* Node 3: Co-op Credit Union */}
                <div className="wise-stepper-node">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Estimated co-op loan</span>
                    <strong style={{ color: 'var(--wise-forest)' }}>- ₹{coOpTrack.toLocaleString()} (6.5% APR)</strong>
                  </div>
                </div>

                {/* Node 4: Deferred Micro-credit */}
                {deferredTrack > 0 && (
                  <div className="wise-stepper-node">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Estimated deferred loan</span>
                      <strong style={{ color: 'var(--wise-forest)' }}>- ₹{deferredTrack.toLocaleString()} (8.0% APR)</strong>
                    </div>
                  </div>
                )}

                {/* Node 5: Transparent Total Fee */}
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#edf4ea',
                  border: '1px solid #d4e3cf',
                  marginTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#15803d', fontWeight: 600 }}>
                    <Info size={15} />
                    <span>Estimated interest for this plan:</span>
                  </div>
                  <strong style={{ fontSize: '0.94rem', color: '#15803d', fontWeight: 900 }}>
                    ₹{vantiqTotalFee.toLocaleString()} ({vantiqFeePercent.toFixed(1)}%)
                  </strong>
                </div>

              </div>

              {/* Box 2: "Safe monthly repayment" */}
              <div style={{ marginBottom: '22px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--wise-forest)'
                }}>
                      <span>Estimated monthly repayments</span>
                  <span style={{ color: paymentWithinBuffer ? '#15803d' : '#b91c1c', fontSize: '0.8rem' }}>
                    {paymentWithinBuffer ? 'Fits' : 'Exceeds'} your ₹{profile.absorptiveSurplus.toLocaleString('en-IN')}/mo capacity
                  </span>
                </div>

                <div className="wise-input-card" style={{
                  backgroundColor: '#f4f5f1',
                  border: '1.5px solid #d0d7cc'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#15803d' }}>₹</span>
                    <span style={{ fontSize: '1.9rem', fontWeight: 900, color: '#15803d', letterSpacing: '-0.03em' }}>
                      {safeMonthlyEmi.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>/ month</span>
                  </div>

                  <div className="wise-currency-pill" style={{ backgroundColor: paymentWithinBuffer ? '#dcfce7' : '#fef2f2', color: paymentWithinBuffer ? '#15803d' : '#b91c1c', border: `1px solid ${paymentWithinBuffer ? '#bbf7d0' : '#fecaca'}` }}>
                    <span>{paymentWithinBuffer ? 'WITHIN BUDGET' : 'OVER BUDGET'}</span>
                  </div>
                </div>
              </div>

              {/* Cost Savings vs. Predatory Apps Callout */}
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '14px',
                padding: '14px 18px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.84rem' }}>
                  <span style={{ color: '#991b1b' }}>Illustrative high-cost loan comparison:</span>
                  <strong style={{ color: '#dc2626' }}>~₹{predatoryMonthlyEmi.toLocaleString('en-IN')}/month</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span style={{ color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingDown size={15} />
                    <span>Estimated cost difference:</span>
                  </span>
                  <strong style={{ color: '#15803d', fontSize: '1rem', fontWeight: 900 }}>
                    ₹{totalSavings.toLocaleString('en-IN')} on ₹{neededAmount.toLocaleString('en-IN')} borrowed
                  </strong>
                </div>
              </div>
              <p style={{ margin: '-12px 0 20px', color: 'var(--text-muted)', fontSize: '0.72rem', lineHeight: 1.5 }}>
                Example only: the comparison assumes 36.8% added cost over 3.5 months. Actual lender rates and fees vary; this is not a loan quote.
              </p>

              {/* Big Wise-Style Action Button */}
              <button
                onClick={() => scrollToSection('health-navigator')}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.08rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(159, 232, 112, 0.5)'
                }}
              >
                <Sparkles size={18} />
                <span>Explore health relief options →</span>
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Review available assistance resources before choosing any loan.
              </div>

            </div>

            <div className="wise-converter-box hero-cashflow-card" style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e9e2',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(22, 51, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03)',
              width: '100%',
              height: '100%',
              minWidth: 0,
              boxSizing: 'border-box'
            }}>
              <EmergencyIntake />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
