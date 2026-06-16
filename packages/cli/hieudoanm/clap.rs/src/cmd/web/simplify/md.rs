use std::path::Path;

pub fn command() -> clap::Command {
    clap::Command::new("md")
        .about("Convert webpage to markdown")
        .arg(
            clap::Arg::new("url")
                .short('u')
                .long("url")
                .help("URL to fetch")
                .required(true),
        )
        .arg(
            clap::Arg::new("out")
                .short('o')
                .long("out")
                .help("Output directory (default .)"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let url = matches
        .get_one::<String>("url")
        .ok_or_else(|| anyhow::anyhow!("url required"))?;
    let out = matches
        .get_one::<String>("out")
        .cloned()
        .unwrap_or_else(|| ".".to_string());

    let html = fetch_page(url)?;
    let document = scraper::Html::parse_document(&html);

    let title = extract_title(&document);
    let host = extract_host(url);

    let body_sel = scraper::Selector::parse("body").unwrap();
    let body_text = if let Some(body) = document.select(&body_sel).next() {
        html_to_markdown(&body.inner_html())
    } else {
        html_to_markdown(&html)
    };

    let mut output = String::new();
    if !title.is_empty() {
        output.push_str(&format!("# {}\n\n", title));
    }
    output.push_str(&body_text);

    let filename = format!("{}.md", host);
    let path = Path::new(&out).join(&filename);
    std::fs::create_dir_all(out)?;
    std::fs::write(&path, &output)?;
    println!("{}", path.canonicalize()?.display());

    Ok(())
}

fn fetch_page(url: &str) -> anyhow::Result<String> {
    let resp = reqwest::blocking::get(url).map_err(|e| anyhow::anyhow!("fetch {url}: {e}"))?;
    Ok(resp.text()?)
}

fn extract_title(document: &scraper::Html) -> String {
    let sel = scraper::Selector::parse("title").unwrap();
    document
        .select(&sel)
        .next()
        .map(|e| e.text().collect::<String>().trim().to_string())
        .unwrap_or_default()
}

fn extract_host(raw_url: &str) -> String {
    if let Ok(parsed) = url::Url::parse(raw_url) {
        let host = parsed.host_str().unwrap_or("output");
        host.trim_start_matches("www.").replace('.', "_")
    } else {
        "output".to_string()
    }
}

fn html_to_markdown(html: &str) -> String {
    let doc = scraper::Html::parse_fragment(html);
    let mut result = String::new();
    convert_node(&doc.root_element(), &mut result);
    result.trim().to_string()
}

fn convert_node(node: &scraper::ElementRef, output: &mut String) {
    for child in node.child_elements() {
        match child.value().name() {
            "h1" | "h2" | "h3" | "h4" | "h5" | "h6" => {
                let level = child
                    .value()
                    .name()
                    .chars()
                    .nth(1)
                    .unwrap()
                    .to_digit(10)
                    .unwrap_or(1) as usize;
                let prefix = "#".repeat(level);
                let text = child.text().collect::<String>().trim().to_string();
                output.push_str(&format!("{} {}\n\n", prefix, text));
            }
            "p" => {
                let text = child.text().collect::<String>().trim().to_string();
                if !text.is_empty() {
                    output.push_str(&format!("{}\n\n", text));
                }
            }
            "hr" => output.push_str("---\n\n"),
            "blockquote" => {
                for line in child.text().collect::<String>().lines() {
                    output.push_str(&format!("> {}\n", line.trim()));
                }
                output.push('\n');
            }
            "ul" => {
                for li in child.child_elements() {
                    let text = li.text().collect::<String>().trim().to_string();
                    if !text.is_empty() {
                        output.push_str(&format!("- {}\n", text));
                    }
                }
                output.push('\n');
            }
            "ol" => {
                for (i, li) in child.child_elements().enumerate() {
                    let text = li.text().collect::<String>().trim().to_string();
                    if !text.is_empty() {
                        output.push_str(&format!("{}. {}\n", i + 1, text));
                    }
                }
                output.push('\n');
            }
            "pre" => {
                let code = child.text().collect::<String>().trim().to_string();
                output.push_str(&format!("```\n{}\n```\n\n", code));
            }
            "code" => {
                let text = child.text().collect::<String>().trim().to_string();
                output.push_str(&format!("`{}` ", text));
            }
            "a" => {
                let href = child.value().attr("href").unwrap_or("");
                let text = child.text().collect::<String>().trim().to_string();
                if !href.is_empty() && !text.is_empty() {
                    output.push_str(&format!("[{}]({}) ", text, href));
                } else {
                    output.push_str(&format!("{} ", text));
                }
            }
            "img" => {
                let src = child.value().attr("src").unwrap_or("");
                let alt = child.value().attr("alt").unwrap_or("");
                output.push_str(&format!("![{}]({}) ", alt, src));
            }
            "br" => output.push('\n'),
            "table" => output.push_str(&convert_table(&child)),
            "tr" | "td" | "th" | "thead" | "tbody" | "tfoot" | "div" | "section" | "article"
            | "main" | "span" => {
                convert_node(&child, output);
            }
            _ => {
                let text = child.text().collect::<String>().trim().to_string();
                if !text.is_empty() {
                    output.push_str(&format!("{} ", text));
                }
            }
        }
    }
}

fn convert_table(table: &scraper::ElementRef) -> String {
    let mut out = String::new();
    let tr_sel = scraper::Selector::parse("tr").unwrap();
    let cell_sel = scraper::Selector::parse("td, th").unwrap();
    let rows: Vec<Vec<String>> = table
        .select(&tr_sel)
        .map(|tr| {
            tr.select(&cell_sel)
                .map(|cell| cell.text().collect::<String>().trim().to_string())
                .collect()
        })
        .filter(|row: &Vec<String>| !row.is_empty())
        .collect();

    if rows.is_empty() {
        return out;
    }

    let col_count = rows.iter().map(|r| r.len()).max().unwrap_or(0);
    if col_count == 0 {
        return out;
    }

    // Header
    out.push('|');
    for cell in &rows[0] {
        out.push_str(&format!(" {} |", cell));
    }
    out.push('\n');

    // Separator
    out.push('|');
    for _ in 0..col_count {
        out.push_str(" --- |");
    }
    out.push('\n');

    // Body
    for row in &rows[1..] {
        out.push('|');
        for cell in row {
            out.push_str(&format!(" {} |", cell));
        }
        out.push('\n');
    }

    out.push('\n');
    out
}
