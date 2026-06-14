use anyhow::Context;

pub fn command() -> clap::Command {
    clap::Command::new("csv")
        .about("View and format CSV files")
        .arg(clap::Arg::new("file").help("CSV file"))
        .arg(
            clap::Arg::new("json")
                .long("json")
                .action(clap::ArgAction::SetTrue)
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let file = matches.get_one::<String>("file");
    let use_json = matches.get_flag("json");

    let mut records: Vec<Vec<String>> = Vec::new();

    if let Some(path) = file {
        let mut rdr = csv::ReaderBuilder::new()
            .from_path(path)
            .context("open file")?;
        for result in rdr.records() {
            let record = result.context("read csv")?;
            records.push(record.iter().map(String::from).collect());
        }
    } else {
        let mut rdr = csv::ReaderBuilder::new().from_reader(std::io::stdin());
        for result in rdr.records() {
            let record = result.context("read csv")?;
            records.push(record.iter().map(String::from).collect());
        }
    }

    if use_json {
        println!("{}", serde_json::to_string_pretty(&records)?);
    } else {
        for record in &records {
            println!("{}", record.join(" | "));
        }
    }

    Ok(())
}
