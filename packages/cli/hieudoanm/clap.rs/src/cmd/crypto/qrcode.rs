use std::io::Write;
use std::path::Path;

pub fn command() -> clap::Command {
    clap::Command::new("qrcode").about("Generate a QR code")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    print!("URL: ");
    std::io::stdout().flush()?;
    let mut url = String::new();
    std::io::stdin().read_line(&mut url)?;
    let url = url.trim().to_string();

    let code = qrcode::QrCode::new(url.as_bytes())?;
    let image = code.render::<qrcode::render::svg::Color>().build();
    let out_path = Path::new("qrcode.svg");
    std::fs::write(out_path, image)?;
    println!("QR code saved to: {}", out_path.display());
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
