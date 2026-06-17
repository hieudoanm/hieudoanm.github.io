mod calc;
mod casino;
mod chess;
mod colors;
mod convert;
mod crypto;
mod data;
mod docsify;
mod doi;
mod english;
mod file;
mod gemini;
mod gh;
mod history;
mod image;
mod net;
mod openapi;
mod openrouter;
mod port;
mod search;
mod semver;
mod system;
mod telegram;
mod time;
mod version;
mod web;

pub async fn execute() -> anyhow::Result<()> {
    let mut root = clap::Command::new("hieudoanm")
        .about("Hieu Doan's personal CLI toolbox")
        .subcommand_required(true)
        .arg_required_else_help(true)
        .subcommand(version::command())
        .subcommand(calc::command())
        .subcommand(casino::command())
        .subcommand(chess::command())
        .subcommand(colors::command())
        .subcommand(convert::command())
        .subcommand(crypto::command())
        .subcommand(data::command())
        .subcommand(docsify::command())
        .subcommand(doi::command())
        .subcommand(english::command())
        .subcommand(file::command())
        .subcommand(gemini::command())
        .subcommand(gh::command())
        .subcommand(history::command())
        .subcommand(image::command())
        .subcommand(net::command())
        .subcommand(openapi::command())
        .subcommand(openrouter::command())
        .subcommand(port::command())
        .subcommand(search::command())
        .subcommand(semver::command())
        .subcommand(system::command())
        .subcommand(telegram::command())
        .subcommand(time::command())
        .subcommand(web::command());
    let matches = root.clone().get_matches();

    let cmd_name = matches.subcommand_name().unwrap_or("").to_string();
    let should_track = !cmd_name.is_empty() && cmd_name != "help" && cmd_name != "history";
    let start = std::time::Instant::now();

    let result = match matches.subcommand() {
        Some(("version", m)) => version::run(m),
        Some(("calc", m)) => calc::run(m).await,
        Some(("casino", m)) => casino::run(m).await,
        Some(("chess", m)) => chess::run(m).await,
        Some(("colors", m)) => colors::run(m).await,
        Some(("convert", m)) => convert::run(m).await,
        Some(("crypto", m)) => crypto::run(m).await,
        Some(("data", m)) => data::run(m).await,
        Some(("docsify", m)) => docsify::run(m).await,
        Some(("doi", m)) => doi::run(m).await,
        Some(("english", m)) => english::run(m).await,
        Some(("file", m)) => file::run(m).await,
        Some(("gemini", m)) => gemini::run(m).await,
        Some(("gh", m)) => gh::run(m).await,
        Some(("history", m)) => history::run(m).await,
        Some(("image", m)) => image::run(m).await,
        Some(("net", m)) => net::run(m).await,
        Some(("openapi", m)) => openapi::run(m).await,
        Some(("openrouter", m)) => openrouter::run(m).await,
        Some(("port", m)) => port::run(m).await,
        Some(("search", m)) => search::run(m).await,
        Some(("semver", m)) => semver::run(m).await,
        Some(("system", m)) => system::run(m).await,
        Some(("telegram", m)) => telegram::run(m).await,
        Some(("time", m)) => time::run(m).await,
        Some(("web", m)) => web::run(m).await,
        _ => {
            root.print_help()?;
            println!();
            Ok(())
        }
    };

    if should_track {
        let mut entry = crate::libs::history::entry("cli", &cmd_name);
        entry.duration_ms = Some(start.elapsed().as_millis() as i64);
        if let Err(ref e) = result {
            entry.error = Some(e.to_string());
        }
        let _ = crate::libs::history::append(&entry);
    }

    result
}
