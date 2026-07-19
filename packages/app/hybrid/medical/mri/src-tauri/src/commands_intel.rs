use crate::compare::CompareCompatibility;
use crate::db::{self, ProtocolRow};
use crate::models::StudyAnalysis;
use crate::protocol::ProtocolReport;
use crate::protocol::{self, ProtocolDefinition};
use crate::qc;
use crate::state::AppState;
use crate::{analysis, compare, provenance};

#[tauri::command]
pub fn get_study_analysis(
  state: tauri::State<AppState>,
  dataset_id: String,
  study_uid: String,
) -> Result<StudyAnalysis, String> {
  let connection = state.lock();
  let detail = db::dataset_detail(&connection, &dataset_id)?;
  let series: Vec<_> = detail
    .series
    .into_iter()
    .filter(|info| info.study_uid == study_uid)
    .collect();
  Ok(analysis::analyze_study(&study_uid, &series))
}

#[tauri::command]
pub fn list_protocols(state: tauri::State<AppState>) -> Result<Vec<ProtocolRow>, String> {
  let connection = state.lock();
  db::list_protocols(&connection)
}

/// `definition_json` is parsed and validated before storage; malformed
/// definitions never reach the database.
#[tauri::command]
pub fn create_protocol(
  state: tauri::State<AppState>,
  definition_json: String,
) -> Result<ProtocolRow, String> {
  let definition: ProtocolDefinition =
    serde_json::from_str(&definition_json).map_err(|error| format!("invalid protocol: {error}"))?;
  if definition.name.trim().is_empty() {
    return Err("protocol name must not be empty".to_string());
  }
  let connection = state.lock();
  let row = ProtocolRow {
    id: format!("protocol://{}", uuid::Uuid::new_v4()),
    name: definition.name.trim().to_string(),
    definition_json: serde_json::to_string(&definition).map_err(|e| e.to_string())?,
    created_at: db::now(),
  };
  db::insert_protocol(&connection, &row)?;
  Ok(row)
}

#[tauri::command]
pub fn delete_protocol(
  state: tauri::State<AppState>,
  protocol_id: String,
) -> Result<(), String> {
  let connection = state.lock();
  db::delete_protocol(&connection, &protocol_id)
}

#[tauri::command]
pub fn validate_dataset(
  state: tauri::State<AppState>,
  dataset_id: String,
  protocol_id: String,
) -> Result<ProtocolReport, String> {
  let connection = state.lock();
  let stored = db::get_protocol(&connection, &protocol_id)?;
  let definition: ProtocolDefinition = serde_json::from_str(&stored.definition_json)
    .map_err(|error| format!("stored protocol is invalid: {error}"))?;
  let detail = db::dataset_detail(&connection, &dataset_id)?;
  let report = protocol::validate(&definition, &detail.series);
  record_validation(&connection, &dataset_id, &stored.name, &report)?;
  Ok(report)
}

fn record_validation(
  connection: &rusqlite::Connection,
  dataset_id: &str,
  protocol_name: &str,
  report: &ProtocolReport,
) -> Result<(), String> {
  let outputs = serde_json::json!({ "report": report });
  let parameters = serde_json::json!({ "protocol": protocol_name });
  provenance::insert_record(
    connection,
    dataset_id,
    "protocol-validation",
    "[]",
    &outputs.to_string(),
    &parameters.to_string(),
  )
}

#[tauri::command]
pub fn run_qc(state: tauri::State<AppState>, series_id: String) -> Result<qc::QcReport, String> {
  let connection = state.lock();
  let report = qc::run_qc(&connection, &series_id)?;
  let outputs = serde_json::json!({ "report": report });
  provenance::insert_record(
    &connection,
    &report.dataset_id,
    "qc",
    &format!("[\"{series_id}\"]"),
    &outputs.to_string(),
    "{}",
  )?;
  Ok(report)
}

#[tauri::command]
pub fn compare_compatibility(
  state: tauri::State<AppState>,
  left_series_id: String,
  right_series_id: String,
) -> Result<CompareCompatibility, String> {
  let connection = state.lock();
  let (left, _, _) = db::get_series(&connection, &left_series_id)?;
  let (right, _, _) = db::get_series(&connection, &right_series_id)?;
  Ok(compare::compare_compatibility(&left, &right))
}
