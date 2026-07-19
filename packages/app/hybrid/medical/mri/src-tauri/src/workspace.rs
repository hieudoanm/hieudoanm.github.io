use crate::db::{self, SeriesRow};
use crate::import_dicom::{self, DicomFileMeta};
use crate::import_nifti;
use crate::models::{Dataset, ImportSummary, SeriesInfo};
use crate::normalize::normalize;
use crate::provenance;
use crate::store::{dataset_logical_id, series_logical_id, Store};
use rusqlite::Connection;
use std::collections::BTreeMap;
use std::path::{Path, PathBuf};

pub const SOFTWARE: &str = concat!("mri ", env!("CARGO_PKG_VERSION"));

#[derive(Debug, Default)]
struct SeriesGroup {
  files: Vec<(PathBuf, DicomFileMeta)>,
}

pub fn import_paths(
  store: &Store,
  connection: &Connection,
  paths: &[String],
  name: &str,
) -> Result<ImportSummary, String> {
  let dataset_key = uuid::Uuid::new_v4().to_string();
  let dataset_id = dataset_logical_id(&dataset_key);
  let dataset_dir = store.dataset_dir(&dataset_key);
  store.ensure_root()?;

  let mut imported = 0usize;
  let mut skipped = 0usize;
  let mut dicom_groups: BTreeMap<String, SeriesGroup> = BTreeMap::new();
  let mut nifti_files: Vec<PathBuf> = Vec::new();

  for raw in paths {
    let source = PathBuf::from(raw);
    if !source.is_file() {
      skipped += 1;
      continue;
    }
    if import_dicom::looks_like_dicom(&source) {
      match import_dicom::read_meta(&source) {
        Ok(meta) => {
          dicom_groups
            .entry(meta.series_uid.clone())
            .or_default()
            .files.push((source.clone(), meta));
          imported += 1;
        }
        Err(_) => skipped += 1,
      }
    } else if import_nifti::looks_like_nifti(&source) {
      nifti_files.push(source.clone());
      imported += 1;
    } else {
      skipped += 1;
    }
  }

  let display_name = display_name(name, &dataset_key);
  let dataset = Dataset {
    id: dataset_id.clone(),
    name: display_name,
    description: String::new(),
    source_path: paths.first().cloned().unwrap_or_default(),
    path: dataset_dir.to_string_lossy().to_string(),
    created_at: db::now(),
    updated_at: db::now(),
  };
  db::insert_dataset(connection, &dataset)?;

  let mut series_count = 0usize;
  for (series_uid, group) in &dicom_groups {
    import_dicom_series(store, connection, &dataset_key, series_uid, group)?;
    series_count += 1;
  }
  for volume in &nifti_files {
    import_nifti_file(store, connection, &dataset_key, volume)?;
    series_count += 1;
  }

  provenance::record_import(
    connection,
    &dataset_id,
    paths,
    &format!("{series_count} series"),
  )?;

  Ok(ImportSummary {
    dataset_id,
    imported_files: imported,
    skipped_files: skipped,
    series_count,
  })
}

fn display_name(name: &str, fallback: &str) -> String {
  let trimmed = name.trim();
  if trimmed.is_empty() {
    format!("Dataset {fallback}")
  } else {
    trimmed.to_string()
  }
}

fn import_dicom_series(
  store: &Store,
  connection: &Connection,
  dataset_key: &str,
  series_uid: &str,
  group: &SeriesGroup,
) -> Result<(), String> {
  let series_key = uuid::Uuid::new_v4().to_string();
  let series_dir = store.series_dir(dataset_key, &series_key);
  let mut stored: Vec<(String, DicomFileMeta)> = Vec::new();
  for (source, meta) in &group.files {
    let file_name = source
      .file_name()
      .and_then(|value| value.to_str())
      .unwrap_or("instance.dcm");
    let destination = store.import_file(source, &series_dir, file_name)?;
    let stored_name = destination
      .file_name()
      .and_then(|value| value.to_str())
      .unwrap_or("instance.dcm")
      .to_string();
    stored.push((stored_name, meta.clone()));
  }
  let ordered_names = import_dicom::order_instances(&stored);
  let representative = group.files.first().map(|(_, meta)| meta).ok_or("empty series")?;
  let mut tags = import_dicom::dump_tags(&group.files[0].0)?;
  if let Some(object) = tags.as_object_mut() {
    object.insert("instances".to_string(), serde_json::json!(ordered_names));
  }
  let concepts = normalize(&representative.modality, &representative.series_description);
  let voxel_z = if representative.spacing_between_slices > 0.0 {
    representative.spacing_between_slices
  } else {
    representative.slice_thickness
  };
  let info = SeriesInfo {
    id: series_logical_id(dataset_key, &series_key),
    dataset_id: dataset_logical_id(dataset_key),
    study_uid: representative.study_uid.clone(),
    study_date: representative.study_date.clone(),
    series_uid: series_uid.to_string(),
    modality: representative.modality.clone(),
    series_description: representative.series_description.clone(),
    kind: "dicom".to_string(),
    file_count: ordered_names.len() as i64,
    rows: representative.rows,
    columns: representative.columns,
    slice_count: ordered_names.len() as i64 * representative.frames.max(1),
    bits_allocated: if representative.bits_allocated > 0 {
      representative.bits_allocated
    } else {
      16
    },
    signed_pixels: representative.signed_pixels,
    voxel_x: representative.voxel_x,
    voxel_y: representative.voxel_y,
    voxel_z,
    slice_thickness: representative.slice_thickness,
    orientation: representative.orientation.clone(),
    te_ms: representative.te_ms,
    tr_ms: representative.tr_ms,
    flip_angle: representative.flip_angle,
    field_strength_t: representative.field_strength_t,
    manufacturer: representative.manufacturer.clone(),
    model: representative.model.clone(),
  };
  db::insert_series(
    connection,
    &SeriesRow {
      info,
      metadata_json: serde_json::to_string(&tags).unwrap_or_else(|_| "{}".to_string()),
      normalized_json: serde_json::to_string(&concepts).unwrap_or_else(|_| "{}".to_string()),
      path: series_dir.to_string_lossy().to_string(),
    },
  )
}

fn import_nifti_file(
  store: &Store,
  connection: &Connection,
  dataset_key: &str,
  source: &Path,
) -> Result<(), String> {
  let series_key = uuid::Uuid::new_v4().to_string();
  let series_dir = store.series_dir(dataset_key, &series_key);
  let file_name = source
    .file_name()
    .and_then(|value| value.to_str())
    .unwrap_or("volume.nii");
  store.import_file(source, &series_dir, file_name)?;
  let header = import_nifti::read_header(source)?;
  let shape = import_nifti::shape_of(&header);
  let description = String::from_utf8_lossy(&header.descrip)
    .trim_end_matches('\0')
    .trim()
    .to_string();
  let concepts = normalize("MR", &description);
  let voxels = import_nifti::voxel_size(&header);
  let info = SeriesInfo {
    id: series_logical_id(dataset_key, &series_key),
    dataset_id: dataset_logical_id(dataset_key),
    study_uid: String::new(),
    study_date: String::new(),
    series_uid: String::new(),
    modality: "MR".to_string(),
    series_description: description,
    kind: "nifti".to_string(),
    file_count: 1,
    rows: shape.height as i64,
    columns: shape.width as i64,
    slice_count: shape.depth as i64,
    bits_allocated: shape.bits_allocated,
    signed_pixels: shape.signed_pixels,
    voxel_x: voxels[0],
    voxel_y: voxels[1],
    voxel_z: voxels[2],
    slice_thickness: voxels[2],
    orientation: import_nifti::orientation_label(&header),
    te_ms: 0.0,
    tr_ms: import_nifti::temporal_tr_ms(&header),
    flip_angle: 0.0,
    field_strength_t: 0.0,
    manufacturer: String::new(),
    model: String::new(),
  };
  db::insert_series(
    connection,
    &SeriesRow {
      info,
      metadata_json: serde_json::to_string(&import_nifti::header_json(&header))
        .unwrap_or_else(|_| "{}".to_string()),
      normalized_json: serde_json::to_string(&concepts).unwrap_or_else(|_| "{}".to_string()),
      path: series_dir.to_string_lossy().to_string(),
    },
  )
}

pub fn delete_dataset(store: &Store, connection: &Connection, id: &str) -> Result<(), String> {
  let dataset = db::get_dataset(connection, id)?;
  let dataset_path = PathBuf::from(&dataset.path);
  db::delete_dataset(connection, id)?;
  store.remove_dir(&dataset_path)
}

#[cfg(test)]
mod tests {
  use super::*;
  use crate::store::Store;

  fn temp_root() -> PathBuf {
    let root = std::env::temp_dir().join(format!("mri-ws-{}", uuid::Uuid::new_v4()));
    std::fs::create_dir_all(&root).unwrap();
    root
  }

  #[test]
  fn skips_unrecognized_files() {
    let root = temp_root();
    let store = Store::new(root.clone());
    store.ensure_root().unwrap();
    let connection = db::open_in_memory().unwrap();
    let junk = root.join("junk.txt");
    std::fs::write(&junk, b"nothing").unwrap();
    let summary =
      import_paths(&store, &connection, &[junk.to_string_lossy().to_string()], "").unwrap();
    assert_eq!(summary.imported_files, 0);
    assert_eq!(summary.skipped_files, 1);
    assert_eq!(summary.series_count, 0);
    std::fs::remove_dir_all(root).ok();
  }

  #[test]
  fn imports_nifti_volume_end_to_end() -> Result<(), Box<dyn std::error::Error>> {
    let root = temp_root();
    let store = Store::new(root.clone());
    store.ensure_root().unwrap();
    let connection = db::open_in_memory().unwrap();
    let volume = fixture_volume(&root);
    let summary =
      import_paths(&store, &connection, &[volume.to_string_lossy().to_string()], "Test NIfTI")?;
    assert_eq!(summary.imported_files, 1);
    assert_eq!(summary.series_count, 1);
    let datasets = db::list_datasets(&connection, "Test NIfTI").unwrap();
    assert_eq!(datasets.len(), 1);
    let detail = db::dataset_detail(&connection, &datasets[0].id).unwrap();
    assert_eq!(detail.series.len(), 1);
    assert_eq!(detail.series[0].kind, "nifti");
    assert_eq!(detail.series[0].slice_count, 2);
    assert_eq!(detail.series[0].rows, 3);
    assert_eq!(detail.series[0].columns, 4);
    let records = db::list_provenance(&connection, &datasets[0].id).unwrap();
    assert_eq!(records.len(), 1);
    assert_eq!(records[0].software, SOFTWARE);
    delete_dataset(&store, &connection, &datasets[0].id).unwrap();
    assert!(db::get_dataset(&connection, &datasets[0].id).is_err());
    std::fs::remove_dir_all(root).ok();
    Ok(())
  }

  // Writes a minimal valid single-file NIfTI-1 volume (4x3x2 int16).
  fn fixture_volume(root: &Path) -> PathBuf {
    let mut data = vec![0u8; 352 + 4 * 3 * 2 * 2];
    let mut put = |offset: usize, bytes: &[u8]| {
      data[offset..offset + bytes.len()].copy_from_slice(bytes);
    };
    put(0, &348i32.to_le_bytes());
    for (index, value) in [3i16, 4, 3, 2, 0, 0, 0, 0].iter().enumerate() {
      put(40 + index * 2, &value.to_le_bytes());
    }
    put(70, &4i16.to_le_bytes()); // datatype DT_INT16
    put(72, &16i16.to_le_bytes()); // bitpix
    for index in 0..4 {
      put(76 + index * 4, &1.0f32.to_le_bytes()); // pix_dim
    }
    put(108, &352.0f32.to_le_bytes()); // vox_offset
    put(123, &[2]); // xyzt_units: mm + sec
    put(344, b"n+1\0");
    std::fs::write(root.join("fixture.nii"), &data).unwrap();
    root.join("fixture.nii")
  }
}
