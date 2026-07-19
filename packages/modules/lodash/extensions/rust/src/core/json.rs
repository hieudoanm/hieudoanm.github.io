use serde_json::json;
use serde_json::map::Map;
use serde_json::Value;

pub fn parse_json<T: serde::de::DeserializeOwned>(text: &str, default: T) -> T {
    serde_json::from_str(text).unwrap_or(default)
}

pub fn json_to_csv<T: serde::Serialize>(data: &[T]) -> String {
    let mut csv = String::new();

    let Ok(Value::Array(arr)) = serde_json::to_value(data) else {
        return String::new();
    };

    if arr.is_empty() { return String::new(); }

    let mut headers: Vec<String> = Vec::new();
    for item in &arr {
        if let Value::Object(map) = item {
            for key in map.keys() {
                if !headers.contains(key) {
                    headers.push(key.clone());
                }
            }
        }
    }

    let quote = |s: &str| format!("\"{}\"", s);

    csv.push_str(&headers.iter().map(|h| quote(h)).collect::<Vec<_>>().join(","));
    csv.push('\n');

    for item in &arr {
        if let Value::Object(map) = item {
            let row: Vec<String> = headers.iter()
                .map(|h| map.get(h).map(|v| quote(&v.to_string())).unwrap_or_else(|| "\"\"".to_string()))
                .collect();
            csv.push_str(&row.join(","));
            csv.push('\n');
        }
    }

    csv
}

fn java_parse_type(value: &Value, key: Option<&str>, capitalize: &dyn Fn(&str) -> String) -> String {
    match value {
        Value::Null => "Object".to_string(),
        Value::Array(arr) => {
            if arr.is_empty() { return "List<Object>".to_string(); }
            let types: std::collections::BTreeSet<String> =
                arr.iter().map(|v| java_parse_type(v, None, capitalize)).collect();
            if types.len() == 1 {
                format!("List<{}>", types.iter().next().unwrap())
            } else {
                "List<Object>".to_string()
            }
        }
        Value::Object(_) => key.map_or_else(|| "Object".to_string(), |k| capitalize(k)),
        Value::String(_) => "String".to_string(),
        Value::Number(n) => {
            if n.is_f64() || n.as_f64().map_or(false, |f| f.fract() != 0.0) {
                "double".to_string()
            } else {
                "int".to_string()
            }
        }
        Value::Bool(_) => "boolean".to_string(),
    }
}

fn java_parse_object(
    obj: &Value,
    class_name: &str,
    classes: &mut Vec<String>,
    visited: &mut std::collections::HashSet<String>,
    indent: &dyn Fn(usize) -> String,
    capitalize: &dyn Fn(&str) -> String,
) {
    if !visited.insert(class_name.to_string()) { return; }

    let mut lines = Vec::new();
    lines.push(format!("public class {} {{", class_name));

    if let Value::Object(map) = obj {
        if map.is_empty() {
            lines.push(format!("{}// empty", indent(1)));
        }
        for (key, value) in map {
            let field_type = if value.is_object() {
                let nested = capitalize(key);
                java_parse_object(value, &nested, classes, visited, indent, capitalize);
                nested
            } else {
                java_parse_type(value, Some(key), capitalize)
            };
            let nullable = if value.is_null() { " @Nullable" } else { "" };
            lines.push(format!("{}{} private {} {};", indent(1), nullable, field_type, key));
        }
    }

    lines.push("}".to_string());
    classes.push(lines.join("\n"));
}

pub fn to_java(data: &Value, root_name: &str) -> String {
    let indent = |level: usize| "    ".repeat(level);
    let capitalize = |s: &str| -> String {
        let mut c = s.chars();
        match c.next() {
            None => String::new(),
            Some(f) => f.to_uppercase().to_string() + c.as_str(),
        }
    };

    let mut classes = Vec::new();
    let mut visited = std::collections::HashSet::new();

    java_parse_object(data, root_name, &mut classes, &mut visited, &indent, &capitalize);

    format!(
        "import java.util.List;\nimport javax.annotation.Nullable;\n\n{}",
        classes.join("\n\n")
    )
}

fn python_parse_type(value: &Value) -> String {
    match value {
        Value::Null => "Any".to_string(),
        Value::Array(arr) => {
            if arr.is_empty() { return "List[Any]".to_string(); }
            let types: std::collections::BTreeSet<String> =
                arr.iter().map(|v| python_parse_type(v)).collect();
            if types.len() == 1 {
                format!("List[{}]", types.iter().next().unwrap())
            } else {
                format!("List[Union[{}]]", types.iter().cloned().collect::<Vec<_>>().join(", "))
            }
        }
        Value::Object(_) => "dict".to_string(),
        Value::String(_) => "str".to_string(),
        Value::Number(_) => "float".to_string(),
        Value::Bool(_) => "bool".to_string(),
    }
}

fn python_parse_object(
    obj: &Value,
    class_name: &str,
    level: usize,
    classes: &mut Vec<String>,
    indent: &dyn Fn(usize) -> String,
) {
    let mut lines = Vec::new();
    lines.push(format!("{}@dataclass", indent(level)));
    lines.push(format!("{}class {}:", indent(level), class_name));

    if let Value::Object(map) = obj {
        if map.is_empty() {
            lines.push(format!("{}pass", indent(level + 1)));
        }
        for (key, value) in map {
            if value.is_object() {
                let nested = format!("{}{}", class_name, {
                    let mut c = key.chars();
                    match c.next() {
                        None => String::new(),
                        Some(f) => f.to_uppercase().to_string() + c.as_str(),
                    }
                });
                python_parse_object(value, &nested, level, classes, indent);
                lines.push(format!("{}{}: {}", indent(level + 1), key, nested));
            } else {
                let optional = if value.is_null() { " | None" } else { "" };
                lines.push(format!("{}{}: {}{}", indent(level + 1), key, python_parse_type(value), optional));
            }
        }
    }

    classes.push(lines.join("\n"));
}

pub fn to_python(data: &Value, root_name: &str) -> String {
    let indent = |level: usize| " ".repeat(level * 4);
    let mut classes = Vec::new();
    python_parse_object(data, root_name, 0, &mut classes, &indent);
    format!(
        "from dataclasses import dataclass\nfrom typing import List, Union, Any\n\n{}",
        classes.join("\n\n")
    )
}

fn rust_parse_type(value: &Value, key: Option<&str>, capitalize: &dyn Fn(&str) -> String) -> String {
    match value {
        Value::Null => "Option<serde_json::Value>".to_string(),
        Value::Array(arr) => {
            if arr.is_empty() { return "Vec<serde_json::Value>".to_string(); }
            let types: std::collections::BTreeSet<String> =
                arr.iter().map(|v| rust_parse_type(v, None, capitalize)).collect();
            if types.len() == 1 {
                format!("Vec<{}>", types.iter().next().unwrap())
            } else {
                "Vec<serde_json::Value>".to_string()
            }
        }
        Value::Object(_) => key.map_or_else(|| "serde_json::Value".to_string(), |k| capitalize(k)),
        Value::String(_) => "String".to_string(),
        Value::Number(n) => {
            if n.is_f64() || n.as_f64().map_or(false, |f| f.fract() != 0.0) {
                "f64".to_string()
            } else {
                "i64".to_string()
            }
        }
        Value::Bool(_) => "bool".to_string(),
    }
}

fn rust_parse_object(
    obj: &Value,
    struct_name: &str,
    structs: &mut Vec<String>,
    visited: &mut std::collections::HashSet<String>,
    indent: &dyn Fn(usize) -> String,
    capitalize: &dyn Fn(&str) -> String,
) {
    if !visited.insert(struct_name.to_string()) { return; }

    let mut lines = Vec::new();
    lines.push("#[derive(Debug, Serialize, Deserialize)]".to_string());
    lines.push(format!("pub struct {} {{", struct_name));

    if let Value::Object(map) = obj {
        if map.is_empty() {
            lines.push(format!("{}// empty", indent(1)));
        }
        for (key, value) in map {
            let field_type = if value.is_object() {
                let nested = capitalize(key);
                rust_parse_object(value, &nested, structs, visited, indent, capitalize);
                nested
            } else {
                rust_parse_type(value, Some(key), capitalize)
            };

            let field_type = if value.is_null() {
                format!("Option<{}>", field_type.replace("Option<serde_json::Value>", "serde_json::Value"))
            } else {
                field_type
            };

            let safe_key = if key == "type" { "r#type".to_string() } else { key.clone() };
            lines.push(format!("{}pub {}: {},", indent(1), safe_key, field_type));
        }
    }

    lines.push("}".to_string());
    structs.push(lines.join("\n"));
}

pub fn to_rust(data: &Value, root_name: &str) -> String {
    let indent = |level: usize| " ".repeat(level * 4);
    let capitalize = |s: &str| -> String {
        let mut c = s.chars();
        match c.next() {
            None => String::new(),
            Some(f) => f.to_uppercase().to_string() + c.as_str(),
        }
    };

    let mut structs = Vec::new();
    let mut visited = std::collections::HashSet::new();
    rust_parse_object(data, root_name, &mut structs, &mut visited, &indent, &capitalize);
    format!("use serde::{{Serialize, Deserialize}};\n\n{}", structs.join("\n\n"))
}

pub fn to_ts(data: &Value, root_name: &str, indent_size: usize) -> String {
    let indent = |level: usize| " ".repeat(level * indent_size);

    fn parse_type(value: &Value, level: usize, indent: &dyn Fn(usize) -> String) -> String {
        match value {
            Value::Null => "null".to_string(),
            Value::Array(arr) => {
                if arr.is_empty() { return "any[]".to_string(); }
                let types: std::collections::BTreeSet<String> =
                    arr.iter().map(|v| parse_type(v, level, indent)).collect();
                if types.len() == 1 {
                    format!("{}[]", types.iter().next().unwrap())
                } else {
                    format!("({})[]", types.iter().cloned().collect::<Vec<_>>().join(" | "))
                }
            }
            Value::Object(obj) => {
                if obj.is_empty() { return "{}".to_string(); }
                let mut lines = vec!["{".to_string()];
                for (key, val) in obj {
                    let optional = if val.is_null() { "?" } else { "" };
                    let typ = if val.is_null() {
                        "any".to_string()
                    } else {
                        parse_type(val, level + 1, indent)
                    };
                    lines.push(format!("{}{}{}: {};", indent(level + 1), key, optional, typ));
                }
                lines.push(format!("{}}}", indent(level)));
                lines.join("\n")
            }
            Value::String(_) => "string".to_string(),
            Value::Number(_) => "number".to_string(),
            Value::Bool(_) => "boolean".to_string(),
        }
    }

    format!("type {} = {};\n", root_name, parse_type(data, 0, &indent))
}

pub fn to_xml(obj: &Value, indent: bool, indent_size: usize, declaration: bool, root_name: Option<&str>) -> String {
    let space = |level: usize| -> String {
        if indent { " ".repeat(level * indent_size) } else { String::new() }
    };
    let newline = if indent { "\n" } else { "" };

    let escape_xml = |value: &str| -> String {
        value
            .replace('&', "&amp;")
            .replace('<', "&lt;")
            .replace('>', "&gt;")
            .replace('"', "&quot;")
            .replace('\'', "&apos;")
    };

    fn serialize(
        key: &str,
        value: &Value,
        level: usize,
        space: &dyn Fn(usize) -> String,
        newline: &str,
        escape_xml: &dyn Fn(&str) -> String,
    ) -> String {
        match value {
            Value::Null => String::new(),
            Value::Array(arr) => {
                arr.iter().map(|v| serialize(key, v, level, space, newline, escape_xml)).collect::<Vec<_>>().join("")
            }
            Value::String(s) => {
                format!("{}<{}>{}</{}>{}", space(level), key, escape_xml(s), key, newline)
            }
            Value::Number(n) => {
                format!("{}<{}>{}</{}>{}", space(level), key, n, key, newline)
            }
            Value::Bool(b) => {
                format!("{}<{}>{}</{}>{}", space(level), key, b, key, newline)
            }
            Value::Object(map) => {
                let mut attributes = Vec::new();
                let mut children = Vec::new();
                for (child_key, child_value) in map {
                    if child_key.starts_with('@') {
                        attributes.push(format!("{}=\"{}\"", &child_key[1..], escape_xml(&child_value.to_string())));
                    } else {
                        children.push(serialize(child_key, child_value, level + 1, space, newline, escape_xml));
                    }
                }
                let attr_str = if attributes.is_empty() {
                    String::new()
                } else {
                    format!(" {}", attributes.join(" "))
                };
                if children.is_empty() {
                    format!("{}<{}{} />{}", space(level), key, attr_str, newline)
                } else {
                    format!(
                        "{}<{}{}>{} {}{}</{}>{}",
                        space(level), key, attr_str, newline,
                        children.join(""),
                        space(level), key, newline
                    )
                }
            }
        }
    }

    let body = if let Value::Object(map) = obj {
        map.iter()
            .map(|(key, value)| serialize(key, value, 0, &space, newline, &escape_xml))
            .collect::<Vec<_>>()
            .join("")
    } else {
        String::new()
    };

    let wrapped_body = if let Some(root) = root_name {
        format!("{}<{}>{}{}{}</{}>{}", space(0), root, newline, body, space(0), root, newline)
    } else {
        body.trim().to_string()
    };

    let xml_decl = if declaration {
        format!("<?xml version=\"1.0\" encoding=\"UTF-8\"?>{}", newline)
    } else {
        String::new()
    };

    xml_decl + &wrapped_body
}

pub fn to_schema(data: &Value, root_name: &str, indent_size: usize) -> String {
    use serde_json::ser::PrettyFormatter;
    use serde_json::Serializer;

    fn build_type(value: &Value) -> Value {
        match value {
            Value::Null => json!({"type": "null"}),
            Value::Bool(_) => json!({"type": "boolean"}),
            Value::Number(n) => {
                if n.as_f64().map_or(false, |f| f.fract() == 0.0) {
                    json!({"type": "integer"})
                } else {
                    json!({"type": "number"})
                }
            }
            Value::String(_) => json!({"type": "string"}),
            Value::Array(arr) => {
                if arr.is_empty() {
                    return json!({"type": "array", "items": {}});
                }
                let item_schemas: Vec<Value> = arr.iter().map(|v| build_type(v)).collect();
                let merged = merge_schemas(&item_schemas);
                json!({"type": "array", "items": merged})
            }
            Value::Object(_) => build_object_schema(value),
        }
    }

    fn build_object_schema(value: &Value) -> Value {
        let obj = value.as_object().unwrap();
        let mut required: Vec<String> = Vec::new();
        let mut properties = Map::new();

        for (key, val) in obj {
            if !val.is_null() {
                required.push(key.clone());
            }
            properties.insert(
                key.clone(),
                if val.is_null() {
                    json!({"type": "null"})
                } else {
                    build_type(val)
                },
            );
        }

        let mut schema = Map::new();
        schema.insert("type".to_string(), Value::String("object".to_string()));
        schema.insert("properties".to_string(), Value::Object(properties));
        if !required.is_empty() {
            schema.insert(
                "required".to_string(),
                Value::Array(required.into_iter().map(Value::String).collect()),
            );
        }

        Value::Object(schema)
    }

    fn merge_schemas(schemas: &[Value]) -> Value {
        if schemas.len() == 1 {
            return schemas[0].clone();
        }

        let types: std::collections::BTreeSet<&str> =
            schemas.iter().filter_map(|s| s.get("type")?.as_str()).collect();

        if types.len() == 1 {
            let t = *types.iter().next().unwrap();
            if t == "object" {
                let all_keys: std::collections::BTreeSet<String> = schemas
                    .iter()
                    .filter_map(|s| s.get("properties"))
                    .filter_map(|p| p.as_object())
                    .flat_map(|m| m.keys().cloned())
                    .collect();

                let mut merged_properties = Map::new();
                let mut merged_required: Vec<String> = Vec::new();

                for key in &all_keys {
                    let key_schemas: Vec<Value> = schemas
                        .iter()
                        .filter_map(|s| s.get("properties")?.as_object()?.get(key).cloned())
                        .collect();

                    if key_schemas.len() == schemas.len() {
                        merged_required.push(key.clone());
                    }

                    merged_properties.insert(
                        key.clone(),
                        if key_schemas.is_empty() {
                            Value::Object(Map::new())
                        } else {
                            merge_schemas(&key_schemas)
                        },
                    );
                }

                let mut merged = Map::new();
                merged.insert("type".to_string(), Value::String("object".to_string()));
                merged.insert("properties".to_string(), Value::Object(merged_properties));
                if !merged_required.is_empty() {
                    merged.insert(
                        "required".to_string(),
                        Value::Array(merged_required.into_iter().map(Value::String).collect()),
                    );
                }

                return Value::Object(merged);
            }

            return json!({"type": t});
        }

        let one_of: Vec<Value> = types.iter().map(|t| json!({"type": t})).collect();
        json!({"oneOf": one_of})
    }

    let root = build_type(data);
    let mut root_obj = Map::new();
    root_obj.insert(
        "$schema".to_string(),
        Value::String("http://json-schema.org/draft-07/schema#".to_string()),
    );
    root_obj.insert("$id".to_string(), Value::String(root_name.to_string()));
    root_obj.insert("title".to_string(), Value::String(root_name.to_string()));

    if let Value::Object(map) = root {
        for (k, v) in map {
            root_obj.insert(k, v);
        }
    }

    let value = Value::Object(root_obj);
    let indent = " ".repeat(indent_size);
    let mut buf = Vec::new();
    let formatter = PrettyFormatter::with_indent(indent.as_bytes());
    let mut ser = Serializer::with_formatter(&mut buf, formatter);
    serde::Serialize::serialize(&value, &mut ser).ok();
    String::from_utf8(buf).unwrap_or_default()
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn test_parse_json() {
        let result: serde_json::Value = parse_json("{\"a\":1}", serde_json::Value::Null);
        assert_eq!(result["a"], 1);
    }

    #[test]
    fn test_json_to_csv() {
        #[derive(serde::Serialize)]
        struct Row { id: String, name: String }
        let data = vec![
            Row { id: "1".into(), name: "test1".into() },
            Row { id: "2".into(), name: "test2".into() },
        ];
        let csv = json_to_csv(&data);
        assert!(csv.contains("test1"));
        assert!(csv.contains("test2"));
    }

    #[test]
    fn test_to_xml() {
        let obj = json!({"root": {"item": "value"}});
        let xml = to_xml(&obj, false, 2, false, None);
        assert!(xml.contains("<item>value</item>"));
    }

    #[test]
    fn test_to_ts() {
        let obj = json!({"name": "test", "count": 42});
        let ts = to_ts(&obj, "Test", 2);
        assert!(ts.contains("name: string"));
        assert!(ts.contains("count: number"));
    }

    #[test]
    fn test_to_schema_string() {
        let s = to_schema(&json!("hello"), "Root", 2);
        assert!(s.contains("http://json-schema.org/draft-07/schema#"));
        assert!(s.contains("\"type\": \"string\""));
    }

    #[test]
    fn test_to_schema_integer() {
        let s = to_schema(&json!(42), "Root", 2);
        assert!(s.contains("\"type\": \"integer\""));
    }

    #[test]
    fn test_to_schema_number() {
        let s = to_schema(&json!(3.14), "Root", 2);
        assert!(s.contains("\"type\": \"number\""));
    }

    #[test]
    fn test_to_schema_boolean() {
        let s = to_schema(&json!(true), "Root", 2);
        assert!(s.contains("\"type\": \"boolean\""));
    }

    #[test]
    fn test_to_schema_null() {
        let s = to_schema(&json!(null), "Root", 2);
        assert!(s.contains("\"type\": \"null\""));
    }

    #[test]
    fn test_to_schema_object() {
        let obj = json!({"name": "hello", "count": 42});
        let s = to_schema(&obj, "Root", 2);
        assert!(s.contains("\"type\": \"object\""));
        assert!(s.contains("name"));
        assert!(s.contains("count"));
        assert!(s.contains("\"type\": \"string\""));
        assert!(s.contains("\"type\": \"integer\""));
        assert!(s.contains("\"required\""));
    }

    #[test]
    fn test_to_schema_object_with_null() {
        let obj = json!({"name": "hello", "optional": null});
        let s = to_schema(&obj, "Root", 2);
        assert!(s.contains("\"type\": \"object\""));
        assert!(s.contains("\"type\": \"null\""));
        assert!(s.contains("\"required\""));
        assert!(s.contains("\"name\""));
    }

    #[test]
    fn test_to_schema_array_uniform() {
        let arr = json!([{"a": 1}, {"a": 2}]);
        let s = to_schema(&arr, "Root", 2);
        assert!(s.contains("\"type\": \"array\""));
        assert!(s.contains("\"type\": \"integer\""));
    }

    #[test]
    fn test_to_schema_array_mixed_types() {
        let arr = json!([1, "two", true]);
        let s = to_schema(&arr, "Root", 2);
        assert!(s.contains("\"oneOf\""));
    }

    #[test]
    fn test_to_schema_empty_array() {
        let s = to_schema(&json!([]), "Root", 2);
        assert!(s.contains("\"type\": \"array\""));
        assert!(s.contains("\"items\": {}"));
    }

    #[test]
    fn test_to_schema_root_name() {
        let s = to_schema(&json!("hello"), "MySchema", 2);
        assert!(s.contains("\"$id\": \"MySchema\""));
        assert!(s.contains("\"title\": \"MySchema\""));
    }

    #[test]
    fn test_to_java() {
        let obj = json!({"name": "hello", "count": 42});
        let java = to_java(&obj, "Root");
        assert!(java.contains("public class Root"));
        assert!(java.contains("String name"));
        assert!(java.contains("int count"));
        assert!(java.contains("import java.util.List"));
    }

    #[test]
    fn test_to_java_with_nullable() {
        let obj = json!({"name": "hello", "optional": null});
        let java = to_java(&obj, "Root");
        assert!(java.contains("@Nullable"));
    }

    #[test]
    fn test_to_java_nested_object() {
        let obj = json!({"user": {"name": "alice", "age": 30}});
        let java = to_java(&obj, "Root");
        assert!(java.contains("public class User"));
        assert!(java.contains("Root"));
        assert!(java.contains("User user"));
    }

    #[test]
    fn test_to_java_empty_object() {
        let obj = json!({});
        let java = to_java(&obj, "Empty");
        assert!(java.contains("// empty"));
    }

    #[test]
    fn test_to_python() {
        let obj = json!({"name": "hello", "count": 42});
        let py = to_python(&obj, "Root");
        assert!(py.contains("class Root:"));
        assert!(py.contains("name: str"));
        assert!(py.contains("count: float"));
        assert!(py.contains("from dataclasses import dataclass"));
    }

    #[test]
    fn test_to_python_with_nullable() {
        let obj = json!({"name": "hello", "optional": null});
        let py = to_python(&obj, "Root");
        assert!(py.contains("optional: Any | None"));
    }

    #[test]
    fn test_to_python_nested_object() {
        let obj = json!({"user": {"name": "alice"}});
        let py = to_python(&obj, "Root");
        assert!(py.contains("class RootUser:"));
        assert!(py.contains("class Root:"));
    }

    #[test]
    fn test_to_rust() {
        let obj = json!({"name": "hello", "count": 42});
        let rs = to_rust(&obj, "Root");
        assert!(rs.contains("struct Root"));
        assert!(rs.contains("name: String"));
        assert!(rs.contains("count: i64"));
        assert!(rs.contains("use serde::{Serialize, Deserialize}"));
    }

    #[test]
    fn test_to_rust_with_nullable() {
        let obj = json!({"name": "hello", "optional": null});
        let rs = to_rust(&obj, "Root");
        assert!(rs.contains("Option<"));
    }

    #[test]
    fn test_to_rust_nested_object() {
        let obj = json!({"user": {"name": "alice"}});
        let rs = to_rust(&obj, "Root");
        assert!(rs.contains("struct User"));
        assert!(rs.contains("struct Root"));
    }

    #[test]
    fn test_to_rust_type_keyword_field() {
        let obj = json!({"type": "hello"});
        let rs = to_rust(&obj, "Root");
        assert!(rs.contains("r#type"));
    }

    #[test]
    fn test_to_java_with_array() {
        let obj = json!({"items": [1, 2, 3]});
        let java = to_java(&obj, "Root");
        assert!(java.contains("List<Integer>") || java.contains("List<int>"));
    }

    #[test]
    fn test_to_python_empty_object() {
        let obj = json!({});
        let py = to_python(&obj, "Empty");
        assert!(py.contains("pass"));
    }

    #[test]
    fn test_to_rust_empty_object() {
        let obj = json!({});
        let rs = to_rust(&obj, "Empty");
        assert!(rs.contains("// empty"));
    }

    #[test]
    fn test_parse_json_default() {
        let result: serde_json::Value = parse_json("invalid json", serde_json::Value::Null);
        assert!(result.is_null());
    }

    #[test]
    fn test_json_to_csv_empty() {
        let data: Vec<serde_json::Value> = vec![];
        let csv = json_to_csv(&data);
        assert!(csv.is_empty());
    }

    #[test]
    fn test_to_xml_with_root() {
        let obj = json!({"item": "value"});
        let xml = to_xml(&obj, false, 2, true, Some("root"));
        assert!(xml.contains("<?xml"));
        assert!(xml.contains("<root>"));
        assert!(xml.contains("</root>"));
    }

    #[test]
    fn test_to_xml_indented() {
        let obj = json!({"item": "value"});
        let xml = to_xml(&obj, true, 2, false, Some("root"));
        assert!(xml.contains("\n"));
    }

    #[test]
    fn test_to_xml_array() {
        let obj = json!({"items": ["a", "b"]});
        let xml = to_xml(&obj, false, 2, false, None);
        assert_eq!(xml.matches("<items>").count(), 2);
    }

    #[test]
    fn test_to_xml_attributes() {
        let obj = json!({"item": {"@id": 1, "name": "test"}});
        let xml = to_xml(&obj, false, 2, false, None);
        assert!(xml.contains("id=\"1\""));
    }

    #[test]
    fn test_to_xml_self_closing() {
        let obj = json!({"empty": {}});
        let xml = to_xml(&obj, false, 2, false, None);
        assert!(xml.contains("/>"));
    }

    #[test]
    fn test_to_ts_null() {
        let obj = json!(null);
        let ts = to_ts(&obj, "Test", 2);
        assert_eq!(ts, "type Test = null;\n");
    }

    #[test]
    fn test_to_ts_empty_object() {
        let obj = json!({});
        let ts = to_ts(&obj, "Test", 2);
        assert_eq!(ts, "type Test = {};\n");
    }

    #[test]
    fn test_to_ts_array() {
        let obj = json!([1, 2, 3]);
        let ts = to_ts(&obj, "Test", 2);
        assert!(ts.contains("number[]"));
    }

    #[test]
    fn test_to_ts_optional_field() {
        let obj = json!({"name": "hello", "nickname": null});
        let ts = to_ts(&obj, "Test", 2);
        assert!(ts.contains("nickname?"));
    }
}
