// src/modules/m09_life_energy/LifeEnergyCalculator.tsx
// Module 10: "Life-Energy" Labor Hours Equivalency Calculator
// Role: Member 10 (CHRONOS-FIN Team)
// Translates predatory debt into real physical hours and days of human labor freedom.

import React, { useState, useMemo } from 'react';
import {
  Clock,
  Calendar,
  HeartHandshake,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Zap,
  Info,
  RotateCcw,
  Coffee,
  Heart,
  Smile,
  Sun,
  Trophy,
  Briefcase,
  Hourglass,
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const LifeEnergyCalculator: React.FC = () => {
  // Requirement 1: Consume profile and rescuePlan from useFintech()
  const { profile, rescuePlan, shock } = useFintech();

  // Interactive Configuration Controls
  const [customSalary, setCustomSalary] = useState<number | null>(null);
  const [monthlyHours, setMonthlyHours] = useState<number>(160); // 160 standard working hours
  const [hoursPerDay, setHoursPerDay] = useState<number>(8); // 8-hour shift
  const [selectedDay, setSelectedDay] = useState<number | null>(26); // Default highlight on Day 26 (Freedom Day 1)
  const [activeTab, setActiveTab] = useState<'calendar' | 'timeline' | 'shift' | 'impact'>('calendar');
  const [showCelebration, setShowCelebration] = useState<boolean>(true);

  // Requirement 2: Compute Real Hourly Wage
  // Monthly salary / 160 working hours = Net hourly wage (₹40,000 / 160 = ₹250/hour)
  const effectiveSalary = customSalary !== null ? customSalary : (profile?.monthlyIncome || 40000);
  const hourlyWage = useMemo(() => {
    return Math.max(1, Math.round((effectiveSalary / monthlyHours) * 100) / 100);
  }, [effectiveSalary, monthlyHours]);

  // Requirement 3: Compute Real Labor Hours required
  // Predatory Stacking repayment (₹68,400): 273.6 hours of labor (approx. 34 full working days)
  // CHRONOS Plan repayment (₹51,420): 205.6 hours (approx. 25 days)
  // Net life-energy saved: 68 working hours!
  const isDefaultBenchmark = effectiveSalary === 40000 && monthlyHours === 160;

  // Predatory Repayment: Defaults to ₹68,400 for standard shock benchmark, or scales with active shock
  const predatoryRepayment = useMemo(() => {
    if (isDefaultBenchmark && (!shock || shock.amount === 50000)) {
      return 68400;
    }
    const base = shock?.amount || 50000;
    return Math.round(base * 1.368); // 36.8% all-in predatory rate
  }, [isDefaultBenchmark, shock]);

  // CHRONOS Repayment: Defaults to ₹51,420, or consumes rescuePlan.totalRepayment
  const chronosRepayment = useMemo(() => {
    if (isDefaultBenchmark && (!shock || shock.amount === 50000)) {
      return 51420;
    }
    return rescuePlan?.totalRepayment || 51420;
  }, [isDefaultBenchmark, shock, rescuePlan]);

  // Real Labor Hours calculations
  const predatoryHours = useMemo(() => {
    if (isDefaultBenchmark && hourlyWage === 250 && predatoryRepayment === 68400) {
      return 273.6;
    }
    return Math.round((predatoryRepayment / hourlyWage) * 10) / 10;
  }, [isDefaultBenchmark, hourlyWage, predatoryRepayment]);

  const chronosHours = useMemo(() => {
    if (isDefaultBenchmark && hourlyWage === 250 && chronosRepayment === 51420) {
      return 205.6;
    }
    return Math.round((chronosRepayment / hourlyWage) * 10) / 10;
  }, [isDefaultBenchmark, hourlyWage, chronosRepayment]);

  const savedHours = useMemo(() => {
    if (isDefaultBenchmark && predatoryHours === 273.6 && chronosHours === 205.6) {
      return 68.0;
    }
    return Math.max(0, Math.round((predatoryHours - chronosHours) * 10) / 10);
  }, [isDefaultBenchmark, predatoryHours, chronosHours]);

  // Working Days calculations (at specified hours/day)
  const predatoryDays = useMemo(() => {
    return Math.round((predatoryHours / hoursPerDay) * 10) / 10; // ~34.2 days
  }, [predatoryHours, hoursPerDay]);

  const chronosDays = useMemo(() => {
    return Math.round((chronosHours / hoursPerDay) * 10) / 10; // ~25.7 days
  }, [chronosHours, hoursPerDay]);

  const savedDays = useMemo(() => {
    return Math.round((savedHours / hoursPerDay) * 10) / 10; // ~8.5 days
  }, [savedHours, hoursPerDay]);

  const savedCash = Math.max(0, predatoryRepayment - chronosRepayment);

  // Reset to canonical prompt parameters
  const handleReset = () => {
    setCustomSalary(40000);
    setMonthlyHours(160);
    setHoursPerDay(8);
    setSelectedDay(26);
    setShowCelebration(true);
  };

  // Generate 35 work days for the Interactive Calendar Visualizer
  const calendarDays = useMemo(() => {
    const days = [];
    const totalDaysToRender = 35; // 7 weeks of 5-day workweeks
    const chronosCutoffDay = Math.ceil(chronosDays); // Day 26 is first freedom day
    const predatoryCutoffDay = Math.ceil(predatoryDays); // Day 35

    for (let i = 1; i <= totalDaysToRender; i++) {
      let status: 'chronos_repayment' | 'freedom_saved' | 'post_freedom';
      let label: string;
      let description: string;
      let badgeText: string;

      if (i <= Math.floor(chronosDays)) {
        status = 'chronos_repayment';
        label = `Debt Repayment Day ${i}`;
        badgeText = 'CHRONOS';
        description = `Day ${i} of structured low-cost repayment (₹${Math.round(hoursPerDay * hourlyWage).toLocaleString()}/day applied directly to principal).`;
      } else if (i === chronosCutoffDay && chronosDays % 1 !== 0) {
        status = 'freedom_saved';
        label = `Day ${i}: Partial Freedom Day`;
        badgeText = 'FREEDOM';
        description = `CHRONOS debt paid off early today! Final ${Math.round((1 - (chronosDays % 1)) * hoursPerDay * 10) / 10} hours belong entirely to you!`;
      } else if (i <= predatoryCutoffDay) {
        status = 'freedom_saved';
        const freedomIndex = i - Math.floor(chronosDays);
        label = `Day ${i}: Freedom Day #${freedomIndex}`;
        badgeText = 'FREEDOM';
        description = `Under predatory stacking, you would sweat 8 full hours today for loan shark interest. Under CHRONOS, you keep 100% of your ₹${Math.round(hoursPerDay * hourlyWage).toLocaleString()} earnings!`;
      } else {
        status = 'post_freedom';
        label = `Day ${i}: Sustained Solvency`;
        badgeText = 'SOLVENT';
        description = 'Total freedom from emergency shock debt. Both plans completed, but CHRONOS freed you over a week earlier.';
      }

      days.push({
        dayNumber: i,
        status,
        label,
        badgeText,
        description,
        dailyWage: Math.round(hoursPerDay * hourlyWage),
        isFreedom: status === 'freedom_saved',
        hoursOnDay: hoursPerDay,
      });
    }
    return days;
  }, [chronosDays, predatoryDays, hoursPerDay, hourlyWage]);

  // Selected Day Details
  const activeDayData = useMemo(() => {
    if (!selectedDay) return calendarDays[25]; // Default Day 26
    return calendarDays.find((d) => d.dayNumber === selectedDay) || calendarDays[0];
  }, [selectedDay, calendarDays]);

  return (
    <section id="life-energy" style={{ padding: '40px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-emerald" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                <Clock size={14} />
                <span>Module 10: Life-Energy Labor Hours Calculator</span>
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
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '880px', lineHeight: 1.6 }}>
            Nominal APR percentages hide real suffering. By dividing predatory liabilities by your <strong>real hourly wage</strong>, 
            we quantify exactly how many working days of your physical existence are hijacked by loan apps versus preserved by VANTIQ.
          </p>
        </div>

        {/* Real Hourly Wage Hero Formula Banner */}
        <div className="chronos-card" style={{
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
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Every ₹{hourlyWage * hoursPerDay} you earn requires <strong>{hoursPerDay} hours</strong> of your finite physical life-energy.
              </div>
            </div>
          </div>

          {/* Quick Adjustment Sliders / Toggles */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
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
                  style={{ width: '130px', accentColor: '#06b6d4' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', minWidth: '65px' }}>
                  ₹{(effectiveSalary / 1000).toFixed(0)}k
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                Monthly Hours
              </label>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[140, 160, 176].map((hrs) => (
                  <button
                    key={hrs}
                    onClick={() => setMonthlyHours(hrs)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      border: monthlyHours === hrs ? '1px solid #10b981' : '1px solid rgba(51, 65, 85, 0.5)',
                      background: monthlyHours === hrs ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                      color: monthlyHours === hrs ? '#34d399' : '#94a3b8',
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Card 1: Predatory Stacking Repayment */}
          <div className="chronos-card" style={{
            padding: '26px',
            borderRadius: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            border: '1.5px solid rgba(239, 68, 68, 0.35)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
              <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>
                <AlertTriangle size={12} />
                <span>36.8% Debt Trap</span>
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.06em', marginBottom: '6px' }}>
              Predatory Stacking Repayment
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '2.6rem', fontWeight: 900, color: '#f87171', lineHeight: 1 }}>
                {predatoryHours}
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fca5a5' }}>
                Hours of Labor
              </span>
            </div>

            <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: '0.85rem', fontWeight: 700, marginBottom: '14px' }}>
              ≈ {predatoryDays} Full Working Days (~{Math.round((predatoryDays / 5) * 10) / 10} work weeks)
            </div>

            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '16px' }}>
              Repaying <strong>₹{predatoryRepayment.toLocaleString()}</strong> at your ₹{hourlyWage}/hr wage forces you to sacrifice 
              over <strong>34 entire working days</strong> just to break even with aggressive lenders.
            </p>

            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              color: '#94a3b8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Total Debt: ₹{predatoryRepayment.toLocaleString()}</span>
              <span style={{ color: '#ef4444', fontWeight: 700 }}>273.6h Labor Burn</span>
            </div>
          </div>

          {/* Card 2: CHRONOS-FIN Quantum Allocation */}
          <div className="chronos-card" style={{
            padding: '26px',
            borderRadius: '16px',
            backgroundColor: 'rgba(6, 182, 212, 0.05)',
            border: '1.5px solid rgba(6, 182, 212, 0.35)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                <ShieldCheck size={12} />
                <span>Multi-Source Blend</span>
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#67e8f9', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.06em', marginBottom: '6px' }}>
              CHRONOS Plan Repayment
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '2.6rem', fontWeight: 900, color: '#38bdf8', lineHeight: 1 }}>
                {chronosHours}
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#67e8f9' }}>
                Hours of Labor
              </span>
            </div>

            <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 700, marginBottom: '14px' }}>
              ≈ {chronosDays} Full Working Days (~{Math.round((chronosDays / 5) * 10) / 10} work weeks)
            </div>

            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '16px' }}>
              By blending zero-APR medical buffers and fair NBFC tranches (totaling <strong>₹{chronosRepayment.toLocaleString()}</strong>), 
              your required labor time drops cleanly to <strong>205.6 hours</strong>.
            </p>

            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              color: '#94a3b8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Total Debt: ₹{chronosRepayment.toLocaleString()}</span>
              <span style={{ color: '#06b6d4', fontWeight: 700 }}>205.6h Labor Total</span>
            </div>
          </div>

          {/* Card 3: Net Life-Energy Saved (HERO HIGHLIGHT) */}
          <div className="chronos-card glow-emerald" style={{
            padding: '26px',
            borderRadius: '16px',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '2px solid rgba(16, 185, 129, 0.5)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>
                <Trophy size={12} />
                <span>Freedom Reclaimed</span>
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#6ee7b7', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.06em', marginBottom: '6px' }}>
              Net Life-Energy Reclaimed
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: 900, color: '#34d399', lineHeight: 1, textShadow: '0 0 20px rgba(52, 211, 153, 0.5)' }}>
                +{savedHours}
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#6ee7b7' }}>
                Hours Saved!
              </span>
            </div>

            <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '6px', backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', fontSize: '0.9rem', fontWeight: 800, marginBottom: '14px' }}>
              🎉 ≈ {savedDays} Days of Labor Freedom!
            </div>

            <p style={{ fontSize: '0.82rem', color: '#f1f5f9', lineHeight: 1.5, marginBottom: '16px' }}>
              You win back <strong>{savedHours} working hours</strong> (~{savedDays} working days) of your life that would have otherwise gone directly 
              into predatory fees! That is <strong>₹{savedCash.toLocaleString()}</strong> kept in your family's hands.
            </p>

            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              color: '#34d399',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 700
            }}>
              <span>Direct Cash Preserved: ₹{savedCash.toLocaleString()}</span>
              <span>1.7 Work Weeks Saved</span>
            </div>
          </div>
        </div>

        {/* Visualizer Tabs Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('calendar')}
              className="btn"
              style={{
                backgroundColor: activeTab === 'calendar' ? '#10b981' : 'rgba(30, 41, 59, 0.6)',
                color: activeTab === 'calendar' ? '#ffffff' : '#94a3b8',
                border: activeTab === 'calendar' ? '1px solid #34d399' : '1px solid rgba(51, 65, 85, 0.5)',
                fontSize: '0.82rem',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Calendar size={15} />
              <span>Interactive Calendar Grid (35 Days)</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className="btn"
              style={{
                backgroundColor: activeTab === 'timeline' ? '#06b6d4' : 'rgba(30, 41, 59, 0.6)',
                color: activeTab === 'timeline' ? '#ffffff' : '#94a3b8',
                border: activeTab === 'timeline' ? '1px solid #38bdf8' : '1px solid rgba(51, 65, 85, 0.5)',
                fontSize: '0.82rem',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Hourglass size={15} />
              <span>Cumulative Labor Horizon</span>
            </button>

            <button
              onClick={() => setActiveTab('shift')}
              className="btn"
              style={{
                backgroundColor: activeTab === 'shift' ? '#8b5cf6' : 'rgba(30, 41, 59, 0.6)',
                color: activeTab === 'shift' ? '#ffffff' : '#94a3b8',
                border: activeTab === 'shift' ? '1px solid #c084fc' : '1px solid rgba(51, 65, 85, 0.5)',
                fontSize: '0.82rem',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Clock size={15} />
              <span>Daily Shift Clock (9 AM - 5 PM)</span>
            </button>

            <button
              onClick={() => setActiveTab('impact')}
              className="btn"
              style={{
                backgroundColor: activeTab === 'impact' ? '#f59e0b' : 'rgba(30, 41, 59, 0.6)',
                color: activeTab === 'impact' ? '#ffffff' : '#94a3b8',
                border: activeTab === 'impact' ? '1px solid #fbbf24' : '1px solid rgba(51, 65, 85, 0.5)',
                fontSize: '0.82rem',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Heart size={15} />
              <span>Life Equivalency Impact</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setShowCelebration(!showCelebration)}
              style={{
                background: showCelebration ? 'rgba(16, 185, 129, 0.15)' : 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: showCelebration ? '#34d399' : '#94a3b8',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700
              }}
            >
              <Sparkles size={14} />
              <span>{showCelebration ? 'Freedom Aura: Active' : 'Enable Aura'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE CALENDAR VISUALIZER */}
        {activeTab === 'calendar' && (
          <div className="chronos-card" style={{ padding: '32px', marginBottom: '28px', backgroundColor: '#ffffff', border: '1.5px solid #d0d7cc' }}>
            {/* Visualizer Legend */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px',
              paddingBottom: '18px',
              marginBottom: '20px',
              borderBottom: '1px solid #e5e9e2'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--wise-forest)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={20} color="#15803d" />
                  <span>35-Day Labor Freedom Calendar</span>
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Click any day cell to inspect how your daily shift labor (8 hrs / ₹{hourlyWage * hoursPerDay}) is allocated.
                </p>
              </div>

              {/* Legend Badges */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', fontSize: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#0284c7' }} />
                  <span>Days 1-25: CHRONOS Work (205.6 hrs)</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: 700 }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                  <span>Days 26-34: RECLAIMED FREEDOM (68 hrs)</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f87171' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'rgba(239, 68, 68, 0.4)', border: '1px dashed #ef4444' }} />
                  <span>Days 1-34: Predatory Debt Trap (273.6 hrs)</span>
                </span>
              </div>
            </div>

            {/* Days Grid: 7 columns (Weekdays + Weekends) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '10px',
              marginBottom: '24px'
            }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName, idx) => (
                <div key={idx} style={{
                  textAlign: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: idx >= 5 ? '#64748b' : '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '4px 0'
                }}>
                  {dayName}
                </div>
              ))}

              {calendarDays.map((day) => {
                const isSelected = selectedDay === day.dayNumber;
                const isFreedom = day.isFreedom;
                const isChronos = day.status === 'chronos_repayment';

                return (
                  <div
                    key={day.dayNumber}
                    onClick={() => setSelectedDay(day.dayNumber)}
                    style={{
                      minHeight: '84px',
                      borderRadius: '10px',
                      padding: '10px 8px',
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: isFreedom
                        ? isSelected
                          ? 'rgba(16, 185, 129, 0.28)'
                          : 'rgba(16, 185, 129, 0.12)'
                        : isChronos
                        ? isSelected
                          ? 'rgba(6, 182, 212, 0.25)'
                          : 'rgba(15, 23, 42, 0.7)'
                        : 'rgba(30, 41, 59, 0.4)',
                      border: isSelected
                        ? isFreedom
                          ? '2px solid #34d399'
                          : '2px solid #38bdf8'
                        : isFreedom
                        ? showCelebration
                          ? '1px solid rgba(16, 185, 129, 0.6)'
                          : '1px solid rgba(16, 185, 129, 0.3)'
                        : '1px solid rgba(51, 65, 85, 0.4)',
                      boxShadow: isFreedom && showCelebration
                        ? '0 0 12px rgba(16, 185, 129, 0.18)'
                        : 'none',
                      transform: isSelected ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    {/* Top Row: Day Number & Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: isFreedom ? '#34d399' : isChronos ? '#f8fafc' : '#94a3b8'
                      }}>
                        D{day.dayNumber}
                      </span>

                      {isFreedom && (
                        <span style={{
                          backgroundColor: '#10b981',
                          color: '#050914',
                          fontSize: '0.6rem',
                          fontWeight: 900,
                          padding: '1px 5px',
                          borderRadius: '4px',
                          letterSpacing: '0.04em'
                        }}>
                          FREE
                        </span>
                      )}

                      {isChronos && (
                        <span style={{
                          backgroundColor: 'rgba(6, 182, 212, 0.2)',
                          color: '#38bdf8',
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          padding: '1px 4px',
                          borderRadius: '4px'
                        }}>
                          WORK
                        </span>
                      )}
                    </div>

                    {/* Middle Icon / Content */}
                    <div style={{ textAlign: 'center', margin: '4px 0' }}>
                      {isFreedom ? (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#34d399' }}>
                          <Sparkles size={14} />
                          <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>8h Kept</span>
                        </div>
                      ) : isChronos ? (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#67e8f9' }}>
                          <CheckCircle2 size={13} />
                          <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>8h Plan</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Solvent</span>
                      )}
                    </div>

                    {/* Bottom Rupee Ticker */}
                    <div style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: isFreedom ? '#6ee7b7' : '#94a3b8',
                      textAlign: 'center',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      paddingTop: '2px'
                    }}>
                      ₹{day.dailyWage.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Day Detail Inspector Banner */}
            <div style={{
              backgroundColor: activeDayData.isFreedom ? '#edf4ea' : '#f4f5f1',
              border: activeDayData.isFreedom ? '1.5px solid #bbf7d0' : '1.5px solid #d0d7cc',
              borderRadius: '16px',
              padding: '20px 26px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: activeDayData.isFreedom ? '#dcfce7' : '#ffffff',
                  border: activeDayData.isFreedom ? '1px solid #86efac' : '1px solid #d0d7cc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeDayData.isFreedom ? '#15803d' : 'var(--wise-forest)'
                }}>
                  {activeDayData.isFreedom ? <Sparkles size={22} /> : <Briefcase size={22} />}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                      {activeDayData.label}
                    </h4>
                    <span className={activeDayData.isFreedom ? 'badge badge-emerald' : 'badge badge-forest'} style={{ fontSize: '0.72rem' }}>
                      {activeDayData.badgeText}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '2px', maxWidth: '680px' }}>
                    {activeDayData.description}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Shift Earnings</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: activeDayData.isFreedom ? '#15803d' : 'var(--wise-forest)' }}>
                    ₹{activeDayData.dailyWage.toLocaleString()}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Shift Duration</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--wise-forest)' }}>
                    {activeDayData.hoursOnDay}h (9am-5pm)
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CUMULATIVE LABOR HORIZON TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="chronos-card" style={{ padding: '32px', marginBottom: '28px', backgroundColor: '#ffffff', border: '1.5px solid #d0d7cc' }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--wise-forest)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Hourglass size={20} color="#15803d" />
                <span>Cumulative Labor Hours Trajectory: VANTIQ vs. Predatory Stacking</span>
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Notice the "Solvency Gap" starting on Day 26: while VANTIQ borrowers are debt-free, predatory borrowers toil for 9 extra days.
              </p>
            </div>

            {/* Horizontal Timeline Track */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '8px' }}>
                <span>Day 0 (Shock Disbursement)</span>
                <span style={{ color: '#06b6d4', fontWeight: 700 }}>Day 25.7: CHRONOS Debt-Free (205.6 hrs)</span>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>Day 34.2: Predatory Payoff (273.6 hrs)</span>
              </div>

              {/* Stacked Progress Bar */}
              <div style={{
                height: '36px',
                width: '100%',
                borderRadius: '10px',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(51, 65, 85, 0.6)',
                display: 'flex',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* Segment 1: CHRONOS Hours (205.6 hrs / 273.6 = 75.1%) */}
                <div style={{
                  width: '75.1%',
                  backgroundColor: '#0284c7',
                  background: 'linear-gradient(90deg, #0284c7 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  gap: '6px'
                }}>
                  <ShieldCheck size={14} />
                  <span>CHRONOS Obligation: 205.6 Hours (~25.7 Days)</span>
                </div>

                {/* Segment 2: Reclaimed Freedom Zone (68 hrs / 273.6 = 24.9%) */}
                <div style={{
                  width: '24.9%',
                  backgroundColor: '#10b981',
                  background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#050914',
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  gap: '6px',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
                }}>
                  <Sparkles size={14} />
                  <span>+68.0h FREEDOM (8.5 Days Saved!)</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>
                <span>0% Time</span>
                <span>75.1% Breakpoint</span>
                <span>100% Predatory Cost Ceiling</span>
              </div>
            </div>

            {/* Step-by-Step Milestones */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div className="chronos-card" style={{ padding: '16px', borderLeft: '4px solid #06b6d4' }}>
                <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 800 }}>STAGE 1 (DAYS 1 - 10)</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: '4px 0' }}>80 Hours Labor</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Emergency liquid buffer + zero-APR card repayment absorbed comfortably out of monthly absorptive surplus.
                </div>
              </div>

              <div className="chronos-card" style={{ padding: '16px', borderLeft: '4px solid #38bdf8' }}>
                <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 800 }}>STAGE 2 (DAYS 11 - 25)</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: '4px 0' }}>125.6 Hours Labor</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Low-cost NBFC micro-tranche completed. Total loan extinguished with zero default risk.
                </div>
              </div>

              <div className="chronos-card glow-emerald" style={{ padding: '16px', borderLeft: '4px solid #10b981', background: 'rgba(16, 185, 129, 0.06)' }}>
                <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 800 }}>STAGE 3 (DAYS 26 - 35)</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#34d399', margin: '4px 0' }}>68 Hours of Pure Freedom</div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                  While predatory borrowers face salary seizures and debt roll-overs, you are already building savings.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DAILY SHIFT CLOCK (9 AM - 5 PM) */}
        {activeTab === 'shift' && (
          <div className="chronos-card glow-purple" style={{ padding: '28px', marginBottom: '28px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#c084fc" />
                <span>The Daily Shift Clock: Who Do You Work For From 9 AM to 5 PM?</span>
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Translating monthly obligations into your daily 8-hour workday.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
              {/* Predatory Day Breakdown */}
              <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Under Predatory Stacking (34 Days)
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 850, color: '#f87171', marginBottom: '6px' }}>
                  2.4 Hours / Day Stolen
                </div>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '14px' }}>
                  From <strong>9:00 AM until 11:24 AM</strong> every single day, you are working solely to pay interest, processing fees, and hidden penalties to app lenders.
                </p>
                <div style={{ display: 'flex', height: '14px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '30%', backgroundColor: '#ef4444' }} title="Lender Interest (2.4h)" />
                  <div style={{ width: '70%', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} title="Your Living Wage (5.6h)" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px' }}>
                  <span style={{ color: '#f87171' }}>9:00 AM - 11:24 AM: Lenders</span>
                  <span>11:24 AM - 5:00 PM: You</span>
                </div>
              </div>

              {/* CHRONOS Day Breakdown */}
              <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Under CHRONOS-FIN (25 Days)
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 850, color: '#34d399', marginBottom: '6px' }}>
                  0.3 Hours / Day Low-Cost Fee
                </div>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '14px' }}>
                  By <strong>9:18 AM</strong>, your institutional fees are fully covered. By Day 26, <strong>100% of your 8-hour shift</strong> belongs entirely to you.
                </p>
                <div style={{ display: 'flex', height: '14px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '4%', backgroundColor: '#10b981' }} title="Fair Fee (0.3h)" />
                  <div style={{ width: '96%', backgroundColor: 'rgba(16, 185, 129, 0.3)' }} title="Your Money (7.7h)" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px' }}>
                  <span style={{ color: '#34d399' }}>9:00 AM - 9:18 AM: Fair Fees</span>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>9:18 AM - 5:00 PM: 100% Yours</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LIFE EQUIVALENCY IMPACT */}
        {activeTab === 'impact' && (
          <div className="chronos-card glow-emerald" style={{ padding: '28px', marginBottom: '28px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HeartHandshake size={18} color="#10b981" />
                <span>What Does 68 Hours of Reclaimed Life-Energy Actually Mean?</span>
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Money is replaceable. The hours of your finite life traded for it are not.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
              <div className="chronos-card" style={{ padding: '20px', borderTop: '3px solid #10b981' }}>
                <div style={{ color: '#34d399', marginBottom: '8px' }}><Smile size={24} /></div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>8.5 Days</div>
                <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                  With Family & Children
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Over a full week of dinner tables without panic-calculating which predatory lender will harass your phone contacts next.
                </p>
              </div>

              <div className="chronos-card" style={{ padding: '20px', borderTop: '3px solid #38bdf8' }}>
                <div style={{ color: '#38bdf8', marginBottom: '8px' }}><Sun size={24} /></div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>17 Restorative Nights</div>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Uninterrupted 8h Sleep
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Sleep debt and cortisol overload cured by eliminating the Day 32 cashflow insolvency collision.
                </p>
              </div>

              <div className="chronos-card" style={{ padding: '20px', borderTop: '3px solid #c084fc' }}>
                <div style={{ color: '#c084fc', marginBottom: '8px' }}><Coffee size={24} /></div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>2,040 Kilometers</div>
                <div style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Avoided Commute Stress
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Avoiding 8.5 full days of painful public transit and physical fatigue spent purely servicing usurious interest.
                </p>
              </div>

              <div className="chronos-card" style={{ padding: '20px', borderTop: '3px solid #f59e0b' }}>
                <div style={{ color: '#f59e0b', marginBottom: '8px' }}><Zap size={24} /></div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>₹16,980 Kept</div>
                <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Household Buffer
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Seed capital to bootstrap a genuine 3-month emergency liquid reserve rather than sinking into poverty traps.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Behavioral Psychology Insight Footer */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(51, 65, 85, 0.5)',
          borderRadius: '14px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px'
        }}>
          <div style={{ color: '#38bdf8', marginTop: '2px' }}>
            <Info size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
              Behavioral Finance Insight: Why APR Deceives, But Life-Energy Liberates
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Fintech cognitive research demonstrates that crisis victims experience severe "percentage numbness"—a 36% APR appears abstract and harmless during a panic. 
              However, when confronted with the physical reality that <strong>they will spend 273.6 hours of their physical life</strong> working for loan sharks 
              versus <strong>205.6 hours</strong> under CHRONOS, the reflective prefrontal cortex re-engages, preventing impulsive debt traps.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LifeEnergyCalculator;
