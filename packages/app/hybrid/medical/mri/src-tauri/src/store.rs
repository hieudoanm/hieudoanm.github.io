use crate::models::{is_valid_logical_id, ARTIFACT_SCHEME, DATASET_SCHEME, SERIES_SCHEME};
use std::path::{Path, PathBuf};

/// Filesystem abstraction: logical IDs resolve to paths inside the workspace
/// root. The rest of the application never touches absolute paths directly.
#[derive(Debug, Clone)]
pub struct Store {
  root: PathBuf,
}

impl Store {
  pub fn new(root: PathBuf) -> Self {
    Self { root }
  }

  pub fn root(&self) -> &Path {
    &self.root
  }

  pub fn ensure_root(&self) -> Result<(), String> {
    std::fs::create_dir_all(&self.root).map_err(|error| error.to_string())
  }

  pub fn dataset_dir(&self, dataset_key: &str) -> PathBuf {
    self.root.join("datasets").join(dataset_key)
  }

  pub fn series_dir(&self, dataset_key: &str, series_key: &str) -> PathBuf {
    self.dataset_dir(dataset_key).join(series_key)
  }

  pub fn artifact_dir(&self, dataset_key: &str) -> PathBuf {
    self.dataset_dir(dataset_key).join("artifacts")
  }

  /// Resolve a logical ID (`dataset://x/y`, `series://x/y`, `artifact://x/y`)
  /// to its path inside the workspace root.
  pub fn resolve(&self, logical_id: &str) -> Result<PathBuf, String> {
    if !is_valid_logical_id(logical_id) {
      return Err(format!("invalid logical id: {logical_id}"));
    }
    let relative = logical_id
      .split("://")
      .nth(1)
      .ok_or_else(|| format!("invalid logical id: {logical_id}"))?;
    if relative.contains("..") {
      return Err(format!("path traversal rejected: {logical_id}"));
    }
    let (scheme, remainder) = logical_id.split_at(logical_id.find("://").unwrap());
    let remainder = &remainder[3..];
    let resolved = match scheme {
      "dataset" => self.dataset_dir(remainder),
      "series" => match remainder.split_once('/') {
        Some((dataset_key, series_key)) => self.series_dir(dataset_key, series_key),
        None => return Err(format!("series id requires dataset scope: {logical_id}")),
      },
      "artifact" => match remainder.split_once('/') {
        Some((dataset_key, artifact_key)) => self.artifact_dir(dataset_key).join(artifact_key),
        None => return Err(format!("artifact id requires dataset scope: {logical_id}")),
      },
      _ => return Err(format!("unsupported scheme in: {logical_id}")),
    };
    Ok(resolved)
  }

  /// Copy a source file into the workspace under a logical ID scope.
  pub fn import_file(
    &self,
    source: &Path,
    destination_dir: &Path,
    file_name: &str,
  ) -> Result<PathBuf, String> {
    std::fs::create_dir_all(destination_dir).map_err(|error| error.to_string())?;
    let safe_name = sanitize_file_name(file_name);
    let destination = destination_dir.join(safe_name);
    std::fs::copy(source, &destination).map_err(|error| error.to_string())?;
    Ok(destination)
  }

  pub fn remove_dir(&self, path: &Path) -> Result<(), String> {
    if path.starts_with(&self.root) && path != self.root {
      std::fs::remove_dir_all(path).map_err(|error| error.to_string())?;
    }
    Ok(())
  }
}

fn sanitize_file_name(name: &str) -> String {
  let cleaned: String = name
    .chars()
    .map(|c| if c.is_alphanumeric() || c == '.' || c == '-' || c == '_' { c } else { '_' })
    .collect();
  if cleaned.is_empty() || cleaned.starts_with('.') {
    format!("file{cleaned}")
  } else {
    cleaned
  }
}

pub fn dataset_logical_id(key: &str) -> String {
  format!("{DATASET_SCHEME}{key}")
}

pub fn series_logical_id(dataset_key: &str, key: &str) -> String {
  format!("{SERIES_SCHEME}{dataset_key}/{key}")
}

pub fn artifact_logical_id(dataset_key: &str, key: &str) -> String {
  format!("{ARTIFACT_SCHEME}{dataset_key}/{key}")
}

#[cfg(test)]
mod tests {
  use super::*;

  fn temp_store() -> (Store, PathBuf) {
    let root = std::env::temp_dir().join(format!("mri-store-test-{}", uuid::Uuid::new_v4()));
    (Store::new(root.clone()), root)
  }

  #[test]
  fn resolves_dataset_ids() {
    let (store, root) = temp_store();
    let path = store.resolve("dataset://abc").unwrap();
    assert_eq!(path, root.join("datasets").join("abc"));
    std::fs::remove_dir_all(root).ok();
  }

  #[test]
  fn resolves_series_and_artifact_ids() {
    let (store, root) = temp_store();
    assert_eq!(
      store.resolve("series://abc/def").unwrap(),
      root.join("datasets/abc/def")
    );
    assert_eq!(
      store.resolve("artifact://abc/report.json").unwrap(),
      root.join("datasets/abc/artifacts/report.json")
    );
    std::fs::remove_dir_all(root).ok();
  }

  #[test]
  fn rejects_invalid_ids() {
    let (store, _root) = temp_store();
    assert!(store.resolve("dataset://").is_err());
    assert!(store.resolve("file://abc").is_err());
    assert!(store.resolve("").is_err());
    assert!(store.resolve("series://abc").is_err());
    assert!(store.resolve("artifact://abc").is_err());
  }

  #[test]
  fn rejects_path_traversal() {
    let (store, _root) = temp_store();
    assert!(store.resolve("dataset://../etc").is_err());
    assert!(store.resolve("series://a/../../b").is_err());
  }

  #[test]
  fn imports_files_into_scope() {
    let (store, root) = temp_store();
    store.ensure_root().unwrap();
    let source = root.join("source.dcm");
    std::fs::write(&source, b"DICM").unwrap();
    let destination = store
      .import_file(&source, &store.series_dir("ds", "se"), "scan.dcm")
      .unwrap();
    assert!(destination.exists());
    assert_eq!(
      destination.file_name().unwrap().to_str().unwrap(),
      "scan.dcm"
    );
    std::fs::remove_dir_all(root).ok();
  }

  #[test]
  fn sanitizes_unsafe_file_names() {
    assert_eq!(sanitize_file_name("../../etc/passwd"), "file.._.._etc_passwd");
    assert_eq!(sanitize_file_name(""), "file");
    assert_eq!(sanitize_file_name(".hidden"), "file.hidden");
  }

  #[test]
  fn removes_only_inside_root() {
    let (store, root) = temp_store();
    store.ensure_root().unwrap();
    let nested = store.dataset_dir("gone");
    std::fs::create_dir_all(&nested).unwrap();
    store.remove_dir(&nested).unwrap();
    assert!(!nested.exists());
    store.remove_dir(&root).unwrap();
    assert!(root.exists());
    std::fs::remove_dir_all(root).ok();
  }
}
