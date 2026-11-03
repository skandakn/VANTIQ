// Monthly cashflow inputs shown in their own hero planner card.
import React, { useId } from 'react';
import { Sparkles, WalletCards } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const EmergencyIntake: React.FC = () => {
  const { profile, setProfile, shock } = useFintech();
  const savingsInputId = useId();
  const salaryInputId = useId();
  const emiInputId = useId();
  const rentInputId = useId();
  const foodInputId = useId();

  const netSurplus = profile.monthlyIncome - (profile.existingEmi + profile.houseRent + profile.livingExpenses);
  const monthlyCommitments = profile.existingEmi + profile.houseRent + profile.livingExpenses;
  const committedShare = profile.monthlyIncome > 0
    ? Math.min(100, Math.max(0, (monthlyCommitments / profile.monthlyIncome) * 100))
    : 0;
  const unfundedGap = Math.max(0, shock.amount - profile.emergencySavings);

  const handleProfileChange = (field: keyof typeof profile, rawValue: string) => {
    const value = Number.parseInt(rawValue, 10);
    setProfile((previous) => ({
      ...previous,
      [field]: Number.isFinite(value) ? Math.max(0, value) : 0,
    }));
  };

  const fields = [
    { id: salaryInputId, label: 'Take-home pay', field: 'monthlyIncome' as const, value: profile.monthlyIncome },
    { id: emiInputId, label: 'Existing EMI', field: 'existingEmi' as const, value: profile.existingEmi },
    { id: rentInputId, label: 'Rent', field: 'houseRent' as const, value: profile.houseRent },
    { id: foodInputId, label: 'Other living costs', field: 'livingExpenses' as const, value: profile.livingExpenses },
  ];

  return (
    <div className="cashflow-intake">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <span className="cashflow-heading-icon"><WalletCards size={17} /></span>
            <span className="cashflow-eyebrow">YOUR MONTHLY BUDGET</span>
          </div>
          <h3 style={{ fontSize: '1.18rem', fontWeight: 850, color: 'var(--wise-forest)', marginBottom: '3px' }}>
            Your monthly budget
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Add your take-home pay, monthly bills, and savings. The estimate updates as you type.
          </p>
        </div>
        <div className="cashflow-gap" aria-live="polite">
          <span>Bill left after savings</span>
          <strong>₹{unfundedGap.toLocaleString('en-IN')}</strong>
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
          Savings you can use now (₹)
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

      <div className="cashflow-breakdown" aria-label="Monthly income and committed expenses">
        <div className="cashflow-breakdown-heading">
          <span>How your income is allocated</span>
          <strong>₹{profile.monthlyIncome.toLocaleString('en-IN')} take-home</strong>
        </div>
        <div
          className="cashflow-breakdown-track"
          role="img"
          aria-label={`${committedShare.toFixed(0)} percent committed to existing payments and essentials; ₹${Math.max(0, netSurplus).toLocaleString('en-IN')} remains as monthly capacity`}
        >
          <span className="cashflow-breakdown-committed" style={{ width: `${committedShare}%` }} />
          <span className="cashflow-breakdown-free" style={{ width: `${100 - committedShare}%` }} />
        </div>
        <div className="cashflow-breakdown-legend">
          <span><i className="cashflow-legend-dot committed" /> Essentials & existing EMI <strong>₹{monthlyCommitments.toLocaleString('en-IN')}</strong></span>
          <span><i className="cashflow-legend-dot free" /> Available after essentials <strong>₹{netSurplus.toLocaleString('en-IN')}</strong></span>
        </div>
        <div className="cashflow-equation">
          <div><span>Income</span><strong>₹{profile.monthlyIncome.toLocaleString('en-IN')}</strong></div>
          <div><span>Committed costs</span><strong>−₹{monthlyCommitments.toLocaleString('en-IN')}</strong></div>
          <div><span className="cashflow-equation-result">Monthly capacity</span><strong className={netSurplus >= 0 ? 'positive' : 'negative'}>₹{netSurplus.toLocaleString('en-IN')}</strong></div>
        </div>
      </div>

      <div className="cashflow-guidance">
        <Sparkles size={16} aria-hidden="true" />
        <span><strong>Monthly capacity = take-home pay − EMI − rent − living costs.</strong> This estimate is not lender approval; compare it with the payment in the emergency plan.</span>
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
          <span>🏥 Explore health relief resources →</span>
        </a>
      </div>
    </div>
  );
};
