use anyhow::Context;

#[allow(clippy::upper_case_acronyms)]
pub type JSON = serde_json::Value;

/// Try to parse as JSON first, fall back to YAML.
pub fn parse_openapi(data: &[u8]) -> anyhow::Result<JSON> {
    let s = String::from_utf8_lossy(data);
    if let Ok(v) = serde_json::from_str::<JSON>(&s) {
        return Ok(v);
    }
    let v: JSON =
        serde_yaml::from_str(&s).context("failed to parse OpenAPI spec (tried JSON and YAML)")?;
    Ok(v)
}

pub fn get_map(v: &JSON) -> Option<&serde_json::Map<String, JSON>> {
    v.as_object()
}

pub fn get_slice(v: &JSON) -> Option<&Vec<JSON>> {
    v.as_array()
}

pub fn get_string(v: &JSON) -> Option<&str> {
    v.as_str()
}

/// Generate an example value from a schema object.
pub fn schema_to_example(schema: &JSON) -> JSON {
    let obj = match get_map(schema) {
        Some(m) => m,
        None => return JSON::Null,
    };

    if let Some(ex) = obj.get("example") {
        return ex.clone();
    }
    if let Some(def) = obj.get("default") {
        return def.clone();
    }

    match obj.get("type").and_then(|t| t.as_str()) {
        Some("string") => {
            if let Some(enum_vals) = obj.get("enum").and_then(|e| e.as_array()) {
                if let Some(first) = enum_vals.first() {
                    return first.clone();
                }
            }
            JSON::String("string".to_string())
        }
        Some("integer") | Some("number") => JSON::Number(serde_json::Number::from(0)),
        Some("boolean") => JSON::Bool(true),
        Some("array") => {
            if let Some(items) = obj.get("items") {
                JSON::Array(vec![schema_to_example(items)])
            } else {
                JSON::Array(vec![])
            }
        }
        Some("object") => {
            let mut map = serde_json::Map::new();
            if let Some(props) = obj.get("properties").and_then(|p| p.as_object()) {
                for (k, v) in props {
                    map.insert(k.clone(), schema_to_example(v));
                }
            }
            JSON::Object(map)
        }
        _ => JSON::Null,
    }
}

/// Convert a parsed OpenAPI spec into a Postman collection JSON structure.
pub fn convert_to_postman(spec: &JSON) -> anyhow::Result<JSON> {
    let mut info = serde_json::json!({
        "name": "Imported Collection",
        "_postman_id": "auto-generated",
        "description": "",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    });

    if let Some(info_obj) = spec.get("info").and_then(|i| i.as_object()) {
        if let Some(title) = info_obj.get("title").and_then(|t| t.as_str()) {
            if !title.is_empty() {
                info["name"] = JSON::String(title.to_string());
            }
        }
        if let Some(desc) = info_obj.get("description").and_then(|d| d.as_str()) {
            if !desc.is_empty() {
                info["description"] = JSON::String(desc.to_string());
            }
        }
    }

    let base_url = spec
        .get("servers")
        .and_then(|s| s.as_array())
        .and_then(|arr| arr.first())
        .and_then(|s| s.as_object())
        .and_then(|s| s.get("url"))
        .and_then(|u| u.as_str())
        .unwrap_or("")
        .to_string();

    let paths = spec
        .get("paths")
        .and_then(|p| p.as_object())
        .ok_or_else(|| anyhow::anyhow!("invalid paths (check YAML structure)"))?;

    let mut tag_map: std::collections::BTreeMap<String, Vec<JSON>> =
        std::collections::BTreeMap::new();

    for (path, methods_raw) in paths {
        let methods = match methods_raw.as_object() {
            Some(m) => m,
            None => continue,
        };

        for (method, op_raw) in methods {
            let op = match op_raw.as_object() {
                Some(o) => o,
                None => continue,
            };

            let tag = op
                .get("tags")
                .and_then(|t| t.as_array())
                .and_then(|arr| arr.first())
                .and_then(|t| t.as_str())
                .unwrap_or("default")
                .to_string();

            let name = if let Some(s) = op.get("summary").and_then(|s| s.as_str()) {
                s.to_string()
            } else {
                format!("{} {path}", method.to_uppercase())
            };

            let mut query = Vec::new();
            let mut path_vars = Vec::new();
            let mut headers = Vec::new();

            if let Some(params) = op.get("parameters").and_then(|p| p.as_array()) {
                for p_raw in params {
                    let p = match p_raw.as_object() {
                        Some(o) => o,
                        None => continue,
                    };

                    let param_name = p.get("name").and_then(|n| n.as_str()).unwrap_or("");
                    let param_in = p.get("in").and_then(|i| i.as_str()).unwrap_or("");
                    let param_desc = p.get("description").and_then(|d| d.as_str()).unwrap_or("");

                    let mut param = serde_json::json!({
                        "key": param_name,
                        "value": "",
                        "description": param_desc,
                    });

                    if let Some(ex) = p.get("example") {
                        param["value"] = JSON::String(format!("{ex}"));
                    }

                    match param_in {
                        "query" => query.push(param),
                        "path" => path_vars.push(param),
                        "header" => headers.push(param),
                        _ => {}
                    }
                }
            }

            let mut body = JSON::Null;
            if let Some(request_body) = op.get("requestBody").and_then(|rb| rb.as_object()) {
                if let Some(content) = request_body.get("content").and_then(|c| c.as_object()) {
                    if let Some(json_content) = content
                        .get("application/json")
                        .and_then(|mt| mt.as_object())
                    {
                        let mut ex = json_content.get("example").cloned();

                        if ex.as_ref().map_or(true, |v| v.is_null()) {
                            if let Some(examples) =
                                json_content.get("examples").and_then(|e| e.as_object())
                            {
                                for (_k, v) in examples {
                                    if let Some(val) = v.get("value") {
                                        ex = Some(val.clone());
                                        break;
                                    }
                                }
                            }
                        }

                        if ex.as_ref().map_or(true, |v| v.is_null()) {
                            ex = json_content.get("schema").map(schema_to_example);
                        }

                        let raw = if ex.as_ref().map_or(true, |v| v.is_null()) {
                            "{}".to_string()
                        } else {
                            serde_json::to_string_pretty(&ex).unwrap_or_else(|_| "{}".to_string())
                        };

                        body = serde_json::json!({
                            "mode": "raw",
                            "raw": raw,
                            "options": {
                                "raw": { "language": "json" }
                            }
                        });

                        headers.push(serde_json::json!({
                            "key": "Content-Type",
                            "value": "application/json"
                        }));
                    }
                }
            }

            let raw_url = format!("{base_url}{path}");
            let path_clean = path.trim_start_matches('/');
            let path_parts: Vec<JSON> = if path_clean.is_empty() {
                Vec::new()
            } else {
                path_clean
                    .split('/')
                    .map(|s| JSON::String(s.to_string()))
                    .collect()
            };

            let mut req = serde_json::json!({
                "method": method.to_uppercase(),
                "header": headers,
                "url": {
                    "raw": raw_url,
                    "path": path_parts,
                    "query": query,
                    "variable": path_vars,
                },
                "description": op.get("description").and_then(|d| d.as_str()).unwrap_or(""),
            });

            if !body.is_null() {
                req["body"] = body;
            }

            let item = serde_json::json!({
                "name": name,
                "request": req,
                "response": [],
            });

            tag_map.entry(tag).or_default().push(item);
        }
    }

    let folders: Vec<JSON> = tag_map
        .into_iter()
        .map(|(tag, items)| {
            serde_json::json!({
                "name": tag,
                "item": items,
            })
        })
        .collect();

    Ok(serde_json::json!({
        "info": info,
        "item": folders,
        "variable": [
            {
                "key": "baseUrl",
                "value": base_url,
                "type": "string",
            }
        ],
    }))
}
