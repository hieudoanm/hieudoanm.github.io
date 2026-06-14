mod code;
mod files;
mod text;
mod web;

pub fn command() -> clap::Command {
    clap::Command::new("search")
        .about("Universal search for files, text, code, and the web")
        .subcommand_required(true)
        .subcommand(files::command())
        .subcommand(text::command())
        .subcommand(code::command())
        .subcommand(web::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("files", m)) => files::run(m).await,
        Some(("text", m)) => text::run(m).await,
        Some(("code", m)) => code::run(m).await,
        Some(("web", m)) => web::run(m).await,
        _ => Ok(()),
    }
}
