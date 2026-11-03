"""
Unit tests for Bank Statement Parser
"""

import pytest
from app.services.bank_parser import bank_parser

SAMPLE_CSV = """Date,Narration,Type,Amount,Balance
01-Oct-2026,CREDIT SALARY FROM ACME CORP PVT LTD,Credit,68500,74200
05-Oct-2026,NACH DEBIT AUTO-LOAN EMI HDFC BANK,Debit,11200,63000
06-Oct-2026,UPI DEBIT TO LANDLORD HOUSE RENT,Debit,16500,46500
10-Oct-2026,SWIGGY AND ZEPT0 GROCERY PROVISIONS,Debit,4200,42300
15-Oct-2026,DMART RETAIL MONTHLY ESSENTIALS,Debit,6800,35500
31-Oct-2026,SAVINGS ACCOUNT MONTH-END BALANCE,Balance,31000,31000"""


def test_bank_statement_parsing():
    res = bank_parser.parse_csv(SAMPLE_CSV)

    assert res.detected_monthly_salary == 68500.0, "Should accurately detect salary credit"
    assert res.detected_active_emis == 11200.0, "Should isolate active loan EMI"
    assert res.detected_rent_expense == 16500.0, "Should isolate rent payments"
    assert res.absorptive_surplus > 0.0, "Should compute real absorptive surplus"
    assert res.total_transactions_parsed == 6
