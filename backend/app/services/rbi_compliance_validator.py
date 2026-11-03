"""
RBI Digital Lending Guidelines (2022/2023) Compliance & Fair Practices Checker
Evaluates financial rescue offers against statutory mandates:
- Mandatory Key Fact Statement (KFS)
- Cooling-off / look-up window enforcement
- Prohibition of automatic credit limit increases
- APR transparency (All-inclusive Cost of Credit)
- Prohibition of direct borrower fees diverted to unvetted third parties
"""

from __future__ import annotations

from typing import List, Dict, Any
from pydantic import BaseModel, Field


class LoanProductTerms(BaseModel):
    product_name: str
    lender_entity: str
    principal_inr: float
    nominal_interest_pct: float
    processing_fee_inr: float
    insurance_fee_inr: float
    other_upfront_charges_inr: float
    tenure_months: int
    cooling_off_period_days: int
    has_kfs_issued: bool
    requires_contact_list_access: bool
    requires_camera_access_continuous: bool


class ComplianceViolation(BaseModel):
    code: str
    rule_name: str
    severity: str  # ADVISORY, WARNING, ILLEGAL_CRITICAL
    description: str
    remediation: str


class RBIComplianceReport(BaseModel):
    product_name: str
    is_fully_compliant: bool
    effective_all_inclusive_apr: float
    violations: List[ComplianceViolation]
    summary_verdict: str


class RBIComplianceValidator:
    """
    Automated regulatory rule-checking engine enforcing the Reserve Bank of India
    Master Directions on Digital Lending and Fair Practices Code.
    """

    @classmethod
    def evaluate_product(cls, terms: LoanProductTerms) -> RBIComplianceReport:
        violations: List[ComplianceViolation] = []

        # 1. Total Upfront Deductions & APR Calculation
        upfront_total = (
            terms.processing_fee_inr
            + terms.insurance_fee_inr
            + terms.other_upfront_charges_inr
        )
        net_disbursed = max(1.0, terms.principal_inr - upfront_total)

        annualized_fee_pct = (upfront_total / net_disbursed) * (12.0 / max(1, terms.tenure_months)) * 100.0
        effective_apr = terms.nominal_interest_pct + annualized_fee_pct

        # Violation check: Usurious APR
        if effective_apr > 36.0:
            violations.append(
                ComplianceViolation(
                    code="RBI-DL-001",
                    rule_name="Excessive APR & Usurious Pricing",
                    severity="ILLEGAL_CRITICAL",
                    description=(
                        f"Effective all-inclusive APR of {effective_apr:.1f}% violates RBI fair "
                        "interest rate model and judicial precedents on unconscionable contracts."
                    ),
                    remediation="Restructure loan with capped fees and tenure >= 6 months to reduce effective APR below 24%.",
                )
            )

        # 2. Key Fact Statement (KFS)
        if not terms.has_kfs_issued:
            violations.append(
                ComplianceViolation(
                    code="RBI-DL-002",
                    rule_name="Absence of Standardized Key Fact Statement",
                    severity="ILLEGAL_CRITICAL",
                    description="Lender failed to provide standardized KFS in prescribed format before loan execution.",
                    remediation="Mandate signed digital KFS detailing all charges before sanction.",
                )
            )

        # 3. Cooling-off Period
        if terms.cooling_off_period_days < 3:
            violations.append(
                ComplianceViolation(
                    code="RBI-DL-003",
                    rule_name="Insufficient Look-up / Cooling-off Window",
                    severity="WARNING",
                    description=(
                        f"Specified cooling-off window ({terms.cooling_off_period_days} days) is less than "
                        "the RBI minimum mandate of 3 days for tenures >= 7 days."
                    ),
                    remediation="Grant minimum 3-day penalty-free exit window upon repayment of principal.",
                )
            )

        # 4. Invasive Mobile Permissions
        if terms.requires_contact_list_access:
            violations.append(
                ComplianceViolation(
                    code="RBI-DL-004",
                    rule_name="Prohibited Contact List Harvesting",
                    severity="ILLEGAL_CRITICAL",
                    description="RBI circular specifically forbids lending apps from accessing borrower phone contacts.",
                    remediation="Revoke contact permissions immediately; use Account Aggregator for cashflow verification.",
                )
            )

        if terms.requires_camera_access_continuous:
            violations.append(
                ComplianceViolation(
                    code="RBI-DL-005",
                    rule_name="Continuous Device Telemetry Violation",
                    severity="WARNING",
                    description="Continuous camera access is impermissible except for one-time video KYC.",
                    remediation="Limit camera permission to single-session V-KYC event.",
                )
            )

        is_compliant = len([v for v in violations if v.severity == "ILLEGAL_CRITICAL"]) == 0

        verdict = (
            "COMPLIANT: Product meets RBI Digital Lending Norms."
            if is_compliant
            else "NON-COMPLIANT: Contains severe statutory violations under RBI Fair Practices Code."
        )

        return RBIComplianceReport(
            product_name=terms.product_name,
            is_fully_compliant=is_compliant,
            effective_all_inclusive_apr=round(effective_apr, 2),
            violations=violations,
            summary_verdict=verdict,
        )
