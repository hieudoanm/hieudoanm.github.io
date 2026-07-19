mod code;

pub fn command() -> clap::Command {
    clap::Command::new("gemini")
        .about("Google Gemini AI tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("code")
                .about("Gemini-powered AI coding assistant")
                .arg(
                    clap::Arg::new("prompt")
                        .help("Your coding question")
                        .required(true),
                ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("code", sub_m)) => code::run(sub_m).await,
        _ => Ok(()),
    }
}
