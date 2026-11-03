// src/pages/DashboardPage.tsx
// Executive Dashboard Overview for VANTIQ
import React from 'react';
import { HeroSection } from '../modules/m01_hero/HeroSection';
import { HealthReliefNavigator } from '../modules/m15_health_navigator/HealthReliefNavigator';
import { CashflowRunwayChart } from '../modules/m05_cashflow_twin/CashflowRunwayChart';
import { LifeEnergyCalculator } from '../modules/m09_life_energy/LifeEnergyCalculator';

export const DashboardPage: React.FC = () => {
  return (
    <div className="vantiq-dashboard-page" style={{ paddingBottom: '60px' }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Main Flow: Health & Medical Relief Navigator (Fund Finder) */}
      <HealthReliefNavigator />

      {/* 90-Day Cashflow Digital Twin */}
      <CashflowRunwayChart />

      {/* Life Energy Labor Cost Calculator */}
      <LifeEnergyCalculator />
    </div>
  );
};
