// src/pages/DashboardPage.tsx
// Executive Dashboard Overview & Feature Navigation Hub for VANTIQ
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  ShieldAlert, 
  Atom, 
  Wallet, 
  Scale, 
  ShieldCheck, 
  Lock, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { HeroSection } from '../modules/m01_hero/HeroSection';
import { TreeSHAPExplainer } from '../modules/m11_xai_explainer/TreeSHAPExplainer';

const FEATURE_CARDS = [
  {
    path: '/calculator',
    name: 'Calculator',
    step: 'Module 01',
    subtitle: 'Crisis Shock & Capacity Intake',
    description: 'Configure urgent liquidity shocks and compute real absorptive surplus vs misleading pre-approved credit lines.',
    icon: Calculator,
    color: '#10b981',
    badge: 'Step 1: Emergency Input',
  },
  {
    path: '/debt-traps',
    name: 'Debt Traps / Ghost Debt',
    step: 'Module 02',
    subtitle: 'Compound Stacking Mesh Radar',
    description: 'Simulate micro-lender debt stacking, cross-app repayment collision dates, and compound APR spikes.',
    icon: ShieldAlert,
    color: '#ef4444',
    badge: 'Step 2: Threat Modeling',
  },
  {
    path: '/quantum-solver',
    name: 'Quantum Solver',
    step: 'Module 03',
    subtitle: 'QAOA Combinatorial Knapsack Engine',
    description: 'Quadratic Unconstrained Binary Optimization (QUBO) simulated in <150ms to synthesize an optimal multi-source relief package.',
    icon: Atom,
    color: '#8b5cf6',
    badge: 'Step 3: <150ms Optimization',
  },
  {
    path: '/cash-runway',
    name: 'Cash Runway',
    step: 'Module 04',
    subtitle: '90-Day Temporal Digital Twin (TFT)',
    description: 'Forecast household cash reserves day-by-day under predatory borrowing vs quantum-assisted solvency.',
    icon: Wallet,
    color: '#06b6d4',
    badge: 'Step 4: Liquidity Forecast',
  },
  {
    path: '/fee-comparison',
    name: 'Fee Comparison',
    step: 'Module 05',
    subtitle: 'Counterfactual Rescue Matrix',
    description: 'Direct head-to-head comparison of hidden fees, predatory APRs, and human life-energy labor hours saved.',
    icon: Scale,
    color: '#f59e0b',
    badge: 'Step 5: Comparative Matrix',
  },
  {
    path: '/security-zk',
    name: 'Security & ZK',
    step: 'Module 06',
    subtitle: 'Zero-Knowledge Compliance Engine',
    description: 'Cryptographic zero-knowledge proof verification ensuring household solvency without revealing private banking data.',
    icon: ShieldCheck,
    color: '#10b981',
    badge: 'Step 6: Cryptographic ZK',
  },
  {
    path: '/45s-shield',
    name: '45s Shield',
    step: 'Module 07',
    subtitle: 'Neuro-Adaptive Grounding Protocol',
    description: 'Behavioral circuit breaker preventing impulsive panic borrowing through biometric stabilization and reflective pacing.',
    icon: Lock,
    color: '#38bdf8',
    badge: 'Step 7: Pacing Circuit Breaker',
  },
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="vantiq-dashboard-page" style={{ paddingBottom: '60px' }}>
      
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Modules Hub Grid */}
      <section style={{ padding: '40px 0 60px 0' }}>
        <div className="container">
          
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span className="badge badge-emerald">
                <Layers size={13} />
                <span>Modular Feature Architecture</span>
              </span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 850, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Explore VANTIQ Autonomous Financial Modules
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '680px', margin: '0 auto' }}>
              Each feature operates as a dedicated, high-performance module with independent routing, deterministic state, and quantum algorithms.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
            {FEATURE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.path}
                  to={card.path}
                  className="chronos-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '28px',
                    textDecoration: 'none',
                    border: '1px solid rgba(51, 65, 85, 0.45)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = card.color;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px ${card.color}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.45)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          backgroundColor: `${card.color}1a`,
                          border: `1px solid ${card.color}55`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 0 16px ${card.color}25`,
                        }}
                      >
                        <Icon size={22} color={card.color} />
                      </div>

                      <span className="badge" style={{ fontSize: '0.68rem', backgroundColor: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(71, 85, 105, 0.4)', color: '#94a3b8' }}>
                        {card.step}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
                      {card.name}
                    </h3>

                    <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600, marginBottom: '10px' }}>
                      {card.subtitle}
                    </div>

                    <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
                      {card.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(51, 65, 85, 0.3)' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                      {card.badge}
                    </span>

                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: card.color }}>
                      <span>Open Page</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* Explainable AI Model Explanations */}
      <TreeSHAPExplainer />

    </div>
  );
};
