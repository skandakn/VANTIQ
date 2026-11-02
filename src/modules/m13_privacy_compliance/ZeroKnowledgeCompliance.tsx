// src/modules/m13_privacy_compliance/ZeroKnowledgeCompliance.tsx
// Module 14: Regulatory Compliance & On-Device Privacy Sandbox (Wise Light Theme)
import React from 'react';
import { Lock, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

export const ZeroKnowledgeCompliance: React.FC = () => {
  return (
    <section id="privacy-compliance" style={{ padding: '60px 0', backgroundColor: 'var(--bg-deep)', borderTop: '1px solid #e5e9e2' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge badge-forest">
              <Lock size={13} />
              <span>Step 11: Security & Compliance Guard</span>
            </span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--wise-forest)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Zero-Knowledge Privacy & RBI Master Directions
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            All telemetry and SMS parsing executes strictly on-device using SQLite and WebAssembly. Zero PII leaves your smartphone.
          </p>
        </div>

        {/* Compliance Checklist Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '24px' }}>
          
          <div className="vantiq-card" style={{ padding: '32px', backgroundColor: '#ffffff', border: '1.5px solid #d0d7cc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: '#edf4ea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#15803d'
              }}>
                <ShieldCheck size={24} />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                On-Device Zero-Knowledge Edge
              </h4>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              Financial statements and transactional SMS messages are processed locally in an encrypted SQLCipher sandbox. Only mathematical zero-knowledge range proofs are verified—zero private data ever touches external servers.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: '#edf4ea',
              border: '1px solid #bbf7d0',
              color: '#15803d',
              fontSize: '0.82rem',
              fontWeight: 800
            }}>
              <CheckCircle2 size={15} />
              <span>100% Client-Side Compute Verified</span>
            </div>
          </div>

          <div className="vantiq-card" style={{ padding: '32px', backgroundColor: '#ffffff', border: '1.5px solid #d0d7cc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: '#f0fdf4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--wise-forest)'
              }}>
                <FileCheck size={24} />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--wise-forest)' }}>
                RBI Digital Lending Directions 2022
              </h4>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#15803d" />
                <span>Zero loan disbursement to third-party pool accounts</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#15803d" />
                <span>Standardized Key Fact Statement (KFS) upfront</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#15803d" />
                <span>Strict adherence to DPDP Act 2023 explicit consent rules</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
