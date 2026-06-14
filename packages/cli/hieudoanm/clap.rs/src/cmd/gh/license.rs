use anyhow::Context;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct License {
    key: String,
    name: String,
    spdx_id: String,
    url: String,
    body: String,
}

fn fetch_licenses() -> anyhow::Result<Vec<License>> {
    let client = reqwest::blocking::Client::new();
    let resp = client
        .get("https://api.github.com/licenses")
        .header("Accept", "application/json")
        .header("User-Agent", "hieudoanm-cli")
        .send()
        .context("error fetching licenses")?;
    let licenses: Vec<License> = resp.json().context("error parsing response")?;
    Ok(licenses)
}

fn fetch_license(spdx_id: &str) -> anyhow::Result<License> {
    let url = format!("https://api.github.com/licenses/{spdx_id}");
    let client = reqwest::blocking::Client::new();
    let resp = client
        .get(&url)
        .header("Accept", "application/json")
        .header("User-Agent", "hieudoanm-cli")
        .send()
        .context("error fetching license")?;
    let lic: License = resp.json().context("error parsing response")?;
    Ok(lic)
}

pub fn command() -> clap::Command {
    clap::Command::new("license")
        .about("Fetch a license template from GitHub")
        .arg(
            clap::Arg::new("spdx-id")
                .long("spdx-id")
                .help("SPDX license identifier (skip prompt)"),
        )
        .arg(
            clap::Arg::new("output")
                .short('o')
                .long("output")
                .help("Output file path")
                .default_value("LICENSE"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let spdx_id = matches.get_one::<String>("spdx-id");
    let output = matches.get_one::<String>("output").unwrap();

    let selected = if let Some(sid) = spdx_id {
        sid.clone()
    } else {
        let licenses = fetch_licenses()?;
        let spdx_ids: Vec<&str> = licenses.iter().map(|l| l.spdx_id.as_str()).collect();
        if spdx_ids.is_empty() {
            anyhow::bail!("no licenses available");
        }
        println!("Available licenses:");
        for (i, sid) in spdx_ids.iter().enumerate() {
            println!("  {}. {sid}", i + 1);
        }
        print!("Select license by SPDX ID: ");
        std::io::Write::flush(&mut std::io::stdout())?;
        let mut input = String::new();
        std::io::stdin().read_line(&mut input)?;
        input.trim().to_string()
    };

    let lic = fetch_license(&selected)?;
    std::fs::write(output, &lic.body).context("error writing file")?;
    println!("Written {} ({}) to {output}", lic.name, lic.spdx_id);
    Ok(())
}
