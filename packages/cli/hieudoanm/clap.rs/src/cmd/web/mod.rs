pub fn command() -> clap::Command {
    clap::Command::new("web")
        .about("Web service tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("youtube")
                .about("YouTube tools")
                .subcommand(
                    clap::Command::new("fetch")
                        .about("Fetch YouTube video info")
                        .arg(clap::Arg::new("url").help("Video URL or ID").required(true)),
                )
                .subcommand(clap::Command::new("thumbnails").about("Get YouTube thumbnail URLs")),
        )
        .subcommand(
            clap::Command::new("instagram")
                .about("Instagram tools")
                .subcommand(clap::Command::new("download").about("Download Instagram content")),
        )
        .subcommand(
            clap::Command::new("shopify")
                .about("Shopify tools")
                .subcommand(
                    clap::Command::new("detect")
                        .about("Detect if a URL is a Shopify store")
                        .arg(clap::Arg::new("url").help("URL to check").required(true)),
                ),
        )
        .subcommand(
            clap::Command::new("snapshot")
                .about("Take a browser screenshot")
                .arg(clap::Arg::new("url").help("URL to capture").required(true))
                .arg(
                    clap::Arg::new("output")
                        .short('o')
                        .long("output")
                        .help("Output file path"),
                ),
        )
        .subcommand(clap::Command::new("weather").about("Get weather for a location"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("youtube", sub_m)) => match sub_m.subcommand() {
            Some(("fetch", _m)) => println!("web youtube fetch (not yet implemented)"),
            Some(("thumbnails", _m)) => println!("web youtube thumbnails (not yet implemented)"),
            _ => {}
        },
        Some(("instagram", sub_m)) => {
            if let Some(("download", _m)) = sub_m.subcommand() {
                println!("web instagram download (not yet implemented)");
            }
        }
        Some(("shopify", sub_m)) => {
            if let Some(("detect", m)) = sub_m.subcommand() {
                let url = m
                    .get_one::<String>("url")
                    .ok_or_else(|| anyhow::anyhow!("url required"))?;
                let result = crate::services::shopify::check_shopify(url)?;
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
        }
        Some(("snapshot", m)) => {
            let _url = m.get_one::<String>("url").unwrap();
            anyhow::bail!(
                "snapshot requires the `headless_chrome` crate which is not yet integrated"
            );
        }
        Some((name, _m)) => {
            println!("web {name} (not yet implemented)");
        }
        _ => {}
    }
    Ok(())
}
