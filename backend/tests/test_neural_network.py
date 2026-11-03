import pytest
from backend.ml.neural_default_network import NeuralDefaultClassifier, NeuralNetworkConfig
from backend.ml.feature_store import FeatureStore, RawBorrowerRecord


def test_neural_network_forward_and_train():
    clf = NeuralDefaultClassifier(NeuralNetworkConfig(input_dim=8, hidden_dim_1=8, hidden_dim_2=4))
    x_sample = [0.45, 0.20, 1.5, 0.3, 0.4, 0.1, 1.2, 0.25]

    prob_before = clf.predict_proba(x_sample)
    assert 0.0 <= prob_before <= 1.0

    # Train step
    loss = clf.train_step(x_sample, 1.0)
    assert loss > 0.0
