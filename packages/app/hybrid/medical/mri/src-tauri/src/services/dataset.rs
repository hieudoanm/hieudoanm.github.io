use crate::domain::cohort::{self, CohortReport};
use crate::domain::rigour::{self, RigourReport};
use crate::error::{AppError, AppResult};
use crate::services::paths;
use crate::services::settings::Settings;
use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};

pub const MASK_HINT: &str = "mask";
pub const ATLAS_HINT: &str = "atlas";
/// `data/subjects/<participant>/anat/<file>` is three levels deep.
pub const ASSET_SEARCH_DEPTH: usize = 3;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ParticipantAsset {
    #[serde(alias = "participant_id")]
    #[serde(default)]
    pub participant_id: String,
    #[serde(default)]
    pub path: String,
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub role: String,
    #[serde(alias = "size_bytes")]
    #[serde(default)]
    pub size_bytes: u64,
}

pub fn cohort(settings: &Settings) -> AppResult<CohortReport> {
    let path = settings.resolve(&settings.cohort_path)?;
    let text = read_optional(&path).ok_or_else(|| AppError::Read {
        path: settings.cohort_path.clone(),
        reason: "cohort table not found. Run `pipeline data cohort` to build it".to_string(),
    })?;
    cohort::parse(&text, &settings.cohort_path).map_err(|reason| AppError::Parse {
        kind: "cohort",
        reason,
    })
}

/// Row order matters: `splits.json` stores fold indices into this table.
pub fn participant_order(settings: &Settings) -> Vec<String> {
    cohort(settings)
        .map(|report| {
            report
                .rows
                .iter()
                .map(|row| row.participant_id.clone())
                .collect()
        })
        .unwrap_or_default()
}

pub fn rigour(settings: &Settings) -> AppResult<RigourReport> {
    let participants = participant_order(settings);
    let splits = read_splits(settings, &participants);
    let lock_box = read_lock_box(settings);
    let protocol_path = settings.resolve(&settings.protocol_path).ok();
    let available = protocol_path.map(|path| path.is_file()).unwrap_or(false);
    Ok(rigour::build_report(
        splits,
        lock_box,
        settings.lock_box_budget,
        &participants,
        (settings.protocol_path.clone(), available),
    ))
}

pub fn read_splits(
    settings: &Settings,
    participants: &[String],
) -> Option<crate::domain::rigour::SplitsDocument> {
    let path = settings.resolve(&settings.splits_path).ok()?;
    let text = read_optional(&path)?;
    rigour::parse_splits(&text, participants).ok()
}

pub fn read_lock_box(settings: &Settings) -> Option<crate::domain::rigour::LockBoxLog> {
    let path = settings.resolve(&settings.lock_box_log_path).ok()?;
    let text = read_optional(&path)?;
    rigour::parse_lock_box(&text).ok()
}

/// Scans, lesion masks, atlas volumes and generated images for one participant.
/// Nothing is interpreted here: files are grouped by name so the researcher
/// decides what a file is.
pub fn participant_assets(
    settings: &Settings,
    participant_id: &str,
) -> AppResult<Vec<ParticipantAsset>> {
    if participant_id.trim().is_empty() {
        return Err(AppError::Invalid {
            kind: "participant id",
            value: participant_id.to_string(),
        });
    }
    let mut assets = Vec::new();
    for relative in [&settings.imaging_dir, &settings.derived_dir] {
        let Ok(dir) = settings.resolve(relative) else {
            continue;
        };
        collect(&dir, participant_id, &mut assets, ASSET_SEARCH_DEPTH);
    }
    assets.sort_by(|first, second| {
        first
            .role
            .cmp(&second.role)
            .then(first.name.cmp(&second.name))
    });
    Ok(assets)
}

fn collect(dir: &PathBuf, participant_id: &str, assets: &mut Vec<ParticipantAsset>, depth: usize) {
    if depth == 0 {
        return;
    }
    let Ok(entries) = std::fs::read_dir(dir) else {
        return;
    };
    for entry in entries.flatten() {
        let path = entry.path();
        let name = entry.file_name().to_string_lossy().to_string();
        if path.is_dir() {
            collect(&path, participant_id, assets, depth - 1);
        } else if name.starts_with(participant_id) {
            assets.push(ParticipantAsset {
                participant_id: participant_id.to_string(),
                path: path.to_string_lossy().to_string(),
                role: role_for(&name).to_string(),
                name,
                size_bytes: entry.metadata().map(|meta| meta.len()).unwrap_or(0),
            });
        }
    }
}

pub fn role_for(file_name: &str) -> &'static str {
    let lowered = file_name.to_ascii_lowercase();
    if lowered.contains(ATLAS_HINT) {
        return "atlas";
    }
    if lowered.contains(MASK_HINT) || lowered.contains("lesion") || lowered.contains("stroke") {
        return "mask";
    }
    if lowered.ends_with(".nii") || lowered.ends_with(".nii.gz") {
        return "scan";
    }
    "image"
}

pub fn read_optional(path: &Path) -> Option<String> {
    paths::read_optional(path)
}

#[cfg(test)]
mod tests {
    use super::*;

    fn project() -> (tempfile::TempDir, Settings) {
        let dir = tempfile::tempdir().unwrap();
        let settings = Settings {
            project_root: Some(dir.path().to_string_lossy().to_string()),
            ..Settings::default()
        };
        (dir, settings)
    }

    #[test]
    fn reads_a_cohort_and_keeps_row_order() {
        let (dir, settings) = project();
        std::fs::create_dir_all(dir.path().join("data")).unwrap();
        std::fs::write(
            dir.path().join("data/cohort.tsv"),
            "participant_id\twab_aq\nsub-01\t70\nsub-02\t40\n",
        )
        .unwrap();
        let report = cohort(&settings).unwrap();
        assert_eq!(report.row_count, 2);
        assert_eq!(participant_order(&settings), vec!["sub-01", "sub-02"]);
    }

    #[test]
    fn explains_a_missing_cohort() {
        let (_dir, settings) = project();
        let error = cohort(&settings).unwrap_err();
        assert!(error.to_string().contains("pipeline data cohort"));
    }

    #[test]
    fn builds_a_rigour_report_from_the_project() {
        let (dir, settings) = project();
        std::fs::create_dir_all(dir.path().join("data")).unwrap();
        std::fs::write(
            dir.path().join("data/cohort.tsv"),
            "participant_id\twab_aq\nsub-01\t70\nsub-02\t40\n",
        )
        .unwrap();
        std::fs::write(
            dir.path().join("data/splits.json"),
            r#"{"lock_box_participants":["sub-02"],"remaining_participants":["sub-01"],
        "cv_splits":[{"train_indices":[0],"val_indices":[1]}],"seed":42}"#,
        )
        .unwrap();
        std::fs::write(
            dir.path().join("data/lockbox_access_log.json"),
            r#"{"access_count":1,"accesses":[]}"#,
        )
        .unwrap();
        let report = rigour(&settings).unwrap();
        assert_eq!(report.checks.len(), 4);
        assert!(report.checks.iter().all(|check| check.status == "pass"));
        assert!(!report.protocol_available);
    }

    #[test]
    fn finds_participant_assets_and_labels_them() {
        let (dir, settings) = project();
        let scans = dir.path().join("data/subjects/sub-01/anat");
        std::fs::create_dir_all(&scans).unwrap();
        std::fs::write(scans.join("sub-01_T1w.nii.gz"), "x").unwrap();
        std::fs::write(scans.join("sub-01_T1w_mask.nii.gz"), "x").unwrap();
        let derived = dir.path().join("data/derived");
        std::fs::create_dir_all(&derived).unwrap();
        std::fs::write(derived.join("sub-01_hybrid.png"), "x").unwrap();
        let assets = participant_assets(&settings, "sub-01").unwrap();
        assert_eq!(assets.len(), 3);
        assert_eq!(assets[0].role, "image");
        assert_eq!(assets[1].role, "mask");
        assert_eq!(assets[2].role, "scan");
    }

    #[test]
    fn requires_a_participant_id() {
        let (_dir, settings) = project();
        assert!(participant_assets(&settings, " ").is_err());
    }

    #[test]
    fn labels_roles_from_file_names() {
        assert_eq!(role_for("sub-01_T1w.nii.gz"), "scan");
        assert_eq!(role_for("sub-01_lesion_mask.nii"), "mask");
        assert_eq!(role_for("aal_atlas.nii.gz"), "atlas");
        assert_eq!(role_for("sub-01_roi.png"), "image");
    }
}
