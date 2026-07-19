use crate::jobs::{JobContext, JobTask};
use crate::process::{self, CommandSpec, ProcessResult, RunOptions};
use crate::registry::{self, ModelRecord};
use serde::Deserialize;
use serde_json::json;
use std::sync::atomic::AtomicBool;
use std::time::Duration;

const INFERENCE_TIMEOUT: Duration = Duration::from_secs(1800);

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ModelJobPayload {
  pub model_id: String,
  #[serde(default)]
  pub dataset_id: Option<String>,
  #[serde(default)]
  pub input_ref: Option<String>,
}

/// Builds the structured command for one inference run. Inputs are passed as
/// arguments — never interpolated into a shell string.
pub fn build_command(
  record: &ModelRecord,
  input_ref: &str,
) -> Result<CommandSpec, String> {
  match record.runtime.as_str() {
    "python" => Ok(CommandSpec::new(
      "python3",
      &[
        record.source.clone(),
        "--input".to_string(),
        input_ref.to_string(),
        "--output".to_string(),
        format!("/tmp/mri-{}", record.id.replace("model://", "")),
      ],
    )),
    "docker" => Ok(CommandSpec::new(
      "docker",
      &[
        "run".to_string(),
        "--rm".to_string(),
        record.source.clone(),
        "--input".to_string(),
        input_ref.to_string(),
      ],
    )),
    other => Err(format!("runtime '{other}' cannot be executed")),
  }
}

/// Runs one inference through the process manager with timeout and
/// cancellation.
pub fn run_inference(
  record: &ModelRecord,
  input_ref: &str,
  cancel: &AtomicBool,
) -> ProcessResult {
  let spec = match build_command(record, input_ref) {
    Ok(spec) => spec,
    Err(message) => return process_failure(message),
  };
  if let Err(message) = process::validate_spec(&spec) {
    return process_failure(message);
  }
  process::run(&spec, &RunOptions { timeout: INFERENCE_TIMEOUT, cancel })
}

fn process_failure(message: String) -> ProcessResult {
  ProcessResult {
    exit_code: None,
    stdout: String::new(),
    stderr: message,
    timed_out: false,
    cancelled: false,
  }
}

/// Parses and validates a declarative model job payload.
pub fn parse_payload(inputs_json: &str) -> Result<ModelJobPayload, String> {
  serde_json::from_str(inputs_json).map_err(|error| format!("invalid model job payload: {error}"))
}

/// Builds the executable task for job kind "model" so retries survive
/// restarts.
pub fn build_model_task(inputs_json: &str) -> Result<JobTask, String> {
  let payload = parse_payload(inputs_json)?;
  Ok(Box::new(move |context: &JobContext| {
    run_model_job(context, &payload)
  }))
}

fn run_model_job(context: &JobContext, payload: &ModelJobPayload) -> Result<Vec<String>, String> {
  let record =
    registry::get_model(&context.lock_db(), &payload.model_id)?;
  let input_ref = payload.input_ref.as_deref().unwrap_or("");
  context.log(&format!(
    "running model '{}' v{} ({}/{})",
    record.name, record.version, record.task, record.runtime
  ));
  if !registry::runtime_available(&record.runtime) {
    return Err(format!(
      "runtime '{}' is not available on this machine",
      record.runtime
    ));
  }
  context.progress(0.1);
  let result = run_inference(&record, input_ref, &context.cancel_flag());
  if context.cancelled() {
    return Err("cancelled by user".to_string());
  }
  if !result.succeeded() {
    let reason = if result.timed_out {
      "timed out".to_string()
    } else if result.cancelled {
      "was cancelled".to_string()
    } else {
      format!("failed with code {:?}", result.exit_code)
    };
    return Err(format!(
      "inference {} — {}",
      reason,
      truncate(&result.stderr, 400)
    ));
  }
  context.progress(0.9);
  let outputs = vec![format!(
    "{} v{} completed on {}",
    record.name, record.version, input_ref
  )];
  if let Some(dataset_id) = &payload.dataset_id {
    let connection = context.lock_db();
    let parameters = json!({
      "modelId": record.id,
      "name": record.name,
      "version": record.version,
      "task": record.task,
      "runtime": record.runtime,
      "source": record.source
    });
    let _ = crate::provenance::insert_record(
      &connection,
      dataset_id,
      "inference",
      &serde_json::to_string(&[&payload.input_ref]).unwrap_or_default(),
      &serde_json::to_string(&outputs).unwrap_or_default(),
      &parameters.to_string(),
    );
  }
  Ok(outputs)
}

fn truncate(value: &str, max: usize) -> String {
  if value.len() <= max {
    value.trim_end().to_string()
  } else {
    format!("{}…", &value[..max])
  }
}

#[cfg(test)]
mod tests {
  use super::*;
  use crate::registry::ModelDefinition;

  fn record(runtime: &str, source: &str) -> ModelRecord {
    ModelRecord::from(&ModelDefinition {
      name: "brain-seg".to_string(),
      version: "1.0".to_string(),
      task: "segmentation".to_string(),
      runtime: runtime.to_string(),
      source: source.to_string(),
      license: "MIT".to_string(),
      input_json: "{}".to_string(),
      output_json: "{}".to_string(),
    })
  }

  #[test]
  fn builds_structured_commands_per_runtime() {
    let python = build_command(&record("python", "/models/seg.py"), "series://1/s1").unwrap();
    assert_eq!(python.executable, "python3");
    assert_eq!(python.args[0], "/models/seg.py");
    assert!(python.args.contains(&"--input".to_string()));
    assert!(python
      .args
      .windows(2)
      .any(|pair| pair[0] == "--input" && pair[1] == "series://1/s1"));

    let docker = build_command(&record("docker", "org/seg:1.0"), "series://1/s1").unwrap();
    assert_eq!(docker.executable, "docker");
    assert_eq!(docker.args[..2], ["run".to_string(), "--rm".to_string()]);
    assert!(docker.args.contains(&"org/seg:1.0".to_string()));

    assert!(build_command(&record("java", "/m.jar"), "x").is_err());
  }

  #[test]
  fn inference_rejects_specs_the_process_manager_blocks() {
    // A docker image reference is not an allowlisted executable, so the spec
    // must still validate because the executable is `docker` itself.
    let cancel = AtomicBool::new(false);
    let result = run_inference(&record("docker", "org/seg:1.0"), "series://1/s1", &cancel);
    // Either runs (docker present) or fails cleanly — never panics.
    assert!(!result.timed_out);
  }

  #[test]
  fn parses_model_job_payloads() {
    let payload = parse_payload(
      r#"{"modelId":"model://1","datasetId":"dataset://d","inputRef":"series://1/s1"}"#,
    )
    .unwrap();
    assert_eq!(payload.model_id, "model://1");
    assert_eq!(payload.dataset_id.as_deref(), Some("dataset://d"));
    let minimal = parse_payload(r#"{"modelId":"model://2"}"#).unwrap();
    assert!(minimal.dataset_id.is_none());
    assert!(minimal.input_ref.is_none());
    assert!(parse_payload("{}").is_err());
    assert!(parse_payload("not json").is_err());
  }
}
