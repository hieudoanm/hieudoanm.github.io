use anyhow::Context;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct Owner {
    login: String,
    avatar_url: Option<String>,
}

#[derive(Debug, Deserialize)]
struct Repo {
    name: String,
    full_name: String,
    description: Option<String>,
    html_url: String,
    stargazers_count: i64,
    forks_count: i64,
    language: Option<String>,
    owner: Owner,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_escape_xml_ampersand() {
        assert_eq!(escape_xml("a&b"), "a&amp;b");
    }

    #[test]
    fn test_escape_xml_lt_gt() {
        assert_eq!(escape_xml("<tag>"), "&lt;tag&gt;");
    }

    #[test]
    fn test_escape_xml_quotes() {
        assert_eq!(escape_xml("it's \"done\""), "it&apos;s &quot;done&quot;");
    }

    #[test]
    fn test_escape_xml_no_special() {
        assert_eq!(escape_xml("hello"), "hello");
    }

    #[test]
    fn test_escape_xml_empty() {
        assert_eq!(escape_xml(""), "");
    }

    #[test]
    fn test_generate_og_svg_basic() {
        let repo = Repo {
            name: "test-repo".to_string(),
            full_name: "user/test-repo".to_string(),
            description: Some("A test repository".to_string()),
            html_url: "https://github.com/user/test-repo".to_string(),
            stargazers_count: 42,
            forks_count: 7,
            language: Some("Rust".to_string()),
            owner: Owner {
                login: "testuser".to_string(),
                avatar_url: None,
            },
        };
        let svg = generate_og_svg(&repo);
        assert!(svg.contains("test-repo"));
        assert!(svg.contains("testuser"));
        assert!(svg.contains("A test repository"));
        assert!(svg.contains("<svg"));
        assert!(svg.contains("</svg>"));
    }

    #[test]
    fn test_generate_og_svg_with_avatar() {
        let repo = Repo {
            name: "repo".to_string(),
            full_name: "u/repo".to_string(),
            description: None,
            html_url: "https://github.com/u/repo".to_string(),
            stargazers_count: 0,
            forks_count: 0,
            language: None,
            owner: Owner {
                login: "u".to_string(),
                avatar_url: Some("https://avatars.example.com/img.png".to_string()),
            },
        };
        let svg = generate_og_svg(&repo);
        assert!(svg.contains("https://avatars.example.com/img.png"));
        assert!(svg.contains("No description"));
    }

    #[test]
    fn test_generate_og_svg_long_description_truncated() {
        let long_desc = "x".repeat(200);
        let repo = Repo {
            name: "r".to_string(),
            full_name: "u/r".to_string(),
            description: Some(long_desc.clone()),
            html_url: "https://github.com/u/r".to_string(),
            stargazers_count: 100,
            forks_count: 10,
            language: Some("Go".to_string()),
            owner: Owner {
                login: "u".to_string(),
                avatar_url: None,
            },
        };
        let svg = generate_og_svg(&repo);
        assert!(svg.contains("..."), "description should be truncated");
    }

    #[test]
    fn test_generate_og_svg_no_language() {
        let repo = Repo {
            name: "nolang".to_string(),
            full_name: "u/nolang".to_string(),
            description: Some("desc".to_string()),
            html_url: "https://github.com/u/nolang".to_string(),
            stargazers_count: 1,
            forks_count: 0,
            language: None,
            owner: Owner {
                login: "u".to_string(),
                avatar_url: None,
            },
        };
        let svg = generate_og_svg(&repo);
        assert!(svg.contains("nolang"));
    }
}

fn escape_xml(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('\'', "&apos;")
        .replace('"', "&quot;")
}

fn generate_og_svg(repo: &Repo) -> String {
    let width = 1200u32;
    let height = 630u32;

    let desc = repo
        .description
        .as_deref()
        .map(|d| {
            if d.len() > 120 {
                format!("{}...", &d[..120])
            } else {
                d.to_string()
            }
        })
        .unwrap_or_else(|| "No description".to_string());

    let colors = super::colors::language_colors();
    let lang_color = repo
        .language
        .as_deref()
        .and_then(|l| colors.get(l))
        .copied()
        .unwrap_or("#6e7681");

    let lang_display = repo.language.as_deref().unwrap_or("");
    let owner_login = escape_xml(&repo.owner.login);
    let name = escape_xml(&repo.name);
    let desc_escaped = escape_xml(&desc);
    let html_url = escape_xml(&repo.html_url);

    let mut svg = String::new();
    svg.push_str(&format!(
        r##"<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">"##,
    ));
    svg.push_str("\n<defs>\n  <linearGradient id=\"bg\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n    <stop offset=\"0%\" stop-color=\"#0d1117\"/>\n    <stop offset=\"100%\" stop-color=\"#161b22\"/>\n  </linearGradient>\n</defs>\n");
    svg.push_str(&format!(
        r##"<rect width="{width}" height="{height}" fill="url(#bg)" rx="12"/>"##,
    ));
    svg.push('\n');

    if let Some(avatar) = &repo.owner.avatar_url {
        svg.push_str(&format!(
            r##"<image x="60" y="60" width="80" height="80" href="{avatar}" rx="40"/>"##,
        ));
        svg.push('\n');
    }

    svg.push_str(&format!(
        r##"<text x="155" y="95" fill="#8b949e" font-family="sans-serif" font-size="18">{owner_login}</text>"##,
    ));
    svg.push('\n');

    svg.push_str(&format!(
        r##"<text x="60" y="145" fill="#58a6ff" font-family="sans-serif" font-size="36" font-weight="bold">{name}</text>"##,
    ));
    svg.push('\n');

    svg.push_str(&format!(
        r##"<text x="60" y="195" fill="#c9d1d9" font-family="sans-serif" font-size="20">{desc_escaped}</text>"##,
    ));
    svg.push('\n');

    let stat_y = 270u32;
    svg.push_str(&format!(
        r##"<circle cx="65" cy="{}" r="8" fill="{lang_color}"/>"##,
        stat_y - 6
    ));
    svg.push('\n');
    svg.push_str(&format!(
        r##"<text x="82" y="{stat_y}" fill="#8b949e" font-family="sans-serif" font-size="18">{lang_display}</text>"##,
    ));
    svg.push('\n');

    svg.push_str(&format!(
        r##"<text x="200" y="{stat_y}" fill="#8b949e" font-family="sans-serif" font-size="18">★ {}</text>"##,
        repo.stargazers_count
    ));
    svg.push('\n');

    svg.push_str(&format!(
        r##"<text x="320" y="{stat_y}" fill="#8b949e" font-family="sans-serif" font-size="18">⑂ {}</text>"##,
        repo.forks_count
    ));
    svg.push('\n');

    svg.push_str(&format!(
        r##"<text x="60" y="{}" fill="#30363d" font-family="sans-serif" font-size="16">{html_url}</text>"##,
        height - 30
    ));
    svg.push_str("\n</svg>\n");

    svg
}

pub fn command() -> clap::Command {
    clap::Command::new("og")
        .about("Generate an Open Graph SVG for a GitHub repository")
        .arg(
            clap::Arg::new("url")
                .short('u')
                .long("url")
                .help("Repository (owner/repo)")
                .required(true),
        )
        .arg(
            clap::Arg::new("output")
                .short('o')
                .long("output")
                .help("Output SVG file path")
                .default_value("og.svg"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let url = matches.get_one::<String>("url").unwrap();
    let output = matches.get_one::<String>("output").unwrap();

    let parts: Vec<&str> = url.split('/').collect();
    if parts.len() != 2 {
        anyhow::bail!("repo must be in format owner/repo (got {url:?})");
    }

    let api_url = format!("https://api.github.com/repos/{}/{}", parts[0], parts[1]);
    let client = reqwest::blocking::Client::new();
    let resp = client
        .get(&api_url)
        .header("Accept", "application/json")
        .header("User-Agent", "hieudoanm-cli")
        .send()
        .context("error fetching repository")?;
    let repo: Repo = resp.json().context("error parsing response")?;

    let svg = generate_og_svg(&repo);
    std::fs::write(output, &svg).context("error writing SVG")?;
    println!("\u{2713} og.svg generated at {output}");
    Ok(())
}
