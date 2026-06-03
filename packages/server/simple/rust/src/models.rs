use axum::Json;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug)]
pub enum AppError {
    BadRequest(String),
    NotFound(String),
    Conflict(String),
    Unauthorized(String),
    Forbidden(String),
    Internal(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (code, msg) = match self {
            AppError::BadRequest(m) => (StatusCode::BAD_REQUEST, m),
            AppError::NotFound(m) => (StatusCode::NOT_FOUND, m),
            AppError::Conflict(m) => (StatusCode::CONFLICT, m),
            AppError::Unauthorized(m) => (StatusCode::UNAUTHORIZED, m),
            AppError::Forbidden(m) => (StatusCode::FORBIDDEN, m),
            AppError::Internal(m) => (StatusCode::INTERNAL_SERVER_ERROR, m),
        };
        (code, Json(serde_json::json!({"error": msg}))).into_response()
    }
}

pub type Result<T> = std::result::Result<T, AppError>;

#[derive(Debug, Serialize, Deserialize)]
pub struct Collection {
    pub name: String,
    pub schema: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Record {
    pub id: String,
    pub data: Value,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RecordsPage {
    pub records: Vec<Record>,
    pub total: i64,
    pub page: i64,
    pub per_page: i64,
    pub total_pages: i64,
}

#[derive(Debug, Deserialize)]
pub struct RegisterRequest {
    #[serde(default)]
    pub email: String,
    #[serde(default)]
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    #[serde(default)]
    pub email: String,
    #[serde(default)]
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct LoginResponse {
    pub user: UserResponse,
    pub token: String,
}

#[derive(Debug, Serialize)]
pub struct UserResponse {
    pub id: String,
    pub email: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateCollectionRequest {
    pub name: String,
    #[serde(default = "default_schema")]
    pub schema: String,
}

fn default_schema() -> String {
    "{}".to_string()
}

#[derive(Debug, Deserialize)]
pub struct CreateRecordRequest {
    pub id: Option<String>,
    #[serde(default = "default_data")]
    pub data: Value,
}

fn default_data() -> Value {
    serde_json::json!({})
}

#[derive(Debug, Deserialize)]
pub struct UpdateRecordRequest {
    #[serde(default)]
    pub data: Value,
}

#[derive(Debug, Deserialize)]
pub struct PaginationParams {
    pub page: Option<i64>,
    pub per_page: Option<i64>,
}

#[derive(Debug, Deserialize)]
pub struct RecordListParams {
    pub page: Option<i64>,
    pub per_page: Option<i64>,
    pub search: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateCollectionRequest {
    pub schema: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Bucket {
    pub name: String,
    pub is_public: bool,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateBucketRequest {
    pub name: String,
    #[serde(default)]
    pub is_public: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FileRecord {
    pub id: String,
    pub bucket: String,
    pub filename: String,
    pub mime_type: String,
    pub size: i64,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize)]
pub struct FilesPage {
    pub files: Vec<FileRecord>,
    pub total: i64,
    pub page: i64,
    pub per_page: i64,
    pub total_pages: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Webhook {
    pub id: String,
    pub name: String,
    pub url: String,
    pub events: Vec<String>,
    #[serde(default)]
    pub secret: String,
    pub is_active: bool,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WebhookLog {
    pub id: String,
    pub webhook_id: String,
    pub event: String,
    pub url: String,
    pub request_body: String,
    pub response_status: i64,
    pub response_body: String,
    #[serde(default)]
    pub error: String,
    pub status: String,
    pub created_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateWebhookRequest {
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub url: String,
    #[serde(default)]
    pub events: Vec<String>,
    #[serde(default)]
    pub secret: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Secret {
    pub id: String,
    pub name: String,
    #[serde(default)]
    pub value: String,
    #[serde(default)]
    pub scope: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateSecretRequest {
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub value: String,
    #[serde(default)]
    pub scope: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateSecretRequest {
    pub name: Option<String>,
    pub value: Option<String>,
    pub scope: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateWebhookRequest {
    pub name: Option<String>,
    pub url: Option<String>,
    pub events: Option<Vec<String>>,
    pub secret: Option<String>,
    pub is_active: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WSConnection {
    pub id: String,
    pub remote_addr: String,
    pub path: String,
    pub user_agent: String,
    pub connected_at: String,
    pub disconnected_at: String,
    pub is_active: bool,
    pub created_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WSMessage {
    pub id: String,
    pub connection_id: String,
    pub direction: String,
    pub content: String,
    pub created_at: String,
}

#[derive(Debug, Deserialize)]
pub struct WSSendRequest {
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CacheEntry {
    pub key: String,
    pub value: String,
    pub ttl: i64,
    pub expires_at: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Deserialize)]
pub struct SetCacheRequest {
    #[serde(default)]
    pub key: String,
    #[serde(default)]
    pub value: String,
    pub ttl: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Notification {
    pub id: String,
    pub title: String,
    #[serde(default)]
    pub body: String,
    #[serde(rename = "type")]
    pub ntype: String,
    pub is_read: bool,
    pub created_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateNotificationRequest {
    #[serde(default)]
    pub title: String,
    #[serde(default)]
    pub body: String,
    #[serde(rename = "type")]
    pub ntype: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PubSubTopic {
    pub id: String,
    pub name: String,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PubSubMessage {
    pub id: String,
    pub topic_id: String,
    pub body: String,
    pub created_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreatePubSubTopicRequest {
    #[serde(default)]
    pub name: String,
}

#[derive(Debug, Deserialize)]
pub struct CreatePubSubMessageRequest {
    #[serde(default)]
    pub body: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LogEntry {
    pub id: String,
    pub level: String,
    pub message: String,
    #[serde(default)]
    pub meta: String,
    pub created_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateLogRequest {
    #[serde(default)]
    pub level: String,
    #[serde(default)]
    pub message: String,
    #[serde(default)]
    pub meta: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CronJob {
    pub id: String,
    pub name: String,
    pub schedule: String,
    pub command: String,
    pub method: String,
    pub headers: String,
    pub body: String,
    pub is_active: bool,
    pub last_run_at: String,
    pub last_run_status: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CronJobLog {
    pub id: String,
    pub cronjob_id: String,
    pub started_at: String,
    pub finished_at: String,
    pub duration_ms: i64,
    pub status: String,
    pub output: String,
    pub error: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateCronJobRequest {
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub schedule: String,
    #[serde(default)]
    pub command: String,
    #[serde(default)]
    pub method: String,
    #[serde(default)]
    pub headers: String,
    #[serde(default)]
    pub body: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateCronJobRequest {
    pub name: Option<String>,
    pub schedule: Option<String>,
    pub command: Option<String>,
    pub method: Option<String>,
    pub headers: Option<String>,
    pub body: Option<String>,
    pub is_active: Option<bool>,
}
