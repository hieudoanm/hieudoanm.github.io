use serde::{Deserialize, Serialize};

pub const STATUS_RUNNING: &str = "running";
pub const STATUS_COMPLETED: &str = "completed";
pub const STATUS_FAILED: &str = "failed";
pub const STATUS_CANCELLED: &str = "cancelled";
pub const STATUS_INCOMPLETE: &str = "incomplete";
pub const STATUS_UNSUPPORTED: &str = "unsupported";

/// A readable note about a run folder that is missing or inconsistent. Shown
/// instead of an error page so one bad run never hides the rest.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RunProblem {
    #[serde(default)]
    pub kind: String,
    #[serde(default)]
    pub message: String,
    #[serde(default)]
    pub blocking: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ArtifactEntry {
    #[serde(default)]
    pub path: String,
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub kind: String,
    #[serde(alias = "size_bytes")]
    #[serde(default)]
    pub size_bytes: u64,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RunSummary {
    #[serde(alias = "run_id")]
    #[serde(default)]
    pub run_id: String,
    #[serde(default)]
    pub path: String,
    pub name: Option<String>,
    #[serde(default)]
    pub status: String,
    #[serde(alias = "schema_version")]
    pub schema_version: Option<String>,
    pub dataset: Option<String>,
    #[serde(alias = "model_type")]
    pub model_type: Option<String>,
    #[serde(alias = "image_type")]
    pub image_type: Option<String>,
    pub seed: Option<i64>,
    pub device: Option<String>,
    #[serde(alias = "git_commit")]
    pub git_commit: Option<String>,
    #[serde(alias = "started_at")]
    pub started_at: Option<String>,
    #[serde(alias = "ended_at")]
    pub ended_at: Option<String>,
    #[serde(alias = "duration_seconds")]
    pub duration_seconds: Option<f64>,
    #[serde(alias = "n_metrics")]
    #[serde(default)]
    pub n_metrics: usize,
    #[serde(alias = "last_event_at")]
    pub last_event_at: Option<String>,
    #[serde(default)]
    pub problems: Vec<RunProblem>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RunDetail {
    #[serde(default)]
    pub summary: RunSummary,
    pub manifest: Option<crate::domain::manifest::RunManifest>,
    pub config: Option<crate::domain::config::RunConfigView>,
    #[serde(default)]
    pub events: Vec<crate::domain::events::PipelineEvent>,
    pub metrics: Option<crate::domain::metrics::MetricsDocument>,
    #[serde(default)]
    pub artifacts: Vec<ArtifactEntry>,
    #[serde(alias = "predictions_note")]
    pub predictions_note: Option<String>,
}

/// Status from the manifest plus the last stage outcome. A run with no
/// `end_time` that recorded an error is failed, not running: the app is a file
/// reader and cannot know whether a process is alive elsewhere.
pub fn derive_status(
    has_end_time: bool,
    last_stage_failed: bool,
    has_any_event: bool,
    schema_supported: bool,
) -> &'static str {
    if !schema_supported {
        return STATUS_UNSUPPORTED;
    }
    if has_end_time {
        return STATUS_COMPLETED;
    }
    if last_stage_failed {
        return STATUS_FAILED;
    }
    if has_any_event {
        return STATUS_RUNNING;
    }
    STATUS_INCOMPLETE
}

pub fn artifact_kind(name: &str) -> &'static str {
    let lowered = name.to_ascii_lowercase();
    if lowered.ends_with(".png") {
        "image"
    } else if lowered.ends_with(".csv") || lowered.ends_with(".tsv") {
        "table"
    } else if lowered.ends_with(".tex") {
        "latex"
    } else if lowered.ends_with(".json") {
        "json"
    } else if lowered.ends_with(".yaml") || lowered.ends_with(".yml") {
        "config"
    } else if lowered.ends_with(".nii") || lowered.ends_with(".nii.gz") {
        "nifti"
    } else if lowered.ends_with(".md") {
        "document"
    } else {
        "file"
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::domain::events::PipelineEvent;

    #[test]
    fn a_finished_run_is_completed() {
        let status = derive_status(true, false, true, true);
        assert_eq!(status, STATUS_COMPLETED);
    }

    #[test]
    fn an_unfinished_run_without_events_is_incomplete() {
        assert_eq!(derive_status(false, false, false, true), STATUS_INCOMPLETE);
    }

    #[test]
    fn an_unfinished_run_with_events_is_running() {
        assert_eq!(derive_status(false, false, true, true), STATUS_RUNNING);
    }

    #[test]
    fn an_error_outcome_overrides_running() {
        assert_eq!(derive_status(false, true, true, true), STATUS_FAILED);
    }

    #[test]
    fn an_unsupported_schema_wins_over_everything() {
        assert_eq!(derive_status(true, false, true, false), STATUS_UNSUPPORTED);
    }

    #[test]
    fn detects_a_failure_in_the_event_stream() {
        let events = [
            PipelineEvent::parse(r#"{"type":"stage_start","stage":"train"}"#).unwrap(),
            PipelineEvent::parse(r#"{"type":"error","stage":"train","error":"boom"}"#).unwrap(),
        ];
        let failed = events.iter().rev().find(|event| {
            matches!(
                event,
                PipelineEvent::StageEnd { .. } | PipelineEvent::Error { .. }
            )
        });
        assert!(failed.unwrap().is_failure());
    }

    #[test]
    fn classifies_artifacts_by_extension() {
        assert_eq!(artifact_kind("saliency.png"), "image");
        assert_eq!(artifact_kind("metrics.csv"), "table");
        assert_eq!(artifact_kind("metrics.tex"), "latex");
        assert_eq!(artifact_kind("sub-01_T1w.nii.gz"), "nifti");
        assert_eq!(artifact_kind("protocol.md"), "document");
        assert_eq!(artifact_kind("blob.bin"), "file");
    }
}
