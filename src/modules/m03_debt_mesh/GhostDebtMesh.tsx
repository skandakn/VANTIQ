// src/modules/m03_debt_mesh/GhostDebtMesh.tsx
// Module 4: Ghost Debt Stacking Mesh Visualizer
// Role: Member 04 (VANTIQ Team)
import React, { useState } from 'react';
import {
  Layers,
  AlertOctagon,
  Smartphone,
  CreditCard,
  Zap,
  Flame,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Eye,
  EyeOff,
  Skull
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const GhostDebtMesh: React.FC = () => {
  const { profile, predatoryOffers } = useFintech();

  // Track which apps the user simulates borrowing from (default: all 4 selected)
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>(
    predatoryOffers.map((o) => o.id)
  );
  const [activeTab, setActiveTab] = useState<'mesh' | 'timeline'>('mesh');

  const toggleAppSelection = (id: string) => {
    setSelectedAppIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedAppIds(predatoryOffers.map((o) => o.id));
  const select50kPreset = () => setSelectedAppIds(['app-1', 'app-3']); // ₹20k + ₹30k = ₹50k

  // Calculations based on active selection
  const activeOffers = predatoryOffers.filter((o) => selectedAppIds.includes(o.id));
  const totalOfferedLimit = predatoryOffers.reduce((sum, item) => sum + item.offeredLimit, 0);
  const selectedPrincipal = activeOffers.reduce((sum, item) => sum + item.offeredLimit, 0);
  const selectedMonthlyEmi = activeOffers.reduce((sum, item) => sum + item.monthlyEmi, 0);
  const selectedProcessingFees = activeOffers.reduce(
    (sum, item) => sum + (item.offeredLimit * item.processingFeePercent) / 100,
    0
  );
  
  // Weighted APR
  const weightedApr =
    selectedPrincipal > 0
      ? activeOffers.reduce((sum, item) => sum + item.interestApr * item.offeredLimit, 0) /
        selectedPrincipal
      : 0;

  // Monthly surplus comparison
  const monthlySurplus = profile.absorptiveSurplus; // ₹15,000
  const monthlyDeficit = selectedMonthlyEmi - monthlySurplus; // e.g., ₹26,200 - ₹15,000 = ₹11,200
  const isTrapTriggered = selectedMonthlyEmi > monthlySurplus;

  // Icons mapper
  const getAppIcon = (type: string) => {
    switch (type) {
      case 'Instant Micro-Loan':
        return <Smartphone size={18} color="#f87171" />;
      case 'BNPL Split':
        return <Zap size={18} color="#fbbf24" />;
      case 'Credit Card Advance':
        return <CreditCard size={18} color="#c084fc" />;
      default:
        return <Flame size={18} color="#ef4444" />;
    }
  };

  return (
    <section id="ghost-debt" style={{ padding: '60px 0', borderTop: '1px solid rgba(239, 68, 68, 0.15)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={13} />
              <span>Step 2: Ghost Debt Mesh Visualizer</span>
            </span>
            <span className="badge badge-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Skull size={13} />
              <span>Predatory Stacking Trap</span>
            </span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            The Credit Mirage: 4 Disconnected Lending Apps
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '850px', lineHeight: 1.6 }}>
            Under acute emergency stress, a borrower opens multiple fintech apps. Each sees an isolated, low-risk user and approves instant credit. But because bureaus take 30–60 days to synchronize, <strong style={{ color: '#fca5a5' }}>none of the apps know the others exist</strong>—triggering an invisible 5x debt stack!
          </p>
        </div>

        {/* Interactive Presets Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
          padding: '12px 20px',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Simulate Borrower Strategy:</span>
            <button
              onClick={selectAll}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid rgba(239, 68, 68, 0.4)',
                backgroundColor: selectedAppIds.length === 4 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                color: selectedAppIds.length === 4 ? '#fca5a5' : '#cbd5e1',
                cursor: 'pointer'
              }}
            >
              Full 4-App Panic Stack (₹75k Total)
            </button>
            <button
              onClick={select50kPreset}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid rgba(245, 158, 11, 0.4)',
                backgroundColor: selectedAppIds.length === 2 && selectedAppIds.includes('app-1') && selectedAppIds.includes('app-3') ? 'rgba(245, 158, 11, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                color: selectedAppIds.length === 2 ? '#fde68a' : '#cbd5e1',
                cursor: 'pointer'
              }}
            >
              2-App Split to Reach ₹50k Hospital Bill
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('mesh')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid var(--border-subtle)',
                backgroundColor: activeTab === 'mesh' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                color: activeTab === 'mesh' ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer'
              }}
            >
              Mesh Topology
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid var(--border-subtle)',
                backgroundColor: activeTab === 'timeline' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                color: activeTab === 'timeline' ? '#f87171' : '#94a3b8',
                cursor: 'pointer'
              }}
            >
              Day 45 Default Timeline
            </button>
          </div>
        </div>

        {/* 4 Predatory Apps Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {predatoryOffers.map((app) => {
            const isSelected = selectedAppIds.includes(app.id);
            return (
              <div
                key={app.id}
                onClick={() => toggleAppSelection(app.id)}
                className="chronos-card"
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  border: isSelected
                    ? '2px solid rgba(239, 68, 68, 0.8)'
                    : '1px solid rgba(71, 85, 105, 0.3)',
                  boxShadow: isSelected
                    ? '0 8px 30px rgba(239, 68, 68, 0.25)'
                    : 'none',
                  backgroundColor: isSelected
                    ? 'rgba(30, 20, 25, 0.75)'
                    : 'rgba(15, 23, 42, 0.5)',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'translateY(-2px)' : 'none'
                }}
              >
                {/* Selection Ribbon */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      padding: '8px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)'
                    }}>
                      {getAppIcon(app.appType)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#f8fafc' }}>
                        {app.lenderName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {app.appType}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>
                      {app.interestApr}% APR
                    </span>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '2px solid #ef4444' : '2px solid #64748b',
                      backgroundColor: isSelected ? '#ef4444' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSelected && <CheckCircle2 size={14} color="#ffffff" />}
                    </div>
                  </div>
                </div>

                {/* Amount Offered */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Instant Offered Credit
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: isSelected ? '#fca5a5' : '#cbd5e1' }}>
                    ₹{app.offeredLimit.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#fb7185', marginTop: '2px' }}>
                    + ₹{(app.offeredLimit * app.processingFeePercent / 100).toLocaleString()} upfront processing fee ({app.processingFeePercent}%)
                  </div>
                </div>

                {/* Repayment Breakdown */}
                <div style={{
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Monthly Auto-Debit:</span>
                    <strong style={{ color: '#f87171' }}>₹{app.monthlyEmi.toLocaleString()}/mo</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Tenure:</span>
                    <span style={{ color: '#f8fafc' }}>{app.tenureMonths} Months</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px dashed rgba(255, 255, 255, 0.1)' }}>
                    <span style={{ color: '#fbbf24' }}>Repayment Collision:</span>
                    <strong style={{ color: '#fbbf24' }}>Day {app.defaultCollisionDay} of month</strong>
                  </div>
                </div>

                {/* Deceptive Micro-copy */}
                <div style={{ marginTop: '10px', fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic', textAlign: 'center' }}>
                  "Money credited in 3 minutes! No physical docs required."
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab 1: Interactive SVG Ghost Debt Mesh Topology */}
        {activeTab === 'mesh' && (
          <div className="chronos-card glow-purple" style={{ padding: '32px', marginBottom: '32px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                  Ghost Debt Mesh: The Multi-Lender Information Asymmetry
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                  Credit bureaus have a 30–60 day reporting lag. Each fintech operates in a sensory blindspot.
                </p>
              </div>
              <span className="badge badge-purple" style={{ padding: '6px 14px' }}>
                4 Isolated Credit Vectors Converging
              </span>
            </div>

            {/* SVG Visualizer */}
            <div style={{
              width: '100%',
              overflowX: 'auto',
              backgroundColor: 'rgba(5, 9, 20, 0.85)',
              borderRadius: '16px',
              padding: '20px 0',
              border: '1px solid rgba(139, 92, 246, 0.25)'
            }}>
              <svg viewBox="0 0 900 360" style={{ width: '100%', minWidth: '700px', height: 'auto', display: 'block' }}>
                <defs>
                  <linearGradient id="trapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Grid guidelines */}
                <circle cx="450" cy="180" r="140" fill="none" stroke="rgba(239, 68, 68, 0.15)" strokeDasharray="6 6" />
                <circle cx="450" cy="180" r="80" fill="rgba(239, 68, 68, 0.05)" stroke="rgba(239, 68, 68, 0.3)" />

                {/* Vectors from 4 Apps pointing to central borrower */}
                {/* App A (Top Left) */}
                <line x1="160" y1="70" x2="400" y2="155" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 5" />
                <circle cx="280" cy="112" r="4" fill="#ef4444" filter="url(#glowFilter)" />

                {/* App B (Top Right) */}
                <line x1="740" y1="70" x2="500" y2="155" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="5 5" />
                <circle cx="620" cy="112" r="4" fill="#fbbf24" filter="url(#glowFilter)" />

                {/* App C (Bottom Left) */}
                <line x1="160" y1="290" x2="400" y2="205" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="5 5" />
                <circle cx="280" cy="248" r="4" fill="#c084fc" filter="url(#glowFilter)" />

                {/* App D (Bottom Right) */}
                <line x1="740" y1="290" x2="500" y2="205" stroke="#f87171" strokeWidth="2.5" strokeDasharray="5 5" />
                <circle cx="620" cy="248" r="4" fill="#f87171" filter="url(#glowFilter)" />

                {/* Disconnected dashed lines between lenders showing lack of coordination */}
                <line x1="160" y1="70" x2="740" y2="70" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4 8" />
                <line x1="160" y1="70" x2="160" y2="290" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4 8" />
                <line x1="740" y1="70" x2="740" y2="290" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4 8" />
                <line x1="160" y1="290" x2="740" y2="290" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4 8" />

                <text x="450" y="55" fill="#94a3b8" fontSize="11" textAnchor="middle" letterSpacing="1">
                  ✕ CREDIT BUREAU LAG: 30-60 DAYS BLINDSPOT (NO REAL-TIME SYNC) ✕
                </text>

                {/* Central Node: Borrower */}
                <circle cx="450" cy="180" r="55" fill="#0f172a" stroke="#ef4444" strokeWidth="3" filter="url(#glowFilter)" />
                <text x="450" y="168" fill="#f8fafc" fontSize="12" fontWeight="800" textAnchor="middle">BORROWER</text>
                <text x="450" y="184" fill="#fca5a5" fontSize="10" fontWeight="700" textAnchor="middle">Surplus: ₹15,000</text>
                <text x="450" y="198" fill="#ef4444" fontSize="10" fontWeight="800" textAnchor="middle">
                  Drain: ₹{selectedMonthlyEmi.toLocaleString()}
                </text>

                {/* App A Node */}
                <rect x="70" y="40" width="180" height="60" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
                <text x="160" y="62" fill="#f8fafc" fontSize="12" fontWeight="700" textAnchor="middle">App A: QuickRupee</text>
                <text x="160" y="78" fill="#fca5a5" fontSize="10" textAnchor="middle">₹20,000 @ 36% APR</text>
                <text x="160" y="92" fill="#94a3b8" fontSize="9" textAnchor="middle">EMI: ₹7,120/mo (Day 30)</text>

                {/* App B Node */}
                <rect x="650" y="40" width="180" height="60" rx="10" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="740" y="62" fill="#f8fafc" fontSize="12" fontWeight="700" textAnchor="middle">App B: SplitNow BNPL</text>
                <text x="740" y="78" fill="#fde68a" fontSize="10" textAnchor="middle">₹15,000 @ 28% APR</text>
                <text x="740" y="92" fill="#94a3b8" fontSize="9" textAnchor="middle">EMI: ₹5,240/mo (Day 32)</text>

                {/* App C Node */}
                <rect x="70" y="260" width="180" height="60" rx="10" fill="#1e293b" stroke="#c084fc" strokeWidth="1.5" />
                <text x="160" y="282" fill="#f8fafc" fontSize="12" fontWeight="700" textAnchor="middle">Credit Card Cash Adv.</text>
                <text x="160" y="298" fill="#e9d5ff" fontSize="10" textAnchor="middle">₹30,000 @ 42% APR</text>
                <text x="160" y="312" fill="#94a3b8" fontSize="9" textAnchor="middle">EMI: ₹5,640/mo (Day 35)</text>

                {/* App D Node */}
                <rect x="650" y="260" width="180" height="60" rx="10" fill="#1e293b" stroke="#f87171" strokeWidth="1.5" />
                <text x="740" y="282" fill="#f8fafc" fontSize="12" fontWeight="700" textAnchor="middle">App C: FastSalary Payday</text>
                <text x="740" y="298" fill="#fca5a5" fontSize="10" textAnchor="middle">₹10,000 @ 48% APR</text>
                <text x="740" y="312" fill="#94a3b8" fontSize="9" textAnchor="middle">EMI: ₹8,200/mo (Day 42)</text>
              </svg>
            </div>
          </div>
        )}

        {/* Tab 2: Day 45 Default Collision Timeline */}
        {activeTab === 'timeline' && (
          <div className="chronos-card" style={{ padding: '32px', marginBottom: '32px', borderLeft: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Calendar size={22} color="#f87171" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc' }}>
                Chronological Default Anatomy: How the Trap Springs in 45 Days
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Day 1</span>
                  <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 700 }}>Crisis Solved</span>
                </div>
                <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.9rem', marginBottom: '4px' }}>
                  ₹50,000 Hospital Paid
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                  Cash received in 3 taps across apps. Immediate relief, but invisible e-mandates registered.
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>Day 30</span>
                  <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 700 }}>Salary Influx</span>
                </div>
                <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.9rem', marginBottom: '4px' }}>
                  Fixed Costs Drain
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                  ₹40,000 salary enters. Rent (-₹7,000) & Existing EMI (-₹8,000) clear immediately. Balance: ₹25,000.
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-red" style={{ fontSize: '0.65rem' }}>Day 32–35</span>
                  <span style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 700 }}>The Crush</span>
                </div>
                <div style={{ fontWeight: 700, color: '#fca5a5', fontSize: '0.9rem', marginBottom: '4px' }}>
                  Triple Auto-Debits Hit
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                  App A (-₹7,120), App B (-₹5,240), Credit Card (-₹5,640) plus living food (-₹10,000). Balance plunged to <strong>-₹3,000</strong>!
                </p>
              </div>

              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '18px', borderRadius: '12px', border: '2px solid rgba(239, 68, 68, 0.6)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-red" style={{ fontSize: '0.65rem' }}>Day 45</span>
                  <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 800 }}>Insolvency</span>
                </div>
                <div style={{ fontWeight: 800, color: '#f87171', fontSize: '0.9rem', marginBottom: '4px' }}>
                  Bounces & Harassment
                </div>
                <p style={{ color: '#fca5a5', fontSize: '0.78rem' }}>
                  Payday debit bounces (₹500 penalty fee). APR spikes to 54%. Recovery agents call entire contact list.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* The Core Illusion vs. Reality Breakdown */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Left Panel: The Panic-Driven Illusion */}
          <div className="chronos-card" style={{
            padding: '30px',
            background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
            border: '1px solid rgba(56, 189, 248, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Eye size={20} color="#38bdf8" />
              <span className="badge badge-cyan">The Scarcity Illusion</span>
            </div>
            
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginBottom: '12px' }}>
              "₹{totalOfferedLimit.toLocaleString()} immediate credit available in 3 taps!"
            </h3>

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              In the throes of a medical emergency, cognitive bandwidth narrows. The borrower only focuses on <strong>today’s ₹50,000 hospital bill</strong>. Frictionless app UX masks long-term liability.
            </p>

            <div style={{
              backgroundColor: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Borrower Mental Model:</span>
                <strong style={{ color: '#38bdf8', fontSize: '0.85rem' }}>"Salary is ₹40,000"</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Apps Opened:</span>
                <span style={{ color: '#f8fafc', fontSize: '0.85rem' }}>4 Separate Apps</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Apparent Safety:</span>
                <span style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: 700 }}>"I can easily pay later"</span>
              </div>
            </div>
          </div>

          {/* Right Panel: The Harsh Reality */}
          <div className="chronos-card" style={{
            padding: '30px',
            background: 'linear-gradient(145deg, rgba(69, 10, 10, 0.5), rgba(15, 23, 42, 0.9))',
            border: '2px solid rgba(239, 68, 68, 0.6)',
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <EyeOff size={20} color="#f87171" />
              <span className="badge badge-red">The Realized Catastrophe</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fca5a5', marginBottom: '12px' }}>
              Cumulative Repayment: ₹{selectedMonthlyEmi.toLocaleString()}/mo vs. ₹{monthlySurplus.toLocaleString()} Surplus!
            </h3>

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              The borrower never had ₹40,000 disposable income. After rent (₹7,000), existing EMI (₹8,000), and food (₹10,000), their <strong style={{ color: '#38bdf8' }}>absorptive surplus is only ₹15,000</strong>!
            </p>

            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#fca5a5', fontSize: '0.85rem' }}>Stacked Monthly Debits:</span>
                <strong style={{ color: '#ef4444', fontSize: '0.95rem' }}>₹{selectedMonthlyEmi.toLocaleString()} / month</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Real Absorptive Surplus:</span>
                <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 700 }}>₹{monthlySurplus.toLocaleString()} / month</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid rgba(239, 68, 68, 0.3)',
                marginTop: '4px'
              }}>
                <span style={{ color: '#f87171', fontSize: '0.9rem', fontWeight: 800 }}>Monthly Deficit / Drain:</span>
                <strong style={{ color: '#f87171', fontSize: '1rem', fontWeight: 900 }}>
                  {monthlyDeficit > 0 ? `-₹${monthlyDeficit.toLocaleString()}/mo` : '₹0 (Safe)'}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Pulsing Red Debt Spiral Warning Indicator */}
        <div style={{
          backgroundColor: isTrapTriggered ? 'rgba(239, 68, 68, 0.16)' : 'rgba(16, 185, 129, 0.12)',
          border: isTrapTriggered ? '2px solid #ef4444' : '1px solid #10b981',
          borderRadius: '16px',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: isTrapTriggered ? '0 0 35px rgba(239, 68, 68, 0.35)' : 'none',
          animation: isTrapTriggered ? 'pulseGlow 2.5s infinite ease-in-out' : 'none'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: isTrapTriggered ? '#ef4444' : '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isTrapTriggered ? '0 0 20px #ef4444' : '0 0 20px #10b981',
              flexShrink: 0
            }}>
              {isTrapTriggered ? <AlertOctagon size={28} color="#ffffff" /> : <CheckCircle2 size={28} color="#ffffff" />}
            </div>

            <div>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                color: isTrapTriggered ? '#fca5a5' : '#34d399',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {isTrapTriggered
                  ? 'CRITICAL ALERT: Debt Spiral Triggered — Guaranteed Default Within 45 Days!'
                  : 'Borrowing within Absorptive Limits'}
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.88rem', marginTop: '4px', maxWidth: '780px' }}>
                {isTrapTriggered ? (
                  <>
                    At <strong>{weightedApr.toFixed(1)}% blended APR</strong> with <strong>₹{selectedProcessingFees.toLocaleString()} in upfront fees</strong>, this loan stack extracts <strong>₹{selectedMonthlyEmi.toLocaleString()}/month</strong> from a salary that only has <strong>₹{monthlySurplus.toLocaleString()}</strong> uncommitted. The borrower will default on Day 32 when auto-debits collide.
                  </>
                ) : (
                  'Selected borrowing amount is currently sustainable within the monthly surplus buffer.'
                )}
              </div>
            </div>
          </div>

          <a
            href="#quantum-solver"
            className="btn btn-quantum"
            style={{ padding: '12px 24px', fontSize: '0.95rem', fontWeight: 700 }}
          >
            <span>Resolve via Quantum Knapsack</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};
