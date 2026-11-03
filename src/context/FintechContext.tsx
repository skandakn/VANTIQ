// src/context/FintechContext.tsx
// Reactive State Hub for VANTIQ
// Allows specialized modular components to communicate in real-time.

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { 
  FinancialProfile, 
  EmergencyShock, 
  PredatoryOffer, 
  FundingPlanResult,
  CashflowRunwayPoint
} from '../types';

export interface NeuroShieldState {
  isShieldActive: boolean;
  panicScore: number;
  timerSecondsRemaining: number;
  isEmergencyBypassed: boolean;
  lifeEnergyHourlyWage?: number;
}

interface FintechContextType {
  profile: FinancialProfile;
  setProfile: React.Dispatch<React.SetStateAction<FinancialProfile>>;
  shock: EmergencyShock;
  setShock: React.Dispatch<React.SetStateAction<EmergencyShock>>;
  predatoryOffers: PredatoryOffer[];
  fundingPlan: FundingPlanResult;
  quantumResult: FundingPlanResult;
  runwayData: CashflowRunwayPoint[];
  hourlyWage: number;
  neuroState: NeuroShieldState;
  setNeuroState: React.Dispatch<React.SetStateAction<NeuroShieldState>>;
  triggerNeuroShield: () => void;
  bypassNeuroShield: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  activeFeature: string;
  setActiveFeature: React.Dispatch<React.SetStateAction<string>>;
  navigateToFeature: (featureId: string) => void;
}

const defaultProfile: FinancialProfile = {
  monthlyIncome: 40000,
  existingEmi: 8000,
  houseRent: 7000,
  livingExpenses: 10000,
  emergencySavings: 5000,
  absorptiveSurplus: 15000, // 40000 - (8000 + 7000 + 10000)
};

const defaultShock: EmergencyShock = {
  amount: 50000,
  category: 'medical',
  description: 'Urgent Hospital Surgery & Medication Deposit',
  urgencyLevel: 'critical',
  daysToDisbursement: 1,
};

const defaultOffers: PredatoryOffer[] = [
  {
    id: 'app-1',
    lenderName: 'QuickRupee Instant Pay',
    offeredLimit: 20000,
    interestApr: 36,
    processingFeePercent: 4.5,
    tenureMonths: 3,
    monthlyEmi: 7120,
    defaultCollisionDay: 30,
    appType: 'Instant Micro-Loan',
  },
  {
    id: 'app-2',
    lenderName: 'SplitNow BNPL',
    offeredLimit: 15000,
    interestApr: 28,
    processingFeePercent: 3.0,
    tenureMonths: 3,
    monthlyEmi: 5240,
    defaultCollisionDay: 32,
    appType: 'BNPL Split',
  },
  {
    id: 'app-3',
    lenderName: 'ApexCard Cash Advance',
    offeredLimit: 30000,
    interestApr: 42,
    processingFeePercent: 5.0,
    tenureMonths: 6,
    monthlyEmi: 5640,
    defaultCollisionDay: 35,
    appType: 'Credit Card Advance',
  },
  {
    id: 'app-4',
    lenderName: 'FastSalary 24x7',
    offeredLimit: 10000,
    interestApr: 48,
    processingFeePercent: 6.0,
    tenureMonths: 2,
    monthlyEmi: 5400,
    defaultCollisionDay: 15,
    appType: 'Payday App',
  },
];

const FintechContext = createContext<FintechContextType | undefined>(undefined);

export const FintechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<FinancialProfile>(defaultProfile);
  const [shock, setShock] = useState<EmergencyShock>(defaultShock);
  const [predatoryOffers] = useState<PredatoryOffer[]>(defaultOffers);
  const [neuroState, setNeuroState] = useState<NeuroShieldState>({
    isShieldActive: false,
    panicScore: 78,
    timerSecondsRemaining: 45,
    isEmergencyBypassed: false,
    lifeEnergyHourlyWage: 150,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeFeature, setActiveFeature] = useState<string>('calculator');

  // Calculate Absorptive Surplus Dynamically
  const dynamicSurplus = useMemo(() => {
    return profile.monthlyIncome - (profile.existingEmi + profile.houseRent + profile.livingExpenses);
  }, [profile.monthlyIncome, profile.existingEmi, profile.houseRent, profile.livingExpenses]);

  // Hourly wage calculation (176 standard working hours per month)
  const hourlyWage = useMemo(() => {
    return Math.max(50, Math.round(profile.monthlyIncome / 176));
  }, [profile.monthlyIncome]);

  // Estimate the funding plan from available savings and the emergency amount.
  const fundingPlan = useMemo<FundingPlanResult>(() => {
    const shockAmt = Math.max(0, shock.amount);
    const repaymentMonths = Math.max(1, shock.tenureMonths ?? 12);
    const savingsAlloc = Math.min(profile.emergencySavings, shockAmt);
    const trancheAAlloc = Math.round(shockAmt * 0.4);
    const hospitalAdvanceAlloc = Math.min(
      Math.max(0, trancheAAlloc - savingsAlloc),
      Math.max(0, shockAmt - savingsAlloc),
    );
    const zeroCostAlloc = savingsAlloc + hospitalAdvanceAlloc;
    const remainingNeed = Math.max(0, shockAmt - zeroCostAlloc);
    const coopAlloc = Math.min(Math.round(shockAmt * 0.4), remainingNeed);
    const deferredAlloc = Math.max(0, remainingNeed - coopAlloc);

    const coopInterest = Math.round(coopAlloc * 0.065 * (repaymentMonths / 12));
    const deferredInterest = Math.round(deferredAlloc * 0.08 * (repaymentMonths / 12));
    const totalInterestAndFees = coopInterest + deferredInterest;
    const totalRepayment = shockAmt + totalInterestAndFees;
    const naiveRepayment = shockAmt * 1.368; // Predatory rate ~36.8% all-in
    const directCashSaved = Math.max(0, naiveRepayment - totalRepayment);
    const lifeHoursSaved = Math.round(directCashSaved / hourlyWage);

    return {
      tranches: [
        {
          sourceName: 'Zero-Cost Liquidity (Savings + Hospital Advance)',
          sourceType: 'emergency_nbfc',
          allocatedAmount: zeroCostAlloc,
          interestApr: 0,
          tenureMonths: repaymentMonths,
          monthlyObligation: Math.ceil(hospitalAdvanceAlloc / repaymentMonths),
          interestCost: 0,
          notes: `₹${savingsAlloc.toLocaleString()} savings + ₹${hospitalAdvanceAlloc.toLocaleString()} hospital advance`,
        },
        {
          sourceName: 'Co-op Bridge',
          sourceType: 'micro_loan',
          allocatedAmount: coopAlloc,
          interestApr: 6.5,
          tenureMonths: repaymentMonths,
          monthlyObligation: Math.ceil((coopAlloc + coopInterest) / repaymentMonths),
          interestCost: coopInterest,
          notes: 'Fixed-rate cooperative bridge estimate',
        },
        {
          sourceName: 'Deferred Micro-Repayment',
          sourceType: 'emergency_nbfc',
          allocatedAmount: deferredAlloc,
          interestApr: 8,
          tenureMonths: repaymentMonths,
          monthlyObligation: Math.ceil((deferredAlloc + deferredInterest) / repaymentMonths),
          interestCost: deferredInterest,
          notes: 'Estimated repayment begins after the 60-day grace period',
        },
      ],
      totalAllocated: zeroCostAlloc + coopAlloc + deferredAlloc,
      totalRepayment: Math.round(totalRepayment),
      totalInterestAndFees,
      directCashSaved: Math.round(directCashSaved),
      humanLifeEnergyHoursSaved: lifeHoursSaved,
      defaultProbabilityBefore: 84,
      defaultProbabilityAfter: 4,
    };
  }, [shock.amount, shock.tenureMonths, profile.emergencySavings, hourlyWage]);

  // Dynamic, calendar-aware 90-day cashflow digital twin projection
  const runwayData = useMemo<CashflowRunwayPoint[]>(() => {
    const days = [0, 15, 30, 32, 45, 60, 75, 90];
    const shockAmt = Math.max(0, shock.amount);
    const savingsUsed = Math.min(profile.emergencySavings, shockAmt);
    const startingCash = Math.max(0, profile.emergencySavings - savingsUsed);
    const dailyLivingBurn = Math.round(profile.livingExpenses / 30);
    const amountScale = shockAmt > 0 ? shockAmt / 50000 : 1;
    const plan = fundingPlan.tranches.map((tranche) => tranche.monthlyObligation);
    const scenarioBalances = new Map<number, { withoutVantiq: number; withVantiq: number }>();

    let balanceWithoutVantiq = startingCash;
    let balanceWithVantiq = startingCash;
    scenarioBalances.set(0, { withoutVantiq: balanceWithoutVantiq, withVantiq: balanceWithVantiq });

    for (let day = 1; day <= 90; day += 1) {
      // Daily essential living expense burn
      balanceWithoutVantiq -= dailyLivingBurn;
      balanceWithVantiq -= dailyLivingBurn;

      // Existing fixed personal/car loan EMI on Day 5, 35, 65
      if (day === 5 || day === 35 || day === 65) {
        balanceWithoutVantiq -= profile.existingEmi;
        balanceWithVantiq -= profile.existingEmi;
      }

      // Monthly Payroll Inflow on Day 30, 60, 90
      if (day === 30 || day === 60 || day === 90) {
        balanceWithoutVantiq += profile.monthlyIncome;
        balanceWithVantiq += profile.monthlyIncome;
        // House rent deduction on Day 30 and Day 60
        balanceWithoutVantiq -= profile.houseRent;
        balanceWithVantiq -= profile.houseRent;
      }

      // Predatory fragmented instant loan deductions:
      for (const offer of defaultOffers) {
        const installmentIndex = Math.floor((day - offer.defaultCollisionDay) / 30);
        if (
          day >= offer.defaultCollisionDay &&
          (day - offer.defaultCollisionDay) % 30 === 0 &&
          installmentIndex < offer.tenureMonths
        ) {
          balanceWithoutVantiq -= Math.round(offer.monthlyEmi * amountScale);
        }
      }

      // Predatory overdue late fee penalties & NACH bounce fees if underwater
      if (balanceWithoutVantiq < 0 && (day === 45 || day === 75)) {
        balanceWithoutVantiq -= Math.round(1800 + Math.abs(balanceWithoutVantiq) * 0.035);
      }

      // VANTIQ coordinated relief schedule:
      // Tranche A (0% Advance) & Tranche B (Co-op bridge) aligned with payday
      if (shockAmt > 0 && (day === 30 || day === 60)) {
        balanceWithVantiq -= plan[0] + plan[1];
      }
      // Tranche C (Deferred micro-loan) begins only after Day 60 grace period
      if (shockAmt > 0 && day >= 61 && (day - 61) % 30 === 0) {
        balanceWithVantiq -= plan[2];
      }

      if (days.includes(day)) {
        scenarioBalances.set(day, { withoutVantiq: balanceWithoutVantiq, withVantiq: balanceWithVantiq });
      }
    }

    return days.map((day) => {
      const balance = scenarioBalances.get(day) ?? { withoutVantiq: startingCash, withVantiq: startingCash };
      // Volatility quantile bounds (P10 Pessimistic / P90 Optimistic)
      const incomeVol = Math.round(profile.monthlyIncome * 0.08 * (day / 30));
      return {
        day,
        dateLabel: `Day ${day}`,
        balanceWithoutVantiq: Math.round(balance.withoutVantiq),
        balanceWithVantiq: Math.round(balance.withVantiq),
        pessimisticQuantile: Math.round(balance.withVantiq - incomeVol),
        expectedQuantile: Math.round(balance.withVantiq),
        optimisticQuantile: Math.round(balance.withVantiq + incomeVol),
      };
    });
  }, [profile.monthlyIncome, profile.houseRent, profile.existingEmi, profile.livingExpenses, profile.emergencySavings, shock.amount, fundingPlan]);

  const triggerNeuroShield = useCallback(() => {
    setNeuroState((prev) => ({
      ...prev,
      isShieldActive: true,
      timerSecondsRemaining: 45,
      isEmergencyBypassed: false,
    }));
  }, []);

  const bypassNeuroShield = useCallback(() => {
    setNeuroState((prev) => ({
      ...prev,
      isShieldActive: false,
      isEmergencyBypassed: true,
    }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const navigateToFeature = useCallback((featureId: string) => {
    setActiveFeature(featureId);

    const routeMap: Record<string, string> = {
      'calculator': '/calculator',
      'simulator': '/calculator',
      'debt-traps': '/debt-traps',
      'quantum-solver': '/quantum-solver',
      'cash-runway': '/cash-runway',
      'fee-comparison': '/fee-comparison',
            '45s-shield': '/45s-shield',
    };

    const targetPath = routeMap[featureId] || `/${featureId}`;
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }

    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  return (
    <FintechContext.Provider
      value={{
        profile: { ...profile, absorptiveSurplus: dynamicSurplus },
        setProfile,
        shock,
        setShock,
        predatoryOffers,
        fundingPlan,
        quantumResult: fundingPlan,
        runwayData,
        hourlyWage,
        neuroState,
        setNeuroState,
        triggerNeuroShield,
        bypassNeuroShield,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        activeFeature,
        setActiveFeature,
        navigateToFeature,
      }}
    >
      {children}
    </FintechContext.Provider>
  );
};

export const useFintech = (): FintechContextType => {
  const context = useContext(FintechContext);
  if (!context) {
    throw new Error('useFintech must be used within a FintechProvider');
  }
  return context;
};
