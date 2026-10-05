"""Tests for configuration schemas."""

import pytest

from pipeline.schemas import Config, DataConfig, ModelConfig, RunConfig, SplitConfig
from pipeline.schemas.config import DatasetType, ModelType


def test_default_config():
    """Test that default configuration can be created."""
    config = Config()
    assert config.schema_version == "0.1.0"
    assert config.data.dataset == DatasetType.ARC
    assert config.split.n_folds == 4
    assert config.model.model_type == ModelType.LOGISTIC_REGRESSION
    assert config.run.device == "auto"


def test_data_config_validation():
    """Test that data config validates paths."""
    with pytest.raises(ValueError, match="data_path cannot be empty"):
        DataConfig(data_path="")


def test_split_config_validation():
    """Test that split config validates ranges."""
    with pytest.raises(ValueError, match="Input should be greater than or equal to 2"):
        SplitConfig(n_folds=1)

    with pytest.raises(ValueError, match="Input should be less than or equal to 10"):
        SplitConfig(n_folds=11)


def test_model_config_validation():
    """Test that model config validates learning rate."""
    with pytest.raises(ValueError, match="Input should be greater than 0"):
        ModelConfig(learning_rate=-0.001)


def test_run_config_device_validation():
    """Test that run config validates device."""
    with pytest.raises(ValueError, match="device must be one of"):
        RunConfig(device="invalid")


def test_config_from_dict():
    """Test that config can be created from dict."""
    config_dict = {
        "data": {"dataset": "arc", "data_path": "data/"},
        "split": {"n_folds": 5, "seed": 123},
        "model": {"model_type": "resnet18"},
        "run": {"device": "cpu"},
    }
    config = Config(**config_dict)
    assert config.split.n_folds == 5
    assert config.split.seed == 123
    assert config.model.model_type == ModelType.RESNET18
    assert config.run.device == "cpu"
