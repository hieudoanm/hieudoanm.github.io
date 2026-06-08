use wasm_bindgen::prelude::*;
use serde_json::Value;

fn from_js<T: serde::de::DeserializeOwned + Default>(v: &JsValue) -> T {
    serde_wasm_bindgen::from_value(v.clone()).unwrap_or_default()
}

#[wasm_bindgen]
pub fn parse_json(text: &str, default: &JsValue) -> JsValue {
    let default_val: Value = from_js(default);
    let result = crate::core::json::parse_json(text, default_val);
    serde_wasm_bindgen::to_value(&result).unwrap_or(JsValue::NULL)
}

#[wasm_bindgen]
pub fn json_to_csv(data: &JsValue) -> String {
    let arr: Vec<serde_json::Value> = from_js(data);
    crate::core::json::json_to_csv(&arr)
}

#[wasm_bindgen]
pub fn to_java(data: &JsValue, root_name: &str) -> String {
    let val: Value = from_js(data);
    crate::core::json::to_java(&val, root_name)
}

#[wasm_bindgen]
pub fn to_python(data: &JsValue, root_name: &str) -> String {
    let val: Value = from_js(data);
    crate::core::json::to_python(&val, root_name)
}

#[wasm_bindgen]
pub fn to_rust(data: &JsValue, root_name: &str) -> String {
    let val: Value = from_js(data);
    crate::core::json::to_rust(&val, root_name)
}

#[wasm_bindgen]
pub fn to_ts(data: &JsValue, root_name: &str, indent_size: usize) -> String {
    let val: Value = from_js(data);
    crate::core::json::to_ts(&val, root_name, indent_size)
}

#[wasm_bindgen]
pub fn to_xml(data: &JsValue, indent: bool, indent_size: usize, declaration: bool, root_name: Option<String>) -> String {
    let val: Value = from_js(data);
    crate::core::json::to_xml(&val, indent, indent_size, declaration, root_name.as_deref())
}

#[wasm_bindgen]
pub fn to_schema(data: &JsValue, root_name: &str, indent_size: usize) -> String {
    let val: Value = from_js(data);
    crate::core::json::to_schema(&val, root_name, indent_size)
}
