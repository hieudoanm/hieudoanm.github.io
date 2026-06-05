use std::collections::HashMap;
use std::path::PathBuf;

use chrono::Utc;
use rusqlite::{Connection, params};
use serde_json::Value;

use crate::models::*;

pub fn data_dir() -> PathBuf {
    let dir = std::env::var("BACKBONE_DATA").unwrap_or_default();
    if dir.is_empty() {
        let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".to_string());
        PathBuf::from(home).join(".backbone")
    } else {
        PathBuf::from(dir)
    }
}

pub struct ConnectionManager {
    pub path: PathBuf,
}

impl deadpool::managed::Manager for ConnectionManager {
    type Type = rusqlite::Connection;
    type Error = rusqlite::Error;

    async fn create(&self) -> std::result::Result<Self::Type, Self::Error> {
        rusqlite::Connection::open(&self.path)
    }

    async fn recycle(
        &self,
        _: &mut Self::Type,
        _: &deadpool::managed::Metrics,
    ) -> deadpool::managed::RecycleResult<Self::Error> {
        Ok(())
    }
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
        );
        CREATE TABLE IF NOT EXISTS _secrets (
            id           TEXT PRIMARY KEY,
            name         TEXT NOT NULL,
            value        TEXT NOT NULL,
            scope        TEXT NOT NULL DEFAULT 'general',
            created_at   TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS _ws_connections (
            id              TEXT PRIMARY KEY,
            remote_addr     TEXT NOT NULL,
            path            TEXT NOT NULL DEFAULT '/',
            user_agent      TEXT NOT NULL DEFAULT '',
            connected_at    TEXT NOT NULL,
            disconnected_at TEXT NOT NULL DEFAULT '',
            is_active       INTEGER NOT NULL DEFAULT 1,
            created_at      TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS _ws_messages (
            id            TEXT PRIMARY KEY,
            connection_id TEXT,
            direction     TEXT NOT NULL,
            content       TEXT NOT NULL,
            created_at    TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS _cache (
            key        TEXT PRIMARY KEY,
            value      TEXT NOT NULL,
            ttl        INTEGER NOT NULL DEFAULT 0,
            expires_at TEXT NOT NULL DEFAULT '',
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        );",
    )
    .map_err(|e| AppError::Internal(format!("migrate: {e}")))?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS _notifications (
            id         TEXT PRIMARY KEY,
            title      TEXT NOT NULL,
            body       TEXT NOT NULL DEFAULT '',
            type       TEXT NOT NULL DEFAULT 'info',
            is_read    INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );",
        [],
    )
    .map_err(|e| AppError::Internal(format!("migrate: {e}")))?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS _logs (
            id         TEXT PRIMARY KEY,
            level      TEXT NOT NULL DEFAULT 'info',
            message    TEXT NOT NULL,
            meta       TEXT NOT NULL DEFAULT '{}',
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );",
        [],
    )
    .map_err(|e| AppError::Internal(format!("migrate: {e}")))?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS _pubsub_topics (
            id         TEXT PRIMARY KEY,
            name       TEXT UNIQUE NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );",
        [],
    )
    .map_err(|e| AppError::Internal(format!("migrate: {e}")))?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS _pubsub_messages (
            id         TEXT PRIMARY KEY,
            topic_id   TEXT NOT NULL,
            body       TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY (topic_id) REFERENCES _pubsub_topics(id) ON DELETE CASCADE
        );",
        [],
    )
    .map_err(|e| AppError::Internal(format!("migrate: {e}")))?;

    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS _permissions (
            id         TEXT PRIMARY KEY,
            user_id    TEXT NOT NULL,
            collection TEXT NOT NULL,
            role       TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now')),
            UNIQUE(user_id, collection)
        );",
    )
    .map_err(|e| AppError::Internal(format!("migrate: {e}")))?;

    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS _cronjobs (
            id              TEXT PRIMARY KEY,
            name            TEXT NOT NULL,
            schedule        TEXT NOT NULL,
            command         TEXT NOT NULL,
            method          TEXT NOT NULL DEFAULT 'GET',
            headers         TEXT NOT NULL DEFAULT '',
            body            TEXT NOT NULL DEFAULT '',
            is_active       INTEGER NOT NULL DEFAULT 1,
            last_run_at     TEXT NOT NULL DEFAULT '',
            last_run_status TEXT NOT NULL DEFAULT '',
            created_at      TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS _cronjob_logs (
            id          TEXT PRIMARY KEY,
            cronjob_id  TEXT NOT NULL,
            started_at  TEXT NOT NULL,
            finished_at TEXT NOT NULL,
            duration_ms INTEGER NOT NULL DEFAULT 0,
            status      TEXT NOT NULL DEFAULT '',
            output      TEXT NOT NULL DEFAULT '',
            error       TEXT NOT NULL DEFAULT ''
        );",
    )
    .map_err(|e| AppError::Internal(format!("migrate: {e}")))?;

    Ok(())
}

pub fn create_collection_table(conn: &Connection, name: &str, schema: &str) -> Result<()> {
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
    for (field, sql_type) in get_schema_fields(schema) {
        let alter = format!("ALTER TABLE \"_data_{name}\" ADD COLUMN \"{field}\" {sql_type}");
        conn.execute(&alter, [])
            .map_err(|e| AppError::Internal(format!("add column: {e}")))?;
    }
    Ok(())
}

pub fn get_schema_fields(schema: &str) -> Vec<(String, String)> {
    if schema.is_empty() || schema == "{}" {
        return vec![];
    }
    let map: serde_json::Map<String, Value> = serde_json::from_str(schema).unwrap_or_default();
    let mut fields = Vec::new();
    for (field, type_val) in &map {
        let type_str = type_val.as_str().unwrap_or("string");
        let sql_type = match type_str {
            "string" | "email" | "url" => "TEXT",
            "number" => "REAL",
            "integer" => "INTEGER",
            "boolean" => "INTEGER",
            "array" | "object" => "TEXT",
            _ => "TEXT",
        };
        let field_name = if field.ends_with('?') {
            field[..field.len() - 1].to_string()
        } else {
            field.clone()
        };
        fields.push((field_name, sql_type.to_string()));
    }
    fields
}

pub fn migrate_collection_schema(conn: &Connection, name: &str, old_schema: &str, new_schema: &str) -> Result<()> {
    let old_fields: HashMap<String, String> = get_schema_fields(old_schema).into_iter().collect();
    let new_fields: HashMap<String, String> = get_schema_fields(new_schema).into_iter().collect();
    for (field, sql_type) in &new_fields {
        if !old_fields.contains_key(field) {
            let alter = format!("ALTER TABLE \"_data_{name}\" ADD COLUMN \"{field}\" {sql_type}");
            conn.execute(&alter, [])
                .map_err(|e| AppError::Internal(format!("add column: {e}")))?;
        }
    }
    for (field, _) in &old_fields {
        if !new_fields.contains_key(field) {
            let alter = format!("ALTER TABLE \"_data_{name}\" DROP COLUMN \"{field}\"");
            conn.execute(&alter, [])
                .map_err(|e| AppError::Internal(format!("drop column: {e}")))?;
        }
    }
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "UPDATE _collections SET schema = ?1, updated_at = ?2 WHERE name = ?3",
        params![new_schema, now, name],
    )
    .map_err(|e| AppError::Internal(format!("update collection schema: {e}")))?;
    Ok(())
}

pub fn update_collection(conn: &Connection, name: &str, schema: Option<&str>) -> Result<Collection> {
    let existing = get_collection(conn, name)?.ok_or_else(|| AppError::NotFound("not found".into()))?;
    if let Some(new_schema) = schema {
        if !new_schema.is_empty() && new_schema != &existing.schema {
            migrate_collection_schema(conn, name, &existing.schema, new_schema)?;
        }
    }
    get_collection(conn, name)?.ok_or_else(|| AppError::Internal("collection not found after update".into()))
}

pub fn sync_schema_columns(conn: &Connection, collection: &str, id: &str, schema: &str) -> Result<()> {
    if schema.is_empty() || schema == "{}" {
        return Ok(());
    }
    let fields = get_schema_fields(schema);
    if fields.is_empty() {
        return Ok(());
    }
    let set_clause: Vec<String> = fields
        .iter()
        .map(|(field, _)| format!("\"{field}\" = json_extract(data, '$.{field}')"))
        .collect();
    let sql = format!(
        "UPDATE \"_data_{collection}\" SET {} WHERE id = ?1",
        set_clause.join(", ")
    );
    conn.execute(&sql, params![id])
        .map_err(|e| AppError::Internal(format!("sync columns: {e}")))?;
    Ok(())
}

pub fn build_search_clause(search: &str) -> Option<(String, Vec<String>)> {
    let words: Vec<String> = search
        .split_whitespace()
        .filter(|w| !w.is_empty())
        .map(|w| format!("%{}%", w))
        .collect();
    if words.is_empty() {
        return None;
    }
    let clause = words
        .iter()
        .enumerate()
        .map(|(i, _)| format!("data LIKE ?{}", i + 1))
        .collect::<Vec<_>>()
        .join(" AND ");
    Some((clause, words))
}

fn validate_field(value: &Value, type_str: &str, field_name: &str) -> Option<String> {
    match type_str {
        "string" => {
            if !value.is_string() {
                Some(format!("field '{field_name}' must be a string"))
            } else {
                None
            }
        }
        "number" => {
            if !value.is_number() {
                Some(format!("field '{field_name}' must be a number"))
            } else {
                None
            }
        }
        "integer" => match value.as_f64() {
            Some(f) if f.fract() == 0.0 => None,
            _ => Some(format!("field '{field_name}' must be an integer")),
        },
        "boolean" => {
            if !value.is_boolean() {
                Some(format!("field '{field_name}' must be a boolean"))
            } else {
                None
            }
        }
        "array" => {
            if !value.is_array() {
                Some(format!("field '{field_name}' must be an array"))
            } else {
                None
            }
        }
        "object" => {
            if !value.is_object() {
                Some(format!("field '{field_name}' must be an object"))
            } else {
                None
            }
        }
        "email" => match value.as_str() {
            Some(s) if s.contains('@') => None,
            _ => Some(format!("field '{field_name}' must be a valid email")),
        },
        "url" => match value.as_str() {
            Some(s) if s.starts_with("http://") || s.starts_with("https://") => None,
            _ => Some(format!("field '{field_name}' must be a valid URL")),
        },
        _ => None,
    }
}

pub fn validate_data(data: &Value, schema: &str) -> Result<()> {
    if schema.is_empty() || schema == "{}" {
        return Ok(());
    }
    let schema_map: serde_json::Map<String, Value> = serde_json::from_str(schema)
        .map_err(|e| AppError::Internal(format!("parse schema: {e}")))?;
    let mut errors = Vec::new();
    for (field, type_val) in &schema_map {
        let type_str = type_val.as_str().unwrap_or("string");
        let is_optional = field.ends_with('?');
        let field_name = if is_optional { &field[..field.len() - 1] } else { field.as_str() };
        if is_optional && !data.get(field_name).map_or(false, |v| !v.is_null()) {
            continue;
        }
        match data.get(field_name) {
            None => {
                if !is_optional {
                    errors.push(format!("field '{field_name}' is required"));
                }
            }
            Some(v) if v.is_null() && is_optional => {}
            Some(v) => {
                if let Some(err) = validate_field(v, type_str, field_name) {
                    errors.push(err);
                }
            }
        }
    }
    if errors.is_empty() {
        Ok(())
    } else {
        Err(AppError::BadRequest(errors.join("; ")))
    }
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

pub fn insert_record(
    conn: &Connection,
    collection: &str,
    id: &str,
    data: &Value,
) -> Result<Record> {
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
    if let Ok(Some(col)) = get_collection(conn, collection) {
        if col.schema != "{}" {
            let _ = sync_schema_columns(conn, collection, id, &col.schema);
        }
    }
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
            let data: Value = serde_json::from_str(&data_str).unwrap_or(serde_json::json!({}));
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
    search: &str,
) -> Result<RecordsPage> {
    let (where_clause, params_list) = if let Some((clause, words)) = build_search_clause(search) {
        (format!(" WHERE {clause}"), words)
    } else {
        (String::new(), Vec::new())
    };

    let count_sql = format!("SELECT COUNT(*) FROM \"_data_{collection}\"{where_clause}");
    let total: i64 = if params_list.is_empty() {
        conn.query_row(&count_sql, [], |row| row.get(0))
            .map_err(|e| AppError::Internal(e.to_string()))?
    } else {
        let param_refs: Vec<&dyn rusqlite::types::ToSql> =
            params_list.iter().map(|s| s as &dyn rusqlite::types::ToSql).collect();
        conn.query_row(&count_sql, param_refs.as_slice(), |row| row.get(0))
            .map_err(|e| AppError::Internal(e.to_string()))?
    };

    let total_pages = std::cmp::max(1, (total + per_page - 1) / per_page);
    let offset = (page - 1) * per_page;

    let sql = format!(
        "SELECT id, data, created_at, updated_at FROM \"_data_{collection}\"{where_clause} ORDER BY created_at DESC LIMIT ?{limit_idx} OFFSET ?{offset_idx}",
        limit_idx = params_list.len() + 1,
        offset_idx = params_list.len() + 2,
    );
    let mut stmt = conn
        .prepare(&sql)
        .map_err(|e| AppError::Internal(e.to_string()))?;

    let mut all_params: Vec<Box<dyn rusqlite::types::ToSql>> = Vec::new();
    for w in &params_list {
        all_params.push(Box::new(w.clone()));
    }
    all_params.push(Box::new(per_page));
    all_params.push(Box::new(offset));
    let param_refs: Vec<&dyn rusqlite::types::ToSql> =
        all_params.iter().map(|p| p.as_ref()).collect();

    let rows = stmt
        .query_map(param_refs.as_slice(), |row| {
            let id: String = row.get(0)?;
            let data_str: String = row.get(1)?;
            let created_at: String = row.get(2)?;
            let updated_at: String = row.get(3)?;
            let data: Value = serde_json::from_str(&data_str).unwrap_or(serde_json::json!({}));
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
    let sql = format!("UPDATE \"_data_{collection}\" SET data = ?1, updated_at = ?2 WHERE id = ?3");
    conn.execute(&sql, params![raw, now, id])
        .map_err(|e| AppError::Internal(e.to_string()))?;

    if let Ok(Some(col)) = get_collection(conn, collection) {
        if col.schema != "{}" {
            let _ = sync_schema_columns(conn, collection, id, &col.schema);
        }
    }
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
pub fn find_user_by_email(
    conn: &Connection,
    email: &str,
) -> Result<Option<(String, String, String, String, String)>> {
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

pub fn list_files(conn: &Connection, bucket: &str, page: i64, per_page: i64) -> Result<FilesPage> {
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

pub fn insert_webhook(
    conn: &Connection,
    id: &str,
    name: &str,
    url: &str,
    events: &[String],
    secret: &str,
) -> Result<Webhook> {
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
    conn.execute(
        "DELETE FROM _webhook_logs WHERE webhook_id = ?1",
        params![id],
    )
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

// --- Secrets ---

pub fn list_secrets(conn: &Connection) -> Result<Vec<Secret>> {
    let mut stmt = conn
        .prepare(
            "SELECT id, name, value, scope, created_at, updated_at FROM _secrets ORDER BY name",
        )
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map(params![], |row| {
            Ok(Secret {
                id: row.get(0)?,
                name: row.get(1)?,
                value: row.get(2)?,
                scope: row.get(3)?,
                created_at: row.get(4)?,
                updated_at: row.get(5)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut secrets = Vec::new();
    for row in rows {
        secrets.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(secrets)
}

pub fn get_secret(conn: &Connection, id: &str) -> Result<Option<Secret>> {
    let mut stmt = conn
        .prepare(
            "SELECT id, name, value, scope, created_at, updated_at FROM _secrets WHERE id = ?1",
        )
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![id], |row| {
            Ok(Secret {
                id: row.get(0)?,
                name: row.get(1)?,
                value: row.get(2)?,
                scope: row.get(3)?,
                created_at: row.get(4)?,
                updated_at: row.get(5)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(s)) => Ok(Some(s)),
        _ => Ok(None),
    }
}

pub fn insert_secret(
    conn: &Connection,
    id: &str,
    name: &str,
    value: &str,
    scope: &str,
) -> Result<Secret> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO _secrets (id, name, value, scope, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        params![id, name, value, scope, now, now],
    )
    .map_err(|e| AppError::Internal(format!("insert secret: {e}")))?;
    Ok(Secret {
        id: id.to_string(),
        name: name.to_string(),
        value: value.to_string(),
        scope: scope.to_string(),
        created_at: now.clone(),
        updated_at: now,
    })
}

pub fn update_secret(
    conn: &Connection,
    id: &str,
    name: &str,
    value: &str,
    scope: &str,
) -> Result<Secret> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "UPDATE _secrets SET name = ?1, value = ?2, scope = ?3, updated_at = ?4 WHERE id = ?5",
        params![name, value, scope, now, id],
    )
    .map_err(|e| AppError::Internal(format!("update secret: {e}")))?;
    Ok(Secret {
        id: id.to_string(),
        name: name.to_string(),
        value: value.to_string(),
        scope: scope.to_string(),
        created_at: String::new(),
        updated_at: now,
    })
}

pub fn delete_secret(conn: &Connection, id: &str) -> Result<()> {
    conn.execute("DELETE FROM _secrets WHERE id = ?1", params![id])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(())
}

pub fn insert_user(conn: &Connection, id: &str, email: &str, password: &str) -> Result<()> {
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

// --- WebSocket ---

pub fn insert_ws_connection(
    conn: &Connection,
    id: &str,
    remote_addr: &str,
    path: &str,
    user_agent: &str,
) -> Result<()> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO _ws_connections (id, remote_addr, path, user_agent, connected_at) VALUES (?1, ?2, ?3, ?4, ?5)",
        params![id, remote_addr, path, user_agent, now],
    )
    .map_err(|e| AppError::Internal(format!("insert ws connection: {e}")))?;
    Ok(())
}

pub fn update_ws_disconnect(conn: &Connection, id: &str) -> Result<()> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "UPDATE _ws_connections SET disconnected_at = ?1, is_active = 0 WHERE id = ?2",
        params![now, id],
    )
    .map_err(|e| AppError::Internal(format!("update ws disconnect: {e}")))?;
    Ok(())
}

pub fn list_ws_connections(conn: &Connection) -> Result<Vec<WSConnection>> {
    let mut stmt = conn
        .prepare("SELECT id, remote_addr, path, user_agent, connected_at, disconnected_at, is_active, created_at FROM _ws_connections ORDER BY connected_at DESC")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map([], |row| {
            Ok(WSConnection {
                id: row.get(0)?,
                remote_addr: row.get(1)?,
                path: row.get(2)?,
                user_agent: row.get(3)?,
                connected_at: row.get(4)?,
                disconnected_at: row.get(5)?,
                is_active: row.get::<_, i64>(6)? != 0,
                created_at: row.get(7)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut connections = Vec::new();
    for row in rows {
        connections.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(connections)
}

pub fn get_ws_connection(conn: &Connection, id: &str) -> Result<Option<WSConnection>> {
    let mut stmt = conn
        .prepare("SELECT id, remote_addr, path, user_agent, connected_at, disconnected_at, is_active, created_at FROM _ws_connections WHERE id = ?1")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![id], |row| {
            Ok(WSConnection {
                id: row.get(0)?,
                remote_addr: row.get(1)?,
                path: row.get(2)?,
                user_agent: row.get(3)?,
                connected_at: row.get(4)?,
                disconnected_at: row.get(5)?,
                is_active: row.get::<_, i64>(6)? != 0,
                created_at: row.get(7)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(c)) => Ok(Some(c)),
        Some(Err(e)) => Err(AppError::Internal(e.to_string())),
        None => Ok(None),
    }
}

pub fn delete_ws_connection(conn: &Connection, id: &str) -> Result<()> {
    conn.execute(
        "DELETE FROM _ws_messages WHERE connection_id = ?1",
        params![id],
    )
    .map_err(|e| AppError::Internal(e.to_string()))?;
    conn.execute("DELETE FROM _ws_connections WHERE id = ?1", params![id])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(())
}

pub fn insert_ws_message(
    conn: &Connection,
    connection_id: &str,
    direction: &str,
    content: &str,
) -> Result<()> {
    let id = uuid::Uuid::new_v4().to_string().replace('-', "");
    conn.execute(
        "INSERT INTO _ws_messages (id, connection_id, direction, content) VALUES (?1, ?2, ?3, ?4)",
        params![id, connection_id, direction, content],
    )
    .map_err(|e| AppError::Internal(format!("insert ws message: {e}")))?;
    Ok(())
}

pub fn list_ws_messages(conn: &Connection, connection_id: &str) -> Result<Vec<WSMessage>> {
    let mut stmt = conn
        .prepare("SELECT id, connection_id, direction, content, created_at FROM _ws_messages WHERE connection_id = ?1 ORDER BY created_at DESC")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map(params![connection_id], |row| {
            Ok(WSMessage {
                id: row.get(0)?,
                connection_id: row.get(1)?,
                direction: row.get(2)?,
                content: row.get(3)?,
                created_at: row.get(4)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut messages = Vec::new();
    for row in rows {
        messages.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(messages)
}

pub fn list_all_ws_messages(conn: &Connection) -> Result<Vec<WSMessage>> {
    let mut stmt = conn
        .prepare("SELECT id, connection_id, direction, content, created_at FROM _ws_messages ORDER BY created_at DESC")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map([], |row| {
            Ok(WSMessage {
                id: row.get(0)?,
                connection_id: row.get(1)?,
                direction: row.get(2)?,
                content: row.get(3)?,
                created_at: row.get(4)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut messages = Vec::new();
    for row in rows {
        messages.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(messages)
}

// --- Cache ---

pub fn set_cache_entry(conn: &Connection, key: &str, value: &str, ttl: i64) -> Result<CacheEntry> {
    let now = chrono::Utc::now().to_rfc3339();
    let expires_at = if ttl > 0 {
        (chrono::Utc::now() + chrono::Duration::seconds(ttl)).to_rfc3339()
    } else {
        String::new()
    };
    conn.execute(
        "INSERT INTO _cache (key, value, ttl, expires_at, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, ttl = excluded.ttl, expires_at = excluded.expires_at, updated_at = excluded.updated_at",
        params![key, value, ttl, expires_at, now, now],
    )
    .map_err(|e| AppError::Internal(format!("set cache: {e}")))?;
    Ok(CacheEntry {
        key: key.to_string(),
        value: value.to_string(),
        ttl,
        expires_at,
        created_at: now.clone(),
        updated_at: now,
    })
}

pub fn get_cache_entry(conn: &Connection, key: &str) -> Result<Option<CacheEntry>> {
    let mut stmt = conn
        .prepare(
            "SELECT key, value, ttl, expires_at, created_at, updated_at FROM _cache WHERE key = ?1",
        )
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![key], |row| {
            Ok(CacheEntry {
                key: row.get(0)?,
                value: row.get(1)?,
                ttl: row.get(2)?,
                expires_at: row.get(3)?,
                created_at: row.get(4)?,
                updated_at: row.get(5)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(entry)) => {
            if entry.ttl > 0 && !entry.expires_at.is_empty() {
                if let Ok(expires) = chrono::DateTime::parse_from_rfc3339(&entry.expires_at) {
                    if chrono::Utc::now() > expires {
                        conn.execute("DELETE FROM _cache WHERE key = ?1", params![key])
                            .map_err(|e| AppError::Internal(e.to_string()))?;
                        return Ok(None);
                    }
                }
            }
            Ok(Some(entry))
        }
        Some(Err(e)) => Err(AppError::Internal(e.to_string())),
        None => Ok(None),
    }
}

pub fn delete_cache_entry(conn: &Connection, key: &str) -> Result<bool> {
    let n = conn
        .execute("DELETE FROM _cache WHERE key = ?1", params![key])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(n > 0)
}

pub fn list_cache_entries(conn: &Connection) -> Result<Vec<CacheEntry>> {
    let now = chrono::Utc::now().to_rfc3339();
    let mut stmt = conn
        .prepare("SELECT key, value, ttl, expires_at, created_at, updated_at FROM _cache WHERE ttl = 0 OR expires_at > ?1 ORDER BY updated_at DESC")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map(params![now], |row| {
            Ok(CacheEntry {
                key: row.get(0)?,
                value: row.get(1)?,
                ttl: row.get(2)?,
                expires_at: row.get(3)?,
                created_at: row.get(4)?,
                updated_at: row.get(5)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut entries = Vec::new();
    for row in rows {
        entries.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(entries)
}

pub fn flush_cache(conn: &Connection) -> Result<()> {
    conn.execute("DELETE FROM _cache", [])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(())
}

pub fn insert_notification(
    conn: &Connection,
    id: &str,
    title: &str,
    body: &str,
    ntype: &str,
) -> Result<Notification> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO _notifications (id, title, body, type, created_at) VALUES (?1, ?2, ?3, ?4, ?5)",
        params![id, title, body, ntype, now],
    )
    .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(Notification {
        id: id.to_string(),
        title: title.to_string(),
        body: body.to_string(),
        ntype: ntype.to_string(),
        is_read: false,
        created_at: now,
    })
}

pub fn list_notifications(conn: &Connection) -> Result<Vec<Notification>> {
    let mut stmt = conn
        .prepare("SELECT id, title, body, type, is_read, created_at FROM _notifications ORDER BY created_at DESC")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map([], |row| {
            let is_read_int: i64 = row.get(4)?;
            Ok(Notification {
                id: row.get(0)?,
                title: row.get(1)?,
                body: row.get(2)?,
                ntype: row.get(3)?,
                is_read: is_read_int != 0,
                created_at: row.get(5)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut notifications = Vec::new();
    for row in rows {
        notifications.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(notifications)
}

pub fn get_notification(conn: &Connection, id: &str) -> Result<Option<Notification>> {
    let mut stmt = conn
        .prepare(
            "SELECT id, title, body, type, is_read, created_at FROM _notifications WHERE id = ?1",
        )
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![id], |row| {
            let is_read_int: i64 = row.get(4)?;
            Ok(Notification {
                id: row.get(0)?,
                title: row.get(1)?,
                body: row.get(2)?,
                ntype: row.get(3)?,
                is_read: is_read_int != 0,
                created_at: row.get(5)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(notification)) => Ok(Some(notification)),
        Some(Err(e)) => Err(AppError::Internal(e.to_string())),
        None => Ok(None),
    }
}

pub fn update_notification_read(conn: &Connection, id: &str) -> Result<Notification> {
    conn.execute(
        "UPDATE _notifications SET is_read = 1 WHERE id = ?1",
        params![id],
    )
    .map_err(|e| AppError::Internal(e.to_string()))?;
    get_notification(conn, id)?.ok_or_else(|| AppError::NotFound("not found".into()))
}

pub fn delete_notification(conn: &Connection, id: &str) -> Result<bool> {
    let affected = conn
        .execute("DELETE FROM _notifications WHERE id = ?1", params![id])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(affected > 0)
}

pub fn clear_notifications(conn: &Connection) -> Result<()> {
    conn.execute("DELETE FROM _notifications", [])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(())
}

pub fn insert_log(
    conn: &Connection,
    id: &str,
    level: &str,
    message: &str,
    meta: &str,
) -> Result<LogEntry> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO _logs (id, level, message, meta, created_at) VALUES (?1, ?2, ?3, ?4, ?5)",
        params![id, level, message, meta, now],
    )
    .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(LogEntry {
        id: id.to_string(),
        level: level.to_string(),
        message: message.to_string(),
        meta: meta.to_string(),
        created_at: now,
    })
}

pub fn list_logs(conn: &Connection) -> Result<Vec<LogEntry>> {
    let mut stmt = conn
        .prepare("SELECT id, level, message, meta, created_at FROM _logs ORDER BY created_at DESC")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map([], |row| {
            Ok(LogEntry {
                id: row.get(0)?,
                level: row.get(1)?,
                message: row.get(2)?,
                meta: row.get(3)?,
                created_at: row.get(4)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut logs = Vec::new();
    for row in rows {
        logs.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(logs)
}

pub fn clear_logs(conn: &Connection) -> Result<()> {
    conn.execute("DELETE FROM _logs", [])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(())
}

// PubSub DB functions

pub fn insert_pubsub_topic(conn: &Connection, id: &str, name: &str) -> Result<PubSubTopic> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO _pubsub_topics (id, name, created_at) VALUES (?1, ?2, ?3)",
        params![id, name, now],
    )
    .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(PubSubTopic {
        id: id.to_string(),
        name: name.to_string(),
        created_at: now,
    })
}

pub fn list_pubsub_topics(conn: &Connection) -> Result<Vec<PubSubTopic>> {
    let mut stmt = conn
        .prepare("SELECT id, name, created_at FROM _pubsub_topics ORDER BY created_at DESC")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map([], |row| {
            Ok(PubSubTopic {
                id: row.get(0)?,
                name: row.get(1)?,
                created_at: row.get(2)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut topics = Vec::new();
    for row in rows {
        topics.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(topics)
}

pub fn get_pubsub_topic_by_name(conn: &Connection, name: &str) -> Result<Option<PubSubTopic>> {
    let mut stmt = conn
        .prepare("SELECT id, name, created_at FROM _pubsub_topics WHERE name = ?1")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![name], |row| {
            Ok(PubSubTopic {
                id: row.get(0)?,
                name: row.get(1)?,
                created_at: row.get(2)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(t)) => Ok(Some(t)),
        _ => Ok(None),
    }
}

pub fn delete_pubsub_topic(conn: &Connection, name: &str) -> Result<()> {
    conn.execute(
        "DELETE FROM _pubsub_messages WHERE topic_id = (SELECT id FROM _pubsub_topics WHERE name = ?1)",
        params![name],
    )
    .map_err(|e| AppError::Internal(e.to_string()))?;
    conn.execute("DELETE FROM _pubsub_topics WHERE name = ?1", params![name])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(())
}

pub fn insert_pubsub_message(
    conn: &Connection,
    id: &str,
    topic_id: &str,
    body: &str,
) -> Result<PubSubMessage> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO _pubsub_messages (id, topic_id, body, created_at) VALUES (?1, ?2, ?3, ?4)",
        params![id, topic_id, body, now],
    )
    .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(PubSubMessage {
        id: id.to_string(),
        topic_id: topic_id.to_string(),
        body: body.to_string(),
        created_at: now,
    })
}

pub fn list_pubsub_messages(conn: &Connection, topic_id: &str) -> Result<Vec<PubSubMessage>> {
    let mut stmt = conn
        .prepare(
            "SELECT id, topic_id, body, created_at FROM _pubsub_messages WHERE topic_id = ?1 ORDER BY created_at DESC",
        )
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map(params![topic_id], |row| {
            Ok(PubSubMessage {
                id: row.get(0)?,
                topic_id: row.get(1)?,
                body: row.get(2)?,
                created_at: row.get(3)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut msgs = Vec::new();
    for row in rows {
        msgs.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(msgs)
}

// --- Cron Jobs ---

pub fn list_cron_jobs(conn: &Connection) -> Result<Vec<CronJob>> {
    let mut stmt = conn
        .prepare("SELECT id, name, schedule, command, method, headers, body, is_active, last_run_at, last_run_status, created_at, updated_at FROM _cronjobs ORDER BY name")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map([], |row| {
            Ok(CronJob {
                id: row.get(0)?,
                name: row.get(1)?,
                schedule: row.get(2)?,
                command: row.get(3)?,
                method: row.get(4)?,
                headers: row.get(5)?,
                body: row.get(6)?,
                is_active: row.get::<_, i64>(7)? != 0,
                last_run_at: row.get(8)?,
                last_run_status: row.get(9)?,
                created_at: row.get(10)?,
                updated_at: row.get(11)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut jobs = Vec::new();
    for row in rows {
        jobs.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(jobs)
}

pub fn get_cron_job(conn: &Connection, id: &str) -> Result<Option<CronJob>> {
    let mut stmt = conn
        .prepare("SELECT id, name, schedule, command, method, headers, body, is_active, last_run_at, last_run_status, created_at, updated_at FROM _cronjobs WHERE id = ?1")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut rows = stmt
        .query_map(params![id], |row| {
            Ok(CronJob {
                id: row.get(0)?,
                name: row.get(1)?,
                schedule: row.get(2)?,
                command: row.get(3)?,
                method: row.get(4)?,
                headers: row.get(5)?,
                body: row.get(6)?,
                is_active: row.get::<_, i64>(7)? != 0,
                last_run_at: row.get(8)?,
                last_run_status: row.get(9)?,
                created_at: row.get(10)?,
                updated_at: row.get(11)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    match rows.next() {
        Some(Ok(j)) => Ok(Some(j)),
        Some(Err(e)) => Err(AppError::Internal(e.to_string())),
        None => Ok(None),
    }
}

pub fn insert_cron_job(
    conn: &Connection,
    id: &str,
    name: &str,
    schedule: &str,
    command: &str,
    method: &str,
    headers: &str,
    body: &str,
) -> Result<CronJob> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO _cronjobs (id, name, schedule, command, method, headers, body, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
        params![id, name, schedule, command, method, headers, body, now, now],
    )
    .map_err(|e| AppError::Internal(format!("insert cron job: {e}")))?;
    Ok(CronJob {
        id: id.to_string(),
        name: name.to_string(),
        schedule: schedule.to_string(),
        command: command.to_string(),
        method: method.to_string(),
        headers: headers.to_string(),
        body: body.to_string(),
        is_active: true,
        last_run_at: String::new(),
        last_run_status: String::new(),
        created_at: now.clone(),
        updated_at: now,
    })
}

pub fn update_cron_job(
    conn: &Connection,
    id: &str,
    name: &str,
    schedule: &str,
    command: &str,
    method: &str,
    headers: &str,
    body: &str,
    is_active: bool,
) -> Result<CronJob> {
    let now = Utc::now().to_rfc3339();
    let active = if is_active { 1 } else { 0 };
    conn.execute(
        "UPDATE _cronjobs SET name = ?1, schedule = ?2, command = ?3, method = ?4, headers = ?5, body = ?6, is_active = ?7, updated_at = ?8 WHERE id = ?9",
        params![name, schedule, command, method, headers, body, active, now, id],
    )
    .map_err(|e| AppError::Internal(format!("update cron job: {e}")))?;
    get_cron_job(conn, id)?.ok_or_else(|| AppError::Internal("cron job not found after update".into()))
}

pub fn delete_cron_job(conn: &Connection, id: &str) -> Result<()> {
    conn.execute("DELETE FROM _cronjob_logs WHERE cronjob_id = ?1", params![id])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    conn.execute("DELETE FROM _cronjobs WHERE id = ?1", params![id])
        .map_err(|e| AppError::Internal(e.to_string()))?;
    Ok(())
}

pub fn update_cron_job_last_run(conn: &Connection, id: &str, last_run_at: &str, status: &str) -> Result<()> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "UPDATE _cronjobs SET last_run_at = ?1, last_run_status = ?2, updated_at = ?3 WHERE id = ?4",
        params![last_run_at, status, now, id],
    )
    .map_err(|e| AppError::Internal(format!("update cron job last run: {e}")))?;
    Ok(())
}

pub fn list_cron_job_logs(conn: &Connection, cronjob_id: &str) -> Result<Vec<CronJobLog>> {
    let mut stmt = conn
        .prepare("SELECT id, cronjob_id, started_at, finished_at, duration_ms, status, output, error FROM _cronjob_logs WHERE cronjob_id = ?1 ORDER BY started_at DESC LIMIT 50")
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let rows = stmt
        .query_map(params![cronjob_id], |row| {
            Ok(CronJobLog {
                id: row.get(0)?,
                cronjob_id: row.get(1)?,
                started_at: row.get(2)?,
                finished_at: row.get(3)?,
                duration_ms: row.get(4)?,
                status: row.get(5)?,
                output: row.get(6)?,
                error: row.get(7)?,
            })
        })
        .map_err(|e| AppError::Internal(e.to_string()))?;
    let mut logs = Vec::new();
    for row in rows {
        logs.push(row.map_err(|e| AppError::Internal(e.to_string()))?);
    }
    Ok(logs)
}

pub fn insert_cron_job_log(conn: &Connection, log: &CronJobLog) -> Result<()> {
    conn.execute(
        "INSERT INTO _cronjob_logs (id, cronjob_id, started_at, finished_at, duration_ms, status, output, error) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
        params![log.id, log.cronjob_id, log.started_at, log.finished_at, log.duration_ms, log.status, log.output, log.error],
    )
    .map_err(|e| AppError::Internal(format!("insert cron job log: {e}")))?;
    Ok(())
}
