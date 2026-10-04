use crate::error::{AppError, AppResult};
use std::path::{Component, Path, PathBuf};

/// Filesystem access is scoped to the project folder. Anything that escapes it
/// is refused before a byte is read, which also blocks `..` traversal and
/// absolute paths pointing elsewhere on the machine.
pub fn resolve_in(root: &Path, relative: &str) -> AppResult<PathBuf> {
    if relative.trim().is_empty() {
        return Err(AppError::Invalid {
            kind: "path",
            value: relative.to_string(),
        });
    }
    let candidate = Path::new(relative);
    if candidate.is_absolute() {
        return Err(AppError::OutsideProject(relative.to_string()));
    }
    for component in candidate.components() {
        if matches!(component, Component::ParentDir | Component::RootDir) {
            return Err(AppError::OutsideProject(relative.to_string()));
        }
    }
    let resolved = root.join(candidate);
    if !resolved.starts_with(root) {
        return Err(AppError::OutsideProject(relative.to_string()));
    }
    Ok(resolved)
}

/// Run folders are named `r_<timestamp>_<microseconds>` by the pipeline. Only
/// that shape is accepted as a run identifier.
pub fn validate_run_id(run_id: &str) -> AppResult<()> {
    let rest = run_id.strip_prefix("r_").ok_or_else(|| AppError::Invalid {
        kind: "run id",
        value: run_id.to_string(),
    })?;
    let valid = !rest.is_empty()
        && rest
            .chars()
            .all(|character| character.is_ascii_alphanumeric() || character == '_');
    if !valid {
        return Err(AppError::Invalid {
            kind: "run id",
            value: run_id.to_string(),
        });
    }
    Ok(())
}

pub fn read_text(path: &Path, kind: &'static str) -> AppResult<String> {
    std::fs::read_to_string(path).map_err(|error| AppError::Read {
        path: path.display().to_string(),
        reason: format!("{kind} could not be read: {error}"),
    })
}

/// `YYYYMMDD_HHMMSS` in UTC, the shape the pipeline uses in run identifiers.
pub fn timestamp_utc(epoch_millis: u64) -> String {
    let seconds = epoch_millis / 1000;
    let days = (seconds / 86_400) as i64;
    let rest = seconds % 86_400;
    let (year, month, day) = civil_from_days(days);
    format!(
        "{year:04}{month:02}{day:02}_{:02}{:02}{:02}",
        rest / 3600,
        (rest % 3600) / 60,
        rest % 60
    )
}

fn civil_from_days(days: i64) -> (i64, i64, i64) {
    let shifted = days + 719_468;
    let era = if shifted >= 0 {
        shifted
    } else {
        shifted - 146_096
    } / 146_097;
    let day_of_era = shifted - era * 146_097;
    let year_of_era =
        (day_of_era - day_of_era / 1460 + day_of_era / 36_524 - day_of_era / 146_096) / 365;
    let year = year_of_era + era * 400;
    let day_of_year = day_of_era - (365 * year_of_era + year_of_era / 4 - year_of_era / 100);
    let month_shift = (5 * day_of_year + 2) / 153;
    let day = day_of_year - (153 * month_shift + 2) / 5 + 1;
    let month = if month_shift < 10 {
        month_shift + 3
    } else {
        month_shift - 9
    };
    (if month <= 2 { year + 1 } else { year }, month, day)
}

pub fn read_optional(path: &Path) -> Option<String> {
    std::fs::read_to_string(path).ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn joins_a_relative_path() {
        let root = PathBuf::from("/project");
        assert_eq!(
            resolve_in(&root, "runs/r_1").unwrap(),
            PathBuf::from("/project/runs/r_1")
        );
    }

    #[test]
    fn rejects_traversal() {
        let root = PathBuf::from("/project");
        assert!(matches!(
            resolve_in(&root, "../etc/passwd"),
            Err(AppError::OutsideProject(_))
        ));
        assert!(matches!(
            resolve_in(&root, "runs/../../etc"),
            Err(AppError::OutsideProject(_))
        ));
    }

    #[test]
    fn rejects_absolute_paths_outside_the_project() {
        let root = PathBuf::from("/project");
        assert!(matches!(
            resolve_in(&root, "/etc/passwd"),
            Err(AppError::OutsideProject(_))
        ));
    }

    #[test]
    fn rejects_an_empty_path() {
        let root = PathBuf::from("/project");
        assert!(resolve_in(&root, "  ").is_err());
    }

    #[test]
    fn accepts_pipeline_run_ids() {
        assert!(validate_run_id("r_20261005_120000_123456").is_ok());
    }

    #[test]
    fn rejects_other_run_ids() {
        assert!(validate_run_id("20261005").is_err());
        assert!(validate_run_id("r_").is_err());
        assert!(validate_run_id("r_bad-name").is_err());
        assert!(validate_run_id("../r_1").is_err());
    }

    #[test]
    fn formats_a_utc_run_timestamp() {
        assert_eq!(timestamp_utc(0), "19700101_000000");
        assert_eq!(timestamp_utc(1_760_000_000_000), "20251009_085320");
    }

    #[test]
    fn reads_a_file_and_explains_a_missing_one() {
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("present.txt");
        std::fs::write(&path, "hello").unwrap();
        assert_eq!(read_text(&path, "file").unwrap(), "hello");
        let error = read_text(&dir.path().join("absent.txt"), "file").unwrap_err();
        assert!(error.to_string().contains("could not read"));
    }

    #[test]
    fn optional_read_returns_none_for_a_missing_file() {
        let dir = tempfile::tempdir().unwrap();
        assert!(read_optional(&dir.path().join("absent.txt")).is_none());
    }
}
