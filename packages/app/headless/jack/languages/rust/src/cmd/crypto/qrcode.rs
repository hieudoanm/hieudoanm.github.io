use std::io::Write;
use std::path::Path;

#[derive(clap::Args)]
pub struct Args;

pub fn command() -> clap::Command {
    clap::Command::new("qrcode").about("Generate a QR code")
}

pub async fn run(_matches: &Args) -> anyhow::Result<()> {
    print!("URL: ");
    std::io::stdout().flush()?;
    let mut url = String::new();
    std::io::stdin().read_line(&mut url)?;
    let url = url.trim().to_string();

    let svg = generate_qr_svg(&url)?;
    let out_path = Path::new("qrcode.svg");
    std::fs::write(out_path, svg)?;
    println!("QR code saved to: {}", out_path.display());
    Ok(())
}

fn generate_qr_svg(data: &str) -> anyhow::Result<String> {
    let code = qrcode::QrCode::new(data.as_bytes())?;
    let image = code.render::<qrcode::render::svg::Color>().build();
    Ok(image)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[test]
    fn test_generate_qr_svg_returns_svg_document() {
        let svg = generate_qr_svg("https://example.com").unwrap();
        assert!(svg.starts_with("<?xml") || svg.starts_with("<svg"));
        assert!(svg.contains("</svg>"));
    }

    #[test]
    fn test_generate_qr_svg_short_url() {
        let svg = generate_qr_svg("https://hieudoanm.github.io").unwrap();
        assert!(svg.contains("<svg"));
        assert!(svg.contains("</svg>"));
    }

    #[test]
    fn test_generate_qr_svg_empty_string() {
        let svg = generate_qr_svg("").unwrap();
        assert!(svg.contains("<svg"));
    }

    #[test]
    fn test_generate_qr_svg_long_url() {
        let long = "https://example.com/".repeat(20);
        let svg = generate_qr_svg(&long).unwrap();
        assert!(svg.contains("<svg"));
    }

    #[test]
    fn test_generate_qr_svg_contains_rect_elements() {
        let svg = generate_qr_svg("https://example.com").unwrap();
        assert!(svg.contains("<rect "));
    }
}
