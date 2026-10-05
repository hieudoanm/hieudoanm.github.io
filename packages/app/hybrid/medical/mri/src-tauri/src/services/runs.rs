use crate::domain::run::{RunDetail, RunSummary, STATUS_INCOMPLETE, STATUS_UNSUPPORTED};
use crate::error::{AppError, AppResult};
use crate::services::paths;
use crate::services::run_folder::{self, RunFolder};
use crate::services::settings::Settings;
use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TextFile {
    #[serde(default)]
    pub path: String,
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub text: String,
}

/// Every run folder under the configured runs directory. A folder without a
/// readable manifest is still listed, flagged, so nothing disappears.
pub fn list(settings: &Settings) -> AppResult<Vec<RunSummary>> {
    let runs_dir = settings.runs_path()?;
    if !runs_dir.is_dir() {
        return Ok(Vec::new());
    }
    let mut summaries = Vec::new();
    for entry in std::fs::read_dir(&runs_dir)
        .map_err(AppError::from)?
        .flatten()
    {
        let path = entry.path();
        if !run_folder::is_run_folder(&path) {
            continue;
        }
        summaries.push(summarise(&path));
    }
    summaries.sort_by(|first, second| {
        second
            .started_at
            .clone()
            .unwrap_or_default()
            .cmp(&first.started_at.clone().unwrap_or_default())
    });
    Ok(summaries)
}

pub fn summarise(run_dir: &Path) -> RunSummary {
    let folder = run_folder::load(run_dir);
    let run_id = run_dir
        .file_name()
        .map(|name| name.to_string_lossy().to_string())
        .unwrap_or_default();
    let config = folder.config.clone().unwrap_or_default();
    let manifest = folder.manifest.clone().unwrap_or_default();
    let started_at = manifest.start_time.clone();
    let ended_at = manifest.end_time.clone();
    RunSummary {
        run_id: run_id.clone(),
        path: run_dir.to_string_lossy().to_string(),
        name: config_name(run_dir),
        status: run_folder::status(&folder).to_string(),
        schema_version: manifest.schema_version.clone(),
        dataset: config.dataset.clone(),
        model_type: config.model_type.clone(),
        image_type: config.image_type.clone(),
        seed: manifest.seeds.or(config.seed),
        device: manifest.device.clone().or(config.device.clone()),
        git_commit: manifest.git_commit.clone(),
        started_at: started_at.clone(),
        ended_at: ended_at.clone(),
        duration_seconds: run_folder::duration_seconds(started_at.as_ref(), ended_at.as_ref()),
        n_metrics: folder
            .metrics
            .as_ref()
            .map(|document| document.metrics.len())
            .unwrap_or(0),
        last_event_at: last_event_timestamp(&folder),
        problems: run_folder::problems(&folder),
    }
}

/// Run folder names are machine identifiers; a `name:` key in the config is the
/// only human label the pipeline offers.
fn config_name(run_dir: &Path) -> Option<String> {
    let text = paths::read_optional(&run_dir.join(run_folder::CONFIG_FILE))?;
    for line in text.lines() {
        let trimmed = line.trim();
        if let Some(value) = trimmed.strip_prefix("name:") {
            return Some(value.trim().trim_matches(['\'', '"']).to_string());
        }
    }
    None
}

fn last_event_timestamp(folder: &RunFolder) -> Option<String> {
    folder.events.iter().rev().find_map(|event| match event {
        crate::domain::events::PipelineEvent::StageStart { timestamp, .. }
        | crate::domain::events::PipelineEvent::Progress { timestamp, .. }
        | crate::domain::events::PipelineEvent::Metric { timestamp, .. }
        | crate::domain::events::PipelineEvent::StageEnd { timestamp, .. }
        | crate::domain::events::PipelineEvent::Error { timestamp, .. } => timestamp.clone(),
        _ => None,
    })
}

pub fn run_dir(settings: &Settings, run_id: &str) -> AppResult<PathBuf> {
    paths::validate_run_id(run_id)?;
    let dir = settings.runs_path()?.join(run_id);
    run_folder::ensure_exists(&dir, run_id)?;
    Ok(dir)
}

pub fn read(settings: &Settings, run_id: &str) -> AppResult<RunDetail> {
    let dir = run_dir(settings, run_id)?;
    let folder = run_folder::load(&dir);
    if let Some(version) = folder
        .manifest
        .as_ref()
        .and_then(|manifest| manifest.schema_version.clone())
    {
        if !crate::domain::manifest::is_supported(&version) {
            return Err(AppError::UnsupportedSchema {
                found: version,
                expected: crate::domain::manifest::SUPPORTED_MAJOR,
            });
        }
    }
    let summary = summarise(&dir);
    let predictions_note = if dir.join(run_folder::PREDICTIONS_FILE).is_file() {
        Some(
            "predictions.parquet is present. The workbench reads CSV or JSON exports; run \
       `pipeline report --format csv` to read per-participant predictions here."
                .to_string(),
        )
    } else {
        None
    };
    Ok(RunDetail {
        summary,
        manifest: folder.manifest.clone(),
        config: folder.config.clone(),
        events: folder.events.clone(),
        metrics: folder.metrics.clone(),
        artifacts: folder.artifacts.clone(),
        predictions_note,
    })
}

/// Statuses the runs table offers as filters.
pub fn statuses() -> Vec<&'static str> {
    vec![
        STATUS_RUNNING_ALIAS,
        "completed",
        "failed",
        "cancelled",
        STATUS_INCOMPLETE,
        STATUS_UNSUPPORTED,
    ]
}

const STATUS_RUNNING_ALIAS: &str = "running";

/// Read any text file inside the project, used for artefacts, the protocol and
/// report tables. Binary files are refused with a clear message.
pub fn read_text(settings: &Settings, relative: &str) -> AppResult<TextFile> {
    let root = settings
        .project_root
        .clone()
        .ok_or(AppError::ProjectRootMissing)?;
    let path = paths::resolve_in(&PathBuf::from(root), relative)?;
    if !path.is_file() {
        return Err(AppError::Read {
            path: relative.to_string(),
            reason: "file not found".to_string(),
        });
    }
    let text = paths::read_text(&path, "file")?;
    Ok(TextFile {
        path: relative.to_string(),
        name: path
            .file_name()
            .map(|name| name.to_string_lossy().to_string())
            .unwrap_or_default(),
        text,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::services::settings::Settings;

    fn project() -> (tempfile::TempDir, Settings) {
        let dir = tempfile::tempdir().unwrap();
        let settings = Settings {
            project_root: Some(dir.path().to_string_lossy().to_string()),
            ..Settings::default()
        };
        (dir, settings)
    }

    fn write_run(runs: &Path, name: &str, manifest: &str) {
        let dir = runs.join(name);
        std::fs::create_dir_all(&dir).unwrap();
        std::fs::write(dir.join("manifest.json"), manifest).unwrap();
        std::fs::write(
            dir.join("config.yaml"),
            "name: 'hybrid roi'\nmodel:\n  model_type: resnet18\n",
        )
        .unwrap();
        std::fs::write(
            dir.join("metrics.json"),
            r#"{"metrics":{"auc":{"value":0.8,"ci_lower":0.7,"ci_upper":0.9}}}"#,
        )
        .unwrap();
    }

    #[test]
    fn lists_run_folders_newest_first() {
        let (dir, settings) = project();
        let runs = dir.path().join("runs");
        std::fs::create_dir_all(&runs).unwrap();
        write_run(
            &runs,
            "r_old",
            r#"{"schema_version":"0.1.0","start_time":"2026-10-01T10:00:00","end_time":"2026-10-01T11:00:00"}"#,
        );
        write_run(
            &runs,
            "r_new",
            r#"{"schema_version":"0.1.0","start_time":"2026-10-05T10:00:00","end_time":"2026-10-05T11:00:00"}"#,
        );
        let summaries = list(&settings).unwrap();
        assert_eq!(summaries.len(), 2);
        assert_eq!(summaries[0].run_id, "r_new");
        assert_eq!(summaries[0].status, "completed");
        assert_eq!(summaries[0].model_type.as_deref(), Some("resnet18"));
        assert_eq!(summaries[0].n_metrics, 1);
        assert_eq!(summaries[0].name.as_deref(), Some("hybrid roi"));
    }

    #[test]
    fn returns_an_empty_list_when_the_runs_folder_is_missing() {
        let (_dir, settings) = project();
        assert!(list(&settings).unwrap().is_empty());
    }

    #[test]
    fn reads_the_detail_of_one_run() {
        let (dir, settings) = project();
        let runs = dir.path().join("runs");
        std::fs::create_dir_all(&runs).unwrap();
        write_run(
            &runs,
            "r_20261005",
            r#"{"schema_version":"0.1.0","start_time":"2026-10-05T10:00:00","end_time":"2026-10-05T10:30:00","seeds":42}"#,
        );
        let detail = read(&settings, "r_20261005").unwrap();
        assert_eq!(detail.summary.duration_seconds, Some(1800.0));
        assert_eq!(detail.summary.seed, Some(42));
        assert!(detail.manifest.is_some());
        assert!(detail.config.is_some());
        assert_eq!(detail.metrics.unwrap().metrics.len(), 1);
    }

    #[test]
    fn refuses_an_unknown_schema_version() {
        let (dir, settings) = project();
        let runs = dir.path().join("runs");
        std::fs::create_dir_all(&runs).unwrap();
        write_run(
            &runs,
            "r_future",
            r#"{"schema_version":"2.0.0","start_time":"2026-10-05T10:00:00"}"#,
        );
        let error = read(&settings, "r_future").unwrap_err();
        assert!(matches!(error, AppError::UnsupportedSchema { .. }));
        assert!(error.to_string().contains("2.0.0"));
    }

    #[test]
    fn refuses_an_unknown_run() {
        let (_dir, settings) = project();
        let error = read(&settings, "r_missing").unwrap_err();
        assert!(matches!(error, AppError::RunNotFound(_)));
    }

    #[test]
    fn refuses_a_run_id_that_is_not_a_run() {
        let (dir, settings) = project();
        std::fs::create_dir_all(dir.path().join("runs")).unwrap();
        assert!(matches!(
            read(&settings, "../secrets"),
            Err(AppError::Invalid { .. })
        ));
    }

    #[test]
    fn reads_a_text_file_inside_the_project() {
        let (dir, settings) = project();
        std::fs::create_dir_all(dir.path().join("docs")).unwrap();
        std::fs::write(dir.path().join("docs/protocol.md"), "# protocol").unwrap();
        let file = read_text(&settings, "docs/protocol.md").unwrap();
        assert_eq!(file.text, "# protocol");
        assert_eq!(file.name, "protocol.md");
    }

    #[test]
    fn refuses_to_read_outside_the_project() {
        let (_dir, settings) = project();
        assert!(matches!(
            read_text(&settings, "../secret.txt"),
            Err(AppError::OutsideProject(_))
        ));
    }

    #[test]
    fn explains_a_missing_file() {
        let (_dir, settings) = project();
        let error = read_text(&settings, "docs/absent.md").unwrap_err();
        assert!(error.to_string().contains("file not found"));
    }
}
