// src/modules/m09_life_energy/LifeEnergyCalculator.tsx
// Module 10: "Life-Energy" Human Cost Calculator
import React from 'react';
import { Clock, HeartHandshake } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const LifeEnergyCalculator: React.FC = () => {
  const { quantumResult, hourlyWage, profile } = useFintech();

  const naiveFees = 18400; // Rs. 18,400 predatory interest + upfront fees
  const naiveHours = Math.round((naiveFees / hourlyWage) * 10) / 10;
  const chronosHours = Math.round((quantumResult.totalInterestAndFees / hourlyWage) * 10) / 10;
  const hoursSaved = Math.max(0, Math.round((naiveHours - chronosHours) * 10) / 10);

  return (
    <section id="life-energy" style={{ padding: '30px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">
              <Clock size={13} />
              <span>Life-Energy Labor Metric</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            Translating Predatory APR Into Hours Of Human Life
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Percentages hide real pain. Translating fees into actual hours of physical labor creates deep behavioral clarity.
          </p>
        </div>

        {/* Life Energy Comparison Card */}
        <div className="chronos-card glow-emerald" style={{ padding: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', alignItems: 'center' }}>
            
            {/* Without Chronos */}
            <div style={{
              padding: '24px',
              borderRadius: '14px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 700 }}>
                Predatory Instant Borrowing
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f87171', margin: '8px 0' }}>
                {naiveHours} Hours
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                At ₹{hourlyWage}/hr wage, you spend <strong>{naiveHours} hours</strong> (nearly 3 weeks of full-time labor) purely paying interest to lenders!
              </p>
            </div>

            {/* Preserved Savings Indicator */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-flex',
                padding: '12px 20px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                color: '#34d399',
                fontWeight: 800,
                fontSize: '1rem',
                alignItems: 'center',
                gap: '8px'
              }}>
                <HeartHandshake size={20} />
                <span>{hoursSaved} Hours Saved!</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
                Based on monthly salary of ₹{profile.monthlyIncome.toLocaleString()}
              </div>
            </div>

            {/* With Chronos-Solv */}
            <div style={{
              padding: '24px',
              borderRadius: '14px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#6ee7b7', textTransform: 'uppercase', fontWeight: 700 }}>
                CHRONOS-SOLV Rescue Blend
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#34d399', margin: '8px 0' }}>
                {chronosHours} Hours
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                By blending liquid savings and 0% promo cards, total labor cost is compressed to just <strong>{chronosHours} hours</strong>.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
