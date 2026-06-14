use clap::ArgMatches;

macro_rules! stub_cmd {
    ($name:expr, $about:expr) => {
        clap::Command::new($name).about($about)
    };
}

pub fn languages_cmd() -> clap::Command {
    stub_cmd!("languages", "Show language stats for a repo").arg(
        clap::Arg::new("repo")
            .long("repo")
            .help("Repository (owner/name)")
            .required(true),
    )
}
pub fn license_cmd() -> clap::Command {
    stub_cmd!("license", "Fetch a license template")
}
pub fn coc_cmd() -> clap::Command {
    stub_cmd!("coc", "Fetch a code of conduct")
}
pub fn ignore_cmd() -> clap::Command {
    stub_cmd!("ignore", "Fetch a .gitignore template")
}
pub fn og_cmd() -> clap::Command {
    stub_cmd!("og", "Generate an Open Graph image").arg(
        clap::Arg::new("url")
            .long("url")
            .help("Repository URL")
            .required(true),
    )
}

pub async fn run(name: &str, _matches: &ArgMatches) -> anyhow::Result<()> {
    println!("{name} (not yet implemented)");
    Ok(())
}
