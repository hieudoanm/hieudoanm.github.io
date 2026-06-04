use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn chain(value: JsValue) -> JsValue {
    value
}

#[wasm_bindgen]
pub fn tap(value: JsValue, interceptor: &js_sys::Function) -> JsValue {
    let _ = interceptor.call1(&JsValue::NULL, &value);
    value
}

#[wasm_bindgen]
pub fn thru(value: JsValue, interceptor: &js_sys::Function) -> JsValue {
    interceptor.call1(&JsValue::NULL, &value).unwrap_or(JsValue::UNDEFINED)
}
