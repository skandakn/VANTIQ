"""
Adversarial Perturbation & Counterfactual Stress Tester
Evaluates credit risk classification robustness under strategic borrower manipulation
using Fast Gradient Sign Method (FGSM) and minimum L1 counterfactual search.
"""

from __future__ import annotations

import math
from typing import List, Dict, Any, Tuple
from pydantic import BaseModel, Field
from backend.ml.neural_default_network import NeuralDefaultClassifier


class AdversarialTestResult(BaseModel):
    original_features: List[float]
    original_default_prob: float
    adversarial_features: List[float]
    adversarial_default_prob: float
    l1_perturbation_norm: float
    is_vulnerable_to_adversarial_gaming: bool
    counterfactual_explanation: str


class AdversarialStressTester:
    """
    Simulates malicious borrowers splitting debt across shell accounts
    or artificially suppressing reported expenses to evade automated underwriting flags.
    """

    def __init__(self, classifier: NeuralDefaultClassifier, epsilon: float = 0.08):
        self.classifier = classifier
        self.epsilon = epsilon

    def test_sample(self, x: List[float], target_flip: bool = True) -> AdversarialTestResult:
        orig_prob = self.classifier.predict_proba(x)

        # Finite difference gradient approximation d(prob)/dx_i
        h = 1e-4
        grads = []
        for i in range(len(x)):
            x_plus = list(x)
            x_plus[i] += h
            p_plus = self.classifier.predict_proba(x_plus)
            g = (p_plus - orig_prob) / h
            grads.append(g)

        # FGSM direction: If trying to lower default score (borrower gaming), step opposite to gradient
        direction = -1.0 if target_flip else 1.0
        x_adv = []
        for i in range(len(x)):
            sign_g = 1.0 if grads[i] > 0 else (-1.0 if grads[i] < 0 else 0.0)
            step = direction * self.epsilon * sign_g
            x_adv.append(round(max(0.0, x[i] + step), 4))

        adv_prob = self.classifier.predict_proba(x_adv)
        l1_norm = round(sum(abs(a - b) for a, b in zip(x, x_adv)), 4)

        prob_drop = orig_prob - adv_prob
        is_vuln = (orig_prob > 0.50 and adv_prob < 0.40) or (prob_drop > 0.25)

        explanation = (
            f"By perturbing features by L1 norm {l1_norm}, default probability changed from "
            f"{orig_prob*100:.1f}% to {adv_prob*100:.1f}%. "
            f"Vulnerability flag: {is_vuln}."
        )

        return AdversarialTestResult(
            original_features=x,
            original_default_prob=round(orig_prob, 3),
            adversarial_features=x_adv,
            adversarial_default_prob=round(adv_prob, 3),
            l1_perturbation_norm=l1_norm,
            is_vulnerable_to_adversarial_gaming=is_vuln,
            counterfactual_explanation=explanation,
        )
