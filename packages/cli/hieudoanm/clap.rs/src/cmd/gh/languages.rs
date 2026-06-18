use std::collections::HashMap;

use anyhow::Context;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_languages_svg_single() {
        let mut langs = HashMap::new();
        langs.insert("Rust".into(), 1000i64);
        let svg = generate_languages_svg(&langs);
        assert!(svg.contains("<svg"));
        assert!(svg.contains("Rust"));
        assert!(svg.contains("100.0%"));
        assert!(svg.contains("</svg>"));
    }

    #[test]
    fn test_generate_languages_svg_multiple() {
        let mut langs = HashMap::new();
        langs.insert("Rust".into(), 3000i64);
        langs.insert("JavaScript".into(), 1000i64);
        let svg = generate_languages_svg(&langs);
        assert!(svg.contains("Rust"));
        assert!(svg.contains("JavaScript"));
        assert!(svg.contains("75.0%"));
        assert!(svg.contains("25.0%"));
    }

    #[test]
    fn test_generate_languages_svg_empty() {
        let langs = HashMap::new();
        let svg = generate_languages_svg(&langs);
        assert!(svg.contains("<svg"));
        assert!(svg.contains("</svg>"));
    }

    #[test]
    fn test_generate_languages_svg_sorts_by_bytes_descending() {
        let mut langs = HashMap::new();
        langs.insert("Python".into(), 500i64);
        langs.insert("Rust".into(), 3000i64);
        let svg = generate_languages_svg(&langs);
        let rust_pos = svg.find("Rust").unwrap();
        let python_pos = svg.find("Python").unwrap();
        assert!(rust_pos < python_pos);
    }

    #[test]
    fn test_generate_languages_svg_invalid_color_falls_back() {
        let mut langs = HashMap::new();
        langs.insert("UnknownLangXYZ".into(), 100i64);
        // No color entry for this language, should not crash
        let svg = generate_languages_svg(&langs);
        assert!(svg.contains("UnknownLangXYZ"));
    }

    #[test]
    fn test_generate_languages_svg_tiny_bar() {
        let mut langs = HashMap::new();
        langs.insert("Rust".into(), 1i64);
        langs.insert("JavaScript".into(), 999i64);
        let svg = generate_languages_svg(&langs);
        // Rust should still get at least 1px width
        assert!(svg.contains("Rust"));
        assert!(svg.contains("0.1%"));
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[tokio::test]
    async fn test_run_invalid_repo_format() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["languages", "--repo", "invalid-format"])
            .unwrap();
        let result = run(&m).await;
        assert!(result.is_err());
        assert!(result.unwrap_err().to_string().contains("owner/repo"));
    }
}

fn generate_languages_svg(langs: &HashMap<String, i64>) -> String {
    let colors = super::colors::language_colors();
    let mut entries: Vec<(&String, &i64)> = langs.iter().collect();
    entries.sort_by(|a, b| b.1.cmp(a.1));

    let total: i64 = entries.iter().map(|(_, b)| **b).sum();
    let bar_height = 24i32;
    let gap = 4i32;
    let bar_width = 400i32;
    let height = (entries.len() as i32 * (bar_height + gap) + 40) as u32;

    let mut svg = String::new();
    svg.push_str(&format!(
        r##"<svg xmlns="http://www.w3.org/2000/svg" width="{}" height="{}" viewBox="0 0 {} {}">"##,
        bar_width + 20,
        height,
        bar_width + 20,
        height
    ));
    svg.push('\n');
    svg.push_str(&format!(
        r##"<rect width="{}" height="{}" fill="#0d1117" rx="6"/>"##,
        bar_width + 20,
        height
    ));
    svg.push('\n');
    svg.push_str(
        r##"<text x="10" y="20" fill="#c9d1d9" font-family="sans-serif" font-size="13" font-weight="600">Languages</text>"##,
    );
    svg.push('\n');

    let mut y = 35i32;
    for (name, bytes) in &entries {
        let pct = **bytes as f64 / total as f64 * 100.0;
        let mut w = (bar_width as f64 * pct / 100.0) as i32;
        if w < 1 && pct > 0.0 {
            w = 1;
        }
        let color = colors.get(name.as_str()).unwrap_or(&"#6e7681");

        svg.push_str(&format!(
            r##"<rect x="10" y="{}" width="{}" height="{}" fill="{}" rx="3"/>"##,
            y, w, bar_height, color
        ));
        svg.push('\n');
        svg.push_str(&format!(
            r##"<text x="15" y="{}" fill="#8b949e" font-family="sans-serif" font-size="11">{}</text>"##,
            y + 16,
            name
        ));
        svg.push('\n');
        svg.push_str(&format!(
            r##"<text x="{}" y="{}" fill="#8b949e" font-family="sans-serif" font-size="11" text-anchor="end">{:.1}%</text>"##,
            bar_width + 15,
            y + 16,
            pct
        ));
        svg.push('\n');

        y += bar_height + gap;
    }

    svg.push_str("</svg>\n");
    svg
}

pub fn command() -> clap::Command {
    clap::Command::new("languages")
        .about("Show repository language breakdown and generate SVG bar chart")
        .arg(
            clap::Arg::new("repo")
                .short('r')
                .long("repo")
                .help("Repository (owner/repo)")
                .required(true),
        )
        .arg(
            clap::Arg::new("output")
                .short('o')
                .long("output")
                .help("Output SVG file path")
                .default_value("languages.svg"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let repo = matches.get_one::<String>("repo").unwrap();
    let output = matches.get_one::<String>("output").unwrap();

    let parts: Vec<&str> = repo.split('/').collect();
    if parts.len() != 2 {
        anyhow::bail!("repo must be in format owner/repo (got {repo:?})");
    }

    let url = format!(
        "https://api.github.com/repos/{}/{}/languages",
        parts[0], parts[1]
    );
    let client = reqwest::blocking::Client::new();
    let resp = client
        .get(&url)
        .header("Accept", "application/json")
        .header("User-Agent", "hieudoanm-cli")
        .send()
        .context("error fetching languages")?;
    let langs: HashMap<String, i64> = resp.json().context("error parsing response")?;

    if langs.is_empty() {
        println!("No languages found");
        return Ok(());
    }

    println!("Languages:");
    for (lang, bytes) in &langs {
        println!("  {lang}: {bytes} bytes");
    }

    let svg = generate_languages_svg(&langs);
    std::fs::write(output, &svg).context("error writing SVG")?;
    println!("\u{2713} languages.svg generated at {output}");
    Ok(())
}
