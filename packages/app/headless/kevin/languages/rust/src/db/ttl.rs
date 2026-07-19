//! TTL/EXPIRE support: per-key expiry with lazy deletion on access.

use super::{now_ms, DB};
use std::time::Duration;

/// Result of a TTL query, mirroring the Go sentinel semantics:
/// -2s (missing/expired), -1s (no expiry), else remaining seconds (ceil).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TTL {
    Missing,
    NoExpiry,
    Remaining(i64),
}

impl DB {
    /// Stores `value` under `key`, expiring `ttl` from now.
    pub fn set_with_ttl(&self, key: &str, value: &str, ttl: Duration) {
        let mut inner = self.inner.write().unwrap();
        inner.data.insert(key.to_string(), value.to_string());
        inner
            .expires
            .insert(key.to_string(), now_ms() + ttl.as_millis());
    }

    /// Sets an expiry on an existing key, replacing any previous one.
    /// Reports whether the key exists.
    pub fn expire(&self, key: &str, ttl: Duration) -> bool {
        let mut inner = self.inner.write().unwrap();
        if !inner.data.contains_key(key) {
            return false;
        }
        inner
            .expires
            .insert(key.to_string(), now_ms() + ttl.as_millis());
        true
    }

    /// Returns the remaining lifetime of `key`.
    pub fn ttl(&self, key: &str) -> TTL {
        let mut inner = self.inner.write().unwrap();
        if !inner.data.contains_key(key) || inner.expired(key) {
            return TTL::Missing;
        }
        match inner.expires.get(key) {
            None => TTL::NoExpiry,
            Some(expiry) => {
                let remaining = expiry.saturating_sub(now_ms());
                TTL::Remaining(remaining.div_ceil(1000) as i64)
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn set_with_ttl_expires() {
        let db = DB::new();
        db.set_with_ttl("k", "v", Duration::from_millis(30));
        assert!(db.get("k").is_some());
        std::thread::sleep(Duration::from_millis(60));
        assert!(db.get("k").is_none());
        assert_eq!(db.ttl("k"), TTL::Missing);
    }

    #[test]
    fn expire_sets_and_replaces() {
        let db = DB::new();
        assert!(!db.expire("missing", Duration::from_secs(10)));
        db.set("k", "v");
        assert!(db.expire("k", Duration::from_secs(10)));
        assert!(matches!(db.ttl("k"), TTL::Remaining(n) if (1..=10).contains(&n)));
        assert!(db.expire("k", Duration::from_secs(100)));
    }

    #[test]
    fn ttl_sentinels() {
        let db = DB::new();
        assert_eq!(db.ttl("missing"), TTL::Missing);
        db.set("k", "v");
        assert_eq!(db.ttl("k"), TTL::NoExpiry);
    }

    #[test]
    fn set_removes_expiry() {
        let db = DB::new();
        db.set_with_ttl("k", "v", Duration::from_secs(100));
        db.set("k", "fresh");
        assert_eq!(db.ttl("k"), TTL::NoExpiry);
    }
}
