//! The key/value surface the MCP tools operate on, plus the in-process
//! adapter. A TCP client implements the same trait by speaking the inline
//! protocol to an already-running `kevin serve`.

use crate::db::ttl::TTL;
use crate::db::DB;
use anyhow::{bail, Result};
use std::sync::Arc;
use std::time::Duration;

/// Expiry status of a key, normalised so tools never see a sentinel duration.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TtlState {
    /// The key does not exist or has already expired.
    Missing,
    /// The key exists and never expires.
    NoExpiry,
    /// The key exists; the paired count is the remaining seconds, rounded up.
    Expiring,
}

impl TtlState {
    /// Wire name used in tool output.
    pub fn as_str(self) -> &'static str {
        match self {
            TtlState::Missing => "missing",
            TtlState::NoExpiry => "no-expiry",
            TtlState::Expiring => "expiring",
        }
    }

    /// The signed second count the inline protocol uses for `TTL`: -2 for a
    /// missing key, -1 for a key with no expiry, else the remaining seconds.
    pub fn signed_seconds(self, remaining: i64) -> i64 {
        match self {
            TtlState::Missing => -2,
            TtlState::NoExpiry => -1,
            TtlState::Expiring => remaining,
        }
    }
}

/// Keys are opaque strings. A `ttl_seconds` of zero or less means "no expiry",
/// matching the TCP handler, which rejects a non-positive expire time.
pub trait Store {
    /// Releases any resource the store holds. The in-process store holds none.
    fn close(&self) -> Result<()>;
    /// Verifies the store is reachable.
    fn ping(&self) -> Result<()>;
    /// Returns the value stored under `key` and whether it was present.
    fn get(&self, key: &str) -> Result<(String, bool)>;
    /// Stores `value` under `key`, optionally expiring it after `ttl_seconds`.
    fn set(&self, key: &str, value: &str, ttl_seconds: i64) -> Result<()>;
    /// Removes every key in `keys` and returns how many were present.
    fn del(&self, keys: &[String]) -> Result<usize>;
    /// Reports whether `key` is present and unexpired.
    fn exists(&self, key: &str) -> Result<bool>;
    /// Returns every present, unexpired key.
    fn keys(&self) -> Result<Vec<String>>;
    /// Returns the number of present, unexpired keys.
    fn len(&self) -> Result<usize>;
    /// Reports whether the store holds no keys. Derived from `len`, so a
    /// backend need not implement it separately.
    fn is_empty(&self) -> Result<bool> {
        Ok(self.len()? == 0)
    }
    /// Removes every key and returns how many were removed.
    fn flush(&self) -> Result<usize>;
    /// Returns the remaining lifetime of `key` in whole seconds, rounded up,
    /// together with its expiry state.
    fn ttl(&self, key: &str) -> Result<(i64, TtlState)>;
    /// Sets an expiry on `key` and reports whether it existed.
    fn expire(&self, key: &str, seconds: i64) -> Result<bool>;
}

/// Maps a `DB` TTL result onto the normalised tool-facing seconds and state.
pub fn classify(ttl: TTL) -> (i64, TtlState) {
    match ttl {
        TTL::Missing => (-2, TtlState::Missing),
        TTL::NoExpiry => (-1, TtlState::NoExpiry),
        TTL::Remaining(seconds) => (seconds, TtlState::Expiring),
    }
}

/// Adapts the in-process [`DB`] to [`Store`].
#[derive(Clone)]
pub struct DbStore {
    kv: Arc<DB>,
}

impl DbStore {
    pub fn new(kv: Arc<DB>) -> Self {
        Self { kv }
    }
}

impl Store for DbStore {
    /// A no-op: an in-process store holds no resources.
    fn close(&self) -> Result<()> {
        Ok(())
    }

    /// Always succeeds: an in-process store cannot be unreachable.
    fn ping(&self) -> Result<()> {
        Ok(())
    }

    fn get(&self, key: &str) -> Result<(String, bool)> {
        Ok(match self.kv.get(key) {
            Some(value) => (value, true),
            None => (String::new(), false),
        })
    }

    fn set(&self, key: &str, value: &str, ttl_seconds: i64) -> Result<()> {
        if ttl_seconds > 0 {
            self.kv
                .set_with_ttl(key, value, Duration::from_secs(ttl_seconds as u64));
        } else {
            self.kv.set(key, value);
        }
        Ok(())
    }

    fn del(&self, keys: &[String]) -> Result<usize> {
        if keys.is_empty() {
            bail!("keys must not be empty");
        }
        Ok(self.kv.del_many(keys))
    }

    fn exists(&self, key: &str) -> Result<bool> {
        Ok(self.kv.exists(key))
    }

    fn keys(&self) -> Result<Vec<String>> {
        Ok(self.kv.keys())
    }

    fn len(&self) -> Result<usize> {
        Ok(self.kv.len())
    }

    fn flush(&self) -> Result<usize> {
        Ok(self.kv.flush())
    }

    fn ttl(&self, key: &str) -> Result<(i64, TtlState)> {
        Ok(classify(self.kv.ttl(key)))
    }

    fn expire(&self, key: &str, seconds: i64) -> Result<bool> {
        Ok(self
            .kv
            .expire(key, Duration::from_secs(seconds.max(0) as u64)))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::time::Duration;

    fn store() -> DbStore {
        DbStore::new(Arc::new(DB::new()))
    }

    #[test]
    fn set_get_del_round_trip() {
        let kv = store();
        assert_eq!(kv.get("a").unwrap(), (String::new(), false));
        kv.set("a", "one", 0).unwrap();
        assert_eq!(kv.get("a").unwrap(), ("one".to_string(), true));
        kv.set("a", "two", 0).unwrap();
        assert_eq!(kv.get("a").unwrap(), ("two".to_string(), true));
        assert_eq!(kv.del(&["a".to_string()]).unwrap(), 1);
        assert_eq!(kv.get("a").unwrap(), (String::new(), false));
    }

    #[test]
    fn accepts_keys_and_values_with_spaces() {
        let kv = store();
        kv.set("a key", "a value", 0).unwrap();
        assert_eq!(kv.get("a key").unwrap(), ("a value".to_string(), true));
    }

    #[test]
    fn del_counts_only_present_keys() {
        let kv = store();
        kv.set("a", "1", 0).unwrap();
        kv.set("b", "2", 0).unwrap();
        let keys = vec!["a".to_string(), "missing".to_string()];
        assert_eq!(kv.del(&keys).unwrap(), 1);
        assert_eq!(kv.len().unwrap(), 1);
    }

    #[test]
    fn del_rejects_an_empty_key_list() {
        assert!(store().del(&[]).is_err());
    }

    #[test]
    fn exists_len_keys_and_flush() {
        let kv = store();
        assert!(!kv.exists("a").unwrap());
        kv.set("z", "1", 0).unwrap();
        kv.set("a", "2", 0).unwrap();
        assert!(kv.exists("a").unwrap());
        assert_eq!(kv.keys().unwrap(), vec!["a".to_string(), "z".to_string()]);
        assert_eq!(kv.len().unwrap(), 2);
        assert_eq!(kv.flush().unwrap(), 2);
        assert_eq!(kv.len().unwrap(), 0);
    }

    #[test]
    fn ping_and_close_always_succeed() {
        let kv = store();
        assert!(kv.ping().is_ok());
        assert!(kv.close().is_ok());
    }

    #[test]
    fn ttl_states_are_normalised() {
        let kv = store();
        assert_eq!(kv.ttl("missing").unwrap(), (-2, TtlState::Missing));
        kv.set("permanent", "v", 0).unwrap();
        assert_eq!(kv.ttl("permanent").unwrap(), (-1, TtlState::NoExpiry));
        kv.set("brief", "v", 60).unwrap();
        let (seconds, state) = kv.ttl("brief").unwrap();
        assert_eq!(state, TtlState::Expiring);
        assert!((1..=60).contains(&seconds));
    }

    #[test]
    fn expire_sets_and_replaces_an_expiry() {
        let kv = store();
        assert!(!kv.expire("missing", 10).unwrap());
        kv.set("k", "v", 0).unwrap();
        assert!(kv.expire("k", 10).unwrap());
        assert_eq!(kv.ttl("k").unwrap().1, TtlState::Expiring);
        assert!(kv.expire("k", 100).unwrap());
    }

    #[test]
    fn a_non_positive_ttl_clears_the_expiry() {
        let kv = store();
        kv.set("k", "v", 60).unwrap();
        kv.set("k", "v", 0).unwrap();
        assert_eq!(kv.ttl("k").unwrap().1, TtlState::NoExpiry);
    }

    #[test]
    fn an_expired_key_reads_as_missing() {
        let kv = DbStore::new(Arc::new(DB::new()));
        let db = Arc::clone(&kv.kv);
        db.set_with_ttl("k", "v", Duration::from_millis(30));
        std::thread::sleep(Duration::from_millis(60));
        assert_eq!(kv.get("k").unwrap(), (String::new(), false));
        assert_eq!(kv.ttl("k").unwrap().1, TtlState::Missing);
    }

    #[test]
    fn classify_maps_every_db_variant() {
        assert_eq!(classify(TTL::Missing), (-2, TtlState::Missing));
        assert_eq!(classify(TTL::NoExpiry), (-1, TtlState::NoExpiry));
        assert_eq!(classify(TTL::Remaining(30)), (30, TtlState::Expiring));
    }

    #[test]
    fn ttl_state_reports_its_wire_name_and_signed_seconds() {
        assert_eq!(TtlState::Missing.as_str(), "missing");
        assert_eq!(TtlState::NoExpiry.as_str(), "no-expiry");
        assert_eq!(TtlState::Expiring.as_str(), "expiring");
        assert_eq!(TtlState::Missing.signed_seconds(0), -2);
        assert_eq!(TtlState::NoExpiry.signed_seconds(0), -1);
        assert_eq!(TtlState::Expiring.signed_seconds(30), 30);
    }
}
