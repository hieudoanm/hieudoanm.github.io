mod cobra;
mod obsidian;
mod scan;
pub(crate) mod service;
mod tree;

pub fn command() -> clap::Command {
    clap::Command::new("docsify")
        .about("Codebase documentation and analysis tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("tree")
                .about("Generate directory tree as Markdown")
                .arg(
                    clap::Arg::new("dir")
                        .long("dir")
                        .default_value(".")
                        .help("Root directory to tree"),
                )
                .arg(
                    clap::Arg::new("out")
                        .long("out")
                        .default_value("TREE.md")
                        .help("Output file path"),
                ),
        )
        .subcommand(
            clap::Command::new("cobra")
                .about("Generate docs from a Cobra CLI project")
                .arg(
                    clap::Arg::new("path")
                        .help("Path to cobra project")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("output")
                        .short('o')
                        .long("output")
                        .default_value("README.md")
                        .help("Output file path"),
                ),
        )
        .subcommand(
            clap::Command::new("scan")
                .about("Scan a codebase and generate a GraphML file")
                .arg(
                    clap::Arg::new("dir")
                        .long("dir")
                        .default_value(".")
                        .help("Root directory to scan"),
                )
                .arg(
                    clap::Arg::new("out")
                        .long("out")
                        .default_value("codebase.graphml")
                        .help("Output .graphml file path"),
                )
                .arg(
                    clap::Arg::new("exclude")
                        .long("exclude")
                        .default_value(".git,node_modules,vendor,dist,.next,__pycache__")
                        .help("Comma-separated directories to exclude"),
                )
                .arg(
                    clap::Arg::new("verbose")
                        .long("verbose")
                        .action(clap::ArgAction::SetTrue)
                        .help("Print progress to stderr"),
                ),
        )
        .subcommand(
            clap::Command::new("obsidian")
                .about("Build a wiki-link graph from markdown files")
                .arg(
                    clap::Arg::new("dir")
                        .long("dir")
                        .default_value(".")
                        .help("Root directory to scan"),
                )
                .arg(
                    clap::Arg::new("out")
                        .long("out")
                        .default_value("")
                        .help("Output file path (default: stdout)"),
                )
                .arg(
                    clap::Arg::new("format")
                        .long("format")
                        .default_value("dot")
                        .help("Output format: dot, json, edges"),
                )
                .arg(
                    clap::Arg::new("exclude")
                        .long("exclude")
                        .default_value(".git,node_modules,vendor,dist,.next,__pycache__")
                        .help("Comma-separated directories to exclude"),
                ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("tree", m)) => tree::run(m).await,
        Some(("cobra", m)) => cobra::run(m).await,
        Some(("scan", m)) => scan::run(m).await,
        Some(("obsidian", m)) => obsidian::run(m).await,
        _ => Ok(()),
    }
}
