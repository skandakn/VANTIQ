// src/modules/m02_crisis_input/EmergencyIntake.tsx
// Module 3: Emergency Crisis Intake & Budget Customizer
// CHRONOS-FIN Member 03 Implementation

import React from 'react';
import {
  AlertTriangle,
  IndianRupee,
  Wallet,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  HeartPulse,
  Wrench,
  Home,
  Briefcase,
  AlertOctagon,
  Sliders
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';
import type { FinancialProfile, EmergencyShock } from '../../types';

interface PresetOption {
  id: string;
  label: string;
  badge: string;
  amount: number;
  category: 'medical' | 'vehicle' | 'home_repair' | 'job_loss';
  description: string;
  urgencyLevel: 'critical' | 'high' | 'moderate';
  daysToDisbursement: number;
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
}

const PRESET_SCENARIOS: PresetOption[] = [
  {
    id: 'hospitalization',
    label: 'Hospitalization (₹50k)',
    badge: 'Standard Baseline',
    amount: 50000,
    category: 'medical',
    description: 'Urgent Hospital Surgery & Inpatient Medication Deposit',
    urgencyLevel: 'critical',
    daysToDisbursement: 1,
    icon: HeartPulse,
  },
  {
    id: 'surgery',
    label: 'Surgery (₹1.2L)',
    badge: 'Acute Emergency',
    amount: 120000,
    category: 'medical',
    description: 'Major Emergency Surgical Procedure & ICU Critical Care',
    urgencyLevel: 'critical',
    daysToDisbursement: 1,
    icon: AlertOctagon,
  },
  {
    id: 'prescription',
    label: 'Prescription & Labs (₹25k)',
    badge: 'Diagnostics',
    amount: 25000,
    category: 'medical',
    description: 'Urgent Specialty Prescriptions & Advanced Imaging Labs',
    urgencyLevel: 'high',
    daysToDisbursement: 2,
    icon: Sparkles,
  },
  {
    id: 'vehicle',
    label: 'Vehicle Repair (₹35k)',
    badge: 'Commute Shock',
    amount: 35000,
    category: 'vehicle',
    description: 'Sudden Engine Failure & Transmission Assembly Repair',
    urgencyLevel: 'high',
    daysToDisbursement: 1,
    icon: Wrench,
  },
  {
    id: 'home_repair',
    label: 'Home Disaster (₹60k)',
    badge: 'Property Damage',
    amount: 60000,
    category: 'home_repair',
    description: 'Critical Structural Plumbing & Electrical Hazard Fix',
    urgencyLevel: 'moderate',
    daysToDisbursement: 3,
    icon: Home,
  },
];

const CATEGORIES: { id: EmergencyShock['category']; label: string; icon: React.ComponentType<{ size?: number; color?: string }> }[] = [
  { id: 'medical', label: 'Medical Emergency', icon: HeartPulse },
  { id: 'vehicle', label: 'Vehicle Breakdown', icon: Wrench },
  { id: 'home_repair', label: 'Home Disaster', icon: Home },
  { id: 'job_loss', label: 'Job Loss Buffer', icon: Briefcase },
];

const URGENCY_OPTIONS: { id: EmergencyShock['urgencyLevel']; label: string; hours: string; color: string }[] = [
  { id: 'critical', label: 'Critical Immediate', hours: '< 24 Hours', color: '#ef4444' },
  { id: 'high', label: 'High Urgency', hours: '24 – 48 Hours', color: '#f59e0b' },
  { id: 'moderate', label: 'Moderate Window', hours: '3 – 7 Days', color: '#06b6d4' },
];

export const EmergencyIntake: React.FC = () => {
  const { profile, setProfile, shock, setShock } = useFintech();

  // Helper dispatchers for reactive updates
  const updateProfile = (updates: Partial<FinancialProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const updateShock = (updates: Partial<EmergencyShock>) => {
    setShock((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Field change handlers
  const handleShockAmount = (val: number) => {
    const clamped = Math.max(1000, isNaN(val) ? 0 : val);
    updateShock({ amount: clamped });
  };

  const handleSalaryChange = (val: number) => {
    const safe = Math.max(0, isNaN(val) ? 0 : val);
    updateProfile({ monthlyIncome: safe });
  };

  const handleEmiChange = (val: number) => {
    const safe = Math.max(0, isNaN(val) ? 0 : val);
    updateProfile({ existingEmi: safe });
  };

  const handleRentChange = (val: number) => {
    const safe = Math.max(0, isNaN(val) ? 0 : val);
    updateProfile({ houseRent: safe });
  };

  const handleLivingChange = (val: number) => {
    const safe = Math.max(0, isNaN(val) ? 0 : val);
    updateProfile({ livingExpenses: safe });
  };

  const handleSavingsChange = (val: number) => {
    const safe = Math.max(0, isNaN(val) ? 0 : val);
    updateProfile({ emergencySavings: safe });
  };

  const applyPreset = (preset: PresetOption) => {
    updateShock({
      amount: preset.amount,
      category: preset.category,
      description: preset.description,
      urgencyLevel: preset.urgencyLevel,
      daysToDisbursement: preset.daysToDisbursement,
    });
  };

  const resetToBenchmark = () => {
    updateProfile({
      monthlyIncome: 40000,
      existingEmi: 8000,
      houseRent: 7000,
      livingExpenses: 10000,
      emergencySavings: 5000,
    });
    updateShock({
      amount: 50000,
      category: 'medical',
      description: 'Urgent Hospital Surgery & Inpatient Medication Deposit',
      urgencyLevel: 'critical',
      daysToDisbursement: 1,
    });
  };

  // Real-time computations
  const totalCommittedOutflow = profile.existingEmi + profile.houseRent + profile.livingExpenses;
  const netDisposableSurplus = profile.monthlyIncome - totalCommittedOutflow;
  const unfundedDeficit = Math.max(0, shock.amount - profile.emergencySavings);

  // Warning logic: Shock exceeds 3x monthly surplus
  const threeTimesSurplus = netDisposableSurplus > 0 ? netDisposableSurplus * 3 : 0;
  const isSurplusNegative = netDisposableSurplus <= 0;
  const isHighRiskShock = isSurplusNegative || shock.amount > threeTimesSurplus;
  const shockToSurplusRatio = netDisposableSurplus > 0 ? (shock.amount / netDisposableSurplus).toFixed(1) : '∞';

  // Allocation percentages for visual cashflow breakdown
  const salary = Math.max(1, profile.monthlyIncome);
  const emiPct = Math.min(100, Math.round((profile.existingEmi / salary) * 100));
  const rentPct = Math.min(100, Math.round((profile.houseRent / salary) * 100));
  const livingPct = Math.min(100, Math.round((profile.livingExpenses / salary) * 100));
  const surplusPct = Math.max(0, Math.round((netDisposableSurplus / salary) * 100));

  // Range Slider Progress Fill Calculation
  const getSliderBackground = (val: number, min: number, max: number, activeColor: string) => {
    const percentage = Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100));
    return `linear-gradient(to right, ${activeColor} 0%, ${activeColor} ${percentage}%, rgba(51, 65, 85, 0.45) ${percentage}%, rgba(51, 65, 85, 0.45) 100%)`;
  };

  // Currency Formatter
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(val));
  };

  return (
    <section id="crisis-intake" style={{ padding: '60px 0', position: 'relative' }}>
      {/* Scoped Custom Slider Styles */}
      <style>{`
        .chronos-range-input {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 7px;
          border-radius: 9999px;
          outline: none;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .chronos-range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #38bdf8;
          border: 2px solid #0a1124;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.85);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .chronos-range-input::-webkit-slider-thumb:hover {
          transform: scale(1.22);
          box-shadow: 0 0 18px rgba(56, 189, 248, 1);
        }
        .chronos-range-input::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #38bdf8;
          border: 2px solid #0a1124;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.85);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .chronos-range-input.red::-webkit-slider-thumb {
          background: #ef4444;
          box-shadow: 0 0 14px rgba(239, 68, 68, 0.85);
        }
        .chronos-range-input.emerald::-webkit-slider-thumb {
          background: #10b981;
          box-shadow: 0 0 14px rgba(16, 185, 129, 0.85);
        }
        .chronos-range-input.amber::-webkit-slider-thumb {
          background: #f59e0b;
          box-shadow: 0 0 14px rgba(245, 158, 11, 0.85);
        }
        .chronos-range-input.purple::-webkit-slider-thumb {
          background: #8b5cf6;
          box-shadow: 0 0 14px rgba(139, 92, 246, 0.85);
        }
        .preset-btn-hover:hover {
          transform: translateY(-2px);
          border-color: #38bdf8 !important;
          background: rgba(56, 189, 248, 0.12) !important;
        }
      `}</style>

      <div className="container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-red">
                <AlertTriangle size={13} />
                <span>Step 1: Crisis Intake & Household Budget Customizer</span>
              </span>
              <span className="badge badge-cyan">
                <Sliders size={13} />
                <span>Interactive Dynamic Model</span>
              </span>
            </div>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '6px' }}>
              Configure The Crisis & Calibrate Cashflow
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.98rem', maxWidth: '780px', lineHeight: 1.55 }}>
              Simulate an acute out-of-pocket liquidity shock against verified household expenses. CHRONOS-FIN maps your true disposable repayment headroom to safeguard against predatory loan stacking.
            </p>
          </div>

          {/* Reset Action */}
          <button
            onClick={resetToBenchmark}
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem', padding: '8px 16px', gap: '6px' }}
            title="Reset inputs to standard ₹40,000 salary / ₹50,000 shock scenario"
          >
            <RotateCcw size={14} />
            <span>Reset to Benchmark</span>
          </button>
        </div>

        {/* Quick Presets Row */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={16} color="#38bdf8" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Quick Preset Shock Scenarios
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {PRESET_SCENARIOS.map((preset) => {
              const Icon = preset.icon;
              const isSelected = shock.amount === preset.amount && shock.category === preset.category;
              return (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className="preset-btn-hover"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.16)' : 'rgba(15, 23, 42, 0.75)',
                    border: isSelected ? '1.5px solid #06b6d4' : '1px solid rgba(51, 65, 85, 0.55)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 15px rgba(6, 182, 212, 0.25)' : 'none',
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? '#06b6d4' : 'rgba(30, 41, 59, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? '#0f172a' : '#38bdf8',
                    flexShrink: 0
                  }}>
                    <Icon size={18} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? '#f8fafc' : '#e2e8f0', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {preset.label}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: isSelected ? '#38bdf8' : '#94a3b8' }}>
                      {preset.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Split */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          
          {/* Card 1: Emergency Shock Demand */}
          <div className="chronos-card glow-cyan" style={{ borderTop: '4px solid #ef4444', display: 'flex', flexDirection: 'column' }}>
            
            {/* Card Title */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShieldAlert size={22} color="#ef4444" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>
                    Emergency Liquidity Needed
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Acute Out-of-Pocket Expense Parameter
                  </span>
                </div>
              </div>
              <span className="badge badge-red" style={{ fontSize: '0.72rem' }}>
                Urgent Bill
              </span>
            </div>

            {/* Shock Amount Numeric Input + Dynamic Display */}
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(10, 17, 36, 0.85)',
              border: '1px solid rgba(51, 65, 85, 0.6)',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="shock-numeric-input" style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                  Emergency Shock Requirement
                </label>
                <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>
                  Range: ₹10,000 – ₹2,00,000
                </span>
              </div>

              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '16px', color: '#38bdf8', display: 'flex', alignItems: 'center' }}>
                  <IndianRupee size={22} />
                </span>
                <input
                  id="shock-numeric-input"
                  type="number"
                  min={10000}
                  max={200000}
                  step={1000}
                  value={shock.amount}
                  onChange={(e) => handleShockAmount(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    borderRadius: '10px',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    color: '#f8fafc',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    outline: 'none',
                    boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.5)'
                  }}
                />
              </div>

              {/* Range Slider for Shock */}
              <div style={{ marginTop: '16px' }}>
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={1000}
                  value={shock.amount}
                  onChange={(e) => handleShockAmount(parseInt(e.target.value))}
                  className="chronos-range-input red"
                  style={{
                    background: getSliderBackground(shock.amount, 10000, 200000, '#ef4444')
                  }}
                  aria-label="Emergency Shock Amount Slider"
                />
                
                {/* Tick Indicators */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginTop: '6px', fontWeight: 600 }}>
                  <span>₹10,000</span>
                  <span>₹50,000</span>
                  <span>₹1,00,000</span>
                  <span>₹1,50,000</span>
                  <span>₹2,00,000</span>
                </div>
              </div>
            </div>

            {/* Shock Category Selector */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, marginBottom: '8px' }}>
                Crisis Category
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {CATEGORIES.map((cat) => {
                  const CatIcon = cat.icon;
                  const isActive = shock.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => updateShock({ category: cat.id })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        backgroundColor: isActive ? 'rgba(239, 68, 68, 0.15)' : 'rgba(15, 23, 42, 0.7)',
                        border: isActive ? '1.5px solid #ef4444' : '1px solid rgba(51, 65, 85, 0.45)',
                        color: isActive ? '#f8fafc' : '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: isActive ? 700 : 500,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <CatIcon size={15} color={isActive ? '#ef4444' : '#94a3b8'} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Urgency Level Selector */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, marginBottom: '8px' }}>
                Disbursement Urgency Window
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {URGENCY_OPTIONS.map((urg) => {
                  const isSelected = shock.urgencyLevel === urg.id;
                  return (
                    <button
                      key={urg.id}
                      type="button"
                      onClick={() => updateShock({
                        urgencyLevel: urg.id,
                        daysToDisbursement: urg.id === 'critical' ? 1 : urg.id === 'high' ? 2 : 5
                      })}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        backgroundColor: isSelected ? 'rgba(30, 41, 59, 0.9)' : 'rgba(15, 23, 42, 0.65)',
                        border: isSelected ? `1.5px solid ${urg.color}` : '1px solid rgba(51, 65, 85, 0.45)',
                        color: isSelected ? '#f8fafc' : '#94a3b8',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isSelected ? urg.color : '#cbd5e1' }}>
                        {urg.label}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                        {urg.hours}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Liquid Emergency Savings Slider */}
            <div style={{
              padding: '14px 16px',
              borderRadius: '10px',
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(51, 65, 85, 0.5)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Wallet size={15} color="#34d399" />
                  <label htmlFor="savings-slider" style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>
                    Available Liquid Savings (₹)
                  </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399' }}>
                    ₹{formatINR(profile.emergencySavings)}
                  </span>
                </div>
              </div>

              <input
                id="savings-slider"
                type="range"
                min={0}
                max={50000}
                step={1000}
                value={profile.emergencySavings}
                onChange={(e) => handleSavingsChange(parseInt(e.target.value))}
                className="chronos-range-input emerald"
                style={{
                  background: getSliderBackground(profile.emergencySavings, 0, 50000, '#10b981')
                }}
                aria-label="Liquid Emergency Savings Slider"
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>
                <span>₹0 (Zero Buffer)</span>
                <span>₹25,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Unfunded Deficit Callout Card */}
            <div style={{
              marginTop: 'auto',
              padding: '14px 16px',
              borderRadius: '10px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={20} color="#f87171" />
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                    Net External Liquidity Deficit
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>
                    Required: <strong>₹{formatINR(shock.amount)}</strong> &minus; Savings: <strong>₹{formatINR(profile.emergencySavings)}</strong>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>
                  ₹{formatINR(unfundedDeficit)}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#f87171' }}>
                  Must be bridged
                </div>
              </div>
            </div>

          </div>

          {/* Card 2: Household Budget & Cashflow Sliders */}
          <div className="chronos-card glow-emerald" style={{ borderTop: '4px solid #10b981', display: 'flex', flexDirection: 'column' }}>
            
            {/* Card Title */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Wallet size={22} color="#10b981" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>
                    Monthly Household Cashflow
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Calibrate Baseline Income & Committed Obligations
                  </span>
                </div>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                Verified Cashflow
              </span>
            </div>

            {/* Slider 1: Monthly Salary (Income) */}
            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(51, 65, 85, 0.5)',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>Monthly Salary / Income</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Primary stable inflow</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>
                    ₹{formatINR(profile.monthlyIncome)}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={15000}
                max={150000}
                step={1000}
                value={profile.monthlyIncome}
                onChange={(e) => handleSalaryChange(parseInt(e.target.value))}
                className="chronos-range-input emerald"
                style={{
                  background: getSliderBackground(profile.monthlyIncome, 15000, 150000, '#10b981')
                }}
                aria-label="Monthly Salary Slider"
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>
                <span>₹15,000</span>
                <span>Benchmark: ₹40,000</span>
                <span>₹1,50,000</span>
              </div>
            </div>

            {/* Slider 2: Existing Monthly EMI */}
            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(51, 65, 85, 0.5)',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>Existing Active EMI</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Pre-existing bank / consumer loans</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f87171' }}>
                    ₹{formatINR(profile.existingEmi)}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>({emiPct}%)</span>
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={40000}
                step={500}
                value={profile.existingEmi}
                onChange={(e) => handleEmiChange(parseInt(e.target.value))}
                className="chronos-range-input red"
                style={{
                  background: getSliderBackground(profile.existingEmi, 0, 40000, '#ef4444')
                }}
                aria-label="Existing EMI Slider"
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>
                <span>₹0 (Debt-Free)</span>
                <span>Benchmark: ₹8,000</span>
                <span>₹40,000</span>
              </div>
            </div>

            {/* Slider 3: House Rent */}
            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(51, 65, 85, 0.5)',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>House Rent / Housing</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Non-negotiable shelter outflow</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#c084fc' }}>
                    ₹{formatINR(profile.houseRent)}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>({rentPct}%)</span>
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={35000}
                step={500}
                value={profile.houseRent}
                onChange={(e) => handleRentChange(parseInt(e.target.value))}
                className="chronos-range-input purple"
                style={{
                  background: getSliderBackground(profile.houseRent, 0, 35000, '#8b5cf6')
                }}
                aria-label="House Rent Slider"
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>
                <span>₹0 (Own House)</span>
                <span>Benchmark: ₹7,000</span>
                <span>₹35,000</span>
              </div>
            </div>

            {/* Slider 4: Living & Food Expenses */}
            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(51, 65, 85, 0.5)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>Living, Food & Utilities</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Essential groceries & bills</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fbbf24' }}>
                    ₹{formatINR(profile.livingExpenses)}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>({livingPct}%)</span>
                </div>
              </div>

              <input
                type="range"
                min={2000}
                max={40000}
                step={500}
                value={profile.livingExpenses}
                onChange={(e) => handleLivingChange(parseInt(e.target.value))}
                className="chronos-range-input amber"
                style={{
                  background: getSliderBackground(profile.livingExpenses, 2000, 40000, '#f59e0b')
                }}
                aria-label="Living Expenses Slider"
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>
                <span>₹2,000</span>
                <span>Benchmark: ₹10,000</span>
                <span>₹40,000</span>
              </div>
            </div>

            {/* Income Allocation Bar */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
                <span>Household Outflow Distribution</span>
                <span>Committed: {emiPct + rentPct + livingPct}% | Surplus: {surplusPct}%</span>
              </div>
              <div style={{
                height: '10px',
                width: '100%',
                borderRadius: '9999px',
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                overflow: 'hidden',
                display: 'flex',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)'
              }}>
                <div style={{ width: `${emiPct}%`, backgroundColor: '#ef4444' }} title={`EMI: ₹${formatINR(profile.existingEmi)} (${emiPct}%)`} />
                <div style={{ width: `${rentPct}%`, backgroundColor: '#8b5cf6' }} title={`Rent: ₹${formatINR(profile.houseRent)} (${rentPct}%)`} />
                <div style={{ width: `${livingPct}%`, backgroundColor: '#f59e0b' }} title={`Living: ₹${formatINR(profile.livingExpenses)} (${livingPct}%)`} />
                <div style={{ width: `${surplusPct}%`, backgroundColor: '#10b981' }} title={`Net Surplus: ₹${formatINR(netDisposableSurplus)} (${surplusPct}%)`} />
              </div>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '6px', fontSize: '0.68rem', color: '#94a3b8' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} /> EMI
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6' }} /> Rent
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }} /> Living
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} /> Free Surplus
                </span>
              </div>
            </div>

            {/* Dynamic Computation Result Box */}
            <div style={{
              marginTop: 'auto',
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: isSurplusNegative ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
              border: isSurplusNegative ? '1.5px solid rgba(239, 68, 68, 0.4)' : '1.5px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: isSurplusNegative ? '0 0 20px rgba(239, 68, 68, 0.15)' : '0 0 20px rgba(16, 185, 129, 0.15)'
            }}>
              <div>
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: isSurplusNegative ? '#fca5a5' : '#6ee7b7',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Net Disposable Monthly Surplus
                </div>
                <div style={{
                  fontSize: '1.45rem',
                  fontWeight: 850,
                  color: isSurplusNegative ? '#ef4444' : '#34d399',
                  letterSpacing: '-0.02em',
                  margin: '2px 0'
                }}>
                  ₹{formatINR(netDisposableSurplus)} <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>/ month</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  Formula: ₹{formatINR(profile.monthlyIncome)} &minus; (₹{formatINR(profile.existingEmi)} + ₹{formatINR(profile.houseRent)} + ₹{formatINR(profile.livingExpenses)})
                </div>
              </div>

              <div>
                <span className={`badge ${isSurplusNegative ? 'badge-red' : 'badge-emerald'}`}>
                  {isSurplusNegative ? 'Deficit Crash' : `${surplusPct}% Uncommitted`}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Real-Time Warning Alert / Capacity Evaluation Banner */}
        <div style={{
          borderRadius: '16px',
          padding: '22px 24px',
          backgroundColor: isHighRiskShock
            ? 'rgba(239, 68, 68, 0.1)'
            : 'rgba(16, 185, 129, 0.08)',
          border: isHighRiskShock
            ? '2px solid rgba(239, 68, 68, 0.6)'
            : '1.5px solid rgba(16, 185, 129, 0.45)',
          boxShadow: isHighRiskShock
            ? '0 0 35px rgba(239, 68, 68, 0.22)'
            : '0 0 25px rgba(16, 185, 129, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: isHighRiskShock ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {isHighRiskShock ? (
                  <AlertTriangle size={24} color="#ef4444" />
                ) : (
                  <CheckCircle2 size={24} color="#10b981" />
                )}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: isHighRiskShock ? '#f87171' : '#34d399',
                    letterSpacing: '-0.01em'
                  }}>
                    {isHighRiskShock
                      ? '⚠️ CRITICAL REPAYMENT STRESS DETECTED (Shock > 3x Monthly Surplus)'
                      : '✅ ABSORPTIVE CAPACITY WITHIN STABLE BOUNDS (Shock ≤ 3x Surplus)'}
                  </h4>
                  <span className={`badge ${isHighRiskShock ? 'badge-red' : 'badge-emerald'}`} style={{ fontSize: '0.7rem' }}>
                    {isHighRiskShock ? 'High Insolvency Risk' : 'Healthy Buffer'}
                  </span>
                </div>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', marginTop: '2px' }}>
                  {isSurplusNegative ? (
                    <>Household obligations already exceed monthly income by <strong>₹{formatINR(Math.abs(netDisposableSurplus))}</strong>. Zero buffer exists to absorb new debt without structured debt relief.</>
                  ) : isHighRiskShock ? (
                    <>Emergency shock of <strong>₹{formatINR(shock.amount)}</strong> is <strong>{shockToSurplusRatio}x</strong> your net monthly surplus (₹{formatINR(netDisposableSurplus)} &times; 3 = <strong>₹{formatINR(threeTimesSurplus)}</strong>). Predatory multi-app borrowing will trigger cascading defaults within 32–45 days!</>
                  ) : (
                    <>Emergency shock of <strong>₹{formatINR(shock.amount)}</strong> is <strong>{shockToSurplusRatio}x</strong> your net monthly surplus (Buffer: ₹{formatINR(threeTimesSurplus)}). Can be safely amortized via zero-APR tranches and credit-union co-ops.</>
                  )}
                </p>
              </div>
            </div>

            {/* Quick Metrics Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '10px 18px',
              borderRadius: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(51, 65, 85, 0.6)'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                  Surplus Multiple
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: isHighRiskShock ? '#ef4444' : '#34d399' }}>
                  {shockToSurplusRatio}x
                </span>
              </div>

              <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(51, 65, 85, 0.6)' }} />

              <div>
                <span style={{ display: 'block', fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                  3x Safe Threshold
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                  ₹{formatINR(threeTimesSurplus)}
                </span>
              </div>
            </div>

          </div>

          {/* Granular Behavioral Insight */}
          <div style={{
            fontSize: '0.78rem',
            color: '#94a3b8',
            paddingTop: '8px',
            borderTop: '1px solid rgba(51, 65, 85, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <span>
              💡 <strong>Behavioral Scarcity Law:</strong> In acute panic, borrowers evaluate single repayment promises in isolation, ignoring cumulative collisions on Day 30 and Day 32.
            </span>
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>
              CHRONOS Reactive Engine synchronizing with Quantum Knapsack below ↓
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EmergencyIntake;
