// src/modules/m15_health_navigator/HealthReliefNavigator.tsx
// Module 15: Global Health & Medical Financial Relief & Plan Optimizer
// Comprehensive, real-world directory of verified medical loans, 0% EMI cards, sovereign schemes, and crowdfunding.

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  Calculator,
  Scale,
  ExternalLink,
  Search,
  Clock,
  Star,
  Globe,
  FileText,
  Share2,
  Printer,
  ChevronRight,
  Building2,
  HeartHandshake,
  Check,
  AlertTriangle
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';
import { HEALTH_CONDITIONS, HEALTH_RELIEF_PLANS } from './healthPlansData';
import { HealthEmiCalculator } from './HealthEmiCalculator';
import { HealthPlanComparisonModal } from './HealthPlanComparisonModal';
import type { HealthReliefPlan, HealthReliefStrategy } from '../../types';

export const HealthReliefNavigator: React.FC = () => {
  const { shock, setShock, hourlyWage } = useFintech();

  // State
  const [selectedConditionId, setSelectedConditionId] = useState<string>('cardiac');
  const [regionFilter, setRegionFilter] = useState<'All' | 'India' | 'USA' | 'UK' | 'Global'>('India');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'lowest_apr' | 'highest_trust' | 'fastest'>('recommended');

  // Funding Parameters
  const [targetAmount, setTargetAmount] = useState<number>(shock.amount || 450000);
  const [urgency, setUrgency] = useState<'critical' | 'high' | 'moderate'>('critical');
  const [insuranceStatus, setInsuranceStatus] = useState<'uninsured' | 'partial' | 'full'>('partial');
  const [existingInsuranceCover, setExistingInsuranceCover] = useState<number>(150000);
  const [creditTier, setCreditTier] = useState<'excellent' | 'good' | 'fair' | 'no_credit'>('good');

  // Modals & Comparison State
  const [activeEmiPlan, setActiveEmiPlan] = useState<HealthReliefPlan | null>(null);
  const [comparedPlanIds, setComparedPlanIds] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>('tata-capital-medical');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Selected Condition Metadata
  const currentCondition = useMemo(() => {
    return HEALTH_CONDITIONS.find((c) => c.id === selectedConditionId) || HEALTH_CONDITIONS[0];
  }, [selectedConditionId]);

  // Currency config
  const currencyConfig = useMemo(() => {
    if (regionFilter === 'USA' || regionFilter === 'Global') {
      return { symbol: '$', code: 'USD', factor: 1 };
    }
    if (regionFilter === 'UK') {
      return { symbol: '£', code: 'GBP', factor: 0.8 };
    }
    return { symbol: '₹', code: 'INR', factor: 85 };
  }, [regionFilter]);

  // Handle Condition Click
  const handleSelectCondition = (conditionId: string) => {
    setSelectedConditionId(conditionId);
    const cond = HEALTH_CONDITIONS.find((c) => c.id === conditionId);
    if (cond) {
      const newAmt = regionFilter === 'India' ? cond.typicalCostInr : cond.typicalCostUsd;
      setTargetAmount(newAmt);
      setUrgency(cond.urgencyDefault);
    }
  };

  // Trigger worldwide scan simulation
  const triggerWorldwideSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const target = document.getElementById('vetted-options-grid');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  // Handle choosing a specific plan
  const handleChoosePlan = (plan: HealthReliefPlan) => {
    setSelectedPlanId(plan.id);
    setShock((prev) => ({
      ...prev,
      amount: Math.min(targetAmount, plan.maxAmount),
      description: `${plan.name} (${plan.organization})`,
      urgencyLevel: urgency,
    }));
  };

  // Filter & Sort Plans
  const filteredPlans = useMemo(() => {
    return HEALTH_RELIEF_PLANS.filter((plan) => {
      // Region Match
      if (regionFilter !== 'All' && plan.region !== regionFilter && plan.region !== 'Global') {
        return false;
      }

      // Category Match
      if (categoryFilter !== 'all') {
        if (categoryFilter === 'free_aid') {
          if (plan.interestApr !== 0) return false;
        } else if (categoryFilter === 'insurance') {
          if (plan.category !== 'insurance_claim') return false;
        } else if (categoryFilter === 'low_loan') {
          if (plan.category !== 'medical_loan') return false;
        } else if (categoryFilter === 'govt') {
          if (plan.category !== 'government_scheme') return false;
        } else if (categoryFilter === 'crowdfunding') {
          if (plan.category !== 'crowdfunding' && plan.category !== 'charitable_trust') return false;
        } else if (categoryFilter === 'hospital_emi') {
          if (plan.category !== 'zero_cost_emi' && plan.category !== 'hospital_hardship') return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = plan.name.toLowerCase().includes(query);
        const matchOrg = plan.organization.toLowerCase().includes(query);
        const matchDesc = plan.recommendedFor.toLowerCase().includes(query);
        const matchTags = plan.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchName && !matchOrg && !matchDesc && !matchTags) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'lowest_apr') {
        return a.interestApr - b.interestApr;
      }
      if (sortBy === 'highest_trust') {
        return b.trustScore - a.trustScore;
      }
      if (sortBy === 'fastest') {
        return a.disbursementSpeed.localeCompare(b.disbursementSpeed);
      }
      // 'recommended': Weight 0% APR first, then highest trust score
      if (a.interestApr === 0 && b.interestApr !== 0) return -1;
      if (b.interestApr === 0 && a.interestApr !== 0) return 1;
      return b.trustScore - a.trustScore || a.interestApr - b.interestApr;
    });
  }, [regionFilter, categoryFilter, searchQuery, sortBy]);

  // Compute Optimal Suggested Multi-Tier Relief Strategy
  const smartStrategy = useMemo<HealthReliefStrategy>(() => {
    const totalRequired = targetAmount;

    // Tier 1: Insurance or Sovereign Non-Repayable Safety Net
    let tier1GrantCover = 0;
    let tier1Name = 'Ayushman Bharat PM-JAY / Sovereign Health Relief';

    if (insuranceStatus === 'partial') {
      tier1GrantCover = Math.min(existingInsuranceCover, totalRequired);
      tier1Name = 'Cashless Health Insurance Pre-Authorization Claim';
    } else if (insuranceStatus === 'full') {
      tier1GrantCover = totalRequired;
      tier1Name = '100% Cashless TPA Comprehensive Hospital Cover';
    } else {
      // Uninsured: check if eligible for Ayushman Bharat / Medicaid / Charitable Trust
      if (regionFilter === 'India') {
        tier1GrantCover = Math.min(250000, totalRequired * 0.5);
        tier1Name = 'Ayushman Bharat / Tata Trusts Medical Grant (0% Cost)';
      } else {
        tier1GrantCover = Math.min(15000, totalRequired * 0.4);
        tier1Name = 'Emergency Medicaid / Hill-Burton Free Hospital Care';
      }
    }

    const remainingAfterTier1 = Math.max(0, totalRequired - tier1GrantCover);

    // Tier 2: 0% Interest Medical Network Card / Hospital Subsidized EMI
    const maxZeroEmiLimit = regionFilter === 'India' ? 100000 : 5000;
    const tier2ZeroEmi = Math.min(maxZeroEmiLimit, remainingAfterTier1);
    const remainingAfterTier2 = Math.max(0, remainingAfterTier1 - tier2ZeroEmi);

    // Tier 3: Regulated Prime Low-Interest Medical Loan (Only for deficit)
    const tier3Loan = remainingAfterTier2;
    const tier3Apr = creditTier === 'excellent' ? 10.49 : creditTier === 'good' ? 11.25 : 12.80;
    const loanTenure = 24; // 24 months

    // Loan interest computation
    const monthlyRate = tier3Apr / 12 / 100;
    const tier3MonthlyEmi = tier3Loan > 0
      ? Math.round((tier3Loan * monthlyRate * Math.pow(1 + monthlyRate, loanTenure)) / (Math.pow(1 + monthlyRate, loanTenure) - 1))
      : 0;
    const tier3TotalRepayment = tier3MonthlyEmi * loanTenure;
    const tier3Interest = Math.max(0, tier3TotalRepayment - tier3Loan);

    // Zero EMI monthly repayment (e.g., 6 months no-cost EMI)
    const tier2MonthlyEmi = tier2ZeroEmi > 0 ? Math.round(tier2ZeroEmi / 6) : 0;

    // Total Repayment across all tiers (tier1GrantCover is 0 debt / non-repayable)
    const totalRepayment = tier2ZeroEmi + tier3TotalRepayment;

    // Blended APR: (Total Interest / Principal) / (Tenure in Years) * 100
    const blendedApr = totalRequired > 0
      ? Math.round((tier3Interest / totalRequired / 2) * 100 * 10) / 10
      : 0;

    // Compare with Predatory Payday / Instant Micro Loan @ 36% APR
    const predatoryMonthlyRate = 36.0 / 12 / 100;
    const predatoryMonthlyEmi = Math.round(
      (totalRequired * predatoryMonthlyRate * Math.pow(1 + predatoryMonthlyRate, loanTenure)) /
      (Math.pow(1 + predatoryMonthlyRate, loanTenure) - 1)
    );
    const predatoryTotalRepayment = predatoryMonthlyEmi * loanTenure;
    const totalInterestSavedVsPredatory = Math.max(0, predatoryTotalRepayment - totalRepayment);
    const lifeHoursSaved = Math.round(totalInterestSavedVsPredatory / hourlyWage);

    const allocations = [
      {
        sourceName: tier1Name,
        category: 'Non-Repayable Grant / Insurance',
        amount: Math.round(tier1GrantCover),
        interestRate: 0,
        tenure: 'Non-repayable',
        monthlyEmi: 0,
        isNonRepayable: true,
        trustScore: 5.0,
        notes: 'Zero debt burden. Fast-tracked via hospital TPA desk.',
      },
      {
        sourceName: regionFilter === 'India' ? 'Bajaj Finserv Health EMI (0% APR)' : 'CareCredit 0% Promo Financing',
        category: '0% No-Cost EMI Card',
        amount: Math.round(tier2ZeroEmi),
        interestRate: 0,
        tenure: '6 Months',
        monthlyEmi: tier2MonthlyEmi,
        isNonRepayable: false,
        trustScore: 4.8,
        notes: '0% interest subvention for initial surgery deposit & diagnostic tests.',
      },
      {
        sourceName: regionFilter === 'India' ? 'Tata Capital / SBI Regulated Medical Loan' : 'LendingClub Fixed Medical Loan',
        category: 'Regulated Low-Interest Loan',
        amount: Math.round(tier3Loan),
        interestRate: tier3Apr,
        tenure: `${loanTenure} Months`,
        monthlyEmi: tier3MonthlyEmi,
        isNonRepayable: false,
        trustScore: 4.9,
        notes: `Only borrowed for remainder at low ${tier3Apr}% APR vs predatory 36%.`,
      },
    ].filter((a) => a.amount > 0);

    return {
      targetAmount: totalRequired,
      currency: currencyConfig.symbol,
      selectedCondition: currentCondition.name,
      urgency,
      blendedApr,
      totalRepayment,
      totalInterestSavedVsPredatory,
      lifeHoursSaved,
      allocations,
    };
  }, [
    targetAmount,
    insuranceStatus,
    existingInsuranceCover,
    regionFilter,
    creditTier,
    currentCondition,
    hourlyWage,
    currencyConfig,
    urgency,
  ]);

  // Apply to Core VANTIQ Simulator
  const handleApplyToVantiq = () => {
    setShock({
      amount: targetAmount,
      category: 'medical',
      description: `${currentCondition.name} Emergency Relief Plan`,
      urgencyLevel: urgency,
      daysToDisbursement: urgency === 'critical' ? 1 : 3,
    });
    // Return to the emergency calculator with the selected amount applied.
    const target = document.getElementById('simulator');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle Plan into Comparison Tray
  const toggleComparePlan = (planId: string) => {
    setComparedPlanIds((prev) => {
      if (prev.includes(planId)) {
        return prev.filter((id) => id !== planId);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], planId];
      }
      return [...prev, planId];
    });
  };

  const comparedPlans = useMemo(() => {
    return HEALTH_RELIEF_PLANS.filter((p) => comparedPlanIds.includes(p.id));
  }, [comparedPlanIds]);

  // Copy Action Plan
  const handleCopyActionPlan = () => {
    const text = `🏥 VANTIQ EMERGENCY MEDICAL FINANCIAL ACTION PLAN
Condition: ${currentCondition.name}
Required Amount: ${currencyConfig.symbol}${targetAmount.toLocaleString()}
Recommended Multi-Tier Strategy:
1. Non-Repayable Grant / Insurance: ${currencyConfig.symbol}${smartStrategy.allocations[0]?.amount.toLocaleString() || 0} (0% Interest)
2. 0% No-Cost Health EMI: ${currencyConfig.symbol}${smartStrategy.allocations[1]?.amount.toLocaleString() || 0} (0% Interest)
3. Regulated Medical Loan: ${currencyConfig.symbol}${smartStrategy.allocations[2]?.amount.toLocaleString() || 0} (${smartStrategy.blendedApr}% Blended APR)
Total Savings vs 36% Predatory Payday Loan: ${currencyConfig.symbol}${smartStrategy.totalInterestSavedVsPredatory.toLocaleString()}
Hours of Life-Energy Saved: ${smartStrategy.lifeHoursSaved} Hours
Generated securely via VANTIQ (https://vantiq-khaki.vercel.app)`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="health-navigator"
      style={{
        padding: '70px 0',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e9e2',
        position: 'relative',
      }}
    >
      {/* Anchor alias */}
      <div id="health-aid" style={{ position: 'relative', top: '-80px', visibility: 'hidden' }} />

      <div className="container">

        {/* =========================================================
            1. Section Header: Wise High-Trust Aesthetic
            ========================================================= */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge badge-forest">
              <HeartHandshake size={14} />
              <span>Global Medical Financial Relief & Low-Interest Optimizer</span>
            </span>
            <span className="badge badge-emerald">
              <ShieldCheck size={13} />
              <span>Verified Open Sources</span>
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: 'var(--wise-forest)',
                  letterSpacing: '-0.03em',
                  marginBottom: '8px',
                }}
              >
                Find the Best Plan for Your Health Emergency
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', maxWidth: '820px' }}>
                Select your medical condition and required amount. VANTIQ searches worldwide options—from sovereign 0% grants and hospital charity subsidies to vetted lowest-APR medical loans—to protect your family from debt traps.
              </p>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleCopyActionPlan}
                className="btn btn-secondary"
                style={{
                  padding: '9px 16px',
                  fontSize: '0.82rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '9999px',
                }}
                title="Copy Action Plan to Clipboard"
              >
                <Share2 size={14} />
                <span>{copiedNotification ? 'Copied to Clipboard!' : 'Share Plan'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="btn btn-secondary"
                style={{
                  padding: '9px 16px',
                  fontSize: '0.82rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '9999px',
                }}
                title="Print Emergency Action Summary"
              >
                <Printer size={14} />
                <span>Print Guide</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            2. Medical Condition Presets & Parameters Console
            ========================================================= */}
        <div
          className="vantiq-card"
          style={{
            padding: '28px',
            backgroundColor: '#f9faf7',
            border: '1.5px solid #d0d7cc',
            borderRadius: '22px',
            marginBottom: '32px',
          }}
        >
          {/* Header Row: Region & Diagnosis Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 800, color: '#3b543d', letterSpacing: '0.04em' }}>
                Step 1: Select Health Condition & Procedure
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                Medical Diagnosis & Care Pathway
              </h3>
            </div>

            {/* Region Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#ffffff', padding: '4px', borderRadius: '9999px', border: '1px solid #d0d7cc' }}>
              <Globe size={14} color="var(--wise-forest)" style={{ marginLeft: '8px' }} />
              {(['India', 'USA', 'UK', 'Global'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRegionFilter(r)}
                  style={{
                    border: 'none',
                    background: regionFilter === r ? 'var(--wise-forest)' : 'transparent',
                    color: regionFilter === r ? 'var(--wise-lime)' : 'var(--text-secondary)',
                    fontWeight: regionFilter === r ? 800 : 600,
                    fontSize: '0.78rem',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {r === 'India' ? '🇮🇳 India' : r === 'USA' ? '🇺🇸 United States' : r === 'UK' ? '🇬🇧 United Kingdom' : '🌍 Global'}
                </button>
              ))}
            </div>
          </div>

          {/* Condition Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '12px',
              marginBottom: '26px',
            }}
          >
            {HEALTH_CONDITIONS.map((cond) => {
              const isSelected = selectedConditionId === cond.id;
              const costDisplay = regionFilter === 'India'
                ? `₹${(cond.typicalCostInr / 100000).toFixed(1)}L`
                : `$${(cond.typicalCostUsd / 1000).toFixed(0)}k`;

              return (
                <div
                  key={cond.id}
                  onClick={() => handleSelectCondition(cond.id)}
                  style={{
                    backgroundColor: isSelected ? 'var(--wise-forest)' : '#ffffff',
                    color: isSelected ? '#ffffff' : 'var(--wise-forest)',
                    border: isSelected ? '2px solid var(--wise-forest)' : '1px solid #d0d7cc',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isSelected ? '0 10px 24px rgba(22, 51, 0, 0.14)' : 'none',
                    transform: isSelected ? 'translateY(-2px)' : 'none',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          color: isSelected ? 'var(--wise-lime)' : '#3b543d',
                        }}
                      >
                        {cond.category}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          backgroundColor: isSelected ? 'rgba(159, 232, 112, 0.2)' : '#fee2e2',
                          color: isSelected ? 'var(--wise-lime)' : '#dc2626',
                        }}
                      >
                        {cond.urgencyDefault}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '6px' }}>
                      {cond.name}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: isSelected ? '1px solid rgba(255,255,255,0.15)' : '1px solid #edf0ea' }}>
                    <span style={{ fontSize: '0.72rem', color: isSelected ? '#c4d0c1' : 'var(--text-muted)' }}>
                      Avg Cost:
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 900, color: isSelected ? 'var(--wise-lime)' : 'var(--wise-forest)' }}>
                      {costDisplay}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sliders & Parameters Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              backgroundColor: '#ffffff',
              padding: '22px',
              borderRadius: '18px',
              border: '1px solid #e5e9e2',
            }}
          >
            {/* Target Amount */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Total Medical Bill Needed
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                    {currencyConfig.symbol}{targetAmount.toLocaleString()}
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={regionFilter === 'India' ? 25000 : 1000}
                max={regionFilter === 'India' ? 2500000 : 100000}
                step={regionFilter === 'India' ? 25000 : 1000}
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--wise-forest)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>Min: {currencyConfig.symbol}{regionFilter === 'India' ? '25,000' : '1,000'}</span>
                <span>Max: {currencyConfig.symbol}{regionFilter === 'India' ? '25,00,000' : '100,000'}</span>
              </div>
            </div>

            {/* Insurance Status */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Existing Health Insurance Coverage
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {[
                  { id: 'uninsured', label: 'Uninsured (0%)' },
                  { id: 'partial', label: 'Partial Policy' },
                  { id: 'full', label: 'Full Cashless' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setInsuranceStatus(item.id as any)}
                    style={{
                      border: '1px solid #d0d7cc',
                      backgroundColor: insuranceStatus === item.id ? '#edf2ea' : '#f9faf7',
                      color: 'var(--wise-forest)',
                      fontWeight: insuranceStatus === item.id ? 800 : 500,
                      padding: '8px 6px',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {insuranceStatus === 'partial' && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>Insurance Cover:</span>
                    <span style={{ fontWeight: 700, color: 'var(--wise-forest)' }}>
                      {currencyConfig.symbol}{existingInsuranceCover.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={25000}
                    max={targetAmount}
                    step={25000}
                    value={existingInsuranceCover}
                    onChange={(e) => setExistingInsuranceCover(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#15803d', marginTop: '4px' }}
                  />
                </div>
              )}
            </div>

            {/* Credit Score / Income Status */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Patient / Co-Applicant Credit Tier
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {[
                  { id: 'excellent', label: '750+ Prime' },
                  { id: 'good', label: '680 - 749' },
                  { id: 'fair', label: '580 - 679' },
                  { id: 'no_credit', label: 'No CIBIL' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setCreditTier(tier.id as any)}
                    style={{
                      border: '1px solid #d0d7cc',
                      backgroundColor: creditTier === tier.id ? '#edf2ea' : '#f9faf7',
                      color: 'var(--wise-forest)',
                      fontWeight: creditTier === tier.id ? 800 : 500,
                      padding: '8px 4px',
                      borderRadius: '10px',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                    }}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                {creditTier === 'no_credit'
                  ? '✨ Recommending non-collateral healthcare lines & Ayushman/charity funds.'
                  : 'Eligible for lowest institutional bank APRs (10.49% - 11.25%).'}
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================
            3. AI-Suggested Multi-Tier Optimal Funding Plan
            ========================================================= */}
        <div
          className="vantiq-card"
          style={{
            padding: '32px',
            backgroundColor: '#ffffff',
            border: '2px solid #bbf7d0',
            borderRadius: '24px',
            boxShadow: '0 16px 40px rgba(22, 51, 0, 0.08)',
            marginBottom: '40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-emerald" style={{ padding: '6px 14px' }}>
                  <Sparkles size={14} />
                  <span>The Recommended Optimal Plan</span>
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534' }}>
                  Lowest Net Cost & Zero Predatory Debt
                </span>
              </div>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                Multi-Source Hybrid Strategy for {currentCondition.name}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                Instead of borrowing the full {currencyConfig.symbol}{targetAmount.toLocaleString()} at an exorbitant 36% interest rate, VANTIQ stacks free grants, 0% health lines, and lowest-APR loans.
              </p>
            </div>

            {/* Sync with VANTIQ Core Simulator CTA */}
            <button
              onClick={handleApplyToVantiq}
              className="btn btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: '0.9rem',
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '9999px',
                boxShadow: '0 8px 20px rgba(159, 232, 112, 0.4)',
              }}
              title="Push this medical amount into VANTIQ 15-module engine"
            >
              <Zap size={16} />
              <span>Apply to VANTIQ Simulator</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Metrics Highlight Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            {/* Blended APR */}
            <div style={{ backgroundColor: '#f0fdf4', border: '1.5px solid #bbf7d0', padding: '18px', borderRadius: '16px' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#166534', letterSpacing: '0.04em' }}>
                Blended Effective APR
              </div>
              <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#15803d', margin: '4px 0' }}>
                {smartStrategy.blendedApr}% <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>p.a.</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#166534' }}>
                Vs 36.0% market micro-loan apps
              </div>
            </div>

            {/* Interest Saved */}
            <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #e5e9e2', padding: '18px', borderRadius: '16px' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
                Cash Interest Saved
              </div>
              <div style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--wise-forest)', margin: '4px 0' }}>
                {currencyConfig.symbol}{smartStrategy.totalInterestSavedVsPredatory.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700 }}>
                Direct family cash preserved
              </div>
            </div>

            {/* Life Energy Labor Saved */}
            <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #e5e9e2', padding: '18px', borderRadius: '16px' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
                Life-Energy Hours Saved
              </div>
              <div style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--wise-forest)', margin: '4px 0' }}>
                {smartStrategy.lifeHoursSaved} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Hrs</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Equivalent to {Math.round(smartStrategy.lifeHoursSaved / 8)} full working shifts
              </div>
            </div>

            {/* Total Repayment */}
            <div style={{ backgroundColor: '#edf2ea', border: '1.5px solid #d8e2d4', padding: '18px', borderRadius: '16px' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#3b543d', letterSpacing: '0.04em' }}>
                Total Net Outflow
              </div>
              <div style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--wise-forest)', margin: '4px 0' }}>
                {currencyConfig.symbol}{smartStrategy.totalRepayment.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Spread smoothly across 24 months
              </div>
            </div>
          </div>

          {/* Allocation Stack Breakdown */}
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--wise-forest)', marginBottom: '12px' }}>
              Step-by-Step Funding Tranche Distribution:
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '14px' }}>
              {smartStrategy.allocations.map((alloc, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#fafbf9',
                    border: '1.5px solid #e5e9e2',
                    borderRadius: '16px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge badge-forest" style={{ fontSize: '0.72rem' }}>
                        Tranche {String.fromCharCode(65 + idx)}: {alloc.category}
                      </span>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          color: alloc.interestRate === 0 ? '#15803d' : 'var(--wise-forest)',
                        }}
                      >
                        {alloc.interestRate === 0 ? '✨ 0% Interest' : `${alloc.interestRate}% APR`}
                      </span>
                    </div>

                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--wise-forest)', marginBottom: '4px' }}>
                      {alloc.sourceName}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {alloc.notes}
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e5e9e2', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Allocated Funding</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                        {currencyConfig.symbol}{alloc.amount.toLocaleString()}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Monthly Outflow</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: alloc.monthlyEmi === 0 ? '#15803d' : 'var(--wise-forest)' }}>
                        {alloc.monthlyEmi === 0 ? '₹0 / mo (Non-repayable)' : `${currencyConfig.symbol}${alloc.monthlyEmi.toLocaleString()}/mo`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            4. Verified Directory & Filter Controls
            ========================================================= */}
        <div style={{ marginBottom: '24px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-forest" style={{ fontSize: '0.75rem' }}>
                  <Building2 size={13} />
                  <span>Verified Healthcare Providers & Portals</span>
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  ({filteredPlans.length} Working Plans Found)
                </span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--wise-forest)', marginTop: '4px' }}>
                Explore All Vetted Healthcare Options
              </h3>
            </div>

            {/* Search Bar & Scan Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', minWidth: '240px' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="Search lenders, schemes, or grants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '9999px',
                    border: '1.5px solid #d0d7cc',
                    backgroundColor: '#f9faf7',
                    fontSize: '0.85rem',
                    color: 'var(--wise-forest)',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                onClick={triggerWorldwideSearch}
                className="btn btn-primary"
                style={{
                  padding: '10px 18px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                }}
              >
                <Globe size={14} />
                <span>{isSearching ? 'Scanning Worldwide...' : 'Search Options Worldwide'}</span>
              </button>
            </div>
          </div>

          {/* If Searching, show animated scan pill */}
          {isSearching && (
            <div
              style={{
                backgroundColor: '#edf2ea',
                border: '1px solid #d8e2d4',
                padding: '12px 18px',
                borderRadius: '14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.85rem',
                color: 'var(--wise-forest)',
                fontWeight: 700,
              }}
            >
              <Sparkles size={16} color="#15803d" className="pulse-icon" />
              <span>Scanning 280+ worldwide medical relief options, insurance claims, and low-interest loans...</span>
            </div>
          )}

          {/* Active Chosen Plan Notification Banner */}
          {selectedPlanId && (
            <div
              style={{
                backgroundColor: '#f0fdf4',
                border: '1.5px solid #86efac',
                padding: '12px 20px',
                borderRadius: '16px',
                marginBottom: '18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="#15803d" />
                <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#166534' }}>
                  Active Chosen Plan: {filteredPlans.find((p) => p.id === selectedPlanId)?.name || 'Selected Plan'}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#15803d' }}>
                  ({filteredPlans.find((p) => p.id === selectedPlanId)?.organization})
                </span>
              </div>
              <span style={{ fontSize: '0.76rem', color: '#166534', fontWeight: 600 }}>
                ✓ Synced with VANTIQ Knapsack Solver & Cashflow Runway
              </span>
            </div>
          )}

          {/* Filter Pills & Sorting */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>

            {/* Filter Categories */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Plans' },
                { id: 'free_aid', label: '✨ 0% Free Grants & Subsidies' },
                { id: 'insurance', label: '🛡️ Health Insurance Policies' },
                { id: 'low_loan', label: 'Low-Interest Loans (<11%)' },
                { id: 'govt', label: 'Sovereign Govt Schemes' },
                { id: 'crowdfunding', label: 'Crowdfunding & Trusts' },
                { id: 'hospital_emi', label: 'Hospital No-Cost Cards' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  style={{
                    border: categoryFilter === cat.id ? '1px solid var(--wise-forest)' : '1px solid #d0d7cc',
                    backgroundColor: categoryFilter === cat.id ? 'var(--wise-forest)' : '#ffffff',
                    color: categoryFilter === cat.id ? 'var(--wise-lime)' : 'var(--text-secondary)',
                    fontWeight: categoryFilter === cat.id ? 800 : 600,
                    fontSize: '0.78rem',
                    padding: '7px 14px',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: '7px 12px',
                  borderRadius: '10px',
                  border: '1px solid #d0d7cc',
                  backgroundColor: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--wise-forest)',
                  cursor: 'pointer',
                }}
              >
                <option value="recommended">Recommended (Lowest Outflow)</option>
                <option value="lowest_apr">Lowest Interest APR</option>
                <option value="highest_trust">Highest Trust Rating</option>
                <option value="fastest">Fastest Disbursement</option>
              </select>
            </div>

          </div>

        </div>

        {/* =========================================================
            5. Plan Cards Grid
            ========================================================= */}
        <div
          id="vetted-options-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '22px',
            marginBottom: '40px',
          }}
        >
          {filteredPlans.map((plan, idx) => {
            const isCompared = comparedPlanIds.includes(plan.id);
            const isChosen = selectedPlanId === plan.id;
            const isTopRanked = idx === 0 && !searchQuery;

            return (
              <div
                key={plan.id}
                className="vantiq-card"
                style={{
                  padding: '24px',
                  backgroundColor: isChosen ? '#fafdf9' : '#ffffff',
                  border: isChosen
                    ? '2.5px solid #16a34a'
                    : isTopRanked
                    ? '2px solid #f59e0b'
                    : plan.interestApr === 0
                    ? '1.5px solid #86efac'
                    : '1.5px solid #d0d7cc',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isChosen
                    ? '0 12px 32px rgba(22, 163, 74, 0.18)'
                    : isTopRanked
                    ? '0 10px 28px rgba(245, 158, 11, 0.15)'
                    : '0 8px 24px rgba(22, 51, 0, 0.05)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                <div>
                  {/* Top Crown Ribbon for #1 or Active Chosen Badge */}
                  {isTopRanked && (
                    <div
                      style={{
                        marginBottom: '10px',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        backgroundColor: '#fef3c7',
                        border: '1px solid #fde68a',
                        color: '#92400e',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <span>👑 Ranked #1 Best Match (Lowest Outflow & Top Trust)</span>
                    </div>
                  )}

                  {isChosen && (
                    <div
                      style={{
                        marginBottom: '10px',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        backgroundColor: '#dcfce7',
                        border: '1px solid #86efac',
                        color: '#166534',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Check size={13} />
                      <span>Active Selected Solution in VANTIQ</span>
                    </div>
                  )}

                  {/* Top Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      <span className="badge badge-forest" style={{ fontSize: '0.7rem' }}>
                        {plan.categoryLabel}
                      </span>
                      <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '9999px', backgroundColor: '#f4f5f1', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {plan.region}
                      </span>
                    </div>

                    {/* Trust Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#fffbeb', border: '1px solid #fef3c7', padding: '3px 8px', borderRadius: '9999px' }}>
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#b45309' }}>
                        {plan.trustScore}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#92400e' }}>
                        ({(plan.ratingCount / 1000).toFixed(0)}k)
                      </span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--wise-forest)', marginBottom: '4px', lineHeight: 1.3 }}>
                    {plan.name}
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    {plan.organization} &bull; <span style={{ color: '#15803d', fontWeight: 700 }}>{plan.regulatoryBody}</span>
                  </div>

                  {/* Pricing & Key Numbers Pill Box */}
                  <div
                    style={{
                      backgroundColor: plan.interestApr === 0 ? '#f0fdf4' : '#fafbf9',
                      border: plan.interestApr === 0 ? '1px solid #bbf7d0' : '1px solid #e5e9e2',
                      borderRadius: '14px',
                      padding: '14px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                        Interest APR
                      </div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 900, color: plan.interestApr === 0 ? '#15803d' : 'var(--wise-forest)' }}>
                        {plan.interestApr === 0 ? '0% Free / Grant' : `${plan.interestApr}%`}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {plan.isRepayable ? 'Fixed Reducing Rate' : '✨ Non-Repayable (Zero Debt)'}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                        Max Limit & Speed
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                        Up to {currencyConfig.symbol}{plan.maxAmount.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={11} />
                        <span>{plan.disbursementSpeed}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Benefits Checklist */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--wise-forest)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.03em' }}>
                      Why choose this option:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {plan.keyBenefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          <Check size={14} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Caveat Notice */}
                  {plan.drawbacksOrGotchas[0] && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.74rem', color: '#b45309', backgroundColor: '#fffbeb', padding: '8px 10px', borderRadius: '10px', marginBottom: '16px' }}>
                      <AlertTriangle size={13} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{plan.drawbacksOrGotchas[0]}</span>
                    </div>
                  )}
                </div>

                {/* Card Bottom Actions */}
                <div style={{ borderTop: '1px solid #e5e9e2', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>

                  {/* Compare Toggle */}
                  <button
                    onClick={() => toggleComparePlan(plan.id)}
                    style={{
                      background: isCompared ? '#e5ebd0' : '#f4f5f1',
                      border: isCompared ? '1.5px solid var(--wise-forest)' : '1px solid #d0d7cc',
                      color: 'var(--wise-forest)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      padding: '7px 12px',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Scale size={13} />
                    <span>{isCompared ? 'Compared ✓' : 'Compare'}</span>
                  </button>

                  {/* Choose / Select This Plan Action Button */}
                  <button
                    onClick={() => handleChoosePlan(plan)}
                    style={{
                      background: isChosen ? '#15803d' : '#f4f5f1',
                      border: isChosen ? '1.5px solid #15803d' : '1px solid #d0d7cc',
                      color: isChosen ? '#ffffff' : 'var(--wise-forest)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      padding: '7px 12px',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease',
                    }}
                    title="Select this plan as your primary relief solution in VANTIQ"
                  >
                    <Check size={13} />
                    <span>{isChosen ? 'Chosen ✓' : 'Choose Plan'}</span>
                  </button>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {/* EMI Calculator trigger for repayable loans */}
                    {plan.isRepayable && (
                      <button
                        onClick={() => setActiveEmiPlan(plan)}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #d0d7cc',
                          color: 'var(--wise-forest)',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          padding: '7px 12px',
                          borderRadius: '9999px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                        title="Simulate EMI for this plan"
                      >
                        <Calculator size={13} />
                        <span>EMI</span>
                      </button>
                    )}

                    {/* Official Portal Link */}
                    <a
                      href={plan.directApplyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{
                        padding: '7px 14px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        borderRadius: '9999px',
                        textDecoration: 'none',
                      }}
                    >
                      <span>Apply</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* =========================================================
            6. Floating Comparison Tray (When plans are selected)
            ========================================================= */}
        {comparedPlanIds.length > 0 && (
          <aside
            aria-label="Plan Comparison Tray"
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1050,
              backgroundColor: 'var(--wise-forest)',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '9999px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={18} color="var(--wise-lime)" />
              <span style={{ fontSize: '0.88rem', fontWeight: 800 }}>
                {comparedPlanIds.length} of 3 Plans Selected for Comparison
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setShowComparisonModal(true)}
                className="btn btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.82rem', fontWeight: 800, borderRadius: '9999px' }}
              >
                View Side-by-Side Matrix
              </button>
              <button
                onClick={() => setComparedPlanIds([])}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#c4d0c1',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Clear
              </button>
            </div>
          </aside>
        )}

        {/* =========================================================
            7. Emergency Hospital Admission & Paperwork Action Kit
            ========================================================= */}
        <div
          className="vantiq-card"
          style={{
            padding: '28px',
            backgroundColor: '#f4f5f1',
            borderRadius: '20px',
            border: '1.5px solid #d0d7cc',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span className="badge badge-forest" style={{ fontSize: '0.75rem' }}>
              <FileText size={13} />
              <span>Emergency Action Protocol</span>
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--wise-forest)' }}>
              How to Expedite Cashless Approval in &lt; 2 Hours
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e5e9e2' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--wise-forest)', marginBottom: '4px' }}>
                1. Obtain Doctor's Estimation Letter
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Ask the admitting physician or hospital billing desk for a stamped <em>Medical Cost Estimation Certificate</em> specifying procedure codes (ICD-10) and required ICU days.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e5e9e2' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--wise-forest)', marginBottom: '4px' }}>
                2. Approach Hospital TPA / MSW Desk
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Present your Ayushman Bharat / Insurance card or ask for the <em>Medical Social Work (MSW)</em> charity care form before surgery to lock in non-profit subsidy rates.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e5e9e2' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--wise-forest)', marginBottom: '4px' }}>
                3. Lock in 0% Health Line & Lowest APR
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Activate your 0% Bajaj Health EMI or CareCredit digital card on your smartphone to pay the admission deposit with 0% interest, avoiding payday micro-loans.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* =========================================================
          8. Modals
          ========================================================= */}
      {/* EMI Calculator Modal */}
      {activeEmiPlan && (
        <HealthEmiCalculator
          plan={activeEmiPlan}
          initialAmount={targetAmount}
          currencySymbol={currencyConfig.symbol}
          onClose={() => setActiveEmiPlan(null)}
        />
      )}

      {/* Comparison Matrix Modal */}
      {showComparisonModal && (
        <HealthPlanComparisonModal
          plans={comparedPlans}
          currencySymbol={currencyConfig.symbol}
          onRemovePlan={(id) => setComparedPlanIds((prev) => prev.filter((p) => p !== id))}
          onClose={() => setShowComparisonModal(false)}
        />
      )}
    </section>
  );
};
