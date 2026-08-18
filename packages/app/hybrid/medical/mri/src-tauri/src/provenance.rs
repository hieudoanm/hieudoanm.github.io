use crate::db::{self};
use crate::models::ProvenanceRecord;
use crate::workspace::SOFTWARE;
use rusqlite::Connection;

pub fn record_import(
  connection: &Connection,
  dataset_id: &str,
  inputs: &[String],
  outputs: &str,
) -> Result<(), String> {
  let inputs_json = serde_json::to_string(inputs).unwrap_or_else(|_| "[]".to_string());
  let outputs_json = serde_json::to_string(&[outputs]).unwrap_or_else(|_| "[]".to_string());
  insert_record(connection, dataset_id, "import", &inputs_json, &outputs_json, "{}")
}

/// Generic provenance entry for any activity (import, qc, validation, ...).
pub fn insert_record(
  connection: &Connection,
  dataset_id: &str,
  activity: &str,
  inputs_json: &str,
  outputs_json: &str,
  parameters_json: &str,
) -> Result<(), String> {
  let record = ProvenanceRecord {
    id: format!("artifact://{}/provenance-{}", dataset_id.trim_start_matches("dataset://"), uuid::Uuid::new_v4()),
    dataset_id: dataset_id.to_string(),
    activity: activity.to_string(),
    inputs_json: inputs_json.to_string(),
    outputs_json: outputs_json.to_string(),
    parameters_json: parameters_json.to_string(),
    software: SOFTWARE.to_string(),
    created_at: db::now(),
  };
  db::insert_provenance(connection, &record)
}

#[cfg(test)]
mod tests {
  use super::*;
  use crate::db;

  #[test]
  fn records_import_provenance() {
    use crate::models::Dataset;
    let connection = db::open_in_memory().unwrap();
    db::insert_dataset(
      &connection,
      &Dataset {
        id: "dataset://abc".to_string(),
        name: "A".to_string(),
        description: String::new(),
        source_path: String::new(),
        path: "/tmp/abc".to_string(),
        created_at: 0,
        updated_at: 0,
      },
    )
    .unwrap();
    record_import(&connection, "dataset://abc", &["/tmp/a.nii".to_string()], "1 series").unwrap();
    let records = db::list_provenance(&connection, "dataset://abc").unwrap();
    assert_eq!(records.len(), 1);
    assert_eq!(records[0].activity, "import");
    assert!(records[0].inputs_json.contains("a.nii"));
    assert!(records[0].outputs_json.contains("1 series"));
    assert_eq!(records[0].software, SOFTWARE);
  }
}
