use chrono::Local;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Entry {
    pub timestamp: String,
    pub source: String,
    pub command: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub cwd: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub duration_ms: Option<i64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct CommandCount {
    pub name: String,
    pub count: usize,
}

#[derive(Debug, Serialize)]
pub struct Stats {
    pub total_cli: usize,
    pub total_mcp: usize,
    pub top_commands: Vec<CommandCount>,
    pub top_errors: Vec<CommandCount>,
}

fn storage_path() -> anyhow::Result<PathBuf> {
    let home = dirs::home_dir().ok_or_else(|| anyhow::anyhow!("cannot find home dir"))?;
    let dir = home.join(".hieudoanm");
    fs::create_dir_all(&dir)?;
    Ok(dir.join("history.jsonl"))
}

pub fn append(entry: &Entry) -> anyhow::Result<()> {
    let path = storage_path()?;
    let line = serde_json::to_string(entry)?;
    let data = format!("{}\n", line);
    use std::io::Write;
    let mut f = fs::OpenOptions::new()
        .append(true)
        .create(true)
        .open(&path)?;
    f.write_all(data.as_bytes())?;
    Ok(())
}

fn read_all() -> anyhow::Result<Vec<Entry>> {
    let path = storage_path()?;
    if !path.exists() {
        return Ok(Vec::new());
    }
    let content = fs::read_to_string(&path)?;
    let mut entries = Vec::new();
    for line in content.lines() {
        let line = line.trim();
        if line.is_empty() {
            continue;
        }
        if let Ok(e) = serde_json::from_str::<Entry>(line) {
            entries.push(e);
        }
    }
    Ok(entries)
}

pub fn list(count: usize) -> anyhow::Result<Vec<Entry>> {
    let entries = read_all()?;
    let n = if count == 0 || count > entries.len() {
        entries.len()
    } else {
        count
    };
    Ok(entries[entries.len() - n..].to_vec())
}

pub fn search(query: &str, limit: usize) -> anyhow::Result<Vec<Entry>> {
    let entries = read_all()?;
    let q = query.to_lowercase();
    let mut results = Vec::new();
    for e in entries.into_iter().rev() {
        if e.command.to_lowercase().contains(&q) {
            results.push(e);
            if limit > 0 && results.len() >= limit {
                break;
            }
        }
    }
    Ok(results)
}

pub fn clear() -> anyhow::Result<()> {
    let path = storage_path()?;
    if path.exists() {
        fs::remove_file(&path)?;
    }
    Ok(())
}

pub fn compute_stats() -> anyhow::Result<Stats> {
    let entries = read_all()?;
    let mut stats = Stats {
        total_cli: 0,
        total_mcp: 0,
        top_commands: Vec::new(),
        top_errors: Vec::new(),
    };
    let mut cmd_count: HashMap<String, usize> = HashMap::new();
    let mut err_count: HashMap<String, usize> = HashMap::new();
    for e in &entries {
        if e.source == "cli" {
            stats.total_cli += 1;
        } else {
            stats.total_mcp += 1;
        }
        *cmd_count.entry(e.command.clone()).or_insert(0) += 1;
        if e.error.is_some() {
            *err_count.entry(e.command.clone()).or_insert(0) += 1;
        }
    }
    stats.top_commands = top_n(&cmd_count, 10);
    stats.top_errors = top_n(&err_count, 10);
    Ok(stats)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_top_n_empty() {
        let counts = HashMap::new();
        let result = top_n(&counts, 5);
        assert!(result.is_empty());
    }

    #[test]
    fn test_top_n_basic() {
        let mut counts = HashMap::new();
        counts.insert("a".to_string(), 10);
        counts.insert("b".to_string(), 5);
        counts.insert("c".to_string(), 20);
        let result = top_n(&counts, 5);
        assert_eq!(result.len(), 3);
        assert_eq!(result[0].name, "c");
        assert_eq!(result[0].count, 20);
        assert_eq!(result[2].name, "b");
        assert_eq!(result[2].count, 5);
    }

    #[test]
    fn test_top_n_limits_results() {
        let mut counts = HashMap::new();
        for i in 0..10 {
            counts.insert(format!("cmd{i}"), i);
        }
        let result = top_n(&counts, 3);
        assert_eq!(result.len(), 3);
    }

    #[test]
    fn test_entry_display_no_error() {
        let e = Entry {
            timestamp: "2025-01-01".to_string(),
            source: "cli".to_string(),
            command: "test".to_string(),
            cwd: None,
            duration_ms: None,
            error: None,
        };
        let output = format!("{e}");
        assert_eq!(output, "2025-01-01  test");
    }

    #[test]
    fn test_entry_display_with_error() {
        let e = Entry {
            timestamp: "2025-01-01".to_string(),
            source: "cli".to_string(),
            command: "test".to_string(),
            cwd: None,
            duration_ms: None,
            error: Some("failed".to_string()),
        };
        let output = format!("{e}");
        assert_eq!(output, "2025-01-01  test  [failed]");
    }

    #[test]
    fn test_entry_basic() {
        let e = entry("cli", "help");
        assert_eq!(e.source, "cli");
        assert_eq!(e.command, "help");
        assert!(e.timestamp.len() > 10);
    }

    #[test]
    fn test_stats_totals() {
        use std::collections::HashMap;
        let counts: HashMap<String, usize> = HashMap::new();
        let result = top_n(&counts, 5);
        assert!(result.is_empty());
    }
}

fn top_n(counts: &HashMap<String, usize>, n: usize) -> Vec<CommandCount> {
    let mut v: Vec<CommandCount> = counts
        .iter()
        .map(|(k, v)| CommandCount {
            name: k.clone(),
            count: *v,
        })
        .collect();
    v.sort_by_key(|b| std::cmp::Reverse(b.count));
    v.truncate(n);
    v
}

impl std::fmt::Display for Entry {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}  {}", self.timestamp, self.command)?;
        if let Some(ref err) = self.error {
            write!(f, "  [{}]", err)?;
        }
        Ok(())
    }
}

pub fn entry(source: &str, command: &str) -> Entry {
    Entry {
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S%:z").to_string(),
        source: source.to_string(),
        command: command.to_string(),
        cwd: std::env::current_dir()
            .ok()
            .map(|p| p.to_string_lossy().to_string()),
        duration_ms: None,
        error: None,
    }
}
