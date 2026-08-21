use crate::models::{Dataset, DatasetDetail, ProvenanceRecord, SeriesInfo, StudyInfo};
use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use std::path::Path;

const MIGRATIONS: &[&str] = &[
  "CREATE TABLE IF NOT EXISTS datasets (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL,
     description TEXT NOT NULL DEFAULT '',
     source_path TEXT NOT NULL,
     path TEXT NOT NULL,
     created_at INTEGER NOT NULL,
     updated_at INTEGER NOT NULL
   );
   CREATE TABLE IF NOT EXISTS series (
     id TEXT PRIMARY KEY,
     dataset_id TEXT NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
     study_uid TEXT NOT NULL DEFAULT '',
     study_date TEXT NOT NULL DEFAULT '',
     series_uid TEXT NOT NULL DEFAULT '',
     modality TEXT NOT NULL DEFAULT '',
     series_description TEXT NOT NULL DEFAULT '',
     kind TEXT NOT NULL,
     file_count INTEGER NOT NULL DEFAULT 0,
     rows INTEGER NOT NULL DEFAULT 0,
     columns INTEGER NOT NULL DEFAULT 0,
     slice_count INTEGER NOT NULL DEFAULT 0,
      bits_allocated INTEGER NOT NULL DEFAULT 16,
      signed_pixels INTEGER NOT NULL DEFAULT 1,
      voxel_x REAL NOT NULL DEFAULT 0,
      voxel_y REAL NOT NULL DEFAULT 0,
      voxel_z REAL NOT NULL DEFAULT 0,
      slice_thickness REAL NOT NULL DEFAULT 0,
      orientation TEXT NOT NULL DEFAULT '',
      te_ms REAL NOT NULL DEFAULT 0,
      tr_ms REAL NOT NULL DEFAULT 0,
      flip_angle REAL NOT NULL DEFAULT 0,
      field_strength_t REAL NOT NULL DEFAULT 0,
      manufacturer TEXT NOT NULL DEFAULT '',
      model TEXT NOT NULL DEFAULT '',
      metadata_json TEXT NOT NULL DEFAULT '{}',
      normalized_json TEXT NOT NULL DEFAULT '{}',
      path TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_series_dataset ON series(dataset_id);
    CREATE TABLE IF NOT EXISTS provenance (
      id TEXT PRIMARY KEY,
      dataset_id TEXT NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
      activity TEXT NOT NULL,
      inputs_json TEXT NOT NULL,
      outputs_json TEXT NOT NULL,
      parameters_json TEXT NOT NULL,
      software TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS protocols (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      definition_json TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS pipelines (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      version INTEGER NOT NULL,
      definition_json TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_pipelines_name ON pipelines(name);
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      kind TEXT NOT NULL,
      status TEXT NOT NULL,
      progress REAL NOT NULL DEFAULT 0,
      attempts INTEGER NOT NULL DEFAULT 0,
      logs_json TEXT NOT NULL DEFAULT '[]',
      inputs_json TEXT NOT NULL DEFAULT '{}',
      outputs_json TEXT NOT NULL DEFAULT '[]',
      error TEXT,
      created_at INTEGER NOT NULL,
      started_at INTEGER,
      finished_at INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_jobs_created ON jobs(created_at);
    CREATE TABLE IF NOT EXISTS models (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      version TEXT NOT NULL,
      task TEXT NOT NULL,
      runtime TEXT NOT NULL,
      source TEXT NOT NULL,
      license TEXT NOT NULL DEFAULT '',
      input_json TEXT NOT NULL DEFAULT '{}',
      output_json TEXT NOT NULL DEFAULT '{}',
      created_at INTEGER NOT NULL,
      UNIQUE(name, version)
    );",
];

pub fn open(path: &Path) -> Result<Connection, String> {
  let connection = Connection::open(path).map_err(|error| error.to_string())?;
  connection
    .execute_batch("PRAGMA foreign_keys = ON;")
    .map_err(|error| error.to_string())?;
  migrate(&connection)?;
  Ok(connection)
}

pub fn open_in_memory() -> Result<Connection, String> {
  let connection = Connection::open_in_memory().map_err(|error| error.to_string())?;
  migrate(&connection)?;
  Ok(connection)
}

fn migrate(connection: &Connection) -> Result<(), String> {
  for migration in MIGRATIONS {
    connection
      .execute_batch(migration)
      .map_err(|error| error.to_string())?;
  }
  Ok(())
}

pub fn now() -> i64 {
  std::time::SystemTime::now()
    .duration_since(std::time::UNIX_EPOCH)
    .map(|value| value.as_secs() as i64)
    .unwrap_or(0)
}

pub fn insert_dataset(connection: &Connection, dataset: &Dataset) -> Result<(), String> {
  connection
    .execute(
      "INSERT INTO datasets (id, name, description, source_path, path, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
      rusqlite::params![
        dataset.id,
        dataset.name,
        dataset.description,
        dataset.source_path,
        dataset.path,
        dataset.created_at,
        dataset.updated_at
      ],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn list_datasets(connection: &Connection, query: &str) -> Result<Vec<Dataset>, String> {
  let pattern = format!("%{query}%");
  let mut statement = connection
    .prepare(
      "SELECT id, name, description, source_path, path, created_at, updated_at
       FROM datasets WHERE name LIKE ?1 ORDER BY updated_at DESC",
    )
    .map_err(|error| error.to_string())?;
  let rows = statement
    .query_map([&pattern], |row| {
      Ok(Dataset {
        id: row.get(0)?,
        name: row.get(1)?,
        description: row.get(2)?,
        source_path: row.get(3)?,
        path: row.get(4)?,
        created_at: row.get(5)?,
        updated_at: row.get(6)?,
      })
    })
    .map_err(|error| error.to_string())?;
  rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

pub fn get_dataset(connection: &Connection, id: &str) -> Result<Dataset, String> {
  connection
    .query_row(
      "SELECT id, name, description, source_path, path, created_at, updated_at
       FROM datasets WHERE id = ?1",
      [id],
      |row| {
        Ok(Dataset {
          id: row.get(0)?,
          name: row.get(1)?,
          description: row.get(2)?,
          source_path: row.get(3)?,
          path: row.get(4)?,
          created_at: row.get(5)?,
          updated_at: row.get(6)?,
        })
      },
    )
    .map_err(|error| error.to_string())
}

pub fn delete_dataset(connection: &Connection, id: &str) -> Result<(), String> {
  connection
    .execute("DELETE FROM datasets WHERE id = ?1", [id])
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn insert_series(connection: &Connection, series: &SeriesRow) -> Result<(), String> {
  connection
    .execute(
      "INSERT INTO series (id, dataset_id, study_uid, study_date, series_uid, modality,
         series_description, kind, file_count, rows, columns, slice_count, bits_allocated,
         signed_pixels, voxel_x, voxel_y, voxel_z, slice_thickness, orientation, te_ms, tr_ms,
         flip_angle, field_strength_t, manufacturer, model, metadata_json, normalized_json, path)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17,
         ?18, ?19, ?20, ?21, ?22, ?23, ?24, ?25, ?26, ?27, ?28)",
      rusqlite::params![
        series.info.id,
        series.info.dataset_id,
        series.info.study_uid,
        series.info.study_date,
        series.info.series_uid,
        series.info.modality,
        series.info.series_description,
        series.info.kind,
        series.info.file_count,
        series.info.rows,
        series.info.columns,
        series.info.slice_count,
        series.info.bits_allocated,
        series.info.signed_pixels as i64,
        series.info.voxel_x,
        series.info.voxel_y,
        series.info.voxel_z,
        series.info.slice_thickness,
        series.info.orientation,
        series.info.te_ms,
        series.info.tr_ms,
        series.info.flip_angle,
        series.info.field_strength_t,
        series.info.manufacturer,
        series.info.model,
        series.metadata_json,
        series.normalized_json,
        series.path
      ],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

#[derive(Debug, Clone)]
pub struct SeriesRow {
  pub info: SeriesInfo,
  pub metadata_json: String,
  pub normalized_json: String,
  pub path: String,
}

fn row_to_series(row: &rusqlite::Row) -> rusqlite::Result<SeriesInfo> {
  Ok(SeriesInfo {
    id: row.get(0)?,
    dataset_id: row.get(1)?,
    study_uid: row.get(2)?,
    study_date: row.get(3)?,
    series_uid: row.get(4)?,
    modality: row.get(5)?,
    series_description: row.get(6)?,
    kind: row.get(7)?,
    file_count: row.get(8)?,
    rows: row.get(9)?,
    columns: row.get(10)?,
    slice_count: row.get(11)?,
    bits_allocated: row.get(12)?,
    signed_pixels: row.get::<_, i64>(13)? != 0,
    voxel_x: row.get(14)?,
    voxel_y: row.get(15)?,
    voxel_z: row.get(16)?,
    slice_thickness: row.get(17)?,
    orientation: row.get(18)?,
    te_ms: row.get(19)?,
    tr_ms: row.get(20)?,
    flip_angle: row.get(21)?,
    field_strength_t: row.get(22)?,
    manufacturer: row.get(23)?,
    model: row.get(24)?,
  })
}

const SERIES_COLUMNS: &str =
  "id, dataset_id, study_uid, study_date, series_uid, modality, series_description, kind,
   file_count, rows, columns, slice_count, bits_allocated, signed_pixels, voxel_x, voxel_y,
   voxel_z, slice_thickness, orientation, te_ms, tr_ms, flip_angle, field_strength_t,
   manufacturer, model";

pub fn list_series_by_dataset(
  connection: &Connection,
  dataset_id: &str,
) -> Result<Vec<SeriesInfo>, String> {
  let sql = format!("SELECT {SERIES_COLUMNS} FROM series WHERE dataset_id = ?1 ORDER BY id");
  let mut statement = connection.prepare(&sql).map_err(|error| error.to_string())?;
  let rows = statement
    .query_map([dataset_id], row_to_series)
    .map_err(|error| error.to_string())?;
  rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

pub fn get_series(connection: &Connection, id: &str) -> Result<(SeriesInfo, String, String), String> {
  let sql = format!(
    "SELECT {SERIES_COLUMNS}, metadata_json, normalized_json, path FROM series WHERE id = ?1"
  );
  connection
    .query_row(&sql, [id], |row| {
      Ok((
        row_to_series(row)?,
        row.get(25)?,
        row.get::<_, String>(27)?,
      ))
    })
    .map_err(|error| error.to_string())
}

pub fn list_studies(connection: &Connection, dataset_id: &str) -> Result<Vec<StudyInfo>, String> {
  let mut statement = connection
    .prepare(
      "SELECT study_uid, MAX(study_date), COUNT(*) FROM series
       WHERE dataset_id = ?1 AND study_uid != '' GROUP BY study_uid ORDER BY study_uid",
    )
    .map_err(|error| error.to_string())?;
  let rows = statement
    .query_map([dataset_id], |row| {
      Ok(StudyInfo {
        study_uid: row.get(0)?,
        study_date: row.get(1)?,
        series_count: row.get(2)?,
      })
    })
    .map_err(|error| error.to_string())?;
  rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

pub fn dataset_detail(connection: &Connection, id: &str) -> Result<DatasetDetail, String> {
  Ok(DatasetDetail {
    studies: list_studies(connection, id)?,
    series: list_series_by_dataset(connection, id)?,
    dataset: get_dataset(connection, id)?,
  })
}

pub fn insert_provenance(
  connection: &Connection,
  record: &ProvenanceRecord,
) -> Result<(), String> {
  connection
    .execute(
      "INSERT INTO provenance (id, dataset_id, activity, inputs_json, outputs_json,
         parameters_json, software, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
      rusqlite::params![
        record.id,
        record.dataset_id,
        record.activity,
        record.inputs_json,
        record.outputs_json,
        record.parameters_json,
        record.software,
        record.created_at
      ],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn list_provenance(
  connection: &Connection,
  dataset_id: &str,
) -> Result<Vec<ProvenanceRecord>, String> {
  let mut statement = connection
    .prepare(
      "SELECT id, dataset_id, activity, inputs_json, outputs_json, parameters_json,
         software, created_at FROM provenance WHERE dataset_id = ?1 ORDER BY created_at",
    )
    .map_err(|error| error.to_string())?;
  let rows = statement
    .query_map([dataset_id], |row| {
      Ok(ProvenanceRecord {
        id: row.get(0)?,
        dataset_id: row.get(1)?,
        activity: row.get(2)?,
        inputs_json: row.get(3)?,
        outputs_json: row.get(4)?,
        parameters_json: row.get(5)?,
        software: row.get(6)?,
        created_at: row.get(7)?,
      })
    })
    .map_err(|error| error.to_string())?;
  rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProtocolRow {
  pub id: String,
  pub name: String,
  pub definition_json: String,
  pub created_at: i64,
}

pub fn insert_protocol(connection: &Connection, protocol: &ProtocolRow) -> Result<(), String> {
  connection
    .execute(
      "INSERT INTO protocols (id, name, definition_json, created_at) VALUES (?1, ?2, ?3, ?4)",
      rusqlite::params![protocol.id, protocol.name, protocol.definition_json, protocol.created_at],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn list_protocols(connection: &Connection) -> Result<Vec<ProtocolRow>, String> {
  let mut statement = connection
    .prepare("SELECT id, name, definition_json, created_at FROM protocols ORDER BY created_at")
    .map_err(|error| error.to_string())?;
  let rows = statement
    .query_map([], |row| {
      Ok(ProtocolRow {
        id: row.get(0)?,
        name: row.get(1)?,
        definition_json: row.get(2)?,
        created_at: row.get(3)?,
      })
    })
    .map_err(|error| error.to_string())?;
  rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

pub fn get_protocol(connection: &Connection, id: &str) -> Result<ProtocolRow, String> {
  connection
    .query_row(
      "SELECT id, name, definition_json, created_at FROM protocols WHERE id = ?1",
      [id],
      |row| {
        Ok(ProtocolRow {
          id: row.get(0)?,
          name: row.get(1)?,
          definition_json: row.get(2)?,
          created_at: row.get(3)?,
        })
      },
    )
    .map_err(|error| error.to_string())
}

pub fn delete_protocol(connection: &Connection, id: &str) -> Result<(), String> {
  connection
    .execute("DELETE FROM protocols WHERE id = ?1", [id])
    .map_err(|error| error.to_string())?;
  Ok(())
}

#[cfg(test)]
mod tests {
  use super::*;

  fn sample_dataset(id: &str, name: &str) -> Dataset {
    Dataset {
      id: id.to_string(),
      name: name.to_string(),
      description: String::new(),
      source_path: "/tmp/src".to_string(),
      path: "/tmp/dst".to_string(),
      created_at: 1,
      updated_at: 2,
    }
  }

  #[test]
  fn migrations_are_idempotent() {
    let connection = open_in_memory().unwrap();
    migrate(&connection).unwrap();
  }

  #[test]
  fn dataset_crud_roundtrip() {
    let connection = open_in_memory().unwrap();
    insert_dataset(&connection, &sample_dataset("dataset://a", "Study A")).unwrap();
    assert_eq!(list_datasets(&connection, "").unwrap().len(), 1);
    assert_eq!(list_datasets(&connection, "study").unwrap().len(), 1);
    assert_eq!(list_datasets(&connection, "zzz").unwrap().len(), 0);
    let fetched = get_dataset(&connection, "dataset://a").unwrap();
    assert_eq!(fetched.name, "Study A");
    delete_dataset(&connection, "dataset://a").unwrap();
    assert!(get_dataset(&connection, "dataset://a").is_err());
  }

  #[test]
  fn series_and_studies_grouping() {
    let connection = open_in_memory().unwrap();
    insert_dataset(&connection, &sample_dataset("dataset://a", "A")).unwrap();
    let series = SeriesRow {
      info: SeriesInfo {
        id: "series://s1".to_string(),
        dataset_id: "dataset://a".to_string(),
        study_uid: "1.2.3".to_string(),
        study_date: "20260101".to_string(),
        series_uid: "9.9.1".to_string(),
        modality: "MR".to_string(),
        series_description: "T1".to_string(),
        kind: "dicom".to_string(),
        file_count: 3,
        rows: 256,
        columns: 256,
        slice_count: 3,
        bits_allocated: 16,
        signed_pixels: false,
        ..Default::default()
      },
      metadata_json: "{}".to_string(),
      normalized_json: "{}".to_string(),
      path: "/tmp/s1".to_string(),
    };
    insert_series(&connection, &series).unwrap();
    let all = list_series_by_dataset(&connection, "dataset://a").unwrap();
    assert_eq!(all.len(), 1);
    assert_eq!(all[0].file_count, 3);
    let studies = list_studies(&connection, "dataset://a").unwrap();
    assert_eq!(studies.len(), 1);
    assert_eq!(studies[0].series_count, 1);
    let detail = dataset_detail(&connection, "dataset://a").unwrap();
    assert_eq!(detail.dataset.id, "dataset://a");
    let (_, metadata_json, _) = get_series(&connection, "series://s1").unwrap();
    assert_eq!(metadata_json, "{}");
  }

  #[test]
  fn provenance_roundtrip() {
    let connection = open_in_memory().unwrap();
    insert_dataset(&connection, &sample_dataset("dataset://a", "A")).unwrap();
    let record = ProvenanceRecord {
      id: "artifact://p1".to_string(),
      dataset_id: "dataset://a".to_string(),
      activity: "import".to_string(),
      inputs_json: "[]".to_string(),
      outputs_json: "[]".to_string(),
      parameters_json: "{}".to_string(),
      software: "mri 0.0.1".to_string(),
      created_at: 42,
    };
    insert_provenance(&connection, &record).unwrap();
    let records = list_provenance(&connection, "dataset://a").unwrap();
    assert_eq!(records.len(), 1);
    assert_eq!(records[0].activity, "import");
  }

  #[test]
  fn deleting_dataset_cascades_series() {
    let connection = open_in_memory().unwrap();
    insert_dataset(&connection, &sample_dataset("dataset://a", "A")).unwrap();
    let series = SeriesRow {
      info: SeriesInfo {
        id: "series://s1".to_string(),
        dataset_id: "dataset://a".to_string(),
        kind: "nifti".to_string(),
        slice_count: 1,
        signed_pixels: true,
        ..Default::default()
      },
      metadata_json: "{}".to_string(),
      normalized_json: "{}".to_string(),
      path: "/tmp/s1".to_string(),
    };
    insert_series(&connection, &series).unwrap();
    delete_dataset(&connection, "dataset://a").unwrap();
    assert!(list_series_by_dataset(&connection, "dataset://a").is_ok());
    assert!(get_series(&connection, "series://s1").is_err());
  }
}
