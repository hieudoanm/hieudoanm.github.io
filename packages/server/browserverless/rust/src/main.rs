mod browser;

use anyhow::Result;
use browser::Browser;
use clap::Parser;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// URL to fetch
    url: String,
}

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    let args = Args::parse();

    let mut browser = Browser::new()?;
    browser.fetch(&args.url).await?;

    let output_html = browser.serialize()?;
    println!("{}", output_html);

    Ok(())
}
