// src/modules/m02_crisis_input/EmergencyIntake.tsx
// Module 3: Emergency Crisis Simulator - Authentic Wise Light UI
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
    <section id="simulator" style={{ padding: '70px 0', backgroundColor: 'var(--bg-deep)', borderTop: '1px solid #e5e9e2' }}>
      {/* Anchor alias */}
      <div id="crisis-intake" style={{ position: 'relative', top: '-80px', visibility: 'hidden' }} />
      <div className="container">
        
        {/* Section Header - Wise Style */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge badge-forest">
              <Sliders size={13} />
              <span>Step 1: Cashflow Baseline & Shock Parameters</span>
            </span>
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Transparent Emergency Cashflow Calculator
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '780px' }}>
            Adjust your numbers below. VANTIQ dynamically isolates your true monthly uncommitted capacity from your existing expenses.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '28px' }}>
          
          {/* Card 1: Emergency Bill Requirement */}
          <div className="chronos-card" style={{ border: '1px solid #fecaca', padding: '32px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: '#fee2e2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#dc2626'
                }}>
                  <ShieldAlert size={22} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                  Emergency Requirement
                </h3>
              </div>
              <span className="badge badge-red">Shock Event</span>
            </div>

            {/* Shock Amount Field */}
            <div style={{ marginBottom: '22px' }}>
              <label htmlFor={shockInputId} style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '8px' }}>
                Emergency Bill Amount (₹)
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }}>
                  <IndianRupee size={20} />
                </span>
                <input
                  id={shockInputId}
                  type="number"
                  value={shock.amount}
                  onChange={(e) => handleShockAmount(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '14px 18px 14px 44px',
                    borderRadius: '14px',
                    border: '1.5px solid #d0d7cc',
                    backgroundColor: '#f4f5f1',
                    color: 'var(--wise-forest)',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    outline: 'none',
                    letterSpacing: '-0.02em',
                  }}
                />
              </div>
            </div>

            {/* Category & Available Liquid Savings */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '8px' }}>
                  Category
                </label>
                <select
                  value={shock.category}
                  onChange={(e) => setShock((prev) => ({ ...prev, category: e.target.value as 'medical' | 'vehicle' | 'home_repair' | 'job_loss' }))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    backgroundColor: '#f4f5f1',
                    color: 'var(--wise-forest)',
                    border: '1.5px solid #d0d7cc',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                >
                  <option value="medical">🏥 Hospital Emergency</option>
                  <option value="vehicle">🚗 Critical Vehicle Repair</option>
                  <option value="home_repair">🏠 Home Disaster Fix</option>
                  <option value="job_loss">💼 Layoff Buffer</option>
                </select>
              </div>

              <div>
                <label htmlFor={savingsInputId} style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '8px' }}>
                  Liquid Savings (₹)
                </label>
                <input
                  id={savingsInputId}
                  type="number"
                  value={profile.emergencySavings}
                  onChange={(e) => handleProfileChange('emergencySavings', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #d0d7cc',
                    backgroundColor: '#f4f5f1',
                    color: '#15803d',
                    fontWeight: 800,
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* If Category is Medical: Specific Health Problem Picker */}
            {shock.category === 'medical' && (
              <div style={{ marginBottom: '20px', padding: '14px', backgroundColor: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Choose Specific Health Problem:
                  </label>
                  <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 600 }}>
                    Auto-fills typical cost
                  </span>
                </div>
                <select
                  value={shock.description}
                  onChange={(e) => {
                    const desc = e.target.value;
                    const costMap: Record<string, number> = {
                      'Cardiac Care & Bypass / Valve Surgery': 450000,
                      'Oncology / Cancer Chemotherapy & Radiation': 650000,
                      'Kidney Dialysis & Renal Transplant': 800000,
                      'Orthopedic & Total Joint Replacement': 280000,
                      'Emergency Trauma & ICU Life Support': 320000,
                      'Neurological Surgery & Brain Tumor': 550000,
                      'Pediatric & Neonatal ICU (NICU) Care': 250000,
                      'General & Laparoscopic Surgeries': 120000,
                    };
                    const autoCost = costMap[desc] || shock.amount;
                    setShock((prev) => ({
                      ...prev,
                      description: desc,
                      amount: autoCost,
                    }));
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #86efac',
                    backgroundColor: '#ffffff',
                    color: 'var(--wise-forest)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    outline: 'none',
                    marginBottom: '10px',
                  }}
                >
                  <option value="Cardiac Care & Bypass / Valve Surgery">🫀 Cardiac Care & Bypass Surgery (~₹4.5L)</option>
                  <option value="Oncology / Cancer Chemotherapy & Radiation">🎗️ Oncology & Chemotherapy (~₹6.5L)</option>
                  <option value="Kidney Dialysis & Renal Transplant">🧬 Kidney Dialysis & Renal Transplant (~₹8.0L)</option>
                  <option value="Orthopedic & Total Joint Replacement">🦴 Orthopedic Joint Replacement (~₹2.8L)</option>
                  <option value="Emergency Trauma & ICU Life Support">🚑 Emergency Trauma & ICU Care (~₹3.2L)</option>
                  <option value="Neurological Surgery & Brain Tumor">🧠 Neurological Surgery / Brain Tumor (~₹5.5L)</option>
                  <option value="Pediatric & Neonatal ICU (NICU) Care">👶 Pediatric & Neonatal ICU (~₹2.5L)</option>
                  <option value="General & Laparoscopic Surgeries">🏥 General & Laparoscopic Surgeries (~₹1.2L)</option>
                  <option value="Urgent Hospital Surgery & Medication Deposit">Custom Hospital Procedure</option>
                </select>

                <button
                  onClick={() => {
                    const el = document.getElementById('health-navigator') || document.getElementById('health-aid');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '9px 14px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--wise-forest)',
                    color: 'var(--wise-lime)',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>Find Suggested Plans & Loans for this Condition</span>
                  <Sparkles size={14} />
                </button>
              </div>
            )}

            {/* Unfunded Deficit Pill */}
            <div style={{
              padding: '16px 20px',
              borderRadius: '14px',
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.88rem', color: '#991b1b', fontWeight: 600 }}>
                Unfunded Medical Gap:
              </span>
              <strong style={{ fontSize: '1.2rem', color: '#dc2626', fontWeight: 900 }}>
                ₹{Math.max(0, shock.amount - profile.emergencySavings).toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Card 2: Salaried Monthly Household Cashflow */}
          <div className="chronos-card" style={{ border: '1px solid #d0d7cc', padding: '32px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: '#edf4ea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--wise-forest)'
                }}>
                  <Wallet size={22} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                  Monthly Cashflow & Living Costs
                </h3>
              </div>
              <span className="badge badge-forest">Salary Baseline</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '22px' }}>
              <div>
                <label htmlFor={salaryInputId} style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '8px' }}>
                  Monthly Net Salary (₹)
                </label>
                <input
                  id={salaryInputId}
                  type="number"
                  value={profile.monthlyIncome}
                  onChange={(e) => handleProfileChange('monthlyIncome', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #d0d7cc',
                    backgroundColor: '#f4f5f1',
                    color: 'var(--wise-forest)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label htmlFor={emiInputId} style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '8px' }}>
                  Existing EMI (₹)
                </label>
                <input
                  id={emiInputId}
                  type="number"
                  value={profile.existingEmi}
                  onChange={(e) => handleProfileChange('existingEmi', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #d0d7cc',
                    backgroundColor: '#f4f5f1',
                    color: '#dc2626',
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label htmlFor={rentInputId} style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '8px' }}>
                  House Rent (₹)
                </label>
                <input
                  id={rentInputId}
                  type="number"
                  value={profile.houseRent}
                  onChange={(e) => handleProfileChange('houseRent', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #d0d7cc',
                    backgroundColor: '#f4f5f1',
                    color: '#dc2626',
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label htmlFor={foodInputId} style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '8px' }}>
                  Living & Food (₹)
                </label>
                <input
                  id={foodInputId}
                  type="number"
                  value={profile.livingExpenses}
                  onChange={(e) => handleProfileChange('livingExpenses', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #d0d7cc',
                    backgroundColor: '#f4f5f1',
                    color: '#dc2626',
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* True Absorptive Repayment Surplus Indicator */}
            <div style={{
              padding: '16px 20px',
              borderRadius: '14px',
              backgroundColor: '#edf4ea',
              border: '1.5px solid #bbf7d0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#15803d', textTransform: 'uppercase', fontWeight: 800 }}>
                  Real Absorptive Capacity (Net Free Surplus)
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#15803d' }}>
                  ₹{netSurplus.toLocaleString()} / month
                </div>
              </div>
              <span className="badge badge-emerald">
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
