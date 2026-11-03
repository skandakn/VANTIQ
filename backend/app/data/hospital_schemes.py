"""
VANTIQ Hospital Credit & Emergency Relief Scheme Master Database
Comprehensive dataset of institutional hospital credit options,
direct-desk 0% EMI schemes, and eligibility parameters across Indian healthcare chains.
"""

from typing import List, Dict, Any


HOSPITAL_SCHEMES_DATABASE: List[Dict[str, Any]] = [
    {
        "scheme_id": "apollo-zero-emi-6m",
        "hospital_group": "Apollo Hospitals Enterprise",
        "scheme_name": "Apollo CarePlan 0% Interest Desk",
        "min_amount": 15000,
        "max_amount": 250000,
        "tenure_months_available": [3, 6, 9],
        "default_tenure_months": 6,
        "base_apr": 0.0,
        "processing_fee_percent": 0.0,
        "foreclosure_charges": 0.0,
        "pre_authorization_required": False,
        "admission_deposit_waiver": True,
        "tier_1_available": True,
        "tier_2_available": True,
        "tier_3_available": False,
        "eligible_specialties": [
            "Cardiology & Cardiac Surgery",
            "Oncology & Chemotherapy",
            "Orthopedics & Joint Replacement",
            "Emergency ICU Admissions",
            "Nephrology & Renal Dialysis",
        ],
        "documentation_level": "Instant On-Desk Aadhar/PAN",
        "community_trust_score": 4.9,
    },
    {
        "scheme_id": "manipal-medicare-split",
        "hospital_group": "Manipal Health Enterprises",
        "scheme_name": "Manipal Lifeline Flexible Tenure EMI",
        "min_amount": 20000,
        "max_amount": 350000,
        "tenure_months_available": [6, 12, 18],
        "default_tenure_months": 12,
        "base_apr": 5.5,
        "processing_fee_percent": 0.5,
        "foreclosure_charges": 0.0,
        "pre_authorization_required": True,
        "admission_deposit_waiver": True,
        "tier_1_available": True,
        "tier_2_available": True,
        "tier_3_available": True,
        "eligible_specialties": [
            "Organ Transplants",
            "Complex Neurosurgery",
            "Pediatric Critical Care",
            "Gastroenterology Emergencies",
        ],
        "documentation_level": "Digital KYC in 15 Minutes",
        "community_trust_score": 4.8,
    },
    {
        "scheme_id": "narayana-hrudayalaya-affinity",
        "hospital_group": "Narayana Health",
        "scheme_name": "Narayana Affordable Cardiac Care Fund",
        "min_amount": 10000,
        "max_amount": 180000,
        "tenure_months_available": [6, 12, 24],
        "default_tenure_months": 12,
        "base_apr": 0.0,
        "processing_fee_percent": 0.0,
        "foreclosure_charges": 0.0,
        "pre_authorization_required": False,
        "admission_deposit_waiver": True,
        "tier_1_available": True,
        "tier_2_available": True,
        "tier_3_available": True,
        "eligible_specialties": [
            "Congenital Heart Defect Surgery",
            "Coronary Artery Bypass (CABG)",
            "Heart Valve Repair / Replacement",
            "General Emergency Resuscitation",
        ],
        "documentation_level": "Basic Identity Proof",
        "community_trust_score": 4.95,
    },
    {
        "scheme_id": "fortis-escorts-medassist",
        "hospital_group": "Fortis Healthcare",
        "scheme_name": "Fortis Emergency Patient Assist",
        "min_amount": 25000,
        "max_amount": 400000,
        "tenure_months_available": [3, 6, 12],
        "default_tenure_months": 6,
        "base_apr": 4.0,
        "processing_fee_percent": 0.25,
        "foreclosure_charges": 0.0,
        "pre_authorization_required": True,
        "admission_deposit_waiver": True,
        "tier_1_available": True,
        "tier_2_available": True,
        "tier_3_available": False,
        "eligible_specialties": [
            "Emergency Cardiology",
            "Trauma & Orthopedic Reconstruction",
            "Pulmonology & Respiratory Failure",
        ],
        "documentation_level": "Digital In-App Verification",
        "community_trust_score": 4.7,
    },
    {
        "scheme_id": "max-healthcare-zero-stress",
        "hospital_group": "Max Healthcare",
        "scheme_name": "Max Zero-Stress Emergency Desk",
        "min_amount": 30000,
        "max_amount": 500000,
        "tenure_months_available": [6, 9, 12],
        "default_tenure_months": 9,
        "base_apr": 6.0,
        "processing_fee_percent": 0.75,
        "foreclosure_charges": 0.0,
        "pre_authorization_required": True,
        "admission_deposit_waiver": True,
        "tier_1_available": True,
        "tier_2_available": False,
        "tier_3_available": False,
        "eligible_specialties": [
            "Emergency Surgery",
            "Oncology Care",
            "Neurology Critical Support",
        ],
        "documentation_level": "Instant Approval via PAN / AA",
        "community_trust_score": 4.65,
    },
]


def query_hospital_schemes(procedure_name: str = "", max_needed: float = 100000.0) -> List[Dict[str, Any]]:
    """Filters hospital relief schemes based on diagnosis and bill amount."""
    matched = []
    for s in HOSPITAL_SCHEMES_DATABASE:
        if s["min_amount"] <= max_needed:
            matched.append(s)
    return sorted(matched, key=lambda x: (x["base_apr"], -x["community_trust_score"]))
