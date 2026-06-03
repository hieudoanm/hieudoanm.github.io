use axum::{
    http::{HeaderMap, StatusCode},
    response::Json,
};

#[allow(dead_code)]
pub fn require_json_content_type(headers: &HeaderMap) -> Result<(), (StatusCode, Json<serde_json::Value>)> {
    if let Some(content_type) = headers.get("content-type") {
        if let Ok(val) = content_type.to_str() {
            if val.starts_with("application/json") {
                return Ok(());
            }
        }
    }
    Err((
        StatusCode::UNSUPPORTED_MEDIA_TYPE,
        Json(serde_json::json!({"error": "content-type must be application/json"})),
    ))
}
