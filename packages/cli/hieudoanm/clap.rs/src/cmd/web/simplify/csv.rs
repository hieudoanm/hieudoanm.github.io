use std::path::Path;

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

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let url = matches
        .get_one::<String>("url")
        .ok_or_else(|| anyhow::anyhow!("url required"))?;
    let out = matches
        .get_one::<String>("out")
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
