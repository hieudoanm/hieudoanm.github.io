use crate::core::util;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn constant(value: JsValue) -> js_sys::Function {
    let closure = Closure::wrap(Box::new(move || value.clone()) as Box<dyn Fn() -> JsValue>);
    closure
        .into_js_value()
        .dyn_into::<js_sys::Function>()
        .unwrap()
}

#[wasm_bindgen]
pub fn identity(value: JsValue) -> JsValue {
    value
}

#[wasm_bindgen]
pub fn range(start: i32, end: i32, step: i32) -> Vec<i32> {
    util::range(start, end, step)
}

#[wasm_bindgen(js_name = "rangeRight")]
pub fn range_right(start: i32, end: i32, step: i32) -> Vec<i32> {
    util::range_right(start, end, step)
}

#[wasm_bindgen(js_name = "stubArray")]
pub fn stub_array() -> Vec<i32> {
    util::stub_array()
}

#[wasm_bindgen(js_name = "stubFalse")]
pub fn stub_false() -> bool {
    util::stub_false()
}

#[wasm_bindgen(js_name = "stubObject")]
pub fn stub_object() -> js_sys::Object {
    js_sys::Object::new()
}

#[wasm_bindgen(js_name = "stubString")]
pub fn stub_string() -> String {
    util::stub_string()
}

#[wasm_bindgen(js_name = "stubTrue")]
pub fn stub_true() -> bool {
    util::stub_true()
}

#[wasm_bindgen(js_name = "uniqueId")]
pub fn unique_id(prefix: &str) -> String {
    util::unique_id(prefix)
}

#[wasm_bindgen]
pub fn noop() {}
