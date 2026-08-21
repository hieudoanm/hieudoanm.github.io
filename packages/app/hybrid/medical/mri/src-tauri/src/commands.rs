use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use serde::Serialize;
use tauri::AppHandle;
use tauri_plugin_dialog::DialogExt;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ScanPayload {
  name: String,
  data: String,
}

const SCAN_TITLE: &str = "MRI study files";
const SCAN_FILTER: &str = "MRI study files";
const SCAN_EXTENSIONS: &[&str] = &["dcm", "ima", "nii", "gz"];

fn read_name(path: &std::path::Path, fallback: &str) -> String {
  path
    .file_stem()
    .and_then(|value| value.to_str())
    .unwrap_or(fallback)
    .to_string()
}

#[tauri::command]
pub async fn pick_scan_files(app: AppHandle) -> Result<Vec<ScanPayload>, String> {
  let Some(selected) = app
    .dialog()
    .file()
    .set_title(SCAN_TITLE)
    .add_filter(SCAN_FILTER, SCAN_EXTENSIONS)
    .blocking_pick_files()
  else {
    return Ok(Vec::new());
  };
  let mut payloads = Vec::new();
  for file_path in selected {
    let Ok(path) = file_path.into_path() else {
      continue;
    };
    let Ok(bytes) = std::fs::read(&path) else {
      continue;
    };
    payloads.push(ScanPayload {
      name: read_name(&path, "scan"),
      data: BASE64.encode(bytes),
    });
  }
  Ok(payloads)
}
