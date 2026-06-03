use wasm_bindgen::prelude::*;
use crate::core::math;

#[wasm_bindgen]
pub fn add(a: f64, b: f64) -> f64 {
    math::add(a, b)
}

#[wasm_bindgen]
pub fn ceil(n: f64, precision: f64) -> f64 {
    math::ceil(n, precision as i32)
}

#[wasm_bindgen]
pub fn divide(a: f64, b: f64) -> f64 {
    math::divide(a, b)
}

#[wasm_bindgen]
pub fn floor(n: f64, precision: f64) -> f64 {
    math::floor(n, precision as i32)
}

#[wasm_bindgen]
pub fn max(collection: &[f64]) -> f64 {
    math::max(collection).unwrap_or(std::f64::NAN)
}

#[wasm_bindgen]
pub fn max_by(collection: &[f64], iteratee: &js_sys::Function) -> f64 {
    math::max_by(collection, |&item| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(item);
        if let Ok(res) = iteratee.call1(&this, &val) {
            res.as_f64().unwrap_or(std::f64::NAN)
        } else {
            std::f64::NAN
        }
    }).unwrap_or(std::f64::NAN)
}

#[wasm_bindgen]
pub fn mean(collection: &[f64]) -> f64 {
    math::mean(collection)
}

#[wasm_bindgen]
pub fn mean_by(collection: &[f64], iteratee: &js_sys::Function) -> f64 {
    math::mean_by(collection, |&item| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(item);
        if let Ok(res) = iteratee.call1(&this, &val) {
            res.as_f64().unwrap_or(std::f64::NAN)
        } else {
            std::f64::NAN
        }
    })
}

#[wasm_bindgen]
pub fn min(collection: &[f64]) -> f64 {
    math::min(collection).unwrap_or(std::f64::NAN)
}

#[wasm_bindgen]
pub fn min_by(collection: &[f64], iteratee: &js_sys::Function) -> f64 {
    math::min_by(collection, |&item| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(item);
        if let Ok(res) = iteratee.call1(&this, &val) {
            res.as_f64().unwrap_or(std::f64::NAN)
        } else {
            std::f64::NAN
        }
    }).unwrap_or(std::f64::NAN)
}

#[wasm_bindgen]
pub fn multiply(a: f64, b: f64) -> f64 {
    math::multiply(a, b)
}

#[wasm_bindgen]
pub fn round(n: f64, precision: f64) -> f64 {
    math::round(n, precision as i32)
}

#[wasm_bindgen]
pub fn subtract(a: f64, b: f64) -> f64 {
    math::subtract(a, b)
}

#[wasm_bindgen]
pub fn sum(collection: &[f64]) -> f64 {
    math::sum(collection)
}

#[wasm_bindgen]
pub fn sum_by(collection: &[f64], iteratee: &js_sys::Function) -> f64 {
    math::sum_by(collection, |&item| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(item);
        if let Ok(res) = iteratee.call1(&this, &val) {
            res.as_f64().unwrap_or(std::f64::NAN)
        } else {
            std::f64::NAN
        }
    })
}
