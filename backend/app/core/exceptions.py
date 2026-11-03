"""
Custom Domain Exceptions for VANTIQ Algorithmic Services
"""

from fastapi import HTTPException, status


class VantiqException(HTTPException):
    """Base exception for VANTIQ service domain errors."""
    def __init__(self, detail: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        super().__init__(status_code=status_code, detail=detail)


class QuantumConvergenceError(VantiqException):
    """Raised when the simulated annealing algorithm fails to converge."""
    def __init__(self, detail: str = "Quantum annealing failed to satisfy knapsack constraints."):
        super().__init__(detail=detail, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


class SolvencyCalculationError(VantiqException):
    """Raised when borrower inputs lead to degenerate solvency evaluations."""
    def __init__(self, detail: str = "Borrower profile inputs are invalid or out of realistic bounds."):
        super().__init__(detail=detail, status_code=status.HTTP_400_BAD_REQUEST)


class StatementParsingError(VantiqException):
    """Raised when bank statement CSV or text fails semantic parsing."""
    def __init__(self, detail: str = "Failed to parse bank statement tabular format."):
        super().__init__(detail=detail, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
