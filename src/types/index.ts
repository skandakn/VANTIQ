// src/types/index.ts
// PROJECT VANTIQ: Core Shared Type Contracts
// All 15 modules share these interfaces for seamless real-time interoperability.

export interface FinancialProfile {
  monthlyIncome: number;      // e.g., 40000
  existingEmi: number;        // e.g., 8000
  houseRent: number;          // e.g., 7000
  livingExpenses: number;     // e.g., 10000
  emergencySavings: number;   // e.g., 5000
  absorptiveSurplus: number;  // = Income - (EMI + Rent + Living) = 15000
}

export interface EmergencyShock {
  amount: number;             // e.g., 50000
  category: 'medical' | 'vehicle' | 'home_repair' | 'job_loss';
  description: string;        // e.g., "Urgent Hospital Surgery Deposit"
  urgencyLevel: 'critical' | 'high' | 'moderate';
  daysToDisbursement: number; // e.g., 1 day
}

export interface PredatoryOffer {
  id: string;
  lenderName: string;
  offeredLimit: number;
  interestApr: number;        // e.g., 36%
  processingFeePercent: number; // e.g., 4%
  tenureMonths: number;
  monthlyEmi: number;
  defaultCollisionDay: number; // e.g. Day 32 when EMI overlaps with Rent
  appType: 'Instant Micro-Loan' | 'BNPL Split' | 'Credit Card Advance' | 'Payday App';
}

export interface FundingTranche {
  sourceName: string;
  sourceType: 'liquid_savings' | 'zero_apr_card' | 'micro_loan' | 'emergency_nbfc';
  allocatedAmount: number;
  interestApr: number;
  tenureMonths: number;
  monthlyObligation: number;
  interestCost: number;
  notes: string;
}

export interface FundingPlanResult {
  tranches: FundingTranche[];
  totalAllocated: number;
  totalRepayment: number;
  totalInterestAndFees: number;
  directCashSaved: number;
  humanLifeEnergyHoursSaved: number;
  defaultProbabilityBefore: number; // e.g., 84%
  defaultProbabilityAfter: number;  // e.g., 4%
}

export interface CashflowRunwayPoint {
  day: number;
  dateLabel: string;
  balanceWithoutChronos: number; // Cascades into negative default
  balanceWithChronos: number;    // Stays above zero buffer
  pessimisticQuantile: number;   // q10
  expectedQuantile: number;      // q50
  optimisticQuantile: number;    // q90
}

export interface NeuroShieldState {
  isShieldActive: boolean;
  panicScore: number;            // 0 - 100 derived from MobileBERT keystroke jitter
  timerSecondsRemaining: number; // 45 seconds countdown
  isEmergencyBypassed: boolean;
  lifeEnergyHourlyWage: number;  // e.g., Rs. 150/hr for Rs. 40k salary (40000 / 266 hrs)
}

export interface TeamMemberRole {
  memberNumber: number;
  name: string;
  roleTitle: string;
  moduleKey: string;
  folderPath: string;
  gitBranch: string;
  status: 'In Development' | 'Ready for Review' | 'Integrated';
}
