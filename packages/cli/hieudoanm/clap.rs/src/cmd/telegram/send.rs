pub fn command() -> clap::Command {
    clap::Command::new("message")
        .about("Send a Telegram message")
        .subcommand(
            clap::Command::new("send")
                .about("Send a message")
                .arg(
                    clap::Arg::new("chat")
                        .short('c')
                        .long("chat")
                        .help("Chat ID")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("text")
                        .short('t')
                        .long("text")
                        .help("Message text")
                        .required(true),
                ),
        )
}

pub async fn run(matches: &clap::ArgMatches, token: &str) -> anyhow::Result<()> {
    use crate::cmd::telegram::service;

    if let Some(("send", m)) = matches.subcommand() {
        let chat_id = m
            .get_one::<String>("chat")
            .ok_or_else(|| anyhow::anyhow!("chat id required"))?;
        let text = m
            .get_one::<String>("text")
            .ok_or_else(|| anyhow::anyhow!("text required"))?;
        let resp = service::send_message(token, chat_id, text)?;
        println!("Message sent: {:?}", resp.ok);
    }
    Ok(())
}
