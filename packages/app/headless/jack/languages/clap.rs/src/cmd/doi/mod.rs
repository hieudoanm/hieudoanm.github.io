pub mod cite;
pub mod fetch;
pub mod service;

pub fn command() -> clap::Command {
    clap::Command::new("doi")
        .about("DOI productivity tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("cite")
                .about("Cite a DOI")
                .arg(clap::Arg::new("doi").help("DOI to cite").required(true)),
        )
        .subcommand(
            clap::Command::new("ref")
                .about("Get reference from DOI")
                .arg(
                    clap::Arg::new("doi")
                        .help("DOI to reference")
                        .required(true),
                ),
        )
        .subcommand(
            clap::Command::new("fetch")
                .about("Fetch DOI metadata")
                .arg(clap::Arg::new("doi").help("DOI to fetch").required(true)),
        )
        .subcommand(
            clap::Command::new("validate")
                .about("Validate a DOI")
                .arg(clap::Arg::new("doi").help("DOI to validate").required(true)),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("cite", sub_m)) => cite::run(sub_m).await,
        Some(("ref", sub_m)) => fetch::run_ref(sub_m).await,
        Some(("fetch", sub_m)) => fetch::run_fetch(sub_m).await,
        Some(("validate", sub_m)) => fetch::run_validate(sub_m).await,
        _ => Ok(()),
    }
}
