use browser::Browser;
use clap::Parser;
use std::path::PathBuf;

#[derive(Parser)]
#[command(name = "mybrowser")]
#[command(about = "A lightweight browser runtime")]
struct Cli {
    /// URL to load
    url: Option<String>,

    /// Run in headless mode
    #[arg(long)]
    headless: bool,

    /// Take a screenshot
    #[arg(long)]
    screenshot: bool,

    /// Output file for screenshot
    #[arg(long)]
    output: Option<PathBuf>,

    /// Viewport width
    #[arg(long, default_value = "800")]
    width: u32,

    /// Viewport height
    #[arg(long, default_value = "600")]
    height: u32,

    /// Dump DOM tree
    #[arg(long)]
    dump_dom: bool,

    /// Dump layout tree
    #[arg(long)]
    dump_layout: bool,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();

    let html = if let Some(ref url) = cli.url {
        if url.starts_with("http://") || url.starts_with("https://") {
            eprintln!("Network fetching not yet implemented. Please provide an HTML file.");
            std::process::exit(1);
        }
        std::fs::read_to_string(url)?
    } else {
        eprintln!("No URL provided. Usage: mybrowser <file.html>");
        std::process::exit(1);
    };

    let mut browser = Browser::new();
    browser.set_viewport(cli.width, cli.height);
    browser.load_html(&html);
    browser.build_layout();
    browser.build_display_list();

    if cli.dump_dom {
        if let Some(dom) = browser.dom() {
            println!("{}", dom);
        }
    }

    if cli.dump_layout {
        println!("Layout boxes: {:?}", browser.display_list().commands.len());
    }

    if cli.screenshot || cli.headless {
        let output = cli
            .output
            .unwrap_or_else(|| PathBuf::from("screenshot.png"));
        browser.render_to_image(output.to_str().unwrap())?;
        eprintln!("Screenshot saved to {}", output.display());
    } else {
        eprintln!("GUI mode not yet implemented. Use --headless or --screenshot.");
    }

    Ok(())
}
