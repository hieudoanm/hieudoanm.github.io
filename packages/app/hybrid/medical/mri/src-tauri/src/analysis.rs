use crate::models::{SeriesInfo, StudyAnalysis};

/// Aggregate study-level facts from series metadata. Everything here is
/// derived from what was recorded at import time; nothing is re-inferred.
pub fn analyze_study(study_uid: &str, series: &[SeriesInfo]) -> StudyAnalysis {
  let mut modalities = Vec::new();
  let mut contrasts = Vec::new();
  let mut orientations = Vec::new();
  let mut voxel_sizes = Vec::new();
  let mut manufacturers = Vec::new();
  let mut models = Vec::new();
  let mut field_strength_t: Option<f64> = None;
  let mut temporal_series = 0usize;

  for info in series {
    push_unique(&mut modalities, &info.modality);
    if let Some(contrast) = contrast_of(info) {
      push_unique(&mut contrasts, &contrast);
    }
    if !info.orientation.is_empty() {
      push_unique(&mut orientations, &info.orientation);
    }
    let voxels = info.voxel_size();
    if voxels.iter().any(|value| *value > 0.0) {
      push_voxel_size(&mut voxel_sizes, voxels);
    }
    if !info.manufacturer.is_empty() {
      push_unique(&mut manufacturers, &info.manufacturer);
    }
    if !info.model.is_empty() {
      push_unique(&mut models, &info.model);
    }
    if field_strength_t.is_none() && info.field_strength_t > 0.0 {
      field_strength_t = Some(info.field_strength_t);
    }
    if is_temporal(info) {
      temporal_series += 1;
    }
  }

  StudyAnalysis {
    study_uid: study_uid.to_string(),
    series_count: series.len(),
    modalities,
    contrasts,
    orientations,
    voxel_sizes,
    field_strength_t,
    manufacturers,
    models,
    temporal_series,
  }
}

fn contrast_of(info: &SeriesInfo) -> Option<String> {
  let concepts = crate::normalize::normalize(&info.modality, &info.series_description);
  concepts.contrast
}

fn is_temporal(info: &SeriesInfo) -> bool {
  let concepts = crate::normalize::normalize(&info.modality, &info.series_description);
  concepts.dimensionality.as_deref() == Some("4D")
}

fn push_unique(target: &mut Vec<String>, value: &str) {
  if !target.iter().any(|existing| existing == value) {
    target.push(value.to_string());
  }
}

fn push_voxel_size(target: &mut Vec<[f64; 3]>, voxels: [f64; 3]) {
  const EPSILON: f64 = 1e-6;
  if !target
    .iter()
    .any(|existing| existing.iter().zip(voxels.iter()).all(|(a, b)| (a - b).abs() < EPSILON))
  {
    target.push(voxels);
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  fn series(description: &str, orientation: &str) -> SeriesInfo {
    SeriesInfo {
      id: "series://a".to_string(),
      dataset_id: "dataset://a".to_string(),
      study_uid: "1.2.3".to_string(),
      study_date: String::new(),
      series_uid: String::new(),
      modality: "MR".to_string(),
      series_description: description.to_string(),
      kind: "dicom".to_string(),
      file_count: 1,
      rows: 256,
      columns: 256,
      slice_count: 10,
      bits_allocated: 16,
      signed_pixels: false,
      voxel_x: 1.0,
      voxel_y: 1.0,
      voxel_z: 1.2,
      slice_thickness: 1.2,
      orientation: orientation.to_string(),
      te_ms: 20.0,
      tr_ms: 600.0,
      flip_angle: 15.0,
      field_strength_t: 3.0,
      manufacturer: "Siemens".to_string(),
      model: "Prisma".to_string(),
    }
  }

  #[test]
  fn aggregates_study_facts_without_duplicates() {
    let analysis = analyze_study(
      "1.2.3",
      &[series("T1 MPRAGE", "Sagittal"), series("T1 MPRAGE", "Sagittal")],
    );
    assert_eq!(analysis.series_count, 2);
    assert_eq!(analysis.contrasts, vec!["T1"]);
    assert_eq!(analysis.orientations, vec!["Sagittal"]);
    assert_eq!(analysis.voxel_sizes.len(), 1);
    assert_eq!(analysis.manufacturers, vec!["Siemens"]);
    assert_eq!(analysis.models, vec!["Prisma"]);
    assert_eq!(analysis.field_strength_t, Some(3.0));
    assert_eq!(analysis.temporal_series, 0);
  }

  #[test]
  fn counts_temporal_series_and_distinct_voxels() {
    let mut bold = series("rs-fMRI REST EPI", "Axial");
    bold.voxel_x = 3.0;
    bold.voxel_y = 3.0;
    bold.voxel_z = 3.5;
    let analysis = analyze_study("1.2.3", &[series("T1", "Axial"), bold]);
    assert_eq!(analysis.temporal_series, 1);
    assert_eq!(analysis.voxel_sizes.len(), 2);
    assert_eq!(analysis.contrasts.len(), 2);
  }

  #[test]
  fn empty_study_yields_empty_analysis() {
    let analysis = analyze_study("1.2.3", &[]);
    assert_eq!(analysis.series_count, 0);
    assert!(analysis.modalities.is_empty());
    assert_eq!(analysis.field_strength_t, None);
  }
}
