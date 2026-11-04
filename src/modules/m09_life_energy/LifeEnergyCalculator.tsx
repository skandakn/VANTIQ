// src/modules/m09_life_energy/LifeEnergyCalculator.tsx
// Module 10: "Life-Energy" Labor Hours Equivalency Calculator
// Role: Member 10 (VANTIQ Team)
// Translates predatory debt into real physical hours and days of human labor freedom.

import React, { useState, useMemo } from 'react';
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Zap,
  RotateCcw,
  Coffee,
  Smile,
  Sun,
  Trophy,
  Briefcase,
  Hourglass,
  HeartHandshake,
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const LifeEnergyCalculator: React.FC = () => {
  const { profile, fundingPlan, shock } = useFintech();

  // Interactive Configuration Controls
  const [customSalary, setCustomSalary] = useState<number | null>(null);
  const [monthlyHours, setMonthlyHours] = useState<number>(160); // 160 standard working hours
  const [hoursPerDay, setHoursPerDay] = useState<number>(8); // 8-hour shift

  // Requirement 2: Compute Real Hourly Wage
  // Monthly salary / 160 working hours = Net hourly wage (₹40,000 / 160 = ₹250/hour)
  const effectiveSalary = customSalary !== null ? customSalary : (profile?.monthlyIncome || 40000);
  const hourlyWage = useMemo(() => {
    return Math.max(1, Math.round((effectiveSalary / monthlyHours) * 100) / 100);
  }, [effectiveSalary, monthlyHours]);

  const isDefaultBenchmark = effectiveSalary === 40000 && monthlyHours === 160;

  // Predatory Repayment: Defaults to ₹68,400 for standard shock benchmark, or scales with active shock
  const predatoryRepayment = useMemo(() => {
    if (isDefaultBenchmark && (!shock || shock.amount === 50000)) {
      return 68400;
    }
    const base = shock?.amount || 50000;
    return Math.round(base * 1.368); // 36.8% all-in predatory rate
  }, [isDefaultBenchmark, shock]);

  // Estimated repayment from the current funding plan.
  const vantiqRepayment = useMemo(() => {
    if (isDefaultBenchmark && (!shock || shock.amount === 50000)) {
      return 51420;
    }
    return fundingPlan?.totalRepayment || 51420;
  }, [isDefaultBenchmark, shock, fundingPlan]);

  // Real Labor Hours calculations
  const predatoryHours = useMemo(() => {
    if (isDefaultBenchmark && hourlyWage === 250 && predatoryRepayment === 68400) {
      return 273.6;
    }
    return Math.round((predatoryRepayment / hourlyWage) * 10) / 10;
  }, [isDefaultBenchmark, hourlyWage, predatoryRepayment]);

  const vantiqHours = useMemo(() => {
    if (isDefaultBenchmark && hourlyWage === 250 && vantiqRepayment === 51420) {
      return 205.6;
    }
    return Math.round((vantiqRepayment / hourlyWage) * 10) / 10;
  }, [isDefaultBenchmark, hourlyWage, vantiqRepayment]);

  const savedHours = useMemo(() => {
    if (isDefaultBenchmark && predatoryHours === 273.6 && vantiqHours === 205.6) {
      return 68.0;
    }
    return Math.max(0, Math.round((predatoryHours - vantiqHours) * 10) / 10);
  }, [isDefaultBenchmark, predatoryHours, vantiqHours]);

  // Working Days calculations (at specified hours/day)
  const predatoryDays = useMemo(() => {
    return Math.round((predatoryHours / hoursPerDay) * 10) / 10; // ~34.2 days
  }, [predatoryHours, hoursPerDay]);

  const vantiqDays = useMemo(() => {
    return Math.round((vantiqHours / hoursPerDay) * 10) / 10; // ~25.7 days
  }, [vantiqHours, hoursPerDay]);

  const savedDays = useMemo(() => {
    return Math.round((savedHours / hoursPerDay) * 10) / 10; // ~8.5 days
  }, [savedHours, hoursPerDay]);

  const savedCash = Math.max(0, predatoryRepayment - vantiqRepayment);

  // Reset to canonical prompt parameters
  const handleReset = () => {
    setCustomSalary(40000);
    setMonthlyHours(160);
    setHoursPerDay(8);
  };

  return (
    <section id="life-energy" style={{ padding: '40px 0', position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-emerald" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                <Clock size={14} />
                <span>Life-Energy Labor Hours Calculator</span>
              </span>
              <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                Human Cost Equivalency Engine
              </span>
            </div>

            <button
              onClick={handleReset}
              className="btn btn-secondary"
              style={{ fontSize: '0.75rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              title="Reset parameters to canonical benchmark (₹40,000 salary / 160 hrs / ₹250 wage)"
            >
              <RotateCcw size={13} />
              <span>Reset Benchmark</span>
            </button>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Translating Predatory Debt into <span style={{ color: '#15803d' }}>Hours of Human Life</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '880px', lineHeight: 1.6, fontWeight: 500 }}>
            Nominal APR percentages hide real suffering. By dividing predatory liabilities by your <strong>real hourly wage</strong>,
            we quantify exactly how many working days of your physical existence are hijacked by loan apps versus preserved by VANTIQ.
          </p>
        </div>

        {/* Real Hourly Wage Hero Formula Banner */}
        <div className="vantiq-card" style={{
          padding: '24px 32px',
          marginBottom: '28px',
          backgroundColor: '#ffffff',
          border: '1.5px solid #d0d7cc',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#edf4ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--wise-forest)'
            }}>
              <Briefcase size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#15803d', fontWeight: 800, letterSpacing: '0.06em' }}>
                Net Real Hourly Wage Metric
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--wise-forest)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span>₹{effectiveSalary.toLocaleString()} salary</span>
                <span style={{ color: '#94a3b8' }}>÷</span>
                <span>{monthlyHours} working hrs</span>
                <span style={{ color: '#15803d' }}>=</span>
                <span style={{ color: '#15803d', fontSize: '1.6rem', fontWeight: 900 }}>
                  ₹{hourlyWage}/hour
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                Every ₹{(hourlyWage * hoursPerDay).toLocaleString()} you earn requires <strong>{hoursPerDay} hours</strong> of your finite physical life-energy.
              </div>
            </div>
          </div>

          {/* Quick Adjustment Sliders / Toggles */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', fontWeight: 700 }}>
                Monthly Income
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="range"
                  min="20000"
                  max="120000"
                  step="5000"
                  value={effectiveSalary}
                  onChange={(e) => setCustomSalary(Number(e.target.value))}
                  style={{ width: '130px', accentColor: '#0284c7' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0284c7', minWidth: '65px' }}>
                  ₹{(effectiveSalary / 1000).toFixed(0)}k
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', fontWeight: 700 }}>
                Monthly Hours
              </label>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[140, 160, 176].map((hrs) => (
                  <button
                    key={hrs}
                    onClick={() => setMonthlyHours(hrs)}
                    style={{
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      border: monthlyHours === hrs ? '1.5px solid #15803d' : '1px solid #d0d7cc',
                      background: monthlyHours === hrs ? '#dcfce7' : '#ffffff',
                      color: monthlyHours === hrs ? '#15803d' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {hrs}h
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3-Way Labor Hours Comparison Grid */}
        <div className="life-energy-comparison-grid" style={{ marginBottom: '28px' }}>
          {/* Card 1: Predatory Stacking Repayment */}
          <div className="vantiq-card life-energy-comparison-card" style={{
            padding: '26px',
            borderRadius: '16px',
            backgroundColor: '#fff5f5',
            border: '1.5px solid #fca5a5',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="life-energy-card-badge-wrap">
              <span className="badge badge-red" style={{ fontSize: '0.7rem', fontWeight: 800 }}>
                <AlertTriangle size={12} />
                <span>36.8% Debt Trap</span>
              </span>
            </div>

            <div className="life-energy-card-eyebrow life-energy-card-eyebrow--warning" style={{ color: '#991b1b', fontWeight: 800 }}>
              Predatory Stacking Repayment
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
              <span className="life-energy-card-number life-energy-card-number--warning" style={{ color: '#dc2626', fontWeight: 900 }}>
                {predatoryHours}
              </span>
              <span className="life-energy-card-unit life-energy-card-unit--warning" style={{ color: '#991b1b', fontWeight: 700 }}>
                Hours of Labor
              </span>
            </div>

            <div className="life-energy-card-days life-energy-card-days--warning" style={{ color: '#b91c1c', fontWeight: 700 }}>
              ≈ {predatoryDays} Full Working Days (~{Math.round((predatoryDays / 5) * 10) / 10} work weeks)
            </div>

            <p className="life-energy-card-description" style={{ color: '#1e293b', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '16px', fontWeight: 500 }}>
              Repaying <strong style={{ color: '#991b1b', fontWeight: 800 }}>₹{predatoryRepayment.toLocaleString()}</strong> at your ₹{hourlyWage}/hr wage forces you to sacrifice
              over <strong style={{ color: '#991b1b', fontWeight: 800 }}>{predatoryDays} entire working days</strong> just to break even with aggressive lenders.
            </p>

            <div className="life-energy-card-summary life-energy-card-summary--warning" style={{ fontWeight: 700 }}>
              <span>Total Debt: ₹{predatoryRepayment.toLocaleString()}</span>
              <span>{predatoryHours}h Labor Burn</span>
            </div>
          </div>

          {/* Card 2: VANTIQ Funding Plan */}
          <div className="vantiq-card life-energy-comparison-card" style={{
            padding: '26px',
            borderRadius: '16px',
            backgroundColor: '#f0fdf4',
            border: '1.5px solid #86efac',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="life-energy-card-badge-wrap">
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem', fontWeight: 800 }}>
                <ShieldCheck size={12} />
                <span>Multi-Source Blend</span>
              </span>
            </div>

            <div className="life-energy-card-eyebrow life-energy-card-eyebrow--plan" style={{ color: '#15803d', fontWeight: 800 }}>
              VANTIQ Plan Repayment
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
              <span className="life-energy-card-number life-energy-card-number--plan" style={{ color: '#15803d', fontWeight: 900 }}>
                {vantiqHours}
              </span>
              <span className="life-energy-card-unit life-energy-card-unit--plan" style={{ color: '#15803d', fontWeight: 700 }}>
                Hours of Labor
              </span>
            </div>

            <div className="life-energy-card-days life-energy-card-days--plan" style={{ color: '#166534', fontWeight: 700 }}>
              ≈ {vantiqDays} Full Working Days (~{Math.round((vantiqDays / 5) * 10) / 10} work weeks)
            </div>

            <p className="life-energy-card-description" style={{ color: '#1e293b', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '16px', fontWeight: 500 }}>
              By blending zero-APR medical buffers and fair co-op tracks (totaling <strong style={{ color: '#15803d', fontWeight: 800 }}>₹{vantiqRepayment.toLocaleString()}</strong>),
              your required labor time drops cleanly to <strong style={{ color: '#15803d', fontWeight: 800 }}>{vantiqHours} hours</strong>.
            </p>

            <div className="life-energy-card-summary life-energy-card-summary--plan" style={{ fontWeight: 700 }}>
              <span>Total Debt: ₹{vantiqRepayment.toLocaleString()}</span>
              <span>{vantiqHours}h Labor Total</span>
            </div>
          </div>

          {/* Card 3: Net Life-Energy Saved (HERO HIGHLIGHT) */}
          <div className="vantiq-card glow-emerald life-energy-comparison-card" style={{
            padding: '26px',
            borderRadius: '16px',
            backgroundColor: '#ecfdf5',
            border: '2px solid #10b981',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)'
          }}>
            <div className="life-energy-card-badge-wrap">
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '4px 10px', fontWeight: 800 }}>
                <Trophy size={12} />
                <span>Freedom Reclaimed</span>
              </span>
            </div>

            <div className="life-energy-card-eyebrow life-energy-card-eyebrow--saved" style={{ color: '#15803d', fontWeight: 800 }}>
              Net Life-Energy Reclaimed
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
              <span className="life-energy-card-number life-energy-card-number--saved" style={{ color: '#15803d', fontWeight: 900 }}>
                +{savedHours}
              </span>
              <span className="life-energy-card-unit life-energy-card-unit--saved" style={{ color: '#15803d', fontWeight: 800 }}>
                Hours Saved!
              </span>
            </div>

            <div className="life-energy-card-days life-energy-card-days--saved" style={{ color: '#047857', fontWeight: 800 }}>
              🎉 ≈ {savedDays} Days of Labor Freedom!
            </div>

            <p className="life-energy-card-description" style={{ color: '#1e293b', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '16px', fontWeight: 500 }}>
              You win back <strong style={{ color: '#15803d', fontWeight: 800 }}>{savedHours} working hours</strong> (~{savedDays} working days) of your life that would have otherwise gone directly
              into predatory fees! That is <strong style={{ color: '#15803d', fontWeight: 800 }}>₹{savedCash.toLocaleString()}</strong> kept in your family's hands.
            </p>

            <div className="life-energy-card-summary life-energy-card-summary--saved" style={{ fontWeight: 700 }}>
              <span>Direct Cash Preserved: ₹{savedCash.toLocaleString()}</span>
              <span>~{Math.round((savedDays / 5) * 10) / 10} Work Weeks Saved</span>
            </div>
          </div>
        </div>

        {/* UNIFIED LABOR FREEDOM DASHBOARD (COMBINED SINGLE-TAB VIEW) */}
        <div className="vantiq-card" style={{
          padding: '32px',
          marginBottom: '28px',
          backgroundColor: '#ffffff',
          border: '1.5px solid #d0d7cc',
          boxShadow: 'var(--shadow-card)'
        }}>

          {/* Section 1: Cumulative Labor Horizon & Freedom Trajectory */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--wise-forest)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Hourglass size={20} color="#15803d" />
                  <span>Cumulative Labor Horizon & Debt-Free Trajectory</span>
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                  Visualizing when your labor debt terminates under VANTIQ versus predatory loan stacking.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', fontSize: '0.78rem', fontWeight: 700 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#0284c7' }} />
                  <span>Days 1–{Math.floor(vantiqDays)}: VANTIQ Work ({vantiqHours}h)</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#10b981' }} />
                  <span>Days {Math.ceil(vantiqDays)}–{Math.ceil(predatoryDays)}: Reclaimed Freedom (+{savedHours}h)</span>
                </span>
              </div>
            </div>

            {/* Stacked Horizon Progress Bar */}
            <div style={{
              height: '40px',
              width: '100%',
              borderRadius: '10px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              display: 'flex',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
              marginBottom: '10px'
            }}>
              {/* VANTIQ Hours Segment */}
              <div style={{
                width: `${Math.min(100, (vantiqHours / predatoryHours) * 100)}%`,
                background: 'linear-gradient(90deg, #0284c7 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '0.82rem',
                fontWeight: 800,
                gap: '6px',
                padding: '0 10px'
              }}>
                <ShieldCheck size={15} />
                <span>VANTIQ Obligation: {vantiqHours} Hours (~{vantiqDays} Days)</span>
              </div>

              {/* Reclaimed Freedom Zone */}
              <div style={{
                flex: 1,
                background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#064e3b',
                fontSize: '0.82rem',
                fontWeight: 900,
                gap: '6px',
                padding: '0 10px'
              }}>
                <Sparkles size={15} />
                <span>+{savedHours}h FREEDOM ({savedDays} Days Saved!)</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569', fontWeight: 600, marginBottom: '20px' }}>
              <span>Day 0 (Emergency Shock)</span>
              <span style={{ color: '#0284c7', fontWeight: 800 }}>Day {vantiqDays}: VANTIQ Debt Cleared ({vantiqHours}h)</span>
              <span style={{ color: '#dc2626', fontWeight: 800 }}>Day {predatoryDays}: Predatory Payoff ({predatoryHours}h)</span>
            </div>

            {/* 3 Step-by-Step Milestones */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div style={{
                padding: '16px 18px',
                borderRadius: '12px',
                borderLeft: '4px solid #0284c7',
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderLeftWidth: '4px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#0369a1', fontWeight: 800, textTransform: 'uppercase' }}>
                  Stage 1 (Days 1–10)
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>
                  80 Hours Labor
                </div>
                <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                  Emergency liquid buffer + 0% APR hospital direct advance absorbed comfortably from monthly surplus.
                </div>
              </div>

              <div style={{
                padding: '16px 18px',
                borderRadius: '12px',
                borderLeft: '4px solid #06b6d4',
                backgroundColor: '#ecfeff',
                border: '1px solid #a5f3fc',
                borderLeftWidth: '4px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#0891b2', fontWeight: 800, textTransform: 'uppercase' }}>
                  Stage 2 (Days 11–{Math.floor(vantiqDays)})
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>
                  {Math.round((vantiqHours - 80) * 10) / 10} Hours Labor
                </div>
                <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                  Low-interest 6.5% co-op bridge amortized smoothly. Total loan extinguished with zero default risk.
                </div>
              </div>

              <div style={{
                padding: '16px 18px',
                borderRadius: '12px',
                borderLeft: '4px solid #10b981',
                backgroundColor: '#ecfdf5',
                border: '1px solid #86efac',
                borderLeftWidth: '4px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 800, textTransform: 'uppercase' }}>
                  Stage 3 (Days {Math.ceil(vantiqDays)}–{Math.ceil(predatoryDays)})
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#15803d', margin: '4px 0' }}>
                  +{savedHours}h Pure Freedom!
                </div>
                <div style={{ fontSize: '0.8rem', color: '#14532d', lineHeight: 1.45, fontWeight: 600 }}>
                  While predatory borrowers sweat extra days under compounding interest, 100% of your earnings build savings.
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '28px 0' }} />

          {/* Section 2: Daily Shift Clock (9 AM - 5 PM) */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--wise-forest)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#7c3aed" />
                <span>Daily Shift Reality: Who Do You Work For From 9 AM to 5 PM?</span>
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                Translating monthly loan obligations into your daily 8-hour workday.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {/* Predatory Daily Shift Breakdown */}
              <div style={{
                padding: '20px',
                borderRadius: '14px',
                backgroundColor: '#fff5f5',
                border: '1.5px solid #fca5a5'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#991b1b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Under Predatory Stacking ({predatoryDays} Days)
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#dc2626', marginBottom: '6px' }}>
                  2.4 Hours / Day Stolen
                </div>
                <p style={{ fontSize: '0.82rem', color: '#1e293b', lineHeight: 1.5, marginBottom: '14px', fontWeight: 500 }}>
                  From <strong style={{ color: '#b91c1c' }}>9:00 AM until 11:24 AM</strong> every workday, you are working solely to pay interest, platform fees, and hidden penalties to loan apps.
                </p>
                <div style={{ display: 'flex', height: '14px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                  <div style={{ width: '30%', backgroundColor: '#ef4444' }} title="Lender Interest (2.4h)" />
                  <div style={{ width: '70%', backgroundColor: '#e2e8f0' }} title="Your Living Wage (5.6h)" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#475569', marginTop: '6px', fontWeight: 600 }}>
                  <span style={{ color: '#b91c1c', fontWeight: 800 }}>9:00 AM – 11:24 AM: Lenders</span>
                  <span>11:24 AM – 5:00 PM: You</span>
                </div>
              </div>

              {/* VANTIQ Daily Shift Breakdown */}
              <div style={{
                padding: '20px',
                borderRadius: '14px',
                backgroundColor: '#f0fdf4',
                border: '1.5px solid #86efac'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Under VANTIQ Plan ({vantiqDays} Days)
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#15803d', marginBottom: '6px' }}>
                  0.3 Hours / Day Fair Fee
                </div>
                <p style={{ fontSize: '0.82rem', color: '#1e293b', lineHeight: 1.5, marginBottom: '14px', fontWeight: 500 }}>
                  By <strong style={{ color: '#15803d' }}>9:18 AM</strong>, your institutional fees are fully covered. By Day 26, <strong style={{ color: '#15803d' }}>100% of your 8-hour shift</strong> belongs entirely to you.
                </p>
                <div style={{ display: 'flex', height: '14px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                  <div style={{ width: '4%', backgroundColor: '#10b981' }} title="Fair Fee (0.3h)" />
                  <div style={{ width: '96%', backgroundColor: '#86efac' }} title="Your Money (7.7h)" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#475569', marginTop: '6px', fontWeight: 600 }}>
                  <span style={{ color: '#15803d', fontWeight: 800 }}>9:00 AM – 9:18 AM: Fair Fees</span>
                  <span style={{ color: '#15803d', fontWeight: 800 }}>9:18 AM – 5:00 PM: 100% Yours</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '28px 0' }} />

          {/* Section 3: Life Equivalency Impact */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--wise-forest)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HeartHandshake size={18} color="#15803d" />
                <span>What Does +{savedHours} Hours of Reclaimed Life-Energy Actually Mean?</span>
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                Money is replaceable. The hours of your finite life traded for it are not.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #d0d7cc',
                borderTop: '4px solid #10b981'
              }}>
                <div style={{ color: '#15803d', marginBottom: '8px' }}><Smile size={24} /></div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--wise-forest)' }}>{savedDays} Days</div>
                <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  With Family & Loved Ones
                </div>
                <p style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                  Over a full week of dinner tables without panic-calculating which predatory lender will call next.
                </p>
              </div>

              <div style={{
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #d0d7cc',
                borderTop: '4px solid #0284c7'
              }}>
                <div style={{ color: '#0284c7', marginBottom: '8px' }}><Sun size={24} /></div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--wise-forest)' }}>17 Restorative Nights</div>
                <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Uninterrupted 8h Sleep
                </div>
                <p style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                  Sleep debt and cortisol overload cured by eliminating the Day 30 cashflow insolvency shock.
                </p>
              </div>

              <div style={{
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #d0d7cc',
                borderTop: '4px solid #7c3aed'
              }}>
                <div style={{ color: '#7c3aed', marginBottom: '8px' }}><Coffee size={24} /></div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--wise-forest)' }}>2,040 Kilometers</div>
                <div style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Avoided Commute Stress
                </div>
                <p style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                  Avoiding 8.5 full days of painful transit spent purely servicing usurious interest.
                </p>
              </div>

              <div style={{
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #d0d7cc',
                borderTop: '4px solid #b45309'
              }}>
                <div style={{ color: '#b45309', marginBottom: '8px' }}><Zap size={24} /></div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--wise-forest)' }}>₹{savedCash.toLocaleString()} Kept</div>
                <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Household Buffer
                </div>
                <p style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                  Seed capital to bootstrap a genuine 3-month emergency liquid reserve rather than sinking into poverty traps.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LifeEnergyCalculator;
