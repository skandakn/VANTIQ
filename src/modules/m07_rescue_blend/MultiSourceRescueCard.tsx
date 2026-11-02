// src/modules/m07_rescue_blend/MultiSourceRescueCard.tsx
// Module 8: Multi-Source Rescue Architecture Display
// Role: Member 08 (VANTIQ Team)
// Branch: feat/m08-rescue-blend

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  TrendingDown,
  Layers,
  ArrowRight,
  Clock,
  Coins,
  Building2,
  HeartHandshake,
  PieChart,
  Calendar,
  Info,
  Lock,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

interface TrancheDetail {
  id: 'tranche-a' | 'tranche-b' | 'tranche-c';
  trancheCode: 'Tranche A' | 'Tranche B' | 'Tranche C';
  title: string;
  subtitle: string;
  allocatedAmount: number;
  percentage: number;
  apr: number;
  interestCost: number;
  tenureDisplay: string;
  monthlyObligation: number;
  gracePeriodDays: number;
  colorHex: string;
  glowClass: string;
  badgeClass: string;
  subComponents?: {
    name: string;
    amount: number;
    apr: number;
    description: string;
  }[];
  icon: React.ReactNode;
  safeguards: string[];
  amortizationSummary: string;
}

export const MultiSourceRescueCard: React.FC = () => {
  const { shock, fundingPlan, profile } = useFintech();

  // Local interactive UI states
  const [selectedTrancheId, setSelectedTrancheId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'timeline'>('overview');
  const [disburseStep, setDisburseStep] = useState<number>(0);
  const [isDisbursing, setIsDisbursing] = useState<boolean>(false);
  const [isDisbursed, setIsDisbursed] = useState<boolean>(false);
  const [expandedBreakdown, setExpandedBreakdown] = useState<boolean>(false);

  // Dynamic calculations relative to the ₹50,000 requirement baseline
  const totalRequired = Math.max(0, shock?.amount ?? 0);
  const scale = totalRequired / 50000;

  // Tri-Tranche Data Model adhering strictly to Member 08 specifications
  const tranches: TrancheDetail[] = [
    {
      id: 'tranche-a',
      trancheCode: 'Tranche A',
      title: 'Zero-Cost Liquidity',
      subtitle: 'Emergency Savings + Subsidized Hospital Direct Advance',
      allocatedAmount: fundingPlan.tranches[0].allocatedAmount,
      percentage: 40,
      apr: 0.0,
      interestCost: 0,
      tenureDisplay: '6-Month Interest-Free Buffer',
      monthlyObligation: fundingPlan.tranches[0].monthlyObligation,
      gracePeriodDays: 0,
      colorHex: '#10b981',
      glowClass: 'glow-emerald',
      badgeClass: 'badge-emerald',
      icon: <HeartHandshake size={20} color="#10b981" />,
      subComponents: [
        {
          name: 'Self Liquid Reserve (Emergency Savings)',
          amount: Math.min(profile.emergencySavings, Math.round(totalRequired * 0.1)),
          apr: 0.0,
          description: 'Immediate zero-cost self-disbursement without touching long-term retirement or FD assets.'
        },
        {
          name: 'Hospital Institutional Advance Buffer',
          amount: Math.max(0, fundingPlan.tranches[0].allocatedAmount - Math.min(profile.emergencySavings, Math.round(totalRequired * 0.1))),
          apr: 0.0,
          description: 'Direct healthcare provider billing credit @ 0% APR via hospital emergency desk CSR partnership.'
        }
      ],
      safeguards: [
        'Zero origination, platform, or processing fees',
        'Direct settlement with hospital billing counter',
        'No bureau inquiry or negative credit score footprint'
      ],
      amortizationSummary: '₹5,000 self-funded immediately; ₹15,000 hospital advance amortized at ₹2,500/mo over 6 months with 0% APR.'
    },
    {
      id: 'tranche-b',
      trancheCode: 'Tranche B',
      title: 'Low-Interest Co-op / Credit Union Bridge',
      subtitle: 'Employer Credit Co-op Subsidized Emergency Window',
      allocatedAmount: fundingPlan.tranches[1].allocatedAmount,
      percentage: 40,
      apr: 6.5,
      interestCost: fundingPlan.tranches[1].interestCost,
      tenureDisplay: '12 Months Amortized',
      monthlyObligation: fundingPlan.tranches[1].monthlyObligation,
      gracePeriodDays: 0,
      colorHex: '#06b6d4',
      glowClass: 'glow-cyan',
      badgeClass: 'badge-cyan',
      icon: <Building2 size={20} color="#06b6d4" />,
      safeguards: [
        'Cooperative member-first fixed rate capped at 6.5% APR',
        'No compounding late payment penalty ratchet',
        'Subsidized through pre-vetted corporate welfare treasury'
      ],
      amortizationSummary: 'Smooth monthly obligation of ₹1,720/mo across 12 months, avoiding the toxic Day 32 payday collision.'
    },
    {
      id: 'tranche-c',
      trancheCode: 'Tranche C',
      title: 'Deferred Staggered Micro-Repayment',
      subtitle: 'Post-Crisis Recovery Tier with Built-in Breathing Room',
      allocatedAmount: fundingPlan.tranches[2].allocatedAmount,
      percentage: 20,
      apr: 8.0,
      interestCost: fundingPlan.tranches[2].interestCost,
      tenureDisplay: '6 Months (Starts Day 61)',
      monthlyObligation: fundingPlan.tranches[2].monthlyObligation,
      gracePeriodDays: 60,
      colorHex: '#8b5cf6',
      glowClass: 'glow-purple',
      badgeClass: 'badge-purple',
      icon: <Lock size={20} color="#8b5cf6" />,
      safeguards: [
        'Mandatory 60-day zero-repayment recovery grace period',
        'EMI activates strictly on Day 61 after emergency stabilizes',
        'Autonomous rollover protection if health recovery is delayed'
      ],
      amortizationSummary: '₹0 repayment for the first 60 days. Repayments commence on Day 61 at ₹1,795/mo over 6 months.'
    }
  ];

  // Total Interest Comparison Metrics: VANTIQ ₹1,420 vs Fragmented Loan Apps ₹18,400
  const vantiqTotalInterest = fundingPlan.totalInterestAndFees;
  const vantiqTotalRepayment = fundingPlan.totalRepayment;
  const vantiqEffectiveApr = 3.4;

  const predatoryTotalInterestAndFees = Math.round(18400 * scale);
  const predatoryTotalRepayment = totalRequired + predatoryTotalInterestAndFees;
  const predatoryEffectiveApr = 38.8;

  const directSavings = predatoryTotalRepayment - vantiqTotalRepayment;
  const savingsPercent = predatoryTotalRepayment > 0
    ? Math.round((directSavings / predatoryTotalRepayment) * 100)
    : 0;

  // Monthly obligation during critical Month 1 (where predatory loans demand ₹26,200)
  const vantiqMonth1Obligation = fundingPlan.tranches[0].monthlyObligation + fundingPlan.tranches[1].monthlyObligation;
  const predatoryMonth1Obligation = Math.round(26200 * scale);

  // Multi-step disbursement simulation handler
  const handleDisburseClick = () => {
    if (isDisbursing || isDisbursed) return;
    setIsDisbursing(true);
    setDisburseStep(1);

    setTimeout(() => {
      setDisburseStep(2);
    }, 700);

    setTimeout(() => {
      setDisburseStep(3);
    }, 1400);

    setTimeout(() => {
      setDisburseStep(4);
      setIsDisbursing(false);
      setIsDisbursed(true);
    }, 2100);
  };

  const resetDisbursement = () => {
    setIsDisbursed(false);
    setDisburseStep(0);
  };

  return (
    <section id="quantum-solver" style={{ padding: '60px 0', borderTop: '1px solid rgba(6, 182, 212, 0.15)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} />
              <span>Step 6: Multi-Source Rescue Architecture</span>
            </span>
            <span className="badge badge-cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={13} />
              <span>Tri-Tranche Decomposition</span>
            </span>
            <span className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={13} />
              <span>Funding plan calculated</span>
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                Tri-Tranche Multi-Source Solvency Architecture
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '850px', lineHeight: 1.6 }}>
                Predatory instant loan apps push borrowers into a single toxic 36%–48% APR debt trap. VANTIQ breaks the emergency requirement into three scientifically calibrated tranches—maximizing zero-cost liquidity and shielding monthly cashflow.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #d0d7cc',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <Coins size={24} color="#15803d" />
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                  Target Emergency Shock
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                  ₹{totalRequired.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '28px',
          padding: '8px 12px',
          backgroundColor: '#f4f5f1',
          borderRadius: '16px',
          border: '1.5px solid #d0d7cc'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: activeTab === 'overview' ? '1px solid #10b981' : '1px solid transparent',
                backgroundColor: activeTab === 'overview' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                color: activeTab === 'overview' ? '#34d399' : '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <PieChart size={15} />
              <span>Tri-Tranche Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('comparison')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: activeTab === 'comparison' ? '1px solid #06b6d4' : '1px solid transparent',
                backgroundColor: activeTab === 'comparison' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                color: activeTab === 'comparison' ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <TrendingDown size={15} />
              <span>Interest Comparison (₹1,420 vs ₹18,400)</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: activeTab === 'timeline' ? '1px solid #8b5cf6' : '1px solid transparent',
                backgroundColor: activeTab === 'timeline' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                color: activeTab === 'timeline' ? '#c084fc' : '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Calendar size={15} />
              <span>60-Day Grace Timeline</span>
            </button>
          </div>

        </div>

        {/* REQUIREMENT 3: VISUAL TRANCHE PROGRESS BAR */}
        <div className="vantiq-card" style={{ marginBottom: '32px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PieChart size={18} color="#38bdf8" />
                <span>Proportional Allocation Progress Bar (Total Requirement: ₹{totalRequired.toLocaleString()})</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                Allocation balances the amount needed with estimated fees and repayment timing.
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-emerald">Tranche A: 40%</span>
              <span className="badge badge-cyan">Tranche B: 40%</span>
              <span className="badge badge-purple">Tranche C: 20%</span>
            </div>
          </div>

          {/* Segmented Progress Bar */}
          <div style={{
            position: 'relative',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(51, 65, 85, 0.5)',
            display: 'flex',
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.5)',
            marginBottom: '16px'
          }}>
            {/* Segment A: 40% */}
            <div
              onClick={() => setSelectedTrancheId(selectedTrancheId === 'tranche-a' ? null : 'tranche-a')}
              style={{
                width: '40%',
                backgroundColor: '#10b981',
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
                backgroundSize: '24px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: selectedTrancheId === 'tranche-a' ? '0 0 16px rgba(16, 185, 129, 0.9)' : 'none',
                opacity: selectedTrancheId && selectedTrancheId !== 'tranche-a' ? 0.45 : 1,
                transition: 'all 0.25s ease',
                position: 'relative'
              }}
              title="Tranche A: Zero-Cost Liquidity (40% - ₹20,000 @ 0% APR)"
            >
              <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)', whiteSpace: 'nowrap', padding: '0 8px' }}>
                Tranche A • ₹{(20000 * scale).toLocaleString()} (40%) • 0% APR
              </span>
            </div>

            {/* Segment B: 40% */}
            <div
              onClick={() => setSelectedTrancheId(selectedTrancheId === 'tranche-b' ? null : 'tranche-b')}
              style={{
                width: '40%',
                backgroundColor: '#06b6d4',
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
                backgroundSize: '24px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                borderLeft: '2px solid rgba(15, 23, 42, 0.8)',
                borderRight: '2px solid rgba(15, 23, 42, 0.8)',
                boxShadow: selectedTrancheId === 'tranche-b' ? '0 0 16px rgba(6, 182, 212, 0.9)' : 'none',
                opacity: selectedTrancheId && selectedTrancheId !== 'tranche-b' ? 0.45 : 1,
                transition: 'all 0.25s ease'
              }}
              title="Tranche B: Co-op Bridge (40% - ₹20,000 @ 6.5% APR)"
            >
              <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)', whiteSpace: 'nowrap', padding: '0 8px' }}>
                Tranche B • ₹{(20000 * scale).toLocaleString()} (40%) • 6.5% APR
              </span>
            </div>

            {/* Segment C: 20% */}
            <div
              onClick={() => setSelectedTrancheId(selectedTrancheId === 'tranche-c' ? null : 'tranche-c')}
              style={{
                width: '20%',
                backgroundColor: '#8b5cf6',
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
                backgroundSize: '24px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                boxShadow: selectedTrancheId === 'tranche-c' ? '0 0 16px rgba(139, 92, 246, 0.9)' : 'none',
                opacity: selectedTrancheId && selectedTrancheId !== 'tranche-c' ? 0.45 : 1,
                transition: 'all 0.25s ease'
              }}
              title="Tranche C: Deferred Micro-Repay (20% - ₹10,000 @ 8% APR, 60-Day Grace)"
            >
              <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)', whiteSpace: 'nowrap', padding: '0 6px' }}>
                Tranche C • ₹{(10000 * scale).toLocaleString()} (20%) • 8% APR (60d Grace)
              </span>
            </div>
          </div>

          {/* Interactive Legend & Quick Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '14px',
            fontSize: '0.82rem',
            color: '#cbd5e1'
          }}>
            <div
              onClick={() => setSelectedTrancheId(selectedTrancheId === 'tranche-a' ? null : 'tranche-a')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: selectedTrancheId === 'tranche-a' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(15, 23, 42, 0.5)',
                border: selectedTrancheId === 'tranche-a' ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#34d399' }}>Tranche A: Zero-Cost Liquidity (40%)</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>₹5,000 Savings + ₹15,000 Hospital Advance @ 0% APR</div>
              </div>
            </div>

            <div
              onClick={() => setSelectedTrancheId(selectedTrancheId === 'tranche-b' ? null : 'tranche-b')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: selectedTrancheId === 'tranche-b' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(15, 23, 42, 0.5)',
                border: selectedTrancheId === 'tranche-b' ? '1px solid #06b6d4' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#06b6d4', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#38bdf8' }}>Tranche B: Co-op Bridge (40%)</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>₹20,000 Low-Interest Bridge @ 6.5% APR</div>
              </div>
            </div>

            <div
              onClick={() => setSelectedTrancheId(selectedTrancheId === 'tranche-c' ? null : 'tranche-c')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: selectedTrancheId === 'tranche-c' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(15, 23, 42, 0.5)',
                border: selectedTrancheId === 'tranche-c' ? '1px solid #8b5cf6' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#8b5cf6', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#c084fc' }}>Tranche C: Deferred Micro-Repay (20%)</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>₹10,000 @ 8% APR • 60-day recovery grace period</div>
              </div>
            </div>
          </div>
        </div>

        {/* REQUIREMENT 2: TRI-TRANCHE DECOMPOSITION UI */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--wise-forest)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} color="#15803d" />
              <span>Tri-Tranche Decomposition Breakdown</span>
            </h3>
            {selectedTrancheId && (
              <button
                onClick={() => setSelectedTrancheId(null)}
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  background: 'none',
                  border: '1px solid #d0d7cc',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  cursor: 'pointer'
                }}
              >
                Clear Filter (Show All 3)
              </button>
            )}
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px'
          }}>
            {tranches
              .filter((t) => !selectedTrancheId || t.id === selectedTrancheId)
              .map((tranche) => {
                const isSelected = selectedTrancheId === tranche.id;
                return (
                  <div
                    key={tranche.id}
                    className="vantiq-card"
                    style={{
                      backgroundColor: '#ffffff',
                      borderTop: `4px solid ${tranche.colorHex}`,
                      border: isSelected ? `2px solid ${tranche.colorHex}` : '1px solid #e5e9e2',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-card)'
                    }}
                  >
                    <div>
                      {/* Card Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span className={`badge ${tranche.badgeClass}`} style={{ fontSize: '0.75rem' }}>
                          {tranche.trancheCode} • {tranche.percentage}% of Need
                        </span>
                        <span style={{
                          fontSize: '0.95rem',
                          fontWeight: 800,
                          color: tranche.colorHex,
                          backgroundColor: '#f4f5f1',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: `1px solid #d0d7cc`
                        }}>
                          {tranche.apr === 0 ? '0% APR (Free)' : `${tranche.apr}% APR`}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        {tranche.icon}
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                          {tranche.title}
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                        {tranche.subtitle}
                      </p>

                      {/* Principal Amount Display */}
                      <div style={{
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: '#f4f5f1',
                        border: '1px solid #d0d7cc',
                        marginBottom: '18px'
                      }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                          Allocated Principal
                        </div>
                        <div style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.02em', margin: '4px 0' }}>
                          ₹{tranche.allocatedAmount.toLocaleString()}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          <span>Tenure: <strong>{tranche.tenureDisplay}</strong></span>
                          <span>Interest Cost: <strong style={{ color: tranche.apr === 0 ? '#15803d' : 'var(--wise-forest)' }}>₹{tranche.interestCost.toLocaleString()}</strong></span>
                        </div>
                      </div>

                      {/* Sub-Components (For Tranche A: Savings ₹5k + Hospital Advance ₹15k) */}
                      {tranche.subComponents && (
                        <div style={{ marginBottom: '18px' }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Info size={13} />
                            <span>Tranche A Dual Liquidity Split</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {tranche.subComponents.map((sub, sIdx) => (
                              <div
                                key={sIdx}
                                style={{
                                  padding: '10px 12px',
                                  borderRadius: '8px',
                                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                                  border: '1px solid rgba(16, 185, 129, 0.25)',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '3px'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>{sub.name}</span>
                                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399' }}>₹{sub.amount.toLocaleString()}</span>
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                  {sub.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tranche C 60-Day Grace Period Special Highlight */}
                      {tranche.gracePeriodDays > 0 && (
                        <div style={{
                          padding: '12px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.35)',
                          marginBottom: '18px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px'
                        }}>
                          <Clock size={18} color="#c084fc" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#c084fc' }}>
                              Protected 60-Day Grace Period Active
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.4, marginTop: '2px' }}>
                              No payments or interest penalties required during Days 1–60. Repayment only activates on Day 61 after primary medical recovery.
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Safeguards Bullet List */}
                      <div style={{ marginBottom: '18px' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                          Institutional Safeguards
                        </div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {tranche.safeguards.map((item, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#cbd5e1' }}>
                              <CheckCircle2 size={13} color={tranche.colorHex} style={{ flexShrink: 0 }} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Amortization Footprint */}
                    <div style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.8rem',
                      marginTop: '8px'
                    }}>
                      <div>
                        <span style={{ color: '#94a3b8' }}>Monthly Impact: </span>
                        <strong style={{ color: '#f8fafc', fontSize: '0.95rem' }}>
                          {tranche.gracePeriodDays > 0 ? '₹0 for 60d, then ₹' + tranche.monthlyObligation.toLocaleString() : '₹' + tranche.monthlyObligation.toLocaleString()}
                        </strong>
                      </div>
                      <span className={`badge ${tranche.badgeClass}`} style={{ fontSize: '0.68rem' }}>
                        {tranche.apr === 0 ? 'Zero APR' : `${tranche.apr}% APR`}
                      </span>
                    </div>

                  </div>
                );
              })}
          </div>
        </div>

        {/* REQUIREMENT 4: TOTAL INTEREST COMPARISON CARD */}
        {/* ₹1,420 with VANTIQ vs. ₹18,400 with fragmented loan apps */}
        <div className="vantiq-card glow-emerald" style={{
          padding: '32px',
          marginBottom: '32px',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Ambient Radial Glow */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-emerald">
                  <TrendingDown size={14} />
                  <span>Cost Efficiency Benchmark</span>
                </span>
                <span className="badge badge-cyan">
                  <span>92.3% Interest Reduction</span>
                </span>
              </div>
              <h3 style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.01em' }}>
                Total Interest Comparison: VANTIQ vs. Fragmented Loan Apps
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Direct mathematical comparison for borrowing ₹{totalRequired.toLocaleString()} in an emergency.
              </p>
            </div>

            {/* Total Cash Saved Big Banner */}
            <div style={{
              padding: '14px 24px',
              borderRadius: '16px',
              backgroundColor: '#edf4ea',
              border: '1.5px solid #bbf7d0',
              textAlign: 'right'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#15803d', textTransform: 'uppercase', fontWeight: 800 }}>
                Total Cash Saved
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#15803d' }}>
                ₹{directSavings.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {savingsPercent}% of total loan costs avoided
              </div>
            </div>
          </div>

          {/* Comparative Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
            marginBottom: '24px'
          }}>
            
            {/* Box 1: Fragmented Loan Apps (Predatory Trap) */}
            <div style={{
              padding: '24px',
              borderRadius: '14px',
              backgroundColor: 'rgba(239, 68, 68, 0.06)',
              border: '1.5px solid rgba(239, 68, 68, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertTriangle size={18} color="#ef4444" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase' }}>
                      Fragmented Loan Apps
                    </span>
                  </div>
                  <span className="badge badge-red" style={{ fontSize: '0.68rem' }}>
                    Predatory Debt Trap
                  </span>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Total Interest & Upfront Fees Paid:</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f87171', letterSpacing: '-0.02em', margin: '4px 0' }}>
                    ₹{predatoryTotalInterestAndFees.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#fca5a5' }}>
                    Effective APR: <strong>{predatoryEffectiveApr}%</strong> across 4 stacked apps
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '16px' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(239, 68, 68, 0.15)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Emergency Borrowed:</span>
                    <strong>₹{totalRequired.toLocaleString()}</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(239, 68, 68, 0.15)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Processing & Platform Fees:</span>
                    <strong style={{ color: '#f87171' }}>₹{Math.round(2800 * scale).toLocaleString()}</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(239, 68, 68, 0.15)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Compounding Interest:</span>
                    <strong style={{ color: '#f87171' }}>₹{Math.round(15600 * scale).toLocaleString()}</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(239, 68, 68, 0.15)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Total Cash Outflow:</span>
                    <strong style={{ color: '#f87171', fontSize: '0.95rem' }}>₹{predatoryTotalRepayment.toLocaleString()}</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Month 1 Immediate Payment:</span>
                    <strong style={{ color: '#ef4444' }}>₹{predatoryMonth1Obligation.toLocaleString()}/mo</strong>
                  </li>
                </ul>
              </div>

              <div style={{
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#fca5a5',
                fontSize: '0.75rem',
                fontWeight: 700,
                textAlign: 'center'
              }}>
                Day 32 Default Probability: 84% (Insolvency Shock)
              </div>
            </div>

            {/* Box 2: VANTIQ Rescue Plan */}
            <div style={{
              padding: '24px',
              borderRadius: '14px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '2px solid rgba(16, 185, 129, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={20} color="#10b981" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>
                      VANTIQ Tri-Tranche Rescue
                    </span>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
                    Optimal Ground State
                  </span>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Total Interest & Upfront Fees Paid:</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#34d399', letterSpacing: '-0.02em', margin: '4px 0' }}>
                    ₹{vantiqTotalInterest.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6ee7b7' }}>
                    Blended Effective APR: <strong>{vantiqEffectiveApr}%</strong> (Tranche A @ 0%, B @ 6.5%, C @ 8%)
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '16px' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(16, 185, 129, 0.15)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Emergency Borrowed:</span>
                    <strong>₹{totalRequired.toLocaleString()}</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(16, 185, 129, 0.15)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Tranche A Zero-Cost Interest:</span>
                    <strong style={{ color: '#34d399' }}>₹0 (0% APR)</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(16, 185, 129, 0.15)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Tranche B Co-op Bridge Interest:</span>
                    <strong style={{ color: '#38bdf8' }}>₹{Math.round(650 * scale).toLocaleString()} (6.5% APR)</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(16, 185, 129, 0.15)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Tranche C Micro-Repayment Interest:</span>
                    <strong style={{ color: '#c084fc' }}>₹{Math.round(770 * scale).toLocaleString()} (8.0% APR)</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(16, 185, 129, 0.15)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Total Cash Outflow:</span>
                    <strong style={{ color: '#34d399', fontSize: '0.95rem' }}>₹{vantiqTotalRepayment.toLocaleString()}</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Month 1 Obligation (Safe Buffer):</span>
                    <strong style={{ color: '#34d399' }}>₹{vantiqMonth1Obligation.toLocaleString()}/mo (vs ₹{predatoryMonth1Obligation.toLocaleString()})</strong>
                  </li>
                </ul>
              </div>

              <div style={{
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                color: '#6ee7b7',
                fontSize: '0.75rem',
                fontWeight: 700,
                textAlign: 'center',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                Day 32 Default Probability: 4% (100% Solvent Cashflow Runway)
              </div>
            </div>

          </div>

          {/* Visual Ratio Comparison Bar */}
          <div style={{
            backgroundColor: 'rgba(11, 19, 41, 0.8)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.82rem' }}>
              <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Visual Interest Burden Scale (₹1,420 vs. ₹18,400)</span>
              <span style={{ color: '#34d399', fontWeight: 700 }}>13.0x Lower Interest with VANTIQ</span>
            </div>

            <div style={{ position: 'relative', height: '24px', backgroundColor: '#050914', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
              {/* VANTIQ bar segment */}
              <div
                style={{
                  width: `${(1420 / 18400) * 100}%`,
                  minWidth: '50px',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800
                }}
                title="VANTIQ Total Interest: ₹1,420"
              >
                ₹{vantiqTotalInterest.toLocaleString()}
              </div>

              {/* Predatory Excess Segment */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(239, 68, 68, 0.45)',
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(239, 68, 68, 0.6) 10px, rgba(239, 68, 68, 0.6) 20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fca5a5',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
                title="Predatory Excess Interest: ₹16,980 wasted"
              >
                Excess Predatory Loan App Cost: ₹{directSavings.toLocaleString()} Saved
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.72rem', color: '#94a3b8' }}>
              <span>VANTIQ: ₹{vantiqTotalInterest.toLocaleString()}</span>
              <span>Predatory Total: ₹{predatoryTotalInterestAndFees.toLocaleString()}</span>
            </div>
          </div>

          {/* Interactive Deep-Dive Accordion */}
          <div>
            <button
              onClick={() => setExpandedBreakdown(!expandedBreakdown)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: '#cbd5e1',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Info size={16} color="#38bdf8" />
                <span>Why is VANTIQ ₹16,980 cheaper than borrowing from 4 apps?</span>
              </span>
              {expandedBreakdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {expandedBreakdown && (
              <div style={{
                marginTop: '10px',
                padding: '18px',
                borderRadius: '8px',
                backgroundColor: 'rgba(11, 19, 41, 0.95)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.82rem',
                lineHeight: 1.6,
                color: '#cbd5e1'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  <div>
                    <strong style={{ color: '#34d399', display: 'block', marginBottom: '4px' }}>1. Elimination of Multi-Origination Churn</strong>
                    Predatory apps deduct 4.5%–6% upfront as "processing & insurance" fees. On ₹50,000, you pay ₹2,800 before receiving a single rupee. VANTIQ eliminates synthetic churn by coordinating zero-cost institutional buffers.
                  </div>
                  <div>
                    <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '4px' }}>2. 0% APR Liquidity Absorption (Tranche A)</strong>
                    By tapping ₹5,000 in liquid savings and unlocking ₹15,000 hospital advance at 0% APR, 40% of the entire emergency requirement carries ₹0 interest penalty.
                  </div>
                  <div>
                    <strong style={{ color: '#c084fc', display: 'block', marginBottom: '4px' }}>3. 60-Day Grace Period Staggering (Tranche C)</strong>
                    Instead of front-loading debt service on Day 30 (causing a catastrophic collision with house rent), Tranche C delays payment until Day 61 at an institutional 8% APR rate.
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 12-MONTH REPAYMENT TRAJECTORY PREVIEW (TAB: TIMELINE) */}
        {activeTab === 'timeline' && (
          <div className="vantiq-card" style={{ marginBottom: '32px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Calendar size={18} color="#8b5cf6" />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                12-Month Staggered Cashflow Trajectory (Grace Period Protection)
              </h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '18px' }}>
              Notice how Month 1 and Month 2 obligations remain low (₹{vantiqMonth1Obligation.toLocaleString()}/mo), leaving ₹{Math.max(0, 15000 - vantiqMonth1Obligation).toLocaleString()} of your ₹15,000 disposable surplus intact!
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-medium)', color: '#94a3b8' }}>
                    <th style={{ padding: '10px' }}>Month</th>
                    <th style={{ padding: '10px' }}>Tranche A (Hospital @ 0%)</th>
                    <th style={{ padding: '10px' }}>Tranche B (Co-op @ 6.5%)</th>
                    <th style={{ padding: '10px' }}>Tranche C (Micro @ 8%)</th>
                    <th style={{ padding: '10px' }}>Total Monthly Outflow</th>
                    <th style={{ padding: '10px' }}>Predatory Stack Outflow</th>
                    <th style={{ padding: '10px' }}>Surplus Preserved</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
                    const trancheA = m <= 6 ? Math.round(2500 * scale) : 0;
                    const trancheB = Math.round(1720 * scale);
                    const trancheC = m <= 2 ? 0 : m <= 8 ? Math.round(1795 * scale) : 0;
                    const totalMonth = trancheA + trancheB + trancheC;
                    const predatory = m <= 3 ? Math.round(26200 * scale) : m <= 6 ? Math.round(5640 * scale) : 0;
                    const surplusRemaining = Math.round(15000 - totalMonth);

                    return (
                      <tr key={m} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.3)', backgroundColor: m <= 2 ? 'rgba(139, 92, 246, 0.05)' : undefined }}>
                        <td style={{ padding: '10px', fontWeight: 700, color: m <= 2 ? '#c084fc' : '#f8fafc' }}>
                          Month {m} {m <= 2 && '(Grace Active)'}
                        </td>
                        <td style={{ padding: '10px', color: '#34d399' }}>₹{trancheA.toLocaleString()}</td>
                        <td style={{ padding: '10px', color: '#38bdf8' }}>₹{trancheB.toLocaleString()}</td>
                        <td style={{ padding: '10px', color: m <= 2 ? '#94a3b8' : '#c084fc' }}>
                          {m <= 2 ? '₹0 (Deferred)' : `₹${trancheC.toLocaleString()}`}
                        </td>
                        <td style={{ padding: '10px', fontWeight: 800, color: '#34d399' }}>₹{totalMonth.toLocaleString()}</td>
                        <td style={{ padding: '10px', fontWeight: 700, color: predatory > 15000 ? '#ef4444' : '#cbd5e1' }}>
                          ₹{predatory.toLocaleString()} {predatory > 15000 && '⚠️ DEFAULT TRAP'}
                        </td>
                        <td style={{ padding: '10px', color: '#38bdf8' }}>₹{surplusRemaining.toLocaleString()} remaining</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INTERACTIVE DISBURSEMENT SIMULATOR COCKPIT */}
        <div className="vantiq-card" style={{
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: isDisbursed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(15, 23, 42, 0.85)',
          border: isDisbursed ? '2px solid #10b981' : '1px solid var(--border-medium)',
          transition: 'all 0.3s ease'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-emerald">Disbursement Execution Cockpit</span>
              {isDisbursed && <span className="badge badge-cyan">Disbursed Successfully</span>}
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
              Execute Tri-Tranche Coordinated Allocation
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>
              Routes ₹{(20000 * scale).toLocaleString()} to hospital counter (Tranche A), locks ₹{(20000 * scale).toLocaleString()} credit union bridge (Tranche B), and schedules ₹{(10000 * scale).toLocaleString()} for Day 61 repayment (Tranche C).
            </div>

            {/* Stepper text if disbursing */}
            {isDisbursing && (
              <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} className="animate-spin" />
                <span>
                  {disburseStep === 1 && 'Step 1/3: Validating zero-cost hospital emergency desk credit line...'}
                  {disburseStep === 2 && 'Step 2/3: Securing 6.5% subsidized Credit Union liquidity window...'}
                  {disburseStep === 3 && 'Step 3/3: Locking 60-day deferred grace period for Tranche C micro-repayment...'}
                </span>
              </div>
            )}

            {isDisbursed && (
              <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#34d399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} />
                <span>
                  All 3 tranches successfully funded! ₹{totalRequired.toLocaleString()} disbursed with ₹16,980 preserved.
                </span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {isDisbursed && (
              <button
                onClick={resetDisbursement}
                className="btn btn-secondary"
                style={{ padding: '12px 18px', fontSize: '0.9rem' }}
              >
                Reset Simulation
              </button>
            )}

            <button
              onClick={handleDisburseClick}
              disabled={isDisbursing || isDisbursed}
              className="btn btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '1rem',
                backgroundColor: isDisbursed ? '#10b981' : undefined,
                cursor: isDisbursing || isDisbursed ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {isDisbursed ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Multi-Tranche Disbursed (₹{totalRequired.toLocaleString()})</span>
                </>
              ) : isDisbursing ? (
                <>
                  <Zap size={18} className="animate-spin" />
                  <span>Routing Tri-Tranche Liquidity...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Disburse Tri-Tranche Rescue Plan</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
