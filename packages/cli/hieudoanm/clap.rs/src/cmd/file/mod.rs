use clap::FromArgMatches;
mod checksum;
mod chmod;
mod common;
mod count;
mod duplicates;
mod edit;
mod ftype;
mod grep;
mod info;
mod read;
mod write;

pub fn command() -> clap::Command {
    clap::Command::new("file")
        .about("File introspection and analysis tools")
        .subcommand_required(true)
        .arg(
            clap::Arg::new("json")
                .long("json")
                .global(true)
                .help("Output in JSON format"),
        )
        .subcommand(read::read_command())
        .subcommand(read::head_command())
        .subcommand(read::tail_command())
        .subcommand(write::command())
        .subcommand(edit::command())
        .subcommand(grep::command())
        .subcommand(checksum::command())
        .subcommand(chmod::command())
        .subcommand(count::command())
        .subcommand(duplicates::command())
        .subcommand(info::size_command())
        .subcommand(info::stats_command())
        .subcommand(ftype::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let json = matches.get_one::<bool>("json").copied().unwrap_or(false);
    match matches.subcommand() {
        Some(("read", m)) => read::read_run(m, json).await,
        Some(("head", m)) => read::head_run(m).await,
        Some(("tail", m)) => read::tail_run(m).await,
        Some(("write", m)) => write::run(m, json).await,
        Some(("edit", m)) => edit::run(m, json).await,
        Some(("grep", m)) => grep::run(m, json).await,
        Some(("checksum", m)) => checksum::run(m, json).await,
        Some(("chmod", m)) => chmod::run(&chmod::Args::from_arg_matches(m)?).await,
        Some(("count", m)) => count::run(m, json).await,
        Some(("duplicates", m)) => duplicates::run(m, json).await,
        Some(("size", m)) => info::size_run(m, json).await,
        Some(("stats", m)) => info::stats_run(m, json).await,
        Some(("type", m)) => ftype::run(m, json).await,
        _ => Ok(()),
    }
}
