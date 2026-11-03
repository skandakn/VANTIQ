"""
VANTIQ Machine Learning Model Registry & Calibration Cache
Handles in-memory model serialization, versioning, and feature normalization.
"""

from typing import Dict, Any, Optional
import numpy as np


class ModelRegistry:
    """Manages active ML models and calibration metadata."""

    def __init__(self):
        self._models: Dict[str, Any] = {}
        self._metadata: Dict[str, Dict[str, Any]] = {}

    def register_model(self, name: str, model: Any, metadata: Dict[str, Any]):
        self._models[name] = model
        self._metadata[name] = metadata

    def get_model(self, name: str) -> Optional[Any]:
        return self._models.get(name)

    def get_metadata(self, name: str) -> Optional[Dict[str, Any]]:
        return self._metadata.get(name)

    def list_models(self) -> Dict[str, Dict[str, Any]]:
        return self._metadata


registry = ModelRegistry()
