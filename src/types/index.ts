// src/types/index.ts
// PROJECT VANTIQ: Core Shared Type Contracts
// Modules share these interfaces for seamless real-time interoperability.

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
  balanceWithoutVantiq: number; // Cascades into negative default
  balanceWithVantiq: number;    // Stays above zero buffer
  pessimisticQuantile: number;   // q10
  expectedQuantile: number;      // q50
  optimisticQuantile: number;    // q90
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

export interface HealthConditionPreset {
  id: string;
  name: string;
  iconName: string;
  category: string;
  typicalCostInr: number;
  typicalCostUsd: number;
  urgencyDefault: 'critical' | 'high' | 'moderate';
  description: string;
  commonProcedures: string[];
}

export type HealthOptionCategory =
  | 'medical_loan'
  | 'zero_cost_emi'
  | 'insurance_claim'
  | 'government_scheme'
  | 'crowdfunding'
  | 'charitable_trust'
  | 'hospital_hardship';

export interface HealthReliefPlan {
  id: string;
  name: string;
  organization: string;
  category: HealthOptionCategory;
  categoryLabel: string;
  region: 'India' | 'USA' | 'UK' | 'Global';
  currency: 'INR' | 'USD' | 'GBP' | 'EUR';
  interestApr: number; // 0 for grants/insurance/0% EMI
  minInterestApr?: number;
  maxInterestApr?: number;
  maxAmount: number; // e.g. 2500000 or 50000
  minAmount?: number;
  tenureMonthsMax: number;
  disbursementSpeed: string; // e.g., 'Instant (< 2 hrs)', '24 Hours', '2-5 Days'
  trustScore: number; // e.g. 4.9 (out of 5.0)
  ratingCount: number;
  regulatoryBody: string; // e.g. 'RBI Regulated NBFC', 'IRDAI Approved', 'US Federal / ACA'
  isRepayable: boolean; // false for grants, crowdfunding, Ayushman Bharat
  processingFeePercent: number;
  eligibilityCriteria: string[];
  documentsRequired: string[];
  keyBenefits: string[];
  drawbacksOrGotchas: string[];
  directApplyUrl: string;
  officialHelpline?: string;
  recommendedFor: string;
  tags: string[];
}

export interface HealthReliefStrategy {
  targetAmount: number;
  currency: string;
  selectedCondition: string;
  urgency: string;
  blendedApr: number;
  totalRepayment: number;
  totalInterestSavedVsPredatory: number;
  lifeHoursSaved: number;
  allocations: {
    sourceName: string;
    category: string;
    amount: number;
    interestRate: number;
    tenure: string;
    monthlyEmi: number;
    isNonRepayable: boolean;
    trustScore: number;
    notes: string;
  }[];
}
