# VANTIQ
### Quantum-Assisted Counter-Predatory Financial Resilience Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Quantum_Engine-Online-cyan)](#)

> *"Scarcity captures attention, but it narrows focus—leading to decisions that solve today's crisis by engineering tomorrow's catastrophe."*  
> — **Sendhil Mullainathan & Eldar Shafir (Scarcity: Why Having Too Little Means So Much)**

---

## 🎯 The Core Problem Solved

When an individual faces an acute out-of-pocket medical shock (e.g., ₹50,000 for emergency hospitalization):
- Their monthly income is ₹40,000 with pre-existing obligations (₹8,000 EMI + ₹7,000 rent + ₹10,000 living costs).
- Their real monthly uncommitted surplus is only **₹15,000**.
- In panic, they open multiple instant fintech apps, taking:
  - App A: ₹20,000 instant loan @ 36% APR
  - App B: ₹15,000 BNPL split @ 28% APR
  - Credit Card: ₹30,000 cash advance @ 42% APR
  - App C: ₹10,000 payday credit @ 48% APR
- While they obtain the immediate ₹50,000, **the uncoordinated repayments aggregate to ₹26,200/month**.
- Because ₹26,200 exceeds their ₹15,000 capacity, **they enter an irreversible insolvency debt spiral within 45 days.**

**VANTIQ** is an open-source, quantum-inspired behavioral defense system that intercepts predatory debt-stacking, simulates a 90-day cashflow digital twin, and synthesizes an optimal multi-source rescue package.

---

## ⚡ Key Architectural Capabilities

1. **Dual-Dial Absorptive Capacity Meter**: Contrasts misleading high credit line offers against the borrower's true surplus capacity.
2. **Ghost Debt Stacking Mesh**: Exposes the compound interest trap of taking micro-loans from multiple uncoordinated lenders simultaneously.
3. **Wise-Inspired "Product as the Hero" UI/UX**:
   - **Above-The-Fold Emergency Converter**: Rather than abstract marketing claims, users can immediately interact with their real crisis numbers (₹50k shock vs. monthly surplus) in context with a live vertical fee stepper.
   - **Trust-Building Fee Comparison**: Gamified, transparent fee and repayment comparison directly showing predatory loan app penalties vs. transparent VANTIQ rescue.
   - **Low-Friction Exploratory CTAs**: Zero-signup barriers; users test and experience the math before any commitment.
   - **High-Trust Aesthetic**: Deep forest green palette with signature electric lime (`#9fe870`) accents, crisp modern typography, and clean cards.
4. **90-Day Temporal Digital Twin (TFT)**: Simulates day-by-day cashflow runway under standard borrowing vs. VANTIQ-guided optimization.
5. **QUBO / QAOA Quantum Knapsack Optimizer**: Formulates the debt relief problem as a Quadratic Unconstrained Binary Optimization (QUBO) solved via simulated quantum annealing in $<40\text{ ms}$.
6. **Tri-Tranche Multi-Source Rescue Architecture**: Synthesizes 0% employer advances, co-op credit unions, and structured repayment schedules.
7. **TreeSHAP Explainable AI**: Provides rigorous Shapley-value feature attribution explaining why specific relief tranches were recommended.
8. **Client-Side Zero-Knowledge Privacy**: Employs client-side WASM ZK-proofs so sensitive bank statements never leave the user's browser.

---

## 👥 Modular Team Architecture

The codebase is engineered with strict folder-level isolation across specialized modules:

```
src/
├── components/layout/       --> Header HUD, Nav & Footer
├── modules/
│   ├── m01_hero/            --> Scarcity Hero & Value Proposition
│   ├── m02_crisis_input/    --> Emergency Crisis Simulator & Intake
│   ├── m03_debt_mesh/       --> Ghost Debt Stacking Mesh
│   ├── m04_dual_dial/       --> Absorptive Capacity Gauge
│   ├── m05_cashflow_twin/   --> 90-Day Digital Twin Runway Chart
│   ├── m06_quantum_solver/  --> QUBO / QAOA Solver Visualizer
│   ├── m07_rescue_blend/    --> Multi-Source Rescue Cards
│   ├── m09_life_energy/     --> Life-Energy Labor Hours Calculator
│   ├── m10_comparison_matrix/-> Counterfactual Comparison Matrix
│   ├── m11_xai_explainer/   --> TreeSHAP Explainable AI Waterfall
│   ├── m12_market_radar/    --> Competitive Radar & Market Sizing
│   ├── m13_privacy_compliance/-> ZK-SNARK Privacy & RBI Sandbox
│   └── m14_roadmap_team/    --> 4-Quarter Roadmap & Team Credentials
├── context/
│   └── FintechContext.tsx   --> Shared Reactive State Store & Dispatchers
├── types/
│   └── index.ts             --> Universal Type Definitions & Domain Contracts
└── styles/
    └── design-tokens.css    --> HSL Color Palette, Glassmorphism, Neon Glows
```

> **For the full copy-paste prompts guide, see [`docs/TEAM_PROMPTS_GUIDE.md`](./docs/TEAM_PROMPTS_GUIDE.md)**.

---

## 🚀 Quickstart Guide

### 1. Clone the repository
```bash
git clone https://github.com/skandakn/VANTIQ.git
cd VANTIQ
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🔬 Mathematical Formulation: The QUBO Rescue Knapsack

The multi-source emergency liquidity formulation minimizes total expected repayment and default probability while ensuring strict shock coverage:

$$\min_{x} \quad H(x) = \sum_{i=1}^{N} c_i x_i + \lambda \left( \sum_{i=1}^{N} w_i x_i - S \right)^2 + \mu \sum_{i=1}^{N} \sum_{j=1}^{N} J_{ij} x_i x_j$$

Where:
- $x_i \in \{0, 1\}$ represents the activation state of candidate liquidity tranche $i$.
- $c_i$ is the effective cost coefficient (APR + processing churn + cognitive penalty).
- $w_i$ is the capital tranche volume.
- $S$ is the total emergency capital required (e.g., ₹50,000).
- $\lambda$ is the severe penalty multiplier for underfunding the medical emergency.
- $J_{ij}$ is the covariance coupling matrix penalizing clustered repayment deadlines that fall on the same pay cycle.

---

## 🛡️ Regulatory Compliance & Privacy
- **RBI Digital Lending Guidelines (2022/2023)**: Full compliance with First Loss Default Guarantee (FLDG) norms and Key Fact Statement (KFS) disclosures.
- **Account Aggregator (AA) Integration**: Encrypted financial data exchange via RBI-regulated NBFC-AAs.
- **Client-Side Zero-Knowledge**: Proves borrower absorptive surplus without exposing underlying bank statements or identity attributes to third parties.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
