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

    let input = if let Some(path) = file {
        std::fs::read(path).context("open file")?
    } else {
        let mut buf = Vec::new();
        std::io::Read::read_to_end(&mut std::io::stdin(), &mut buf).context("read stdin")?;
        buf
    };
    let records = parse_csv_data(&input)?;

    if use_json {
        println!("{}", serde_json::to_string_pretty(&records)?);
    } else {
        for record in &records {
            println!("{}", record.join(" | "));
        }
    }

    Ok(())
}

fn parse_csv_data(data: &[u8]) -> anyhow::Result<Vec<Vec<String>>> {
    let mut rdr = csv::ReaderBuilder::new().from_reader(data);
    let mut records = Vec::new();
    for result in rdr.records() {
        let record = result.context("read csv")?;
        records.push(record.iter().map(String::from).collect());
    }
    Ok(records)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[test]
    fn test_parse_csv_basic() {
        let data = b"name,age\nAlice,30\nBob,25\n";
        let records = parse_csv_data(data).unwrap();
        assert_eq!(records.len(), 2);
        assert_eq!(records[0], vec!["Alice", "30"]);
        assert_eq!(records[1], vec!["Bob", "25"]);
    }

    #[test]
    fn test_parse_csv_single_column() {
        let data = b"color\nred\ngreen\nblue\n";
        let records = parse_csv_data(data).unwrap();
        assert_eq!(records.len(), 3);
        assert_eq!(records[0], vec!["red"]);
        assert_eq!(records[2], vec!["blue"]);
    }

    #[test]
    fn test_parse_csv_with_quoted_fields() {
        let data = b"name,comment\nAlice,\"hello, world\"\nBob,\"\"\"quoting\"\"\"\n";
        let records = parse_csv_data(data).unwrap();
        assert_eq!(records[0], vec!["Alice", "hello, world"]);
        assert_eq!(records[1], vec!["Bob", "\"quoting\""]);
    }

    #[test]
    fn test_parse_csv_empty() {
        let data = b"";
        let records = parse_csv_data(data).unwrap();
        assert!(records.is_empty());
    }

    #[test]
    fn test_parse_csv_header_only() {
        let data = b"a,b,c\n";
        let records = parse_csv_data(data).unwrap();
        assert!(records.is_empty());
    }

    #[test]
    fn test_parse_csv_trailing_newline() {
        let data = b"x,y\n1,2\n3,4\n";
        let records = parse_csv_data(data).unwrap();
        assert_eq!(records.len(), 2);
        assert_eq!(records[1], vec!["3", "4"]);
    }
}
