use crate::cmd::doi::service;

pub async fn run_ref(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let doi = matches
        .get_one::<String>("doi")
        .ok_or_else(|| anyhow::anyhow!("doi required"))?;
    let url = format!("https://api.crossref.org/works/{}", doi);
    let resp = reqwest::get(&url).await?.error_for_status()?;
    let data: service::CrossRefData = resp.json().await?;
    service::print_reference(&data);
    Ok(())
}

pub async fn run_fetch(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let doi = matches
        .get_one::<String>("doi")
        .ok_or_else(|| anyhow::anyhow!("doi required"))?;
    let url = format!("https://api.crossref.org/works/{}", doi);
    let resp = reqwest::get(&url).await?.error_for_status()?;
    let data: serde_json::Value = resp.json().await?;
    println!("{}", serde_json::to_string_pretty(&data)?);
    Ok(())
}

pub async fn run_validate(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let doi = matches
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
    Ok(())
}
