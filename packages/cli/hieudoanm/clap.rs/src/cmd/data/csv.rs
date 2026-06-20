use anyhow::Context;

#[derive(clap::Args)]
pub struct Args {
    #[arg(help = "CSV file")]
    pub file: Option<String>,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let file = matches.file.as_ref();
    let use_json = matches.json;

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
