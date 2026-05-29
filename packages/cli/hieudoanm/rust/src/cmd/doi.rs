pub fn command() -> clap::Command {
    clap::Command::new("doi")
        .about("DOI related tools")
        .subcommand(
            clap::Command::new("cite")
                .about("Cite a DOI")
                .arg(clap::Arg::new("doi").help("DOI to cite").required(true)),
        )
        .subcommand(
            clap::Command::new("ref")
                .about("Get reference from DOI")
                .arg(clap::Arg::new("doi").help("DOI to reference").required(true)),
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
        _ => {}
    }
    Ok(())
}
