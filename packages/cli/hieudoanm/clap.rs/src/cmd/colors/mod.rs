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
        Some(("random", m)) => random::run(m).await,
        Some(("palette", m)) => palette::run(m).await,
        Some(("hex", m)) => hex::run(m).await,
        Some(("rgb", m)) => rgb::run(m).await,
        Some(("hcl", m)) => hcl::run(m).await,
        Some(("oklch", m)) => oklch::run(m).await,
        _ => Ok(()),
    }
}
