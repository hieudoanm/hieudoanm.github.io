use clap::ArgMatches;

macro_rules! stub_cmd {
    ($name:expr, $about:expr) => {
        clap::Command::new($name).about($about)
    };
}

pub fn files_cmd() -> clap::Command {
    stub_cmd!("files", "Find files by glob pattern").arg(
        clap::Arg::new("pattern")
            .help("Glob pattern")
            .required(true),
    )
}
pub fn text_cmd() -> clap::Command {
    stub_cmd!("text", "Search file contents by regex").arg(
        clap::Arg::new("pattern")
            .help("Regex pattern")
            .required(true),
    )
}
pub fn code_cmd() -> clap::Command {
    stub_cmd!("code", "Find code symbols")
        .arg(clap::Arg::new("symbol").help("Symbol name").required(true))
}
pub fn web_cmd() -> clap::Command {
    stub_cmd!("web", "Search the web")
        .arg(clap::Arg::new("query").help("Search query").required(true))
}

pub async fn run(name: &str, _matches: &ArgMatches) -> anyhow::Result<()> {
    println!("{name} (not yet implemented)");
    Ok(())
}
