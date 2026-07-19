use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use serde::Serialize;
use tauri::AppHandle;
use tauri_plugin_dialog::DialogExt;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectPayload {
  name: String,
  content: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ImagePayload {
  name: String,
  data: String,
}

const PROJECT_TITLE: &str = "Brainbow project";
const PROJECT_FILTER: &str = "Brainbow project";
const PROJECT_EXTENSIONS: &[&str] = &["brainbow", "json"];

#[derive(Default)]
pub struct LaunchProject(pub Option<String>);

fn read_name(path: &std::path::Path, fallback: &str) -> String {
  path
    .file_stem()
    .and_then(|value| value.to_str())
    .unwrap_or(fallback)
    .to_string()
}

#[tauri::command]
pub async fn read_launch_project(
  state: tauri::State<'_, LaunchProject>,
) -> Result<Option<ProjectPayload>, String> {
  let Some(path_str) = state.0.clone() else {
    return Ok(None);
  };
  let path = std::path::PathBuf::from(&path_str);
  let content = std::fs::read_to_string(&path).map_err(|error| error.to_string())?;
  Ok(Some(ProjectPayload {
    name: read_name(&path, "project"),
    content,
  }))
}

#[tauri::command]
pub async fn pick_project_file(
  app: AppHandle,
) -> Result<Option<ProjectPayload>, String> {
  let Some(selected) = app
    .dialog()
    .file()
    .set_title(PROJECT_TITLE)
    .add_filter(PROJECT_FILTER, PROJECT_EXTENSIONS)
    .blocking_pick_file()
  else {
    return Ok(None);
  };
  let path = selected.into_path().map_err(|error| error.to_string())?;
  let content = std::fs::read_to_string(&path).map_err(|error| error.to_string())?;
  Ok(Some(ProjectPayload {
    name: read_name(&path, "project"),
    content,
  }))
}

#[tauri::command]
pub async fn pick_image_files(app: AppHandle) -> Result<Vec<ImagePayload>, String> {
  let Some(selected) = app
    .dialog()
    .file()
    .set_title("Select images")
    .add_filter("Images", &["png", "jpg", "jpeg", "webp", "tif", "tiff"])
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
    payloads.push(ImagePayload {
      name: read_name(&path, "image"),
      data: BASE64.encode(bytes),
    });
  }
  Ok(payloads)
}

#[tauri::command]
pub async fn save_project_file(
  app: AppHandle,
  default_name: String,
  content: String,
) -> Result<bool, String> {
  let Some(selected) = app
    .dialog()
    .file()
    .set_title(PROJECT_TITLE)
    .set_file_name(default_name)
    .add_filter(PROJECT_FILTER, &["brainbow"])
    .blocking_save_file()
  else {
    return Ok(false);
  };
  let path = selected.into_path().map_err(|error| error.to_string())?;
  std::fs::write(&path, content).map_err(|error| error.to_string())?;
  Ok(true)
}

