# VANTIQ Python Algorithmic Backend

High-performance Python backend service powering VANTIQ's algorithmic models:
- **QUBO Quantum Knapsack Optimizer**: Multi-source relief package synthesis using Ising Hamiltonian simulated annealing.
- **90-Day Cashflow Digital Twin**: Daily stochastic liquidity simulation with collision detection (Day 32).
- **TreeSHAP Explainable AI**: Feature attribution decomposing default risk into human-interpretable factors.
- **Fund Finder Relief Ranker**: Medical loan & relief optimizer backed by Reddit sentiment NLP scoring.
- **Bank Statement Parser**: Open-source CSV transaction classifier extracting absorptive capacity.

---

## Architecture & Directory Structure

```
backend/
├── app/
│   ├── main.py                  # FastAPI entry point & CORS
│   ├── core/                    # Settings, logging, custom exceptions
│   ├── schemas/                 # Pydantic v2 validation contracts
│   ├── services/                # Quantum solver, cashflow twin, TreeSHAP
│   └── api/                     # REST API routers (/api/v1/...)
├── tests/                       # Pytest test suite
├── Dockerfile                   # Production container definition
└── requirements.txt             # Dependency definitions
```

---

## Quickstart

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Development Server
```bash
uvicorn app.main:app --reload --port 8000
```

### 3. Interactive API Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## Running Test Suite
```bash
pytest tests/ -v
```
