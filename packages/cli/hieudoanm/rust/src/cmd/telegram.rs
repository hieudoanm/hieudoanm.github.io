pub fn command() -> clap::Command {
    clap::Command::new("telegram")
        .about("Telegram messaging tools")
        .subcommand(
            clap::Command::new("message")
                .about("Send a Telegram message")
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
        .subcommand(
            clap::Command::new("webhook")
                .about("Manage Telegram webhooks")
                .subcommand(
                    clap::Command::new("set")
                        .about("Set webhook URL")
                        .arg(
                            clap::Arg::new("url")
                                .help("Webhook URL")
                                .required(true),
                        ),
                )
                .subcommand_required(false)
                .subcommand(
                    clap::Command::new("info").about("Get webhook info"),
                )
                .subcommand(
                    clap::Command::new("delete").about("Delete webhook"),
                ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    use crate::services::telegram;

    let token = std::env::var("TELEGRAM_BOT_TOKEN")
        .map_err(|_| anyhow::anyhow!("TELEGRAM_BOT_TOKEN not set"))?;

    match matches.subcommand() {
        Some(("message", sub_m)) => {
            let chat_id = sub_m
                .get_one::<String>("chat")
                .ok_or_else(|| anyhow::anyhow!("chat id required"))?;
            let text = sub_m
                .get_one::<String>("text")
                .ok_or_else(|| anyhow::anyhow!("text required"))?;
            let resp = telegram::send_message(&token, chat_id, text)?;
            println!("Message sent: {:?}", resp.ok);
        }
        Some(("webhook", sub_m)) => match sub_m.subcommand() {
            Some(("set", wh_m)) => {
                let url = wh_m
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
            _ => {
                println!("Telegram webhook commands: set, info, delete");
            }
        },
        _ => {}
    }
    Ok(())
}
