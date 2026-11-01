// src/modules/m03_debt_mesh/GhostDebtMesh.tsx
// Module 4: Ghost Debt Mesh & On-Device ZK Aggregator
import React from 'react';
import { Layers, AlertOctagon, Smartphone } from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

export const GhostDebtMesh: React.FC = () => {
  const { predatoryOffers } = useFintech();

  const totalAppLimit = predatoryOffers.reduce((sum, item) => sum + item.offeredLimit, 0);

  return (
    <section id="debt-mesh" style={{ padding: '30px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-amber">
              <Layers size={13} />
              <span>Step 2: Ghost Debt Mesh</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            The Credit Mirage: 4 Disconnected Lending Apps
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Under acute emergency stress, a borrower sees ₹75,000 in instant credit and assumes they can safely take ₹50,000.
          </p>
        </div>

        {/* Warning Banner */}
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertOctagon size={24} color="#f87171" />
            <div>
              <div style={{ fontWeight: 700, color: '#fca5a5', fontSize: '0.95rem' }}>
                Total Offered Limits: ₹{totalAppLimit.toLocaleString()} across 4 Apps
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                Bureaus take 30–60 days to report; apps don't know each other exists, enabling silent 5x over-leverage!
              </div>
            </div>
          </div>
          <span className="badge badge-red">High Default Danger</span>
        </div>

        {/* 4 Predatory Apps Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {predatoryOffers.map((app) => (
            <div key={app.id} className="chronos-card" style={{ borderLeft: '4px solid #ef4444', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Smartphone size={16} color="#38bdf8" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc' }}>{app.lenderName}</span>
                </div>
                <span className="badge badge-red" style={{ fontSize: '0.65rem' }}>{app.interestApr}% APR</span>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Offered Limit</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
                  ₹{app.offeredLimit.toLocaleString()}
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                color: '#cbd5e1',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>Monthly EMI: ₹{app.monthlyEmi.toLocaleString()}</span>
                <span style={{ color: '#f87171' }}>Collision: Day {app.defaultCollisionDay}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
