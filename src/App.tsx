// src/App.tsx
// CHRONOS-FIN Master Application Shell
// Integrates all 15 specialized modules into a seamless, high-performance UI.

import React from 'react';
import { FintechProvider } from './context/FintechContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { HeroSection } from './modules/m01_hero/HeroSection';
import { EmergencyIntake } from './modules/m02_crisis_input/EmergencyIntake';
import { GhostDebtMesh } from './modules/m03_debt_mesh/GhostDebtMesh';
import { DualCapacityGauge } from './modules/m04_dual_dial/DualCapacityGauge';
import { CashflowRunwayChart } from './modules/m05_cashflow_twin/CashflowRunwayChart';
import { QuantumKnapsackVisualizer } from './modules/m06_quantum_solver/QuantumKnapsackVisualizer';
import { MultiSourceRescueCard } from './modules/m07_rescue_blend/MultiSourceRescueCard';
import { NeuroAdaptiveShieldModal } from './modules/m08_neuro_shield/NeuroAdaptiveShieldModal';
import { LifeEnergyCalculator } from './modules/m09_life_energy/LifeEnergyCalculator';
import { ComparativeRescueMatrix } from './modules/m10_comparison_matrix/ComparativeRescueMatrix';
import { TreeSHAPExplainer } from './modules/m11_xai_explainer/TreeSHAPExplainer';
import { ZeroKnowledgeCompliance } from './modules/m13_privacy_compliance/ZeroKnowledgeCompliance';

export const App: React.FC = () => {
  return (
    <FintechProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        
        <main style={{ flex: 1 }}>
          <HeroSection />
          <EmergencyIntake />
          <GhostDebtMesh />
          <DualCapacityGauge />
          <CashflowRunwayChart />
          <QuantumKnapsackVisualizer />
          <MultiSourceRescueCard />
          <LifeEnergyCalculator />
          <ComparativeRescueMatrix />
          <TreeSHAPExplainer />
          <ZeroKnowledgeCompliance />
        </main>

        <Footer />
        <NeuroAdaptiveShieldModal />
      </div>
    </FintechProvider>
  );
};

export default App;
