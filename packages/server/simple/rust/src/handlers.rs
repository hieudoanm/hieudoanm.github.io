use std::path::PathBuf;
use std::sync::Mutex;

use axum::{
    body::Body,
    extract::{Path, Query, State},
    http::{HeaderMap, StatusCode},
    Json,
};
use rusqlite::Connection;

use crate::auth;
use crate::db;
use crate::models::*;
use crate::webhook;

pub struct AppState {
    pub db: Mutex<Connection>,
    pub storage_dir: PathBuf,
    pub http_client: reqwest::Client,
}

fn extract_token(headers: &HeaderMap) -> std::result::Result<String, AppError> {
    let auth = headers
        .get("Authorization")
        .ok_or_else(|| AppError::Unauthorized("authorization header required".into()))?
        .to_str()
        .map_err(|_| AppError::Unauthorized("invalid authorization header".into()))?;
    let token = auth
        .strip_prefix("Bearer ")
        .ok_or_else(|| AppError::Unauthorized("bearer token required".into()))?;
    Ok(token.to_string())
}

pub async fn get_health() -> Json<serde_json::Value> {
    Json(serde_json::json!({"status": "ok"}))
}

pub async fn post_register(
    State(state): State<std::sync::Arc<AppState>>,
    Json(req): Json<RegisterRequest>,
) -> std::result::Result<Json<UserResponse>, AppError> {
    if req.email.is_empty() || req.password.is_empty() {
        return Err(AppError::BadRequest("email and password are required".into()));
    }
    let user = auth::register_user(&state.db, &req.email, &req.password)?;
    Ok(Json(user))
}

pub async fn post_login(
    State(state): State<std::sync::Arc<AppState>>,
    Json(req): Json<LoginRequest>,
) -> std::result::Result<Json<LoginResponse>, AppError> {
    if req.email.is_empty() || req.password.is_empty() {
        return Err(AppError::BadRequest("email and password are required".into()));
    }
    let resp = auth::login_user(&state.db, &req.email, &req.password)?;
    Ok(Json(resp))
}

pub async fn list_collections(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
) -> std::result::Result<Json<Vec<Collection>>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let cols = db::list_collections(&conn)?;
    Ok(Json(cols))
}

pub async fn create_collection(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Json(req): Json<CreateCollectionRequest>,
) -> std::result::Result<Json<Collection>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    if req.name.is_empty() {
        return Err(AppError::BadRequest("name is required".into()));
    }
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    db::insert_collection(&conn, &req.name, &req.schema)?;
    db::create_collection_table(&conn, &req.name)?;
    let c = db::get_collection(&conn, &req.name)?
        .ok_or_else(|| AppError::Internal("collection not found after create".into()))?;
    webhook::dispatch_event(&state, webhook::EVENT_COLLECTION_CREATE, webhook::webhook_collection_data(&c));
    Ok(Json(c))
}

pub async fn get_collection(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(name): Path<String>,
) -> std::result::Result<Json<Collection>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let c = db::get_collection(&conn, &name)?
        .ok_or_else(|| AppError::NotFound("not found".into()))?;
    Ok(Json(c))
}

pub async fn delete_collection(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(name): Path<String>,
) -> std::result::Result<StatusCode, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let existing = db::get_collection(&conn, &name)?;
    if existing.is_none() {
        return Err(AppError::NotFound("not found".into()));
    }
    let c = existing.unwrap();
    webhook::dispatch_event(&state, webhook::EVENT_COLLECTION_DELETE, webhook::webhook_collection_data(&c));
    db::delete_collection(&conn, &name)?;
    Ok(StatusCode::NO_CONTENT)
}

pub async fn create_record(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(name): Path<String>,
    Json(req): Json<CreateRecordRequest>,
) -> std::result::Result<Json<Record>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let existing = db::get_collection(&conn, &name)?;
    if existing.is_none() {
        return Err(AppError::NotFound("collection not found".into()));
    }
    let id = req.id.unwrap_or_else(|| uuid::Uuid::new_v4().to_string().replace('-', ""));
    let rec = db::insert_record(&conn, &name, &id, &req.data)?;
    webhook::dispatch_event(&state, webhook::EVENT_RECORD_CREATE, webhook::webhook_record_data(&name, &rec));
    Ok(Json(rec))
}

pub async fn list_records(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(name): Path<String>,
    Query(params): Query<PaginationParams>,
) -> std::result::Result<Json<RecordsPage>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let existing = db::get_collection(&conn, &name)?;
    if existing.is_none() {
        return Err(AppError::NotFound("collection not found".into()));
    }
    let page = params.page.unwrap_or(1).max(1);
    let per_page = params.per_page.unwrap_or(20).clamp(1, 100);
    let records = db::list_records(&conn, &name, page, per_page)?;
    Ok(Json(records))
}

pub async fn get_record(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path((name, id)): Path<(String, String)>,
) -> std::result::Result<Json<Record>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let rec = db::get_record(&conn, &name, &id)?
        .ok_or_else(|| AppError::NotFound("not found".into()))?;
    Ok(Json(rec))
}

pub async fn update_record(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path((name, id)): Path<(String, String)>,
    Json(req): Json<UpdateRecordRequest>,
) -> std::result::Result<Json<Record>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let existing = db::get_collection(&conn, &name)?;
    if existing.is_none() {
        return Err(AppError::NotFound("collection not found".into()));
    }
    let rec = db::update_record(&conn, &name, &id, &req.data)?;
    webhook::dispatch_event(&state, webhook::EVENT_RECORD_UPDATE, webhook::webhook_record_data(&name, &rec));
    Ok(Json(rec))
}

pub async fn delete_record(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path((name, id)): Path<(String, String)>,
) -> std::result::Result<StatusCode, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let existing = db::get_record(&conn, &name, &id)?;
    if existing.is_none() {
        return Err(AppError::NotFound("not found".into()));
    }
    let rec = existing.unwrap();
    webhook::dispatch_event(&state, webhook::EVENT_RECORD_DELETE, webhook::webhook_record_data(&name, &rec));
    db::delete_record(&conn, &name, &id)?;
    Ok(StatusCode::NO_CONTENT)
}

pub async fn list_buckets(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
) -> std::result::Result<Json<Vec<Bucket>>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let buckets = db::list_buckets(&conn)?;
    Ok(Json(buckets))
}

pub async fn create_bucket(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Json(req): Json<CreateBucketRequest>,
) -> std::result::Result<Json<Bucket>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    if req.name.is_empty() {
        return Err(AppError::BadRequest("name is required".into()));
    }
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let bucket = db::insert_bucket(&conn, &req.name, req.is_public)?;
    let dir = state.storage_dir.join("storage").join(&req.name);
    std::fs::create_dir_all(&dir)
        .map_err(|e| AppError::Internal(format!("create storage dir: {e}")))?;
    webhook::dispatch_event(&state, webhook::EVENT_BUCKET_CREATE, webhook::webhook_bucket_data(&bucket));
    Ok(Json(bucket))
}

pub async fn get_bucket(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(name): Path<String>,
) -> std::result::Result<Json<Bucket>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let bucket = db::get_bucket(&conn, &name)?
        .ok_or_else(|| AppError::NotFound("not found".into()))?;
    Ok(Json(bucket))
}

pub async fn delete_bucket(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(name): Path<String>,
) -> std::result::Result<StatusCode, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let existing = db::get_bucket(&conn, &name)?;
    if existing.is_none() {
        return Err(AppError::NotFound("not found".into()));
    }
    let b = existing.unwrap();
    webhook::dispatch_event(&state, webhook::EVENT_BUCKET_DELETE, webhook::webhook_bucket_data(&b));
    let files = db::delete_bucket(&conn, &name)?;
    let dir = state.storage_dir.join("storage").join(&name);
    for f in &files {
        let _ = std::fs::remove_file(state.storage_dir.join("storage").join(&name).join(&f.id));
    }
    let _ = std::fs::remove_dir_all(&dir);
    Ok(StatusCode::NO_CONTENT)
}

pub async fn upload_file(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(bucket): Path<String>,
    req: axum::extract::Request,
) -> std::result::Result<Json<FileRecord>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;

    let content_type = headers
        .get(axum::http::header::CONTENT_TYPE)
        .ok_or_else(|| AppError::BadRequest("content-type header required".into()))?
        .to_str()
        .map_err(|_| AppError::BadRequest("invalid content-type".into()))?
        .to_string();

    let boundary = multer::parse_boundary(&content_type)
        .map_err(|_| AppError::BadRequest("could not parse multipart boundary".into()))?;

    {
        let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
        let existing = db::get_bucket(&conn, &bucket)?;
        if existing.is_none() {
            return Err(AppError::NotFound("bucket not found".into()));
        }
    }

    let stream = http_body_util::BodyDataStream::new(req.into_body());
    let mut multipart = multer::Multipart::new(stream, boundary);

    let field = multipart
        .next_field()
        .await
        .map_err(|e| AppError::BadRequest(format!("multipart error: {e}")))?
        .ok_or_else(|| AppError::BadRequest("no file field in multipart".into()))?;

    let file_name = field.file_name().unwrap_or("file").to_string();
    let mut mime_type = field
        .content_type()
        .map(|m| m.to_string())
        .unwrap_or_else(|| "application/octet-stream".to_string());

    let data = field
        .bytes()
        .await
        .map_err(|e| AppError::BadRequest(format!("read file error: {e}")))?;

    if data.is_empty() {
        return Err(AppError::BadRequest("file is empty".into()));
    }

    if mime_type == "application/octet-stream" && let Some(t) = infer::get(&data) {
        mime_type = t.mime_type().to_string();
    }

    let id = uuid::Uuid::new_v4().to_string().replace('-', "");
    let file_dir = state.storage_dir.join("storage").join(&bucket);
    std::fs::create_dir_all(&file_dir)
        .map_err(|e| AppError::Internal(format!("create storage dir: {e}")))?;
    let file_path = file_dir.join(&id);
    tokio::fs::write(&file_path, &data)
        .await
        .map_err(|e| AppError::Internal(format!("write file: {e}")))?;

    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let record =
        db::insert_file(&conn, &bucket, &id, &file_name, &mime_type, data.len() as i64)?;
    Ok(Json(record))
}

pub async fn list_files(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(bucket): Path<String>,
    Query(params): Query<PaginationParams>,
) -> std::result::Result<Json<FilesPage>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let existing = db::get_bucket(&conn, &bucket)?;
    if existing.is_none() {
        return Err(AppError::NotFound("bucket not found".into()));
    }
    let page = params.page.unwrap_or(1).max(1);
    let per_page = params.per_page.unwrap_or(20).clamp(1, 100);
    let files = db::list_files(&conn, &bucket, page, per_page)?;
    Ok(Json(files))
}

pub async fn download_file(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path((bucket, file_id)): Path<(String, String)>,
) -> std::result::Result<axum::response::Response<Body>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;

    let f = {
        let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
        let f = db::get_file(&conn, &file_id)?
            .ok_or_else(|| AppError::NotFound("not found".into()))?;
        if f.bucket != bucket {
            return Err(AppError::NotFound("not found".into()));
        }
        f
    };

    let file_path = state.storage_dir.join("storage").join(&bucket).join(&file_id);
    let data = tokio::fs::read(&file_path)
        .await
        .map_err(|_| AppError::NotFound("file not found on disk".into()))?;

    let response = axum::response::Response::builder()
        .header(axum::http::header::CONTENT_TYPE, &f.mime_type)
        .header(
            axum::http::header::CONTENT_DISPOSITION,
            format!("attachment; filename=\"{}\"", f.filename),
        )
        .header(axum::http::header::CONTENT_LENGTH, f.size.to_string())
        .body(Body::from(data))
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(response)
}

pub async fn delete_file(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path((bucket, file_id)): Path<(String, String)>,
) -> std::result::Result<StatusCode, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let f = db::get_file(&conn, &file_id)?;
    match f {
        Some(ref f) if f.bucket == bucket => {}
        _ => return Err(AppError::NotFound("not found".into())),
    }
    let deleted = db::delete_file(&conn, &file_id)?;
    if deleted.is_some() {
        let file_path = state.storage_dir.join("storage").join(&bucket).join(&file_id);
        let _ = std::fs::remove_file(&file_path);
    }
    Ok(StatusCode::NO_CONTENT)
}

pub async fn list_webhooks(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
) -> std::result::Result<Json<Vec<Webhook>>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let hooks = db::list_webhooks(&conn)?;
    Ok(Json(hooks))
}

pub async fn create_webhook(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Json(req): Json<CreateWebhookRequest>,
) -> std::result::Result<Json<Webhook>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    if req.name.is_empty() {
        return Err(AppError::BadRequest("name is required".into()));
    }
    if req.url.is_empty() {
        return Err(AppError::BadRequest("url is required".into()));
    }
    if req.events.is_empty() {
        return Err(AppError::BadRequest("at least one event is required".into()));
    }
    if let Err(e) = webhook::validate_events(&req.events) {
        return Err(AppError::BadRequest(e));
    }
    let id = uuid::Uuid::new_v4().to_string().replace('-', "");
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let h = db::insert_webhook(&conn, &id, &req.name, &req.url, &req.events, &req.secret)?;
    Ok(Json(h))
}

pub async fn get_webhook(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(id): Path<String>,
) -> std::result::Result<Json<Webhook>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let h = db::get_webhook(&conn, &id)?
        .ok_or_else(|| AppError::NotFound("not found".into()))?;
    Ok(Json(h))
}

pub async fn update_webhook(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(id): Path<String>,
    Json(req): Json<UpdateWebhookRequest>,
) -> std::result::Result<Json<Webhook>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let existing = db::get_webhook(&conn, &id)?
        .ok_or_else(|| AppError::NotFound("not found".into()))?;

    let name = req.name.unwrap_or(existing.name);
    let url = req.url.unwrap_or(existing.url);
    let events = req.events.unwrap_or(existing.events);
    let secret = req.secret.unwrap_or(existing.secret);
    let is_active = req.is_active.unwrap_or(existing.is_active);

    if let Err(e) = webhook::validate_events(&events) {
        return Err(AppError::BadRequest(e));
    }

    let h = db::update_webhook(&conn, &id, &name, &url, &events, &secret, is_active)?;
    Ok(Json(h))
}

pub async fn delete_webhook(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(id): Path<String>,
) -> std::result::Result<StatusCode, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let existing = db::get_webhook(&conn, &id)?;
    if existing.is_none() {
        return Err(AppError::NotFound("not found".into()));
    }
    db::delete_webhook(&conn, &id)?;
    Ok(StatusCode::NO_CONTENT)
}

pub async fn list_webhook_logs(
    headers: HeaderMap,
    State(state): State<std::sync::Arc<AppState>>,
    Path(id): Path<String>,
) -> std::result::Result<Json<Vec<WebhookLog>>, AppError> {
    let _token = extract_token(&headers)?;
    auth::validate_token(&_token)?;
    let conn = state.db.lock().map_err(|e| AppError::Internal(e.to_string()))?;
    let existing = db::get_webhook(&conn, &id)?;
    if existing.is_none() {
        return Err(AppError::NotFound("not found".into()));
    }
    let logs = db::list_webhook_logs(&conn, &id)?;
    Ok(Json(logs))
}
