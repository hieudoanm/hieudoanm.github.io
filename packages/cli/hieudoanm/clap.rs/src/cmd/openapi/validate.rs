use std::collections::BTreeSet;

use anyhow::Context;
use regex::Regex;

fn validate_spec(spec: &super::service::JSON) -> Vec<String> {
    let mut issues = Vec::new();
    let semver_re = Regex::new(r"^\d+\.\d+\.\d+$").unwrap();

    let openapi_ver =
        super::service::get_string(spec.get("openapi").unwrap_or(&serde_json::Value::Null));
    match openapi_ver {
        None => issues.push("missing required field: openapi".to_string()),
        Some(v) => {
            if !semver_re.is_match(v) {
                issues.push(format!("invalid openapi version: {v:?} (expected semver)"));
            }
        }
    }

    let info = spec.get("info").and_then(|i| i.as_object());
    match info {
        None => issues.push("missing required object: info".to_string()),
        Some(info_obj) => {
            if info_obj
                .get("title")
                .and_then(|t| t.as_str())
                .unwrap_or("")
                .is_empty()
            {
                issues.push("info.title is required".to_string());
            }
            if info_obj
                .get("version")
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .is_empty()
            {
                issues.push("info.version is required".to_string());
            }
        }
    }

    let paths = spec.get("paths").and_then(|p| p.as_object());
    match paths {
        None => issues.push("missing required object: paths".to_string()),
        Some(p) => issues.extend(validate_paths(p)),
    }

    issues
}

fn validate_paths(paths: &serde_json::Map<String, super::service::JSON>) -> Vec<String> {
    let mut issues = Vec::new();
    let valid_methods: BTreeSet<&str> = [
        "get", "put", "post", "delete", "options", "head", "patch", "trace",
    ]
    .iter()
    .cloned()
    .collect();
    let mut seen_op_ids: std::collections::HashMap<String, String> =
        std::collections::HashMap::new();

    for (path, methods_raw) in paths {
        if path.starts_with("x-") {
            continue;
        }
        if !path.starts_with('/') {
            issues.push(format!("path {path:?} should start with /"));
        }

        let methods = match methods_raw.as_object() {
            Some(m) => m,
            None => continue,
        };

        for (method, op_raw) in methods {
            if method.starts_with("x-") {
                continue;
            }
            if !valid_methods.contains(method.as_str()) {
                issues.push(format!("path {path:?}: invalid method {method:?}"));
                continue;
            }

            let op = match op_raw.as_object() {
                Some(o) => o,
                None => {
                    issues.push(format!(
                        "{} {path}: operation must be an object",
                        method.to_uppercase()
                    ));
                    continue;
                }
            };

            let responses = op.get("responses").and_then(|r| r.as_object());
            if responses.is_none() || responses.map_or(true, |r| r.is_empty()) {
                issues.push(format!(
                    "{} {path}: missing responses",
                    method.to_uppercase()
                ));
            }

            if let Some(op_id) = op.get("operationId").and_then(|oid| oid.as_str()) {
                if !op_id.is_empty() {
                    let location = format!("{} {path}", method.to_uppercase());
                    if let Some(existing) = seen_op_ids.get(op_id) {
                        issues.push(format!(
                            "duplicate operationId {op_id:?} ({existing} and {location})"
                        ));
                    } else {
                        seen_op_ids.insert(op_id.to_string(), location);
                    }
                }
            }
        }
    }

    issues
}

pub fn command() -> clap::Command {
    clap::Command::new("validate")
        .about("Validate an OpenAPI specification")
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("OpenAPI spec file")
                .required(true),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let file = matches.get_one::<String>("file").unwrap();

    let data = std::fs::read(file).with_context(|| format!("failed to read {file}"))?;
    let spec = super::service::parse_openapi(&data)?;
    let issues = validate_spec(&spec);

    if issues.is_empty() {
        println!("valid openapi spec");
        return Ok(());
    }

    for issue in &issues {
        eprintln!("{issue}");
    }

    anyhow::bail!("{} validation issue(s) found", issues.len());
}
