use crate::process::{self, CommandSpec, ProcessResult, RunOptions};
use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use std::sync::atomic::AtomicBool;
use std::time::Duration;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct PipelineStep {
  pub id: String,
  pub tool: String,
  pub args: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct PipelineDefinition {
  pub name: String,
  pub steps: Vec<PipelineStep>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PipelineRow {
  pub id: String,
  pub name: String,
  pub version: i64,
  pub definition_json: String,
  pub created_at: i64,
}

pub fn parse_definition(json: &str) -> Result<PipelineDefinition, String> {
  let definition: PipelineDefinition = serde_json::from_str(json)
    .map_err(|error| format!("invalid pipeline definition: {error}"))?;
  validate(&definition)?;
  Ok(definition)
}

/// Pipelines are stored data: names are required, steps need unique ids, and
/// every tool must pass the process-manager allowlist.
pub fn validate(definition: &PipelineDefinition) -> Result<(), String> {
  if definition.name.trim().is_empty() {
    return Err("pipeline name is required".to_string());
  }
  if definition.steps.is_empty() {
    return Err("pipeline needs at least one step".to_string());
  }
  let mut seen = HashSet::new();
  for step in &definition.steps {
    if step.id.trim().is_empty() {
      return Err("every step needs an id".to_string());
    }
    if !seen.insert(step.id.clone()) {
      return Err(format!("duplicate step id '{}'", step.id));
    }
    if !process::is_allowed(&step.tool) {
      return Err(format!("tool '{}' is not in the allowlist", step.tool));
    }
  }
  Ok(())
}

pub fn insert_pipeline(connection: &Connection, row: &PipelineRow) -> Result<(), String> {
  connection
    .execute(
      "INSERT INTO pipelines (id, name, version, definition_json, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5)",
      rusqlite::params![row.id, row.name, row.version, row.definition_json, row.created_at],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn next_version(connection: &Connection, name: &str) -> Result<i64, String> {
  connection
    .query_row(
      "SELECT COALESCE(MAX(version), 0) FROM pipelines WHERE name = ?1",
      [name],
      |row| row.get(0),
    )
    .map_err(|error| error.to_string())
}

const PIPELINE_COLUMNS: &str = "id, name, version, definition_json, created_at";

fn row_to_pipeline(row: &rusqlite::Row<'_>) -> rusqlite::Result<PipelineRow> {
  Ok(PipelineRow {
    id: row.get(0)?,
    name: row.get(1)?,
    version: row.get(2)?,
    definition_json: row.get(3)?,
    created_at: row.get(4)?,
  })
}

/// Latest version of every stored pipeline.
pub fn list_pipelines(connection: &Connection) -> Result<Vec<PipelineRow>, String> {
  let mut statement = connection
    .prepare(&format!(
      "SELECT p.id, p.name, p.version, p.definition_json, p.created_at FROM pipelines p
       INNER JOIN (SELECT name, MAX(version) AS version FROM pipelines GROUP BY name) latest
       ON p.name = latest.name AND p.version = latest.version
       ORDER BY p.created_at DESC"
    ))
    .map_err(|error| error.to_string())?;
  let rows = statement
    .query_map([], row_to_pipeline)
    .map_err(|error| error.to_string())?;
  rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

pub fn get_pipeline(connection: &Connection, id: &str) -> Result<PipelineRow, String> {
  connection
    .query_row(
      &format!("SELECT {PIPELINE_COLUMNS} FROM pipelines WHERE id = ?1"),
      [id],
      row_to_pipeline,
    )
    .map_err(|error| error.to_string())
}

pub fn delete_pipeline(connection: &Connection, id: &str) -> Result<(), String> {
  connection
    .execute("DELETE FROM pipelines WHERE id = ?1", [id])
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn command_spec(step: &PipelineStep) -> CommandSpec {
  CommandSpec::new(&step.tool, &step.args)
}

/// Runs one step through the process manager with a hard timeout and the
/// job's cancellation flag.
pub fn run_step(
  step: &PipelineStep,
  timeout: Duration,
  cancel: &AtomicBool,
) -> ProcessResult {
  let spec = command_spec(step);
  if let Err(message) = process::validate_spec(&spec) {
    return ProcessResult {
      exit_code: None,
      stdout: String::new(),
      stderr: message,
      timed_out: false,
      cancelled: false,
    };
  }
  process::run(&spec, &RunOptions { timeout, cancel })
}

#[cfg(test)]
mod tests {
  use super::*;
  use crate::db;

  fn step(id: &str, tool: &str) -> PipelineStep {
    PipelineStep {
      id: id.to_string(),
      tool: tool.to_string(),
      args: vec!["-z".to_string(), "y".to_string()],
    }
  }

  #[test]
  fn validates_definitions() {
    let ok = PipelineDefinition {
      name: "Convert".to_string(),
      steps: vec![step("convert", "dcm2niix")],
    };
    assert!(validate(&ok).is_ok());

    let unnamed = PipelineDefinition {
      name: "  ".to_string(),
      steps: vec![step("a", "dcm2niix")],
    };
    assert!(validate(&unnamed).is_err());

    let empty = PipelineDefinition {
      name: "P".to_string(),
      steps: vec![],
    };
    assert!(validate(&empty).is_err());

    let duplicate = PipelineDefinition {
      name: "P".to_string(),
      steps: vec![step("same", "dcm2niix"), step("same", "bet")],
    };
    assert!(validate(&duplicate).is_err());

    let blocked_tool = PipelineDefinition {
      name: "P".to_string(),
      steps: vec![step("a", "rm")],
    };
    assert!(validate(&blocked_tool).is_err());
  }

  #[test]
  fn rejects_malformed_json() {
    assert!(parse_definition("not json").is_err());
    assert!(parse_definition("{\"name\":\"p\"}").is_err());
  }

  #[test]
  fn versions_are_bumped_per_name() {
    let connection = db::open_in_memory().unwrap();
    assert_eq!(next_version(&connection, "A").unwrap(), 0);
    insert_pipeline(
      &connection,
      &PipelineRow {
        id: "pipeline://a1".to_string(),
        name: "A".to_string(),
        version: 1,
        definition_json: "{}".to_string(),
        created_at: 1,
      },
    )
    .unwrap();
    assert_eq!(next_version(&connection, "A").unwrap(), 1);
    assert_eq!(next_version(&connection, "B").unwrap(), 0);
  }

  #[test]
  fn lists_only_the_latest_version_of_each_name() {
    let connection = db::open_in_memory().unwrap();
    for (version, created_at) in [(1, 10), (2, 20)] {
      insert_pipeline(
        &connection,
        &PipelineRow {
          id: format!("pipeline://a{version}"),
          name: "A".to_string(),
          version,
          definition_json: format!("{{\"v\":{version}}}"),
          created_at,
        },
      )
      .unwrap();
    }
    insert_pipeline(
      &connection,
      &PipelineRow {
        id: "pipeline://b1".to_string(),
        name: "B".to_string(),
        version: 1,
        definition_json: "{}".to_string(),
        created_at: 30,
      },
    )
    .unwrap();
    let listed = list_pipelines(&connection).unwrap();
    assert_eq!(listed.len(), 2);
    let a = listed.iter().find(|row| row.name == "A").unwrap();
    assert_eq!(a.version, 2);
    assert!(get_pipeline(&connection, "pipeline://a1").is_ok());
    delete_pipeline(&connection, "pipeline://a1").unwrap();
    assert!(get_pipeline(&connection, "pipeline://a1").is_err());
  }

  #[test]
  fn run_step_rejects_blocked_tools_without_spawning() {
    let cancel = AtomicBool::new(false);
    let result = run_step(&step("bad", "rm"), Duration::from_secs(1), &cancel);
    assert!(!result.succeeded());
    assert!(result.stderr.contains("allowlist"));
  }
}
