mod decode;
mod encode;

pub fn command() -> clap::Command {
    clap::Command::new("base64")
        .about("Base64 encode/decode")
        .subcommand_required(true)
        .subcommand(encode::command())
        .subcommand(decode::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("encode", m)) => encode::run(m).await,
        Some(("decode", m)) => decode::run(m).await,
        _ => Ok(()),
    }
}
