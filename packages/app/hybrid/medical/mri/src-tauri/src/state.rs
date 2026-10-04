use crate::services::launcher::registry::Registry;
use crate::services::settings::{self, Settings};
use std::path::PathBuf;
use std::sync::{Arc, Mutex};

/// Application state: the project settings on disk plus the process registry
/// that owns at most one running pipeline.
pub struct AppState {
    settings: Mutex<Settings>,
    settings_path: PathBuf,
    pub launches: Arc<Registry>,
}

impl AppState {
    pub fn new(app_dir: PathBuf) -> Self {
        let settings_path = settings::settings_file(&app_dir);
        Self {
            settings: Mutex::new(settings::load(&settings_path)),
            settings_path,
            launches: Arc::new(Registry::new()),
        }
    }

    pub fn settings(&self) -> Settings {
        self.settings
            .lock()
            .unwrap_or_else(|poisoned| poisoned.into_inner())
            .clone()
    }

    pub fn save_settings(&self, next: Settings) -> Result<Settings, String> {
        settings::save(&self.settings_path, &next).map_err(|error| error.to_string())?;
        Ok(next)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn starts_without_a_project_folder() {
        let dir = tempfile::tempdir().unwrap();
        let state = AppState::new(dir.path().to_path_buf());
        assert!(!state.settings().is_configured());
        assert!(state.launches.active().is_none());
    }

    #[test]
    fn persists_settings_between_instances() {
        let dir = tempfile::tempdir().unwrap();
        let state = AppState::new(dir.path().to_path_buf());
        let mut next = state.settings();
        next.project_root = Some(dir.path().to_string_lossy().to_string());
        state.save_settings(next).unwrap();
        let reopened = AppState::new(dir.path().to_path_buf());
        assert!(reopened.settings().is_configured());
    }
}
