mod send;
pub(crate) mod service;
mod webhook;

pub fn command() -> clap::Command {
    clap::Command::new("telegram")
        .about("Telegram bot and message tools")
        .subcommand_required(true)
        .subcommand(send::command())
        .subcommand(webhook::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let token = std::env::var("TELEGRAM_BOT_TOKEN")
        .map_err(|_| anyhow::anyhow!("TELEGRAM_BOT_TOKEN not set"))?;
    match matches.subcommand() {
        Some(("message", m)) => send::run(m, &token).await,
        Some(("webhook", m)) => webhook::run(m, &token).await,
        _ => Ok(()),
    }
}
