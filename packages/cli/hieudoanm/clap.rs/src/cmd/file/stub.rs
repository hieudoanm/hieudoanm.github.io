use clap::ArgMatches;

macro_rules! stub_cmd {
    ($name:expr, $about:expr) => {
        clap::Command::new($name).about($about)
    };
}

pub fn read_cmd() -> clap::Command {
    stub_cmd!("read", "Read a file")
}
pub fn write_cmd() -> clap::Command {
    stub_cmd!("write", "Write to a file")
}
pub fn edit_cmd() -> clap::Command {
    stub_cmd!("edit", "Edit a file")
}
pub fn grep_cmd() -> clap::Command {
    stub_cmd!("grep", "Search file contents")
}
pub fn checksum_cmd() -> clap::Command {
    stub_cmd!("checksum", "Calculate file checksum")
}
pub fn chmod_cmd() -> clap::Command {
    stub_cmd!("chmod", "Change file permissions")
}
pub fn count_cmd() -> clap::Command {
    stub_cmd!("count", "Count lines in a file")
}
pub fn duplicates_cmd() -> clap::Command {
    stub_cmd!("duplicates", "Find duplicate files")
}
pub fn head_cmd() -> clap::Command {
    stub_cmd!("head", "Show first lines of a file")
}
pub fn size_cmd() -> clap::Command {
    stub_cmd!("size", "Show file size")
}
pub fn stats_cmd() -> clap::Command {
    stub_cmd!("stats", "Show file statistics")
}
pub fn tail_cmd() -> clap::Command {
    stub_cmd!("tail", "Show last lines of a file")
}
pub fn type_cmd() -> clap::Command {
    stub_cmd!("type", "Detect file type")
}

pub async fn run(name: &str, _matches: &ArgMatches) -> anyhow::Result<()> {
    println!("{name} (not yet implemented)");
    Ok(())
}
