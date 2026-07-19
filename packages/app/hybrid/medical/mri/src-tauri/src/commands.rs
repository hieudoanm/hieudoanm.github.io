use crate::db;
use crate::models::{Dataset, DatasetDetail, ImportSummary, ProvenanceRecord, SeriesMetadata};
use crate::state::AppState;
use crate::{viewer, workspace};
use tauri::ipc::{InvokeResponseBody, Response};
use tauri::AppHandle;
use tauri_plugin_dialog::DialogExt;

const SCAN_TITLE: &str = "MRI study files";
const SCAN_FILTER: &str = "MRI study files (*.dcm, *.ima, *.nii, *.nii.gz)";
const SCAN_EXTENSIONS: &[&str] = &["dcm", "ima", "nii", "gz"];

#[tauri::command]
pub fn pick_scan_files(app: AppHandle) -> Result<Vec<String>, String> {
  let Some(selected) = app
    .dialog()
    .file()
    .set_title(SCAN_TITLE)
    .add_filter(SCAN_FILTER, SCAN_EXTENSIONS)
    .blocking_pick_files()
  else {
    return Ok(Vec::new());
  };
  Ok(selected
    .into_iter()
    .filter_map(|file_path| file_path.into_path().ok())
    .map(|path| path.to_string_lossy().to_string())
    .collect())
}

#[tauri::command]
pub fn import_files(
  state: tauri::State<AppState>,
  paths: Vec<String>,
  name: String,
) -> Result<ImportSummary, String> {
  let connection = state.lock();
  workspace::import_paths(&state.store, &connection, &paths, &name)
}

#[tauri::command]
pub fn list_datasets(state: tauri::State<AppState>, query: String) -> Result<Vec<Dataset>, String> {
  let connection = state.lock();
  db::list_datasets(&connection, &query)
}

#[tauri::command]
pub fn get_dataset_detail(
  state: tauri::State<AppState>,
  dataset_id: String,
) -> Result<DatasetDetail, String> {
  let connection = state.lock();
  db::dataset_detail(&connection, &dataset_id)
}

#[tauri::command]
pub fn delete_dataset(state: tauri::State<AppState>, dataset_id: String) -> Result<(), String> {
  let connection = state.lock();
  workspace::delete_dataset(&state.store, &connection, &dataset_id)
}

#[tauri::command]
pub fn get_series_metadata(
  state: tauri::State<AppState>,
  series_id: String,
) -> Result<SeriesMetadata, String> {
  let connection = state.lock();
  let (info, metadata_json, normalized_json) = db::get_series(&connection, &series_id)?;
  let original_tags =
    serde_json::from_str(&metadata_json).unwrap_or(serde_json::Value::Null);
  let normalized = serde_json::from_str(&normalized_json)
    .unwrap_or(crate::normalize::normalize(&info.modality, &info.series_description));
  let classification = crate::classifier::classify(&crate::classifier::ClassifyInput {
    modality: info.modality.clone(),
    description: info.series_description.clone(),
    tr_ms: info.tr_ms,
    te_ms: info.te_ms,
    flip_angle: info.flip_angle,
  });
  Ok(SeriesMetadata {
    series: info,
    normalized,
    original_tags,
    classification,
  })
}

#[tauri::command]
pub fn get_provenance(
  state: tauri::State<AppState>,
  dataset_id: String,
) -> Result<Vec<ProvenanceRecord>, String> {
  let connection = state.lock();
  db::list_provenance(&connection, &dataset_id)
}

/// Raw binary IPC: the slice crosses as bytes, never serialized JSON.
#[tauri::command]
pub fn read_slice(
  state: tauri::State<AppState>,
  series_id: String,
  index: i64,
) -> Result<Response, String> {
  let connection = state.lock();
  let bytes = viewer::read_slice(&connection, &series_id, index)?;
  Ok(Response::new(InvokeResponseBody::Raw(bytes)))
}
