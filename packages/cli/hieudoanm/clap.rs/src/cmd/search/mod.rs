mod stub;

pub fn command() -> clap::Command {
    clap::Command::new("search")
        .about("Universal search for files, text, code, and the web")
        .subcommand_required(true)
        .subcommand(stub::files_cmd())
        .subcommand(stub::text_cmd())
        .subcommand(stub::code_cmd())
        .subcommand(stub::web_cmd())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some((name, m)) = matches.subcommand() {
        stub::run(name, m).await
    } else {
        Ok(())
    }
}
