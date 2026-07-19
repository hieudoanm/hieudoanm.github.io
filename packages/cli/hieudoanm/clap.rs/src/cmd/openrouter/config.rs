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

pub fn parse_key_file_contents(contents: &str) -> Option<String> {
    for line in contents.lines() {
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

pub fn read_key_from_file(path: &str) -> Option<String> {
    let p = Path::new(path);
    if !p.exists() {
        return None;
    }
    let content = fs::read_to_string(p).ok()?;
    parse_key_file_contents(&content)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_key_file_contents_openrouter_prefix() {
        let contents = "OPEN_ROUTER_API_KEY=sk-test-key-123\n";
        assert_eq!(
            parse_key_file_contents(contents),
            Some("sk-test-key-123".to_string())
        );
    }

    #[test]
    fn test_parse_key_file_contents_sk_prefix() {
        let contents = "# comment\nsk-my-secret-key\nother=stuff\n";
        assert_eq!(
            parse_key_file_contents(contents),
            Some("sk-my-secret-key".to_string())
        );
    }

    #[test]
    fn test_parse_key_file_contents_comments_and_blanks() {
        let contents = "\n  \n# comment line\n";
        assert_eq!(parse_key_file_contents(contents), None);
    }

    #[test]
    fn test_parse_key_file_contents_empty_string() {
        assert_eq!(parse_key_file_contents(""), None);
    }

    #[test]
    fn test_parse_key_file_contents_trimmed_value() {
        let contents = "OPEN_ROUTER_API_KEY=  sk-key-with-spaces  \n";
        assert_eq!(
            parse_key_file_contents(contents),
            Some("sk-key-with-spaces".to_string())
        );
    }

    #[test]
    fn test_read_key_from_file_nonexistent() {
        assert_eq!(read_key_from_file("/tmp/nonexistent-key-file-xyz"), None);
    }

    #[test]
    fn test_load_api_key_from_env() {
        let original = std::env::var("OPEN_ROUTER_API_KEY").ok();
        std::env::set_var("OPEN_ROUTER_API_KEY", "sk-test-key-from-env");
        let key = load_api_key();
        assert_eq!(key, "sk-test-key-from-env");
        if let Some(v) = original {
            std::env::set_var("OPEN_ROUTER_API_KEY", v);
        } else {
            std::env::remove_var("OPEN_ROUTER_API_KEY");
        }
    }
}
