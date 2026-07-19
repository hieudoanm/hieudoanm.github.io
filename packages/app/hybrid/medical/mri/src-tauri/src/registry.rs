use crate::db;
use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use std::env;
use std::fs;

/// Runtimes a registered model can execute under. `python` covers PyTorch,
/// MONAI, and ONNX scripts; `docker` covers containerized models.
pub const RUNTIMES: &[&str] = &["python", "docker"];

const RUNTIME_BINARIES: &[(&str, &str)] = &[("python", "python3"), ("docker", "docker")];

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct ModelDefinition {
  pub name: String,
  pub version: String,
  pub task: String,
  pub runtime: String,
  pub source: String,
  #[serde(default)]
  pub license: String,
  #[serde(default)]
  pub input_json: String,
  #[serde(default)]
  pub output_json: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ModelRecord {
  pub id: String,
  pub name: String,
  pub version: String,
  pub task: String,
  pub runtime: String,
  pub source: String,
  pub license: String,
  pub input_json: String,
  pub output_json: String,
  pub created_at: i64,
}

impl From<&ModelDefinition> for ModelRecord {
  fn from(definition: &ModelDefinition) -> Self {
    Self {
      id: format!("model://{}", uuid::Uuid::new_v4()),
      name: definition.name.clone(),
      version: definition.version.clone(),
      task: definition.task.clone(),
      runtime: definition.runtime.clone(),
      source: definition.source.clone(),
      license: definition.license.clone(),
      input_json: definition.input_json.clone(),
      output_json: definition.output_json.clone(),
      created_at: db::now(),
    }
  }
}

pub fn parse_definition(json: &str) -> Result<ModelDefinition, String> {
  let mut definition: ModelDefinition = serde_json::from_str(json)
    .map_err(|error| format!("invalid model definition: {error}"))?;
  if definition.input_json.trim().is_empty() {
    definition.input_json = "{}".to_string();
  }
  if definition.output_json.trim().is_empty() {
    definition.output_json = "{}".to_string();
  }
  validate(&definition)?;
  Ok(definition)
}

/// Registered models are data: identity fields are required, runtimes come
/// from a closed set, and sources must match the runtime's shape.
pub fn validate(definition: &ModelDefinition) -> Result<(), String> {
  if definition.name.trim().is_empty() {
    return Err("model name is required".to_string());
  }
  if definition.version.trim().is_empty() {
    return Err("model version is required".to_string());
  }
  if definition.task.trim().is_empty() {
    return Err("model task is required".to_string());
  }
  if !RUNTIMES.contains(&definition.runtime.as_str()) {
    return Err(format!(
      "runtime '{}' is not supported (expected one of {})",
      definition.runtime,
      RUNTIMES.join(", ")
    ));
  }
  match definition.runtime.as_str() {
    "python" => {
      if !definition.source.ends_with(".py") {
        return Err("python models need a .py script as source".to_string());
      }
    }
    _ => {
      if definition.source.trim().is_empty()
        || definition.source.contains(char::is_whitespace)
      {
        return Err(
          "docker models need an image reference without whitespace".to_string(),
        );
      }
    }
  }
  Ok(())
}

const MODEL_COLUMNS: &str =
  "id, name, version, task, runtime, source, license, input_json, output_json, created_at";

fn row_to_model(row: &rusqlite::Row<'_>) -> rusqlite::Result<ModelRecord> {
  Ok(ModelRecord {
    id: row.get(0)?,
    name: row.get(1)?,
    version: row.get(2)?,
    task: row.get(3)?,
    runtime: row.get(4)?,
    source: row.get(5)?,
    license: row.get(6)?,
    input_json: row.get(7)?,
    output_json: row.get(8)?,
    created_at: row.get(9)?,
  })
}

/// Upsert keyed on (name, version): re-registering keeps the stable id.
pub fn upsert_model(connection: &Connection, record: &ModelRecord) -> Result<(), String> {
  connection
    .execute(
      &format!(
        "INSERT INTO models ({MODEL_COLUMNS}) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)
         ON CONFLICT(name, version) DO UPDATE SET
           task = excluded.task,
           runtime = excluded.runtime,
           source = excluded.source,
           license = excluded.license,
           input_json = excluded.input_json,
           output_json = excluded.output_json"
      ),
      rusqlite::params![
        record.id,
        record.name,
        record.version,
        record.task,
        record.runtime,
        record.source,
        record.license,
        record.input_json,
        record.output_json,
        record.created_at
      ],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn list_models(connection: &Connection) -> Result<Vec<ModelRecord>, String> {
  let mut statement = connection
    .prepare(&format!(
      "SELECT {MODEL_COLUMNS} FROM models ORDER BY name, version"
    ))
    .map_err(|error| error.to_string())?;
  let rows = statement
    .query_map([], row_to_model)
    .map_err(|error| error.to_string())?;
  rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

pub fn get_model(connection: &Connection, id: &str) -> Result<ModelRecord, String> {
  connection
    .query_row(
      &format!("SELECT {MODEL_COLUMNS} FROM models WHERE id = ?1"),
      [id],
      row_to_model,
    )
    .map_err(|error| error.to_string())
}

pub fn get_model_by_name_version(
  connection: &Connection,
  name: &str,
  version: &str,
) -> Result<ModelRecord, String> {
  connection
    .query_row(
      &format!("SELECT {MODEL_COLUMNS} FROM models WHERE name = ?1 AND version = ?2"),
      [name, version],
      row_to_model,
    )
    .map_err(|error| error.to_string())
}

pub fn delete_model(connection: &Connection, id: &str) -> Result<(), String> {
  connection
    .execute("DELETE FROM models WHERE id = ?1", [id])
    .map_err(|error| error.to_string())?;
  Ok(())
}

/// Whether the runtime's binary can be found on PATH — a cheap availability
/// probe with no subprocess spawn.
pub fn runtime_available(runtime: &str) -> bool {
  let Some((_, binary)) = RUNTIME_BINARIES.iter().find(|(name, _)| *name == runtime)
  else {
    return false;
  };
  let path_var = env::var_os("PATH").unwrap_or_default();
  env::split_paths(&path_var).any(|dir| {
    let candidate = dir.join(binary);
    fs::metadata(candidate).map(|meta| meta.is_file()).unwrap_or(false)
  })
}

#[cfg(test)]
mod tests {
  use super::*;
  use crate::db;

  fn definition(name: &str, version: &str, runtime: &str, source: &str) -> ModelDefinition {
    ModelDefinition {
      name: name.to_string(),
      version: version.to_string(),
      task: "segmentation".to_string(),
      runtime: runtime.to_string(),
      source: source.to_string(),
      license: "MIT".to_string(),
      input_json: "{}".to_string(),
      output_json: "{}".to_string(),
    }
  }

  #[test]
  fn validates_definitions() {
    assert!(validate(&definition("m", "1", "python", "/models/m.py")).is_ok());
    assert!(validate(&definition("m", "1", "docker", "org/model:1.0")).is_ok());

    let unnamed = definition("", "1", "python", "/m.py");
    assert!(validate(&unnamed).is_err());
    let unversioned = definition("m", "", "python", "/m.py");
    assert!(validate(&unversioned).is_err());
    let untitled_task = definition("m", "1", "python", "/m.py");
    let mut no_task = untitled_task.clone();
    no_task.task = "  ".to_string();
    assert!(validate(&no_task).is_err());

    let bad_runtime = definition("m", "1", "cuda", "/m.py");
    assert!(validate(&bad_runtime).is_err());

    let python_needs_script = definition("m", "1", "python", "/models/m.onnx");
    assert!(validate(&python_needs_script).is_err());

    let docker_needs_image = definition("m", "1", "docker", "");
    assert!(validate(&docker_needs_image).is_err());
    let docker_no_spaces = definition("m", "1", "docker", "org/model latest");
    assert!(validate(&docker_no_spaces).is_err());
  }

  #[test]
  fn parses_and_defaults_json_fields() {
    let parsed =
      parse_definition(r#"{"name":"m","version":"1","task":"t","runtime":"python","source":"/m.py"}"#)
        .unwrap();
    assert_eq!(parsed.input_json, "{}");
    assert_eq!(parsed.output_json, "{}");
    assert!(parse_definition("not json").is_err());
    assert!(parse_definition(r#"{"name":"m","version":"1","task":"t","runtime":"java","source":"/m.jar"}"#).is_err());
  }

  #[test]
  fn upsert_keeps_a_stable_id_per_name_version() {
    let connection = db::open_in_memory().unwrap();
    let first = ModelRecord::from(&definition("seg", "1.0", "python", "/m.py"));
    upsert_model(&connection, &first).unwrap();
    let mut updated = ModelRecord::from(&definition("seg", "1.0", "docker", "org/seg:2"));
    updated.id = "model://different".to_string();
    upsert_model(&connection, &updated).unwrap();

    let stored = get_model_by_name_version(&connection, "seg", "1.0").unwrap();
    assert_eq!(stored.id, first.id);
    assert_eq!(stored.runtime, "docker");
    assert_eq!(list_models(&connection).unwrap().len(), 1);

    assert!(get_model(&connection, &first.id).is_ok());
    delete_model(&connection, &first.id).unwrap();
    assert!(get_model(&connection, &first.id).is_err());
  }

  #[test]
  fn availability_probe_rejects_unknown_runtimes() {
    assert!(!runtime_available("java"));
    assert!(!runtime_available(""));
  }
}
