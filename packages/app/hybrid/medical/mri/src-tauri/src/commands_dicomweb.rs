use crate::db;
use crate::dicomweb::{self, DicomwebServer, QidoSeries, QidoStudy, StowResult};
use crate::models::ImportSummary;
use crate::state::AppState;
use crate::workspace;
use std::path::PathBuf;

const DEFAULT_QIDO_LIMIT: u32 = 50;
const MAX_IMPORT_INSTANCES: u32 = 512;
const MAX_EXPORT_INSTANCES: u32 = 256;
const EXPORT_FILE_EXTENSIONS: &[&str] = &["dcm", "ima"];

fn build_server(name: &str, url: &str, auth_header: &str) -> Result<DicomwebServer, String> {
  dicomweb::validate_server(name, url)?;
  Ok(DicomwebServer {
    id: format!("server://{}", uuid::Uuid::new_v4()),
    name: name.trim().to_string(),
    url: url.trim().to_string(),
    auth_header: auth_header.trim().to_string(),
    created_at: db::now(),
  })
}

#[tauri::command]
pub fn add_dicomweb_server(
  state: tauri::State<AppState>,
  name: String,
  url: String,
  auth_header: String,
) -> Result<DicomwebServer, String> {
  let connection = state.lock();
  let server = build_server(&name, &url, &auth_header)?;
  dicomweb::insert_server(&connection, &server)?;
  Ok(server)
}

#[tauri::command]
pub fn list_dicomweb_servers(state: tauri::State<AppState>) -> Result<Vec<DicomwebServer>, String> {
  let connection = state.lock();
  dicomweb::list_servers(&connection)
}

#[tauri::command]
pub fn delete_dicomweb_server(state: tauri::State<AppState>, server_id: String) -> Result<(), String> {
  let connection = state.lock();
  dicomweb::delete_server(&connection, &server_id)
}

#[tauri::command]
pub fn qido_studies(
  state: tauri::State<AppState>,
  server_id: String,
  patient_name: String,
  limit: Option<u32>,
) -> Result<Vec<QidoStudy>, String> {
  let connection = state.lock();
  let server = dicomweb::get_server(&connection, &server_id)?;
  dicomweb::qido_studies(&server, &patient_name, limit.unwrap_or(DEFAULT_QIDO_LIMIT))
}

#[tauri::command]
pub fn qido_series(
  state: tauri::State<AppState>,
  server_id: String,
  study_uid: String,
) -> Result<Vec<QidoSeries>, String> {
  let connection = state.lock();
  let server = dicomweb::get_server(&connection, &server_id)?;
  dicomweb::qido_series(&server, &study_uid)
}

/// WADO-RS import: retrieve a series and register it as a local dataset.
pub fn import_series(
  store: &crate::store::Store,
  connection: &rusqlite::Connection,
  server: &DicomwebServer,
  study_uid: &str,
  series_uid: &str,
  limit: u32,
) -> Result<ImportSummary, String> {
  let uids = dicomweb::qido_instance_uids(server, study_uid, series_uid, limit)?;
  if uids.is_empty() {
    return Err("series has no instances".to_string());
  }
  let staging_dir = std::env::temp_dir().join(format!("mri-dicomweb-{}", uuid::Uuid::new_v4()));
  std::fs::create_dir_all(&staging_dir).map_err(|error| error.to_string())?;
  let mut paths: Vec<String> = Vec::new();
  let result = (|| -> Result<ImportSummary, String> {
    for uid in &uids {
      let instance = dicomweb::wado_instance(server, study_uid, series_uid, uid)?;
      let path = staging_dir.join(format!("{uid}.dcm"));
      std::fs::write(&path, &instance).map_err(|error| error.to_string())?;
      paths.push(path.to_string_lossy().to_string());
    }
    workspace::import_paths(store, connection, &paths, &format!("DICOMweb {series_uid}"))
  })();
  let _ = std::fs::remove_dir_all(&staging_dir);
  let summary = result?;
  provenance_import(connection, &summary.dataset_id, server, study_uid, series_uid, uids.len())?;
  Ok(summary)
}

fn provenance_import(
  connection: &rusqlite::Connection,
  dataset_id: &str,
  server: &DicomwebServer,
  study_uid: &str,
  series_uid: &str,
  instances: usize,
) -> Result<(), String> {
  let inputs = serde_json::json!({
    "server": server.name,
    "url": server.url,
    "studyUid": study_uid,
    "seriesUid": series_uid,
    "instances": instances,
  });
  let outputs = serde_json::json!([dataset_id]);
  crate::provenance::insert_record(
    connection,
    dataset_id,
    "dicomweb-import",
    &inputs.to_string(),
    &outputs.to_string(),
    "{}",
  )
}

#[tauri::command]
pub fn wado_import_series(
  state: tauri::State<AppState>,
  server_id: String,
  study_uid: String,
  series_uid: String,
  limit: Option<u32>,
) -> Result<ImportSummary, String> {
  let connection = state.lock();
  let server = dicomweb::get_server(&connection, &server_id)?;
  import_series(
    &state.store,
    &connection,
    &server,
    &study_uid,
    &series_uid,
    limit.unwrap_or(MAX_IMPORT_INSTANCES).min(MAX_IMPORT_INSTANCES),
  )
}

fn collect_dicom_files(dir: &PathBuf, files: &mut Vec<PathBuf>) {
  let Ok(entries) = std::fs::read_dir(dir) else {
    return;
  };
  for entry in entries.flatten() {
    let path = entry.path();
    if path.is_dir() {
      collect_dicom_files(&path, files);
    } else if path
      .extension()
      .and_then(|value| value.to_str())
      .map(|value| EXPORT_FILE_EXTENSIONS.contains(&value))
      .unwrap_or(false)
    {
      files.push(path);
    }
  }
}

/// STOW-RS export: push the DICOM files of a local dataset to a remote server.
pub fn export_dataset(
  connection: &rusqlite::Connection,
  server: &DicomwebServer,
  dataset_id: &str,
  limit: u32,
) -> Result<StowResult, String> {
  let dir: String = connection
    .query_row("SELECT path FROM datasets WHERE id = ?1", [dataset_id], |row| row.get(0))
    .map_err(|error| error.to_string())?;
  let mut files = Vec::new();
  collect_dicom_files(&PathBuf::from(&dir), &mut files);
  files.sort();
  files.truncate(limit.max(1) as usize);
  if files.is_empty() {
    return Err(format!("no DICOM files found in {dir}"));
  }
  let parts = files
    .iter()
    .map(|path| std::fs::read(path).map_err(|error| error.to_string()))
    .collect::<Result<Vec<Vec<u8>>, String>>()?;
  dicomweb::stow_instances(server, None, &parts)
}

#[tauri::command]
pub fn stow_export_dataset(
  state: tauri::State<AppState>,
  server_id: String,
  dataset_id: String,
  limit: Option<u32>,
) -> Result<StowResult, String> {
  let connection = state.lock();
  let server = dicomweb::get_server(&connection, &server_id)?;
  export_dataset(
    &connection,
    &server,
    &dataset_id,
    limit.unwrap_or(MAX_EXPORT_INSTANCES).min(MAX_EXPORT_INSTANCES),
  )
}

#[cfg(test)]
mod tests {
  use super::*;
  use crate::db;
  use crate::models::Dataset;
  use crate::store::Store;
  use std::io::{Cursor, Read as _, Write as _};
  use std::net::TcpListener;

  fn temp_root() -> PathBuf {
    let root = std::env::temp_dir().join(format!("mri-dw-{}", uuid::Uuid::new_v4()));
    std::fs::create_dir_all(&root).unwrap();
    root
  }

  /// Serves canned responses in order, one TCP connection per response.
  fn serve_many(responses: Vec<Vec<u8>>) -> String {
    let listener = TcpListener::bind("127.0.0.1:0").unwrap();
    let address = listener.local_addr().unwrap();
    std::thread::spawn(move || {
      for response in responses {
        let Ok((mut stream, _)) = listener.accept() else {
          return;
        };
        let mut buffer = [0u8; 16384];
        let _ = stream.read(&mut buffer);
        let _ = stream.write_all(&response);
      }
    });
    format!("http://{address}")
  }

  fn http_ok(content_type: &str, body: &[u8]) -> Vec<u8> {
    let mut response = format!(
      "HTTP/1.1 200 OK\r\nContent-Type: {content_type}\r\nContent-Length: {}\r\nConnection: close\r\n\r\n",
      body.len()
    )
    .into_bytes();
    response.extend_from_slice(body);
    response
  }

  /// Builds a minimal valid MR DICOM instance (explicit VR little endian).
  fn dicom_instance(series_uid: &str, sop_uid: &str) -> Vec<u8> {
    use dicom_core::{PrimitiveValue, Tag, VR};
    use dicom_object::{FileMetaTableBuilder, InMemDicomObject};
    use dicom_object::mem::InMemElement;
    use dicom_transfer_syntax_registry::entries::EXPLICIT_VR_LITTLE_ENDIAN;
    let meta = FileMetaTableBuilder::new()
      .transfer_syntax("1.2.840.10008.1.2.1")
      .media_storage_sop_class_uid("1.2.840.10008.5.1.4.1.1.4")
      .media_storage_sop_instance_uid(sop_uid)
      .build()
      .unwrap();
    let mut object = InMemDicomObject::new_empty();
    for (tag, value) in [
      ((0x0020, 0x000D), "1.2.3"),
      ((0x0020, 0x000E), series_uid),
      ((0x0008, 0x0018), sop_uid),
      ((0x0008, 0x0060), "MR"),
      ((0x0008, 0x103E), "T1 MPRAGE"),
      ((0x0020, 0x0013), "1"),
    ] {
      object.put(InMemElement::new(
        Tag(tag.0, tag.1),
        VR::UI,
        PrimitiveValue::from(value),
      ));
    }
    let mut bytes = vec![0u8; 128];
    {
      use std::io::Write as _;
      let mut cursor = Cursor::new(&mut bytes);
      cursor.set_position(128);
      cursor.write_all(b"DICM").unwrap();
      meta.write(&mut cursor).unwrap();
      object
        .write_dataset_with_ts(&mut cursor, &EXPLICIT_VR_LITTLE_ENDIAN.erased())
        .unwrap();
    }
    bytes
  }

  fn wado_response(payload: &[u8]) -> Vec<u8> {
    let mut body =
      b"--xyz\r\nContent-Type: application/dicom\r\nContent-Length: 0\r\n\r\n".to_vec();
    body.truncate(body.len() - 15);
    body.extend_from_slice(format!("Content-Length: {}\r\n\r\n", payload.len()).as_bytes());
    body.extend_from_slice(payload);
    body.extend_from_slice(b"\r\n--xyz--\r\n");
    http_ok(
      "multipart/related; type=\"application/dicom\"; boundary=xyz",
      &body,
    )
  }

  #[test]
  fn imports_dicomweb_series_into_workspace() {
    let root = temp_root();
    let store = Store::new(root.clone());
    store.ensure_root().unwrap();
    let connection = db::open_in_memory().unwrap();

    let instance_a = dicom_instance("4.5.6", "9.9.1");
    let instance_b = dicom_instance("4.5.6", "9.9.2");
    let qido = br#"[{"00080018":{"Value":["9.9.1"]}},{"00080018":{"Value":["9.9.2"]}}]"#;
    let url = serve_many(vec![
      http_ok("application/dicom+json", qido),
      wado_response(&instance_a),
      wado_response(&instance_b),
    ]);
    let server = DicomwebServer {
      id: "server://test".to_string(),
      name: "PACS".to_string(),
      url,
      auth_header: String::new(),
      created_at: db::now(),
    };

    let summary = import_series(&store, &connection, &server, "1.2.3", "4.5.6", 10)
      .expect("dicomweb import");
    assert_eq!(summary.imported_files, 2);
    assert_eq!(summary.series_count, 1);

    let datasets = db::list_datasets(&connection, "").unwrap();
    assert_eq!(datasets.len(), 1);
    assert_eq!(datasets[0].name, "DICOMweb 4.5.6");

    let provenance = db::list_provenance(&connection, &summary.dataset_id).unwrap();
    assert!(provenance.iter().any(|record| record.activity == "dicomweb-import"));
    std::fs::remove_dir_all(root).ok();
  }

  #[test]
  fn import_series_fails_without_instances() {
    let root = temp_root();
    let store = Store::new(root.clone());
    store.ensure_root().unwrap();
    let connection = db::open_in_memory().unwrap();
    let url = serve_many(vec![http_ok("application/dicom+json", b"[]")]);
    let server = DicomwebServer {
      id: "server://test".to_string(),
      name: "PACS".to_string(),
      url,
      auth_header: String::new(),
      created_at: db::now(),
    };
    assert!(import_series(&store, &connection, &server, "1.2", "4.5", 10).is_err());
    std::fs::remove_dir_all(root).ok();
  }

  #[test]
  fn exports_dataset_instances_via_stow() {
    let root = temp_root();
    let data_dir = root.join("dataset");
    std::fs::create_dir_all(&data_dir).unwrap();
    std::fs::write(data_dir.join("b.dcm"), b"instance-b").unwrap();
    std::fs::write(data_dir.join("a.dcm"), b"instance-a").unwrap();
    std::fs::write(data_dir.join("notes.txt"), b"ignore").unwrap();

    let connection = db::open_in_memory().unwrap();
    db::insert_dataset(
      &connection,
      &Dataset {
        id: "dataset://exp".to_string(),
        name: "Export me".to_string(),
        description: String::new(),
        source_path: String::new(),
        path: data_dir.to_string_lossy().to_string(),
        created_at: db::now(),
        updated_at: db::now(),
      },
    )
    .unwrap();

    let report = br#"[{"00081199":{"Value":[{"00081190":{"Value":["1.2"]}},{"00081190":{"Value":["3.4"]}}]}}]"#;
    let url = serve_many(vec![http_ok("application/dicom+json", report)]);
    let server = DicomwebServer {
      id: "server://test".to_string(),
      name: "PACS".to_string(),
      url,
      auth_header: String::new(),
      created_at: db::now(),
    };

    let result = export_dataset(&connection, &server, "dataset://exp", 32).expect("stow export");
    assert_eq!(result.stored, 2);
    assert_eq!(result.failed, 0);
    std::fs::remove_dir_all(root).ok();
  }

  #[test]
  fn export_dataset_fails_without_dicom_files() {
    let root = temp_root();
    let connection = db::open_in_memory().unwrap();
    db::insert_dataset(
      &connection,
      &Dataset {
        id: "dataset://empty".to_string(),
        name: "Empty".to_string(),
        description: String::new(),
        source_path: String::new(),
        path: root.to_string_lossy().to_string(),
        created_at: db::now(),
        updated_at: db::now(),
      },
    )
    .unwrap();
    let server = DicomwebServer {
      id: "server://test".to_string(),
      name: "PACS".to_string(),
      url: "http://localhost:1".to_string(),
      auth_header: String::new(),
      created_at: db::now(),
    };
    assert!(export_dataset(&connection, &server, "dataset://empty", 32).is_err());
    std::fs::remove_dir_all(root).ok();
  }
}
