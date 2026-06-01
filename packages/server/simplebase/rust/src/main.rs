mod auth;
mod db;
mod handlers;
mod models;

use std::sync::Arc;

use axum::{
    routing::{get, post},
    Router,
};
use handlers::AppState;
use tower_http::cors::CorsLayer;
use tower_http::services::ServeDir;

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
        .layer(CorsLayer::permissive())
        .with_state(state);

    Router::new()
        .merge(api)
        .fallback_service(
            ServeDir::new("public").append_index_html_on_directories(true),
        )
}

#[tokio::main]
async fn main() {
    let conn = db::open_db().expect("open db");
    db::migrate_db(&conn).expect("migrate db");

    let state = Arc::new(AppState {
        db: std::sync::Mutex::new(conn),
        storage_dir: db::data_dir(),
    });

    let addr = std::env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let addr = format!("0.0.0.0:{addr}");

    let listener = tokio::net::TcpListener::bind(&addr).await.expect("bind");
    eprintln!("SimpleBase listening on {addr}");

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
        let tmp_dir = std::env::temp_dir().join(format!("simplebase-test-{}", uuid::Uuid::new_v4()));
        std::fs::create_dir_all(&tmp_dir).ok();
        let state = Arc::new(AppState {
            db: std::sync::Mutex::new(conn),
            storage_dir: tmp_dir,
        });
        app(state)
    }

    async fn post_json(
        app: &Router,
        path: &str,
        body: Value,
    ) -> (StatusCode, Value) {
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
        let b = body.map(|v| Body::from(serde_json::to_string(&v).unwrap()))
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

        let (status, value) = request(&app, "GET", "/api/collections/posts", Some(&token), None).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["name"], "posts");

        let (status, _) = request(&app, "DELETE", "/api/collections/posts", Some(&token), None).await;
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
        let (status, value) =
            request(&app, "POST", "/api/collections/items/records", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::OK);
        let rec_id = value["id"].as_str().unwrap_or("").to_string();
        assert!(!rec_id.is_empty());

        let (status, value) =
            request(&app, "GET", &format!("/api/collections/items/records/{rec_id}"), Some(&token), None).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["id"], rec_id);

        let (status, value) =
            get_json(&app, "/api/collections/items/records?page=1&per_page=20", Some(&token)).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(value["total"], 1);

        let body = serde_json::json!({"data": {"name": "item1-updated", "value": 99}});
        let (status, _) = request(
            &app,
            "PATCH",
            &format!("/api/collections/items/records/{rec_id}"),
            Some(&token),
            Some(body),
        ).await;
        assert_eq!(status, StatusCode::OK);

        let (status, _) = request(
            &app,
            "DELETE",
            &format!("/api/collections/items/records/{rec_id}"),
            Some(&token),
            None,
        ).await;
        assert_eq!(status, StatusCode::NO_CONTENT);

        let (status, _) = request(
            &app,
            "GET",
            &format!("/api/collections/items/records/{rec_id}"),
            Some(&token),
            None,
        ).await;
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
            (serde_json::json!({"email": "test@test.com"}), StatusCode::BAD_REQUEST),
            (serde_json::json!({"password": "test"}), StatusCode::BAD_REQUEST),
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

        let (status, _) = request(&app, "GET", "/api/collections/nonexistent", Some(&token), None).await;
        assert_eq!(status, StatusCode::NOT_FOUND);

        let body = serde_json::json!({"data": {}});
        let (status, _) = request(
            &app,
            "POST",
            "/api/collections/nonexistent/records",
            Some(&token),
            Some(body),
        ).await;
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
            format!("Content-Disposition: form-data; name=\"file\"; filename=\"{filename}\"\r\n").as_bytes(),
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

        let (status, _) =
            request(&app, "DELETE", "/api/buckets/avatars", Some(&token), None).await;
        assert_eq!(status, StatusCode::NO_CONTENT);

        let (status, _) =
            request(&app, "GET", "/api/buckets/avatars", Some(&token), None).await;
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

        let (status, value) =
            get_json(&app, "/api/buckets/photos/files", Some(&token)).await;
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
            ct.starts_with("text/plain")
                || ct == "application/octet-stream",
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
        let (status, _) = request(&app, "POST", "/api/buckets", Some(&token), Some(body.clone())).await;
        assert_eq!(status, StatusCode::OK);

        let (status, _) = request(&app, "POST", "/api/buckets", Some(&token), Some(body)).await;
        assert_eq!(status, StatusCode::CONFLICT);
    }
}
