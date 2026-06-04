use std::cell::RefCell;
use std::time::{SystemTime, UNIX_EPOCH};

thread_local! {
    static RNG: RefCell<SimpleRng> = RefCell::new(SimpleRng::new());
}

struct SimpleRng(u64);

impl SimpleRng {
    fn new() -> Self {
        let seed = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_nanos() as u64;
        SimpleRng(seed)
    }

    fn next(&mut self) -> u64 {
        self.0 = self
            .0
            .wrapping_mul(6364136223846793005)
            .wrapping_add(1442695040888963407);
        self.0
    }

    fn next_f64(&mut self) -> f64 {
        (self.next() >> 11) as f64 / (1u64 << 53) as f64
    }
}

/// Clamps `number` within the inclusive range `lower` to `upper`.
///
/// If `number` is less than `lower`, returns `lower`.
/// If `number` is greater than `upper`, returns `upper`.
/// Otherwise, returns `number`.
pub fn clamp(number: f64, lower: f64, upper: f64) -> f64 {
    number.clamp(lower, upper)
}

/// Checks if `n` is between `start` and up to (but not including) `end`.
///
/// If `end` is not specified, the range starts at 0 and ends at `start`.
/// Returns `true` if `start <= n < end` (or `0 <= n < start` when `end` is `None`).
pub fn in_range(n: f64, start: f64, end: Option<f64>) -> bool {
    let (lo, hi) = match end {
        Some(end_val) => {
            if start < end_val {
                (start, end_val)
            } else {
                (end_val, start)
            }
        }
        None => {
            if start < 0.0 {
                (start, 0.0)
            } else {
                (0.0, start)
            }
        }
    };
    n >= lo && n < hi
}

/// Produces a random number between `lower` and `upper` (inclusive).
///
/// If only one argument is provided, `lower` defaults to `0.0`.
/// If `floating` is `true`, returns a float; otherwise returns an integer.
/// If `floating` is `None`, returns a float only when at least one bound is non-integral.
pub fn random(lower: f64, upper: Option<f64>, floating: Option<bool>) -> f64 {
    let (lo, hi) = match upper {
        Some(u) => (lower, u),
        None => (0.0, lower),
    };

    let should_float = floating.unwrap_or_else(|| lo.fract() != 0.0 || hi.fract() != 0.0);

    RNG.with(|rng| {
        let mut rng = rng.borrow_mut();
        let rand = rng.next_f64();
        let val = lo + rand * (hi - lo);

        if should_float {
            val
        } else {
            val.round()
        }
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_clamp() {
        assert_eq!(clamp(-10.0, -5.0, 5.0), -5.0);
        assert_eq!(clamp(10.0, -5.0, 5.0), 5.0);
        assert_eq!(clamp(0.0, -5.0, 5.0), 0.0);
        assert_eq!(clamp(3.0, 3.0, 5.0), 3.0);
        assert_eq!(clamp(5.0, 3.0, 5.0), 5.0);
    }

    #[test]
    fn test_in_range_with_end() {
        assert!(in_range(3.0, 2.0, Some(4.0)));
        assert!(!in_range(4.0, 2.0, Some(4.0)));
        assert!(!in_range(1.0, 2.0, Some(4.0)));
    }

    #[test]
    fn test_in_range_without_end() {
        assert!(in_range(3.0, 5.0, None));
        assert!(!in_range(5.0, 5.0, None));
        assert!(!in_range(6.0, 5.0, None));
        assert!(in_range(-3.0, -5.0, None));
    }

    #[test]
    fn test_in_range_swapped() {
        assert!(in_range(3.0, 4.0, Some(2.0)));
    }

    #[test]
    fn test_random_in_range() {
        for _ in 0..100 {
            let r = random(5.0, Some(10.0), Some(false));
            assert!(r >= 5.0 && r <= 10.0);
        }
    }

    #[test]
    fn test_random_single_arg() {
        for _ in 0..100 {
            let r = random(10.0, None, Some(false));
            assert!(r >= 0.0 && r <= 10.0);
        }
    }

    #[test]
    fn test_random_floating() {
        let r = random(1.0, Some(2.0), Some(true));
        assert!(r >= 1.0 && r <= 2.0);
    }
}
