use chrono::{DateTime, Utc};
use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::Manager;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ClipboardEntry {
    pub id: i64,
    pub content: String,
    pub content_type: String,
    pub pinned: bool,
    pub created_at: String,
    pub copied_count: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ClipboardStats {
    pub total_entries: i64,
    pub pinned_entries: i64,
    pub text_entries: i64,
    pub image_entries: i64,
}

struct DbConn(Mutex<Connection>);

fn get_db_path() -> PathBuf {
    let data_dir = dirs::data_local_dir().unwrap_or_else(|| PathBuf::from("."));
    let app_dir = data_dir.join("io.github.hieudoanm.clipper");
    fs::create_dir_all(&app_dir).ok();
    app_dir.join("clipper.db")
}

fn init_db(conn: &Connection) {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS clipboard (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            content_type TEXT NOT NULL DEFAULT 'text',
            pinned INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL,
            copied_count INTEGER NOT NULL DEFAULT 1
        );
        CREATE INDEX IF NOT EXISTS idx_clipboard_created ON clipboard(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_clipboard_pinned ON clipboard(pinned) WHERE pinned = 1;",
    )
    .expect("failed to initialize database");
}

#[tauri::command]
fn get_history(db: tauri::State<DbConn>, limit: Option<i64>, offset: Option<i64>) -> Vec<ClipboardEntry> {
    let conn = db.0.lock().unwrap();
    let limit = limit.unwrap_or(100);
    let offset = offset.unwrap_or(0);

    let mut stmt = conn
        .prepare(
            "SELECT id, content, content_type, pinned, created_at, copied_count
             FROM clipboard
             ORDER BY pinned DESC, created_at DESC
             LIMIT ?1 OFFSET ?2",
        )
        .unwrap();

    let entries = stmt
        .query_map(params![limit, offset], |row| {
            Ok(ClipboardEntry {
                id: row.get(0)?,
                content: row.get(1)?,
                content_type: row.get(2)?,
                pinned: row.get::<_, i32>(3)? == 1,
                created_at: row.get(4)?,
                copied_count: row.get(5)?,
            })
        })
        .unwrap()
        .filter_map(|r| r.ok())
        .collect();

    entries
}

#[tauri::command]
fn search_history(db: tauri::State<DbConn>, query: String) -> Vec<ClipboardEntry> {
    let conn = db.0.lock().unwrap();
    let mut stmt = conn
        .prepare(
            "SELECT id, content, content_type, pinned, created_at, copied_count
             FROM clipboard
             WHERE content LIKE ?1
             ORDER BY pinned DESC, created_at DESC
             LIMIT 100",
        )
        .unwrap();

    let pattern = format!("%{}%", query);
    let entries = stmt
        .query_map(params![pattern], |row| {
            Ok(ClipboardEntry {
                id: row.get(0)?,
                content: row.get(1)?,
                content_type: row.get(2)?,
                pinned: row.get::<_, i32>(3)? == 1,
                created_at: row.get(4)?,
                copied_count: row.get(5)?,
            })
        })
        .unwrap()
        .filter_map(|r| r.ok())
        .collect();

    entries
}

#[tauri::command]
fn add_entry(db: tauri::State<DbConn>, content: String, content_type: Option<String>) -> ClipboardEntry {
    let conn = db.0.lock().unwrap();
    let ct = content_type.unwrap_or_else(|| "text".to_string());
    let now = Utc::now().to_rfc3339();

    conn.execute(
        "INSERT INTO clipboard (content, content_type, created_at) VALUES (?1, ?2, ?3)",
        params![content, ct, now],
    )
    .expect("failed to insert entry");

    let id = conn.last_insert_rowid();

    ClipboardEntry {
        id,
        content,
        content_type: ct,
        pinned: false,
        created_at: now,
        copied_count: 1,
    }
}

#[tauri::command]
fn delete_entry(db: tauri::State<DbConn>, id: i64) -> bool {
    let conn = db.0.lock().unwrap();
    let affected = conn
        .execute("DELETE FROM clipboard WHERE id = ?1", params![id])
        .unwrap();
    affected > 0
}

#[tauri::command]
fn clear_history(db: tauri::State<DbConn>) -> bool {
    let conn = db.0.lock().unwrap();
    conn.execute("DELETE FROM clipboard WHERE pinned = 0", [])
        .unwrap();
    true
}

#[tauri::command]
fn toggle_pin(db: tauri::State<DbConn>, id: i64) -> Option<ClipboardEntry> {
    let conn = db.0.lock().unwrap();

    conn.execute(
        "UPDATE clipboard SET pinned = CASE WHEN pinned = 1 THEN 0 ELSE 1 END WHERE id = ?1",
        params![id],
    )
    .unwrap();

    let mut stmt = conn
        .prepare(
            "SELECT id, content, content_type, pinned, created_at, copied_count
             FROM clipboard WHERE id = ?1",
        )
        .unwrap();

    stmt.query_row(params![id], |row| {
        Ok(ClipboardEntry {
            id: row.get(0)?,
            content: row.get(1)?,
            content_type: row.get(2)?,
            pinned: row.get::<_, i32>(3)? == 1,
            created_at: row.get(4)?,
            copied_count: row.get(5)?,
        })
    })
    .ok()
}

#[tauri::command]
fn copy_to_clipboard(content: String) -> bool {
    use arboard::Clipboard;
    let mut clipboard = Clipboard::new().unwrap();
    clipboard.set_text(content).is_ok()
}

#[tauri::command]
fn get_stats(db: tauri::State<DbConn>) -> ClipboardStats {
    let conn = db.0.lock().unwrap();

    let total: i64 = conn
        .query_row("SELECT COUNT(*) FROM clipboard", [], |row| row.get(0))
        .unwrap_or(0);

    let pinned: i64 = conn
        .query_row("SELECT COUNT(*) FROM clipboard WHERE pinned = 1", [], |row| {
            row.get(0)
        })
        .unwrap_or(0);

    let text: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM clipboard WHERE content_type = 'text'",
            [],
            |row| row.get(0),
        )
        .unwrap_or(0);

    let image: i64 = conn
        .query_row(
            "SELECT COUNT(*) FROM clipboard WHERE content_type = 'image'",
            [],
            |row| row.get(0),
        )
        .unwrap_or(0);

    ClipboardStats {
        total_entries: total,
        pinned_entries: pinned,
        text_entries: text,
        image_entries: image,
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let db_path = get_db_path();
    let conn = Connection::open(&db_path).expect("failed to open database");
    init_db(&conn);

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(DbConn(Mutex::new(conn)))
        .setup(|_app| {
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_history,
            search_history,
            add_entry,
            delete_entry,
            clear_history,
            toggle_pin,
            copy_to_clipboard,
            get_stats,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
