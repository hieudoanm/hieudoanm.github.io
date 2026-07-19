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

#[cfg(all(test, target_arch = "wasm32"))]
mod wasm_tests {
    use super::*;
    use serde_json::json;

    fn js_val(value: &serde_json::Value) -> JsValue {
        serde_wasm_bindgen::to_value(value).unwrap()
    }

    #[test]
    fn test_parse_json_valid() {
        let result = parse_json(r#"{"a":1}"#, &JsValue::NULL);
        let val: serde_json::Value = serde_wasm_bindgen::from_value(result).unwrap();
        assert_eq!(val["a"], 1);
    }

    #[test]
    fn test_parse_json_invalid_uses_default() {
        let default = js_val(&json!({"x": 0}));
        let result = parse_json("not json", &default);
        let val: serde_json::Value = serde_wasm_bindgen::from_value(result).unwrap();
        assert_eq!(val["x"], 0);
    }

    #[test]
    fn test_json_to_csv() {
        let data = js_val(&json!([{"id": "1", "name": "alice"}, {"id": "2", "name": "bob"}]));
        let csv = json_to_csv(&data);
        assert!(csv.contains("alice"));
        assert!(csv.contains("bob"));
    }

    #[test]
    fn test_json_to_csv_empty() {
        let data = js_val(&json!([]));
        let csv = json_to_csv(&data);
        assert!(csv.is_empty());
    }

    #[test]
    fn test_to_java() {
        let obj = js_val(&json!({"name": "hello", "count": 42}));
        let java = to_java(&obj, "Root");
        assert!(java.contains("public class Root"));
        assert!(java.contains("String name"));
    }

    #[test]
    fn test_to_python() {
        let obj = js_val(&json!({"name": "hello"}));
        let py = to_python(&obj, "Root");
        assert!(py.contains("class Root:"));
        assert!(py.contains("name: str"));
    }

    #[test]
    fn test_to_rust() {
        let obj = js_val(&json!({"name": "hello"}));
        let rs = to_rust(&obj, "Root");
        assert!(rs.contains("struct Root"));
        assert!(rs.contains("name: String"));
    }

    #[test]
    fn test_to_ts() {
        let obj = js_val(&json!({"name": "hello"}));
        let ts = to_ts(&obj, "Root", 2);
        assert!(ts.contains("name: string"));
    }

    #[test]
    fn test_to_xml() {
        let obj = js_val(&json!({"item": "value"}));
        let xml = to_xml(&obj, false, 2, false, None);
        assert!(xml.contains("<item>value</item>"));
    }

    #[test]
    fn test_to_schema() {
        let obj = js_val(&json!("hello"));
        let schema = to_schema(&obj, "Root", 2);
        assert!(schema.contains("\"type\": \"string\""));
    }
}
