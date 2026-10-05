"""Configuration schemas for the MRI pipeline."""

from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import Optional, Literal
from enum import Enum


class DatasetType(str, Enum):
    """Supported dataset types."""
    ARC = "arc"
    ATLAS = "atlas"
    PLORAS = "ploras"


class ImageType(str, Enum):
    """Image representation types."""
    STITCHED = "stitched"
    ROI = "roi"
    HYBRID = "hybrid"


class ModelType(str, Enum):
    """Model types."""
    LOGISTIC_REGRESSION = "logistic_regression"
    GRADIENT_BOOSTING = "gradient_boosting"
    RESNET18 = "resnet18"


class DataConfig(BaseModel):
    """Data configuration."""
    dataset: DatasetType = Field(default=DatasetType.ARC, description="Dataset to use")
    data_path: str = Field(default="data/", description="Path to data directory")
    participants_tsv: Optional[str] = Field(default=None, description="Path to participants.tsv")
    lesion_mask_path: Optional[str] = Field(default=None, description="Path to lesion masks")
    t1_path: Optional[str] = Field(default=None, description="Path to T1 scans")
    
    @field_validator("data_path")
    @classmethod
    def path_must_not_be_empty(cls, v: str) -> str:
        if not v:
            raise ValueError("data_path cannot be empty")
        return v


class SplitConfig(BaseModel):
    """Train/validation/test split configuration."""
    n_folds: int = Field(default=4, ge=2, le=10, description="Number of cross-validation folds")
    lock_box_fraction: float = Field(default=0.2, ge=0.1, le=0.4, description="Fraction of data for lock-box test set")
    seed: int = Field(default=42, ge=0, description="Random seed for reproducibility")
    stratify_by: str = Field(default="wab_aq", description="Column to stratify by")


class ModelConfig(BaseModel):
    """Model configuration."""
    model_type: ModelType = Field(default=ModelType.LOGISTIC_REGRESSION, description="Type of model")
    image_type: ImageType = Field(default=ImageType.STITCHED, description="Image representation type")
    learning_rate: float = Field(default=0.001, gt=0, description="Learning rate")
    batch_size: int = Field(default=32, ge=1, description="Batch size")
    max_epochs: int = Field(default=100, ge=1, description="Maximum number of epochs")
    early_stopping_patience: int = Field(default=10, ge=1, description="Early stopping patience")
    class_weight: bool = Field(default=True, description="Use class weighting")
    calibration: bool = Field(default=True, description="Apply calibration")


class RunConfig(BaseModel):
    """Run configuration."""
    run_id: Optional[str] = Field(default=None, description="Run ID (auto-generated if not provided)")
    output_dir: str = Field(default="runs/", description="Output directory for runs")
    device: str = Field(default="auto", description="Device: auto, cuda, mps, cpu")
    log_level: str = Field(default="INFO", description="Logging level")
    cache_stages: bool = Field(default=True, description="Cache intermediate stages")
    
    @field_validator("device")
    @classmethod
    def validate_device(cls, v: str) -> str:
        valid_devices = ["auto", "cuda", "mps", "cpu"]
        if v not in valid_devices:
            raise ValueError(f"device must be one of {valid_devices}")
        return v


class Config(BaseModel):
    """Main configuration for the pipeline."""
    model_config = ConfigDict(extra="forbid")
    
    data: DataConfig = Field(default_factory=DataConfig)
    split: SplitConfig = Field(default_factory=SplitConfig)
    model: ModelConfig = Field(default_factory=ModelConfig)
    run: RunConfig = Field(default_factory=RunConfig)
    
    schema_version: str = Field(default="0.1.0", description="Configuration schema version")
