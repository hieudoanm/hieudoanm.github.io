use anyhow::Context;
use regex::Regex;
use serde::Serialize;

#[derive(Serialize)]
struct WebResult {
    title: String,
    url: String,
    snippet: String,
}

pub fn command() -> clap::Command {
    clap::Command::new("web")
        .about("Search the internet")
        .arg(
            clap::Arg::new("query")
                .long("query")
                .short('q')
                .help("Search query")
                .required(true),
        )
        .arg(
            clap::Arg::new("max-results")
                .long("max-results")
                .short('n')
                .help("Maximum number of results")
                .default_value("5"),
        )
        .arg(
            clap::Arg::new("source")
                .long("source")
                .short('s')
                .help("Search source (duckduckgo)")
                .default_value("duckduckgo"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .action(clap::ArgAction::SetTrue)
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let query = matches
        .get_one::<String>("query")
        .context("query required")?;
    let max_results: usize = matches
        .get_one::<String>("max-results")
        .and_then(|s| s.parse().ok())
        .unwrap_or(5);
    let source = matches
        .get_one::<String>("source")
        .map(|s| s.as_str())
        .unwrap_or("duckduckgo");
    let use_json = matches.get_flag("json");

    match source {
        "duckduckgo" | "" => {
            let results = duck_duck_go_search(query, max_results)?;
            output_web_results(&results, query, use_json);
            Ok(())
        }
        _ => anyhow::bail!("unsupported search source: {source} (use 'duckduckgo')"),
    }
}

fn duck_duck_go_search(query: &str, max_results: usize) -> anyhow::Result<Vec<WebResult>> {
    let params = vec![("q", query)];
    let url = url::Url::parse_with_params("https://lite.duckduckgo.com/lite/", &params)
        .context("url parse")?;

    let client = reqwest::blocking::Client::new();
    let resp = client
        .get(url)
        .header("User-Agent", "Mozilla/5.0 (compatible; hieudoanm-cli/1.0)")
        .send()
        .context("fetch error")?;
    let body = resp.text().context("read error")?;

    Ok(parse_duck_duck_go_results(&body, max_results))
}

fn output_web_results(results: &[WebResult], query: &str, use_json: bool) {
    if use_json {
        let out = serde_json::json!({
            "query": query,
            "results": results,
            "count": results.len(),
        });
        println!("{}", serde_json::to_string_pretty(&out).unwrap());
    } else if results.is_empty() {
        println!("(no results)");
    } else {
        for (i, r) in results.iter().enumerate() {
            println!("{}. {}", i + 1, r.title);
            println!("   {}", r.url);
            if !r.snippet.is_empty() {
                println!("   {}", r.snippet);
            }
            println!();
        }
        println!("{} results from DuckDuckGo", results.len());
    }
}

fn parse_duck_duck_go_results(html: &str, max_results: usize) -> Vec<WebResult> {
    let link_re =
        Regex::new(r#"<a[^>]*class="result-link"[^>]*href="([^"]*)"[^>]*>([^<]*)</a>"#).unwrap();
    let snippet_re = Regex::new(r#"<td[^>]*class="result-snippet"[^>]*>(.*?)</td>"#).unwrap();

    let link_matches: Vec<_> = link_re.captures_iter(html).collect();
    let snippet_matches: Vec<_> = snippet_re.captures_iter(html).collect();

    let n = if max_results > 0 && max_results < link_matches.len() {
        max_results
    } else {
        link_matches.len()
    };

    let mut results = Vec::with_capacity(n);
    for (i, link_match) in link_matches.iter().enumerate().take(n) {
        let href = link_match.get(1).map(|m| m.as_str()).unwrap_or("");
        let title = link_match
            .get(2)
            .map(|m| clean_html(m.as_str()))
            .unwrap_or_default();

        let href = if href.starts_with("//") {
            format!("https:{href}")
        } else if !href.starts_with("http") {
            format!("https://{href}")
        } else {
            href.to_string()
        };

        let snippet = snippet_matches
            .get(i)
            .and_then(|c| c.get(1))
            .map(|m| clean_html(m.as_str()))
            .unwrap_or_default();

        results.push(WebResult {
            title,
            url: href,
            snippet,
        });
    }

    results
}

fn clean_html(s: &str) -> String {
    let tag_re = Regex::new(r"<[^>]*>").unwrap();
    let entity_re = Regex::new(r"&([^;]+);").unwrap();

    let s = tag_re.replace_all(s, "");
    let s = entity_re.replace_all(&s, |caps: &regex::Captures| {
        let key = &caps[1];
        match key {
            "amp" => "&".to_string(),
            "lt" => "<".to_string(),
            "gt" => ">".to_string(),
            "quot" => "\"".to_string(),
            "apos" => "'".to_string(),
            "nbsp" => " ".to_string(),
            _ => {
                if let Some(num) = key.strip_prefix('#') {
                    if let Ok(code) = num.parse::<u32>() {
                        if let Some(c) = char::from_u32(code) {
                            return c.to_string();
                        }
                    }
                }
                caps[0].to_string()
            }
        }
    });

    s.trim().to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_clean_html_removes_tags() {
        assert_eq!(clean_html("<b>hello</b>"), "hello");
        assert_eq!(clean_html("<p>text</p>"), "text");
    }

    #[test]
    fn test_clean_html_entities() {
        assert_eq!(clean_html("&amp;"), "&");
        assert_eq!(clean_html("&lt;"), "<");
        assert_eq!(clean_html("&gt;"), ">");
        assert_eq!(clean_html("&quot;"), "\"");
        assert_eq!(clean_html("&apos;"), "'");
        assert_eq!(clean_html("&nbsp;"), "");
    }

    #[test]
    fn test_clean_html_numeric_entity() {
        assert_eq!(clean_html("&#38;"), "&");
    }

    #[test]
    fn test_clean_html_mixed() {
        let input = "<p>hello &amp; goodbye</p>";
        assert_eq!(clean_html(input), "hello & goodbye");
    }

    #[test]
    fn test_clean_html_trims() {
        assert_eq!(clean_html("  hello  "), "hello");
    }

    #[test]
    fn test_parse_duck_duck_go_results_empty() {
        let results = parse_duck_duck_go_results("", 5);
        assert!(results.is_empty());
    }

    #[test]
    fn test_parse_duck_duck_go_results_no_match() {
        let html = "<html><body>no results here</body></html>";
        let results = parse_duck_duck_go_results(html, 5);
        assert!(results.is_empty());
    }

    #[test]
    fn test_parse_duck_duck_go_results_with_matches() {
        let html = r#"
            <a class="result-link" href="https://example.com">Example</a>
            <td class="result-snippet">A sample site</td>
        "#;
        let results = parse_duck_duck_go_results(html, 5);
        assert_eq!(results.len(), 1);
        assert_eq!(results[0].title, "Example");
        assert_eq!(results[0].url, "https://example.com");
        assert_eq!(results[0].snippet, "A sample site");
    }

    #[test]
    fn test_parse_duck_duck_go_results_max_results() {
        let html = r#"
            <a class="result-link" href="https://a.com">A</a>
            <td class="result-snippet">Snippet A</td>
            <a class="result-link" href="https://b.com">B</a>
            <td class="result-snippet">Snippet B</td>
            <a class="result-link" href="https://c.com">C</a>
            <td class="result-snippet">Snippet C</td>
        "#;
        let results = parse_duck_duck_go_results(html, 2);
        assert_eq!(results.len(), 2);
    }

    #[test]
    fn test_parse_duck_duck_go_results_protocol_relative() {
        let html = r#"
            <a class="result-link" href="//example.com">Example</a>
            <td class="result-snippet">Snippet</td>
        "#;
        let results = parse_duck_duck_go_results(html, 5);
        assert_eq!(results[0].url, "https://example.com");
    }

    #[test]
    fn test_parse_duck_duck_go_results_missing_protocol() {
        let html = r#"
            <a class="result-link" href="example.com">Example</a>
            <td class="result-snippet">Snippet</td>
        "#;
        let results = parse_duck_duck_go_results(html, 5);
        assert_eq!(results[0].url, "https://example.com");
    }
}
