use serde::{Deserialize, Serialize};

/// JSON Lines event contract from `pipeline/src/pipeline/core/events.py`.
/// Unknown lines are preserved as `Other` so a newer pipeline never loses data.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum PipelineEvent {
    StageStart {
        timestamp: Option<String>,
        #[serde(default)]
        stage: String,
        #[serde(default)]
        run_id: Option<String>,
    },
    Progress {
        timestamp: Option<String>,
        #[serde(default)]
        stage: String,
        #[serde(default)]
        seed: Option<i64>,
        #[serde(default)]
        fold: Option<i64>,
        #[serde(default)]
        epoch: Option<i64>,
        #[serde(default)]
        loss: Option<f64>,
        #[serde(flatten)]
        extra: serde_json::Map<String, serde_json::Value>,
    },
    Metric {
        timestamp: Option<String>,
        #[serde(default)]
        stage: String,
        name: String,
        value: f64,
        #[serde(default)]
        fold: Option<i64>,
    },
    StageEnd {
        timestamp: Option<String>,
        #[serde(default)]
        stage: String,
        #[serde(default)]
        status: String,
    },
    Error {
        timestamp: Option<String>,
        #[serde(default)]
        stage: String,
        #[serde(default)]
        error: String,
    },
    Other(serde_json::Value),
}

impl PipelineEvent {
    /// Unknown `type` values are kept verbatim instead of being dropped, so a
    /// newer pipeline never loses events this build cannot interpret.
    pub fn parse(line: &str) -> Option<Self> {
        let value: serde_json::Value = serde_json::from_str(line).ok()?;
        value.get("type")?;
        serde_json::from_value(value.clone())
            .ok()
            .or(Some(PipelineEvent::Other(value)))
    }

    pub fn stage(&self) -> &str {
        match self {
            Self::StageStart { stage, .. }
            | Self::Progress { stage, .. }
            | Self::StageEnd { stage, .. }
            | Self::Error { stage, .. } => stage,
            Self::Metric { stage, .. } => stage,
            Self::Other(_) => "",
        }
    }

    /// True when the event means the run stopped because something broke.
    pub fn is_failure(&self) -> bool {
        match self {
            Self::Error { .. } => true,
            Self::StageEnd { status, .. } => status != "ok" && !status.is_empty(),
            _ => false,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_a_stage_start_line() {
        let line = r#"{"type":"stage_start","stage":"train","run_id":"r_1","timestamp":"2026-10-05T10:00:00"}"#;
        let event = PipelineEvent::parse(line).unwrap();
        assert_eq!(event.stage(), "train");
        assert!(!event.is_failure());
    }

    #[test]
    fn parses_a_progress_line_with_loss() {
        let line = r#"{"type":"progress","stage":"train","epoch":3,"loss":0.21,"seed":42}"#;
        match PipelineEvent::parse(line).unwrap() {
            PipelineEvent::Progress { epoch, loss, .. } => {
                assert_eq!(epoch, Some(3));
                assert_eq!(loss, Some(0.21));
            }
            other => panic!("expected progress, got {other:?}"),
        }
    }

    #[test]
    fn flags_error_and_failed_stage_end_events() {
        let error =
            PipelineEvent::parse(r#"{"type":"error","stage":"train","error":"boom"}"#).unwrap();
        assert!(error.is_failure());
        let failed =
            PipelineEvent::parse(r#"{"type":"stage_end","stage":"train","status":"error"}"#)
                .unwrap();
        assert!(failed.is_failure());
        let ok =
            PipelineEvent::parse(r#"{"type":"stage_end","stage":"train","status":"ok"}"#).unwrap();
        assert!(!ok.is_failure());
    }

    #[test]
    fn keeps_unknown_event_types() {
        let event = PipelineEvent::parse(r#"{"type":"gpu_peak","megabytes":900}"#).unwrap();
        assert!(matches!(event, PipelineEvent::Other(_)));
    }

    #[test]
    fn ignores_lines_without_a_type() {
        assert!(PipelineEvent::parse("not json").is_none());
        assert!(PipelineEvent::parse(r#"{"stage":"train"}"#).is_none());
    }
}
