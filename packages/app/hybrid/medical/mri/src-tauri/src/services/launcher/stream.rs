use crate::domain::events::PipelineEvent;
use serde::Serialize;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::Sender;
use std::sync::Arc;
use std::time::Duration;

pub const EVENT_LOG: &str = "workbench://log";
pub const EVENT_PIPELINE: &str = "workbench://pipeline-event";
pub const EVENT_RUN_STATUS: &str = "workbench://run-status";
pub const EVENTS_FILE: &str = "events.jsonl";

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LogPayload {
    #[serde(alias = "run_id")]
    #[serde(default)]
    pub run_id: String,
    #[serde(default)]
    pub stream: String,
    #[serde(default)]
    pub line: String,
    #[serde(alias = "at_ms")]
    #[serde(default)]
    pub at_ms: u64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PipelineEventPayload {
    #[serde(alias = "run_id")]
    #[serde(default)]
    pub run_id: String,
    #[serde(default)]
    pub event: PipelineEvent,
    #[serde(alias = "at_ms")]
    #[serde(default)]
    pub at_ms: u64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RunStatusPayload {
    #[serde(alias = "run_id")]
    #[serde(default)]
    pub run_id: String,
    #[serde(default)]
    pub status: String,
    #[serde(alias = "exit_code")]
    pub exit_code: Option<i32>,
    #[serde(alias = "at_ms")]
    #[serde(default)]
    pub at_ms: u64,
}

/// Follows the run folder's `events.jsonl` from a byte offset, so a live run
/// reaches the UI even when the pipeline writes events only to disk.
pub fn tail_events(
    run_dir: std::path::PathBuf,
    run_id: String,
    sender: Sender<PipelineEventPayload>,
    stop: Arc<AtomicBool>,
) -> std::thread::JoinHandle<()> {
    std::thread::spawn(move || {
        let mut offset = 0u64;
        let path = run_dir.join(EVENTS_FILE);
        while !stop.load(Ordering::Relaxed) {
            let text = std::fs::read_to_string(&path).unwrap_or_default();
            if text.len() as u64 > offset {
                let fresh = &text[offset as usize..];
                offset = text.len() as u64;
                for line in fresh.lines().filter(|line| !line.trim().is_empty()) {
                    if let Some(event) = PipelineEvent::parse(line) {
                        let _ = sender.send(PipelineEventPayload {
                            run_id: run_id.clone(),
                            event,
                            at_ms: super::registry::now_ms(),
                        });
                    }
                }
            }
            std::thread::sleep(Duration::from_millis(400));
        }
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn forwards_events_written_after_startup() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::write(dir.path().join(EVENTS_FILE), "").unwrap();
        let (sender, receiver) = std::sync::mpsc::channel();
        let stop = Arc::new(AtomicBool::new(false));
        let handle = tail_events(
            dir.path().to_path_buf(),
            "r_1".to_string(),
            sender,
            Arc::clone(&stop),
        );
        std::fs::write(
            dir.path().join(EVENTS_FILE),
            "{\"type\":\"stage_start\",\"stage\":\"train\"}\n",
        )
        .unwrap();
        let payload = receiver.recv_timeout(Duration::from_secs(5)).unwrap();
        stop.store(true, Ordering::SeqCst);
        assert_eq!(payload.run_id, "r_1");
        assert_eq!(payload.event.stage(), "train");
        handle.join().unwrap();
    }

    #[test]
    fn stops_when_asked() {
        let dir = tempfile::tempdir().unwrap();
        let (sender, _receiver) = std::sync::mpsc::channel();
        let stop = Arc::new(AtomicBool::new(true));
        let handle = tail_events(dir.path().to_path_buf(), "r_1".to_string(), sender, stop);
        handle.join().unwrap();
    }
}
