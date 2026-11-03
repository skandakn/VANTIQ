import pytest
from backend.app.services.upi_transaction_classifier import (
    UPITransactionClassifier,
    TransactionNarration,
)


def test_upi_classifier_detects_predatory_lender():
    tx = TransactionNarration(
        tx_id="TX001",
        date="2026-03-01",
        amount=4500.0,
        is_debit=True,
        description="UPI-DEBIT-KREDITBEE AUTO DEBIT NACH REF 928347",
    )
    res = UPITransactionClassifier.classify_single(tx)

    assert res.is_predatory_lender is True
    assert res.lender_name == "KreditBee"
    assert res.risk_level == "CRITICAL"


def test_upi_classifier_detects_salary():
    tx = TransactionNarration(
        tx_id="TX002",
        date="2026-03-01",
        amount=65000.0,
        is_debit=False,
        description="NEFT CR-INFOSYS SALARY MARCH 2026",
    )
    res = UPITransactionClassifier.classify_single(tx)

    assert res.category == "Primary Salary Credit"
    assert res.is_predatory_lender is False
