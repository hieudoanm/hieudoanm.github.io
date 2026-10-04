use serde::{Deserialize, Serialize};
use std::collections::BTreeSet;

pub const STATUS_PASS: &str = "pass";
pub const STATUS_FAIL: &str = "fail";
pub const STATUS_WARN: &str = "warn";
pub const STATUS_UNKNOWN: &str = "unknown";

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CvFold {
    #[serde(default)]
    pub index: usize,
    #[serde(alias = "train_participants")]
    #[serde(default)]
    pub train_participants: Vec<String>,
    #[serde(alias = "validation_participants")]
    #[serde(default)]
    pub validation_participants: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SplitsDocument {
    #[serde(alias = "lock_box_participants")]
    #[serde(default)]
    pub lock_box_participants: Vec<String>,
    #[serde(alias = "remaining_participants")]
    #[serde(default)]
    pub remaining_participants: Vec<String>,
    #[serde(alias = "n_folds")]
    pub n_folds: Option<i64>,
    #[serde(alias = "lock_box_fraction")]
    pub lock_box_fraction: Option<f64>,
    pub seed: Option<i64>,
    #[serde(alias = "stratify_by")]
    pub stratify_by: Option<String>,
    #[serde(default)]
    pub folds: Vec<CvFold>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LockBoxAccess {
    #[serde(alias = "access_number")]
    pub access_number: Option<i64>,
    pub timestamp: Option<String>,
    #[serde(alias = "run_id")]
    pub run_id: Option<String>,
    pub purpose: Option<String>,
    #[serde(alias = "model_name")]
    pub model_name: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LockBoxLog {
    #[serde(alias = "access_count")]
    #[serde(default)]
    pub access_count: usize,
    #[serde(default)]
    pub accesses: Vec<LockBoxAccess>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RigourCheck {
    #[serde(default)]
    pub id: String,
    #[serde(default)]
    pub title: String,
    #[serde(default)]
    pub status: String,
    #[serde(default)]
    pub detail: String,
    pub evidence: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RigourReport {
    #[serde(default)]
    pub checks: Vec<RigourCheck>,
    pub splits: Option<SplitsDocument>,
    #[serde(alias = "lock_box")]
    pub lock_box: Option<LockBoxLog>,
    #[serde(alias = "lock_box_budget")]
    pub lock_box_budget: Option<usize>,
    #[serde(alias = "protocol_path")]
    #[serde(default)]
    pub protocol_path: String,
    #[serde(alias = "protocol_available")]
    #[serde(default)]
    pub protocol_available: bool,
}

#[derive(Debug, Deserialize)]
struct RawFold {
    #[serde(default)]
    train_indices: Vec<usize>,
    #[serde(default)]
    val_indices: Vec<usize>,
}

#[derive(Debug, Deserialize)]
struct RawSplits {
    #[serde(default)]
    lock_box_participants: Vec<String>,
    #[serde(default)]
    remaining_participants: Vec<String>,
    n_folds: Option<i64>,
    lock_box_fraction: Option<f64>,
    seed: Option<i64>,
    stratify_by: Option<String>,
    #[serde(default)]
    cv_splits: Vec<RawFold>,
}

/// Fold indices refer to row positions in the cohort table, so they are only
/// turned into participant IDs when the same row order is supplied.
pub fn parse_splits(text: &str, participants: &[String]) -> Result<SplitsDocument, String> {
    let raw: RawSplits = serde_json::from_str(text).map_err(|error| error.to_string())?;
    let folds = raw
        .cv_splits
        .iter()
        .enumerate()
        .map(|(index, fold)| CvFold {
            index: index + 1,
            train_participants: fold
                .train_indices
                .iter()
                .filter_map(|position| participants.get(*position).cloned())
                .collect(),
            validation_participants: fold
                .val_indices
                .iter()
                .filter_map(|position| participants.get(*position).cloned())
                .collect(),
        })
        .collect();
    Ok(SplitsDocument {
        lock_box_participants: raw.lock_box_participants,
        remaining_participants: raw.remaining_participants,
        n_folds: raw.n_folds,
        lock_box_fraction: raw.lock_box_fraction,
        seed: raw.seed,
        stratify_by: raw.stratify_by,
        folds,
    })
}

pub fn parse_lock_box(text: &str) -> Result<LockBoxLog, String> {
    let log: LockBoxLog = serde_json::from_str(text).map_err(|error| error.to_string())?;
    Ok(log)
}

fn overlap(first: &[String], second: &[String]) -> Vec<String> {
    let known: BTreeSet<&String> = first.iter().collect();
    second
        .iter()
        .filter(|participant| known.contains(participant))
        .cloned()
        .collect()
}

fn lock_box_check(splits: &SplitsDocument) -> RigourCheck {
    let shared = overlap(
        &splits.lock_box_participants,
        &splits.remaining_participants,
    );
    RigourCheck {
        id: "lock_box_overlap".to_string(),
        title: "No participant is in both the lock-box and the training data".to_string(),
        status: if shared.is_empty() {
            STATUS_PASS
        } else {
            STATUS_FAIL
        }
        .to_string(),
        detail: if shared.is_empty() {
            format!(
                "lock-box holds {} participants, none of them are in the remaining {}",
                splits.lock_box_participants.len(),
                splits.remaining_participants.len()
            )
        } else {
            format!(
                "{} participants appear in both sides, for example {}",
                shared.len(),
                shared.first().cloned().unwrap_or_default()
            )
        },
        evidence: Some("splits.json".to_string()),
    }
}

fn fold_check(splits: &SplitsDocument, participants: &[String]) -> RigourCheck {
    if splits.folds.is_empty() || participants.is_empty() {
        return RigourCheck {
            id: "fold_overlap".to_string(),
            title: "Cross-validation folds do not share participants".to_string(),
            status: STATUS_UNKNOWN.to_string(),
            detail: "load the cohort table to resolve fold indices into participants".to_string(),
            evidence: None,
        };
    }
    let offenders: Vec<String> = splits
        .folds
        .iter()
        .flat_map(|fold| {
            overlap(&fold.train_participants, &fold.validation_participants)
                .into_iter()
                .map(|participant| format!("fold {}: {participant}", fold.index))
        })
        .collect();
    RigourCheck {
        id: "fold_overlap".to_string(),
        title: "Cross-validation folds do not share participants".to_string(),
        status: if offenders.is_empty() {
            STATUS_PASS
        } else {
            STATUS_FAIL
        }
        .to_string(),
        detail: if offenders.is_empty() {
            format!(
                "{} folds checked, no participant is in both sides",
                splits.folds.len()
            )
        } else {
            offenders.join(", ")
        },
        evidence: Some("splits.json".to_string()),
    }
}

fn lock_box_access_check(log: &LockBoxLog, budget: Option<usize>) -> RigourCheck {
    let over_budget = budget.map(|limit| log.access_count > limit);
    let status = match (budget, over_budget) {
        (_, Some(true)) => STATUS_WARN,
        (None, _) => STATUS_UNKNOWN,
        _ if log.access_count == 0 => STATUS_PASS,
        _ => STATUS_PASS,
    };
    RigourCheck {
        id: "lock_box_access".to_string(),
        title: "Lock-box evaluations stay inside the planned budget".to_string(),
        status: status.to_string(),
        detail: match budget {
            Some(limit) => format!("{} of {limit} planned evaluations used", log.access_count),
            None => format!(
                "{} evaluations recorded, no budget configured",
                log.access_count
            ),
        },
        evidence: Some("lockbox_access_log.json".to_string()),
    }
}

pub fn build_report(
    splits: Option<SplitsDocument>,
    lock_box: Option<LockBoxLog>,
    budget: Option<usize>,
    participants: &[String],
    protocol: (String, bool),
) -> RigourReport {
    let mut checks = Vec::new();
    match &splits {
        Some(splits) => {
            checks.push(lock_box_check(splits));
            checks.push(fold_check(splits, participants));
            checks.push(RigourCheck {
                id: "split_reproducible".to_string(),
                title: "The split is reproducible from the recorded seed".to_string(),
                status: match splits.seed {
                    Some(_) => STATUS_PASS,
                    None => STATUS_UNKNOWN,
                }
                .to_string(),
                detail: match splits.seed {
                    Some(seed) => format!(
                        "seed {seed}, {} folds, lock-box fraction {}",
                        splits.n_folds.unwrap_or_default(),
                        splits
                            .lock_box_fraction
                            .map(|value| value.to_string())
                            .unwrap_or_else(|| "unknown".to_string())
                    ),
                    None => "no seed recorded in splits.json".to_string(),
                },
                evidence: Some("splits.json".to_string()),
            });
        }
        None => checks.push(RigourCheck {
            id: "lock_box_overlap".to_string(),
            title: "Split evidence available".to_string(),
            status: STATUS_UNKNOWN.to_string(),
            detail: "no splits.json found in the project folder".to_string(),
            evidence: None,
        }),
    }
    match &lock_box {
        Some(log) => checks.push(lock_box_access_check(log, budget)),
        None => checks.push(RigourCheck {
            id: "lock_box_access".to_string(),
            title: "Lock-box evaluations stay inside the planned budget".to_string(),
            status: STATUS_UNKNOWN.to_string(),
            detail: "no lockbox_access_log.json found".to_string(),
            evidence: None,
        }),
    }
    let (protocol_path, protocol_available) = protocol;
    RigourReport {
        checks,
        splits,
        lock_box,
        lock_box_budget: budget,
        protocol_path,
        protocol_available,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const SPLITS: &str = r#"{
    "lock_box_participants": ["sub-03", "sub-04"],
    "remaining_participants": ["sub-01", "sub-02"],
    "cv_splits": [{"train_indices": [0], "val_indices": [1]}],
    "n_folds": 2,
    "lock_box_fraction": 0.5,
    "seed": 42,
    "stratify_by": "wab_aq"
  }"#;

    #[test]
    fn resolves_fold_indices_with_the_cohort_order() {
        let participants = vec![
            "sub-01".to_string(),
            "sub-02".to_string(),
            "sub-03".to_string(),
        ];
        let splits = parse_splits(SPLITS, &participants).unwrap();
        assert_eq!(splits.folds.len(), 1);
        assert_eq!(
            splits.folds[0].train_participants,
            vec!["sub-01".to_string()]
        );
        assert_eq!(splits.seed, Some(42));
    }

    #[test]
    fn passes_when_no_participant_is_shared() {
        let splits = parse_splits(SPLITS, &[]).unwrap();
        let report = build_report(
            Some(splits),
            None,
            None,
            &[],
            ("docs/protocol.md".to_string(), false),
        );
        let check = report
            .checks
            .iter()
            .find(|check| check.id == "lock_box_overlap")
            .unwrap();
        assert_eq!(check.status, STATUS_PASS);
    }

    #[test]
    fn fails_when_a_participant_is_on_both_sides() {
        let json = r#"{"lock_box_participants":["sub-01"],"remaining_participants":["sub-01"]}"#;
        let splits = parse_splits(json, &[]).unwrap();
        let report = build_report(
            Some(splits),
            None,
            None,
            &[],
            ("docs/protocol.md".to_string(), false),
        );
        let check = report
            .checks
            .iter()
            .find(|c| c.id == "lock_box_overlap")
            .unwrap();
        assert_eq!(check.status, STATUS_FAIL);
        assert!(check.detail.contains("sub-01"));
    }

    #[test]
    fn warns_when_the_lock_box_is_used_more_than_planned() {
        let log = LockBoxLog {
            access_count: 3,
            accesses: Vec::new(),
        };
        let report = build_report(None, Some(log), Some(1), &[], ("p".to_string(), false));
        let check = report
            .checks
            .iter()
            .find(|c| c.id == "lock_box_access")
            .unwrap();
        assert_eq!(check.status, STATUS_WARN);
        assert!(check.detail.contains("3 of 1"));
    }

    #[test]
    fn marks_missing_evidence_as_unknown() {
        let report = build_report(None, None, None, &[], ("p".to_string(), false));
        assert!(report
            .checks
            .iter()
            .all(|check| check.status == STATUS_UNKNOWN));
        assert!(report.splits.is_none());
    }

    #[test]
    fn reads_the_access_log() {
        let json = r#"{"access_count":1,"accesses":[{"access_number":1,"run_id":"r_1",
      "purpose":"evaluation","model_name":"resnet18"}]}"#;
        let log = parse_lock_box(json).unwrap();
        assert_eq!(log.access_count, 1);
        assert_eq!(log.accesses[0].purpose.as_deref(), Some("evaluation"));
    }
}
