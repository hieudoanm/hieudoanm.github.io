use crate::domain::config::RunConfigView;
use crate::domain::events::PipelineEvent;
use crate::domain::manifest::{is_supported, RunManifest, SUPPORTED_MAJOR};
use crate::domain::metrics::{self, MetricsDocument};
use crate::domain::run::{derive_status, ArtifactEntry, RunProblem};
use crate::error::{AppError, AppResult};
use crate::services::paths;
use std::path::Path;

pub const MANIFEST_FILE: &str = "manifest.json";
pub const CONFIG_FILE: &str = "config.yaml";
pub const CONFIG_JSON_FILE: &str = "config.json";
pub const EVENTS_FILE: &str = "events.jsonl";
pub const METRICS_FILE: &str = "metrics.json";
pub const PREDICTIONS_FILE: &str = "predictions.parquet";
pub const ARTIFACTS_DIR: &str = "artifacts";

/// What one run folder actually contained. Missing parts become `None` plus a
/// problem note, so a half-written run is still browsable.
#[derive(Debug, Default)]
pub struct RunFolder {
    pub manifest: Option<RunManifest>,
    pub manifest_error: Option<String>,
    pub config: Option<RunConfigView>,
    pub config_error: Option<String>,
    pub events: Vec<PipelineEvent>,
    pub metrics: Option<MetricsDocument>,
    pub metrics_error: Option<String>,
    pub artifacts: Vec<ArtifactEntry>,
}

pub fn is_run_folder(path: &Path) -> bool {
    path.is_dir()
        && path
            .file_name()
            .map(|name| name.to_string_lossy().starts_with("r_"))
            .unwrap_or(false)
}

pub fn read_manifest(dir: &Path) -> (Option<RunManifest>, Option<String>) {
    let path = dir.join(MANIFEST_FILE);
    let Some(text) = paths::read_optional(&path) else {
        return (None, None);
    };
    match serde_json::from_str::<RunManifest>(&text) {
        Ok(manifest) => (Some(manifest), None),
        Err(error) => (
            None,
            Some(format!("{MANIFEST_FILE} is not readable: {error}")),
        ),
    }
}

pub fn read_config(dir: &Path) -> (Option<RunConfigView>, Option<String>) {
    for name in [CONFIG_FILE, CONFIG_JSON_FILE] {
        let Some(text) = paths::read_optional(&dir.join(name)) else {
            continue;
        };
        return match crate::domain::config::parse(&text) {
            Ok(config) => (Some(config), None),
            Err(error) => (None, Some(format!("{name} could not be parsed: {error}"))),
        };
    }
    (None, None)
}

pub fn read_events(dir: &Path) -> Vec<PipelineEvent> {
    let Some(text) = paths::read_optional(&dir.join(EVENTS_FILE)) else {
        return Vec::new();
    };
    text.lines()
        .filter(|line| !line.trim().is_empty())
        .filter_map(PipelineEvent::parse)
        .collect()
}

pub fn read_metrics(dir: &Path) -> (Option<MetricsDocument>, Option<String>) {
    let Some(text) = paths::read_optional(&dir.join(METRICS_FILE)) else {
        return (None, None);
    };
    match metrics::parse(&text) {
        Ok(document) => (Some(document), None),
        Err(error) => (
            None,
            Some(format!("{METRICS_FILE} could not be parsed: {error}")),
        ),
    }
}

pub fn read_artifacts(dir: &Path, depth: usize) -> Vec<ArtifactEntry> {
    let mut entries = Vec::new();
    collect_artifacts(&dir.join(ARTIFACTS_DIR), dir, depth, &mut entries);
    entries.sort_by(|first, second| first.path.cmp(&second.path));
    entries
}

fn collect_artifacts(dir: &Path, root: &Path, depth: usize, entries: &mut Vec<ArtifactEntry>) {
    if depth == 0 {
        return;
    }
    let Ok(read_dir) = std::fs::read_dir(dir) else {
        return;
    };
    for entry in read_dir.flatten() {
        let path = entry.path();
        let name = entry.file_name().to_string_lossy().to_string();
        if path.is_dir() {
            collect_artifacts(&path, root, depth - 1, entries);
            continue;
        }
        let size = entry.metadata().map(|meta| meta.len()).unwrap_or(0);
        entries.push(ArtifactEntry {
            path: path
                .strip_prefix(root)
                .unwrap_or(&path)
                .to_string_lossy()
                .replace('\\', "/"),
            name: name.clone(),
            kind: crate::domain::run::artifact_kind(&name).to_string(),
            size_bytes: size,
        });
    }
}

pub fn load(dir: &Path) -> RunFolder {
    let (manifest, manifest_error) = read_manifest(dir);
    let (config, config_error) = read_config(dir);
    let events = read_events(dir);
    let (metrics, metrics_error) = read_metrics(dir);
    RunFolder {
        manifest,
        manifest_error,
        config,
        config_error,
        events,
        metrics,
        metrics_error,
        artifacts: read_artifacts(dir, 3),
    }
}

pub fn schema_supported(folder: &RunFolder) -> bool {
    match folder
        .manifest
        .as_ref()
        .and_then(|manifest| manifest.schema_version.clone())
    {
        Some(version) => is_supported(&version),
        None => false,
    }
}

pub fn status(folder: &RunFolder) -> &'static str {
    let has_end_time = folder
        .manifest
        .as_ref()
        .map(|manifest| manifest.end_time.is_some())
        .unwrap_or(false);
    let last_failure = folder
        .events
        .iter()
        .rev()
        .find(|event| {
            matches!(
                event,
                PipelineEvent::StageEnd { .. } | PipelineEvent::Error { .. }
            )
        })
        .map(|event| event.is_failure())
        .unwrap_or(false);
    derive_status(
        has_end_time,
        last_failure,
        !folder.events.is_empty(),
        schema_supported(folder),
    )
}

pub fn problems(folder: &RunFolder) -> Vec<RunProblem> {
    let mut problems = Vec::new();
    if let Some(message) = &folder.manifest_error {
        problems.push(problem("manifest_unreadable", message, true));
    } else if !schema_supported(folder) {
        let found = folder
            .manifest
            .as_ref()
            .and_then(|manifest| manifest.schema_version.clone())
            .unwrap_or_else(|| "unknown".to_string());
        problems.push(problem(
            "schema_unsupported",
            &format!(
                "this build reads schema version {SUPPORTED_MAJOR}.x, the run declares {found}"
            ),
            true,
        ));
    }
    if let Some(message) = &folder.config_error {
        problems.push(problem("config_unreadable", message, false));
    }
    if let Some(message) = &folder.metrics_error {
        problems.push(problem("metrics_unreadable", message, false));
    }
    if folder
        .manifest
        .as_ref()
        .map(|manifest| manifest.end_time.is_none())
        .unwrap_or(true)
    {
        problems.push(problem(
            "incomplete_run",
            "the run has no end_time, it may still be running elsewhere or was interrupted",
            false,
        ));
    }
    problems
}

fn problem(kind: &str, message: &str, blocking: bool) -> RunProblem {
    RunProblem {
        kind: kind.to_string(),
        message: message.to_string(),
        blocking,
    }
}

pub fn duration_seconds(start: Option<&String>, end: Option<&String>) -> Option<f64> {
    Some(epoch_seconds(end?)? - epoch_seconds(start?)?)
}

/// Seconds since the Unix epoch, parsed from the pipeline's ISO-8601 stamps.
fn epoch_seconds(value: &str) -> Option<f64> {
    let mut parts = value.split('T');
    let date = parts.next()?;
    let time = parts.next().unwrap_or("00:00:00");
    let mut date_parts = date.split('-');
    let year: i64 = date_parts.next()?.parse().ok()?;
    let month: i64 = date_parts.next()?.parse().ok()?;
    let day: i64 = date_parts.next()?.parse().ok()?;
    let mut time_parts = time.split(':');
    let hour: i64 = time_parts.next().unwrap_or("0").parse().ok()?;
    let minute: i64 = time_parts.next().unwrap_or("0").parse().ok()?;
    let second: f64 = time_parts.next().unwrap_or("0").parse().ok()?;
    Some(
        days_from_civil(year, month, day) as f64 * 86_400.0
            + hour as f64 * 3600.0
            + minute as f64 * 60.0
            + second,
    )
}

/// ISO-8601 timestamps without pulling in a date-time crate: the pipeline
/// writes `YYYY-MM-DDTHH:MM:SS[.ffffff]`.
fn days_from_civil(year: i64, month: i64, day: i64) -> i64 {
    let year = year - i64::from(month <= 2);
    let era = if year >= 0 { year } else { year - 399 } / 400;
    let year_of_era = year - era * 400;
    let month_shift = if month > 2 { month - 3 } else { month + 9 };
    let day_of_year = (153 * month_shift + 2) / 5 + day - 1;
    let day_of_era = year_of_era * 365 + year_of_era / 4 - year_of_era / 100 + day_of_year;
    era * 146_097 + day_of_era - 719_468
}

pub fn ensure_exists(dir: &Path, run_id: &str) -> AppResult<()> {
    if !dir.is_dir() {
        return Err(AppError::RunNotFound(run_id.to_string()));
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::Path;

    fn write_run(root: &Path, name: &str, manifest: &str, events: &str) {
        let dir = root.join(name);
        std::fs::create_dir_all(&dir).unwrap();
        std::fs::write(dir.join(MANIFEST_FILE), manifest).unwrap();
        std::fs::write(dir.join(EVENTS_FILE), events).unwrap();
    }

    #[test]
    fn reads_a_complete_run_folder() {
        let dir = tempfile::tempdir().unwrap();
        write_run(
      dir.path(),
      "r_20261005_120000_1",
      r#"{"schema_version":"0.1.0","start_time":"2026-10-05T12:00:00",
        "end_time":"2026-10-05T12:05:00","seeds":42,"device":"cpu"}"#,
      "{\"type\":\"stage_start\",\"stage\":\"train\"}\n{\"type\":\"stage_end\",\"stage\":\"train\",\"status\":\"ok\"}\n",
    );
        let folder = load(&dir.path().join("r_20261005_120000_1"));
        assert!(schema_supported(&folder));
        assert_eq!(status(&folder), crate::domain::run::STATUS_COMPLETED);
        assert_eq!(folder.events.len(), 2);
        assert!(problems(&folder).iter().all(|p| !p.blocking));
    }

    #[test]
    fn reports_a_missing_manifest_without_failing() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::create_dir_all(dir.path().join("r_empty")).unwrap();
        let folder = load(&dir.path().join("r_empty"));
        assert_eq!(status(&folder), crate::domain::run::STATUS_UNSUPPORTED);
        assert!(problems(&folder)
            .iter()
            .any(|problem| problem.kind == "schema_unsupported"));
    }

    #[test]
    fn detects_a_corrupt_manifest() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::create_dir_all(dir.path().join("r_broken")).unwrap();
        std::fs::write(dir.path().join("r_broken/manifest.json"), "{oops").unwrap();
        let folder = load(&dir.path().join("r_broken"));
        let notes = problems(&folder);
        assert!(notes.iter().any(|note| note.kind == "manifest_unreadable"));
    }

    #[test]
    fn flags_a_failed_run_from_the_event_stream() {
        let dir = tempfile::tempdir().unwrap();
        write_run(
            dir.path(),
            "r_fail",
            r#"{"schema_version":"0.1.0","start_time":"2026-10-05T12:00:00"}"#,
            "{\"type\":\"error\",\"stage\":\"train\",\"error\":\"boom\"}\n",
        );
        let folder = load(&dir.path().join("r_fail"));
        assert_eq!(status(&folder), crate::domain::run::STATUS_FAILED);
    }

    #[test]
    fn lists_artifacts_recursively() {
        let dir = tempfile::tempdir().unwrap();
        let run = dir.path().join("r_art");
        std::fs::create_dir_all(run.join("artifacts/figures")).unwrap();
        std::fs::write(run.join("artifacts/metrics.csv"), "a,b\n").unwrap();
        std::fs::write(run.join("artifacts/figures/saliency.png"), "x").unwrap();
        let artifacts = read_artifacts(&run, 3);
        assert_eq!(artifacts.len(), 2);
        assert_eq!(artifacts[0].kind, "image");
    }

    #[test]
    fn computes_a_duration_between_timestamps() {
        let start = "2026-10-05T12:00:00".to_string();
        let end = "2026-10-05T12:00:30".to_string();
        assert_eq!(duration_seconds(Some(&start), Some(&end)), Some(30.0));
        assert_eq!(duration_seconds(Some(&start), None), None);
    }

    #[test]
    fn ignores_unparseable_event_lines() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::create_dir_all(dir.path().join("r_x")).unwrap();
        std::fs::write(dir.path().join("r_x/events.jsonl"), "noise\n{}\n").unwrap();
        assert!(read_events(&dir.path().join("r_x")).is_empty());
    }

    #[test]
    fn recognises_run_folders_by_name() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::create_dir_all(dir.path().join("r_2026")).unwrap();
        std::fs::create_dir_all(dir.path().join("scratch")).unwrap();
        assert!(is_run_folder(&dir.path().join("r_2026")));
        assert!(!is_run_folder(&dir.path().join("scratch")));
    }
}
