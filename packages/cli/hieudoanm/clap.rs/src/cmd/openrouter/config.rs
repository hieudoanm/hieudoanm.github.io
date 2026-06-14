use std::env;
use std::fs;
use std::io::{self, Write};
use std::path::Path;

pub fn load_api_key() -> String {
    if let Ok(v) = env::var("OPEN_ROUTER_API_KEY") {
        if !v.is_empty() {
            return v;
        }
    }

    println!("OPEN_ROUTER_API_KEY is not set.");
    print!("Please enter your OpenRouter API key: ");
    io::stdout().flush().unwrap();

    let mut key = String::new();
    if io::stdin().read_line(&mut key).is_err() {
        eprintln!("failed to read API key");
        std::process::exit(1);
    }

    let key = key.trim().to_string();

    if key.is_empty() {
        eprintln!("API key cannot be empty");
        std::process::exit(1);
    }

    env::set_var("OPEN_ROUTER_API_KEY", &key);

    key
}

pub fn read_key_from_file(path: &str) -> Option<String> {
    let p = Path::new(path);
    if !p.exists() {
        return None;
    }

    let content = fs::read_to_string(p).ok()?;
    for line in content.lines() {
        let line = line.trim();
        if line.is_empty() || line.starts_with('#') {
            continue;
        }
        if let Some(value) = line.strip_prefix("OPEN_ROUTER_API_KEY=") {
            let v = value.trim().to_string();
            if !v.is_empty() {
                return Some(v);
            }
        }
        if line.starts_with("sk-") {
            return Some(line.to_string());
        }
    }

    None
}
