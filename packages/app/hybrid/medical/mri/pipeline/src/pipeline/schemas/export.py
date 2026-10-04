"""Export Pydantic schemas as JSON Schema."""

import json
from pathlib import Path
from typing import Any

from pydantic import BaseModel

from pipeline.schemas.config import Config, DataConfig, ModelConfig, RunConfig, SplitConfig


def export_schema(
    model_class: type[BaseModel],
    output_path: str | Path,
) -> None:
    """Export a Pydantic model as JSON Schema.

    Args:
        model_class: Pydantic model class
        output_path: Path to save the JSON Schema
    """
    schema = model_class.model_json_schema()

    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    with path.open("w") as f:
        json.dump(schema, f, indent=2)


def export_all_schemas(output_dir: str | Path) -> None:
    """Export all configuration schemas as JSON Schema.

    Args:
        output_dir: Directory to save schemas
    """
    schemas_dir = Path(output_dir)
    schemas_dir.mkdir(parents=True, exist_ok=True)

    export_schema(Config, schemas_dir / "config_schema.json")
    export_schema(DataConfig, schemas_dir / "data_config_schema.json")
    export_schema(ModelConfig, schemas_dir / "model_config_schema.json")
    export_schema(SplitConfig, schemas_dir / "split_config_schema.json")
    export_schema(RunConfig, schemas_dir / "run_config_schema.json")


def get_schema(model_class: type) -> dict[str, Any]:
    """Get JSON Schema for a Pydantic model.
    
    Args:
        model_class: Pydantic model class
    
    Returns:
        JSON Schema dictionary
    """
    return model_class.model_json_schema()
