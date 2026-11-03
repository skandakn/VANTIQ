// src/pages/CalculatorPage.tsx
// Dedicated Route Page: /calculator
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calculator as CalcIcon } from 'lucide-react';
import { EmergencyIntake } from '../modules/m02_crisis_input/EmergencyIntake';
import { DualCapacityGauge } from '../modules/m04_dual_dial/DualCapacityGauge';

export const CalculatorPage: React.FC = () => {
  return (
    <div className="vantiq-feature-page" style={{ padding: '20px 0 60px 0' }}>
      <div className="container">
        
        {/* Navigation Breadcrumb Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(30, 41, 59, 0.4)',
              border: '1px solid rgba(51, 65, 85, 0.5)',
              transition: 'all 0.2s ease',
            }}
          >
            <ArrowLeft size={16} color="#34d399" />
            <span>Back to Dashboard</span>
          </Link>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CalcIcon size={13} />
              <span>Dedicated Feature Page: /calculator</span>
            </span>
          </div>
        </div>

        {/* Feature 1: Emergency Intake & Financial Parameters */}
        <EmergencyIntake />

        {/* Real-Time Absorptive Capacity Dial */}
        <DualCapacityGauge />

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
            to="/quantum-solver"
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
            <span>Next: Quantum Solver</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </div>
  );
};
