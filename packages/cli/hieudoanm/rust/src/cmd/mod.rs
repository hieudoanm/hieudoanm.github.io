mod version;
mod blackjack;
mod braille;
mod clipboard;
mod english;
mod frankfurter;
mod morse;
mod qrcode;
mod snapshot;
mod status;
mod status_all;
mod tax;
mod uuid;
mod wifi;
mod chess;
mod clock;
mod colors;
mod docsify;
mod doi;
mod instagram;
mod ip;
mod openapi;
mod openrouter;
mod shopify;
mod str_mod;
mod telegram;
mod system;
mod youtube;

fn root_command() -> clap::Command {
    clap::Command::new("hieudoanm")
        .about("Hieu Doan's personal CLI toolbox")
        .subcommand_required(true)
        .arg_required_else_help(true)
        .subcommand(version::command())
        .subcommand(blackjack::command())
        .subcommand(braille::command())
        .subcommand(clipboard::command())
        .subcommand(english::command())
        .subcommand(frankfurter::command())
        .subcommand(morse::command())
        .subcommand(qrcode::command())
        .subcommand(snapshot::command())
        .subcommand(status::command())
        .subcommand(tax::command())
        .subcommand(uuid::command())
        .subcommand(wifi::command())
        .subcommand(status_all::command())
        .subcommand(chess::command())
        .subcommand(clock::command())
        .subcommand(colors::command())
        .subcommand(docsify::command())
        .subcommand(doi::command())
        .subcommand(instagram::command())
        .subcommand(ip::command())
        .subcommand(openapi::command())
        .subcommand(openrouter::command())
        .subcommand(shopify::command())
        .subcommand(str_mod::command())
        .subcommand(system::command())
        .subcommand(telegram::command())
        .subcommand(youtube::command())
}

pub async fn execute() -> anyhow::Result<()> {
    let root = root_command();
    let matches = root.get_matches();

    match matches.subcommand() {
        Some(("version", m)) => version::run(m),
        Some(("blackjack", m)) => blackjack::run(m),
        Some(("braille", m)) => braille::run(m),
        Some(("clipboard", m)) => clipboard::run(m),
        Some(("define", m)) => english::run(m).await,
        Some(("cc", m)) => frankfurter::run(m).await,
        Some(("morse", m)) => morse::run(m),
        Some(("qrcode", m)) => qrcode::run(m).await,
        Some(("snapshot", m)) => snapshot::run(m),
        Some(("status", m)) => status::run(m).await,
        Some(("status-all", m)) => status_all::run(m).await,
        Some(("all", m)) => status_all::run(m).await,
        Some(("tax", m)) => tax::run(m).await,
        Some(("uuid", m)) => uuid::run(m),
        Some(("wifi", m)) => wifi::run(m).await,
        Some(("chess", m)) => chess::run(m).await,
        Some(("clock", m)) => clock::run(m),
        Some(("colors", m)) => colors::run(m).await,
        Some(("docsify", m)) => docsify::run(m).await,
        Some(("doi", m)) => doi::run(m).await,
        Some(("instagram", m)) => instagram::run(m),
        Some(("ip", m)) => ip::run(m).await,
        Some(("openapi", m)) => openapi::run(m),
        Some(("openrouter", m)) => openrouter::run(m).await,
        Some(("shopify", m)) => shopify::run(m).await,
        Some(("string", m)) => str_mod::run(m).await,
        Some(("system", m)) => system::run(m),
        Some(("telegram", m)) => telegram::run(m).await,
        Some(("youtube", m)) => youtube::run(m).await,
        _ => {
            root_command().print_help()?;
            println!();
            Ok(())
        }
    }
}
