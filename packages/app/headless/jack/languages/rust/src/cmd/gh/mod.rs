use clap::FromArgMatches;
mod coc;
mod colors;
mod ignore;
mod languages;
mod license;
mod og;

pub fn command() -> clap::Command {
    clap::Command::new("gh")
        .about("GitHub CLI tools")
        .subcommand_required(true)
        .subcommand(languages::command())
        .subcommand(license::command())
        .subcommand(coc::command())
        .subcommand(ignore::command())
        .subcommand(og::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("languages", m)) => languages::run(&languages::Args::from_arg_matches(m)?).await,
        Some(("license", m)) => license::run(&license::Args::from_arg_matches(m)?).await,
        Some(("coc", m)) => coc::run(&coc::Args::from_arg_matches(m)?).await,
        Some(("ignore", m)) => ignore::run(&ignore::Args::from_arg_matches(m)?).await,
        Some(("og", m)) => og::run(&og::Args::from_arg_matches(m)?).await,
        _ => Ok(()),
    }
}
