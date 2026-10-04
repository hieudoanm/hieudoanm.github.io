pub mod command;
pub mod process;
pub mod registry;
pub mod stream;

use crate::error::{AppError, AppResult};
use crate::services::launcher::command::{run_command, CommandSpec};
use crate::services::launcher::registry::{now_ms, RunRequest, STATUS_QUEUED, STATUS_RUNNING};
use crate::services::launcher::stream::{
    tail_events, LogPayload, PipelineEventPayload, RunStatusPayload, EVENT_LOG, EVENT_PIPELINE,
    EVENT_RUN_STATUS,
};
use crate::services::paths;
use crate::services::settings::Settings;
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::channel;
use std::sync::Arc;
use std::time::Duration;
use tauri::{AppHandle, Emitter};

const POLL_INTERVAL: Duration = Duration::from_millis(100);

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LaunchOutcome {
    #[serde(alias = "run_id")]
    #[serde(default)]
    pub run_id: String,
    #[serde(default)]
    pub status: String,
    #[serde(default)]
    pub command: String,
    #[serde(alias = "config_path")]
    #[serde(default)]
    pub config_path: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LauncherStatus {
    pub active: Option<registry::ActiveRunInfo>,
    #[serde(default)]
    pub queued: Vec<registry::QueuedRunInfo>,
}

/// Writes the edited configuration next to the project's other configs and
/// returns where it landed. The config is written by the workbench so the
/// pipeline always runs from a file it can reproduce later.
pub fn write_launch_config(
    settings: &Settings,
    run_id: &str,
    config: &serde_json::Value,
) -> AppResult<String> {
    let config_root = settings.config_path()?;
    let target_dir = config_root.join("launched");
    std::fs::create_dir_all(&target_dir)?;
    let path = target_dir.join(format!("{run_id}.yaml"));
    let yaml = serde_yaml::to_string(config).map_err(|error| AppError::Parse {
        kind: "config",
        reason: error.to_string(),
    })?;
    std::fs::write(&path, yaml)?;
    Ok(settings.config_dir.trim_end_matches('/').to_string()
        + "/launched/"
        + &format!("{run_id}.yaml"))
}

pub fn generate_run_id() -> String {
    let millis = now_ms();
    format!("r_{}_{}", paths::timestamp_utc(millis), millis % 1_000_000)
}

pub fn launch(
    app: AppHandle,
    registry: Arc<registry::Registry>,
    settings: Settings,
    config: serde_json::Value,
    run_id: Option<String>,
    device: Option<String>,
) -> AppResult<LaunchOutcome> {
    let run_id = run_id.unwrap_or_else(generate_run_id);
    crate::services::paths::validate_run_id(&run_id)?;
    if !config.is_object() {
        return Err(AppError::Invalid {
            kind: "config",
            value: "the configuration must be an object".to_string(),
        });
    }
    let config_path = write_launch_config(&settings, &run_id, &config)?;
    let spec = run_command(
        &settings,
        &config_path,
        settings.runs_dir.trim_end_matches('/'),
        Some(&run_id),
    )?;
    let request = RunRequest {
        run_id: run_id.clone(),
        command: spec.display(),
        config_path: config_path.clone(),
        device: device.unwrap_or_else(|| "auto".to_string()),
    };
    let outcome = LaunchOutcome {
        run_id: run_id.clone(),
        status: STATUS_QUEUED.to_string(),
        command: spec.display(),
        config_path,
    };
    if !registry.is_busy() {
        start(app, registry, settings, request, spec);
        return Ok(LaunchOutcome {
            status: STATUS_RUNNING.to_string(),
            ..outcome
        });
    }
    registry.enqueue(request);
    ensure_supervisor(app, registry, settings);
    Ok(outcome)
}

pub fn cancel(registry: &registry::Registry, run_id: &str) -> AppResult<()> {
    registry.cancel(run_id)
}

pub fn status(registry: &registry::Registry) -> LauncherStatus {
    LauncherStatus {
        active: registry.active(),
        queued: registry.queued(),
    }
}

fn ensure_supervisor(app: AppHandle, registry: Arc<registry::Registry>, settings: Settings) {
    std::thread::spawn(move || {
        while registry.has_queued() {
            let Some((request, _)) = registry.take_next() else {
                break;
            };
            let spec = match rebuild(&settings, &request) {
                Ok(spec) => spec,
                Err(error) => {
                    let _ = app.emit(
                        EVENT_RUN_STATUS,
                        RunStatusPayload {
                            run_id: request.run_id.clone(),
                            status: registry::STATUS_FAILED.to_string(),
                            exit_code: Some(-1),
                            at_ms: now_ms(),
                        },
                    );
                    log::warn!("cannot rebuild command for {}: {error}", request.run_id);
                    continue;
                }
            };
            let run_id = request.run_id.clone();
            start(
                app.clone(),
                Arc::clone(&registry),
                settings.clone(),
                request,
                spec,
            );
            wait_for_completion(&registry, &run_id);
        }
    });
}

fn rebuild(settings: &Settings, request: &RunRequest) -> AppResult<CommandSpec> {
    run_command(
        settings,
        &request.config_path,
        settings.runs_dir.trim_end_matches('/'),
        Some(&request.run_id),
    )
}

fn wait_for_completion(registry: &registry::Registry, run_id: &str) {
    while registry.active_is(run_id) {
        std::thread::sleep(POLL_INTERVAL);
    }
}

fn start(
    app: AppHandle,
    registry: Arc<registry::Registry>,
    settings: Settings,
    request: RunRequest,
    spec: CommandSpec,
) {
    let run_id = request.run_id.clone();
    std::thread::spawn(move || {
        let mut child = match process::spawn(&spec) {
            Ok(child) => child,
            Err(error) => {
                finish(&app, &registry, &run_id, None);
                emit_status(&app, &run_id, registry::STATUS_FAILED, Some(-1));
                log::error!("cannot start {}: {error}", request.command);
                return;
            }
        };
        let pid = child.id();
        let cancel = match registry.claim(request.clone(), pid) {
            Ok(token) => token,
            Err(error) => {
                let _ = child.kill();
                log::warn!("not starting {}: {error}", request.run_id);
                return;
            }
        };
        let (sender, receiver) = channel();
        let logs = forward_logs(&app, &run_id, receiver);
        let stdout = process::forward_lines(child.stdout.take(), "stdout", sender.clone());
        let stderr = process::forward_lines(child.stderr.take(), "stderr", sender.clone());
        let run_dir = settings
            .runs_path()
            .unwrap_or_else(|_| PathBuf::from("."))
            .join(&run_id);
        let stop = Arc::new(AtomicBool::new(false));
        let tailer = tail_events(
            run_dir,
            run_id.clone(),
            pipeline_sender(&app),
            Arc::clone(&stop),
        );
        let exit_code = supervise(&registry, &run_id, &mut child, &cancel);
        stdout.join().ok();
        stderr.join().ok();
        drop(sender);
        logs.join().ok();
        stop.store(true, Ordering::SeqCst);
        let _ = tailer.join();
        finish(&app, &registry, &run_id, Some(exit_code));
    });
}

fn forward_logs(
    app: &AppHandle,
    run_id: &str,
    receiver: std::sync::mpsc::Receiver<process::StreamLine>,
) -> std::thread::JoinHandle<()> {
    let app = app.clone();
    let run_id = run_id.to_string();
    std::thread::spawn(move || {
        while let Ok(line) = receiver.recv() {
            let _ = app.emit(
                EVENT_LOG,
                LogPayload {
                    run_id: run_id.clone(),
                    stream: line.stream.to_string(),
                    line: line.line,
                    at_ms: now_ms(),
                },
            );
        }
    })
}

fn pipeline_sender(app: &AppHandle) -> std::sync::mpsc::Sender<PipelineEventPayload> {
    let app = app.clone();
    let (sender, receiver) = channel::<PipelineEventPayload>();
    std::thread::spawn(move || {
        while let Ok(payload) = receiver.recv() {
            let _ = app.emit(EVENT_PIPELINE, payload);
        }
    });
    sender
}

fn supervise(
    registry: &registry::Registry,
    run_id: &str,
    child: &mut std::process::Child,
    cancel: &AtomicBool,
) -> i32 {
    loop {
        if cancel.load(Ordering::SeqCst) || registry.is_cancelled(run_id) {
            let _ = child.kill();
            break;
        }
        match child.try_wait() {
            Ok(Some(status)) => return status.code().unwrap_or(-1),
            Ok(None) => std::thread::sleep(POLL_INTERVAL),
            Err(_) => break,
        }
    }
    child
        .wait()
        .ok()
        .and_then(|status| status.code())
        .unwrap_or(-1)
}

fn finish(app: &AppHandle, registry: &registry::Registry, run_id: &str, exit_code: Option<i32>) {
    let status = registry.finish(run_id, exit_code);
    emit_status(app, run_id, &status, exit_code);
}

fn emit_status(app: &AppHandle, run_id: &str, status: &str, exit_code: Option<i32>) {
    let _ = app.emit(
        EVENT_RUN_STATUS,
        RunStatusPayload {
            run_id: run_id.to_string(),
            status: status.to_string(),
            exit_code,
            at_ms: now_ms(),
        },
    );
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::Path;

    fn settings(root: &Path) -> Settings {
        let settings = Settings {
            project_root: Some(root.to_string_lossy().to_string()),
            ..Settings::default()
        };
        settings
    }

    #[test]
    fn writes_the_edited_config_into_the_project() {
        let dir = tempfile::tempdir().unwrap();
        let settings = settings(dir.path());
        let config = serde_json::json!({"model": {"model_type": "resnet18"}});
        let path = write_launch_config(&settings, "r_1", &config).unwrap();
        assert_eq!(path, "configs/launched/r_1.yaml");
        let written = std::fs::read_to_string(dir.path().join(&path)).unwrap();
        assert!(written.contains("resnet18"));
    }

    #[test]
    fn generates_a_run_id_the_app_can_read_back() {
        let run_id = generate_run_id();
        assert!(run_id.starts_with("r_"));
        assert!(crate::services::paths::validate_run_id(&run_id).is_ok());
    }

    #[test]
    fn reports_the_idle_launcher() {
        let registry = registry::Registry::new();
        let status = status(&registry);
        assert!(status.active.is_none());
        assert!(status.queued.is_empty());
    }
}
