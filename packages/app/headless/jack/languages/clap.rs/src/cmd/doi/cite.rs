use crate::cmd::doi::service;

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let doi = matches
        .get_one::<String>("doi")
        .ok_or_else(|| anyhow::anyhow!("doi required"))?;
    let url = format!("https://api.crossref.org/works/{}", doi);
    let resp = reqwest::get(&url).await?.error_for_status()?;
    let data: service::CrossRefData = resp.json().await?;
    service::print_citation(&data);
    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_module_compiles() {
        assert!(true);
    }
}
