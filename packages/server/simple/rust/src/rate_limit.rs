use std::collections::HashMap;
use std::sync::Mutex;
use std::time::Instant;

#[allow(dead_code)]
pub struct RateLimiter {
    buckets: Mutex<HashMap<String, TokenBucket>>,
    capacity: f64,
    refill_rate: f64,
}

#[allow(dead_code)]
struct TokenBucket {
    tokens: f64,
    last_refill: Instant,
}

#[allow(dead_code)]
impl RateLimiter {
    pub fn new(capacity: f64, refill_rate: f64) -> Self {
        Self {
            buckets: Mutex::new(HashMap::new()),
            capacity,
            refill_rate,
        }
    }

    pub fn check(&self, ip: &str) -> bool {
        let mut buckets = self.buckets.lock().unwrap();
        let now = Instant::now();
        let bucket = buckets.entry(ip.to_string()).or_insert(TokenBucket {
            tokens: self.capacity,
            last_refill: now,
        });
        let elapsed = now.duration_since(bucket.last_refill).as_secs_f64();
        bucket.tokens = (bucket.tokens + elapsed * self.refill_rate).min(self.capacity);
        bucket.last_refill = now;
        if bucket.tokens >= 1.0 {
            bucket.tokens -= 1.0;
            true
        } else {
            false
        }
    }

    pub fn cleanup(&self) {
        let mut buckets = self.buckets.lock().unwrap();
        buckets.retain(|_, b| b.tokens < self.capacity);
    }
}
