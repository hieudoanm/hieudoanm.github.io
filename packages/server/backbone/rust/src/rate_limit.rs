use std::collections::HashMap;
use std::sync::Mutex;
use std::time::Instant;

use axum::{
    Json,
    extract::{Request, State},
    http::StatusCode,
    middleware::Next,
    response::{IntoResponse, Response},
};

use crate::handlers::AppState;

pub struct RateLimiter {
    buckets: Mutex<HashMap<String, TokenBucket>>,
    capacity: f64,
    refill_rate: f64,
}

struct TokenBucket {
    tokens: f64,
    last_refill: Instant,
}

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn new_creates_rate_limiter() {
        let rl = RateLimiter::new(10.0, 1.0);
        assert_eq!(rl.capacity, 10.0);
        assert_eq!(rl.refill_rate, 1.0);
        assert!(rl.buckets.lock().unwrap().is_empty());
    }

    #[test]
    fn first_request_to_new_ip_is_allowed() {
        let rl = RateLimiter::new(1.0, 0.0);
        assert!(rl.check("192.168.1.1"));
    }

    #[test]
    fn rapid_requests_exhaust_capacity() {
        let rl = RateLimiter::new(3.0, 0.0);
        assert!(rl.check("10.0.0.1"));
        assert!(rl.check("10.0.0.1"));
        assert!(rl.check("10.0.0.1"));
        assert!(!rl.check("10.0.0.1"));
    }

    #[test]
    fn different_ips_have_independent_buckets() {
        let rl = RateLimiter::new(1.0, 0.0);
        assert!(rl.check("ip-a"));
        assert!(!rl.check("ip-a"));
        assert!(rl.check("ip-b"));
    }

    #[test]
    fn cleanup_on_empty_state_is_safe() {
        let rl = RateLimiter::new(10.0, 1.0);
        rl.cleanup();
        assert!(rl.buckets.lock().unwrap().is_empty());
    }
}

pub async fn rate_limit_middleware(
    State(state): State<std::sync::Arc<AppState>>,
    request: Request,
    next: Next,
) -> Response {
    let ip = request
        .headers()
        .get("x-forwarded-for")
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.split(',').next())
        .map(|s| s.trim().to_string())
        .unwrap_or_else(|| {
            request
                .extensions()
                .get::<axum::extract::connect_info::ConnectInfo<std::net::SocketAddr>>()
                .map(|ci| ci.0.ip().to_string())
                .unwrap_or_else(|| "127.0.0.1".to_string())
        });

    if !state.rate_limiter.check(&ip) {
        return (StatusCode::TOO_MANY_REQUESTS, Json(serde_json::json!({"error": "rate limit exceeded"}))).into_response();
    }

    next.run(request).await
}
