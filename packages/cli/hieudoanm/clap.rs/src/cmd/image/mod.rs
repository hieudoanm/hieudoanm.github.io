mod convert;
mod dominant;
mod info;

pub fn command() -> clap::Command {
    clap::Command::new("image")
        .about("Image inspection and conversion tools")
        .subcommand_required(true)
        .subcommand(info::command())
        .subcommand(convert::command())
        .subcommand(dominant::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("info", m)) => info::run(m).await,
        Some(("convert", m)) => convert::run(m).await,
        Some(("dominant", m)) => dominant::run(m).await,
        _ => Ok(()),
    }
}
