// src/modules/m02_crisis_input/EmergencyIntake.tsx
// Module 3: Emergency Crisis Simulator
import React from 'react';
import { AlertTriangle, IndianRupee, Wallet, ShieldAlert } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const EmergencyIntake: React.FC = () => {
  const { profile, setProfile, shock, setShock } = useFintech();

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

  return (
    <section id="crisis-intake" style={{ padding: '40px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-red">
              <AlertTriangle size={13} />
              <span>Emergency Shock Input</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            Configure The Crisis Parameters
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Simulate an urgent financial liquidity shock against actual monthly household cashflow.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* Card 1: Emergency Shock Amount */}
          <div className="chronos-card glow-cyan" style={{ borderTop: '3px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <ShieldAlert size={20} color="#ef4444" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                Emergency Bill Requirement
              </h3>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
                Urgent Amount Required (₹)
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '12px', color: '#94a3b8' }}>
                  <IndianRupee size={16} />
                </span>
                <input
                  type="number"
                  value={shock.amount}
                  onChange={(e) => handleShockAmount(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '8px',
                    border: '1px solid rgba(51, 65, 85, 0.6)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#f8fafc',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Category</label>
                <select
                  value={shock.category}
                  onChange={(e) => setShock((prev) => ({ ...prev, category: e.target.value as any }))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#cbd5e1',
                    border: '1px solid rgba(51, 65, 85, 0.5)'
                  }}
                >
                  <option value="medical">Hospital Emergency</option>
                  <option value="vehicle">Critical Vehicle Repair</option>
                  <option value="home_repair">Home Disaster Fix</option>
                  <option value="job_loss">Layoff Buffer</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Available Savings (₹)</label>
                <input
                  type="number"
                  value={profile.emergencySavings}
                  onChange={(e) => handleProfileChange('emergencySavings', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#cbd5e1'
                  }}
                />
              </div>
            </div>

            <div style={{
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <AlertTriangle size={18} color="#f87171" />
              <span style={{ fontSize: '0.8rem', color: '#fca5a5' }}>
                Unfunded Deficit: <strong>₹{(shock.amount - profile.emergencySavings).toLocaleString()}</strong> needed immediately!
              </span>
            </div>
          </div>

          {/* Card 2: Salaried Monthly Household Cashflow */}
          <div className="chronos-card glow-emerald" style={{ borderTop: '3px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Wallet size={20} color="#10b981" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                Monthly Household Cashflow
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Monthly Salary (₹)</label>
                <input
                  type="number"
                  value={profile.monthlyIncome}
                  onChange={(e) => handleProfileChange('monthlyIncome', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#34d399',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Existing EMI (₹)</label>
                <input
                  type="number"
                  value={profile.existingEmi}
                  onChange={(e) => handleProfileChange('existingEmi', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#f87171'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>House Rent (₹)</label>
                <input
                  type="number"
                  value={profile.houseRent}
                  onChange={(e) => handleProfileChange('houseRent', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#f87171'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Living & Food (₹)</label>
                <input
                  type="number"
                  value={profile.livingExpenses}
                  onChange={(e) => handleProfileChange('livingExpenses', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    color: '#f87171'
                  }}
                />
              </div>
            </div>

            {/* Dynamic Result Indicator */}
            <div style={{
              padding: '14px',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6ee7b7', textTransform: 'uppercase', fontWeight: 700 }}>
                  True Absorptive Repayment Surplus
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>
                  ₹{profile.absorptiveSurplus.toLocaleString()} / month
                </div>
              </div>
              <span className="badge badge-emerald">Safe Capacity</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
