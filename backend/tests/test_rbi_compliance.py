import pytest
from backend.app.services.rbi_compliance_validator import (
    RBIComplianceValidator,
    LoanProductTerms,
)


def test_rbi_validator_flags_illegal_contact_scraping_and_excess_apr():
    bad_terms = LoanProductTerms(
        product_name="FastCash 24x7",
        lender_entity="Unregulated Shadow FinApp",
        principal_inr=15000.0,
        nominal_interest_pct=36.0,
        processing_fee_inr=1500.0,
        insurance_fee_inr=500.0,
        other_upfront_charges_inr=800.0,
        tenure_months=2,
        cooling_off_period_days=0,
        has_kfs_issued=False,
        requires_contact_list_access=True,
        requires_camera_access_continuous=True,
    )

    report = RBIComplianceValidator.evaluate_product(bad_terms)
    assert report.is_fully_compliant is False
    assert report.effective_all_inclusive_apr > 50.0
    violation_codes = [v.code for v in report.violations]
    assert "RBI-DL-001" in violation_codes  # Usurious APR
    assert "RBI-DL-002" in violation_codes  # Missing KFS
    assert "RBI-DL-004" in violation_codes  # Contact list harvesting
