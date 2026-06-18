use std::time::Duration;

pub fn command() -> clap::Command {
    clap::Command::new("clipboard").about("Listen to clipboard changes and store them")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    use rusqlite::Connection;

    let home = dirs::home_dir().ok_or_else(|| anyhow::anyhow!("cannot find home dir"))?;
    let dir = home.join(".hieudoanm");
    std::fs::create_dir_all(&dir)?;
    let path = dir.join("hieudoanm.db");
    let conn = Connection::open(&path)?;
    conn.execute_batch("CREATE TABLE IF NOT EXISTS clips (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);")?;

    #[cfg(target_os = "macos")]
    let read_clip = || -> anyhow::Result<String> {
        let output = std::process::Command::new("pbpaste")
            .output()
            .map_err(|e| anyhow::anyhow!("pbpaste failed: {e}"))?;
        Ok(String::from_utf8_lossy(&output.stdout).trim().to_string())
    };

    #[cfg(not(target_os = "macos"))]
    let read_clip =
        || -> anyhow::Result<String> { anyhow::bail!("clipboard not supported on this platform") };

    println!("Clipboard watcher started... (Ctrl+C to stop)");
    let mut last_text = String::new();
    loop {
        if let Ok(text) = read_clip() {
            if !text.is_empty() && text != last_text {
                conn.execute(
                    "INSERT INTO clips (content) VALUES (?1)",
                    rusqlite::params![text],
                )?;
                let preview: String = if text.len() > 40 {
                    format!("{}...", &text[..40])
                } else {
                    text.clone()
                };
                println!("Saved: {preview}");
                last_text = text;
            }
        }
        std::thread::sleep(Duration::from_millis(500));
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
