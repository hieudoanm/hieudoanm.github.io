use crate::models::SeriesInfo;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProtocolDefinition {
  pub name: String,
  pub required: Vec<String>,
  #[serde(default)]
  pub constraints: HashMap<String, ProtocolConstraint>,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct ProtocolConstraint {
  #[serde(skip_serializing_if = "Option::is_none")]
  pub max_voxel_mm: Option<f64>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub required_b_values: Option<Vec<f64>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ConstraintViolation {
  pub contrast: String,
  pub constraint: String,
  pub detail: String,
}

/// Machine-readable protocol validation report. Satisfied/missing lists use
/// canonical contrast names; classification confidence gates membership.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProtocolReport {
  pub protocol_name: String,
  pub satisfied: Vec<String>,
  pub missing: Vec<String>,
  pub violations: Vec<ConstraintViolation>,
  pub passed: bool,
}

const CONFIDENCE_GATE: f32 = 0.5;

/// Validate a dataset's classified series against a protocol definition.
pub fn validate(definition: &ProtocolDefinition, series: &[SeriesInfo]) -> ProtocolReport {
  let mut satisfied = Vec::new();
  let mut violations = Vec::new();
  for info in series {
    let Some(contrast) = best_contrast(info) else {
      continue;
    };
    if !definition.required.contains(&contrast) {
      continue;
    }
    if !satisfied.contains(&contrast) {
      satisfied.push(contrast.clone());
    }
    if let Some(constraint) = definition.constraints.get(&contrast) {
      violations.extend(check_constraint(&contrast, constraint, info));
    }
  }
  let missing: Vec<String> = definition
    .required
    .iter()
    .filter(|required| !satisfied.contains(required))
    .cloned()
    .collect();
  ProtocolReport {
    protocol_name: definition.name.clone(),
    passed: missing.is_empty() && violations.is_empty(),
    satisfied,
    missing,
    violations,
  }
}

fn best_contrast(info: &SeriesInfo) -> Option<String> {
  let input = crate::classifier::ClassifyInput {
    modality: info.modality.clone(),
    description: info.series_description.clone(),
    tr_ms: info.tr_ms,
    te_ms: info.te_ms,
    flip_angle: info.flip_angle,
  };
  crate::classifier::classify(&input)
    .into_iter()
    .find(|candidate| candidate.confidence >= CONFIDENCE_GATE)
    .map(|candidate| candidate.sequence)
}

fn check_constraint(
  contrast: &str,
  constraint: &ProtocolConstraint,
  info: &SeriesInfo,
) -> Vec<ConstraintViolation> {
  let mut violations = Vec::new();
  if let Some(max_voxel) = constraint.max_voxel_mm {
    let voxels = info.voxel_size();
    let worst = voxels.iter().cloned().fold(0.0_f64, f64::max);
    if worst > max_voxel {
      violations.push(ConstraintViolation {
        contrast: contrast.to_string(),
        constraint: format!("max_voxel_mm <= {max_voxel}"),
        detail: format!("largest voxel dimension is {worst:.2}mm"),
      });
    }
  }
  violations
}

#[cfg(test)]
mod tests {
  use super::*;

  fn series(description: &str, voxel: f64) -> SeriesInfo {
    SeriesInfo {
      id: "series://a".to_string(),
      dataset_id: "dataset://a".to_string(),
      study_uid: String::new(),
      study_date: String::new(),
      series_uid: String::new(),
      modality: "MR".to_string(),
      series_description: description.to_string(),
      kind: "dicom".to_string(),
      file_count: 1,
      rows: 256,
      columns: 256,
      slice_count: 1,
      bits_allocated: 16,
      signed_pixels: false,
      voxel_x: voxel,
      voxel_y: voxel,
      voxel_z: voxel,
      slice_thickness: voxel,
      orientation: String::new(),
      te_ms: 20.0,
      tr_ms: 600.0,
      flip_angle: 15.0,
      field_strength_t: 3.0,
      manufacturer: String::new(),
      model: String::new(),
    }
  }

  fn definition() -> ProtocolDefinition {
    let mut constraints = HashMap::new();
    constraints.insert(
      "T1".to_string(),
      ProtocolConstraint {
        max_voxel_mm: Some(1.5),
        required_b_values: None,
      },
    );
    ProtocolDefinition {
      name: "Brain MRI Research Protocol".to_string(),
      required: vec!["T1".to_string(), "FLAIR".to_string(), "DWI".to_string()],
      constraints,
    }
  }

  #[test]
  fn reports_missing_sequences() {
    let report = validate(&definition(), &[series("T1 MPRAGE", 1.0)]);
    assert_eq!(report.satisfied, vec!["T1"]);
    assert_eq!(report.missing, vec!["FLAIR", "DWI"]);
    assert!(!report.passed);
  }

  #[test]
  fn constraint_violations_are_reported() {
    let report = validate(&definition(), &[series("T1 MPRAGE", 2.0)]);
    assert_eq!(report.violations.len(), 1);
    assert_eq!(report.violations[0].contrast, "T1");
    assert!(report.violations[0].detail.contains("2.00mm"));
    assert!(!report.passed);
  }

  #[test]
  fn passing_protocol_reports_success() {
    let report = validate(
      &definition(),
      &[series("T1 MPRAGE", 1.0), series("AX DWI b1000", 2.0), series("FLAIR", 1.0)],
    );
    assert!(report.missing.is_empty());
    assert!(report.violations.is_empty());
    assert!(report.passed);
  }

  #[test]
  fn low_confidence_matches_do_not_satisfy() {
    let mut weak = definition();
    weak.required = vec!["BOLD".to_string()];
    let report = validate(&weak, &[series("Localizer", 1.0)]);
    assert_eq!(report.missing, vec!["BOLD"]);
  }
}
