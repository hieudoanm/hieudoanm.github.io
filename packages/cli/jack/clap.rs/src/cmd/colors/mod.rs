use clap::FromArgMatches;
mod hcl;
mod hex;
mod oklch;
mod palette;
mod random;
mod rgb;
pub(crate) mod service;

pub fn command() -> clap::Command {
    clap::Command::new("colors")
        .about("Color conversion and palette tools")
        .subcommand_required(true)
        .subcommand(random::command())
        .subcommand(palette::command())
        .subcommand(hex::command())
        .subcommand(rgb::command())
        .subcommand(hcl::command())
        .subcommand(oklch::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("random", m)) => random::run(&random::Args::from_arg_matches(m)?).await,
        Some(("palette", m)) => palette::run(&palette::Args::from_arg_matches(m)?).await,
        Some(("hex", m)) => hex::run(&hex::Args::from_arg_matches(m)?).await,
        Some(("rgb", m)) => rgb::run(&rgb::Args::from_arg_matches(m)?).await,
        Some(("hcl", m)) => hcl::run(&hcl::Args::from_arg_matches(m)?).await,
        Some(("oklch", m)) => oklch::run(&oklch::Args::from_arg_matches(m)?).await,
        _ => Ok(()),
    }
}
