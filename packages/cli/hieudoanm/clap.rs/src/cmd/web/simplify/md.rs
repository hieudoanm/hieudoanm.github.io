use std::path::Path;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_host_normal() {
        assert_eq!(extract_host("https://www.example.com/page"), "example_com");
    }

    #[test]
    fn test_extract_host_invalid() {
        assert_eq!(extract_host("not a url"), "output");
    }

    #[test]
    fn test_extract_title_present() {
        let doc = scraper::Html::parse_document(
            "<html><head><title>My Page</title></head><body></body></html>",
        );
        assert_eq!(extract_title(&doc), "My Page");
    }

    #[test]
    fn test_extract_title_trimmed() {
        let doc = scraper::Html::parse_document(
            "<html><head><title>  Spaced Title  </title></head></html>",
        );
        assert_eq!(extract_title(&doc), "Spaced Title");
    }

    #[test]
    fn test_extract_title_missing() {
        let doc = scraper::Html::parse_document("<html><head></head></html>");
        assert_eq!(extract_title(&doc), "");
    }

    #[test]
    fn test_html_to_markdown_heading() {
        let md = html_to_markdown("<h1>Title</h1>");
        assert_eq!(md, "# Title");
    }

    #[test]
    fn test_html_to_markdown_paragraph() {
        let md = html_to_markdown("<p>Hello world</p>");
        assert_eq!(md, "Hello world");
    }

    #[test]
    fn test_html_to_markdown_bold() {
        let md = html_to_markdown("<p><b>bold</b> text</p>");
        assert_eq!(md, "bold text");
    }

    #[test]
    fn test_html_to_markdown_link() {
        let md = html_to_markdown("<p><a href=\"https://example.com\">click</a></p>");
        assert_eq!(md, "click");
    }

    #[test]
    fn test_html_to_markdown_image() {
        let md = html_to_markdown("<p><img src=\"https://example.com/img.png\" alt=\"pic\"></p>");
        assert_eq!(md, "");
    }

    #[test]
    fn test_html_to_markdown_unordered_list() {
        let md = html_to_markdown("<ul><li>Item 1</li><li>Item 2</li></ul>");
        assert_eq!(md, "- Item 1\n- Item 2");
    }

    #[test]
    fn test_html_to_markdown_ordered_list() {
        let md = html_to_markdown("<ol><li>First</li><li>Second</li></ol>");
        assert_eq!(md, "1. First\n2. Second");
    }

    #[test]
    fn test_html_to_markdown_code_block() {
        let md = html_to_markdown("<pre><code>fn main() {}</code></pre>");
        assert_eq!(md, "```\nfn main() {}\n```");
    }

    #[test]
    fn test_html_to_markdown_inline_code() {
        let md = html_to_markdown("<p>Use <code>cargo build</code> to compile</p>");
        assert_eq!(md, "Use cargo build to compile");
    }

    #[test]
    fn test_html_to_markdown_blockquote() {
        let md = html_to_markdown("<blockquote>A wise quote</blockquote>");
        assert_eq!(md, "> A wise quote");
    }

    #[test]
    fn test_html_to_markdown_hr() {
        let md = html_to_markdown("<hr>");
        assert_eq!(md, "---");
    }

    #[test]
    fn test_html_to_markdown_table() {
        let md = html_to_markdown(
            "<table><tr><th>Name</th><th>Age</th></tr><tr><td>Alice</td><td>30</td></tr></table>",
        );
        assert!(md.contains("| Name | Age |"));
        assert!(md.contains("| --- | --- |"));
        assert!(md.contains("| Alice | 30 |"));
    }

    #[test]
    fn test_html_to_markdown_br() {
        let md = html_to_markdown("<p>line1<br>line2</p>");
        assert_eq!(md, "line1line2");
    }

    #[test]
    fn test_html_to_markdown_empty() {
        let md = html_to_markdown("");
        assert_eq!(md, "");
    }

    #[test]
    fn test_html_to_markdown_nested_heading() {
        let md = html_to_markdown("<div><h2>Subtitle</h2><p>Content</p></div>");
        assert_eq!(md, "## Subtitle\n\nContent");
    }

    #[test]
    fn test_html_to_markdown_sub_heading() {
        let md = html_to_markdown("<h3>Section</h3>");
        assert_eq!(md, "### Section");
    }

    #[test]
    fn test_convert_table_empty() {
        let doc = scraper::Html::parse_fragment("<table></table>");
        let table = doc.root_element();
        assert_eq!(convert_table(&table), "");
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[test]
    fn test_extract_host_with_port() {
        assert_eq!(extract_host("https://example.com:8080/page"), "example_com");
    }

    #[test]
    fn test_extract_host_www() {
        assert_eq!(extract_host("https://www.example.com"), "example_com");
    }

    #[test]
    fn test_convert_node_span() {
        assert_eq!(html_to_markdown("<span><b>text</b></span>"), "text");
    }

    #[test]
    fn test_convert_node_default_branch() {
        assert_eq!(
            html_to_markdown(
                "<div><main><article><section><b>content</b></section></article></main></div>"
            ),
            "content"
        );
    }

    #[test]
    fn test_convert_node_a_without_href() {
        assert_eq!(html_to_markdown("<a>click</a>"), "click");
    }

    #[test]
    fn test_convert_node_a_empty_text() {
        assert_eq!(
            html_to_markdown(r#"<a href="https://example.com"></a>"#),
            ""
        );
    }

    #[test]
    fn test_convert_table_multi_column() {
        let md = html_to_markdown(
            "<table><tr><th>A</th><th>B</th><th>C</th></tr><tr><td>1</td><td>2</td><td>3</td></tr></table>",
        );
        assert!(md.contains("| A | B | C |"));
        assert!(md.contains("| 1 | 2 | 3 |"));
    }

    #[test]
    fn test_convert_table_empty_rows_filtered() {
        let md = html_to_markdown("<table><tr></tr></table>");
        assert_eq!(md, "");
    }

    #[test]
    fn test_convert_node_container_div() {
        let md = html_to_markdown("<div><p>hello</p><p>world</p></div>");
        assert_eq!(md, "hello\n\nworld");
    }
}

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
