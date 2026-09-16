//! JSON snapshot persistence: `save` writes the store atomically
//! (temp file + rename), `load` restores it and prunes expired keys.

use super::{now_ms, DB};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;

/// JSON representation of a DB snapshot for persistence.
#[derive(Serialize, Deserialize, Default)]
pub struct Snapshot {
    #[serde(default)]
    pub data: HashMap<String, String>,
    #[serde(default)]
    pub expires: HashMap<String, u128>,
}

impl DB {
    /// Writes the current store to `path`, atomically and permission-locked
    /// (0o600). A missing parent directory is an error.
    pub fn save(&self, path: &str) -> anyhow::Result<()> {
        let inner = self.inner.read().unwrap();
        let snap = Snapshot {
            data: inner.data.clone(),
            expires: inner.expires.clone(),
        };
        drop(inner);

        let tmp = format!("{path}.tmp");
        {
            let bytes = serde_json::to_vec(&snap)?;
            write_locked(&tmp, &bytes)?;
        }
        fs::rename(tmp, path)?;
        Ok(())
    }

    /// Replaces store contents from a snapshot written by `save`.
    /// A missing file leaves the store untouched.
    pub fn load(&self, path: &str) -> anyhow::Result<()> {
        let raw = match fs::read(path) {
            Ok(raw) => raw,
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => return Ok(()),
            Err(e) => return Err(e.into()),
        };
        let snap: Snapshot = serde_json::from_slice(&raw)?;

        let mut inner = self.inner.write().unwrap();
        inner.data = snap.data;
        inner.expires = snap.expires;
        let now = now_ms();
        let expired: Vec<String> = inner
            .expires
            .iter()
            .filter(|(_, expiry)| **expiry <= now)
            .map(|(k, _)| k.clone())
            .collect();
        inner.expires.retain(|_, expiry| *expiry > now);
        for key in expired {
            inner.data.remove(&key);
        }
        Ok(())
    }
}

/// Writes `bytes` to `path` with 0o600 permissions.
fn write_locked(path: &str, bytes: &[u8]) -> std::io::Result<()> {
    use std::io::Write;
    #[cfg(unix)]
    {
        use std::os::unix::fs::OpenOptionsExt;
        fs::OpenOptions::new()
            .write(true)
            .create(true)
            .truncate(true)
            .mode(0o600)
            .open(path)?
            .write_all(bytes)
    }
    #[cfg(not(unix))]
    {
        fs::File::create(path)?.write_all(bytes)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::time::Duration;

    fn tmp_path(name: &str) -> String {
        let dir = std::env::temp_dir();
        dir.join(format!("kevin-persist-{name}"))
            .to_string_lossy()
            .into_owned()
    }

    #[test]
    fn save_load_roundtrip() {
        let path = tmp_path("roundtrip.json");
        let _ = fs::remove_file(&path);
        let _ = fs::remove_file(format!("{path}.tmp"));

        let db = DB::new();
        db.set("a", "1");
        db.set_with_ttl("b", "2", Duration::from_secs(3600));
        db.save(&path).unwrap();

        let db2 = DB::new();
        db2.load(&path).unwrap();
        assert_eq!(db2.get("a").unwrap(), "1");
        assert_eq!(db2.get("b").unwrap(), "2");
        assert!(matches!(db2.ttl("b"), super::super::ttl::TTL::Remaining(_)));
        let _ = fs::remove_file(&path);
        let _ = fs::remove_file(format!("{path}.tmp"));
    }

    #[test]
    fn load_missing_file_is_noop() {
        let db = DB::new();
        db.set("a", "1");
        db.load(&tmp_path("does-not-exist.json")).unwrap();
        assert_eq!(db.get("a").unwrap(), "1");
    }
}
