use clap::ArgMatches;

macro_rules! stub_cmd {
    ($name:expr, $about:expr) => {
        clap::Command::new($name).about($about)
    };
}

pub fn json_cmd() -> clap::Command {
    stub_cmd!("json", "JSON tools").arg(clap::Arg::new("file").help("JSON file").required(true))
}
pub fn csv_cmd() -> clap::Command {
    stub_cmd!("csv", "CSV tools").arg(clap::Arg::new("file").help("CSV file").required(true))
}
pub fn yml_cmd() -> clap::Command {
    stub_cmd!("yml", "YAML tools").arg(clap::Arg::new("file").help("YAML file").required(true))
}

pub async fn run(name: &str, matches: &ArgMatches) -> anyhow::Result<()> {
    let file = matches.get_one::<String>("file").unwrap();
    println!("data {name} --file {file} (not yet implemented)");
    Ok(())
}
