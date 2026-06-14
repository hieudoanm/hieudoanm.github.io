pub fn command() -> clap::Command {
    clap::Command::new("webhook")
        .about("Manage Telegram webhooks")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("set")
                .about("Set webhook URL")
                .arg(clap::Arg::new("url").help("Webhook URL").required(true)),
        )
        .subcommand(clap::Command::new("info").about("Get webhook info"))
        .subcommand(clap::Command::new("delete").about("Delete webhook"))
}

pub async fn run(matches: &clap::ArgMatches, token: &str) -> anyhow::Result<()> {
    use crate::cmd::telegram::service;

    match matches.subcommand() {
        Some(("set", m)) => {
            let url = m
                .get_one::<String>("url")
                .ok_or_else(|| anyhow::anyhow!("url required"))?;
            let resp = service::set_webhook(token, url)?;
            println!("Webhook set: {:?}", resp.ok);
        }
        Some(("info", _)) => {
            let info = service::get_webhook_info(token)?;
            println!("Webhook info: {}", serde_json::to_string_pretty(&info)?);
        }
        Some(("delete", _)) => {
            let resp = service::delete_webhook(token)?;
            println!("Webhook deleted: {:?}", resp.ok);
        }
        _ => {}
    }
    Ok(())
}
