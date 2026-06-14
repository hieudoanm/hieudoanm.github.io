pub fn command() -> clap::Command {
    clap::Command::new("telegram")
        .about("Telegram bot and message tools")
        .subcommand_required(true)
        .subcommand(
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
                ),
        )
        .subcommand(
            clap::Command::new("webhook")
                .about("Manage Telegram webhooks")
                .subcommand_required(true)
                .subcommand(
                    clap::Command::new("set")
                        .about("Set webhook URL")
                        .arg(clap::Arg::new("url").help("Webhook URL").required(true)),
                )
                .subcommand(clap::Command::new("info").about("Get webhook info"))
                .subcommand(clap::Command::new("delete").about("Delete webhook")),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    use crate::services::telegram;

    let token = std::env::var("TELEGRAM_BOT_TOKEN")
        .map_err(|_| anyhow::anyhow!("TELEGRAM_BOT_TOKEN not set"))?;

    match matches.subcommand() {
        Some(("message", sub_m)) => {
            if let Some(("send", m)) = sub_m.subcommand() {
                let chat_id = m
                    .get_one::<String>("chat")
                    .ok_or_else(|| anyhow::anyhow!("chat id required"))?;
                let text = m
                    .get_one::<String>("text")
                    .ok_or_else(|| anyhow::anyhow!("text required"))?;
                let resp = telegram::send_message(&token, chat_id, text)?;
                println!("Message sent: {:?}", resp.ok);
            }
        }
        Some(("webhook", sub_m)) => match sub_m.subcommand() {
            Some(("set", m)) => {
                let url = m
                    .get_one::<String>("url")
                    .ok_or_else(|| anyhow::anyhow!("url required"))?;
                let resp = telegram::set_webhook(&token, url)?;
                println!("Webhook set: {:?}", resp.ok);
            }
            Some(("info", _)) => {
                let info = telegram::get_webhook_info(&token)?;
                println!("Webhook info: {}", serde_json::to_string_pretty(&info)?);
            }
            Some(("delete", _)) => {
                let resp = telegram::delete_webhook(&token)?;
                println!("Webhook deleted: {:?}", resp.ok);
            }
            _ => {}
        },
        _ => {}
    }
    Ok(())
}
