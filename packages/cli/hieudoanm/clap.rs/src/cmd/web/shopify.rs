pub fn command() -> clap::Command {
    clap::Command::new("shopify")
        .about("Shopify tools")
        .subcommand(
            clap::Command::new("detect")
                .about("Detect if a URL is a Shopify store")
                .arg(clap::Arg::new("url").help("URL to check").required(true)),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some(("detect", m)) = matches.subcommand() {
        let url = m
            .get_one::<String>("url")
            .ok_or_else(|| anyhow::anyhow!("url required"))?;
        let result = super::service::check_shopify(url)?;
        if result.is_shopify {
            println!("✅ {url} IS a Shopify store");
            if result.is_plus {
                println!("   Shopify Plus: yes");
            }
            if !result.signals.is_empty() {
                println!("   Signals: {}", result.signals.join(", "));
            }
        } else {
            println!("❌ {url} is NOT a Shopify store");
        }
    }
    Ok(())
}
