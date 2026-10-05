use serde::{Deserialize, Serialize};

/// One metric row as shown in the dashboard and exported tables. `metrics.json`
/// is produced by pipeline Phase 2, so the parser is deliberately tolerant:
/// plain numbers, `{value, ci_lower, ci_upper}` objects and a `metrics` wrapper
/// are all accepted.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MetricRow {
    #[serde(default)]
    pub name: String,
    pub value: Option<f64>,
    #[serde(alias = "ci_lower")]
    pub ci_lower: Option<f64>,
    #[serde(alias = "ci_upper")]
    pub ci_upper: Option<f64>,
    #[serde(alias = "ci_level")]
    pub ci_level: Option<f64>,
    pub seed: Option<i64>,
    pub fold: Option<i64>,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MetricsDocument {
    #[serde(default)]
    pub metrics: Vec<MetricRow>,
    pub calibration: Option<CalibrationRow>,
    pub confusion: Option<ConfusionRow>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CalibrationRow {
    #[serde(alias = "brier_score")]
    pub brier_score: Option<f64>,
    pub ece: Option<f64>,
    #[serde(default, alias = "prob_true")]
    pub prob_true: Vec<f64>,
    #[serde(default, alias = "prob_pred")]
    pub prob_pred: Vec<f64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ConfusionRow {
    #[serde(alias = "true_negatives")]
    pub true_negatives: Option<i64>,
    #[serde(alias = "false_positives")]
    pub false_positives: Option<i64>,
    #[serde(alias = "false_negatives")]
    pub false_negatives: Option<i64>,
    #[serde(alias = "true_positives")]
    pub true_positives: Option<i64>,
    pub sensitivity: Option<f64>,
    pub specificity: Option<f64>,
}

fn number(value: &serde_json::Value) -> Option<f64> {
    value.as_f64()
}

fn base_row(name: &str) -> MetricRow {
    MetricRow {
        name: name.to_string(),
        value: None,
        ci_lower: None,
        ci_upper: None,
        ci_level: None,
        seed: None,
        fold: None,
    }
}

fn row_from_value(name: &str, value: &serde_json::Value) -> Option<MetricRow> {
    match value {
        serde_json::Value::Number(_) => Some(MetricRow {
            value: number(value),
            ..base_row(name)
        }),
        serde_json::Value::Object(object) => {
            let mut row = base_row(name);
            row.value = object.get("value").and_then(number);
            row.ci_lower = object.get("ci_lower").and_then(number);
            row.ci_upper = object.get("ci_upper").and_then(number);
            row.ci_level = object.get("ci_level").and_then(number);
            row.seed = object.get("seed").and_then(|value| value.as_i64());
            row.fold = object.get("fold").and_then(|value| value.as_i64());
            if row.value.is_none() && row.ci_lower.is_none() {
                return None;
            }
            Some(row)
        }
        _ => None,
    }
}

pub fn parse(text: &str) -> Result<MetricsDocument, String> {
    let value: serde_json::Value = serde_json::from_str(text).map_err(|error| error.to_string())?;
    let container = value.get("metrics").unwrap_or(&value);
    let mut metrics = Vec::new();
    if let Some(object) = container.as_object() {
        for (name, entry) in object {
            if let Some(row) = row_from_value(name, entry) {
                metrics.push(row);
            }
        }
    }
    if let Some(rows) = container.as_array() {
        for entry in rows {
            let name = entry.get("name").and_then(|v| v.as_str()).unwrap_or("");
            if let Some(row) = row_from_value(name, entry) {
                metrics.push(row);
            }
        }
    }
    let calibration = value
        .get("calibration")
        .and_then(|value| serde_json::from_value::<CalibrationRow>(value.clone()).ok());
    let confusion = value
        .get("confusion_matrix_detail")
        .and_then(|value| serde_json::from_value::<ConfusionRow>(value.clone()).ok());
    Ok(MetricsDocument {
        metrics,
        calibration,
        confusion,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_metric_objects_with_intervals() {
        let json =
            r#"{"metrics":{"auc":{"value":0.81,"ci_lower":0.7,"ci_upper":0.9,"ci_level":0.95}}}"#;
        let document = parse(json).unwrap();
        assert_eq!(document.metrics.len(), 1);
        let row = &document.metrics[0];
        assert_eq!(row.name, "auc");
        assert_eq!(row.value, Some(0.81));
        assert_eq!(row.ci_upper, Some(0.9));
    }

    #[test]
    fn parses_plain_numbers() {
        let document = parse(r#"{"accuracy":0.75,"balanced_accuracy":0.7}"#).unwrap();
        assert_eq!(document.metrics.len(), 2);
    }

    #[test]
    fn parses_rows_from_an_array() {
        let json = r#"[{"name":"f1","value":0.6,"seed":42}]"#;
        let document = parse(json).unwrap();
        assert_eq!(document.metrics[0].name, "f1");
        assert_eq!(document.metrics[0].seed, Some(42));
    }

    #[test]
    fn reads_calibration_metrics() {
        let json = r#"{"metrics":{},"calibration":{"brier_score":0.2,"ece":0.1,
      "calibration_curve":{"prob_true":[0.1],"prob_pred":[0.2]}}}"#;
        let document = parse(json).unwrap();
        let calibration = document.calibration.unwrap();
        assert_eq!(calibration.brier_score, Some(0.2));
    }

    #[test]
    fn rejects_invalid_json() {
        assert!(parse("{oops").is_err());
    }
}
