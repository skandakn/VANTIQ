import pytest
from backend.integrations.ocr_hospital_bill_parser import HospitalBillParser


def test_hospital_bill_parser():
    sample_text = """
    APOLLO HOSPITALS BANGALORE
    Patient: John Doe, Age 42
    ICU Bed Charges (4 Days)   60,000.00
    Emergency Angioplasty OT    75,000.00
    Cardiac Drug Infusion       18,500.00
    Hospital Sanitization Charge  3,500.00
    """

    breakdown = HospitalBillParser.parse_raw_text(sample_text, hospital_name="Apollo Hospitals")

    assert breakdown.total_bill_inr > 100000.0
    assert breakdown.icu_room_charges_inr == 60000.0
    assert breakdown.surgical_procedure_inr == 75000.0
    assert breakdown.pmjay_covered_inr > 0.0
