"""
VANTIQ Sovereign & Central/State Government Health Schemes Database
Comprehensive metadata on Ayushman Bharat (PM-JAY), state chief minister relief funds,
and non-profit sovereign welfare health grants in India.
"""

from typing import List, Dict, Any


SOVEREIGN_SCHEMES_DATABASE: List[Dict[str, Any]] = [
    {
        "scheme_code": "PMJAY_CENTRAL",
        "official_name": "Pradhan Mantri Jan Arogya Yojana (Ayushman Bharat)",
        "governing_body": "National Health Authority (NHA), Govt of India",
        "max_annual_coverage_inr": 500000,
        "co_pay_percentage": 0.0,
        "interest_rate": 0.0,
        "is_non_repayable_grant": True,
        "eligibility_criteria": [
            "SECC 2011 Deprivation Criteria D1-D7",
            "Active Ayushman Golden Card Holder",
            "Designated EWS / Rural household categorization",
        ],
        "empanelled_hospitals_count": 28400,
        "pre_existing_diseases_covered_from_day_one": True,
        "cashless_claim_settlement": True,
        "claim_approval_time_hours": 1.5,
        "official_portal": "https://pmjay.gov.in",
        "beneficiary_satisfaction_rate": 0.91,
    },
    {
        "scheme_code": "RAN_MINISTRY_HEALTH",
        "official_name": "Rashtriya Arogya Nidhi (RAN)",
        "governing_body": "Ministry of Health & Family Welfare, Govt of India",
        "max_annual_coverage_inr": 1500000,
        "co_pay_percentage": 0.0,
        "interest_rate": 0.0,
        "is_non_repayable_grant": True,
        "eligibility_criteria": [
            "BPL card holder suffering from life-threatening diseases",
            "Treatment at designated central government super-specialty hospitals (AIIMS, PGI, JIPMER)",
        ],
        "empanelled_hospitals_count": 140,
        "pre_existing_diseases_covered_from_day_one": True,
        "cashless_claim_settlement": True,
        "claim_approval_time_hours": 24.0,
        "official_portal": "https://mohfw.gov.in",
        "beneficiary_satisfaction_rate": 0.88,
    },
    {
        "scheme_code": "CMRF_KARNATAKA",
        "official_name": "Chief Minister's Medical Relief Fund (Karnataka)",
        "governing_body": "Government of Karnataka",
        "max_annual_coverage_inr": 100000,
        "co_pay_percentage": 0.0,
        "interest_rate": 0.0,
        "is_non_repayable_grant": True,
        "eligibility_criteria": [
            "Permanent resident of Karnataka with annual income below INR 1.5 Lakhs",
            "Original hospital estimate bill certified by Medical Superintendent",
        ],
        "empanelled_hospitals_count": 650,
        "pre_existing_diseases_covered_from_day_one": True,
        "cashless_claim_settlement": False,
        "claim_approval_time_hours": 72.0,
        "official_portal": "https://cmrf.karnataka.gov.in",
        "beneficiary_satisfaction_rate": 0.84,
    },
    {
        "scheme_code": "AROGYASRI_TELANGANA_AP",
        "official_name": "Aarogyasri Health Care Trust",
        "governing_body": "Govt of Telangana & Andhra Pradesh",
        "max_annual_coverage_inr": 500000,
        "co_pay_percentage": 0.0,
        "interest_rate": 0.0,
        "is_non_repayable_grant": True,
        "eligibility_criteria": [
            "White ration card holders",
            "Covers 1,672 listed medical & surgical procedures end-to-end",
        ],
        "empanelled_hospitals_count": 1250,
        "pre_existing_diseases_covered_from_day_one": True,
        "cashless_claim_settlement": True,
        "claim_approval_time_hours": 2.0,
        "official_portal": "https://aarogyasri.telangana.gov.in",
        "beneficiary_satisfaction_rate": 0.94,
    },
]


def query_sovereign_schemes(patient_income: float = 60000.0) -> List[Dict[str, Any]]:
    """Retrieves relevant sovereign healthcare assistance schemes."""
    return sorted(SOVEREIGN_SCHEMES_DATABASE, key=lambda x: -x["max_annual_coverage_inr"])
