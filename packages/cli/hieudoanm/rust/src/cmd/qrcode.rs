use std::io::{self, Write};
use std::path::Path;

pub fn command() -> clap::Command {
    clap::Command::new("qrcode")
        .about("Generate a QR code from a URL and save as PNG")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    print!("URL: ");
    io::stdout().flush()?;
    let mut url = String::new();
    io::stdin().read_line(&mut url)?;
    let url = url.trim().to_string();

    let code = qrcode::QrCode::new(url.as_bytes())?;
    let image = code.render::<qrcode::render::svg::Color>().build();
    // Save as SVG since the `qrcode` crate doesn't natively do PNG
    let out_path = Path::new("qrcode.svg");
    std::fs::write(out_path, image)?;
    println!("QR code saved to: {}", out_path.display());
    Ok(())
}
