// src/modules/m13_privacy_compliance/ZeroKnowledgeCompliance.tsx
// Module 14: Regulatory Compliance & On-Device Privacy Sandbox
import React from 'react';
import { Lock, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

export const ZeroKnowledgeCompliance: React.FC = () => {

  return (
    <section id="privacy-compliance" style={{ padding: '30px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">
              <Lock size={13} />
              <span>Step 11: Security & Compliance Guard</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
            Zero-Knowledge Privacy & RBI Master Directions
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            All telemetry and SMS parsing executes strictly on-device using SQLite and WebAssembly. Zero PII leaves the smartphone.
          </p>
        </div>

        {/* Compliance Checklist Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
          
          <div className="chronos-card glow-emerald">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <ShieldCheck size={22} color="#10b981" />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                On-Device Zero-Knowledge Edge
              </h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
              Financial statements and transactional SMS messages are processed locally in an encrypted SQLCipher sandbox. Only mathematical zero-knowledge range proofs are sent to the quantum solver.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              <CheckCircle2 size={14} />
              <span>100% Client-Side Compute Verified</span>
            </div>
          </div>

          <div className="chronos-card glow-cyan">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <FileCheck size={22} color="#06b6d4" />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                RBI Digital Lending Directions 2022
              </h4>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#06b6d4" />
                <span>Zero loan disbursement to third-party pool accounts</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#06b6d4" />
                <span>Standardized Key Fact Statement (KFS) upfront</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#06b6d4" />
                <span>Strict adherence to DPDP Act 2023 explicit consent rules</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
