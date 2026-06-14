use std::io::{self, Write};
use std::path::Path;

pub async fn run() -> anyhow::Result<()> {
    print!("URL: ");
    io::stdout().flush()?;
    let mut url = String::new();
    io::stdin().read_line(&mut url)?;
    let url = url.trim().to_string();

    let code = qrcode::QrCode::new(url.as_bytes())?;
    let image = code.render::<qrcode::render::svg::Color>().build();
    let out_path = Path::new("qrcode.svg");
    std::fs::write(out_path, image)?;
    println!("QR code saved to: {}", out_path.display());
    Ok(())
}
