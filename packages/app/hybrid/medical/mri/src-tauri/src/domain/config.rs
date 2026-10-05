use serde::{Deserialize, Serialize};

/// The parts of `config.yaml` the workbench needs to explain a run. The full
/// document is kept as raw JSON so nothing the pipeline writes is lost.
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RunConfigView {
    #[serde(alias = "schema_version")]
    pub schema_version: Option<String>,
    pub dataset: Option<String>,
    #[serde(alias = "data_path")]
    pub data_path: Option<String>,
    #[serde(alias = "n_folds")]
    pub n_folds: Option<i64>,
    #[serde(alias = "lock_box_fraction")]
    pub lock_box_fraction: Option<f64>,
    pub seed: Option<i64>,
    #[serde(alias = "stratify_by")]
    pub stratify_by: Option<String>,
    #[serde(alias = "model_type")]
    pub model_type: Option<String>,
    #[serde(alias = "image_type")]
    pub image_type: Option<String>,
    #[serde(alias = "learning_rate")]
    pub learning_rate: Option<f64>,
    #[serde(alias = "batch_size")]
    pub batch_size: Option<i64>,
    #[serde(alias = "max_epochs")]
    pub max_epochs: Option<i64>,
    pub device: Option<String>,
    #[serde(alias = "output_dir")]
    pub output_dir: Option<String>,
    #[serde(alias = "log_level")]
    pub log_level: Option<String>,
}

/// `schema_version` lives at the root of the config; the rest live in named
/// sections. An empty section name means "root".
fn node_at<'a>(value: &'a serde_json::Value, section: &str) -> Option<&'a serde_json::Value> {
    if section.is_empty() {
        Some(value)
    } else {
        value.get(section)
    }
}

fn string_at(value: &serde_json::Value, section: &str, key: &str) -> Option<String> {
    node_at(value, section)?
        .get(key)?
        .as_str()
        .map(ToString::to_string)
}

fn number_at(value: &serde_json::Value, section: &str, key: &str) -> Option<f64> {
    node_at(value, section)?.get(key)?.as_f64()
}

pub fn parse(text: &str) -> Result<RunConfigView, String> {
    parse_raw(text).map(|(view, _)| view)
}

/// Parses a config into the display view *and* the raw document, so callers can
/// forward a saved config without losing fields this build does not show.
pub fn parse_raw(text: &str) -> Result<(RunConfigView, serde_json::Value), String> {
    let yaml: serde_yaml::Value = serde_yaml::from_str(text).map_err(|error| error.to_string())?;
    let value = serde_json::to_value(yaml).map_err(|error| error.to_string())?;
    Ok((view_of(&value), value))
}

fn view_of(value: &serde_json::Value) -> RunConfigView {
    RunConfigView {
        schema_version: string_at(value, "", "schema_version"),
        dataset: string_at(value, "data", "dataset"),
        data_path: string_at(value, "data", "data_path"),
        n_folds: number_at(value, "split", "n_folds").map(|v| v as i64),
        lock_box_fraction: number_at(value, "split", "lock_box_fraction"),
        seed: number_at(value, "split", "seed").map(|v| v as i64),
        stratify_by: string_at(value, "split", "stratify_by"),
        model_type: string_at(value, "model", "model_type"),
        image_type: string_at(value, "model", "image_type"),
        learning_rate: number_at(value, "model", "learning_rate"),
        batch_size: number_at(value, "model", "batch_size").map(|v| v as i64),
        max_epochs: number_at(value, "model", "max_epochs").map(|v| v as i64),
        device: string_at(value, "run", "device"),
        output_dir: string_at(value, "run", "output_dir"),
        log_level: string_at(value, "run", "log_level"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const CONFIG: &str = r#"
schema_version: '0.1.0'
data:
  dataset: arc
  data_path: 'data/'
split:
  n_folds: 4
  lock_box_fraction: 0.2
  seed: 42
  stratify_by: 'wab_aq'
model:
  model_type: resnet18
  image_type: hybrid
  learning_rate: 0.001
  batch_size: 32
  max_epochs: 100
run:
  device: auto
  output_dir: 'runs/'
  log_level: 'INFO'
"#;

    #[test]
    fn reads_every_field_the_ui_needs() {
        let view = parse(CONFIG).unwrap();
        assert_eq!(view.schema_version.as_deref(), Some("0.1.0"));
        assert_eq!(view.dataset.as_deref(), Some("arc"));
        assert_eq!(view.n_folds, Some(4));
        assert_eq!(view.seed, Some(42));
        assert_eq!(view.model_type.as_deref(), Some("resnet18"));
        assert_eq!(view.image_type.as_deref(), Some("hybrid"));
        assert_eq!(view.log_level.as_deref(), Some("INFO"));
    }

    #[test]
    fn tolerates_a_partial_config() {
        let view = parse("data:\n  dataset: atlas\n").unwrap();
        assert_eq!(view.dataset.as_deref(), Some("atlas"));
        assert!(view.seed.is_none());
    }

    #[test]
    fn reports_invalid_yaml() {
        assert!(parse("data: [unclosed").is_err());
    }
}
