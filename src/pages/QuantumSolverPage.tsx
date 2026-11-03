// src/pages/QuantumSolverPage.tsx
// Dedicated Route Page: /quantum-solver
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Atom } from 'lucide-react';
import { MultiSourceRescueCard } from '../modules/m07_rescue_blend/MultiSourceRescueCard';

export const QuantumSolverPage: React.FC = () => {
  return (
    <div className="vantiq-feature-page" style={{ padding: '20px 0 60px 0' }}>
      <div className="container">
        
        {/* Navigation Breadcrumb Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Atom size={13} />
              <span>Dedicated Feature Page: /quantum-solver</span>
            </span>
          </div>
        </div>

        {/* Feature 3: Quantum QAOA Knapsack Visualizer */}

        {/* Multi-Source Rescue Split Package */}
        <MultiSourceRescueCard />

        {/* Bottom Feature Navigation Footer */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(51, 65, 85, 0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link
            to="/calculator"
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
            <span>Previous: Calculator</span>
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
