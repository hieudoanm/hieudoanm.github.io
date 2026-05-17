use clap::FromArgMatches;
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
        Some(("hash", m)) => hash::run(&hash::Args::from_arg_matches(m)?).await?,
        Some(("uuid", m)) => uuid::run(&uuid::Args::from_arg_matches(m)?).await?,
        Some(("qrcode", m)) => qrcode::run(&qrcode::Args::from_arg_matches(m)?).await?,
        Some(("passwd", m)) => passwd::run(&passwd::Args::from_arg_matches(m)?).await?,
        Some(("jwt", m)) => jwt::run(m).await?,
        Some(("keygen", m)) => keygen::run(&keygen::Args::from_arg_matches(m)?).await?,
        Some(("encrypt", m)) => encrypt::run(&encrypt::Args::from_arg_matches(m)?).await?,
        Some(("decrypt", m)) => decrypt::run(&decrypt::Args::from_arg_matches(m)?).await?,
        Some(("totp", m)) => totp::run(&totp::Args::from_arg_matches(m)?).await?,
        _ => {}
    }
    Ok(())
}
