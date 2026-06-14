pub fn command() -> clap::Command {
    clap::Command::new("doi")
        .about("DOI productivity tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("cite")
                .about("Cite a DOI")
                .arg(clap::Arg::new("doi").help("DOI to cite").required(true)),
        )
        .subcommand(
            clap::Command::new("ref")
                .about("Get reference from DOI")
                .arg(
                    clap::Arg::new("doi")
                        .help("DOI to reference")
                        .required(true),
                ),
        )
        .subcommand(
            clap::Command::new("fetch")
                .about("Fetch DOI metadata")
                .arg(clap::Arg::new("doi").help("DOI to fetch").required(true)),
        )
        .subcommand(
            clap::Command::new("validate")
                .about("Validate a DOI")
                .arg(clap::Arg::new("doi").help("DOI to validate").required(true)),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    use crate::services::apa;

    match matches.subcommand() {
        Some(("cite", sub_m)) => {
            let doi = sub_m
                .get_one::<String>("doi")
                .ok_or_else(|| anyhow::anyhow!("doi required"))?;
            let url = format!("https://api.crossref.org/works/{}", doi);
            let resp = reqwest::get(&url).await?.error_for_status()?;
            let data: apa::CrossRefData = resp.json().await?;
            apa::print_citation(&data);
        }
        Some(("ref", sub_m)) => {
            let doi = sub_m
                .get_one::<String>("doi")
                .ok_or_else(|| anyhow::anyhow!("doi required"))?;
            let url = format!("https://api.crossref.org/works/{}", doi);
            let resp = reqwest::get(&url).await?.error_for_status()?;
            let data: apa::CrossRefData = resp.json().await?;
            apa::print_reference(&data);
        }
        Some(("fetch", sub_m)) => {
            let doi = sub_m
                .get_one::<String>("doi")
                .ok_or_else(|| anyhow::anyhow!("doi required"))?;
            let url = format!("https://api.crossref.org/works/{}", doi);
            let resp = reqwest::get(&url).await?.error_for_status()?;
            let data: serde_json::Value = resp.json().await?;
            println!("{}", serde_json::to_string_pretty(&data)?);
        }
        Some(("validate", sub_m)) => {
            let doi = sub_m
                .get_one::<String>("doi")
                .ok_or_else(|| anyhow::anyhow!("doi required"))?;
            let url = format!("https://api.crossref.org/works/{}", doi);
            match reqwest::get(&url).await {
                Ok(resp) => {
                    if resp.status().is_success() {
                        println!("✅ {doi} is valid");
                    } else {
                        println!("❌ {doi} is not valid (status: {})", resp.status());
                    }
                }
                Err(e) => {
                    println!("❌ {doi} validation failed: {e}");
                }
            }
        }
        _ => {}
    }
    Ok(())
}
