use crate::error::{AppError, AppResult};
use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};

pub const DEFAULT_RUNS_DIR: &str = "runs";
pub const DEFAULT_CONFIG_DIR: &str = "configs";
pub const DEFAULT_COHORT_PATH: &str = "data/cohort.tsv";
pub const DEFAULT_SPLITS_PATH: &str = "data/splits.json";
pub const DEFAULT_LOCK_BOX_LOG_PATH: &str = "data/lockbox_access_log.json";
pub const DEFAULT_PROTOCOL_PATH: &str = "docs/protocol.md";
pub const DEFAULT_IMAGING_DIR: &str = "data/subjects";
pub const DEFAULT_DERIVED_DIR: &str = "data/derived";
pub const DEFAULT_PYTHON_ENV: &str = "uv";

/// Everything the workbench remembers. Paths are relative to the project
/// folder so a project can be moved without breaking the settings.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", default)]
pub struct Settings {
    #[serde(alias = "project_root")]
    pub project_root: Option<String>,
    #[serde(alias = "runs_dir")]
    #[serde(default)]
    pub runs_dir: String,
    #[serde(alias = "config_dir")]
    #[serde(default)]
    pub config_dir: String,
    #[serde(alias = "cohort_path")]
    #[serde(default)]
    pub cohort_path: String,
    #[serde(alias = "splits_path")]
    #[serde(default)]
    pub splits_path: String,
    #[serde(alias = "lock_box_log_path")]
    #[serde(default)]
    pub lock_box_log_path: String,
    #[serde(alias = "protocol_path")]
    #[serde(default)]
    pub protocol_path: String,
    #[serde(alias = "imaging_dir")]
    #[serde(default)]
    pub imaging_dir: String,
    #[serde(alias = "derived_dir")]
    #[serde(default)]
    pub derived_dir: String,
    #[serde(alias = "python_env")]
    #[serde(default)]
    pub python_env: String,
    #[serde(alias = "lock_box_budget")]
    pub lock_box_budget: Option<usize>,
    #[serde(alias = "remote_url")]
    pub remote_url: Option<String>,
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            project_root: None,
            runs_dir: DEFAULT_RUNS_DIR.to_string(),
            config_dir: DEFAULT_CONFIG_DIR.to_string(),
            cohort_path: DEFAULT_COHORT_PATH.to_string(),
            splits_path: DEFAULT_SPLITS_PATH.to_string(),
            lock_box_log_path: DEFAULT_LOCK_BOX_LOG_PATH.to_string(),
            protocol_path: DEFAULT_PROTOCOL_PATH.to_string(),
            imaging_dir: DEFAULT_IMAGING_DIR.to_string(),
            derived_dir: DEFAULT_DERIVED_DIR.to_string(),
            python_env: DEFAULT_PYTHON_ENV.to_string(),
            lock_box_budget: Some(1),
            remote_url: None,
        }
    }
}

impl Settings {
    pub fn is_configured(&self) -> bool {
        self.project_root.is_some()
    }

    pub fn uses_uv(&self) -> bool {
        self.python_env.trim() == DEFAULT_PYTHON_ENV
    }

    pub fn runs_path(&self) -> AppResult<PathBuf> {
        self.resolve(&self.runs_dir)
    }

    pub fn config_path(&self) -> AppResult<PathBuf> {
        self.resolve(&self.config_dir)
    }

    pub fn resolve(&self, relative: &str) -> AppResult<PathBuf> {
        let root = self
            .project_root
            .clone()
            .ok_or(AppError::ProjectRootMissing)?;
        crate::services::paths::resolve_in(&PathBuf::from(root), relative)
    }
}

pub fn settings_file(app_dir: &Path) -> PathBuf {
    app_dir.join("settings.json")
}

pub fn load(path: &Path) -> Settings {
    std::fs::read_to_string(path)
        .ok()
        .and_then(|text| serde_json::from_str(&text).ok())
        .unwrap_or_default()
}

pub fn save(path: &Path, settings: &Settings) -> AppResult<()> {
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent)?;
    }
    let text = serde_json::to_string_pretty(settings).map_err(|error| AppError::Parse {
        kind: "settings",
        reason: error.to_string(),
    })?;
    std::fs::write(path, text)?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn starts_unconfigured_with_sensible_defaults() {
        let settings = Settings::default();
        assert!(!settings.is_configured());
        assert_eq!(settings.runs_dir, DEFAULT_RUNS_DIR);
        assert_eq!(settings.imaging_dir, DEFAULT_IMAGING_DIR);
        assert!(settings.uses_uv());
    }

    #[test]
    fn resolves_paths_inside_the_project() {
        let settings = Settings {
            project_root: Some("/tmp/project".to_string()),
            ..Settings::default()
        };
        assert_eq!(
            settings.runs_path().unwrap(),
            PathBuf::from("/tmp/project/runs")
        );
    }

    #[test]
    fn refuses_to_resolve_without_a_project_folder() {
        let settings = Settings::default();
        assert!(matches!(
            settings.runs_path(),
            Err(AppError::ProjectRootMissing)
        ));
    }

    #[test]
    fn round_trips_through_disk() {
        let dir = tempfile::tempdir().unwrap();
        let path = settings_file(dir.path());
        let mut settings = Settings {
            project_root: Some("/tmp/project".to_string()),
            ..Settings::default()
        };
        settings.lock_box_budget = Some(3);
        save(&path, &settings).unwrap();
        let loaded = load(&path);
        assert_eq!(loaded.project_root.as_deref(), Some("/tmp/project"));
        assert_eq!(loaded.lock_box_budget, Some(3));
    }

    #[test]
    fn falls_back_to_defaults_for_a_missing_file() {
        let dir = tempfile::tempdir().unwrap();
        assert!(!load(&settings_file(dir.path())).is_configured());
    }
}
