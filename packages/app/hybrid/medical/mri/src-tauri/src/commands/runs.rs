use crate::domain::run::{RunDetail, RunSummary};
use crate::error::AppResult;
use crate::services::runs::{self, TextFile};
use crate::state::AppState;

#[tauri::command]
pub fn list_runs(state: tauri::State<AppState>) -> AppResult<Vec<RunSummary>> {
    runs::list(&state.settings())
}

#[tauri::command]
pub fn read_run(state: tauri::State<AppState>, run_id: String) -> AppResult<RunDetail> {
    runs::read(&state.settings(), &run_id)
}

#[tauri::command]
pub fn read_text_file(state: tauri::State<AppState>, path: String) -> AppResult<TextFile> {
    runs::read_text(&state.settings(), &path)
}

#[tauri::command]
pub fn list_run_statuses() -> Vec<&'static str> {
    runs::statuses()
        .into_iter()
        .filter(|status| *status != "cancelled")
        .collect()
}
