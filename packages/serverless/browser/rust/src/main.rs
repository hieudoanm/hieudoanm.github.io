mod browser;

use browser::{Browser, WaitOptions};
use clap::Parser;
use std::process;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// URL to fetch
    url: String,

    /// Additional milliseconds to wait after page idle for lazy content
    #[arg(short, long, default_value = "0")]
    wait: u64,

    /// Wait for a CSS selector to appear in the DOM (e.g. ".content", "#app")
    #[arg(long)]
    wait_selector: Option<String>,

    /// Wait for a JS expression to return truthy (e.g. "document.querySelectorAll('img').length > 10")
    #[arg(long)]
    wait_script: Option<String>,

    /// Timeout in milliseconds for --wait-selector and --wait-script (default: 30000)
    #[arg(long, default_value = "30000")]
    wait_timeout: u64,
}

#[tokio::main]
async fn main() {
    env_logger::init();
    let args = Args::parse();

    eprintln!("🚀 Browserverless starting...");
    eprintln!("🌐 Fetching: {}", args.url);

    let mut browser = match Browser::new(&args.url) {
        Ok(b) => b,
        Err(e) => {
            eprintln!("💥 Internal error: {}", e);
            process::exit(5);
        }
    };

    let wait_opts = WaitOptions {
        wait_ms: args.wait,
        wait_selector: args.wait_selector,
        wait_script: args.wait_script,
        wait_timeout: args.wait_timeout,
    };

    if let Err(e) = browser.fetch(&args.url, &wait_opts).await {
        let msg = e.to_string();
        if msg.contains("Timeout") {
            eprintln!("⏰ Timeout: {}", msg);
            process::exit(4);
        }
        eprintln!("🌐 Network error: {}", msg);
        process::exit(2);
    }

    eprintln!("✅ Page loaded");

    let output_html = match browser.serialize() {
        Ok(h) => h,
        Err(e) => {
            eprintln!("💥 Internal error: {}", e);
            process::exit(5);
        }
    };

    eprintln!("📄 Output size: {} bytes", output_html.len());
    print!("{}", output_html);
}
