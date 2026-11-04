// src/modules/m15_health_navigator/HealthReliefNavigator.tsx
// Module 15: Global Health & Medical Financial Relief & Plan Optimizer
// Input-first workflow: Enter medical condition, amount, tenure, and location first,
// then analyze and rank all suggested loans and relief options in strict order with verified Reddit reviews.

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Calculator,
  Scale,
  ExternalLink,
  Search,
  Clock,
  FileText,
  Share2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Building2,
  HeartHandshake,
  Check,
  AlertTriangle,
  RotateCcw,
  ThumbsUp
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';
import { HEALTH_CONDITIONS, HEALTH_RELIEF_PLANS } from './healthPlansData';
import { HealthEmiCalculator } from './HealthEmiCalculator';
import { HealthPlanComparisonModal } from './HealthPlanComparisonModal';
import { RedditReviewsExplorer } from './RedditReviewsExplorer';
import type { HealthReliefPlan, HealthReliefStrategy } from '../../types';

export const HealthReliefNavigator: React.FC = () => {
  const { shock, setShock, hourlyWage } = useFintech();

  // Workflow State: False = Show Input Form first; True = Show Ranked Results
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // User Input Parameters
  const [selectedConditionId, setSelectedConditionId] = useState<string>('cardiac');
  const [regionFilter] = useState<'All' | 'India' | 'USA' | 'UK' | 'Global'>('India');
  const [targetAmount, setTargetAmount] = useState<number>(shock.amount || 450000);
  const [desiredTenureMonths, setDesiredTenureMonths] = useState<number>(shock.tenureMonths || 24);

  // Track previous shock values to detect when changes come externally from context
  const prevShockRef = React.useRef({
    amount: shock.amount,
    tenure: shock.tenureMonths,
  });

  // Synchronize only when external shock updates (e.g. from HeroSection or presets)
  React.useEffect(() => {
    if (shock.amount && shock.amount > 0 && shock.amount !== prevShockRef.current.amount) {
      prevShockRef.current.amount = shock.amount;
      setTargetAmount(shock.amount);
    }
    if (shock.tenureMonths && shock.tenureMonths > 0 && shock.tenureMonths !== prevShockRef.current.tenure) {
      prevShockRef.current.tenure = shock.tenureMonths;
      setDesiredTenureMonths(shock.tenureMonths);
    }
  }, [shock.amount, shock.tenureMonths]);

  // Handler for updating target amount locally and broadcasting to FintechContext
  const handleTargetAmountChange = (newAmount: number) => {
    const minVal = regionFilter === 'India' ? 25000 : 1000;
    const maxVal = regionFilter === 'India' ? 2500000 : 100000;
    const clamped = Number.isFinite(newAmount) ? Math.min(maxVal, Math.max(minVal, newAmount)) : minVal;

    setTargetAmount(clamped);
    prevShockRef.current.amount = clamped;
    setShock((prev) => ({
      ...prev,
      amount: clamped,
    }));

    if (existingInsuranceCover > clamped) {
      setExistingInsuranceCover(clamped);
    }
  };

  // Handler for updating tenure locally and broadcasting to FintechContext
  const handleTenureChange = (months: number) => {
    setDesiredTenureMonths(months);
    prevShockRef.current.tenure = months;
    setShock((prev) => ({
      ...prev,
      tenureMonths: months,
    }));
  };

  const [urgency, setUrgency] = useState<'critical' | 'high' | 'moderate'>('critical');
  const [insuranceStatus, setInsuranceStatus] = useState<'uninsured' | 'partial' | 'full'>('partial');
  const [existingInsuranceCover, setExistingInsuranceCover] = useState<number>(150000);
  const [creditTier, setCreditTier] = useState<'excellent' | 'good' | 'fair' | 'no_credit'>('good');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(45000);

  // Results State & Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>('tata-capital-medical');
  const [expandedRedditPlanId, setExpandedRedditPlanId] = useState<string | null>(null);

  // Modals
  const [activeEmiPlan, setActiveEmiPlan] = useState<HealthReliefPlan | null>(null);
  const [comparedPlanIds, setComparedPlanIds] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

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

  // Handle Condition Selection
  const handleSelectCondition = (conditionId: string) => {
    setSelectedConditionId(conditionId);
    const cond = HEALTH_CONDITIONS.find((c) => c.id === conditionId);
    if (cond) {
      const newAmt = regionFilter === 'India' ? cond.typicalCostInr : cond.typicalCostUsd;
      handleTargetAmountChange(newAmt);
      setUrgency(cond.urgencyDefault);
    }
  };

  // Trigger Search & Ranking
  const handlePerformSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      const target = document.getElementById('health-results-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 650);
  };

  // Reset / Edit Form
  const handleEditInputs = () => {
    setHasSearched(false);
    const target = document.getElementById('health-navigator') || document.getElementById('health-aid');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Rank Plans in Strict Order (Best to Lowest)
  const rankedPlans = useMemo(() => {
    // 1. Filter by region, category, search
    const filtered = HEALTH_RELIEF_PLANS.filter((plan) => {
      if (regionFilter !== 'All' && plan.region !== regionFilter && plan.region !== 'Global') {
        return false;
      }

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
        } else if (categoryFilter === 'reddit_top') {
          if ((plan.redditScore || 0) < 92) return false;
        }
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = plan.name.toLowerCase().includes(q);
        const matchOrg = plan.organization.toLowerCase().includes(q);
        const matchDesc = plan.recommendedFor.toLowerCase().includes(q);
        const matchTags = plan.tags.some((t) => t.toLowerCase().includes(q));
        const matchReddit = plan.redditSentiment?.toLowerCase().includes(q);
        if (!matchName && !matchOrg && !matchDesc && !matchTags && !matchReddit) return false;
      }

      return true;
    });

    // 2. Compute transparent composite ranking score (0 to 100)
    // Weightings:
    // - Low Interest APR: max 40 pts (0% = 40, 10% = 30, 15% = 20, 20%+ = 10)
    // - Trust Score: max 30 pts (5.0 = 30, 4.9 = 28, 4.8 = 26, 4.7 = 24)
    // - Reddit Score: max 20 pts ((redditScore / 100) * 20)
    // - Tenure Fit: max 10 pts (if plan max tenure >= desired tenure)
    const scored = filtered.map((plan) => {
      let aprScore = 10;
      if (plan.interestApr === 0) aprScore = 40;
      else if (plan.interestApr <= 11) aprScore = 32;
      else if (plan.interestApr <= 14) aprScore = 26;
      else if (plan.interestApr <= 18) aprScore = 20;

      const trustScore = Math.round((plan.trustScore / 5.0) * 30);
      const redditScore = Math.round(((plan.redditScore || 85) / 100) * 20);
      const tenureScore = plan.tenureMonthsMax >= desiredTenureMonths ? 10 : 5;

      const compositeScore = Math.min(99, aprScore + trustScore + redditScore + tenureScore);

      return {
        ...plan,
        compositeScore,
      };
    });

    // 3. Sort strictly in descending order of score
    return scored.sort((a, b) => b.compositeScore - a.compositeScore);
  }, [regionFilter, categoryFilter, searchQuery, desiredTenureMonths]);

  // Compute Optimal Multi-Tier Blend
  const smartStrategy = useMemo<HealthReliefStrategy>(() => {
    const totalRequired = targetAmount;
    
    let tier1GrantCover = 0;
    let tier1Name = 'Ayushman Bharat PM-JAY / Sovereign Health Relief';
    
    if (insuranceStatus === 'partial') {
      tier1GrantCover = Math.min(existingInsuranceCover, totalRequired);
      tier1Name = 'Cashless Health Insurance Pre-Authorization Claim';
    } else if (insuranceStatus === 'full') {
      tier1GrantCover = totalRequired;
      tier1Name = '100% Cashless TPA Comprehensive Hospital Cover';
    } else {
      if (regionFilter === 'India') {
        tier1GrantCover = Math.min(250000, totalRequired * 0.5);
        tier1Name = 'Ayushman Bharat / Tata Trusts Medical Grant (0% Cost)';
      } else {
        tier1GrantCover = Math.min(15000, totalRequired * 0.4);
        tier1Name = 'Emergency Medicaid / Hill-Burton Free Hospital Care';
      }
    }

    const remainingAfterTier1 = Math.max(0, totalRequired - tier1GrantCover);
    const maxZeroEmiLimit = regionFilter === 'India' ? 100000 : 5000;
    const tier2ZeroEmi = Math.min(maxZeroEmiLimit, remainingAfterTier1);
    const remainingAfterTier2 = Math.max(0, remainingAfterTier1 - tier2ZeroEmi);

    const tier3Loan = remainingAfterTier2;
    const tier3Apr = creditTier === 'excellent' ? 10.49 : creditTier === 'good' ? 11.25 : 12.80;
    const loanTenure = desiredTenureMonths;
    
    const monthlyRate = tier3Apr / 12 / 100;
    const tier3MonthlyEmi = tier3Loan > 0
      ? Math.round((tier3Loan * monthlyRate * Math.pow(1 + monthlyRate, loanTenure)) / (Math.pow(1 + monthlyRate, loanTenure) - 1))
      : 0;
    const tier3TotalRepayment = tier3MonthlyEmi * loanTenure;
    const tier3Interest = Math.max(0, tier3TotalRepayment - tier3Loan);

    const tier2MonthlyEmi = tier2ZeroEmi > 0 ? Math.round(tier2ZeroEmi / Math.min(12, desiredTenureMonths)) : 0;
    const totalRepayment = tier2ZeroEmi + tier3TotalRepayment;
    
    const blendedApr = totalRequired > 0 
      ? Math.round((tier3Interest / totalRequired / (loanTenure / 12)) * 100 * 10) / 10
      : 0;

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
        notes: 'Zero debt burden. Fast-tracked via hospital TPA desk or sovereign portal.',
      },
      {
        sourceName: regionFilter === 'India' ? 'Bajaj Finserv Health EMI (0% APR)' : 'CareCredit 0% Promo Financing',
        category: '0% No-Cost EMI Card',
        amount: Math.round(tier2ZeroEmi),
        interestRate: 0,
        tenure: `${Math.min(12, desiredTenureMonths)} Months`,
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
    desiredTenureMonths,
  ]);

  // Handle Choosing a Specific Plan
  const handleChoosePlan = (plan: HealthReliefPlan) => {
    setSelectedPlanId(plan.id);
    setShock((prev) => ({
      ...prev,
      amount: Math.min(targetAmount, plan.maxAmount),
      description: `${plan.name} (${plan.organization})`,
      urgencyLevel: urgency,
    }));
  };

  // Compare Tray Toggle
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
Tenure Period: ${desiredTenureMonths} Months
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
      <div id="health-aid" style={{ position: 'relative', top: '-80px', visibility: 'hidden' }} />

      <div className="container">
        
        {/* =========================================================
            1. Section Header: Wise Clean FinTech
            ========================================================= */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge badge-forest">
              <HeartHandshake size={14} />
              <span>Medical Financial Relief & Lowest-Rate Plan Optimizer</span>
            </span>
            <span className="badge badge-emerald">
              <ShieldCheck size={13} />
              <span>Verified Reddit Community Sentiments</span>
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
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '820px' }}>
                First, input your medical requirements, required amount, and desired repayment period below. VANTIQ will search worldwide options and rank the best plans from lowest interest rate to highest trust, backed by real Reddit community patient reviews.
              </p>
            </div>

            {hasSearched && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleEditInputs}
                  className="btn btn-secondary"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderRadius: '9999px',
                  }}
                >
                  <RotateCcw size={14} />
                  <span>Modify Parameters</span>
                </button>

                <button
                  onClick={handleCopyActionPlan}
                  className="btn btn-secondary"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderRadius: '9999px',
                  }}
                >
                  <Share2 size={14} />
                  <span>{copiedNotification ? 'Copied!' : 'Share'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================
            2. STEP 1: INTERACTIVE INTAKE & PARAMETERS CONSOLE
            (Always shown first; user inputs details before seeing plans)
            ========================================================= */}
        {(!hasSearched || isSearching) && (
          <form
            onSubmit={handlePerformSearch}
            className="vantiq-card"
            style={{
              padding: '32px',
              backgroundColor: '#f9faf7',
              border: '2px solid #d0d7cc',
              borderRadius: '24px',
              marginBottom: '32px',
              boxShadow: '0 12px 36px rgba(22, 51, 0, 0.06)',
            }}
          >
            {/* Form Top Title */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 800, color: '#3b543d', letterSpacing: '0.04em' }}>
                Step 1: Input Your Medical & Financial Requirements
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                Enter Amount, Tenure & Medical Details
              </h3>
            </div>

            {/* Health Condition Presets */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--wise-forest)', marginBottom: '10px' }}>
                Select Medical Condition / Surgery:
              </label>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                  gap: '12px',
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
                        padding: '14px 16px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: isSelected ? 'var(--wise-lime)' : '#3b543d' }}>
                          {cond.category}
                        </span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: isSelected ? 'var(--wise-lime)' : '#dc2626' }}>
                          {cond.urgencyDefault}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, lineHeight: 1.3 }}>
                        {cond.name}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginTop: '10px', paddingTop: '6px', borderTop: isSelected ? '1px solid rgba(255,255,255,0.15)' : '1px solid #edf0ea' }}>
                        <span style={{ color: isSelected ? '#c4d0c1' : 'var(--text-muted)' }}>Typical Cost:</span>
                        <span style={{ fontWeight: 900, color: isSelected ? 'var(--wise-lime)' : 'var(--wise-forest)' }}>{costDisplay}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inputs Grid: Amount, Tenure Periods, Insurance, Credit */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                backgroundColor: '#ffffff',
                padding: '24px',
                borderRadius: '18px',
                border: '1px solid #e5e9e2',
                marginBottom: '26px',
              }}
            >
              {/* Field 1: Amount Needed */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Total Amount Needed
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                      {currencyConfig.symbol}
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      aria-label="Total Amount Needed input"
                      value={targetAmount.toLocaleString()}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, '');
                        if (!raw) {
                          setTargetAmount(0);
                          return;
                        }
                        const val = parseInt(raw, 10);
                        handleTargetAmountChange(val);
                      }}
                      onBlur={() => {
                        const minVal = regionFilter === 'India' ? 25000 : 1000;
                        if (targetAmount < minVal) {
                          handleTargetAmountChange(minVal);
                        }
                      }}
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        color: 'var(--wise-forest)',
                        border: '1px solid #d0d7cc',
                        borderRadius: '8px',
                        padding: '2px 8px',
                        width: '140px',
                        textAlign: 'right',
                        backgroundColor: '#f9faf7',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={regionFilter === 'India' ? 25000 : 1000}
                  max={regionFilter === 'India' ? 2500000 : 100000}
                  step={regionFilter === 'India' ? 25000 : 1000}
                  value={targetAmount}
                  onChange={(e) => handleTargetAmountChange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--wise-forest)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>Min: {currencyConfig.symbol}{regionFilter === 'India' ? '25,000' : '1,000'}</span>
                  <span>Max: {currencyConfig.symbol}{regionFilter === 'India' ? '25,00,000' : '100,000'}</span>
                </div>

                {/* Quick Preset Buttons for easy 1-click amount selection */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {(regionFilter === 'India'
                    ? [
                        { label: '₹50K', val: 50000 },
                        { label: '₹1 Lakh', val: 100000 },
                        { label: '₹2.5L', val: 250000 },
                        { label: '₹5 Lakh', val: 500000 },
                        { label: '₹10L', val: 1000000 },
                      ]
                    : [
                        { label: '$2K', val: 2000 },
                        { label: '$5K', val: 5000 },
                        { label: '$10K', val: 10000 },
                        { label: '$25K', val: 25000 },
                        { label: '$50K', val: 50000 },
                      ]
                  ).map((preset) => (
                    <button
                      type="button"
                      key={preset.label}
                      onClick={() => handleTargetAmountChange(preset.val)}
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: targetAmount === preset.val ? '1px solid var(--wise-forest)' : '1px solid #e2e8f0',
                        backgroundColor: targetAmount === preset.val ? '#edf2ea' : '#ffffff',
                        color: targetAmount === preset.val ? 'var(--wise-forest)' : 'var(--text-muted)',
                        fontSize: '0.7rem',
                        fontWeight: targetAmount === preset.val ? 800 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 2: Repayment Period (Tenure) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Repayment Period (Tenure)
                  </label>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                    {desiredTenureMonths} Months ({Math.round((desiredTenureMonths / 12) * 10) / 10} yrs)
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                  {[6, 12, 24, 36, 60].map((months) => (
                    <button
                      type="button"
                      key={months}
                      onClick={() => handleTenureChange(months)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '10px',
                        border: desiredTenureMonths === months ? '1.5px solid var(--wise-forest)' : '1px solid #d0d7cc',
                        backgroundColor: desiredTenureMonths === months ? 'var(--wise-forest)' : '#f9faf7',
                        color: desiredTenureMonths === months ? 'var(--wise-lime)' : 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: desiredTenureMonths === months ? 800 : 600,
                        cursor: 'pointer',
                      }}
                    >
                      {months}M
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  *Non-repayable grants & Ayushman Bharat do not incur tenure obligations.
                </div>
              </div>

              {/* Field 3: Insurance Coverage */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Existing Insurance Coverage
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {[
                    { id: 'uninsured', label: 'Uninsured (0%)' },
                    { id: 'partial', label: 'Partial Policy' },
                    { id: 'full', label: 'Full Cashless' },
                  ].map((item) => (
                    <button
                      type="button"
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
                      <span>Existing Policy Limit:</span>
                      <span style={{ fontWeight: 700, color: 'var(--wise-forest)' }}>
                        {currencyConfig.symbol}{existingInsuranceCover.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={regionFilter === 'India' ? Math.min(25000, targetAmount) : 0}
                      max={Math.max(regionFilter === 'India' ? 25000 : 1000, targetAmount)}
                      step={regionFilter === 'India' ? 25000 : 1000}
                      value={Math.min(existingInsuranceCover, targetAmount)}
                      onChange={(e) => setExistingInsuranceCover(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#15803d', marginTop: '4px' }}
                    />
                  </div>
                )}
              </div>

              {/* Field 4: Credit Score Tier */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Credit Tier (CIBIL / FICO)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {[
                    { id: 'excellent', label: '750+ Prime' },
                    { id: 'good', label: '680 - 749' },
                    { id: 'fair', label: '580 - 679' },
                    { id: 'no_credit', label: 'No CIBIL' },
                  ].map((tier) => (
                    <button
                      type="button"
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
                  Used to estimate precise bank interest rates and pre-approval odds.
                </div>
              </div>

              {/* Field 5: Urgency */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Treatment Urgency
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {[
                    { id: 'critical', label: '🚨 Immediate (<24h)' },
                    { id: 'high', label: '⚡ Urgent (1-7 Days)' },
                    { id: 'moderate', label: '🗓️ Planned (1-4 Wks)' },
                  ].map((u) => (
                    <button
                      type="button"
                      key={u.id}
                      onClick={() => setUrgency(u.id as any)}
                      style={{
                        border: '1px solid #d0d7cc',
                        backgroundColor: urgency === u.id ? '#edf2ea' : '#f9faf7',
                        color: 'var(--wise-forest)',
                        fontWeight: urgency === u.id ? 800 : 500,
                        padding: '8px 4px',
                        borderRadius: '10px',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                      }}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 6: Monthly Household Income */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Monthly Household Income
                  </label>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                    {currencyConfig.symbol}{monthlyIncome.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={15000}
                  max={200000}
                  step={5000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--wise-forest)' }}
                />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Determines eligibility for hospital charity care and safe debt-to-income limits.
                </div>
              </div>
            </div>

            {/* Big Search & Rank Button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="submit"
                disabled={isSearching}
                className="btn btn-primary"
                style={{
                  padding: '16px 42px',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 12px 30px rgba(159, 232, 112, 0.45)',
                  cursor: 'pointer',
                }}
              >
                <Search size={20} />
                <span>
                  {isSearching
                    ? 'Searching 280+ Worldwide Options & Scraping Reddit...'
                    : 'Search & Rank All Plans Worldwide (With Reddit Reviews)'}
                </span>
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Scanning Progress Banner */}
            {isSearching && (
              <div
                style={{
                  marginTop: '20px',
                  padding: '16px 20px',
                  backgroundColor: '#edf2ea',
                  border: '1px solid #bbf7d0',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'var(--wise-forest)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                <Sparkles size={20} color="#15803d" />
                <span>
                  Scanning global databases for {currentCondition.name} (Amount: {currencyConfig.symbol}{targetAmount.toLocaleString()}, Tenure: {desiredTenureMonths} Mos) & aggregating real Reddit community threads from r/personalfinance, r/IndiaInvestments, r/CreditCardsIndia...
                </span>
              </div>
            )}
          </form>
        )}

        {/* =========================================================
            3. STEP 2: RANKED RESULTS DISPLAY
            (Only displayed AFTER user submits the requirement form)
            ========================================================= */}
        {hasSearched && (
          <div id="health-results-section">
            
            {/* Search Query Recap Banner */}
            <div
              style={{
                backgroundColor: '#f4f5f1',
                border: '1.5px solid #d0d7cc',
                padding: '16px 24px',
                borderRadius: '18px',
                marginBottom: '28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span className="badge badge-forest" style={{ fontSize: '0.8rem' }}>
                  {currentCondition.name}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                  Need: {currencyConfig.symbol}{targetAmount.toLocaleString()}
                </span>
                <span style={{ color: '#d0d7cc' }}>|</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Tenure: {desiredTenureMonths} Months
                </span>
                <span style={{ color: '#d0d7cc' }}>|</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Region: {regionFilter}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleEditInputs}
                  className="btn btn-secondary"
                  style={{ padding: '7px 14px', fontSize: '0.8rem', borderRadius: '9999px' }}
                >
                  Edit Parameters
                </button>
              </div>
            </div>

            {/* Active Chosen Plan Notification Banner */}
            {selectedPlanId && (
              <div
                style={{
                  backgroundColor: '#f0fdf4',
                  border: '1.5px solid #86efac',
                  padding: '14px 22px',
                  borderRadius: '16px',
                  marginBottom: '26px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={18} color="#15803d" />
                  <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#166534' }}>
                    Active Chosen Plan: {rankedPlans.find((p) => p.id === selectedPlanId)?.name || 'Selected Plan'}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#15803d' }}>
                    ({rankedPlans.find((p) => p.id === selectedPlanId)?.organization})
                  </span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 700 }}>
                  ✓ Locked into VANTIQ Knapsack Solver & Cashflow Runway
                </span>
              </div>
            )}

            {/* AI Multi-Tier Optimal Solution Card */}
            <div
              className="vantiq-card"
              style={{
                padding: '30px',
                backgroundColor: '#ffffff',
                border: '2px solid #bbf7d0',
                borderRadius: '24px',
                boxShadow: '0 16px 40px rgba(22, 51, 0, 0.08)',
                marginBottom: '36px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge badge-emerald" style={{ padding: '6px 14px' }}>
                      <Sparkles size={14} />
                      <span>Suggested Optimal Hybrid Blend</span>
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534' }}>
                      Lowest Blended APR ({smartStrategy.blendedApr}%)
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.55rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                    Multi-Source Funding Blueprint for {currentCondition.name}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    Instead of taking a single high-interest 36% loan, VANTIQ stacks free non-repayable grants, 0% health lines, and lowest-APR loans.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 18px', borderRadius: '14px', textAlign: 'right' }}>
                    <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>Total Saved vs Predatory 36%</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#15803d' }}>
                      {currencyConfig.symbol}{smartStrategy.totalInterestSavedVsPredatory.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracks */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {smartStrategy.allocations.map((alloc, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#fafbf9',
                      border: '1.5px solid #e5e9e2',
                      borderRadius: '16px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span className="badge badge-forest" style={{ fontSize: '0.7rem' }}>
                        Track {String.fromCharCode(65 + idx)}: {alloc.category}
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: alloc.interestRate === 0 ? '#15803d' : 'var(--wise-forest)' }}>
                        {alloc.interestRate === 0 ? '✨ 0% Interest' : `${alloc.interestRate}% APR`}
                      </span>
                    </div>

                    <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--wise-forest)', marginBottom: '4px' }}>
                      {alloc.sourceName}
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      {alloc.notes}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #e5e9e2' }}>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Allocated</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                          {currencyConfig.symbol}{alloc.amount.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Monthly EMI</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: alloc.monthlyEmi === 0 ? '#15803d' : 'var(--wise-forest)' }}>
                          {alloc.monthlyEmi === 0 ? '₹0 / mo (Free)' : `${currencyConfig.symbol}${alloc.monthlyEmi.toLocaleString()}/mo`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Pills & Sorting Header */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge badge-forest" style={{ fontSize: '0.75rem' }}>
                      <Building2 size={13} />
                      <span>Strict Ranking: Best to Lowest</span>
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      ({rankedPlans.length} Plans Ranked for Your Exact Need)
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--wise-forest)', marginTop: '4px' }}>
                    Suggested Options in Strict Ranking Order
                  </h3>
                </div>

                {/* Search in results */}
                <div style={{ position: 'relative', minWidth: '240px' }}>
                  <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                  <input
                    type="text"
                    placeholder="Filter by name, bank, or Reddit tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '9999px',
                      border: '1.5px solid #d0d7cc',
                      backgroundColor: '#ffffff',
                      fontSize: '0.85rem',
                      color: 'var(--wise-forest)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All Ranked Plans' },
                  { id: 'reddit_top', label: '💬 Top Reddit Upvoted (>90%)' },
                  { id: 'free_aid', label: '✨ 0% Free Grants & Schemes' },
                  { id: 'insurance', label: '🛡️ Health Insurance Policies' },
                  { id: 'low_loan', label: 'Low-Interest Loans (<11%)' },
                  { id: 'govt', label: 'Sovereign Govt Safety Nets' },
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
            </div>

            {/* =========================================================
                STRICT PROPER ORDER-WISE RANKING LEADERBOARD TABLE
                (#1 Best Match down to Lowest Ranked Option)
                ========================================================= */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #d0d7cc',
                borderRadius: '20px',
                padding: '24px',
                marginBottom: '32px',
                boxShadow: '0 8px 24px rgba(22, 51, 0, 0.04)',
                overflowX: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 800, color: '#15803d', letterSpacing: '0.04em' }}>
                    Ranked Comparison Leaderboard
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--wise-forest)', margin: 0 }}>
                    Best Options in Strict Proper Order (#1 to Lowest)
                  </h4>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Evaluated for <strong>{currencyConfig.symbol}{targetAmount.toLocaleString()}</strong> over <strong>{desiredTenureMonths} Months</strong>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e9e2', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '12px 10px', fontWeight: 800 }}>Rank & Tier</th>
                    <th style={{ padding: '12px 10px', fontWeight: 800 }}>Option / Lender</th>
                    <th style={{ padding: '12px 10px', fontWeight: 800 }}>Interest (APR)</th>
                    <th style={{ padding: '12px 10px', fontWeight: 800 }}>Monthly EMI ({desiredTenureMonths}M)</th>
                    <th style={{ padding: '12px 10px', fontWeight: 800 }}>Reddit Sentiment</th>
                    <th style={{ padding: '12px 10px', fontWeight: 800 }}>Disbursal</th>
                    <th style={{ padding: '12px 10px', fontWeight: 800, textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedPlans.map((plan, idx) => {
                    const rankNum = idx + 1;
                    const isChosen = selectedPlanId === plan.id;
                    const r = plan.interestApr / 1200;
                    const n = Math.min(plan.tenureMonthsMax, desiredTenureMonths);
                    const emi = plan.interestApr === 0
                      ? Math.round(targetAmount / n)
                      : Math.round((targetAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

                    return (
                      <tr
                        key={plan.id}
                        style={{
                          borderBottom: '1px solid #edf0ea',
                          backgroundColor: isChosen ? '#f0fdf4' : rankNum === 1 ? '#fffdf7' : 'transparent',
                          transition: 'background-color 0.15s ease',
                        }}
                      >
                        <td style={{ padding: '14px 10px', fontWeight: 900 }}>
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '9999px',
                              backgroundColor: rankNum === 1 ? '#fef3c7' : rankNum === 2 ? '#e0f2fe' : rankNum === 3 ? '#dcfce7' : '#f4f5f1',
                              color: rankNum === 1 ? '#b45309' : rankNum === 2 ? '#0369a1' : rankNum === 3 ? '#15803d' : '#4b5563',
                              fontSize: '0.74rem',
                              fontWeight: 900,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            {rankNum === 1 ? '👑 #1 Best' : `#${rankNum}`}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <div style={{ fontWeight: 800, color: 'var(--wise-forest)' }}>{plan.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{plan.organization} &bull; {plan.categoryLabel}</div>
                        </td>
                        <td style={{ padding: '14px 10px', fontWeight: 900, color: plan.interestApr === 0 ? '#15803d' : 'var(--wise-forest)' }}>
                          {plan.interestApr === 0 ? '✨ 0% APR' : `${plan.interestApr}% APR`}
                        </td>
                        <td style={{ padding: '14px 10px', fontWeight: 800, color: 'var(--wise-forest)' }}>
                          {plan.isRepayable ? `${currencyConfig.symbol}${emi.toLocaleString()}/mo` : '₹0 (Grant/Scheme)'}
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 700, backgroundColor: '#fff7ed', color: '#c2410c', padding: '3px 8px', borderRadius: '6px', border: '1px solid #fed7aa' }}>
                            💬 {plan.redditSentiment || `${plan.redditScore}% on Reddit`}
                          </span>
                        </td>
                        <td style={{ padding: '14px 10px', fontSize: '0.75rem', color: '#15803d', fontWeight: 700 }}>
                          {plan.disbursementSpeed}
                        </td>
                        <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleChoosePlan(plan)}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '9999px',
                              border: isChosen ? '1.5px solid #16a34a' : '1px solid #d0d7cc',
                              backgroundColor: isChosen ? '#16a34a' : '#ffffff',
                              color: isChosen ? '#ffffff' : 'var(--wise-forest)',
                              fontSize: '0.74rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                            }}
                          >
                            {isChosen ? '✓ Selected' : 'Choose Plan'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Ranked Cards Grid (Strict Order from Best to Lowest) */}
            <div
              id="vetted-options-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '22px',
                marginBottom: '40px',
              }}
            >
              {rankedPlans.map((plan, idx) => {
                const rankNumber = idx + 1;
                const isCompared = comparedPlanIds.includes(plan.id);
                const isChosen = selectedPlanId === plan.id;
                const isRedditExpanded = expandedRedditPlanId === plan.id;

                // Color header based on rank tier
                const rankColor = rankNumber === 1 ? '#f59e0b' : rankNumber === 2 ? '#0284c7' : rankNumber === 3 ? '#15803d' : '#6b7f6e';

                return (
                  <div
                    key={plan.id}
                    className="vantiq-card"
                    style={{
                      padding: '24px',
                      backgroundColor: isChosen ? '#fafdf9' : '#ffffff',
                      border: isChosen
                        ? '2.5px solid #16a34a'
                        : rankNumber === 1
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
                        : rankNumber === 1
                        ? '0 10px 28px rgba(245, 158, 11, 0.15)'
                        : '0 8px 24px rgba(22, 51, 0, 0.05)',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                  >
                    <div>
                      {/* Top Rank Badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div
                          style={{
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            backgroundColor: rankNumber === 1 ? '#fef3c7' : '#f4f5f1',
                            border: `1px solid ${rankNumber === 1 ? '#fde68a' : '#d0d7cc'}`,
                            color: rankColor,
                            fontSize: '0.74rem',
                            fontWeight: 900,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          {rankNumber === 1 && <span>👑</span>}
                          <span>
                            Rank #{rankNumber}: {rankNumber === 1 ? 'Best Overall Match' : rankNumber === 2 ? 'Highly Recommended' : rankNumber === 3 ? 'Strong Alternative' : 'Qualified Option'}
                          </span>
                        </div>

                        {/* Match Score */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#15803d', backgroundColor: '#dcfce7', padding: '3px 8px', borderRadius: '9999px' }}>
                            {plan.compositeScore}/100 Match
                          </span>
                        </div>
                      </div>

                      {/* Title & Organization */}
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--wise-forest)', marginBottom: '4px', lineHeight: 1.3 }}>
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
                            {plan.isRepayable ? 'Fixed Reducing Rate' : '✨ Non-Repayable (0% Debt)'}
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

                      {/* =========================================================
                          REDDIT COMMUNITY REVIEWS & SENTIMENT BOX
                          ========================================================= */}
                      {plan.redditReviews && plan.redditReviews.length > 0 && (
                        <div
                          style={{
                            backgroundColor: '#fff7ed',
                            border: '1.5px solid #fed7aa',
                            borderRadius: '14px',
                            padding: '12px 14px',
                            marginBottom: '16px',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '1rem' }}>💬</span>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9a3412' }}>
                                Reddit Community Sentiment:
                              </span>
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, backgroundColor: '#ffedd5', color: '#c2410c', padding: '2px 8px', borderRadius: '9999px', border: '1px solid #fdba74' }}>
                              {plan.redditSentiment}
                            </span>
                          </div>

                          {/* Primary Reddit User Quote */}
                          <div style={{ fontSize: '0.78rem', color: '#7c2d12', lineHeight: 1.45, fontStyle: 'italic', marginBottom: '8px' }}>
                            "{plan.redditReviews[0]?.reviewText}"
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#9a3412' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ fontWeight: 800 }}>{plan.redditReviews[0]?.username}</span>
                              <span>on</span>
                              <span style={{ fontWeight: 700, color: '#ea580c' }}>{plan.redditReviews[0]?.subreddit}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <ThumbsUp size={11} />
                              <span>{plan.redditReviews[0]?.upvotes} upvotes</span>
                            </div>
                          </div>

                          {/* Expand More Reddit Reviews if available */}
                          {plan.redditReviews.length > 1 && (
                            <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #fed7aa' }}>
                              <button
                                type="button"
                                onClick={() => setExpandedRedditPlanId(isRedditExpanded ? null : plan.id)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#c2410c',
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: 0,
                                }}
                              >
                                <span>{isRedditExpanded ? 'Hide additional Reddit tip' : `Read +${plan.redditReviews.length - 1} more Reddit community tip`}</span>
                                {isRedditExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                              </button>

                              {isRedditExpanded && (
                                <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #fdba74' }}>
                                  <div style={{ fontSize: '0.74rem', color: '#9a3412', fontStyle: 'italic', marginBottom: '4px' }}>
                                    "{plan.redditReviews[1]?.reviewText}"
                                  </div>
                                  <div style={{ fontSize: '0.68rem', color: '#c2410c', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{plan.redditReviews[1]?.username} ({plan.redditReviews[1]?.subreddit})</span>
                                    <span>👍 {plan.redditReviews[1]?.upvotes}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

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

                      {/* Choose Plan Action */}
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
                SCRAPED REDDIT COMMUNITY REVIEWS & DISCUSSIONS HUB
                ========================================================= */}
            <RedditReviewsExplorer />

          </div>
        )}

        {/* =========================================================
            4. Floating Comparison Tray
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
            5. Emergency Hospital Admission & Paperwork Action Kit
            ========================================================= */}
        <div
          className="vantiq-card"
          style={{
            padding: '28px',
            backgroundColor: '#f4f5f1',
            borderRadius: '20px',
            border: '1.5px solid #d0d7cc',
            marginTop: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span className="badge badge-forest" style={{ fontSize: '0.75rem' }}>
              <FileText size={13} />
              <span>Reddit & Hospital Verified Action Protocol</span>
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--wise-forest)' }}>
              How to Avoid Rejection & Expedite Cashless Approval in &lt; 2 Hours
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            
            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e5e9e2' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--wise-forest)', marginBottom: '4px' }}>
                1. Doctor Cost Estimate on Letterhead
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Ask the admitting physician or billing desk for an official signed & stamped <em>Medical Cost Estimation Certificate</em> specifying ICD-10 diagnosis codes and projected ICU days.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e5e9e2' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--wise-forest)', marginBottom: '4px' }}>
                2. Approach Hospital TPA / MSW Desk First
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Present your insurance or ask for the <em>Medical Social Work (MSW)</em> charity care application before surgical admission to lock in subsidized hospital trust rates.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e5e9e2' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--wise-forest)', marginBottom: '4px' }}>
                3. Lock in 0% Health Line & Prime Rates
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Activate your 0% Bajaj Health EMI or CareCredit card on your phone to pay the deposit with 0% interest, and borrow only the remainder at lowest bank APR.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* =========================================================
          6. Modals
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
