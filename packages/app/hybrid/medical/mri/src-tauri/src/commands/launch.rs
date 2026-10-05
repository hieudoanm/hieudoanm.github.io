use crate::error::AppResult;
use crate::services::launcher::{self, LaunchOutcome, LauncherStatus};
use crate::state::AppState;
use tauri::AppHandle;

/// Starts a pipeline run. GPU work is serialised: a second launch is queued
/// rather than competing for the device.
#[tauri::command]
pub fn launch_run(
    app: AppHandle,
    state: tauri::State<AppState>,
    config: serde_json::Value,
    run_id: Option<String>,
    device: Option<String>,
) -> AppResult<LaunchOutcome> {
    launcher::launch(
        app,
        state.launches.clone(),
        state.settings(),
        config,
        run_id,
        device,
    )
}

#[tauri::command]
pub fn cancel_run(state: tauri::State<AppState>, run_id: String) -> AppResult<()> {
    launcher::cancel(&state.launches, &run_id)
}

#[tauri::command]
pub fn launcher_status(state: tauri::State<AppState>) -> LauncherStatus {
    launcher::status(&state.launches)
}
