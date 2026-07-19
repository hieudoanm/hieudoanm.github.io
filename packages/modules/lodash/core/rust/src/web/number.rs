use crate::core::number;
use wasm_bindgen::prelude::*;

/// Clamps `number` within the inclusive range `lower` to `upper`.
#[wasm_bindgen]
pub fn clamp(n: f64, lower: f64, upper: f64) -> f64 {
    number::clamp(n, lower, upper)
}

/// Checks if `n` is between `start` and up to (but not including) `end`.
/// If `end` is `NaN` or not provided (use `f64::NAN`), the range is `[0, start)`.
#[wasm_bindgen(js_name = "inRange")]
pub fn in_range(n: f64, start: f64, end: f64) -> bool {
    let end_opt = if end.is_nan() { None } else { Some(end) };
    number::in_range(n, start, end_opt)
}

/// Produces a random number between `lower` and `upper` (inclusive).
/// If `upper` is `NaN`, range is `[0, lower]`.
/// If `floating` is `1.0`, returns a float; `0.0` returns integer; `NaN` infers from bounds.
#[wasm_bindgen]
pub fn random(lower: f64, upper: f64, floating: f64) -> f64 {
    let upper_opt = if upper.is_nan() { None } else { Some(upper) };
    let floating_opt = if floating.is_nan() {
        None
    } else {
        Some(floating != 0.0)
    };
    number::random(lower, upper_opt, floating_opt)
}
