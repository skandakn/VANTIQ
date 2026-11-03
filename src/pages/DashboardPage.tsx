// src/pages/DashboardPage.tsx
// Executive Dashboard Overview & Feature Navigation Hub for VANTIQ
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Atom, 
  Wallet, 
  Scale, 
  Lock, 
  ArrowRight,
  Layers,
  UserCheck,
  Shield,
  LogIn
} from 'lucide-react';
import { useUser } from '@clerk/react';
import { SignedIn, SignedOut } from '../config/clerk';
import { HeroSection } from '../modules/m01_hero/HeroSection';
import { HealthReliefNavigator } from '../modules/m15_health_navigator/HealthReliefNavigator';
import { CashflowRunwayChart } from '../modules/m05_cashflow_twin/CashflowRunwayChart';
import { LifeEnergyCalculator } from '../modules/m09_life_energy/LifeEnergyCalculator';

const FEATURE_CARDS = [
  {
    path: '/calculator',
    name: 'Calculator',
    step: 'Module 01',
    subtitle: 'Crisis Shock & Capacity Intake',
    description: 'Configure urgent liquidity shocks and compute real absorptive surplus vs misleading pre-approved credit lines.',
    icon: Calculator,
    color: '#10b981',
    badge: 'Emergency Input',
  },
  {
    path: '/quantum-solver',
    name: 'Quantum Solver',
    step: 'Module 02',
    subtitle: 'QAOA Combinatorial Knapsack Engine',
    description: 'Quadratic Unconstrained Binary Optimization (QUBO) simulated in <150ms to synthesize an optimal multi-source relief package.',
    icon: Atom,
    color: '#8b5cf6',
    badge: '<150ms Optimization',
  },
  {
    path: '/cash-runway',
    name: 'Cash Runway',
    step: 'Module 03',
    subtitle: '90-Day Temporal Digital Twin (TFT)',
    description: 'Forecast household cash reserves day-by-day under predatory borrowing vs quantum-assisted solvency.',
    icon: Wallet,
    color: '#06b6d4',
    badge: 'Liquidity Forecast',
  },
  {
    path: '/fee-comparison',
    name: 'Fee Comparison',
    step: 'Module 04',
    subtitle: 'Counterfactual Rescue Matrix',
    description: 'Direct head-to-head comparison of hidden fees, predatory APRs, and human life-energy labor hours saved.',
    icon: Scale,
    color: '#f59e0b',
    badge: 'Comparative Matrix',
  },
  {
    path: '/45s-shield',
    name: '45s Shield',
    step: 'Module 06',
    subtitle: 'Neuro-Adaptive Grounding Protocol',
    description: 'Behavioral circuit breaker preventing impulsive panic borrowing through biometric stabilization and reflective pacing.',
    icon: Lock,
    color: '#38bdf8',
    badge: 'Pacing Circuit Breaker',
  },
];

export const DashboardPage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="vantiq-dashboard-page" style={{ paddingBottom: '60px' }}>
      
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Modules Hub Grid (Dedicated Feature Hub by SaiArvind18) */}
      <section style={{ padding: '30px 0 50px 0', backgroundColor: 'var(--bg-deep)' }}>
        <div className="container">
          
          {/* Clerk Security & Personalization HUD Banner */}
          <div style={{ marginBottom: '28px' }}>
            <SignedIn>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  padding: '14px 20px',
                  borderRadius: '14px',
                  backgroundColor: '#edf5e8',
                  border: '1px solid #cce1c3',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--wise-lime, #9fe870)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <UserCheck size={18} color="var(--wise-forest, #163300)" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.90rem', fontWeight: 800, color: 'var(--wise-forest, #163300)' }}>
                      Authenticated Emergency Session: {user?.firstName || user?.fullName || 'Active User'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#536851', display: 'block' }}>
                      All debt simulations and neuro-shield settings are securely encrypted under your profile.
                    </span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--wise-forest, #163300)',
                    textDecoration: 'none',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #d0dec9',
                  }}
                >
                  Manage Security & MFA →
                </Link>
              </div>
            </SignedIn>

            <SignedOut>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  padding: '14px 20px',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #dbe5d6',
                  boxShadow: '0 2px 10px rgba(22, 51, 0, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      backgroundColor: '#eef5ea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Shield size={18} color="#15803d" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.90rem', fontWeight: 800, color: 'var(--wise-forest, #163300)' }}>
                      Save your emergency debt meshes & customized rescue plans
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#566a54', display: 'block' }}>
                      Sign in with Clerk to access cross-device sync, Zero-Knowledge vaults, and tailored debt relief.
                    </span>
                  </div>
                </div>
                <Link
                  to="/login"
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: 'var(--wise-lime, #9fe870)',
                    backgroundColor: 'var(--wise-forest, #163300)',
                    textDecoration: 'none',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <LogIn size={13} />
                  <span>Sign In Free</span>
                </Link>
              </div>
            </SignedOut>
          </div>
          
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span className="badge badge-emerald">
                <Layers size={13} />
                <span>Modular Feature Architecture</span>
              </span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 850, color: 'var(--wise-forest, #f8fafc)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Explore VANTIQ Autonomous Financial Modules
            </h2>
            <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '1rem', maxWidth: '680px', margin: '0 auto' }}>
              Each feature operates as a dedicated, high-performance module with independent routing, deterministic state, and quantum algorithms.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
            {FEATURE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.path}
                  to={card.path}
                  className="vantiq-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px',
                    textDecoration: 'none',
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #d0d7cc',
                    borderRadius: '16px',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = card.color;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 30px -10px rgba(0, 0, 0, 0.12), 0 0 16px ${card.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d0d7cc';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: `${card.color}15`,
                          border: `1px solid ${card.color}44`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={20} color={card.color} />
                      </div>

                      <span className="badge" style={{ fontSize: '0.68rem', backgroundColor: '#edf2ea', border: '1px solid #d8e2d4', color: 'var(--wise-forest)' }}>
                        {card.step}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--wise-forest)', marginBottom: '4px' }}>
                      {card.name}
                    </h3>

                    <div style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 700, marginBottom: '8px' }}>
                      {card.subtitle}
                    </div>

                    <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                      {card.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid #edf2ea' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      {card.badge}
                    </span>

                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 800, color: card.color }}>
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

      {/* Main Flow: Health & Medical Relief Navigator */}
      <HealthReliefNavigator />


      {/* 90-Day Cashflow Digital Twin */}
      <CashflowRunwayChart />

      {/* Life Energy Labor Cost Calculator */}
      <LifeEnergyCalculator />


    </div>
  );
};
