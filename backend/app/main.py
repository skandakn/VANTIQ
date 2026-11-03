"""
VANTIQ Master FastAPI Application Entrypoint
Production-grade algorithmic service powering Quantum Knapsack QUBO annealing,
90-Day Cashflow Digital Twin simulation, and TreeSHAP explainable intelligence.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.api.api_router import api_router
from app.core.logging import logger

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=settings.DESCRIPTION,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# Cross-Origin Resource Sharing (CORS) Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/", tags=["Health Check"])
async def root_health_check():
    """Root health check returning service operational telemetry."""
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "api_v1": settings.API_V1_STR,
        "docs": "/docs",
        "quantum_engine": "online",
        "cashflow_twin": "online",
        "shap_explainer": "online",
    }


@app.get("/healthz", tags=["Health Check"])
async def healthz():
    """Kubernetes / cloud container liveness probe."""
    return JSONResponse(status_code=200, content={"status": "UP"})


if __name__ == "__main__":
    import uvicorn
    logger.info("Starting VANTIQ Backend on http://0.0.0.0:8000 ...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
