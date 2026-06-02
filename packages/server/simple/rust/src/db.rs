use std::path::PathBuf;

use chrono::Utc;
use rusqlite::{params, Connection};
use serde_json::Value;

use crate::models::*;

pub fn data_dir() -> PathBuf {
    let dir = std::env::var("SIMPLEBASE_DATA").unwrap_or_default();
    if dir.is_empty() {
        let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
        PathBuf::from(home).join(".simplebase")
    } else {
        PathBuf::from(dir)
    }
}

pub fn open_db() -> Result<Connection> {
    let dir = data_dir();
    std::fs::create_dir_all(&dir).map_err(|e| AppError::Internal(format!("create data dir: {e}")))?;
    let path = dir.join("data.db");
    Connection::open(&path).map_err(|e| AppError::Internal(format!("open db: {e}")))
}

pub fn migrate_db(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS _collections (
            name       TEXT PRIMARY KEY,
            schema     TEXT NOT NULL DEFAULT '{}',
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS _users (
            id         TEXT PRIMARY KEY,
            email      TEXT UNIQUE NOT NULL,
            password   TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS _buckets (
            name       TEXT PRIMARY KEY,
            is_public  INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS _files (
            id         TEXT PRIMARY KEY,
            bucket     TEXT NOT NULL,
            filename   TEXT NOT NULL,
            mime_type  TEXT NOT NULL DEFAULT 'application/octet-stream',
            size       INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS _webhooks (
            id           TEXT PRIMARY KEY,
            name         TEXT NOT NULL,
            url          TEXT NOT NULL,
            events       TEXT NOT NULL DEFAULT '[]',
            secret       TEXT NOT NULL DEFAULT '',
            is_active    INTEGER NOT NULL DEFAULT 1,
            created_at   TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS _webhook_logs (
            id              TEXT PRIMARY KEY,
            webhook_id      TEXT NOT NULL,
            event           TEXT NOT NULL,
            url             TEXT NOT NULL,
            request_body    TEXT NOT NULL DEFAULT '',
            response_status INTEGER NOT NULL DEFAULT 0,
            response_body   TEXT NOT NULL DEFAULT '',
            error           TEXT NOT NULL DEFAULT '',
            status          TEXT NOT NULL DEFAULT '',
            created_at      TEXT NOT NULL DEFAULT (datetime('now'))
        );",
    )
    .map_err(|e| AppError::Internal(format!("migrate: {e}")))?;
    Ok(())
}

pub fn create_collection_table(conn: &Connection, name: &str) -> Result<()> {
    let sql = format!(
        "CREATE TABLE IF NOT EXISTS \"_data_{name}\" (
            id         TEXT PRIMARY KEY,
            data       TEXT NOT NULL DEFAULT '{{}}',
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        )"
    );
    conn.execute(&sql, [])
        .map_err(|e| AppError::Internal(format!("create table: {e}")))?;
    Ok(())
}

pub fn insert_collection(conn: &Connection, name: &str, schema: &str) -> Result<()> {
    conn.execute(
        "INSERT INTO _collections (name, schema) VALUES (?1, ?2)",
        params![name, schema],
    )
    .map_err(|e| {
        if e.to_string().contains("UNIQUE") {
            AppError::Conflict("collection already exists".into())
        } else {
            AppError::Internal(format!("insert collection: {e}"))
        }
    })?;
    Ok(())
}

pub fn get_collection(conn: &Connection, name: &str) -> Result<Option<Collection>> {
    let mut stmt = conn
        .prepare("SELECT name, schema, created_at, updated_at FROM _collections WHERE name = ?1")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![name], |row| {
            Ok(Collection {
                name: row.get(0)?,
                schema: row.get(1)?,
                created_at: row.get(2)?,
                updated_at: row.get(3)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(c)) => Ok(Some(c)),
        Some(Err(e)) => Err(AppError::Internal(e.to_string())),
        None => Ok(None),
    }
}

pub fn list_collections(conn: &Connection) -> Result<Vec<Collection>> {
    let mut stmt = conn
        .prepare("SELECT name, schema, created_at, updated_at FROM _collections ORDER BY name")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map([], |row| {
            Ok(Collection {
                name: row.get(0)?,
                schema: row.get(1)?,
                created_at: row.get(2)?,
                updated_at: row.get(3)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut cols = Vec::new();
    for row in rows {
        cols.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(cols)
}

pub fn delete_collection(conn: &Connection, name: &str) -> Result<()> {
    conn.execute("DELETE FROM _collections WHERE name = ?1", params![name])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let sql = format!("DROP TABLE IF EXISTS \"_data_{name}\"");
    conn.execute(&sql, [])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(())
}

pub fn insert_record(conn: &Connection, collection: &str, id: &str, data: &Value) -> Result<Record> {
    let now = Utc::now().to_rfc3339();
    let raw = data.to_string();
    let sql = format!(
        "INSERT INTO \"_data_{collection}\" (id, data, created_at, updated_at) VALUES (?1, ?2, ?3, ?4)"
    );
    conn.execute(&sql, params![id, raw, now, now])
        .map_err(|e| {
            if e.to_string().contains("UNIQUE") {
                AppError::Conflict("record with this id already exists".into())
            } else {
                AppError::Internal(format!("insert record: {e}"))
            }
        })?;
    Ok(Record {
        id: id.to_string(),
        data: data.clone(),
        created_at: now.clone(),
        updated_at: now,
    })
}

pub fn get_record(conn: &Connection, collection: &str, id: &str) -> Result<Option<Record>> {
    let sql = format!(
        "SELECT id, data, created_at, updated_at FROM \"_data_{collection}\" WHERE id = ?1"
    );
    let mut stmt = conn
        .prepare(&sql)
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![id], |row| {
            let id: String = row.get(0)?;
            let data_str: String = row.get(1)?;
            let created_at: String = row.get(2)?;
            let updated_at: String = row.get(3)?;
            let data: Value =
                serde_json::from_str(&data_str).unwrap_or(serde_json::json!({}));
            Ok(Record {
                id,
                data,
                created_at,
                updated_at,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(r)) => Ok(Some(r)),
        Some(Err(e)) => Err(AppError::Internal(e.to_string())),
        None => Ok(None),
    }
}

pub fn list_records(
    conn: &Connection,
    collection: &str,
    page: i64,
    per_page: i64,
) -> Result<RecordsPage> {
    let count_sql = format!("SELECT COUNT(*) FROM \"_data_{collection}\"");
    let total: i64 = conn
        .query_row(&count_sql, [], |row| row.get(0))
        .map_err(|e| AppError::Internal(e.to_string()))?;

    let total_pages = std::cmp::max(1, (total + per_page - 1) / per_page);
    let offset = (page - 1) * per_page;

    let sql = format!(
        "SELECT id, data, created_at, updated_at FROM \"_data_{collection}\" ORDER BY created_at DESC LIMIT ?1 OFFSET ?2"
    );
    let mut stmt = conn
        .prepare(&sql)
        .map_err(|e| AppError::Internal(e.to_string()))?;

    let rows = stmt
        .query_map(params![per_page, offset], |row| {
            let id: String = row.get(0)?;
            let data_str: String = row.get(1)?;
            let created_at: String = row.get(2)?;
            let updated_at: String = row.get(3)?;
            let data: Value =
                serde_json::from_str(&data_str).unwrap_or(serde_json::json!({}));
            Ok(Record {
                id,
                data,
                created_at,
                updated_at,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;

    let mut records = Vec::new();
    for row in rows {
        records.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }

    Ok(RecordsPage {
        records,
        total,
        page,
        per_page,
        total_pages,
    })
}

pub fn update_record(
    conn: &Connection,
    collection: &str,
    id: &str,
    data: &Value,
) -> Result<Record> {
    let now = Utc::now().to_rfc3339();
    let raw = data.to_string();
    let sql = format!(
        "UPDATE \"_data_{collection}\" SET data = ?1, updated_at = ?2 WHERE id = ?3"
    );
    conn.execute(&sql, params![raw, now, id])
        .map_err(|e| AppError::Internal(e.to_string()))?;

    let existing = get_record(conn, collection, id)?;
    existing.ok_or_else(|| AppError::NotFound("record not found after update".into()))
}

pub fn delete_record(conn: &Connection, collection: &str, id: &str) -> Result<()> {
    let sql = format!("DELETE FROM \"_data_{collection}\" WHERE id = ?1");
    conn.execute(&sql, params![id])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(())
}

#[allow(clippy::type_complexity)]
pub fn find_user_by_email(conn: &Connection, email: &str) -> Result<Option<(String, String, String, String, String)>> {
    let mut stmt = conn
        .prepare("SELECT id, email, created_at, updated_at, password FROM _users WHERE email = ?1")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![email], |row| {
            Ok((
                row.get::<_, String>(0)?,
                row.get::<_, String>(1)?,
                row.get::<_, String>(2)?,
                row.get::<_, String>(3)?,
                row.get::<_, String>(4)?,
            ))
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(r)) => Ok(Some(r)),
        Some(Err(e)) => Err(AppError::Internal(e.to_string())),
        None => Ok(None),
    }
}

pub fn insert_bucket(conn: &Connection, name: &str, is_public: bool) -> Result<Bucket> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO _buckets (name, is_public, created_at, updated_at) VALUES (?1, ?2, ?3, ?4)",
        params![name, is_public as i64, now, now],
    )
    .map_err(|e| {
        if e.to_string().contains("UNIQUE") {
            AppError::Conflict("bucket already exists".into())
        } else {
            AppError::Internal(format!("insert bucket: {e}"))
        }
    })?;
    Ok(Bucket {
        name: name.to_string(),
        is_public,
        created_at: now.clone(),
        updated_at: now,
    })
}

pub fn get_bucket(conn: &Connection, name: &str) -> Result<Option<Bucket>> {
    let mut stmt = conn
        .prepare("SELECT name, is_public, created_at, updated_at FROM _buckets WHERE name = ?1")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![name], |row| {
            Ok(Bucket {
                name: row.get(0)?,
                is_public: row.get::<_, i64>(1)? != 0,
                created_at: row.get(2)?,
                updated_at: row.get(3)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(b)) => Ok(Some(b)),
        Some(Err(e)) => Err(AppError::Internal(e.to_string())),
        None => Ok(None),
    }
}

pub fn list_buckets(conn: &Connection) -> Result<Vec<Bucket>> {
    let mut stmt = conn
        .prepare("SELECT name, is_public, created_at, updated_at FROM _buckets ORDER BY name")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map([], |row| {
            Ok(Bucket {
                name: row.get(0)?,
                is_public: row.get::<_, i64>(1)? != 0,
                created_at: row.get(2)?,
                updated_at: row.get(3)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut buckets = Vec::new();
    for row in rows {
        buckets.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(buckets)
}

pub fn delete_bucket(conn: &Connection, name: &str) -> Result<Vec<FileRecord>> {
    let files = list_files_all(conn, name)?;
    conn.execute("DELETE FROM _files WHERE bucket = ?1", params![name])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    conn.execute("DELETE FROM _buckets WHERE name = ?1", params![name])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(files)
}

fn list_files_all(conn: &Connection, bucket: &str) -> Result<Vec<FileRecord>> {
    let mut stmt = conn
        .prepare("SELECT id, bucket, filename, mime_type, size, created_at, updated_at FROM _files WHERE bucket = ?1")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map(params![bucket], |row| {
            Ok(FileRecord {
                id: row.get(0)?,
                bucket: row.get(1)?,
                filename: row.get(2)?,
                mime_type: row.get(3)?,
                size: row.get(4)?,
                created_at: row.get(5)?,
                updated_at: row.get(6)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut files = Vec::new();
    for row in rows {
        files.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(files)
}

pub fn insert_file(
    conn: &Connection,
    bucket: &str,
    id: &str,
    filename: &str,
    mime_type: &str,
    size: i64,
) -> Result<FileRecord> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO _files (id, bucket, filename, mime_type, size, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        params![id, bucket, filename, mime_type, size, now, now],
    )
    .map_err(|e| AppError::Internal(format!("insert file: {e}")))?;
    Ok(FileRecord {
        id: id.to_string(),
        bucket: bucket.to_string(),
        filename: filename.to_string(),
        mime_type: mime_type.to_string(),
        size,
        created_at: now.clone(),
        updated_at: now,
    })
}

pub fn get_file(conn: &Connection, id: &str) -> Result<Option<FileRecord>> {
    let mut stmt = conn
        .prepare("SELECT id, bucket, filename, mime_type, size, created_at, updated_at FROM _files WHERE id = ?1")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![id], |row| {
            Ok(FileRecord {
                id: row.get(0)?,
                bucket: row.get(1)?,
                filename: row.get(2)?,
                mime_type: row.get(3)?,
                size: row.get(4)?,
                created_at: row.get(5)?,
                updated_at: row.get(6)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(f)) => Ok(Some(f)),
        Some(Err(e)) => Err(AppError::Internal(e.to_string())),
        None => Ok(None),
    }
}

pub fn list_files(
    conn: &Connection,
    bucket: &str,
    page: i64,
    per_page: i64,
) -> Result<FilesPage> {
    let total: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM _files WHERE bucket = ?1",
            params![bucket],
            |row| row.get(0),
        )
        .map_err(|e| AppError::Internal(e.to_string()))?;

    let total_pages = std::cmp::max(1, (total + per_page - 1) / per_page);
    let offset = (page - 1) * per_page;

    let mut stmt = conn
        .prepare(
            "SELECT id, bucket, filename, mime_type, size, created_at, updated_at FROM _files WHERE bucket = ?1 ORDER BY created_at DESC LIMIT ?2 OFFSET ?3",
        )
        .map_err(|e| AppError::Internal(e.to_string()))?;

    let rows = stmt
        .query_map(params![bucket, per_page, offset], |row| {
            Ok(FileRecord {
                id: row.get(0)?,
                bucket: row.get(1)?,
                filename: row.get(2)?,
                mime_type: row.get(3)?,
                size: row.get(4)?,
                created_at: row.get(5)?,
                updated_at: row.get(6)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;

    let mut files = Vec::new();
    for row in rows {
        files.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }

    Ok(FilesPage {
        files,
        total,
        page,
        per_page,
        total_pages,
    })
}

pub fn delete_file(conn: &Connection, id: &str) -> Result<Option<FileRecord>> {
    let existing = get_file(conn, id)?;
    if existing.is_some() {
        conn.execute("DELETE FROM _files WHERE id = ?1", params![id])
            .map_err(|e| AppError::Internal(e.to_string()))?;
    }
    Ok(existing)
}

pub fn list_webhooks(conn: &Connection) -> Result<Vec<Webhook>> {
    let mut stmt = conn
        .prepare("SELECT id, name, url, events, secret, is_active, created_at, updated_at FROM _webhooks ORDER BY name")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map([], |row| {
            let events_str: String = row.get(3)?;
            let events: Vec<String> = serde_json::from_str(&events_str).unwrap_or_default();
            Ok(Webhook {
                id: row.get(0)?,
                name: row.get(1)?,
                url: row.get(2)?,
                events,
                secret: row.get(4)?,
                is_active: row.get::<_, i64>(5)? != 0,
                created_at: row.get(6)?,
                updated_at: row.get(7)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut hooks = Vec::new();
    for row in rows {
        hooks.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(hooks)
}

pub fn get_webhook(conn: &Connection, id: &str) -> Result<Option<Webhook>> {
    let mut stmt = conn
        .prepare("SELECT id, name, url, events, secret, is_active, created_at, updated_at FROM _webhooks WHERE id = ?1")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![id], |row| {
            let events_str: String = row.get(3)?;
            let events: Vec<String> = serde_json::from_str(&events_str).unwrap_or_default();
            Ok(Webhook {
                id: row.get(0)?,
                name: row.get(1)?,
                url: row.get(2)?,
                events,
                secret: row.get(4)?,
                is_active: row.get::<_, i64>(5)? != 0,
                created_at: row.get(6)?,
                updated_at: row.get(7)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(h)) => Ok(Some(h)),
        Some(Err(e)) => Err(AppError::Internal(e.to_string())),
        None => Ok(None),
    }
}

pub fn insert_webhook(conn: &Connection, id: &str, name: &str, url: &str, events: &[String], secret: &str) -> Result<Webhook> {
    let now = Utc::now().to_rfc3339();
    let events_str = serde_json::to_string(events).unwrap_or_else(|_| "[]".to_string());
    conn.execute(
        "INSERT INTO _webhooks (id, name, url, events, secret, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        params![id, name, url, events_str, secret, now, now],
    )
    .map_err(|e| AppError::Internal(format!("insert webhook: {e}")))?;
    Ok(Webhook {
        id: id.to_string(),
        name: name.to_string(),
        url: url.to_string(),
        events: events.to_vec(),
        secret: secret.to_string(),
        is_active: true,
        created_at: now.clone(),
        updated_at: now,
    })
}

pub fn update_webhook(
    conn: &Connection,
    id: &str,
    name: &str,
    url: &str,
    events: &[String],
    secret: &str,
    is_active: bool,
) -> Result<Webhook> {
    let now = Utc::now().to_rfc3339();
    let events_str = serde_json::to_string(events).unwrap_or_else(|_| "[]".to_string());
    let active = if is_active { 1 } else { 0 };
    conn.execute(
        "UPDATE _webhooks SET name = ?1, url = ?2, events = ?3, secret = ?4, is_active = ?5, updated_at = ?6 WHERE id = ?7",
        params![name, url, events_str, secret, active, now, id],
    )
    .map_err(|e| AppError::Internal(format!("update webhook: {e}")))?;
    Ok(Webhook {
        id: id.to_string(),
        name: name.to_string(),
        url: url.to_string(),
        events: events.to_vec(),
        secret: secret.to_string(),
        is_active,
        created_at: String::new(),
        updated_at: now,
    })
}

pub fn delete_webhook(conn: &Connection, id: &str) -> Result<()> {
    conn.execute("DELETE FROM _webhook_logs WHERE webhook_id = ?1", params![id])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    conn.execute("DELETE FROM _webhooks WHERE id = ?1", params![id])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(())
}

pub fn list_webhook_logs(conn: &Connection, webhook_id: &str) -> Result<Vec<WebhookLog>> {
    let mut stmt = conn
        .prepare("SELECT id, webhook_id, event, url, request_body, response_status, response_body, error, status, created_at FROM _webhook_logs WHERE webhook_id = ?1 ORDER BY created_at DESC LIMIT 50")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map(params![webhook_id], |row| {
            Ok(WebhookLog {
                id: row.get(0)?,
                webhook_id: row.get(1)?,
                event: row.get(2)?,
                url: row.get(3)?,
                request_body: row.get(4)?,
                response_status: row.get(5)?,
                response_body: row.get(6)?,
                error: row.get(7)?,
                status: row.get(8)?,
                created_at: row.get(9)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut logs = Vec::new();
    for row in rows {
        logs.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(logs)
}

pub fn insert_webhook_log(conn: &Connection, log: &WebhookLog) -> Result<()> {
    conn.execute(
        "INSERT INTO _webhook_logs (id, webhook_id, event, url, request_body, response_status, response_body, error, status, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)",
        params![log.id, log.webhook_id, log.event, log.url, log.request_body, log.response_status, log.response_body, log.error, log.status, log.created_at],
    )
    .map_err(|e| AppError::Internal(format!("insert webhook log: {e}")))?;
    Ok(())
}

pub fn insert_user(
    conn: &Connection,
    id: &str,
    email: &str,
    password: &str,
) -> Result<()> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO _users (id, email, password, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5)",
        params![id, email, password, now, now],
    )
    .map_err(|e| {
        if e.to_string().contains("UNIQUE") {
            AppError::Conflict("email already registered".into())
        } else {
            AppError::Internal(format!("insert user: {e}"))
        }
    })?;
    Ok(())
}
