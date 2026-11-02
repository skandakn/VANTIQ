// src/modules/m03_debt_mesh/GhostDebtMesh.tsx
// Module 4: Ghost Debt Stacking Mesh Visualizer (Authentic Light Theme)
import React, { useState } from 'react';
import {
  Layers,
  AlertOctagon,
  Smartphone,
  CreditCard,
  Zap,
  Flame,
  CheckCircle2,
  Calendar,
  Eye,
  EyeOff,
  Skull
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const GhostDebtMesh: React.FC = () => {
  const { profile, predatoryOffers } = useFintech();

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
  const select50kPreset = () => setSelectedAppIds(['app-1', 'app-3']);

  const activeOffers = predatoryOffers.filter((o) => selectedAppIds.includes(o.id));
  const totalOfferedLimit = predatoryOffers.reduce((sum, item) => sum + item.offeredLimit, 0);
  const selectedPrincipal = activeOffers.reduce((sum, item) => sum + item.offeredLimit, 0);
  const selectedMonthlyEmi = activeOffers.reduce((sum, item) => sum + item.monthlyEmi, 0);
  const selectedProcessingFees = activeOffers.reduce(
    (sum, item) => sum + (item.offeredLimit * item.processingFeePercent) / 100,
    0
  );
  
  const weightedApr =
    selectedPrincipal > 0
      ? activeOffers.reduce((sum, item) => sum + item.interestApr * item.offeredLimit, 0) /
        selectedPrincipal
      : 0;

  const monthlySurplus = profile.absorptiveSurplus;
  const monthlyDeficit = selectedMonthlyEmi - monthlySurplus;
  const isTrapTriggered = selectedMonthlyEmi > monthlySurplus;

  const getAppIcon = (type: string) => {
    switch (type) {
      case 'Instant Micro-Loan':
        return <Smartphone size={18} color="#dc2626" />;
      case 'BNPL Split':
        return <Zap size={18} color="#d97706" />;
      case 'Credit Card Advance':
        return <CreditCard size={18} color="#7c3aed" />;
      default:
        return <Flame size={18} color="#dc2626" />;
    }
  };

  return (
    <section id="ghost-debt" style={{ padding: '70px 0', borderTop: '1px solid #e5e9e2', backgroundColor: 'var(--bg-deep)' }}>
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
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.03em', marginBottom: '8px' }}>
            The Credit Mirage: 4 Disconnected Lending Apps
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '850px', lineHeight: 1.6 }}>
            Under acute emergency stress, a borrower opens multiple fintech apps. Each sees an isolated user and approves instant credit. But because bureaus take 30–60 days to report, <strong style={{ color: '#dc2626' }}>none of the apps know the others exist</strong>—triggering an invisible 5x debt stack!
          </p>
        </div>

        {/* Interactive Presets Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '28px',
          padding: '14px 22px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e5e9e2',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Simulate Strategy:</span>
            <button
              onClick={selectAll}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: selectedAppIds.length === 4 ? '1.5px solid #dc2626' : '1px solid #d0d7cc',
                backgroundColor: selectedAppIds.length === 4 ? '#fee2e2' : '#ffffff',
                color: selectedAppIds.length === 4 ? '#b91c1c' : 'var(--wise-forest)',
                cursor: 'pointer'
              }}
            >
              Full 4-App Panic Stack (₹75k Total)
            </button>
            <button
              onClick={select50kPreset}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: selectedAppIds.length === 2 && selectedAppIds.includes('app-1') && selectedAppIds.includes('app-3') ? '1.5px solid #b45309' : '1px solid #d0d7cc',
                backgroundColor: selectedAppIds.length === 2 ? '#fef3c7' : '#ffffff',
                color: selectedAppIds.length === 2 ? '#b45309' : 'var(--wise-forest)',
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
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: '1px solid #d0d7cc',
                backgroundColor: activeTab === 'mesh' ? 'var(--wise-forest)' : '#ffffff',
                color: activeTab === 'mesh' ? '#ffffff' : 'var(--wise-forest)',
                cursor: 'pointer'
              }}
            >
              Mesh Topology
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: '1px solid #d0d7cc',
                backgroundColor: activeTab === 'timeline' ? '#dc2626' : '#ffffff',
                color: activeTab === 'timeline' ? '#ffffff' : 'var(--wise-forest)',
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
                  border: isSelected
                    ? '2px solid #dc2626'
                    : '1px solid #e5e9e2',
                  backgroundColor: isSelected
                    ? '#fffcfc'
                    : '#ffffff',
                  boxShadow: isSelected
                    ? '0 10px 28px rgba(220, 38, 38, 0.12)'
                    : '0 4px 14px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'translateY(-2px)' : 'none'
                }}
              >
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
                      backgroundColor: '#fef2f2'
                    }}>
                      {getAppIcon(app.appType)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--wise-forest)' }}>
                        {app.lenderName}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
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
                      border: isSelected ? '2px solid #dc2626' : '2px solid #d0d7cc',
                      backgroundColor: isSelected ? '#dc2626' : 'transparent',
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
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                    Instant Offered Credit
                  </div>
                  <div style={{ fontSize: '1.9rem', fontWeight: 900, color: isSelected ? '#dc2626' : 'var(--wise-forest)' }}>
                    ₹{app.offeredLimit.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#b91c1c', marginTop: '2px', fontWeight: 600 }}>
                    + ₹{(app.offeredLimit * app.processingFeePercent / 100).toLocaleString()} upfront fee ({app.processingFeePercent}%)
                  </div>
                </div>

                {/* Repayment Breakdown */}
                <div style={{
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: '#f4f5f1',
                  border: '1px solid #e5e9e2',
                  fontSize: '0.82rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Monthly Auto-Debit:</span>
                    <strong style={{ color: '#dc2626' }}>₹{app.monthlyEmi.toLocaleString()}/mo</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Tenure:</span>
                    <span style={{ color: 'var(--wise-forest)', fontWeight: 700 }}>{app.tenureMonths} Months</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px dashed #d0d7cc' }}>
                    <span style={{ color: '#b45309' }}>Repayment Collision:</span>
                    <strong style={{ color: '#b45309' }}>Day {app.defaultCollisionDay} of month</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab 1: Interactive SVG Ghost Debt Mesh Topology */}
        {activeTab === 'mesh' && (
          <div className="chronos-card" style={{ padding: '32px', marginBottom: '32px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                  Ghost Debt Mesh: The Multi-Lender Information Asymmetry
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Credit bureaus have a 30–60 day reporting lag. Each fintech operates in an isolated blindspot.
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
              backgroundColor: '#fafbf9',
              borderRadius: '16px',
              padding: '20px 0',
              border: '1px solid #e5e9e2'
            }}>
              <svg viewBox="0 0 900 360" style={{ width: '100%', minWidth: '700px', height: 'auto', display: 'block' }}>
                <circle cx="450" cy="180" r="140" fill="none" stroke="#fecaca" strokeDasharray="6 6" />
                <circle cx="450" cy="180" r="80" fill="#fee2e2" stroke="#dc2626" strokeOpacity="0.4" />

                <line x1="160" y1="70" x2="400" y2="155" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 5" />
                <circle cx="280" cy="112" r="5" fill="#dc2626" />

                <line x1="740" y1="70" x2="500" y2="155" stroke="#d97706" strokeWidth="2.5" strokeDasharray="5 5" />
                <circle cx="620" cy="112" r="5" fill="#d97706" />

                <line x1="160" y1="290" x2="400" y2="205" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="5 5" />
                <circle cx="280" cy="248" r="5" fill="#7c3aed" />

                <line x1="740" y1="290" x2="500" y2="205" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 5" />
                <circle cx="620" cy="248" r="5" fill="#dc2626" />

                <text x="450" y="55" fill="#6b7f6e" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1">
                  ✕ CREDIT BUREAU LAG: 30-60 DAYS BLINDSPOT (NO REAL-TIME SYNC) ✕
                </text>

                <circle cx="450" cy="180" r="55" fill="#ffffff" stroke="#dc2626" strokeWidth="3" />
                <text x="450" y="168" fill="var(--wise-forest)" fontSize="12" fontWeight="800" textAnchor="middle">BORROWER</text>
                <text x="450" y="184" fill="#15803d" fontSize="10" fontWeight="700" textAnchor="middle">Surplus: ₹15,000</text>
                <text x="450" y="198" fill="#dc2626" fontSize="10" fontWeight="800" textAnchor="middle">
                  Drain: ₹{selectedMonthlyEmi.toLocaleString()}
                </text>

                <rect x="70" y="40" width="180" height="60" rx="10" fill="#ffffff" stroke="#dc2626" strokeWidth="1.5" />
                <text x="160" y="62" fill="var(--wise-forest)" fontSize="12" fontWeight="800" textAnchor="middle">App A: QuickRupee</text>
                <text x="160" y="78" fill="#dc2626" fontSize="10" fontWeight="700" textAnchor="middle">₹20,000 @ 36% APR</text>
                <text x="160" y="92" fill="#6b7f6e" fontSize="9" textAnchor="middle">EMI: ₹7,120/mo (Day 30)</text>

                <rect x="650" y="40" width="180" height="60" rx="10" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
                <text x="740" y="62" fill="var(--wise-forest)" fontSize="12" fontWeight="800" textAnchor="middle">App B: SplitNow BNPL</text>
                <text x="740" y="78" fill="#d97706" fontSize="10" fontWeight="700" textAnchor="middle">₹15,000 @ 28% APR</text>
                <text x="740" y="92" fill="#6b7f6e" fontSize="9" textAnchor="middle">EMI: ₹5,240/mo (Day 32)</text>

                <rect x="70" y="260" width="180" height="60" rx="10" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5" />
                <text x="160" y="282" fill="var(--wise-forest)" fontSize="12" fontWeight="800" textAnchor="middle">Credit Card Cash Adv.</text>
                <text x="160" y="298" fill="#7c3aed" fontSize="10" fontWeight="700" textAnchor="middle">₹30,000 @ 42% APR</text>
                <text x="160" y="312" fill="#6b7f6e" fontSize="9" textAnchor="middle">EMI: ₹5,640/mo (Day 35)</text>

                <rect x="650" y="260" width="180" height="60" rx="10" fill="#ffffff" stroke="#dc2626" strokeWidth="1.5" />
                <text x="740" y="282" fill="var(--wise-forest)" fontSize="12" fontWeight="800" textAnchor="middle">App C: FastSalary Payday</text>
                <text x="740" y="298" fill="#dc2626" fontSize="10" fontWeight="700" textAnchor="middle">₹10,000 @ 48% APR</text>
                <text x="740" y="312" fill="#6b7f6e" fontSize="9" textAnchor="middle">EMI: ₹8,200/mo (Day 42)</text>
              </svg>
            </div>
          </div>
        )}

        {/* Tab 2: Day 45 Default Collision Timeline */}
        {activeTab === 'timeline' && (
          <div className="chronos-card" style={{ padding: '32px', marginBottom: '32px', borderLeft: '4px solid #dc2626' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Calendar size={22} color="#dc2626" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                Chronological Default Anatomy: How the Trap Springs in 45 Days
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: '#f4f5f1', padding: '18px', borderRadius: '14px', border: '1px solid #e5e9e2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Day 1</span>
                  <span style={{ color: '#15803d', fontSize: '0.75rem', fontWeight: 700 }}>Crisis Solved</span>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--wise-forest)', fontSize: '0.92rem', marginBottom: '4px' }}>
                  ₹50,000 Hospital Paid
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  Cash received across apps in 3 taps. Immediate relief, but invisible e-mandates registered.
                </p>
              </div>

              <div style={{ backgroundColor: '#f4f5f1', padding: '18px', borderRadius: '14px', border: '1px solid #e5e9e2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>Day 30</span>
                  <span style={{ color: '#b45309', fontSize: '0.75rem', fontWeight: 700 }}>Salary Influx</span>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--wise-forest)', fontSize: '0.92rem', marginBottom: '4px' }}>
                  Fixed Costs Drain
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  ₹40,000 salary enters. Rent (-₹7,000) & Existing EMI (-₹8,000) clear immediately. Balance: ₹25,000.
                </p>
              </div>

              <div style={{ backgroundColor: '#fee2e2', padding: '18px', borderRadius: '14px', border: '1px solid #fecaca' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-red" style={{ fontSize: '0.65rem' }}>Day 32–35</span>
                  <span style={{ color: '#dc2626', fontSize: '0.75rem', fontWeight: 800 }}>The Crush</span>
                </div>
                <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.92rem', marginBottom: '4px' }}>
                  Triple Auto-Debits Hit
                </div>
                <p style={{ color: '#991b1b', fontSize: '0.8rem' }}>
                  App A (-₹7,120), App B (-₹5,240), Credit Card (-₹5,640) plus living food (-₹10,000). Balance plunged to <strong>-₹3,000</strong>!
                </p>
              </div>

              <div style={{ backgroundColor: '#fee2e2', padding: '18px', borderRadius: '14px', border: '2px solid #dc2626' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-red" style={{ fontSize: '0.65rem' }}>Day 45</span>
                  <span style={{ color: '#dc2626', fontSize: '0.75rem', fontWeight: 900 }}>Insolvency</span>
                </div>
                <div style={{ fontWeight: 900, color: '#dc2626', fontSize: '0.92rem', marginBottom: '4px' }}>
                  Bounces & Harassment
                </div>
                <p style={{ color: '#991b1b', fontSize: '0.8rem' }}>
                  Payday debit bounces (₹500 penalty fee). APR spikes to 54%. Recovery agents call entire contact list.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* The Core Illusion vs. Reality Breakdown (Light Cards) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Left Panel: The Panic-Driven Illusion */}
          <div className="chronos-card" style={{
            padding: '30px',
            border: '1px solid #d0d7cc'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Eye size={20} color="#0369a1" />
              <span className="badge badge-cyan">The Scarcity Illusion</span>
            </div>
            
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--wise-forest)', marginBottom: '12px' }}>
              "₹{totalOfferedLimit.toLocaleString()} immediate credit available in 3 taps!"
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              In the throes of a medical emergency, cognitive bandwidth narrows. The borrower only focuses on <strong>today’s ₹50,000 hospital bill</strong>. Frictionless app UX masks long-term liability.
            </p>

            <div style={{
              backgroundColor: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Borrower Mental Model:</span>
                <strong style={{ color: '#0369a1', fontSize: '0.85rem' }}>"Salary is ₹40,000"</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Apparent Safety:</span>
                <span style={{ color: '#15803d', fontSize: '0.85rem', fontWeight: 700 }}>"I can easily pay later"</span>
              </div>
            </div>
          </div>

          {/* Right Panel: The Harsh Reality */}
          <div className="chronos-card" style={{
            padding: '30px',
            border: '2px solid #dc2626',
            backgroundColor: '#fffafa'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <EyeOff size={20} color="#dc2626" />
              <span className="badge badge-red">The Realized Catastrophe</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#dc2626', marginBottom: '12px' }}>
              Cumulative Repayment: ₹{selectedMonthlyEmi.toLocaleString()}/mo vs. ₹{monthlySurplus.toLocaleString()} Surplus!
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              The borrower never had ₹40,000 disposable income. After rent (₹7,000), existing EMI (₹8,000), and food (₹10,000), their <strong style={{ color: '#15803d' }}>absorptive surplus is only ₹15,000</strong>!
            </p>

            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#991b1b', fontSize: '0.85rem' }}>Stacked Monthly Debits:</span>
                <strong style={{ color: '#dc2626', fontSize: '0.95rem' }}>₹{selectedMonthlyEmi.toLocaleString()} / month</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Real Absorptive Surplus:</span>
                <span style={{ color: '#15803d', fontSize: '0.85rem', fontWeight: 700 }}>₹{monthlySurplus.toLocaleString()} / month</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid #fecaca',
                marginTop: '4px'
              }}>
                <span style={{ color: '#dc2626', fontSize: '0.9rem', fontWeight: 800 }}>Monthly Deficit / Drain:</span>
                <strong style={{ color: '#dc2626', fontSize: '1.05rem', fontWeight: 900 }}>
                  {monthlyDeficit > 0 ? `-₹${monthlyDeficit.toLocaleString()}/mo` : '₹0 (Safe)'}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Pulsing Red Debt Spiral Warning Indicator */}
        <div style={{
          backgroundColor: isTrapTriggered ? '#fee2e2' : '#edf4ea',
          border: isTrapTriggered ? '2px solid #dc2626' : '1.5px solid #15803d',
          borderRadius: '18px',
          padding: '24px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: isTrapTriggered ? '#dc2626' : '#15803d',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {isTrapTriggered ? <AlertOctagon size={28} /> : <CheckCircle2 size={28} />}
            </div>

            <div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                color: isTrapTriggered ? '#991b1b' : '#15803d',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {isTrapTriggered
                  ? 'CRITICAL ALERT: Debt Spiral Triggered — Guaranteed Default Within 45 Days!'
                  : 'Borrowing within Absorptive Limits'}
              </div>
              <div style={{ color: isTrapTriggered ? '#7f1d1d' : '#2d422a', fontSize: '0.9rem', marginTop: '4px', maxWidth: '780px' }}>
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

        </div>

      </div>
    </section>
  );
};
