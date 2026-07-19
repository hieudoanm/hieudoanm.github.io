//! Scaffolding: writes the annotated `landify.yaml` example for a page type.

use crate::validate::{is_known_type, normalize_type, KNOWN_TYPES};
use anyhow::{anyhow, Context, Result};
use std::fs;

/// Writes the annotated `landify.yaml` template for the given page type to
/// `path`. An unknown type is rejected with the message validation uses; an
/// empty type maps to the default "product" example.
pub fn write_placeholder(path: &str, typ: &str) -> Result<()> {
    let typ = normalize_type(typ);
    if !is_known_type(&typ) {
        return Err(anyhow!(
            "type \"{typ}\" is not supported (available: {})",
            KNOWN_TYPES.join(", ")
        ));
    }
    let data = example(&typ)?;
    fs::write(path, data).with_context(|| format!("write {path}"))?;
    Ok(())
}

/// The embedded example YAML for a known page type.
pub fn example(typ: &str) -> Result<&'static str> {
    let typ = normalize_type(typ);
    if !is_known_type(&typ) {
        return Err(anyhow!(
            "type \"{typ}\" is not supported (available: {})",
            KNOWN_TYPES.join(", ")
        ));
    }
    Ok(match typ.as_str() {
        "app" => include_str!("../assets/examples/example-app.yaml"),
        "docs" => include_str!("../assets/examples/example-docs.yaml"),
        "download" => include_str!("../assets/examples/example-download.yaml"),
        "event" => include_str!("../assets/examples/example-event.yaml"),
        "faq" => include_str!("../assets/examples/example-faq.yaml"),
        "linktree" => include_str!("../assets/examples/example-linktree.yaml"),
        "portfolio" => include_str!("../assets/examples/example-portfolio.yaml"),
        "pricing" => include_str!("../assets/examples/example-pricing.yaml"),
        "product" => include_str!("../assets/examples/example-product.yaml"),
        "status" => include_str!("../assets/examples/example-status.yaml"),
        "team" => include_str!("../assets/examples/example-team.yaml"),
        "waitlist" => include_str!("../assets/examples/example-waitlist.yaml"),
        _ => unreachable!("known type checked by caller"),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn writes_placeholder_for_each_type() {
        for typ in KNOWN_TYPES {
            let dir = tempfile::tempdir().unwrap();
            let path = dir.path().join(format!("{typ}.yaml"));
            write_placeholder(path.to_str().unwrap(), typ).unwrap();
            assert!(std::fs::metadata(&path).unwrap().len() > 0);
        }
    }

    #[test]
    fn rejects_unknown_type() {
        let err = write_placeholder("/tmp/x.yml", "banana").unwrap_err();
        assert!(err
            .to_string()
            .starts_with("type \"banana\" is not supported"));
    }

    #[test]
    fn empty_type_scaffolds_product() {
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("landify.yaml");
        write_placeholder(path.to_str().unwrap(), "").unwrap();
        let data = std::fs::read_to_string(&path).unwrap();
        assert!(data.contains("type: product"));
    }
}
