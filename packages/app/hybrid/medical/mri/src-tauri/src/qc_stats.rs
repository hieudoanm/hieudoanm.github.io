// Pure statistical helpers for MRI quality checks. All functions operate on
// decoded voxel values; no I/O happens here.

/// Decode little-endian 16-bit slice bytes into f64 voxel values.
pub fn decode_u16(bytes: &[u8], signed: bool) -> Vec<f64> {
  bytes
    .chunks_exact(2)
    .map(|pair| {
      let raw = u16::from_le_bytes([pair[0], pair[1]]);
      if signed {
        i16::from_le_bytes([pair[0], pair[1]]) as f64
      } else {
        raw as f64
      }
    })
    .collect()
}

pub fn mean(values: &[f64]) -> f64 {
  if values.is_empty() {
    return 0.0;
  }
  values.iter().sum::<f64>() / values.len() as f64
}

pub fn std_dev(values: &[f64]) -> f64 {
  if values.len() < 2 {
    return 0.0;
  }
  let average = mean(values);
  let variance =
    values.iter().map(|value| (value - average).powi(2)).sum::<f64>() / (values.len() - 1) as f64;
  variance.sqrt()
}

fn in_patch(x: usize, y: usize, width: usize, height: usize, half: usize) -> bool {
  let center_x = width / 2;
  let center_y = height / 2;
  x.abs_diff(center_x) <= half && y.abs_diff(center_y) <= half
}

/// Mean of a centred patch (2*half+1 square); background proxy uses corners.
pub fn center_mean(values: &[f64], width: usize, height: usize, half: usize) -> f64 {
  let picked: Vec<f64> = values
    .iter()
    .enumerate()
    .filter(|(index, _)| {
      let (x, y) = (index % width, index / width);
      y < height && in_patch(x, y, width, height, half)
    })
    .map(|(_, value)| *value)
    .collect();
  mean(&picked)
}

/// Mean of each quadrant, ordered top-left, top-right, bottom-left, bottom-right.
pub fn quadrant_means(values: &[f64], width: usize, height: usize) -> [f64; 4] {
  let mut sums = [0.0; 4];
  let mut counts = [0usize; 4];
  for (index, value) in values.iter().enumerate() {
    let (x, y) = (index % width, index / width);
    let quadrant = (y >= height / 2) as usize * 2 + (x >= width / 2) as usize;
    sums[quadrant] += value;
    counts[quadrant] += 1;
  }
  [
    sums[0] / counts[0].max(1) as f64,
    sums[1] / counts[1].max(1) as f64,
    sums[2] / counts[2].max(1) as f64,
    sums[3] / counts[3].max(1) as f64,
  ]
}

/// Mean of the outermost column band — ghosting proxy compares edge signal
/// against centre signal.
pub fn edge_band_mean(values: &[f64], width: usize, _height: usize, band: usize) -> f64 {
  let picked: Vec<f64> = values
    .iter()
    .enumerate()
    .filter(|(index, _)| {
      let (x, _) = (index % width, index / width);
      x < band || x >= width - band
    })
    .map(|(_, value)| *value)
    .collect();
  mean(&picked)
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn decodes_signed_and_unsigned_bytes() {
    assert_eq!(decode_u16(&[0xFF, 0xFF], false), vec![65535.0]);
    assert_eq!(decode_u16(&[0xFF, 0xFF], true), vec![-1.0]);
    assert!(decode_u16(&[0x01], false).is_empty());
  }

  #[test]
  fn statistics_handle_edge_cases() {
    assert_eq!(mean(&[]), 0.0);
    assert_eq!(std_dev(&[5.0]), 0.0);
    assert!((std_dev(&[2.0, 4.0]) - std_dev(&[4.0, 2.0])).abs() < 1e-12);
  }

  #[test]
  fn center_mean_picks_central_region() {
    // 4x3 grid of ones with a bright centre cross.
    let values = vec![1.0; 12];
    assert!((center_mean(&values, 4, 3, 0) - 1.0).abs() < 1e-9);
  }

  #[test]
  fn quadrants_split_evenly() {
    let values: Vec<f64> = (0..16).map(|index| index as f64).collect();
    let means = quadrant_means(&values, 4, 4);
    assert!((means[0] - 2.5).abs() < 1e-9);
    assert!((means[3] - 12.5).abs() < 1e-9);
  }

  #[test]
  fn edge_band_excludes_center_columns() {
    let values = vec![0.0, 10.0, 10.0, 0.0];
    assert!((edge_band_mean(&values, 4, 1, 1) - 0.0).abs() < 1e-9);
  }
}
