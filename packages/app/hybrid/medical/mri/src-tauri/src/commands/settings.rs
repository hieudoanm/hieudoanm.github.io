use crate::error::{AppError, AppResult};
use crate::services::doctor;
use crate::services::settings::Settings;
use crate::state::AppState;
use tauri::AppHandle;
use tauri_plugin_dialog::DialogExt;

const FOLDER_TITLE: &str = "Choose the pipeline project folder";

#[tauri::command]
pub fn get_settings(state: tauri::State<AppState>) -> Settings {
    state.settings()
}

#[tauri::command]
pub fn update_settings(state: tauri::State<AppState>, settings: Settings) -> AppResult<Settings> {
    let next = settings;
    if let Some(root) = &next.project_root {
        let path = std::path::PathBuf::from(root);
        if !path.is_dir() {
            return Err(AppError::ProjectRootMissingOnDisk(root.clone()));
        }
    }
    state.save_settings(next).map_err(AppError::Message)
}

#[tauri::command]
pub fn pick_project_folder(app: AppHandle) -> Option<String> {
    let selected = app
        .dialog()
        .file()
        .set_title(FOLDER_TITLE)
        .blocking_pick_folder()?;
    selected
        .into_path()
        .ok()
        .map(|path| path.to_string_lossy().to_string())
}

#[tauri::command]
pub fn check_setup(
    state: tauri::State<AppState>,
) -> Result<crate::domain::doctor::DoctorReport, AppError> {
    doctor::check(&state.settings()).map_err(AppError::Doctor)
}
