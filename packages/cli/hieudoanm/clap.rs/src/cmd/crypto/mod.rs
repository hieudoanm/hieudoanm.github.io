use std::io::{self, Write};
use std::path::Path;

pub fn command() -> clap::Command {
    clap::Command::new("crypto")
        .about("Cryptographic and security tools")
        .subcommand_required(true)
        .subcommand(clap::Command::new("hash").about("Hash a string"))
        .subcommand(clap::Command::new("uuid").about("Generate a UUID"))
        .subcommand(clap::Command::new("qrcode").about("Generate a QR code"))
        .subcommand(clap::Command::new("passwd").about("Generate a password"))
        .subcommand(clap::Command::new("jwt").about("JWT encode/decode"))
        .subcommand(clap::Command::new("keygen").about("Generate cryptographic keys"))
        .subcommand(clap::Command::new("encrypt").about("Encrypt data"))
        .subcommand(clap::Command::new("decrypt").about("Decrypt data"))
        .subcommand(clap::Command::new("totp").about("TOTP code generator"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("uuid", _m)) => {
            let id = uuid::Uuid::new_v4();
            println!("{id}");
        }
        Some(("qrcode", _m)) => {
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
        }
        Some(("hash", _m)) => {
            println!("crypto hash (not yet implemented)");
        }
        Some(("passwd", _m)) => {
            println!("crypto passwd (not yet implemented)");
        }
        Some(("jwt", _m)) => {
            println!("crypto jwt (not yet implemented)");
        }
        Some(("keygen", _m)) => {
            println!("crypto keygen (not yet implemented)");
        }
        Some(("encrypt", _m)) => {
            println!("crypto encrypt (not yet implemented)");
        }
        Some(("decrypt", _m)) => {
            println!("crypto decrypt (not yet implemented)");
        }
        Some(("totp", _m)) => {
            println!("crypto totp (not yet implemented)");
        }
        _ => {}
    }
    Ok(())
}
