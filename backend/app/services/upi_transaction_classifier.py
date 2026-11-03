"""
Indian Banking UPI Transaction Categorizer & Predatory Loan Detector
Parses transaction narrations, UPI VPA handles, and IMPS/NEFT descriptors
to identify hidden payday loans, BNPL recurring debits, and EMI auto-debit collisions.
"""

from __future__ import annotations

import re
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class TransactionNarration(BaseModel):
    tx_id: str
    date: str
    amount: float
    is_debit: bool
    description: str


class ClassifiedCategory(BaseModel):
    category: str
    is_loan_repayment: bool
    is_predatory_lender: bool
    lender_name: Optional[str]
    confidence: float
    risk_level: str  # SAFE, ELEVATED, CRITICAL


class ClassifiedTransaction(BaseModel):
    tx_id: str
    date: str
    amount: float
    is_debit: bool
    description: str
    classification: ClassifiedCategory


# Known Indian High-Cost Micro-Lenders / BNPL handles
PREDATORY_LENDER_PATTERNS = [
    (r"(kreditbee|kredit\s*bee|krazybee)", "KreditBee", 0.98),
    (r"(mpokket|m-pokket)", "mPokket", 0.98),
    (r"(ring|ideafirst|kissht)", "Kissht / Ring", 0.95),
    (r"(lazypay|payu\s*finance)", "LazyPay BNPL", 0.92),
    (r"(simpl|getsimpl)", "Simpl BNPL", 0.94),
    (r"(cashe|bhanix)", "CASHe", 0.95),
    (r"(rupeeredee|fincap)", "RupeeRedee", 0.97),
    (r"(moneyview|whizdm)", "MoneyView", 0.90),
    (r"(stashfin|akara)", "Stashfin", 0.92),
    (r"(zestmoney|camplus)", "ZestMoney", 0.88),
    (r"(smartcoin|smart\s*coin)", "SmartCoin", 0.93),
    (r"(salarydost|dost)", "SalaryDost", 0.96),
    (r"(earlysalary|fibe)", "Fibe (EarlySalary)", 0.91),
]

UTILITY_PATTERNS = [
    (r"(bescom|tneb|cesc|electricity|power|billdesk)", "Electricity/Utility"),
    (r"(airtel|jio|vodafone|vi\s*bill|broadband)", "Telecom/Internet"),
    (r"(swiggy|zomato|zepto|blinkit|instamart)", "Food/Quick-Commerce"),
    (r"(uber|ola|rapido|metro|irctc)", "Commute/Travel"),
    (r"(apollo|pharmeasy|netmeds|1mg|hospital|clinic|medplus)", "Healthcare/Pharmacy"),
    (r"(school|college|fees|udemy|coursera)", "Education"),
]


class UPITransactionClassifier:
    """
    NLP pattern and merchant classification engine tailored for Indian retail statements.
    """

    @classmethod
    def classify_single(cls, tx: TransactionNarration) -> ClassifiedCategory:
        text = tx.description.lower()

        # Check for predatory lenders
        for pattern, name, conf in PREDATORY_LENDER_PATTERNS:
            if re.search(pattern, text):
                return ClassifiedCategory(
                    category="High-APR Instant Loan / BNPL",
                    is_loan_repayment=tx.is_debit,
                    is_predatory_lender=True,
                    lender_name=name,
                    confidence=conf,
                    risk_level="CRITICAL" if tx.amount > 3000 else "ELEVATED",
                )

        # Check for standard bank EMI / NACH debit
        if re.search(r"(nach|ach|loan\s*emi|ecs\s*debit|hdfc\s*bank\s*loan|sbi\s*loan|bajaj\s*finserv)", text):
            return ClassifiedCategory(
                category="Standard Bank / NBFC EMI",
                is_loan_repayment=True,
                is_predatory_lender=False,
                lender_name="Registered Bank/NBFC",
                confidence=0.89,
                risk_level="SAFE",
            )

        # Check for salary credit
        if not tx.is_debit and re.search(r"(sal|salary|payroll|neft\s*cr|wages|corporate)", text):
            return ClassifiedCategory(
                category="Primary Salary Credit",
                is_loan_repayment=False,
                is_predatory_lender=False,
                lender_name=None,
                confidence=0.96,
                risk_level="SAFE",
            )

        # Check utilities
        for pattern, cat in UTILITY_PATTERNS:
            if re.search(pattern, text):
                return ClassifiedCategory(
                    category=cat,
                    is_loan_repayment=False,
                    is_predatory_lender=False,
                    lender_name=None,
                    confidence=0.85,
                    risk_level="SAFE",
                )

        # Fallback category
        return ClassifiedCategory(
            category="General Expense" if tx.is_debit else "Other Inflow",
            is_loan_repayment=False,
            is_predatory_lender=False,
            lender_name=None,
            confidence=0.60,
            risk_level="SAFE",
        )

    @classmethod
    def analyze_batch(cls, transactions: List[TransactionNarration]) -> Dict[str, Any]:
        classified: List[ClassifiedTransaction] = []
        predatory_loan_count = 0
        total_predatory_drain = 0.0
        total_safe_drain = 0.0
        total_income = 0.0

        for tx in transactions:
            cat = cls.classify_single(tx)
            classified.append(
                ClassifiedTransaction(
                    tx_id=tx.tx_id,
                    date=tx.date,
                    amount=tx.amount,
                    is_debit=tx.is_debit,
                    description=tx.description,
                    classification=cat,
                )
            )

            if cat.is_predatory_lender:
                predatory_loan_count += 1
                total_predatory_drain += tx.amount
            elif cat.is_loan_repayment:
                total_safe_drain += tx.amount
            elif not tx.is_debit and cat.category == "Primary Salary Credit":
                total_income += tx.amount

        # Predatory debt service ratio (PDSR)
        pdsr = (total_predatory_drain / total_income * 100.0) if total_income > 0 else 0.0

        return {
            "total_transactions": len(transactions),
            "predatory_lender_count": predatory_loan_count,
            "predatory_monthly_drain_inr": round(total_predatory_drain, 2),
            "safe_loan_drain_inr": round(total_safe_drain, 2),
            "estimated_monthly_income_inr": round(total_income, 2),
            "predatory_debt_service_ratio_pct": round(pdsr, 1),
            "high_risk_flag": pdsr > 20.0 or predatory_loan_count >= 2,
            "transactions": classified,
        }
