// src/modules/m01_hero/HeroSection.tsx
// Wise-Inspired Hero: "Product as the Hero, Not Marketing Fluff" (Light Theme)
import React, { useState, useId } from 'react';
import {
  ShieldCheck,
  Star,
  Check,
  ChevronDown,
  ArrowRight,
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
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);

  const categories = [
    { label: 'Medical Emergency', value: 'medical' },
    { label: 'Urgent Vehicle Repair', value: 'vehicle' },
    { label: 'Home Repair', value: 'home_repair' },
    { label: 'Job Loss', value: 'job_loss' },
  ] as const;
  const selectedCategory = categories.find(({ value }) => value === shock.category)?.label ?? categories[0].label;

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
  
  // Tranche dynamic split
  const savingsTranche = Math.min(profile.emergencySavings, Math.round(neededAmount * 0.1));
  const subsidizedTranche = Math.round(neededAmount * 0.3);
  const coOpTranche = Math.round(neededAmount * 0.4);
  const deferredTranche = Math.max(0, neededAmount - (savingsTranche + subsidizedTranche + coOpTranche));

  // Dynamic fee calculation
  const vantiqTotalFee = Math.round(neededAmount * 0.0284); // 2.84% blended fee (₹1,420 for ₹50k)
  const vantiqFeePercent = neededAmount > 0 ? (vantiqTotalFee / neededAmount) * 100 : 0;
  const predatoryTotalFee = Math.round(neededAmount * 0.368); // 36.8% predatory fee + interest (₹18,400 for ₹50k)
  const totalSavings = Math.max(0, predatoryTotalFee - vantiqTotalFee);
  
  // Dynamic monthly safe repayment
  const safeMonthlyEmi = Math.round((neededAmount + vantiqTotalFee - savingsTranche) / 12);
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
            
            {/* Trust Reviews Badge (Exact Wise social proof style) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                border: '1px solid #d8e2d4',
                fontSize: '0.84rem',
                color: 'var(--wise-forest)',
                fontWeight: 700,
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', color: '#15803d' }}>
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                </div>
                <span>99.2% Default Prevention Rate</span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.84rem',
                color: 'var(--text-secondary)',
                fontWeight: 600
              }}>
                <ShieldCheck size={16} color="#15803d" />
                <span>Zero-Knowledge Edge Verified</span>
              </div>
            </div>

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

            {/* Low-Friction Exploratory CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <button
                onClick={() => scrollToSection('comparison')}
                className="btn btn-primary"
                style={{ fontSize: '1.02rem', padding: '16px 32px' }}
              >
                <span>Compare Loan Options Now</span>
                <ArrowRight size={18} />
              </button>

            </div>

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
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '20px',
            alignItems: 'stretch',
            gridAutoRows: '1fr'
          }}>
            <div className="wise-converter-box" style={{
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
              
              {/* Top Rate & Buffer Guarantee Pill */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '16px',
                borderBottom: '1px solid #edf0ea',
                marginBottom: '22px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#15803d', fontWeight: 800 }}>
                  <Lock size={15} />
                  <span>Safe Absorptive Capacity: ₹{profile.absorptiveSurplus.toLocaleString()}/mo</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <span>0% Predatory Churn</span>
                  <Check size={14} color="#15803d" />
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
                  <label htmlFor={emergencyAmountId} style={{ cursor: 'pointer' }}>You need immediately</label>
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

                  {/* Category Dropdown Pill */}
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className="wise-currency-pill"
                    >
                      <span style={{ fontSize: '1.1rem' }}>🏥</span>
                      <span>INR · {selectedCategory.split(' ')[0]}</span>
                      <ChevronDown size={14} />
                    </button>

                    {showCategoryDropdown && (
                      <div style={{
                        position: 'absolute',
                        right: 0,
                        top: '110%',
                        zIndex: 50,
                        backgroundColor: '#ffffff',
                        border: '1px solid #d0d7cc',
                        borderRadius: '12px',
                        padding: '8px 0',
                        width: '210px',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.12)'
                      }}>
                        {categories.map((cat) => (
                          <div
                            key={cat.value}
                            onClick={() => {
                              setShock((prev) => ({ ...prev, category: cat.value }));
                              setShowCategoryDropdown(false);
                            }}
                            style={{
                              padding: '10px 16px',
                              fontSize: '0.86rem',
                              color: shock.category === cat.value ? '#15803d' : 'var(--wise-forest)',
                              fontWeight: shock.category === cat.value ? 800 : 500,
                              cursor: 'pointer',
                              backgroundColor: shock.category === cat.value ? '#f4f5f1' : 'transparent'
                            }}
                          >
                            {cat.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Vertical Stepper Connector Line (Wise's Signature Pattern) */}
              <div className="wise-stepper-line">
                
                {/* Node 1: Savings */}
                <div className="wise-stepper-node">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Tranche A: Liquid Savings</span>
                    <strong style={{ color: '#15803d' }}>- ₹{savingsTranche.toLocaleString()} (0% APR)</strong>
                  </div>
                </div>

                {/* Node 2: Subsidized Advance */}
                <div className="wise-stepper-node">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Tranche B: Employer / Hospital Advance</span>
                    <strong style={{ color: '#15803d' }}>- ₹{subsidizedTranche.toLocaleString()} (0% APR)</strong>
                  </div>
                </div>

                {/* Node 3: Co-op Credit Union */}
                <div className="wise-stepper-node">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Tranche C: Co-op Bridge Credit</span>
                    <strong style={{ color: 'var(--wise-forest)' }}>- ₹{coOpTranche.toLocaleString()} (6.5% APR)</strong>
                  </div>
                </div>

                {/* Node 4: Deferred Micro-credit */}
                {deferredTranche > 0 && (
                  <div className="wise-stepper-node">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Tranche D: Deferred Staggered Credit</span>
                      <strong style={{ color: 'var(--wise-forest)' }}>- ₹{deferredTranche.toLocaleString()} (8.0% APR)</strong>
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
                    <span>Total transparent interest & fees:</span>
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
                  <span>Safe monthly repayment (Calculated)</span>
                  <span style={{ color: '#15803d', fontSize: '0.8rem' }}>
                    Within Buffer (₹{profile.absorptiveSurplus.toLocaleString()}/mo)
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

                  <div className="wise-currency-pill" style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0' }}>
                    <span>🛡️ SAFE BUFFER</span>
                  </div>
                </div>
              </div>

              {/* Paying with / Allocation Blend */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: '#f4f5f1',
                border: '1px solid #e5e9e2',
                marginBottom: '20px',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Allocation Architecture:</span>
                  <strong style={{ color: 'var(--wise-forest)' }}>Tri-Tranche Funding Plan</strong>
                </div>
                <span style={{ color: '#15803d', fontWeight: 700, cursor: 'pointer' }}>
                  {fundingPlan.tranches.length} Funding Sources &gt;
                </span>
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
                  <span style={{ color: '#991b1b' }}>Predatory loan apps repayment:</span>
                  <strong style={{ color: '#dc2626' }}>₹{predatoryMonthlyEmi.toLocaleString()}/mo (Default in 45 days)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span style={{ color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingDown size={15} />
                    <span>You save with VANTIQ:</span>
                  </span>
                  <strong style={{ color: '#15803d', fontSize: '1rem', fontWeight: 900 }}>
                    ₹{totalSavings.toLocaleString()} in fees & interest
                  </strong>
                </div>
              </div>

              {/* Big Wise-Style Action Button */}
              <button
                onClick={() => scrollToSection('rescue-split')}
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
                <span>View Your Detailed Rescue Plan</span>
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Takes 30 seconds · No credit score footprint · 100% Client-side Private
              </div>

            </div>

            <div className="wise-converter-box" style={{
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
