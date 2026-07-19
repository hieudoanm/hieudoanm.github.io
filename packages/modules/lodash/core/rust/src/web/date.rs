use crate::core::date;
use wasm_bindgen::prelude::*;

/// Returns the number of milliseconds elapsed since the Unix epoch (January 1, 1970 00:00:00 UTC).
#[wasm_bindgen]
pub fn now() -> f64 {
    date::now()
}
