//! Store selection for one MCP session: an in-process store that can snapshot
//! to a JSON file, or a proxy to an already-running `kevin serve`.

use super::store::{DbStore, Store};
use super::tcp_store::TcpStore;
use crate::db::DB;
use anyhow::{bail, Result};
use std::sync::Arc;
use tracing::{info, warn};

/// A store the tools operate on, plus the snapshot it must write back on
/// shutdown when one was requested.
pub struct Session {
    store: Arc<dyn Store>,
    snapshot: Option<(Arc<DB>, String)>,
}

impl Session {
    /// Builds the store a session runs against. With `addr` set it proxies to
    /// a running `kevin serve`; otherwise it creates an in-process store,
    /// optionally backed by a JSON snapshot so writes outlive the session.
    pub fn open(addr: Option<&str>, data: Option<&str>) -> Result<Self> {
        if let Some(addr) = addr {
            if data.is_some() {
                bail!("--addr and --data are mutually exclusive: a proxied store is owned by the running server");
            }
            return Ok(Self {
                store: Arc::new(TcpStore::connect(addr)?),
                snapshot: None,
            });
        }

        let kv = Arc::new(DB::new());
        if let Some(path) = data {
            match kv.load(path) {
                Ok(()) => info!(path, "loaded data file"),
                Err(e) => warn!(path, error = %e, "could not load data file"),
            }
        }
        Ok(Self {
            store: Arc::new(DbStore::new(Arc::clone(&kv))),
            snapshot: data.map(|path| (kv, path.to_string())),
        })
    }

    /// The store the tools operate on. Clone the `Arc` to keep the store alive
    /// past [`Session::finish`].
    pub fn store(&self) -> Arc<dyn Store> {
        Arc::clone(&self.store)
    }

    /// Releases the store and, for a persisted in-process store, writes the
    /// snapshot back to disk. Failures are logged rather than propagated,
    /// mirroring how `serve --data` persists on shutdown.
    pub fn finish(self) {
        if let Some((kv, path)) = &self.snapshot {
            match kv.save(path) {
                Ok(()) => info!(path, "saved data file"),
                Err(e) => warn!(path, error = %e, "could not save data file"),
            }
        }
        if let Err(e) = self.store.close() {
            warn!(error = %e, "could not close store");
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::mcp::store::TtlState;

    #[test]
    fn an_embedded_session_starts_empty_and_needs_no_backing_server() {
        let session = Session::open(None, None).unwrap();
        let store = session.store();
        store.ping().unwrap();
        assert!(store.is_empty().expect("the store should answer is_empty"));
        assert_eq!(store.ttl("missing").unwrap().1, TtlState::Missing);
        session.finish();
    }

    #[test]
    fn addr_and_data_are_mutually_exclusive() {
        let err = Session::open(Some("127.0.0.1:6379"), Some("/tmp/x.json"))
            .err()
            .expect("--addr with --data must be rejected")
            .to_string();
        assert!(err.contains("mutually exclusive"), "got {err}");
    }

    #[test]
    fn a_session_with_data_writes_its_snapshot_on_finish() {
        let dir = std::env::temp_dir().join("kevin-mcp-session");
        std::fs::create_dir_all(&dir).unwrap();
        let path = dir.join("snapshot.json");
        let path = path.to_string_lossy().into_owned();
        let _ = std::fs::remove_file(&path);

        let session = Session::open(None, Some(&path)).unwrap();
        session.store().set("persisted", "yes", 0).unwrap();
        session.finish();

        let reloaded = Session::open(None, Some(&path)).unwrap();
        let (value, found) = reloaded.store().get("persisted").unwrap();
        assert!(found);
        assert_eq!(value, "yes");
        reloaded.finish();

        let _ = std::fs::remove_file(&path);
    }

    #[test]
    fn a_session_without_data_writes_nothing() {
        let session = Session::open(None, None).unwrap();
        assert!(session.snapshot.is_none());
        session.store().set("k", "v", 0).unwrap();
        session.finish();
    }
}
