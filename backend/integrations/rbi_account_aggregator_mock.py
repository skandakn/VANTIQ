"""
In-Memory Mock Server for RBI Account Aggregator (AA) Ecosystem
Provides local testing endpoints mimicking FIP responses for major Indian banks:
HDFC, SBI, ICICI, Axis, and Kotak Mahindra.
"""

from __future__ import annotations

import random
from typing import Dict, Any, List
from pydantic import BaseModel


class BankPersona(BaseModel):
    fip_id: str
    bank_name: str
    branch: str
    account_number_masked: str
    current_balance_inr: float
    monthly_inflow_avg: float
    monthly_outflow_avg: float
    bureau_active_loans: int


INDIAN_BANK_PERSONAS: List[BankPersona] = [
    BankPersona(
        fip_id="FIP-HDFC-01",
        bank_name="HDFC Bank",
        branch="Indiranagar, Bangalore",
        account_number_masked="XXXX-XXXX-9021",
        current_balance_inr=38450.0,
        monthly_inflow_avg=62000.0,
        monthly_outflow_avg=51000.0,
        bureau_active_loans=1,
    ),
    BankPersona(
        fip_id="FIP-SBI-02",
        bank_name="State Bank of India",
        branch="MG Road, Kochi",
        account_number_masked="XXXX-XXXX-4118",
        current_balance_inr=19200.0,
        monthly_inflow_avg=45000.0,
        monthly_outflow_avg=42500.0,
        bureau_active_loans=3,
    ),
    BankPersona(
        fip_id="FIP-ICICI-03",
        bank_name="ICICI Bank",
        branch="Cyber City, Gurugram",
        account_number_masked="XXXX-XXXX-6782",
        current_balance_inr=74100.0,
        monthly_inflow_avg=95000.0,
        monthly_outflow_avg=68000.0,
        bureau_active_loans=2,
    ),
    BankPersona(
        fip_id="FIP-AXIS-04",
        bank_name="Axis Bank",
        branch="Bandra West, Mumbai",
        account_number_masked="XXXX-XXXX-1129",
        current_balance_inr=14300.0,
        monthly_inflow_avg=38000.0,
        monthly_outflow_avg=36500.0,
        bureau_active_loans=4,
    ),
]


class MockAAService:
    @classmethod
    def get_all_personas(cls) -> List[BankPersona]:
        return INDIAN_BANK_PERSONAS

    @classmethod
    def get_persona_by_bank(cls, bank_name: str) -> BankPersona:
        for p in INDIAN_BANK_PERSONAS:
            if bank_name.lower() in p.bank_name.lower():
                return p
        return INDIAN_BANK_PERSONAS[0]

    @classmethod
    def generate_statement_payload(cls, persona: BankPersona, days: int = 90) -> Dict[str, Any]:
        txs = []
        balance = persona.current_balance_inr

        for d in range(days, 0, -1):
            date_str = f"2026-{(d // 30) + 1:02d}-{(d % 28) + 1:02d}"

            # Salary arrival
            if d % 30 == 0:
                salary = persona.monthly_inflow_avg * random.uniform(0.95, 1.05)
                balance += salary
                txs.append({
                    "date": date_str,
                    "narration": f"SALARY CREDIT - {persona.bank_name.upper()}",
                    "type": "CREDIT",
                    "amount": round(salary, 2),
                    "balance": round(balance, 2),
                })

            # Random daily expense
            if random.random() < 0.65:
                expense = random.uniform(250.0, 3200.0)
                balance -= expense
                txs.append({
                    "date": date_str,
                    "narration": "UPI MERCHANT PAYMENT - RETAIL/FOOD",
                    "type": "DEBIT",
                    "amount": round(expense, 2),
                    "balance": round(balance, 2),
                })

        return {
            "fip_id": persona.fip_id,
            "bank_name": persona.bank_name,
            "account_masked": persona.account_number_masked,
            "statement_days": days,
            "total_transactions": len(txs),
            "final_balance": round(balance, 2),
            "transactions": txs,
        }
