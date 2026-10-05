"""Export Pydantic schemas as JSON Schema."""

import json
from pathlib import Path
from typing import Dict, Any
from pipeline.schemas.config import Config, DataConfig, ModelConfig, SplitConfig, RunConfig


def export_schema(
    model_class: type,
    output_path: str,
) -> None:
    """Export a Pydantic model as JSON Schema.
    
    Args:
        model_class: Pydantic model class
        output_path: Path to save the JSON Schema
    """
    schema = model_class.model_json_schema()
    
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, "w") as f:
        json.dump(schema, f, indent=2)


def export_all_schemas(output_dir: str) -> None:
    """Export all configuration schemas as JSON Schema.
    
    Args:
        output_dir: Directory to save schemas
    """
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    export_schema(Config, output_dir / "config_schema.json")
    export_schema(DataConfig, output_dir / "data_config_schema.json")
    export_schema(ModelConfig, output_dir / "model_config_schema.json")
    export_schema(SplitConfig, output_dir / "split_config_schema.json")
    export_schema(RunConfig, output_dir / "run_config_schema.json")


def get_schema(model_class: type) -> Dict[str, Any]:
    """Get JSON Schema for a Pydantic model.
    
    Args:
        model_class: Pydantic model class
    
    Returns:
        JSON Schema dictionary
    """
    return model_class.model_json_schema()
