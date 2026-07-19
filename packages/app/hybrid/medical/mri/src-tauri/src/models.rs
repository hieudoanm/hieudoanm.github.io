use serde::{Deserialize, Serialize};

pub const DATASET_SCHEME: &str = "dataset://";
pub const SERIES_SCHEME: &str = "series://";
pub const ARTIFACT_SCHEME: &str = "artifact://";

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Dataset {
  pub id: String,
  pub name: String,
  pub description: String,
  pub source_path: String,
  pub path: String,
  pub created_at: i64,
  pub updated_at: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StudyInfo {
  pub study_uid: String,
  pub study_date: String,
  pub series_count: i64,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SeriesInfo {
  pub id: String,
  pub dataset_id: String,
  pub study_uid: String,
  pub study_date: String,
  pub series_uid: String,
  pub modality: String,
  pub series_description: String,
  pub kind: String,
  pub file_count: i64,
  pub rows: i64,
  pub columns: i64,
  pub slice_count: i64,
  pub bits_allocated: i64,
  pub signed_pixels: bool,
  pub voxel_x: f64,
  pub voxel_y: f64,
  pub voxel_z: f64,
  pub slice_thickness: f64,
  pub orientation: String,
  pub te_ms: f64,
  pub tr_ms: f64,
  pub flip_angle: f64,
  pub field_strength_t: f64,
  pub manufacturer: String,
  pub model: String,
}

impl SeriesInfo {
  /// Voxel size as [x, y, z] in millimetres; zeros mean unknown.
  pub fn voxel_size(&self) -> [f64; 3] {
    [self.voxel_x, self.voxel_y, self.voxel_z]
  }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NormalizedConcepts {
  pub modality: String,
  pub contrast: Option<String>,
  pub sequence_family: Option<String>,
  pub dimensionality: Option<String>,
  pub inference: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SeriesMetadata {
  pub series: SeriesInfo,
  pub normalized: NormalizedConcepts,
  pub original_tags: serde_json::Value,
  pub classification: Vec<SequenceCandidate>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DatasetDetail {
  pub dataset: Dataset,
  pub studies: Vec<StudyInfo>,
  pub series: Vec<SeriesInfo>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProvenanceRecord {
  pub id: String,
  pub dataset_id: String,
  pub activity: String,
  pub inputs_json: String,
  pub outputs_json: String,
  pub parameters_json: String,
  pub software: String,
  pub created_at: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ImportSummary {
  pub dataset_id: String,
  pub imported_files: usize,
  pub skipped_files: usize,
  pub series_count: usize,
}

/// One candidate sequence produced by the classifier. Confidence is always
/// exposed; inferred information is never presented as authoritative.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SequenceCandidate {
  pub sequence: String,
  pub confidence: f32,
  pub evidence: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StudyAnalysis {
  pub study_uid: String,
  pub series_count: usize,
  pub modalities: Vec<String>,
  pub contrasts: Vec<String>,
  pub orientations: Vec<String>,
  pub voxel_sizes: Vec<[f64; 3]>,
  pub field_strength_t: Option<f64>,
  pub manufacturers: Vec<String>,
  pub models: Vec<String>,
  pub temporal_series: usize,
}

pub fn is_valid_logical_id(id: &str) -> bool {
  [DATASET_SCHEME, SERIES_SCHEME, ARTIFACT_SCHEME]
    .iter()
    .any(|scheme| id.starts_with(scheme) && id.len() > scheme.len())
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn accepts_known_schemes() {
    assert!(is_valid_logical_id("dataset://abc"));
    assert!(is_valid_logical_id("series://abc"));
    assert!(is_valid_logical_id("artifact://abc"));
  }

  #[test]
  fn rejects_unknown_or_empty_ids() {
    assert!(!is_valid_logical_id("file://abc"));
    assert!(!is_valid_logical_id("dataset://"));
    assert!(!is_valid_logical_id(""));
  }
}
