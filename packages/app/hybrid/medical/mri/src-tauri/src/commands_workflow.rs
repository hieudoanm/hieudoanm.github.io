use crate::db;
use crate::jobs::{self, JobRecord};
use crate::pipeline::{self, PipelineDefinition, PipelineRow};
use crate::state::AppState;
use serde_json::json;
use tauri::State;

fn store_pipeline(
  connection: &rusqlite::Connection,
  definition: &PipelineDefinition,
) -> Result<PipelineRow, String> {
  let version = pipeline::next_version(connection, &definition.name)? + 1;
  let row = PipelineRow {
    id: format!("pipeline://{}", uuid::Uuid::new_v4()),
    name: definition.name.clone(),
    version,
    definition_json: serde_json::to_string(definition)
      .map_err(|error| error.to_string())?,
    created_at: db::now(),
  };
  pipeline::insert_pipeline(connection, &row)?;
  Ok(row)
}

#[tauri::command]
pub fn create_pipeline(
  state: State<'_, AppState>,
  definition_json: String,
) -> Result<PipelineRow, String> {
  let definition = pipeline::parse_definition(&definition_json)?;
  let connection = state.lock();
  store_pipeline(&connection, &definition)
}

#[tauri::command]
pub fn list_pipelines(state: State<'_, AppState>) -> Result<Vec<PipelineRow>, String> {
  pipeline::list_pipelines(&state.lock())
}

#[tauri::command]
pub fn delete_pipeline(state: State<'_, AppState>, pipeline_id: String) -> Result<(), String> {
  pipeline::delete_pipeline(&state.lock(), &pipeline_id)
}

#[tauri::command]
pub fn run_pipeline(
  state: State<'_, AppState>,
  pipeline_id: String,
  dataset_id: Option<String>,
) -> Result<JobRecord, String> {
  let record = {
    let connection = state.lock();
    // Fail fast when the pipeline does not exist.
    pipeline::get_pipeline(&connection, &pipeline_id)?;
    drop(connection);
    let payload = json!({ "pipelineId": pipeline_id, "datasetId": dataset_id });
    state.jobs.submit("pipeline", &payload.to_string())?
  };
  Ok(record)
}

#[tauri::command]
pub fn list_jobs(state: State<'_, AppState>) -> Result<Vec<JobRecord>, String> {
  jobs::list_jobs(&state.lock())
}

#[tauri::command]
pub fn get_job(state: State<'_, AppState>, job_id: String) -> Result<JobRecord, String> {
  jobs::get_job(&state.lock(), &job_id)
}

#[tauri::command]
pub fn cancel_job(state: State<'_, AppState>, job_id: String) -> Result<(), String> {
  state.jobs.cancel(&job_id)
}

#[tauri::command]
pub fn retry_job(state: State<'_, AppState>, job_id: String) -> Result<JobRecord, String> {
  state.jobs.retry(&job_id)
}

/// Exposed for tests: verifies versioned storage end to end.
#[cfg(test)]
pub(crate) mod tests {
  use super::*;
  use crate::db;
  use crate::jobs::JobManager;
  use std::sync::{Arc, Mutex};

  fn definition(name: &str) -> PipelineDefinition {
    PipelineDefinition {
      name: name.to_string(),
      steps: vec![pipeline::PipelineStep {
        id: "convert".to_string(),
        tool: "dcm2niix".to_string(),
        args: vec!["-z".to_string(), "y".to_string()],
      }],
    }
  }

  #[test]
  fn stores_versioned_pipelines() {
    let connection = db::open_in_memory().unwrap();
    let first = store_pipeline(&connection, &definition("Convert")).unwrap();
    assert_eq!(first.version, 1);
    let second = store_pipeline(&connection, &definition("Convert")).unwrap();
    assert_eq!(second.version, 2);
    let listed = pipeline::list_pipelines(&connection).unwrap();
    assert_eq!(listed.len(), 1);
    assert_eq!(listed[0].version, 2);
  }

  #[test]
  fn job_manager_runs_tasks_to_completion() {
    let connection = Arc::new(Mutex::new(Connection::open_in_memory().unwrap()));
    let manager = JobManager::new(Arc::clone(&connection));
    let record = manager
      .submit_task(
        "noop",
        "{}",
        Box::new(|context| {
          context.log("working");
          context.progress(0.5);
          Ok(vec!["done".to_string()])
        }),
      )
      .unwrap();
    wait_for_status(&connection, &record.id, jobs::STATUS_COMPLETED);
    let finished = jobs::get_job(
      &connection.lock().unwrap_or_else(|p| p.into_inner()),
      &record.id,
    )
    .unwrap();
    assert_eq!(finished.status, jobs::STATUS_COMPLETED);
    assert_eq!(finished.progress, 1.0);
    assert!(finished.logs_json.contains("working"));
    assert!(finished.outputs_json.contains("done"));
  }

  #[test]
  fn failed_jobs_record_the_error_and_support_retry() {
    let connection = Arc::new(Mutex::new(Connection::open_in_memory().unwrap()));
    let manager = JobManager::new(Arc::clone(&connection));
    let record = manager
      .submit_task(
        "noop",
        "{}",
        Box::new(|_| Err("boom".to_string())),
      )
      .unwrap();
    wait_for_status(&connection, &record.id, jobs::STATUS_FAILED);
    let failed = jobs::get_job(
      &connection.lock().unwrap_or_else(|p| p.into_inner()),
      &record.id,
    )
    .unwrap();
    assert_eq!(failed.error.as_deref(), Some("boom"));

    // Declarative retry requires a rebuildable payload kind.
    assert!(manager.retry(&record.id).is_err());

    let pipeline_row = {
      let connection = connection.lock().unwrap_or_else(|p| p.into_inner());
      store_pipeline(&connection, &definition("Retry")).unwrap()
    };
    let submitted = manager
      .submit(
        "pipeline",
        &json!({ "pipelineId": pipeline_row.id }).to_string(),
      )
      .unwrap();
    wait_for_status(&connection, &submitted.id, jobs::STATUS_FAILED);
    let retried = manager.retry(&submitted.id).unwrap();
    assert_eq!(retried.attempts, 1);
    wait_for_status(&connection, &retried.id, jobs::STATUS_FAILED);
  }

  #[test]
  fn queued_jobs_can_be_cancelled() {
    let connection = Arc::new(Mutex::new(Connection::open_in_memory().unwrap()));
    let manager = JobManager::new(Arc::clone(&connection));
    // Fill both worker slots with long-running tasks.
    let blocker = || {
      Box::new(move |context: &crate::jobs::JobContext| {
        while !context.cancelled() {
          std::thread::sleep(std::time::Duration::from_millis(10));
        }
        Ok(Vec::new())
      }) as jobs::JobTask
    };
    let first = manager.submit_task("noop", "{}", blocker()).unwrap();
    let second = manager.submit_task("noop", "{}", blocker()).unwrap();
    let third = manager
      .submit_task("noop", "{}", Box::new(|_| Ok(Vec::new())))
      .unwrap();
    manager.cancel(&third.id).unwrap();
    wait_for_status(&connection, &third.id, jobs::STATUS_CANCELLED);
    manager.cancel(&first.id).unwrap();
    manager.cancel(&second.id).unwrap();
    wait_for_status(&connection, &first.id, jobs::STATUS_CANCELLED);
    wait_for_status(&connection, &second.id, jobs::STATUS_CANCELLED);
  }

  fn wait_for_status(
    connection: &Arc<Mutex<Connection>>,
    job_id: &str,
    status: &str,
  ) {
    for _ in 0..200 {
      let current = jobs::get_job(
        &connection.lock().unwrap_or_else(|p| p.into_inner()),
        job_id,
      )
      .unwrap();
      if current.status == status {
        return;
      }
      std::thread::sleep(std::time::Duration::from_millis(25));
    }
    panic!("job {job_id} never reached status '{status}'");
  }
}
