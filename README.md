# CHRONOS-FIN (VANTIQ)
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

**CHRONOS-FIN** is an open-source, quantum-inspired behavioral defense system that intercepts predatory debt-stacking, simulates a 90-day cashflow digital twin, and synthesizes an optimal multi-source rescue package.

---

## ⚡ Key Architectural Capabilities

1. **Dual-Dial Absorptive Capacity Meter**: Contrasts misleading high credit line offers against the borrower's true surplus capacity.
2. **Ghost Debt Stacking Mesh**: Exposes the compound interest trap of taking micro-loans from multiple uncoordinated lenders simultaneously.
3. **90-Day Temporal Digital Twin (TFT)**: Simulates day-by-day cashflow runway under standard borrowing vs. CHRONOS-guided optimization.
4. **QUBO / QAOA Quantum Knapsack Optimizer**: Formulates the debt relief problem as a Quadratic Unconstrained Binary Optimization (QUBO) solved via simulated quantum annealing in $<40\text{ ms}$.
5. **Tri-Tranche Multi-Source Rescue Architecture**: Synthesizes 0% employer advances, co-op credit unions, and structured repayment schedules.
6. **45-Second Neuro-Adaptive Grounding Protocol**: A behavioral friction circuit breaker preventing panic-driven one-click borrowing.
7. **TreeSHAP Explainable AI**: Provides rigorous Shapley-value feature attribution explaining why specific relief tranches were recommended.
8. **Client-Side Zero-Knowledge Privacy**: Employs client-side WASM ZK-proofs so sensitive bank statements never leave the user's browser.

---

## 👥 15-Member Modular Team Architecture

The codebase is engineered with strict folder-level isolation so that **15 team members can write code simultaneously with zero merge conflicts**:

```
src/
├── components/layout/       --> [Member 01] Header HUD, Nav & Footer
├── modules/
│   ├── m01_hero/            --> [Member 02] Scarcity Hero & Value Proposition
│   ├── m02_crisis_input/    --> [Member 03] Emergency Crisis Simulator & Intake
│   ├── m03_debt_mesh/       --> [Member 04] Ghost Debt Stacking Mesh
│   ├── m04_dual_dial/       --> [Member 05] Absorptive Capacity Gauge
│   ├── m05_cashflow_twin/   --> [Member 06] 90-Day Digital Twin Runway Chart
│   ├── m06_quantum_solver/  --> [Member 07] QUBO / QAOA Solver Visualizer
│   ├── m07_rescue_blend/    --> [Member 08] Multi-Source Rescue Cards
│   ├── m08_neuro_shield/    --> [Member 09] 45s Grounding Shield Modal
│   ├── m09_life_energy/     --> [Member 10] Life-Energy Labor Hours Calculator
│   ├── m10_comparison_matrix/-> [Member 11] Counterfactual Comparison Matrix
│   ├── m11_xai_explainer/   --> [Member 12] TreeSHAP Explainable AI Waterfall
│   ├── m12_market_radar/    --> [Member 13] Competitive Radar & Market Sizing
│   ├── m13_privacy_compliance/->[Member 14] ZK-SNARK Privacy & RBI Sandbox
│   └── m14_roadmap_team/    --> [Member 15] 4-Quarter Roadmap & Team Credentials
├── context/
│   └── FintechContext.tsx   --> Shared Reactive State Store & Dispatchers
├── types/
│   └── index.ts             --> Universal Type Definitions & Domain Contracts
└── styles/
    └── design-tokens.css    --> HSL Color Palette, Glassmorphism, Neon Glows
```

> **For the full copy-paste prompts for all 15 members, see [`docs/TEAM_PROMPTS_GUIDE.md`](./docs/TEAM_PROMPTS_GUIDE.md)**.

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
