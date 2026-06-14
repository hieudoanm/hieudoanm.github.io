mod qrcode;
mod stub;
mod uuid;

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
        Some(("uuid", _m)) => uuid::run().await,
        Some(("qrcode", _m)) => qrcode::run().await?,
        Some(("hash", _m)) => stub::run_hash().await,
        Some(("passwd", _m)) => stub::run_passwd().await,
        Some(("jwt", _m)) => stub::run_jwt().await,
        Some(("keygen", _m)) => stub::run_keygen().await,
        Some(("encrypt", _m)) => stub::run_encrypt().await,
        Some(("decrypt", _m)) => stub::run_decrypt().await,
        Some(("totp", _m)) => stub::run_totp().await,
        _ => {}
    }
    Ok(())
}
