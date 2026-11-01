// src/modules/m01_hero/HeroSection.tsx
// Wise-Inspired Hero: "Product as the Hero, Not Marketing Fluff"
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

export const HeroSection: React.FC = () => {
  const { shock, setShock, profile, quantumResult } = useFintech();
  const emergencyAmountId = useId();

  // Local state for interactive currency/emergency converter
  const [selectedCategory, setSelectedCategory] = useState<string>('Medical Emergency');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);

  const categories = [
    'Medical Emergency',
    'Hospital ICU Deposit',
    'Emergency Surgery',
    'Prescription & Labs',
    'Urgent Vehicle Repair'
  ];

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
  const neededAmount = shock.amount || 50000;
  
  // Tranche dynamic split
  const savingsTranche = Math.min(profile.emergencySavings, Math.round(neededAmount * 0.1));
  const subsidizedTranche = Math.round(neededAmount * 0.3);
  const coOpTranche = Math.round(neededAmount * 0.4);
  const deferredTranche = Math.max(0, neededAmount - (savingsTranche + subsidizedTranche + coOpTranche));

  // Dynamic fee calculation
  const vantiqTotalFee = Math.round(neededAmount * 0.0284); // 2.84% blended fee (₹1,420 for ₹50k)
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
    <section id="hero" style={{ padding: '40px 0 60px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Main 2-Column Hero Layout - Just Like Wise */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Bold Value Proposition & Social Proof */}
          <div>
            
            {/* Trust Reviews Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(159, 232, 112, 0.12)',
                border: '1px solid rgba(159, 232, 112, 0.3)',
                fontSize: '0.82rem',
                color: 'var(--wise-lime)',
                fontWeight: 600
              }}>
                <div style={{ display: 'flex', color: 'var(--wise-lime)' }}>
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
                fontSize: '0.82rem',
                color: '#a3b8a6'
              }}>
                <ShieldCheck size={16} color="var(--wise-lime)" />
                <span>Zero-Knowledge Edge Verified</span>
              </div>
            </div>

            {/* Huge High-Impact Headline */}
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              color: '#ffffff'
            }}>
              BORROW FOR EMERGENCIES{' '}
              <span style={{ color: 'var(--wise-lime)', display: 'inline-block' }}>
                WITHOUT THE DEBT TRAP.
              </span>
            </h1>

            {/* Clear, Honest Subtitle */}
            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
              color: 'var(--wise-text-secondary)',
              lineHeight: 1.6,
              marginBottom: '28px',
              maxWidth: '560px'
            }}>
              When a ₹50,000 hospital shock strikes, 4 apps offer ₹75,000 instantly. But clustered auto-debits trigger insolvency in 45 days. 
              <strong> VANTIQ reveals your true absorptive capacity</strong> and synthesizes a safe multi-source rescue.
            </p>

            {/* Low-Friction Exploratory CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <button
                onClick={() => scrollToSection('comparison')}
                className="btn btn-primary"
                style={{ fontSize: '1rem', padding: '14px 28px' }}
              >
                <span>Compare Loan Options Now</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => scrollToSection('quantum-solver')}
                className="btn btn-secondary"
                style={{ fontSize: '1rem', padding: '14px 24px' }}
              >
                <span>See Quantum Knapsack</span>
              </button>
            </div>

            {/* Harvard / Princeton Micro-quote */}
            <div style={{
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              maxWidth: '540px'
            }}>
              <p style={{ fontSize: '0.85rem', color: '#c4d4c6', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '6px' }}>
                "Scarcity captures attention, but narrows focus—leading to decisions that solve today's crisis by engineering tomorrow's catastrophe."
              </p>
              <div style={{ fontSize: '0.75rem', color: 'var(--wise-lime)', fontWeight: 600 }}>
                — Sendhil Mullainathan & Eldar Shafir (Scarcity)
              </div>
            </div>

          </div>

          {/* Right Column: The Wise-Style Interactive Emergency Converter */}
          <div>
            <div className="wise-converter-box">
              
              {/* Top Rate & Buffer Guarantee Pill */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--wise-lime)', fontWeight: 700 }}>
                  <Lock size={14} />
                  <span>Safe Absorptive Capacity: ₹{profile.absorptiveSurplus.toLocaleString()}/mo</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#a3b8a6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>0% Predatory Churn</span>
                  <Check size={14} color="var(--wise-lime)" />
                </div>
              </div>

              {/* Box 1: "You need immediately" */}
              <div style={{ marginBottom: '8px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#a3b8a6'
                }}>
                  <label htmlFor={emergencyAmountId} style={{ cursor: 'pointer' }}>You need immediately</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[30000, 50000, 80000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setPresetAmount(amt)}
                        style={{
                          background: neededAmount === amt ? 'var(--wise-lime)' : 'rgba(255, 255, 255, 0.08)',
                          color: neededAmount === amt ? 'var(--wise-forest)' : '#cbd5e1',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '2px 8px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        ₹{(amt / 1000)}k
                      </button>
                    ))}
                  </div>
                </div>

                <div className="wise-input-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#a3b8a6' }}>₹</span>
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
                        color: '#ffffff',
                        fontSize: '1.8rem',
                        fontWeight: 900,
                        width: '100%',
                        letterSpacing: '-0.02em'
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
                        backgroundColor: '#101c12',
                        border: '1px solid rgba(159, 232, 112, 0.3)',
                        borderRadius: '12px',
                        padding: '8px 0',
                        width: '200px',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.8)'
                      }}>
                        {categories.map((cat) => (
                          <div
                            key={cat}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setShowCategoryDropdown(false);
                            }}
                            style={{
                              padding: '8px 16px',
                              fontSize: '0.85rem',
                              color: selectedCategory === cat ? 'var(--wise-lime)' : '#ffffff',
                              cursor: 'pointer',
                              backgroundColor: selectedCategory === cat ? 'rgba(159, 232, 112, 0.1)' : 'transparent'
                            }}
                          >
                            {cat}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: '#a3b8a6' }}>Tranche A: Liquid Savings</span>
                    <strong style={{ color: 'var(--wise-lime)' }}>- ₹{savingsTranche.toLocaleString()} (0% APR)</strong>
                  </div>
                </div>

                {/* Node 2: Subsidized Advance */}
                <div className="wise-stepper-node">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: '#a3b8a6' }}>Tranche B: Employer / Hospital Advance</span>
                    <strong style={{ color: 'var(--wise-lime)' }}>- ₹{subsidizedTranche.toLocaleString()} (0% APR)</strong>
                  </div>
                </div>

                {/* Node 3: Co-op Credit Union */}
                <div className="wise-stepper-node">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: '#a3b8a6' }}>Tranche C: Co-op Bridge Credit</span>
                    <strong style={{ color: '#ffffff' }}>- ₹{coOpTranche.toLocaleString()} (6.5% APR)</strong>
                  </div>
                </div>

                {/* Node 4: Deferred Micro-credit */}
                {deferredTranche > 0 && (
                  <div className="wise-stepper-node">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span style={{ color: '#a3b8a6' }}>Tranche D: Deferred Staggered Credit</span>
                      <strong style={{ color: '#ffffff' }}>- ₹{deferredTranche.toLocaleString()} (8.0% APR)</strong>
                    </div>
                  </div>
                )}

                {/* Node 5: Transparent Total Fee */}
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(159, 232, 112, 0.08)',
                  border: '1px solid rgba(159, 232, 112, 0.2)',
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--wise-lime)' }}>
                    <Info size={14} />
                    <span>Total transparent interest & fees:</span>
                  </div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--wise-lime)' }}>
                    ₹{vantiqTotalFee.toLocaleString()} ({((vantiqTotalFee / neededAmount) * 100).toFixed(1)}%)
                  </strong>
                </div>

              </div>

              {/* Box 2: "Safe monthly repayment" */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#a3b8a6'
                }}>
                  <span>Safe monthly repayment (Calculated)</span>
                  <span style={{ color: 'var(--wise-lime)', fontSize: '0.78rem' }}>
                    Within Surplus Buffer (₹{profile.absorptiveSurplus.toLocaleString()}/mo)
                  </span>
                </div>

                <div className="wise-input-card" style={{ borderColor: 'rgba(159, 232, 112, 0.4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--wise-lime)' }}>₹</span>
                    <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--wise-lime)', letterSpacing: '-0.02em' }}>
                      {safeMonthlyEmi.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#a3b8a6', marginLeft: '4px' }}>/ month</span>
                  </div>

                  <div className="wise-currency-pill" style={{ backgroundColor: 'rgba(159, 232, 112, 0.2)', color: 'var(--wise-lime)' }}>
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
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                marginBottom: '20px',
                fontSize: '0.82rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Allocation Architecture:</span>
                  <strong style={{ color: '#ffffff' }}>Tri-Tranche Quantum Blend</strong>
                </div>
                <span style={{ color: 'var(--wise-lime)', fontWeight: 600, cursor: 'pointer' }}>
                  {quantumResult.tranches.length} Sources Optimal &gt;
                </span>
              </div>

              {/* Cost Savings vs. Predatory Apps Callout */}
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '12px',
                padding: '12px 16px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.82rem' }}>
                  <span style={{ color: '#fca5a5' }}>Predatory loan apps repayment:</span>
                  <strong style={{ color: '#f87171' }}>₹{predatoryMonthlyEmi.toLocaleString()}/mo (Default in 45 days)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--wise-lime)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingDown size={14} />
                    <span>You save with VANTIQ:</span>
                  </span>
                  <strong style={{ color: 'var(--wise-lime)', fontSize: '0.95rem' }}>
                    ₹{totalSavings.toLocaleString()} in fees & interest
                  </strong>
                </div>
              </div>

              {/* Big Wise-Style Action Button */}
              <button
                onClick={() => scrollToSection('simulator')}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Sparkles size={18} />
                <span>Simulate Your Free Rescue Plan</span>
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.74rem', color: '#6b846e' }}>
                Takes 30 seconds · No credit score inquiry · 100% Client-side Private
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
