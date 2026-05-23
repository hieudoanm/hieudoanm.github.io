use crate::core::lang;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn eq(a: f64, b: f64) -> bool {
    lang::eq(&a, &b)
}

#[wasm_bindgen(js_name = "eqStrings")]
pub fn eq_string(a: String, b: String) -> bool {
    lang::eq(&a, &b)
}

#[wasm_bindgen]
pub fn gt(value: f64, other: f64) -> bool {
    lang::gt(value, other)
}

#[wasm_bindgen]
pub fn gte(value: f64, other: f64) -> bool {
    lang::gte(value, other)
}

#[wasm_bindgen(js_name = "isEmpty")]
pub fn is_empty(array: &[f64]) -> bool {
    lang::is_empty(array)
}

#[wasm_bindgen(js_name = "isEmptyStrings")]
pub fn is_empty_string(array: Vec<String>) -> bool {
    lang::is_empty(&array)
}

#[wasm_bindgen(js_name = "isFinite")]
pub fn is_finite(value: f64) -> bool {
    lang::is_finite(value)
}

#[wasm_bindgen(js_name = "isInteger")]
pub fn is_integer(value: f64) -> bool {
    lang::is_integer(value)
}

#[wasm_bindgen(js_name = "isLength")]
pub fn is_length(value: usize) -> bool {
    lang::is_length(value)
}

#[wasm_bindgen(js_name = "isNaN")]
pub fn is_nan(value: f64) -> bool {
    lang::is_nan(value)
}

#[wasm_bindgen(js_name = "isNumber")]
pub fn is_number(value: f64) -> bool {
    lang::is_number_f64(value)
}

#[wasm_bindgen]
pub fn lt(value: f64, other: f64) -> bool {
    lang::lt(value, other)
}

#[wasm_bindgen]
pub fn lte(value: f64, other: f64) -> bool {
    lang::lte(value, other)
}

#[wasm_bindgen(js_name = "toArray")]
pub fn to_array(array: &[f64]) -> Vec<f64> {
    lang::to_array(array)
}

#[wasm_bindgen(js_name = "toArrayStrings")]
pub fn to_array_string(array: Vec<String>) -> Vec<String> {
    lang::to_array(&array)
}

#[wasm_bindgen(js_name = "toFinite")]
pub fn to_finite(value: f64) -> f64 {
    lang::to_finite(value)
}

#[wasm_bindgen(js_name = "toInteger")]
pub fn to_integer(value: f64) -> i64 {
    lang::to_integer(value)
}

#[wasm_bindgen(js_name = "toNumber")]
pub fn to_number(value: &str) -> f64 {
    lang::to_number(value)
}

#[wasm_bindgen(js_name = "toSafeInteger")]
pub fn to_safe_integer(value: f64) -> i64 {
    lang::to_safe_integer(value)
}

#[wasm_bindgen(js_name = "toString")]
pub fn to_string(value: &str) -> String {
    lang::to_string(&value)
}
