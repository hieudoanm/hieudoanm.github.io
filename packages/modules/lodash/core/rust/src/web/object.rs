use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn keys(data: &js_sys::Object) -> Vec<String> {
    let js_keys = js_sys::Object::keys(data);
    let len = js_keys.length();
    let mut result = Vec::with_capacity(len as usize);
    for i in 0..len {
        if let Some(key) = js_keys.get(i).as_string() {
            result.push(key);
        }
    }
    result
}

#[wasm_bindgen]
pub fn values(data: &js_sys::Object) -> Vec<JsValue> {
    let js_keys = js_sys::Object::keys(data);
    let len = js_keys.length();
    let mut result = Vec::with_capacity(len as usize);
    for i in 0..len {
        if let Some(key) = js_keys.get(i).as_string() {
            let key_js = JsValue::from_str(&key);
            if let Ok(val) = js_sys::Reflect::get(data, &key_js) {
                result.push(val);
            }
        }
    }
    result
}

#[wasm_bindgen]
pub fn has(data: &js_sys::Object, path: &str) -> bool {
    let key = JsValue::from_str(path);
    js_sys::Reflect::has(data, &key).unwrap_or(false)
}

#[wasm_bindgen]
pub fn get(data: &js_sys::Object, path: &str) -> JsValue {
    let key = JsValue::from_str(path);
    js_sys::Reflect::get(data, &key).unwrap_or(JsValue::UNDEFINED)
}

#[wasm_bindgen]
pub fn set(data: &js_sys::Object, path: &str, value: JsValue) -> bool {
    let key = JsValue::from_str(path);
    js_sys::Reflect::set(data, &key, &value).unwrap_or(false)
}

#[wasm_bindgen]
pub fn omit(data: &js_sys::Object, paths: Vec<String>) -> js_sys::Object {
    let result = js_sys::Object::new();
    let keys = js_sys::Object::keys(data);
    let len = keys.length();
    for i in 0..len {
        if let Some(key) = keys.get(i).as_string() {
            if !paths.contains(&key) {
                let key_js = JsValue::from_str(&key);
                if let Ok(val) = js_sys::Reflect::get(data, &key_js) {
                    let _ = js_sys::Reflect::set(&result, &key_js, &val);
                }
            }
        }
    }
    result
}

#[wasm_bindgen]
pub fn pick(data: &js_sys::Object, paths: Vec<String>) -> js_sys::Object {
    let result = js_sys::Object::new();
    for path in &paths {
        let key = JsValue::from_str(path);
        if let Ok(val) = js_sys::Reflect::get(data, &key) {
            let _ = js_sys::Reflect::set(&result, &key, &val);
        }
    }
    result
}

#[wasm_bindgen(js_name = "toPairs")]
pub fn to_pairs(data: &js_sys::Object) -> js_sys::Array {
    let pairs = js_sys::Array::new();
    let keys = js_sys::Object::keys(data);
    let len = keys.length();
    for i in 0..len {
        if let Some(key) = keys.get(i).as_string() {
            let key_js = JsValue::from_str(&key);
            if let Ok(val) = js_sys::Reflect::get(data, &key_js) {
                let pair = js_sys::Array::new();
                pair.push(&key_js);
                pair.push(&val);
                pairs.push(&pair);
            }
        }
    }
    pairs
}

#[wasm_bindgen(js_name = "fromPairs")]
pub fn from_pairs(pairs: js_sys::Array) -> js_sys::Object {
    let result = js_sys::Object::new();
    let len = pairs.length();
    for i in 0..len {
        if let Ok(pair) = pairs.get(i).dyn_into::<js_sys::Array>() {
            if pair.length() >= 2 {
                let key = pair.get(0);
                let val = pair.get(1);
                let _ = js_sys::Reflect::set(&result, &key, &val);
            }
        }
    }
    result
}
