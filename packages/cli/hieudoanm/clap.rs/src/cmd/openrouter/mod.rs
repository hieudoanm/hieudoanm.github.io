mod chat;
pub mod code;
mod config;
mod hook;
mod models;
mod serve;
pub mod service;
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
        .subcommand(
            clap::Command::new("code")
                .about("AI coding assistant")
                .arg(
                    clap::Arg::new("prompt")
                        .help("Your coding question")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("model")
                        .short('m')
                        .long("model")
                        .help("Model name or ID"),
                ),
        )
        .subcommand(serve::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("models", _m)) => models::run().await?,
        Some(("status", _m)) => status::run().await?,
        Some(("chat", sub_m)) => chat::run(sub_m).await?,
        Some(("hook", _m)) => hook::run().await?,
        Some(("code", sub_m)) => code::run(sub_m).await?,
        Some(("serve", sub_m)) => serve::run(sub_m).await?,
        _ => {}
    }
    Ok(())
}
