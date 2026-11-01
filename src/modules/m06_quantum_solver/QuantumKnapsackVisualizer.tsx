// src/modules/m06_quantum_solver/QuantumKnapsackVisualizer.tsx
// Module 7: Quantum Knapsack Optimization Engine (QUBO / QAOA)
import React, { useState } from 'react';
import { Cpu, Atom, Play, Sparkles } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const QuantumKnapsackVisualizer: React.FC = () => {
  const { quantumResult, shock } = useFintech();
  const [isSolving, setIsSolving] = useState(false);
  const [solveStep, setSolveStep] = useState('Optimal Ground State Converged');

  const runSolverSimulation = () => {
    setIsSolving(true);
    setSolveStep('Initializing Quantum QUBO Hamiltonian...');
    setTimeout(() => {
      setSolveStep('Mapping 2^24 Combinatorial Tranche Space...');
    }, 400);
    setTimeout(() => {
      setSolveStep('QAOA Variational Circuit Executing (p=4 layers)...');
    }, 800);
    setTimeout(() => {
      setSolveStep('Ground State Converged! Optimal Multi-Source Tranches Extracted in 134ms.');
      setIsSolving(false);
    }, 1200);
  };

  return (
    <section id="quantum-knapsack" style={{ padding: '30px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-purple">
              <Atom size={13} />
              <span>Step 5: Quantum Combinatorial Knapsack</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            QUBO / QAOA Hybrid Solver Architecture
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Explores 16.7 million ($2^{24}$) multi-lender tranche configurations in sub-150ms to minimize total compounding APR.
          </p>
        </div>

        {/* Quantum Solver Card */}
        <div className="chronos-card glow-purple" style={{ padding: '28px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            
            {/* Mathematical Hamiltonian Display */}
            <div style={{
              backgroundColor: 'rgba(11, 19, 41, 0.8)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Cpu size={18} color="#c084fc" />
                <h4 style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 700 }}>
                  QUBO Knapsack Hamiltonian Formulation
                </h4>
              </div>
              
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                backgroundColor: '#050914',
                padding: '12px',
                borderRadius: '8px',
                color: '#38bdf8',
                lineHeight: 1.6,
                border: '1px solid #1e293b',
                marginBottom: '12px'
              }}>
                H_C = ∑(c_i · x_i) + ∑(J_ij · x_i · x_j) + λ(∑ A_i · x_i - D)²
              </div>

              <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5 }}>
                • <strong>Linear term (c_i):</strong> Multi-lender APR & upfront fee penalties.<br />
                • <strong>Quadratic term (J_ij):</strong> Cascading default collision penalty.<br />
                • <strong>Constraint (λ):</strong> Exact ₹{shock.amount.toLocaleString()} liquidity requirement.
              </div>
            </div>

            {/* Live Solver Controls & Status */}
            <div style={{
              backgroundColor: 'rgba(11, 19, 41, 0.8)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Quantum Circuit Status</span>
                  <span className="badge badge-emerald">QAOA Ready</span>
                </div>

                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid #334155',
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Console State:</div>
                  <div style={{ fontSize: '0.85rem', color: isSolving ? '#fbbf24' : '#34d399', fontWeight: 600 }}>
                    {solveStep}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '16px' }}>
                  <div>Latency: <strong style={{ color: '#38bdf8' }}>{quantumResult.quantumSolveTimeMs} ms</strong></div>
                  <div>Energy: <strong style={{ color: '#c084fc' }}>{quantumResult.hamiltonianEnergy} eV</strong></div>
                </div>
              </div>

              <button
                onClick={runSolverSimulation}
                disabled={isSolving}
                className="btn btn-quantum"
                style={{ width: '100%' }}
              >
                {isSolving ? <Sparkles size={16} className="animate-spin" /> : <Play size={16} />}
                <span>{isSolving ? 'Optimizing Quantum Hamiltonian...' : 'Re-Run Quantum Knapsack Solver'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
