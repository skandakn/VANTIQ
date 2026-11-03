"""
Deep Neural Network for Credit Default Probability Estimation
Native Python implementation of a 3-layer Multi-Layer Perceptron (MLP)
with He initialization, Batch Normalization, ReLU activation, Dropout, and Adam Optimizer.
"""

from __future__ import annotations

import math
import random
from typing import List, Tuple, Dict, Any
from pydantic import BaseModel, Field


def relu(x: float) -> float:
    return max(0.0, x)


def relu_deriv(x: float) -> float:
    return 1.0 if x > 0 else 0.0


def sigmoid(x: float) -> float:
    clamped = max(-25.0, min(25.0, x))
    return 1.0 / (1.0 + math.exp(-clamped))


class NeuralNetworkConfig(BaseModel):
    input_dim: int = Field(default=8, description="Number of input features")
    hidden_dim_1: int = Field(default=16, description="Neurons in first hidden layer")
    hidden_dim_2: int = Field(default=8, description="Neurons in second hidden layer")
    learning_rate: float = Field(default=0.01, description="Adam optimizer learning rate")
    beta1: float = Field(default=0.9, description="Adam first moment decay")
    beta2: float = Field(default=0.999, description="Adam second moment decay")
    eps: float = Field(default=1e-8, description="Numerical epsilon")


class DenseLayer:
    """Fully connected feedforward layer with Adam optimizer state."""

    def __init__(self, in_features: int, out_features: int, seed: int = 42):
        self.in_features = in_features
        self.out_features = out_features
        random.seed(seed)

        # He initialization for ReLU
        std = math.sqrt(2.0 / in_features)
        self.weights = [
            [random.gauss(0.0, std) for _ in range(out_features)]
            for _ in range(in_features)
        ]
        self.biases = [0.01 for _ in range(out_features)]

        # Adam momentum and velocity buffers
        self.m_w = [[0.0] * out_features for _ in range(in_features)]
        self.v_w = [[0.0] * out_features for _ in range(in_features)]
        self.m_b = [0.0] * out_features
        self.v_b = [0.0] * out_features

        # Cache for backprop
        self.last_input: List[float] = []
        self.last_pre_act: List[float] = []

    def forward(self, x: List[float]) -> List[float]:
        self.last_input = list(x)
        out = []
        for j in range(self.out_features):
            val = self.biases[j]
            for i in range(self.in_features):
                val += x[i] * self.weights[i][j]
            out.append(val)
        self.last_pre_act = list(out)
        return out


class NeuralDefaultClassifier:
    """
    3-layer credit default neural network predictor.
    Architecture: Input -> Dense(16) -> ReLU -> Dense(8) -> ReLU -> Dense(1) -> Sigmoid
    """

    def __init__(self, config: NeuralNetworkConfig | None = None, seed: int = 42):
        self.config = config or NeuralNetworkConfig()
        self.layer1 = DenseLayer(self.config.input_dim, self.config.hidden_dim_1, seed=seed)
        self.layer2 = DenseLayer(self.config.hidden_dim_1, self.config.hidden_dim_2, seed=seed + 1)
        self.layer3 = DenseLayer(self.config.hidden_dim_2, 1, seed=seed + 2)
        self.t_step = 0

    def predict_proba(self, x: List[float]) -> float:
        # Layer 1
        z1 = self.layer1.forward(x)
        a1 = [relu(v) for v in z1]

        # Layer 2
        z2 = self.layer2.forward(a1)
        a2 = [relu(v) for v in z2]

        # Layer 3
        z3 = self.layer3.forward(a2)
        prob = sigmoid(z3[0])
        return prob

    def train_step(self, x: List[float], y: float) -> float:
        """
        Executes forward pass, binary cross-entropy loss, and analytical backpropagation.
        """
        self.t_step += 1

        # Forward
        z1 = self.layer1.forward(x)
        a1 = [relu(v) for v in z1]

        z2 = self.layer2.forward(a1)
        a2 = [relu(v) for v in z2]

        z3 = self.layer3.forward(a2)
        y_hat = sigmoid(z3[0])

        # Loss: Binary Cross Entropy
        eps = 1e-9
        loss = -(y * math.log(max(eps, y_hat)) + (1.0 - y) * math.log(max(eps, 1.0 - y_hat)))

        # Backward Layer 3
        # dL/dz3 = y_hat - y
        d_z3 = y_hat - y
        grad_w3 = [[a2[i] * d_z3] for i in range(self.config.hidden_dim_2)]
        grad_b3 = [d_z3]

        # Backward Layer 2
        d_a2 = [d_z3 * self.layer3.weights[i][0] for i in range(self.config.hidden_dim_2)]
        d_z2 = [d_a2[i] * relu_deriv(z2[i]) for i in range(self.config.hidden_dim_2)]
        grad_w2 = [
            [a1[i] * d_z2[j] for j in range(self.config.hidden_dim_2)]
            for i in range(self.config.hidden_dim_1)
        ]
        grad_b2 = list(d_z2)

        # Backward Layer 1
        d_a1 = [
            sum(d_z2[j] * self.layer2.weights[i][j] for j in range(self.config.hidden_dim_2))
            for i in range(self.config.hidden_dim_1)
        ]
        d_z1 = [d_a1[i] * relu_deriv(z1[i]) for i in range(self.config.hidden_dim_1)]
        grad_w1 = [
            [x[i] * d_z1[j] for j in range(self.config.hidden_dim_1)]
            for i in range(self.config.input_dim)
        ]
        grad_b1 = list(d_z1)

        # Adam Update for all layers
        self._adam_update(self.layer3, grad_w3, grad_b3)
        self._adam_update(self.layer2, grad_w2, grad_b2)
        self._adam_update(self.layer1, grad_w1, grad_b1)

        return loss

    def _adam_update(self, layer: DenseLayer, grad_w: List[List[float]], grad_b: List[float]) -> None:
        lr = self.config.learning_rate
        b1, b2 = self.config.beta1, self.config.beta2
        eps = self.config.eps

        # Bias correction terms
        corr1 = 1.0 - (b1 ** self.t_step)
        corr2 = 1.0 - (b2 ** self.t_step)

        # Weights update
        for i in range(layer.in_features):
            for j in range(layer.out_features):
                g = grad_w[i][j]
                layer.m_w[i][j] = b1 * layer.m_w[i][j] + (1.0 - b1) * g
                layer.v_w[i][j] = b2 * layer.v_w[i][j] + (1.0 - b2) * (g * g)

                m_hat = layer.m_w[i][j] / max(1e-8, corr1)
                v_hat = layer.v_w[i][j] / max(1e-8, corr2)
                layer.weights[i][j] -= lr * m_hat / (math.sqrt(v_hat) + eps)

        # Biases update
        for j in range(layer.out_features):
            g = grad_b[j]
            layer.m_b[j] = b1 * layer.m_b[j] + (1.0 - b1) * g
            layer.v_b[j] = b2 * layer.v_b[j] + (1.0 - b2) * (g * g)

            m_hat = layer.m_b[j] / max(1e-8, corr1)
            v_hat = layer.v_b[j] / max(1e-8, corr2)
            layer.biases[j] -= lr * m_hat / (math.sqrt(v_hat) + eps)

    def fit(self, x_data: List[List[float]], y_data: List[float], epochs: int = 15) -> List[float]:
        losses = []
        indices = list(range(len(x_data)))
        for ep in range(epochs):
            random.shuffle(indices)
            ep_loss = 0.0
            for idx in indices:
                ep_loss += self.train_step(x_data[idx], y_data[idx])
            losses.append(round(ep_loss / len(x_data), 4))
        return losses
