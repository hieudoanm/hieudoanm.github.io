use crate::domain::cohort::CohortReport;
use crate::domain::rigour::RigourReport;
use crate::error::AppResult;
use crate::services::dataset::{self, ParticipantAsset};
use crate::services::paths;
use crate::services::settings::Settings;
use crate::state::AppState;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ConfigFile {
    #[serde(default)]
    pub path: String,
    #[serde(default)]
    pub name: String,
    pub config: Option<crate::domain::config::RunConfigView>,
    /// The config exactly as written, so re-launching a saved file does not
    /// drop fields this build does not display.
    #[serde(default)]
    pub raw: Option<serde_json::Value>,
}

#[tauri::command]
pub fn read_cohort(state: tauri::State<AppState>) -> AppResult<CohortReport> {
    dataset::cohort(&state.settings())
}

#[tauri::command]
pub fn read_rigour(state: tauri::State<AppState>) -> AppResult<RigourReport> {
    dataset::rigour(&state.settings())
}

#[tauri::command]
pub fn list_participant_assets(
    state: tauri::State<AppState>,
    participant_id: String,
) -> AppResult<Vec<ParticipantAsset>> {
    dataset::participant_assets(&state.settings(), &participant_id)
}

/// Config files the launch form can start from.
#[tauri::command]
pub fn list_configs(state: tauri::State<AppState>) -> Vec<ConfigFile> {
    let settings = state.settings();
    list_configs_in(&settings)
}

pub fn list_configs_in(settings: &Settings) -> Vec<ConfigFile> {
    let Ok(dir) = settings.config_path() else {
        return Vec::new();
    };
    let Ok(entries) = std::fs::read_dir(&dir) else {
        return Vec::new();
    };
    let mut files = Vec::new();
    for entry in entries.flatten() {
        let path = entry.path();
        let name = entry.file_name().to_string_lossy().to_string();
        if !path.is_file()
            || !matches!(
                path.extension().and_then(|value| value.to_str()),
                Some("yaml") | Some("yml") | Some("json")
            )
        {
            continue;
        }
        let relative = format!("{}/{}", settings.config_dir.trim_end_matches('/'), name);
        let text = paths::read_optional(&path);
        let (config, raw) = match text.as_deref().map(crate::domain::config::parse_raw) {
            Some(Ok((view, raw))) => (Some(view), Some(raw)),
            _ => (None, None),
        };
        files.push(ConfigFile {
            path: relative,
            name,
            config,
            raw,
        });
    }
    files.sort_by(|first, second| first.name.cmp(&second.name));
    files
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn lists_yaml_configs_with_their_parsed_values() {
        let dir = tempfile::tempdir().unwrap();
        let settings = Settings {
            project_root: Some(dir.path().to_string_lossy().to_string()),
            ..Settings::default()
        };
        std::fs::create_dir_all(dir.path().join("configs")).unwrap();
        std::fs::write(
            dir.path().join("configs/full.yaml"),
            "model:\n  model_type: resnet18\nsplit:\n  seed: 7\n",
        )
        .unwrap();
        std::fs::write(dir.path().join("configs/notes.txt"), "ignored").unwrap();
        let files = list_configs_in(&settings);
        assert_eq!(files.len(), 1);
        assert_eq!(files[0].path, "configs/full.yaml");
        assert_eq!(files[0].config.clone().unwrap().seed, Some(7));
    }

    #[test]
    fn keeps_fields_the_display_view_does_not_expose() {
        let dir = tempfile::tempdir().unwrap();
        let settings = Settings {
            project_root: Some(dir.path().to_string_lossy().to_string()),
            ..Settings::default()
        };
        std::fs::create_dir_all(dir.path().join("configs")).unwrap();
        std::fs::write(
            dir.path().join("configs/full.yaml"),
            "run:\n  run_id: locked\n  early_stopping:\n    patience: 5\n",
        )
        .unwrap();
        let files = list_configs_in(&settings);
        let raw = files[0].raw.as_ref().expect("raw config should be kept");
        assert_eq!(raw["run"]["run_id"], "locked");
        assert_eq!(raw["run"]["early_stopping"]["patience"], 5);
    }

    #[test]
    fn returns_nothing_without_a_project_folder() {
        let settings = Settings::default();
        assert!(list_configs_in(&settings).is_empty());
    }
}
