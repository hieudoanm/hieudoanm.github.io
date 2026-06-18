use clap::ArgMatches;

use super::unit_service;

pub fn command() -> clap::Command {
    clap::Command::new("unit")
        .about("Convert between units (length, weight, temp, speed)")
        .arg(
            clap::Arg::new("value")
                .long("value")
                .short('v')
                .help("Value to convert")
                .required(true),
        )
        .arg(
            clap::Arg::new("from")
                .long("from")
                .short('f')
                .help("Source unit")
                .required(true),
        )
        .arg(
            clap::Arg::new("to")
                .long("to")
                .short('t')
                .help("Target unit")
                .required(true),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let value: f64 = matches.get_one::<String>("value").unwrap().parse()?;
    let from = matches.get_one::<String>("from").unwrap();
    let to = matches.get_one::<String>("to").unwrap();
    let json = matches.get_flag("json");

    match unit_service::convert(value, from, to) {
        Ok(r) => {
            if json {
                let output = serde_json::json!({
                    "value": r.value,
                    "from": r.from,
                    "to": r.to,
                    "result": r.result,
                    "category": r.category,
                });
                println!("{}", serde_json::to_string_pretty(&output)?);
            } else {
                println!("{} {} = {} {}", r.value, r.from, r.result, r.to);
            }
        }
        Err(e) => anyhow::bail!("{}", e),
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
