//! In-memory key/value store mirroring the Go implementation: a
//! `map<String, String>` guarded by an `RwLock`, plus a separate expiry map.

use std::collections::HashMap;
use std::sync::RwLock;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

pub mod persist;
pub mod ttl;

/// Live value + the absolute expiry instants (epoch ms) for expiring keys.
#[derive(Default)]
struct Inner {
    data: HashMap<String, String>,
    expires: HashMap<String, u128>,
}

/// Concurrency-safe in-memory key/value store with per-key expiry.
pub struct DB {
    inner: RwLock<Inner>,
}

impl Default for DB {
    fn default() -> Self {
        DB::new()
    }
}

impl DB {
    /// Returns an empty store.
    pub fn new() -> Self {
        DB {
            inner: RwLock::new(Inner::default()),
        }
    }

    /// Stores `value` under `key` with no expiry, overwriting any existing value.
    pub fn set(&self, key: &str, value: &str) {
        let mut inner = self.inner.write().unwrap();
        inner.data.insert(key.to_string(), value.to_string());
        inner.expires.remove(key);
    }

    /// Returns the value stored under `key`, if present and not expired.
    pub fn get(&self, key: &str) -> Option<String> {
        let mut inner = self.inner.write().unwrap();
        if inner.expired(key) {
            return None;
        }
        inner.data.get(key).cloned()
    }

    /// Removes `key` and reports whether it was present.
    pub fn del(&self, key: &str) -> bool {
        let mut inner = self.inner.write().unwrap();
        if !inner.data.contains_key(key) {
            return false;
        }
        inner.data.remove(key);
        inner.expires.remove(key);
        true
    }

    /// Removes every key and reports how many were present.
    pub fn del_many(&self, keys: &[String]) -> usize {
        let mut inner = self.inner.write().unwrap();
        keys.iter()
            .filter(|k| inner.data.remove(k.as_str()).is_some())
            .count()
    }

    /// Reports whether `key` is present and not expired.
    pub fn exists(&self, key: &str) -> bool {
        let mut inner = self.inner.write().unwrap();
        if inner.expired(key) {
            return false;
        }
        inner.data.contains_key(key)
    }

    /// Returns the number of present, unexpired keys.
    pub fn len(&self) -> usize {
        let inner = self.inner.read().unwrap();
        inner
            .data
            .keys()
            .filter(|k| !inner.expired_at(k, now_ms()))
            .count()
    }

    /// Returns true when no unexpired keys remain.
    pub fn is_empty(&self) -> bool {
        self.len() == 0
    }

    /// Removes all keys and returns how many were removed.
    pub fn flush(&self) -> usize {
        let mut inner = self.inner.write().unwrap();
        let n = inner.data.len();
        inner.data.clear();
        inner.expires.clear();
        n
    }

    /// Returns the present, unexpired keys, sorted.
    pub fn keys(&self) -> Vec<String> {
        let inner = self.inner.read().unwrap();
        let mut keys: Vec<String> = inner
            .data
            .keys()
            .filter(|k| !inner.expired_at(k, now_ms()))
            .cloned()
            .collect();
        keys.sort();
        keys
    }
}

impl Inner {
    /// Reports whether `key` is missing or its expiry has passed.
    fn expired(&mut self, key: &str) -> bool {
        self.expired_at(key, now_ms())
    }

    /// Reports whether `key` is missing or its expiry is past `now`.
    fn expired_at(&self, key: &str, now: u128) -> bool {
        match self.expires.get(key) {
            Some(expiry) => *expiry <= now,
            None => false,
        }
    }
}

/// Current wall-clock time in milliseconds since the Unix epoch.
pub fn now_ms() -> u128 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or(Duration::ZERO)
        .as_millis()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn set_del_overwrite() {
        let db = DB::new();
        assert!(db.get("a").is_none());
        db.set("a", "one");
        assert_eq!(db.get("a").unwrap(), "one");
        db.set("a", "two");
        assert_eq!(db.get("a").unwrap(), "two");
        assert!(db.del("a"));
        assert!(!db.del("a"));
        assert!(db.get("a").is_none());
    }

    #[test]
    fn del_many_counts_present() {
        let db = DB::new();
        db.set("a", "1");
        db.set("b", "2");
        db.set("c", "3");
        let keys = vec!["a".to_string(), "b".to_string(), "missing".to_string()];
        assert_eq!(db.del_many(&keys), 2);
        assert_eq!(db.keys().len(), 1);
    }

    #[test]
    fn exists_len_keys_sorted() {
        let db = DB::new();
        assert!(!db.exists("a"));
        db.set("z", "1");
        db.set("m", "2");
        db.set("a", "3");
        assert!(db.exists("m"));
        assert_eq!(db.len(), 3);
        assert!(!db.is_empty());
        assert_eq!(db.keys(), vec!["a", "m", "z"]);
        assert!(!db.is_empty());
    }

    #[test]
    fn flush_clears_everything() {
        let db = DB::new();
        db.set("a", "1");
        db.set("b", "2");
        assert_eq!(db.flush(), 2);
        assert_eq!(db.len(), 0);
        assert!(db.is_empty());
    }
}
