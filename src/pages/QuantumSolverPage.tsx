// src/pages/QuantumSolverPage.tsx
// Dedicated Route Page: /quantum-solver
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MultiSourceRescueCard } from '../modules/m07_rescue_blend/MultiSourceRescueCard';

export const QuantumSolverPage: React.FC = () => {
  return (
    <div className="vantiq-feature-page" style={{ padding: '20px 0 60px 0' }}>
      <div className="container">
        

        {/* Emergency funding estimate and multi-source plan */}

        {/* Multi-Source Rescue Split Package */}
        <MultiSourceRescueCard />

        {/* Bottom Feature Navigation Footer */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(51, 65, 85, 0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link
            to="/"
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
            <span>Dashboard Overview</span>
          </Link>

          <Link
            to="/cash-runway"
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
            <span>Next: Cash Runway</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </div>
  );
};
