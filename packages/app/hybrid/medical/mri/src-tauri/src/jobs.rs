use crate::db;
use crate::pipeline;
use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, VecDeque};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex, MutexGuard};
use std::time::Duration;

pub const STATUS_QUEUED: &str = "queued";
pub const STATUS_RUNNING: &str = "running";
pub const STATUS_COMPLETED: &str = "completed";
pub const STATUS_FAILED: &str = "failed";
pub const STATUS_CANCELLED: &str = "cancelled";

const STEP_TIMEOUT: Duration = Duration::from_secs(600);
const MAX_CONCURRENT: usize = 2;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct JobLogEntry {
  pub timestamp: i64,
  pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct JobRecord {
  pub id: String,
  pub kind: String,
  pub status: String,
  pub progress: f64,
  pub attempts: i64,
  pub logs_json: String,
  pub inputs_json: String,
  pub outputs_json: String,
  pub error: Option<String>,
  pub created_at: i64,
  pub started_at: Option<i64>,
  pub finished_at: Option<i64>,
}

const JOB_COLUMNS: &str =
  "id, kind, status, progress, attempts, logs_json, inputs_json, outputs_json, error, created_at, started_at, finished_at";

fn row_to_job(row: &rusqlite::Row<'_>) -> rusqlite::Result<JobRecord> {
  Ok(JobRecord {
    id: row.get(0)?,
    kind: row.get(1)?,
    status: row.get(2)?,
    progress: row.get(3)?,
    attempts: row.get(4)?,
    logs_json: row.get(5)?,
    inputs_json: row.get(6)?,
    outputs_json: row.get(7)?,
    error: row.get(8)?,
    created_at: row.get(9)?,
    started_at: row.get(10)?,
    finished_at: row.get(11)?,
  })
}

pub fn insert_job(connection: &Connection, record: &JobRecord) -> Result<(), String> {
  connection
    .execute(
      &format!(
        "INSERT INTO jobs ({JOB_COLUMNS}) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)"
      ),
      rusqlite::params![
        record.id,
        record.kind,
        record.status,
        record.progress,
        record.attempts,
        record.logs_json,
        record.inputs_json,
        record.outputs_json,
        record.error,
        record.created_at,
        record.started_at,
        record.finished_at
      ],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn get_job(connection: &Connection, id: &str) -> Result<JobRecord, String> {
  connection
    .query_row(
      &format!("SELECT {JOB_COLUMNS} FROM jobs WHERE id = ?1"),
      [id],
      row_to_job,
    )
    .map_err(|error| error.to_string())
}

pub fn list_jobs(connection: &Connection) -> Result<Vec<JobRecord>, String> {
  let mut statement = connection
    .prepare(&format!(
      "SELECT {JOB_COLUMNS} FROM jobs ORDER BY created_at DESC LIMIT 100"
    ))
    .map_err(|error| error.to_string())?;
  let rows = statement
    .query_map([], row_to_job)
    .map_err(|error| error.to_string())?;
  rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

pub fn update_job_status(
  connection: &Connection,
  id: &str,
  status: &str,
  error: Option<&str>,
) -> Result<(), String> {
  let terminal = matches!(status, STATUS_COMPLETED | STATUS_FAILED | STATUS_CANCELLED);
  let started_at = if status == STATUS_RUNNING { Some(db::now()) } else { None };
  let finished_at = if terminal { Some(db::now()) } else { None };
  connection
    .execute(
      "UPDATE jobs SET status = ?2, error = ?3, \
       started_at = COALESCE(started_at, ?4), finished_at = COALESCE(?5, finished_at) \
       WHERE id = ?1",
      rusqlite::params![id, status, error, started_at, finished_at],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn update_job_progress(connection: &Connection, id: &str, progress: f64) -> Result<(), String> {
  connection
    .execute(
      "UPDATE jobs SET progress = ?2 WHERE id = ?1",
      rusqlite::params![id, progress.clamp(0.0, 1.0)],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn update_job_outputs(
  connection: &Connection,
  id: &str,
  outputs_json: &str,
) -> Result<(), String> {
  connection
    .execute(
      "UPDATE jobs SET outputs_json = ?2 WHERE id = ?1",
      rusqlite::params![id, outputs_json],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn append_job_log(connection: &Connection, id: &str, message: &str) -> Result<(), String> {
  let record = get_job(connection, id)?;
  let mut logs: Vec<JobLogEntry> = serde_json::from_str(&record.logs_json).unwrap_or_default();
  logs.push(JobLogEntry {
    timestamp: db::now(),
    message: message.to_string(),
  });
  let logs_json = serde_json::to_string(&logs).unwrap_or_else(|_| "[]".to_string());
  connection
    .execute(
      "UPDATE jobs SET logs_json = ?2 WHERE id = ?1",
      rusqlite::params![id, logs_json],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

/// The unit of work a job thread executes. Receives a context for logging,
/// progress reporting, and cooperative cancellation.
pub type JobTask = Box<dyn FnOnce(&JobContext) -> Result<Vec<String>, String> + Send>;

pub struct JobContext {
  pub job_id: String,
  db: Arc<Mutex<Connection>>,
  cancel: Arc<AtomicBool>,
}

impl JobContext {
  /// Shared database access for job tasks.
  pub fn lock_db(&self) -> MutexGuard<'_, Connection> {
    self
      .db
      .lock()
      .unwrap_or_else(|poisoned| poisoned.into_inner())
  }

  pub fn log(&self, message: &str) {
    if let Ok(connection) = self.db.lock() {
      let _ = append_job_log(&connection, &self.job_id, message);
    }
  }

  pub fn progress(&self, value: f64) {
    if let Ok(connection) = self.db.lock() {
      let _ = update_job_progress(&connection, &self.job_id, value);
    }
  }

  pub fn cancelled(&self) -> bool {
    self.cancel.load(Ordering::Relaxed)
  }

  pub fn cancel_flag(&self) -> Arc<AtomicBool> {
    Arc::clone(&self.cancel)
  }
}

struct ManagerState {
  queue: VecDeque<String>,
  cancels: HashMap<String, Arc<AtomicBool>>,
  tasks: HashMap<String, JobTask>,
  running: usize,
}

struct Shared {
  db: Arc<Mutex<Connection>>,
  state: Mutex<ManagerState>,
}

/// Queue-backed job runner: submit → queued → running → completed/failed/
/// cancelled, with live progress and logs persisted to the database.
pub struct JobManager {
  shared: Arc<Shared>,
}

impl JobManager {
  pub fn new(db: Arc<Mutex<Connection>>) -> Self {
    Self {
      shared: Arc::new(Shared {
        db,
        state: Mutex::new(ManagerState {
          queue: VecDeque::new(),
          cancels: HashMap::new(),
          tasks: HashMap::new(),
          running: 0,
        }),
      }),
    }
  }

  fn lock_state(&self) -> MutexGuard<'_, ManagerState> {
    self
      .shared
      .state
      .lock()
      .unwrap_or_else(|poisoned| poisoned.into_inner())
  }

  fn lock_db(&self) -> MutexGuard<'_, Connection> {
    self
      .shared
      .db
      .lock()
      .unwrap_or_else(|poisoned| poisoned.into_inner())
  }

  /// Submits declarative work; the task is rebuilt from the payload so retry
  /// keeps working even after process restarts.
  pub fn submit(&self, kind: &str, inputs_json: &str) -> Result<JobRecord, String> {
    // Validate that the payload can be rebuilt into a task before queueing.
    let _ = build_task(kind, inputs_json)?;
    self.enqueue(kind, inputs_json, 0, None)
  }

  /// Direct task submission used by tests and internal callers.
  pub fn submit_task(
    &self,
    kind: &str,
    inputs_json: &str,
    task: JobTask,
  ) -> Result<JobRecord, String> {
    self.enqueue(kind, inputs_json, 0, Some(task))
  }

  fn enqueue(
    &self,
    kind: &str,
    inputs_json: &str,
    attempts: i64,
    task: Option<JobTask>,
  ) -> Result<JobRecord, String> {
    let record = JobRecord {
      id: format!("job://{}", uuid::Uuid::new_v4()),
      kind: kind.to_string(),
      status: STATUS_QUEUED.to_string(),
      progress: 0.0,
      attempts,
      logs_json: "[]".to_string(),
      inputs_json: inputs_json.to_string(),
      outputs_json: "[]".to_string(),
      error: None,
      created_at: db::now(),
      started_at: None,
      finished_at: None,
    };
    insert_job(&self.lock_db(), &record)?;
    let cancel = Arc::new(AtomicBool::new(false));
    {
      let mut state = self.lock_state();
      state.cancels.insert(record.id.clone(), cancel);
      state.queue.push_back(record.id.clone());
      if let Some(task) = task {
        state.tasks.insert(record.id.clone(), task);
      }
    }
    self.spawn_next();
    Ok(record)
  }

  pub fn retry(&self, job_id: &str) -> Result<JobRecord, String> {
    let previous = get_job(&self.lock_db(), job_id)?;
    if previous.status != STATUS_FAILED && previous.status != STATUS_CANCELLED {
      return Err(format!(
        "job {} is {} and cannot be retried",
        job_id, previous.status
      ));
    }
    let _ = build_task(&previous.kind, &previous.inputs_json)?;
    self.enqueue(&previous.kind, &previous.inputs_json, previous.attempts + 1, None)
  }

  pub fn cancel(&self, job_id: &str) -> Result<(), String> {
    let flag = {
      let mut state = self.lock_state();
      state.queue.retain(|id| id != job_id);
      state.cancels.get(job_id).cloned()
    };
    let Some(flag) = flag else {
      return Err(format!("unknown job {job_id}"));
    };
    flag.store(true, Ordering::Relaxed);
    let connection = self.lock_db();
    let record = get_job(&connection, job_id)?;
    if record.status == STATUS_QUEUED {
      update_job_status(&connection, job_id, STATUS_CANCELLED, None)?;
    }
    Ok(())
  }

  fn spawn_next(&self) {
    let next = {
      let mut state = self.lock_state();
      if state.running >= MAX_CONCURRENT {
        return;
      }
      state.queue.pop_front()
    };
    let Some(job_id) = next else { return };

    let stored_task = {
      let mut state = self.lock_state();
      state.tasks.remove(&job_id)
    };
    let task = match stored_task {
      Some(task) => task,
      None => {
        let record = match get_job(&self.lock_db(), &job_id) {
          Ok(record) => record,
          Err(error) => {
            let _ = update_job_status(&self.lock_db(), &job_id, STATUS_FAILED, Some(&error));
            return self.spawn_next();
          }
        };
        match build_task(&record.kind, &record.inputs_json) {
          Ok(task) => task,
          Err(error) => {
            let _ =
              update_job_status(&self.lock_db(), &job_id, STATUS_FAILED, Some(&error));
            return self.spawn_next();
          }
        }
      }
    };
    let Some(cancel) = self.lock_state().cancels.get(&job_id).cloned() else {
      return;
    };
    {
      let mut state = self.lock_state();
      state.running += 1;
    }
    let shared = Arc::clone(&self.shared);
    std::thread::spawn(move || {
      execute(shared, job_id, cancel, task);
    });
  }
}

fn execute(shared: Arc<Shared>, job_id: String, cancel: Arc<AtomicBool>, task: JobTask) {
  let lock_db = || shared.db.lock().unwrap_or_else(|p| p.into_inner());
  {
    let _ = update_job_status(&lock_db(), &job_id, STATUS_RUNNING, None);
  }
  let context = JobContext {
    job_id: job_id.clone(),
    db: Arc::clone(&shared.db),
    cancel,
  };
  let outcome = task(&context);
  {
    let connection = lock_db();
    // A cancelled job stays cancelled even if the task returned normally.
    if context.cancelled() {
      let _ = update_job_status(&connection, &job_id, STATUS_CANCELLED, None);
    } else {
      match outcome {
        Ok(outputs) => {
          let outputs_json = serde_json::to_string(&outputs).unwrap_or_else(|_| "[]".to_string());
          let _ = update_job_outputs(&connection, &job_id, &outputs_json);
          let _ = update_job_progress(&connection, &job_id, 1.0);
          let _ = update_job_status(&connection, &job_id, STATUS_COMPLETED, None);
        }
        Err(error) => {
          let _ = update_job_status(&connection, &job_id, STATUS_FAILED, Some(&error));
        }
      }
    }
  }
  {
    let mut state = shared.state.lock().unwrap_or_else(|p| p.into_inner());
    state.running -= 1;
  }
  JobManager { shared }.spawn_next();
}

/// Rebuilds the executable task from a declarative payload.
fn build_task(kind: &str, inputs_json: &str) -> Result<JobTask, String> {
  match kind {
    "pipeline" => {
      #[derive(Deserialize)]
      #[serde(rename_all = "camelCase")]
      struct Payload {
        pipeline_id: String,
        dataset_id: Option<String>,
      }
      let payload: Payload = serde_json::from_str(inputs_json)
        .map_err(|error| format!("invalid pipeline job payload: {error}"))?;
      Ok(Box::new(move |context: &JobContext| {
        run_pipeline_job(context, &payload.pipeline_id, payload.dataset_id.as_deref())
      }))
    }
    "model" => crate::inference::build_model_task(inputs_json),
    other => Err(format!("unknown job kind '{other}'")),
  }
}

fn run_pipeline_job(
  context: &JobContext,
  pipeline_id: &str,
  dataset_id: Option<&str>,
) -> Result<Vec<String>, String> {
  let row = pipeline::get_pipeline(&context.db.lock().unwrap_or_else(|p| p.into_inner()), pipeline_id)?;
  let definition = pipeline::parse_definition(&row.definition_json)?;
  context.log(&format!("running pipeline '{}' v{}", definition.name, row.version));
  let total = definition.steps.len();
  let mut outputs = Vec::new();
  for (index, step) in definition.steps.iter().enumerate() {
    if context.cancelled() {
      return Err("cancelled by user".to_string());
    }
    context.progress(index as f64 / total as f64);
    context.log(&format!(
      "step {}/{}: {} ({})",
      index + 1,
      total,
      step.id,
      step.tool
    ));
    let result = pipeline::run_step(step, STEP_TIMEOUT, &context.cancel_flag());
    if !result.succeeded() {
      let reason = if result.timed_out {
        "timed out".to_string()
      } else if result.cancelled {
        "was cancelled".to_string()
      } else {
        format!("failed with code {:?}", result.exit_code)
      };
      return Err(format!(
        "step '{}' {} — {}",
        step.id,
        reason,
        truncate(&result.stderr, 400)
      ));
    }
    outputs.push(format!("{}: ok", step.id));
  }
  if let Some(dataset_id) = dataset_id {
    let connection = context.db.lock().unwrap_or_else(|p| p.into_inner());
    let parameters = serde_json::json!({ "pipelineId": pipeline_id, "version": row.version });
    let _ = crate::provenance::insert_record(
      &connection,
      dataset_id,
      "pipeline",
      &serde_json::to_string(&[pipeline_id]).unwrap_or_default(),
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
