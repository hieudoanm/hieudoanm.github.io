use crate::db;
use crate::models::SeriesInfo;
use crate::qc_stats;
use crate::viewer;
use rusqlite::Connection;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum QcStatus {
  Pass,
  Warn,
  Fail,
  Skipped,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QcCheck {
  pub id: String,
  pub status: QcStatus,
  pub value: Option<f64>,
  pub detail: String,
}

/// Machine-readable QC report for one series. Heuristic checks are labelled
/// as proxies in their detail text.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QcReport {
  pub series_id: String,
  pub dataset_id: String,
  pub checks: Vec<QcCheck>,
  pub software: String,
  pub generated_at: i64,
}

const SAMPLE_SLICES: usize = 3;

pub fn run_qc(connection: &Connection, series_id: &str) -> Result<QcReport, String> {
  let (info, metadata_json, path) = db::get_series(connection, series_id)?;
  let mut checks = vec![
    dimensions_check(&info),
    spacing_check(&info),
    coverage_check(&info),
  ];
  let samples = sample_slices(connection, &info, &metadata_json, &path);
  match samples {
    Ok(slices) => checks.extend(pixel_checks(&slices)),
    Err(reason) => checks.push(QcCheck {
      id: "pixel-statistics".to_string(),
      status: QcStatus::Skipped,
      value: None,
      detail: reason,
    }),
  }
  Ok(QcReport {
    series_id: series_id.to_string(),
    dataset_id: info.dataset_id.clone(),
    checks,
    software: crate::workspace::SOFTWARE.to_string(),
    generated_at: db::now(),
  })
}

fn sample_slices(
  connection: &Connection,
  info: &SeriesInfo,
  metadata_json: &str,
  path: &str,
) -> Result<Vec<Vec<f64>>, String> {
  if info.rows <= 0 || info.columns <= 0 || info.slice_count <= 0 {
    return Err("series has no pixel geometry".to_string());
  }
  let count = info.slice_count as usize;
  let indices = sample_indices(count);
  let mut slices = Vec::with_capacity(indices.len());
  for index in indices {
    let bytes = viewer::read_slice_from(connection, info, metadata_json, path, index as i64)?;
    slices.push(qc_stats::decode_u16(&bytes, info.signed_pixels));
  }
  Ok(slices)
}

fn sample_indices(count: usize) -> Vec<usize> {
  if count <= SAMPLE_SLICES {
    return (0..count).collect();
  }
  let last = count - 1;
  vec![0, count / 2, last]
}

fn dimensions_check(info: &SeriesInfo) -> QcCheck {
  let status = if info.rows > 0 && info.columns > 0 {
    QcStatus::Pass
  } else {
    QcStatus::Fail
  };
  check("dimensions", status, None, format!("{}x{} pixels", info.columns, info.rows))
}

fn spacing_check(info: &SeriesInfo) -> QcCheck {
  let voxels = info.voxel_size();
  let known = voxels.iter().any(|value| *value > 0.0);
  let status = if known { QcStatus::Pass } else { QcStatus::Warn };
  check(
    "spacing",
    status,
    None,
    format!("voxel {:.2}x{:.2}x{:.2}mm", voxels[0], voxels[1], voxels[2]),
  )
}

fn coverage_check(info: &SeriesInfo) -> QcCheck {
  let status = if info.slice_count >= 1 { QcStatus::Pass } else { QcStatus::Fail };
  check("coverage", status, Some(info.slice_count as f64), format!("{} slices", info.slice_count))
}

fn pixel_checks(slices: &[Vec<f64>]) -> Vec<QcCheck> {
  let first = &slices[0];
  let width = (first.len() as f64).sqrt() as usize;
  let signal = qc_stats::center_mean(first, width, width.max(1), 8.min(width / 3));
  let noise = background_std(first, width);
  vec![
    snr_check(signal, noise),
    uniformity_check(first, width),
    ghosting_check(first, width),
    motion_check(slices),
  ]
}

fn background_std(values: &[f64], _width: usize) -> f64 {
  let corner: Vec<f64> = values
    .iter()
    .take(16 * 16)
    .copied()
    .chain(values.iter().rev().take(16 * 16).copied())
    .collect();
  qc_stats::std_dev(&corner)
}

fn snr_check(signal: f64, noise: f64) -> QcCheck {
  if noise <= 0.0 {
    return check("snr", QcStatus::Skipped, None, "background noise is zero".to_string());
  }
  let snr = signal / noise;
  let status = if snr >= 5.0 {
    QcStatus::Pass
  } else if snr >= 2.0 {
    QcStatus::Warn
  } else {
    QcStatus::Fail
  };
  check("snr", status, Some(snr), format!("signal/noise ratio {snr:.1}"))
}

fn uniformity_check(values: &[f64], width: usize) -> QcCheck {
  let means = qc_stats::quadrant_means(values, width, values.len() / width.max(1));
  let max = means.iter().cloned().fold(0.0_f64, f64::max);
  let min = means.iter().cloned().fold(f64::MAX, f64::min);
  if max <= 0.0 {
    return check("uniformity", QcStatus::Skipped, None, "no positive signal".to_string());
  }
  let spread = (max - min) / max;
  let status = if spread <= 0.2 {
    QcStatus::Pass
  } else if spread <= 0.4 {
    QcStatus::Warn
  } else {
    QcStatus::Fail
  };
  check("uniformity", status, Some(spread), format!("intensity non-uniformity {spread:.2}"))
}

fn ghosting_check(values: &[f64], width: usize) -> QcCheck {
  let band = (width / 8).max(1);
  let edge = qc_stats::edge_band_mean(values, width, values.len() / width.max(1), band);
  let center = qc_stats::center_mean(values, width, values.len() / width.max(1), 8.min(width / 3));
  if center.abs() < 1e-9 {
    return check("ghosting", QcStatus::Skipped, None, "no centre signal".to_string());
  }
  let ratio = ((edge - center) / center).abs();
  let status = if ratio <= 0.05 {
    QcStatus::Pass
  } else if ratio <= 0.15 {
    QcStatus::Warn
  } else {
    QcStatus::Fail
  };
  check(
    "ghosting",
    status,
    Some(ratio),
    format!("heuristic edge/centre proxy {ratio:.3}"),
  )
}

fn motion_check(slices: &[Vec<f64>]) -> QcCheck {
  if slices.len() < 2 {
    return check("motion", QcStatus::Skipped, None, "needs at least two sampled slices".to_string());
  }
  let means: Vec<f64> = slices.iter().map(|slice| qc_stats::mean(slice)).collect();
  let overall = qc_stats::mean(&means);
  if overall.abs() < 1e-9 {
    return check("motion", QcStatus::Skipped, None, "no mean signal".to_string());
  }
  let mut jump = 0.0_f64;
  for pair in means.windows(2) {
    jump = jump.max((pair[1] - pair[0]).abs());
  }
  let ratio = jump / overall.abs();
  let status = if ratio <= 0.15 {
    QcStatus::Pass
  } else if ratio <= 0.3 {
    QcStatus::Warn
  } else {
    QcStatus::Fail
  };
  check("motion", status, Some(ratio), format!("heuristic slice-mean jump {ratio:.3}"))
}

fn check(id: &str, status: QcStatus, value: Option<f64>, detail: String) -> QcCheck {
  QcCheck {
    id: id.to_string(),
    status,
    value,
    detail,
  }
}
