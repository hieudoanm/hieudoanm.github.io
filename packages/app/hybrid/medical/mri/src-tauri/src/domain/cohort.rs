use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;

pub const PARTICIPANT_COLUMN: &str = "participant_id";
pub const DEFAULT_OUTCOME_COLUMN: &str = "wab_aq";

/// Tab-separated cohort written by `pipeline`'s cohort builder. Columns are
/// kept as strings: the app explains the data, it never re-interprets it.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CohortReport {
    #[serde(alias = "source_path")]
    #[serde(default)]
    pub source_path: String,
    #[serde(default)]
    pub columns: Vec<String>,
    #[serde(default)]
    pub rows: Vec<CohortRow>,
    #[serde(alias = "row_count")]
    #[serde(default)]
    pub row_count: usize,
    #[serde(alias = "unique_participants")]
    #[serde(default)]
    pub unique_participants: usize,
    #[serde(alias = "duplicate_participants")]
    #[serde(default)]
    pub duplicate_participants: usize,
    #[serde(alias = "usable_participants")]
    #[serde(default)]
    pub usable_participants: usize,
    #[serde(alias = "excluded_reasons")]
    #[serde(default)]
    pub excluded_reasons: Vec<ReasonCount>,
    #[serde(alias = "outcome_column")]
    pub outcome_column: Option<String>,
    #[serde(alias = "outcome_distribution")]
    #[serde(default)]
    pub outcome_distribution: Vec<OutcomeCount>,
    #[serde(default)]
    pub flags: Vec<CohortFlag>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CohortRow {
    #[serde(alias = "participant_id")]
    #[serde(default)]
    pub participant_id: String,
    pub session: Option<String>,
    pub outcome: Option<f64>,
    #[serde(alias = "outcome_label")]
    pub outcome_label: Option<String>,
    #[serde(default)]
    pub values: BTreeMap<String, String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CohortFlag {
    #[serde(alias = "participant_id")]
    #[serde(default)]
    pub participant_id: String,
    #[serde(default)]
    pub kind: String,
    #[serde(default)]
    pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ReasonCount {
    #[serde(default)]
    pub reason: String,
    #[serde(default)]
    pub count: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OutcomeCount {
    #[serde(default)]
    pub value: String,
    #[serde(default)]
    pub count: usize,
}

pub fn parse(text: &str, source_path: &str) -> Result<CohortReport, String> {
    let mut lines = text.lines().filter(|line| !line.trim().is_empty());
    let header = lines.next().ok_or("cohort file is empty")?;
    let columns: Vec<String> = header
        .split('\t')
        .map(|name| name.trim().to_string())
        .collect();
    if !columns.iter().any(|column| column == PARTICIPANT_COLUMN) {
        return Err("cohort file must contain a participant_id column".to_string());
    }
    let mut rows = Vec::new();
    for line in lines {
        rows.push(row_from_cells(
            &columns,
            &line.split('\t').collect::<Vec<_>>(),
            &columns,
        ));
    }
    build_report(rows, columns, source_path)
}

fn cell_value<'a>(cells: &'a [&'a str], index: Option<usize>) -> Option<&'a str> {
    let value = cells.get(index?)?.trim();
    if value.is_empty() || value == "nan" || value == "NaN" {
        None
    } else {
        Some(value)
    }
}

fn row_from_cells(columns: &[String], cells: &[&str], _all: &[String]) -> CohortRow {
    let index_of = |name: &str| columns.iter().position(|column| column == name);
    let mut values = BTreeMap::new();
    for (position, column) in columns.iter().enumerate() {
        let value = cell_value(cells, Some(position)).unwrap_or_default();
        values.insert(column.clone(), value.to_string());
    }
    CohortRow {
        participant_id: cell_value(cells, index_of(PARTICIPANT_COLUMN))
            .unwrap_or_default()
            .to_string(),
        session: cell_value(cells, index_of("session")).map(ToString::to_string),
        outcome: cell_value(cells, index_of(DEFAULT_OUTCOME_COLUMN))
            .and_then(|value| value.parse::<f64>().ok()),
        outcome_label: cell_value(cells, index_of(DEFAULT_OUTCOME_COLUMN)).map(ToString::to_string),
        values,
    }
}

fn build_report(
    rows: Vec<CohortRow>,
    columns: Vec<String>,
    source_path: &str,
) -> Result<CohortReport, String> {
    let mut flags = Vec::new();
    let mut seen: BTreeMap<String, usize> = BTreeMap::new();
    for row in &rows {
        *seen.entry(row.participant_id.clone()).or_default() += 1;
        if row.outcome.is_none() {
            flags.push(CohortFlag {
                participant_id: row.participant_id.clone(),
                kind: "missing_outcome".to_string(),
                message: format!(
                    "no {} value, participant cannot be classified",
                    DEFAULT_OUTCOME_COLUMN
                ),
            });
        }
    }
    let duplicate_participants = seen.values().filter(|count| **count > 1).count();
    for (participant_id, count) in &seen {
        if *count > 1 {
            flags.push(CohortFlag {
                participant_id: participant_id.clone(),
                kind: "duplicate_session".to_string(),
                message: format!(
                    "{count} sessions in the cohort, one row per participant is expected"
                ),
            });
        }
    }
    let mut excluded: BTreeMap<String, usize> = BTreeMap::new();
    for flag in &flags {
        *excluded.entry(flag.kind.clone()).or_default() += 1;
    }
    let excluded_reasons = excluded
        .into_iter()
        .map(|(reason, count)| ReasonCount { reason, count })
        .collect();
    let mut distribution: BTreeMap<String, usize> = BTreeMap::new();
    for row in &rows {
        if let Some(label) = &row.outcome_label {
            *distribution.entry(label.clone()).or_default() += 1;
        }
    }
    let outcome_distribution = distribution
        .into_iter()
        .map(|(value, count)| OutcomeCount { value, count })
        .collect();
    let has_outcome_column = columns
        .iter()
        .any(|column| column == DEFAULT_OUTCOME_COLUMN);
    Ok(CohortReport {
        source_path: source_path.to_string(),
        columns,
        row_count: rows.len(),
        unique_participants: seen.len(),
        duplicate_participants,
        usable_participants: seen
            .keys()
            .filter(|id| {
                !flags
                    .iter()
                    .any(|flag| flag.kind == "missing_outcome" && flag.participant_id == **id)
            })
            .count(),
        excluded_reasons,
        outcome_column: has_outcome_column.then(|| DEFAULT_OUTCOME_COLUMN.to_string()),
        outcome_distribution,
        flags,
        rows,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    const TSV: &str = "participant_id\tsession\twab_aq\n\
    sub-01\t1\t62\n\
    sub-02\t1\t\n\
    sub-02\t2\t48\n";

    #[test]
    fn reads_participants_and_the_outcome() {
        let report = parse(TSV, "data/cohort.tsv").unwrap();
        assert_eq!(report.columns.len(), 3);
        assert_eq!(report.row_count, 3);
        assert_eq!(report.unique_participants, 2);
        assert_eq!(report.rows[0].outcome, Some(62.0));
        assert_eq!(report.rows[0].session.as_deref(), Some("1"));
    }

    #[test]
    fn flags_a_missing_outcome() {
        let report = parse(TSV, "cohort.tsv").unwrap();
        let missing = report
            .flags
            .iter()
            .find(|flag| flag.kind == "missing_outcome")
            .unwrap();
        assert_eq!(missing.participant_id, "sub-02");
        assert_eq!(report.excluded_reasons[0].count, 1);
    }

    #[test]
    fn flags_duplicate_sessions() {
        let report = parse(TSV, "cohort.tsv").unwrap();
        assert_eq!(report.duplicate_participants, 1);
        assert!(report
            .flags
            .iter()
            .any(|flag| flag.kind == "duplicate_session"));
    }

    #[test]
    fn summarises_the_outcome_distribution() {
        let report = parse(TSV, "cohort.tsv").unwrap();
        assert_eq!(report.outcome_distribution.len(), 2);
    }

    #[test]
    fn requires_a_participant_column() {
        let error = parse("id\twab_aq\nsub-01\t10\n", "cohort.tsv").unwrap_err();
        assert!(error.contains("participant_id"));
    }

    #[test]
    fn rejects_an_empty_file() {
        assert!(parse("", "cohort.tsv").is_err());
    }
}
