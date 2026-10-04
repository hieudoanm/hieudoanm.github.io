use crate::error::{AppError, AppResult};
use serde::{Deserialize, Serialize};
use std::collections::VecDeque;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex, MutexGuard};

pub const STATUS_RUNNING: &str = "running";
pub const STATUS_QUEUED: &str = "queued";
pub const STATUS_COMPLETED: &str = "completed";
pub const STATUS_FAILED: &str = "failed";
pub const STATUS_CANCELLED: &str = "cancelled";

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ActiveRunInfo {
    #[serde(alias = "run_id")]
    #[serde(default)]
    pub run_id: String,
    #[serde(default)]
    pub command: String,
    #[serde(alias = "config_path")]
    #[serde(default)]
    pub config_path: String,
    #[serde(default)]
    pub device: String,
    #[serde(default)]
    pub status: String,
    #[serde(default)]
    pub pid: u32,
    #[serde(alias = "started_at_ms")]
    #[serde(default)]
    pub started_at_ms: u64,
    #[serde(alias = "finished_at_ms")]
    pub finished_at_ms: Option<u64>,
    #[serde(alias = "exit_code")]
    pub exit_code: Option<i32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QueuedRunInfo {
    #[serde(alias = "run_id")]
    #[serde(default)]
    pub run_id: String,
    #[serde(default)]
    pub command: String,
    #[serde(alias = "config_path")]
    #[serde(default)]
    pub config_path: String,
    #[serde(default)]
    pub device: String,
    #[serde(alias = "requested_at_ms")]
    #[serde(default)]
    pub requested_at_ms: u64,
}

#[derive(Debug, Clone)]
pub struct RunRequest {
    pub run_id: String,
    pub command: String,
    pub config_path: String,
    pub device: String,
}

struct ActiveEntry {
    info: ActiveRunInfo,
    cancel: Arc<AtomicBool>,
}

#[derive(Default)]
struct Inner {
    active: Option<ActiveEntry>,
    queue: VecDeque<(RunRequest, u64)>,
}

/// Tracks the one run that may be executing plus the waiting queue. GPU runs
/// are serialised so two trainings never fight over the same device.
pub struct Registry {
    inner: Mutex<Inner>,
}

impl Default for Registry {
    fn default() -> Self {
        Self::new()
    }
}

pub fn now_ms() -> u64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|duration| duration.as_millis() as u64)
        .unwrap_or_default()
}

impl Registry {
    pub fn new() -> Self {
        Self {
            inner: Mutex::new(Inner::default()),
        }
    }

    fn lock(&self) -> MutexGuard<'_, Inner> {
        self.inner
            .lock()
            .unwrap_or_else(|poisoned| poisoned.into_inner())
    }

    pub fn active(&self) -> Option<ActiveRunInfo> {
        self.lock().active.as_ref().map(|entry| entry.info.clone())
    }

    pub fn queued(&self) -> Vec<QueuedRunInfo> {
        self.lock()
            .queue
            .iter()
            .map(|(request, requested_at_ms)| QueuedRunInfo {
                run_id: request.run_id.clone(),
                command: request.command.clone(),
                config_path: request.config_path.clone(),
                device: request.device.clone(),
                requested_at_ms: *requested_at_ms,
            })
            .collect()
    }

    /// Registers a run as active. A CPU run may replace nothing: one run at a
    /// time, always, so a cancellation is never ambiguous.
    pub fn claim(&self, request: RunRequest, pid: u32) -> AppResult<Arc<AtomicBool>> {
        let mut inner = self.lock();
        if inner.active.is_some() {
            return Err(AppError::RunBusy);
        }
        let cancel = Arc::new(AtomicBool::new(false));
        inner.active = Some(ActiveEntry {
            info: ActiveRunInfo {
                run_id: request.run_id,
                command: request.command,
                config_path: request.config_path,
                device: request.device,
                status: STATUS_RUNNING.to_string(),
                pid,
                started_at_ms: now_ms(),
                finished_at_ms: None,
                exit_code: None,
            },
            cancel: Arc::clone(&cancel),
        });
        Ok(cancel)
    }

    pub fn enqueue(&self, request: RunRequest) -> QueuedRunInfo {
        let requested_at_ms = now_ms();
        let info = QueuedRunInfo {
            run_id: request.run_id.clone(),
            command: request.command.clone(),
            config_path: request.config_path.clone(),
            device: request.device.clone(),
            requested_at_ms,
        };
        self.lock().queue.push_back((request, requested_at_ms));
        info
    }

    pub fn cancel(&self, run_id: &str) -> AppResult<()> {
        let mut inner = self.lock();
        if let Some(position) = inner
            .queue
            .iter()
            .position(|(request, _)| request.run_id == run_id)
        {
            inner.queue.remove(position);
            return Ok(());
        }
        match &inner.active {
            Some(entry) if entry.info.run_id == run_id => {
                entry.cancel.store(true, Ordering::SeqCst);
                Ok(())
            }
            _ => Err(AppError::RunNotActive(run_id.to_string())),
        }
    }

    pub fn is_cancelled(&self, run_id: &str) -> bool {
        self.lock()
            .active
            .as_ref()
            .map(|entry| entry.info.run_id == run_id && entry.cancel.load(Ordering::SeqCst))
            .unwrap_or(false)
    }

    /// Records the terminal status of the active run and returns it so the
    /// caller reports the same thing the UI will read back.
    pub fn finish(&self, run_id: &str, exit_code: Option<i32>) -> String {
        let mut inner = self.lock();
        let mut status = registry_status(exit_code);
        if let Some(entry) = &mut inner.active {
            if entry.info.run_id == run_id {
                status = status_for(entry, exit_code);
                entry.info.status = status.clone();
                entry.info.exit_code = exit_code;
                entry.info.finished_at_ms = Some(now_ms());
            }
        }
        inner.active = None;
        status
    }

    pub fn has_queued(&self) -> bool {
        !self.lock().queue.is_empty()
    }

    pub fn active_is(&self, run_id: &str) -> bool {
        self.lock()
            .active
            .as_ref()
            .map(|entry| entry.info.run_id == run_id)
            .unwrap_or(false)
    }

    pub fn take_next(&self) -> Option<(RunRequest, u64)> {
        self.lock().queue.pop_front()
    }

    pub fn is_busy(&self) -> bool {
        let inner = self.lock();
        inner.active.is_some() || !inner.queue.is_empty()
    }
}

fn registry_status(exit_code: Option<i32>) -> String {
    if exit_code == Some(0) {
        STATUS_COMPLETED.to_string()
    } else {
        STATUS_FAILED.to_string()
    }
}

fn status_for(entry: &ActiveEntry, exit_code: Option<i32>) -> String {
    if entry.cancel.load(Ordering::SeqCst) {
        STATUS_CANCELLED.to_string()
    } else if exit_code == Some(0) {
        STATUS_COMPLETED.to_string()
    } else {
        STATUS_FAILED.to_string()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn request(run_id: &str) -> RunRequest {
        RunRequest {
            run_id: run_id.to_string(),
            command: "uv run pipeline run".to_string(),
            config_path: "configs/launched/x.yaml".to_string(),
            device: "cuda".to_string(),
        }
    }

    #[test]
    fn allows_one_active_run() {
        let registry = Registry::new();
        registry.claim(request("r_1"), 10).unwrap();
        assert!(registry.active().is_some());
        assert!(matches!(
            registry.claim(request("r_2"), 11),
            Err(AppError::RunBusy)
        ));
    }

    #[test]
    fn queues_extra_requests_and_starts_them_in_order() {
        let registry = Registry::new();
        registry.claim(request("r_1"), 10).unwrap();
        registry.enqueue(request("r_2"));
        registry.enqueue(request("r_3"));
        assert_eq!(registry.queued().len(), 2);
        registry.finish("r_1", Some(0));
        let (next, _) = registry.take_next().unwrap();
        assert_eq!(next.run_id, "r_2");
    }

    #[test]
    fn flags_a_cancelled_run() {
        let registry = Registry::new();
        registry.claim(request("r_1"), 10).unwrap();
        registry.cancel("r_1").unwrap();
        assert!(registry.is_cancelled("r_1"));
        registry.finish("r_1", None);
        assert!(registry.active().is_none());
    }

    #[test]
    fn marks_a_nonzero_exit_as_failed() {
        let registry = Registry::new();
        registry.claim(request("r_1"), 10).unwrap();
        assert_eq!(registry.finish("r_1", Some(2)), STATUS_FAILED);
        assert!(registry.active().is_none());
    }

    #[test]
    fn reports_the_terminal_status_and_queue_state() {
        let registry = Registry::new();
        registry.enqueue(request("r_2"));
        registry.claim(request("r_1"), 10).unwrap();
        assert!(registry.active_is("r_1"));
        assert!(registry.has_queued());
        assert_eq!(registry.finish("r_1", Some(0)), STATUS_COMPLETED);
        assert!(!registry.active_is("r_1"));
        assert!(
            registry.has_queued(),
            "a queued run survives another run finishing"
        );
    }

    #[test]
    fn refuses_to_cancel_something_that_is_not_running() {
        let registry = Registry::new();
        assert!(matches!(
            registry.cancel("r_absent"),
            Err(AppError::RunNotActive(_))
        ));
    }

    #[test]
    fn cancels_a_queued_run_without_a_process() {
        let registry = Registry::new();
        registry.claim(request("r_1"), 10).unwrap();
        registry.enqueue(request("r_2"));
        registry.cancel("r_2").unwrap();
        assert!(registry.queued().is_empty());
    }

    #[test]
    fn reports_busy_state_for_the_queue() {
        let registry = Registry::new();
        registry.claim(request("r_1"), 10).unwrap();
        registry.enqueue(request("r_2"));
        assert!(registry.is_busy());
    }
}
