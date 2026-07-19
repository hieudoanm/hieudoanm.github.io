use crate::registry::{self, ModelDefinition, ModelRecord};
use crate::state::AppState;
use serde_json::json;
use tauri::State;

fn store_model(
  connection: &rusqlite::Connection,
  definition: &ModelDefinition,
) -> Result<ModelRecord, String> {
  let record = ModelRecord::from(definition);
  registry::upsert_model(connection, &record)?;
  // Upserts keep the existing stable id for a known (name, version).
  registry::get_model_by_name_version(connection, &record.name, &record.version)
}

#[tauri::command]
pub fn register_model(state: State<'_, AppState>, definition_json: String) -> Result<ModelRecord, String> {
  let definition = registry::parse_definition(&definition_json)?;
  store_model(&state.lock(), &definition)
}

#[tauri::command]
pub fn list_models(state: State<'_, AppState>) -> Result<Vec<ModelRecord>, String> {
  registry::list_models(&state.lock())
}

#[tauri::command]
pub fn delete_model(state: State<'_, AppState>, model_id: String) -> Result<(), String> {
  registry::delete_model(&state.lock(), &model_id)
}

#[tauri::command]
pub fn is_runtime_available(state: State<'_, AppState>, runtime: String) -> Result<bool, String> {
  let _ = &state;
  Ok(registry::runtime_available(&runtime))
}

#[tauri::command]
pub fn run_model(
  state: State<'_, AppState>,
  model_id: String,
  dataset_id: Option<String>,
  input_ref: Option<String>,
) -> Result<crate::jobs::JobRecord, String> {
  {
    let connection = state.lock();
    // Fail fast when the model is not registered.
    registry::get_model(&connection, &model_id)?;
  }
  let payload = json!({
    "modelId": model_id,
    "datasetId": dataset_id,
    "inputRef": input_ref
  });
  state.jobs.submit("model", &payload.to_string())
}
