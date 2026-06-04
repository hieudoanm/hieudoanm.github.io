use wasm_bindgen::prelude::*;
use crate::core::string;
use std::collections::HashMap;

#[wasm_bindgen(js_name = "camelCase")]
pub fn camel_case(s: &str) -> String {
    string::camel_case(s)
}

#[wasm_bindgen]
pub fn capitalize(s: &str) -> String {
    string::capitalize(s)
}

#[wasm_bindgen]
pub fn deburr(s: &str) -> String {
    string::deburr(s)
}

#[wasm_bindgen]
pub fn escape(s: &str) -> String {
    string::escape(s)
}

#[wasm_bindgen(js_name = "escapeRegExp")]
pub fn escape_regexp(s: &str) -> String {
    string::escape_regexp(s)
}

#[wasm_bindgen(js_name = "kebabCase")]
pub fn kebab_case(s: &str) -> String {
    string::kebab_case(s)
}

#[wasm_bindgen(js_name = "lowerCase")]
pub fn lower_case(s: &str) -> String {
    string::lower_case(s)
}

#[wasm_bindgen(js_name = "lowerFirst")]
pub fn lower_first(s: &str) -> String {
    string::lower_first(s)
}

#[wasm_bindgen]
pub fn pad(s: &str, length: usize, chars: &str) -> String {
    string::pad(s, length, chars)
}

#[wasm_bindgen(js_name = "padEnd")]
pub fn pad_end(s: &str, length: usize, chars: &str) -> String {
    string::pad_end(s, length, chars)
}

#[wasm_bindgen(js_name = "padStart")]
pub fn pad_start(s: &str, length: usize, chars: &str) -> String {
    string::pad_start(s, length, chars)
}

#[wasm_bindgen(js_name = "parseInt")]
pub fn parse_int(s: &str, radix: u32) -> i32 {
    string::parse_int(s, radix)
}

#[wasm_bindgen]
pub fn repeat(s: &str, n: usize) -> String {
    string::repeat(s, n)
}

#[wasm_bindgen]
pub fn replace(s: &str, pattern: &str, replacement: &str) -> String {
    string::replace(s, pattern, replacement)
}

#[wasm_bindgen(js_name = "snakeCase")]
pub fn snake_case(s: &str) -> String {
    string::snake_case(s)
}

#[wasm_bindgen]
pub fn split(s: &str, separator: &str, limit: usize) -> Vec<String> {
    string::split(s, separator, limit)
        .into_iter()
        .map(|s| s.to_string())
        .collect()
}

#[wasm_bindgen(js_name = "startCase")]
pub fn start_case(s: &str) -> String {
    string::start_case(s)
}

#[wasm_bindgen]
pub fn template(s: &str, data: &js_sys::Object) -> String {
    let mut map = HashMap::new();
    let keys = js_sys::Object::keys(data);
    let len = keys.length();
    for i in 0..len {
        let key = keys.get(i);
        if let Some(key_str) = key.as_string() {
            let value = js_sys::Reflect::get(data, &key);
            if let Ok(val) = value {
                if let Some(val_str) = val.as_string() {
                    map.insert(key_str, val_str);
                }
            }
        }
    }
    let map_ref: HashMap<&str, &str> = map.iter().map(|(k, v)| (k.as_str(), v.as_str())).collect();
    string::template(s, &map_ref)
}

#[wasm_bindgen(js_name = "toLower")]
pub fn to_lower(s: &str) -> String {
    string::to_lower(s)
}

#[wasm_bindgen(js_name = "toUpper")]
pub fn to_upper(s: &str) -> String {
    string::to_upper(s)
}

#[wasm_bindgen]
pub fn truncate(s: &str, length: usize, omission: &str) -> String {
    string::truncate(s, length, omission)
}

#[wasm_bindgen]
pub fn unescape(s: &str) -> String {
    string::unescape(s)
}

#[wasm_bindgen(js_name = "upperCase")]
pub fn upper_case(s: &str) -> String {
    string::upper_case(s)
}

#[wasm_bindgen(js_name = "upperFirst")]
pub fn upper_first(s: &str) -> String {
    string::upper_first(s)
}

#[wasm_bindgen]
pub fn words(s: &str) -> Vec<String> {
    string::words(s)
}
