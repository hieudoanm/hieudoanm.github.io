use clap::FromArgMatches;
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
        Some(("info", m)) => info::run(&info::Args::from_arg_matches(m)?).await,
        Some(("convert", m)) => convert::run(&convert::Args::from_arg_matches(m)?).await,
        Some(("dominant", m)) => dominant::run(&dominant::Args::from_arg_matches(m)?).await,
        _ => Ok(()),
    }
}
