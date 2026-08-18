use crate::db;
use crate::import_dicom;
use crate::import_nifti;
use rusqlite::Connection;
use std::path::PathBuf;

/// Extract one slice of a series as raw little-endian u16 bytes.
/// Volumes stay on disk; only the requested slice crosses the IPC boundary.
pub fn read_slice(
  connection: &Connection,
  series_id: &str,
  index: i64,
) -> Result<Vec<u8>, String> {
  let (info, metadata_json, path) = db::get_series(connection, series_id)?;
  read_slice_from(connection, &info, &metadata_json, &path, index)
}

/// Slice access with preloaded series facts; shared by viewer and QC.
pub fn read_slice_from(
  _connection: &Connection,
  info: &crate::models::SeriesInfo,
  metadata_json: &str,
  path: &str,
  index: i64,
) -> Result<Vec<u8>, String> {
  if index < 0 || index >= info.slice_count {
    return Err(format!(
      "slice {index} out of range (0..{})",
      info.slice_count
    ));
  }
  let dir = PathBuf::from(path);
  match info.kind.as_str() {
    "nifti" => read_nifti_slice(&dir, index as usize),
    "dicom" => read_dicom_slice(&dir, metadata_json, index as usize),
    other => Err(format!("unsupported series kind: {other}")),
  }
}

fn volume_file(dir: &std::path::Path) -> Result<PathBuf, String> {
  std::fs::read_dir(dir)
    .map_err(|error| error.to_string())?
    .filter_map(|entry| entry.ok())
    .map(|entry| entry.path())
    .find(|path| import_nifti::looks_like_nifti(path))
    .ok_or_else(|| "no NIfTI volume in series directory".to_string())
}

fn read_nifti_slice(dir: &std::path::Path, index: usize) -> Result<Vec<u8>, String> {
  let path = volume_file(dir)?;
  let header = import_nifti::read_header(&path)?;
  let volume = import_nifti::open_volume(&path, &header)?;
  import_nifti::slice_u16_le(&volume, index)
}

fn read_dicom_slice(
  dir: &std::path::Path,
  metadata_json: &str,
  index: usize,
) -> Result<Vec<u8>, String> {
  let instances = instance_order(metadata_json)?;
  let file_name = instances
    .get(index)
    .ok_or_else(|| format!("instance {index} not found"))?;
  import_dicom::read_pixel_data(&dir.join(file_name))
}

fn instance_order(metadata_json: &str) -> Result<Vec<String>, String> {
  let parsed: serde_json::Value =
    serde_json::from_str(metadata_json).map_err(|error| error.to_string())?;
  parsed
    .get("instances")
    .and_then(|value| value.as_array())
    .map(|items| {
      items
        .iter()
        .filter_map(|item| item.as_str().map(str::to_string))
        .collect()
    })
    .ok_or_else(|| "series metadata has no instance order".to_string())
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn rejects_out_of_range_slices() {
    let connection = db::open_in_memory().unwrap();
    assert!(read_slice(&connection, "series://missing", 0).is_err());
  }

  #[test]
  fn parses_instance_order() {
    let order = instance_order(r#"{"instances":["b.dcm","a.dcm"]}"#).unwrap();
    assert_eq!(order, vec!["b.dcm", "a.dcm"]);
    assert!(instance_order("{}").is_err());
    assert!(instance_order("not json").is_err());
  }
}
