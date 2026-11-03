// src/pages/CashRunwayPage.tsx
// Dedicated Route Page: /cash-runway
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CashflowRunwayChart } from '../modules/m05_cashflow_twin/CashflowRunwayChart';

export const CashRunwayPage: React.FC = () => {
  return (
    <div className="vantiq-feature-page" style={{ padding: '20px 0 60px 0' }}>
      <div className="container">
        

        {/* Feature 4: 90-Day Cashflow Digital Twin Runway */}
        <CashflowRunwayChart />

        {/* Bottom Feature Navigation Footer */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(51, 65, 85, 0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link
            to="/quantum-solver"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '0.85rem',
            }}
          >
            <ArrowLeft size={14} />
            <span>Previous: Quantum Solver</span>
          </Link>

          <Link
            to="/"
            className="btn btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              fontSize: '0.85rem',
              borderColor: 'rgba(16, 185, 129, 0.4)',
              color: '#34d399',
            }}
          >
            <span>Overview Dashboard</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </div>
  );
};
