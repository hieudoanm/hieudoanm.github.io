mod decrypt;
mod encrypt;
mod hash;
mod jwt;
mod keygen;
mod passwd;
mod qrcode;
mod totp;
mod uuid;

pub fn command() -> clap::Command {
    clap::Command::new("crypto")
        .about("Cryptographic and security tools")
        .subcommand_required(true)
        .subcommand(hash::command())
        .subcommand(uuid::command())
        .subcommand(qrcode::command())
        .subcommand(passwd::command())
        .subcommand(jwt::command())
        .subcommand(keygen::command())
        .subcommand(encrypt::command())
        .subcommand(decrypt::command())
        .subcommand(totp::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("hash", m)) => hash::run(m).await?,
        Some(("uuid", m)) => uuid::run(m).await?,
        Some(("qrcode", m)) => qrcode::run(m).await?,
        Some(("passwd", m)) => passwd::run(m).await?,
        Some(("jwt", m)) => jwt::run(m).await?,
        Some(("keygen", m)) => keygen::run(m).await?,
        Some(("encrypt", m)) => encrypt::run(m).await?,
        Some(("decrypt", m)) => decrypt::run(m).await?,
        Some(("totp", m)) => totp::run(m).await?,
        _ => {}
    }
    Ok(())
}
