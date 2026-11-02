// src/App.tsx
// VANTIQ Master Application Shell
// Integrates specialized modules into a seamless, high-performance UI.

import React from 'react';
import { FintechProvider } from './context/FintechContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PwaMobileNav } from './components/layout/PwaMobileNav';

import { HeroSection } from './modules/m01_hero/HeroSection';
import { EmergencyIntake } from './modules/m02_crisis_input/EmergencyIntake';
import { HealthReliefNavigator } from './modules/m15_health_navigator/HealthReliefNavigator';
import { GhostDebtMesh } from './modules/m03_debt_mesh/GhostDebtMesh';
import { DualCapacityGauge } from './modules/m04_dual_dial/DualCapacityGauge';
import { CashflowRunwayChart } from './modules/m05_cashflow_twin/CashflowRunwayChart';
import { MultiSourceRescueCard } from './modules/m07_rescue_blend/MultiSourceRescueCard';
import { LifeEnergyCalculator } from './modules/m09_life_energy/LifeEnergyCalculator';
import { ComparativeRescueMatrix } from './modules/m10_comparison_matrix/ComparativeRescueMatrix';
import { TreeSHAPExplainer } from './modules/m11_xai_explainer/TreeSHAPExplainer';
import { MarketRadarChart } from './modules/m12_market_radar/MarketRadarChart';
import { ZeroKnowledgeCompliance } from './modules/m13_privacy_compliance/ZeroKnowledgeCompliance';
import { RoadmapAndTeam } from './modules/m14_roadmap_team/RoadmapAndTeam';

export const App: React.FC = () => {
  return (
    <FintechProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        
        <main style={{ flex: 1 }}>
          <HeroSection />
          <EmergencyIntake />
          <HealthReliefNavigator />
          <GhostDebtMesh />
          <DualCapacityGauge />

          <CashflowRunwayChart />
          <MultiSourceRescueCard />
          <LifeEnergyCalculator />
          <ComparativeRescueMatrix />
          <TreeSHAPExplainer />
          <MarketRadarChart />
          <ZeroKnowledgeCompliance />
          <RoadmapAndTeam />
        </main>

        <Footer />
        <PwaMobileNav />
      </div>
    </FintechProvider>
  );
};

export default App;
