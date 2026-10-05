use serde::{Deserialize, Serialize};

/// Major schema version this build understands. `pipeline` writes
/// `schema_version` into every manifest; a run with a different major version
/// is refused instead of being half-read.
pub const SUPPORTED_MAJOR: u32 = 0;

/// The pipeline writes snake_case JSON. The app serialises camelCase for the
/// web layer, so every field accepts both spellings on input.
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RunManifest {
    #[serde(alias = "schema_version")]
    pub schema_version: Option<String>,
    #[serde(alias = "git_commit")]
    pub git_commit: Option<String>,
    #[serde(alias = "git_branch")]
    pub git_branch: Option<String>,
    #[serde(alias = "config_hash")]
    pub config_hash: Option<String>,
    #[serde(alias = "data_hash")]
    pub data_hash: Option<String>,
    #[serde(alias = "seeds")]
    pub seeds: Option<i64>,
    #[serde(alias = "device")]
    pub device: Option<String>,
    #[serde(alias = "start_time")]
    pub start_time: Option<String>,
    #[serde(alias = "end_time")]
    pub end_time: Option<String>,
    #[serde(alias = "python_version")]
    pub python_version: Option<String>,
    #[serde(alias = "library_versions")]
    #[serde(default)]
    pub library_versions: serde_json::Map<String, serde_json::Value>,
    #[serde(flatten)]
    #[serde(default)]
    pub extra: serde_json::Map<String, serde_json::Value>,
}

/// `0.1.0` -> 0. Anything unparsable is treated as unsupported, so the
/// researcher is told rather than shown a broken run.
pub fn major_version(version: &str) -> Option<u32> {
    version.split('.').next().and_then(|part| part.parse().ok())
}

pub fn is_supported(version: &str) -> bool {
    major_version(version) == Some(SUPPORTED_MAJOR)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reads_a_manifest_written_by_the_pipeline() {
        let json = r#"{
      "schema_version": "0.1.0",
      "git_commit": "abc123",
      "seeds": 42,
      "device": "cpu",
      "start_time": "2026-10-05T10:00:00",
      "end_time": null,
      "python_version": "3.12.1",
      "library_versions": {"numpy": "2.1.0"},
      "unexpected_field": 7
    }"#;
        let manifest: RunManifest = serde_json::from_str(json).unwrap();
        assert_eq!(manifest.schema_version.as_deref(), Some("0.1.0"));
        assert_eq!(manifest.seeds, Some(42));
        assert!(manifest.end_time.is_none());
        assert!(manifest.extra.contains_key("unexpected_field"));
    }

    #[test]
    fn accepts_the_supported_major_version() {
        assert!(is_supported("0.1.0"));
        assert!(is_supported("0.9.3"));
    }

    #[test]
    fn refuses_an_unknown_major_version() {
        assert!(!is_supported("1.0.0"));
        assert!(!is_supported(""));
        assert_eq!(major_version("2.3.4"), Some(2));
        assert_eq!(major_version("nightly"), None);
    }
}
