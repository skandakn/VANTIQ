// Monthly cashflow inputs shown in their own hero planner card.
import React, { useId } from 'react';
import { Sparkles } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const EmergencyIntake: React.FC = () => {
  const { profile, setProfile, shock } = useFintech();
  const savingsInputId = useId();
  const salaryInputId = useId();
  const emiInputId = useId();
  const rentInputId = useId();
  const foodInputId = useId();

  const netSurplus = profile.monthlyIncome - (profile.existingEmi + profile.houseRent + profile.livingExpenses);
  const unfundedGap = Math.max(0, shock.amount - profile.emergencySavings);

  const handleProfileChange = (field: keyof typeof profile, rawValue: string) => {
    const value = Number.parseInt(rawValue, 10);
    setProfile((previous) => ({
      ...previous,
      [field]: Number.isFinite(value) ? Math.max(0, value) : 0,
    }));
  };

  const fields = [
    { id: salaryInputId, label: 'Monthly net salary', field: 'monthlyIncome' as const, value: profile.monthlyIncome },
    { id: emiInputId, label: 'Existing EMI', field: 'existingEmi' as const, value: profile.existingEmi },
    { id: rentInputId, label: 'House rent', field: 'houseRent' as const, value: profile.houseRent },
    { id: foodInputId, label: 'Living & food', field: 'livingExpenses' as const, value: profile.livingExpenses },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--wise-forest)', marginBottom: '3px' }}>
            Your monthly cashflow
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Add your income and regular costs to estimate a safe repayment buffer.
          </p>
        </div>
        <div style={{ padding: '6px 10px', borderRadius: '9px', backgroundColor: '#fff1f2', color: '#7f1d1d', fontSize: '0.76rem', fontWeight: 700 }}>
          Bill gap after savings: ₹{unfundedGap.toLocaleString('en-IN')}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))', gap: '10px', marginBottom: '12px' }}>
        {fields.map(({ id, label, field, value }) => (
          <label key={field} htmlFor={id} style={{ display: 'block', minWidth: 0, color: '#34443a', fontSize: '0.76rem', fontWeight: 700 }}>
            {label} (₹)
            <input
              id={id}
              className="cashflow-field"
              type="number"
              min="0"
              step="100"
              value={value}
              onChange={(event) => handleProfileChange(field, event.target.value)}
              style={{ width: '100%', marginTop: '6px', padding: '10px 11px', borderRadius: '10px', border: '1.5px solid #7d8b7e', backgroundColor: '#ffffff', color: 'var(--wise-forest)', fontSize: '0.95rem', fontWeight: 750 }}
            />
          </label>
        ))}
        <label htmlFor={savingsInputId} style={{ display: 'block', minWidth: 0, color: '#34443a', fontSize: '0.76rem', fontWeight: 700 }}>
          Liquid savings (₹)
          <input
            id={savingsInputId}
            className="cashflow-field"
            type="number"
            min="0"
            step="100"
            value={profile.emergencySavings}
            onChange={(event) => handleProfileChange('emergencySavings', event.target.value)}
            style={{ width: '100%', marginTop: '6px', padding: '10px 11px', borderRadius: '10px', border: '1.5px solid #7d8b7e', backgroundColor: '#ffffff', color: '#166534', fontSize: '0.95rem', fontWeight: 750 }}
          />
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '12px 14px', borderRadius: '12px', backgroundColor: '#f0fdf4', border: '1px solid #86efac' }}>
        <div>
          <div style={{ color: '#166534', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800 }}>Estimated safe monthly capacity</div>
          <strong style={{ color: netSurplus >= 0 ? '#14532d' : '#b91c1c', fontSize: '1.2rem' }}>₹{netSurplus.toLocaleString('en-IN')} / month</strong>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 9px', borderRadius: '999px', backgroundColor: netSurplus >= 0 ? '#dcfce7' : '#fee2e2', color: netSurplus >= 0 ? '#166534' : '#991b1b', fontSize: '0.72rem', fontWeight: 800 }}>
          <Sparkles size={12} />
          {netSurplus >= 0 ? 'Capacity estimate' : 'Monthly shortfall'}
        </span>
      </div>

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <a
          href="#health-navigator"
          style={{
            fontSize: '0.78rem',
            color: '#15803d',
            fontWeight: 800,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>🏥 Match relief loans for this capacity with Reddit community reviews →</span>
        </a>
      </div>
    </div>
  );
};
