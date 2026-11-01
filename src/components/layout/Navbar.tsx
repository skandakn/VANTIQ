// src/components/layout/Navbar.tsx
// Module 1: Core Shell & Navigation
import React, { useState } from 'react';
import { Shield, Activity, Cpu, Sparkles, AlertCircle } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const Navbar: React.FC = () => {
  const { triggerNeuroShield } = useFintech();
  const [activeTab, setActiveTab] = useState('overview');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(5, 9, 20, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
      padding: '14px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo & Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => scrollToSection('hero')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0284c7, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
          }}>
            <Shield size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#f8fafc' }}>
                CHRONOS<span style={{ color: '#38bdf8' }}>-FIN</span>
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>IDEATHON 2026</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Affective Affordability & Quantum Twin</p>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[
            { id: 'crisis-intake', label: 'Crisis Intake', icon: AlertCircle },
            { id: 'absorptive-capacity', label: 'Capacity Gauge', icon: Activity },
            { id: 'cashflow-twin', label: '90-Day Runway', icon: Activity },
            { id: 'quantum-knapsack', label: 'Quantum Solver', icon: Cpu },
            { id: 'rescue-matrix', label: 'Rescue Matrix', icon: Sparkles },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="btn btn-secondary"
                style={{
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  borderColor: isActive ? '#06b6d4' : 'transparent',
                  color: isActive ? '#38bdf8' : '#94a3b8'
                }}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Live Safety Action Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={triggerNeuroShield}
            className="btn btn-primary"
            style={{ fontSize: '0.8rem', padding: '8px 16px' }}
          >
            <Shield size={16} />
            <span>Test 45s Shield</span>
          </button>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontSize: '0.75rem',
            color: '#34d399'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
            <span>ZK Guard Online</span>
          </div>
        </div>

      </div>
    </header>
  );
};
