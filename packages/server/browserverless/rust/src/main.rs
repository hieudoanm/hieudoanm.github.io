mod browser;

use browser::Browser;
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
}

#[tokio::main]
async fn main() {
    env_logger::init();
    let args = Args::parse();

    let mut browser = match Browser::new(&args.url) {
        Ok(b) => b,
        Err(e) => {
            eprintln!("Internal error: {}", e);
            process::exit(5);
        }
    };

    if let Err(e) = browser.fetch(&args.url, args.wait).await {
        let msg = e.to_string();
        if msg.contains("Timeout") {
            eprintln!("Timeout: {}", msg);
            process::exit(4);
        }
        eprintln!("Network error: {}", msg);
        process::exit(2);
    }

    let output_html = match browser.serialize() {
        Ok(h) => h,
        Err(e) => {
            eprintln!("Internal error: {}", e);
            process::exit(5);
        }
    };

    print!("{}", output_html);
}
