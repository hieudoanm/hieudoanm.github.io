use crate::models::SeriesInfo;
use serde::{Deserialize, Serialize};

/// Whether two series can be compared directly (same geometry). Registration
/// arrives with Phase 3 tooling integration; until then mismatched geometry
/// is reported instead of silently resampled.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CompareCompatibility {
  pub compatible: bool,
  pub reasons: Vec<String>,
}

const VOXEL_TOLERANCE: f64 = 0.05;

pub fn compare_compatibility(left: &SeriesInfo, right: &SeriesInfo) -> CompareCompatibility {
  let mut reasons = Vec::new();
  if left.rows != right.rows || left.columns != right.columns {
    reasons.push(format!(
      "matrix differs: {}x{} vs {}x{}",
      left.columns, left.rows, right.columns, right.rows
    ));
  }
  if !voxels_match(&left.voxel_size(), &right.voxel_size()) {
    reasons.push(format!(
      "voxel size differs: {:.2}x{:.2}x{:.2}mm vs {:.2}x{:.2}x{:.2}mm",
      left.voxel_x,
      left.voxel_y,
      left.voxel_z,
      right.voxel_x,
      right.voxel_y,
      right.voxel_z
    ));
  }
  CompareCompatibility {
    compatible: reasons.is_empty(),
    reasons,
  }
}

fn voxels_match(left: &[f64; 3], right: &[f64; 3]) -> bool {
  if left.iter().all(|value| *value <= 0.0) || right.iter().all(|value| *value <= 0.0) {
    return true;
  }
  left
    .iter()
    .zip(right.iter())
    .all(|(a, b)| (a - b).abs() <= VOXEL_TOLERANCE * a.max(*b).max(1.0))
}

#[cfg(test)]
mod tests {
  use super::*;

  fn series(rows: i64, columns: i64, voxel: f64) -> SeriesInfo {
    SeriesInfo {
      id: "series://a".to_string(),
      dataset_id: "dataset://a".to_string(),
      study_uid: String::new(),
      study_date: String::new(),
      series_uid: String::new(),
      modality: "MR".to_string(),
      series_description: String::new(),
      kind: "nifti".to_string(),
      file_count: 1,
      rows,
      columns,
      slice_count: 10,
      bits_allocated: 16,
      signed_pixels: false,
      voxel_x: voxel,
      voxel_y: voxel,
      voxel_z: voxel,
      slice_thickness: voxel,
      orientation: String::new(),
      te_ms: 0.0,
      tr_ms: 0.0,
      flip_angle: 0.0,
      field_strength_t: 0.0,
      manufacturer: String::new(),
      model: String::new(),
    }
  }

  #[test]
  fn identical_geometry_is_compatible() {
    let result = compare_compatibility(&series(256, 256, 1.0), &series(256, 256, 1.0));
    assert!(result.compatible);
    assert!(result.reasons.is_empty());
  }

  #[test]
  fn matrix_mismatch_is_reported() {
    let result = compare_compatibility(&series(256, 256, 1.0), &series(128, 128, 1.0));
    assert!(!result.compatible);
    assert!(result.reasons[0].contains("matrix"));
  }

  #[test]
  fn voxel_mismatch_beyond_tolerance_is_reported() {
    let result = compare_compatibility(&series(256, 256, 1.0), &series(256, 256, 3.0));
    assert!(!result.compatible);
    assert!(result.reasons[0].contains("voxel"));
  }

  #[test]
  fn unknown_voxels_do_not_block_comparison() {
    let mut left = series(256, 256, 1.0);
    left.voxel_x = 0.0;
    left.voxel_y = 0.0;
    left.voxel_z = 0.0;
    let result = compare_compatibility(&left, &series(256, 256, 1.0));
    assert!(result.compatible);
  }
}
