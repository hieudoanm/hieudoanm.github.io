use nifti::volume::{NiftiVolume, RandomAccessNiftiVolume};
use nifti::{InMemNiftiVolume, NiftiHeader};
use serde_json::json;
use std::io::{Read, Seek, SeekFrom};
use std::path::Path;

#[derive(Debug, Clone)]
pub struct NiftiShape {
  pub width: usize,
  pub height: usize,
  pub depth: usize,
  pub bits_allocated: i64,
  pub signed_pixels: bool,
}

pub fn looks_like_nifti(path: &Path) -> bool {
  let name = path
    .file_name()
    .and_then(|value| value.to_str())
    .unwrap_or("");
  let lower = name.to_lowercase();
  if lower.ends_with(".nii") || lower.ends_with(".nii.gz") {
    return true;
  }
  magic_matches(path)
}

fn magic_matches(path: &Path) -> bool {
  let Ok(mut file) = std::fs::File::open(path) else {
    return false;
  };
  let mut magic = [0u8; 4];
  if file.seek(SeekFrom::Start(344)).is_err() || file.read_exact(&mut magic).is_err() {
    return false;
  }
  magic == *b"n+1\0" || magic == *b"ni1\0"
}

fn is_signed_datatype(code: i16) -> bool {
  // NIfTI codes: 4=INT16, 8=INT32, 16=FLOAT32, 64=FLOAT64, 256=INT8 are
  // signed; 2=UINT8, 512=UINT16, 768=UINT32 are unsigned.
  matches!(code, 4 | 8 | 16 | 64 | 256)
}

pub fn shape_of(header: &NiftiHeader) -> NiftiShape {
  NiftiShape {
    width: header.dim[1] as usize,
    height: header.dim[2] as usize,
    depth: header.dim[3] as usize,
    bits_allocated: header.bitpix as i64,
    signed_pixels: is_signed_datatype(header.datatype),
  }
}

/// Voxel spacing [x, y, z] from pixdim; zeros mean unknown.
pub fn voxel_size(header: &NiftiHeader) -> [f64; 3] {
  [
    header.pixdim[1] as f64,
    header.pixdim[2] as f64,
    header.pixdim[3] as f64,
  ]
}

/// Plane label from the sform k-direction vector (Sagittal/Coronal/Axial).
pub fn orientation_label(header: &NiftiHeader) -> String {
  if header.sform_code == 0 {
    return String::new();
  }
  let k = [
    header.srow_x[2] as f64,
    header.srow_y[2] as f64,
    header.srow_z[2] as f64,
  ];
  let labels = ["Sagittal", "Coronal", "Axial"];
  let mut best = 0;
  for axis in 1..3 {
    if k[axis].abs() > k[best].abs() {
      best = axis;
    }
  }
  if k[best].abs() < 1e-6 {
    String::new()
  } else {
    labels[best].to_string()
  }
}

/// Repetition time in milliseconds for 4D volumes (pixdim[4], seconds).
pub fn temporal_tr_ms(header: &NiftiHeader) -> f64 {
  if header.dim[0] >= 5 && header.pixdim[4] > 0.0 {
    header.pixdim[4] as f64 * 1000.0
  } else {
    0.0
  }
}

pub fn read_header(path: &Path) -> Result<NiftiHeader, String> {
  NiftiHeader::from_file(path).map_err(|error| error.to_string())
}

/// Header inspection dump: geometry, voxel spacing, affine (sform/qform),
/// and descriptive fields. Original values are preserved verbatim.
pub fn header_json(header: &NiftiHeader) -> serde_json::Value {
  json!({
    "sizeof_hdr": header.sizeof_hdr,
    "dim": header.dim,
    "intent_code": header.intent_code,
    "datatype": header.datatype,
    "bitpix": header.bitpix,
    "slice_start": header.slice_start,
    "pixdim": header.pixdim,
    "vox_offset": header.vox_offset,
    "scl_slope": header.scl_slope,
    "scl_inter": header.scl_inter,
    "xyzt_units": header.xyzt_units,
    "cal_max": header.cal_max,
    "cal_min": header.cal_min,
    "slice_end": header.slice_end,
    "slice_code": header.slice_code,
    "qform_code": header.qform_code,
    "sform_code": header.sform_code,
    "quatern_b": header.quatern_b,
    "quatern_c": header.quatern_c,
    "quatern_d": header.quatern_d,
    "quatern_x": header.quatern_x,
    "quatern_y": header.quatern_y,
    "quatern_z": header.quatern_z,
    "srow_x": header.srow_x,
    "srow_y": header.srow_y,
    "srow_z": header.srow_z,
    "magic": String::from_utf8_lossy(&header.magic).to_string(),
    "descrip": String::from_utf8_lossy(&header.descrip).to_string(),
  })
}

pub fn open_volume(path: &Path, header: &NiftiHeader) -> Result<InMemNiftiVolume, String> {
  let mut file = std::fs::File::open(path).map_err(|error| error.to_string())?;
  file
    .seek(SeekFrom::Start(header.vox_offset.max(0.0) as u64))
    .map_err(|error| error.to_string())?;
  InMemNiftiVolume::from_reader(file, header).map_err(|error| error.to_string())
}

/// Extract one axial slice (z index) as little-endian u16 bytes.
pub fn slice_u16_le(volume: &InMemNiftiVolume, z: usize) -> Result<Vec<u8>, String> {
  let dim = volume.dim();
  if dim.len() < 3 {
    return Err("volume has fewer than 3 dimensions".to_string());
  }
  let (width, height, depth) = (dim[0] as usize, dim[1] as usize, dim[2] as usize);
  if z >= depth {
    return Err(format!("slice {z} out of range ({depth})"));
  }
  let mut bytes = Vec::with_capacity(width * height * 2);
  for y in 0..height {
    for x in 0..width {
      let voxel = volume
        .get_u16(&[x as u16, y as u16, z as u16])
        .map_err(|error| error.to_string())?;
      bytes.extend_from_slice(&voxel.to_le_bytes());
    }
  }
  Ok(bytes)
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn detects_nifti_by_extension_and_magic() {
    let dir = std::env::temp_dir().join(format!("mri-nifti-{}", uuid::Uuid::new_v4()));
    std::fs::create_dir_all(&dir).unwrap();
    let nii = dir.join("scan.nii");
    std::fs::write(&nii, b"x").unwrap();
    assert!(looks_like_nifti(&nii));
    let gz = dir.join("scan.nii.gz");
    std::fs::write(&gz, b"x").unwrap();
    assert!(looks_like_nifti(&gz));
    let other = dir.join("notes.txt");
    std::fs::write(&other, b"hello").unwrap();
    assert!(!looks_like_nifti(&other));
    std::fs::remove_dir_all(dir).ok();
  }

  #[test]
  fn rejects_missing_headers() {
    let dir = std::env::temp_dir().join(format!("mri-nifti-{}", uuid::Uuid::new_v4()));
    std::fs::create_dir_all(&dir).unwrap();
    let fake = dir.join("fake.nii");
    std::fs::write(&fake, b"not a nifti header").unwrap();
    assert!(read_header(&fake).is_err());
    std::fs::remove_dir_all(dir).ok();
  }

  #[test]
  fn classifies_signedness() {
    assert!(is_signed_datatype(4));
    assert!(is_signed_datatype(256));
    assert!(!is_signed_datatype(2));
    assert!(!is_signed_datatype(512));
  }

  #[test]
  fn shape_reads_dimensions() {
    let mut header_bytes = vec![0u8; 348];
    header_bytes[0..4].copy_from_slice(&348i32.to_le_bytes());
    for (index, value) in [3u16, 4, 3, 2].iter().enumerate() {
      let offset = 40 + index * 2;
      header_bytes[offset..offset + 2].copy_from_slice(&value.to_le_bytes());
    }
    header_bytes[70..72].copy_from_slice(&4i16.to_le_bytes());
    header_bytes[72..74].copy_from_slice(&16i16.to_le_bytes());
    header_bytes[344..348].copy_from_slice(b"n+1\0");
    let header = NiftiHeader::from_reader(&header_bytes[..]).unwrap();
    let shape = shape_of(&header);
    assert_eq!(shape.width, 4);
    assert_eq!(shape.height, 3);
    assert_eq!(shape.depth, 2);
    assert_eq!(shape.bits_allocated, 16);
    assert!(shape.signed_pixels);
  }
}
