mod chat;
mod config;
mod hook;
mod models;
mod service;
mod status;

pub fn command() -> clap::Command {
    clap::Command::new("openrouter")
        .about("OpenRouter AI tools")
        .subcommand_required(true)
        .subcommand(clap::Command::new("models").about("List available free models"))
        .subcommand(clap::Command::new("status").about("Check OpenRouter API status"))
        .subcommand(clap::Command::new("hook").about("Manage webhooks"))
        .subcommand(
            clap::Command::new("chat")
                .about("Send a chat message to an AI model")
                .arg(clap::Arg::new("prompt").help("Your message").required(true))
                .arg(
                    clap::Arg::new("model")
                        .short('m')
                        .long("model")
                        .help("Model name or ID"),
                ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("models", _m)) => models::run().await?,
        Some(("status", _m)) => status::run().await?,
        Some(("chat", sub_m)) => chat::run(sub_m).await?,
        Some(("hook", _m)) => hook::run().await?,
        _ => {}
    }
    Ok(())
}
