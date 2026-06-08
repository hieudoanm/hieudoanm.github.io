use rusqlite::Connection;
use std::path::PathBuf;
use std::time::Duration;

fn db_path() -> anyhow::Result<PathBuf> {
    let home = dirs::home_dir().ok_or_else(|| anyhow::anyhow!("cannot find home dir"))?;
    let dir = home.join(".hieudoanm");
    std::fs::create_dir_all(&dir)?;
    Ok(dir.join("hieudoanm.db"))
}

fn create_table(conn: &Connection) -> anyhow::Result<()> {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS clips (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );",
    )?;
    Ok(())
}

fn insert_clip(conn: &Connection, content: &str) -> anyhow::Result<()> {
    conn.execute(
        "INSERT INTO clips (content) VALUES (?1)",
        rusqlite::params![content],
    )?;
    Ok(())
}

fn preview(text: &str) -> String {
    if text.len() > 40 {
        format!("{}...", &text[..40])
    } else {
        text.to_string()
    }
}

#[cfg(target_os = "macos")]
fn read_clipboard() -> anyhow::Result<String> {
    let output = std::process::Command::new("pbpaste")
        .output()
        .map_err(|e| anyhow::anyhow!("pbpaste failed: {e}"))?;
    let text = String::from_utf8_lossy(&output.stdout).to_string();
    Ok(text.trim().to_string())
}

#[cfg(target_os = "linux")]
fn read_clipboard() -> anyhow::Result<String> {
    let output = std::process::Command::new("xclip")
        .args(["-selection", "clipboard", "-o"])
        .output()
        .map_err(|e| anyhow::anyhow!("xclip failed: {e}"))?;
    let text = String::from_utf8_lossy(&output.stdout).to_string();
    Ok(text.trim().to_string())
}

#[cfg(not(any(target_os = "macos", target_os = "linux")))]
fn read_clipboard() -> anyhow::Result<String> {
    anyhow::bail!("clipboard not supported on this platform");
}

pub fn command() -> clap::Command {
    clap::Command::new("clipboard").about("Listen to clipboard changes and store them")
}

pub fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let path = db_path()?;
    let conn = Connection::open(&path)?;
    create_table(&conn)?;

    println!("Clipboard watcher started... (Ctrl+C to stop)");

    let mut last_text = String::new();

    loop {
        match read_clipboard() {
            Ok(text) if !text.is_empty() && text != last_text => {
                if let Err(e) = insert_clip(&conn, &text) {
                    eprintln!("insert error: {e}");
                } else {
                    println!("Saved: {}", preview(&text));
                }
                last_text = text;
            }
            _ => {}
        }
        std::thread::sleep(Duration::from_millis(500));
    }
}
