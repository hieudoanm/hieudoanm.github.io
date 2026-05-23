use clap::FromArgMatches;
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
        Some(("files", m)) => files::run(&files::Args::from_arg_matches(m)?).await,
        Some(("text", m)) => text::run(&text::Args::from_arg_matches(m)?).await,
        Some(("code", m)) => code::run(&code::Args::from_arg_matches(m)?).await,
        Some(("web", m)) => web::run(&web::Args::from_arg_matches(m)?).await,
        _ => Ok(()),
    }
}
