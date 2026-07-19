use dicom_core::dictionary::{DataDictionary, DataDictionaryEntryRef};
use dicom_core::{DicomValue, Tag};
use dicom_dictionary_std::StandardDataDictionary;
use dicom_object::{open_file, InMemDicomObject};
use serde_json::{json, Value};
use std::io::Read;
use std::path::Path;

const DICT: StandardDataDictionary = StandardDataDictionary;

const MAX_DUMP_BYTES: usize = 1024;
pub const PIXEL_DATA: Tag = Tag(0x7FE0, 0x0010);

#[derive(Debug, Clone, Default)]
pub struct DicomFileMeta {
  pub study_uid: String,
  pub series_uid: String,
  pub study_date: String,
  pub modality: String,
  pub series_description: String,
  pub instance_number: i64,
  pub frames: i64,
  pub rows: i64,
  pub columns: i64,
  pub bits_allocated: i64,
  pub signed_pixels: bool,
  pub voxel_x: f64,
  pub voxel_y: f64,
  pub slice_thickness: f64,
  pub spacing_between_slices: f64,
  pub orientation: String,
  pub te_ms: f64,
  pub tr_ms: f64,
  pub flip_angle: f64,
  pub field_strength_t: f64,
  pub manufacturer: String,
  pub model: String,
}

pub fn looks_like_dicom(path: &Path) -> bool {
  let Ok(mut file) = std::fs::File::open(path) else {
    return false;
  };
  let mut prefix = [0u8; 132];
  if file.read_exact(&mut prefix).is_err() {
    return false;
  }
  &prefix[128..] == b"DICM"
}

fn text_at(object: &InMemDicomObject, group: u16, element: u16) -> String {
  object
    .element(Tag(group, element))
    .ok()
    .and_then(|item| item.value().to_str().ok())
    .map(|value| value.trim().to_string())
    .unwrap_or_default()
}

fn int_at(object: &InMemDicomObject, group: u16, element: u16) -> i64 {
  text_at(object, group, element).parse::<i64>().unwrap_or(0)
}

fn float_at(object: &InMemDicomObject, group: u16, element: u16) -> f64 {
  text_at(object, group, element)
    .split('\\')
    .next()
    .and_then(|part| part.trim().parse::<f64>().ok())
    .unwrap_or(0.0)
}

/// Plane label derived from ImageOrientationPatient direction cosines.
/// The slice normal is the cross product of the row and column vectors.
pub fn orientation_label(iop: &str) -> String {
  let parts: Vec<f64> = iop
    .split('\\')
    .filter_map(|value| value.trim().parse::<f64>().ok())
    .collect();
  if parts.len() != 6 {
    return String::new();
  }
  let (row, col) = (&parts[0..3], &parts[3..6]);
  let normal = [
    row[1] * col[2] - row[2] * col[1],
    row[2] * col[0] - row[0] * col[2],
    row[0] * col[1] - row[1] * col[0],
  ];
  let labels = ["Sagittal", "Coronal", "Axial"];
  let mut best = 0;
  for axis in 1..3 {
    if normal[axis].abs() > normal[best].abs() {
      best = axis;
    }
  }
  if normal[best].abs() < 1e-6 {
    String::new()
  } else {
    labels[best].to_string()
  }
}

pub fn read_meta(path: &Path) -> Result<DicomFileMeta, String> {
  let object = open_file(path).map_err(|error| error.to_string())?;
  let dataset = object.into_inner();
  let spacing = text_at(&dataset, 0x0028, 0x0030);
  let mut spacing_parts = spacing.split('\\');
  Ok(DicomFileMeta {
    study_uid: text_at(&dataset, 0x0020, 0x000D),
    series_uid: text_at(&dataset, 0x0020, 0x000E),
    study_date: text_at(&dataset, 0x0008, 0x0020),
    modality: text_at(&dataset, 0x0008, 0x0060),
    series_description: description_of(&dataset),
    instance_number: int_at(&dataset, 0x0020, 0x0013),
    frames: frames_of(&dataset),
    rows: int_at(&dataset, 0x0028, 0x0010),
    columns: int_at(&dataset, 0x0028, 0x0011),
    bits_allocated: int_at(&dataset, 0x0028, 0x0100),
    signed_pixels: int_at(&dataset, 0x0028, 0x0103) == 1,
    voxel_x: spacing_parts.next().and_then(parse_f64).unwrap_or(0.0),
    voxel_y: spacing_parts.next().and_then(parse_f64).unwrap_or(0.0),
    slice_thickness: float_at(&dataset, 0x0018, 0x0050),
    spacing_between_slices: float_at(&dataset, 0x0018, 0x0088),
    orientation: orientation_label(&text_at(&dataset, 0x0020, 0x0037)),
    te_ms: float_at(&dataset, 0x0018, 0x0080),
    tr_ms: float_at(&dataset, 0x0018, 0x0081),
    flip_angle: float_at(&dataset, 0x0018, 0x1314),
    field_strength_t: float_at(&dataset, 0x0018, 0x0087),
    manufacturer: text_at(&dataset, 0x0008, 0x0070),
    model: text_at(&dataset, 0x0008, 0x1090),
  })
}

fn parse_f64(value: &str) -> Option<f64> {
  value.trim().parse::<f64>().ok()
}

fn description_of(dataset: &InMemDicomObject) -> String {
  let description = text_at(dataset, 0x0008, 0x103E);
  if description.is_empty() {
    text_at(dataset, 0x0018, 0x1030)
  } else {
    description
  }
}

fn frames_of(dataset: &InMemDicomObject) -> i64 {
  let frames = int_at(dataset, 0x0028, 0x0008);
  if frames > 0 {
    frames
  } else {
    1
  }
}

/// Dump every element of a DICOM dataset into JSON, preserving nested
/// sequence items. Large binary values are recorded by length instead of
/// being inlined; the original file always stays available in the workspace.
pub fn dump_tags(path: &Path) -> Result<Value, String> {
  let object = open_file(path).map_err(|error| error.to_string())?;
  let dataset = object.into_inner();
  let mut elements = Vec::new();
  walk_object(&dataset, "", &mut elements);
  Ok(Value::Array(elements))
}

fn tag_name(tag: Tag) -> String {
  DICT
    .by_tag(tag)
    .map(|entry: &DataDictionaryEntryRef<'static>| entry.alias.to_string())
    .unwrap_or_else(|| "Unknown".to_string())
}

fn walk_object(object: &InMemDicomObject, prefix: &str, out: &mut Vec<Value>) {
  for element in object.iter() {
    let tag = element.header().tag;
    if tag == PIXEL_DATA && prefix.is_empty() {
      continue;
    }
    let path = format!("{prefix}({:04X},{:04X})", tag.group(), tag.element());
    let name = tag_name(tag);
    match element.value() {
      DicomValue::Sequence(sequence) => {
        out.push(json!({ "path": path, "name": name, "vr": "SQ" }));
        for (index, item) in sequence.items().iter().enumerate() {
          walk_object(item, &format!("{path}[{index}]."), out);
        }
      }
      DicomValue::Primitive(primitive) => {
        out.push(primitive_entry(&path, &name, primitive.to_bytes().to_vec()));
      }
      DicomValue::PixelSequence(_) => {
        out.push(json!({
          "path": path,
          "name": name,
          "note": "encapsulated pixel data; see original file"
        }));
      }
    }
  }
}

fn primitive_entry(path: &str, name: &str, bytes: Vec<u8>) -> Value {
  if bytes.len() > MAX_DUMP_BYTES {
    return json!({
      "path": path,
      "name": name,
      "value": null,
      "binaryLength": bytes.len(),
      "note": "large binary value kept in original file"
    });
  }
  let text = String::from_utf8_lossy(&bytes);
  let value = if text.chars().any(|c| c.is_control()) {
    use base64::{engine::general_purpose::STANDARD, Engine};
    Value::String(STANDARD.encode(&bytes))
  } else {
    Value::String(text.trim_end_matches('\0').trim().to_string())
  };
  json!({ "path": path, "name": name, "value": value })
}

/// Extract raw pixel-data bytes from an uncompressed DICOM instance.
pub fn read_pixel_data(path: &Path) -> Result<Vec<u8>, String> {
  let object = open_file(path).map_err(|error| error.to_string())?;
  let element = object
    .element(PIXEL_DATA)
    .map_err(|error| format!("missing pixel data: {error}"))?;
  match element.value() {
    DicomValue::Primitive(primitive) => Ok(primitive.to_bytes().to_vec()),
    _ => Err("encapsulated (compressed) pixel data is not supported yet".to_string()),
  }
}

/// Ordered instance file names of a series directory by InstanceNumber.
pub fn order_instances(paths: &[(String, DicomFileMeta)]) -> Vec<String> {
  let mut ordered = paths.to_vec();
  ordered.sort_by_key(|(_, meta)| meta.instance_number);
  ordered.into_iter().map(|(path, _)| path).collect()
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn rejects_non_dicom_files() {
    let dir = std::env::temp_dir().join(format!("mri-dicom-{}", uuid::Uuid::new_v4()));
    std::fs::create_dir_all(&dir).unwrap();
    let path = dir.join("plain.txt");
    std::fs::write(&path, b"not dicom at all").unwrap();
    assert!(!looks_like_dicom(&path));
    assert!(read_meta(&path).is_err());
    assert!(dump_tags(&path).is_err());
    std::fs::remove_dir_all(dir).ok();
  }

  #[test]
  fn orders_instances_by_number() {
    let make = |n: i64| {
      (
        format!("file{n}.dcm"),
        DicomFileMeta {
          instance_number: n,
          ..Default::default()
        },
      )
    };
    let ordered = order_instances(&[make(3), make(1), make(2)]);
    assert_eq!(ordered, vec!["file1.dcm", "file2.dcm", "file3.dcm"]);
  }

  #[test]
  fn resolves_standard_tag_names() {
    assert_eq!(tag_name(Tag(0x0008, 0x0060)), "Modality");
    assert_eq!(tag_name(Tag(0x7FE0, 0x0010)), "PixelData");
    assert_eq!(tag_name(Tag(0xFFFF, 0xFFFF)), "Unknown");
  }

  #[test]
  fn derives_orientation_from_direction_cosines() {
    // Axial: row along x, column along y -> normal along z.
    assert_eq!(orientation_label("1\\0\\0\\0\\1\\0"), "Axial");
    // Sagittal: normal along x.
    assert_eq!(orientation_label("0\\1\\0\\0\\0\\-1"), "Sagittal");
    // Coronal: normal along y.
    assert_eq!(orientation_label("1\\0\\0\\0\\0\\-1"), "Coronal");
    assert_eq!(orientation_label(""), "");
    assert_eq!(orientation_label("bad\\input"), "");
  }
}
