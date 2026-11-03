"""
API Router for Bank Statement Parsing
"""

from fastapi import APIRouter, UploadFile, File, Form
from app.schemas.parser import StatementParseRequest, ParsedFinancialSummary
from app.services.bank_parser import bank_parser

router = APIRouter()


@router.post("/parse-csv", response_model=ParsedFinancialSummary, summary="Parse CSV statement text")
async def parse_statement_csv(request: StatementParseRequest):
    """
    Parses transaction rows and extracts net salary, active EMIs, and living burn.
    """
    return bank_parser.parse_csv(request.csv_content)


@router.post("/upload-file", response_model=ParsedFinancialSummary, summary="Upload bank statement file")
async def upload_statement_file(file: UploadFile = File(...)):
    """
    Accepts uploaded CSV bank statement and returns parsed financial capacity.
    """
    content = await file.read()
    text = content.decode("utf-8", errors="ignore")
    return bank_parser.parse_csv(text)
