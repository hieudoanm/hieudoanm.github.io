use std::path::Path;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_host_normal() {
        assert_eq!(extract_host("https://www.example.com/page"), "example_com");
    }

    #[test]
    fn test_extract_host_no_subdomain() {
        assert_eq!(extract_host("https://github.com"), "github_com");
    }

    #[test]
    fn test_extract_host_invalid_url() {
        assert_eq!(extract_host("not a url"), "output");
    }

    #[test]
    fn test_extract_host_empty() {
        assert_eq!(extract_host(""), "output");
    }

    #[test]
    fn test_parse_tables_no_tables() {
        let result = parse_tables("<html><body>no table here</body></html>");
        assert!(result.is_empty());
    }

    #[test]
    fn test_parse_tables_simple() {
        let html = r#"<table><tr><td>a</td><td>b</td></tr><tr><td>1</td><td>2</td></tr></table>"#;
        let tables = parse_tables(html);
        assert_eq!(tables.len(), 1);
        assert_eq!(tables[0].len(), 2);
        assert_eq!(tables[0][0], vec!["a", "b"]);
        assert_eq!(tables[0][1], vec!["1", "2"]);
    }

    #[test]
    fn test_parse_tables_uses_th() {
        let html = r#"<table><tr><th>Name</th><th>Age</th></tr><tr><td>Alice</td><td>30</td></tr></table>"#;
        let tables = parse_tables(html);
        assert_eq!(tables[0][0], vec!["Name", "Age"]);
    }

    #[test]
    fn test_parse_tables_multiple_tables() {
        let html = r#"<table><tr><td>T1</td></tr></table><table><tr><td>T2</td></tr></table>"#;
        let tables = parse_tables(html);
        assert_eq!(tables.len(), 2);
    }

    #[test]
    fn test_parse_tables_empty_rows_skipped() {
        let html = r#"<table><tr><td>data</td></tr><tr></tr></table>"#;
        let tables = parse_tables(html);
        assert_eq!(tables[0].len(), 1);
    }
}

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'u', long = "url", help = "URL to fetch")]
    pub url: String,
    #[arg(short = 'o', long = "out", help = "Output directory (default .)")]
    pub out: Option<String>,
}

pub fn command() -> clap::Command {
    clap::Command::new("csv")
        .about("Extract HTML tables to CSV")
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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let url = Some(&matches.url).ok_or_else(|| anyhow::anyhow!("url required"))?;
    let out = matches
        .out
        .as_ref()
        .cloned()
        .unwrap_or_else(|| ".".to_string());

    let html = fetch_page(url)?;
    let tables = parse_tables(&html);

    if tables.is_empty() {
        println!("no tables found");
        return Ok(());
    }

    let host = extract_host(url);
    std::fs::create_dir_all(&out)?;

    for (i, table) in tables.iter().enumerate() {
        let filename = if tables.len() == 1 {
            format!("{}.csv", host)
        } else {
            format!("{}-table-{}.csv", host, i + 1)
        };
        let path = Path::new(&out).join(&filename);

        let mut wtr = csv::Writer::from_path(&path)?;
        for row in table {
            wtr.write_record(row)?;
        }
        wtr.flush()?;

        println!("{}", path.canonicalize()?.display());
    }

    Ok(())
}

fn fetch_page(url: &str) -> anyhow::Result<String> {
    let resp = reqwest::blocking::get(url).map_err(|e| anyhow::anyhow!("fetch {url}: {e}"))?;
    Ok(resp.text()?)
}

fn parse_tables(html: &str) -> Vec<Vec<Vec<String>>> {
    let document = scraper::Html::parse_document(html);
    let table_sel = scraper::Selector::parse("table").unwrap();
    let tr_sel = scraper::Selector::parse("tr").unwrap();
    let cell_sel = scraper::Selector::parse("td, th").unwrap();

    let mut tables = Vec::new();
    for table in document.select(&table_sel) {
        let mut rows = Vec::new();
        for tr in table.select(&tr_sel) {
            let row: Vec<String> = tr
                .select(&cell_sel)
                .map(|cell| cell.text().collect::<String>().trim().to_string())
                .collect();
            if !row.is_empty() {
                rows.push(row);
            }
        }
        if !rows.is_empty() {
            tables.push(rows);
        }
    }
    tables
}

fn extract_host(raw_url: &str) -> String {
    if let Ok(parsed) = url::Url::parse(raw_url) {
        let host = parsed.host_str().unwrap_or("output");
        host.trim_start_matches("www.").replace('.', "_")
    } else {
        "output".to_string()
    }
}
