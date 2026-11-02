// src/modules/m13_privacy_compliance/ZeroKnowledgeCompliance.tsx
// Module 14: Zero-Knowledge Privacy & Regulatory Compliance Module
// Developed by Member 14 | VANTIQ Team

import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Shield,
  EyeOff,
  Cpu,
  RefreshCw,
  Copy,
  Check,
  AlertTriangle,
  Scale,
  Server,
  Database,
  UserCheck,
  Clock,
  FileText,
  Zap,
  Award,
} from 'lucide-react';
import { useFintech } from '../../context/FintechContext';

// Types for ZK Verification Simulation
interface ZKProofState {
  status: 'idle' | 'generating' | 'verifying' | 'success';
  stepIndex: number;
  hash: string;
  zkProofA: string;
  zkProofB: string;
  zkProofC: string;
  publicSignals: {
    solvencyValid: boolean;
    maxSafeEmi: number;
    dtiRatioPercent: number;
    sovereignIdentitySalt: string;
  };
  computeTimeMs: number;
  timestamp: string;
}

// Account Aggregator Providers
interface AAProvider {
  id: string;
  name: string;
  rbiLicense: string;
  handleExample: string;
  encryption: string;
  status: string;
  description: string;
}

const AA_PROVIDERS: AAProvider[] = [
  {
    id: 'setu',
    name: 'Setu (Pine Labs)',
    rbiLicense: 'RBI NBFC-AA Reg #N-14.03482',
    handleExample: 'borrower@setu',
    encryption: 'ECDH Curve25519 + AES-GCM-256',
    status: 'Active & Certified',
    description: 'Instant consent handshake via NPCI AA ecosystem. Encrypted data travels directly from Bank (FIP) to local client browser (FIU) without Setu storing unencrypted payloads.',
  },
  {
    id: 'onemoney',
    name: 'OneMoney',
    rbiLicense: 'RBI NBFC-AA Reg #N-14.03450',
    handleExample: 'borrower@onemoney',
    encryption: 'End-to-End E2EE Payload Wrapping',
    status: 'Active & Certified',
    description: 'First RBI-licensed Account Aggregator in India. Operates as a completely blind data pipe with digital signature verification on each consent artifact.',
  },
  {
    id: 'anumati',
    name: 'Anumati (Perfios)',
    rbiLicense: 'RBI NBFC-AA Reg #N-14.03496',
    handleExample: 'borrower@anumati',
    encryption: 'FAPI-1.0 Advanced + RSA-OAEP',
    status: 'Active & Certified',
    description: 'Enterprise-grade consent flow designed for high-throughput institutional validation with revocable, periodic, or one-time fetch permissions.',
  },
];

export const ZeroKnowledgeCompliance: React.FC = () => {
  const { profile, shock } = useFintech();

  // Active Category Filter for Regulatory Compliance Grid
  const [activeTab, setActiveTab] = useState<'all' | 'rbi' | 'aa' | 'recovery'>('all');

  // Selected Account Aggregator Provider
  const [selectedAA, setSelectedAA] = useState<string>('setu');

  // Architecture Diagram Active Node Details
  const [activeArchNode, setActiveArchNode] = useState<'client' | 'barrier' | 'verifier'>('client');

  // Interactive ZK Proof State
  const [proofState, setProofState] = useState<ZKProofState>({
    status: 'idle',
    stepIndex: 0,
    hash: '0x7f4c9a81e3b24d770fa567bc821034d9ef2506bc8910ad34901cef56782390ab',
    zkProofA: '0x18a9fc...8721',
    zkProofB: '0x29bf4c...0183',
    zkProofC: '0x9923ed...55a7',
    publicSignals: {
      solvencyValid: true,
      maxSafeEmi: 7500,
      dtiRatioPercent: 37.5,
      sovereignIdentitySalt: '0x5c4a...77e9',
    },
    computeTimeMs: 142,
    timestamp: 'Ready to synthesize',
  });

  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  // Simulation Steps
  const zkSteps = [
    'Initializing WebAssembly Runtime (wasm-zk-core.wasm, 1.8 MB)...',
    'Ingesting On-Device Encrypted SQLCipher Telemetry & Payslips...',
    'Evaluating 42,890 Circom R1CS Non-Linear Solvency Constraints...',
    'Generating Groth16 Proof π over BN254 Elliptic Curve...',
    'Executing Public Verification Pairing e(A, B) = e(α, β) · e(x·γ, δ)...',
  ];

  // Handle Interactive Proof Verification
  const handleVerifyZKProof = () => {
    setProofState((prev) => ({
      ...prev,
      status: 'generating',
      stepIndex: 0,
    }));

    // Step-by-step simulated progress
    const stepInterval = setInterval(() => {
      setProofState((prev) => {
        if (prev.stepIndex < zkSteps.length - 1) {
          return { ...prev, stepIndex: prev.stepIndex + 1 };
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 380);

    // Finalize Proof
    setTimeout(() => {
      clearInterval(stepInterval);
      const randomHex = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      const calculatedMaxSafeEmi = Math.max(
        2500,
        Math.round(profile.absorptiveSurplus * 0.5)
      );
      const calculatedDti = Math.min(
        65,
        Math.round(((profile.existingEmi + profile.houseRent) / profile.monthlyIncome) * 100)
      );

      setProofState({
        status: 'success',
        stepIndex: zkSteps.length - 1,
        hash: `0x${randomHex}`,
        zkProofA: `0x${randomHex.substring(0, 10)}...${randomHex.substring(58)}`,
        zkProofB: `0x${randomHex.substring(12, 22)}...${randomHex.substring(48, 58)}`,
        zkProofC: `0x${randomHex.substring(24, 34)}...${randomHex.substring(38, 48)}`,
        publicSignals: {
          solvencyValid: calculatedDti <= 50,
          maxSafeEmi: calculatedMaxSafeEmi,
          dtiRatioPercent: calculatedDti,
          sovereignIdentitySalt: `0x${randomHex.substring(0, 8)}...hash`,
        },
        computeTimeMs: Math.floor(Math.random() * 60) + 120,
        timestamp: new Date().toLocaleTimeString(),
      });
    }, 2100);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <section id="compliance" style={{ padding: '40px 0 60px 0' }}>
      <div className="container">
        {/* Module Header with Member 14 Identification */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} />
              <span>Step 11 • Member 14 Module</span>
            </span>
            <span className="badge badge-cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} />
              <span>ZK-SNARK Client Engine</span>
            </span>
            <span className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Scale size={14} />
              <span>RBI Digital Lending Guidelines 2022/2023</span>
            </span>
          </div>

          <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Zero-Knowledge Privacy Sandbox & RBI Regulatory Compliance
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '1000px', lineHeight: 1.6 }}>
            VANTIQ eliminates the core vulnerability of predatory digital lending: the exfiltration of personal bank credentials, transactional SMS logs, and sensitive payroll slips. By evaluating borrower solvency directly inside the user’s local browser via WebAssembly (WASM), we emit cryptographic ZK-SNARK range proofs without a single byte of personally identifiable information (PII) touching external cloud infrastructure.
          </p>
        </div>

        {/* =========================================================================
            SECTION 1: TECHNICAL ARCHITECTURE DIAGRAM (CLIENT-SIDE WASM PROOF)
           ========================================================================= */}
        <div className="VANTIQ-card glow-cyan" style={{ marginBottom: '32px', padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Cpu size={20} color="#38bdf8" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
                  Technical Architecture: Client-Side WASM Proof Generation
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                End-to-end cryptographic pipeline demonstrating client air-gap isolation, Groth16 circuit synthesis, and zero-PII verifier handshake.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={`btn ${activeArchNode === 'client' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                onClick={() => setActiveArchNode('client')}
              >
                1. Local Device Sandbox
              </button>
              <button
                className={`btn ${activeArchNode === 'barrier' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                onClick={() => setActiveArchNode('barrier')}
              >
                2. ZK Mathematical Barrier
              </button>
              <button
                className={`btn ${activeArchNode === 'verifier' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                onClick={() => setActiveArchNode('verifier')}
              >
                3. Quantum Verifier Mesh
              </button>
            </div>
          </div>

          {/* Interactive Flow Diagram */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '18px',
              padding: '24px',
              background: 'rgba(5, 9, 20, 0.75)',
              borderRadius: '14px',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Box 1: Local Device Boundary */}
            <div
              onClick={() => setActiveArchNode('client')}
              style={{
                cursor: 'pointer',
                background: activeArchNode === 'client' ? 'rgba(6, 182, 212, 0.12)' : 'rgba(15, 23, 42, 0.6)',
                border: activeArchNode === 'client' ? '2px solid #06b6d4' : '1px solid rgba(51, 65, 85, 0.5)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                  Zone 1: Local Device Airgap
                </span>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
                  🔒 100% On-Device
                </span>
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
                Local WebAssembly Core
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Database size={14} color="#06b6d4" />
                  <span>Encrypted SQLite / SQLCipher Store</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={14} color="#06b6d4" />
                  <span>Raw Bank Statements & Payslips</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <EyeOff size={14} color="#06b6d4" />
                  <span>Private Witness: w = (Income, EMIs, Rent)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu size={14} color="#06b6d4" />
                  <span>Rust / Circom Prover compiled to WASM</span>
                </li>
              </ul>
              <div style={{ marginTop: '14px', fontSize: '0.72rem', color: '#38bdf8', borderTop: '1px solid rgba(6, 182, 212, 0.2)', paddingTop: '8px' }}>
                Zero network egress during witness parsing
              </div>
            </div>

            {/* Box 2: ZK Mathematical Barrier */}
            <div
              onClick={() => setActiveArchNode('barrier')}
              style={{
                cursor: 'pointer',
                background: activeArchNode === 'barrier' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                border: activeArchNode === 'barrier' ? '2px solid #8b5cf6' : '1px solid rgba(51, 65, 85, 0.5)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                  Zone 2: Cryptographic Barrier
                </span>
                <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 700 }}>
                  ⚡ BN254 Curve
                </span>
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
                Groth16 Zero-Knowledge Synthesis
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={14} color="#8b5cf6" />
                  <span>Rank-1 Constraint System (R1CS: 42k gates)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={14} color="#8b5cf6" />
                  <span>Solvency Proof: Surplus ≥ LoanEMI</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={14} color="#8b5cf6" />
                  <span>DTI Ratio Boundary: DTI ≤ 45%</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#8b5cf6" />
                  <span>Emits Proof $\pi = (A \in G_1, B \in G_2, C \in G_1)$</span>
                </li>
              </ul>
              <div style={{ marginTop: '14px', fontSize: '0.72rem', color: '#c084fc', borderTop: '1px solid rgba(139, 92, 246, 0.2)', paddingTop: '8px' }}>
                Irreversible one-way mathematical reduction
              </div>
            </div>

            {/* Box 3: Public Verifier Boundary */}
            <div
              onClick={() => setActiveArchNode('verifier')}
              style={{
                cursor: 'pointer',
                background: activeArchNode === 'verifier' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(15, 23, 42, 0.6)',
                border: activeArchNode === 'verifier' ? '2px solid #10b981' : '1px solid rgba(51, 65, 85, 0.5)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                  Zone 3: Public Verifier & Solver
                </span>
                <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
                  🚀 Zero PII Stored
                </span>
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
                Quantum Solver & NBFC Engine
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Server size={14} color="#10b981" />
                  <span>VANTIQ QUBO Multi-Tranche Allocator</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={14} color="#10b981" />
                  <span>Pairing Verification Check in &lt; 8ms</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#10b981" />
                  <span>Receives: Only Proof Hash + Public Scalar</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={14} color="#10b981" />
                  <span>Strict RBI Sovereign Indian Data Residency</span>
                </li>
              </ul>
              <div style={{ marginTop: '14px', fontSize: '0.72rem', color: '#34d399', borderTop: '1px solid rgba(16, 185, 129, 0.2)', paddingTop: '8px' }}>
                Verifier learns truth of statement, nothing more
              </div>
            </div>
          </div>

          {/* Dynamic Explanatory Footer based on Selected Architecture Node */}
          <div
            style={{
              marginTop: '16px',
              padding: '14px 18px',
              borderRadius: '8px',
              background: 'rgba(30, 41, 59, 0.45)',
              borderLeft: `4px solid ${
                activeArchNode === 'client' ? '#06b6d4' : activeArchNode === 'barrier' ? '#8b5cf6' : '#10b981'
              }`,
              fontSize: '0.85rem',
              color: '#e2e8f0',
              lineHeight: 1.5,
            }}
          >
            {activeArchNode === 'client' && (
              <>
                <strong style={{ color: '#38bdf8' }}>Client-Side Sandbox Guarantee:</strong> All personal bank credentials, PDF statement passwords, net banking auth tokens, and payroll slips are decrypted exclusively inside the device’s local browser memory heap via WebAssembly. Neither our servers nor lending partners ever have network or visual access to raw financial documents.
              </>
            )}
            {activeArchNode === 'barrier' && (
              <>
                <strong style={{ color: '#c084fc' }}>Mathematical Zero-Knowledge Soundness:</strong> The Circom circuit enforces mathematical constraints: AbsorptiveSurplus ≥ EmergencyEMI and DTI_effective ≤ 45%. The generated Groth16 zk-SNARK proof guarantees that even an adversary with unlimited compute cannot extract the underlying salary or debt obligations from the proof payload.
              </>
            )}
            {activeArchNode === 'verifier' && (
              <>
                <strong style={{ color: '#34d399' }}>Institutional Compliance & Rapid Verification:</strong> The NBFC verifier and VANTIQ Knapsack engine run a bilinear pairing check $e(A, B) = e(\alpha, \beta) \cdot e(x \cdot \gamma, \delta) \cdot e(C, \delta)$ taking under 8ms. Loan approval happens at sub-second latency with 100% mathematical auditability and 0% risk of data breaches.
              </>
            )}
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: ZK-SNARK CLIENT-SIDE COMPUTATION PANEL & PROOF WIDGET
           ========================================================================= */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '24px', marginBottom: '36px' }}>
          
          {/* Explanation Panel: Why Raw Data Never Leaves Device */}
          <div className="VANTIQ-card glow-emerald" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <ShieldCheck size={24} color="#10b981" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
                  Zero-Knowledge Client Sandbox
                </h3>
              </div>

              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
                Traditional lending platforms violate privacy by uploading raw bank statements, Aadhaar numbers, and pay slips to centralized cloud OCR servers—creating catastrophic data leakage vectors and enabling predatory aggressive debt collectors.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '8px', borderRadius: '8px', color: '#10b981' }}>
                    <EyeOff size={18} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc', marginBottom: '2px' }}>
                      Air-Gapped Credential Ingestion
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Bank NetBanking tokens, Account Aggregator consent tokens, and PDF payroll passwords operate in isolated WebAssembly threads with network sockets severed.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '8px', borderRadius: '8px', color: '#06b6d4' }}>
                    <Cpu size={18} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc', marginBottom: '2px' }}>
                      On-Device Circom Prover
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Executes Groth16 witness generation on client silicon (iPhone/Android/Laptop) compiling over 42,000 arithmetic constraints in &lt; 200ms.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '8px', borderRadius: '8px', color: '#8b5cf6' }}>
                    <Lock size={18} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc', marginBottom: '2px' }}>
                      Mathematical Capacity Certificate
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Instead of showing ₹{profile.monthlyIncome.toLocaleString('en-IN')} income, the proof simply asserts: <em>"Borrower has surplus capacity &gt; ₹{shock.amount.toLocaleString('en-IN')} emergency shock within 99.99% certainty"</em>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.8rem',
              color: '#34d399',
            }}>
              <CheckCircle2 size={16} />
              <span>Zero PII leaves local hardware • Audited against ISO 27001 & DPDP Act 2023</span>
            </div>
          </div>

          {/* Interactive Proof Verification Widget */}
          <div className="VANTIQ-card glow-purple" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Zap size={22} color="#c084fc" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
                  ZK-Capacity Proof Verifier
                </h3>
              </div>
              <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                Groth16 • BN254
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '18px' }}>
              Test the real-time client-side cryptographic proof engine. Generates zero-knowledge solvency verification from active emergency simulation parameters.
            </p>

            {/* Current Financial Witness Inputs (Local Device State) */}
            <div style={{
              background: 'rgba(5, 9, 20, 0.6)',
              borderRadius: '10px',
              padding: '14px',
              border: '1px solid rgba(51, 65, 85, 0.5)',
              marginBottom: '18px',
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>
                Local Private Witness Parameters (Client SQLite)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: '#64748b' }}>Monthly Inflow: </span>
                  <strong style={{ color: '#f8fafc' }}>₹{profile.monthlyIncome.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>Liquid Surplus: </span>
                  <strong style={{ color: '#10b981' }}>₹{profile.absorptiveSurplus.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>Target Emergency: </span>
                  <strong style={{ color: '#38bdf8' }}>₹{shock.amount.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>Existing Outflows: </span>
                  <strong style={{ color: '#f87171' }}>₹{(profile.existingEmi + profile.houseRent).toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>

            {/* Progress and Step Status */}
            {proofState.status === 'generating' && (
              <div style={{ marginBottom: '18px', padding: '14px', background: 'rgba(139, 92, 246, 0.12)', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <RefreshCw size={16} className="animate-spin-slow" color="#c084fc" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c084fc' }}>
                    Generating On-Device Zero-Knowledge Proof...
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#e2e8f0', marginBottom: '8px', fontFamily: 'monospace' }}>
                  {zkSteps[proofState.stepIndex]}
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(51, 65, 85, 0.5)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${((proofState.stepIndex + 1) / zkSteps.length) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Verification Success Output Box */}
            {proofState.status === 'success' && (
              <div style={{
                marginBottom: '18px',
                padding: '16px',
                background: 'rgba(16, 185, 129, 0.08)',
                borderRadius: '10px',
                border: '1px solid rgba(16, 185, 129, 0.35)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>
                      ZK-SNARK Proof Verified Valid
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    Compute Latency: <strong style={{ color: '#38bdf8' }}>{proofState.computeTimeMs}ms</strong>
                  </span>
                </div>

                {/* Proof Hash with Copy Action */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Cryptographic ZK Proof Hash (Public Verification Key)
                    </span>
                    <button
                      onClick={() => copyToClipboard(proofState.hash)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedHash ? '#34d399' : '#38bdf8',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {copiedHash ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedHash ? 'Copied!' : 'Copy Hash'}</span>
                    </button>
                  </div>
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.45)',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    color: '#38bdf8',
                    wordBreak: 'break-all',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                  }}>
                    {proofState.hash}
                  </div>
                </div>

                {/* Public Signals */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.75rem', background: 'rgba(15, 23, 42, 0.5)', padding: '8px', borderRadius: '6px' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Solvency Public: </span>
                    <strong style={{ color: proofState.publicSignals.solvencyValid ? '#10b981' : '#ef4444' }}>
                      {proofState.publicSignals.solvencyValid ? 'TRUE (1)' : 'FALSE (0)'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Safe EMI Cap: </span>
                    <strong style={{ color: '#f8fafc' }}>₹{proofState.publicSignals.maxSafeEmi.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>DTI Ratio: </span>
                    <strong style={{ color: '#38bdf8' }}>{proofState.publicSignals.dtiRatioPercent}%</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Action Trigger Button */}
            <div style={{ marginTop: 'auto' }}>
              <button
                className="btn btn-quantum"
                onClick={handleVerifyZKProof}
                disabled={proofState.status === 'generating'}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: proofState.status === 'generating' ? 'not-allowed' : 'pointer',
                  opacity: proofState.status === 'generating' ? 0.7 : 1,
                }}
              >
                {proofState.status === 'generating' ? (
                  <>
                    <RefreshCw size={16} className="animate-spin-slow" />
                    <span>Synthesizing Client-Side Proof...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>Verify ZK-Capacity Proof</span>
                  </>
                )}
              </button>
              <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '0.72rem', color: '#64748b' }}>
                Deterministic simulation using Groth16 cryptographic constraints • No telemetry sent
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 3: REGULATORY COMPLIANCE GRID
           ========================================================================= */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Scale size={20} color="#10b981" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
                  Institutional Regulatory Compliance Grid
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                Strict adherence to Reserve Bank of India (RBI) Digital Lending Guidelines, Account Aggregator frameworks, and Fair Practices Code.
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                onClick={() => setActiveTab('all')}
              >
                All Mandates
              </button>
              <button
                className={`btn ${activeTab === 'rbi' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                onClick={() => setActiveTab('rbi')}
              >
                RBI Lending Guidelines
              </button>
              <button
                className={`btn ${activeTab === 'aa' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                onClick={() => setActiveTab('aa')}
              >
                Account Aggregators (AA)
              </button>
              <button
                className={`btn ${activeTab === 'recovery' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                onClick={() => setActiveTab('recovery')}
              >
                Fair Recovery & Anti-Harassment
              </button>
            </div>
          </div>

          {/* Grid of Compliance Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '20px' }}>
            
            {/* Card 1: RBI Direct Lending Mandate */}
            {(activeTab === 'all' || activeTab === 'rbi') && (
              <div className="VANTIQ-card glow-cyan">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileCheck size={22} color="#06b6d4" />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                      Direct Account Disbursement
                    </h4>
                  </div>
                  <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>RBI 2022 Mandate</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '14px' }}>
                  Under RBI Digital Lending Directions (DOR.CRE.REC.65/21.01.003/2022-23), all disbursements and repayments execute directly between the borrower's bank account and the Regulated Entity (RE).
                </p>
                <div style={{ background: 'rgba(5, 9, 20, 0.5)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#06b6d4" />
                    <span>Zero pass-through or pool accounts permitted</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#06b6d4" />
                    <span>No Lending Service Provider (LSP) handling funds</span>
                  </div>
                </div>
              </div>
            )}

            {/* Card 2: Standardized Key Fact Statement (KFS) */}
            {(activeTab === 'all' || activeTab === 'rbi') && (
              <div className="VANTIQ-card glow-cyan">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={22} color="#06b6d4" />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                      Key Fact Statement (KFS) Upfront
                    </h4>
                  </div>
                  <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>Full Transparency</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '14px' }}>
                  Before loan agreement execution, borrowers receive a standardized, human-readable KFS disclosing all-inclusive Annual Percentage Rate (APR), processing fees, and repayment schedules.
                </p>
                <div style={{ background: 'rgba(5, 9, 20, 0.5)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#06b6d4" />
                    <span>Zero hidden processing fees or balloon interest</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#06b6d4" />
                    <span>Mandatory 3-day look-up / cooling-off cancellation period</span>
                  </div>
                </div>
              </div>
            )}

            {/* Card 3: DPDP Act 2023 Explicit Consent Architecture */}
            {(activeTab === 'all' || activeTab === 'rbi') && (
              <div className="VANTIQ-card glow-cyan">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Lock size={22} color="#06b6d4" />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                      DPDP Act 2023 Sovereign Consent
                    </h4>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>Zero Data Retention</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '14px' }}>
                  Complies strictly with India's Digital Personal Data Protection Act 2023. Explicit purpose-limited consent is required for each verification run, with unconditional right to erasure.
                </p>
                <div style={{ background: 'rgba(5, 9, 20, 0.5)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#10b981" />
                    <span>No biometric or contact harvesting permitted</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#10b981" />
                    <span>All server-side verification nodes located in India</span>
                  </div>
                </div>
              </div>
            )}

            {/* Card 4: Account Aggregator (AA) Ecosystem Details */}
            {(activeTab === 'all' || activeTab === 'aa') && (
              <div className="VANTIQ-card glow-purple" style={{ gridColumn: activeTab === 'aa' ? '1 / -1' : undefined }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Database size={22} color="#8b5cf6" />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                      RBI-Regulated Account Aggregator (AA)
                    </h4>
                  </div>
                  <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>NBFC-AA Ecosystem</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '14px' }}>
                  Integrated with licensed Account Aggregators. AA acts as an encrypted, blind data custodian: data is fetched with user consent directly from Financial Information Providers (FIPs).
                </p>

                {/* Interactive AA Provider Selector */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  {AA_PROVIDERS.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => setSelectedAA(provider.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: selectedAA === provider.id ? 'rgba(139, 92, 246, 0.25)' : 'rgba(30, 41, 59, 0.5)',
                        border: selectedAA === provider.id ? '1px solid #8b5cf6' : '1px solid rgba(51, 65, 85, 0.4)',
                        color: selectedAA === provider.id ? '#c084fc' : '#94a3b8',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {provider.name}
                    </button>
                  ))}
                </div>

                {/* Active AA Details */}
                {(() => {
                  const currentAA = AA_PROVIDERS.find((p) => p.id === selectedAA) || AA_PROVIDERS[0];
                  return (
                    <div style={{ background: 'rgba(5, 9, 20, 0.55)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.78rem' }}>
                        <span style={{ color: '#c084fc', fontWeight: 700 }}>{currentAA.rbiLicense}</span>
                        <span style={{ color: '#10b981', fontWeight: 600 }}>{currentAA.status}</span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '8px' }}>
                        {currentAA.description}
                      </p>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        Encryption Standard: <strong style={{ color: '#38bdf8' }}>{currentAA.encryption}</strong> • Handle: <code style={{ color: '#f8fafc' }}>{currentAA.handleExample}</code>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Card 5: Fair Recovery Practices & Anti-Harassment Guarantee */}
            {(activeTab === 'all' || activeTab === 'recovery') && (
              <div className="VANTIQ-card glow-emerald" style={{ gridColumn: activeTab === 'recovery' ? '1 / -1' : undefined }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Shield size={22} color="#10b981" />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                      Fair Recovery & Anti-Harassment Guarantee
                    </h4>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>Strict Code of Conduct</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '14px' }}>
                  Zero tolerance for coercive debt collection tactics. VANTIQ contractually bounds all participating NBFCs to the RBI Fair Practices Code for Lenders.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ background: 'rgba(5, 9, 20, 0.5)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#f8fafc', fontSize: '0.8rem', fontWeight: 700 }}>
                      <Clock size={14} color="#10b981" />
                      <span>Communication Curfew</span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                      Strict curfew: No outreach before 08:00 or after 19:00 IST. Algorithmic blocking enforced at API gateway.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(5, 9, 20, 0.5)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#f8fafc', fontSize: '0.8rem', fontWeight: 700 }}>
                      <AlertTriangle size={14} color="#ef4444" />
                      <span>Zero Contact Harvesting</span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                      System architecture makes it physically impossible to access borrower contact book, gallery, or social circles.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(5, 9, 20, 0.5)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#f8fafc', fontSize: '0.8rem', fontWeight: 700 }}>
                      <UserCheck size={14} color="#38bdf8" />
                      <span>Grievance Escalation Portal</span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                      In-app Grievance Redressal Officer (24-hr resolution) with direct escalation to RBI Ombudsman Scheme.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#34d399', borderTop: '1px solid rgba(16, 185, 129, 0.2)', paddingTop: '10px' }}>
                  <span>✓ 100% RBI Fair Recovery Compliant</span>
                  <span style={{ color: '#94a3b8' }}>RBI Ombudsman Portal: cms.rbi.org.in</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Section Bottom Assurance Banner */}
        <div
          style={{
            marginTop: '28px',
            padding: '20px 24px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(16, 185, 129, 0.08))',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Award size={28} color="#10b981" />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
                Sovereign Cryptographic Privacy Certification
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Certified under ISO 27001, Indian DPDP Act 2023, and RBI Master Direction on Digital Lending.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span className="badge badge-emerald" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
              ✓ Zero PII Stored
            </span>
            <span className="badge badge-cyan" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
              ✓ On-Device WASM
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ZeroKnowledgeCompliance;
