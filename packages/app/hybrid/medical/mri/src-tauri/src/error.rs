use serde::{Serialize, Serializer};

/// Every failure the workbench can show the researcher. Each variant carries a
/// message that explains the problem in plain language, never a bare errno.
#[derive(Debug, thiserror::Error)]
pub enum AppError {
    #[error("project folder is not set. Open Settings and choose the pipeline project folder")]
    ProjectRootMissing,
    #[error("project folder not found: {0}")]
    ProjectRootMissingOnDisk(String),
    #[error("path is outside the project folder: {0}")]
    OutsideProject(String),
    #[error("invalid {kind}: {value}")]
    Invalid { kind: &'static str, value: String },
    #[error("run not found: {0}")]
    RunNotFound(String),
    #[error("unsupported run schema version {found}; this build reads major version {expected}")]
    UnsupportedSchema { found: String, expected: u32 },
    #[error("could not read {path}: {reason}")]
    Read { path: String, reason: String },
    #[error("could not parse {kind}: {reason}")]
    Parse { kind: &'static str, reason: String },
    #[error("a run is already active. Cancel it before starting another one")]
    RunBusy,
    #[error("run not active: {0}")]
    RunNotActive(String),
    #[error("setup check failed: {0}")]
    Doctor(String),
    #[error("{0}")]
    Message(String),
    #[error(transparent)]
    Io(#[from] std::io::Error),
}

impl Serialize for AppError {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_str(&self.to_string())
    }
}

pub type AppResult<T> = Result<T, AppError>;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn serializes_to_a_readable_message() {
        let error = AppError::RunNotFound("r_missing".to_string());
        assert_eq!(
            serde_json::to_string(&error).unwrap(),
            "\"run not found: r_missing\""
        );
    }

    #[test]
    fn explains_a_missing_project_folder() {
        assert_eq!(
            AppError::ProjectRootMissing.to_string(),
            "project folder is not set. Open Settings and choose the pipeline project folder"
        );
    }

    #[test]
    fn rejects_paths_outside_the_project() {
        let error = AppError::OutsideProject("/etc/passwd".to_string());
        assert!(error.to_string().contains("outside the project folder"));
    }
}
