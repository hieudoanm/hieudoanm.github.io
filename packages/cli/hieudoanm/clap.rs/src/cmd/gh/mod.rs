pub fn command() -> clap::Command {
    clap::Command::new("gh")
        .about("GitHub CLI tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("languages")
                .about("Show language stats for a repo")
                .arg(
                    clap::Arg::new("repo")
                        .long("repo")
                        .help("Repository (owner/name)")
                        .required(true),
                ),
        )
        .subcommand(clap::Command::new("license").about("Fetch a license template"))
        .subcommand(clap::Command::new("coc").about("Fetch a code of conduct"))
        .subcommand(clap::Command::new("ignore").about("Fetch a .gitignore template"))
        .subcommand(
            clap::Command::new("og")
                .about("Generate an Open Graph image")
                .arg(
                    clap::Arg::new("url")
                        .long("url")
                        .help("Repository URL")
                        .required(true),
                ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some((name, _m)) = matches.subcommand() {
        println!("gh {name} (not yet implemented)");
    }
    Ok(())
}
