// src/modules/m02_crisis_input/EmergencyIntake.tsx
// Module 3: Emergency Crisis Simulator - Wise-Inspired Clean Form
import React, { useId } from 'react';
import { IndianRupee, Wallet, ShieldAlert, Sparkles, Sliders } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const EmergencyIntake: React.FC = () => {
  const { profile, setProfile, shock, setShock } = useFintech();
  const shockInputId = useId();
  const savingsInputId = useId();
  const salaryInputId = useId();
  const emiInputId = useId();
  const rentInputId = useId();
  const foodInputId = useId();

  const handleProfileChange = (field: keyof typeof profile, val: number) => {
    setProfile((prev) => ({
      ...prev,
      [field]: isNaN(val) ? 0 : val,
    }));
  };

  const handleShockAmount = (val: number) => {
    setShock((prev) => ({
      ...prev,
      amount: isNaN(val) ? 0 : val,
    }));
  };

  const netSurplus = profile.monthlyIncome - (profile.existingEmi + profile.houseRent + profile.livingExpenses);

  return (
    <section id="simulator" style={{ padding: '60px 0', borderTop: '1px solid rgba(159, 232, 112, 0.12)' }}>
      {/* Anchor alias */}
      <div id="crisis-intake" style={{ position: 'relative', top: '-80px', visibility: 'hidden' }} />
      <div className="container">
        
        {/* Section Header - Wise Style */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-lime">
              <Sliders size={13} />
              <span>Step 1: Cashflow Baseline & Shock Parameters</span>
            </span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Transparent Emergency Cashflow Calculator
          </h2>
          <p style={{ color: 'var(--wise-text-secondary)', fontSize: '1rem', maxWidth: '780px' }}>
            Adjust your numbers below. VANTIQ dynamically isolates your true monthly uncommitted capacity from your existing expenses.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          
          {/* Card 1: Emergency Bill Requirement */}
          <div className="chronos-card" style={{ border: '1px solid rgba(248, 113, 113, 0.3)', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(248, 113, 113, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f87171'
                }}>
                  <ShieldAlert size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                  Emergency Requirement
                </h3>
              </div>
              <span className="badge badge-red">Shock Event</span>
            </div>

            {/* Shock Amount Field */}
            <div style={{ marginBottom: '18px' }}>
              <label htmlFor={shockInputId} style={{ display: 'block', fontSize: '0.82rem', color: '#a3b8a6', fontWeight: 600, marginBottom: '6px' }}>
                Emergency Bill Amount (₹)
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '14px', color: '#a3b8a6' }}>
                  <IndianRupee size={18} />
                </span>
                <input
                  id={shockInputId}
                  type="number"
                  value={shock.amount}
                  onChange={(e) => handleShockAmount(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 42px',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: 'var(--wise-input-bg)',
                    color: '#ffffff',
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    outline: 'none',
                    letterSpacing: '-0.02em',
                  }}
                />
              </div>
            </div>

            {/* Category & Available Liquid Savings */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a3b8a6', fontWeight: 600, marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  value={shock.category}
                  onChange={(e) => setShock((prev) => ({ ...prev, category: e.target.value as 'medical' | 'vehicle' | 'home_repair' | 'job_loss' }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--wise-input-bg)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                >
                  <option value="medical">Hospital Emergency</option>
                  <option value="vehicle">Critical Vehicle Repair</option>
                  <option value="home_repair">Home Disaster Fix</option>
                  <option value="job_loss">Layoff Buffer</option>
                </select>
              </div>

              <div>
                <label htmlFor={savingsInputId} style={{ display: 'block', fontSize: '0.8rem', color: '#a3b8a6', fontWeight: 600, marginBottom: '6px' }}>
                  Liquid Savings (₹)
                </label>
                <input
                  id={savingsInputId}
                  type="number"
                  value={profile.emergencySavings}
                  onChange={(e) => handleProfileChange('emergencySavings', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: 'var(--wise-input-bg)',
                    color: 'var(--wise-lime)',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Unfunded Deficit Pill */}
            <div style={{
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.84rem', color: '#fca5a5' }}>
                Unfunded Medical Gap:
              </span>
              <strong style={{ fontSize: '1.1rem', color: '#f87171', fontWeight: 900 }}>
                ₹{Math.max(0, shock.amount - profile.emergencySavings).toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Card 2: Salaried Monthly Household Cashflow */}
          <div className="chronos-card" style={{ border: '1px solid rgba(159, 232, 112, 0.3)', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(159, 232, 112, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--wise-lime)'
                }}>
                  <Wallet size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                  Monthly Cashflow & Living Costs
                </h3>
              </div>
              <span className="badge badge-lime">Salary Baseline</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
              <div>
                <label htmlFor={salaryInputId} style={{ display: 'block', fontSize: '0.8rem', color: '#a3b8a6', fontWeight: 600, marginBottom: '6px' }}>
                  Monthly Net Salary (₹)
                </label>
                <input
                  id={salaryInputId}
                  type="number"
                  value={profile.monthlyIncome}
                  onChange={(e) => handleProfileChange('monthlyIncome', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: 'var(--wise-input-bg)',
                    color: 'var(--wise-lime)',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label htmlFor={emiInputId} style={{ display: 'block', fontSize: '0.8rem', color: '#a3b8a6', fontWeight: 600, marginBottom: '6px' }}>
                  Existing EMI (₹)
                </label>
                <input
                  id={emiInputId}
                  type="number"
                  value={profile.existingEmi}
                  onChange={(e) => handleProfileChange('existingEmi', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: 'var(--wise-input-bg)',
                    color: '#f87171',
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label htmlFor={rentInputId} style={{ display: 'block', fontSize: '0.8rem', color: '#a3b8a6', fontWeight: 600, marginBottom: '6px' }}>
                  House Rent (₹)
                </label>
                <input
                  id={rentInputId}
                  type="number"
                  value={profile.houseRent}
                  onChange={(e) => handleProfileChange('houseRent', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: 'var(--wise-input-bg)',
                    color: '#f87171',
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label htmlFor={foodInputId} style={{ display: 'block', fontSize: '0.8rem', color: '#a3b8a6', fontWeight: 600, marginBottom: '6px' }}>
                  Living & Food (₹)
                </label>
                <input
                  id={foodInputId}
                  type="number"
                  value={profile.livingExpenses}
                  onChange={(e) => handleProfileChange('livingExpenses', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: 'var(--wise-input-bg)',
                    color: '#f87171',
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* True Absorptive Repayment Surplus Indicator */}
            <div style={{
              padding: '14px 18px',
              borderRadius: '14px',
              backgroundColor: 'rgba(159, 232, 112, 0.12)',
              border: '1.5px solid rgba(159, 232, 112, 0.35)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--wise-lime)', textTransform: 'uppercase', fontWeight: 800 }}>
                  Real Absorptive Capacity (Net Free Surplus)
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--wise-lime)' }}>
                  ₹{netSurplus.toLocaleString()} / month
                </div>
              </div>
              <span className="badge badge-lime">
                <Sparkles size={12} />
                <span>Buffer Safe</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
