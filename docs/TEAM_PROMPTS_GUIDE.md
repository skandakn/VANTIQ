# VANTIQ: 15-Member Simultaneous Engineering Delegation Guide

> **Repository**: [https://github.com/skandakn/VANTIQ](https://github.com/skandakn/VANTIQ)  
> **Architecture**: Vite + React 18 + TypeScript + Vanilla CSS Glassmorphic Tokens  
> **State Management**: Centralized reactive context (`src/context/FintechContext.tsx`) + strict TypeScript interfaces (`src/types/index.ts`)  
> **Workflow**: **15 Zero-Merge-Conflict Independent Modules**

---

## Team Division Matrix

| Member | Module Directory | Component Name | Functional Domain |
|---|---|---|---|
| **Member 01** | `src/components/layout/` | `Navbar.tsx`, `Footer.tsx` | Global Shell, Sticky HUD, Quick Jump Nav & Footer |
| **Member 02** | `src/modules/m01_hero/` | `HeroSection.tsx` | Scarcity Hero, Crisis Counter & Value Prop |
| **Member 03** | `src/modules/m02_crisis_input/` | `EmergencyIntake.tsx` | Dynamic Emergency Shock Intake & Budget Simulator |
| **Member 04** | `src/modules/m03_debt_mesh/` | `GhostDebtMesh.tsx` | Predatory Offer Stacking & Ghost Debt Trap Visualizer |
| **Member 05** | `src/modules/m04_dual_dial/` | `DualCapacityGauge.tsx` | Superficial Limit vs. Real Absorptive Capacity Meter |
| **Member 06** | `src/modules/m05_cashflow_twin/` | `CashflowRunwayChart.tsx` | 90-Day Cashflow Digital Twin & TFT Runway Simulation |
| **Member 07** | `src/modules/m06_quantum_solver/` | `QuantumKnapsackVisualizer.tsx` | QUBO / QAOA Quantum Knapsack Optimization Engine |
| **Member 08** | `src/modules/m07_rescue_blend/` | `MultiSourceRescueCard.tsx` | Tri-Tranche Multi-Source Rescue Architecture |
| **Member 09** | `src/modules/m08_neuro_shield/` | `NeuroAdaptiveShieldModal.tsx` | 45-Second Neuro-Adaptive Grounding Protocol Modal |
| **Member 10** | `src/modules/m09_life_energy/` | `LifeEnergyCalculator.tsx` | Real Labor Life-Energy Equivalency Hours Calculator |
| **Member 11** | `src/modules/m10_comparison_matrix/` | `ComparativeRescueMatrix.tsx` | Naive Multi-App vs. VANTIQ Counterfactual Matrix |
| **Member 12** | `src/modules/m11_xai_explainer/` | `TreeSHAPExplainer.tsx` | TreeSHAP Explainable AI Waterfall & Feature Impact |
| **Member 13** | `src/modules/m12_market_radar/` | `MarketRadarChart.tsx` | Competitive Radar & FinTech TAM / SAM / SOM Metrics |
| **Member 14** | `src/modules/m13_privacy_compliance/` | `ZeroKnowledgeCompliance.tsx` | ZK-SNARK Privacy Proofs & RBI Sandbox Architecture |
| **Member 15** | `src/modules/m14_roadmap_team/` | `RoadmapAndTeam.tsx` | 4-Quarter Milestones & Team INNOVATEX Credentials |

---

## 15 Standalone Team Member Prompts

### Member 01: Global Navigation HUD, Status Ticker & Shell
- **Branch**: `git checkout -b feat/m01-shell-nav`
- **Files Assigned**: `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 01 on the VANTIQ team.
Your task is to build and polish the Global Shell, Header HUD, and Footer for the VANTIQ application in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`

Requirements:
1. Glassmorphic Sticky Header:
   - Logo with a glowing cyan gradient badge "VANTIQ".
   - Real-time status indicator showing quantum engine online and state pill.
   - Smooth anchor navigation links to `#simulator`, `#ghost-debt`, `#quantum-solver`, `#digital-twin`, `#comparison`, `#compliance`.
   - Emergency Simulator CTA button that smooth-scrolls to `#simulator`.
2. Interactive Footer:
   - Display system architecture status: "Quantum Hybrid Optimizer v2.4 (Active)".
   - RBI Regulatory Sandbox testbed disclaimer.
   - Quick links, copyright, and GitHub repository links.
3. Keep styling consistent with `src/styles/design-tokens.css`.
4. Ensure 100% TypeScript type safety and zero unused variables.
```

---

### Member 02: Scarcity Hero & Dynamic Problem Counter
- **Branch**: `git checkout -b feat/m02-hero-scarcity`
- **Files Assigned**: `src/modules/m01_hero/HeroSection.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 02 on the VANTIQ team.
Your task is to develop the Landing Hero Section with dynamic crisis statistics and the core problem statement in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m01_hero/HeroSection.tsx`

Requirements:
1. Prominently display the Scarcity Quote:
   "Scarcity captures attention, but it narrows focus—leading to decisions that solve today's crisis by engineering tomorrow's catastrophe." (Mullainathan & Shafir)
2. Interactive Metric Counters:
   - Dynamic real-time simulated counter for "Predatory Lending Interceptions"
   - Average user APR savings percentage (e.g., 36% down to 3.8%)
   - Quantum solver convergence speed (<40ms)
3. Call-to-action buttons:
   - Primary: "Simulate Medical Shock" (triggers scroll and focus to intake)
   - Secondary: "Inspect Quantum Knapsack"
4. Visual design:
   - Deep indigo/cyan radial gradient background with subtle animated glow.
5. Strict TypeScript compliance.
```

---

### Member 03: Emergency Crisis Intake & Budget Simulator
- **Branch**: `git checkout -b feat/m03-emergency-intake`
- **Files Assigned**: `src/modules/m02_crisis_input/EmergencyIntake.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 03 on the VANTIQ team.
Your task is to develop the Emergency Crisis Intake & Budget Customizer in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m02_crisis_input/EmergencyIntake.tsx`

Requirements:
1. Consume and update global context via `useFintech()`:
   - `profile` (monthlySalary, existingEmi, rent, foodExpenses, emergencySavings)
   - `shock` (amount, shockCategory, urgencyHours)
   - `updateProfile()`, `updateShock()`
2. Interactive Form Controls:
   - Slider + direct numeric inputs for Emergency Needed (default: ₹50,000; range: ₹10,000 - ₹2,00,000).
   - Sliders for Monthly Income, Existing EMI, Rent, and Living Expenses.
3. Real-Time Computations:
   - Dynamic Net Disposable Surplus calculation:
     `Net Surplus = Salary - (EMI + Rent + Living Expenses)`
   - Warning alert if Shock > 3x monthly surplus.
4. Quick preset shock buttons: "Hospitalization (₹50k)", "Surgery (₹1.2L)", "Prescription & Labs (₹25k)".
```

---

### Member 04: Ghost Debt Stacking Mesh Visualizer
- **Branch**: `git checkout -b feat/m04-ghost-debt-mesh`
- **Files Assigned**: `src/modules/m03_debt_mesh/GhostDebtMesh.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 04 on the VANTIQ team.
Your task is to build the Ghost Debt Stacking Mesh Visualizer in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m03_debt_mesh/GhostDebtMesh.tsx`

Requirements:
1. Consume `predatoryOffers` and `profile` from `useFintech()`.
2. Visualize the predatory debt stacking trap:
   - Render the 4 fragmented fintech apps:
     * App A: ₹20,000 Instant Loan @ 36% APR
     * App B: ₹15,000 BNPL Split @ 28% APR
     * Credit Card: ₹30,000 Cash Advance @ 42% APR
     * App C: ₹10,000 Payday Credit @ 48% APR
3. Display the "Illusion vs. Reality" breakdown:
   - Illusion: "₹75,000 immediate credit available in 3 taps!"
   - Reality: Cumulative monthly repayment = ₹26,200/mo against ₹15,000 disposable income!
4. Debt Spiral Warning Indicator:
   - Pulsing red indicator demonstrating default within 45 days.
```

---

### Member 05: Dual-Dial Absorptive Capacity Meter
- **Branch**: `git checkout -b feat/m05-dual-capacity-meter`
- **Files Assigned**: `src/modules/m04_dual_dial/DualCapacityGauge.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 05 on the VANTIQ team.
Your task is to develop the Dual-Dial Absorptive Capacity Meter in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m04_dual_dial/DualCapacityGauge.tsx`

Requirements:
1. Consume `profile.absorptiveSurplus` and `predatoryOffers` via `useFintech()`.
2. Construct a side-by-side comparative gauge visualization:
   - Dial 1 (Red Glowing Danger): "Superficial Limit Offered" = ₹75,000 (False sense of safety).
   - Dial 2 (Emerald Glowing Safety): "Safe Absorptive Surplus" = ₹15,000/month.
3. Stress Ratio Indicator:
   - Calculate `Debt Burden Ratio = (Stacked EMI) / (Monthly Surplus)`.
   - Show color-coded status badge: Safe (<0.6), Moderate (0.6 - 1.0), Catastrophic (>1.0).
4. Provide clear explanatory micro-copy explaining why traditional credit scoring ignores absorptive limits.
```

---

### Member 06: Temporal Fusion Transformer (TFT) 90-Day Cashflow Digital Twin
- **Branch**: `git checkout -b feat/m06-cashflow-digital-twin`
- **Files Assigned**: `src/modules/m05_cashflow_twin/CashflowRunwayChart.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 06 on the VANTIQ team.
Your task is to build the 90-Day Cashflow Digital Twin Interactive Chart in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m05_cashflow_twin/CashflowRunwayChart.tsx`

Requirements:
1. Consume `cashflowRunway` from `useFintech()`.
2. Interactive SVG or Canvas dual-curve trajectory chart:
   - Red Curve: "Uncoordinated Multi-App Borrowing" (plummeting below ₹0 into insolvency by Day 32).
   - Emerald Curve: "VANTIQ Optimized Multi-Source Path" (remains positive, recovering to surplus).
3. Day-by-Day Interactive Scrubber or hover tooltips:
   - Hovering over Day 15, Day 30, Day 45, Day 60, Day 90 shows bank balance and upcoming EMI.
4. Milestones & Alert Flags:
   - Day 30: Salary deposit (+₹40,000).
   - Day 32: Multi-app clustered debit crash (-₹26,200).
```

---

### Member 07: QUBO / QAOA Quantum Knapsack Optimization Visualizer
- **Branch**: `git checkout -b feat/m07-quantum-knapsack`
- **Files Assigned**: `src/modules/m06_quantum_solver/QuantumKnapsackVisualizer.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 07 on the VANTIQ team.
Your task is to build the Quantum Knapsack Visualizer in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m06_quantum_solver/QuantumKnapsackVisualizer.tsx`

Requirements:
1. Consume `quantumResult` and `triggerQuantumOptimization()` from `useFintech()`.
2. Quantum Solver Cockpit:
   - Formulation Display: $H = \sum_i c_i x_i + \lambda (\sum_i w_i x_i - W)^2 + \mu \sum_{i,j} J_{ij} x_i x_j$
   - Quantum annealer simulated convergence animation (cooling from $T_0$ to ground state).
   - Interactive "Re-run Quantum Solver" button with loading state.
3. Output Metrics:
   - Ground state energy ($H_0$), Annealing Time (38 ms), Constraint Violation Penalty ($0.000$).
   - Optimal Hamiltonian Eigenstate representation.
```

---

### Member 08: Tri-Tranche Multi-Source Rescue Card
- **Branch**: `git checkout -b feat/m08-rescue-blend`
- **Files Assigned**: `src/modules/m07_rescue_blend/MultiSourceRescueCard.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 08 on the VANTIQ team.
Your task is to build the Multi-Source Rescue Architecture Display in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m07_rescue_blend/MultiSourceRescueCard.tsx`

Requirements:
1. Consume `rescuePlan` and `shock` from `useFintech()`.
2. Tri-Tranche Decomposition UI:
   - Tranche A: Zero-Cost Liquidity (Emergency Savings ₹5,000 + Subsidized Hospital Advance ₹15,000 @ 0% APR).
   - Tranche B: Low-Interest Co-op / Credit Union Bridge (₹20,000 @ 6.5% APR).
   - Tranche C: Deferred Staggered Micro-Repayment (₹10,000 @ 8% APR, grace period 60 days).
3. Visual Tranche Progress Bar showing proportional allocation of the ₹50,000 total requirement.
4. Total Interest Comparison Card: ₹1,420 with VANTIQ vs. ₹18,400 with fragmented loan apps.
```

---

### Member 09: 45-Second Neuro-Adaptive Grounding Protocol Modal
- **Branch**: `git checkout -b feat/m09-neuro-shield`
- **Files Assigned**: `src/modules/m08_neuro_shield/NeuroAdaptiveShieldModal.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 09 on the VANTIQ team.
Your task is to build the Neuro-Adaptive Shield Grounding Modal in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m08_neuro_shield/NeuroAdaptiveShieldModal.tsx`

Requirements:
1. Consume `shieldState`, `setShieldActive()`, `tickShieldCountdown()` from `useFintech()`.
2. Grounding Modal Behavior:
   - Triggerable via "Initiate Emergency Lockout" button.
   - 45-second circular animated countdown timer.
   - Disables impulsive one-click acceptance buttons while running.
3. Dual Cognitive Tests:
   - Physiological breathing pacer (Inhale 4s, Hold 4s, Exhale 4s).
   - Reflective friction prompt: "Do you acknowledge this ₹50,000 loan requires 96 hours of future labor?"
4. Bypass mechanism with deliberate friction ("I understand the long-term risk and wish to proceed").
```

---

### Member 10: Life-Energy Labor Hours Equivalency Calculator
- **Branch**: `git checkout -b feat/m10-life-energy-calc`
- **Files Assigned**: `src/modules/m09_life_energy/LifeEnergyCalculator.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 10 on the VANTIQ team.
Your task is to create the Life-Energy Labor Hours Equivalency Calculator in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m09_life_energy/LifeEnergyCalculator.tsx`

Requirements:
1. Consume `profile` and `rescuePlan` from `useFintech()`.
2. Compute Real Hourly Wage:
   - Monthly salary ÷ 160 working hours = Net hourly wage (e.g., ₹40,000 / 160 = ₹250/hour).
3. Compute Real Labor Hours required:
   - For Predatory Stacking total repayment (₹68,400): 273.6 hours of labor (approx. 34 full working days).
   - For VANTIQ Plan total repayment (₹51,420): 205.6 hours (approx. 25 days).
   - Net life-energy saved: 68 working hours!
4. Visual representation:
   - Interactive calendar/clock visualizer showing days of freedom saved.
```

---

### Member 11: Counterfactual Comparison Matrix
- **Branch**: `git checkout -b feat/m11-comparison-matrix`
- **Files Assigned**: `src/modules/m10_comparison_matrix/ComparativeRescueMatrix.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 11 on the VANTIQ team.
Your task is to build the Counterfactual Comparison Matrix in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m10_comparison_matrix/ComparativeRescueMatrix.tsx`

Requirements:
1. Create a head-to-head table comparing:
   - "Fragmented Multi-App Borrowing" vs. "VANTIQ Quantum Allocation".
2. Metrics to compare:
   - Effective APR (38.5% vs. 4.2%).
   - Processing Fees & Hidden Churn (₹4,800 vs. ₹0).
   - Monthly Payment Shock (₹26,200/mo vs. ₹4,285/mo).
   - Time to Full Amortization (18 months with penalties vs. 12 months flat).
   - Risk of Default / Harassment (92% probability vs. 1.8%).
3. Interactive toggle: Allow users to view 3-month, 6-month, or 12-month projections.
```

---

### Member 12: TreeSHAP Explainable AI Waterfall
- **Branch**: `git checkout -b feat/m12-xai-shap-explainer`
- **Files Assigned**: `src/modules/m11_xai_explainer/TreeSHAPExplainer.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 12 on the VANTIQ team.
Your task is to build the TreeSHAP Explainable AI Feature Attribution Waterfall in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m11_xai_explainer/TreeSHAPExplainer.tsx`

Requirements:
1. Explainable AI Visualization:
   - Display baseline risk score ($\phi_0 = 42\%$).
   - Waterfall chart showing feature attribution values:
     * High Shock vs. Liquid Reserve: $+28\%$
     * High APR Predatory Offers present: $+34\%$
     * Rent & Fixed Obligations: $+14\%$
     * Subsidized Tranche Integration: $-46\%$
     * Final Calibrated Default Risk: $7.2\%$.
2. Interactive hover tooltips detailing mathematical Shapley values $\phi_i(v) = \sum_{S \subseteq N \setminus \{i\}} \dots$.
3. Clear layman explanations for why each feature increases or reduces borrower vulnerability.
```

---

### Member 13: Competitive Radar & FinTech Market TAM/SAM/SOM Hub
- **Branch**: `git checkout -b feat/m13-market-radar`
- **Files Assigned**: `src/modules/m12_market_radar/MarketRadarChart.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 13 on the VANTIQ team.
Your task is to build the Competitive Radar & Market Sizing Hub in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m12_market_radar/MarketRadarChart.tsx`

Requirements:
1. SVG Radar / Spider Chart comparing:
   - VANTIQ vs. Traditional Banks vs. Instant Loan Apps vs. Credit Cards.
   - Axes: Cross-App Awareness, Scarcity Friction, Quantum Optimization, Zero Hidden Fees, Real-time Runway Twin.
2. Market Sizing Cards:
   - TAM: $48.2 Billion (Emerging Market Short-term Liquidity Deficit).
   - SAM: $12.4 Billion (Urban Salaried Workers facing out-of-pocket health shocks in India & SEA).
   - SOM: $850 Million (Inaugural beachhead via corporate HR and hospital billing integration).
3. Clean responsive layout with interactive hover states.
```

---

### Member 14: Zero-Knowledge Privacy & RBI Regulatory Sandbox Architecture
- **Branch**: `git checkout -b feat/m14-zk-privacy-rbi`
- **Files Assigned**: `src/modules/m13_privacy_compliance/ZeroKnowledgeCompliance.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 14 on the VANTIQ team.
Your task is to build the Zero-Knowledge Privacy & Regulatory Compliance Module in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m13_privacy_compliance/ZeroKnowledgeCompliance.tsx`

Requirements:
1. ZK-SNARK Client-Side Computation Panel:
   - Explain how personal bank credentials and payroll slips never leave the user's local device.
   - Interactive proof verification widget: "Verify ZK-Capacity Proof" button that generates a mock ZK hash.
2. Regulatory Compliance Grid:
   - RBI Digital Lending Guidelines 2022/2023 compliance matrix.
   - Account Aggregator (AA) Ecosystem integration (Setu, OneMoney, Anumati).
   - Fair Recovery Practices & Anti-Harassment Guarantee.
3. Technical architecture diagram showing client-side WASM proof generation.
```

---

### Member 15: Engineering Roadmap & Team INNOVATEX Credentials
- **Branch**: `git checkout -b feat/m15-roadmap-team`
- **Files Assigned**: `src/modules/m14_roadmap_team/RoadmapAndTeam.tsx`
- **Copy-Paste Prompt**:
```markdown
You are Member 15 on the VANTIQ team.
Your task is to build the 4-Quarter Engineering Roadmap and Team Credentials Section in https://github.com/skandakn/VANTIQ.

Files to edit:
- `src/modules/m14_roadmap_team/RoadmapAndTeam.tsx`

Requirements:
1. 4-Quarter Milestones Timeline:
   - Q1: Core Quantum Knapsack Algorithm & Local React Simulation.
   - Q2: Account Aggregator API Integration & Hospital Emergency Desk Pilots.
   - Q3: Hardware Quantum Annealing Integration (D-Wave Leap / Amazon Braket QPU).
   - Q4: Pan-India NBFC Co-op Consortium & Autonomous Micro-refinancing.
2. Team INNOVATEX Credentials:
   - Team cards highlighting Algorithmic Game Theory, Behavioral Economics, Quantum Computing, and Full-Stack FinTech Engineering.
3. Clean interactive accordion or timeline UI with status pills ("Completed", "In Progress", "Planned").
```

---

## Zero-Conflict Git Workflow for Simultaneous Work

1. **Clone & Setup**:
   ```bash
   git clone https://github.com/skandakn/VANTIQ.git
   cd VANTIQ
   npm install
   ```
2. **Branch Creation**:
   ```bash
   git checkout -b <your-assigned-branch>
   ```
3. **Run Dev Server**:
   ```bash
   npm run dev
   ```
4. **Edit Only Your Assigned Directory**:
   - Do **NOT** modify other modules or rename shared files.
   - If you need a new shared type, propose it to `src/types/index.ts`.
5. **Verify Before Pushing**:
   ```bash
   npm run build
   ```
   (Must complete with exit code 0).
6. **Submit PR**:
   ```bash
   git push origin <your-assigned-branch>
   ```
