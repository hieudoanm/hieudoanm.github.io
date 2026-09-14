use anyhow::Context;
use regex::Regex;
use serde::Serialize;

#[derive(Serialize)]
struct SymbolMatch {
    file: String,
    line: usize,
    symbol: String,
    kind: String,
    language: String,
}

struct CodePattern {
    re: Regex,
    kind: &'static str,
}

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 's', long = "symbol", help = "Symbol name to search")]
    pub symbol: String,
    #[arg(
        short = 'd',
        long = "dir",
        default_value = ".",
        help = "Root directory to search"
    )]
    pub dir: String,
    #[arg(short = 'l', long = "lang", help = "Language filter (go, ts, py, rs)")]
    pub lang: Option<String>,
    #[arg(
        short = 'k',
        long = "kind",
        help = "Symbol kind (function, type, variable, method, class)"
    )]
    pub kind: Option<String>,
    #[arg(
        short = 'n',
        long = "max-results",
        default_value = "0",
        help = "Maximum number of results (0 = unlimited)"
    )]
    pub max_results: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("code")
        .about("Search for code symbols (functions, types, variables)")
        .arg(
            clap::Arg::new("symbol")
                .long("symbol")
                .short('s')
                .help("Symbol name to search")
                .required(true),
        )
        .arg(
            clap::Arg::new("dir")
                .long("dir")
                .short('d')
                .help("Root directory to search")
                .default_value("."),
        )
        .arg(
            clap::Arg::new("lang")
                .long("lang")
                .short('l')
                .help("Language filter (go, ts, py, rs)"),
        )
        .arg(
            clap::Arg::new("kind")
                .long("kind")
                .short('k')
                .help("Symbol kind (function, type, variable, method, class)"),
        )
        .arg(
            clap::Arg::new("max_results")
                .long("max-results")
                .short('n')
                .help("Maximum number of results (0 = unlimited)")
                .default_value("0"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .action(clap::ArgAction::SetTrue)
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let symbol = Some(&matches.symbol).context("symbol required")?;
    let dir = Some(&matches.dir).map(|s| s.as_str()).unwrap_or(".");
    let lang = matches.lang.as_deref();
    let kind = matches.kind.as_deref();
    let max_results: usize = Some(&matches.max_results)
        .and_then(|s| s.parse().ok())
        .unwrap_or(0);
    let use_json = matches.json;

    let symbol_re = Regex::new(symbol).context("invalid symbol pattern")?;
    let results = search_code_symbols(&symbol_re, dir, lang, kind, max_results)?;

    if use_json {
        let out = serde_json::json!({
            "symbol": symbol,
            "results": results,
            "count": results.len(),
        });
        println!("{}", serde_json::to_string_pretty(&out)?);
    } else if results.is_empty() {
        println!("(no symbols found)");
    } else {
        for r in &results {
            println!("{}:{}: {} {}", r.file, r.line, r.kind, r.symbol);
        }
        println!("\n{} symbols found", results.len());
    }

    Ok(())
}

fn search_code_symbols(
    symbol_re: &Regex,
    root: &str,
    lang: Option<&str>,
    kind: Option<&str>,
    max_results: usize,
) -> anyhow::Result<Vec<SymbolMatch>> {
    let mut results = Vec::new();
    let mut done = false;

    for entry in walkdir::WalkDir::new(root)
        .into_iter()
        .filter_map(|e| e.ok())
    {
        if done || !entry.file_type().is_file() {
            continue;
        }

        let path = entry.path();
        let (lang_name, patterns, _ok) = code_patterns_for(path, lang);
        if patterns.is_empty() {
            continue;
        }

        if let Some(k) = kind {
            if !patterns.iter().any(|p| p.kind == k) {
                continue;
            }
        }

        let data = match std::fs::read_to_string(path) {
            Ok(d) => d,
            Err(_) => continue,
        };

        for (i, line) in data.lines().enumerate() {
            let trimmed = line.trim();
            for p in &patterns {
                if let Some(caps) = p.re.captures(trimmed) {
                    if let Some(name) = caps.get(1) {
                        let name_str = name.as_str();
                        if !symbol_re.is_match(name_str) {
                            continue;
                        }
                        if let Some(k) = kind {
                            if p.kind != k {
                                continue;
                            }
                        }
                        results.push(SymbolMatch {
                            file: path.to_string_lossy().to_string(),
                            line: i + 1,
                            symbol: name_str.to_string(),
                            kind: p.kind.to_string(),
                            language: lang_name.to_string(),
                        });
                        if max_results > 0 && results.len() >= max_results {
                            done = true;
                            break;
                        }
                    }
                }
            }
            if done {
                break;
            }
        }
    }

    Ok(results)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::Path;

    #[test]
    fn test_code_patterns_for_go() {
        let path = Path::new("main.go");
        let (lang, patterns, ok) = code_patterns_for(path, None);
        assert!(ok);
        assert_eq!(lang, "go");
        assert!(patterns.iter().any(|p| p.kind == "function"));
    }

    #[test]
    fn test_code_patterns_for_rust() {
        let path = Path::new("main.rs");
        let (lang, patterns, ok) = code_patterns_for(path, None);
        assert!(ok);
        assert_eq!(lang, "rust");
        assert!(patterns.iter().any(|p| p.kind == "function"));
        assert!(patterns.iter().any(|p| p.kind == "struct"));
    }

    #[test]
    fn test_code_patterns_for_typescript() {
        let path = Path::new("app.ts");
        let (lang, patterns, ok) = code_patterns_for(path, None);
        assert!(ok);
        assert_eq!(lang, "typescript");
        assert!(patterns.iter().any(|p| p.kind == "function"));
        assert!(patterns.iter().any(|p| p.kind == "class"));
    }

    #[test]
    fn test_code_patterns_for_javascript() {
        let path = Path::new("app.jsx");
        let (lang, patterns, ok) = code_patterns_for(path, None);
        assert!(ok);
        assert_eq!(lang, "typescript");
        assert!(patterns.iter().any(|p| p.kind == "function"));
    }

    #[test]
    fn test_code_patterns_for_python() {
        let path = Path::new("main.py");
        let (lang, patterns, ok) = code_patterns_for(path, None);
        assert!(ok);
        assert_eq!(lang, "python");
        assert!(patterns.iter().any(|p| p.kind == "function"));
        assert!(patterns.iter().any(|p| p.kind == "class"));
    }

    #[test]
    fn test_code_patterns_for_unknown_extension() {
        let path = Path::new("readme.md");
        let (lang, patterns, ok) = code_patterns_for(path, None);
        assert!(!ok);
        assert!(lang.is_empty());
        assert!(patterns.is_empty());
    }

    #[test]
    fn test_code_patterns_with_lang_filter_match() {
        let path = Path::new("main.rs");
        let (lang, _patterns, ok) = code_patterns_for(path, Some("rs"));
        assert!(ok);
        assert_eq!(lang, "rust");
    }

    #[test]
    fn test_code_patterns_with_lang_filter_mismatch() {
        let path = Path::new("main.rs");
        let (_lang, _patterns, ok) = code_patterns_for(path, Some("go"));
        assert!(!ok);
    }
}

fn code_patterns_for(
    path: &std::path::Path,
    lang_filter: Option<&str>,
) -> (&'static str, Vec<CodePattern>, bool) {
    let ext = match path.extension().and_then(|e| e.to_str()) {
        Some(e) => e.to_lowercase(),
        None => return ("", vec![], false),
    };

    match ext.as_str() {
        "go" => {
            if lang_filter.is_some_and(|l| l != "go") {
                return ("", vec![], false);
            }
            (
                "go",
                vec![
                    CodePattern {
                        re: Regex::new(r#"(?-u)^func\s+(\w+)\s*\("#).unwrap(),
                        kind: "method",
                    },
                    CodePattern {
                        re: Regex::new(r#"(?-u)^func\s+(\w+)\s*\("#).unwrap(),
                        kind: "function",
                    },
                    CodePattern {
                        re: Regex::new(r#"(?-u)^type\s+(\w+)\s"#).unwrap(),
                        kind: "type",
                    },
                    CodePattern {
                        re: Regex::new(r#"(?-u)^var\s+(\w+)"#).unwrap(),
                        kind: "variable",
                    },
                    CodePattern {
                        re: Regex::new(r#"(?-u)^const\s+(\w+)"#).unwrap(),
                        kind: "constant",
                    },
                ],
                true,
            )
        }
        "ts" | "tsx" | "js" | "jsx" => {
            if lang_filter.is_some_and(|l| l != "ts" && l != "js") {
                return ("", vec![], false);
            }
            (
                "typescript",
                vec![
                    CodePattern {
                        re: Regex::new(r#"^(?:export\s+)?(?:async\s+)?function\s+(\w+)"#).unwrap(),
                        kind: "function",
                    },
                    CodePattern {
                        re: Regex::new(r#"^(?:export\s+)?class\s+(\w+)"#).unwrap(),
                        kind: "class",
                    },
                    CodePattern {
                        re: Regex::new(r#"^(?:export\s+)?interface\s+(\w+)"#).unwrap(),
                        kind: "interface",
                    },
                    CodePattern {
                        re: Regex::new(r#"^(?:export\s+)?type\s+(\w+)"#).unwrap(),
                        kind: "type",
                    },
                    CodePattern {
                        re: Regex::new(r#"^(?:export\s+)?const\s+(\w+)"#).unwrap(),
                        kind: "variable",
                    },
                    CodePattern {
                        re: Regex::new(r#"^(?:export\s+)?enum\s+(\w+)"#).unwrap(),
                        kind: "enum",
                    },
                ],
                true,
            )
        }
        "py" => {
            if lang_filter.is_some_and(|l| l != "py") {
                return ("", vec![], false);
            }
            (
                "python",
                vec![
                    CodePattern {
                        re: Regex::new(r"^(?:async\s+)?def\s+(\w+)").unwrap(),
                        kind: "function",
                    },
                    CodePattern {
                        re: Regex::new(r"^class\s+(\w+)").unwrap(),
                        kind: "class",
                    },
                    CodePattern {
                        re: Regex::new(r##"^(\w+)\s*=\s*(?:lambda|[\[{('"0-9])"##).unwrap(),
                        kind: "variable",
                    },
                ],
                true,
            )
        }
        "rs" => {
            if lang_filter.is_some_and(|l| l != "rs") {
                return ("", vec![], false);
            }
            (
                "rust",
                vec![
                    CodePattern {
                        re: Regex::new(r#"^(?:pub\s+)?fn\s+(\w+)"#).unwrap(),
                        kind: "function",
                    },
                    CodePattern {
                        re: Regex::new(r#"^(?:pub\s+)?struct\s+(\w+)"#).unwrap(),
                        kind: "struct",
                    },
                    CodePattern {
                        re: Regex::new(r#"^(?:pub\s+)?trait\s+(\w+)"#).unwrap(),
                        kind: "trait",
                    },
                    CodePattern {
                        re: Regex::new(r#"^(?:pub\s+)?enum\s+(\w+)"#).unwrap(),
                        kind: "enum",
                    },
                    CodePattern {
                        re: Regex::new(r#"^(?:pub\s+)?type\s+(\w+)"#).unwrap(),
                        kind: "type",
                    },
                    CodePattern {
                        re: Regex::new(r#"^(?:pub\s+)?const\s+(\w+)"#).unwrap(),
                        kind: "constant",
                    },
                ],
                true,
            )
        }
        _ => ("", vec![], false),
    }
}
