// src/components/layout/Footer.tsx
// Module 1: Footer & Credits
import React from 'react';
import { Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      borderTop: '1px solid rgba(51, 65, 85, 0.4)',
      backgroundColor: 'rgba(5, 9, 20, 0.95)',
      padding: '48px 0 24px 0',
      marginTop: '80px'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0284c7, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Shield size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
                PROJECT CHRONOS<span style={{ color: '#38bdf8' }}>-FIN</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              A Quantum-Enhanced Counterfactual Financial Twin & Affective Affordability Engine designed to de-weaponize emergency credit and prevent debt traps.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Institutional Context
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              <strong>Event:</strong> IDEATHON 2026 — National Level Competition<br />
              <strong>Institution:</strong> Nagarjuna College of Engineering and Technology<br />
              <strong>Team:</strong> INNOVATEX
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Mission Creed
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#38bdf8', fontStyle: 'italic', lineHeight: 1.6 }}>
              "We do not eliminate emergency credit; we de-weaponize it. We transform predatory traps into sustainable lifelines."
            </p>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid rgba(51, 65, 85, 0.3)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <div>
            © 2026 Team INNOVATEX. Developed for IDEATHON 2026.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Built with precision for human dignity & financial survival</span>
            <Heart size={14} color="#f43f5e" fill="#f43f5e" />
          </div>
        </div>
      </div>
    </footer>
  );
};
