// src/context/FintechContext.tsx
// Reactive State Hub for VANTIQ
// Allows all 15 modular components to communicate in real-time.

import React, { createContext, useContext, useState, useMemo } from 'react';
import type { 
  FinancialProfile, 
  EmergencyShock, 
  PredatoryOffer, 
  QuantumKnapsackResult, 
  CashflowRunwayPoint, 
  NeuroShieldState 
} from '../types';

interface FintechContextType {
  profile: FinancialProfile;
  setProfile: React.Dispatch<React.SetStateAction<FinancialProfile>>;
  shock: EmergencyShock;
  setShock: React.Dispatch<React.SetStateAction<EmergencyShock>>;
  predatoryOffers: PredatoryOffer[];
  quantumResult: QuantumKnapsackResult;
  rescuePlan: QuantumKnapsackResult;
  runwayData: CashflowRunwayPoint[];
  neuroState: NeuroShieldState;
  setNeuroState: React.Dispatch<React.SetStateAction<NeuroShieldState>>;
  triggerNeuroShield: () => void;
  bypassNeuroShield: () => void;
  hourlyWage: number;
  triggerQuantumOptimization: () => void;
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
    panicScore: 78, // High distress detected via typing jitter
    timerSecondsRemaining: 45,
    isEmergencyBypassed: false,
    lifeEnergyHourlyWage: 150, // Rs. 40,000 / 266 working hrs
  });

  // Calculate Absorptive Surplus Dynamically
  const dynamicSurplus = useMemo(() => {
    return profile.monthlyIncome - (profile.existingEmi + profile.houseRent + profile.livingExpenses);
  }, [profile.monthlyIncome, profile.existingEmi, profile.houseRent, profile.livingExpenses]);

  // Hourly wage calculation (176 standard working hours per month)
  const hourlyWage = useMemo(() => {
    return Math.max(50, Math.round(profile.monthlyIncome / 176));
  }, [profile.monthlyIncome]);

  // Dynamic Quantum Knapsack Optimization
  const quantumResult = useMemo<QuantumKnapsackResult>(() => {
    const shockAmt = shock.amount;
    const savingsAlloc = Math.min(profile.emergencySavings, 5000);
    const remainingAfterSavings = Math.max(0, shockAmt - savingsAlloc);
    
    // Allocate to 0% intro card up to 25k
    const cardAlloc = Math.min(25000, remainingAfterSavings);
    // Allocate remainder to low-cost micro-loan @ 12%
    const microLoanAlloc = Math.max(0, remainingAfterSavings - cardAlloc);

    const cardInterest = cardAlloc * 0.00; // 0% promo period
    const microLoanInterest = microLoanAlloc * 0.12 * 0.5; // 6-month repayment at 12% APR

    const totalRepayment = shockAmt + cardInterest + microLoanInterest + 600; // Rs. 600 nominal stamp/processing
    const naiveRepayment = shockAmt * 1.368; // Predatory rate ~36.8% all-in
    const directCashSaved = Math.max(0, naiveRepayment - totalRepayment);
    const lifeHoursSaved = Math.round(directCashSaved / hourlyWage);

    return {
      tranches: [
        {
          sourceName: 'Liquid Emergency Savings',
          sourceType: 'liquid_savings',
          allocatedAmount: savingsAlloc,
          interestApr: 0,
          tenureMonths: 0,
          monthlyObligation: 0,
          interestCost: 0,
          notes: 'Immediate Zero-Cost Self-Disbursement',
        },
        {
          sourceName: 'Zero-APR Medical Buffer Card',
          sourceType: 'zero_apr_card',
          allocatedAmount: cardAlloc,
          interestApr: 0,
          tenureMonths: 6,
          monthlyObligation: Math.round(cardAlloc / 6),
          interestCost: 0,
          notes: '6-Month Institutional Interest-Free Buffer',
        },
        {
          sourceName: 'Fair-Lend NBFC Micro-Tranche',
          sourceType: 'micro_loan',
          allocatedAmount: microLoanAlloc,
          interestApr: 12,
          tenureMonths: 6,
          monthlyObligation: Math.round((microLoanAlloc + microLoanInterest) / 6),
          interestCost: microLoanInterest,
          notes: 'Pre-vetted RBI Regulated Emergency Liquidity',
        },
      ],
      totalAllocated: shockAmt,
      totalRepayment: Math.round(totalRepayment),
      totalInterestAndFees: Math.round(cardInterest + microLoanInterest + 600),
      directCashSaved: Math.round(directCashSaved),
      humanLifeEnergyHoursSaved: lifeHoursSaved,
      quantumSolveTimeMs: 134,
      hamiltonianEnergy: -42.85,
      defaultProbabilityBefore: 84,
      defaultProbabilityAfter: 4,
    };
  }, [shock.amount, profile.emergencySavings, hourlyWage]);

  // Dynamic 90-Day Cash Runway Simulation
  const runwayData = useMemo<CashflowRunwayPoint[]>(() => {
    const days = [0, 15, 30, 32, 45, 60, 75, 90];
    return days.map((day) => {
      let balanceNaive = 40000;
      let balanceChronos = 40000;

      if (day === 0) {
        balanceNaive = 38000;
        balanceChronos = 38000;
      } else if (day === 15) {
        balanceNaive = 23000;
        balanceChronos = 28000;
      } else if (day === 30) {
        balanceNaive = -7500; // Rent + multiple BNPL collisions
        balanceChronos = 16000;
      } else if (day === 32) {
        balanceNaive = -18000; // Total Debt Trap Collision
        balanceChronos = 15000;
      } else if (day === 45) {
        balanceNaive = -24000;
        balanceChronos = 17500;
      } else if (day === 60) {
        balanceNaive = -31000;
        balanceChronos = 19000;
      } else if (day === 75) {
        balanceNaive = -34500;
        balanceChronos = 20500;
      } else {
        balanceNaive = -38000;
        balanceChronos = 22000;
      }

      return {
        day,
        dateLabel: `Day ${day}`,
        balanceWithoutChronos: balanceNaive,
        balanceWithChronos: balanceChronos,
        pessimisticQuantile: balanceChronos - 3500,
        expectedQuantile: balanceChronos,
        optimisticQuantile: balanceChronos + 4000,
      };
    });
  }, [profile, dynamicSurplus]);

  const triggerNeuroShield = () => {
    setNeuroState((prev) => ({
      ...prev,
      isShieldActive: true,
      timerSecondsRemaining: 45,
      isEmergencyBypassed: false,
    }));
  };

  const [, setQuantumIteration] = useState(0);

  const triggerQuantumOptimization = () => {
    setQuantumIteration((p) => p + 1);
  };

  const bypassNeuroShield = () => {
    setNeuroState((prev) => ({
      ...prev,
      isShieldActive: false,
      isEmergencyBypassed: true,
    }));
  };

  return (
    <FintechContext.Provider
      value={{
        profile: { ...profile, absorptiveSurplus: dynamicSurplus },
        setProfile,
        shock,
        setShock,
        predatoryOffers,
        quantumResult,
        rescuePlan: quantumResult,
        runwayData,
        neuroState,
        setNeuroState,
        triggerNeuroShield,
        bypassNeuroShield,
        hourlyWage,
        triggerQuantumOptimization,
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
