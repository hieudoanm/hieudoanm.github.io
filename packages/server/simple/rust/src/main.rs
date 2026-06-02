mod auth;
mod cache;
mod db;
mod handlers;
mod log;
mod models;
mod notification;
mod secrets;
mod webhook;
mod websocket;

use std::sync::Arc;

use axum::{
    Router,
    routing::{get, post},
};
use handlers::AppState;
use std::net::UdpSocket;
use tower_http::cors::CorsLayer;
use tower_http::services::ServeDir;

fn get_local_ip() -> String {
    if let Ok(socket) = UdpSocket::bind("0.0.0.0:0") {
        if socket.connect("8.8.8.8:80").is_ok() {
            if let Ok(addr) = socket.local_addr() {
                return addr.ip().to_string();
            }
        }
    }
    "127.0.0.1".to_string()
}

fn app(state: Arc<AppState>) -> Router {
    let api = Router::new()
        .route("/api/health", get(handlers::get_health))
        .route("/api/auth/register", post(handlers::post_register))
        .route("/api/auth/login", post(handlers::post_login))
        .route(
            "/api/collections",
            get(handlers::list_collections).post(handlers::create_collection),
        )
        .route(
            "/api/collections/{name}",
            get(handlers::get_collection).delete(handlers::delete_collection),
        )
        .route(
            "/api/collections/{name}/records",
            get(handlers::list_records).post(handlers::create_record),
        )
        .route(
            "/api/collections/{name}/records/{id}",
            get(handlers::get_record)
                .patch(handlers::update_record)
                .delete(handlers::delete_record),
        )
        .route(
            "/api/buckets",
            get(handlers::list_buckets).post(handlers::create_bucket),
        )
        .route(
            "/api/buckets/{name}",
            get(handlers::get_bucket).delete(handlers::delete_bucket),
        )
        .route(
            "/api/buckets/{name}/files",
            get(handlers::list_files).post(handlers::upload_file),
        )
        .route(
            "/api/buckets/{name}/files/{id}",
            get(handlers::download_file).delete(handlers::delete_file),
        )
        .route(
            "/api/webhooks",
            get(handlers::list_webhooks).post(handlers::create_webhook),
        )
        .route(
            "/api/webhooks/{id}",
            get(handlers::get_webhook)
                .patch(handlers::update_webhook)
                .delete(handlers::delete_webhook),
        )
        .route("/api/webhooks/{id}/logs", get(handlers::list_webhook_logs))
        .route(
            "/api/secrets",
            get(handlers::list_secrets).post(handlers::create_secret),
        )
        .route(
            "/api/secrets/{id}",
            get(handlers::get_secret)
                .patch(handlers::update_secret)
                .delete(handlers::delete_secret),
        )
        .route("/api/websockets", get(handlers::list_ws_connections))
        .route(
            "/api/websockets/{id}",
            get(handlers::get_ws_connection).delete(handlers::delete_ws_connection),
        )
        .route(
            "/api/websockets/broadcast",
            post(handlers::broadcast_ws_message),
        )
        .route("/api/websockets/{id}/send", post(handlers::send_ws_message))
        .route(
            "/api/websockets/{id}/messages",
            get(handlers::list_ws_messages),
        )
        .route(
            "/api/websockets/messages",
            get(handlers::list_all_ws_messages),
        )
        .route(
            "/api/cache",
            get(handlers::list_cache)
                .post(handlers::set_cache)
                .delete(handlers::flush_cache),
        )
        .route("/api/cache/stats", get(handlers::get_cache_stats))
        .route(
            "/api/cache/{key}",
            get(handlers::get_cache).delete(handlers::delete_cache),
        )
        .route(
            "/api/notifications",
            get(handlers::handle_notifications_list)
                .post(handlers::handle_notifications_create)
                .delete(handlers::handle_notifications_clear),
        )
        .route(
            "/api/notifications/{id}",
            get(handlers::handle_notifications_get)
                .patch(handlers::handle_notifications_mark_read)
                .delete(handlers::handle_notifications_delete),
        )
        .route(
            "/api/logs",
            get(handlers::handle_logs_list)
                .post(handlers::handle_logs_create)
                .delete(handlers::handle_logs_clear),
        );

    Router::new()
        .merge(api)
        .route("/ws", get(crate::websocket::handle_ws_upgrade))
        .route(
            "/api/notifications/stream",
            get(notification::handle_notification_stream),
        )
        .route("/api/logs/stream", get(crate::log::handle_log_stream))
        .layer(CorsLayer::permissive())
        .fallback_service(ServeDir::new("public").append_index_html_on_directories(true))
        .with_state(state)
}

#[tokio::main]
async fn main() {
    let conn = db::open_db().expect("open db");
    db::migrate_db(&conn).expect("migrate db");

    let key = secrets::get_or_create_secrets_key(&db::data_dir()).expect("secrets key");
    let ws_hub = websocket::new_ws_hub();
    tokio::spawn(websocket::ws_hub_run(ws_hub.clone()));
    let cache_arc = std::sync::Arc::new(cache::CacheStore::new());
    cache_arc.load_from_db(&conn);
    cache::start_eviction_loop(cache_arc.clone());
    let sse_hub = notification::new_sse_hub();
    let log_hub = crate::log::new_log_hub();
    let state = Arc::new(AppState {
        db: std::sync::Mutex::new(conn),
        storage_dir: db::data_dir(),
        http_client: reqwest::Client::new(),
        secrets_key: key,
        ws_hub,
        cache: cache_arc,
        sse_hub,
        log_hub,
    });

    let port = std::env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let addr = format!("0.0.0.0:{port}");

    let listener = tokio::net::TcpListener::bind(&addr).await.expect("bind");

    let local_url = format!("http://localhost:{port}");
    let net_url = format!("http://{}:{port}", get_local_ip());
    let local_link = format!("\x1b]8;;{local_url}\x07{local_url}\x1b]8;;\x07");
    let net_link = format!("\x1b]8;;{net_url}\x07{net_url}\x1b]8;;\x07");
    let local_pad = " ".repeat(29 - local_url.len());
    let net_pad = " ".repeat(29 - net_url.len());
    println!();
    println!("  ┌─────────────────────────────────────────────┐");
    println!("  │  Server running at:                         │");
    println!("  │                                             │");
    println!("  │    ➜  Local:   {local_link}{local_pad}│");
    println!("  │    ➜  Network: {net_link}{net_pad}│");
    println!("  │                                             │");
    println!("  └─────────────────────────────────────────────┘");
    println!();

    axum::serve(listener, app(state))
        .await
        .expect("server error");
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::{
        body::Body,
        http::{Request, StatusCode},
    };
    use serde_json::Value;
    use tower::ServiceExt;

    fn test_app() -> Router {
        let conn = rusqlite::Connection::open_in_memory().expect("open in memory");
        db::migrate_db(&conn).expect("migrate");
        let tmp_dir =
            std::env::temp_dir().join(format!("simple-test-{}", uuid::Uuid::new_v4()));
        std::fs::create_dir_all(&tmp_dir).ok();
        let key = secrets::get_or_create_secrets_key(&tmp_dir).unwrap();
        let ws_hub = websocket::new_ws_hub();
        let cache = std::sync::Arc::new(cache::CacheStore::new());
        let sse_hub = notification::new_sse_hub();
        let log_hub = crate::log::new_log_hub();
        let state = Arc::new(AppState {
            db: std::sync::Mutex::new(conn),
            storage_dir: tmp_dir,
            http_client: reqwest::Client::new(),
            secrets_key: key,
            ws_hub,
            cache,
            sse_hub,
            log_hub,
        });
        app(state)
    }

    async fn post_json(app: &Router, path: &str, body: Value) -> (StatusCode, Value) {
        let req = Request::builder()
            .method("POST")
            .uri(path)
            .header("Content-Type", "application/json")
            .body(Body::from(serde_json::to_string(&body).unwrap()))
            .unwrap();
        let resp = app.clone().oneshot(req).await.unwrap();
        let status = resp.status();
        let body_bytes = axum::body::to_bytes(resp.into_body(), 1024 * 1024)
            .await
            .unwrap();
        let value: Value = serde_json::from_slice(&body_bytes).unwrap_or(Value::Null);
        (status, value)
    }

    async fn get_json(app: &Router, path: &str, token: Option<&str>) -> (StatusCode, Value) {
        let mut req_builder = Request::builder().method("GET").uri(path);
        if let Some(t) = token {
            req_builder = req_builder.header("Authorization", format!("Bearer {t}"));
        }
        let req = req_builder.body(Body::empty()).unwrap();
        let resp = app.clone().oneshot(req).await.unwrap();
        let status = resp.status();
        let body_bytes = axum::body::to_bytes(resp.into_body(), 1024 * 1024)
            .await
            .unwrap();
        let value: Value = serde_json::from_slice(&body_bytes).unwrap_or(Value::Null);
        (status, value)
    }

    async fn request(
        app: &Router,
        method: &str,
        path: &str,
        token: Option<&str>,
        body: Option<Value>,
    ) -> (StatusCode, Value) {
        let mut req_builder = Request::builder()
            .method(method)
            .uri(path)
            .header("Content-Type", "application/json");
        if let Some(t) = token {
            req_builder = req_builder.header("Authorization", format!("Bearer {t}"));
        }
        let b = body
            .map(|v| Body::from(serde_json::to_string(&v).unwrap()))
            .unwrap_or_else(|| Body::empty());
        let req = req_builder.body(b).unwrap();
        let resp = app.clone().oneshot(req).await.unwrap();
        let status = resp.status();
        let body_bytes = axum::body::to_bytes(resp.into_body(), 1024 * 1024)
            .await
            .unwrap();
        let value: Value = serde_json::from_slice(&body_bytes).unwrap_or(Value::Null);
        (status, value)
    }

    async fn register_token(app: &Router) -> String {
        let body = serde_json::json!({"email": "admin@test.com", "password": "admin123"});
        let (_, resp) = post_json(app, "/api/auth/register", body).await;
        let email = resp["email"].as_str().unwrap_or("");
        assert!(!email.is_empty(), "register should succeed");

        let body = serde_json::json!({"email": "admin@test.com", "password": "admin123"});
        let (_, resp) = post_json(app, "/api/auth/login", body).await;
        resp["token"].as_str().unwrap_or("").to_string()
    }

    #[tokio::test]
    async fn test_health() {
        let app = test_app();
        let (status, value) = get_json(&app, "/api/health", None).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["status"], "ok");
    }

    #[tokio::test]
    async fn test_auth_register_and_login() {
        let app = test_app();
        let body = serde_json::json!({"email": "test@example.com", "password": "password123"});
        let (status, value) = post_json(&app, "/api/auth/register", body).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["email"], "test@example.com");

        let body = serde_json::json!({"email": "test@example.com", "password": "password123"});
        let (status, value) = post_json(&app, "/api/auth/login", body).await;
        assert_eq!(status, StatusCode::OK);
        assert!(!value["token"].as_str().unwrap_or("").is_empty());
        assert_eq!(value["user"]["email"], "test@example.com");
    }

    #[tokio::test]
    async fn test_auth_requires_token() {
        let app = test_app();
        let (status, _) = get_json(&app, "/api/collections", None).await;
        assert_eq!(status, StatusCode::UNAUTHORIZED);
    }

    #[tokio::test]
    async fn test_collection_crud() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"name": "posts", "schema": "{\"title\":\"string\"}"});
        let (status, _) = request(&app, "POST", "/api/collections", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);

        let (status, value) = get_json(&app, "/api/collections", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        let cols = value.as_array().unwrap();
        assert_eq!(cols.len(), 1);

        let (status, value) =
            request(&app, "GET", "/api/collections/posts", Some(&token), None).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["name"], "posts");

        let (status, _) =
            request(&app, "DELETE", "/api/collections/posts", Some(&token), None).await;
        assert_eq!(status, StatusCode::NO_CONTENT);

        let (status, _) = request(&app, "GET", "/api/collections/posts", Some(&token), None).await;
        assert_eq!(status, StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_record_crud() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"name": "items"});
        let (status, _) = request(&app, "POST", "/api/collections", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);

        let body = serde_json::json!({"data": {"name": "item1", "value": 42}});
        let (status, value) = request(
            &app,
            "POST",
            "/api/collections/items/records",
            Some(&token),
            Some(body),
        )
        .await;
        assert_eq!(status, StatusCode::OK);
        let rec_id = value["id"].as_str().unwrap_or("").to_string();
        assert!(!rec_id.is_empty());

        let (status, value) = request(
            &app,
            "GET",
            &format!("/api/collections/items/records/{rec_id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["id"], rec_id);

        let (status, value) = get_json(
            &app,
            "/api/collections/items/records?page=1&per_page=20",
            Some(&token),
        )
        .await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["total"], 1);

        let body = serde_json::json!({"data": {"name": "item1-updated", "value": 99}});
        let (status, _) = request(
            &app,
            "PATCH",
            &format!("/api/collections/items/records/{rec_id}"),
            Some(&token),
            Some(body),
        )
        .await;
        assert_eq!(status, StatusCode::OK);

        let (status, _) = request(
            &app,
            "DELETE",
            &format!("/api/collections/items/records/{rec_id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::NO_CONTENT);

        let (status, _) = request(
            &app,
            "GET",
            &format!("/api/collections/items/records/{rec_id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_duplicate_email() {
        let app = test_app();
        let body = serde_json::json!({"email": "dup@test.com", "password": "password123"});
        let (status, _) = post_json(&app, "/api/auth/register", body.clone()).await;
        assert_eq!(status, StatusCode::OK);

        let (status, _) = post_json(&app, "/api/auth/register", body).await;
        assert_eq!(status, StatusCode::CONFLICT);
    }

    #[tokio::test]
    async fn test_missing_auth_fields() {
        let app = test_app();
        let cases = vec![
            (serde_json::json!({}), StatusCode::BAD_REQUEST),
            (
                serde_json::json!({"email": "test@test.com"}),
                StatusCode::BAD_REQUEST,
            ),
            (
                serde_json::json!({"password": "test"}),
                StatusCode::BAD_REQUEST,
            ),
            (
                serde_json::json!({"email": "test@test.com", "password": "123"}),
                StatusCode::BAD_REQUEST,
            ),
        ];
        for (body, expected) in cases {
            let (status, _) = post_json(&app, "/api/auth/register", body).await;
            assert_eq!(status, expected);
        }
    }

    #[tokio::test]
    async fn test_collection_not_found() {
        let app = test_app();
        let token = register_token(&app).await;

        let (status, _) = request(
            &app,
            "GET",
            "/api/collections/nonexistent",
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::NOT_FOUND);

        let body = serde_json::json!({"data": {}});
        let (status, _) = request(
            &app,
            "POST",
            "/api/collections/nonexistent/records",
            Some(&token),
            Some(body),
        )
        .await;
        assert_eq!(status, StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_invalid_token() {
        let app = test_app();
        let (status, _) = get_json(&app, "/api/collections", Some("invalid-token")).await;
        assert_eq!(status, StatusCode::UNAUTHORIZED);
    }

    fn multipart_body(filename: &str, content: &[u8]) -> (String, Vec<u8>) {
        let boundary = "----testboundary123";
        let mut buf = Vec::new();
        buf.extend_from_slice(b"--");
        buf.extend_from_slice(boundary.as_bytes());
        buf.extend_from_slice(b"\r\n");
        buf.extend_from_slice(
            format!("Content-Disposition: form-data; name=\"file\"; filename=\"{filename}\"\r\n")
                .as_bytes(),
        );
        buf.extend_from_slice(b"Content-Type: application/octet-stream\r\n\r\n");
        buf.extend_from_slice(content);
        buf.extend_from_slice(b"\r\n--");
        buf.extend_from_slice(boundary.as_bytes());
        buf.extend_from_slice(b"--\r\n");
        let content_type = format!("multipart/form-data; boundary={boundary}");
        (content_type, buf)
    }

    async fn upload_file(
        app: &Router,
        bucket: &str,
        filename: &str,
        content: &[u8],
        token: &str,
    ) -> (StatusCode, Value) {
        let (content_type, body) = multipart_body(filename, content);
        let req = Request::builder()
            .method("POST")
            .uri(format!("/api/buckets/{bucket}/files"))
            .header("Content-Type", &content_type)
            .header("Authorization", format!("Bearer {token}"))
            .body(Body::from(body))
            .unwrap();
        let resp = app.clone().oneshot(req).await.unwrap();
        let status = resp.status();
        let body_bytes = axum::body::to_bytes(resp.into_body(), 1024 * 1024)
            .await
            .unwrap();
        let value: Value = serde_json::from_slice(&body_bytes).unwrap_or(Value::Null);
        (status, value)
    }

    #[tokio::test]
    async fn test_bucket_crud() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"name": "avatars"});
        let (status, value) = request(&app, "POST", "/api/buckets", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["name"], "avatars");

        let (status, value) = get_json(&app, "/api/buckets", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        let buckets = value.as_array().unwrap();
        assert_eq!(buckets.len(), 1);

        let (status, value) =
            request(&app, "GET", "/api/buckets/avatars", Some(&token), None).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["name"], "avatars");

        let (status, _) = request(&app, "DELETE", "/api/buckets/avatars", Some(&token), None).await;
        assert_eq!(status, StatusCode::NO_CONTENT);

        let (status, _) = request(&app, "GET", "/api/buckets/avatars", Some(&token), None).await;
        assert_eq!(status, StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_file_upload_download_delete() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"name": "photos"});
        let (status, _) = request(&app, "POST", "/api/buckets", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);

        let content = b"Hello, World!";
        let (status, value) = upload_file(&app, "photos", "hello.txt", content, &token).await;
        assert_eq!(status, StatusCode::OK);
        let file_id = value["id"].as_str().unwrap_or("").to_string();
        assert!(!file_id.is_empty());
        assert_eq!(value["filename"], "hello.txt");
        assert_eq!(value["bucket"], "photos");

        let (status, value) = get_json(&app, "/api/buckets/photos/files", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        let files = value["files"].as_array().unwrap();
        assert_eq!(files.len(), 1);

        let req = Request::builder()
            .method("GET")
            .uri(format!("/api/buckets/photos/files/{file_id}"))
            .header("Authorization", format!("Bearer {token}"))
            .body(Body::empty())
            .unwrap();
        let resp = app.clone().oneshot(req).await.unwrap();
        assert_eq!(resp.status(), StatusCode::OK);
        let ct = resp
            .headers()
            .get(axum::http::header::CONTENT_TYPE)
            .and_then(|v| v.to_str().ok())
            .unwrap_or("")
            .to_string();
        let body_bytes = axum::body::to_bytes(resp.into_body(), 1024 * 1024)
            .await
            .unwrap();
        assert_eq!(&body_bytes[..], content);
        assert!(
            ct.starts_with("text/plain") || ct == "application/octet-stream",
            "expected text/plain or application/octet-stream, got {ct:?}"
        );

        let (status, _) = request(
            &app,
            "DELETE",
            &format!("/api/buckets/photos/files/{file_id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::NO_CONTENT);

        let (status, _) = request(
            &app,
            "GET",
            &format!("/api/buckets/photos/files/{file_id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_file_no_bucket() {
        let app = test_app();
        let token = register_token(&app).await;

        let (status, _) = upload_file(&app, "nonexistent", "f.txt", b"data", &token).await;
        assert_eq!(status, StatusCode::NOT_FOUND);

        let (status, _) = get_json(&app, "/api/buckets", None).await;
        assert_eq!(status, StatusCode::UNAUTHORIZED);
    }

    #[tokio::test]
    async fn test_bucket_duplicate() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"name": "dup"});
        let (status, _) = request(
            &app,
            "POST",
            "/api/buckets",
            Some(&token),
            Some(body.clone()),
        )
        .await;
        assert_eq!(status, StatusCode::OK);

        let (status, _) = request(&app, "POST", "/api/buckets", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::CONFLICT);
    }

    // --- Webhook Tests ---

    #[tokio::test]
    async fn test_webhook_crud() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({
            "name": "my hook",
            "url": "https://example.com/hook",
            "events": ["record.create", "record.delete"]
        });
        let (status, value) =
            request(&app, "POST", "/api/webhooks", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);
        let hook_id = value["id"].as_str().unwrap_or("").to_string();
        assert!(!hook_id.is_empty(), "expected webhook id");

        let (status, value) = get_json(&app, "/api/webhooks", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        let hooks = value.as_array().unwrap();
        assert_eq!(hooks.len(), 1);

        let (status, value) = request(
            &app,
            "GET",
            &format!("/api/webhooks/{hook_id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["name"], "my hook");

        let body = serde_json::json!({"name": "updated hook", "is_active": false});
        let (status, value) = request(
            &app,
            "PATCH",
            &format!("/api/webhooks/{hook_id}"),
            Some(&token),
            Some(body),
        )
        .await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["name"], "updated hook");
        assert!(!value["is_active"].as_bool().unwrap_or(true));

        let (status, _) = request(
            &app,
            "DELETE",
            &format!("/api/webhooks/{hook_id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::NO_CONTENT);

        let (status, _) = request(
            &app,
            "GET",
            &format!("/api/webhooks/{hook_id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_webhook_validation() {
        let app = test_app();
        let token = register_token(&app).await;

        let cases = vec![
            (
                serde_json::json!({"url": "https://example.com/h", "events": ["record.create"]}),
                "name is required",
            ),
            (
                serde_json::json!({"name": "test", "events": ["record.create"]}),
                "url is required",
            ),
            (
                serde_json::json!({"name": "test", "url": "https://example.com/h"}),
                "at least one event is required",
            ),
            (
                serde_json::json!({"name": "test", "url": "https://example.com/h", "events": ["invalid.event"]}),
                "unknown event",
            ),
        ];
        for (i, (body, expected)) in cases.iter().enumerate() {
            let (status, value) = request(
                &app,
                "POST",
                "/api/webhooks",
                Some(&token),
                Some(body.clone()),
            )
            .await;
            assert_eq!(
                status,
                StatusCode::BAD_REQUEST,
                "case {i}: expected BAD_REQUEST for '{expected}'"
            );
            let err = value["error"].as_str().unwrap_or("");
            assert!(
                err.contains(expected),
                "case {i}: expected '{expected}' in '{err}'"
            );
        }
    }

    #[tokio::test]
    async fn test_webhook_logs() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({
            "name": "log test",
            "url": "https://example.com/hook",
            "events": ["record.create"]
        });
        let (status, value) =
            request(&app, "POST", "/api/webhooks", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);
        let hook_id = value["id"].as_str().unwrap_or("").to_string();

        let (status, value) = request(
            &app,
            "GET",
            &format!("/api/webhooks/{hook_id}/logs"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::OK);
        assert!(value.as_array().unwrap().is_empty());
    }

    #[tokio::test]
    async fn test_webhook_auth_required() {
        let app = test_app();
        let (status, _) = get_json(&app, "/api/webhooks", None).await;
        assert_eq!(status, StatusCode::UNAUTHORIZED);
    }

    #[tokio::test]
    async fn test_webhook_event_validation() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({
            "name": "bad events",
            "url": "https://example.com/h",
            "events": ["record.create", "bogus"]
        });
        let (status, value) =
            request(&app, "POST", "/api/webhooks", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::BAD_REQUEST);
        assert!(
            value["error"]
                .as_str()
                .unwrap_or("")
                .contains("unknown event")
        );
    }

    #[tokio::test]
    async fn test_webhook_events_dispatch_on_record_create() {
        let app = test_app();
        let token = register_token(&app).await;

        // Use a test HTTP server to verify webhook delivery
        use std::sync::Arc as StdArc;
        use std::sync::atomic::{AtomicUsize, Ordering};

        let received = StdArc::new(AtomicUsize::new(0));
        let received_clone = StdArc::clone(&received);

        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let addr = listener.local_addr().unwrap();

        tokio::spawn(async move {
            loop {
                let (stream, _) = listener.accept().await.unwrap();
                let recv = StdArc::clone(&received_clone);
                tokio::spawn(async move {
                    use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader};
                    let (reader, mut writer) = tokio::io::split(stream);
                    let mut buf_reader = BufReader::new(reader);
                    let mut line = String::new();
                    loop {
                        line.clear();
                        match buf_reader.read_line(&mut line).await {
                            Ok(0) => break,
                            Ok(_) => {
                                if line.trim().is_empty() {
                                    break;
                                }
                            }
                            Err(_) => break,
                        }
                    }
                    let resp = "HTTP/1.1 200 OK\r\nContent-Length: 2\r\n\r\nOK";
                    let _ = writer.write_all(resp.as_bytes()).await;
                    recv.fetch_add(1, Ordering::SeqCst);
                });
            }
        });

        // Create a collection first
        let body = serde_json::json!({"name": "items"});
        let (status, _) = request(&app, "POST", "/api/collections", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);

        // Create webhook pointing at test server
        let wh_body = serde_json::json!({
            "name": "test",
            "url": format!("http://{addr}/hook"),
            "events": ["record.create"]
        });
        let (status, _) = request(&app, "POST", "/api/webhooks", Some(&token), Some(wh_body)).await;
        assert_eq!(status, StatusCode::OK);

        // Create a record (triggers webhook)
        let rec_body = serde_json::json!({"data": {"hello": "world"}});
        let (status, _) = request(
            &app,
            "POST",
            "/api/collections/items/records",
            Some(&token),
            Some(rec_body),
        )
        .await;
        assert_eq!(status, StatusCode::OK);

        // Wait for webhook delivery
        for _ in 0..10 {
            if received.load(Ordering::SeqCst) > 0 {
                break;
            }
            tokio::time::sleep(std::time::Duration::from_millis(200)).await;
        }
        assert!(
            received.load(Ordering::SeqCst) > 0,
            "webhook was not delivered"
        );
    }

    // --- Secret Tests ---

    #[tokio::test]
    async fn test_secrets_crud() {
        let app = test_app();
        let token = register_token(&app).await;

        // Create
        let body = serde_json::json!({"name": "db_pass", "value": "s3cret!", "scope": "db"});
        let (status, value) = request(&app, "POST", "/api/secrets", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::CREATED, "create secret");
        let id = value["id"].as_str().unwrap_or("").to_string();
        assert!(!id.is_empty());
        assert_eq!(value["name"], "db_pass");
        assert_eq!(value["scope"], "db");

        // List (value should not be present)
        let (status, value) = get_json(&app, "/api/secrets", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        let list = value.as_array().unwrap();
        assert_eq!(list.len(), 1);
        assert!(
            list[0].get("value").is_none(),
            "value should not be in list"
        );

        // Get (decrypted value)
        let (status, value) = request(
            &app,
            "GET",
            &format!("/api/secrets/{id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["value"], "s3cret!");

        // Update
        let body = serde_json::json!({"name": "db_pass_v2", "value": "newpass", "scope": "prod"});
        let (status, _) = request(
            &app,
            "PATCH",
            &format!("/api/secrets/{id}"),
            Some(&token),
            Some(body),
        )
        .await;
        assert_eq!(status, StatusCode::OK);

        let (status, value) = request(
            &app,
            "GET",
            &format!("/api/secrets/{id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["value"], "newpass");

        // Delete
        let (status, _) = request(
            &app,
            "DELETE",
            &format!("/api/secrets/{id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::NO_CONTENT);

        let (status, _) = request(
            &app,
            "GET",
            &format!("/api/secrets/{id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_secrets_validation() {
        let app = test_app();
        let token = register_token(&app).await;

        // Missing name
        let body = serde_json::json!({"value": "x"});
        let (status, _) = request(&app, "POST", "/api/secrets", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::BAD_REQUEST);

        // Not found
        let (status, _) =
            request(&app, "GET", "/api/secrets/nonexistent", Some(&token), None).await;
        assert_eq!(status, StatusCode::NOT_FOUND);

        // Update not found
        let body = serde_json::json!({"name": "x", "value": "y"});
        let (status, _) = request(
            &app,
            "PATCH",
            "/api/secrets/nonexistent",
            Some(&token),
            Some(body),
        )
        .await;
        assert_eq!(status, StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_secrets_auth_required() {
        let app = test_app();
        let (status, _) = get_json(&app, "/api/secrets", None).await;
        assert_eq!(status, StatusCode::UNAUTHORIZED);
    }

    // --- Cache Tests ---

    #[tokio::test]
    async fn test_cache_set_get_delete() {
        let app = test_app();
        let token = register_token(&app).await;

        let (status, val) = request(
            &app,
            "POST",
            "/api/cache",
            Some(&token),
            Some(serde_json::json!({"key": "hello", "value": "world"})),
        )
        .await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(val["key"], "hello");
        assert_eq!(val["value"], "world");

        let (status, val) = get_json(&app, "/api/cache/hello", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(val["value"], "world");

        let (status, _) = request(&app, "DELETE", "/api/cache/hello", Some(&token), None).await;
        assert_eq!(status, StatusCode::NO_CONTENT);

        let (status, _) = get_json(&app, "/api/cache/hello", Some(&token)).await;
        assert_eq!(status, StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_cache_list() {
        let app = test_app();
        let token = register_token(&app).await;

        request(
            &app,
            "POST",
            "/api/cache",
            Some(&token),
            Some(serde_json::json!({"key": "a", "value": "1"})),
        )
        .await;
        request(
            &app,
            "POST",
            "/api/cache",
            Some(&token),
            Some(serde_json::json!({"key": "b", "value": "2"})),
        )
        .await;

        let (status, val) = get_json(&app, "/api/cache", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        assert!(val.as_array().unwrap().len() >= 2);
    }

    #[tokio::test]
    async fn test_cache_overwrite() {
        let app = test_app();
        let token = register_token(&app).await;

        request(
            &app,
            "POST",
            "/api/cache",
            Some(&token),
            Some(serde_json::json!({"key": "k", "value": "v1"})),
        )
        .await;
        request(
            &app,
            "POST",
            "/api/cache",
            Some(&token),
            Some(serde_json::json!({"key": "k", "value": "v2"})),
        )
        .await;

        let (_, val) = get_json(&app, "/api/cache/k", Some(&token)).await;
        assert_eq!(val["value"], "v2");
    }

    #[tokio::test]
    async fn test_cache_flush() {
        let app = test_app();
        let token = register_token(&app).await;

        request(
            &app,
            "POST",
            "/api/cache",
            Some(&token),
            Some(serde_json::json!({"key": "x", "value": "1"})),
        )
        .await;

        let (status, _) = request(&app, "DELETE", "/api/cache", Some(&token), None).await;
        assert_eq!(status, StatusCode::OK);

        let (_, val) = get_json(&app, "/api/cache", Some(&token)).await;
        assert_eq!(val.as_array().unwrap().len(), 0);
    }

    #[tokio::test]
    async fn test_cache_validation() {
        let app = test_app();
        let token = register_token(&app).await;

        let (status, _) = request(
            &app,
            "POST",
            "/api/cache",
            Some(&token),
            Some(serde_json::json!({"key": "k"})),
        )
        .await;
        assert_eq!(status, StatusCode::BAD_REQUEST);

        let (status, _) = get_json(&app, "/api/cache/nonexistent", Some(&token)).await;
        assert_eq!(status, StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_cache_auth_required() {
        let app = test_app();
        let (status, _) = get_json(&app, "/api/cache", None).await;
        assert_eq!(status, StatusCode::UNAUTHORIZED);
    }

    #[tokio::test]
    async fn test_notification_create() {
        let app = test_app();
        let token = register_token(&app).await;

        let body =
            serde_json::json!({"title": "Test Notification", "body": "Hello", "type": "info"});
        let (status, value) =
            request(&app, "POST", "/api/notifications", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["title"], "Test Notification");
        assert!(!value["id"].as_str().unwrap_or("").is_empty());
        assert_eq!(value["type"], "info");
        assert_eq!(value["is_read"], false);
    }

    #[tokio::test]
    async fn test_notification_list() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"title": "N1", "type": "success"});
        let (status, _) =
            request(&app, "POST", "/api/notifications", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);

        let body = serde_json::json!({"title": "N2", "type": "warning"});
        let (status, _) =
            request(&app, "POST", "/api/notifications", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);

        let (status, value) = get_json(&app, "/api/notifications", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        let arr = value.as_array().unwrap();
        assert_eq!(arr.len(), 2);
    }

    #[tokio::test]
    async fn test_notification_mark_read() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"title": "Read Me", "type": "info"});
        let (status, value) =
            request(&app, "POST", "/api/notifications", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);
        let id = value["id"].as_str().unwrap().to_string();

        let (status, value) = request(
            &app,
            "PATCH",
            &format!("/api/notifications/{id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["is_read"], true);

        let (status, value) =
            get_json(&app, &format!("/api/notifications/{id}"), Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["is_read"], true);
    }

    #[tokio::test]
    async fn test_notification_delete() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"title": "To Delete", "type": "info"});
        let (status, value) =
            request(&app, "POST", "/api/notifications", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);
        let id = value["id"].as_str().unwrap().to_string();

        let (status, _) = request(
            &app,
            "DELETE",
            &format!("/api/notifications/{id}"),
            Some(&token),
            None,
        )
        .await;
        assert_eq!(status, StatusCode::NO_CONTENT);

        let (status, _) = get_json(&app, &format!("/api/notifications/{id}"), Some(&token)).await;
        assert_eq!(status, StatusCode::NOT_FOUND);
    }

    #[tokio::test]
    async fn test_notification_validation() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"title": "", "type": "info"});
        let (status, _) =
            request(&app, "POST", "/api/notifications", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::BAD_REQUEST);

        let body = serde_json::json!({"title": "Bad Type", "type": "invalid"});
        let (status, _) =
            request(&app, "POST", "/api/notifications", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::BAD_REQUEST);
    }

    #[tokio::test]
    async fn test_notification_clear() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"title": "N1", "type": "info"});
        let (status, _) =
            request(&app, "POST", "/api/notifications", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);

        let body = serde_json::json!({"title": "N2", "type": "info"});
        let (status, _) =
            request(&app, "POST", "/api/notifications", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);

        let (status, _) = request(&app, "DELETE", "/api/notifications", Some(&token), None).await;
        assert_eq!(status, StatusCode::OK);

        let (status, value) = get_json(&app, "/api/notifications", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value.as_array().unwrap().len(), 0);
    }

    #[tokio::test]
    async fn test_notification_auth_required() {
        let app = test_app();
        let (status, _) = get_json(&app, "/api/notifications", None).await;
        assert_eq!(status, StatusCode::UNAUTHORIZED);

        let (status, _) = post_json(
            &app,
            "/api/notifications",
            serde_json::json!({"title": "x", "type": "info"}),
        )
        .await;
        assert_eq!(status, StatusCode::UNAUTHORIZED);
    }

    #[tokio::test]
    async fn test_log_create() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"level": "info", "message": "test log", "meta": "{\"key\":\"val\"}"});
        let (status, value) = request(&app, "POST", "/api/logs", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["message"], "test log");
        assert_eq!(value["level"], "info");
        assert!(!value["id"].as_str().unwrap_or("").is_empty());
    }

    #[tokio::test]
    async fn test_log_list() {
        let app = test_app();
        let token = register_token(&app).await;

        for i in 0..3 {
            let body = serde_json::json!({"level": "info", "message": format!("log {i}")});
            let (status, _) = request(&app, "POST", "/api/logs", Some(&token), Some(body)).await;
            assert_eq!(status, StatusCode::OK);
        }

        let (status, value) = get_json(&app, "/api/logs", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        let arr = value.as_array().unwrap();
        assert_eq!(arr.len(), 3);
    }

    #[tokio::test]
    async fn test_log_validation() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"level": "info", "message": ""});
        let (status, _) = request(&app, "POST", "/api/logs", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::BAD_REQUEST);

        let body = serde_json::json!({"level": "invalid", "message": "test"});
        let (status, _) = request(&app, "POST", "/api/logs", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::BAD_REQUEST);
    }

    #[tokio::test]
    async fn test_log_clear() {
        let app = test_app();
        let token = register_token(&app).await;

        let body = serde_json::json!({"level": "info", "message": "test"});
        let (status, _) = request(&app, "POST", "/api/logs", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);

        let (status, _) = request(&app, "DELETE", "/api/logs", Some(&token), None).await;
        assert_eq!(status, StatusCode::OK);

        let (status, value) = get_json(&app, "/api/logs", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value.as_array().unwrap().len(), 0);
    }

    #[tokio::test]
    async fn test_log_auth_required() {
        let app = test_app();
        let (status, _) = get_json(&app, "/api/logs", None).await;
        assert_eq!(status, StatusCode::UNAUTHORIZED);

        let (status, _) = post_json(
            &app,
            "/api/logs",
            serde_json::json!({"message": "x", "level": "info"}),
        )
        .await;
        assert_eq!(status, StatusCode::UNAUTHORIZED);
    }
}
