use crate::domain::run::RunSummary;
use crate::services::dataset;
use crate::services::runs;
use crate::services::settings::Settings;
use crate::state::AppState;
use serde::{Deserialize, Serialize};

/// One call for the dashboard: is the project usable, and what is in it?
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Overview {
    #[serde(default)]
    pub configured: bool,
    #[serde(alias = "project_root")]
    pub project_root: Option<String>,
    #[serde(alias = "runs_dir")]
    #[serde(default)]
    pub runs_dir: String,
    #[serde(alias = "python_env")]
    #[serde(default)]
    pub python_env: String,
    #[serde(alias = "run_count")]
    #[serde(default)]
    pub run_count: usize,
    #[serde(alias = "completed_count")]
    #[serde(default)]
    pub completed_count: usize,
    #[serde(alias = "failed_count")]
    #[serde(default)]
    pub failed_count: usize,
    #[serde(alias = "running_count")]
    #[serde(default)]
    pub running_count: usize,
    #[serde(alias = "unsupported_count")]
    #[serde(default)]
    pub unsupported_count: usize,
    #[serde(alias = "latest_run")]
    pub latest_run: Option<RunSummary>,
    #[serde(alias = "cohort_participants")]
    pub cohort_participants: Option<usize>,
    #[serde(alias = "cohort_excluded")]
    pub cohort_excluded: Option<usize>,
    #[serde(alias = "setup_hint")]
    pub setup_hint: Option<String>,
}

#[tauri::command]
pub fn get_overview(state: tauri::State<AppState>) -> Overview {
    overview_of(&state.settings())
}

pub fn overview_of(settings: &Settings) -> Overview {
    let summaries = runs::list(settings).unwrap_or_default();
    let cohort = dataset::cohort(settings).ok();
    let configured = settings.is_configured();
    Overview {
        configured,
        setup_hint: setup_hint(settings),
        project_root: settings.project_root.clone(),
        runs_dir: settings.runs_dir.clone(),
        python_env: settings.python_env.clone(),
        run_count: summaries.len(),
        completed_count: count(&summaries, "completed"),
        failed_count: count(&summaries, "failed"),
        running_count: count(&summaries, "running"),
        unsupported_count: count(&summaries, "unsupported"),
        latest_run: summaries.first().cloned(),
        cohort_participants: cohort.as_ref().map(|report| report.unique_participants),
        cohort_excluded: cohort.as_ref().map(|report| report.flags.len()),
    }
}

fn setup_hint(settings: &Settings) -> Option<String> {
    if settings.is_configured() {
        return None;
    }
    Some("Choose the pipeline project folder to start browsing runs".to_string())
}

fn count(summaries: &[RunSummary], status: &str) -> usize {
    summaries
        .iter()
        .filter(|summary| summary.status == status)
        .count()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn asks_for_the_project_folder_when_it_is_missing() {
        let overview = overview_of(&Settings::default());
        assert!(!overview.configured);
        assert_eq!(overview.run_count, 0);
        assert!(overview.setup_hint.is_some());
    }

    #[test]
    fn counts_runs_by_status() {
        let dir = tempfile::tempdir().unwrap();
        let runs = dir.path().join("runs");
        std::fs::create_dir_all(runs.join("r_done")).unwrap();
        std::fs::write(
            runs.join("r_done/manifest.json"),
            r#"{"schema_version":"0.1.0","end_time":"2026-10-05T10:00:00"}"#,
        )
        .unwrap();
        let settings = Settings {
            project_root: Some(dir.path().to_string_lossy().to_string()),
            ..Settings::default()
        };
        let overview = overview_of(&settings);
        assert!(overview.configured);
        assert_eq!(overview.completed_count, 1);
        assert!(overview.setup_hint.is_none());
    }
}
